app.controller('reportdrivenbyexcelCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$location', 
            function($scope, $rootScope, $log, $tm1Ui, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {
        settingsCube: 'System Report Settings',
        settingsCubeDimReport: 'Report',
        settingsCubeDimReportSettingsP: 'System Report Settings Parameters',
        settingsCubeDimReportSettingsM: 'System Report Settings M',
        report: 'Report 1',
        settingsReportStructure1: 'Table 1',
        settingsReportMeasure: 'String'
    };
    $scope.selections = {
        report: $scope.defaults.settingsCubeDimReport
    };
    $scope.lists = {};
    $scope.values = {
        urlReport: $scope.defaults.report
    };

    //Update URL for report
    if($location.search().report){
		$scope.values.urlReport = $location.search().report;
    }
    $scope.setReport = function(report){
		$scope.values.urlReport = report;
		if(report != $scope.defaults.report){
			// Set the URL parameter
			$location.search("report", report);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("report", null);
		}
	};
    
}]);
