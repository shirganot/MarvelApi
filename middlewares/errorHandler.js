module.exports = (err, req, res, next) => {
  const { message, response } = err;
  return res.status((response && response.status) || 500).json({ message });
};
