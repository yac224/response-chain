var Chain = function(list) {
  this.list = [];
	if (list instanceof Array) {
		var length = list.length
		var res;
		for (var i = 0; i<length; i++) {
  		res = list[i];
			if (res instanceof Response) {
				this.list.push(list[i]);
			}
		}
    if(this.list.length < 1){
      throw new Error("Chain need an Array with Response inside.");
    }
	} else {
		throw new Error("Chain need an Array with Response inside.");
	}
}

Chain.prototype = {
	request: function(dataObj,callback) {
    if(dataObj instanceof Data && callback instanceof Function){
      var chain = this;
      var chainObj = {
        count:0,
        next:function(){
          if(++this.count < chain.list.length){
            chain.list[this.count].process.call(this,dataObj);
          }else{
            dataObj.process = false;
            callback(dataObj);
          }
        },
        end:function(){
          dataObj.process = true;
          dataObj.step = this.count;
          callback(dataObj);
        }
      }
      chain.list[0].process.call(chainObj,dataObj);
    }else{
      throw new Error("request need a Data object and a callback function.");
    }
  }
}

var Response = function(process) {
  if(process instanceof Function){
    this.process = process;
  }else{
    throw new Error("Response need a process function.");
  }
}

var Data = function(condition,payload){
  if(typeof condition === 'string' || typeof condition === 'number' || typeof condition === 'boolean'){
    this.condition = condition;
  }else{
    throw new Error("Data need a condition data and a payload object.");
  }
  if(payload instanceof Object){
    this.payload = payload;
  }else{
    throw new Error("Data need a payload object.");
  }
}

exports.Chain = Chain
exports.Response = Response;
exports.Data = Data
