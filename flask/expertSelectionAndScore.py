import json
import requests
import argparse
from sentence_transformers import SentenceTransformer, util
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk

# Initialize NLTK resources
nltk.download("wordnet")
nltk.download("stopwords")

# Load SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize lemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))

# Weights for score components
SKILL_WEIGHT = 0.4
EXPERIENCE_WEIGHT = 0.2
QUALIFICATION_WEIGHT = 0.2
RESEARCH_WEIGHT = 0.1
PROJECT_WEIGHT = 0.1

# Preprocessing for phrase similarity
def preprocess_phrases(phrases):
    def preprocess(phrase):
        words = re.sub(r"[^\w\s]", "", phrase.lower()).split()
        return " ".join(lemmatizer.lemmatize(word) for word in words if word not in stop_words)
    return [preprocess(phrase) for phrase in phrases]

# Sentence embedding similarity
def compute_mean_embedding(vector):
    embeddings = model.encode(vector, convert_to_tensor=True)
    return embeddings.mean(dim=0)

# Cosine similarity between two vectors
def aggregate_similarity(vector1, vector2):
    if not vector1 or not vector2:
        return 0.0
    vector1 = preprocess_phrases(vector1)
    vector2 = preprocess_phrases(vector2)
    embedding1 = compute_mean_embedding(vector1)
    embedding2 = compute_mean_embedding(vector2)
    similarity = util.cos_sim(embedding1, embedding2).item() * 10
    return round(similarity, 2)

# Experience score calculation
def calculate_experience_score(expert_experience, max_experience):
    if max_experience == 0:
        return 0.0
    return round((expert_experience / max_experience) * 10, 2)

# Flatten nested skills lists
def flatten_skills(nested_list):
    return [skill for sublist in nested_list for skill in sublist]

# Calculate approach relevancy
def calculate_approach_relevancy(approach_scores):
    return round(
        (approach_scores["problemSolving"] * 0.3) +
        (approach_scores["collaboration"] * 0.1) +
        (approach_scores["decisionMaking"] * 0.25) +
        (approach_scores["creativity"] * 0.15) +
        (approach_scores["analyticalDepth"] * 0.2),
        2
    ) * 3

# Select experts by domain and availability
def select_experts_by_domain(job, experts):
    job_domain = job["domainDepartment"]
    selected_experts = [
        expert for expert in experts
        if job_domain.lower() in expert["fieldOfExpertise"]["domain"].lower() and expert["availability"]
    ]
    if not selected_experts:
        print("No experts found matching the domain and availability criteria.")
    return selected_experts

# Calculate scores for selected experts
def calculate_expert_scores(job, selected_experts):
    job_skills = job['preferredSkills']
    job_qualification = job['minimumQualifications']
    max_experience = max(expert['fieldOfExpertise']['yearsOfExperience'] for expert in selected_experts)

    scores = []
    for expert in selected_experts:
        expert_skills = expert['fieldOfExpertise']['skills']
        expert_experience = expert['fieldOfExpertise']['yearsOfExperience']
        expert_qualification = expert['fieldOfExpertise']['qualifications']
        expert_projects = flatten_skills([p['skillsGained'] for p in expert['fieldOfExpertise']['projects']])
        expert_publications = flatten_skills([p['skills'] for p in expert['fieldOfExpertise']['publications']])
        approach_scores = expert.get("approachRelevancyScore", {})

        skills_score = aggregate_similarity(job_skills, expert_skills)
        experience_score = calculate_experience_score(expert_experience, max_experience)
        qualification_score = 10 if any(job_qualification in q['degree'] for q in expert_qualification) else 0
        research_score = aggregate_similarity(job_skills, expert_publications)
        project_score = aggregate_similarity(job_skills, expert_projects)

        total_skill_relevancy = round(
            (skills_score * SKILL_WEIGHT) +
            (experience_score * EXPERIENCE_WEIGHT) +
            (qualification_score * QUALIFICATION_WEIGHT) +
            (research_score * RESEARCH_WEIGHT) +
            (project_score * PROJECT_WEIGHT),
            2
        )

        final_skill_score = total_skill_relevancy * 7
        total_approach_relevancy = calculate_approach_relevancy(approach_scores)
        final_combined_score = round(final_skill_score + total_approach_relevancy, 2)

        scores.append({
            "expertID": expert['_id'],
            "expertName": f"{expert['personalDetails']['name']['firstName']} {expert['personalDetails']['name']['lastName']}",
            "finalSkillScore": final_skill_score,
            "approachRelevancyScore": total_approach_relevancy,
            "finalScore": final_combined_score
        })

    return scores

