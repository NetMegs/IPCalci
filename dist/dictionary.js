"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaseInsensitiveDictionary = createCaseInsensitiveDictionary;
/**
 * Creates a dictionary proxy that supports case-insensitive and relaxed alias lookups
 * while retaining full compatibility with standard property access and iteration.
 */
function createCaseInsensitiveDictionary(data) {
    const lowerMap = new Map();
    const strippedMap = new Map();
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
        get(key) {
            if (typeof key !== 'string')
                return undefined;
            if (key in data)
                return data[key];
            const lower = key.toLowerCase();
            if (lowerMap.has(lower))
                return data[lowerMap.get(lower)];
            const stripped = lower.replace(/[\s_-]/g, '');
            if (strippedMap.has(stripped))
                return data[strippedMap.get(stripped)];
            return undefined;
        },
        has(key) {
            if (typeof key !== 'string')
                return false;
            if (key in data)
                return true;
            const lower = key.toLowerCase();
            if (lowerMap.has(lower))
                return true;
            const stripped = lower.replace(/[\s_-]/g, '');
            return strippedMap.has(stripped);
        },
        ContainsKey(key) {
            return this.has(key);
        },
        containsKey(key) {
            return this.has(key);
        },
        entries() {
            return Object.entries(data);
        },
        keys() {
            return Object.keys(data);
        },
        values() {
            return Object.values(data);
        }
    };
    return new Proxy(data, {
        get(target, prop, receiver) {
            if (typeof prop === 'string') {
                if (prop in helperMethods) {
                    return helperMethods[prop];
                }
                if (prop in target) {
                    return target[prop];
                }
                const lower = prop.toLowerCase();
                if (lowerMap.has(lower)) {
                    return target[lowerMap.get(lower)];
                }
                const stripped = lower.replace(/[\s_-]/g, '');
                if (strippedMap.has(stripped)) {
                    return target[strippedMap.get(stripped)];
                }
            }
            return Reflect.get(target, prop, receiver);
        },
        has(target, prop) {
            if (typeof prop === 'string') {
                if (prop in helperMethods)
                    return true;
                if (prop in target)
                    return true;
                const lower = prop.toLowerCase();
                if (lowerMap.has(lower))
                    return true;
                const stripped = lower.replace(/[\s_-]/g, '');
                if (strippedMap.has(stripped))
                    return true;
            }
            return Reflect.has(target, prop);
        }
    });
}
//# sourceMappingURL=dictionary.js.map