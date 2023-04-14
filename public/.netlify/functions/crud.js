const axios = require("axios");

const githubApiUrl = "https://api.github.com";
const repoPath = "your-github-username/your-repo-name";
const filePath = "users.json";
const token = "your-github-personal-access-token";

exports.handler = async (event) => {
  const { httpMethod, body } = event;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getFile = async () => {
    const res = await axios.get(`${githubApiUrl}/repos/${repoPath}/contents/${filePath}`, {
      headers,
    });
    return res.data;
  };

  const updateFile = async (content) => {
    const file = await getFile();
    const updatedContent = Buffer.from(content).toString("base64");
    await axios.put(
      `${githubApiUrl}/repos/${repoPath}/contents/${filePath}`,
      {
        message: "Update users.json",
        content: updatedContent,
        sha: file.sha,
      },
      {
        headers,
      }
    );
  };

  if (httpMethod === "GET") {
    const file = await getFile();
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return {
      statusCode: 200,
      body: content,
    };
  } else if (httpMethod === "POST" || httpMethod === "PUT" || httpMethod === "DELETE") {
    const users = JSON.parse(body);

    await updateFile(JSON.stringify(users));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Users updated successfully" }),
    };
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};
