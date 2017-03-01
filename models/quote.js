var mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017');

var QuoteScheme = mongoose.Schema( {
    text: String,
    author: String,
    tags: [String],
    isDaily: {
        type: Boolean,
        default: false
    }
});

var Quote = mongoose.model("Quote", QuoteScheme);

module.exports = Quote;