# Create balanced panels
def create_balanced_panels(scores, num_panels, experts_per_panel):
    sorted_scores = sorted(scores, key=lambda x: x['finalScore'], reverse=True)
    total_experts_needed = num_panels * experts_per_panel
    available_experts = len(scores)

    if total_experts_needed > available_experts:
        raise ValueError(f"Not enough experts to create {num_panels} panels with {experts_per_panel} experts each.")

    panels = [[] for _ in range(num_panels)]
    direction = 1  # Forward direction
    panel_index = 0

    for expert in sorted_scores:
        panels[panel_index].append(expert)
        if direction == 1:
            if panel_index < num_panels - 1:
                panel_index += 1
            else:
                direction = -1
                panel_index -= 1
        elif direction == -1:
            if panel_index > 0:
                panel_index -= 1
            else:
                direction = 1
                panel_index += 1

    panel_scores = []
    for i, panel in enumerate(panels):
        avg_skill_score = round(sum(float(e['finalSkillScore']) for e in panel) / len(panel), 2) if panel else 0.0
        avg_approach_score = round(sum(float(e['approachRelevancyScore']) for e in panel) / len(panel), 2) if panel else 0.0
        avg_final_score = round(sum(float(e['finalScore']) for e in panel) / len(panel), 2) if panel else 0.0

        panel_scores.append({
            "panelID": f"Panel_{i+1}",
            "panelInfo": {
                "panelExperts": [{"expertID": e['expertID'], "expertName": e['expertName']} for e in panel],
            },
            "finalSkillScore": float(avg_skill_score),
            "finalApproachScore": float(avg_approach_score),
            "finalScore": float(avg_final_score)
        })

    return panel_scores

