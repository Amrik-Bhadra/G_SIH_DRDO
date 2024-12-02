import json
import requests
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

# Calculate scores for experts
def calculate_expert_scores(job, experts):
    job_skills = job['preferredSkills']
    job_qualification = job['minimumQualifications']
    max_experience = max(expert['fieldOfExpertise']['yearsOfExperience'] for expert in experts)

    scores = []
    for expert in experts:
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
            "_id": expert['_id'],
            "skillRelevancyScore": {
                "skills": skills_score,
                "yearsOfExperience": round(experience_score, 2),
                "qualifications": qualification_score,
                "researchPapers": research_score,
                "projects": project_score,
                "totalSkillRelevancyScore": final_skill_score
            },
            "approachRelevancyScore": {
                "problemSolving": approach_scores.get("problemSolving", 0),
                "collaboration": approach_scores.get("collaboration", 0),
                "decisionMaking": approach_scores.get("decisionMaking", 0),
                "creativity": approach_scores.get("creativity", 0),
                "analyticalDepth": approach_scores.get("analyticalDepth", 0),
                "totalApproachRelevancyScore": total_approach_relevancy
            },
            "finalScore": final_combined_score
        })

    return scores

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



# Main function
def main():
    job_url = "http://localhost:8000/api/job/all"  # Job API URL
    experts_url = "http://localhost:8000/api/expert/all"  # Experts API URL
    update_url = "http://localhost:8000/api/expert/update"  # Expert update API URL

    # Fetch job data
    job_response = requests.get(job_url)
    job = job_response.json()['data'][0]

    # Fetch expert data
    experts_response = requests.get(experts_url)
    experts = experts_response.json()

    # Calculate scores
    scores = calculate_expert_scores(job, experts)

    # Update scores in the database
    update_expert_scores(update_url, scores)

if __name__ == "__main__":
    main()