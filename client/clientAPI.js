/*
*	Client API
*/
var baseURL = 'http://localhost:4568';

//login
var login = function(callback) {
	// $.ajax({
	// 	type: "GET",
	// 	url: baseURL + '/auth/facebook/'
	// }).done(function(data){
	// 	console.log(data);
	// })

	window.localStorage.setItem( 'vouchery', 'CAAWqaDAd9VABAMoG0Aqd62jjLVsieJMZBxLJtZAKO8PexxVjpLuoKc5CEv3W2zucbGvYEkH93ZAxvYc7R923f5ZBcHfxnGunneoMXZBMrTnANusgl9ZCnmYqJHff9N1imiABGZBXuyDh7pBFAZCtjFVZBDNjmVARqjnJPZB5EcxVgLqCEuHpZCLWgv2ewIRTcNa8hTsZBADzREbR9nn7lIR8ignF');

};

var id;
var name; 

var getStoredToken = function() {

	id = "10206432467109292";
	name = "Darren Wong";
	return window.localStorage.getItem('vouchery');
}

var logout = function() {
	id = '';
	name = '';
};

//fetch my links(needs token)
var getMyLinks = function(id) {

	var token = getStoredToken();

	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/myLinks',
			headers: {
			       "id":id
			   }
		}).done(function(data){


			return data;
		});		
	}

};

//fetch friends links(needs token)
var getFriendsLinks = function(id) {	
	//TODO check whether token exist


	var token = getStoredToken();

	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/friendsLinks',
			headers: {
			       "id":id
			   }
		}).done(function(data){
			console.log(data);
			return data;
			//should return ["www.munchery.com/323jkj4",
		    //				  "www.uber.com/3oi4u38"]
		});		
	}
};

//post links(needs token)
var postLink = function(link, id) {
	//TODO check whether token exist
	var token = getStoredToken();

	if(token) {
		console.log("sent");
		$.ajax({
			type: 'POST',
			url: baseURL + '/api/links/newLink',
			dataType: 'JSON',
			headers: {
				"access_token":"aCAAWqaDAd9VABAMoG0Aqd62jjLVsiCAAWqaDAd9VABAMoG0Aqd62jjLVsieJMZBxLJtZAKO8PexxVjpLuoKc5CEv3W2zucbGvYEkH93ZAxvYc7R923f5ZBcHfxnGunneoMXZBMrTnANusgl9ZCnmYqJHff9N1imiABGZBXuyDh7pBFAZCtjFVZBDNjmVARqjnJPZB5EcxVgLqCEuHpZCLWgv2ewIRTcNa8hTsZBADzREbR9nn7lIR8ignFeJMZBxLJtZAKO8PexxVjpLuoKc5CEv3W2zucbGvYEkH93ZAxvYc7R923f5ZBcHfxnGunneoMXZBMrTnANusgl9ZCnmYqJHff9N1imiABGZBXuyDh7pBFAZCtjFVZBDNjmVARqjnJPZB5EcxVgLqCEuHpZCLWgv2ewIRTcNa8hTsZBADzREbR9nn7lIR8ignF",
				"Access-Control-Allow-Headers ": " access_token",
				"Access-Control-Allow-Origin": "*"
			},
			data: {
				link: link
			}
		}).done(function(data){
			console.log(data);
			return "Link Posted"
		});
	}
}