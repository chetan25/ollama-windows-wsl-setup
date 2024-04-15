// import ollama from "ollama";
// import { Ollama } from "@langchain/community/llms/ollama";

// const ollama = new Ollama({
//   // baseUrl: "http://api.example.com",
//   model: "llama2",
// });

// const stream = await ollama.stream(
//   `Translate "I love programming" into German.`
// );
// const chunks = [];
// for await (const chunk of stream) {
//   //   chunks.push(chunk);
//   console.log(chunk);
// }

// console.log(chunks.join(""));
// const response = await ollama.chat({
//   model: "llama2",
//   messages: [{ role: "user", content: "Why is the sky blue?" }],
// });
// console.log(response.message.content);

// const response = await ollama.generate({
//   // baseUrl: "http://localhost:11434/api/generate",
//   model: "llama2",
//   prompt: "Why is the sky blue?",
// });
// console.log(response);

import { Ollama } from "@langchain/community/llms/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// deepseek-coder
const ollama = new Ollama({
  // baseUrl: "http://localhost:11434", // Default value
  // model: "llama2", // Default value
  // model: "deepseek-coder",
  model: "codellama:7b",
});

async function main() {
  const rl = readline.createInterface({ input, output });

  const question = await rl.question("What is your question: \n");

  // console.log(`Thank you for your valuable feedback: ${question}`);
  console.log({ question });
  const stream = await ollama.stream(question);

  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
  rl.close();
}

// main();

const code = `
function addTwoNumbers(a, b) { return  a - b };
`;

const promptTemplate = PromptTemplate.fromTemplate(
  "You are an expert coder, re-write the provided code, and fix the error and add any missing input validation \n ${code}. \n Output should only contain code and no comments or resoning."
);

const chain = promptTemplate.pipe(ollama);

const result = await chain.invoke({ code });

// const answer = await ollama.invoke(``);
console.log({ result });
