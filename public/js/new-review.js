// After the window has loaded...
window.onload = function () {

    // Set the 'active' aside link
    var asideNewReviewLink = document.getElementById('asideNewReviewLink');
    asideNewReviewLink.classList.add('active');

    // Warn user of untracked changes
    beforeUnload();

    // Initialize Quill editor
    var quill = new Quill('#editor', {
        theme: 'snow'
    });

    // Set onclick for 'Save' button
    buttonSaveReview_click();

    // Set onclick for 'View' (thumbnail) button
    buttonViewThumbnail_click();

};
