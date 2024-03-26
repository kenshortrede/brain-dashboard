import React, { useEffect, useState } from 'react';
import { Autocomplete, Chip, TextField, Button, CardContent, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { tagOptions } from 'src/constants/tags';
import { INoteEntry, INoteSubmission } from 'src/lib/dbTypes';

const NotesPage = () => {
    const [noteCategory, setNoteCategory] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteTags, setNoteTags] = useState([]);
    const [user_id, setUser_id] = useState(1); // Assuming user ID is 1 for now

    // Predefined list of tag options for autocomplete suggestions
    const [tags, setTags] = useState([]); // State to store fetched tags

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: '',
        message: '',
    });

    useEffect(() => {
        // Function to fetch tags from the API
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/tags');
                if (!response.ok) throw new Error('Failed to fetch tags');
                const data = await response.json();
                console.log('Fetched tags:', data);
                setTags(data); // Update state with fetched tags
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleSubmit = async () => {
        console.log({
            noteCategory,
            noteTitle,
            noteContent,
            noteTags,
        });

        const existingTags = noteTags.filter(tag => typeof tag === 'object').map(tag => tag.id);
        const newTags = noteTags.filter(tag => typeof tag === 'string');

        const noteSubmissionData: INoteEntry = {
            tags: existingTags,
            note: {
                id: null,
                user_id: user_id,
                category: noteCategory as "Other" | "Personal" | "Work" | "Education",
                title: noteTitle,
                content: noteContent,
                created_at: null,
                updated_at: null
            }
        };

        const fullSubmissionData: INoteSubmission = {
            note: noteSubmissionData,
            newTags: newTags.length > 0 ? newTags : null
        }

        // Use fetch API to send a POST request to your API endpoint
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullSubmissionData),
            });

            if (response.ok) {
                // Handle success
                console.log('Note submitted successfully');
                // Reset form state
                setNoteCategory('');
                setNoteTitle('');
                setNoteContent('');
                setNoteTags([]);

                setDialogContent({
                    title: 'Note Submitted',
                    message: 'Your note has been submitted successfully!',
                }); setOpenDialog(true);


            } else {
                // Handle server errors
                console.error('Submission failed', await response.text());

                setDialogContent({
                    title: 'Submission Failed',
                    message: 'Failed to submit your note. Please try again.',
                });
                setOpenDialog(true);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error submitting note', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
                New Note
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={noteCategory}
                            label="Category"
                            onChange={(e) => setNoteCategory(e.target.value)}
                        >
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Learning">Learning</MenuItem>
                            <MenuItem value="Ideas">Ideas</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={tags}
                        getOptionLabel={(option) => option.tag || option}
                        freeSolo
                        value={noteTags}
                        onChange={(event, newValue) => {
                            setNoteTags(newValue);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={typeof option === 'object' ? option.tag : option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Tags"
                                placeholder="Add Tags"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' onClick={handleSubmit}>Save Note</Button>
                </Grid>
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

export default NotesPage;