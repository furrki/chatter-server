class User extends Parse.User {
    constructor() {
        super()
    }
    register(username, password, email){
        this.set("username", username);
        this.set("password", password);
        this.set("email", email);
        try {
            this.signUp();
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    }
    login(username, pass){
        super.login(username, pass)
    }

}

Parse.User.registerSubclass('User', User);
module.exports = User
