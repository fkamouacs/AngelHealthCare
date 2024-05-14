/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect, useContext} from 'react'
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Procedure from "./procedure_page"
//import {processes, procedures} from "../fakedatabase.js"
import {Button, Grid} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddProcedure from "./add_procedure.jsx"
import apis from "../api/index.js"
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';


const ProcessPage = (props) => {
    const isId = (row) => {
        return row._id === props._id;
    }
    // const [currentProcess, setCurrentProcess] = useState(processes.find(isId))
    const [currentProcess, setCurrentProcess] = useState({})
    const [showProcedure, setShowProcedure] = useState(false);
    const [currentProcedureId, setCurrentProcedureId] = useState(null);
    const [showAddProcedure, setShowAddProcedure] = useState(false);
    
    const [procedures, setProcedures] = useState([])
    const [currentPatientName, setCurrentPatientName] = useState("");


  

    useEffect(() => {
      apis.getProcessById(props._id).then(res => {
        console.log(res)
        setCurrentProcess(res.data);
        
        // Procedures
        apis.getAllProcedures().then(res => {
          console.log(res.data)
          if (res.data != null) {
            setProcedures(res.data);
          }
          
        })
      }).catch(err => {
        console.error('Failed to fetch process:', err.message); // Log more specific error information
    })
    },[])

    useEffect(() => {
      if (currentProcess._id !== null) {
        console.log(currentProcess)
        apis.getPatientById(currentProcess.patientId).then(res => {
          if(res.data != null)
            setCurrentPatientName(res.data.name)
        }).catch(err => {
          console.error('Failed to fetch current process:', err.message); // Log more specific error information
      })

      apis.getAllProcedures().then(res => {
        console.log(res.data)
        if (res.data != null) {
          setProcedures(res.data);
        }
        
      })
      
      } 
  
    }, [currentProcess])


    const handleProcedureClick = (procedure) => {
        setShowProcedure(true);
        setCurrentProcedureId(procedure._id)
    }
   

   const displayProcedures = () => {
   if (currentProcess.procedureIds)
    return procedures.map(p => { if (currentProcess.procedureIds.includes(p._id)) {
  
      if (p.stage == "disabled") {
        return (
          <Step
          key={p._id}
          style={{
              cursor: "pointer"
          }}
          onClick={() => handleProcedureClick(p)}
          disabled
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
        </Step>)
      } else if (p.stage == "primary") {
        return (
          <Step
        key={p._id}
        style={{
            cursor: "pointer"
        }}
        onClick={() => handleProcedureClick(p)}
        active
        indicator={
          <StepIndicator variant="solid" color={p.stage}>
            <AppRegistrationRoundedIcon />
          </StepIndicator>
        }
      >
        <div>
          <Typography level="title-sm">{`Step ${p.step}`}</Typography>
          {p.name}
        </div>
      </Step>
        )
      }
  
      return (
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


   console.log(procedures)

  return (
    <div style={{
        
        marginTop: '2rem',
     
    }}>

        {showProcedure ? <Procedure _id={currentProcedureId} showProcedure={setShowProcedure} currentPatientName={currentPatientName}
        currentProcedure={setCurrentProcedureId} showProcess={props.showProcess} currentProcess={props.currentProcess} currProcess={props._id} setCurrentProcess={setCurrentProcess} /> : showAddProcedure ? <AddProcedure showAddProcedure={setShowAddProcedure}
        currentProcess={currentProcess} setCurrentProcess={setCurrentProcess} currentPatientName={currentPatientName} /> : <>

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
    <h1>{`${currentPatientName}'s ${currentProcess.name} - ID: ${currentProcess._id}`}</h1>
    <Grid container justifyContent={"right"}>
      <Grid item xs={5}>
        {props.isAdmin ? ( <Button 
        style={{margin: "0 1rem"}}
          variant="contained" 
          sx={{bgcolor: '#6682c4'}}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowAddProcedure(true)}
          
      >
          Add Procedure
      </Button>) : <></>}
       

      </Grid>
      <Grid item xs={5}>

        {props.isAdmin ? ( <Button 
            variant="contained" 
            sx={{bgcolor: '#6682c4'}}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleDeleteProcedure}
        >
            Delete Procedure
        </Button>) : <></>}
       
      </Grid>
    </Grid>
</div>

    <Stepper
     style={{margin: '1rem 0',maxHeight: '50vh', overflow: 'auto'}}
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