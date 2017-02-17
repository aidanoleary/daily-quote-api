var express = require("express");
var router = express.Router();
var Quote = require("./models/quote.js");


router.get("/quotes", function(req, res){
    Quote.find({}, function(err,quotes) {
        if(err) {
            res.status(500).json({status: "error", data: null, message: err.message});
        }
        else {
            res.status(200).json({status: "success", data: quotes, message: null});
        }
    });
        
});

router.post("/quotes", function(req, res) {
    if(req.body.quote && req.body.author) {
        var newQuote = new Quote(req.body);
        newQuote.save(function(err, quote) {
            if(err)
                res.status(500).json({status: "error", data: null, message: error.message});
            else
                res.status(200).json({status: "success", data: quote, message: null});
        });
    }
    else {
        res.send({status: "error", data: null, message: "quote and author not entered"});
    }
});

router.get("/quotes/:id", function(req, res) {
    Quote.find({_id: req.params.id}, function(err, quote) {
        if(err)
            res.status(500).json({status: "error", data: null, message: err.message})
        else {
            if(quote.length > 0) {
                res.status(200).json({status: "success", data: quote, message: null});
            }
            else {
                res.status(401).json({status: "error", data: quote, message: "resource not found"});
            }
        }
    });
});

router.put("/quotes/:id", function(req,res) {
    Quote.findOne({_id: req.params.id}, function(err, quote) {
        if(err)
            res.status(500).json({status: "error", data: null, message: err.message});
        else {
            if(req.body.quote)
                quote.quote = req.body.quote;
            if(req.body.author)
                quote.author = req.body.author;
            if(req.body.isDaily)
                quote.isDaily = req.body.isDaily;

            quote.save(function(err) {
                if(err) {
                    jsonErrorMessage(err, res);
                }
                else {
                    res.status(200).json({status: "success", data: quote, message: null});
                }
            });
        }
    });
});

router.delete("/quotes/:id", function(req,res) {
    Quote.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err)
            jsonErrorMessage();
        else
            res.status(200).json({status: "success", data: null, message: "The quote" + req.params.id + " has been deleted"});
    })
});

router.get("/daily-quote", function(req, res) {
    // Get the value for the daily quote
    Quote.findOne({isDaily: "true"}, function(err, quote) {
        if(err)
            jsonErrorMessage();
        else 
            res.status(200).json({status: "success", data: quote, message: null});
    });
});

function jsonErrorMessage(err, res) {
    res.status(500).json({status: "error", data: null, message: err.message});
}

module.exports = router;