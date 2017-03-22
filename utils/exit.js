module.exports = (code) => {
  if (process.env.NODE_ENV !== 'testing') process.exit(code);
};
