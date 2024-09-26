import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // In order to serve static content for a SPA, we can use the ServeStaticModule to hook up VueJS
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/public/'),
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
