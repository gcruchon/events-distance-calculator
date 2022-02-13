import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const getDockerSecret = (secretName) => {
    const secret = readFileSync(`/run/secrets/${secretName}_FILE`, 'utf8');
    logger.debug('getDockerSecret', secretName);
    return secret;
};

export const getSecret = (secretName) => {
    try {
        return getDockerSecret(secretName);
    } catch (err) {
        return process.env[secretName];
    }
};
