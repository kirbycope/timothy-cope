/** Populates the Review cards on the Reviews page.
 * @param {object} reviews The reviews data
 * */
function populateReviews(reviews) {

    for (var i = 0; i < reviews.length; i++) {
        // <div class="col-md-6">
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("col-md-6");
        document.getElementById("reviews").appendChild(cardContainer);

        // <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        var projectCard = document.createElement("div");
        projectCard.classList.add("row", "no-gutters", "border", "rounded", "overflow-hidden", "flex-md-row", "mb-4", "position-relative");
        cardContainer.appendChild(projectCard);

        // <div class="col p-4 d-flex flex-column position-static">
        var cardTop = document.createElement("div");
        cardTop.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");
        projectCard.appendChild(cardTop);

        // <strong class="d-inline-block mb-2 text-primary">Category</strong>
        var strong = document.createElement("strong");
        strong.classList.add("d-inline-block", "mb-2");
        if (reviews[i].category === "sqa") {
            strong.classList.add("text-primary");
        }
        else {
            strong.classList.add("text-success");
        }
        strong.innerText = reviews[i].category;
        cardTop.appendChild(strong);

        // <h3 class="mb-0">Featured Title</h3>
        var title = document.createElement("h3");
        title.classList.add("mb-0");
        title.innerText = reviews[i].title;
        cardTop.appendChild(title);

        // <div class="mb-1 text-muted">Jan 01, 2019</div>
        var date = document.createElement("div");
        date.classList.add("mb-1", "text-muted");
        date.innerText = reviews[i].copyright;
        cardTop.appendChild(date);

        // <p class="card-text mb-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        var description = document.createElement("p");
        description.classList.add("card-text", "mb-auto");
        var review = reviews[i].review;
        if (review.includes("(1/5) ")) {
            review = review.replace("(1/5) ", "\u2605\u2606\u2606\u2606\u2606 ");
        }
        else if (review.includes("(2/5) ")) {
            review = review.replace("(2/5) ", "\u2605\u2605\u2606\u2606\u2606 ");
        }
        else if (review.includes("(3/5) ")) {
            review = review.replace("(3/5) ", "\u2605\u2605\u2605\u2606\u2606 ");
        }
        else if (review.includes("(4/5) ")) {
            review = review.replace("(4/5) ", "\u2605\u2605\u2605\u2605\u2606 ");
        }
        else if (review.includes("(5/5) ")) {
            review = review.replace("(5/5) ", "\u2605\u2605\u2605\u2605\u2605 ");
        }
        description.innerHTML = review;
        cardTop.appendChild(description);

        // <a href="#" class="stretched-link">Continue reading</a>
        var link = document.createElement("a");
        link.classList.add("stretched-link");
        link.innerText = "Buy the book";
        link.href = reviews[i].link;
        cardTop.appendChild(link);

        // <div class="col-auto d-none d-lg-block">
        var cardBottom = document.createElement("div");
        cardBottom.classList.add("col-auto", "d-none", "d-lg-block");
        projectCard.appendChild(cardBottom);

        // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        var cardImage = document.createElement("img");
        cardImage.src = reviews[i].thumbnail;
        cardImage.classList.add("bd-placeholder-img");
        cardImage.height = 260;
        cardImage.width = 200;
        cardBottom.appendChild(cardImage);
    }

}

// After the window has loaded...
window.onload = function () {

    // Get the review(s), then populate the page
    getAllReviews(populateReviews);

};
