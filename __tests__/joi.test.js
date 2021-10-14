const schema = require('../routers/joi');
const clearData = require('./clearData');

//signupSchema test
test('signupSchema: userId가 영어 대소문자,숫자,특수문자(!@#$%^&*)이 아닐경우 실패', async () => {
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '````',
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: 'ㅁㅁㅁㅁ',
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '<script></script>',
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: [[]],
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: {},
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: true,
      nickname: clearData.nickname,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
});
test('signupSchema: userId가 영어 대소문자,숫자,특수문자(!@#$%^&*)이 아닐경우 실패', async () => {});
test('signupSchema: nickname이 영어 대소문자,숫자,한글이 아닐경우 실패', async () => {
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: 'ㅁㅁㅁㅁ',
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: '!!!!',
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: [[]],
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: true,
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: {},
      password: clearData.password,
      passwordCheck: clearData.passwordCheck,
    })
  ).rejects.toThrowError();
});
