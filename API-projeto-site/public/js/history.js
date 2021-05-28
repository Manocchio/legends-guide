
let pageContent = document.querySelector('.page-content')
let user = sessionStorage.getItem('user');
user = JSON.parse(user);

username.innerHTML = user.nameUser;
level.innerHTML = user.summonerLevel;





let icon = document.querySelector('#summonerIcon');
icon.src = `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${user.iconId}.png`;



let accId = user.accId;
let matchList = {}
let history = []
let championData = {};

let insertMatch = async () => {

    let matchPosition = history.length - 1;
    let win = history[matchPosition].data.stats.win;
    let cs = history[matchPosition].data.stats.totalMinionsKilled;
    let kills = history[matchPosition].data.stats.kills;
    let deaths = history[matchPosition].data.stats.deaths;
    let assists = history[matchPosition].data.stats.assists;
    let kda = deaths != 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists);
    let gameMode = history[matchPosition].gameMode;
    let lane = history[matchPosition].lane;
    let items = [
        history[matchPosition].data.stats.item0,
        history[matchPosition].data.stats.item1,
        history[matchPosition].data.stats.item2,
        history[matchPosition].data.stats.item3,
        history[matchPosition].data.stats.item4,
        history[matchPosition].data.stats.item5,
        history[matchPosition].data.stats.item6,
    ]
    let gold = history[matchPosition].data.stats.goldEarned;
    gold = Number(gold).toLocaleString('pt-BR')
    //converter timestamp :/

    let unix_durationTimestamp = history[matchPosition].gameDuration;
    let duration = new Date(unix_durationTimestamp * 1000);
    let durationMinutes = "0" + duration.getMinutes();
    let durationSeconds = "0" + duration.getSeconds();
    let formattedDuration = durationMinutes.substr(-2) + ':' + durationSeconds.substr(-2);


    let unix_timestamp = history[matchPosition].timestamp;
    let date = new Date(unix_timestamp);
    let formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    let listItems = () => {
        let itemsString = ''
        items.forEach((item) => {
            if (item != 0) {
                itemsString += '<div class="item"><img src="http://ddragon.leagueoflegends.com/cdn/11.10.1/img/item/' + item + '.png"></div>';
            } else {
                itemsString += '<div class="item"></div>';
            }
        })
        return itemsString;
    }

    console.log(items);

    if (lane == 'NONE' && history[matchPosition].role == 'DUO_SUPPORT') {
        lane = 'SUP';
    } else if (lane == 'BOTTOM' && history[matchPosition].role == 'DUO_SUPPORT') {
        lane = 'SUP'
    }

    fetch(`summoner/getChampion/${history[matchPosition].championId}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            response.json().then(async (data) => {
                let spellOne = {};
                let spellTwo = {};

                fetch(`summoner/getSpell/${history[matchPosition].data.spell1Id}`).then((response) => {
                    if (response.ok) {
                        response.json().then(async (spell) => {
                            spellOne = spell;
                            await true;

                            fetch(`summoner/getSpell/${history[matchPosition].data.spell2Id}`).then((response) => {
                                if (response.ok) {
                                    response.json().then(async (spell) => {
                                        spellTwo = spell;
                                        await true;

                                        document.querySelector('.history-container').innerHTML += `
                        <div class="match" id="${matchPosition}">
                        <div class="general-stats">
                            <div class="champ-icon">
                                <img src="http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${data.id}.png" alt=""
                                    srcset="">
                            </div>          
                            <div class="spells">
                                <div class="spell">
                                   <img src="http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${spellOne.id}.png">
                                </div>
                                <div class="spell">
                                    <img src="http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${spellTwo.id}.png">
                                </div>
                            </div>
                            <div class="status-kda">
                                <div class="status ${win ? 'win' : 'defeat'}">
                                ${win ? 'Vitória' : 'Derrota'}    
                                </div>
                                <div class="kda-holder">
                                    <div class="kda">${kills}/${deaths}/${assists}</div>
                                    <div class="ama">KDA: ${kda}</div>
                                </div>
                            </div>
                        </div>
                         <div class="modeAndLane ${gameMode == 'ARAM' ? 'aram' : ''}">
                                <div class="gameMode">
                                    <img src="${gameMode == 'ARAM' ? './img/aram_icon.png' : './img/rift.png'}" alt="">
                                </div>
                                <div class="lane">
                                    <img src="${gameMode != 'ARAM' ? lane != 'NONE' ? './img/' + lane.toLowerCase() + '_icon.png' : '' : ''}" alt="">
                                </div>
                        </div>
                        <div class="items">
                            ${listItems()}
                        </div>
                          <div class="cs">
                            <div class="icon">
                                <img src="https://streamie.com.br/wp-content/uploads/2017/08/img-icone-6.png" alt="">
                            </div>
                            <p>${cs} CS</p>
                        </div>
                        <div class="gold">
                            <i class="fas fa-coins"></i>
                            <p>${gold}</p>
                        </div>

                        <div class="date-duration">
                            <div class="duration">
                                <p>${formattedDuration}</p>
                            </div>
                            <div class="date">
                                <p>${formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>`;


                                    });
                                }
                            });
                        });
                    }
                });
            })
        }
    });


}



getMatchList = async () => {
    fetch(`summoner/getMatchList/${user.accId}`, {
        method: 'GET',
    }).then((response) => {
        if (response.ok) {
            response.json().then(async (data) => {
                matchList = data;
                await matchList.matches.splice(10, (matchList.matches.length - 1));

                matchList.matches.forEach(match => {
                    let newJson = {
                        championId: match.champion,
                        gameId: match.gameId,
                        lane: match.lane,
                        role: match.role,
                        timestamp: match.timestamp,
                        gameDuration: '',
                        queueId: '',
                        gameMode: '',
                        gameType: '',
                        teams: [],
                        participants: [],
                        participantIdentities: [],
                        data: [],
                    }

                    fetch(`summoner/getMatch/${match.gameId}`, {
                        method: 'GET'
                    }).then((response) => {
                        if (response.ok) {
                            response.json().then(async (data) => {
                                let inMatchId;
                                newJson.gameDuration = data.gameDuration;
                                newJson.queueId = data.queueId;
                                newJson.gameMode = data.gameMode;
                                newJson.gameType = data.gameType;
                                newJson.teams = data.teams;
                                newJson.participants = data.participants;
                                newJson.participantIdentities = data.participantIdentities;

                                newJson.participantIdentities.forEach((participant) => {
                                    if (user.accId == participant.player.accountId) {
                                        inMatchId = participant.participantId;
                                    }
                                })

                                newJson.participants.forEach(player => {
                                    if (player.participantId == inMatchId) {
                                        newJson.data = player;
                                    }
                                })


                                history.push(newJson);
                                await insertMatch();

                            })
                        } else {
                            console.log(response.statusText);
                        }
                    }).catch((error) => {
                        console.log(error);
                    })

                })
            });

        } else {
            console.log(response.statusText)
        }
    }).catch((error) => {
        console.log(error);
    });
}


getMatchList();









