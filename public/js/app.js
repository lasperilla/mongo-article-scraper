 alert("hi")

// // Whenever someone clicks a p tag
// $(document).on("click", function() {
//   alert("hi")
//   // // Save the id from the p tag
//   // var thisId = $(this).attr("data-id");
//   // // Empty the comments from the comment section
//   // $("#comment-"+thisId+"\"").empty();

//   // // Now make an ajax call for the Article
//   // $.ajax({
//   //   method: "GET",
//   //   url: "/articles/" + thisId
//   // })
//   //   // With that done, add the comment information to the page
//   //   .done(function(data) {
//   //     console.log(data);
//   //     // The title of the article
//   //     $("#comment-"+thisId+"\"").append("<h2>" + data.title + "</h2>");
//   //     // An input to enter a new title
//   //     $("#comment-"+thisId+"\"").append("<input id='titleinput' name='title' >");
//   //     // A textarea to add a new comment body
//   //     $("#comment-"+thisId+"\"").append("<textarea id='bodyinput' name='body'></textarea>");
//   //     // A button to submit a new comment, with the id of the article saved to it
//   //     $("#comment-"+thisId+"\"").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

//   //     // If there's a comment in the article
//   //     if (data.comment) {
//   //       // Place the title of the comment in the title input
//   //       $("#titleinput").val(data.comment.title);
//   //       // Place the body of the comment in the body textarea
//   //       $("#bodyinput").val(data.comment.body);
//   //     }
//   //   });
// });

// // When you click the savecomment button
// $(document).on("click", "#savecomment", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the comment, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from comment textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the comments section
//       $("#comments").empty();
//     });

//   // Also, remove the values entered in the input and textarea for comment entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
