import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import logo from './logo.svg';
import './App.css';
import API from './api';
import NotificationRowData from './interfaces/NotificationRowData';
import { NotificationsTable } from './components/NotificationsTable';
import Snackbar from '@mui/material/Snackbar';

const messageCategories = [
  "finance",
  "sports",
  "movies"
]


function App() {
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [notifications, setNotifications] = useState<NotificationRowData[]>([])
  const [alert, setAlert] = useState("none")
  const [error, setError] = useState()
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const menuItems = messageCategories.map(i=><MenuItem key={i} value={i}>{i}</MenuItem>)
  const alerts = {
    "success": <Alert severity="success">Messages sent successfully</Alert>,
    "failed": <Alert severity="error">{error}</Alert>,
    "none": ""
  }


  const handleChange = (event: SelectChangeEvent) => {
    return setCategory(event.target.value as string)
  }

  const sendMessages = async ()=> {
    API.post('/notifications', {message: message, messageCategory: category}).then(resp=>{
      setAlert("Success")
      setOpen(true);
      console.log("Messages sent succesfully")
      getMessages().then(data=>setNotifications(data))
    }).catch(e=>{
      setError(e)
      setAlert("An error occurred: "+e)
      setOpen(true);
      console.log("Messages failed")
    })
  }

  const getMessages = () => API.get('/notifications').then(resp=>{
      return resp.data
    }).catch(e=>{
      console.log("Messages failed")
    })

  useEffect(()=>{
    getMessages().then(data=>{setNotifications(data)})
  }, [])


  return (
    <div className="App">
      <h1>
        Send notifications
      </h1>
      <div className='flex-row'>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
          onChange={handleChange}
        >
          {menuItems}
        </Select>
    
        </FormControl>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Message" value={message} variant="outlined" name='message' onChange={(e)=>setMessage(e.target.value)}/>
    </Box>
      <Button type='submit' variant="contained" onClick={sendMessages}>
        Send
      </Button>

      </div>
    <div className='p-4'>
      <h2>Notification Logs</h2>
    <NotificationsTable data={notifications}/>
    </div>

    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      />
    </div>
  );
}

export default App;
