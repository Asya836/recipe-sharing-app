import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import '../css/login-register.css'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { RegisterSchemas } from '../schema/RegisterSchemas.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegisterPage() {
    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Başarıyla kayıt olundu!', { autoClose: 2000 });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(data.message || 'Kayıt başarısız!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Sunucuya bağlanırken hata oluştu!');
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validationSchema: RegisterSchemas,
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
                    <p className='title'>KAYIT OL</p>
                </div>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 3 }}>
                        <IoMailOutline size={30} style={{ marginRight: 8, marginBottom: 4 }} />
                        <TextField
                            label="Email"
                            variant="standard"
                            id='email'
                            value={values.email}
                            onChange={handleChange}
                            sx={{ width: '300px', input: { color: 'black' }, '& .MuiInput-underline:before': { borderBottomColor: 'black' }, '& .MuiInput-underline:after': { borderBottomColor: 'black' } }}
                        />
                    </Box>
                    {errors.email && <p className='input-error'>{errors.email}</p>}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 3 }}>
                        <IoPersonCircleOutline size={30} style={{ marginRight: 8, marginBottom: 4 }} />
                        <TextField
                            label="Kullanıcı Adı"
                            variant="standard"
                            id='username'
                            value={values.username}
                            onChange={handleChange}
                            sx={{ width: '300px', input: { color: 'black' }, '& .MuiInput-underline:before': { borderBottomColor: 'black' }, '& .MuiInput-underline:after': { borderBottomColor: 'black' } }}
                        />
                    </Box>
                    {errors.username && <p className='input-error'>{errors.username}</p>}
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
                        sx={{ fontSize: '16px', width: '160px', backgroundColor: '#df5d4fff', border: 'none', color: 'white', marginTop: 5, '&:hover': { backgroundColor: '#cd594cff', border: 'none', color: 'white' } }}
                    >
                        Kayıt Ol
                    </Button>
                </div>
                <div>
                    <p style={{ marginTop: '20px' }}>Zaten hesabınız var mı? <a href='/login'>Giriş Yap</a></p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage