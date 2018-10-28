class Message extends Parse.Object {
    constructor() {
        super("Message")
    }
    getDate(){
        return get("createdAt")
    }

}

Parse.Object.registerSubclass('Message', Message);
module.exports = Message
