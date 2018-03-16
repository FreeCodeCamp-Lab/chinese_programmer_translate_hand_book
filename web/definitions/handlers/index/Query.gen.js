"use strict";



class Query {
  constructor(options={}){
    this.word = options.word || '小姜';
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.word = this.pick(req, 'query.word', 'string', '小姜');
    return new Query(options);
  }

  validate(){
    if(!((typeof this.word === 'string') && (this.word.length>=0) && (this.word.length<=9007199254740991))){
      throw new Error('type validate failed: [word]: String length must between 0 to 9007199254740991');
    }

  }

  static pick(source, path, type=null, defaultValue=null, memberType=null){
    let paths = path.split('.');
    let tmp = source;
    for(let k in paths){
      if(tmp[paths[k]]){
        tmp = tmp[paths[k]];
      }else{
        tmp = tmp[paths[k]];
        break;
      }
    }
    if(tmp===undefined){
      return defaultValue;
    }
    switch (type){
      case 'string':
        if(typeof tmp === 'object'){
          tmp = JSON.stringify(tmp);
        }else{
          tmp = tmp.toString();
        }
        break;
      case 'number':
      case 'enum':
        tmp = 1*tmp;
        break;
      case 'array':
        if(typeof tmp === 'string'){
          tmp = tmp.split(',');
        }
        if (memberType === 'number') {
          let len = tmp.length;
          for (let i = 0; i < len; i++) {
            tmp[i] = 1 * tmp[i];
          }
        }
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Query;