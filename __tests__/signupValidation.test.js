const {
  idValidation,
  passwordValidation,
} = require('../routers/controller/signupValidation');

test('아이디를 입력했을때 영어 대소문자, 숫자, 4글자이상 12글자 이하 일때만 true를 반환한다.', () => {
  expect(idValidation('asdf')).toEqual(true);
  expect(idValidation('ASDF')).toEqual(true);
  expect(idValidation('1234')).toEqual(true);
  expect(idValidation('aA1aA1aA1aA1')).toEqual(true);
});

test('아이디를 입력했을때 영어 대소문자, 숫자, 4글자이상 12글자 이하가 아니면 false를 반환한다.', () => {
  expect(idValidation('a')).toEqual(false);
  expect(idValidation('aA')).toEqual(false);
  expect(idValidation('A1')).toEqual(false);
  expect(idValidation('a1')).toEqual(false);
  expect(idValidation('aA1')).toEqual(false);
  expect(idValidation('황창환입니다')).toEqual(false);
  expect(idValidation('aA1황')).toEqual(false);
  expect(idValidation('aA1!')).toEqual(false);
  expect(idValidation('aA1aA1aA1aA1a')).toEqual(false);
});
test(`비밀번호를 입력했을때 
        1. 영어 대소문자, 숫자, 특수문자(!@#$%^&*), 6글자 이상 18글자 이하 일때,
        2. password와 passwordCheck가 일치할 때,
        3. password가 id를 포함시키지 않을때
        true를 반환한다.`, () => {
  expect(passwordValidation('zzzz', 'aaaaaa', 'aaaaaa')).toEqual(true);
  expect(passwordValidation('zzzz', 'AAAAAA', 'AAAAAA')).toEqual(true);
  expect(passwordValidation('zzzz', '111111', '111111')).toEqual(true);
  expect(passwordValidation('zzzz', '!@#$%^&*', '!@#$%^&*')).toEqual(true);
  expect(passwordValidation('zzzz', 'aaAA11!@', 'aaAA11!@')).toEqual(true);
  expect(
    passwordValidation('zzzz', 'aaAA11!@AA11#$%^&*', 'aaAA11!@AA11#$%^&*')
  ).toEqual(true);
});

test('비밀번호를 입력했을때 영어 대소문자, 숫자, 특수문자(!@#$%^&*), 6글자 이상 18글자 이하가 아니면 false를 반환한다.', () => {
  expect(passwordValidation('zzzz', 'aaaaa', 'aaaaa')).toEqual(false);
  expect(passwordValidation('zzzz', 'AAAAA', 'AAAAA')).toEqual(false);
  expect(passwordValidation('zzzz', '11111', '11111')).toEqual(false);
  expect(passwordValidation('zzzz', '!@#$%', '!@#$%')).toEqual(false);
  expect(passwordValidation('zzzz', 'aA1!', 'aA1!')).toEqual(false);
  expect(passwordValidation('zzzz', 'aaAA11!@?', 'aaAA11!@?')).toEqual(false);
  expect(passwordValidation('zzzz', 'aA1!aA1!황', 'aA1!aA1!황')).toEqual(false);
  expect(
    passwordValidation('zzzz', 'aA1!aA1!aA1!aA1!aA1!', 'aA1!aA1!aA1!aA1!aA1!')
  ).toEqual(false);
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
