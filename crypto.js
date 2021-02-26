// https://github.com/bitcoinjs/bip32/blob/67ec14c86e890b5cf3c40683d494fa5472c13461/src/crypto.js#L5

const createHash = require('create-hash');

function hash160(buffer) {
    const sha256Hash = createHash('sha256')
        .update(buffer)
        .digest();
    try {
        return createHash('rmd160')
            .update(sha256Hash)
            .digest();
    }
    catch (err) {
        return createHash('ripemd160')
            .update(sha256Hash)
            .digest();
    }
}

// https://raw.githubusercontent.com/cosmostation/cosmosjs/157b350127e88f0b42fd1f500997c81829a9085a/dist/cosmos.js

var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
var ALPHABET_MAP = {}
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z)

  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
  ALPHABET_MAP[x] = z
}

function polymodStep (pre) {
    var b = pre >> 25
    return ((pre & 0x1FFFFFF) << 5) ^
      (-((b >> 0) & 1) & 0x3b6a57b2) ^
      (-((b >> 1) & 1) & 0x26508e6d) ^
      (-((b >> 2) & 1) & 0x1ea119fa) ^
      (-((b >> 3) & 1) & 0x3d4233dd) ^
      (-((b >> 4) & 1) & 0x2a1462b3)
  }

function prefixChk (prefix) {
    var chk = 1
    for (var i = 0; i < prefix.length; ++i) {
      var c = prefix.charCodeAt(i)
      if (c < 33 || c > 126) throw new Error('Invalid prefix (' + prefix + ')')
  
      chk = polymodStep(chk) ^ (c >> 5)
    }
    chk = polymodStep(chk)
  
    for (i = 0; i < prefix.length; ++i) {
      var v = prefix.charCodeAt(i)
      chk = polymodStep(chk) ^ (v & 0x1f)
    }
    return chk
  }
  

function encode (prefix, words, LIMIT) {
    LIMIT = LIMIT || 90
    if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')

    prefix = prefix.toLowerCase()

    // determine chk mod
    var chk = prefixChk(prefix)
    var result = prefix + '1'
    for (var i = 0; i < words.length; ++i) {
        var x = words[i]
        if ((x >> 5) !== 0) throw new Error('Non 5-bit word')

        chk = polymodStep(chk) ^ x
        result += ALPHABET.charAt(x)
    }

    for (i = 0; i < 6; ++i) {
        chk = polymodStep(chk)
    }
    chk ^= 1

    for (i = 0; i < 6; ++i) {
        var v = (chk >> ((5 - i) * 5)) & 0x1f
        result += ALPHABET.charAt(v)
    }

    return result
}

function convert (data, inBits, outBits, pad) {
    var value = 0
    var bits = 0
    var maxV = (1 << outBits) - 1

    var result = []
    for (var i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i]
        bits += inBits

        while (bits >= outBits) {
        bits -= outBits
        result.push((value >> bits) & maxV)
        }
    }

    if (pad) {
        if (bits > 0) {
        result.push((value << (outBits - bits)) & maxV)
        }
    } else {
        if (bits >= inBits) throw new Error('Excess padding')
        if ((value << (outBits - bits)) & maxV) throw new Error('Non-zero padding')
    }

    return result
}

function toWords (bytes) {
    return convert(bytes, 8, 5, true)
}

module.exports = {
    hash160,
    encode,
    toWords
};