class Economy {

    constructor() {
        this.loadCurrencies()
        this.loadBanks()
    }
    async loadCurrencies(){
        var query = new Parse.Query(Parse.Object.extend("Currency"));
        var results = await query.find();
        this.currencies = []

        for (let i = 0; i < results.length; i++) {
            var currency = results[i];
            this.currencies.push(currency)
        }
    }
    getCurrency(name){
        for (let i = 0; i < this.currencies.length; i++) {
            var currency = this.currencies[i];
            if(currency.get("Name") == name)
                return this.currencies[i]
        }
        return null
    }
    async loadBanks(){
        var query = new Parse.Query(Parse.Object.extend("Bank"));
        var results = await query.find();
        this.banks = []

        for (let i = 0; i < results.length; i++) {
            var currency = results[i];
            this.banks.push(currency)
        }
    }

}


module.exports = Economy
