import * as dotenv from 'dotenv';
import * as fs from 'fs';

export function dotEnv() {
  const envFileLoadResult = dotenv.config({ path: '.env' });
  if (envFileLoadResult.error) {
    console.error(
      `Error: Could not load environment variables from .env file. ${envFileLoadResult.error}`,
    );
    process.exit(1);
  }

  // Read the contents of the .env-template file
  const envTemplateContent = fs.readFileSync('.env-template', {
    encoding: 'utf-8',
  });

  // Split the content by lines
  const envTemplateLines = envTemplateContent.split('\n');

  // Array to store the missing keys
  const missingKeys: string[] = [];

  // Iterate through the lines
  for (const line of envTemplateLines) {
    // Skip empty lines and comments
    if (line.trim() === '' || line.startsWith('#')) {
      continue;
    }

    // Extract the key and example value
    const [key, example] = line.split('=');

    // Check if the key is present in the environment variables
    if (!process.env[key]) {
      missingKeys.push(`${key} (example: ${example})`);
    }
  }

  // If there are missing keys, display an error message and exit
  if (missingKeys.length > 0) {
    console.error(
      `Error: The following environment variables are not defined:\n${missingKeys.join(
        '\n',
      )}\nPlease set the missing environment variables.`,
    );
    process.exit(1);
  }

  // Return a configuration object instead of calling process.exit()
  return {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PORT: process.env.PORT,
    DOMAIN: process.env.DOMAIN,
    WEB_REDIRECT_URL: process.env.WEB_REDIRECT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    DEVELOPMENT_URL: process.env.DEVELOPMENT_URL,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
  };
}
