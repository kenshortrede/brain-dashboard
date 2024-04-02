// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
import CardNavigationDailyLogging from 'src/views/cards/CardNavigationDailyLogging'
import { TabPanel } from '@mui/lab'
import { Autocomplete, Chip, Button, CardContent, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography, AutocompleteChangeReason } from '@mui/material'
import { tagOptions } from 'src/constants/tags';
import { useEffect, useState } from 'react'
import { IQuote, IQuoteSubmission } from 'src/lib/dbTypes'


const Quotes = () => {

    // Predefined list of tag options for autocomplete suggestions
    const [tags, setTags] = useState([]); // State to store fetched tags
    const [authors, setAuthors] = useState([]); // State to store fetched authors


    const [quoteTags, setQuoteTags] = useState([]);
    const [quote, setQuote] = useState('');
    // const [author, setAuthor] = useState(null); // Use null for Autocomplete's value to represent no selection
    const [author, setAuthor] = useState({ id: null, tag: '', category: '' });

    useEffect(() => {
        // Function to fetch tags from the API
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/tags');
                if (!response.ok) throw new Error('Failed to fetch tags');
                const data = await response.json();
                setTags(data); // Update state with fetched tags
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        // Fetch Authors
        const fetchAuthors = async () => {
            try {
                const response = await fetch('/api/authors');
                if (!response.ok) throw new Error('Failed to fetch authors');
                const data = await response.json();
                setAuthors(data); // Update state with fetched authors
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }

        fetchTags();
        fetchAuthors();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleSubmit = () => {
        console.log("Quote:", quote, "Author:", author, "Tags:", quoteTags);

        // Handle the submission, e.g., sending data to your backend /api/quotes POST endpoint
        const quoteData: IQuote = {
            content: quote,
            author: author,
            id: null,
            created_at: null,
            updated_at: null,
            user_id: 1
        }
        const finalData: IQuoteSubmission = {
            quote: quoteData,
            tags: quoteTags.map(tag => tag.id)
        }

        console.log("Final Data:", finalData);
        fetch('/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Enter Your Favorite Quote
            </Typography>
            <TextField
                label="Quote"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Autocomplete
                freeSolo
                options={authors}
                getOptionLabel={(option) => option.tag || ''}
                value={author}
                onInputChange={(event, newInputValue, reason) => {
                    // Only update the author tag on manual input, reset id to null for new inputs
                    if (reason === 'input') {
                        setAuthor({ id: null, tag: newInputValue });
                    }
                }}
                onChange={(event, newValue, reason) => {
                    // Directly set the author state to the selected option or reset if cleared
                    if (reason === 'selectOption' && typeof newValue === 'object') {
                        setAuthor(newValue);
                    } else if (reason === 'clear') {
                        setAuthor({ id: null, tag: '' });
                    }
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Author" variant="outlined" fullWidth />
                )}
                renderOption={(props, option) => <li {...props} key={option.id}>{option.tag}</li>}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                inputValue={author.tag || ''} // Control the input value to match the author tag
                sx={{ marginBottom: 2 }}
            />
            {author.tag && (
                <Chip
                    label={author.tag}
                    onDelete={() => setAuthor({ id: null, tag: '' })}
                    color="primary"
                    sx={{ marginBottom: 2 }}
                />
            )}
            {/* <Autocomplete
                freeSolo
                options={authors.map((option) => option.name)}
                value={author}
                onInputChange={(event, newInputValue) => {
                    setAuthor(newInputValue);
                }}
                onChange={(event, newValue) => {
                    // This ensures that if a user selects an existing author from the dropdown,
                    // it updates the author state as well.
                    setAuthor(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Author" variant="outlined" fullWidth />
                )}
                sx={{ marginBottom: 2 }}
            />
            {author && (
                <Chip
                    label={author}
                    onDelete={handleDeleteAuthor}
                    color="primary"
                    sx={{ marginBottom: 2 }}
                />
            )} */}

            <Typography gutterBottom>
                Select Categories
            </Typography>
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    // options={tags}
                    options={tags.filter(option => option.tag !== author.tag)} // Filter out the author tag from options
                    getOptionLabel={(option) => option.tag || ''}
                    freeSolo
                    value={quoteTags}
                    onChange={(event, newValue) => {
                        setQuoteTags(newValue);
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
            <Grid container justifyContent="flex-end">
                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Save</Button>
            </Grid>
        </CardContent>
    );
};

export default Quotes;