// const validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const schemas = {
//       [name]: schema[name],
//     };
//     const { error } = Joi.validate(obj, schemas);
//     return error ? error.details[0].message : null;
//   };

export function handlingSubmit({ e }, doSubmit, result, setError) {
  e.preventDefault();

  const errors = result;
  setError(errors || {});

  if (errors) return;
  doSubmit();
}
