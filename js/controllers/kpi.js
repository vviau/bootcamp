app.controller('kpiCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$location', function($scope, $rootScope, $log, $tm1Ui, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {
        showRightSelections : 'false',
        accountLevel1 :'Net Sales',
        accountLevel2 : 'Gross Sales',
        region: 'Total Europe',
        category: 'All Category',
        measure: 'Amount M',
        year: '2016',
        period: 'Year'
    };
    $scope.selections = {
        showRightSelections : $scope.defaults.showRightSelections, 
        accountLevel1 : $scope.defaults.accountLevel1,
        accountLevel2 : $scope.defaults.accountLevel2,
        region : $scope.defaults.region,
        category : $scope.defaults.category,
        measure : $scope.defaults.measure,
        year : $scope.defaults.year,
        period : $scope.defaults.period
    };
    $scope.lists = {
        versions: [
            {'id':'Actual', 'class':'value-actual', 'alias':''},
            {'id':'Budget', 'class':'value-budget', 'alias':'Bud'},
            {'id':'Last Year', 'class':'value-prev', 'alias':'PCP'}
                ],
        versionsPercent: [
            {'id':'Var %', 'class':'value-actual', 'alias':''},
            {'id':'LY %', 'class':'value-budget', 'alias':'Bud'},
            {'id':'LY %', 'class':'value-prev', 'alias':'PCP'}
                ]
    };
    $scope.values = {
        urlYear : $scope.defaults.year,
        urlPeriod : $scope.defaults.period
     };

    // ###############
     // Update Region parameter
     if($location.search().region){
        $scope.selections.region = $location.search().region;
    }
    $scope.setRegion = function(region){
        $scope.selections.region = region;
        if(region != $scope.defaults.region){
            // Set the URL parameter
            $location.search("region", region);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("region", null);
        }
    };
     // ###############
     // Update Category parameter
     if($location.search().category){
        $scope.selections.category = $location.search().category;
    }
    $scope.setCategory = function(category){
        $scope.selections.category = category;
        if(category != $scope.defaults.category){
            // Set the URL parameter
            $location.search("category", category);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("category", null);
        }
        //Update Measure
        $scope.setMeasure(category);
    };
      // ###############
     // Update Measure parameter
     if($location.search().measure){
        $scope.selections.measure = $location.search().measure;
    }
    $scope.setMeasure = function(element){
        if(element == 'All Category'){
            $scope.selections.measure = 'Amount M';
        }else
        {
            $scope.selections.measure = 'Amount';
        }
        if($scope.selections.measure != $scope.defaults.measure){
            // Set the URL parameter
            $location.search("measure", $scope.selections.measure);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("measure", null);
        }
    };
     
    // ###############
     // Update Year parameter
     if($location.search().year){
        $scope.values.urlYear = $location.search().year;
    }
    $scope.setYear = function(year){
        $scope.values.urlYear = year;
        if(year != $scope.defaults.year){
            // Set the URL parameter
            $location.search("year", year);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("year", null);
        }
    };
    // ###############
     // Update Period parameter
     if($location.search().period){
        $scope.values.urlPeriod = $location.search().period;
    }
    $scope.setPeriod = function(period){
        $scope.values.urlPeriod = period;
        if(period != $scope.defaults.period){
            // Set the URL parameter
            $location.search("period", period);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("period", null);
        }
    };
    // ###############
    // Update Region parameter
    if($location.search().showRightSelections){
        $scope.selections.showRightSelections = $location.search().showRightSelections;
    }
    $scope.setShowRightSelections = function(showRightSelections){
        $scope.selections.showRightSelections = showRightSelections;
            // Set the URL parameter
        if(showRightSelections != $scope.defaults.showRightSelections){
            // Set the URL parameter
            $location.search("showRightSelections", showRightSelections);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("showRightSelections", null);
        }
    };

}]);
