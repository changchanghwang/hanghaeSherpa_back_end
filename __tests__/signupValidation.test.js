const {
  passwordValidation,
} = require('../routers/controller/signupValidation');

test(`비밀번호를 입력했을때 
        1. password와 passwordCheck가 일치할 때,
        2. password가 id를 포함시키지 않을때
        true를 반환한다.`, () => {
  expect(passwordValidation('zzzz', 'aaaaaa', 'aaaaaa')).toEqual(true);
  expect(passwordValidation('zzzz', 'AAAAAA', 'AAAAAA')).toEqual(true);
  expect(passwordValidation('zzzz', '111111', '111111')).toEqual(true);
  expect(passwordValidation('zzzz', '!@#$%^&*', '!@#$%^&*')).toEqual(true);
  expect(passwordValidation('zzzz', 'aaAA11!@', 'aaAA11!@')).toEqual(true);
});

test('비밀번호를 입력했을때 password와 passwordcheck가 일치하지 않으면 false를 반환한다.', () => {
  expect(passwordValidation('zzzz', 'aaaaa', 'aaaa')).toEqual(false);
  expect(passwordValidation('zzzz', 'aaaaa', 'aaaaA')).toEqual(false);
  expect(passwordValidation('zzzz', 'aaaaa', 'aaaaaa')).toEqual(false);
});

test('비밀번호를 입력했을때 아이디가 포함되는 비밀번호면 false를 반환한다.', () => {
  expect(passwordValidation('zzzzzz', 'zzzzzz', 'zzzzzz')).toEqual(false);
  expect(passwordValidation('zzzz', 'aaazzzz', 'aaazzzz')).toEqual(false);
  expect(passwordValidation('zzzz', 'zzzzaaaaa', 'zzzzaaaaa')).toEqual(false);
  expect(passwordValidation('zzzz', 'zzzzzaaaaa', 'zzzzzaaaaa')).toEqual(false);
});
