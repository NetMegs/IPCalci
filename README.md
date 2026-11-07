# ipcalci

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ipcalci.svg)](https://www.npmjs.com/package/ipcalci)

A high-performance, developer-friendly TypeScript/JavaScript library for parsing, validating, and calculating IPv4 and IPv6 subnet metrics, network addresses, usable host ranges, and CIDR notations.

Direct port and enhancement of the .NET `IPCalci` library for the Node.js, Bun, Deno, and browser ecosystems.

---

## Features

- **IPv4 & IPv6 Support**: Full calculations for both IPv4 and IPv6 subnets.
- **Dedicated & Auto-Detect Parsers**: Explicit `parseIPv4` / `parseIPv6` methods or smart auto-routing `parse`.
- **Case-Insensitive Dictionary / Record**: Key-value lookup with case-insensitivity (`result["network"] == result["Network"]`), property access, and convenient aliases.
- **Detailed Subnet Metrics**:
  - Network address (compressed canonical & expanded formats)
  - Subnet mask & prefix netmask
  - CIDR notation & prefix length
  - First and last usable host IPs
  - Total and usable host counts (uses native JavaScript `BigInt` for exact 128-bit IPv6 calculations without precision loss)
  - IP scope / classification (Public, Private RFC 1918, Loopback, Link-Local, ULA, Multicast, CGNAT, etc.)
  - Binary and hexadecimal representations
  - IPv6 reverse DNS pointer (`.ip6.arpa`)
- **Special Subnet Awareness**: RFC 3021 (`/31` point-to-point), RFC 6164 (`/127` IPv6 inter-router), host routes (`/32` & `/128`).
- **Strongly Typed**: Full TypeScript support with `IPv4Info` and `IPv6Info` models.
- **Zero Runtime Dependencies**: Pure TypeScript/JavaScript built on standard primitives. Runs anywhere: Node.js, Bun, Deno, Browsers, Edge workers.
- **Dual Package**: CommonJS (`require`) and ESM (`import`) support with full type declarations.

---

## Installation

Install via npm:

```bash
npm install ipcalci
```

Or via yarn / pnpm / bun:

```bash
bun add ipcalci
# or
pnpm add ipcalci
# or
yarn add ipcalci
```

---

## Quick Start

### ESM / TypeScript

```typescript
import { IPCalci, parse, parseIPv4, parseIPv6 } from 'ipcalci';

// 1. IPv4 Parsing
const ipv4 = parseIPv4("192.168.1.50/24");

console.log(ipv4["Network"]);           // "192.168.1.0"
console.log(ipv4["Subnet Mask"]);       // "255.255.255.0"
console.log(ipv4["CIDR Notation"]);     // "/24"
console.log(ipv4["First Usable IP"]);   // "192.168.1.1"
console.log(ipv4["Last Usable IP"]);    // "192.168.1.254"
console.log(ipv4["Broadcast Address"]); // "192.168.1.255"
console.log(ipv4["Usable Hosts"]);      // "254"
console.log(ipv4["IP Type"]);           // "Private (RFC 1918)"
console.log(ipv4["Binary IP Address"]); // "11000000.10101000.00000001.00110010"
console.log(ipv4["Hex IP Address"]);    // "0xC0A80132"

// 2. IPv6 Parsing
const ipv6 = parseIPv6("2001:db8:85a3::8a2e:370:7334/64");

console.log(ipv6["Network"]);               // "2001:db8:85a3::"
console.log(ipv6["Expanded IP Address"]);   // "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
console.log(ipv6["Prefix Netmask"]);        // "ffff:ffff:ffff:ffff:0000:0000:0000:0000"
console.log(ipv6["First Usable IP"]);       // "2001:db8:85a3::1"
console.log(ipv6["Last Usable IP"]);        // "2001:db8:85a3:0:ffff:ffff:ffff:ffff"
console.log(ipv6["Total Number of Hosts"]); // "18446744073709551616"
console.log(ipv6["Reverse DNS Pointer"]);   // "4.3.3.7.0.7.3.0.e.2.a.8.0.0.0.0.0.0.0.0.3.a.5.8.8.b.d.0.1.0.0.2.ip6.arpa"

// 3. Unified Auto-detect Parser (works for both IPv4 and IPv6)
const autoIpv4 = parse("10.0.0.1/8");
const autoIpv6 = parse("fe80::1/64");
```

### CommonJS

```javascript
const { IPCalci, parse, parseIPv4, parseIPv6 } = require('ipcalci');

const result = parseIPv4("192.168.1.1/24");
console.log(result["network"]); // Case-insensitive!
```

---

## Strongly-Typed Info Objects

If you prefer strongly-typed objects instead of dictionary lookups:

```typescript
import { IPCalci } from 'ipcalci';

// Strongly typed IPv4Info
const ipv4Info = IPCalci.parseIPv4Info("192.168.1.1/24");
console.log(ipv4Info.networkAddress); // "192.168.1.0"
console.log(ipv4Info.cidr);           // 24
console.log(ipv4Info.totalHosts);     // 256
console.log(ipv4Info.decimalIp);      // 3232235777

// Strongly typed IPv6Info
const ipv6Info = IPCalci.parseIPv6Info("2001:db8::1/64");
console.log(ipv6Info.networkAddress); // "2001:db8::"
console.log(ipv6Info.prefixLength);   // 64
console.log(ipv6Info.totalHosts);     // 18446744073709551616n (bigint)
```

---

## Flexible Input Formats

- **CIDR notation**: `"192.168.1.1/24"`, `"2001:db8::1/64"`
- **Dotted-decimal subnet mask**: `"192.168.1.1 255.255.255.0"` or `"192.168.1.1/255.255.255.0"`
- **Bracketed IPv6**: `"[2001:db8::1]/64"`
- **Separate parameters**: `parseIPv4("192.168.1.1", "255.255.255.0")`, `parseIPv6("2001:db8::1", 64)`
- **Plain IP without mask**: Automatically infers standard defaults (Class A/B/C for IPv4, `/64` for IPv6).

---

## Dictionary Keys Reference

Keys are **case-insensitive** (`result["network"] == result["Network"] == result["NETWORK"]`).

### IPv4 Keys
- `Network`, `Network Address`
- `Subnet Mask`, `SubnetMask`
- `CIDR Notation`, `CIDR`
- `First Usable IP`, `FirstUsableIp`
- `Broadcast Address`, `Broadcast`
- `Last Usable IP`, `LastUsableIp`
- `Usable Host Range`, `UsableHostRange`
- `Total Number of Hosts`, `Total Hosts`
- `Number of Usable Hosts`, `Usable Hosts`
- `Wildcard Mask`, `Wildcard`
- `IP Class`, `Class`
- `IP Type`, `Type`
- `IP Address`, `IP`
- `CIDR Network`
- `Binary IP Address`, `Binary Subnet Mask`
- `Hex IP Address`, `Decimal IP Address`

### IPv6 Keys
- `IP Address`, `IP`
- `Expanded IP Address`
- `Network`, `Network Address`
- `Expanded Network`
- `CIDR Notation`, `CIDR`
- `Prefix Length`
- `Prefix Netmask`, `Subnet Mask`
- `CIDR Network`
- `First Usable IP`, `FirstUsableIp`
- `Last Usable IP`, `LastUsableIp`
- `Usable Host Range`
- `Total Number of Hosts`, `Total Hosts`
- `Number of Usable Hosts`, `Usable Hosts`
- `IP Type`, `Type`
- `Reverse DNS Pointer`, `Reverse DNS`
- `Binary IP Address`, `Hex IP Address`

---

## Methods & Aliases

The library provides multiple calling conventions matching .NET `IPCalci`:

- **Class methods**: `IPCalci.parse(...)`, `IPCalci.parseIPv4(...)`, `IPCalci.parseIPv6(...)`
- **Instance methods**: `new IPCalci().parse(...)`
- **PascalCase aliases**: `IPCalci.Parse(...)`, `IPCalci.ParseIPv4(...)`, `IPCalci.ParseIPv6(...)`
- **Class aliases**: `Class1`, `IPCalculator` (subclasses of `IPCalci`)
- **Direct functions**: `parse(...)`, `parseIPv4(...)`, `parseIPv6(...)`, `parseToList(...)`, `parseInfo(...)`

---

## Error Handling

Throws specific error classes matching .NET exceptions:

- `ArgumentException`: When an IP string is null, empty, or whitespace, or when a subnet mask is non-contiguous.
- `FormatException`: When the IP, CIDR, or bracket notation is malformed.
- `ArgumentOutOfRangeException`: When CIDR prefix is outside valid range (0-32 for IPv4, 0-128 for IPv6).

```typescript
import { parseIPv4, ArgumentException, FormatException, ArgumentOutOfRangeException } from 'ipcalci';

try {
  parseIPv4("192.168.1.1/35");
} catch (err) {
  if (err instanceof ArgumentOutOfRangeException) {
    console.error("Prefix out of range:", err.message);
  }
}
```

---

## License

This project is licensed under the [MIT License](LICENSE).