# Update expert scores in the database
def update_expert_scores(api_url, scores):
    for score in scores:
        print(score)
        try:
            expert_id = score['_id']
            del score['_id']  

            response = requests.put(f"{api_url}/{expert_id}", json=score)
            if response.status_code == 200:
                print(f"Updated scores for expert {expert_id}.")
            else:
                print(f"Failed to update expert {expert_id}: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"Error updating expert {expert_id}: {e}")


# Update panels in the database
def update_panels_in_db(api_url, panels):
    for panel in panels:
        try:
            # print("Sending payload:", json.dumps(panel, indent=4))
            response = requests.post(api_url, json=panel)
            # print(response.request.body)
            print(panel)
            response = requests.post(api_url, json=panel)
            if response.status_code == 200 or response.status_code == 201:
                print(f"Panel {panel['panelID']} added to the database.")
            else:
                print(f"Failed to add panel {panel['panelID']}: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"Error adding panel {panel['panelID']}: {e}")
            

def assign_candidates_to_panels(panels, candidates, max_candidates_per_panel):
    """
    Assign candidates to panels based on the closest match of final combined scores.
    """
    # Ensure all candidates have 'finalCombinedScoreOutOf100'
    for candidate in candidates:
        if 'finalCombinedScoreOutOf100' not in candidate:
            candidate['finalCombinedScoreOutOf100'] = (
                candidate.get('skillRelevancyScore', {}).get('totalSkillRelevancyScore', 0) +
                candidate.get('approachRelevancyScore', {}).get('totalApproachRelevancyScore', 0)
            )

    # Sort candidates by finalCombinedScoreOutOf100
    sorted_candidates = sorted(
        candidates, key=lambda x: x['finalCombinedScoreOutOf100'], reverse=True
    )

    # Initialize candidates field for all panels if not already present
    for panel in panels:
        if 'candidates' not in panel:
            panel['candidates'] = []

    # Assign candidates to panels
    for candidate in sorted_candidates:
        nearest_panel = None
        smallest_difference = float('inf')

        # Find the panel with the closest finalScore and capacity
        for panel in panels:
            if len(panel['candidates']) < max_candidates_per_panel:
                difference = abs(candidate['finalCombinedScoreOutOf100'] - panel['finalScore'])
                if difference < smallest_difference:
                    smallest_difference = difference
                    nearest_panel = panel

      # Safely retrieve personal details
        personal_details = candidate.get('personalDetails', {})
        name = personal_details.get('name', {})
        first_name = name.get('firstName', '').strip()
        last_name = name.get('lastName', '').strip()

        # Fallback if both names are missing
        candidate_name = f"{first_name} {last_name}".strip() or f"Candidate_{candidate.get('_id', '')}"
        if nearest_panel:
            nearest_panel['candidates'].append({
                'candidateID': candidate.get('_id', ''),
                'candidateName': candidate_name,
                'skillsScore': candidate.get('skillRelevancyScore', {}).get('skills', 0),
                'experienceScore': candidate.get('skillRelevancyScore', {}).get('yearsOfExperience', 0),
                'qualificationScore': candidate.get('skillRelevancyScore', {}).get('qualification', 0),
                'researchScore': candidate.get('skillRelevancyScore', {}).get('researchPapers', 0),
                'projectScore': candidate.get('skillRelevancyScore', {}).get('projects', 0),
                'finalSkillScoreOutOf70': candidate.get('skillRelevancyScore', {}).get('totalSkillRelevancyScore', 0),
                'approachRelevancyScoreOutOf30': candidate.get('approachRelevancyScore', {}).get('totalApproachRelevancyScore', 0),
                'finalCombinedScoreOutOf100': candidate['finalCombinedScoreOutOf100']
            })

    return panels


def update_candidates_in_panels(api_url, panels):
    """
    Update panels with assigned candidates in the database.

    Args:
    - api_url (str): API endpoint for updating panel assignments.
    - panels (list): Updated panels with assigned candidates.
    """
    for panel in panels:
        try:
            response = requests.put(api_url, json=panel)
            # print("Raw Payload Sent:", json.dumps(panel, indent=4))
            print(panel)
            if response.status_code == 200 or response.status_code == 201:
                print(f"Panel {panel['panelID']} updated successfully.")
            else:
                print(f"Failed to update panel {panel['panelID']}: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"Error updating panel {panel['panelID']}: {e}")

# Main function

def main():
    parser = argparse.ArgumentParser(description="Expert Selection and Panel Creation")
    parser.add_argument('--num_panels', type=int, required=True, help='Number of panels to create')
    parser.add_argument('--experts_per_panel', type=int, required=True, help='Number of experts per panel')

    args = parser.parse_args()

    num_panels = args.num_panels
    experts_per_panel = args.experts_per_panel

    job_url = "http://localhost:8000/api/job/all"
    experts_url = "http://localhost:8000/api/expert/all"
    candidates_url = "http://localhost:8000/api/candidate/all"
    add_panels_url = "http://localhost:8000/api/panel/add"
    update_panel_url = "http://localhost:8000/api/panel/update"

    # Fetch job data
    job_response = requests.get(job_url)
    job = job_response.json()['data'][0]

    # Fetch all experts
    experts_response = requests.get(experts_url)
    experts = experts_response.json()

    # Fetch all candidates
    candidates_response = requests.get(candidates_url)
    candidates = candidates_response.json()

    # Select experts based on domain and availability
    selected_experts = select_experts_by_domain(job, experts)

    # Calculate scores for selected experts
    scores = calculate_expert_scores(job, selected_experts)

    # Create balanced panels
    panels = create_balanced_panels(scores, num_panels, experts_per_panel)

    # Update panels in the database
    update_panels_in_db(add_panels_url, panels)

    # Assign candidates to panels
    max_candidates_per_panel = len(candidates) 
    panels_with_candidates = assign_candidates_to_panels(panels, candidates, max_candidates_per_panel)

    # Update panels in the database
    update_candidates_in_panels(update_panel_url, panels_with_candidates)

if __name__ == "__main__":
    main()