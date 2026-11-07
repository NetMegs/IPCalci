import type { CaseInsensitiveDictionary } from './types.js';
/**
 * Represents comprehensive IPv6 network and addressing details.
 */
export declare class IPv6Info {
    ipAddress: string;
    expandedIpAddress: string;
    networkAddress: string;
    expandedNetworkAddress: string;
    prefixLength: number;
    prefixNetmask: string;
    firstUsableIp: string;
    lastUsableIp: string;
    usableHostRange: string;
    totalHosts: bigint;
    usableHosts: bigint;
    ipType: string;
    reverseDnsPointer: string;
    binaryIp: string;
    hexIp: string;
    get cidrNotation(): string;
    get cidrNetwork(): string;
    toDictionary(): CaseInsensitiveDictionary;
    ToDictionary(): CaseInsensitiveDictionary;
    toList(withLabels?: boolean): string[];
    ToList(withLabels?: boolean): string[];
}
/**
 * Parses an IPv6 address string and optional integer prefix length into a strongly-typed IPv6Info object.
 */
export declare function parseIPv6Info(ip: string, prefixLength?: number | string | null): IPv6Info;
/**
 * Parses an IPv6 address string (e.g. "2001:db8::1/64" or "[2001:db8::1]/64")
 * and returns a dictionary of IPv6 network details.
 */
export declare function parseIPv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary;
export declare const ParseIPv6: typeof parseIPv6;
export declare const parseIpv6: typeof parseIPv6;
export declare const ParseIpv6: typeof parseIPv6;
export declare const ParseIPv6Info: typeof parseIPv6Info;
//# sourceMappingURL=ipv6.d.ts.map