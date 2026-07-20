const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'data', 'portfolio');
const outFile = path.join(__dirname, '..', 'data', 'portfolio.json');

// Read individual project files
const projects = [];
if (fs.existsSync(portfolioDir)) {
    const files = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const content = fs.readFileSync(path.join(portfolioDir, file), 'utf-8');
        try {
            const project = JSON.parse(content);
            projects.push(project);
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    }
}

// Sort by date (newest first)
projects.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

// Write combined file
fs.writeFileSync(outFile, JSON.stringify({ projects }, null, 2));
console.log(`✅ Built portfolio.json — ${projects.length} projects`);
