import * as fs from 'fs';
import * as path from 'path';

const replacements: Record<string, string> = {
  '#0A0A0A': '#0F0F11', // Background -> Very dark gray
  '#E2E8F0': '#F3F4F6', // Text -> Off-white
  '#10B981': '#F97316', // Accent -> Orange
  '#1E293B': '#1F2937', // Mid -> Gray-800
  '#334155': '#4B5563', // Dim -> Gray-600
  '#3B82F6': '#8B5CF6', // Electric -> Purple
};

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldColor, newColor] of Object.entries(replacements)) {
    const regex = new RegExp(oldColor, 'gi');
    if (regex.test(content)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
