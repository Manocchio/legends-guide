var express = require('express');
var router = express.Router();

const { Kayn, REGIONS } = require('kayn');
const apiKey = "RGAPI-42670539-cafa-4e2d-b9ba-09823e2f4694";



const kayn = Kayn(apiKey)({
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



router.get('/getMatchList/:accountId', async (req, res) => {
    try {

        const { accountId } = req.params;
        const object = await kayn.Matchlist.by.accountID(accountId);
        object.startIndex = 0;
        object.endIndex = 20;
        return res.status(200).json(object);

    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');

    }
});



router.get('/getMatch/:matchId', async (req, res) => {
    try {

        const { matchId } = req.params;
        const object = await kayn.Match.get(matchId);
        return res.status(200).json(object);

    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');

    }
})

router.get('/getChampions', async (req, res) => {
    try {
        const championList = await kayn.DDragon.Champion.list();
        return res.status(200).json(championList);
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');
    }
})





router.get('/getChampion/:champId', async (req, res) => {
    try {
        const { champId } = req.params;
        let championList = await kayn.DDragon.Champion.list();
        championList = championList.data;
        let champion = {}

        for (let champ in championList) {

            if (championList[champ].key == champId) {
                champion = championList[champ];
            }
        }

        return res.status(200).json(champion);
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');
    }
})


router.get('/getSpell/:spellId', async (req, res) => {
    try {
        const { spellId } = req.params;
        let spellList = await kayn.DDragon.SummonerSpell.list();
        spellList = spellList.data;
        let summonerSpell = {}

        for (let spell in spellList) {
            if (spellList[spell].key == spellId) {
                summonerSpell = spellList[spell];
            }
        }

        return res.status(200).json(summonerSpell);
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ocorreu um erro');
    }
});



module.exports = router;