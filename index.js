const {
    hash160,
    encode,
    toWords
} = require('./crypto');

module.exports = {};

module.exports.getAddressFromTx = function getAddressFromTx (tx, prefix = 'cosmos') {
    if (!tx.signatures) throw new Error(`"tx.signatures" not found`);
    const list = [];
    tx.signatures.forEach(function({pub_key: {value}}){
        const publicKey = Buffer.from(value, 'base64'); // https://github.com/cosmostation/cosmosjs/blob/157b350127e88f0b42fd1f500997c81829a9085a/src/index.js#L50
        const identifier = hash160(publicKey); // https://github.com/bitcoinjs/bip32/blob/master/src/bip32.js#L65
	    list.push(encode(prefix, toWords(identifier))); // https://github.com/cosmostation/cosmosjs/blob/157b350127e88f0b42fd1f500997c81829a9085a/src/index.js#L109
    });
    return list;
}