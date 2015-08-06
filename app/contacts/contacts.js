'use strict';

angular.module('kesher.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  });
}])

// contacts controller
.controller('contactsCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    
    // init firebase
    var ref = new Firebase('https://kesher.firebaseio.com/contacts');
    
    // get contacts
    $scope.contacts = $firebaseArray(ref);
    
    // reveal the form when button with showAddForm is clicked
    $scope.showAddForm = function (){
        $scope.addFormShow = true;
    }
    // hide the form when button with hide is clicked
    $scope.hide = function (){
        $scope.addFormShow = false;
    }
    // submit the form upon clicking the form's submit button
    $scope.addFormSubmit = function () {
        console.log('Adding your data...');
        
        // if submitted - assign values to variables, else assign to null
        if ($scope.name) { var name = $scope.name } else { name = null; }
		if ($scope.email) { var email = $scope.email } else { email = null; }
		if ($scope.company) { var company = $scope.company } else { company = null; }
		if ($scope.work_phone) { var work_phone = $scope.work_phone } else { work_phone = null; }
		if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone } else { mobile_phone = null; }
		if ($scope.home_phone) { var home_phone = $scope.home_phone } else { home_phone = null; }
		if ($scope.street_address) { var street_address = $scope.street_address } else { street_address = null; }
		if ($scope.city) { var city = $scope.city } else { city = null; }
		if ($scope.state) { var state = $scope.state } else { state = null; }
		if ($scope.zip) { var zip = $scope.zip } else { zip = null; }
        
        // Build the object being sent to firebase
        $scope.contacts.$add({
            name: name,
            email: email,
            company: company,
            phone: [
                {
                    mobile: mobile_phone,
                    home: home_phone,
                    work: work_phone
                }
            ],
            address: [
                {
                    stree_address: street_address,
                    city: city,
                    state: state,
                    zipcode: zip
                }
            ]
        }).then(function(ref){
            var id = ref.key();
            console.log('Added contact with ID: '+id);
            
            // clear the form fields after form submission
            clearFields();
            
            // hide the form
            $scope.addFormShow = false;
            
            // Show message to user
            $scope.msg = "איש הקשר נוסף! רמת הסכיזואיזם שלך במגמת ירידה"
        });
    }
    
    // Clear all form fields by asigning scopes to an empty string
    function clearFields() {
        console.log('Clearing all fields...');
        $scope.name = '';
        $scope.email = ""; 
		$scope.company = "";
		$scope.work_phone = "";
		$scope.mobile_phone = "";
		$scope.home_phone = "";
		$scope.street_address = "";
		$scope.city = "";
		$scope.state = "";
		$scope.zip = ""
    }
}]);