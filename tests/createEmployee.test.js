const createEmployee =  recuire('../controllers/auth.controller');
const Employee = recuire('../models/Employee');
const db = recuire('./db');

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

// describe('Employee created when', async () => {
//     it('First Employee', async done => {
//         const {}
//     })
// })