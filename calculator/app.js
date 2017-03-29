$(document).ready(function(){

	var historyNum = "";
	var numToCalc = "";
	var arrNum = [];
	var memNum  = 0;
	var res = 0;

	$('button').on('dblclick', function(){
		if($(this).attr('value') === 'mrc'){
			memNum = 0;
			generateHTMLMemoryAnswer(memNum);
		}
	});

	$('button').on('click', function(){
		
		var clcValue = $(this).attr('value');
		
		switch(clcValue){
			case "mrc":
			generateHTMLMemoryAnswer(memNum);						
			break;
			case "m-":	
				memNum -= Number(res);		
				// console.log(memNum);
			break;

			case "m+":	
				memNum += Number(res);
				// console.log(memNum);
			break;

			case "C":
				arrNum = [];
				numToCalc = "";
				historyNum = "0";
				generateHTMLAnswer("0");
				generatHTMLHistory();
				historyNum = "";
			break;

			case "=":
				arrNum.push(numToCalc);
				historyNum += clcValue;				
				calculateNumbers();
				numToCalc = "";
				arrNum = [];
				historyNum = "";
			break;

			case "/":
				arrNum.push(numToCalc);
				arrNum.push(clcValue);
				historyNum += clcValue;
				generatHTMLHistory();
				numToCalc = "";
			break;

			case "*":
				arrNum.push(numToCalc);
				arrNum.push(clcValue);
				historyNum += clcValue;
				generatHTMLHistory();
				numToCalc = "";
			break;

			case "+":
				arrNum.push(numToCalc);
				arrNum.push(clcValue);
				historyNum += clcValue;
				generatHTMLHistory();
				numToCalc = "";
			break;

			case "-":
				arrNum.push(numToCalc);
				arrNum.push(clcValue);
				historyNum += clcValue;
				generatHTMLHistory();
				numToCalc = "";
			break;

			case ".":
				numToCalc += clcValue;
				historyNum += clcValue;
				generatHTMLHistory();
			break;
			
			default:
			if((Number(clcValue) >= 0 && Number(clcValue) <= 9)){	
					if(Number(numToCalc) <= 9999999 ){		
					numToCalc += clcValue;
					historyNum += clcValue;
					generatHTMLHistory();
					generateHTMLAnswer(numToCalc);
				}else{
					alert("Only numbers less then 9999999 can be calculated!");
				}
			}
				
		} //end of switch		

	}); //End of button click event

	function calculateNumbers(){
		res = 0;
		var num1 = 0;
		var sign = "";
		arrNum.forEach(function(num){

			if(!$.isNumeric(num)){
				sign = num;
			}
			else{
				if(res === 0){
					res = num;
				}else{
					switch(sign){
						case "/":
							res =  (Number(res) / Number(num)).toFixed(2);
							res = res.replace(".00", "");
						break;						
						case "*":
							res = (Number(res) * Number(num));
							if(Number(res) >= 9.9999999){
								res = Math.round(res, 5);
							}
							res = res.toFixed(2).replace(".00", "");
							break;
						case "-":
							res = (Number(res) - Number(num)).toFixed(2);
							res = res.replace(".00", "");
							break;
						case "+":
							res = (Number(res) + Number(num)).toFixed(2);
							res = res.replace(".00", "");
							break;
					}					
				}
			}
			
		}); //end of forEach

		historyNum = historyNum + res;
		generatHTMLHistory();		
		generateHTMLAnswer(res);

		// console.log(res);

	} //end of calculateNumbers function

	function generatHTMLHistory(){
		if(historyNum.length > 25){
			historyNum = historyNum.substring(0, 25);
		}
		$(".history").find("p").remove();
		$(".history").html("<p>" + historyNum +"</p>");		
	}

	function generateHTMLAnswer(result){
		if(result.length > 15){
			result = result.substring(0, 15);
		}
		$("#answer").find("p").remove();
		$("#answer").html("<p>" + result +"</p>");
	}

	function generateHTMLMemoryAnswer(result){
		
		if(Number(result) > 0){
			if(result.length > 15){
				result = result.substring(0, 15);
			}
			$("#answer").find("p").remove();
			$("#answer").html("<p><span class='pull-left'>M</span>" + result +"</p>");
		}else{
			$("#answer").find("p").remove();
			$("#answer").html("<p>0</p>");
		}
	}

});