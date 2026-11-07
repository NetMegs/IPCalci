"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIPv6Info = exports.ParseIpv6 = exports.parseIpv6 = exports.ParseIPv6 = exports.IPv6Info = void 0;
exports.parseIPv6Info = parseIPv6Info;
exports.parseIPv6 = parseIPv6;
const errors_js_1 = require("./errors.js");
const dictionary_js_1 = require("./dictionary.js");
/**
 * Represents comprehensive IPv6 network and addressing details.
 */
class IPv6Info {
    ipAddress = '';
    expandedIpAddress = '';
    networkAddress = '';
    expandedNetworkAddress = '';
    prefixLength = 0;
    prefixNetmask = '';
    firstUsableIp = '';
    lastUsableIp = '';
    usableHostRange = '';
    totalHosts = 0n;
    usableHosts = 0n;
    ipType = '';
    reverseDnsPointer = '';
    binaryIp = '';
    hexIp = '';
    get cidrNotation() {
        return `/${this.prefixLength}`;
    }
    get cidrNetwork() {
        return `${this.networkAddress}/${this.prefixLength}`;
    }
    toDictionary() {
        return (0, dictionary_js_1.createCaseInsensitiveDictionary)({
            'IP Address': this.ipAddress,
            'Expanded IP Address': this.expandedIpAddress,
            'Network': this.networkAddress,
            'Expanded Network': this.expandedNetworkAddress,
            'CIDR Notation': this.cidrNotation,
            'Prefix Length': this.prefixLength.toString(),
            'Prefix Netmask': this.prefixNetmask,
            'CIDR Network': this.cidrNetwork,
            'First Usable IP': this.firstUsableIp,
            'Last Usable IP': this.lastUsableIp,
            'Usable Host Range': this.usableHostRange,
            'Total Number of Hosts': this.totalHosts.toString(),
            'Number of Usable Hosts': this.usableHosts.toString(),
            'IP Type': this.ipType,
            'Reverse DNS Pointer': this.reverseDnsPointer,
            'Binary IP Address': this.binaryIp,
            'Hex IP Address': this.hexIp,
            // Convenient aliases:
            'Network Address': this.networkAddress,
            'Subnet Mask': this.prefixNetmask,
            'SubnetMask': this.prefixNetmask,
            'CIDR': this.cidrNotation,
            'FirstUsableIp': this.firstUsableIp,
            'LastUsableIp': this.lastUsableIp,
            'UsableHostRange': this.usableHostRange,
            'Total Hosts': this.totalHosts.toString(),
            'TotalHosts': this.totalHosts.toString(),
            'Usable Hosts': this.usableHosts.toString(),
            'UsableHosts': this.usableHosts.toString(),
            'IpType': this.ipType,
            'Type': this.ipType,
            'IpAddress': this.ipAddress,
            'IP': this.ipAddress,
            'CidrNetwork': this.cidrNetwork,
            'ReverseDnsPointer': this.reverseDnsPointer,
            'Reverse DNS': this.reverseDnsPointer,
            'Binary IP': this.binaryIp,
            'BinaryIp': this.binaryIp,
            'Hex IP': this.hexIp,
            'HexIp': this.hexIp
        });
    }
    ToDictionary() {
        return this.toDictionary();
    }
    toList(withLabels = true) {
        if (withLabels) {
            return [
                `IP Address: ${this.ipAddress}`,
                `Expanded IP: ${this.expandedIpAddress}`,
                `Network: ${this.networkAddress}`,
                `Expanded Network: ${this.expandedNetworkAddress}`,
                `CIDR Notation: ${this.cidrNotation}`,
                `Prefix Netmask: ${this.prefixNetmask}`,
                `CIDR Network: ${this.cidrNetwork}`,
                `First Usable IP: ${this.firstUsableIp}`,
                `Last Usable IP: ${this.lastUsableIp}`,
                `Usable Host Range: ${this.usableHostRange}`,
                `Total Number of Hosts: ${this.totalHosts}`,
                `Number of Usable Hosts: ${this.usableHosts}`,
                `IP Type: ${this.ipType}`,
                `Reverse DNS: ${this.reverseDnsPointer}`,
                `Binary IP: ${this.binaryIp}`,
                `Hex IP: ${this.hexIp}`
            ];
        }
        return [
            this.ipAddress,
            this.expandedIpAddress,
            this.networkAddress,
            this.expandedNetworkAddress,
            this.cidrNotation,
            this.prefixNetmask,
            this.cidrNetwork,
            this.firstUsableIp,
            this.lastUsableIp,
            this.usableHostRange,
            this.totalHosts.toString(),
            this.usableHosts.toString(),
            this.ipType,
            this.reverseDnsPointer,
            this.binaryIp,
            this.hexIp
        ];
    }
    ToList(withLabels = true) {
        return this.toList(withLabels);
    }
}
exports.IPv6Info = IPv6Info;
/**
 * Validates and converts an IPv6 string to 16 bytes.
 */
