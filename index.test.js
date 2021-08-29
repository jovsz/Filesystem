const app = require("./index");
const path = require("path");
const fs = require("fs/promises");

describe("1. Probando la implementación de readFileUsers", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    test('Debería de llamar al método readFile', async() => {
    
        const readFile = jest.spyOn(fs, "readFile");
        
        app.readFileUsers();
    
        expect(readFile).toHaveBeenCalledTimes(1);
        
    });

    test('ReadFile debería de llamarse con el argumento de la ruta hacía users.json', async() => {
        const pathFile = path.resolve('users.json');
    
        const readFile = jest.spyOn(fs, "readFile");
        
        app.readFileUsers();
    
        expect(readFile.mock.calls[0][0]).toBe(pathFile);
        
    });

    test('ReadFile debería de llamarse con el argumento de codificación utf8', async() => {
    
        const readFile = jest.spyOn(fs, "readFile");
        
        app.readFileUsers();
    
        expect(readFile.mock.calls[0]).toContain('utf8');
    });

});

describe("2. Probando la implementación de writeHelloWorld", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    test('Debería de llamar al método writeFile', async() => {
    
        const writeFile = jest.spyOn(fs, "writeFile");
        
        app.writeHelloWorld();
    
        expect(writeFile).toHaveBeenCalledTimes(1);
        
    });

    test('WriteFile debería de llamarse con la ruta hacía hello.txt', async() => {
        const pathFile = path.resolve('hello.txt');
    
        const writeFile = jest.spyOn(fs, "writeFile");
        
        app.writeHelloWorld();
    
        expect(writeFile.mock.calls[0][0]).toBe(pathFile);
        
    });

    test('WriteFile debería de pasar como argumento el string hello world!', async() => {
    
        const writeFile = jest.spyOn(fs, "writeFile");
        
        app.writeHelloWorld();
    
        expect(writeFile.mock.calls[0]).toContain('hello world!');
    });

});

describe("3. Probando la implementación de appUser", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    beforeEach(async() => {
        const userlist = JSON.stringify([
            "Hector",
            "Eduardo",
            "Sandra",
            "Ana",
            "Saúl"
        ]);

        try{
            await fs.writeFile(path.resolve("users.json"), userlist);
        }catch(error){
            throw new Error("Notificar de este error al instructor");
        }
    });

    test('Debería de obtener la lista de usuarios', async() => {
    
        const readFile = jest.spyOn(fs, "readFile");
        
        await app.addUser("Academlo");
    
        expect(readFile).toHaveBeenCalledTimes(1);
        
    });

    test('Debería de pasar como argumento la ruta de users.json a readFile', async() => {
        const pathFile = path.resolve('users.json');
    
        const readFile = jest.spyOn(fs, "readFile");
        
        await app.addUser("Academlo");
    
        expect(readFile.mock.calls[0][0]).toBe(pathFile);
        
    });

    test('Debería de llamar al método writeFile', async() => {
    
        const writeFile = jest.spyOn(fs, "writeFile");
        
        await app.addUser("Academlo");
    
        expect(writeFile).toHaveBeenCalledTimes(1);
    });

    test('Debería de llamar al método writeFile con la lista de usuarios + username como argumento', async() => {
        
        const userlist = JSON.stringify([
            "Hector",
            "Eduardo",
            "Sandra",
            "Ana",
            "Saúl",
            "Academlo"
        ]);

        const writeFile = jest.spyOn(fs, "writeFile");
        
        await app.addUser("Academlo");
    
        expect(writeFile.mock.calls[0][1]).toBe(userlist);
    });

});
