import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  Put,
  HttpException
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

/**
 * @desc  Pass BookService into the BooksController following dependency injection design pattern
 */

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  // Get every book from the db
  @Get()
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  // Get a particular book from the db using a book id
  @Get(':bookID')
  async getBook(@Param('bookID') bookID: string) {
    const book = await this.booksService.getBook(Number(bookID));
    if (!book) {
      throw new HttpException('O livro não existe!', 404);
    }
    return book;
  }

  // Add a book to the db
  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }

  // Add a book to the db
  @Put(':bookID')
  async editBook(@Param('bookID') bookID: string, @Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.editBook(Number(bookID), createBookDTO);
    if (!book) {
      throw new HttpException('O livro não existe!', 404);
    }
    return book;
  }

  // Delete a book from the db using a book id
  @Delete(':bookID')
  async deleteBook(@Param('bookID') bookID: string) {
    const books = await this.booksService.deleteBook(Number(bookID));
    if (!books) {
      throw new HttpException('O livro não existe!', 404);
    }
    return books;
  }
}
