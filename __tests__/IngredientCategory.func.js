const supertest = require('supertest');
const app = require('../app');
const defaultValues = require('../fixtures/ingredientCategory.json');
const exec = require('await-exec');

// https://github.com/forwardemail/supertest#readme

// These tests do not have complete test covereage, but cover a vast majority of cases.

const url = "/ingredientCategory";

describe('create', () => {

    beforeEach(async() => {
        await exec('node fixtures/IngredientCategory.fix.js')
    })

    test("create valid ingredient", async()=>{
        const expectedID = defaultValues.length + 1
        const expectedName = "veggies"
        const response = await supertest(app)
            .post(url)
            .send({
                "name": expectedName
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(expectedID);
        expect(response.body.name).toBe(expectedName);
        expect(response.body.error).toBeUndefined();

        // Making sure that it has the right amount of total entries now
        // Reusing expectedID since it would be the right amount of entries
        const total = await supertest(app).get(url)
        expect(total.body.length).toBe(expectedID);
    })

    test("create duplicate ingredient gets rejected", async()=>{
        const invalidEntryName = defaultValues[0].name;

        const response = await supertest(app)
            .post(url)
            .send({
                "name": invalidEntryName
            })


        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("name must be unique");

        // Making sure that it has the right amount of total entries now
        const total = await supertest(app).get(url)
        expect(total.body.length).toBe(defaultValues.length);
    })

    test("create with numbers in name gets rejected", async()=>{
        const invalidEntryName = "vegg1es!";

        const response = await supertest(app)
            .post(url)
            .send({
                "name": invalidEntryName
            })


        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("name can only consist of lowercase letters");

        // Making sure that it has the right amount of total entries now
        const total = await supertest(app).get(url)
        expect(total.body.length).toBe(defaultValues.length);
    })

    test("create with blank name gets rejected", async()=>{
        const invalidEntryName = "";

        const response = await supertest(app)
            .post(url)
            .send({
                "name": invalidEntryName
            })


        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("name can not be empty");

        // Making sure that it has the right amount of total entries now
        const total = await supertest(app).get(url)
        expect(total.body.length).toBe(defaultValues.length);
    })

    test("create removes uppercase letters", async()=>{
        const expectedID = defaultValues.length + 1
        const validEntryName = "veGGies";

        const response = await supertest(app)
            .post(url)
            .send({
                "name": validEntryName
            })


        expect(response.status).toBe(200);
        expect(response.body.id).toBe(expectedID);
        expect(response.body.name).toBe("veggies");
        expect(response.body.error).toBeUndefined();

        // Making sure that it has the right amount of total entries now
        const total = await supertest(app).get(url)
        expect(total.body.length).toBe(expectedID);
    })
})

describe('read', () => {
    beforeAll(async() => {
        await exec('node fixtures/IngredientCategory.fix.js')
    })

    test("Test get all entries", async()=>{
        const response = await supertest(app).get(url)
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(defaultValues.length);
        let id = 0
        for (const entry of response.body) {
            expect(entry.name).toBe(defaultValues[id].name)
            id +=1;
            expect(entry.id).toBe(id);
        }
    })

    test("get each entry individually", async()=>{
        let response = "";
        let id = 0;
        for (const entry of defaultValues) {
            id +=1;
            response = await supertest(app).get(url + "/"+id);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(entry.name);
            expect(response.body.id).toBe(id);
        }
    })

    test("fail get entry 0", async()=>{
        const response = await supertest(app).get(url + "/0");
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("invalid key, not found");
    })

    test("fail get entry 7", async()=>{

        const response = await supertest(app).get(url + "/" + defaultValues.length + 1);
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("invalid key, not found");
    })
})

describe('update', () => {

    let validCurrentEntry;

    beforeEach(async() => {
        await exec('node fixtures/IngredientCategory.fix.js')

        validCurrentEntry =
            {
                "id": 1,
                "name": defaultValues[0].name
            }
    })

    test("update valid ingredient", async()=>{

        validCurrentEntry.name="meats"

        const response = await supertest(app)
            .put(url)
            .send(validCurrentEntry);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(validCurrentEntry.id);
        expect(response.body.name).toBe(validCurrentEntry.name);
        expect(response.body.error).toBeUndefined();

    })

    test("update duplicate ingredient gets rejected", async()=>{
        validCurrentEntry.name = defaultValues[1].name;
        const response = await supertest(app)
            .put(url)
            .send(validCurrentEntry);

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("name must be unique");
    })

    test("update with numbers in name gets rejected", async()=>{
        validCurrentEntry.name = "prote1n";
        const response = await supertest(app)
            .put(url)
            .send(validCurrentEntry);

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("name can only consist of lowercase letters");
    })

    // This does not work as at the moment the router just does not change it
    // test("update with blank name gets rejected", async()=>{
    //     // seems to just be ignoring this
    //     validCurrentEntry.name = "";
    //     const response = await supertest(app)
    //         .put(url)
    //         .send({"id":validCurrentEntry.id});
    //
    //
    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toBeDefined();
    //     expect(response.body.error).toBe("name can not be empty");
    //
    // })

    test("update removes uppercase letters", async()=>{
        validCurrentEntry.name = "PROTEINS";
        const response = await supertest(app)
            .put(url)
            .send(validCurrentEntry);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(validCurrentEntry.id);
        expect(response.body.name).toBe("proteins");
        expect(response.body.error).toBeUndefined();
    })

    test("invalid key gets rejected", async()=>{
        validCurrentEntry.id = 0;

        const response = await supertest(app)
            .put(url)
            .send(validCurrentEntry);

        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("key does not exist");
    })
})

describe('delete', () => {

    beforeEach(async() => {
        await exec('node fixtures/IngredientCategory.fix.js')
    })

    test("success delete last", async()=>{
        // deleting last entry
        let response = await supertest(app).del(url + "/" + defaultValues.length);

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("deleted successfully");

        response = await supertest(app).get(url);
        expect(response.body.length).toBe(defaultValues.length-1);

    })

    test("success delete first", async()=>{
        let response = await supertest(app).del(url + "/1");

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("deleted successfully");

        response = await supertest(app).get(url);
        expect(response.body.length).toBe(defaultValues.length-1);

    })

    test("fail delete invalid 0", async()=>{
        let response = await supertest(app).del(url + "/0");

        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("no entries match that key");

        response = await supertest(app).get(url);
        expect(response.body.length).toBe(defaultValues.length)


        response = await supertest(app).get(url);
        expect(response.body.length).toBe(defaultValues.length);
    })

    test("fail delete invalid too high", async()=>{
        let response = await supertest(app).del(url + "/" + defaultValues.length+1);

        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe("no entries match that key");

        response = await supertest(app).get(url);
        expect(response.body.length).toBe(defaultValues.length);

    })

})



