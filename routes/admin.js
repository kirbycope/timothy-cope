'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/admin"
router.get('/', function (req, res) {
    if (req.cookies.admin) {
        res.redirect('/admin/dashboard');
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/signin"
router.get('/signin', function (req, res) {
    res.render('signin', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Administrator Sign In",
        previewImg: "/public/img/preview-blog.png"
    });
});

// GET: "/admin/signout"
router.get('/signout', function (req, res) {

    // Response: (200 OK)
    res.clearCookie('admin')
        .redirect('/admin/signin')
        .send();

});

// GET: "/admin/dashboard"
router.get('/dashboard', function (req, res) {
    if (req.cookies.admin) {
        res.render('dashboard', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "Administrator Dashboard",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/newBlogPost"
router.get('/newBlogPost', function (req, res) {
    if (req.cookies.admin) {
        res.render('new-blog-post', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "New Blog Post",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/allBlogPosts"
router.get('/allBlogPosts', function (req, res) {
    if (req.cookies.admin) {
        res.render('all-blog-posts', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "All Blog Posts",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/blog/:slug"
router.get('/blog/:slug', function (req, res) {
    if (req.cookies.admin) {
        res.render('edit-blog-post', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "Edit Blog Post",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/newReview"
router.get('/newReview', function (req, res) {
    if (req.cookies.admin) {
        res.render('new-review', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "New Review",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/allReviews"
router.get('/allReviews', function (req, res) {
    if (req.cookies.admin) {
        res.render('all-reviews', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "All Reviews",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/reviews/:slug"
router.get('/reviews/:slug', function (req, res) {
    if (req.cookies.admin) {
        res.render('edit-review', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "Edit Review",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
