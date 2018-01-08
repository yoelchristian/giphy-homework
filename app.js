var animalsArray = ["dog", "cat", "chicken", "lamb", "goat", "tiger"];

function createButton() {
    $("#button-animals").empty();

    for(var j = 0; j < animalsArray.length; j++) {
    var createButton = $("<button>");
    createButton.addClass("buttons");
    createButton.attr("data-name", animalsArray[j]);
    createButton.text(animalsArray[j]);
    $("#button-animals").append(createButton);
    }
}

function displayAnimalGif(x) {
    $("#animal-gif").empty();
    var animal = $(x).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=erHTMteEg3uXLyCRiHAr4zyQEh4q6ChP&limit=10";
    console.log(animal);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var results = response.data;
        
        for(var i = 0; i < results.length; i++) {
            var imgSrc = results[i].images.fixed_width_still.url;
            var imgSrcStill = results[i].images.fixed_width_still.url;
            var imgSrcAnimate = results[i].images.fixed_width.url;
            var imgRating = results[i].rating;
            var createImage = $("<img>");
            var createSpan = $("<span>");
            var createDiv = $("<div>");

            createDiv.addClass("rating-alignment");
            createSpan.text("Rating: " + imgRating);
            createSpan.addClass("rating");
            createImage.attr("src", imgSrc);
            createImage.attr("data-still", imgSrcStill );
            createImage.attr("data-animate", imgSrcAnimate);
            createImage.attr("data-state", "still");
            createImage.addClass("animal-images");
            $(createDiv).prepend(createSpan);
            $(createDiv).prepend(createImage);
            $("#animal-gif").prepend(createDiv);

        }
    })
}

createButton();

$(document).on("click", "button", function() {
    displayAnimalGif(this);
});

$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var newAnimal = $("#animal-input").val().trim();
    animalsArray.push(newAnimal);
    
    createButton();
})

$(document).on("click", "img", function() {
    var state = $(this).attr("data-state");
    
    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});