//grammarParser.js
//sam@ecology.rocks, 10/01/2015

//select a random element from the array.
function randomElem(x){
	if(x!=""){
	   return x[Math.floor(Math.random() * x.length)];
    } else{
	   return 0;
    }
}

// lookup a key in the dictionary
function keyLookup(dictionary, topkey){
            
    // pick a random item from the set of values; 
    //if this is top key, it might have multiple keys inside.
    var storyString = randomElem(dictionary[topkey]);
    
    // split the string by opening key symbols
    var searchKeys = storyString.split('{');
            
    // for each index in searchKeys, split at '}' for closing key symbols
	for (var i = 1; i < searchKeys.length; i++) {
        searchKeys[i] = searchKeys[i].split('}')[0];
    }

    //for each index in searchKeys, 
    //replace brackets with the appropriate random element from the dictionary
    for(i = 1; i < searchKeys.length; i++){
        var storyString = storyString.replace("{"+ searchKeys[i] + "}", randomElem(dictionary[searchKeys[i]]))
        }
            // check to see if we're done, if not, length will be greater than one
			if(storyString.split("{").length > 1){
                // we're not done, so repeat
				storyString = keyLookup(dictionary, storyString);
			} else{
                //we're done, return the storyString
				return storyString;
			}
}

//
function parseMyText() {
    //initial values
	var finalstring="";
	var finalobject={};
    
    //pull in myText, split by line breaks
    var x = document.getElementById("myText").value.split('\n');
    
    // for each command, build an object
    for(var i =0; i < x.length; i++){
        //split by designated keyvalue break
 		keyValPairs = x[i].split(" ::= ");
        
        //if there are no splits, return error
 		if(keyValPairs.length === 1){
 			document.getElementById("demo").innerHTML =  "Sorry, invalid key";
 		}
        
        //if this is the first time in the loop, 
        //pull down the first element as top key
 		if(i===0){
 			topkey = keyValPairs[0];
 		}
        
 		//if keyValPairs split properly, split the values into multiple segments
 		if(keyValPairs.length === 2){
            // split by the | symbol
 			finalobject[keyValPairs[0]] = keyValPairs[1].split(" | ");
 		} else{
            //return error if necessary
 			document.getElementById("demo").innerHTML =  "Sorry, invalid key";
 		}	
    }

    //outside of for loop, extract the value of topkey and start parsing it.
    // pull out top key
    var parsedString = finalobject[topkey];
    
    // parse the string with keyLookup
    finalstring = keyLookup(finalobject, topkey)
    document.getElementById("demo").innerHTML = finalstring;
}