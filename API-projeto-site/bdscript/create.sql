CREATE DATABASE smGuide;

USE smGuide;

CREATE TABLE tbLane (
	idLane INT PRIMARY KEY AUTO_INCREMENT, 
    nomeLane VARCHAR(50) NOT NULL,
    descLane VARCHAR(300) NOT NULL
);


CREATE TABLE tbUser (
	idUser INT  PRIMARY KEY AUTO_INCREMENT,
    puuid VARCHAR(100) NOT NULL,
	riotId VARCHAR(100) NOT NULL,
    accId VARCHAR(100) NOT NULL,
    nameUser VARCHAR(100) NOT NULL UNIQUE , 
    iconId INT NOT NULL,
    summonerLevel INT NOT NULL,
    pass VARCHAR(100),
    fkLane INT,
    FOREIGN KEY(fkLane) REFERENCES tbLane(idLane)
);




INSERT INTO tbLane(nomeLane, descLane) VALUES 
	('TOP', 'Rota Superior do Summoner’s Rift, próximo do Covil do Arauto e do Barão')
    ,('MID', 'A Mid lane é uma das mais importantes do jogo, justamente por estar no meio do mapa e, consequentemente, próxima às outras duas rotas e aos objetivos globais, Dragão e Barão')
	,('BOTTOM','A Bot lane é a rota inferior do Summoner’s Rift, e a única que, por definição, tem dois campeões.')
	,('JUNGLE', 'A Jungle é a selva do jogo, que está entre as lanes do mapa, onde ficam os monstros neutros');




