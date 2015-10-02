//grammarParser.js
function randomElem(x){
	if(x!=""){
	return x[Math.floor(Math.random() * x.length)];
} else{
	return 0;
}

}


function keyLookup(dictionary, topkey){
			var storyString = randomElem(dictionary[topkey]);
			var searchKeys = storyString.split('{');

			for (var i = 1; i < searchKeys.length; i++) {
			    searchKeys[i] = searchKeys[i].split('}')[0];
			}

			for(i = 1; i < searchKeys.length; i++){
				var storyString = storyString.replace("{"+ searchKeys[i] + "}", randomElem(dictionary[searchKeys[i]]))
			}

			if(storyString.split("{").length > 1){
				storyString = keyLookup(dictionary, storyString);
			} else{
				return storyString;
			}

}


function parseMyText() {
	var finalstring="";
	var finalobject={};
    var x = document.getElementById("myText").value.split('\n');
    // for each command, build an object
    for(var i =0; i < x.length; i++){
 		keyValPairs = x[i].split(" ::= ");
 		if(keyValPairs.length === 1){
 			document.getElementById("demo").innerHTML =  "Sorry, invalid key";
 		}

 		if(i===0){
 			topkey = keyValPairs[0];
 		}
 		//if keyValPairs split properly
 		if(keyValPairs.length === 2){
 			finalobject[keyValPairs[0]] = keyValPairs[1].split(" | ");
 		} else{
 			return "Sorry, invalid key."
 		}	
    }

    //outside of for loop, extract the value of topkey and start parsing it.
    var parsedString = finalobject[topkey];
    parsedString = parsedString[Math.floor(Math.random() * parsedString.length)];
    finalstring = keyLookup(finalobject, topkey)
    document.getElementById("demo").innerHTML = finalstring;
}