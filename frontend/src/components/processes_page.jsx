import React, { useState, useEffect } from 'react';
import Table from '@mui/joy/Table';
import { Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Modal} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import Process from "./process_page"
import AddProcess from "./add_process.jsx"
import apis from "../api/index.js"

const ProcessesPage = () => {
    const [processes, setProcesses] = useState([])
    const [showProcess, setShowProcess] = useState(false);
    const [currentProcessId, setCurrentProcessId] = useState(null);
    const [showAddProcess, setShowAddProcess] = useState(false);

    const [sortBy, setSortBy] = useState("date"); // date, name
    const [filterDone, setFilterDone] = useState(true); 
    const [name, setName] = useState("");
    const [ascended, setAscended] = useState(true);
    


    const handleSort = (event, newSortBy) => {
      if(newSortBy){
        setSortBy(newSortBy);
      }
    }

    const reverseOrder = () => {
      processes.reverse();
      setProcesses(processes);
      setAscended(!ascended);
    }



    useEffect(() => {
      console.log(sortBy, filterDone, name);
      apis.getAllProcesses().then(res => {

        let data = res.data.filter(process => {
          return process.name.includes(name);
        });

        data.sort((a, b)=>a.name.localeCompare(b.name))

        if(filterDone){
          data = data.filter(process => process.endDate == null);
        }

        setProcesses(data);
      })
    }, [sortBy, filterDone, name]);




    return (
   <>

    {showProcess ? <Process _id={currentProcessId} showProcess={setShowProcess} currentProcess={setCurrentProcessId}/> : 
    showAddProcess ? <AddProcess showAddProcess={setShowAddProcess} setProcesses={setProcesses}/> :
   <>
   
   <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1rem'
                }}>
   <h1>
    Processes list
   </h1>
    <Button 
        variant="contained" 
        sx={{bgcolor: '#6682c4'}}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setShowAddProcess(true)}
    >
        Add Item
    </Button>
   </div>
   <Paper sx={{padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 10, borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}>
      <Typography variant="h6">Sort By</Typography>
      <ToggleButtonGroup
          color="primary"
          value={sortBy}
          exclusive
          onChange={handleSort}
          aria-label="sort by"
          sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}
      >
        <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="name">Name</ToggleButton>
        <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="date">Date</ToggleButton>
      </ToggleButtonGroup>
      <IconButton onClick={reverseOrder} color="primary">
          {ascended ? <ArrowUpwardIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/> : 
          <ArrowDownwardIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/>}
      </IconButton>
      <IconButton onClick={() => {setFilterDone(!filterDone)}} color="primary">
          {filterDone ? <DoneAllIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/> : 
          <RemoveDoneIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/>}
      </IconButton>
      <TextField
          label="Enter a process name"
          variant="outlined"
          margin="dense"
          size="small"
          sx={{ width: '520px' }}
          onChange={(event) => setName(event.target.value)}
      />
      <Button variant="contained" sx={{bgcolor: '#6682c4'}}>Search</Button>
  </Paper>
 <Table sx={{ '& thead th:nth-of-type(1)': { width: '40%' } }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Patient</th>
          <th>Current Stage</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {processes.map( (row) => (
       <ProcessesRow info={row} setCurrentProcessId={setCurrentProcessId} setShowProcess={setShowProcess}/> 
        ))}
      </tbody>
    </Table>
    </>}
   </>)
  
}

export default ProcessesPage

const ProcessesRow  = ({info, setShowProcess, setCurrentProcessId}) => {
  const [currentPatientName, setCurrentPatientName] = useState(null);

  useEffect(() => {
    apis.getPatientById(info.patientId).then((res) => {
      if(res.data != null)
        setCurrentPatientName(res.data.name)
      })
  },[])

  const handleProcessClick = (process) => {
    setShowProcess(true)
    setCurrentProcessId(process._id)
}

 const convertDate = (date) => {
  if(date == null)
    return;
  const onlyDate = date.slice(0,10);
  return onlyDate;
 }

  return (
    <tr key={info._id} onClick={() => handleProcessClick(info)} style={{cursor: 'pointer', 
          }}>
            <td>{info.name}</td>
            <td>{currentPatientName}</td>
            <td>{info.currStage}</td>
            <td>{convertDate(info.startDate)}</td>
            <td>{convertDate(info.endDate)}</td>
    </tr>
  )
}