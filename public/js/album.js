/** Populates the Projects cards on the page. */
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

        if (projects[i].embed) {
            // <iframe class="card-img-top" frameborder="0" allowfullscreen="true">
            var embedIframe = document.createElement("iframe");
            embedIframe.classList.add("card-img-top");
            embedIframe.setAttribute("src", "https://www.youtube.com/embed/" + projects[i].embed);
            embedIframe.setAttribute("frameborder", "0");
            embedIframe.setAttribute("allowfullscreen", true);
            projectCard.appendChild(embedIframe);
        }
        else {
            // <div>
            var imageWrapper = document.createElement("div");
            imageWrapper.style.position = "relative";
            projectCard.appendChild(imageWrapper);

            // <a>
            var cardImageLink = document.createElement("a");
            cardImageLink.title = "Link to site for " + projects[i].title;
            cardImageLink.href = projects[i].url;
            imageWrapper.appendChild(cardImageLink);

            // <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail">
            var cardImageTop = document.createElement("img");
            cardImageTop.alt = "Screenshot of " + projects[i].title;
            cardImageTop.classList.add("card-img-top");
            cardImageTop.style.display = "block";
            cardImageTop.setAttribute("data-src", "holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail");
            cardImageTop.setAttribute("src", "/public/img/projects/" + projects[i].thumbnail);
            cardImageLink.appendChild(cardImageTop);

            // <img> overlay
            var cardImageOverlay = document.createElement("img");
            cardImageOverlay.style.bottom = 0;
            cardImageOverlay.style.right = 0;
            cardImageOverlay.style.maxHeight = "64px";
            cardImageOverlay.style.marginLeft = "64px";
            cardImageOverlay.style.position = "absolute";
            if (projects[i].small.indexOf("MCAddon") !== -1 || projects[i].small.indexOf("MCTemplate") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/minecraft_bedrock.png");
            }
            else if (projects[i].small.indexOf("MCFunction") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/minecraft_java.png");
            }
            else if (projects[i].small.indexOf("Angular") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/angular.png");
            }
            else if (projects[i].small.indexOf("Bash") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/bash.png");
            }
            else if (projects[i].small.indexOf("C#") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/csharp.png");
            }
            else if (projects[i].small.indexOf("Creation Kit") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/creation_kit_white.png");
            }
            else if (projects[i].small.indexOf("Java") !== -1 && projects[i].small.indexOf("JavaScript") == -1) {
                cardImageOverlay.setAttribute("src", "/public/img/java.png");
            }
            else if (projects[i].small.indexOf("JavaScript") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/javascript.png");
            }
            else if (projects[i].small.indexOf("Node") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/nodejs.png");
            }
            else if (projects[i].small.indexOf("PowerShell") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/powershell.png");
            }
            else if (projects[i].small.indexOf("Python") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/python.png");
            }
            else if (projects[i].small.indexOf("React") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/react.png");
            }
            else if (projects[i].small.indexOf("TI-BASIC") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/ti-basic.png");
            }
            else if (projects[i].small.indexOf("TypeScript") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/typescript.png");
            }
            else if (projects[i].small.indexOf("WordPress") !== -1) {
                cardImageOverlay.setAttribute("src", "/public/img/wordpress.png");
            }
            cardImageLink.appendChild(cardImageOverlay);
        }

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

// After the window has loaded...
window.onload = function () {

    // Populate the page
    populateProjects();

};
