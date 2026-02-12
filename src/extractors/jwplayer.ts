export function extractJwPlayerSources(html: string): string[] {
  const match = html.match(/sources:\s*(\[[^\]]*\{[^\}]*\}[^\]]*\])/);
  
  if (!match) return [];

  try {
    let sourcesStr = match[1];
    
    sourcesStr = sourcesStr?.replace(
      /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
      '$1"$2":'
    );
    
    return JSON.parse(sourcesStr ?? `{ "message": "this shit tough" }`);
  } catch (e) {
    return [];
  }
}

