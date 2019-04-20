var apiKEY = "DKRPC95NJWxklwdqA0mArh2qoOuZRjAx"
var search = ""; var rating = $("#Ratings").val();
var limit = 10; var offset = 0;
// var queryURL = ("https://api.giphy.com/v1/gifs/search?api_key=" + apiKEY + "&q=" + search + "+&limit=" + limit + "&offset=" + offset + "&rating=G&lang=en")
var intTopics = ["Cats", "Dogs", "Birds", "Celebrities", "Archer", "Rick and Morty", "The Simpsons",]
console.log(rating)
function makeButtons() {
    $("#topics").empty()
    for (var i = 0; i < intTopics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("Topic" + " btn" + " btn-info" + " m-1" + " ps-3");
        newButton.text(intTopics[i]);
        // newButton.attr("id", intTopics[i]);
        newButton.val(intTopics[i]);
        newButton.attr("counter", 0)
        $("#topics").append(newButton);
    }
}
makeButtons();
$("#add-topic").on("click", function (event) {
    event.preventDefault()
    if ($("#topic-input").val() != "") {
        intTopics.push($("#topic-input").val().trim())
        makeButtons()
    }
    $("#topic-input").val("")
})

$(document.body).on("click", ".Topic", function () {
    search = $(this).val(); offset = $(this).attr("counter");
    rating = $("#Ratings").val()
    console.log($(this).attr("counter"))
    var queryURL = ("https://api.giphy.com/v1/gifs/search?api_key=" + apiKEY + "&q=" + search + "+&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&lang=en")

    console.log(search)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data

        for (var i = 0; i < limit; i++) {

            var newGIF = $("<span>")
            newGIF.addClass("col-sm-4" + " card")
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating); p.addClass("card-text")

            var title = results[i].title;
            var Title = $("<h5>").text("Title: " + title); Title.addClass("card-header");
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_width.url);
            gifImage.addClass("Gif")
            gifImage.attr("data-animate", results[i].images.fixed_width.url)
            gifImage.attr("data-state", "animate")
            gifImage.attr("data-still", results[i].images.fixed_width_still.url)
            newGIF.prepend(gifImage); newGIF.prepend(p); newGIF.prepend(Title);
            $("#results").prepend(newGIF);
        }

    })
    offset = (parseInt(offset) + parseInt(limit))
    $(this).attr("counter", offset)
})

$(document.body).on("click", ".Gif", function () {
    var state = $(this).attr("data-state")
    if (state === "still") {
        $(this).attr("src", ($(this).attr("data-animate")))
        $(this).attr("data-state", "animate")
    }
    if (state === "animate") {
        $(this).attr("src", ($(this).attr("data-still")))
        $(this).attr("data-state", "still")
    }
})