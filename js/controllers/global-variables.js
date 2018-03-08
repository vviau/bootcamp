app.controller('globalvariablesCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$location', 'globals',
            function($scope, $rootScope, $log, $tm1Ui, $location, globals) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $rootScope.defaults = {
        settingsInstance: 'dev',
        settingsCube: 'System User Settings',
        settingsMeasure: 'String'
    };
    $scope.selections = {
    };
    
    $scope.lists = {};
    $scope.values = {
        user : []
    };

    //Initialize all variables
    $scope.initializeVariables = function(){
        $tm1Ui.applicationUser("dev").then(function(data){
            $scope.values.user = data;
            globals.updateSettings($scope.values, $scope.defaults, $scope.selections, "Year", {"tm1Dimension":"Year", "tm1Alias":"Financial Year"});
            globals.updateSettings($scope.values, $scope.defaults, $scope.selections, "Version", {"tm1Dimension":"Version", "tm1Alias":"Description"});
        });   
    }

    //Initialize all variables
   // $scope.updateSettings = function (values, defaults, selections, parameter, options){
   //     globals.updateSettings(values, defaults, selections, parameter, options); 
  //  }

    $scope.globals = globals; 

    //Run Initialization
    $scope.initializeVariables();

}]);
