angular.module('starter.services', [])

  .factory('Peeps',function($http){


    function handleSuccess( response ) {
      peeps=response;
      console.log("peeps "+peeps);
      return( peeps);
    }

    var peeps;
    return{
      all: function(){
        console.log("inside service  ");
       /* $http.get("http://localhost:8888/api/posts")
          .success(function(response)
          {

            peeps = response;
            console.log("success "+peeps);
            console.log("return ");
            return peeps;
          });*/


        var request = $http({
          method: 'get',
          url:"http://localhost:8888/api/posts"
        });
        return (request.then(handleSuccess));
      }
    } ;

    /*function getFriends() {
      var request = $http({
        method: "get",
        url: "api/index.cfm",
        params: {
          action: "get"
        }
      });
      return( request.then( handleSuccess, handleError ) );
    */

  })
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
