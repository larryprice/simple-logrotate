simple-logrotate
================

Rotate and compress log files or directories for your node application on app start.

Copyright (C) 2017 Larry Price <larry.price.dev@gmail.com>. See [LICENSE](LICENSE) for more details.

### Usage ###

The rotate function takes in two parameters, `logname` and `backups`, and returns a promise:

``` javascript
const logRotate = require('simple-logrotate')

// input parameters
const logname = '/tmp/myapp'; // Path to the original log file or directory
const backups = 3;            // Number of compressed backup logs to keep

logRotate(logname, backups).then(() => {
  // insert your main logic here
}, (err) => {
  // handle internal error
  console.error(err);
});
```

The backup files will be named as `${logname}.x.tar.gz`, where `x` is an integer between 1 and `backups`. On rotation, the log corresponding with the integer `x` will be removed.

