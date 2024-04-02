import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, IconButton, Box, CircularProgress, Chip, Modal, Autocomplete, TextField } from '@mui/material';
import { ArrowLeftBold, ArrowRightBold } from 'mdi-material-ui';
import Fade from '@mui/material/Fade';

const ReadQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(true);

    const [tagModalOpen, setTagModalOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const [availableTags, setAvailableTags] = useState([]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }

    useEffect(() => {
        // Fetch all the quotes
        fetch('/api/quotes')
            .then((res) => res.json())
            .then((data) => {
                const shuffledQuotes = data.sort(() => 0.5 - Math.random());
                setQuotes(shuffledQuotes);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching quotes:', error);
                setLoading(false);
            });

        // Fetch all the tags - This will allow us to add tags to the quotes if we want to
        fetch('/api/tags')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched tags:', data);
                setTags(data);

                // const availableTagsTmp = tags.filter(tag => tag.category !== "Author" && !quotes[currentQuoteIndex].tags.split(', ').includes(tag.tag));
                // console.log('Available tags:', availableTagsTmp);
                // setAvailableTags(availableTagsTmp);
                console.log(quotes[currentQuoteIndex]);
            })
            .catch((error) => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    useEffect(() => {
        // Ensure tags and currentQuoteIndex are defined and quotes array is not empty
        if (tags.length > 0 && quotes.length > 0 && currentQuoteIndex < quotes.length) {
            const currentTags = quotes[currentQuoteIndex].tags ? quotes[currentQuoteIndex].tags.split(', ') : [];
            const availableTagsTmp = tags.filter(tag => tag.category !== "Author" && !currentTags.includes(tag.tag));
            setAvailableTags(availableTagsTmp);
        }
    }, [tags, quotes, currentQuoteIndex]); // Recalculate availableTags when tags, quotes, or currentQuoteIndex change

    const handleChangeQuote = (direction) => {
        setFade(false);
        setTimeout(() => {
            if (direction === 'next') {
                handleNextQuote();
            } else {
                handlePrevQuote();
            }
            setFade(true);
        }, 500);
    };

    const handlePrevQuote = () => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    };

    const handleNextQuote = () => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    const handleOpenTagModal = () => setTagModalOpen(true);
    // const handleCloseTagModal = () => setTagModalOpen(false);

    const handleCloseTagModal = async () => {
        // Close the modal first
        setTagModalOpen(false);

        // Prepare the data to be sent
        const dataToSend = {
            quoteId: quotes[currentQuoteIndex].id,
            tagIds: selectedTags.map(tag => tag.id) // Assuming each tag object has an 'id' property
        };

        try {
            // Make a POST request to your API endpoint
            const response = await fetch('/api/quotes/linkTags', { // Updated endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response data here
            const data = await response.json();
            console.log('Success:', data);

            // Optionally, clear the selected tags after successful linking
            setSelectedTags([]);

            // Add the tag to the current quote
            // After successful linking
            const newTagsString = selectedTags.map(tag => tag.tag).join(", ");
            const updatedQuote = {
                ...quotes[currentQuoteIndex],
                tags: quotes[currentQuoteIndex].tags ? `${quotes[currentQuoteIndex].tags}, ${newTagsString}` : newTagsString
            };
            const updatedQuotes = [...quotes];
            updatedQuotes[currentQuoteIndex] = updatedQuote;
            setQuotes(updatedQuotes);
            setSelectedTags([]); // Clear selected tags

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3, boxShadow: 3 }}>
            <CardContent>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : quotes.length > 0 ? (
                    <Fade in={fade} timeout={500}>
                        <Box>
                            <Typography gutterBottom variant="h6" component="div" sx={{ mb: 2, fontStyle: 'italic' }}>
                                "{quotes[currentQuoteIndex].content}"
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', mb: 2 }}>
                                — {quotes[currentQuoteIndex].author || "Unknown"}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                                {quotes[currentQuoteIndex].tags.split(', ')
                                    .filter(tag => tag !== quotes[currentQuoteIndex].author) // Filter out the author from the tags
                                    .map((tag, index) => (
                                        <Chip key={index} label={tag} size="small" variant="outlined" />
                                    ))}
                            </Box>
                            <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center' }}>
                                {currentQuoteIndex + 1} of {quotes.length}
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    <Typography>No quotes found.</Typography>
                )}
            </CardContent>
            {quotes.length > 0 && (
                <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton onClick={() => handleChangeQuote('prev')} aria-label="previous quote" disabled={loading}>
                        <ArrowLeftBold />
                    </IconButton>
                    <Button onClick={handleOpenTagModal} variant="outlined" sx={{ mt: 2 }}>
                        Add Tags
                    </Button>
                    <IconButton onClick={() => handleChangeQuote('next')} aria-label="next quote" disabled={loading}>
                        <ArrowRightBold />
                    </IconButton>

                </CardContent>
            )}
            <Modal
                open={tagModalOpen}
                onClose={handleCloseTagModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Tags
                    </Typography>
                    <Autocomplete
                        multiple
                        id="tags-autocomplete"
                        options={availableTags}
                        getOptionLabel={(option) => option.tag}
                        value={selectedTags}
                        onChange={(event, newValue) => {
                            //id, tag, category
                            setSelectedTags(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Tags" />}
                        sx={{ mt: 2 }}
                    />
                    <Button onClick={handleCloseTagModal} variant="contained" sx={{ mt: 2 }}>
                        Done
                    </Button>
                </Box>
            </Modal>
        </Card>
    );

};

export default ReadQuotes;