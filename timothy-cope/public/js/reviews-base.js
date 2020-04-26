/**
 * Gets all reviews from the API.
 * @param {Function} callback The code to execute when the asynchronous operation completes.
 */
function getAllReviews(callback) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var reviews = JSON.parse(xmlHttpRequest.responseText);
            callback(reviews);
        }
    };
    xmlHttpRequest.open("GET", "/api/reviews", true);
    xmlHttpRequest.send();
}

/**
 * Get a review from the API (using location.pathname).
 * @param {Function} callback The code to execute when the asynchronous operation completes.
 */
function getReview(callback) {
    var pathname = document.location.pathname;
    var slug = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var review = JSON.parse(xmlHttpRequest.responseText);
            callback(review);
            // Initialize Quill editor
            var quill = new Quill('#editor', {
                theme: 'snow'
            });
        }
    };
    xmlHttpRequest.open("GET", "/api/reviews/" + slug, true);
    xmlHttpRequest.send();
}
