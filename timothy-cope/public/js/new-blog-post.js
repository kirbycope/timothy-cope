// Set the Event Handlers
window.onload = function () {

    // Set the 'active' aside link
    var asideNewBlogPostLink = document.getElementById('asideNewBlogPostLink');
    asideNewBlogPostLink.classList.add('active');

    // Warn user of untracked changes
    beforeUnload();

    // Initialize Quill editor
    var quill = new Quill('#editor', {
        theme: 'snow'
    });

    // Form submit override
    buttonSavePost_click();

};
