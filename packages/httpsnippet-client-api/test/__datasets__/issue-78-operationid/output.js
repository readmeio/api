import issue78Operationid from '@api/issue-78-operationid';

issue78Operationid.getOrder({orderId: '1234'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
