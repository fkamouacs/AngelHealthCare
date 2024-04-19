import React, { useState, useEffect } from 'react';
import Table from '@mui/joy/Table';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Process from "./process_page"
import {getAllProcesses} from "../fakedatabase.js"
import AddProcess from "./add_process.jsx"
import apis from "../api/index.js"

const ProcessesPage = () => {
    //const [processes, setProcesses] = useState(getAllProcesses())
    const [processes, setProcesses] = useState([])
    const [showProcess, setShowProcess] = useState(false);
    const [currentProcessId, setCurrentProcessId] = useState(null);
    const [showAddProcess, setShowAddProcess] = useState(false);

    useEffect(() => {
      apis.getAllProcesses().then(res => {
        const reversed = res.data.reverse()
         setProcesses(reversed)
        console.log(res.data);
        console.log(reversed)
      })
    },[])

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
            <td>{info.endDate}</td>
    </tr>
  )
}