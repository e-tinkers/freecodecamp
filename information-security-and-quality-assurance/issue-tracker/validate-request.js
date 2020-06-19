const Joi = require('joi');

const validateRequest = function (data) {
  const schema = {
    issue_title: Joi.string().required(),
    issue_text: Joi.string().required(),
    created_by: Joi.string().required(),
    assigned_to: Joi.string(),
    status_text: Joi.string()
  };
  return Joi.validate(data, schema);
}

module.exports = validateRequest;
