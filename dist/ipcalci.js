"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCalculator = exports.Class1 = exports.IPCalci = exports.ParseInfo = exports.ParseToList = exports.Parse = void 0;
exports.parse = parse;
exports.parseToList = parseToList;
exports.parseInfo = parseInfo;
const errors_js_1 = require("./errors.js");
const ipv4_js_1 = require("./ipv4.js");
const ipv6_js_1 = require("./ipv6.js");
/**
 * Unified parse method that automatically detects IPv4 vs IPv6.
 */
function parse(ip, subnetOrPrefix) {
    if (!ip || !ip.trim()) {
        throw new errors_js_1.ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
    }
    const trimmed = ip.trim();
    if (subnetOrPrefix !== undefined && subnetOrPrefix !== null && subnetOrPrefix.trim() !== '') {
        if (trimmed.includes(':')) {
            const clean = subnetOrPrefix.trim().replace(/^\//, '');
            if (/^\s*-?\d+\s*$/.test(clean)) {
                return (0, ipv6_js_1.parseIPv6)(trimmed, parseInt(clean, 10));
            }
            throw new errors_js_1.FormatException(`Invalid IPv6 prefix length '${subnetOrPrefix}'. Must be an integer between 0 and 128.`);
        }
        return (0, ipv4_js_1.parseIPv4)(trimmed, subnetOrPrefix);
    }
    if (trimmed.includes(':')) {
        return (0, ipv6_js_1.parseIPv6)(trimmed);
    }
    return (0, ipv4_js_1.parseIPv4)(trimmed);
}
exports.Parse = parse;
/**
 * Helper to return calculation results as a list of strings.
 */
function parseToList(ip, withLabels = true) {
    if (!ip || !ip.trim()) {
        throw new errors_js_1.ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
    }
    if (ip.includes(':')) {
        return (0, ipv6_js_1.parseIPv6Info)(ip).toList(withLabels);
    }
    return (0, ipv4_js_1.parseIPv4Info)(ip).toList(withLabels);
}
exports.ParseToList = parseToList;
/**
 * Parses an IP address and returns a strongly-typed IPv4Info or IPv6Info object.
 */
function parseInfo(ip) {
    if (!ip || !ip.trim()) {
        throw new errors_js_1.ArgumentException('IP address cannot be null, empty, or whitespace.', 'ip');
    }
    if (ip.includes(':')) {
        return (0, ipv6_js_1.parseIPv6Info)(ip);
    }
    return (0, ipv4_js_1.parseIPv4Info)(ip);
}
exports.ParseInfo = parseInfo;
/**
 * Provides calculation and parsing methods for IPv4 and IPv6 addresses and subnets.
 */
class IPCalci {
    // Static methods
    static parse = parse;
    static Parse = parse;
    static parseIPv4 = ipv4_js_1.parseIPv4;
    static ParseIPv4 = ipv4_js_1.parseIPv4;
    static parseIpv4 = ipv4_js_1.parseIPv4;
    static ParseIpv4 = ipv4_js_1.parseIPv4;
    static parseIPv6 = ipv6_js_1.parseIPv6;
    static ParseIPv6 = ipv6_js_1.parseIPv6;
    static parseIpv6 = ipv6_js_1.parseIPv6;
    static ParseIpv6 = ipv6_js_1.parseIPv6;
    static parseToList = parseToList;
    static ParseToList = parseToList;
    static parseInfo = parseInfo;
    static ParseInfo = parseInfo;
    static parseIPv4Info = ipv4_js_1.parseIPv4Info;
    static ParseIPv4Info = ipv4_js_1.parseIPv4Info;
    static parseIPv6Info = ipv6_js_1.parseIPv6Info;
    static ParseIPv6Info = ipv6_js_1.parseIPv6Info;
    // Instance methods
    parse(ip, subnetOrPrefix) {
        return IPCalci.parse(ip, subnetOrPrefix);
    }
    Parse(ip, subnetOrPrefix) {
        return IPCalci.parse(ip, subnetOrPrefix);
    }
    parseIPv4(ip, subnetMaskOrCidr) {
        return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
    }
    ParseIPv4(ip, subnetMaskOrCidr) {
        return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
    }
    parseIpv4(ip, subnetMaskOrCidr) {
        return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
    }
    ParseIpv4(ip, subnetMaskOrCidr) {
        return IPCalci.parseIPv4(ip, subnetMaskOrCidr);
    }
    parseIPv6(ip, prefixLength) {
        return IPCalci.parseIPv6(ip, prefixLength);
    }
    ParseIPv6(ip, prefixLength) {
        return IPCalci.parseIPv6(ip, prefixLength);
    }
    parseIpv6(ip, prefixLength) {
        return IPCalci.parseIPv6(ip, prefixLength);
    }
    ParseIpv6(ip, prefixLength) {
        return IPCalci.parseIPv6(ip, prefixLength);
    }
    parseToList(ip, withLabels = true) {
        return IPCalci.parseToList(ip, withLabels);
    }
    ParseToList(ip, withLabels = true) {
        return IPCalci.parseToList(ip, withLabels);
    }
    parseInfo(ip) {
        return IPCalci.parseInfo(ip);
    }
    ParseInfo(ip) {
        return IPCalci.parseInfo(ip);
    }
    parseIPv4Info(ip, maskPart) {
        return IPCalci.parseIPv4Info(ip, maskPart);
    }
    ParseIPv4Info(ip, maskPart) {
        return IPCalci.parseIPv4Info(ip, maskPart);
    }
    parseIPv6Info(ip, prefixLength) {
        return IPCalci.parseIPv6Info(ip, prefixLength);
    }
    ParseIPv6Info(ip, prefixLength) {
        return IPCalci.parseIPv6Info(ip, prefixLength);
    }
}
exports.IPCalci = IPCalci;
/**
 * Alias for IPCalci matching original template class name Class1.
 */
class Class1 extends IPCalci {
}
exports.Class1 = Class1;
/**
 * Alias for IPCalci as IPCalculator.
 */
class IPCalculator extends IPCalci {
}
exports.IPCalculator = IPCalculator;
//# sourceMappingURL=ipcalci.js.map