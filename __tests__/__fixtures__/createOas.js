module.exports = serverUrl => {
  return function (method = 'get', path = '/', operation = {}) {
    return {
      openapi: '3.0.0',
      info: {
        title: 'OAS test',
      },
      servers: [
        {
          url: serverUrl,
        },
      ],
      paths: {
        [path]: {
          [method]: operation,
        },
      },
    };
  };
};
