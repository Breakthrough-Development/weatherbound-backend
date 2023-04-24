import * as dotenv from "dotenv";

export function dotEnv() {
  const envFileLoadResult = dotenv.config({ path: '.env' });
  if (envFileLoadResult.error) {
    console.error(`Error: Could not load environment variables from .env file. ${envFileLoadResult.error}`);
    process.exit(1);
  }

  //todo: fix bug: const envTemplate = dotenv.config({ path: '.env-template' }); is loading in the template variables so there is nocase when the error will load
  // check that all the .env are there and give an example input based on the .env-template
  const envTemplate = dotenv.config({ path: '.env-template' });
  let requiredEnvVars: {key: string, example: string}[] = []
  for (const key in envTemplate.parsed){
    requiredEnvVars.push({key, example: envTemplate.parsed[key]})
  }
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar.key]) {
      console.error(`Error: ${envVar.key} environment variable is not defined. Please set the ${envVar.key} environment variable to a value. For example: ${envVar.example}`);
      process.exit(1);
    }
  }
}
