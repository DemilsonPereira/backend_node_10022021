const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Tudo funcionando certinho');
})

/*
    Lista de Endpoints da aplicação CRUD de mensagens
    CRUD = Create, Read (All/Single), Update and Delete
    CRUD = Criar, Selecionar (Todos/Um), Atualizar e Remover
    - [GET] /mensagens - Retorna a lista de mensagens
    - [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
    - [POST] /mensagens -  Cria uma nova mensagem
    - [PUT] /mensagens/{id} - Atualiza um mensagem pelo ID
    - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
*/

const mensagens = [
    "Essa é a primeira mensagem",
    "Essa é a segunda mensagem"
];

// [GET] /mensagens - Retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(mensagens);
})

// [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    const mensagem = mensagens[id];
    res.send(mensagem);
});

// [POST] /mensagens -  Cria uma nova mensagem
app.post('/mensagens', (req, res) => {
    const mensagem = req.body.texto;

    mensagens.push(mensagem); //ADICIONANDO UMA MENSAGEM NO ARRAY

    res.send(`Mensagem criada com sucesso: ${mensagem}.`);
});

// [PUT] /mensagens/{id} - Atualiza um mensagem pelo ID
app.put('/mensagens/:id', (req, res) => {
    const id = req.params.id -1;
    const mensagem = req.body.texto;

    mensagens[id] = mensagem;

    res.send(`Mensagem atualizada com sucesso: ${mensagem}`);
});

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`)
})