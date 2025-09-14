import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { IoMailOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import '../css/login-register.css'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginSchemas } from '../schema/LoginSchemas.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json();
            console.log('response.ok:', response.ok);
            console.log('response status:', response.status);
            console.log('response data:', data);
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.dispatchEvent(new Event('storage'));
                toast.success('Başarıyla giriş yapıldı!', { autoClose: 2000 });
                setTimeout(() => navigate('/'), 2000);
            } else {
                toast.error(data.message || data.error || 'Giriş başarısız!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Sunucuya bağlanırken hata oluştu!');
            console.error('Fetch error:', error);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchemas,
        onSubmit: submit
    });

    return (
        <div >
            <form onSubmit={handleSubmit} className='login-register-page'>
                <div style={{ position: 'absolute', top: 100, left: 280 }}>
                    <Button variant="outlined" startIcon={<IoArrowBackCircleOutline />} sx={{ fontSize: '15px', width: '140px', backgroundColor: '#d38e8eff', border: 'none', color: 'white', '&:hover': { backgroundColor: 'rgb(184, 130, 130)' } }} onClick={() => navigate('/')}>
                        Anasayfa
                    </Button>
                </div>
                <div>
                    <p className='title'>GİRİŞ YAP</p>
                </div>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 3 }}>
                        <IoMailOutline size={30} style={{ marginRight: 8, marginBottom: 4 }} />
                        <TextField
                            label="Email "
                            id='email'
                            value={values.email}
                            onChange={handleChange}
                            variant="standard"
                            sx={{ width: '300px', input: { color: 'black' }, '& .MuiInput-underline:before': { borderBottomColor: 'black' }, '& .MuiInput-underline:after': { borderBottomColor: 'black' } }}
                        />
                    </Box>
                    {errors.email && <p className='input-error'>{errors.email}</p>}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <IoKeyOutline size={30} style={{ marginRight: 8, marginBottom: 4 }} />
                        <TextField
                            label="Şifre"
                            type="password"
                            id='password'
                            value={values.password}
                            onChange={handleChange}
                            variant="standard"
                            sx={{ width: '300px', input: { color: 'black' }, '& .MuiInput-underline:before': { borderBottomColor: 'black' }, '& .MuiInput-underline:after': { borderBottomColor: 'black' } }}
                        />
                    </Box>
                    {errors.password && <p className='input-error'>{errors.password}</p>}
                </div>
                <div>
                    <Button
                        variant="outlined"
                        type='submit'
                        sx={{ fontSize: '16px', width: '160px', backgroundColor: '#55be8e', border: 'none', color: 'white', marginTop: 5, '&:hover': { backgroundColor: '#50ae84ff', border: 'none', color: 'white' } }}
                    >
                        Giriş Yap
                    </Button>
                </div>
                <div>
                    <p style={{ marginTop: '20px' }}>Hesabınız yok mu? <a href='/register'>Kayıt Ol</a></p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default LoginPage