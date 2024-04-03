import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function createData(name, patient, currStage, startDate, endDate) {
    return { name, patient, currStage, startDate, endDate };
  }
  
  const rows = [
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
    createData('Knee Surgery', "JohnSmith", "preop", "2/1/2024", "N/A"),
  ];

const Processes_page = () => {
    
    const handleProcessClick = () => {
        console.log("XD")
    }

    const handleAddProcess = () => {
        console.log("hi")
    }
    
    return (
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
        {rows.map((row) => (
          <tr key={row.name} onClick={handleProcessClick} style={{cursor: 'pointer', 
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
   </>)
  
}

export default Processes_page