const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const handlebars = require('express-handlebars').engine;

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./dsmlabweb-firebase-adminsdk-dxv32-bf55b1dd5d.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render('primeira_pagina');
});

app.post("/cadastrar", function (req, res) {
    db.collection('clientes').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function () {
        console.log("Dados cadastrados com sucesso!");
        res.send("Dados cadastrados com sucesso!"); 
    }).catch(function (error) {
        console.error("Erro ao cadastrar: ", error);
        res.status(500).send("Erro ao cadastrar dados."); 
    });
});

app.listen(8081, function () {
    console.log("Servidor Ativo na porta 8081");
});
