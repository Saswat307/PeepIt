angular.module('starter.controllers', []).run(function ($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function () {
    $http.get('http://chirp-saswat.azurewebsites.net/auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
})


  .controller('DashCtrl', function ($scope, $http,$timeout, $rootScope) {
    console.log("Inside Controller ");

    $http.get("http://chirp-saswat.azurewebsites.net/api/posts")
      .success(function (response) {
        console.log("success ");
        $scope.posts = response;

      });

    $scope.newPost = {created_by: '', text: '', created_at: ''};

    $scope.doRefresh = function () {

      $timeout( function() {
        //simulate async response

        $http.get("http://chirp-saswat.azurewebsites.net/api/posts")
          .success(function (response) {
            $scope.posts = response;

          });

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);




    }
    $scope.post = function () {
      console.log("Inside Post method ")
      $scope.newPost.created_by = $rootScope.current_user;

      $scope.newPost.created_at = Date.now();

      console.log("before save " + $rootScope.current_user);

      $http.post("http://chirp-saswat.azurewebsites.net/api/posts", $scope.newPost)
        .success(function (response) {

          console.log("success created a new post " + response);

        });

      $http.get("http://chirp-saswat.azurewebsites.net/api/posts")
        .success(function (response) {
          $scope.posts = response;

        });


      $scope.newPost = {created_by: '', text: '', created_at: ''};
    };

    console.log("After service call " + $scope.posts);

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  }).
  controller('AccountCtrl', function ($scope) {

  })


  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('loginCtrl', function ($scope, $http, $rootScope, $location, $ionicLoading) {

    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    $scope.login = function () {

      console.log("inside login");
      $ionicLoading.show({

        template: 'Logging In...'
      })

      $http.post('http://chirp-saswat.azurewebsites.net/auth/login', $scope.user).success(function (data) {

        if (data.state == 'success') {
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $scope.user = {username: '', password: ''};
          $ionicLoading.hide();
          $location.path('/tab/account');
        }
        else {
          $ionicLoading.hide();
          $scope.user = {username: '', password: ''};
          $scope.error_message = data.message;
        }
      });


    };
  })

  .controller('signupCtrl', function ($scope, $http, $rootScope, $location, $ionicLoading) {

    $scope.user = {name: '', email: '', username: '', password: ''};
    $scope.error_message = '';

    $scope.register = function () {
      console.log("Entered to register");
      $ionicLoading.show({
        template: 'Signing In...'
      })
      $http.post('http://chirp-saswat.azurewebsites.net/auth/signup', $scope.user).success(function (data) {

        if (data.state == 'success') {
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $scope.user = {username: '', password: ''};
          $ionicLoading.hide();
          $location.path('/tab/account');
        }
        else {
          $ionicLoading.hide();
          $scope.user = {name: '', email: '', username: '', password: ''};
          $scope.error_message = data.message;
        }
      });
    };

  })
  .controller('profileCtrl', function ($scope, $http, $rootScope, $ionicLoading) {

    $ionicLoading.show({
      template: 'loading...'
    })

    $scope.user = {name: '', email: '', username: '', password: ''};

    $http.get('http://chirp-saswat.azurewebsites.net/api/profile/' + $rootScope.current_user)
      .success(function (data) {

        $scope.user = data;
        $ionicLoading.hide();

      })


  })
  .controller('postsCtrl', function ($scope, $http, $rootScope, $ionicLoading) {

    console.log("Entered to Post ctrl");

    $ionicLoading.show({
      template: 'loading...'
    })
    $http.get('http://chirp-saswat.azurewebsites.net/api/profile/posts/' + $rootScope.current_user)
      .success(function (data) {

        $scope.posts = data;
        $ionicLoading.hide();

      })


  });
