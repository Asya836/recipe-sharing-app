import React from 'react';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function RecipeAddButton() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) return null;
    return (
        <div>
            <Tooltip title="Tarif Ekle">
                <Fab aria-label="add" onClick={() => navigate('/add-recipe')} sx={{ position: 'fixed', bottom: 16, right: 16, fontSize: '50px', backgroundColor: '#d38e8eff', color: 'white', '&:hover': { backgroundColor: '#b07979ff' } }}>
                    <IoMdAdd />
                </Fab>
            </Tooltip>
        </div>
    );
}

export default RecipeAddButton