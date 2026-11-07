import { parseIPv4, parseIPv4Info, IPv4Info } from './ipv4.js';
import { parseIPv6, parseIPv6Info, IPv6Info } from './ipv6.js';
import type { CaseInsensitiveDictionary } from './types.js';
/**
 * Unified parse method that automatically detects IPv4 vs IPv6.
 */
export declare function parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary;
export declare const Parse: typeof parse;
/**
 * Helper to return calculation results as a list of strings.
 */
export declare function parseToList(ip: string, withLabels?: boolean): string[];
export declare const ParseToList: typeof parseToList;
/**
 * Parses an IP address and returns a strongly-typed IPv4Info or IPv6Info object.
 */
export declare function parseInfo(ip: string): IPv4Info | IPv6Info;
export declare const ParseInfo: typeof parseInfo;
/**
 * Provides calculation and parsing methods for IPv4 and IPv6 addresses and subnets.
 */
export declare class IPCalci {
    static parse: typeof parse;
    static Parse: typeof parse;
    static parseIPv4: typeof parseIPv4;
    static ParseIPv4: typeof parseIPv4;
    static parseIpv4: typeof parseIPv4;
    static ParseIpv4: typeof parseIPv4;
    static parseIPv6: typeof parseIPv6;
    static ParseIPv6: typeof parseIPv6;
    static parseIpv6: typeof parseIPv6;
    static ParseIpv6: typeof parseIPv6;
    static parseToList: typeof parseToList;
    static ParseToList: typeof parseToList;
    static parseInfo: typeof parseInfo;
    static ParseInfo: typeof parseInfo;
    static parseIPv4Info: typeof parseIPv4Info;
    static ParseIPv4Info: typeof parseIPv4Info;
    static parseIPv6Info: typeof parseIPv6Info;
    static ParseIPv6Info: typeof parseIPv6Info;
    parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary;
    Parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary;
    parseIPv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary;
    ParseIPv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary;
    parseIpv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary;
    ParseIpv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary;
    parseIPv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary;
    ParseIPv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary;
    parseIpv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary;
    ParseIpv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary;
    parseToList(ip: string, withLabels?: boolean): string[];
    ParseToList(ip: string, withLabels?: boolean): string[];
    parseInfo(ip: string): IPv4Info | IPv6Info;
    ParseInfo(ip: string): IPv4Info | IPv6Info;
    parseIPv4Info(ip: string, maskPart?: string | null): IPv4Info;
    ParseIPv4Info(ip: string, maskPart?: string | null): IPv4Info;
    parseIPv6Info(ip: string, prefixLength?: number | string | null): IPv6Info;
    ParseIPv6Info(ip: string, prefixLength?: number | string | null): IPv6Info;
}
/**
 * Alias for IPCalci matching original template class name Class1.
 */
export declare class Class1 extends IPCalci {
}
/**
 * Alias for IPCalci as IPCalculator.
 */
export declare class IPCalculator extends IPCalci {
}
//# sourceMappingURL=ipcalci.d.ts.map