function parseIPv6AddressToBytes(rawIp) {
    const cleanIp = rawIp.trim().replace(/^\[/, '').replace(/\]$/, '');
    if (!cleanIp) {
        throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    // Allowed characters: hex digits, colons, and dots (for IPv4 mapped)
    if (!/^[0-9a-fA-F:.]+$/.test(cleanIp)) {
        throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    // 3 consecutive colons invalid
    if (cleanIp.includes(':::')) {
        throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    // Cannot have multiple ::
    const doubleColonParts = cleanIp.split('::');
    if (doubleColonParts.length > 2) {
        throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    // Cannot start or end with single colon
    if ((cleanIp.startsWith(':') && !cleanIp.startsWith('::')) ||
        (cleanIp.endsWith(':') && !cleanIp.endsWith('::'))) {
        throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    // Handle embedded IPv4 notation at end (e.g. ::ffff:192.168.1.1)
    let normalizedIp = cleanIp;
    const lastColon = cleanIp.lastIndexOf(':');
    const lastPart = lastColon >= 0 ? cleanIp.substring(lastColon + 1) : cleanIp;
    if (lastPart.includes('.')) {
        const octets = lastPart.split('.');
        if (octets.length !== 4) {
            throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
        }
        const numOctets = [];
        for (const o of octets) {
            if (!/^\d+$/.test(o)) {
                throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
            }
            const val = Number(o);
            if (val < 0 || val > 255) {
                throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
            }
            numOctets.push(val);
        }
        const w1 = ((numOctets[0] << 8) | numOctets[1]).toString(16);
        const w2 = ((numOctets[2] << 8) | numOctets[3]).toString(16);
        const prefix = cleanIp.substring(0, lastColon + 1);
        normalizedIp = `${prefix}${w1}:${w2}`;
    }
    if (normalizedIp === '::') {
        return new Uint8Array(16);
    }
    let words = [];
    if (normalizedIp.includes('::')) {
        const [leftStr = '', rightStr = ''] = normalizedIp.split('::');
        const leftParts = leftStr ? leftStr.split(':') : [];
        const rightParts = rightStr ? rightStr.split(':') : [];
        for (const p of [...leftParts, ...rightParts]) {
            if (!/^[0-9a-fA-F]{1,4}$/.test(p)) {
                throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
            }
        }
        const totalParts = leftParts.length + rightParts.length;
        if (totalParts > 7) {
            throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
        }
        const zerosCount = 8 - totalParts;
        const leftWords = leftParts.map(p => parseInt(p, 16));
        const rightWords = rightParts.map(p => parseInt(p, 16));
        words = [...leftWords, ...new Array(zerosCount).fill(0), ...rightWords];
    }
    else {
        const parts = normalizedIp.split(':');
        if (parts.length !== 8) {
            throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
        }
        for (const p of parts) {
            if (!/^[0-9a-fA-F]{1,4}$/.test(p)) {
                throw new errors_js_1.FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
            }
        }
        words = parts.map(p => parseInt(p, 16));
    }
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 8; i++) {
        bytes[i * 2] = (words[i] >> 8) & 0xff;
        bytes[i * 2 + 1] = words[i] & 0xff;
    }
    return bytes;
}
/**
 * Formats a 16-byte IPv6 address in RFC 5952 canonical format.
 */
function formatCanonicalIPv6(bytes) {
    const words = [];
    for (let i = 0; i < 16; i += 2) {
        words.push((bytes[i] << 8) | bytes[i + 1]);
    }
    // Find longest run of zeros (RFC 5952 requires length >= 2 to compress)
    let bestStart = -1;
    let bestLen = 0;
    let curStart = -1;
    let curLen = 0;
    for (let i = 0; i < 8; i++) {
        if (words[i] === 0) {
            if (curStart === -1) {
                curStart = i;
                curLen = 1;
            }
            else {
                curLen++;
            }
            if (curLen > bestLen) {
                bestLen = curLen;
                bestStart = curStart;
            }
        }
        else {
            curStart = -1;
            curLen = 0;
        }
    }
    // A single 16-bit 0 field MUST NOT be shortened to ::
    if (bestLen < 2) {
        return words.map(w => w.toString(16)).join(':');
    }
    if (bestLen === 8) {
        return '::';
    }
    const before = words.slice(0, bestStart).map(w => w.toString(16)).join(':');
    const after = words.slice(bestStart + bestLen).map(w => w.toString(16)).join(':');
    if (bestStart === 0) {
        return `::${after}`;
    }
    if (bestStart + bestLen === 8) {
        return `${before}::`;
    }
    return `${before}::${after}`;
}
/**
 * Formats 16 bytes as an expanded IPv6 address (all 8 4-hex groups).
 */
function formatExpandedIPv6(bytes) {
    const parts = [];
    for (let i = 0; i < 16; i += 2) {
        const h1 = bytes[i].toString(16).padStart(2, '0');
        const h2 = bytes[i + 1].toString(16).padStart(2, '0');
        parts.push(h1 + h2);
    }
    return parts.join(':');
}
/**
 * Converts a 128-bit BigInt to 16 bytes (big-endian).
 */
function bigIntTo16Bytes(value) {
    const bytes = new Uint8Array(16);
    let cur = value;
    for (let i = 15; i >= 0; i--) {
        bytes[i] = Number(cur & 0xffn);
        cur >>= 8n;
    }
    return bytes;
}
/**
 * Returns the IPv6 type classification matching .NET IPCalci.
 */
function getIPv6Type(b) {
    // Loopback ::1
    let isLoopback = true;
    for (let i = 0; i < 15; i++) {
        if (b[i] !== 0) {
            isLoopback = false;
            break;
        }
    }
    if (isLoopback && b[15] === 1)
        return 'Loopback (RFC 4291)';
    // Link-Local Unicast fe80::/10 (1111 1110 10xx xxxx)
    if (b[0] === 0xfe && (b[1] & 0xc0) === 0x80)
        return 'Link-Local Unicast (RFC 4291)';
    // Multicast ff00::/8
    if (b[0] === 0xff)
        return 'Multicast (RFC 4291)';
    // Site-Local Unicast fec0::/10 (1111 1110 11xx xxxx)
    if (b[0] === 0xfe && (b[1] & 0xc0) === 0xc0)
        return 'Site-Local Unicast (Deprecated RFC 3879)';
    // IPv4-Mapped IPv6 ::ffff:0:0/96
    let isMapped = true;
    for (let i = 0; i < 10; i++) {
        if (b[i] !== 0) {
            isMapped = false;
            break;
        }
    }
    if (isMapped && b[10] === 0xff && b[11] === 0xff)
        return 'IPv4-Mapped IPv6 (RFC 4291)';
    // Unspecified ::
    let allZeros = true;
    for (let i = 0; i < 16; i++) {
        if (b[i] !== 0) {
            allZeros = false;
            break;
        }
    }
    if (allZeros)
        return 'Unspecified (RFC 4291)';
    // ULA fc00::/7
    if ((b[0] & 0xfe) === 0xfc)
        return 'Unique Local Unicast / ULA (RFC 4193)';
    // Documentation 2001:db8::/32
    if (b[0] === 0x20 && b[1] === 0x01 && b[2] === 0x0d && b[3] === 0xb8) {
        return 'Documentation (RFC 3849)';
    }
    // Teredo 2001:0000::/32
    if (b[0] === 0x20 && b[1] === 0x01 && b[2] === 0x00 && b[3] === 0x00) {
        return 'Teredo Tunneling (RFC 4380)';
    }
    // 6to4 2002::/16
    if (b[0] === 0x20 && b[1] === 0x02)
        return '6to4 Tunneling (RFC 3056)';
    // NAT64 64:ff9b::/96
    if (b[0] === 0x00 && b[1] === 0x64 && b[2] === 0xff && b[3] === 0x9b) {
        return 'IPv4/IPv6 Translation / NAT64 (RFC 6052)';
    }
    // Discard-Only 100::/64
    if (b[0] === 0x01 && b[1] === 0x00)
        return 'Discard-Only Prefix (RFC 6666)';
    // Global Unicast 2000::/3 (001x xxxx)
    if ((b[0] & 0xe0) === 0x20)
        return 'Global Unicast / GUA (RFC 3587)';
    return 'Reserved';
}
/**
 * Returns binary representation of 128-bit IPv6 address.
 */
function toBinary128(b) {
    const parts = [];
    for (let i = 0; i < 8; i++) {
        const val = (b[i * 2] << 8) | b[i * 2 + 1];
        parts.push(val.toString(2).padStart(16, '0'));
    }
    return parts.join(':');
}
/**
 * Returns reverse DNS pointer (.ip6.arpa).
 */
function getReverseDnsPointer(b) {
    let hex = '';
    for (let i = 0; i < 16; i++) {
        hex += b[i].toString(16).padStart(2, '0');
    }
    const reversedNibbles = [];
    for (let i = hex.length - 1; i >= 0; i--) {
        reversedNibbles.push(hex[i]);
    }
    return reversedNibbles.join('.') + '.ip6.arpa';
}
/**
 * Parses an IPv6 address string and optional integer prefix length into a strongly-typed IPv6Info object.
 */
function parseIPv6Info(ip, prefixLength) {
    if (!ip || !ip.trim()) {
        throw new errors_js_1.ArgumentException('IPv6 address cannot be null, empty, or whitespace.', 'ip');
    }
    const trimmed = ip.trim();
    let ipPart;
    let parsedPrefix = null;
    if (prefixLength !== undefined && prefixLength !== null && String(prefixLength).trim() !== '') {
        ipPart = trimmed;
        parsedPrefix = prefixLength;
    }
    else if (trimmed.startsWith('[')) {
        const closeBracket = trimmed.indexOf(']');
        if (closeBracket === -1) {
            throw new errors_js_1.FormatException(`Malformed bracketed IPv6 address '${ip}'. Missing closing ']'.`);
        }
        ipPart = trimmed.substring(1, closeBracket);
        const remainder = trimmed.substring(closeBracket + 1).trim();
        if (remainder.startsWith('/')) {
            parsedPrefix = remainder.substring(1).trim();
        }
        else if (remainder) {
            parsedPrefix = remainder;
        }
    }
    else if (trimmed.includes('/')) {
        const parts = trimmed.split('/');
        if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
            throw new errors_js_1.FormatException(`Invalid IPv6 CIDR format '${ip}'. Expected format: 'IPv6/Prefix' (e.g. '2001:db8::1/64').`);
        }
        ipPart = parts[0].trim();
        parsedPrefix = parts[1].trim();
    }
    else if (trimmed.includes(' ')) {
        const parts = trimmed.split(/\s+/).filter(Boolean);
        if (parts.length !== 2) {
            throw new errors_js_1.FormatException(`Invalid IPv6 format '${ip}'. Expected 'IPv6 PrefixLength'.`);
        }
        ipPart = parts[0];
        parsedPrefix = parts[1];
    }
    else {
        ipPart = trimmed;
        parsedPrefix = null;
    }
    const cleanIp = ipPart.trim().replace(/^\[/, '').replace(/\]$/, '');
    const ipBytes = parseIPv6AddressToBytes(cleanIp);
    // BigInt address
    let ipBigInt = 0n;
    for (let i = 0; i < 16; i++) {
        ipBigInt = (ipBigInt << 8n) | BigInt(ipBytes[i]);
    }
    let prefix;
    if (parsedPrefix !== undefined && parsedPrefix !== null && String(parsedPrefix).trim() !== '') {
        const cleanPrefix = String(parsedPrefix).trim().replace(/^\//, '');
        if (!/^\s*-?\d+\s*$/.test(cleanPrefix)) {
            throw new errors_js_1.FormatException(`Invalid IPv6 prefix length '${parsedPrefix}'. Must be an integer between 0 and 128.`);
        }
        const p = parseInt(cleanPrefix, 10);
        if (p < 0 || p > 128) {
            throw new errors_js_1.ArgumentOutOfRangeException(`IPv6 prefix length /${p} is invalid. Must be between 0 and 128.`, 'prefixLength');
        }
        prefix = p;
    }
    else {
        // Default prefix: 128 for loopback, 64 otherwise
        prefix = (ipBigInt === 1n) ? 128 : 64;
    }
    const max128 = (1n << 128n) - 1n;
    const mask = prefix === 0 ? 0n : ((max128 << BigInt(128 - prefix)) & max128);
    const wildcard = (~mask) & max128;
    const networkBigInt = ipBigInt & mask;
    const lastBigInt = networkBigInt | wildcard;
    const canonicalIp = formatCanonicalIPv6(ipBytes);
    const expandedIp = formatExpandedIPv6(ipBytes);
    const netBytes = bigIntTo16Bytes(networkBigInt);
    const canonicalNetwork = formatCanonicalIPv6(netBytes);
    const expandedNetwork = formatExpandedIPv6(netBytes);
    const maskBytes = bigIntTo16Bytes(mask);
    const prefixNetmask = formatExpandedIPv6(maskBytes);
    const totalHosts = 1n << BigInt(128 - prefix);
    let firstUsableIp;
    let lastUsableIp;
    let usableRange;
    let usableHosts;
    if (prefix === 128) {
        firstUsableIp = canonicalIp;
        lastUsableIp = canonicalIp;
        usableRange = canonicalIp;
        usableHosts = 1n;
    }
    else if (prefix === 127) {
        firstUsableIp = canonicalNetwork;
        const lastBytes = bigIntTo16Bytes(lastBigInt);
        lastUsableIp = formatCanonicalIPv6(lastBytes);
        usableRange = `${firstUsableIp} - ${lastUsableIp}`;
        usableHosts = 2n;
    }
    else {
        const firstBytes = bigIntTo16Bytes(networkBigInt + 1n);
        firstUsableIp = formatCanonicalIPv6(firstBytes);
        const lastBytes = bigIntTo16Bytes(lastBigInt);
        lastUsableIp = formatCanonicalIPv6(lastBytes);
        usableRange = `${firstUsableIp} - ${lastUsableIp}`;
        usableHosts = totalHosts > 1n ? totalHosts - 1n : totalHosts;
    }
    const ipType = getIPv6Type(ipBytes);
    const reverseDns = getReverseDnsPointer(ipBytes);
    const binaryIp = toBinary128(ipBytes);
    let hexOnly = '';
    for (let i = 0; i < 16; i++) {
        hexOnly += ipBytes[i].toString(16).padStart(2, '0').toUpperCase();
    }
    const hexIp = `0x${hexOnly}`;
    const info = new IPv6Info();
    info.ipAddress = canonicalIp;
    info.expandedIpAddress = expandedIp;
    info.networkAddress = canonicalNetwork;
    info.expandedNetworkAddress = expandedNetwork;
    info.prefixLength = prefix;
    info.prefixNetmask = prefixNetmask;
    info.firstUsableIp = firstUsableIp;
    info.lastUsableIp = lastUsableIp;
    info.usableHostRange = usableRange;
    info.totalHosts = totalHosts;
    info.usableHosts = usableHosts;
    info.ipType = ipType;
    info.reverseDnsPointer = reverseDns;
    info.binaryIp = binaryIp;
    info.hexIp = hexIp;
    return info;
}
/**
 * Parses an IPv6 address string (e.g. "2001:db8::1/64" or "[2001:db8::1]/64")
 * and returns a dictionary of IPv6 network details.
 */
function parseIPv6(ip, prefixLength) {
    return parseIPv6Info(ip, prefixLength).toDictionary();
}
exports.ParseIPv6 = parseIPv6;
exports.parseIpv6 = parseIPv6;
exports.ParseIpv6 = parseIPv6;
exports.ParseIPv6Info = parseIPv6Info;
//# sourceMappingURL=ipv6.js.map