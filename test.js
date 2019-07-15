const https = require('https');
const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId().start();

nfc.on('touchstart', (card) => {
    console.log('Card ID: ' + card.id);


    https.get('https://whatsupdoc.epitech.eu/card/' + card.id, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log("Login : " + JSON.parse(data).login);
        if (JSON.parse(data).login === "camran.roudbai@epitech.eu") {
            console.log("El presidente");
        }
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
    // card.type is the same value as that of nfcpy.
    // 2: Mifare
    // 3: FeliCa
    // 4: Mifare (DESFire)
    //   console.log('Card Type: ' + card.type);
});

// If the `mode` is `loop` or `non-loop`, event will occur when the card is removed
nfc.on('touchend', () => {
    console.log('Card was away.');
});

nfc.on('error', (err) => {
    // standard error output (color is red)
    console.error('\u001b[31m', err, '\u001b[0m');
});
