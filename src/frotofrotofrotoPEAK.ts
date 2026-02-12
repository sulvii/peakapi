export function unpackObfuscatedCode(code: string): string {
  const evalMatch = code.match(/eval\(function\(p,a,c,k,e,d\)\{[\s\S]+?\}\(([\s\S]+)\)\)/);
  if (!evalMatch) {
    throw new Error("Not an eval-wrapped packed code");
  }

  const arseString = evalMatch[1];

  const argsMatch = arseString?.match(/(['"`])([\s\S]+?)\1,(\d+),(\d+),(['"`])([\s\S]+?)\5\.split\(['"`]\|['"`]\)/);
  if (!argsMatch) {
    throw new Error("Could not parse packed function");
  }

  const [, , p, aStr, cStr, , kStr] = argsMatch;
  const a = parseInt(aStr!, 10);
  const c = parseInt(cStr!, 10);
  const k = kStr?.split("|");

  let result = p;

  for (let i = c - 1; i >= 0; i--) {
    if (k?.[i] && k[i]!.length > 0) {
      const token = i.toString(a);
      const regex = new RegExp(`\\b${token}\\b`, "g");
      result = result?.replace(regex, k[i]!);
    }
  }

  return result!;
}
