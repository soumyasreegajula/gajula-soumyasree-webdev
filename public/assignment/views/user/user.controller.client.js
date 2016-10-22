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
            var user = UserService.findUserByCredentials(username, password);
            console.log(user);
            if(user === null) {
                vm.error = "No such user";
            } else {

                $location.url("/user/" + user._id);


            }
        }
    }



    function RegisterController($location,UserService) {
        var vm = this;

        vm.register = register;

        function register (username, password, password2) {
            if (password===password2) {
                UserService
                    .createUser(username, password);

                var user=UserService.findUserByUsername(username);
                $location.url("/user/" + user._id);
            }
        }

    }



    function ProfileController($routeParams, UserService,$location) {



        var vm = this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        vm.userId = $routeParams['uid'];


        function init() {
            vm.user = UserService.findUserById(vm.userId);
            return vm.user._id;

        }
        init();
        function updateUser(user){
            UserService.updateUser(vm.userId,user);
            $location.url("/user/" + user._id);

        }
        function deleteUser(){
            UserService.deleteUser(vm.userId);


        }


    }
})();
