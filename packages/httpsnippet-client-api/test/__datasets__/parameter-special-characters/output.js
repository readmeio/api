import parameterSpecialCharacters from '@api/parameter-special-characters';

parameterSpecialCharacters.getAppIdNumInstalls_reportV5({'app-id': '1234', num: '5678'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
