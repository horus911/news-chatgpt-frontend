const backendUrl = 'https://news-chatgpt-backend.onrender.com/api/summarize';

async function summarize(text) {
  if (!text.trim()) {
    alert("Merci de saisir un texte !");
    return;
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Erreur réseau: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById('result').textContent = data.summary || 'Pas de résumé obtenu.';
  } catch (error) {
    document.getElementById('result').textContent = 'Erreur : ' + error.message;
    console.error(error);
  }
}

document.getElementById('submit-btn').addEventListener('click', () => {
  const inputText = document.getElementById('input-text').value;
  summarize(inputText);
});

