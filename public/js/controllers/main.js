angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('foodController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all food and show them
		// use the service to get all the food
		Food.get()
			.success(function(data) {
				$scope.food = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && $scope.formData.price != undefined) {
				$scope.loading = true;
				if(parseFloat($scope.formData.price)<0){
					alert("Please input a valid price!");
					$scope.loading = false;
					return;
				}

				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)

					// if successful creation, call our get function to get all the new food
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.food = data; // assign our new list of food
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Food.delete(id)
				// if successful creation, call our get function to get all the new food
				.success(function(data) {
					$scope.loading = false;
					$scope.food = data; // assign our new list of food
				});
		};

		$scope.totalPrice = function() {
			Food.total().success(function(data){
				$scope.total=data;
			})
		}
	}]);
