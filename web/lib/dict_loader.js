'use strict';
const path = require('path');
const fs = require('fs');
const T = require('tries-tree');
const { EOL } = require('os');

const DICT_ROOT = path.resolve(`${__dirname}/../../dict`);

class DictLoader {
  constructor() {
    if (!fs.existsSync(DICT_ROOT)) {
      throw new Error(`DICT_ROOT NOT EXISTS: ${DICT_ROOT}`);
    }
    let files = fs.readdirSync(DICT_ROOT);
    let len = files.length;
    this.words = {};
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        this.words = { ...this.words, ...readWordFromFile(`${DICT_ROOT}/${files[i]}`) }
      }
    }
    this.tree = new T({ runtimePath: '/tmp' });
    this.tree.build(Object.keys(this.words));
  }

  find(word) {
    if (this.tree.find(word)) {
      return this.words[word];
    } else {
      return 'NOT_DEFINED';
    }
  }
}

function readWordFromFile(file) {
  let content = fs.readFileSync(file).toString();
  let lines = content.split(EOL);
  let result = {};
  if (lines.length === 0 || lines[0] === '') {
    return result;
  }
  let len = lines.length;
  for (let i = 0; i < len; i++) {
    let [k, v] = lines[i].split(' ');
    result[k] = v;
  }
  return result;
}

module.exports = DictLoader;