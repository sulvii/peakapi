export function extractJwPlayerSources(html: string): string[] {
  const match = html.match(/sources:\s*(\[[^\]]*\{[^\}]*\}[^\]]*\])/);
  
  if (!match) return [];

  try {
    let sourcesStr = match[1];
    
    sourcesStr = sourcesStr?.replace(
      /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
      '$1"$2":'
    );
    
    const sources = JSON.parse(sourcesStr ?? `{ "message": "this shit tough" }`);
    if ('message' in sources) {
        return []
    }
    const shit = sources as { file: string }[]

    return shit.map((shii) => shii.file);
  } catch (e) {
    return [];
  }
}

