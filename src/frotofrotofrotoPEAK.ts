export function unpackObfuscatedCode(code: string): string {
  const evalMatch = code.match(/eval\((.*)\)$/s);
  if (!evalMatch) {
    throw new Error("Not an eval-wrapped packed code");
  }

  const funcCall = evalMatch[1];
  const funcMatch = funcCall?.match(
    /function\(p,a,c,k,e,d\)\{[^}]+\}\('(.+)',(\d+),(\d+),'(.+?)'\.split\('\|'\)\)/s
  );

  if (!funcMatch) {
    throw new Error("Could not parse packed function");
  }

  const [, p, radix, count, keywords] = funcMatch;
  const a = parseInt(radix!, 10);
  const c = parseInt(count!, 10);
  const k = keywords?.split("|");

  let result = p;

  for (let i = c - 1; i >= 0; i--) {
    if (k?.[i!] && k[i]!.length > 0) {
      const token = i.toString(a);
      const regex = new RegExp(`\\b${token}\\b`, "g");
      result = result?.replace(regex, k[i]!);
    }
  }

  return result!;
}
