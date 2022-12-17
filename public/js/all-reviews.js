/** List of the review(s) */
var reviewList;

/** ListJs options */
var options = {
    valueNames: [
        'slug',
        'category',
        'link',
        'review',
        'thumbnail',
        'title'
    ]
};

/**
 * Populates the review table.
 * @param {Object} reviews The reviews data.
 */
function populateReviews(reviews) {
    var tbodyAllreviews = document.getElementById('tbodyAllreviews');
    for (var i = 0; i < reviews.length; i++) {

        var tableRow = document.createElement('tr');

        var tdSlug = document.createElement('td');
        tdSlug.classList.add('slug');
        var slug = '<a href="/reviews/' + reviews[i].slug + '">' + reviews[i].slug + '</a>';
        tdSlug.innerHTML = slug;
        tableRow.appendChild(tdSlug);

        var tdCategory = document.createElement('td');
        tdCategory.classList.add('category');
        tdCategory.innerText = reviews[i].category;
        tableRow.appendChild(tdCategory);

        var tdLink = document.createElement('td');
        tdLink.classList.add('link');
        tdLink.innerText = reviews[i].link;
        tableRow.appendChild(tdLink);

        var tdReview = document.createElement('td');
        tdReview.classList.add('review');
        var review = reviews[i].review;
        if (review.length > 10) {
            review = review.substring(0, 9) + '...';
        }
        tdReview.innerText = review;
        tableRow.appendChild(tdReview);

        var tdThumbnail = document.createElement('td');
        tdThumbnail.classList.add('thumbnail');
        tdThumbnail.innerText = reviews[i].thumbnail;
        tableRow.appendChild(tdThumbnail);

        var tdTitle = document.createElement('td');
        tdTitle.classList.add('title');
        tdTitle.innerText = reviews[i].title;
        tableRow.appendChild(tdTitle);

        var tdActions = document.createElement('td');
        var linkEdit = document.createElement('a');
        linkEdit.classList.add('btn', 'btn-sm', 'btn-primary');
        linkEdit.style = 'margin-right: .25rem;';
        linkEdit.innerText = 'Edit';
        linkEdit.href = '/admin/reviews/' + reviews[i].slug;
        tdActions.appendChild(linkEdit);
        var buttonDelete = document.createElement('button');
        buttonDelete.id = 'delete ' + reviews[i].slug;
        buttonDelete.classList.add('btn', 'btn-sm', 'btn-danger');
        buttonDelete.innerText = 'Delete';
        buttonDelete.onclick = function (e) {
            deleteReview(e);
        };
        tdActions.appendChild(buttonDelete);
        tableRow.appendChild(tdActions);

        tbodyAllReviews.appendChild(tableRow);
    }
    reviewList = new List('reviews', options);
}

// After the window has loaded...
window.onload = function () {

    // Set the 'active' aside link
    var asideAllReviewsLink = document.getElementById('asideAllReviewsLink');
    asideAllReviewsLink.classList.add('active');

    // Get the review(s), then populate the page
    getAllReviews(populateReviews);

};
