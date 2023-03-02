// index.js - Deshaun J. - 300921366 - Favorite BookList
export function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}

export function displayAddPage(req, res, next) {
    res.render('index', { title: 'Add Page', page: 'add' });
}