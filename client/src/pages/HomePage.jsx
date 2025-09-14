import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import '../css/home.css';
import Category from '../components/Category';
import RecipeAddButton from '../components/RecipeAddButton';

function HomePage({ searchTerm }) {
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tüm Tarifler');

    useEffect(() => {
        fetch('http://localhost:5000/recipe')
            .then(res => res.json())
            .then(data => {
                const mapped = data.map(recipe => ({
                    name: recipe.title,
                    category: recipe.category || '',
                    image: recipe.image,
                    ingredients: recipe.ingredients,
                    instructions: recipe.steps,
                    username: recipe.author?.username || '',
                    likeCount: recipe.likeCount || 0,
                    saveCount: recipe.saveCount || 0,
                    _id: recipe._id
                }));
                setRecipes(mapped);
            });
    }, []);

    const filteredRecipes = recipes.filter(recipe => {
        const categoryMatch = selectedCategory === 'Tüm Tarifler' || (recipe.category && recipe.category === selectedCategory);
        const searchMatch = !searchTerm || (recipe.name && recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return categoryMatch && searchMatch;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginLeft: '40px', position: 'sticky', top: '170px', height: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <div style={{ marginTop: '30px' }}>
                    <RecipeAddButton />
                </div>
            </div>
            <div style={{ flex: 1, marginLeft: '50px', marginTop: '50px', marginBottom: '50px' }}>
                <h1 style={{ marginBottom: '30px' }}>Tüm Tarifler</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                    {filteredRecipes.map((recipe, idx) => (
                        <RecipeCard
                            key={recipe._id || idx}
                            name={recipe.name}
                            category={recipe.category}
                            image={recipe.image}
                            ingredients={recipe.ingredients}
                            instructions={recipe.instructions}
                            username={recipe.username}
                            likeCount={recipe.likeCount || 0}
                            saveCount={recipe.saveCount || 0}
                            _id={recipe._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;