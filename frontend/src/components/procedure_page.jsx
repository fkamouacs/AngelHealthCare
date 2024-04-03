import {React, useState, Fragment, useEffect} from 'react'
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Avatar from '@mui/joy/Avatar';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {procedures, accounts, getAvailableAccounts, getProcedureById} from "../fakedatabase.js"


 const Procedure = (props) => {
 
const [currentProcedure, setCurrentProcedure] = useState(getProcedureById(props._id))

const [availableStaff, setAvailableStaff] = useState(getAvailableAccounts(currentProcedure.date, currentProcedure._id))
const [assignedStaff, setAssignedStaff] = useState(getProcedureById(props._id).staff)

const [members, setMembers] = useState([]);

useEffect(() => {
  const arr = [];

  for(let i = 0; i < availableStaff.length; i++) {
    if (assignedStaff.find((el) => el === availableStaff[i]._id)) {
      arr.push({[availableStaff[i]._id]: true})
    } else {
      arr.push({[availableStaff[i]._id]: false});
    }
  }
  setMembers(arr)

},[availableStaff])

console.log(members)
 
const toggleMember = (index, id) => (event) => {
    const newMembers = [...members];
    newMembers[index] = {[id]: event.target.checked };
    setMembers(newMembers);
  };

  const displayStaff = () => {
    if (members.length >0)
    return availableStaff.map((a, index )=> (
    <ListItem {...(a && { variant: 'soft', color: 'neutral' })}>
    <Avatar aria-hidden="true" variant="solid">
      FP
    </Avatar>
    <Checkbox
      label={a.name}
      overlay
      color="neutral"
      checked={members.find((m) => Object.keys(m)[0] == a._id)[a._id]}
      onChange={toggleMember(index, a._id)}
    />
  </ListItem>))
  }
  
  return (
    <div>
<Breadcrumbs aria-label="breadcrumbs">
  
  <Link key={"procedures"} color="neutral" onClick={() => {
      props.showProcess(false);
      props.currentProcess(null);
  }}>
    procedures list
  </Link>

  <Link key={"procedures"} color="neutral" onClick={() => {
      props.showProcedure(false);
      props.currentProcedure(null);
  }}>
    procedures list
  </Link>
<Typography>{currentProcedure.name}</Typography>
</Breadcrumbs>


<h1>{`${currentProcedure.patient}'s ${currentProcedure.name} - ID: ${currentProcedure._id}`}</h1>

<Sheet
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 'sm',
        width: 360,
        maxWidth: '100%',
      }}
    >
      <Typography
        id="staff"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Available staff
      </Typography>
      <div role="group" aria-labelledby="member">
        <List
          sx={{
            '--ListItem-gap': '0.75rem',
            [`& .${checkboxClasses.root}`]: {
              mr: 'auto',
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row-reverse',
            },
          }}
        >
          {displayStaff()}
        </List>
      </div>
    </Sheet>


</div>)
}

export default Procedure