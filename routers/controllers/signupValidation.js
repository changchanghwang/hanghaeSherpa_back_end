module.exports = {
  idValidation(userId) {
    const idRegexp = /^[a-zA-Z0-9]{4,12}$/;
    const validatedId = idRegexp.test(userId);
    if (!validatedId) {
      // console.log('아이디 형식에 맞춰주세요');
      return false;
    }
    return true;
  },
  passwordValidation(userId, password, passwordCheck) {
    const pwRegexp = /^[a-zA-Z0-9!@#$%^&*]{6,18}$/;
    const validatedPw = pwRegexp.test(password);
    if (!validatedPw) {
      // console.log('패스워드 형식에 맞춰주세요');
      return false;
    } else if (password !== passwordCheck) {
      // console.log('패스워드 일치시켜주세요');
      return false;
    } else if (password.search(userId) !== -1) {
      // console.log('아이디와 중복되는 패스워드 설정하지 말아주세요');
      return false;
    }
    return true;
  },
};
