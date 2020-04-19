function populateEditForm(blogPost) {
    var editor = document.getElementById('editor');
    editor.innerHTML = blogPost.content;
    var category = document.getElementById('category');
    category.value = blogPost.category;
    var date = document.getElementById('date');
    date.value = blogPost.date;
    var description = document.getElementById('description');
    description.value = blogPost.description;
    var slug = document.getElementById('slug');
    slug.value = blogPost.slug;
    var title = document.getElementById('title');
    title.value = blogPost.title;
}

// Set the Event Handlers
window.onload = function () {
    
    // Warn user of untracked changes
    beforeUnload();

    // Get the post data
    getBlogPost(populateEditForm);
    
    // Form submit override
    buttonSavePost_click();

};
