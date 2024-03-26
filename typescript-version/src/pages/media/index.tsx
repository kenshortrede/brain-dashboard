// ** MUI Imports
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { IMedia } from 'src/lib/dbTypes';

const Media = () => {
    const [mediaType, setMediaType] = useState('');
    const [status, setStatus] = useState('');
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: '',
        message: '',
    });
    const [user_id, setUser_id] = useState(1); // Assuming user_id is 1 for now

    const handleSubmit = async () => {
        const mediaData: IMedia = {
            user_id: user_id,
            type: mediaType as 'Book' | 'Movie' | 'Video' | 'Podcast',
            status: status as 'Planned' | 'In Progress' | 'Completed',
            rating,
            title,
            author,
            comments,
            id: null,
            created_at: null,
            updated_at: null,
        };

        console.log("Submitting", mediaData);

        try {
            const response = await fetch('/api/media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mediaData),
            });

            if (response.ok) {
                // Handle success
                console.log("Media added successfully");
                // Optionally reset form fields here
                setMediaType('');
                setStatus('');
                setRating(5);
                setTitle('');
                setAuthor('');
                setComments('');
                // Show success message to user
                setDialogContent({ title: 'Success', message: 'Your daily entry has been submitted successfully!' });
                setOpenDialog(true);
            } else {
                // Handle server errors or invalid responses
                console.error("Failed to add media");
                // Show error message to user
                setDialogContent({ title: 'Error', message: 'Submission failed. Please try again.' });
                setOpenDialog(true);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error);
            // Show error message to user
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </CardContent>
    );
};

export default Media;