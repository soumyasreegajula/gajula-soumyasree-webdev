(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
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
            return null;

        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;

        }

        function createUser(username, password) {


            var newUser = {
                _id: new Date().getTime(),
                username: username,
                password: password

            };
            users.push(newUser);
            return null;


        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if(    user.username === username) {
                    return user;
                }
            }
            return null;

        }

        function updateUser(userId, user) {
            for(var u in users) {
                var us = users[u];
                if(us._id === userId) {
                    users[u] = user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if(user._id === userId) {
                    delete users[u];
                }
            }
            return null;
        }
    }
})();


