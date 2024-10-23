$(document).ready(function () {
    let pageCounter = 1;
    const animalContainer = $("#animal-info");
    const btn = $("#btn");

    btn.on('click', function () {
        $.ajax({
            url: `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`,
            method: 'GET',
            success: function (data) {
                renderHTML(data);
                pageCounter++;
                if (pageCounter > 3) {
                    btn.addClass("hide-me");
                }
            },
            error: function () {
                console.log("Theres a connection error");
            }
        });
    });

    function renderHTML(data) {
        let htmlString = "";
        data.forEach(function(animal){
            htmlString += `<p>${animal.name} is a ${animal.species} that likes to eat `;

            animal.foods.likes.forEach(function(like, i){
                htmlString += i === 0 ? like: `and ${like}`

            });
            htmlString += ' and dislikes '
            animal.foods.dislikes.forEach(function(dislike, i){
                htmlString += i === 0 ? dislike: `and ${dislike}`
            });

            htmlString += ".</p>";
        });
        animalContainer.append(htmlString);
    };
});