import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RegisterUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    roles: 'USER',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        userData
      );
      console.log(response.data);
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      setUserData({
        ...userData,
        name: values.name,
        email: values.email,
        password: values.password,
      });
      handleSubmit(event);
    },
  });

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}>
          <h1 style={{ color: 'black', marginBottom: '1.5rem', fontSize: '2rem' }}>Register</h1>
          <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                {...formik.getFieldProps('name')}
                onChange={(event) => {
                  formik.handleChange(event);
                  setUserData({ ...userData, name: event.target.value });
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem',
                }}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.name}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps('email')}
                onChange={(event) => {
                  formik.handleChange(event);
                  setUserData({ ...userData, email: event.target.value });
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem',
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps('password')}
                onChange={(event) => {
                  formik.handleChange(event);
                  setUserData({ ...userData, password: event.target.value });
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem',
                }}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.password}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem',
                }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
              marginBottom: '1rem',
            }}>
              Register
            </button>
          </form>
          <p style={{ marginTop: '1rem', color: 'black' }}>Already have an account? <a href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
