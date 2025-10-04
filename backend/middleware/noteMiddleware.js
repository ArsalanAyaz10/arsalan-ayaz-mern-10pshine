export const checkNote = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); 
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    const err = new Error(message);
    res.status(400);
    return next(err);
  }
  next();
};