import React, { useState, useRef , useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import "../pages.css"
import { useMediaQuery } from 'react-responsive'
import DownLoad from '../../assets/svg/DownLoad';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const { id } = useParams();

  const isMobileScreen = useMediaQuery({maxWidth: 768})
  const navigate = useNavigate()
  // const [base64Image, setBase64Image] = useState();
  const [cardData, setCardData] = useState({
    id:"",
    title: '',
    year: '',
    image:''
  });
  const [userUploadImg , setUserUploadImg] = useState(null)
  const showSuccessToast = () => {
    toast.success('Update Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const baseUrl = 'http://localhost:3000' ; 
  // const ImageUrl = baseUrl+cardData?.image
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCardData(data.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [id]);
  useEffect(() => {
  }, [cardData]);
  console.log(cardData, "cardData1");
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
      setCardData({image: baseUrl + response.data.imagePath})
      setUserUploadImg(baseUrl + response?.data?.imagePath)
      // setBase64Image(response.data.imagePath)
     
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
  console.log(cardData.image, 'cardData.image')
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
          const UserId = localStorage.getItem('userId');  
          const PayLoadData = {
          image: cardData.image,
          // image: ImageUrl,
          title: cardData.title,
          description : cardData.year,
          userId: UserId
          }
          console.log(PayLoadData,"PayLoadData");
          const authToken = localStorage.getItem('token');
          if(!authToken){
            window.location.href = '/signIn';
          }
        
          const response = await axios.patch(`http://localhost:3000/movies/${id}`, PayLoadData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json', 
            },
          });
          console.log( response.data," response.data");
          if( response.data){
            showSuccessToast()

            setTimeout(() => {
              navigate('/MovieList'); // Replace '/ErrorPage' with the desired error page URL
            }, 1000)
          // window.location.href = '/MovieList'
        }
          // console.log('Card data sent successfully:', response.data);
        } catch (error) {
          console.error('Error sending card data:', error.message);
        }
      };

  return (<>
    {
        isMobileScreen ? <>
        <div className="container pt-4 text-white px-4">
        <div className="row ">
        <div className="col-12 my-3">
          <h2 className="">Edit </h2>
        </div>
        <div className="my-3 col-md-12 px-3">
              <input
                type="text"
                className="cardTitleInput"
                placeholder="Title"
                name="cardTitle"
          value={cardData.cardTitle}
          onChange={handleChange}
          defaultValue={cardData.cardTitle}
              />
            </div>
            <div className="mb-3 col-md-12 px-3">
              <input
                type="text"
                className="cardYearInput"
                placeholder="Publishing year"
                name="cardYear"
                value={cardData.cardYear}
                defaultValue={cardData.cardYear}
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
                <button className='text-white  MovieCancelButton' onClick={()=>{navigate('/MovieList')}} >
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
          <h2 className="MovieHeading">Edit </h2>
        </div>
      </div>
      <div className="row py-5 ">
        <form onSubmit={handleSubmit}>
        <div className='d-flex'>
            
      <div className=" d-flex justify-content-center align-items-center dropMain" >
      {
        cardData?.image &&  <div  className='dropMainUploadImage m-4'>
        <img src={userUploadImg === null  ?  cardData.image :userUploadImg } className='img-fluid w-25 h-25' alt='img' />
         
      </div>
      }
       <div className="cursor-pointer"  onClick={handleDivClick} >
       <div {...getRootProps()}>
       <input {...getInputProps()} defaultValue={cardData.image} />
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
                defaultValue={cardData.title}
                value={cardData.title}
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 px-4">
              <input
                type="text"
                className="cardYearInput"
                placeholder="Publishing year"
                defaultValue={cardData.year}
                name="year"
                value={cardData.year}
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
      <ToastContainer/>
    </div>
    }
    </>
  )
}

export default Index
