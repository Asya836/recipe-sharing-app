import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function RecipeCard({ name, category, image, ingredients, instructions, username, showUsername = true, _id }) {
    const onAction = typeof arguments[0]?.onAction === 'function' ? arguments[0].onAction : undefined;
    const currentUser = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const isOwnRecipe = currentUser === username;

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    return (
        <Card sx={{ width: 250, borderRadius: 5, boxShadow: 3, m: 2, position: 'relative' }}>
            {showUsername && username && (
                <div style={{ position: 'absolute', top: 9, right: 5, background: '#fff8', padding: '4px 10px', borderRadius: '12px', fontSize: '0.80em', zIndex: 2 }}>
                    @{username}
                </div>
            )}
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={handleClickOpen('paper')} sx={{ m: 1, color: '#d38e8eff' }}>Detaylar</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" >Tarif Detayları</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Typography variant="subtitle1" color="black" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Tarif İsmi: {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Kategori: {category}
                    </Typography>
                    <Typography variant="h6">Malzemeler</Typography>
                    <ul>
                        {ingredients && ingredients.map((item, idx) => (
                            <li style={{ padding: '5px' }} key={idx}>{item}</li>
                        ))}
                    </ul>
                    <Typography variant="h6" sx={{ mt: 2 }}>Yapılışı</Typography>
                    <ol>
                        {instructions && instructions.map((step, idx) => (
                            <li style={{ padding: '7px' }} key={idx}>{step}</li>
                        ))}
                    </ol>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
