﻿// https://stackoverflow.com/a/1527820/1106708
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function populateFeaturedPosts() {
    // Pick two posts at random
    var max = blogPosts.length - 1;
    var postOneIndex = getRandomInt(0, max);
    var postTwoIndex = getRandomInt(0, max);
    var featuredPosts = [];
    featuredPosts.push(blogPosts[postOneIndex]);
    featuredPosts.push(blogPosts[postTwoIndex]);

    for (var i = 0; i < featuredPosts.length; i++) {
        // <div class="col-md-6">
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("col-md-6");
        document.getElementById("featured-posts").appendChild(cardContainer);

        // <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        var projectCard = document.createElement("div");
        projectCard.classList.add("row");
        projectCard.classList.add("no-gutters");
        projectCard.classList.add("border");
        projectCard.classList.add("rounded");
        projectCard.classList.add("overflow-hidden");
        projectCard.classList.add("flex-md-row");
        projectCard.classList.add("mb-4");
        projectCard.classList.add("shadow-sm");
        projectCard.classList.add("h-md-260");
        projectCard.classList.add("position-relative");
        cardContainer.appendChild(projectCard);

        // <div class="col p-4 d-flex flex-column position-static">
        var cardTop = document.createElement("div");
        cardTop.classList.add("col");
        cardTop.classList.add("p-4");
        cardTop.classList.add("d-flex");
        cardTop.classList.add("flex-column");
        cardTop.classList.add("position-static");
        projectCard.appendChild(cardTop);

        // <strong class="d-inline-block mb-2 text-primary">Category</strong>
        var strong = document.createElement("strong");
        strong.classList.add("d-inline-block");
        strong.classList.add("mb-2");
        if (featuredPosts[i].category === "dev") {
            strong.classList.add("text-primary");
        }
        else {
            strong.classList.add("text-success");
        }
        strong.innerText = featuredPosts[i].category;
        cardTop.appendChild(strong);

        // <h3 class="mb-0">Featured Title</h3>
        var title = document.createElement("h3");
        title.classList.add("mb-0");
        title.innerText = featuredPosts[i].title;
        cardTop.appendChild(title);

        // <div class="mb-1 text-muted">Jan 01, 2019</div>
        var date = document.createElement("div");
        date.classList.add("mb-1");
        date.classList.add("text-muted");
        date.innerText = featuredPosts[i].date;
        cardTop.appendChild(date);

        // <p class="card-text mb-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        var description = document.createElement("p");
        description.classList.add("card-text");
        description.classList.add("mb-auto");
        description.innerText = featuredPosts[i].description;
        cardTop.appendChild(description);

        // <a href="#" class="stretched-link">Continue reading</a>
        var link = document.createElement("a");
        link.classList.add("stretched-link");
        link.innerText = "Continue reading";
        link.href = "blog/" + featuredPosts[i].slug;
        cardTop.appendChild(link);

        // <div class="col-auto d-none d-lg-block">
        var cardBottom = document.createElement("div");
        cardBottom.classList.add("col-auto");
        cardBottom.classList.add("d-none");
        cardBottom.classList.add("d-lg-block");
        projectCard.appendChild(cardBottom);

        // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        var cardImage = document.createElement("img");
        cardImage.src = featuredPosts[i].thumbnail;
        cardImage.classList.add("bd-placeholder-img");
        cardBottom.appendChild(cardImage);
    }
}

function populateBlogPosts() {
    // Deafult: 5 posts per "page"
    var maxPosts = 5;
    if (blogPosts.length < 5) {
        maxPosts = blogPosts.length;
    }
    for (var i = 0; i < maxPosts; i++) {
        addBlogPostToContainer("posts-container", blogPosts[i], true);
    }
}

function handlePagination() {
    // Limit the number of posts per page to 5
    if (blogPosts.length < 6) {
        document.getElementById("pagination-container").style.visibility = "hidden";
    }
}

function sortByDate(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

var blogPosts;
function getBlogPosts() {
    var querystringFilter = document.location.search;
    var month = querystringFilter.substring(querystringFilter.indexOf("?filter=") + 8, querystringFilter.indexOf("-")).toLowerCase();
    var year = querystringFilter.substring(querystringFilter.indexOf("-") + 1, querystringFilter.length);
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            blogPosts = JSON.parse(xmlHttpRequest.responseText);
            blogPosts = blogPosts.sort(sortByDate);
            blogPosts = blogPosts.reverse();
            if (querystringFilter.length > 0) {
                blogPosts = blogPosts.filter(function (key) { return key.date.toLowerCase().indexOf(month) !== -1; });
                blogPosts = blogPosts.filter(function (key) { return key.date.indexOf(year) !== -1; });
            }
            if (blogPosts.length > 0) {
                populateFeaturedPosts();
                populateBlogPosts();
            }
            handlePagination();
        }
    };
    xmlHttpRequest.open("GET", "/api/blog", true);
    xmlHttpRequest.send();
}

getBlogPosts();
