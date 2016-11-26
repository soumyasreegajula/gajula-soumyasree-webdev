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

                    if(user){

                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });

        }

        vm.register = function() {
            $location.url("/register");
        }
    }



    function RegisterController($location,UserService) {
        var vm = this;

        vm.register = register;



        function register (username, password, password2) {

            if(username == null || password == null || password2 == null ||
                username == "" || password == "" || password2 == ""){
                vm.error = "Username and Password must be entered";

            } else if(password !== password2) {
                vm.error = "Password must match";

            } else {
                UserService.findUserByUsername(username)
                    .then(function (response) {
                        var prevUser = response.data;
                        if(prevUser){
                            vm.error = "Username already Exists";


                        } else {
                            var user = {

                                username: username,
                                password: password

                            };

                            UserService.createUser(user)

                                .then(function (response) {

                                    var usr = response.data;

                                    $location.url("/user/"+usr._id);
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
            UserService
                .findUserById(vm.userId )
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        vm.deleteUser = deleteUser;

        function deleteUser() {
            UserService
                .deleteUser(vm.userId )
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser(updatedUser) {
            vm.error = null;
            vm.success = null;
            if(updatedUser.username === "" || updatedUser.username == null){
                vm.error = "All details must be entered";
            } else {
                UserService
                    .updateUser(vm.userId , vm.user)
                    .then(
                        function (response) {
                            vm.success = "Updated successfully";
                        },
                        function (error) {
                            vm.error = "Unable to update user"
                        }
                    );
            }
        }


    }
})();
