import { describe, expect, it } from 'bun:test';
import {
  IPCalci,
  Class1,
  IPCalculator,
  parse,
  Parse,
  parseIPv4,
  ParseIPv4,
  parseIpv4,
  ParseIpv4,
  parseIPv6,
  ParseIPv6,
  parseIpv6,
  ParseIpv6,
  parseToList,
  ParseToList,
  parseInfo,
  ParseInfo,
  parseIPv4Info,
  ParseIPv4Info,
  parseIPv6Info,
  ParseIPv6Info,
  IPv4Info,
  IPv6Info,
  ArgumentException,
  FormatException,
  ArgumentOutOfRangeException
} from '../src/index.js';

describe('IPCalci IPv4 Calculations', () => {
  it('ParseIPv4_StandardClassC24_ReturnsCorrectCalculations', () => {
    const result = IPCalci.parseIPv4('192.168.1.55/24');

    expect(result['Network']).toBe('192.168.1.0');
    expect(result['Subnet Mask']).toBe('255.255.255.0');
    expect(result['CIDR Notation']).toBe('/24');
    expect(result['First Usable IP']).toBe('192.168.1.1');
    expect(result['Broadcast Address']).toBe('192.168.1.255');
    expect(result['Last Usable IP']).toBe('192.168.1.254');
    expect(result['Usable Host Range']).toBe('192.168.1.1 - 192.168.1.254');
    expect(result['Total Number of Hosts']).toBe('256');
    expect(result['Number of Usable Hosts']).toBe('254');
    expect(result['Wildcard Mask']).toBe('0.0.0.255');
    expect(result['IP Class']).toBe('Class C');
    expect(result['IP Type']).toBe('Private (RFC 1918)');
    expect(result['IP Address']).toBe('192.168.1.55');
    expect(result['CIDR Network']).toBe('192.168.1.0/24');
    expect(result['Binary IP Address']).toBe('11000000.10101000.00000001.00110111');
    expect(result['Binary Subnet Mask']).toBe('11111111.11111111.11111111.00000000');
    expect(result['Hex IP Address']).toBe('0xC0A80137');
    expect(result['Decimal IP Address']).toBe('3232235831');
  });

  it('ParseIPv4_KeyLookup_IsCaseInsensitiveAndSupportsAliases', () => {
    const result = IPCalci.parseIPv4('192.168.1.1/24');

    const testKeys = [
      'network',
      'NETWORK',
      'Network',
      'Network Address',
      'subnet mask',
      'SubnetMask',
      'cidr notation',
      'CIDR',
      'first usable ip',
      'FirstUsableIp',
      'broadcast address',
      'Broadcast'
    ];

    for (const key of testKeys) {
      expect(key in result).toBe(true);
      expect(result.ContainsKey(key)).toBe(true);
      expect(result.containsKey(key)).toBe(true);
      expect(result.has(key)).toBe(true);
      expect(result[key]).toBeTruthy();
      expect(result.get(key)).toBeTruthy();
    }
  });

  it('ParseIPv4_InstanceMethodCall_Succeeds', () => {
    const calci = new IPCalci();
    const result = calci.parseIPv4('10.20.30.40/8');

    expect(result['Network']).toBe('10.0.0.0');
    expect(result['Subnet Mask']).toBe('255.0.0.0');
    expect(result['CIDR Notation']).toBe('/8');
    expect(result['First Usable IP']).toBe('10.0.0.1');
    expect(result['Broadcast Address']).toBe('10.255.255.255');
    expect(result['IP Class']).toBe('Class A');
    expect(result['IP Type']).toBe('Private (RFC 1918)');
  });

  it('ParseIPv4_SeparateIpAndMaskArguments_Succeeds', () => {
    const result = IPCalci.parseIPv4('172.16.50.1', '255.255.0.0');

    expect(result['Network']).toBe('172.16.0.0');
    expect(result['Subnet Mask']).toBe('255.255.0.0');
    expect(result['CIDR Notation']).toBe('/16');
    expect(result['Broadcast Address']).toBe('172.16.255.255');
    expect(result['IP Class']).toBe('Class B');
  });

  it('ParseIPv4_WithoutSubnetSpecified_InfersClassfulDefaultMask', () => {
    const cases = [
      { ip: '10.5.5.5', expectedCidr: '/8', expectedClass: 'Class A' },
      { ip: '172.20.1.1', expectedCidr: '/16', expectedClass: 'Class B' },
      { ip: '192.168.1.100', expectedCidr: '/24', expectedClass: 'Class C' }
    ];

    for (const { ip, expectedCidr, expectedClass } of cases) {
      const result = IPCalci.parseIPv4(ip);
      expect(result['CIDR Notation']).toBe(expectedCidr);
      expect(result['IP Class']).toBe(expectedClass);
    }
  });

  it('ParseIPv4_PointToPointSubnet31_CalculatesRfc3021Correctly', () => {
    const result = IPCalci.parseIPv4('192.168.1.2/31');

    expect(result['Network']).toBe('192.168.1.2');
    expect(result['Broadcast Address']).toBe('192.168.1.3');
    expect(result['First Usable IP']).toBe('192.168.1.2');
    expect(result['Last Usable IP']).toBe('192.168.1.3');
    expect(result['Usable Hosts']).toBe('2');
  });

  it('ParseIPv4_SingleHostRoute32_CalculatesCorrectly', () => {
    const result = IPCalci.parseIPv4('8.8.8.8/32');

    expect(result['Network']).toBe('8.8.8.8');
    expect(result['First Usable IP']).toBe('8.8.8.8');
    expect(result['Last Usable IP']).toBe('8.8.8.8');
    expect(result['Total Hosts']).toBe('1');
    expect(result['Usable Hosts']).toBe('1');
    expect(result['IP Type']).toBe('Public');
  });

  it('ParseIPv4_IpType_IdentifiesCorrectScope', () => {
    const cases = [
      { ip: '127.0.0.1/8', expectedScope: 'Loopback (RFC 1122)' },
      { ip: '169.254.10.20/16', expectedScope: 'Link-Local / APIPA (RFC 3927)' },
      { ip: '100.64.1.1/10', expectedScope: 'Carrier-Grade NAT / CGNAT (RFC 6598)' },
      { ip: '8.8.4.4/32', expectedScope: 'Public' },
      { ip: '224.0.0.1/24', expectedScope: 'Multicast (RFC 5771)' },
      { ip: '255.255.255.255/32', expectedScope: 'Limited Broadcast (RFC 919)' },
      { ip: '0.0.0.0/8', expectedScope: 'Current Network / This Host (RFC 1122)' }
    ];

    for (const { ip, expectedScope } of cases) {
      const result = IPCalci.parseIPv4(ip);
      expect(result['IP Type']).toBe(expectedScope);
    }
  });

  it('ParseIPv4_EmptyOrWhitespace_ThrowsArgumentException', () => {
    expect(() => IPCalci.parseIPv4('')).toThrow(ArgumentException);
    expect(() => IPCalci.parseIPv4('   ')).toThrow(ArgumentException);
  });

  it('ParseIPv4_MalformedOctets_ThrowsFormatException', () => {
    const badIps = [
      '300.1.1.1/24',
      '192.168.1/24',
      '192.168.1.1.1/24',
      'abc.def.ghi.jkl/24'
    ];

    for (const malformed of badIps) {
      expect(() => IPCalci.parseIPv4(malformed)).toThrow(FormatException);
    }
  });

  it('ParseIPv4_CidrOutOfRange_ThrowsArgumentOutOfRangeException', () => {
    expect(() => IPCalci.parseIPv4('192.168.1.1/33')).toThrow(ArgumentOutOfRangeException);
    expect(() => IPCalci.parseIPv4('192.168.1.1/-1')).toThrow(ArgumentOutOfRangeException);
  });

  it('ParseIPv4_NonContiguousSubnetMask_ThrowsArgumentException', () => {
    expect(() => IPCalci.parseIPv4('192.168.1.1', '255.255.0.255')).toThrow(ArgumentException);
  });
});

