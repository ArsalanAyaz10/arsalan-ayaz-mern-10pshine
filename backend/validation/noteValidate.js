import Joi from 'joi';

export const noteSchema = Joi.object({
    title:Joi.string().min(3).required(),
    content:Joi.string().min(6).required(),
});