interface VoeSource {
  direct_access_url?: string;
}

interface VoeDecodedData {
  direct_access_url?: string;
  source?: VoeSource[];
}

type DecoderStep = (input: string) => string;

function voeExtractor(html: string): string | null {
  const jsonScriptMatch = html.match(
    /<script[^>]+type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i
  );

  if (!jsonScriptMatch) {
    return null;
  }

  const obfuscatedJson = jsonScriptMatch[1]?.trim();
  if (!obfuscatedJson) throw new Error('Error while extracting.');
  const data = parseInitialJson(obfuscatedJson);

  if (!isValidObfuscatedFormat(data)) {
    throw new Error("Input doesn't match expected format");
  }

  const obfuscatedString = data[0];
  const decodedData = decodeObfuscatedString(obfuscatedString);

  return extractStreamUrl(decodedData);
}

function parseInitialJson(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid JSON input');
  }
}

function isValidObfuscatedFormat(data: unknown): data is [string, ...unknown[]] {
  return Array.isArray(data) && typeof data[0] === 'string';
}

function decodeObfuscatedString(obfuscatedString: string): VoeDecodedData {
  const decodingPipeline: DecoderStep[] = [
    voeRot13,
    voeRemovePatterns,
    voeBase64Decode,
    str => voeShiftChars(str, 3),
    str => str.split('').reverse().join(''),
    voeBase64Decode,
  ];

  const decodedString = decodingPipeline.reduce((result, step) => step(result), obfuscatedString);

  return parseFinalJson(decodedString);
}

function parseFinalJson(jsonString: string): VoeDecodedData {
  try {
    const parsed: unknown = JSON.parse(jsonString);
    return parsed as VoeDecodedData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Final JSON parse error: ${errorMessage} 🚨`);
  }
}

function extractStreamUrl(data: VoeDecodedData): string | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const streamUrl =
    data.direct_access_url ||
    data.source?.map(source => source.direct_access_url).find(url => url && url.startsWith('http'));

  if (streamUrl) {
    return streamUrl;
  } else {
    return null;
  }
}

function voeRot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

function voeRemovePatterns(str: string): string {
  const patterns = ['@$', '^^', '~@', '%?', '*~', '!!', '#&'] as const;

  return patterns.reduce((result, pattern) => result.split(pattern).join(''), str);
}

function voeBase64Decode(str: string): string {
  if (typeof atob === 'function') {
    return atob(str);
  }

  return Buffer.from(str, 'base64').toString('utf-8');
}

function voeShiftChars(str: string, shift: number): string {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('');
}

export const VoeExtractor = {
  getSources: (html: string) => voeExtractor(html),
};