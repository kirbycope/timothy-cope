/**
 * Populates the Edit form on the page.
 * @param {Object} review The review data.
 */
function populateEditForm(review) {
    var editor = document.getElementById('editor');
    editor.innerHTML = review.review;
    var category = document.getElementById('category');
    category.value = review.category;
    var copyright = document.getElementById('copyright');
    copyright.value = review.copyright;
    var link = document.getElementById('link');
    link.value = review.link;
    var slug = document.getElementById('slug');
    slug.value = review.slug;
    var thumbnail = document.getElementById('thumbnail');
    thumbnail.value = review.thumbnail;
    var title = document.getElementById('title');
    title.value = review.title;
}

// After the window has loaded...
window.onload = function () {

    // Warn user of untracked changes
    beforeUnload();

    // Get the post data, then populate the page
    getReview(populateEditForm);

    // Set onclick for 'Save' button
    buttonSaveReview_click();

    // Set onclick for 'View' (thumbnail) button
    buttonViewThumbnail_click();

};
