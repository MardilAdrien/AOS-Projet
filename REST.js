var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

	//Voir les utilisateurs
    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["user_login"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Erreur d'execution de la requête MySQL"});
            } else {
                res.json({"Error" : false, "Message" : "Succès", "Utilisateurs" : rows});
            }
        });
    });

	//Voir un utilisateur par son ID
    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Erreur d'execution de la requête MySQL"});
            } else {
                res.json({"Error" : false, "Message" : "Succès", "Utilisateurs" : rows});
            }
        });
    });

	//Ajouter un nouvel utilisateur
    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Erreur d'execution de la requête MySQL"});
            } else {
                res.json({"Error" : false, "Message" : "Utilisateur ajouté !"});
            }
        });
    });

	//Modifier le mdp d'un utilisateur
    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Erreur d'execution de la requête MySQL"});
            } else {
                res.json({"Error" : false, "Message" : "Modification du mdp pour l'email "+req.body.email});
            }
        });
    });

	//Supprimer un utilisateur
    router.delete("/users/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Erreur d'execution de la requête MySQL"});
            } else {
                res.json({"Error" : false, "Message" : "Suppression de l'utilisateur dont le mail est "+req.body.email});
            }
        });
    });
}

module.exports = REST_ROUTER;
