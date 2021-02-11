const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const port = 3000;

const getMensagensValidas = () => mensagens.filter(Boolean);

const getMensagensById = id => getMensagensValidas().find(msg => msg.id === id);


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

// LISTA DE OBJETOS
const mensagens = [
    {
        'id': 1,    
        "text": "Essa é a primeira mensagem",
    },
    {
        'id': 2,
        "text": "Essa é a segunda mensagem",
    }, 
];

// [GET] /mensagens - Retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(getMensagensValidas());
})

// [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = +req.params.id;
    const mensagem = getMensagensById(id);
    if(!mensagem){
        res.send('Mensagem não encontrada.');
        return;
    }
    res.send(mensagem);
});

// [POST] /mensagens -  Cria uma nova mensagem
app.post('/mensagens', (req, res) => {
    const mensagem = req.body;

    if(!mensagem || !mensagem.texto){
        res.send('Mensagem invalida.');
        return;
    }
    mensagem.id = mensagens.length + 1;
    mensagens.push(mensagem); //ADICIONANDO UMA MENSAGEM NO ARRAY

    res.send(mensagem);
});

// [PUT] /mensagens/{id} - Atualiza um mensagem pelo ID
app.put('/mensagens/:id', (req, res) => {
    const id = +req.params.id;
    const mensagem = mensagens.find(msg => msg.id === id);
    
    const novoTexto = req.body.texto;
    if(!novoTexto){
        res.send('Mensagem inválida');
    }
    mensagem.texto = novoTexto;

    res.send(mensagem);
});

// [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
app.delete('/mensagens/:id', (req, res) => {
    const id = +req.params.id;
    const mensagem = getMensagensById(id);
    if(!mensagem){
        res.send('Mensagem não encontrada.');
        return;
    }
    const indice = mensagens.indexOf(mensagem);
    delete mensagens[indice];
    res.send(`Mensagem removida com sucesso!`);
})

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`)
})