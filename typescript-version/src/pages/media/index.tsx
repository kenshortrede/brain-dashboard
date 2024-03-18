// ** MUI Imports
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, CardContent, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';

const Media = () => {
    const [mediaType, setMediaType] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = () => {
        console.log("Submit", { mediaType, status, rating, title, author, comments });
    };

    return (
        <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Add New Media
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={mediaType}
                            label="Type"
                            onChange={(e) => setMediaType(e.target.value)}
                        >
                            {['Book', 'Movie', 'Video', 'Podcast'].map((type) => (
                                <MenuItem value={type} key={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {['Planned', 'In Progress', 'Completed'].map((status) => (
                                <MenuItem value={status} key={status}>{status}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom>Rating (1-10)</Typography>
                    <Slider
                        aria-label="Rating"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Author"
                        variant="outlined"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Comments"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Submit</Button>
            </Grid>
        </CardContent>
    );
};

export default Media;