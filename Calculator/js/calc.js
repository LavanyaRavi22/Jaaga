var inputVal = document.querySelectorAll('.press');
var renderHTML = document.querySelector('.displayResult');
var renderExp = document.querySelector('.displayExpression');
console.log(inputVal);

var expression = [];
var count = 0;

inputVal.forEach(function(el){
	el.addEventListener("click",function() {
		value = el.value;
		evaluateValue(value);
		if(value === "AC" || value === "CE")
		{
			renderHTML.innerHTML = "0";
		}
		else
		{
			renderHTML.innerHTML = value;
		}
		
	});
});

function evaluateValue(input) {
	var length = expression.length;
	var prevVal;
 	if(input === "AC")
 	{
 		expression = [];
 	}
 	else if(input === "CE")
 	{
 		prevVal = expression[length-1];
 		if( (prevVal === "+" || prevVal === "-" || prevVal === "*" || prevVal === "/") && expression.length!=0)
 		{
 			expression.pop();
 		}
 		else {
 			while((prevVal !== "+" && prevVal !== "-" && prevVal !== "*" && prevVal !== "/") && expression.length!=0)
 			{
 				expression.pop();
 				prevVal = expression[expression.length-1];
 			}
 		}
 	}
 	else if(input === "=")
 	{
 		let result = expression.reduce(function(evaluate,element){
 			if(isNaN(Number(element)) && element != ".")
 			{
 				evaluate = String(eval(evaluate));
 				evaluate += element;
 			}
 			else
 			{
 				evaluate += element;
 			}
 			return evaluate;
 		},'');
 		result = eval(result);
 		expression = [];
 		expression.push(result);
 		console.log(result);
 		// var renderHTML = document.getElementById('displayResult');
 		// renderHTML.innerHTML = result;
 	}
	else
	 {
	 	if((input === "+" || input === "-" || input === "*" || input === "/"))
	 	{
	 		if(expression.length!=0)
	 		{
		 		prevVal = expression[length-1];
		 		if(prevVal !== "+" && prevVal !== "-" && prevVal !== "*" && prevVal !== "/")
		 		{
		 			expression.push(input);
		 		}
		 	}
	 	}
	 	else
	 	{
	 		if(expression.length === 1 && (typeof expression[0] === "number"))
	 		{
	 			expression = [];
	 			expression.push(input);
	 		}
	 		else
	 		{
	 			expression.push(input);
	 		}
	 	}
	 }
	 renderExp.innerHTML = (expression.join(''));
	 console.log(expression);
}


