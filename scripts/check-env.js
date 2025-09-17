#!/usr/bin/env node
/**
 * Environment Checker Script
 * Validates environment configuration and shows current settings
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Available environments
const ENVIRONMENTS = ['development', 'staging', 'production'];

// Color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const colorize = (color, text) => `${colors[color]}${text}${colors.reset}`;
const success = (text) => colorize('green', text);
const error = (text) => colorize('red', text);
const warning = (text) => colorize('yellow', text);
const info = (text) => colorize('blue', text);
const highlight = (text) => colorize('cyan', text);

// Parse environment file
const parseEnvFile = (envPath) => {
  if (!existsSync(envPath)) {
    return null;
  }
  
  const content = readFileSync(envPath, 'utf8');
  const env = {};
  
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
};

// Validate environment configuration
const validateEnvironment = (env, envName) => {
  const issues = [];
  const warnings = [];
  
  // Required variables
  const required = ['VITE_API_BASE_URL'];
  required.forEach(key => {
    if (!env[key]) {
      issues.push(`Missing required variable: ${key}`);
    }
  });
  
  // URL validation
  if (env.VITE_API_BASE_URL) {
    try {
      new URL(env.VITE_API_BASE_URL);
    } catch {
      issues.push(`Invalid URL format: VITE_API_BASE_URL`);
    }
  }
  
  // Environment-specific validations
  if (envName === 'production') {
    if (env.VITE_ENABLE_DEBUG_MODE === 'true') {
      warnings.push('Debug mode is enabled in production');
    }
    if (env.VITE_ENABLE_DEV_TOOLS === 'true') {
      warnings.push('Dev tools are enabled in production');
    }
    if (!env.VITE_ANALYTICS_KEY) {
      warnings.push('Analytics key is not set for production');
    }
  }
  
  return { issues, warnings };
};

// Main function
const main = () => {
  console.log(colorize('bold', '🔍 Environment Configuration Checker\n'));
  
  let hasErrors = false;
  
  ENVIRONMENTS.forEach(env => {
    const envPath = join(projectRoot, `.env.${env}`);
    const envConfig = parseEnvFile(envPath);
    
    console.log(colorize('bold', `📁 ${env.toUpperCase()} Environment`));
    console.log(`   File: .env.${env}`);
    
    if (!envConfig) {
      console.log(error('   ❌ File not found\n'));
      hasErrors = true;
      return;
    }
    
    console.log(success('   ✅ File exists'));
    
    // Show key configuration
    console.log(`   API URL: ${highlight(envConfig.VITE_API_BASE_URL || 'Not set')}`);
    console.log(`   Timeout: ${envConfig.VITE_API_TIMEOUT || 'Not set'}ms`);
    console.log(`   Analytics: ${envConfig.VITE_ENABLE_ANALYTICS || 'false'}`);
    console.log(`   Debug: ${envConfig.VITE_ENABLE_DEBUG_MODE || 'false'}`);
    
    // Validate configuration
    const { issues, warnings } = validateEnvironment(envConfig, env);
    
    if (issues.length > 0) {
      hasErrors = true;
      console.log(error('   Issues:'));
      issues.forEach(issue => console.log(error(`   • ${issue}`)));
    }
    
    if (warnings.length > 0) {
      console.log(warning('   Warnings:'));
      warnings.forEach(warning => console.log(warning(`   • ${warning}`)));
    }
    
    if (issues.length === 0 && warnings.length === 0) {
      console.log(success('   ✅ Configuration is valid'));
    }
    
    console.log('');
  });
  
  // Check for .env.local
  const localEnvPath = join(projectRoot, '.env.local');
  if (existsSync(localEnvPath)) {
    console.log(info('📌 Local Override (.env.local) detected'));
    const localEnv = parseEnvFile(localEnvPath);
    if (localEnv.VITE_API_BASE_URL) {
      console.log(`   Overriding API URL: ${highlight(localEnv.VITE_API_BASE_URL)}`);
    }
    console.log('');
  }
  
  // Show usage instructions
  console.log(colorize('bold', '📋 Available Commands:'));
  console.log(`   ${highlight('pnpm dev')}              - Development mode`);
  console.log(`   ${highlight('pnpm dev:prod')}         - Development with production config`);
  console.log(`   ${highlight('pnpm build')}            - Production build`);
  console.log(`   ${highlight('pnpm build:dev')}        - Development build`);
  console.log(`   ${highlight('pnpm build:staging')}    - Staging build`);
  console.log(`   ${highlight('pnpm env:switch <env>')} - Switch environment`);
  console.log('');
  
  if (hasErrors) {
    console.log(error('❌ Environment configuration has errors. Please fix them before proceeding.'));
    process.exit(1);
  } else {
    console.log(success('✅ All environment configurations are valid!'));
  }
};

main();