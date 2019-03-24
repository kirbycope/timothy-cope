var blogPost;
function getBlogPost() {
    var pathname = document.location.pathname;
    var slug = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            blogPost = JSON.parse(xmlHttpRequest.responseText);
            addBlogPostToContainer("post-container", blogPost, false);
        }
    };
    xmlHttpRequest.open("GET", "/api/blog/" + slug, true);
    xmlHttpRequest.send();
}

getBlogPost();
