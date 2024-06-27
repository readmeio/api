import issue78 from '@api/issue-78';

issue78.getStoreOrderOrderidTrackingTrackingid({orderId: '1234', trackingId: '5678'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
