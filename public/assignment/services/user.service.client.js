(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {username: 'alice', password: 'ewq', _id: "123", first: 'Alice', last: 'Wonderland'},
            {username: 'bob', password: 'ewq', _id: "234", first: 'Bob', last: 'Dylan'},
            {username: 'charlie', password: 'ewq', _id: "345", first: 'Charlie', last: 'Brown'}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function findUserById(userId) {
            for(var u in users) {
                var user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }

        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }

        }

        function createUser(username, password) {


            var newUser = {
                _id: new Date().getTime(),
                username: username,
                password: password

            };
            users.push(newUser);


        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if(    user.username === username) {
                    return user;
                }
            }

        }

        function updateUser(userId, user) {
            for(var u in users) {
                var us = users[u];
                if(us._id === userId) {
                    us = user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if(user._id === userId) {
                    users.splice(user, 1);
                }
            }
            return null;
        }
    }
})();


