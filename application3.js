$(document).ready(function(){
    var number = function(){return Math.floor(100*Math.random());};
    var guesses = [];
	var high = [];
	var low = [];
	var triesLeft = 5;
	var num = number();
	var myVal = null;
	console.log(num);

	var newStart =  function(){
		triesLeft-=1;
	    $("#high").hide();
    	$("#low").hide();
    	$("#repeat").hide();
    	$("#invalid").hide();
    	$("#redhot").hide();
    	$("#hot").hide();
    	$("#warm").hide();
    	$("#cold").hide();
    	$("#icecold").hide();
    	$("#status").html("<strong>You have " + triesLeft + " guesses left!!</strong>");
	}

	var hideEverything =  function(){
		 $("#high").hide();
    	$("#low").hide();
    	$("#repeat").hide();
    	$("#invalid").hide();
    	$("#redhot").hide();
    	$("#hot").hide();
    	$("#warm").hide();
    	$("#cold").hide();
    	$("#icecold").hide();
    	$("#status").hide();
    	$("#correct").hide();
    	$("#answer").hide();
    	$("#last").hide();
    	$("#done").hide();
	}

	var checkIfAlreadyWon =  function(){
		for (var i=0; i<guesses.length; i++){
    			if(guesses[i]==num){
    				return alert("You've already won! Why not click the \"Start New Game\" button and work on your psychic skills some more?");
    			}
    	}
	}

	var checkIfTooManyGuesses = function(){
		if (guesses.length>5){
	    	$("#last").hide();
	    	return alert("You've already made 5 guesses. GAME OVER! Why not click the \"Start New Game\" button and work on your psychic skills some more?");
	    }	
	}

	var checkIsGuessARepeat = function(){
		for (var i=0; i<guesses.length; i++){
    			if(guesses[i]==myVal){
    				$("#repeat").show();
    			}
    		}
	}

	var checkIsGuessValid = function(){
		if ((isNaN(myVal)===true) || (myVal >100) || (myVal<1)){
    		$("#invalid").show();
    		triesLeft++;	
    	} else {
    		guesses.push(myVal);
    		if (triesLeft>1){
    			$("#status").html("<strong>You have " + triesLeft + " guesses left!!</strong>");
    		} else {
    			$("#status").html("<strong>You have " + triesLeft + " guess left!!</strong>");
    		}
    	}
	}

	var checkIsGuessCorrect =  function(){
		if (myVal==num) {
				hideEverything();
				$("#correct").show().html("Correct!! The number was " + num + ". Your psychic skills are impressive!!");
				$(".jumbotron").css("background-color","rgba(192, 253, 255, 0.509804)");
				return alert("You've got some psychic skills! Why not sign up for our FREE Psychic Development Class or click the \"Start New Game\" button and work on your psychic skills some more?");
			}
	}

	var checkIsGuessLastOneAndIncorrect = function(){
		if((guesses.length==5) && (myVal!==num)){
	    	hideEverything();
	    	$("#last").show();
	    	$(".jumbotron").css("background-color","rgba(255, 192, 192, 0.509804)");
	    	alert("GAME OVER! \nWhy not click the \"Start New Game\" button and work on your psychic skills some more?");	
	    }
	}

	var checkIsGuessValidAndIncorrect = function(){
		if (myVal>num && myVal<100){
				$("#high").show();
				high.push(myVal);
				high.sort(function(a, b){return a-b});
				$("#highguesses").show().html("<strong>High guesses: </strong>" + high);
			} else if (myVal<num && myVal>0){
				$("#low").show();
				low.push(myVal);
				low.sort(function(a, b){return a-b});
				$("#lowguesses").show().html("<strong>Low guesses: </strong>" + low);
			} 
	}

	var checkIsGuessHotterOrColder =  function(){
			if(Math.abs(num-myVal)<=5){
				$("#redhot").show();
			} else if(Math.abs(num-myVal)<=10) {
				$("#hot").show();
			} else if(Math.abs(num-myVal)<=15) {
				$("#warm").show();
			} else if (Math.abs(num-myVal)<=25) {
				$("#cold").show();
			} else {
				$("#icecold").show();
			}
	}

	var guessIsEntered =  function(){
		myVal = $("#input").val();
		if ( typeof(myVal)=="string" ) {
			myVal=parseInt( myVal );	
		}
		document.getElementById("input").value = "";
 	   newStart();
 	   checkIfAlreadyWon();
	   checkIfTooManyGuesses();
	   checkIsGuessARepeat();
	   checkIsGuessValid();
	   checkIsGuessCorrect();
	   checkIsGuessLastOneAndIncorrect();
	   checkIsGuessValidAndIncorrect();
	   checkIsGuessHotterOrColder();	
	}

	
	$("#guess").on("click", function(){
 	   	guessIsEntered();
	});

	$('#input').bind('keypress', function(e) {
		if(e.keyCode==13){
			guessIsEntered();
	   	}
	});

	$("#hint").on("click", function(){
		$("#answer").show().html("Try number " + num + ".");
	});

	$("#new").on("click", function(){
		num = number();
		console.log(num);
		triesLeft=5;
		hideEverything();
		$("#highguesses").hide();
		$("#lowguesses").hide();
    	$("#input").val();
    	$(".jumbotron").css("background-color","#eee");
    	guesses = [];
		high = [];
		low = [];
		$("#status").html("<strong>You have " + triesLeft + " guesses left!!</strong>");

   });

});










