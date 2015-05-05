/*
*	Client API
*/


//login
var login = function(callback) {
	$.ajax({
		type: "GET",
		url: 'http://localhost:4568/auth/facebook/'
	}).done(function(data){
		console.log(data);
	})
};

//fetch my links(needs token)


//fetch friends links(needs token)


//post links(needs token)
