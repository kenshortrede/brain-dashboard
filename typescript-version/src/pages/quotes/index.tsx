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
import { Autocomplete, Chip, Button, CardContent, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material'
import { tagOptions } from 'src/constants/tags';
import { useState } from 'react'

// Example authors list - replace this with your dynamic list fetched from the database
const authorsList = ['Mark Twain', 'Virginia Woolf', 'Albert Einstein', 'Maya Angelou'];

const Quotes = () => {
    console.log("Daily.tsx")

    const handleSubmit = () => {
        console.log("Quote:", quote, "Author:", author, "Tags:", quoteTags);
        // Handle the submission, e.g., sending data to your backend
    };

    const [quoteTags, setQuoteTags] = useState([]);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState(null); // Use null for Autocomplete's value to represent no selection

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
                value={author}
                onChange={(event, newValue) => {
                    setAuthor(newValue);
                }}
                inputValue={author ? author : ''}
                onInputChange={(event, newInputValue) => {
                    setAuthor(newInputValue);
                }}
                freeSolo
                options={authorsList}
                renderInput={(params) => (
                    <TextField {...params} label="Author" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
                )}
            />
            <Typography gutterBottom>
                Select Categories
            </Typography>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tagOptions}
                    freeSolo
                    value={quoteTags}
                    onChange={(event, newValue) => {
                        setQuoteTags([...newValue]);
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
            <Grid container justifyContent="flex-end">
                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Save</Button>
            </Grid>
        </CardContent>
    );
};

export default Quotes;