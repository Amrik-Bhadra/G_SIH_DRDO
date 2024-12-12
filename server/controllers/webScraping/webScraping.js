const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const axios = require("axios");

const invokeLambde = async (req, res) => {
  const { url } = req.body;
  // Create a Lambda client
  const client = new LambdaClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIA5FTY6TRFR6D5FGGT", // Replace with your Access Key ID
      secretAccessKey: "CeKQuFB7wteuuEwPVz/mf6fqACOMyUK7Yx9KITmO", // Replace with your Secret Access Key
    },
  });

  const query = `
      Give me the list of all the faculties in the following format ...
  `;

  const command = new InvokeCommand({
    FunctionName: "bedrock-scrapper",
    Payload: JSON.stringify({
      url,
      query,
    }),
  });

  try {
    const response = await client.send(command);
    const responsePayload = Buffer.from(response.Payload).toString();
    const parsedPayload = JSON.parse(responsePayload);

    console.log("Lambda response (pretty-printed):");
    const dt = parsedPayload.body; // Adjust if needed
    const wholeData = dt;
    console.log("this is the wholedata: ", parsedPayload);
    try {
      const sendDataToExpertsDB = await axios.post(
        "http://127.0.0.1:8000/api/mlr/e_bulk",
        { data: wholeData },
        { withCredentials: true }
      );

      if (sendDataToExpertsDB.status === 200) {
        console.log("Data successfully scraped and sent to the database.");
        return {
          message: "Successfully scraped and inserted into the database",
          success: true,
        };
      }
    } catch (err) {
      console.error("Error posting data to the database:", err);
      return {
        message: "Unable to make a scrapping request",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error invoking Lambda:", error);
    throw new Error("Lambda invocation failed");
  }
};

module.exports = {
  invokeLambde,
};
