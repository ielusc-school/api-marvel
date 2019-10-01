const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb+srv://crisbonja:teste123@cluster0-icpwk.mongodb.net/test', {
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('is connected');
    }).catch((err) => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

const router = express.Router();
const Person = require('./models/persons');

router.get('/', (request, response) => {
  response.json({message: 'Hello Marvel or DC Comics?'});
});

router.route('/persons')
    .post((req, res) => {
        // const person = new Person({
        //     ... req.body
        // });

        const person = new Person();
        person.name = req.body.name;
        person.age = req.body.age;
        person.power = req.body.power;
        person.description = req.body.description;

        console.log('persons', person);

        person.save((error) => {
            if(error) {
                res.json({message: `ops, erro ao salvar um novo personsagem ${error}`});
            } else {
                res.json({message: 'Personsagem salvo com sucesso'});
            }
        });
    });

app.use('/api', router);

app.listen(port, (error) => {
  if(error) {
    console.log('Não foi possivel conectar no Servidor =(');
  } else {
    console.log(`App rodando em -> http://localhost:${port}`);
  }
});