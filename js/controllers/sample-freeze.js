app.controller('samplefreezeCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', function($scope, $rootScope, $log, $tm1Ui) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {};
    $scope.values = {};

    $scope.q1=["Jan","Feb","Mar"];
    $scope.q2=["Apr","May","Jun"];
    $scope.q3=["Jul","Aug","Sep"];
    $scope.q4=["Oct","Nov","Dec"];
    
    $scope.lists = {accounts: []};

    $scope.filter = function(value){
  
      if($scope.options.filter && $scope.options.filter != ""){
        $scope.options.filterlower= $scope.options.filter.toLowerCase();
        if(value["Description"].toLowerCase().indexOf($scope.options.filterlower) == -1){
          return false;
        }
      }
  
      return true;
    };

    $scope.table = $tm1Ui.tableCreate($scope, $scope.lists.accounts, {pageSize: 30, preload: false, filter: $scope.filter});
  
    fixedTable = function(el) {
          var $body, $header, $sidebar;
          $body = $(el).find('.fixedTable-body');
          $sidebar = $(el).find('.fixedTable-sidebar table');
          $header = $(el).find('.fixedTable-header table');
          return $($body).scroll(function() {
              $($sidebar).css('margin-top', -$($body).scrollTop());
              return $($header).css('margin-left', -$($body).scrollLeft());
          });
      };
  
      tablescroll = new fixedTable($('#tablescroll'));
  
    $scope.firstPage = function(){
      var recordsPerPage = $scope.table._pageSize;
      $scope.table = $tm1Ui.tableCreate($scope, $scope.lists.accounts, {index: 0, pageSize: recordsPerPage, preload: false, filter: $scope.filter});
    };
  
    $scope.lastPage = function(){
      var totalRecords = $scope.table._pages;
      var recordsPerPage = $scope.table._pageSize;
      var newIndex = Math.floor(totalRecords - recordsPerPage);
      $scope.table = $tm1Ui.tableCreate($scope, $scope.lists.accounts, {index: newIndex, pageSize: recordsPerPage, preload: false, filter: $scope.filter});
    };
  
  }]);
