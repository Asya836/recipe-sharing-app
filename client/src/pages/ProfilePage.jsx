import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { IoPersonCircleSharp } from "react-icons/io5";
import '../css/profile.css'
import { Button } from '@mui/material';
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ username: '', email: '' });
    const [recipes, setRecipes] = useState([]);
    const [recipesLoading, setRecipesLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        fetch('http://localhost:5000/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setForm({ username: data.user.username, email: data.user.email });
                setLoading(false);
                fetch(`http://localhost:5000/recipe/user/${data.user._id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(recipeData => {
                        const mapped = (recipeData.recipes || []).map(recipe => ({
                            ...recipe,
                            username: recipe.author?.username || ''
                        }));
                        setRecipes(mapped);
                        setRecipesLoading(false);
                    })
                    .catch(() => setRecipesLoading(false));
            })
            .catch(() => setLoading(false));
    }, [location]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!user) return <div>Giriş yapmadınız.</div>;

    const handleRecipeEdit = (recipe) => {
        navigate(`/recipe-add/${recipe._id}`);
    };

    const handleRecipeDelete = async (recipeId) => {
        if (window.confirm('Tarifi silmek istediğinize emin misiniz?')) {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/recipe/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                setRecipes(recipes.filter(r => r._id !== recipeId));
                toast.success('Tarif silindi!', { autoClose: 1500 });
            } else {
                toast.error('Silme işlemi başarısız!');
            }
        }
    };

    const handleEdit = () => setEditMode(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUserUpdate = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/auth/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: form.username, email: form.email })
        });
        const data = await res.json();
        if (res.ok) {
            setUser(data.user);
            setEditMode(false);
            toast.success('Kullanıcı bilgileri güncellendi!', { autoClose: 1500 });
        } else {
            toast.error(data.error || 'Güncelleme başarısız!');
        }
    };



    return (
        <div>
            <div className='profile-container'>
                <div style={{ marginRight: '50px' }}>
                    <IoPersonCircleSharp style={{ fontSize: '250px', color: '#e2ababff' }} />
                </div>
                <div className='profile-details'>
                    <div className='profile-info'>
                        Kullanıcı Adı: {editMode ? (
                            <input type='text' name='username' value={form.username} onChange={handleChange} />
                        ) : (
                            user.username
                        )}
                    </div>
                    <div className='profile-info'>
                        Email: {editMode ? (
                            <input type='email' name='email' value={form.email} onChange={handleChange} />
                        ) : (
                            user.email
                        )}
                    </div>
                    <div className='profile-edit-buttons'>
                        {!editMode && (
                            <BsPencilSquare title='Düzenle' style={{ fontSize: '30px', color: '#64cd33ff', cursor: 'pointer' }} onClick={handleEdit} />
                        )}
                        {editMode && (
                            <IoCheckmarkCircleOutline
                                title='Onayla'
                                style={{ fontSize: '30px', cursor: 'pointer', color: '#64cd33ff' }}
                                onClick={handleUserUpdate}
                            />
                        )}
                        <MdOutlineDelete
                            title='Sil'
                            style={{ fontSize: '30px', color: '#d91a1aff', cursor: 'pointer' }}
                            onClick={async () => {
                                if (window.confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
                                    const token = localStorage.getItem('token');
                                    const res = await fetch('http://localhost:5000/auth/delete', {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${token}`,
                                            'Content-Type': 'application/json'
                                        }
                                    });
                                    if (res.ok) {
                                        localStorage.removeItem('token');
                                        window.dispatchEvent(new Event('storage'));
                                        navigate('/');
                                    } else {
                                        const data = await res.json();
                                        alert(data.error || 'Silme işlemi başarısız!');
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <h1>Tariflerim</h1>
                {recipesLoading ? (
                    <div>Tarifler yükleniyor...</div>
                ) : recipes.length === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Tarif yok</div>
                ) : (
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '20px',
                        width: '60%', marginTop: '20px', marginLeft: '310px', marginBottom: '50px', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {recipes.map((recipe) => (
                            <div key={recipe._id} style={{ position: 'relative' }}>
                                <RecipeCard
                                    name={recipe.title}
                                    category={recipe.category}
                                    image={recipe.image}
                                    ingredients={recipe.ingredients}
                                    instructions={recipe.instructions || recipe.steps}
                                    username={recipe.username}
                                    showUsername={false}
                                    likeCount={recipe.likeCount || 0}
                                    saveCount={recipe.saveCount || 0}
                                    _id={recipe._id}
                                />
                                <div style={{ display: 'flex', gap: '10px', position: 'absolute', top: 20, right: 25 }}>
                                    <Button variant="contained" color="success" size="small" onClick={() => handleRecipeEdit(recipe)}>
                                        Düzenle
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleRecipeDelete(recipe._id)}>
                                        Sil
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfilePage