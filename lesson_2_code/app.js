const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

//----------------------------------------------------------------------------------------------------------------------

//
const usersARR = [
    {
        login: 'tead',
        password: 'dsad',
    },
    {
        login: 'TOR',
        password: '1234'
    },
    {
        login: 'tead',
        password: 'dsad'
    },
]
// app.get('/welcome' , (req, res) => {
//     res.json(users)
// })



//----------------------------------------------------------------------------------------------------------------------

const app = express();

//----------------------------------------------**Настраивается один раз**----------------------------------------------
app.use(express.json()); // что бы node.js могла принимать фаилы с расширением json
app.use(express.urlencoded({ extended: true }))

//----------------------------------------------**Настраивается один раз**----------------------------------------------
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));
//----------------------------------------------***********-------------------------------------------------------------



app.get('/login', (req, res) => {
    res.render('login')   // перешли для прорисовки фронта с бэка на страницу login.hbs

})
//-------------------------------------------------------------------------------------------------------------------
app.get('/users', (req, res) => {
    res.render('users', { usersARR }) // отрисовка на странице users.hbs данные массива usersARR
})
//-------------------------------------------------------------------------------------------------------------------
app.get('/users/:id', (req, res) => { // путь к одному обьекту по Id из массива usersARR
    const {id} = req.params
    console.log(req.query)
    res.json(usersARR[id]) // выводим один объект из массива по ID в формате json
})
//-------------------------------------------------------------------------------------------------------------------
app.post('/login', (req, res) => { // передаем инфу на стр. login.hbs
    // console.log(req.body)
    usersARR.push(req.body) // пушим инфу которую ввели на стр. login.hbs в массив usersARR
    res.redirect('/users') // переходим по урле '/users' на которой получаем массив usersARR с переданной инфой из app.post('/login'...
})
//
app.use((req, res) => {
    res.render('notFound')
})
//

app.listen(5700, () => {
    console.log('Serves has started on PORT 5700')
})