import { Injectable, HttpException } from '@nestjs/common';
import { json } from 'stream/consumers';
// import { BOOKS } from '../mocks/books.mock';
const fs = require('fs');

@Injectable()
export class BooksService {
  books:any = [];

  getBooks(): Promise<any> {
    return new Promise(resolve => {
      fs.readFile('./dados.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.books = JSON.parse(data);
  
        resolve(this.books.books);
      })
    });
  }

  saveBook(): Promise<any> {
    return new Promise(resolve => {
      fs.writeFile('./dados.txt', JSON.stringify(this.books),(err) => {
        if (err) {
          console.error(err)
          return
        }

        resolve(this.books.books);
      });
    });
  }

  getBook(bookID: number): Promise<any> {
    return new Promise( async (resolve) => {
      
      await this.getBooks();

      const book = this.books.books.find(book => book.id === bookID);
      if (!book) {
        resolve(null);
      }
      resolve(book);
    });
  }

  editBook(bookID: number, book): Promise<any> {
    return new Promise( async (resolve) => {
      
      await this.getBooks();

      const index = this.books.books.findIndex(book => book.id === bookID);
      if (index < 0) {
        resolve(null);
      }else{
        this.books.books[index].name = book.name;
        this.books.books[index].author = book.author;
      }

      await this.saveBook();
      resolve(this.books.books);
    });
  }

  addBook(book): Promise<any> {
    return new Promise( async (resolve) => {
      
      await this.getBooks();

      book.id = this.books.sequence;

      this.books.sequence++; 

      this.books.books.push(book);

      await this.saveBook();

      resolve(this.books.books);
    });
  }

  deleteBook(bookID: number): Promise<any> {
    return new Promise( async (resolve) => {
      await this.getBooks();
      let index = this.books.books.findIndex(book => book.id === bookID);
      if (index === -1) {
        resolve(null);
      }
      this.books.books = await this.books.books.filter( book =>  book.id !== bookID);
      await this.saveBook();
      resolve(this.books.books);
    });
  }
}
