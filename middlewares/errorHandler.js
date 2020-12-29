module.exports = (err, req, res, next) => {
  const { message, response } = err;

  console.log('errrrr', err.status);
  return res.status(500).json({ message });
};
