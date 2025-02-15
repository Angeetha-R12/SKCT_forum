import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email,
          password,
        });

        const { accessToken, role } = response.data;

        // Store token and role in localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('role', role);
        console.log("token:",localStorage.getItem("token"));
        // Redirect based on role
        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/users');
        }
      } catch (error) {
        console.error(error);
        setError('Invalid email or password');
      }
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
          <h1 style={{ color: 'black', marginBottom: '1.5rem', fontSize: '2rem' }}>Login</h1>
          <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email Address</label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
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
                type="password"
                {...formik.getFieldProps('password')}
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
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
              Login
            </button>
          </form>
          <p style={{ marginTop: '1rem', color: 'black' }}>Don't have an account? <a href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
