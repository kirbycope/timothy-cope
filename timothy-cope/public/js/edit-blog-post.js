/**
 * Populates the Edit form on the page.
 * @param {Object} blogPost The blog post data.
 */
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
    var thumbnail = document.getElementById('thumbnail');
    thumbnail.value = blogPost.thumbnail;
}

// After the window has loaded...
window.onload = function () {

    // Warn user of untracked changes
    beforeUnload();

    // Get the post data, then populate the page
    getBlogPost(populateEditForm);

    // Set onclick for 'Save' button
    buttonSavePost_click();

    // Set onclick for 'View' (thumbnail) button
    buttonViewThumbnail_click();

};
