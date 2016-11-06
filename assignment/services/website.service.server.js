/**
 * Created by Soumya on 10/29/16.
 */
module.exports = function(app) {


    var websites =[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);



    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id.toString() === websiteId)
            {
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id.toString() === websiteId)
            {
                websites[i]=newWebsite;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id.toString() === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send(null);
    }

    function findWebsitesByUser(req, res){
        var userId = req.params.userId;
        var website = [];
        for(var i in websites){
            if(websites[i].developerId.toString() === userId)
            {
                website.push(websites[i]);
            }
        }
        res.send(website);
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.sendStatus(200);
    }


};