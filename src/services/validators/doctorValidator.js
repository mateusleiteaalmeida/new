const { valid } = require('joi');
const Joi = require('joi');

const validateDoctorData = (data) => {
  const validObject = Joi.object({
    fullName: Joi.string().max(120).required(),
    CRM: Joi.string().pattern(/^\d+$/).max(7).required().messages({"string.pattern.base": "Invalid data, only numbers are allowed in CRM" }),
    address: Joi.object({
      zipCode: Joi.string().pattern(/^\d+$/).length(8).required().messages({"string.pattern.base": "Invalid data, only numbers are allowed in zipCode" }),
      streetAddress: Joi.string().required(),
      streetNumber: Joi.string().pattern(/^\d+$/).max(6).required().messages({"string.pattern.base": "Invalid data, only numbers are allowed in street number" }),
      complement: Joi.string(),
    }).required(),
    phone: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('Telefone', 'Celular').required().messages({ "any.only": 'The type must be entered as "Telefone" or "Celular' }),
        ddd: Joi.string().pattern(/^\d+$/).length(2).required().messages({"string.pattern.base": "Invalid data, only numbers are allowed in ddd" }),
        number: Joi.string().pattern(/^\d+$/).min(8).max(9).required().messages({"string.pattern.base": "Invalid data, only numbers are allowed in phone number" }),
      })).length(2).required(),
    specialty: Joi.array().items(
      Joi.string())
    .min(2).required(),
  }).validate(data)
  if (validObject.error) throw validObject.error.details[0];
}

module.exports = validateDoctorData;