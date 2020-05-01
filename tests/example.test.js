const request = require('supertest');
const app = require('../app');
const MongoClient = require('mongodb');


test('db connect', async () => {
    const connection = await MongoClient.connect('mongodb://localhost/shoppinglist', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let db = await connection.db();
    expect(db.databaseName).toBe("shoppinglist")
});

test('should test that true === true', () => {
    expect(true).toBe(true);
});

test('insert user', async () => {
    const res = await request(app).post('/register').send({
        username: 'testing',
        password: 'pass',
    })
    expect(res.statusCode).toBe(200);
});
