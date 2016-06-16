# response-chain
handle request by chain of responsibility

## Class
####Chain( list )
Chain need a list array with Response to initial 

#### Response( process )
Response need an process function to initial

#### Data( condition, callback )
Data need a condition ( String / Number / Boolean ) data and payload object to initail

## How to use

####First Step: Create a list array with Response
```javascript

	var list = [];
	
	// dataObj is a Data instance
	list.push( new Response( function( dataObj ){
		
		// this will be a Chain instance
		var chain = this;
		
		if( dataObj.condition == 'yac' ){
			// do something when condition compatible and then call chain's end();
			dataObj.payload.num = 224;
			chain.end();
		}else{
			// call chain's next() when condition incompatible
			chain.next();
		}
	
	})


```

####Second Step: Initial Chain instance
```javascript

	var chain = new Chain( list )


```

####Resquest Step: Call request and set callback
```javascript

	chain.request( new Data( 'yac', { num:0 }), function( dataObj ){
		
		// if any response's condition compatible will return dataObj
		// and set dataObj.process to true for check status
		// in this case data.process is true and data.payload.num is 224
		
	})
	
	chain.request( new Data('alex', { num:0 }), function( dataObj ){
	
		// if all response's condition incompatible will return dataObj
		// and set dataObj.process to false for check status
		// in this case data.process is false and data.payload.num is still 0
				
	})


```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Alex Chen <yac224@yacoding.com>