const request = require('supertest');
const app = require('../app');
jest.mock('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
});

test('POST /user/signup 회원가입에 성공하면 response로 200을 반환', async () => {
  const res = await request(app).post('/user/signup').send({
    userId: 'asdf',
    nickname: 'asdf',
    password: 'zxcv1234',
    passwordCheck: 'zxcv1234',
  });
  expect(res.status).toEqual(200);
});
