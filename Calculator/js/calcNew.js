(function() {
	var inputVal = document.querySelectorAll('.press');
	var renderHTML = document.querySelector('.displayResult');
	var expression = [];
	var count = 0;

	inputVal.forEach(function(el){
		el.addEventListener("click",function() {
			value = el.value;
			let prev;
			expression = Module.evaluateValue(value,expression);
			if(value === "AC" || value === "CE")
			{
				renderHTML.innerHTML = "0";
				prev = value;
			}
			else if(value === ".")
			{
				var str = renderHTML.innerHTML;
				if(str.charAt(str.length-1) !== ".")
					renderHTML.innerHTML += value;
			}
			else if(value !== "=")
			{
				if(expression.length===1 && (renderHTML.innerHTML === " 0 ") || (renderHTML.innerHTML === "0"))
					renderHTML.innerHTML = value;
				else if(expression.length!==1 && !isNaN(value) && !isNaN(expression[expression.length-1]))// || value === ".")
					renderHTML.innerHTML += value;		
				else
					renderHTML.innerHTML = value;
			}	
		});
	});
})();

var Module = (function() {

	var evaluateValue = function(input,expression) {
		
		let length = expression.length;
		var renderHTML = document.querySelector('.displayResult');
		var renderExp = document.querySelector('.displayExpression');
	
		if(input === "AC")
			expression = [];
		else if (input === "CE")
			evaluateCE(expression);
		else if(input === "=")
		{
			expression = evaluateExpression(expression);
		}
		else
			expression = pushValue(input,expression);

		console.log(expression);
	 	renderExp.innerHTML = (expression.join(''));
		return expression;
	}

	var evaluateCE = function(expression) {
		let prevVal = expression[expression.length-1];
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

	var evaluateExpression = function(expression) {

		var render = document.querySelector('.displayResult');
		if(isNaN(expression[expression.length-1]))
		{
			expression.pop();
		}
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
 		result = eval(expression.join(''));
 	    render.innerHTML = result;
 		expression = [];
 		expression.push(result);
 		
 		return expression;
	}

	var pushValue = function(input,expression) {
		let prevVal;
		if((input === "+" || input === "-" || input === "*" || input === "/" || input === "."))
	 	{
	 		prevVal = expression[expression.length-1];
	 		if(expression.length!=0 && input!==".")
	 		{
		 		if(prevVal === "+" || prevVal === "-" || prevVal === "*" || prevVal === "/")
		 			expression.pop();	
		 		expression.push(input);
		 	}
		 	else if (input===".")
		 	{
		 		if(prevVal !== ".")
		 			expression.push(input);	
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
	 	return expression;
	}

	return {
		evaluateValue : evaluateValue
	}

})();



