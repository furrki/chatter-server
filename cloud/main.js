
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("buyCurrency",
    async (req, res) => {
        if(req.user){
            var buyName = req.params.buyName
            var sellName = req.params.sellName
            var buyAmount = req.params.buyAmount


            var user = new User(req.user.id)
            await user.fetchUser()

            var economy = new Economy()
            await economy.loadCurrencies()

            var valueToBuy = buyAmount * economy.getCurrency(buyName).get("Sell")

            var balance = user.getCurrency(sellName) * economy.getCurrency(sellName).get("Buy")
            var left = balance - valueToBuy
            if(left > 0){
                newCurrency = left / economy.getCurrency(sellName).get("Buy")
                var delta = newCurrency - user.getCurrency(sellName)
                await user.addCurrency(sellName, delta)
                await user.addCurrency(buyName, buyAmount)
                //console.log(user.pocket.get("Treasure"))
            }
        }
        return (req.user)
    }
);
