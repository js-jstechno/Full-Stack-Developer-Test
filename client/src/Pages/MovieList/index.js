import React,{useState, useEffect} from 'react'
import "../pages.css" 
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import MovieSvg from '../../assets/svg/movieSvg';
import Logout from '../../assets/svg/Logout';
import { Link } from 'react-router-dom'

const Index = () => {
    const isMobileScreen = useMediaQuery({maxWidth: 768});
    const [cardData, SetcardData] = useState([]);
    // console.log(cardData, 'card')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Adjust as needed
    const totalPages = Math.ceil(cardData.length / itemsPerPage);
    // const baseUrl = 'http://localhost:3000' ; 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCardData = cardData.slice(startIndex, endIndex);
    useEffect(() => {
      // Function to fetch card data
      const fetchCardData = async () => {
        try {
          const authToken = localStorage.getItem('token');
          if(!authToken){
            window.location.href = '/signIn';
          }
          const response = await axios.get('http://localhost:3000/movies', {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
            }}); // Replace with your API endpoint
          SetcardData(response.data.data);
        } catch (error) {
          console.error('Error fetching card data:', error.message);
        }
      };
  
      // Call the fetch function
      fetchCardData();
    }, []);
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/signIn';
    };
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
  return (
    <div className="container pt-4 text-white px-4">
        <div className="row MovieHeading">
        <div className="col-md-6 d-flex align-items-center ">
          <h2 className="MovieTitle">My movies</h2>
          <Link to="/CreateMovie">
          <div className='MovietitleIcon mb-2'>
            <MovieSvg />
          </div>
          </Link>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <button className="btn text-white font-weight-bold" onClick={handleLogout}>Logout <Logout /></button>
        </div>
      </div>
      <div className="row py-5">
        <div className='d-flex flex-wrap justify-content-center'>
        {currentCardData && currentCardData?.map((card) => (
          <div key={card.id} className="m-2">
            <div className="movieCard ">
            <Link to={`/EditMovie/${card.id}`}>
              <img
                src={card?.image}
                className="cardImage img-fluid"
                alt={card.title}
              />
            </Link>
              <div className="CardDescMain">
            <Link to={`/EditMovie/${card.id}`}  className='text-decoration-none'>

                <h5 className="cardTitle">
                  {card.title}
                  </h5>
</Link>
                  
                <p className="cardDesc">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
            
        </div>
      </div>
      {isMobileScreen ? <></> : <div className="row text-center">
        <div className='d-flex justify-content-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='prePageNo'
        >
          {/* Previous <span className='pageButton'> {currentPage}</span> */}
          Previous 
        </button>


        {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={index + 1 === currentPage ? 'prePageNo' : 'prePageNo'}
        >
          {/* <span className='pageButton'>        {index + 1}</span> */}
          <span  className={index + 1 === currentPage ? 'pageButton' : 'prePageNo'} >        {index + 1}</span>
   
        </button>
      ))}





        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='prePageNo'
        >
       {/* <span className='prePageNo'>{totalPages} </span> */}
       Next
        </button>
      </div></div>}
      
    </div>
  )
}

export default Index
