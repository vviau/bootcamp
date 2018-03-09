(function(){
	/*
	 * This script gets loaded after app.js
	 * */
	
    // START: Your Custom Codes Settings
	
	// accounting.js global format
	// http://openexchangerates.github.io/accounting.js/#methods
	accounting.settings.currency.symbol = '';
	accounting.settings.currency.format = {pos:'%v', neg:'(%v)', zero:'-'};
	accounting.settings.currency.precision = 0;
	accounting.settings.number.precision = 0;
	
	// END: Your Custom Codes Settings
	

	//START DIRECTIVE appTodoTm1
	(function(){
		var app = angular.module('app');
		app.directive('appTodoTm1', ['$log', '$ngBootbox', '$tm1Ui', function($log, $ngBootbox, $tm1Ui){
		  return {
			templateUrl: 'html/app-todo.html',
			scope:{
			  tm1Instance: '@'
			},
			link:function($scope, $elements, $attributes, directiveCtrl, transclude){
			  $scope.lists = {};
			  $scope.constants = {};
			  $scope.directiveOptions = {};
			  
			  // Variable(s)
			  $scope.lists.todos = [];
			  $scope.directiveOptions.useTM1 = true;
			  $scope.constants.TODO_DIMENSION = 'My Todo List';
	  
			  // Utilities
			  $scope.addNote = function(){
				$ngBootbox.prompt('TODO:').then(
				  function(result) {
					if(_.isEmpty(result)){
					  $ngBootbox.alert('Pfft.. Nothing to do.').then(function() {});
					}
					else{
					  if($scope.directiveOptions.useTM1){
						$tm1Ui.processExecute($scope.tm1Instance, 'Bedrock.Dim.Element.Create', 'pDimension', $scope.constants.TODO_DIMENSION, 'pElement', result,'pElementType', 'N').then(function(createStatus){
						  $scope.refreshElements();
						});
					  }
					  else{
						$scope.lists.todos.push({note:result, isDone: false});
					  }                
					}          
				  }
				);
			  };
	  
			  $scope.deleteNote = function(index, note){
				$tm1Ui.processExecute($scope.tm1Instance, 'Bedrock.Dim.Element.Delete', 'pDimension', $scope.constants.TODO_DIMENSION, 'pElement', note).then(function(elementDeleteStatus){
				  if(elementDeleteStatus.success){
					$scope.refreshElements();
				  }
				  else{
					$log.error(elementDeleteStatus);
				  }
				});
			  };
	  
			  $scope.refreshElements = _.debounce(function(){
				$tm1Ui.dimensionElements($scope.tm1Instance, $scope.constants.TODO_DIMENSION, {elementsOnly: true}).then(function(elements){
				  if(elements){
					$scope.lists.todos.length = 0;
					_.forEach(elements, function(elementObj){
					  $scope.lists.todos.push({note: elementObj.Name});
					});
				  }
				});
			  }, 100);
	  
			  // finally, initialize data of directive if pulling from TM1
			  if($scope.directiveOptions.useTM1){          
				$tm1Ui.dimensions($scope.tm1Instance, {dimensionFilter: $scope.constants.TODO_DIMENSION}).then(function(dimensions){
				  if(_.isEmpty(dimensions)){
					$tm1Ui.processExecute($scope.tm1Instance, 'Bedrock.Dim.Create', 'pDimension', $scope.constants.TODO_DIMENSION).then(function(createDimensionStatus){
					  if(createDimensionStatus.success){
						$scope.refreshElements();
					  }
					  else{
						$log.error(createDimensionStatus);
					  }
					});
				  }
				  else{
					$scope.refreshElements();
				  }
				});
			  }
	  
			}
		  };
		}]);
	  })();
	//END DIRECTIVE appTodoTm1


	
	  
	  
	  
})();


//START DIRECTIVE displayAttributes
(function(){
	var app = angular.module('app');
	app.directive('displayAttributes', ['$log', '$ngBootbox', '$tm1Ui', '$timeout', function($log, $ngBootbox, $tm1Ui, $timeout){
	  return {
		templateUrl: 'html/display-attributes.html',
		scope:{
		  tm1Instance: '@',
		  tm1Dimension: '@',
		  tm1Element: '@',
		  tm1Alias: '@',
		  panelClass: '@'
		},
		link:function($scope, $elements, $attributes, directiveCtrl, transclude){
			//START CONTROLLER
				$scope.defaults = {
					tm1Instance: $scope.tm1Instance,
					tm1Dimension: $scope.tm1Dimension,
					tm1DimensionAttribute: "}ElementAttributes_"+$scope.tm1Dimension,
					tm1Element: $scope.tm1Element,
					tm1Alias: $scope.tm1Alias,
					panelClass: $scope.panelClass
				};
			

			
			//END CONTROLLER
		}
	  };
	}]);
  })();
//END DIRECTIVE displayAttributes