// main.ts

import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
import { translateToChinese } from "./shared/translator.ts"; // Assuming you have a translator function
import { gptPrompt } from "./shared/openai.ts"; // Assuming you have a function to interact with GPT API

const app = new Application();
const router = new Router();

// Static server route
router.get("/", async (ctx: Context) => {
  // Render your HTML page here

  // Read the contents of index.html
  const htmlFile = await Deno.readTextFile("./public/index.html");

  ctx.response.body = htmlFile;
});

// Handle POST requests for GPT prompt
router.post("/gpt", async (ctx: Context) => {
  const requestBody = await ctx.request.body().value;
  const prompt = requestBody.prompt;

  // Call the function to generate GPT prompt
  const response = await gptPrompt(prompt);

  ctx.response.body = response;
});

// Handle POST requests for translation
router.post("/translate", async (ctx: Context) => {
  const requestBody = await ctx.request.body().value;
  const text = requestBody.text;
  const language = requestBody.language;

  // Call the translation function
  const translatedText = await translateText(text, language);

  ctx.response.body = { translatedText };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
console.log(`Server listening on port ${PORT}`);

await app.listen({ port: PORT });
