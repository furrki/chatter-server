class User {
    constructor(objectId) {
        if(objectId != ""){
            this.objectId = objectId
            this.fetchUser(objectId)
        }
        this.startingLiras = 100
    }
    async fetchUser(objectId){
        var UserQ = Parse.Object.extend("User");
        var query = new Parse.Query(UserQ);
        var self = this
         await query.get(this.objectId)
        .then((user) => {
            self.object = user
        }, (error) => {
            console.log(error)
        });
    }

    async register(username, password, email){
        var user = new Parse.User();
        console.log(username, password, email)
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);

        var treasure = []
        const cur = Parse.Object.extend("Currency");
        var query = new Parse.Query(cur);
        var results = await query.find();
        for (let i = 0; i < results.length; i++) {
            var object = results[i];
            treasure.push([object.name, this.startingLiras * parseInt(object.get("Sell"))])
        }
        user.set("Treasure", treasure);
        user.set("Lira", 5);

         query = new Parse.Query(Parse.Object.extend("Nation"));
         results = await query.find();
        user.set("Nation", results[~~(results.length * Math.random())]);
        try {
            user.signUp();
        } catch (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    }

    getUsername() {
        return this.object.get("username");
    }
    getAvatar() {
        return this.object.get("Avatar");
    }


}

module.exports = User
