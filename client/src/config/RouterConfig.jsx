import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import RecipeAddPage from '../pages/RecipeAddPage';
import LikeRecipePage from '../pages/LikeRecipePage';
import SaveRecipesPage from '../pages/SaveRecipesPage';


function RouterConfig({ searchTerm, setSearchTerm }) {
    return (
        <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-recipe" element={<RecipeAddPage />} />
            <Route path="/recipe-add/:id" element={<RecipeAddPage />} />
            <Route path="/liked-recipes" element={<LikeRecipePage />} />
            <Route path="/saved-recipes" element={<SaveRecipesPage />} />
        </Routes>
    )
}

export default RouterConfig