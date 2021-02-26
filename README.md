# cosmos_network_addresses

```bash
$ npm install cosmos_network_addresses
```

## Usage
```js
const { getAddressesFromTx } = require('cosmos_network_addresses');

const tx = {
    // ...
    signatures: [
        {
            pub_key: {
                type: "tendermint/PubKeySecp256k1",
                value: "AhpeRnPrWMSrHdnPwMIvjp1OHMDtMddUtdmTselsBGoK"
            },
            signature: "y1Y04ebay8uK7i4KdGGLQsCVve9LBEaFNX7tFrzyg4MPQtvWxnpTNNNGbMAa4SsHoxf7OPwdkvmeG+GpLfGpDQ=="
        }
    ]
};

const addresses = getAddressesFromTx(tx, 'secret');
```

Result:
```js
["secret1qk0q520vncmsrt5ps090v6663mk20pl3gq88dn"]
```