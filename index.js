const fs = require('fs-extra');
const archiver = require('archiver');

var rotate = function(logname, backups) {
  for (var i = backups; i > 0; --i) {
    if (fs.pathExists(`${logname}.${i-1}.tar.gz`)) {
      fs.moveSync(`${logname}.${i-1}.tar.gz`, `${logname}.${i}.tar.gz`, {overwrite: true});
    }
  }

  return fs.pathExists(logname).then((exists) => {
    if (exists) {
      return fs.remove(logname);
    }
    return new Promise((resolve) => resolve());
  }).then(() => {
    return fs.mkdirp(logname);
  });
};

module.exports = function(logname, backups) {
  var output = fs.createWriteStream(`${logname}.0.tar.gz`),
      archive = archiver('tar', {gzip: true, gzipOptions: { level: 9 }});
  archive.pipe(output);

  const stats = fs.statSync(logname);
  if (stats.isDirectory()) {
    archive.glob(`*`, {cwd: logname});
  } else {
    archive.append(logname);
  }

  return archive.finalize().then(() => {
    return rotate(logname, backups);
  });
};
