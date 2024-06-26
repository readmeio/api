import issue128 from '@api/issue-128';

issue128.auth('authKey\'With\'Apostrophes');
issue128.getItem()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
