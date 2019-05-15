const joi = require('joi');

const itemSchema = joi.object().keys({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(3).required(),
    price: joi.number().min(0).required()
})

const editItemSchema = joi.object().keys({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(3).required(),
    price: joi.number().min(0).required()
})
module.exports = {
    itemSchema,
    editItemSchema
}