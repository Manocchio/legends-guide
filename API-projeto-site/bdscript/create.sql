CREATE DATABASE smGuide;

USE smGuide;

CREATE TABLE tbLane (
	idLane INT PRIMARY KEY AUTO_INCREMENT, 
    nomeLane VARCHAR(50) NOT NULL,
    descLane VARCHAR(300) NOT NULL
);


CREATE TABLE tbRole(
	idRole INT PRIMARY KEY AUTO_INCREMENT,
    nomeRole VARCHAR (50) NOT NULL, 
    descRole VARCHAR(300) NOT NULL
);


CREATE TABLE tbAtribuicao(
	fkRole INT,
    fkLane INT, 
    descAtribuicao VARCHAR(300) NOT NULL,
	FOREIGN KEY(fkRole) REFERENCES tbRole(idRole),
    FOREIGN KEY(fkLane) REFERENCES tbLane(idLane),
    PRIMARY KEY(fkRole,fkLane)
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
    fkRole INT,
    FOREIGN KEY(fkRole) REFERENCES tbRole(idRole)
);




INSERT INTO tbLane(nomeLane, descLane) VALUES 
	('TOP', 'Rota Superior do Summoner’s Rift, próximo do Covil do Arauto e do Barão')
    ,('MID', 'A Mid lane é uma das mais importantes do jogo, justamente por estar no meio do mapa e, consequentemente, próxima às outras duas rotas e aos objetivos globais, Dragão e Barão')
	,('BOTTOM','A Bot lane é a rota inferior do Summoner’s Rift, e a única que, por definição, tem dois campeões.')
	,('JUNGLE', 'A Jungle é a selva do jogo, que está entre as lanes do mapa, onde ficam os monstros neutros');




INSERT INTO tbRole(nomeRole, descRole) VALUES 
	('TOP','A função do Top Laner é ditar o ritmo de jogo e ajudar garantir que os objetivos sejam feitos ')
	,('MID','O Mid Laner, geralmente, tem mais liberdade para se movimentar pelo mapa e auxiliar os demais jogadores a realizar alguma ação.')
    ,('ADC','O AD Carry é um dos personagens mais importantes do jogo, mas sem dúvida nenhuma é o mais frágil e o mais focado durante as team fights.')
    ,('SUP','Os suportes têm o objetivo de atender todas as necessidades de seu time. Além de proteger seu atirador, o sup ')
    ,('JUNGLER','');
    
    
select * from tbUser;
