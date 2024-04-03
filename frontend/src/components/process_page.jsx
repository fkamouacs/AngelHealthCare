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

const Process_page = (props) => {
    const isId = (row) => {
        return row._id === props._id;
    }
    
    const [currentProcess, setCurrentProcess] = useState(processes.find(isId))
    const [showProcedure, setShowProcedure] = useState(false);
    const [currentProcedureId, setCurrentProcedureId] = useState(null);

    const handleProcedureClick = (procedure) => {
        setShowProcedure(true);
        setCurrentProcedureId(procedure._id)
    }


   const displayProcedures = () => {
    return procedures.map(p => (
        <Step
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
    )
    )
   }


  return (
    <div style={{
       
        marginTop: '2rem'
    }}>

        {showProcedure ? <Procedure _id={currentProcedureId} showProcedure={setShowProcedure} 
        currentProcedure={setCurrentProcedureId} showProcess={props.showProcess} currentProcess={props.currentProcess}/> : <>

<Breadcrumbs aria-label="breadcrumbs">
  
    <Link key={"procedures"} color="neutral" onClick={() => {
        props.showProcess(false);
        props.currentProcess(null);
    }}>
      procedures list
    </Link>
  <Typography>{currentProcess.name}</Typography>
</Breadcrumbs>

    <h1>{`${currentProcess.patient}'s ${currentProcess.name} - ID: ${currentProcess._id}`}</h1>

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

export default Process_page