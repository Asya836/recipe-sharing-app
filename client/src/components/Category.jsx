import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Category({ selectedCategory, setSelectedCategory }) {
    const categories = [
        'Tüm Tarifler',
        'Sebze Yemekleri',
        'Et Yemekleri',
        'Çorbalar',
        'Hamur İşleri',
        'Tatlılar',
        'Kurabiyeler'
    ];

    return (
        <div style={{ margin: '20px', padding: '10px', border: 'none', boxShadow: '5px 5px 10px #b8b2b2ff', borderRadius: '8px', width: '250px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '22px', marginBottom: '30px' }}>Kategoriler</p>
            <FormGroup style={{ width: '150px' }}>
                {categories.map((cat) => (
                    <FormControlLabel
                        key={cat}
                        control={
                            <Checkbox
                                checked={selectedCategory === cat}
                                onChange={() => setSelectedCategory(cat)}
                                sx={{
                                    color: '#d38e8eff',
                                    '&.Mui-checked': {
                                        color: '#d38e8eff',
                                    },
                                }}
                            />
                        }
                        label={cat}
                    />
                ))}
            </FormGroup>
        </div>
    )
}

export default Category