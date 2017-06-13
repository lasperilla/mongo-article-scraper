// Requiring our Comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Routes
// =============================================================
module.exports = function(app) {

    // A GET request to scrape the article website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("https://www.theverge.com/photography", function(error, response, html) {
            if (error) {
                console.log(error)
            }
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $(".c-entry-box__title").each(function(i, element) {

                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                var entry = new Article(result);
                console.log(entry)

                // Now, save that entry to the db
                entry.save(function(err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        console.log(doc);
                    }
                });

            });
        });
        // Tell the browser that we finished scraping the text
        res.redirect("/");
    });

    // Create a new comment or replace an existing comment
    app.post("/articles/:id", function(req, res) {
        // Create a new comment and pass the req.body to the entry
        var newComment = new Comment(req.body);

        // And save the new comment the db
        newComment.save(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                // Use the article id to find and update it's comment
                db.Article.findOneAndUpdate({ "_id": req.params.id }, { "comment": doc._id })
                    // Execute the above query
                    .exec(function(err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        } else {
                            // Or send the document to the browser
                            res.send(doc);
                        }
                    });
            }
        });
    });
};
