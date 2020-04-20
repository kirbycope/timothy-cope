var changesSaved;

function beforeUnload() {
    changesSaved = false;
    window.addEventListener('beforeunload', (event) => {
        //event.preventDefault();
        if (unsavedChanges()) {
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

function buttonViewThumbnail_click() {
    var buttonViewThumbnail = document.getElementById('buttonViewThumbnail');
    buttonViewThumbnail.addEventListener('click', function (e) {
        var thumbnail = document.getElementById('thumbnail').value;
        if (thumbnail.startsWith('/')) {
            window.open(document.location.origin + thumbnail, '_blank');
        }
        else {
            window.open(thumbnail, '_blank');
        }
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
        thumbnail: document.getElementById('thumbnail').value,
        title: document.getElementById('title').value
    };
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            changesSaved = true;
            var newUrl = window.location.origin + '/admin/allBlogPosts';
            location.href = newUrl;
        }
        else if (this.readyState === 4 && this.status !== 200) {
            buttonSubmit.disabled = false;
        }
    };
    xmlHttpRequest.open('POST', '/api/blog', true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(JSON.stringify(post));
}

function unsavedChanges() {
    if (changesSaved !== true) {
        if (document.querySelector('.ql-editor')) {
            if (document.location.href.includes('new')) {
                if (document.getElementById('category').value !== '' ||
                    document.querySelector('.ql-editor').innerHTML !== '<p><br></p>' ||
                    document.getElementById('date').value !== "" ||
                    document.getElementById('description').value !== '' ||
                    document.getElementById('slug').value !== '' ||
                    document.getElementById('thumbnail').value !== '' ||
                    document.getElementById('title').value !== ''
                ) {
                    return true;
                }
            }
            else if (document.location.href.includes('/blog/')) {
                return true;
            }
        }
    }
    return false;
}
