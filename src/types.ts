export interface CaseInsensitiveDictionary {
  /**
   * Retrieves a value by key (case-insensitive and relaxed alias support).
   */
  get(key: string): string | undefined;

  /**
   * Checks whether the key exists (case-insensitive).
   */
  has(key: string): boolean;

  /**
   * Alias for `has` matching .NET `Dictionary.ContainsKey`.
   */
  ContainsKey(key: string): boolean;

  /**
   * Alias for `has`.
   */
  containsKey(key: string): boolean;

  /**
   * Returns all key-value entries in the dictionary.
   */
  entries(): [string, string][];

  /**
   * Returns all keys.
   */
  keys(): string[];

  /**
   * Returns all values.
   */
  values(): string[];

  [key: string]: any;
}
