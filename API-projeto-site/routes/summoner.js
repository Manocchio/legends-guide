var express = require('express');
var router = express.Router();

const { Kayn, REGIONS } = require('kayn');

const kayn = Kayn('RGAPI-a4364397-bc5d-41df-acdb-4e443949a15f')({
    region: REGIONS.BRAZIL,
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'pt_BR',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
})






router.get('/getSummoner/:nameSummoner', async (req, res) => {
    try {
        const { nameSummoner } = req.params;
        const object = await kayn.Summoner.by.name(nameSummoner);
        return res.status(200).json({ summoner: object });
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');
    }
});


module.exports = router;