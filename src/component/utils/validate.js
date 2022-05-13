import Joi from "joi-browser";

export function validating(data, schema) {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);

  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
}

export function validatingProperty({ name, value }, schema) {
  const obj = { [name]: value };
  const schemas = {
    [name]: schema[name],
  };
  const { error } = Joi.validate(obj, schemas);
  return error ? error.details[0].message : null;
}
