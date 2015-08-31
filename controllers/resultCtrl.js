apichallenge.controller('resultController', ['$scope','$stateParams', function($scope, $stateParams) {
  // returns a champion given its key
  function getChampionByKey(key) {
    for (var champ in champions.data) {
      if (champions.data[champ].key == key) return champions.data[champ];
    }
  }

  // get the info from the url
  var idinfo = atob($stateParams.id).split("|");
  var champids = idinfo[0].split(",");
  var itemsids = idinfo[1].split(",");

  var teamsize = champids.length/2;
  $scope.team1 = [];
  $scope.team2 = [];

  // returns 1=>one, 2=>two, etc
  $scope.stringTeamSize = function() {
    return ["one", "two", "three", "four", "five"][teamsize-1];
  }

  var i = 0;

  // attach the items to the champ objects
  for (; i < teamsize; ++i) {
    var theChamp = getChampionByKey(champids[i]);
    theChamp.items = [];
    for (var j = 0; j < 6; ++j) {
      var theItem = items.data[itemsids[i*6+j]];
      theItem.key = itemsids[i*6+j];
      theChamp.items.push(theItem);
    }
    $scope.team1.push(theChamp);
  }

  for (; i < teamsize*2; ++i) {
    var theChamp = getChampionByKey(champids[i]);
    theChamp.items = [];
    for (var j = 0; j < 6; ++j) {
      var theItem = items.data[itemsids[i*6+j]];
      theItem.key = itemsids[i*6+j];
      theChamp.items.push(theItem);
    }
    $scope.team2.push(theChamp);
  }

  // gets a new champ (in case they dont have it)
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

      // change url and shorten again
      window.history.pushState('newurl', 'New url', '#/game/' + btoa(team1ids.join(",") + "," + team2ids.join(",") + "|" + itemsids));
      makeShort();
  }

  // creates the link to download the item set
  $scope.createLink = function(team, id) {
    var itemBlocks = [];
    var champItems = team[id].items;
    var coolwords = ["Use this to win","Rito please", "Trust me its good","The URB God","Demaaacia!!","Pls nerf"];
    coolwords = shuffleArray(coolwords);

    var blocknameIndex = -1;
    angular.forEach($scope[team][id].items, function(value, key){
      ++blocknameIndex;
      var blockname = coolwords[blocknameIndex];

      if(value.group && value.group.indexOf("Boots") != -1){
        blockname = "Boots";
      }

      var itemsfrom = [];
      var finalitem = {
        "id": value.key,
        "count": 1
      }

      itemsfrom.push(finalitem);

      angular.forEach(value.from, function(value, key){
        var itemfrom = {
          "id": value,
          "count": 1
        }

        itemsfrom.unshift(itemfrom);
      });

      var block = {
        "type": blockname,
        "recMath": true,
        "minSummonerLevel": -1,
        "maxSummonerLevel": -1,
        "showIfSummonerSpell": "",
        "hideIfSummonerSpell": "",
        "items": itemsfrom
      }

      blockname = "URB!!!!";
      if(value.group && value.group.indexOf("Boots") != -1){
        itemBlocks.unshift(block);
      } else {
        itemBlocks.push(block);
      }
    });

    var itemset = {
      "title": "URB Item set",
      "type": "custom",
      "map": "any",
      "mode": "ARAM",
      "priority": true,
      "sortrank": 0,
      "blocks": itemBlocks
    }

    return "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(itemset));
  }

  $('.wpopup').popup({
    title   : 'Popup Title',
    content : 'Hello I am a popup'
  });

  $(".parallaxdiv").parallax({imageSrc: 'http://lolstatic-a.akamaihd.net/site/bilgewater/1d0e96db6bd69523cf508365e1042f93171e3deb/img/act-2/act-2-world-layer-background.jpg'});
  makeShort();

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
}]);
