//#region Event Listeners

/** Sets the click event listener for the 'Save' button. */
function buttonSavePost_click() {
    var buttonSavePost = document.getElementById('savePost');
    buttonSavePost.addEventListener('click', function () {
        buttonSavePost.disabled = true;
        savePost();
    });
}

/** Sets the click event listener for the 'View' (thumbnail) button. */
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

//#endregion

/**
 * Deletes this post (where id="delete {slug}").
 * @param {Event} e The event that called this function.
 */
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

/** POSTs the Blog Post form's values to the blog API. */
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
