app.controller("listController", function($scope,$http,$mdDialog) {
    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');
      
        $mdDialog.show(confirm).then(function () {
          $scope.status = 'You decided to get rid of your debt.';
        }, function () {
          $scope.status = 'You decided to keep your debt.';
        });
      };
      
      $scope.showAdvanced = function (ev,pokemon) {
        $mdDialog.show({
          controller: $scope => {
            $scope.pokemon = pokemon
            $scope.hide = function () {
              $mdDialog.hide();
            };
        
            $scope.cancel = function () {
              $mdDialog.cancel();
            };
        
            $scope.answer = function (answer) {
              $mdDialog.hide(answer);
            };
          },
          templateUrl: 'components/list-pokemon/showPokemonModal/showPokemonModal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (answer) {
         $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
      };
      
      
      
      
      $scope.showPrerenderedDialog = function (ev) {
        $mdDialog.show({
          contentElement: '#myDialog',
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application to prevent interaction outside of dialog
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        });
      };
      
      function DialogController($scope, $mdDialog) {
        $scope.pokemon = $scope.pokemon_
        $scope.hide = function () {
          $mdDialog.hide();
        };
      
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
      
        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
      }
})
