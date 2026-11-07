"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIPv4Info = exports.ParseIpv4 = exports.parseIpv4 = exports.ParseIPv4 = exports.IPv4Info = void 0;
exports.parseIPv4Info = parseIPv4Info;
exports.parseIPv4 = parseIPv4;
const errors_js_1 = require("./errors.js");
const dictionary_js_1 = require("./dictionary.js");
/**
 * Represents comprehensive IPv4 network and addressing details.
 */
class IPv4Info {
    ipAddress = '';
    networkAddress = '';
    subnetMask = '';
    cidr = 0;
    firstUsableIp = '';
    lastUsableIp = '';
    broadcastAddress = '';
    usableHostRange = '';
    totalHosts = 0;
    usableHosts = 0;
    wildcardMask = '';
    ipClass = '';
    ipType = '';
    binaryIp = '';
    binarySubnetMask = '';
    hexIp = '';
    decimalIp = 0;
    get cidrNotation() {
        return `/${this.cidr}`;
    }
    get cidrNetwork() {
        return `${this.networkAddress}/${this.cidr}`;
    }
    toDictionary() {
        return (0, dictionary_js_1.createCaseInsensitiveDictionary)({
            'Network': this.networkAddress,
            'Subnet Mask': this.subnetMask,
            'CIDR Notation': this.cidrNotation,
            'First Usable IP': this.firstUsableIp,
            'Broadcast Address': this.broadcastAddress,
            'Last Usable IP': this.lastUsableIp,
            'Usable Host Range': this.usableHostRange,
            'Total Number of Hosts': this.totalHosts.toString(),
            'Number of Usable Hosts': this.usableHosts.toString(),
            'Wildcard Mask': this.wildcardMask,
            'IP Class': this.ipClass,
            'IP Type': this.ipType,
            'IP Address': this.ipAddress,
            'CIDR Network': this.cidrNetwork,
            'Binary IP Address': this.binaryIp,
            'Binary Subnet Mask': this.binarySubnetMask,
            'Hex IP Address': this.hexIp,
            'Decimal IP Address': this.decimalIp.toString(),
            'Network Address': this.networkAddress,
            'SubnetMask': this.subnetMask,
            'CIDR': this.cidrNotation,
            'FirstUsableIp': this.firstUsableIp,
            'BroadcastAddress': this.broadcastAddress,
            'Broadcast': this.broadcastAddress,
            'LastUsableIp': this.lastUsableIp,
            'UsableHostRange': this.usableHostRange,
            'Total Hosts': this.totalHosts.toString(),
            'TotalHosts': this.totalHosts.toString(),
            'Usable Hosts': this.usableHosts.toString(),
            'UsableHosts': this.usableHosts.toString(),
            'WildcardMask': this.wildcardMask,
            'Wildcard': this.wildcardMask,
            'IpClass': this.ipClass,
            'Class': this.ipClass,
            'IpType': this.ipType,
            'Type': this.ipType,
            'IpAddress': this.ipAddress,
            'IP': this.ipAddress,
            'CidrNetwork': this.cidrNetwork,
            'Binary IP': this.binaryIp,
            'BinaryIp': this.binaryIp,
            'BinarySubnetMask': this.binarySubnetMask,
            'Binary Mask': this.binarySubnetMask,
            'Hex IP': this.hexIp,
            'HexIp': this.hexIp,
            'Decimal IP': this.decimalIp.toString(),
            'DecimalIp': this.decimalIp.toString()
        });
    }
    ToDictionary() {
        return this.toDictionary();
    }
    toList(withLabels = true) {
        if (withLabels) {
            return [
                `Network: ${this.networkAddress}`,
                `Subnet Mask: ${this.subnetMask}`,
                `CIDR Notation: ${this.cidrNotation}`,
                `First Usable IP: ${this.firstUsableIp}`,
                `Broadcast Address: ${this.broadcastAddress}`,
                `Last Usable IP: ${this.lastUsableIp}`,
                `Usable Host Range: ${this.usableHostRange}`,
                `Total Number of Hosts: ${this.totalHosts}`,
                `Number of Usable Hosts: ${this.usableHosts}`,
                `Wildcard Mask: ${this.wildcardMask}`,
                `IP Class: ${this.ipClass}`,
                `IP Type: ${this.ipType}`,
                `IP Address: ${this.ipAddress}`,
                `CIDR Network: ${this.cidrNetwork}`,
                `Binary IP Address: ${this.binaryIp}`,
                `Binary Subnet Mask: ${this.binarySubnetMask}`,
                `Hex IP Address: ${this.hexIp}`,
                `Decimal IP Address: ${this.decimalIp}`
            ];
        }
        return [
            this.networkAddress,
            this.subnetMask,
            this.cidrNotation,
            this.firstUsableIp,
            this.broadcastAddress,
            this.lastUsableIp,
            this.usableHostRange,
            this.totalHosts.toString(),
            this.usableHosts.toString(),
            this.wildcardMask,
            this.ipClass,
            this.ipType,
            this.ipAddress,
            this.cidrNetwork,
            this.binaryIp,
            this.binarySubnetMask,
            this.hexIp,
            this.decimalIp.toString()
        ];
    }
    ToList(withLabels = true) {
        return this.toList(withLabels);
    }
}
exports.IPv4Info = IPv4Info;
function parseOctets(input, fieldName) {
    const parts = input.split('.');
    if (parts.length !== 4) {
        throw new errors_js_1.FormatException(`Invalid ${fieldName} '${input}'. It must consist of exactly 4 octets separated by dots.`);
    }
    const octets = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        const part = parts[i];
        if (!/^\d+$/.test(part)) {
            throw new errors_js_1.FormatException(`Invalid octet '${part}' in ${fieldName} '${input}'. Each octet must be an integer between 0 and 255.`);
        }
        const val = Number(part);
        if (val < 0 || val > 255) {
            throw new errors_js_1.FormatException(`Invalid octet '${part}' in ${fieldName} '${input}'. Each octet must be an integer between 0 and 255.`);
        }
        octets[i] = val;
    }
    return octets;
}
function octetsToUint(octets) {
    return (((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0);
}
function uintToIp(value) {
    return `${(value >>> 24) & 0xff}.${(value >>> 16) & 0xff}.${(value >>> 8) & 0xff}.${value & 0xff}`;
}
function toBinaryDotted(value) {
    return [
        ((value >>> 24) & 0xff).toString(2).padStart(8, '0'),
        ((value >>> 16) & 0xff).toString(2).padStart(8, '0'),
        ((value >>> 8) & 0xff).toString(2).padStart(8, '0'),
        (value & 0xff).toString(2).padStart(8, '0')
    ].join('.');
}
function getDefaultCidr(firstOctet) {
    if (firstOctet <= 127)
        return 8;
    if (firstOctet <= 191)
        return 16;
    if (firstOctet <= 223)
        return 24;
    return 32;
}
function getIpClass(firstOctet) {
    if (firstOctet <= 127)
        return 'Class A';
    if (firstOctet <= 191)
        return 'Class B';
    if (firstOctet <= 223)
        return 'Class C';
    if (firstOctet <= 239)
        return 'Class D (Multicast)';
    return 'Class E (Experimental/Reserved)';
}
function getIpType(octets) {
    if (octets[0] === 10)
        return 'Private (RFC 1918)';
    if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
        return 'Private (RFC 1918)';
    if (octets[0] === 192 && octets[1] === 168)
        return 'Private (RFC 1918)';
    if (octets[0] === 127)
        return 'Loopback (RFC 1122)';
    if (octets[0] === 169 && octets[1] === 254)
        return 'Link-Local / APIPA (RFC 3927)';
    if (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127)
        return 'Carrier-Grade NAT / CGNAT (RFC 6598)';
    if (octets[0] === 0)
        return 'Current Network / This Host (RFC 1122)';
    if (octets[0] >= 224 && octets[0] <= 239)
        return 'Multicast (RFC 5771)';
    if (octets[0] === 255 && octets[1] === 255 && octets[2] === 255 && octets[3] === 255)
        return 'Limited Broadcast (RFC 919)';
    if (octets[0] >= 240)
        return 'Reserved for Future Use (RFC 1112)';
    return 'Public';
}
/**
 * Parses an IPv4 address and optional subnet mask / CIDR into a strongly-typed IPv4Info object.
 */
function parseIPv4Info(ip, maskPart) {
    if (!ip || !ip.trim()) {
        throw new errors_js_1.ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
    }
    const trimmed = ip.trim();
    let ipPart;
    let parsedMask = null;
    if (maskPart !== undefined && maskPart !== null) {
        ipPart = trimmed;
        parsedMask = maskPart;
    }
    else if (trimmed.includes('/')) {
        const parts = trimmed.split('/');
        if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
            throw new errors_js_1.FormatException(`Invalid CIDR format '${ip}'. Expected format: 'IP/CIDR' (e.g. '192.168.1.10/24').`);
        }
        ipPart = parts[0].trim();
        parsedMask = parts[1].trim();
    }
    else if (trimmed.includes(' ')) {
        const parts = trimmed.split(/\s+/).filter(Boolean);
        if (parts.length !== 2) {
            throw new errors_js_1.FormatException(`Invalid IP format '${ip}'. Expected 'IP SubnetMask' or 'IP CIDR'.`);
        }
        ipPart = parts[0];
        parsedMask = parts[1];
    }
    else {
        ipPart = trimmed;
        parsedMask = null;
    }
    const ipOctets = parseOctets(ipPart.trim(), 'IPv4 address');
    const ipUint = octetsToUint(ipOctets);
    let cidr;
    if (!parsedMask || !parsedMask.trim()) {
        cidr = getDefaultCidr(ipOctets[0]);
    }
    else {
        const cleanMask = parsedMask.trim().replace(/^\//, '');
        if (/^\s*-?\d+\s*$/.test(cleanMask)) {
            const parsedCidr = parseInt(cleanMask, 10);
            if (parsedCidr < 0 || parsedCidr > 32) {
                throw new errors_js_1.ArgumentOutOfRangeException(`CIDR prefix length /${parsedCidr} is invalid. Must be between 0 and 32.`, 'maskPart');
            }
            cidr = parsedCidr;
        }
        else {
            const maskOctets = parseOctets(cleanMask, 'Subnet mask');
            const maskUintFromOctets = octetsToUint(maskOctets);
            const notMask = (~maskUintFromOctets) >>> 0;
            const leadingOnes = Math.clz32(notMask);
            const expectedMask = leadingOnes === 0 ? 0 : ((0xffffffff << (32 - leadingOnes)) >>> 0);
            if (expectedMask !== maskUintFromOctets) {
                throw new errors_js_1.ArgumentException(`Subnet mask '${cleanMask}' is not a valid contiguous netmask.`, 'maskPart');
            }
            cidr = leadingOnes;
        }
    }
    const maskUint = cidr === 0 ? 0 : ((0xffffffff << (32 - cidr)) >>> 0);
    const wildcardUint = (~maskUint) >>> 0;
    const networkUint = (ipUint & maskUint) >>> 0;
    const broadcastUint = (networkUint | wildcardUint) >>> 0;
    const ipStr = uintToIp(ipUint);
    const networkStr = uintToIp(networkUint);
    const maskStr = uintToIp(maskUint);
    const wildcardStr = uintToIp(wildcardUint);
    const broadcastStr = uintToIp(broadcastUint);
    const totalHosts = cidr === 0 ? 4294967296 : Math.pow(2, 32 - cidr);
    let firstUsableStr;
    let lastUsableStr;
    let usableRangeStr;
    let usableHosts;
    if (cidr === 32) {
        firstUsableStr = ipStr;
        lastUsableStr = ipStr;
        usableRangeStr = ipStr;
        usableHosts = 1;
    }
    else if (cidr === 31) {
        firstUsableStr = networkStr;
        lastUsableStr = broadcastStr;
        usableRangeStr = `${firstUsableStr} - ${lastUsableStr}`;
        usableHosts = 2;
    }
    else {
        firstUsableStr = uintToIp(networkUint + 1);
        lastUsableStr = uintToIp(broadcastUint - 1);
        usableRangeStr = `${firstUsableStr} - ${lastUsableStr}`;
        usableHosts = Math.max(0, totalHosts - 2);
    }
    const ipClass = getIpClass(ipOctets[0]);
    const ipType = getIpType(ipOctets);
    const info = new IPv4Info();
    info.ipAddress = ipStr;
    info.networkAddress = networkStr;
    info.subnetMask = maskStr;
    info.cidr = cidr;
    info.firstUsableIp = firstUsableStr;
    info.lastUsableIp = lastUsableStr;
    info.broadcastAddress = broadcastStr;
    info.usableHostRange = usableRangeStr;
    info.totalHosts = totalHosts;
    info.usableHosts = usableHosts;
    info.wildcardMask = wildcardStr;
    info.ipClass = ipClass;
    info.ipType = ipType;
    info.binaryIp = toBinaryDotted(ipUint);
    info.binarySubnetMask = toBinaryDotted(maskUint);
    info.hexIp = `0x${ipUint.toString(16).toUpperCase().padStart(8, '0')}`;
    info.decimalIp = ipUint;
    return info;
}
/**
 * Parses an IPv4 address string (e.g. "192.168.1.10/24", "192.168.1.10 255.255.255.0", or "192.168.1.10").
 */
function parseIPv4(ip, subnetMaskOrCidr) {
    return parseIPv4Info(ip, subnetMaskOrCidr).toDictionary();
}
exports.ParseIPv4 = parseIPv4;
exports.parseIpv4 = parseIPv4;
exports.ParseIpv4 = parseIPv4;
exports.ParseIPv4Info = parseIPv4Info;
//# sourceMappingURL=ipv4.js.map