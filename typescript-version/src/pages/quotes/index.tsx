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
import { Button, CardContent, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material'

const Quotes = () => {
    console.log("Daily.tsx")

    const handleSubmit = () => {
        console.log("Submit")
    }
    return (
        <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Enter Your Favorite Quote
            </Typography>
            <Typography gutterBottom>
                Select Categories
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormGroup>
                        {[
                            'Inspiration',
                            'Love',
                            'Pickup',
                            'Life Lessons',
                            'Motivation',
                            'Happiness',
                            'Mindfulness',
                            'Personal Growth',
                            'Resilience'
                        ].map((type) => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type} />
                        ))}
                    </FormGroup>
                </Grid>
                <Grid item xs={6}>
                    <FormGroup>
                        {[
                            'Success & Failure',
                            'Wisdom',
                            'Friendship',
                            'Family',
                            'Work & Career',
                            'Creativity',
                            'Nature',
                            'Philosophy',
                            'Others' // For quotes that don't neatly fit into the above categories
                        ].map((type) => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type} />
                        ))}
                    </FormGroup>
                </Grid>
            </Grid>
            <TextField
                label="Write down quote"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ marginTop: 20 }}
            />
            <Grid container justifyContent="flex-end">
                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Submit</Button>
            </Grid>
        </CardContent>
    )
}

export default Quotes