// script.js

document.addEventListener('DOMContentLoaded', function() {
    const translateButton = document.getElementById('translate-button');

    translateButton.addEventListener('click', async function() {
        const userText = document.getElementById('user-text').value;
        const selectedLanguage = document.getElementById('language').value;

        try {
            const translation = await translateText(userText, selectedLanguage);
            document.getElementById('translated-text').value = translation;
        } catch (error) {
            console.error('Error translating text:', error);
            alert('Error translating text. Please try again later.');
        }
    });

    async function translateText(text, language) {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                language: language
            })
        });

        if (!response.ok) {
            throw new Error('Failed to translate text');
        }

        const data = await response.json();
        return data.translatedText;
    }
});
