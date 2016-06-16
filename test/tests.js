var Chain = require('../index.js').Chain
var Response = require('../index.js').Response
var Data = require('../index.js').Data

var should = require("chai").should();

describe('Chain init',function(done){

	it('without list array should throw error.',
		function(){
			(function(){
				new Chain();
			}).should.throw(Error);
		}
	);

	it('list is not array should throw error.',
		function(){
			(function(){
				new Chain('test');
			}).should.throw();
		}
	);

	it('list is an empty array should throw error.',
		function(){
			(function(){
				new Chain([]);
			}).should.throw(Error);
		}
	);

	it('list is an array but without Response should throw error.',
		function(){
			(function(){
				new Chain(['test']);
			}).should.throw(Error);
		}
	);

	it('with list array and Response inside should not throw error and chain\'s list length is more then 0.',
		function(){
			var chain;
			(function(){
				chain = new Chain([new Response(function(){})]);
			}).should.not.throw(Error);
			chain.list.length.should.above(0);
		}
	);

});

describe('Response init',function(){

	it('without process function should throw error.',
		function(){
			(function(){
				new Response();
			}).should.throw(Error);
		}
	);

	it('process is not a function should throw error.',
		function(){
			(function(){
				new Response('test');
			}).should.throw(Error);
		}
	);

	it('whith process function should not throw error.',
		function(){
			(function(){
				new Response(function(){});
			}).should.not.throw(Error);
		}
	);

});

describe('Data init',function(){

	it('without condition data and callback function should throw error.',
		function(){
			(function(){
				new Data();
			}).should.throw(Error);
		}
	);

	it('condition is not string, number, or boolean should throw error.',
		function(){
			(function(){
				new Data({});
			}).should.throw(Error);
		}
	);

	it('callback is not function should not throw error.',
		function(){
			(function(){
				new Data('test','test');
			}).should.throw(Error);
		}
	);

	it('with condition data and callback function should not throw error.',
		function(){
			(function(){
				new Data('test',function(){});
			}).should.not.throw(Error);
		}
	);

});

describe('Chain request',function(){
	var chain;
	before(function(){

		var list = [];
		list.push( new Response(function(dataObj){

			var chain = this;
			if(dataObj.condition == "yac"){
				dataObj.payload.score = 224
				chain.end();
			}else{
				chain.next();
			}

		}) )
		list.push( new Response(function(dataObj){

			var chain = this;
			if(dataObj.condition == "alex"){
				setTimeout(function(){
					dataObj.payload.score = 123
					chain.end();
				},1000)
			}else{
				chain.next();
			}

		}) )
		list.push( new Response(function(dataObj){

			var chain = this;
			if(dataObj.condition == "chen"){
				dataObj.payload.score = 456
				chain.end();
			}else{
				chain.next();
			}

		}) )
		chain = new Chain(list);

	});

	it('without dataObj and callback function should throw error.',
		function(){
			(function(){
				chain.request();
			}).should.throw(Error);
		}
	);

	it('dataObj is not a Data object should throw error.',
		function(){
			(function(){
				chain.request('test');
			}).should.throw(Error);
		}
	);

	it('callback is not a function should throw error.',
		function(){
			(function(){
				chain.request(new Data('test',{}),'test');
			}).should.throw(Error);
		}
	);

	it('with dataObj and callback function should not throw error and callback data.process is true and data.payload.score changed',
		function(){
			(function(){
				chain.request( new Data('yac',{score:0}),function(data){
					data.process.should.ok;
					data.payload.score.should.equal(224);
				})
			}).should.not.throw(Error);

			(function(){
				chain.request( new Data('alex',{score:0}),function(data){
					data.process.should.ok;
					data.payload.score.should.equal(123);
				})
			}).should.not.throw(Error);

			(function(){
				chain.request( new Data('chen',{score:0}),function(data){
					data.process.should.ok;
					data.payload.score.should.equal(456);
				})
			}).should.not.throw(Error);
		}
	);

	it('data.process is false',
		function(){
			chain.request( new Data('test',{score:0}),function(data){
				data.process.should.not.ok;
			})
		}
	);

});
