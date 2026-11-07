// src/errors.ts
class ArgumentException extends Error {
  paramName;
  constructor(message, paramName) {
    super(message);
    this.name = "ArgumentException";
    this.paramName = paramName;
    Object.setPrototypeOf(this, ArgumentException.prototype);
  }
}

class FormatException extends Error {
  constructor(message) {
    super(message);
    this.name = "FormatException";
    Object.setPrototypeOf(this, FormatException.prototype);
  }
}

class ArgumentOutOfRangeException extends RangeError {
  paramName;
  constructor(message, paramName) {
    super(message);
    this.name = "ArgumentOutOfRangeException";
    this.paramName = paramName;
    Object.setPrototypeOf(this, ArgumentOutOfRangeException.prototype);
  }
}

// src/dictionary.ts
function createCaseInsensitiveDictionary(data) {
  const lowerMap = new Map;
  const strippedMap = new Map;
  for (const key of Object.keys(data)) {
    const lower = key.toLowerCase();
    if (!lowerMap.has(lower)) {
      lowerMap.set(lower, key);
    }
    const stripped = lower.replace(/[\s_-]/g, "");
    if (!strippedMap.has(stripped)) {
      strippedMap.set(stripped, key);
    }
  }
  const helperMethods = {
    get(key) {
      if (typeof key !== "string")
        return;
      if (key in data)
        return data[key];
      const lower = key.toLowerCase();
      if (lowerMap.has(lower))
        return data[lowerMap.get(lower)];
      const stripped = lower.replace(/[\s_-]/g, "");
      if (strippedMap.has(stripped))
        return data[strippedMap.get(stripped)];
      return;
    },
    has(key) {
      if (typeof key !== "string")
        return false;
      if (key in data)
        return true;
      const lower = key.toLowerCase();
      if (lowerMap.has(lower))
        return true;
      const stripped = lower.replace(/[\s_-]/g, "");
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
      if (typeof prop === "string") {
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
        const stripped = lower.replace(/[\s_-]/g, "");
        if (strippedMap.has(stripped)) {
          return target[strippedMap.get(stripped)];
        }
      }
      return Reflect.get(target, prop, receiver);
    },
    has(target, prop) {
      if (typeof prop === "string") {
        if (prop in helperMethods)
          return true;
        if (prop in target)
          return true;
        const lower = prop.toLowerCase();
        if (lowerMap.has(lower))
          return true;
        const stripped = lower.replace(/[\s_-]/g, "");
        if (strippedMap.has(stripped))
          return true;
      }
      return Reflect.has(target, prop);
    }
  });
}

