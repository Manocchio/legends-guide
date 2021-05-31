var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.name; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.password; // depois de .body, use o nome (name) do campo em seu formulário de login	


	let instrucaoSql = `select * from tbUser where nameUser='${login}' and pass='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${JSON.stringify(resultado[0])}`);

		if (resultado.length != 0) {

			let newJson = resultado.pop();
			let user = {
				idUser: newJson.idUser,
				puuid: newJson.puuid,
				riotId: newJson.riotId,
				accId: newJson.accId,
				nameUser: newJson.nameUser,
				iconId: newJson.iconId,
				summonerLevel: newJson.summonerLevel
			}


			res.status(200).json(user);
		} else {
			res.status(403).send('Login e/ou senha inválido(s)');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/verify/:nameUser', (req, res) => {
	let name = req.params.nameUser;


	let newQuery = `SELECT nameUser FROM tbUser WHERE nameUser = '${name}';`

	sequelize.query(newQuery, {
		model: Usuario
	}).then((response) => {
		if (response.length != 0) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	}).catch((error) => {
		console.log(error);
	})
});

router.get('/getUserRole/:idUser', (req, res) => {
	let id = req.params.idUser;

	let newQuery = `
		SELECT u.nameUser,nomeRole, descRole FROM tbUser as u
			INNER JOIN tbRole as r
				ON u.fkRole = r.idRole
			WHERE idUser = ${id};`;

	sequelize.query(newQuery, {
		model: Usuario
	}).then((response) => {
		res.json({ role: response[0] });
	}).catch((error) => {
		console.log(error);
	})
});


/* Cadastrar usuário */
router.post('/cadastrar/:user', function (req, res, next) {
	let user = req.params.user;
	user = JSON.parse(user);

	Usuario.create({
		puuid: user.puuid,
		riotId: user.riotId,
		accId: user.accId,
		nameUser: user.nameUser,
		iconId: user.iconId,
		summonerLevel: user.summonerLevel,
		pass: user.pass,
		fkRole: user.fkRole
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* Verificação de usuário */
router.get('/sessao/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});


/* Logoff de usuário */
router.get('/sair/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});



/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;
