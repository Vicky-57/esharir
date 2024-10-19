import { useNavigate } from "react-router-dom";
import { useGetChaptersQuery } from "../services/chapterApi";
import Navbar from "./Navbar";

function Chapter() {
  const { data: chapters = [], error, isLoading } = useGetChaptersQuery();
  const navigate = useNavigate();

  const handleChapterClick = (chapterNumber) => {
    navigate(`/sushrut-samhita/chapter/${chapterNumber}`);
  };

  // Base URL for the image paths

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching chapters:", error);
    return (
      <div>
        <h2>Error fetching chapters</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="bg-ashtangBg bg-no-repeat overflow-hidden bg-cover h-screen w-screen">
      <Navbar />
      <div className="mx-auto p-4">
        <div className="w-full h-96">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src="/Sushrut.png"
            alt="Sushrut Samhita"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleChapterClick(chapter.chapter_number)}
            >
              <p className="text-center font-semibold text-lg">
                {chapter.chapter_name}
              </p>
              <img
                className="w-full h-32 object-cover mt-2 rounded-lg"
                // Prepend the base URL to the relative path for the chapter image
                src={chapter.chapter_image}
                alt={chapter.chapter_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chapter;
