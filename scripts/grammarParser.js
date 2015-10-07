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
var $inputDict = $("#inputDict");

function badStory(){
    //$success.html("Oh no!");
    $story.html("Sorry, your grammar was bad. Maybe try again?");
    
}

function goodStory(finalstring){
        //console.log($success);
    //$success.text("Yay!");
    $story.html(finalstring);

}

//


function parseMyText() {
    //initial values
	var finalstring="";
	var finalobject={};
    
    //pull in myText, split by line breaks
    var x = document.getElementById("inputDict").value.split('\n');
    
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
        //$success.html("");
        //$story.html("");
        $inputDict.html("");
        $reset.fadeOut();
}

function preloadRomance(){

        $inputDict.html("top ::= {Fred} desperately {wanted} to impress {Carla}. He thought about {lassoing} the {moon} or {catching} a {shootingstar}, but those things had already been done. He needed something {new}, something {unique}. In the end he decided to simply be himself, and that idea was novel enough to win her heart forever. \nFred ::= Fred | Bill | Calvin \nwanted ::= wanted | needed | yearned \nCarla ::= Kristen | Kayla | Allison | Melanie \nlassoing ::= lassoing | strangling | tackling \nmoon ::= moon | stars | local councilwoman \ncatching ::= catching | chasing | fighting \nshootingstar ::= shooting star | monkey | kitten | comet \nnew ::= new | unique | strange \nunique ::= unique | terrible | awesome");

}

function preloadHello(){
   $inputDict.html("top ::= {hello} {world}! How are you?\nhello ::= Hello | Howdy | Hey there\nworld ::= world | people | globe | kids");
}

function preloadScifi(){
   $inputDict.html("top ::= The time {machine} {shimmered} and {disappeared}. She {looked} at the {emptyspace} it left and {thoughtof} the {man} she had just spoken to, gone to his {fate} in a destroyed world. As he now {kicked} inside her she knew what might become of him. She {hadbetter} {getstarted}. \nemptyspace ::= empty {space} | {space}\nspace ::= space | hole | corner\nmachine ::= machine | contraption\nman ::= man | being | alien\nfate ::= fate | destiny | punishment\nshimmered ::= shimmered | sparkled | wavered\ndisappeared ::= disappeared | was gone | vanished\nlooked ::= looked | glanced | stared | glared\nthoughtof ::= thought of | considered | pondered\nhadbetter ::= had better | should | needed to\ngetstarted ::= get started | begin | start\nkicked ::= kicked | spasmed | wiggled | wriggled");
}

function preloadHorror(){
    $inputDict.html("top ::= {Jones} looked for God in organised {religions}, in a {bottle}, and at {fastfoodoutlets}. He {searched} high and low until, {desperate}, he finally found her where he thought she would never be. Now God has to look for a better place to hide, or take out a restraining order.\nJones ::= Jones | Mill | William | Abraham \nreligions ::= religions | cults | parties | festivals \nbottle ::= bottle | whiskey | jug | milk bottle | forest \nfastfoodoutlets ::= fast food outlets | restaurants | schools | hospitals \nsearched ::= searched | looked | sought \ndesperate ::= desperate | lonely | desolate");
                    }
function preloadPVIntro(){
  $inputDict.html("top ::= {pvFirst} {pvDiscName}, {pvCommonName}, is {aRare}, univoltine butterfly {nativeto} {riparian} {areas} of {mature} forests in North America, {fromWItoVT}, and {southGAtoAL} (Finnell & Lehn 2007). | {aRareU} butterfly, {pvFirst} {pvDiscName} {inhabits} {riparian} {areas} of {mature} forests in eastern North America, {fromWItoVT} and {southGAtoAL}. | As {aRare} butterfly, {pvFirst} {pvDiscName} {inhabits} {mature} forests in eastern North America, often in {riparian} {areas}. Also known as {pvCommonName}, it occurs {fromWItoVT} and {southGAtoAL}.\npvFirst ::= *Pieris virginiensis*\npvDiscName ::= Edwards\npvCommonName ::= the West Virginia White butterfly\naRare ::= a rare | an uncommon\naRareU ::= A rare | An uncommon\nunivoltine ::= univoltine | single-generation\nmature ::= mature | old-growth | undisturbed | large\nfromWItoVT ::= from Wisconsin to Vermont | from as far west as Wisconsin to Vermont | from Wisconsin east to Vermont\nsouthGAtoAL ::= as far south as Georgia and Alabama | as far south as Alabama and Georgia | south to Georgia and Alabama | south to Alabama and Georgia\nnativeto ::= native to | that {inhabits} | {residing} in\ninhabits ::= inhabits | occupies | lives in | persists in\nresiding ::= residing | persisting | living\nriparian ::= riparian | wet | moist\nareas ::= areas | regions | sections");  
}
$(document).on('click', "#reset", resetForm);
$(document).on('click', '#tryit',parseMyText);
$(document).on('click', "#romance", preloadRomance);
$(document).on('click', "#helloworld",  preloadHello);
$(document).on('click', "#scifi",  preloadScifi);
$(document).on('click', "#horror",  preloadHorror);

$(document).on('click', "#pv-intro", preloadPVIntro);
$(document).on('click', "#gm-intro",  preloadHello);
$(document).on('click', "#invasives-intro",  preloadScifi);
$(document).on('click', "#mistake-egg-intro",  preloadHorror);