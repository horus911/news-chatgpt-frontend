const backendUrl = 'https://news-chatgpt-backend.onrender.com'; // ← remplace par ton URL Render

document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value.trim();
  if (!text) {
    alert('Please enter some text to summarize.');
    return;
  }

  document.getElementById('summary').textContent = 'Loading...';

  try {
    const response = await fetch(`${backendUrl}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    document.getElementById('summary').textContent = data.summary || 'No summary returned.';
  } catch (err) {
    document.getElementById('summary').textContent = 'Error: ' + err.message;
  }
});