// src/ipv4.ts
class IPv4Info {
  ipAddress = "";
  networkAddress = "";
  subnetMask = "";
  cidr = 0;
  firstUsableIp = "";
  lastUsableIp = "";
  broadcastAddress = "";
  usableHostRange = "";
  totalHosts = 0;
  usableHosts = 0;
  wildcardMask = "";
  ipClass = "";
  ipType = "";
  binaryIp = "";
  binarySubnetMask = "";
  hexIp = "";
  decimalIp = 0;
  get cidrNotation() {
    return `/${this.cidr}`;
  }
  get cidrNetwork() {
    return `${this.networkAddress}/${this.cidr}`;
  }
  toDictionary() {
    return createCaseInsensitiveDictionary({
      Network: this.networkAddress,
      "Subnet Mask": this.subnetMask,
      "CIDR Notation": this.cidrNotation,
      "First Usable IP": this.firstUsableIp,
      "Broadcast Address": this.broadcastAddress,
      "Last Usable IP": this.lastUsableIp,
      "Usable Host Range": this.usableHostRange,
      "Total Number of Hosts": this.totalHosts.toString(),
      "Number of Usable Hosts": this.usableHosts.toString(),
      "Wildcard Mask": this.wildcardMask,
      "IP Class": this.ipClass,
      "IP Type": this.ipType,
      "IP Address": this.ipAddress,
      "CIDR Network": this.cidrNetwork,
      "Binary IP Address": this.binaryIp,
      "Binary Subnet Mask": this.binarySubnetMask,
      "Hex IP Address": this.hexIp,
      "Decimal IP Address": this.decimalIp.toString(),
      "Network Address": this.networkAddress,
      SubnetMask: this.subnetMask,
      CIDR: this.cidrNotation,
      FirstUsableIp: this.firstUsableIp,
      BroadcastAddress: this.broadcastAddress,
      Broadcast: this.broadcastAddress,
      LastUsableIp: this.lastUsableIp,
      UsableHostRange: this.usableHostRange,
      "Total Hosts": this.totalHosts.toString(),
      TotalHosts: this.totalHosts.toString(),
      "Usable Hosts": this.usableHosts.toString(),
      UsableHosts: this.usableHosts.toString(),
      WildcardMask: this.wildcardMask,
      Wildcard: this.wildcardMask,
      IpClass: this.ipClass,
      Class: this.ipClass,
      IpType: this.ipType,
      Type: this.ipType,
      IpAddress: this.ipAddress,
      IP: this.ipAddress,
      CidrNetwork: this.cidrNetwork,
      "Binary IP": this.binaryIp,
      BinaryIp: this.binaryIp,
      BinarySubnetMask: this.binarySubnetMask,
      "Binary Mask": this.binarySubnetMask,
      "Hex IP": this.hexIp,
      HexIp: this.hexIp,
      "Decimal IP": this.decimalIp.toString(),
      DecimalIp: this.decimalIp.toString()
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
function parseOctets(input, fieldName) {
  const parts = input.split(".");
  if (parts.length !== 4) {
    throw new FormatException(`Invalid ${fieldName} '${input}'. It must consist of exactly 4 octets separated by dots.`);
  }
  const octets = [0, 0, 0, 0];
  for (let i = 0;i < 4; i++) {
    const part = parts[i];
    if (!/^\d+$/.test(part)) {
      throw new FormatException(`Invalid octet '${part}' in ${fieldName} '${input}'. Each octet must be an integer between 0 and 255.`);
    }
    const val = Number(part);
    if (val < 0 || val > 255) {
      throw new FormatException(`Invalid octet '${part}' in ${fieldName} '${input}'. Each octet must be an integer between 0 and 255.`);
    }
    octets[i] = val;
  }
  return octets;
}
function octetsToUint(octets) {
  return (octets[0] << 24 | octets[1] << 16 | octets[2] << 8 | octets[3]) >>> 0;
}
function uintToIp(value) {
  return `${value >>> 24 & 255}.${value >>> 16 & 255}.${value >>> 8 & 255}.${value & 255}`;
}
function toBinaryDotted(value) {
  return [
    (value >>> 24 & 255).toString(2).padStart(8, "0"),
    (value >>> 16 & 255).toString(2).padStart(8, "0"),
    (value >>> 8 & 255).toString(2).padStart(8, "0"),
    (value & 255).toString(2).padStart(8, "0")
  ].join(".");
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
    return "Class A";
  if (firstOctet <= 191)
    return "Class B";
  if (firstOctet <= 223)
    return "Class C";
  if (firstOctet <= 239)
    return "Class D (Multicast)";
  return "Class E (Experimental/Reserved)";
}
function getIpType(octets) {
  if (octets[0] === 10)
    return "Private (RFC 1918)";
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    return "Private (RFC 1918)";
  if (octets[0] === 192 && octets[1] === 168)
    return "Private (RFC 1918)";
  if (octets[0] === 127)
    return "Loopback (RFC 1122)";
  if (octets[0] === 169 && octets[1] === 254)
    return "Link-Local / APIPA (RFC 3927)";
  if (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127)
    return "Carrier-Grade NAT / CGNAT (RFC 6598)";
  if (octets[0] === 0)
    return "Current Network / This Host (RFC 1122)";
  if (octets[0] >= 224 && octets[0] <= 239)
    return "Multicast (RFC 5771)";
  if (octets[0] === 255 && octets[1] === 255 && octets[2] === 255 && octets[3] === 255)
    return "Limited Broadcast (RFC 919)";
  if (octets[0] >= 240)
    return "Reserved for Future Use (RFC 1112)";
  return "Public";
}
function parseIPv4Info(ip, maskPart) {
  if (!ip || !ip.trim()) {
    throw new ArgumentException("IP address cannot be null, empty, or whitespace.", "ip");
  }
  const trimmed = ip.trim();
  let ipPart;
  let parsedMask = null;
  if (maskPart !== undefined && maskPart !== null) {
    ipPart = trimmed;
    parsedMask = maskPart;
  } else if (trimmed.includes("/")) {
    const parts = trimmed.split("/");
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new FormatException(`Invalid CIDR format '${ip}'. Expected format: 'IP/CIDR' (e.g. '192.168.1.10/24').`);
    }
    ipPart = parts[0].trim();
    parsedMask = parts[1].trim();
  } else if (trimmed.includes(" ")) {
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length !== 2) {
      throw new FormatException(`Invalid IP format '${ip}'. Expected 'IP SubnetMask' or 'IP CIDR'.`);
    }
    ipPart = parts[0];
    parsedMask = parts[1];
  } else {
    ipPart = trimmed;
    parsedMask = null;
  }
  const ipOctets = parseOctets(ipPart.trim(), "IPv4 address");
  const ipUint = octetsToUint(ipOctets);
  let cidr;
  if (!parsedMask || !parsedMask.trim()) {
    cidr = getDefaultCidr(ipOctets[0]);
  } else {
    const cleanMask = parsedMask.trim().replace(/^\//, "");
    if (/^\s*-?\d+\s*$/.test(cleanMask)) {
      const parsedCidr = parseInt(cleanMask, 10);
      if (parsedCidr < 0 || parsedCidr > 32) {
        throw new ArgumentOutOfRangeException(`CIDR prefix length /${parsedCidr} is invalid. Must be between 0 and 32.`, "maskPart");
      }
      cidr = parsedCidr;
    } else {
      const maskOctets = parseOctets(cleanMask, "Subnet mask");
      const maskUintFromOctets = octetsToUint(maskOctets);
      const notMask = ~maskUintFromOctets >>> 0;
      const leadingOnes = Math.clz32(notMask);
      const expectedMask = leadingOnes === 0 ? 0 : 4294967295 << 32 - leadingOnes >>> 0;
      if (expectedMask !== maskUintFromOctets) {
        throw new ArgumentException(`Subnet mask '${cleanMask}' is not a valid contiguous netmask.`, "maskPart");
      }
      cidr = leadingOnes;
    }
  }
  const maskUint = cidr === 0 ? 0 : 4294967295 << 32 - cidr >>> 0;
  const wildcardUint = ~maskUint >>> 0;
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
  } else if (cidr === 31) {
    firstUsableStr = networkStr;
    lastUsableStr = broadcastStr;
    usableRangeStr = `${firstUsableStr} - ${lastUsableStr}`;
    usableHosts = 2;
  } else {
    firstUsableStr = uintToIp(networkUint + 1);
    lastUsableStr = uintToIp(broadcastUint - 1);
    usableRangeStr = `${firstUsableStr} - ${lastUsableStr}`;
    usableHosts = Math.max(0, totalHosts - 2);
  }
  const ipClass = getIpClass(ipOctets[0]);
  const ipType = getIpType(ipOctets);
  const info = new IPv4Info;
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
  info.hexIp = `0x${ipUint.toString(16).toUpperCase().padStart(8, "0")}`;
  info.decimalIp = ipUint;
  return info;
}
function parseIPv4(ip, subnetMaskOrCidr) {
  return parseIPv4Info(ip, subnetMaskOrCidr).toDictionary();
}
var ParseIPv4 = parseIPv4;
var parseIpv4 = parseIPv4;
var ParseIpv4 = parseIPv4;
var ParseIPv4Info = parseIPv4Info;

// src/ipv6.ts
class IPv6Info {
  ipAddress = "";
  expandedIpAddress = "";
  networkAddress = "";
  expandedNetworkAddress = "";
  prefixLength = 0;
  prefixNetmask = "";
  firstUsableIp = "";
  lastUsableIp = "";
  usableHostRange = "";
  totalHosts = 0n;
  usableHosts = 0n;
  ipType = "";
  reverseDnsPointer = "";
  binaryIp = "";
  hexIp = "";
  get cidrNotation() {
    return `/${this.prefixLength}`;
  }
  get cidrNetwork() {
    return `${this.networkAddress}/${this.prefixLength}`;
  }
  toDictionary() {
    return createCaseInsensitiveDictionary({
      "IP Address": this.ipAddress,
      "Expanded IP Address": this.expandedIpAddress,
      Network: this.networkAddress,
      "Expanded Network": this.expandedNetworkAddress,
      "CIDR Notation": this.cidrNotation,
      "Prefix Length": this.prefixLength.toString(),
      "Prefix Netmask": this.prefixNetmask,
      "CIDR Network": this.cidrNetwork,
      "First Usable IP": this.firstUsableIp,
      "Last Usable IP": this.lastUsableIp,
      "Usable Host Range": this.usableHostRange,
      "Total Number of Hosts": this.totalHosts.toString(),
      "Number of Usable Hosts": this.usableHosts.toString(),
      "IP Type": this.ipType,
      "Reverse DNS Pointer": this.reverseDnsPointer,
      "Binary IP Address": this.binaryIp,
      "Hex IP Address": this.hexIp,
      "Network Address": this.networkAddress,
      "Subnet Mask": this.prefixNetmask,
      SubnetMask: this.prefixNetmask,
      CIDR: this.cidrNotation,
      FirstUsableIp: this.firstUsableIp,
      LastUsableIp: this.lastUsableIp,
      UsableHostRange: this.usableHostRange,
      "Total Hosts": this.totalHosts.toString(),
      TotalHosts: this.totalHosts.toString(),
      "Usable Hosts": this.usableHosts.toString(),
      UsableHosts: this.usableHosts.toString(),
      IpType: this.ipType,
      Type: this.ipType,
      IpAddress: this.ipAddress,
      IP: this.ipAddress,
      CidrNetwork: this.cidrNetwork,
      ReverseDnsPointer: this.reverseDnsPointer,
      "Reverse DNS": this.reverseDnsPointer,
      "Binary IP": this.binaryIp,
      BinaryIp: this.binaryIp,
      "Hex IP": this.hexIp,
      HexIp: this.hexIp
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
function parseIPv6AddressToBytes(rawIp) {
  const cleanIp = rawIp.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!cleanIp) {
    throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
  }
  if (!/^[0-9a-fA-F:.]+$/.test(cleanIp)) {
    throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
  }
  if (cleanIp.includes(":::")) {
    throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
  }
  const doubleColonParts = cleanIp.split("::");
  if (doubleColonParts.length > 2) {
    throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
  }
  if (cleanIp.startsWith(":") && !cleanIp.startsWith("::") || cleanIp.endsWith(":") && !cleanIp.endsWith("::")) {
    throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
  }
  let normalizedIp = cleanIp;
  const lastColon = cleanIp.lastIndexOf(":");
  const lastPart = lastColon >= 0 ? cleanIp.substring(lastColon + 1) : cleanIp;
  if (lastPart.includes(".")) {
    const octets = lastPart.split(".");
    if (octets.length !== 4) {
      throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    const numOctets = [];
    for (const o of octets) {
      if (!/^\d+$/.test(o)) {
        throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
      }
      const val = Number(o);
      if (val < 0 || val > 255) {
        throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
      }
      numOctets.push(val);
    }
    const w1 = (numOctets[0] << 8 | numOctets[1]).toString(16);
    const w2 = (numOctets[2] << 8 | numOctets[3]).toString(16);
    const prefix = cleanIp.substring(0, lastColon + 1);
    normalizedIp = `${prefix}${w1}:${w2}`;
  }
  if (normalizedIp === "::") {
    return new Uint8Array(16);
  }
  let words = [];
  if (normalizedIp.includes("::")) {
    const [leftStr = "", rightStr = ""] = normalizedIp.split("::");
    const leftParts = leftStr ? leftStr.split(":") : [];
    const rightParts = rightStr ? rightStr.split(":") : [];
    for (const p of [...leftParts, ...rightParts]) {
      if (!/^[0-9a-fA-F]{1,4}$/.test(p)) {
        throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
      }
    }
    const totalParts = leftParts.length + rightParts.length;
    if (totalParts > 7) {
      throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    const zerosCount = 8 - totalParts;
    const leftWords = leftParts.map((p) => parseInt(p, 16));
    const rightWords = rightParts.map((p) => parseInt(p, 16));
    words = [...leftWords, ...new Array(zerosCount).fill(0), ...rightWords];
  } else {
    const parts = normalizedIp.split(":");
    if (parts.length !== 8) {
      throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
    }
    for (const p of parts) {
      if (!/^[0-9a-fA-F]{1,4}$/.test(p)) {
        throw new FormatException(`Invalid IPv6 address format: '${rawIp}'.`);
      }
    }
    words = parts.map((p) => parseInt(p, 16));
  }
  const bytes = new Uint8Array(16);
  for (let i = 0;i < 8; i++) {
    bytes[i * 2] = words[i] >> 8 & 255;
    bytes[i * 2 + 1] = words[i] & 255;
  }
  return bytes;
}
function formatCanonicalIPv6(bytes) {
  const words = [];
  for (let i = 0;i < 16; i += 2) {
    words.push(bytes[i] << 8 | bytes[i + 1]);
  }
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  for (let i = 0;i < 8; i++) {
    if (words[i] === 0) {
      if (curStart === -1) {
        curStart = i;
        curLen = 1;
      } else {
        curLen++;
      }
      if (curLen > bestLen) {
        bestLen = curLen;
        bestStart = curStart;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }
  if (bestLen < 2) {
    return words.map((w) => w.toString(16)).join(":");
  }
  if (bestLen === 8) {
    return "::";
  }
  const before = words.slice(0, bestStart).map((w) => w.toString(16)).join(":");
  const after = words.slice(bestStart + bestLen).map((w) => w.toString(16)).join(":");
  if (bestStart === 0) {
    return `::${after}`;
  }
  if (bestStart + bestLen === 8) {
    return `${before}::`;
  }
  return `${before}::${after}`;
}
function formatExpandedIPv6(bytes) {
  const parts = [];
  for (let i = 0;i < 16; i += 2) {
    const h1 = bytes[i].toString(16).padStart(2, "0");
    const h2 = bytes[i + 1].toString(16).padStart(2, "0");
    parts.push(h1 + h2);
  }
  return parts.join(":");
}
function bigIntTo16Bytes(value) {
  const bytes = new Uint8Array(16);
  let cur = value;
  for (let i = 15;i >= 0; i--) {
    bytes[i] = Number(cur & 0xffn);
    cur >>= 8n;
  }
  return bytes;
}
function getIPv6Type(b) {
  let isLoopback = true;
  for (let i = 0;i < 15; i++) {
    if (b[i] !== 0) {
      isLoopback = false;
      break;
    }
  }
  if (isLoopback && b[15] === 1)
    return "Loopback (RFC 4291)";
  if (b[0] === 254 && (b[1] & 192) === 128)
    return "Link-Local Unicast (RFC 4291)";
  if (b[0] === 255)
    return "Multicast (RFC 4291)";
  if (b[0] === 254 && (b[1] & 192) === 192)
    return "Site-Local Unicast (Deprecated RFC 3879)";
  let isMapped = true;
  for (let i = 0;i < 10; i++) {
    if (b[i] !== 0) {
      isMapped = false;
      break;
    }
  }
  if (isMapped && b[10] === 255 && b[11] === 255)
    return "IPv4-Mapped IPv6 (RFC 4291)";
  let allZeros = true;
  for (let i = 0;i < 16; i++) {
    if (b[i] !== 0) {
      allZeros = false;
      break;
    }
  }
  if (allZeros)
    return "Unspecified (RFC 4291)";
  if ((b[0] & 254) === 252)
    return "Unique Local Unicast / ULA (RFC 4193)";
  if (b[0] === 32 && b[1] === 1 && b[2] === 13 && b[3] === 184) {
    return "Documentation (RFC 3849)";
  }
  if (b[0] === 32 && b[1] === 1 && b[2] === 0 && b[3] === 0) {
    return "Teredo Tunneling (RFC 4380)";
  }
  if (b[0] === 32 && b[1] === 2)
    return "6to4 Tunneling (RFC 3056)";
  if (b[0] === 0 && b[1] === 100 && b[2] === 255 && b[3] === 155) {
    return "IPv4/IPv6 Translation / NAT64 (RFC 6052)";
  }
  if (b[0] === 1 && b[1] === 0)
    return "Discard-Only Prefix (RFC 6666)";
  if ((b[0] & 224) === 32)
    return "Global Unicast / GUA (RFC 3587)";
  return "Reserved";
}
function toBinary128(b) {
  const parts = [];
  for (let i = 0;i < 8; i++) {
    const val = b[i * 2] << 8 | b[i * 2 + 1];
    parts.push(val.toString(2).padStart(16, "0"));
  }
  return parts.join(":");
}
function getReverseDnsPointer(b) {
  let hex = "";
  for (let i = 0;i < 16; i++) {
    hex += b[i].toString(16).padStart(2, "0");
  }
  const reversedNibbles = [];
  for (let i = hex.length - 1;i >= 0; i--) {
    reversedNibbles.push(hex[i]);
  }
  return reversedNibbles.join(".") + ".ip6.arpa";
}
function parseIPv6Info(ip, prefixLength) {
  if (!ip || !ip.trim()) {
    throw new ArgumentException("IPv6 address cannot be null, empty, or whitespace.", "ip");
  }
  const trimmed = ip.trim();
  let ipPart;
  let parsedPrefix = null;
  if (prefixLength !== undefined && prefixLength !== null && String(prefixLength).trim() !== "") {
    ipPart = trimmed;
    parsedPrefix = prefixLength;
  } else if (trimmed.startsWith("[")) {
    const closeBracket = trimmed.indexOf("]");
    if (closeBracket === -1) {
      throw new FormatException(`Malformed bracketed IPv6 address '${ip}'. Missing closing ']'.`);
    }
    ipPart = trimmed.substring(1, closeBracket);
    const remainder = trimmed.substring(closeBracket + 1).trim();
    if (remainder.startsWith("/")) {
      parsedPrefix = remainder.substring(1).trim();
    } else if (remainder) {
      parsedPrefix = remainder;
    }
  } else if (trimmed.includes("/")) {
    const parts = trimmed.split("/");
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new FormatException(`Invalid IPv6 CIDR format '${ip}'. Expected format: 'IPv6/Prefix' (e.g. '2001:db8::1/64').`);
    }
    ipPart = parts[0].trim();
    parsedPrefix = parts[1].trim();
  } else if (trimmed.includes(" ")) {
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length !== 2) {
      throw new FormatException(`Invalid IPv6 format '${ip}'. Expected 'IPv6 PrefixLength'.`);
    }
    ipPart = parts[0];
    parsedPrefix = parts[1];
  } else {
    ipPart = trimmed;
    parsedPrefix = null;
  }
  const cleanIp = ipPart.trim().replace(/^\[/, "").replace(/\]$/, "");
  const ipBytes = parseIPv6AddressToBytes(cleanIp);
  let ipBigInt = 0n;
  for (let i = 0;i < 16; i++) {
    ipBigInt = ipBigInt << 8n | BigInt(ipBytes[i]);
  }
  let prefix;
  if (parsedPrefix !== undefined && parsedPrefix !== null && String(parsedPrefix).trim() !== "") {
    const cleanPrefix = String(parsedPrefix).trim().replace(/^\//, "");
    if (!/^\s*-?\d+\s*$/.test(cleanPrefix)) {
      throw new FormatException(`Invalid IPv6 prefix length '${parsedPrefix}'. Must be an integer between 0 and 128.`);
    }
    const p = parseInt(cleanPrefix, 10);
    if (p < 0 || p > 128) {
      throw new ArgumentOutOfRangeException(`IPv6 prefix length /${p} is invalid. Must be between 0 and 128.`, "prefixLength");
    }
    prefix = p;
  } else {
    prefix = ipBigInt === 1n ? 128 : 64;
  }
  const max128 = (1n << 128n) - 1n;
  const mask = prefix === 0 ? 0n : max128 << BigInt(128 - prefix) & max128;
  const wildcard = ~mask & max128;
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
  } else if (prefix === 127) {
    firstUsableIp = canonicalNetwork;
    const lastBytes = bigIntTo16Bytes(lastBigInt);
    lastUsableIp = formatCanonicalIPv6(lastBytes);
    usableRange = `${firstUsableIp} - ${lastUsableIp}`;
    usableHosts = 2n;
  } else {
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
  let hexOnly = "";
  for (let i = 0;i < 16; i++) {
    hexOnly += ipBytes[i].toString(16).padStart(2, "0").toUpperCase();
  }
  const hexIp = `0x${hexOnly}`;
  const info = new IPv6Info;
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
function parseIPv6(ip, prefixLength) {
  return parseIPv6Info(ip, prefixLength).toDictionary();
}
var ParseIPv6 = parseIPv6;
var parseIpv6 = parseIPv6;
var ParseIpv6 = parseIPv6;
var ParseIPv6Info = parseIPv6Info;

// src/ipcalci.ts
function parse(ip, subnetOrPrefix) {
  if (!ip || !ip.trim()) {
    throw new ArgumentException("IP address cannot be null, empty, or whitespace.", "ip");
  }
  const trimmed = ip.trim();
  if (subnetOrPrefix !== undefined && subnetOrPrefix !== null && subnetOrPrefix.trim() !== "") {
    if (trimmed.includes(":")) {
      const clean = subnetOrPrefix.trim().replace(/^\//, "");
      if (/^\s*-?\d+\s*$/.test(clean)) {
        return parseIPv6(trimmed, parseInt(clean, 10));
      }
      throw new FormatException(`Invalid IPv6 prefix length '${subnetOrPrefix}'. Must be an integer between 0 and 128.`);
    }
    return parseIPv4(trimmed, subnetOrPrefix);
  }
  if (trimmed.includes(":")) {
    return parseIPv6(trimmed);
  }
  return parseIPv4(trimmed);
}
var Parse = parse;
function parseToList(ip, withLabels = true) {
  if (!ip || !ip.trim()) {
    throw new ArgumentException("IP address cannot be null, empty, or whitespace.", "ip");
  }
  if (ip.includes(":")) {
    return parseIPv6Info(ip).toList(withLabels);
  }
  return parseIPv4Info(ip).toList(withLabels);
}
var ParseToList = parseToList;
function parseInfo(ip) {
  if (!ip || !ip.trim()) {
    throw new ArgumentException("IP address cannot be null, empty, or whitespace.", "ip");
  }
  if (ip.includes(":")) {
    return parseIPv6Info(ip);
  }
  return parseIPv4Info(ip);
}
var ParseInfo = parseInfo;

class IPCalci {
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

class Class1 extends IPCalci {
}

class IPCalculator extends IPCalci {
}

// src/index.ts
var src_default = IPCalci;
export {
  ArgumentException,
  ArgumentOutOfRangeException,
  Class1,
  FormatException,
  IPCalci,
  IPCalculator,
  IPv4Info,
  IPv6Info,
  Parse,
  ParseIPv4,
  ParseIPv4Info,
  ParseIPv6,
  ParseIPv6Info,
  ParseInfo,
  ParseIpv4,
  ParseIpv6,
  ParseToList,
  src_default as default,
  parse,
  parseIPv4,
  parseIPv4Info,
  parseIPv6,
  parseIPv6Info,
  parseInfo,
  parseIpv4,
  parseIpv6,
  parseToList
};
