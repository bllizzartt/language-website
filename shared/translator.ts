// translator.ts

import { gptPrompt } from "./openai.ts"; // Assuming you have a function to interact with GPT API

// Function to translate English text to Chinese
export async function translateToChinese(text: string): Promise<string> {
    // Construct the prompt for translation
    const prompt = `Translate the following English text to Chinese:\n"${text}"\n\nTranslation:"`;

    try {
        // Call the function to generate GPT prompt
        const translatedText = await gptPrompt(prompt);
        return translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        throw new Error('Failed to translate text');
    }
}
