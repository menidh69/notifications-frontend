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
  const [loading, setLoading] = useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const menuItems = messageCategories.map(i=><MenuItem key={i} value={i}>{i}</MenuItem>)

  const handleChange = (event: SelectChangeEvent) => {
    return setCategory(event.target.value as string)
  }

  const sendMessages = async ()=> {
    setLoading(true)
    API.post('/notifications', {message: message, messageCategory: category}).then(resp=>{
      setAlert("Success")
      setOpen(true);
      console.log("Messages sent succesfully")
      const data: any[] = resp.data
      setNotifications([...data, ...notifications].sort((a,b)=>b.id-a.id))
      setLoading(false)
    }).catch(e=>{
      setError(e.response.data.message)
      setAlert("An error occurred: " + e.response?.data?.message)
      setOpen(true);
      setLoading(false)
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
      <Button type='submit' variant="contained" onClick={sendMessages} disabled={loading}>
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
        message={alert}
      />
    </div>
  );
}

export default App;
