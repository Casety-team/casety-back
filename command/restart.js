var ovh = require('ovh')({
  endpoint: 'ovh-eu',
  appKey: 'tgMGZTyRp1qVKbqO',
  appSecret: 'ZPldUA5pKisQrdaXbPpJ8VFyQY4Dal5G'
});

ovh.request('POST', '/auth/credential', {
  'accessRules': [
    { 'method': 'POST', 'path': '/hosting/web/casetyi.cluster024.hosting.ovh.net/attachedDomain/api.casety.fr/restart'}
  ]
}, function (error, credential) {
  console.log(error || credential);
});