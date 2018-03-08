app.controller('angularjsCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$tm1Ui', '$stateParams', '$http', '$ngBootbox', '$location',
function($scope, $rootScope, $interval, $timeout, $tm1Ui, $stateParams, $http, $ngBootbox, $location) {

// variables

$scope.defaults = {
    Region: 'Total Europe',
    Year: '2012',
    Currency: 'local',
    Version: 'Actual'
};

$scope.selections = {
    Region: $scope.defaults.Region,
    Year: $scope.defaults.Year,
    Currency: $scope.defaults.Currency,
    Version: $scope.defaults.Version
};

$scope.options = {
    pageLeftlocation:'html/samples/sample-advance-chart.left.html',
    pageRightlocation:'html/samples/sample-advance-chart.right.html',
    type1Charts:
                [
                {name:'Bar', type:'discreteBar'},
                {name:'Pie', type:'pie'},
                {name:'Donut', type:'donut'},
                {name:'Line', type:'line'}
                ]
    };

    $scope.chart = {
        margin:{
            top: 10,
            right: 10,
            bottom: 45,
            left: 100
        }
    };

    // ###############
    // Update Year parameter
    if ($location.search().year) {
        $scope.selections.year = $location.search().year;
    }

    $scope.setYear = function (year) {
        $scope.selections.Year = year;

        if (year != $scope.defaults.Year) {
            // Set the URL parameter
            $location.search("year", year);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("year", null);
            //  $scope.selections.departmentAlias = department;
        }
    };

    // ###############
    // setStyle

    $scope.setTitleStyle = function (value) {
        $scope.options.changeStyle =!  $scope.options.changeStyle;
        if (value) {
            // Set the URL parameter
            $scope.options.titleStyle = {
                "color" : "black",
                "font-size" : "60px",
            }
        }
        else {
            $scope.options.titleStyle = {
                "color" : "blue",
                "font-size" : "30px",
            }
        }
    };


}]);
