const Joi = require('joi');

module.exports = {
  Joi,
  signUpSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(4)
      .max(12)
      .pattern(/^[a-zA-Z0-9!@#$%^&*]{4,12}$/),
    nickname: Joi.string()
      .required()
      .min(1)
      .max(10)
      .pattern(/^[a-zA-Z0-9가-힣]{1,10}$/),
    password: Joi.string()
      .required()
      .min(6)
      .max(18)
      .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,18}$/),
    passwordCheck: Joi.ref('password'),
  }),
  idCheckSchema: Joi.object({
    userId: this.signUpSchema.userId,
  }),
  nicknameSchema: Joi.object({
    nickname: this.signUpSchema.nickname,
  }),
};
