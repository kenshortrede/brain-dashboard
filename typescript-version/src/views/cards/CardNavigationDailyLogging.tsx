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
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Tooltip } from '@mui/material'
import { HelpCircle, MinusBox, PlusBox } from 'mdi-material-ui'
import { LocalizationProvider, MobileTimePicker } from '@mui/lab'
import AdapterDateFns from '@date-io/date-fns';
import Slider from '@mui/material/Slider';
import workoutTypes from 'src/constants/workoutTypes'
import axios from 'axios'; // Make sure to install axios if you haven't
import { IDailyLog, IDailyLogEntry, IMeditation, ISleep, IWorkout, IWorkoutComponent } from 'src/lib/dbTypes'

// Daily Entry Interface
const CardNavigationDailyLogging = () => {
  // KEEPS TRACK OF THE TAB VALUE
  const [tab, setTab] = useState<string>('1');

  // WORKOUT STATES
  // Displays the types of workout. This will have to be replaced with pulling the workout types from the database
  const half = Math.ceil(workoutTypes.length / 2);
  const firstHalfTypes = workoutTypes.slice(0, half);
  const secondHalfTypes = workoutTypes.slice(half);

  const [workoutDuration, setWorkoutDuration] = useState<number>(30);
  // const [workoutType, setWorkoutType] = useState<string>('Chest'); // Default workout type - 'Chest'
  // const [workoutTypesSelected, setWorkoutTypesSelected] = useState<string[]>([]);
  const [workoutTypesSelected, setWorkoutTypesSelected] = useState<number[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState<string>(''); // Additional notes for the workout

  // SLEEP STATES
  // Create a new Date object
  const defaultSleepTime = new Date();
  // Set the time to 9 PM
  defaultSleepTime.setHours(21, 0, 0, 0); // 21 hours, 0 minutes, 0 seconds, 0 milliseconds
  // Use the defaultSleepTime as the initial state
  const [sleepTime, setSleepTime] = useState(defaultSleepTime); // Time the user went to sleep - Default 9 PM
  const [sleepDuration, setSleepDuration] = useState(8); // How many hours the user slept - Default 8 hours
  const [sleepQuality, setSleepQuality] = useState(""); // Quality of sleep - Default 'Good' ('Poor', 'Fair', 'Good', 'Excellent')
  const [sleepNotes, setSleepNotes] = useState<string>(''); // Additional notes for the sleep

  // MEDITATION STATES
  const [meditationDuration, setMeditationDuration] = useState<number>(10);
  const [meditationType, setMeditationType] = useState<string>("");
  const [meditations, setMeditations] = useState([{ type: "", duration: 10, notes: "" }]);

  // GENERAL DAILY STATES
  const [mood, setMood] = useState<number>(5); // Mood of the day - From 1 to 10
  const [additionalComments, setAdditionalComments] = useState<string>(''); // Additional comments


  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  // Function to move to the next tab
  const handleNext = () => {
    setTab(String(parseInt(tab) + 1))
  }


  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
  });

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async () => {

    const user_id = 1;
    // Create workout part of the data to submit with type IWorkout
    let workout: IWorkout = {
      duration_minutes: workoutDuration,
      notes: "",
      user_id: user_id,
      daily_logs_id: null,
      created_at: null,
      updated_at: null,
      id: null,
    };
    // If the user didnt enter any data for the workout (no notes and no types selected), set workout to null
    let workoutData: IWorkoutComponent | null = {
      workout,
      types: workoutTypesSelected,
    };
    if (workoutTypesSelected.length === 0 && workoutNotes === "") {
      workoutData = null;
    }


    const sleep: ISleep = {
      duration_hours: sleepDuration,
      quality: sleepQuality as 'Poor' | 'Fair' | 'Good' | 'Excellent',
      user_id: user_id,
      daily_logs_id: null,
      notes: "",
      created_at: null,
      updated_at: null,
      id: null,
    }

    const meditationsData: IMeditation[] = meditations.map((meditation) => ({
      duration_minutes: meditation.duration,
      title: "",
      type: meditation.type,
      user_id: user_id,
      daily_logs_id: null,
      notes: "",
      created_at: null,
      updated_at: null,
      id: null,
    }));

    const dailyLogContent = {
      notes: additionalComments,
    }
    const dailyData: IDailyLog = {
      mood: mood,
      content: dailyLogContent,
      user_id: user_id,
      created_at: null,
      updated_at: null,
      id: null,
    }

    // Create an object with the data to submit
    const dailyEntryData: IDailyLogEntry = {
      dailyLog: dailyData,
      workout: workoutData,
      sleep: sleep,
      meditations: meditationsData,
    };

    console.log('Submitting daily entry', dailyEntryData);

    // setDialogContent({ title: 'Success', message: 'Your daily entry has been submitted successfully!' });
    // setOpenDialog(true);

    // Use fetch API to send a POST request to your API endpoint
    try {
      const response = await fetch('/api/submitDailyEntries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dailyEntryData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful', result);
        // Handle success - maybe clear the form or show a success message
        setDialogContent({ title: 'Success', message: 'Your daily entry has been submitted successfully!' });
        setOpenDialog(true);

      } else {
        console.error('Submission failed', await response.text());
        // Handle error - show error message to the user
        // setSnackbarMessage('Submission failed. Please try again.');
        setDialogContent({ title: 'Error', message: 'Submission failed. Please try again.' });
        setOpenDialog(true);
      }
    } catch (error) {
      console.error('Error submitting daily entry', error);
      // Handle error - show error message to the user
    }
  };


  // Function to increment or decrement workout duration
  const adjustDuration = (increment: boolean) => {
    setWorkoutDuration((prevDuration) => prevDuration + (increment ? 10 : -10))
  }

  const adjustMeditationDuration = (increment: boolean) => {
    setMeditationDuration((prevDuration) => prevDuration + (increment ? 5 : -5))
  }

  // Adjust Duration Hours with custom stepper
  const adjustSleepDuration = (increment: boolean) => {
    setSleepDuration((prev) => prev + (increment ? 1 : -1));
  };

  const handleWorkoutTypeChange = (event: React.ChangeEvent<HTMLInputElement>, typeId: number) => {
    setWorkoutTypesSelected((currentTypes) => {
      if (currentTypes.includes(typeId)) {
        // Remove the type if it's already selected
        return currentTypes.filter((id) => id !== typeId);
      } else {
        // Add the type if it's not already selected
        return [...currentTypes, typeId];
      }
    });
  };
  // const handleWorkoutTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const type = event.target.name;
  //   setWorkoutTypesSelected((currentTypes) => {
  //     if (currentTypes.includes(type)) {
  //       // Remove the type if it's already selected
  //       return currentTypes.filter((t) => t !== type);
  //     } else {
  //       // Add the type if it's not already selected
  //       return [...currentTypes, type];
  //     }
  //   });
  // };

  const handleMeditationChange = (index: number, field: "type" | "duration" | "notes", value: string | number) => {
    setMeditations((currentMeditations) => {
      const updatedMeditations = [...currentMeditations];
      updatedMeditations[index] = { ...updatedMeditations[index], [field]: value };
      return updatedMeditations;
    });
  };

  const addMeditation = () => {
    setMeditations((currentMeditations) => [
      ...currentMeditations,
      { type: "", duration: 10 },
    ]);
  };
  const removeMeditation = (index) => {
    setMeditations((currentMeditations) => currentMeditations.filter((_, i) => i !== index));
  };

  const handleCloseDialog = () => {
    // THIS SHOULD CLOSE THE DIALOG AND REDIRECT TO THE DASHBOARD
    setOpenDialog(false);
  };

  return (
    <Card>
      <TabContext value={tab}>
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={workoutTypesSelected.includes(type.name)}
                          // onChange={handleWorkoutTypeChange}
                          checked={workoutTypesSelected.includes(type.id)}
                          onChange={(e) => handleWorkoutTypeChange(e, type.id)}
                          name={type.name}
                        />
                      }
                      label={type.name}
                      key={type.id}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  {secondHalfTypes.map((type) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={workoutTypesSelected.includes(type.name)}
                          onChange={handleWorkoutTypeChange}
                          name={type.name}
                        />
                      }
                      label={type.name}
                      key={type.id}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
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

            <TextField
              label="Additional Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={workoutNotes} // Set the TextField's value to the current additionalComments state
              onChange={(event) => setWorkoutNotes(event.target.value)} // Update the additionalComments state on change
              sx={{ marginBottom: 0, marginTop: 10 }}
            />

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
                  value={sleepQuality} // Set the Select's value to the current sleepQuality state
                  label="Sleep Quality"
                  onChange={(event) => setSleepQuality(event.target.value)} // Update the sleepQuality state on change
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

              <TextField
                label="Additional Comments"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={sleepNotes} // Set the TextField's value to the current additionalComments state
                onChange={(event) => setSleepNotes(event.target.value)} // Update the additionalComments state on change
                sx={{ marginBottom: 0, marginTop: 10 }}
              />

              <Grid container justifyContent="flex-end" sx={{ marginTop: 10 }}>
                <Button variant='contained' onClick={handleNext}>Next</Button>
              </Grid>
            </TabPanel>
          </LocalizationProvider>

          {/* Meditation Tab */}
          <TabPanel value='3'>

            {meditations.map((meditation, index) => (
              <div key={index}>
                {meditations.length > 1 && index > 0 && (
                  <Tooltip title="Remove Meditation" placement="top">
                    <IconButton onClick={() => removeMeditation(index)} sx={{ mt: 1 }}>
                      <MinusBox style={{ fontSize: 30 }} /> {/* Ensure MinusBox has larger icon */}
                    </IconButton>
                  </Tooltip>
                )}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`meditation-type-label-${index}`}>Meditation Type</InputLabel>
                  <Select
                    // labelId={`meditation-type-label-${index}`}
                    // id={`meditation-type-${index}`}
                    labelId="meditation-type-label"
                    id="meditation-type"
                    label="Meditation Type"
                    value={meditation.type}
                    onChange={(event) => handleMeditationChange(index, 'type', event.target.value)}
                  >
                    {['Goal Visualization', 'Confidence', 'Love', 'Letting Go', 'Breathing', 'Grounding', 'Quantum Jumping'].map((type) => (
                      <MenuItem value={type} key={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Grid item xs={12} sx={{ marginTop: 5, marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Increased space before this Grid */}
                  <Typography>Meditation Duration:</Typography>

                  <Tooltip arrow title="Minus 5 Minutes" placement='top'>
                    <Card
                      onClick={() => handleMeditationChange(index, 'duration', meditation.duration - 5)}
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
                  <Typography>{meditation.duration} minutes</Typography>
                  <Tooltip arrow title="Plus 5 Minutes" placement='top'>
                    <Card
                      onClick={() => handleMeditationChange(index, 'duration', meditation.duration + 5)}
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
                <TextField
                  label="Additional Comments"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={meditations[index].notes} // Set the TextField's value to the current additionalComments state
                  onChange={(event) => handleMeditationChange(index, 'notes', event.target.value)}
                  sx={{ marginBottom: 0, marginTop: 5 }}
                />
              </div>
            ))}

            <Button onClick={addMeditation}>Add Another Meditation</Button>
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
              value={mood} // Set the Slider's value to the current mood state
              onChange={(event, newValue) => setMood(newValue)} // Update the mood state on change
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
              value={additionalComments} // Set the TextField's value to the current additionalComments state
              onChange={(event) => setAdditionalComments(event.target.value)} // Update the additionalComments state on change
              sx={{ marginBottom: 2 }}
            />
            <Grid container justifyContent="flex-end">
              <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 2 }}>Submit</Button>
            </Grid>
          </TabPanel>

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

          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar> */}
        </CardContent>
      </TabContext>
    </Card >
  )
}

export default CardNavigationDailyLogging
