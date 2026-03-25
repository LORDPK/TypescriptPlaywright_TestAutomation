import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '../../.env.qa')
});

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface EnvironmentConfig {
  browser: BrowserName;
  headless: boolean;
  baseUrl: string;
}

// 
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

export function loadConfig(): EnvironmentConfig {
  return {
    browser: (process.env.BROWSER as BrowserName) || 'chromium',
    headless: process.env.HEADLESS === 'true',
    baseUrl: getEnvVariable('BASE_URL')
  };
}