const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const loadAllYamlsFromDirectory = (directoryPath) => {
    const swaggerDocs = {};

    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    // Filter YAML files
    const yamlFiles = files.filter(file => path.extname(file).toLowerCase() === '.yaml');

    // Load each YAML file
    yamlFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const key = path.basename(file, '.yaml'); // Use file name without extension as key
        swaggerDocs[key] = yaml.load(fs.readFileSync(filePath, 'utf8'));
    });
    return swaggerDocs;
};

const swaggerDocsAll = loadAllYamlsFromDirectory('./swagger code');

module.exports = {
    swaggerUi,
    ...swaggerDocsAll // Spread all loaded YAMLs
};