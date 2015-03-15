var test_task = function() {
	
	var credentials = '426cd6eb80f06113d3605e237cd8e76f';
	var authToken;
	var accountName = 'oleg';
	var accountId = '208064f16b0a1aa4791028dfd572ef97';
	
	var getAccountsDescendants = function(authToken) {
		
		return $.ajax({
			type: 'GET',
			url: 'http://dev.qualivoip.nl:8000/v1/accounts/' + accountId + '/descendants?auth_token=' + authToken
		}).pipe(function(data) {
			return data.data;
		});
	};
	
	var getAuthToken = function() {
		
		var deferred;
		
		if (authToken !== undefined) {
			deferred = $.Deferred();
			deferred.resolve(authToken);
		} else {
			deferred = $.ajax({
				type: 'PUT',
				url: 'http://dev.qualivoip.nl:8000/v1/user_auth',
				contentType: 'application/json',
				data: JSON.stringify({
					data: {
						credentials: credentials,
						account_name: accountName
					}
				})
			}).pipe(function(data) {
				authToken = data.auth_token;
				return data.auth_token;
			});
		}
		
		return deferred.promise();
	};
	
	var handleInit = function() {
		
		$('#amount-of-users-button').live('click', function () {
			getAuthToken().pipe(getAccountsDescendants).done(function(accounts) {
				$('#ws-content').empty().append('<h3>Amount of users on the platform: ' + accounts.length + 1 '<h3>');
			})
		});
	};

	return {
		init: function() {
			handleInit();
		}
	};
}();