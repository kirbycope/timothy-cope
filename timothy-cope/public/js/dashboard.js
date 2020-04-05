/** Checks for unsaved changes in the Post form.
 * @returns {boolean} If there are untracked changes.
 */
function unsavedChanges() {
    if (
        document.getElementById('category').value === "" &&
        document.querySelector('.ql-editor').innerHTML === "<p>Hello World!</p><p>Some initial <strong>bold</strong> text</p><p><br></p>" &&
        document.getElementById('date').value === "" &&
        document.getElementById('description').value === "" &&
        document.getElementById('slug').value === "" &&
        document.getElementById('title').value === ""
    ) {
        // template unchanged
        return false;
    }
    else {
        return true;
    }
}

/** Submits the Post form. */
function savePost() {
    var post = {
        category: document.getElementById('category').value,
        content: document.querySelector('.ql-editor').innerHTML,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        slug: document.getElementById('slug').value,
        thumbnail: "/public/img/qa.png",
        title: document.getElementById('title').value
    };
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //
        }
    };
    xmlHttpRequest.open("POST", "/api/blog", true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(post);
}

function promptUnsavedChanges(event) {
    var confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

    (event || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}

// Set the Event Handlers
window.onload = function () {
    
    var asideDashboardLink = document.getElementById('asideDashboardLink');
    asideDashboardLink.classList.add('active');

    //<!-- Initialize Quill editor -->
    var quill = new Quill('#editor', {
        theme: 'snow'
    });

    //<!-- Warn user of untracked changes -->
    window.addEventListener('beforeunload', (event) => {
        //event.preventDefault();
        if (unsavedChanges() === true) {
            promptUnsavedChanges(event);
        }
        //event.returnValue = '';
    });

    /** Sets the onclick event listener for the 'Submit' button. */
    var savePostButton = document.getElementById('savePost');
    savePostButton.addEventListener('click', function (event) {
        savePostButton.disabled = true;
        //savePost();
    });

};
