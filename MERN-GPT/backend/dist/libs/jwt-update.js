import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
// Function to generate a new JWT secret token
function generateJWTSecret() {
    return crypto.randomBytes(64).toString('hex'); // Generate a random 64-byte hexadecimal string
}
// Get the directory name of the current module
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// Path to your TypeScript configuration file
const configFilePath = path.join(__dirname, 'config.ts');
// Function to update the JWT secret in the TypeScript configuration file
async function updateJWTSecret(newSecret) {
    try {
        // Read the existing TypeScript configuration file
        const data = await fs.readFile(configFilePath, 'utf8');
        // Use a regex to replace the existing JWT secret with the new one
        const updatedData = data.replace(/jwtSecret:\s*'[^']*'/, `jwtSecret: '${newSecret}'`);
        // Write the updated configuration back to the file
        await fs.writeFile(configFilePath, updatedData, 'utf8');
        console.log('JWT secret token updated successfully!');
        // You might need to restart your application or recompile TypeScript here
    }
    catch (err) {
        console.error('Error updating config file:', err);
    }
}
// Generate a new JWT secret token and update the configuration file
const newJWTSecret = generateJWTSecret();
updateJWTSecret(newJWTSecret);
//# sourceMappingURL=jwt-update.js.map