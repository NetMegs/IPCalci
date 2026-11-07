import { ArgumentException, FormatException } from './errors.js';
import { parseIPv4, parseIPv4Info, IPv4Info } from './ipv4.js';
import { parseIPv6, parseIPv6Info, IPv6Info } from './ipv6.js';
import type { CaseInsensitiveDictionary } from './types.js';

/**
 * Unified parse method that automatically detects IPv4 vs IPv6.
 */
export function parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary {
  if (!ip || !ip.trim()) {
    throw new ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
  }

  const trimmed = ip.trim();

  if (subnetOrPrefix !== undefined && subnetOrPrefix !== null && subnetOrPrefix.trim() !== '') {
    if (trimmed.includes(':')) {
      const clean = subnetOrPrefix.trim().replace(/^\//, '');
      if (/^\s*-?\d+\s*$/.test(clean)) {
        return parseIPv6(trimmed, parseInt(clean, 10));
      }
      throw new FormatException(
        `Invalid IPv6 prefix length '${subnetOrPrefix}'. Must be an integer between 0 and 128.`
      );
    }
    return parseIPv4(trimmed, subnetOrPrefix);
  }

  if (trimmed.includes(':')) {
    return parseIPv6(trimmed);
  }

  return parseIPv4(trimmed);
}

export const Parse = parse;

/**
 * Helper to return calculation results as a list of strings.
 */
export function parseToList(ip: string, withLabels: boolean = true): string[] {
  if (!ip || !ip.trim()) {
    throw new ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
  }

  if (ip.includes(':')) {
    return parseIPv6Info(ip).toList(withLabels);
  }
  return parseIPv4Info(ip).toList(withLabels);
}

export const ParseToList = parseToList;

/**
 * Parses an IP address and returns a strongly-typed IPv4Info or IPv6Info object.
 */
export function parseInfo(ip: string): IPv4Info | IPv6Info {
  if (!ip || !ip.trim()) {
    throw new ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
  }

  if (ip.includes(':')) {
    return parseIPv6Info(ip);
  }
  return parseIPv4Info(ip);
}

export const ParseInfo = parseInfo;

/**
 * Provides calculation and parsing methods for IPv4 and IPv6 addresses and subnets.
 */
export class IPCalci {
  // Static methods
  static parse = parse;
  static Parse = parse;

  static parseIPv4 = parseIPv4;
  static ParseIPv4 = parseIPv4;
  static parseIpv4 = parseIPv4;
  static ParseIpv4 = parseIPv4;

  static parseIPv6 = parseIPv6;
  static ParseIPv6 = parseIPv6;
  static parseIpv6 = parseIPv6;
  static ParseIpv6 = parseIPv6;

  static parseToList = parseToList;
  static ParseToList = parseToList;

  static parseInfo = parseInfo;
  static ParseInfo = parseInfo;

  static parseIPv4Info = parseIPv4Info;
  static ParseIPv4Info = parseIPv4Info;

  static parseIPv6Info = parseIPv6Info;
  static ParseIPv6Info = parseIPv6Info;

  // Instance methods
  parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary {
    return IPCalci.parse(ip, subnetOrPrefix);
  }

  Parse(ip: string, subnetOrPrefix?: string): CaseInsensitiveDictionary {
    return IPCalci.parse(ip, subnetOrPrefix);
  }

  parseIPv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
  }

  ParseIPv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
  }

  parseIpv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
  }

  ParseIpv4(ip: string, subnetMaskOrCidr?: string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
  }

  parseIPv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv6(ip, prefixLength);
  }

  ParseIPv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv6(ip, prefixLength);
  }

  parseIpv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv6(ip, prefixLength);
  }

  ParseIpv6(ip: string, prefixLength?: number | string): CaseInsensitiveDictionary {
    return IPCalci.parseIPv6(ip, prefixLength);
  }

  parseToList(ip: string, withLabels: boolean = true): string[] {
    return IPCalci.parseToList(ip, withLabels);
  }

  ParseToList(ip: string, withLabels: boolean = true): string[] {
    return IPCalci.parseToList(ip, withLabels);
  }

  parseInfo(ip: string): IPv4Info | IPv6Info {
    return IPCalci.parseInfo(ip);
  }

  ParseInfo(ip: string): IPv4Info | IPv6Info {
    return IPCalci.parseInfo(ip);
  }

  parseIPv4Info(ip: string, maskPart?: string | null): IPv4Info {
    return IPCalci.parseIPv4Info(ip, maskPart);
  }

  ParseIPv4Info(ip: string, maskPart?: string | null): IPv4Info {
    return IPCalci.parseIPv4Info(ip, maskPart);
  }

  parseIPv6Info(ip: string, prefixLength?: number | string | null): IPv6Info {
    return IPCalci.parseIPv6Info(ip, prefixLength);
  }

  ParseIPv6Info(ip: string, prefixLength?: number | string | null): IPv6Info {
    return IPCalci.parseIPv6Info(ip, prefixLength);
  }
}

/**
 * Alias for IPCalci matching original template class name Class1.
 */
export class Class1 extends IPCalci {}

/**
 * Alias for IPCalci as IPCalculator.
 */
export class IPCalculator extends IPCalci {}
