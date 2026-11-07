import type { CaseInsensitiveDictionary } from './types.js';

/**
 * Creates a dictionary proxy that supports case-insensitive and relaxed alias lookups
 * while retaining full compatibility with standard property access and iteration.
 */
export function createCaseInsensitiveDictionary(
  data: Record<string, string>
): CaseInsensitiveDictionary {
  const lowerMap = new Map<string, string>();
  const strippedMap = new Map<string, string>();

  for (const key of Object.keys(data)) {
    const lower = key.toLowerCase();
    if (!lowerMap.has(lower)) {
      lowerMap.set(lower, key);
    }
    const stripped = lower.replace(/[\s_-]/g, '');
    if (!strippedMap.has(stripped)) {
      strippedMap.set(stripped, key);
    }
  }

  const helperMethods = {
    get(key: string): string | undefined {
      if (typeof key !== 'string') return undefined;
      if (key in data) return data[key];
      const lower = key.toLowerCase();
      if (lowerMap.has(lower)) return data[lowerMap.get(lower)!];
      const stripped = lower.replace(/[\s_-]/g, '');
      if (strippedMap.has(stripped)) return data[strippedMap.get(stripped)!];
      return undefined;
    },
    has(key: string): boolean {
      if (typeof key !== 'string') return false;
      if (key in data) return true;
      const lower = key.toLowerCase();
      if (lowerMap.has(lower)) return true;
      const stripped = lower.replace(/[\s_-]/g, '');
      return strippedMap.has(stripped);
    },
    ContainsKey(key: string): boolean {
      return this.has(key);
    },
    containsKey(key: string): boolean {
      return this.has(key);
    },
    entries(): [string, string][] {
      return Object.entries(data);
    },
    keys(): string[] {
      return Object.keys(data);
    },
    values(): string[] {
      return Object.values(data);
    }
  };

  return new Proxy(data as any, {
    get(target, prop, receiver) {
      if (typeof prop === 'string') {
        if (prop in helperMethods) {
          return (helperMethods as any)[prop];
        }
        if (prop in target) {
          return target[prop];
        }
        const lower = prop.toLowerCase();
        if (lowerMap.has(lower)) {
          return target[lowerMap.get(lower)!];
        }
        const stripped = lower.replace(/[\s_-]/g, '');
        if (strippedMap.has(stripped)) {
          return target[strippedMap.get(stripped)!];
        }
      }
      return Reflect.get(target, prop, receiver);
    },
    has(target, prop) {
      if (typeof prop === 'string') {
        if (prop in helperMethods) return true;
        if (prop in target) return true;
        const lower = prop.toLowerCase();
        if (lowerMap.has(lower)) return true;
        const stripped = lower.replace(/[\s_-]/g, '');
        if (strippedMap.has(stripped)) return true;
      }
      return Reflect.has(target, prop);
    }
  }) as CaseInsensitiveDictionary;
}
