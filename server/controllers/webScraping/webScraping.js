const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const invokeLambda = async function invokeLambda() {
  // Create a Lambda client
  const client = new LambdaClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIA5FTY6TRFR6D5FGGT", // Replace with your Access Key ID
      secretAccessKey: "CeKQuFB7wteuuEwPVz/mf6fqACOMyUK7Yx9KITmO", // Replace with your Secret Access Key
    },
  });

  // Define the query
  const query = `
        Give me the list of all the faculties in the following format:

        {
          "personalDetails": {
            "name": {
              "firstName": "",
              "middleName": "",
              "lastName": ""
            }
          },
          "fieldOfExpertise": {
            "domain": "",
            "designation": "",
            "skills": [],
            "yearsOfExperience": "",
            "qualifications": [
              {
                "degree": "",
                "institution": "",
                "yearOfCompletion": ""
              }
            ],
            "projects": [
              {
                "title": "",
                "description": "",
                "skillsGained": []
              }
            ],
            "publications": [
              {
                "title": "",
                "link": "",
                "year": "",
                "skills": []
              }
            ]
          }
        }

        Make sure to follow this exact format with the exact key names. If some data is not present, you have to assume it properly. The assumed data should be precise and to the point.
    `;

  // Prepare the InvokeCommand
  const command = new InvokeCommand({
    FunctionName: "bedrock-scrapper",
    Payload: JSON.stringify({
      url: "https://nitdelhi.irins.org/searchc/search",
      query: query,
    }),
  });

  try {
    // Invoke the Lambda function
    const response = await client.send(command);

    // Parse and pretty-print the response payload
    const responsePayload = Buffer.from(response.Payload).toString();
    const parsedPayload = JSON.parse(responsePayload);

    console.log("Lambda response (pretty-printed):");
    console.log(JSON.stringify(parsedPayload, null, 2)); // Pretty-print with 2 spaces indentation
  } catch (error) {
    console.error("Error invoking Lambda:", error);
  }
};

module.exports = { invokeLambda };
