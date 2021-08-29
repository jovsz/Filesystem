//Imports de los módulos
const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'hello.txt');
const readFile = path.join(__dirname, 'users.json')



const readFileUsers = () => {
    //Imprimir en consola el arreglo de usuarios
    fs.readFile(readFile, 'utf8', (err,data) => {
        console.log(data)
    });
};



const writeHelloWorld = () => {
    //Escribir hello world! en el archivo hello.txt
    fs.writeFile(pathFile, 'Hello world!', (err) => {
        fs.readFile(pathFile, 'utf8', (err,data) => {
            console.log(data)
        })
    })
};


const addUser = async (username) => {
    //Agregar un usuario en la lista users.json
    await fs.readFile('users.json', 'utf8',(err, data) => {
        const users = JSON.parse(data);
        if(users.indexOf(username) === -1){
            users.push(username);
            const json = JSON.stringify(users)
            fs.writeFile('users.json', json, (err) =>{
            });
        }
    });
};


//No hace falta ejecutar las funciones
module.exports = {
    readFileUsers,
    writeHelloWorld,
    addUser,
};
