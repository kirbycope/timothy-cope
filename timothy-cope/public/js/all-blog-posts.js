var postList;
var options = {
    valueNames: [
        'slug',
        'category',
        'content',
        'date',
        'description',
        'thumbnail',
        'title'
    ]
};

function populateBlogPosts(blogPosts) {
    var tbodyAllBlogPosts = document.getElementById('tbodyAllBlogPosts');
    for (var i = 0; i < blogPosts.length; i++) {

        var tableRow = document.createElement('tr');

        var tdSlug = document.createElement('td');
        tdSlug.classList.add('slug');
        var slug = '<a href="/blog/' + blogPosts[i].slug + '">' + blogPosts[i].slug + '</a>';
        tdSlug.innerHTML = slug;
        tableRow.appendChild(tdSlug);

        var tdCategory = document.createElement('td');
        tdCategory.classList.add('category');
        tdCategory.innerText = blogPosts[i].category;
        tableRow.appendChild(tdCategory);

        var tdContent = document.createElement('td');
        tdContent.classList.add('content');
        var content = blogPosts[i].content;
        if (content.length > 10) {
            content = content.substring(0, 9) + '...';
        }
        tdContent.innerText = content;
        tableRow.appendChild(tdContent);

        var tdDate = document.createElement('td');
        tdDate.classList.add('date');
        tdDate.innerText = blogPosts[i].date;
        tableRow.appendChild(tdDate);

        var tdDescription = document.createElement('td');
        tdDescription.classList.add('description');
        tdDescription.innerText = blogPosts[i].description;
        tableRow.appendChild(tdDescription);

        var tdThumbnail = document.createElement('td');
        tdThumbnail.classList.add('thumbnail');
        tdThumbnail.innerText = blogPosts[i].thumbnail;
        tableRow.appendChild(tdThumbnail);

        var tdTitle = document.createElement('td');
        tdTitle.classList.add('title');
        tdTitle.innerText = blogPosts[i].title;
        tableRow.appendChild(tdTitle);

        var tdActions = document.createElement('td');
        var linkEdit = document.createElement('a');
        linkEdit.classList.add('btn', 'btn-sm', 'btn-primary');
        linkEdit.style = 'margin-right: .25rem;';
        linkEdit.innerText = 'Edit';
        linkEdit.href = '/admin/blog/' + blogPosts[i].slug;
        tdActions.appendChild(linkEdit);
        var buttonDelete = document.createElement('button');
        buttonDelete.id = 'delete ' + blogPosts[i].slug;
        buttonDelete.classList.add('btn', 'btn-sm', 'btn-danger');
        buttonDelete.innerText = 'Delete';
        buttonDelete.onclick = function (e) {
            deletePost(e);
        };
        tdActions.appendChild(buttonDelete);
        tableRow.appendChild(tdActions);

        tbodyAllBlogPosts.appendChild(tableRow);
    }
    postsList = new List('posts', options);
}

// Set the Event Handlers
window.onload = function () {

    // Set the 'active' aside link
    var asideAllBlogPostsLink = document.getElementById('asideAllBlogPostsLink');
    asideAllBlogPostsLink.classList.add('active');

    // Get blog posts
    getAllBlogPosts(populateBlogPosts);

};
