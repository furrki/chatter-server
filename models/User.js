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
        .then(async (user) => {
            self.object = user


            var query2 = new Parse.Query(Parse.Object.extend("Pocket"));
            query2.include("User")
            var results2 = await  query2.find();
            this.pocket = results2[0]

        }, (error) => {
            console.log(error)
        });
    }

    async register(username, password, email, req){
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);


        query = new Parse.Query(Parse.Object.extend("Nation"));
        results = await query.find();
        user.set("Nation", results[~~(results.length * Math.random())]);


        var treasure = []
        const cur = Parse.Object.extend("Currency");
        var query = new Parse.Query(cur);
        var results = await query.find();
        for (let i = 0; i < results.length; i++) {
            var object = results[i];
            treasure.push([object.get("Name"), this.startingLiras * parseInt(object.get("Sell"))])
        }

        const pocket2 = Parse.Object.extend("Pocket");
        const pocket = new pocket2();

        pocket.set("Treasure", treasure);
        pocket.set("Lira", 5);
        pocket.set("Owner", user);
        await pocket.save().then((thePocket) => {
            console.log('New object created with objectId: ' + thePocket.id);
            this.object = user
            try {
                user.signUp();
                this.pocket = thePocket
            } catch (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        }, (error) => {
            console.log('Failed to create new object, with error code: ' + error.message);
        });

    }
    async addCurrency(curName, value){
        await this.fetchUser();
        var treasure = this.pocket.get("Treasure")
        var index = -1
        for(var i in treasure){
            if(treasure[i][0] == curName){
                index = i
            }
        }
        if(index != -1){
            treasure[index][1] = parseInt(treasure[index][1]) + parseInt(value)
        } else {
            treasure.push([curName, value])
        }

        this.pocket.set("Treasure", treasure)
        this.pocket.save()
    }
    getUsername() {
        return this.object.get("username");
    }
    getAvatar() {
        return this.object.get("Avatar");
    }


}

module.exports = User
