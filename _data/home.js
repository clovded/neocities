const fs = require('fs');
const path = require('path');

module.exports = function () {
  const raw = fs.readFileSync(path.join(__dirname, 'home.md'), 'utf8');
  const sections = {};
  const parts = raw.split(/^# /m).filter(Boolean);
  for (const part of parts) {
    const [title, ...body] = part.split('\n');
    sections[title.trim()] = body.join('\n').trim().replace(/\n/g, '<br>');
  }
  return {
    about: sections['about'] || '',
    onThisSite: sections['on this site'] || '',
  };
};
