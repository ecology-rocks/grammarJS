//grammarParser.js
//sam@ecology.rocks, 10/01/2015



//select a random element from the array.
function randomElem(x) {
    var finalstring;
	if (Array.isArray(x)) {
	   finalstring = x[Math.floor(Math.random() * x.length)];
    } else {
	   finalstring =  'Sorry, error occurred here';
    }
    return finalstring;
}

// lookup a key in the dictionary
function keyLookup(dictionary, topkey, storyString, second) {
            storyString = storyString || "";
            second = second || false;
    // pick a random item from the set of values; 
    //if this is top key, it might have multiple keys inside.
    if (second===false) {
        var storyString = randomElem(dictionary[topkey]);
        if(storyString === 'Sorry, error occurred here'){
            return dictionary[topkey];
        }
    } 
    
    // split the string by opening key symbols
    var searchKeys = storyString.split('{');
    //console.log("First split: " + storyString);
            
    // for each index in searchKeys, split at '}' for closing key symbols
	for (var i = 1; i < searchKeys.length; i++) {
        searchKeys[i] = searchKeys[i].split('}')[0];
    }

    //for each index in searchKeys, 
    //replace brackets with the appropriate random element from the dictionary
    for(i = 1; i < searchKeys.length; i++){
        //console.log("Before foreach mod: " + storyString)
        var storyString = storyString.replace("{"+ searchKeys[i] + "}", randomElem(dictionary[searchKeys[i]]))
            //console.log("Foreach: " + storyString)
        }
            // check to see if we're done, if not, length will be greater than one
			if(storyString.split("{").length > 1){
                // we're not done, so repeat
                //console.log("in the if statement!");
                                    console.log(storyString);
				storyString = keyLookup(dictionary, topkey, storyString, true);

			}
    		
    return storyString;
}



var $success = $('#success');
var $story = $('#story');
var $reset = $('#reset');

function badStory(){

    $success.html("Oh no!");
    $story.html("Sorry, your grammar was bad. Maybe try again?");
    
}

function goodStory(finalstring){
        //console.log($success);
    //console.log("YAY " + finalstring);
    $success.html("Yay!");
    $story.html(finalstring);

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
            badStory();
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
            console.log("oops");
 			badStory();
 		}	
    }

    //outside of for loop, extract the value of topkey and start parsing it.
    // pull out top key
    var parsedString = finalobject[topkey];
    
    // parse the string with keyLookup
    finalstring = keyLookup(finalobject, topkey);
    //console.log(finalstring);
    goodStory(finalstring);
    $reset.fadeIn();
}

function resetForm(){
        $success.html("");
        $story.html("");
        $reset.fadeOut();
}

$(document).on('click', "#reset", resetForm);
$(document).on('click', '#tryit',parseMyText);