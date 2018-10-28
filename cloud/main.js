
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("sendMsg", async (req, res) => {
        var room = req.params.room
        var text = req.params.text

        const Room = Parse.Object.extend("Room");
        const query = new Parse.Query(Room);
        var roomObj = await query.get(room)


        const Message = Parse.Object.extend("Message")
        const msg = new Message();

        msg.set("Text", text);
        msg.set("Room", roomObj);
        msg.set("Owner", req.user);

        msg.save().then((gameScore) => {

        }, (error) => {

        });

        return "OK"
    }
);


Parse.Cloud.define("createRoom", async (req, res) => {
    if(req.user){
        var who = req.params.who
        const Room = Parse.Object.extend("Room")
        const query = new Parse.Query(Room);
        const room = new Room();

        const query2 = new Parse.Query(Parse.User);
        var toUser = await  query2.get(who)


        query.containsAll("Members", [toUser, req.user]);
        const results = await query.find();

        if(results.length > 0){

        } else {
            room.set("Members", [req.user, toUser]);
            room.save().then((croom) => {

            }, (error) => {

            });

        }

        }
        return "OK"
    }
);
