// This is a node script that will be run once daily to update the
// current daily quote

var Quote = require("./models/quote.js");
var mongoose = require("mongoose");

// Update the current daily quote to false
Quote.findOneAndUpdate({isDaily: true}, {isDaily: false}, function(err, quote) {
    if(err) {
        console.log("error: " + err.message);
        mongoose.disconnect();
        return;
    }
    else {
        if(quote != undefined)
            console.log(quote._id + " is no longer the daily quote");        
        // Retrieve the current quotes from the database and randomly select one
        Quote.find({}, function(err, quotes) {
            if(err) {
                console.log("error: " + err.message);
                mongoose.disconnect();
                return;
            }
            else {
                if(quotes.length > 0) {
                    // Update the isDaily flag on the randomly selected quote to true
                    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    randomQuote.isDaily = true;
                    randomQuote.save(function(err, quote) {
                        if(err) {
                            console.log("error: " + err.message);
                        }
                        else {
                            console.log(quote._id + " has been updated to daily quote");
                        }
                        mongoose.disconnect();
                        return;
                    });
                }
                else {
                    mongoose.disconnect();
                    return;
                }
            }
        });
    }
});