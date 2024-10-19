import React from "react";
import BookCard from "./BookCard"; // Adjust the path accordingly
import { useGetBooksQuery } from "../services/booksApi"; // Adjust the path accordingly

function BookList() {
  const { data: books, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.book_name}
          image={book.book_image}
          onClick={() => {
            console.log(`Clicked on ${book.book_name}`);
          }}
        />
      ))}
    </div>
  );
}

export default BookList;
