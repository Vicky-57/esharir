import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function AshtangSamgraha() {
  const chapters = [
    {name: "पुत्रकामीयः"},
    {name: "गर्भावक्रान्तिः"},
    {name: "गर्भोपचरणीयः"},
    {name: "गर्भव्यापदः"},
    {name: "अङ्गविभागः"},
    {name: "सिराविभागः"},
    {name: "मर्मविभागः"},
    {name: "प्रकृतिभेदीयः"},
    {name: "विकृतिविज्ञानीयः"},
    {name: "विकृतेहाविज्ञानीयः"},
    {name: "विकृतव्याधिविज्ञानीयः"},
    {name: "दूतादिविज्ञानीयः"},
  ]

  const navigate = useNavigate();

  const handleChapterClick = (chapterNumber) => {
    navigate(`/ashtang-samgraha/chapter/${chapterNumber}`);
  };

  return (
    <div className='bg-ashtangBg bg-no-repeat overflow-hidden bg-cover h-screen w-screen'>
      <Navbar />
      <div className=" mx-auto p-4">
        <div className="w-full h-96">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src="\Ashtangs.png"
            alt="Ashtang Samgraha"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {chapters.map((chapter, index) => (
            <div
              name={chapter}
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleChapterClick(index + 1)}
            >
              <p className="text-center">{chapter.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AshtangSamgraha;
