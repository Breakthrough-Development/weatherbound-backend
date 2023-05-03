export function envVariables() {
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
