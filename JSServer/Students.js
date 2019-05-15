const express = require('express'); // used for creating a server
const bodyParser = require('body-parser');
const app = express();
const port = 100;

const students = require('./students.json');

const getStudents = (req, res) => {

    res.send(students);

}
const getStudentsById = (req, res) => {
    const id = req.params.id;
    const student = students.find((element) => {
        return element.id == id;
    });

    res.send(student)
}

const deleteStudentById = (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(students => students.id == id);
    students.splice(index, 1);
    res.send({
        text: 'Studentul ' + id + 'a fost sters!',
        students: students
    });
}

const getStudentsByName = (req, res) => {
    const name = req.params.name;
    const student = students.find(student => student.firstName == name);

    res.send(student)

}//??

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/students', getStudents);

app.get('/student/:id', getStudentsById);

app.get('/student/:name', getStudentsByName);

app.delete('/student/:id', deleteStudentById);

app.listen(port);