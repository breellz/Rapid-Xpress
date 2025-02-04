import Joi from "joi";

export interface ISignUpData {
  name: string;
  age: number;
  password: string;
  email: string;
}

export interface ILoginData {
  password: string;
  email: string;
}
export const signupValidation = (data: ISignUpData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().positive().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

export const loginValidation = (data: ILoginData) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

