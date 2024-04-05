import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Process from "./process_page"
import {getAllProcesses} from "../fakedatabase.js"
import AddProcess from "./add_process.jsx"

const Processes_page = () => {
    const [processes, setProcesses] = useState(getAllProcesses())
    const [showProcess, setShowProcess] = useState(false);
    const [currentProcessId, setCurrentProcessId] = useState(null);
    const [showAddProcess, setShowAddProcess] = useState(false);

    const handleProcessClick = (process) => {
        setShowProcess(true)
        setCurrentProcessId(process._id)
    }
    
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
        {processes.map((row) => (
          <tr key={row._id} onClick={() => handleProcessClick(row)} style={{cursor: 'pointer', 
          }}>
            <td>{row.name}</td>
            <td>{row.patient}</td>
            <td>{row.currStage}</td>
            <td>{row.startDate}</td>
            <td>{row.endDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>}
   </>)
  
}

export default Processes_page