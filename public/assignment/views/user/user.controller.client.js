/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService.findUserByCredentials(username,password)
                .then(function (response) {
                    var user = response.data;
                    console.log(user);
                    if(user){
                        console.log(user);
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });

        }
    }



    function RegisterController($location,UserService) {
        var vm = this;

        vm.register = register;
        var userid=(new Date()).getTime();

        function register (username, password, password2) {
            console.log("inside reguster");
            if(username == null || password == null || password2 == null ||
                username == "" || password == "" || password2 == ""){
                vm.error = "Username and Password cannot be blank";
            } else if(password !== password2) {
                vm.error = "Password did not match";
            } else {
                UserService.findUserByUsername(username)
                    .then(function (response) {
                        var prevUser = response.data;
                        if(prevUser){
                            vm.error = "Username already Exists";
                        } else {
                            var user = {
                                _id: userid,
                                username: username,
                                password: password,
                                firstName: "",
                                lastName: ""
                            };
                            UserService.createUser(user)

                                .then(function () {
                                    console.log("inside create user");
                                    $location.url("/user/"+userid);
                                });
                        }
                    });
            }
        }
    }





    function ProfileController($routeParams, UserService,$location) {



        var vm = this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        vm.userId = $routeParams['uid'];


        function init() {
            UserService.findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        function updateUser(user){
            UserService.updateUser(vm.userId, user)
                .then(
                    function(response) {
                        vm.success = "Updated the user details successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user details"
                    }
                );

        }
        function deleteUser(){
            UserService
                .deleteUser(vm.userId)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );


        }


    }
})();
