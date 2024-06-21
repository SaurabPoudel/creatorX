export default function flattenColorPalette(colors: any) {
  const result: { [key: string]: string } = {};

  function flatten(prefix: string, obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flatten(`${prefix}-${key}`, obj[key]);
      } else {
        result[`${prefix}-${key}`] = obj[key];
      }
    }
  }

  flatten("", colors);
  return result;
}
