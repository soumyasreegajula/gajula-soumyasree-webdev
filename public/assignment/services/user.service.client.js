(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function deleteUser(userId) {
            var url = "/api/user/"+ userId;
            return $http.delete(url);
        }

        function updateUser(userId,newUser) {
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

        function createUser(newUser){
            return $http.post("/api/user",newUser);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

    }

})();