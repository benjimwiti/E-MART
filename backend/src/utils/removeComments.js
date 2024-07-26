import fs from 'fs'
import path from 'path'

// Function to remove comments from a file
function removeComments(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to match single-line and multi-line comments
    const cleanedContent = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

    fs.writeFileSync(filePath, cleanedContent, 'utf8');
    console.log(`Removed comments from ${filePath}`);
}

// Example usage
const filePath = path.resolve(__dirname, 'yourFile.js');
removeComments(filePath);