describe('IPCalci IPv6 Calculations', () => {
  it('ParseIPv6_Standard64_ReturnsCorrectCalculations', () => {
    const result = IPCalci.parseIPv6('2001:db8:85a3::8a2e:370:7334/64');

    expect(result['IP Address']).toBe('2001:db8:85a3::8a2e:370:7334');
    expect(result['Expanded IP Address']).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    expect(result['Network']).toBe('2001:db8:85a3::');
    expect(result['Expanded Network']).toBe('2001:0db8:85a3:0000:0000:0000:0000:0000');
    expect(result['CIDR Notation']).toBe('/64');
    expect(result['Prefix Length']).toBe('64');
    expect(result['Prefix Netmask']).toBe('ffff:ffff:ffff:ffff:0000:0000:0000:0000');
    expect(result['CIDR Network']).toBe('2001:db8:85a3::/64');
    expect(result['First Usable IP']).toBe('2001:db8:85a3::1');
    expect(result['Last Usable IP']).toBe('2001:db8:85a3:0:ffff:ffff:ffff:ffff');
    expect(result['Total Number of Hosts']).toBe('18446744073709551616');
    expect(result['IP Type']).toBe('Documentation (RFC 3849)');
  });

  it('ParseIPv6_BracketNotation_Succeeds', () => {
    const result = IPCalci.parseIPv6('[2001:db8::1]/64');

    expect(result['IP Address']).toBe('2001:db8::1');
    expect(result['Network']).toBe('2001:db8::');
    expect(result['CIDR Notation']).toBe('/64');
  });

  it('ParseIPv6_SeparatePrefixArgument_Succeeds', () => {
    const result = IPCalci.parseIPv6('2001:db8::1', 48);

    expect(result['Network']).toBe('2001:db8::');
    expect(result['CIDR Notation']).toBe('/48');
    expect(result['Prefix Netmask']).toBe('ffff:ffff:ffff:0000:0000:0000:0000:0000');
  });

  it('ParseIPv6_ScopeIdentification_DetectsCorrectType', () => {
    const cases = [
      { ipv6: '::1/128', expectedScope: 'Loopback (RFC 4291)' },
      { ipv6: 'fe80::1/64', expectedScope: 'Link-Local Unicast (RFC 4291)' },
      { ipv6: 'fd00::1/64', expectedScope: 'Unique Local Unicast / ULA (RFC 4193)' },
      { ipv6: 'ff02::1/8', expectedScope: 'Multicast (RFC 4291)' },
      { ipv6: '2607:f8b0:4005:805::200e/64', expectedScope: 'Global Unicast / GUA (RFC 3587)' }
    ];

    for (const { ipv6, expectedScope } of cases) {
      const result = IPCalci.parseIPv6(ipv6);
      expect(result['IP Type']).toBe(expectedScope);
    }
  });

  it('ParseIPv6_Loopback128_CalculatesCorrectly', () => {
    const result = IPCalci.parseIPv6('::1/128');

    expect(result['IP Address']).toBe('::1');
    expect(result['Network']).toBe('::1');
    expect(result['First Usable IP']).toBe('::1');
    expect(result['Last Usable IP']).toBe('::1');
    expect(result['Total Number of Hosts']).toBe('1');
  });

  it('ParseIPv6_PointToPoint127_CalculatesRfc6164Correctly', () => {
    const result = IPCalci.parseIPv6('2001:db8::/127');

    expect(result['Network']).toBe('2001:db8::');
    expect(result['First Usable IP']).toBe('2001:db8::');
    expect(result['Last Usable IP']).toBe('2001:db8::1');
    expect(result['Total Number of Hosts']).toBe('2');
  });

  it('ParseIPv6_ReverseDnsPointer_FormatsCorrectly', () => {
    const result = IPCalci.parseIPv6('2001:db8::1/64');

    expect(result['Reverse DNS Pointer']?.startsWith('1.0.0.0.0.0.0.0')).toBe(true);
    expect(result['Reverse DNS Pointer']?.endsWith('8.b.d.0.1.0.0.2.ip6.arpa')).toBe(true);
  });

  it('ParseIPv6_PrefixOutOfRange_ThrowsArgumentOutOfRangeException', () => {
    expect(() => IPCalci.parseIPv6('2001:db8::1/129')).toThrow(ArgumentOutOfRangeException);
    expect(() => IPCalci.parseIPv6('2001:db8::1/-1')).toThrow(ArgumentOutOfRangeException);
  });

  it('ParseIPv6_MalformedAddress_ThrowsFormatException', () => {
    const badIps = [
      '2001:::1/64',
      '2001:xyz::1/64',
      'invalid-ipv6'
    ];

    for (const malformed of badIps) {
      expect(() => IPCalci.parseIPv6(malformed)).toThrow(FormatException);
    }
  });

  it('ParseIPv6_UnclosedBracket_ThrowsFormatException', () => {
    expect(() => IPCalci.parseIPv6('[2001:db8::1/64')).toThrow(FormatException);
  });
});

