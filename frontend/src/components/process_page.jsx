/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react'
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Procedure from "./procedure_page"
import {processes, procedures} from "../fakedatabase.js"
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddProcedure from "./add_procedure.jsx"

const ProcessPage = (props) => {
    const isId = (row) => {
        return row._id === props._id;
    }
    const [currentProcess, setCurrentProcess] = useState(processes.find(isId))
    const [showProcedure, setShowProcedure] = useState(false);
    const [currentProcedureId, setCurrentProcedureId] = useState(null);
    const [showAddProcedure, setShowAddProcedure] = useState(false);
    
    const handleProcedureClick = (procedure) => {
        setShowProcedure(true);
        setCurrentProcedureId(procedure._id)
    }
   

   const displayProcedures = () => {
    return procedures.map(p => { if (currentProcess.procedureIds.includes(p._id)) {return (
        <Step
        key={p._id}
        style={{
            cursor: "pointer"
        }}
        onClick={() => handleProcedureClick(p)}
        completed
        indicator={
          <StepIndicator variant="solid" color={p.stage}>
            <CheckRoundedIcon />
          </StepIndicator>
        }
      >
        <div>
          <Typography level="title-sm">{`Step ${p.step}`}</Typography>
          {p.name}
        </div>
      </Step>
    ) } return <div style={{display: 'none'}}key={p._id} ></div>}
    )  
   }

   const handleDeleteProcedure = () => {

   }

  return (
    <div style={{
       
        marginTop: '2rem'
    }}>

        {showProcedure ? <Procedure _id={currentProcedureId} showProcedure={setShowProcedure} 
        currentProcedure={setCurrentProcedureId} showProcess={props.showProcess} currentProcess={props.currentProcess} currProcess={props._id}/> : showAddProcedure ? <AddProcedure showAddProcedure={setShowAddProcedure}
        currentProcess={currentProcess} setCurrentProcess={setCurrentProcess} /> : <>

<Breadcrumbs aria-label="breadcrumbs">
  
    <Link key={"procedures"} color="neutral" onClick={() => {
        props.showProcess(false);
        props.currentProcess(null);
    }}>
      processes list
    </Link>
  <Typography>{currentProcess.name}</Typography>
</Breadcrumbs>

<div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
    <h1>{`${currentProcess.patient}'s ${currentProcess.name} - ID: ${currentProcess._id}`}</h1>
    <div > 
    <Button 
       style={{margin: "0 1rem"}}
        variant="contained" 
        sx={{bgcolor: '#6682c4'}}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setShowAddProcedure(true)}
    >
        Add Procedure
    </Button>
    <Button 
        variant="contained" 
        sx={{bgcolor: '#6682c4'}}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleDeleteProcedure}
    >
        Delete Procedure
    </Button>
    </div>
</div>

    <Stepper
      orientation="vertical"
      sx={{
        '--Stepper-verticalGap': '2.5rem',
        '--StepIndicator-size': '2.5rem',
        '--Step-gap': '1rem',
        '--Step-connectorInset': '0.5rem',
        '--Step-connectorRadius': '1rem',
        '--Step-connectorThickness': '4px',
        '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
        [`& .${stepClasses.completed}`]: {
          '&::after': { bgcolor: 'success.solidBg' },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: '4px solid',
            borderColor: '#fff',
            boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.softDisabledColor',
        },
        [`& .${typographyClasses['title-sm']}`]: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '10px',
        },
      }}
    >
      {displayProcedures()}
    </Stepper>
    </>}
    </div>
   
  )
}

export default ProcessPage