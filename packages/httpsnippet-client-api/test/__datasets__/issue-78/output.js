import sdk from '@api/issue-78';

sdk.getStoreOrderOrderidTrackingTrackingid({orderId: '1234', trackingId: '5678'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
