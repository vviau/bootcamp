app.controller('globalvariablesv2Ctrl',  ['$scope', '$rootScope', '$log', '$tm1Ui', '$location',function($scope, $rootScope, $log, $tm1Ui, $location) {
    /*
     *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
     *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
     *     selections.* should be used for all selections that are made by a user in the page
     *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
     * 
     *     For more information: https://github.com/cubewise-code/canvas-best-practice
     */
     
     $scope.defaults = {
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
     
     // Run once to initializa the variables using initializeVariables() and run from SUBNMs
     $scope.updateSettings = function (parameter, options) {
         //Get user settings value from Settings cube
         $tm1Ui.cellGet($scope.defaults.settingsInstance, $scope.defaults.settingsCube, $scope.values.user.Name, parameter, $scope.defaults.settingsMeasure).then(function (data) {
             var tm1Value = data.Value;
             var urlValue = $location.search()[parameter];
             var newValue = undefined;
             //Determine the new value (SUBNM, URL or TM1)
             if(options.value){
                 //if the value is coming from SUBNM
                 newValue = options.value;
             }else{
                 //if the value is coming from URL
                 if (urlValue && urlValue != tm1Value) {
                     newValue = urlValue;
                 }else{
                     newValue = tm1Value;
                 }
             }
             //Set defaults variable
             $scope.defaults[parameter] = newValue;
             //Set selections variable (if tm1Alias = tm1Alias else newValue)
             if(options.tm1Alias){
                 //Get Description alias for selections.version
                 $tm1Ui.attributeGet($scope.defaults.settingsInstance, options.tm1Dimension, newValue, options.tm1Alias).then(function (data) {
                     var aliasValue = undefined;
                     if(data.Value){
                         aliasValue = data.Value;
                     }else{
                         aliasValue = newValue;
                     }
                     $scope.selections[parameter] = aliasValue;
                 });
             }else{
                 $scope.selections[parameter] = newValue;
             }
             //Update the URL
             $location.search([parameter], newValue);
             //No need to update the TM1 settings if the new value is the same
             if(newValue != tm1Value){
                 $tm1Ui.cellPut(newValue, $scope.defaults.settingsInstance, $scope.defaults.settingsCube, $scope.values.user.Name, parameter, $scope.defaults.settingsMeasure).then(function (data) {
                 });
             }
          });
     }
 
     //Initialize all variables
     $scope.initializeVariables = function(){
         $tm1Ui.applicationUser("dev").then(function(data){
             $scope.values.user = data;
             $scope.updateSettings("Year", {"tm1Dimension":"Year", "tm1Alias":"Financial Year"});
             $scope.updateSettings("Version", {"tm1Dimension":"Version", "tm1Alias":"Description"});
         });   
     }
 
     //Run Initialization
     $scope.initializeVariables();
 
 }]);
 