const assert = require('assert');
const { getAddressesFromTx } = require('../index');

describe('Get address from transaction', function () {

    const example = {
        "fee": {
            "gas": "150000",
            "amount": [
                {
                    "denom": "uscrt",
                    "amount": "37500"
                }
            ]
        },
        "msg": [
            {
                "type": "wasm/MsgExecuteContract",
                "value": {
                    "msg": "ApHAoLVjBputA6gciFeF6L5Q5X6amJS+XxgLWnFDy1//zuXb+6daUTmhwqAt5CmT6MEKWAK3g2Xj0Yoy4WioPHhoOHrTXPrhOdRCWYuk6iHfFihP9VkcE+qK/mJ7tNg3WIsl0AGuf/0tfnFs+A9I8aKOwStWQIGnneZsEUOtAGebi74FVjG49rtTuxIJ2UT4uP5ic7eyG8qGzKEzvVK/g40eEiRXBk9wv3s7GpU5uwT0qAsiFCIT3YuXqHbv+eKGwwbd4QF++bmawJudjmcPoU4fGw==",
                    "sender": "secret1qk0q520vncmsrt5ps090v6663mk20pl3gq88dn",
                    "contract": "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
                    "sent_funds": [],
                    "callback_sig": null,
                    "callback_code_hash": ""
                }
            }
        ],
        "memo": "",
        "signatures": [
            {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "AhpeRnPrWMSrHdnPwMIvjp1OHMDtMddUtdmTselsBGoK"
                },
                "signature": "y1Y04ebay8uK7i4KdGGLQsCVve9LBEaFNX7tFrzyg4MPQtvWxnpTNNNGbMAa4SsHoxf7OPwdkvmeG+GpLfGpDQ=="
            }
        ]
    };

    it('Get secret address', ()=> {
		assert.deepStrictEqual(getAddressesFromTx(example, 'secret'), ["secret1qk0q520vncmsrt5ps090v6663mk20pl3gq88dn"]);
	});

});