// This just allows you to print out a little description
// between prompmts for enquirer

function PromptMessage(q) {
  console.log('');
  if (typeof q.message === 'function') {
    q.message();
  } else {
    console.log(q.message);
  }
  console.log('');
}

PromptMessage.prototype.run = () => {
  return new Promise((resolve) => {
    resolve(true);
  });
};

module.exports = PromptMessage;
