// Set the 'active' tab
window.onload = function () {
    var id = '';
    if (location.href.includes('dashboard')) {
        id = 'asideDashboardLink';
    }
    var element = document.getElementById(id);
    element.classList.add("active");

};
