const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./Users');

let user1;

describe('Creating Users', ()=>{
    it.only("Sholdn't create a User without passing a name", async ()=>{
      const req = {
        body: {
          name: "",
          tags: "ghgfvkj876",
          matricula: "202010311",
          disciplinaOUcargo: "cordenador",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it.only("Sholdn't create a User without passing a 'matricula'", async ()=>{
      const req = {
        body: {
          name: "abc",
          tags: "ghgfvkj876",
          matricula: "",
          disciplinaOUcargo: "cordenador",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'disciplinaOUcargo'", async ()=>{
      const req = {
        body: {
          name: "abc",
          tags: "ghgfvkj876",
          matricula: "202010311",
          disciplinaOUcargo: "",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'email'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "",
              password: "abc@123",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'password'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'confPassword'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User passing a 'confPassword' diferent from 'password'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "123@abc",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing neither 'password' neither 'confPassword'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "",
              confPassword: "",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'role'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "abc@123",
              role: "",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Shold create a admin User", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    }); 
});

describe('Find Users', ()=>{
  it.only('get all users', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUsers({}, res);
    user1 = res.json.mock.calls[0][0][res.json.mock.calls[0][0].length-2].dataValues
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it.only('get user by id', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    console.log(user1.id);
    await getUserById({params:{id: user1.uuid}}, res);   
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].dataValues).toEqual(user1);
  });
  it.only("passing an id that isn't in bd, should result in 404", async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    console.log(user1.id);
    await getUserById({params:{id: 50000000}}, res);   
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('Update User', ()=>{
  it.only("Shouldn't update any user by passing not valid id", async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {
      body: {
        name: "abc",
        tags: "tagmudada",
        matricula: "202010311",
        disciplinaOUcargo: "cordenador",
        email: "admin@gmil.com",
        password: "abc@123",
        confPassword: "abc@123",
        role: "admin",
      },
      params:{
        id: 50000000000
      }
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it.only('Should update the 1st user created in earlyer tests', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const check = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {
      body: {
        name: "abc",
        tags: "tagmudada",
        matricula: "202010311",
        disciplinaOUcargo: "cordenador",
        email: "admin@gmil.com",
        password: "abc@123",
        confPassword: "abc@123",
        role: "admin",
      },
      params:{
        id: user1.uuid
      }
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    await getUserById({params: user1.id}, check);
    expect(check.json.mock.calls[0][0].dataValues).not.toEqual(user1);
  });
});

describe('delete user', ()=>{
  it.only('not delete anything when passing invalid ID', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await deleteUser({params:{id: 5000000000}}, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it.only('delete the 1st user created in earlyer tests', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const check = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await deleteUser({params:{id: user1.uuid}}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    await getUserById({params:{id: user1.uuid}}, check);
    expect(check.status).toHaveBeenCalledWith(404);
  });
});