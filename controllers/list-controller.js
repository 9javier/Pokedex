
app.controller("listController", function($scope,$http,$mdDialog) {
$scope.textSearch ="";
$scope.dataSource = [];
$scope.pageSize = 5;
$scope.currentPage = 1;
$scope.pokemonInfo ='';


  $scope.showAdvanced = function (ev,pokemon) {
    console.log(pokemon)
    $mdDialog.show({
      controller: $scope => {
        $scope.pokemon = pokemon;
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

    }, function () {
    });
  };
  

this.$onInit = function() {
$scope.getAllPokemon(); 

};


$scope.getAllPokemon = function (){
  $http({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=200'
  }).then(function successCallback(data) {
    var result = data;

    result.data.results.map(pokemon =>{
      $scope.getPokemonByName(pokemon.name);
    })
    console.log($scope.dataSource)
    }, function errorCallback(response) {
      console.log(response)
    });  
}

$scope.getPokemonByName =  function(name){
  if(name){
    $http({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/'+name
    }).then(function successCallback(response) {
      var img = response.data.sprites.front_shiny;
      var name = response.data.name;
      const pokemon = {
        name,
        img
      }
      $scope.dataSource.push(pokemon)
      }, function errorCallback(response) {
        console.log(response)
      });
  }
 
    
}

$scope.openModal = function(ev,pokemon){
  if(pokemon.name){
    $http({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/'+pokemon.name
    }).then(function successCallback(response) {
      $scope.showAdvanced(ev,response.data)
      }, function errorCallback(response) {
        console.log(response)
      });
  }
  
}
});
