import type { CaseInsensitiveDictionary } from './types.js';
/**
 * Represents comprehensive IPv4 network and addressing details.
 */
export declare class IPv4Info {
    ipAddress: string;
    networkAddress: string;
    subnetMask: string;
    cidr: number;
    firstUsableIp: string;
    lastUsableIp: string;
    broadcastAddress: string;
    usableHostRange: string;
    totalHosts: number;
    usableHosts: number;
    wildcardMask: string;
    ipClass: string;
    ipType: string;
    binaryIp: string;
    binarySubnetMask: string;
    hexIp: string;
    decimalIp: number;
    get cidrNotation(): string;
    get cidrNetwork(): string;
    toDictionary(): CaseInsensitiveDictionary;
    ToDictionary(): CaseInsensitiveDictionary;
    toList(withLabels?: boolean): string[];
    ToList(withLabels?: boolean): string[];
}
/**
 * Parses an IPv4 address and optional subnet mask / CIDR into a strongly-typed IPv4Info object.
 */
export declare function parseIPv4Info(ip: string, maskPart?: string | null): IPv4Info;
/**
 * Parses an IPv4 address string (e.g. "192.168.1.10/24", "192.168.1.10 255.255.255.0", or "192.168.1.10").
 */
export declare function parseIPv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary;
export declare const ParseIPv4: typeof parseIPv4;
export declare const parseIpv4: typeof parseIPv4;
export declare const ParseIpv4: typeof parseIPv4;
export declare const ParseIPv4Info: typeof parseIPv4Info;
//# sourceMappingURL=ipv4.d.ts.map