const fs = require('fs');
const path = require('path');

const mdDir = 'C:\\Users\\Admin\\Documents\\CSF-React\\src\\content\\resources';
const outputFile = 'C:\\Users\\Admin\\Documents\\CSF-React\\src\\data\\resources.ts';

// Read all .md files
const mdFiles = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
const resources = [];

console.log(`Found ${mdFiles.length} .md files\n`);

mdFiles.forEach(file => {
  let content = fs.readFileSync(path.join(mdDir, file), 'utf8');
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const id = file.replace('.md', '');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`  ✗ No frontmatter: ${file}`);
    return;
  }
  
  const frontmatter = frontmatterMatch[1];
  
  // Extract title
  const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  
  // Extract image
  const imageMatch = frontmatter.match(/image:\s*"([^"]*)"/);
  const image = imageMatch ? imageMatch[1] : '';
  
  // Extract externalLink
  const linkMatch = frontmatter.match(/externalLink:\s*"([^"]*)"/);
  const externalLink = linkMatch ? linkMatch[1] : '';
  
  // Extract category
  const categoryMatch = frontmatter.match(/category:\s*"([^"]*)"/);
  const category = categoryMatch ? categoryMatch[1] : 'General';
  
  // Extract tags
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
  let tags = [];
  if (tagsMatch) {
    const tagsStr = tagsMatch[1];
    tags = tagsStr.match(/"[^"]+"/g)?.map(t => t.slice(1, -1)) || [];
  }
  
  resources.push({
    id,
    title,
    cardImage: image,
    externalLink,
    category,
    tags
  });
  
  console.log(`  ✓ ${id}: ${title}`);
});

// Sort by title
resources.sort((a, b) => a.title.localeCompare(b.title));

// Generate TypeScript file
let tsContent = `// src/data/resources.ts
// Auto-generated from .md files

export interface Resource {
  id: string;
  title: string;
  cardImage: string;
  externalLink: string;
  category: string;
  tags: string[];
}

export const resources: Resource[] = [
`;

resources.forEach((r, i) => {
  const tagsStr = r.tags.map(t => `"${t}"`).join(', ');
  tsContent += `  {
    id: '${r.id}',
    title: '${r.title.replace(/'/g, "\\'")}',
    cardImage: '${r.cardImage}',
    externalLink: '${r.externalLink}',
    category: '${r.category}',
    tags: [${tagsStr}]
  }${i < resources.length - 1 ? ',' : ''}
`;
});

tsContent += `];
`;

fs.writeFileSync(outputFile, tsContent);

console.log(`\n=== Complete ===`);
console.log(`Generated ${outputFile} with ${resources.length} resources`);
