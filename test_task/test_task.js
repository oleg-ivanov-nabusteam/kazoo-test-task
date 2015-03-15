var test_task = function() {
	
	var credentials = '426cd6eb80f06113d3605e237cd8e76f';
	var accountName = 'oleg';
	var accountId = '208064f16b0a1aa4791028dfd572ef97';
	
	var outputAmountOfUsers = function(amountOfUsers){
		
		$('#ws-content').empty().append('<h2>Amount of users on the platform: ' + amountOfUsers + '<h2>');
	};
	
	var getAmountOfUsersOnThePlatform = function(authToken, callback) {
		$.ajax({
			type: 'GET',
			url: 'http://dev.qualivoip.nl:8000/v1/accounts/' + accountId + '/descendants?auth_token=' + authToken,
			success: function(data) {
				callback(data.data.length);
			}
		});
	};
	
	var getAuthToken = function(callback) {
	
		$.ajax({
			type: 'PUT',
			url: 'http://dev.qualivoip.nl:8000/v1/user_auth',
			contentType: 'application/json',
			data: JSON.stringify({
				data: {
					credentials: credentials,
					account_name: accountName
				}
			}),
			success: function(data) {
				callback(data.auth_token);
			}
		});
	};

	var handleGettingAmountOfUsersOnThePlatform = function() {
		
		$('#amount-of-users-button').live('click', function () {
			getAuthToken(function(authToken) {
				getAmountOfUsersOnThePlatform(authToken, function(amountOfUsers) {
					outputAmountOfUsers(amountOfUsers);
				});
			});
		});
	};

	return {
		init: function() {
			handleGettingAmountOfUsersOnThePlatform();
		}
	};
}();