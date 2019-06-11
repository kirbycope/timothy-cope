function populateProjects() {
    for (var i = 0; i < projects.length; i++) {

        // <div class="col-md-4">
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("col-md-4");
        document.getElementById("projects").appendChild(cardContainer);

            // <div class="card mb-4 shadow-sm">
            var projectCard = document.createElement("div");
            projectCard.classList.add("card");
            projectCard.classList.add("mb-4");
            projectCard.classList.add("shadow-sm");
            cardContainer.appendChild(projectCard);

                // <a>
                var cardImageLink = document.createElement("a");
                cardImageLink.title = "Link to site for " + projects[i].title;
                cardImageLink.href = projects[i].url;
                projectCard.appendChild(cardImageLink);

                    // <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail">
                    var cardImageTop = document.createElement("img");
                    cardImageTop.alt = "Screenshot of " + projects[i].title;
                    cardImageTop.classList.add("card-img-top");
                    cardImageTop.setAttribute("data-src", "holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail");
                    cardImageTop.setAttribute("src", "/public/img/projects/" + projects[i].thumbnail);
                    cardImageLink.appendChild(cardImageTop);

                // <div class="card-body">
                var cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                projectCard.appendChild(cardBody);

                    // <h5 class="card-title"></p>
                    var cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.innerText = projects[i].title;
                    cardBody.appendChild(cardTitle);

                    // <h6 class="card-subtitle mb-2 text-muted">
                    var cardSubTitle = document.createElement("h6");
                    cardSubTitle.classList.add("card-subtitle");
                    cardSubTitle.classList.add("mb-2");
                    cardSubTitle.classList.add("text-muted");
                    cardSubTitle.innerText = projects[i].created;
                    cardBody.appendChild(cardSubTitle);

                    // <p class="card-text"></p>
                    var cardText = document.createElement("p");
                    cardText.classList.add("card-text");
                    cardText.innerText = projects[i].text;
                    cardBody.appendChild(cardText);

                    // <div class="d-flex justify-content-between align-items-center">
                    var buttonContainer = document.createElement("div");
                    buttonContainer.classList.add("d-flex");
                    buttonContainer.classList.add("justify-content-between");
                    buttonContainer.classList.add("align-items-center");
                    cardBody.appendChild(buttonContainer);

                        // <div class="btn-group">
                        var buttonGroup = document.createElement("div");
                        buttonGroup.classList.add("btn-group");
                        buttonContainer.appendChild(buttonGroup);

                            // <a href="#" class="btn btn-sm btn-outline-secondary" role="button"></a>
                            var cardLink = document.createElement("a");
                            cardLink.title = "Link to site for " + projects[i].title;
                            cardLink.classList.add("btn");
                            cardLink.classList.add("btn-sm");
                            cardLink.classList.add("btn-outline-secondary");
                            cardLink.setAttribute("role", "button");
                            cardLink.innerText = "Visit Site";
                            cardLink.href = projects[i].url;
                            buttonGroup.appendChild(cardLink);

                        // <small class="text-muted"></small>
                        var smallText = document.createElement("small");
                        smallText.classList.add("text-muted");
                        buttonContainer.appendChild(smallText);
                        smallText.innerText = projects[i].small;
    }
}

populateProjects();