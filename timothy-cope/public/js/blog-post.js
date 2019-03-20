var blogPost;

function populateBlogPost() {
    for (var i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].slug === slug) {
            blogPost = blogPosts[i];
        }
    }
    AddBlogPostToContainer("post-container", blogPost, false);
}

populateBlogPost();