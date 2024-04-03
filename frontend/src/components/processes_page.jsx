import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Process from "./process_page"
import {processes} from "../fakedatabase.js"

const Processes_page = () => {
    const [showProcess, setShowProcess] = useState(false);
    const [currentProcessId, setCurrentProcessId] = useState(null);
 
    const handleProcessClick = (process) => {
        setShowProcess(true)
        setCurrentProcessId(process._id)
    }

    const handleAddProcess = () => {
        console.log("hi")
    }
    
    return (
   <>

    {showProcess ? <Process _id={currentProcessId} showProcess={setShowProcess} currentProcess={setCurrentProcessId}/> : 
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
        onClick={handleAddProcess}
    >
        Add Item
    </Button>
   </div>
   
 <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
      <thead>
        <tr>
          <th>Column width (40%)</th>
          <th>Patient</th>
          <th>Current Stage</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((row) => (
          <tr key={row.name} onClick={() => handleProcessClick(row)} style={{cursor: 'pointer', 
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