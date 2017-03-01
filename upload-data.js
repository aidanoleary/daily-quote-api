var fs = require("fs");
var mongoose = require("mongoose");
var endOfLine = require('os').EOL;

var dbString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(dbString);

var Quote = require("./models/quote.js");

// Remove the existing quotes
Quote.remove({}, function(err) {
    if(err) {
        dealWithError(err);
        return;
    }
    console.log("Records successfully removed.");
    
    // Read the quotes json file line by line and upload each quote.
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream('quotes.jl')
    });

    lineReader.on('line', function(line) {
        var currentQuote = new Quote(JSON.parse(line));
        currentQuote.save(function(err, newQuote) {
            if(err) {
                console.log("Error with: " + JSON.stringify(currentQuote));
                console.log(err.message);
                return;
            }

            console.log("Added: " + JSON.stringify(currentQuote));
        });
    });

    lineReader.on('close', function() {
        mongoose.disconnect();
    });

});

function dealWithError(err) {
    console.log("Error: ", err.message);
    mongoose.disconnect();
}