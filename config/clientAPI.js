/*
*	Client API
*/
var baseURL = 'http://localhost:4568';

var login = function(token) {
	window.localStorage.setItem( 'vouchery', token);
};

var logout = function() {
	window.localStorage.setItem( 'vouchery', '');
};

var getStoredToken = function() {
	return window.localStorage.getItem('vouchery');
}

var getMyLinks = function(callback) {
	var token = getStoredToken();
	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/myLinks'+'?access_token=' + token 
		}).done(function(data){
			callback(data);
		});		
	}
};

var getFriendsLinks = function(callback) {	

	var token = getStoredToken();
	if(token) {
		$.ajax({
			type: 'GET',
			url: baseURL + '/api/links/friendsLinks'+'?access_token=' + token 
		}).done(function(data){
			callback(data);
		});		
	}
};

var postLink = function(link, callback) {
	var token = getStoredToken();
	if(token) {
		$.ajax({
			type: 'POST',
			url: baseURL + '/api/links/newLink'+'?access_token=' + token ,
			dataType: 'JSON',
			data: {
				link: link
			}
		}).done(function(data){
			callback(data);
		});
	}
}