describe('IPCalci Unified Parse and Aliases', () => {
  it('Parse_AutoDetects_IPv4AndIPv6', () => {
    const ipv4Result = IPCalci.parse('192.168.1.1/24');
    expect(ipv4Result['Network']).toBe('192.168.1.0');
    expect(ipv4Result['IP Class']).toBe('Class C');

    const ipv6Result = IPCalci.parse('2001:db8::1/64');
    expect(ipv6Result['Network']).toBe('2001:db8::');
    expect(ipv6Result['IP Type']).toBe('Documentation (RFC 3849)');
  });

  it('ParseInfo_ReturnsStronglyTypedObjects', () => {
    const ipv4 = IPCalci.ParseIPv4Info('192.168.1.1/24');
    expect(ipv4).toBeInstanceOf(IPv4Info);
    expect(ipv4.networkAddress).toBe('192.168.1.0');
    expect(ipv4.cidr).toBe(24);

    const ipv6 = IPCalci.ParseIPv6Info('2001:db8::1/64');
    expect(ipv6).toBeInstanceOf(IPv6Info);
    expect(ipv6.networkAddress).toBe('2001:db8::');
    expect(ipv6.prefixLength).toBe(64);
    expect(ipv6.totalHosts).toBe(1n << 64n);
  });

  it('ParseToList_ReturnsFormattedList', () => {
    const listLabeled = IPCalci.parseToList('192.168.1.1/24', true);
    expect(listLabeled[0]).toBe('Network: 192.168.1.0');
    expect(listLabeled.length).toBe(18);

    const listRaw = IPCalci.parseToList('192.168.1.1/24', false);
    expect(listRaw[0]).toBe('192.168.1.0');
    expect(listRaw.length).toBe(18);
  });

  it('Subclasses_Class1_and_IPCalculator_WorkIdentically', () => {
    const r1 = Class1.parse('10.0.0.1/8');
    const r2 = IPCalculator.parse('10.0.0.1/8');
    expect(r1['Network']).toBe('10.0.0.0');
    expect(r2['Network']).toBe('10.0.0.0');
  });

  it('ExportedFunctions_WorkIndependently', () => {
    const r1 = parse('10.0.0.1/8');
    const r2 = parseIPv4('10.0.0.1/8');
    const r3 = parseIPv6('::1/128');
    expect(r1['Network']).toBe('10.0.0.0');
    expect(r2['Network']).toBe('10.0.0.0');
    expect(r3['Network']).toBe('::1');
  });
});
