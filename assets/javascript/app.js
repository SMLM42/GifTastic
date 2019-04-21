var apiKEY = "DKRPC95NJWxklwdqA0mArh2qoOuZRjAx"
var search = ""; var rating = $("#Ratings").val();
var limit = 10; var offset = 0; var results = true;
// var queryURL = ("https://api.giphy.com/v1/gifs/search?api_key=" + apiKEY + "&q=" + search + "+&limit=" + limit + "&offset=" + offset + "&rating=G&lang=en")
var intTopics = ["Cats", "Dogs", "Birds", "Celebrities", "Archer", "Rick and Morty", "The Simpsons",]
console.log(rating)
$("#Results").hide()
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
    console.log(results)
    if (results === false) {
        results = true;
        $("#Favorites").show(); $("#Results").hide()
        $("#results").empty();
        $("#results").html(saveState)
        console.log("b")
    }
    search = $(this).val().trim(); offset = $(this).attr("counter");
    rating = $("#Ratings").val()
    console.log($(this).attr("counter"))
    var queryURL = ("https://api.giphy.com/v1/gifs/search?api_key=" + apiKEY + "&q=" + search + "+&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&lang=en")
    search = search.split(' ').join('')
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
            var p = $("<p>").text("Rating: " + rating); p.addClass("card-text"); p.attr("id", (search + i + "p"))
            var favi = $("<button>").text("Favorite");
            favi.addClass("Favi " + search + i)
            var title = results[i].title;
            var Title = $("<h5>").text("Title: " + title); Title.addClass("card-header"); Title.attr("id", (search + i + "Title"))
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_width.url);
            gifImage.addClass("Gif")
            gifImage.attr("data-animate", results[i].images.fixed_width.url)
            gifImage.attr("data-state", "animate")
            gifImage.attr("data-still", results[i].images.fixed_width_still.url)
            gifImage.attr("id", (search + i + "Gif"));
            newGIF.prepend(gifImage); newGIF.prepend(p); newGIF.prepend(Title);
            favi.attr("value", (search + i))
            newGIF.append(favi);
            // console.log(newGIF)
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
$(document.body).on("click", ".Favi", function () {
    if ((localStorage.getItem("count")) === null || (localStorage.getItem("count") < 0)) {
        var count = 0
        localStorage.setItem("count", count)
    }
    else {
        var count = localStorage.getItem("count");
        count++;
        localStorage.setItem("count", count);
    }
    console.log($(this).val());
    var selection = ($(this).val());
    var newFavi = $("<span>")
    newFavi.addClass("col-sm-4" + " card")
    var favRating = ("#" + selection + "p")
    var rating = ($(favRating).html());
    var p = $("<p>").text(rating); p.addClass("card-text");
    var unFavi = $("<button>").text("Remove Favorite");
    unFavi.addClass("unFavi"); unFavi.val(count)
    var favTitle = ("#" + selection + "Title");
    var title = ($(favTitle).text())
    var Title = $("<h5>").text(title); Title.addClass("card-header");
    var gifImage = $("<img>");
    var favGIF = ("#" + selection + "Gif")
    gifImage.attr("src", ($(favGIF).attr("src")));
    gifImage.addClass("Gif")
    gifImage.attr("data-animate", ($(favGIF).attr("src")))
    gifImage.attr("data-state", "animate")
    gifImage.attr("data-still", ($(favGIF).attr("data-still")))
    // gifImage.attr("id", (search + i + "Gif"))


    newFavi.prepend(gifImage); newFavi.prepend(p); newFavi.prepend(Title);
    newFavi.append(unFavi);
    // console.log(newFavi)

    // $("#results").prepend(newFavi)
    console.log(newFavi.html())
    newFavi = [JSON.stringify(newFavi.html())]
    console.log(newFavi)
    localStorage.setItem(count, newFavi)
})
$(document.body).on("click", ".unFavi", function () {
    console.log($(this).val());
    var count = localStorage.getItem("count")
    var b = localStorage.getItem(count)
    console.log(b)
    var a = ($(this).val())
    if (a != b) {
        localStorage.setItem(a, b);
        localStorage.removeItem(b);
    }
    else {
        localStorage.removeItem(a);
        count--;
    }
    count--;
    localStorage.setItem("count", count)

    showFavi();
})

function showFavi() {
    $("#results").empty()
    var count = (localStorage.getItem("count"));
    count++;
    for (var i = 0; i < count; i++) {
        var asdf = (JSON.parse(localStorage.getItem(i)))
        var qwerty = $("<span>")
        qwerty.addClass("card" + " col-sm-4")
        qwerty.append(asdf)
        console.log(qwerty)
        $("#results").prepend(qwerty)
    }
}
var saveState = ""
$("#Favorites").on("click", function () {
    $("#Favorites").hide(); $("#Results").show()
    results = false;
    saveState = $("#results").html()
    showFavi();
})
$("#Results").on("click", function () {
    results = true;
    $("#Favorites").show(); $("#Results").hide()
    $("#results").empty();
    $("#results").html(saveState)

})
