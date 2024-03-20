// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import TabList from '@mui/lab/TabList'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Tooltip } from '@mui/material'
import { HelpCircle, MinusBox, PlusBox } from 'mdi-material-ui'
import { LocalizationProvider, MobileTimePicker } from '@mui/lab'
import AdapterDateFns from '@date-io/date-fns';
import Slider from '@mui/material/Slider';
import workoutTypes from 'src/constants/workoutTypes'


const CardNavigationDailyLogging = () => {
  // ** State
  const [value, setValue] = useState<string>('1')
  const [workoutDuration, setWorkoutDuration] = useState<number>(30)
  const [meditationDuration, setMeditationDuration] = useState<number>(10);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Function to move to the next tab
  const handleNext = () => {
    setValue(String(parseInt(value) + 1))
  }

  // Function to handle form submission
  const handleSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted')
  }
  // Function to increment or decrement workout duration
  const adjustDuration = (increment: boolean) => {
    setWorkoutDuration((prevDuration) => prevDuration + (increment ? 15 : -15))
  }

  const adjustMeditationDuration = (increment: boolean) => {
    setMeditationDuration((prevDuration) => prevDuration + (increment ? 5 : -5))
  }

  // Adjust Duration Hours with custom stepper
  const adjustSleepDuration = (increment: boolean) => {
    setSleepDuration((prev) => prev + (increment ? 1 : -1));
  };

  // Inside your component
  const [sleepDuration, setSleepDuration] = useState(8); // Default 8 hours
  // Create a new Date object
  const defaultSleepTime = new Date();
  // Set the time to 9 PM
  defaultSleepTime.setHours(21, 0, 0, 0); // 21 hours, 0 minutes, 0 seconds, 0 milliseconds
  // Use the defaultSleepTime as the initial state
  const [sleepTime, setSleepTime] = useState(defaultSleepTime);


  const half = Math.ceil(workoutTypes.length / 2);
  const firstHalfTypes = workoutTypes.slice(0, half);
  const secondHalfTypes = workoutTypes.slice(half);

  return (
    <Card>
      <TabContext value={value}>
        <TabList centered onChange={handleChange} aria-label='daily logging'>
          <Tab value='1' label='Workout' />
          <Tab value='2' label='Sleep' />
          <Tab value='3' label='Meditation' />
          <Tab value='4' label='General Daily' />
        </TabList>
        <CardContent>
          {/* Workout Tab */}
          <TabPanel value='1'>
            <Typography variant='h6' sx={{ marginBottom: 4 }}> {/* Increased space after this Typography */}
              Did you workout today?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup>
                  {firstHalfTypes.map((type) => (
                    <FormControlLabel control={<Checkbox />} label={type.name} key={type.id} />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  {secondHalfTypes.map((type) => (
                    <FormControlLabel control={<Checkbox />} label={type.name} key={type.id} />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup>
                  {['Chest', 'Biceps', 'Triceps', 'Forearms', 'Abs'].map((type) => (
                    <FormControlLabel control={<Checkbox />} label={type} key={type} />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  {['Legs', 'Back', 'Swimming', 'Basketball', 'None'].map((type) => (
                    <FormControlLabel control={<Checkbox />} label={type} key={type} />
                  ))}
                </FormGroup>
              </Grid>
            </Grid> */}

            <Grid item xs={12} sx={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Increased space before this Grid */}
              <Typography>Workout Duration:</Typography>

              <Tooltip arrow title="Minus" placement='top'>
                <Card
                  onClick={() => adjustDuration(false)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#90EE90',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                    border: '1px solid #ccc',
                    display: 'inline-flex', // Make the card inline-flex to shrink wrap the content
                    // borderRadius: '50%', // Optional: Makes the card circular
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', // Reduce padding to make the content more compact
                    '&:last-child': { paddingBottom: '8px' } // Override MUI's last-child padding
                  }}>
                    <MinusBox style={{ fontSize: 30 }} /> {/* Ensure MinusBox has larger icon */}
                  </CardContent>
                </Card>
              </Tooltip>
              <Typography>{workoutDuration} minutes</Typography>
              <Tooltip arrow title="Plus" placement='top'>
                <Card
                  onClick={() => adjustDuration(true)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#90EE90',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                    border: '1px solid #ccc',
                    display: 'inline-flex', // Make the card inline-flex to shrink wrap the content
                    // borderRadius: '50%', // Optional: Makes the card circular
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', // Reduce padding to make the content more compact
                    '&:last-child': { paddingBottom: '8px' } // Override MUI's last-child padding
                  }}>
                    <PlusBox style={{ fontSize: 30 }} />
                  </CardContent>
                </Card>
              </Tooltip>

            </Grid>

            <Grid container justifyContent="flex-end" sx={{ marginTop: 10 }}> {/* Increased space before this Grid */}
              <Button variant='contained' onClick={handleNext} sx={{ marginTop: 2 }}>Next</Button>
            </Grid>
          </TabPanel>

          {/* Sleep Tab */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TabPanel value='2'>
              <FormControl fullWidth sx={{ marginBottom: 10 }}>
                <InputLabel id="sleep-quality-label">Sleep Quality</InputLabel>
                <Select
                  labelId="sleep-quality-label"
                  id="sleep-quality"
                  label="Sleep Quality"
                >
                  {['Poor', 'Fair', 'Good', 'Excellent'].map((quality) => (
                    <MenuItem value={quality} key={quality}>{quality}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Sleep Duration (Hours)
                  </Typography>
                  <Slider
                    aria-label="Sleep Duration"
                    defaultValue={8}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={12}
                    value={sleepDuration}
                    onChange={(event, newValue) => setSleepDuration(newValue)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MobileTimePicker
                    label="Sleep Time"
                    value={sleepTime}
                    onChange={(newValue) => setSleepTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="flex-end" sx={{ marginTop: 10 }}>
                <Button variant='contained' onClick={handleNext}>Next</Button>
              </Grid>
            </TabPanel>
          </LocalizationProvider>


          {/* Meditation Tab */}
          <TabPanel value='3'>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="meditation-type-label">Meditation Type</InputLabel>
              <Select
                labelId="meditation-type-label"
                id="meditation-type"
                label="Meditation Type"
              >
                {['Goal Visualization', 'Confidence', 'Love', 'Letting Go', 'Breathing', 'Grounding', 'Quantum Jumping'].map((type) => (
                  <MenuItem value={type} key={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid item xs={12} sx={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Increased space before this Grid */}
              <Typography>Meditation Duration:</Typography>

              <Tooltip arrow title="Minus 5 Minutes" placement='top'>
                <Card
                  onClick={() => adjustMeditationDuration(false)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#90EE90',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                    border: '1px solid #ccc',
                    display: 'inline-flex', // Make the card inline-flex to shrink wrap the content
                    // borderRadius: '50%', // Optional: Makes the card circular
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', // Reduce padding to make the content more compact
                    '&:last-child': { paddingBottom: '8px' } // Override MUI's last-child padding
                  }}>
                    <MinusBox style={{ fontSize: 30 }} /> {/* Ensure MinusBox has larger icon */}
                  </CardContent>
                </Card>
              </Tooltip>
              <Typography>{meditationDuration} minutes</Typography>
              <Tooltip arrow title="Plus 5 Minutes" placement='top'>
                <Card
                  onClick={() => adjustMeditationDuration(true)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#90EE90',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                    border: '1px solid #ccc',
                    display: 'inline-flex', // Make the card inline-flex to shrink wrap the content
                    // borderRadius: '50%', // Optional: Makes the card circular
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', // Reduce padding to make the content more compact
                    '&:last-child': { paddingBottom: '8px' } // Override MUI's last-child padding
                  }}>
                    <PlusBox style={{ fontSize: 30 }} />
                  </CardContent>
                </Card>
              </Tooltip>

            </Grid>

            {/* <TextField
              label="Duration (minutes)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            /> */}
            <Grid container justifyContent="flex-end" sx={{ marginTop: 10 }}>
              <Button variant='contained' onClick={handleNext}>Next</Button>
            </Grid>
          </TabPanel>

          {/* General Daily Tab */}
          <TabPanel value='4'>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Mood of the Day
            </Typography>
            <Typography gutterBottom>
              Mood (1-10)
            </Typography>
            <Slider
              aria-label="Mood"
              defaultValue={5}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              label="Additional Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Grid container justifyContent="flex-end">
              <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Submit</Button>
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card >
  )
}

export default CardNavigationDailyLogging
