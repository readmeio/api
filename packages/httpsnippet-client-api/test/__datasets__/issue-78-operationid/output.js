import sdk from '@api/issue-78-operationid';

sdk.getOrder({orderId: '1234'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
