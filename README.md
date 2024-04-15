# Ollama Basic Setup

Ollama is open source large language model, that can be run locally.

## For Windows

- We can either use the
  - Windows Subsystem for Linux (WSL).
  - The new window [preview](https://ollama.com/download/windows) ollama.
  - Ollama Docker image

### WSL

Windows Subsystem for Linux (WSL) is a feature of Windows that allows you to run a Linux environment on your Windows machine, without the need for a separate virtual machine or dual booting.

- To check if you already have a linux distribution running `Open powershell` and run the following command.

```bash
  wsl -l -v
```

- This will output either a empty list or the list of distribution running on your machine.

- Before installing you can check what version of different distributions are valaibale by running

```bash
  wsl --list --online
```

- Now you can install the default distribution, for Linux, which is Ubuntu by running

```bash
  wsl --install
```

- This command will enable the features necessary to run WSL and install the Ubuntu distribution of Linux.
- If you want to install a different distribution you can run

```bash
 wsl --install -d <DistroName>
```

## Ollama installation

- Now we can install Ollama following the Linux installation guidlines, and run

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

- This will install Ollama in the Linux distribution.
- We can verify this by either
  - Opening the Powershell and than switching into the distribution by entering the distribution name `ubuntu` and hitting enter. This will switch the poweshell prompt into the Ubunto prompt and we can run `ollama --version` to check the version.
  - Or we can use the VSCODE inbuilt terminal to open the powershell and run `ollama --version`

### Running Ollama

- Now we can run ollama locally from the ubuntu distribution by first pulling a model and then runnig the ollaman server.

```bash
# pull llama2 locally
ollama pull llama2

# run ollama server, which can be used by the python or node code
ollama serve
```

- Sample node js code to run ollama using langchain locally

```js
import { Ollama } from "@langchain/community/llms/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2", // Default value
});

const code = `
function addTwoNumbers(a, b) { return  a - b };
`;

const promptTemplate = PromptTemplate.fromTemplate(
  "You are an expert coder, re-write the provided code, and fix the error and add any missing input validation \n ${code}. \n Output should only contain code and no comments or resoning."
);

const chain = promptTemplate.pipe(ollama);

const result = await chain.invoke({ code });

console.log({ result });
```
