apichallenge.controller('resultController', ['$scope','$stateParams', function($scope, $stateParams) {                 
  function getChampionByKey(key) {
    for (var champ in champions.data) {
      if (champions.data[champ].key == key) return champions.data[champ];
    }
  }
  
  var idinfo = atob($stateParams.id).split("|");
  var champids = idinfo[0].split(",");
  var itemsids = idinfo[1].split(",");
 
  var teamsize = champids.length/2;
  $scope.team1 = [];
  $scope.team2 = [];
  
  $scope.stringTeamSize = function() {
    return ["one", "two", "three", "four", "five"][teamsize-1];
  }
  
  var i = 0;
  
  for (; i < teamsize; ++i) {
    var theChamp = getChampionByKey(champids[i]);
    theChamp.items = [];
    for (var j = 0; j < 6; ++j) {
      theChamp.items.push(items.data[itemsids[i*6 + j]]);
    }
    $scope.team1.push(theChamp);
  }
  
  for (; i < teamsize*2; ++i) {
    var theChamp = getChampionByKey(champids[i]);
    theChamp.items = [];
    for (var j = 0; j < 6; ++j) {
      theChamp.items.push(items.data[itemsids[i*6 + j]]);
    }
    $scope.team2.push(theChamp);
  }  
    
  $scope.getNewChamp = function(team, id) {
      var listOfChamps = Object.keys(champions.data);
      
      var changeTeamIds = [];
      angular.forEach(team, function(value, key){
        changeTeamIds.push(value.key);
      })
      
      // get a random champ and add it to the team
      var rnd = Math.floor(Math.random()*listOfChamps.length);
      var champid = listOfChamps[rnd];
      while (changeTeamIds.indexOf(champid) != -1) {
        rnd = Math.floor(Math.random()*listOfChamps.length);
        champid = listOfChamps[rnd];     
      }
      var champ = champions.data[champid];
      champ.items = $scope[team][id].items;
      $scope[team][id] = champ;
      
      var team1ids = [];
      var team2ids = []
      angular.forEach($scope.team1, function(value, key){
        team1ids.push(value.key);
      });
      angular.forEach($scope.team2, function(value, key){
        team2ids.push(value.key);          
      });
      console.log(team1ids);
      window.history.pushState('newurl', 'New url', '#/game/' + btoa(team1ids.join(",") + "," + team2ids.join(",") + "|" + itemsids));
      makeShort();
  }
  
  $('.wpopup').popup({
    title   : 'Popup Title',
    content : 'Hello I am a popup'
  });
  
  $(".parallaxdiv").parallax({imageSrc: 'http://lolstatic-a.akamaihd.net/site/bilgewater/1d0e96db6bd69523cf508365e1042f93171e3deb/img/act-2/act-2-world-layer-background.jpg'});
  makeShort();
}]);