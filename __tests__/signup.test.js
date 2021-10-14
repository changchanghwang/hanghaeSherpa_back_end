jest.mock('../models/users');
const User = require('../models/users');
const { signup } = require('../services/signup');

test('회원가입을 할 때 유저가 없으면 생성 후 response.status로 200을 반환', async () => {
  const nickname = 'asdf';
  const userId = 'asdf';
  const password = 'zxcv1234';
  const passwordCheck = 'zxcv1234';
  const req = {
    body: {
      nickname,
      userId,
      password,
      passwordCheck,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  User.findOne.mockReturnValue(null);
  await signup(req, res, next);
  expect(res.status).toBeCalledWith(200);
  expect(res.json).toBeCalledTimes(1);
});

test('회원가입을 할 때 유저가 있으면 response.status로 400을 반환하고 errorMessage:중복아이디입니다.를 반환', async () => {
  const nickname = 'asdf';
  const userId = 'asdf';
  const password = 'zxcv1234';
  const passwordCheck = 'zxcv1234';
  const req = {
    body: {
      nickname,
      userId,
      password,
      passwordCheck,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  User.findOne.mockReturnValue(Promise.resolve(true));
  await signup(req, res, next);
  expect(res.status).toBeCalledWith(400);
  expect(res.json).toBeCalledWith({ errorMessage: '중복아이디입니다.' });
});

test('db에서 에러가 발생하면 next(err) 호출', async () => {
  const nickname = 'asdf';
  const userId = 'asdf';
  const password = 'zxcv1234';
  const passwordCheck = 'zxcv1234';
  const req = {
    body: {
      nickname,
      userId,
      password,
      passwordCheck,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  const err = 'test error';
  await User.findOne.mockRejectedValue(err);
  await signup(req, res, next);
  expect(next).toBeCalledWith(err);
});
