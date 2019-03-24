function addBlogPostToContainer(containerId, post, includeContinue) {
    // <div class="col-md-6">
    var cardContainer = document.createElement("div");
    cardContainer.classList.add("blog-post");
    document.getElementById(containerId).appendChild(cardContainer);

        // <h2 class="blog-post-title">Sample blog post</h2>
        var heading = document.createElement("h2");
        heading.classList.add("blog-post-title");
        heading.innerText = post.title;
        cardContainer.appendChild(heading);

        // <p class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
        var meta = document.createElement("p");
        meta.classList.add("blog-post-meta");
        meta.innerText = post.date + " by ";
        cardContainer.appendChild(meta);
        var authorLink = document.createElement("a");
        authorLink.href = "/about";
        authorLink.innerText = "Tim";
        meta.appendChild(authorLink);

        // <p></p>
        var postBody = document.createElement("p");
        if (includeContinue === true) {
            if (post.content.indexOf("</p>") !== -1) {
                postBody.innerHTML = post.content.substring(0, post.content.indexOf("</p>") + 4);
            }
            else {
                if (post.content.length > 400) {
                    postBody.innerText = post.content.substring(0, 400) + "...";
                }
                else {
                    postBody.innerHTML = post.content;
                }
            }
        }
        else {
            postBody.innerHTML = post.content;
        }
        cardContainer.appendChild(postBody);

        if (includeContinue === true) {
            // <a href="#" class="stretched-link">Continue reading</a>
            var link = document.createElement("a");
            link.innerText = "Continue reading";
            link.href = "blog/" + post.slug;
            cardContainer.appendChild(link);
        }
}
