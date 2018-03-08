app.controller('globalvariablespage2Ctrl',  ['$scope', '$rootScope', '$log', '$tm1Ui', '$location',function($scope, $rootScope, $log, $tm1Ui, $location) {
    /*
     *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
     *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
     *     selections.* should be used for all selections that are made by a user in the page
     *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
     * 
     *     For more information: https://github.com/cubewise-code/canvas-best-practice
     */
     
     $scope.defaults = {
         settingsCube : 'System User Settings'
     };
     $scope.selections = {
         year : ''
     };
     $scope.lists = {};
     $scope.values = {
         user : []
     };
 
     $scope.urlVsTM1Settings = function (chosenElement) {
         $tm1Ui.cellGet('dev', 'System User Settings', $scope.values.user.Name, chosenElement, 'String').then(function (data) {
             tm1Value = data.Value;
             switch (chosenElement) {
                 case "Year":
                     urlValue = $location.search().year;
                     if (urlValue && urlValue != tm1Value) {
                         $scope.setYear(urlValue);
                     }else{
                         $scope.setYear(tm1Value);
                     }
                     break;
                 case "Version":
                     urlValue = $location.search().version;
                     if (urlValue && urlValue != tm1Value) {
                         $scope.setVersion(urlValue);
                     }else{
                         $scope.setVersion(tm1Value);
                     }
                     break;
             }
             $scope.countVariableInitialized++;
             $scope.values.pageIsReady = true;
         });
     }
 
     //Save Settings into TM1
     $scope.saveTM1Settings = function (selectedFilter, chosenElement) {
         $tm1Ui.cellPut(selectedFilter, 'dev', 'System User Settings', $scope.values.user.Name, chosenElement, 'String').then(function (data) {
             $tm1Ui.dataRefresh();
         });
     }
 
     //Initialize all variables
     $scope.initializeVariables = function(){
        $scope.countVariableInitialized=0;
         $scope.values.pageIsReady = false;
         $tm1Ui.applicationUser("dev").then(function(data){
             $scope.values.user = data;
             $scope.urlVsTM1Settings("Year");
             $scope.urlVsTM1Settings("Version");
         });   
     }
     
     //Set Year variable
     $scope.setYear = function (value) {
         urlValue = $location.search().year;
         //Set defaults
         $scope.defaults.year = value;
         //Set Selections
         $scope.selections.year = value;
         //Update the URL
         if (urlValue != value) {
             $location.search("year", value);
         }
         //Update TM1 Settings
         $scope.saveTM1Settings(value, "Year");
     };
 
     //Set Version variable
     $scope.setVersion = function (value) {
         urlValue = $location.search().version;
         //Set defaults
         $scope.defaults.version = value;
         //Get Description alias for selections.version
         $tm1Ui.attributeGet('dev', 'Version', value, 'Description').then(function (data) {
             $scope.selections.version = data.Value;
         });
         //Update the URL
         if (urlValue != value) {
             $location.search("version", value);
         }
         //Update TM1 Settings
         $scope.saveTM1Settings(value, "Version");
     };
 
     $scope.initializeVariables();
 
 }]);
 