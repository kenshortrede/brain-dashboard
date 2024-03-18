import React, { useState } from 'react';
import { Autocomplete, Chip, TextField, Button, CardContent, Typography, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { tagOptions } from 'src/constants/tags';

const NotesPage = () => {
    const [noteCategory, setNoteCategory] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteTags, setNoteTags] = useState([]);

    // Predefined list of tag options for autocomplete suggestions


    const handleSubmit = () => {
        console.log({
            noteCategory,
            noteTitle,
            noteContent,
            noteTags,
        });
        // Here you would typically send the note data to your backend or state management solution
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
                        options={tagOptions}
                        freeSolo
                        value={noteTags}
                        onChange={(event, newValue) => {
                            setNoteTags([...newValue]);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
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
        </CardContent>
    );
};

export default NotesPage;