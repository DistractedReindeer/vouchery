/*
*	Client API
*/
var baseUrl = 'http://localhost:4568'

//login
var login = function(callback) {
	$.ajax({
		type: "GET",
		url: baseURL + '/auth/facebook/'
	}).done(function(data){
		console.log(data);
	})
};

var getStoredToken = function() {

	var token = "some token";
	return token;
}

//fetch my links(needs token)
var getMyLinks = function(callback) {

	var token = getStoredToken();

	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/myLinks',
			headers: {
			       "id":"10155398167390012"
			   }
		}).done(function(data){
			console.log(data);
			return data;
		});		
	}

};

//fetch friends links(needs token)
var getFriendsLinks = function(callback) {	
	//TODO check whether token exist


	var token = getStoredToken();

	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/friendsLinks',
			headers: {
			       "id":"10206432467109292"
			   }
		}).done(function(data){
			return data;
		});		
	}
};

//post links(needs token)
var postLink = function(link, id) {
	//TODO check whether token exist
	var token = getStoredToken();

	if(token) {
		$.ajax({
			type: 'POST',
			url: baseURL + '/api/links/newLink',
			dataType: 'JSON',
			data: {
				link: link,
				//userId can be from the token?
				fbID: "10155398167390012"

			}
		}).done(function(data){
			console.log(data);
			return "Link Posted"
		});
	}
}