// books.js - Deshaun J. - 300921366 - Favorite BookList

// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
    res.render('index', {title: ' Add Book', page: 'books/add', books: {}})
}
// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price,
    });

    booksModel.create(newBook,function(error, Book){
        if (error) {
            console.error(error);
            res.end(error);
        }

       res.redirect('/books/list')
    })
 
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
let id = req.params.id;

booksModel.findById(id, function(error, book){
    if (error) {
        console.error(error);
        res.end(error);
    }
    
    res.render('index', {title: ' Edit Book', page: 'books/edit', book})
})
}
// POST process the Book Details page and create a new Book - CREATE
export function processEditPage(req, res, next) {
    let id = req.params.id

    let editBook =({
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price,
    });

    booksModel.updateOne({_id: id},editBook,function(error, book){
        if (error) {
            console.error(error);
            res.end(error);

            
        }else{
            res.redirect('/books/list');

        };

       //res.redirect('/books/list');
    });
 
};




// GET - process the delete by user id
export function processDelete(req, res, next) {

    let id = req.params.id

    booksModel.remove({_id: id}, function(error){

        if (error) {
            console.error(error);
            res.end(error);
        }

        res.redirect('/books/list')
    })


}