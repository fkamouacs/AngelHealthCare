import {useState} from 'react'
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';

function createData(_id, name, patient, procedureIds, startDate, endDate) {
    return {_id, name, patient, procedureIds, startDate, endDate };
  }
  
  const rows = [
    createData(1,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
    createData(2,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
    createData(3,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
    createData(4,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
    createData(5,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
    createData(6,'Knee Surgery', "JohnSmith", [1,2,3,4], "2/1/2024", "N/A"),
  ];

  function createProcedure(_id, name, step, stage) {
    return {_id, name, step, stage}
  }

  const procedures = [
    createProcedure(1,"preop", 1, "success"),
    createProcedure(2,"Knee Surgery", 2, "success"),
    createProcedure(3,"postop", 3, "primary"),
    createProcedure(4,"checkup", 4, "disabled"),
  ]

const Process_page = (props) => {
    const isId = (row) => {
        return row._id === props._id;
    }
    
    const [currentProcess, setCurrentProcess] = useState(rows.find(isId))

    const handleProcedureClick = () => {
        console.log("hihi")
    }


   const displayProcedures = () => {
    return procedures.map(p => (
        <Step
        style={{
            cursor: "pointer"
        }}
        onClick={handleProcedureClick}
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
    </div>
  )
}

export default Process_page