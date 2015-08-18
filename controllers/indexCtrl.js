apichallenge.controller('indexController', ['$scope', '$location', function($scope, $location) {
  $scope.teamSize = 3;
  
  // items not in aram
  var bannedItems = ["Overlord's Bloodmail",
                     "Enchantment: Teleport",
                     "Enchantment: Homeguard",
                     "Dervish Blade",
                     "Zz'Rot Portal",
                     "Moonflair Spellblade",
                     "Globe of Trust",
                     "Flesheater",
                     "Flesheater (Melee Only)",
                     "Rite of Ruin",
                     "Warmog's Armor",
                     "Mirage Blade",
                     "Netherstride Grimoire",
                     "Lord Van Damm's Pillager",
                     "Trickster's Glass",
                     "Puppeteer",
                     "Pox Arcana",
                     "Wooglet's Witchcap",
                     "Staff of Flowing Water",
                     "Grez's Spectral Lantern",
                     "Wriggle's Lantern",
                     "Martyr's Gambit",
                     "Odyn's Veil",
                     "Ruby Sightstone",
                     "Guardian Angel"];
  
  // filter list of items
  var filteredItems = {};
  for (var item in items.data) {
    var it = items.data[item];
    if (it.depth == undefined ||
        it.depth < 3 ||
        it.into.length > 0 ||
        (it.group && it.group.indexOf("Jungle") != -1) ||
        (it.maps && it.maps[12] == false) ||
        bannedItems.indexOf(it.name) != -1) continue;
        
     filteredItems[item] = it;
  }
  
  var listOfChamps = Object.keys(champions.data);
  
  function getChampAndItems(team, itemsArr) {
    // only 1 boots and 1 gold (at max)
    var bootsFound = false;
    var goldFound = false;
    
    // get a random champ and add it to team 2
    var rnd = Math.floor(Math.random()*listOfChamps.length);
    var champid = listOfChamps[rnd];
    listOfChamps.splice(rnd, 1);
        
    for (var j = 0; j < 6; ++j) {
      var refilter = {}
      for (var item in filteredItems) {
        var it = filteredItems[item];
        if ((it.requiredChampion && it.requiredChampion != champid) ||
            (it.group && it.group.indexOf("Boots") != -1 && bootsFound) ||
            (it.group && it.group.indexOf("Gold") != -1 && goldFound)) continue;
            
        refilter[item] = it;
      }
      
      var listOfItems = Object.keys(refilter);
      var rnditem = Math.floor(Math.random()*listOfItems.length);
      
      if (refilter[listOfItems[rnditem]].group) {
        if (refilter[listOfItems[rnditem]].group.indexOf("Boots") != -1) bootsFound = true;
        if (refilter[listOfItems[rnditem]].group.indexOf("Gold") != -1) goldFound = true;
      }
      
      itemsArr.push(listOfItems[rnditem]);
    }
    
    var champ = champions.data[champid];
    team.push(champ.key);
  };
  
  $scope.makeRandomTeams = function() {
    var team1 = [];
    var team2 = [];
    var items1 = [];
    var items2 = [];

    for (var i = 0; i < $scope.teamSize; ++i) {
      getChampAndItems(team1, items1);
    }
    
    for (var i = 0; i < $scope.teamSize; ++i) {
      getChampAndItems(team2, items2);  
    }
    
    var b64url = btoa(team1.join(",") + "," + team2.join(",") + "|" + items1.join(",") + "," + items2.join(","));
    $location.path("/game/" + b64url).replace();
  }
}]);