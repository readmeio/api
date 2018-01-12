module.exports = (code) => {
  if (process.env.NODE_ENV === 'testing') {
    return Promise[code === 0 ? 'resolve' : 'reject'](new Error(`Process exit: ${code}`));
  }

  return process.exit(code);
};
