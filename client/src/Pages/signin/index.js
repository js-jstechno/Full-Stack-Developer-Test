import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import "../pages.css"
import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'
const Index = () => {
  
  // const { t } = useTranslation()
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const showSuccessToast = () => {
    toast.success('Login Successfully', {
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
  const showDangerToast = () => {
    toast.warning('Network Error', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, e) => {
   
    // e.preventDefault(); 
   const PayLoadForm = {
    username:values?.username , 
    password:values?.password
   }
    try {
      const response = await axios.post('http://localhost:3000/login',  PayLoadForm);
      const token = response.data.data.token;
      const userId = response.data.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);   
      showSuccessToast()
      // window.location.href = '/MovieList';

      // navigate('/MovieList')
      setTimeout(() => {
        navigate('/MovieList'); // Replace '/ErrorPage' with the desired error page URL
      }, 1000)
    

    

    } catch (error) {
      console.log(error.response.data.message,"error==");
      if(error.statusCode === 404 ) {

        showDangerToast()
      }
      setError(error.response.data.message);
      console.error('Error during login:', error);
    }
      
    },
  });


  // const handleLogin = async (e) => {
  //   e.preventDefault(); 
 
  //   try {
  //     const response = await axios.post('http://localhost:3000/login', {
  //       username,
  //       password,
  //     });
  //     const token = response.data.data.token;
  //     const userId = response.data.data.userId;
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('userId', userId);   
  //     window.location.href = '/MovieList';
  //   } catch (error) {
  //     console.log(error.response.data.message,"error==");
  //     setError(error.response.data.message);
  //     console.error('Error during login:', error);
  //   }
  // };
  
  return (
    <div className='text-center text-white signMain '>
      <h1 className='my-5 loginHead'>
        Sign in
        </h1>
        {/* <h1>{t('welcome')}</h1> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <form onSubmit={handleLogin}> */}


      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="SignInput"
            placeholder="Email"
            defaultValue=""
            // value={username} onChange={(e) => setUsername(e.target.value)}  
            value={formik.values.username}
          onChange={formik.handleChange('username')}
          />
            {formik.touched.username && formik.errors.username && (
          <div className="error text-danger">{formik.errors.username}</div>
        )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="SignInput"
            placeholder="Password"
            defaultValue=""
            // value={password}
            // onChange={(e) => setPassword(e.target.value)} 
            value={formik.values.password}
            onChange={formik.handleChange('password')}
          />
          {/* <input type="password" class="SignInput" placeholder="Password" value="demo@123" autocomplete="current-password" /> */}
          {formik.touched.password && formik.errors.password && (
          <div className="error text-danger">{formik.errors.password}</div>
        )}
        </div>
        
        <div className="mb-3">
          <input
            type="text"
            // value={value}
            // checked={checked}
            className="SignInRadio"
            defaultValue=""
            style={{background:"#224957"}}
          />
          
          
          <span className='mx-2'>Remember me</span>
        </div>

        <button type="submit" className="text-white PageButton">
          Login
        </button>
      
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Index
