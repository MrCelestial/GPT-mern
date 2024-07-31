import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
// Function to generate a new JWT secret token
function generateJWTSecret() {
    return crypto.randomBytes(64).toString('hex'); // Generate a random 64-byte hexadecimal string
}
// Path to your configuration file
const configFilePath = path.join(__dirname, 'tsconfig.json');
// Function to update the JWT secret in the configuration file
function updateJWTSecret(newSecret) {
    // Read the existing configuration
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            return;
        }
        // Parse the configuration file
        let config;
        try {
            config = JSON.parse(data);
        }
        catch (parseError) {
            console.error('Error parsing config file:', parseError);
            return;
        }
        // Update the JWT secret token
        config.jwtSecret = newSecret;
        // Write the updated configuration back to the file
        fs.writeFile(configFilePath, JSON.stringify(config, null, 2), 'utf8', (writeError) => {
            if (writeError) {
                console.error('Error writing config file:', writeError);
                return;
            }
            console.log('JWT secret token updated successfully!');
            // You might need to restart your application here
        });
    });
}
// Generate a new JWT secret token and update the configuration file
const newJWTSecret = generateJWTSecret();
updateJWTSecret(newJWTSecret);
//# sourceMappingURL=jwt-updater.js.map