import React, { useState, useRef , useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import "../pages.css"
import { useMediaQuery } from 'react-responsive'
import DownLoad from '../../assets/svg/DownLoad';
import axios from 'axios';


const Index = () => {
  const [base64Image, setBase64Image] = useState(null);  
  const [cardData, setCardData] = useState({
    cardTitle: '',
    cardYear: '',
  });
  const onDrop = useCallback(async (acceptedFiles) => {
    // Assuming you want to upload only the first file
    const file = acceptedFiles[0];

    // Make API call using axios
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Adjust the API endpoint URL accordingly
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the API response
      setBase64Image(response.data.imagePath)
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error uploading image:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    multiple: false,    // Allow only one file to be dropped
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

 
      const isMobileScreen = useMediaQuery({maxWidth: 768});
      const fileInputRef = useRef(null)
      const handleDivClick = () => {
        // fileInputRef.current.click()
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Assuming your API endpoint is at http://example.com/api/cards
          // console.log(cardData,"cardData,base64Image");
          // console.log(base64Image,"base64Image");
          
      const UserId = localStorage.getItem('userId');  
          const PayLoadData = {
          image: base64Image,
          title: cardData.cardTitle,
          description : cardData.cardYear,
          userId: UserId
          }
          console.log(PayLoadData,"PayLoadData");
          const authToken = localStorage.getItem('token');
          if(!authToken){
            window.location.href = '/signIn';
          }
          const response = await axios.post('http://localhost:3000/movies', PayLoadData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
            },
          });
          if( response.data){
          window.location.href = '/MovieList'}
        } catch (error) {
          // Handle errors
          console.error('Error sending card data:', error.message);
        }
      };
  return (<>
    {
        isMobileScreen ? <>
        <div className="container pt-4 text-white px-4">
        <div className="row ">
        <div className="col-12 my-3">
          <h2 className="">Create a new movie </h2>
        </div>
        <div className="my-3 col-md-12 px-3">
              <input
                type="text"
                className="cardTitleInput"
                placeholder="Title"
                name="cardTitle"
          value={cardData.cardTitle}
          onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-12 px-3">
              <input
                type="text"
                className="cardYearInput"
                placeholder="Publishing year"
                defaultValue=""
                name="cardYear"
                value={cardData.cardYear}
                onChange={handleChange}
              />
            </div>
      </div>
      <div className="row py-2 ">
        <div className=''>
            
        <div className=" d-flex justify-content-center align-items-center dropMainMobile" >
       <div className="cursor-pointer"  onClick={handleDivClick} >
       <div {...getRootProps()}>
       <input {...getInputProps()} />
       <div className='d-flex justify-content-center'>
        <DownLoad/>
        </div>
       <h3 className="text-white">Drop an image here</h3>
      </div>
       </div>
          </div>
          <div>
     
            <div className="col-md-12 px-4 d-flex mt-5">
                <button className='text-white  MovieCancelButton'>
                    Cancel
                </button>
                <button className='text-white MovieButton mx-2 '>
                    Submit
                </button>
            </div>
        </div>
          </div>
      </div>
    </div></>: <div className="container pt-4 text-white px-4">
        <div className="row ">
        <div className="col-md-6">
          <h2 className="MovieHeading">Create a new movie </h2>
        </div>
      </div>
      <div className="row py-5 ">
        <form onSubmit={handleSubmit}>
        <div className='d-flex'>
            
      <div className=" d-flex justify-content-center align-items-center dropMain" >
       <div className="cursor-pointer"  onClick={handleDivClick} >
       <div {...getRootProps()}>
       <input {...getInputProps()} />
       <div className='d-flex justify-content-center'>
        <DownLoad/>
        </div>
       <h3 className="text-white">Drop an image here</h3>
      </div>
       </div>
          </div>
          <div className='movieSecond'>
          <div className="mb-3 col-md-6 px-4">
              <input
                type="text"
                className="cardTitleInput"
                placeholder="Title"
                defaultValue=""
                
                name="cardTitle"
          value={cardData.cardTitle}
          onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 px-4">
              <input
                type="text"
                className="cardYearInput"
                placeholder="Publishing year"
                defaultValue=""
                name="cardYear"
                value={cardData.cardYear}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 px-4 d-flex mt-5">
                <button type='submit' className='text-white  MovieCancelButton'>
                    Cancel
                </button>
                <button className='text-white MovieButton mx-2 '>
                    Submit
                </button>
            </div>
        </div>
          </div>
          </form>
      </div>
    </div>
    }
    </>
  )
}
// const dropzoneStyle = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

export default Index
