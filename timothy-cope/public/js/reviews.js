function populateReviews() {

    var reviews = {
        "books": [
            {
                category: "qc",
                copyright: "1992 by Juran Institute, Inc.",
                review: "(3/5) The second half of this book covers how to plan and adapt QC in a production lifecycle.",
                thumbnail: "/public/img/joqbd.png",
                title: "Juran on Quality by Design",
                url: "https://www.amazon.com/dp/0029166837"
            },
            {
                category: "sqa",
                copyright: "2011 Wiley Publishing",
                review: "(4/5) Forms much of the foundation of the ISTQB certification.",
                thumbnail: "/public/img/aost.png",
                title: "Art of Software Testing",
                url: "https://www.amazon.com/dp/B005PETXRM"
            },
            {
                category: "qc",
                copyright: "2013 The McGraw-Hill Companies, Inc.",
                review: "(5/5) Learn what is means to be a good manager and to see problems in the production lifecycle.",
                thumbnail: "/public/img/towm.png",
                title: "Workplace Management",
                url: "https://www.amazon.com/dp/0071808019"
            },
            {
                category: "sqa",
                copyright: "2017 Pragmatic Programmers, LLC.",
                review: "(4/5) How I learned to stop fighting it and love BDD.",
                thumbnail: "/public/img/tcb.png",
                title: "The Cucumber Book",
                url: "https://www.amazon.com/dp/B06XR5S98S"
            }
        ]
    };

    for (var i = 0; i < reviews["books"].length; i++) {
        // <div class="col-md-6">
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("col-md-6");
        document.getElementById("reviews").appendChild(cardContainer);

        // <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        var projectCard = document.createElement("div");
        projectCard.classList.add("row", "no-gutters", "border", "rounded", "overflow-hidden", "flex-md-row", "mb-4", "h-md-260", "position-relative");
        cardContainer.appendChild(projectCard);

        // <div class="col p-4 d-flex flex-column position-static">
        var cardTop = document.createElement("div");
        cardTop.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");
        projectCard.appendChild(cardTop);

        // <strong class="d-inline-block mb-2 text-primary">Category</strong>
        var strong = document.createElement("strong");
        strong.classList.add("d-inline-block", "mb-2");
        if (reviews["books"][i].category === "sqa") {
            strong.classList.add("text-primary");
        }
        else {
            strong.classList.add("text-success");
        }
        strong.innerText = reviews["books"][i].category;
        cardTop.appendChild(strong);

        // <h3 class="mb-0">Featured Title</h3>
        var title = document.createElement("h3");
        title.classList.add("mb-0");
        title.innerText = reviews["books"][i].title;
        cardTop.appendChild(title);

        // <div class="mb-1 text-muted">Jan 01, 2019</div>
        var date = document.createElement("div");
        date.classList.add("mb-1", "text-muted");
        date.innerText = reviews["books"][i].copyright;
        cardTop.appendChild(date);

        // <p class="card-text mb-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        var description = document.createElement("p");
        description.classList.add("card-text", "mb-auto");
        description.innerText = reviews["books"][i].review;
        cardTop.appendChild(description);

        // <a href="#" class="stretched-link">Continue reading</a>
        var link = document.createElement("a");
        link.classList.add("stretched-link");
        link.innerText = "Buy the book";
        link.href = reviews["books"][i].url;
        cardTop.appendChild(link);

        // <div class="col-auto d-none d-lg-block">
        var cardBottom = document.createElement("div");
        cardBottom.classList.add("col-auto", "d-none", "d-lg-block");
        projectCard.appendChild(cardBottom);

        // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        var cardImage = document.createElement("img");
        cardImage.src = reviews["books"][i].thumbnail;
        cardImage.classList.add("bd-placeholder-img");
        cardBottom.appendChild(cardImage);
    }
}

// After the window has loaded...
window.onload = function () {

    // Populate the reviews
    populateReviews();

};
