//#region Event Listeners

/** Sets the click event listener for the 'Save' button. */
function buttonSaveReview_click() {
    var buttonSaveReview = document.getElementById('saveReview');
    buttonSaveReview.addEventListener('click', function () {
        buttonSaveReview.disabled = true;
        saveReview();
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
 * Deletes this review (where id="delete {slug}").
 * @param {Event} e The event that called this function.
 */
function deleteReview(e) {
    var slug = e.target.id.replace('delete ', '');
    var result = confirm('Delete review "' + slug + '"?');
    if (result) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var newUrl = window.location.origin + '/admin/allReviews';
                location.href = newUrl;
            }
        };
        xmlHttpRequest.open('DELETE', '/api/reviews/' + slug, true);
        xmlHttpRequest.send();
    }
}

/** POSTs the Review form's values to the review API. */
function saveReview() {
    var post = {
        category: document.getElementById('category').value,
        copyright: document.getElementById('copyright').value,
        link: document.getElementById('link').value,
        review: document.querySelector('.ql-editor').innerHTML,
        slug: document.getElementById('slug').value,
        thumbnail: document.getElementById('thumbnail').value,
        title: document.getElementById('title').value
    };
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            changesSaved = true;
            var newUrl = window.location.origin + '/admin/allReviews';
            location.href = newUrl;
        }
        else if (this.readyState === 4 && this.status !== 200) {
            buttonSubmit.disabled = false;
        }
    };
    xmlHttpRequest.open('POST', '/api/reviews', true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(JSON.stringify(post));
}
