export function isValidJSON(str: string): boolean {
  try {
    const object = JSON.parse(str);
    if (object && typeof object === 'object') return true;
    return false;
  } catch (error) {
    return false;
  }
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}
