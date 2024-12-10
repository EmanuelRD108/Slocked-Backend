const { createSala, getSalas, deleteSala, getSalaById, getSalaByUser, updateSala } = require('./Salas');

let labredes2;

describe('creating Salas', ()=>{
    it.only("shouldn't create a sala without passing a name", async()=>{
        const req = {
            body: {
                name: "",
                numero: "D25",
                status: "inativo",
                grupo: "informatica",
                userId: "1",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it.only("shouldn't create a sala without passing a numero", async()=>{
        const req = {
            body: {
                name: "labredes2",
                numero: "",
                status: "inativo",
                grupo: "informatica",
                userId: "1",
            },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it.only("shouldn't create a sala without passing a status", async()=>{
        const req = {
            body: {
                name: "labredes2",
                numero: "D25",
                status: "",
                grupo: "informatica",
                userId: "1",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it.only("shouldn't create a sala without passing a grupo", async()=>{
        const req = {
            body: {
                name: "labredes2",
                numero: "D25",
                status: "inativo",
                grupo: "",
                userId: "1",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it.only("shouldn't create a sala without passing a userId", async()=>{
        const req = {
            body: {
                name: "labredes2",
                numero: "D25",
                status: "inativo",
                grupo: "informatica",
                userId: "",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it.only("should create a sala called labredes2", async()=>{
        const req = {
            body: {
                name: "labredes2",
                numero: "D25",
                status: "inativo",
                grupo: "informatica",
            },
            userId: "1"
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });
});

describe('get salas', ()=>{
    it.only('get all salas', async()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            role: "admin",
            userId: "1"
        }
        await getSalas(req, res);
        labredes2 = res.json.mock.calls[0][0][res.json.mock.calls[0][0].length-1].dataValues
        expect(res.status).toHaveBeenCalledWith(200);
    });
    it.only("get sala by it's UUID", async()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            params: {id: labredes2.uuid},
            role: "admin",
            userId: "1"
        }
        await getSalaById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        const check = res.json.mock.calls[0][0].dataValues;
        delete check.createdAt;
        expect(check).toEqual(labredes2);
    });
    it.only("shold not get any sala when pass invalid UUID", async()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            params: {id: "500000000"},
            role: "admin",
            userId: "1"
        }
        await getSalaById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
    it.only("get sala by user", async()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            params: {id: "1"} // User id
        }
        await getSalaByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        const check = res.json.mock.calls[0][0][res.json.mock.calls[0][0].length-1].dataValues;
        delete check.createdAt;
        expect(check).toEqual(labredes2);
    });
    it.only("don't get sala by passing invalid userId", async()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            params: {id: 5000000000} // User id
        }
        await getSalaByUser(req, res);
        expect(res.status).not.toHaveBeenCalledWith(200);
    });
});

describe('update Sala', ()=>{
    it.only('shold update grupo on the early created sala', async()=>{
        const req = {
            params:{id: labredes2.uuid},
            body: {
                name: "labredes2",
                numero: "D25",
                status: "inativo",
                grupo: "redes",
            },
            userId: "1",
            role: "admin"
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await updateSala(req, res);
    });
});

describe('delete salas', ()=>{
    it.only("delete early created sala by passing it's ID", async ()=>{
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const check = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = {
            params: {id: labredes2.uuid},
            role: "admin",
            userId: "1"
        }
        await deleteSala(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        await getSalaById(req, check);
        expect(check.status).toHaveBeenCalledWith(404);
    });
});