import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi"; // Ensure you have this API set up
import BookCard from "./BookCard";
import Navbar from "./Navbar";
import Slider from "./Slider";

function Home() {
  const navigate = useNavigate();
  const { data: books = [], error, isLoading } = useGetBooksQuery(); // Fetch books

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching books:", error);
    return <div>Error fetching books</div>;
  }

const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}/chapters`);
  };

  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-3 text-center">Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-8">
          {books.map((book) => {
            return (
              <BookCard
                key={book.id}
                title={book.book_name}
                author="Ayurveda" // Replace with actual author if available
                description="Ayurvedic Shloks Book along with Audio" // Replace as needed
                image={book.book_image}
                onClick={() => handleBookClick(`${book.id}`)} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
