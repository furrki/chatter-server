class Room extends Parse.Object {
    constructor() {
        super("Room")
    }
}

Parse.Object.registerSubclass('Room', Room);
module.exports = Room
