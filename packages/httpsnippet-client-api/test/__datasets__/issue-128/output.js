import sdk from '@api/issue-128';

sdk.auth('authKey\'With\'Apostrophes');
sdk.getItem()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
