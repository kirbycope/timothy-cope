'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/" ("Home" page)
router.get('/', function (req, res) {
    var projectJSON = require('../data/projects.json');
    res.render('index', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Home",
        previewImg: "/public/img/preview-01.png",
        projects: projectJSON
    });
});

// GET: "/about" ("about" page)
router.get('/about', function (req, res) {
    res.render('about', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "About",
        previewImg: "/public/img/preview-01.png"
    });
});

// GET: "/blog" ("blog" page)
router.get('/blog', function (req, res) {
    var blogJSON = require('../data/blog.json');
    res.render('blog', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Blog",
        previewImg: "/public/img/preview-01.png",
        blogPosts: blogJSON
    });
});

// GET: "/blog/:slug" ("blog post" page)
router.get('/blog/:slug', function (req, res) {
    var blogJSON = require('../data/blog.json');
    res.render('blog-post', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Blog",
        previewImg: "/public/img/preview-blog.png",
        blogPosts: blogJSON,
        slug: req.params.slug
    });
});

module.exports = router;
