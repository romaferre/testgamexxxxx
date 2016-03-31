	var defaultCallback={
			
			success:function(data){
				console.log("OK: " +data);
			},
			error:function(){
				console.log("KO");
			}
		}

	function applyFunctionToParams(func,params){
		var theCallback = defaultCallback;
		var theSlice=params.slice(1).reverse()
		theSlice.forEach(function(entry) {
		    console.log(entry);
		    var oldCallback = theCallback;
		    theCallback={
		    		success:function(data){
		    			console.log("OK: " +data);
		    			var theParams = entry.concat(oldCallback)
		    			func.apply(this,theParams);
		    		},
					error:function(){
						console.log("KO");
					}	
	    		}
		    
		});
		var remainingParams = params[0].concat(theCallback)
		func.apply(this,remainingParams);
	}
	function executeSomeFunctions(functionArray, lastCallback){
		var dataArray=[];
		var theCallback ={
				success:function(data){
	    			dataArray=dataArray.concat(data);
					console.log(dataArray)
					lastCallback.success(dataArray);
				},
				error:function(status,response){
					lastCallback.error(status,response);
				}
		}
		var theSlice=functionArray.slice(1).reverse();
		theSlice.forEach(function(entry) {
		    console.log(entry);
		    var oldCallback = theCallback;
		    theCallback={
		    		success:function(data){
		    			console.log("OK: " +data);
		    			dataArray=dataArray.concat(data);
		    			var func = entry[0];
		    			var newParams = entry.slice(1).concat(oldCallback)
		    			func.apply(this,newParams);
		    		},
					error:function(){
						console.log("KO");
					}	
	    		}
		    
		});
		var firstFunction = functionArray[0];
		var func = firstFunction[0];
		var theParams = firstFunction.slice(1).concat(theCallback)
		func.apply(this,theParams);
	}