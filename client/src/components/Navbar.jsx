import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../public/assets/logo.png';
import { IoSearch } from "react-icons/io5";
import { TextField, InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IoMdLogOut } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Navbar({ searchTerm, setSearchTerm }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
        checkLogin();
        window.addEventListener('storage', checkLogin);
        return () => window.removeEventListener('storage', checkLogin);
    }, []);

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.success('Başarıyla çıkış yapıldı!', { autoClose: 2000 });
        setTimeout(() => navigate('/login'), 2000);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#d38e8eff', boxShadow: 'none', height: 70, zIndex: 1300 }}>
                <Toolbar>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: 50, height: 50, marginRight: 20, cursor: 'pointer', marginLeft: '60px' }}
                        onClick={() => navigate('/')}
                    />
                    <Typography sx={{ marginRight: '750px', fontSize: '37px', cursor: 'pointer' }} onClick={() => navigate('/')}
                    >
                        Tarifly
                    </Typography>
                    <TextField
                        placeholder="Tarif Ara"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoSearch style={{ color: '#ceccccff', fontSize: 20 }} />
                                </InputAdornment>
                            ),
                            style: { backgroundColor: '#f5f0f0ff', borderRadius: 6, height: 36, width: 350 }
                        }}
                        sx={{ flexGrow: 1 }}
                    />

                    {isLoggedIn ? (
                        <>
                            <Button sx={{ color: 'white', minWidth: 0, fontSize: '40px', marginRight: 1 }} onClick={() => navigate('/profile')}>
                                <IoPersonCircleSharp />
                            </Button>
                            <Button sx={{ color: 'white', minWidth: 0, fontSize: '40px' }} onClick={handleLogout}>
                                <IoMdLogOut />
                            </Button>
                        </>
                    ) : (
                        <Button sx={{ color: 'white', fontSize: '15px', width: '142px' }} onClick={() => navigate('/login')}>Giriş Yap/ Kayıt Ol</Button>
                    )}
                </Toolbar>
            </AppBar>
            <ToastContainer />
        </Box>
    );
}
