jest.mock('../models/users');
const User = require('../models/users');
const { idCheck, nicknameCheck } = require('../routers/controllers/Checks');

test('id중복체크 시 중복되지 않으면 response status로 200 반환', async () => {
  const userId = 'asdf';
  const req = {
    body: {
      userId,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  User.findOne.mockReturnValue(null);
  await idCheck(req, res, next);
  expect(res.status).toBeCalledWith(200);
  expect(res.json).toBeCalledTimes(1);
});

test('id중복체크 시 중복되면 response status로 400 반환', async () => {
  const userId = 'asdf';
  const req = {
    body: {
      userId,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  User.findOne.mockReturnValue(Promise.resolve(true));
  await idCheck(req, res, next);
  expect(res.status).toBeCalledWith(400);
  expect(res.json).toBeCalledTimes(1);
});

test('id중복체크시 db에서 에러나면 next(err)호출', async () => {
  const userId = 'asdf';
  const req = {
    body: {
      userId,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  const err = 'test error';
  await User.findOne.mockRejectedValue(err);
  await idCheck(req, res, next);
  expect(next).toBeCalledWith(err);
});

test('닉네임 중복체크시 중복되지 않으면 response status로 200 반환', async () => {});
