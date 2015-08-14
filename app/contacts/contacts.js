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
    
    // init firebase connection
    var ref = new Firebase('https://kesher.firebaseio.com/contacts');
    
    // get contacts
    $scope.contacts = $firebaseArray(ref);
    
    // reveal the form when button with showAddForm is clicked
    $scope.showAddForm = function (){
        $scope.addFormShow = true;
    }
    
    // reveal the edit contact form when 'Edit' button is clicked
    $scope.showEditForm = function(contact){
        $scope.editFormShow = true;
        
        $scope.id               = contact.$id;
        $scope.name             = contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
        $scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.home_phone 		= contact.phones[0].home;	
        $scope.work_phone 		= contact.phones[0].work;	
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zipcode 			= contact.address[0].zipcode;
    }
    
    // hide the form when button with hide is clicked
    $scope.hide = function (){
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }
    // submit the form upon clicking the form's submit button
    $scope.addFormSubmit = function () {
        console.log('Adding your data...');
        
        // if submitted - assign a value to each variable, else assign to null
        if ($scope.name) { var name = $scope.name } else { name = null; }
		if ($scope.email) { var email = $scope.email } else { email = null; }
		if ($scope.company) { var company = $scope.company } else { company = null; }
		if ($scope.work_phone) { var work_phone = $scope.work_phone } else { work_phone = null; }
		if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone } else { mobile_phone = null; }
		if ($scope.home_phone) { var home_phone = $scope.home_phone } else { home_phone = null; }
		if ($scope.street_address) { var street_address = $scope.street_address } else { street_address = null; }
		if ($scope.city) { var city = $scope.city } else { city = null; }
		if ($scope.state) { var state = $scope.state } else { state = null; }
		if ($scope.zipcode) { var zipcode = $scope.zipcode } else { zipcode = null; }
        
        
        // Build the object being sent to firebase
        $scope.contacts.$add({
            name: name,
			email: email,
			company: company,
			phones:[
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
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
            $scope.msg = "איש הקשר נוסף. הסכיזואיזם שלך במגמת ירידה!"
        });
    }
    
    $scope.editFormSubmit = function() {
        console.log('Updating Contact...');
        
        //get ID
        var id = $scope.id;
        
        // get record 
        var record = $scope.contacts.$getRecord(id);
        
        //assign values to the record
		record.name = $scope.name;
		record.email = $scope.email; 
		record.company = $scope.company;
		record.phones[0].work = $scope.work_phone;
		record.phones[0].mobilee = $scope.mobile_phone;
		record.phones[0].home = $scope.home_phone;
		record.address[0].street = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;
        
        // Save & update the contact
        $scope.contacts.$save(record).then(function(ref) {
            console.log(ref.key);
        });
        
        // Clear the form fields
        clearFields();
        
        // Hide the editing form
        $scope.editFormShow = false;
        
        // Show success message
        $scope.msg = "איש הקשר עודכן בהצלחה!";
    }
    
    // Fetch contact entire details when user clicks contact name
   $scope.showContact = function(contact){
		console.log('Getting Contact...');

		$scope.name             = contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
        $scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.home_phone 		= contact.phones[0].home;	
        $scope.work_phone 		= contact.phones[0].work;	
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zipcode 			= contact.address[0].zipcode;

		$scope.contactShow = true;
	}
    
   // Remove contact when the 'Delete' button next to it is clicked
   $scope.removeContact = function(contact) {
       console.log('Removing Contact');
       
       $scope.contacts.$remove(contact);
       
       $scope.msg = '...איש הקשר נמחק. חבל, יא סכיזואידית';
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
		$scope.zipcode = ""
    }
}]);