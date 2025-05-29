const backendUrl = "https://news-chatgpt-backend.onrender.com/api/summarize";

document.getElementById("summaryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputText = document.getElementById("newsInput").value;
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "Loading...";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: inputText })
    });

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();
    resultDiv.textContent = data.summary;
  } catch (error) {
    console.error("Error:", error);
    resultDiv.textContent = "Error summarizing the text.";
  }
});
