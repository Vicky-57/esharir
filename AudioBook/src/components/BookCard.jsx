
function BookCard({ title, author, description, image, onClick }) {
  return (
    <div
      className="group bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative"
      onClick={onClick}
    >
      <img className="w-full h-72 object-cover group-hover:blur-[6px] transition duration-500 group-hover:ease-in-out " src={image} alt={title} />
      <div className='card-body text-white absolute top-0 pt-24 pl-5'>
        <h1 className='text-6xl font-bold mb-20 transition duration-500 opacity-0 group-hover:opacity-100 group-hover:ease-in-out'>{title}</h1>
        <p className='text-3xl font-semibold'>{title}</p>
      </div>
        
    </div>
  );
}

export default BookCard;
