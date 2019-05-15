const joi = require('joi');

const orderSchema = joi.object().keys({
   //  id: joi.number().min(0).required(),
    clientname: joi.string().min(3).max(100).required(),
    itemlist: joi.array().required()
})

module.exports = {
    orderSchema
}