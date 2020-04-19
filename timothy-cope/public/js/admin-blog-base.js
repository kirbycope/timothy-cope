var changesSaved;

function beforeUnload() {
    changesSaved = false;
    // Warn user of untracked changes
    window.addEventListener('beforeunload', (event) => {
        //event.preventDefault();
        if (unsavedChanges() === true) {
            promptUnsavedChanges(event);
        }
        //event.returnValue = '';
    });
}

function buttonSavePost_click() {
    var buttonSavePost = document.getElementById('savePost');
    buttonSavePost.addEventListener('click', function () {
        buttonSavePost.disabled = true;
        savePost();
    });
}

function deletePost(e) {
    var slug = e.target.id.replace('delete ', '');
    var result = confirm('Delete post "' + slug + '"?');
    if (result) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var newUrl = window.location.origin + '/admin/allBlogPosts';
                location.href = newUrl;
            }
        };
        xmlHttpRequest.open('DELETE', '/api/blog/' + slug, true);
        xmlHttpRequest.send();
    }
}

function promptUnsavedChanges(event) {
    var confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

    (event || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}

function savePost() {
    var post = {
        category: document.getElementById('category').value,
        content: document.querySelector('.ql-editor').innerHTML,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        slug: document.getElementById('slug').value,
        thumbnail: '/public/img/qa.png',
        title: document.getElementById('title').value
    };
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            changesSaved = true;
            var newUrl = window.location.origin + '/admin/allBlogPosts';
            location.href = newUrl;
        }
        else if (this.readyState === 4) {
            buttonSubmit.disabled = false;
        }
    };
    xmlHttpRequest.open('POST', '/api/blog', true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(JSON.stringify(post));
}

function unsavedChanges() {
    if (changesSaved) {
        return false;
    }
    if (document.querySelector('.ql-editor')) {
        if (document.location.contains('new')) {
            if (document.getElementById('category').value === '' &&
                document.querySelector('.ql-editor').innerHTML === '' &&
                document.getElementById('date').value === "" &&
                document.getElementById('description').value === '' &&
                document.getElementById('slug').value === '' &&
                document.getElementById('title').value === ''
            ) {
                return false;
            }
        }
    }
    return true;
}
