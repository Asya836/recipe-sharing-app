import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/recipeAdd.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecipeAddPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const editMode = !!id;
    const [recipe, setRecipe] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Sebze Yemekleri");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (editMode && id) {
            setLoading(true);
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5000/recipe/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRecipe(data.recipe);
                    setTitle(data.recipe.title || "");
                    setCategory(data.recipe.category || "Sebze Yemekleri");
                    setIngredients(Array.isArray(data.recipe.ingredients) ? data.recipe.ingredients.join('\n') : (data.recipe.ingredients || ""));
                    setSteps(Array.isArray(data.recipe.instructions) ? data.recipe.instructions.join('\n') : (data.recipe.instructions || data.recipe.steps || ""));
                    setLoading(false);
                });
        }
    }, [editMode, id]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!title || !ingredients || !steps) {
            toast.error('Lütfen tüm alanları doldurun!');
            return;
        }
        const ingredientsArr = typeof ingredients === 'string' ? ingredients.split('\n') : ingredients;
        const stepsArr = typeof steps === 'string' ? steps.split('\n') : steps;

        let finalImageUrl = imageUrl;
        if (!editMode && imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            try {
                const res = await fetch('http://localhost:5000/recipe/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (res.ok && data.imageUrl) {
                    finalImageUrl = data.imageUrl;
                } else {
                    toast.error(data.error || 'Resim yüklenemedi!');
                    return;
                }
            } catch (err) {
                toast.error('Resim yüklenemedi!');
                return;
            }
        }

        if (editMode && id) {
            const response = await fetch(`http://localhost:5000/recipe/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    category,
                    ingredients: ingredientsArr,
                    steps: stepsArr,
                    image: finalImageUrl
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Tarif güncellendi!', { autoClose: 1500 });
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                toast.error(data.error || 'Tarif güncellenemedi!');
            }
        } else {
            const response = await fetch('http://localhost:5000/recipe/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description: '',
                    category,
                    ingredients: ingredientsArr,
                    steps: stepsArr,
                    image: finalImageUrl
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Tarif eklendi!', { autoClose: 1500 });
                setTimeout(() => navigate('/'), 1500);
            } else {
                toast.error(data.error || 'Tarif eklenemedi!');
            }
        }
    };

    if (editMode && loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Tarif verileri yükleniyor...</div>;
    }

    return (
        <div style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
            <div className='container'>
                <div>
                    <p className='baslik'>{editMode ? 'Tarifi Düzenle' : 'Yeni Tarif Ekle'}</p>
                </div>
                <div className='formDiv'>
                    <div className='left'>
                        <div className='form' style={{ marginBottom: '90px' }}>
                            <p style={{ marginRight: '60px' }}>Tarif Adı:</p>
                            <TextField id="outlined-basic" variant="outlined" required value={title} onChange={e => setTitle(e.target.value)} sx={{ minHeight: 32, '.MuiInputBase-input': { padding: '6px 10px', fontSize: '1rem' } }} />
                        </div>
                        <div className='form' style={{ marginBottom: '90px' }}>
                            <p style={{ marginRight: '60px' }}>Kategori:</p>
                            <Box >
                                <FormControl sx={{ width: 150 }}>
                                    <NativeSelect
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        <option value="Sebze Yemekleri">Sebze Yemekleri</option>
                                        <option value="Et Yemekleri">Et Yemekleri</option>
                                        <option value="Çorbalar">Çorbalar</option>
                                        <option value="Hamur İşleri">Hamur İşleri</option>
                                        <option value="Tatlılar">Tatlılar</option>
                                        <option value="Kurabiyeler">Kurabiyeler</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='form'>
                            <p>Resim Yükle:</p>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='form' style={{ marginBottom: '20px' }}>
                            <p>Malzemeler:</p>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                required
                                value={ingredients}
                                onChange={e => setIngredients(e.target.value)}
                                placeholder="Her malzemeyi yeni satıra yazın"
                            />
                        </div>
                        <div className='form'>
                            <p style={{ marginRight: '60px' }}>Yapılışı:</p>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                required
                                value={steps}
                                onChange={e => setSteps(e.target.value)}
                                placeholder="Her adımı yeni satıra yazın"
                            />
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <Button variant="contained" sx={{ marginRight: '20px', color: 'white', backgroundColor: 'green', fontSize: '15px' }} onClick={handleSave}>Kaydet</Button>
                    <Button variant="contained" onClick={() => navigate(editMode ? '/profile' : '/')} sx={{ color: 'white', backgroundColor: 'red', fontSize: '15px' }}>İptal</Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
export default RecipeAddPage;