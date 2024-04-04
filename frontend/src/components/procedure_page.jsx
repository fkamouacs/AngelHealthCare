import {React, useState, Fragment, useEffect} from 'react'
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Avatar from '@mui/joy/Avatar';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {procedures, accounts, getAvailableAccounts, getProcedureById, 
removeStaffProcedure, addStaffProcedure, getAvailableRooms,
addAccountSchedule, removeAccountSchedule, 
removeRoomProcedure, addRoomProcedure, 
removeRoomSchedule, addRoomSchedule, getAvailableResources, addResourceProcedure, addResourceSchedule, removeResourceProcedure, removeResourceSchedule} from "../fakedatabase.js"
import { useTheme } from '@emotion/react';


 const Procedure = (props) => {
 
const [currentProcedure, setCurrentProcedure] = useState(getProcedureById(props._id))

const [availableStaff, setAvailableStaff] = useState(getAvailableAccounts(currentProcedure._id,currentProcedure.date))
const [assignedStaff, setAssignedStaff] = useState(getProcedureById(props._id).staff)
const [members, setMembers] = useState([]);

const [availableRooms, setAvailableRooms] = useState(getAvailableRooms(currentProcedure._id, currentProcedure.date))
const [assignedRoom, setAssignedRoom] = useState(getProcedureById(props._id).rooms)
const [roomMembers, setRoomMembers] = useState([]);


const [availableResources, setAvialableResources] = useState(getAvailableResources(currentProcedure._id, currentProcedure.date))
const [assignedResources, setAssignedResources] = useState(getProcedureById(props._id).resources)
const [resourceMembers, setResourceMembers] = useState([])


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


useEffect(() => {
  const arr = [];

  for(let i = 0; i < availableRooms.length; i++) {
    if (assignedRoom.find((el) => el === availableRooms[i]._id)) {
      
      arr.push({[availableRooms[i]._id]: true})
    } else {
      arr.push({[availableRooms[i]._id]: false});
    }
  }
  setRoomMembers(arr);
},[availableRooms])

useEffect(() => {
  const arr = [];

  for(let i = 0; i < availableResources.length; i++) {
    if (assignedResources.find((el) => el === availableResources[i]._id)) {
      
      arr.push({[availableResources[i]._id]: true})
    } else {
      arr.push({[availableResources[i]._id]: false});
    }
  }
  setResourceMembers(arr);
},[availableResources])

 
const toggleMember = (index, id) => (event) => {
    const newMembers = [...members];
    newMembers[index] = {[id]: event.target.checked };
    setMembers(newMembers);

    // update fake database
    if (event.target.checked) {
      addStaffProcedure(currentProcedure._id, id)
      
      // update staff schedule
      addAccountSchedule(id, currentProcedure.date)
    } else {
      removeStaffProcedure(currentProcedure._id, id)
      
      // update staff schedule
      removeAccountSchedule(id, currentProcedure.date);
    }

    // update state
    setAssignedStaff(getProcedureById(props._id).staff);
  };

const toggleMemberRooms = (index, id) => (event) => {
  const newMembers = [...roomMembers];
  newMembers[index] = {[id]: event.target.checked};
  setRoomMembers(newMembers);


  // update fake database
  if (event.target.checked) {
    addRoomProcedure(currentProcedure._id, id);
    // update room schedule
    addRoomSchedule(id, currentProcedure.date)
  } else {
    removeRoomProcedure(currentProcedure._id, id);
    // update room schedule
    removeRoomSchedule(id, currentProcedure.date);
  }
}

const toggleMemberResources = (index, id) => (event) => {
  const newMembers = [...resourceMembers];
  newMembers[index] = {[id]: event.target.checked};
  setResourceMembers(newMembers);


  // update fake database
  if (event.target.checked) {
   addResourceProcedure(currentProcedure._id, id);
   //update resource schedule
   addResourceSchedule(id, currentProcedure.date);
  } else {
   removeResourceProcedure(currentProcedure._id, id);
   // update resource schedule
   removeResourceSchedule(id, currentProcedure.date);
  }
}
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
  

  const displayRooms = () => {
    if (roomMembers.length >0)
    return availableRooms.map((a, index )=> (
    <ListItem {...(a && { variant: 'soft', color: 'neutral' })}>
    <Avatar aria-hidden="true" variant="solid">
      FP
    </Avatar>
    <Checkbox
      label={a._id}
      overlay
      color="neutral"
      checked={roomMembers.find((m) => Object.keys(m)[0] == a._id)[a._id]}
      onChange={toggleMemberRooms(index, a._id)}
    />
  </ListItem>))
  }

  const displayResources = () => {
    if (resourceMembers.length >0)
    return availableResources.map((a, index )=> (
    <ListItem {...(a && { variant: 'soft', color: 'neutral' })}>
    <Avatar aria-hidden="true" variant="solid">
      FP
    </Avatar>
    <Checkbox
      label={a.name}
      overlay
      color="neutral"
      checked={resourceMembers.find((m) => Object.keys(m)[0] == a._id)[a._id]}
      onChange={toggleMemberResources(index, a._id)}
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
        Available rooms
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
          {displayRooms()}
        </List>
      </div>
    </Sheet>






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
        Available resources
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
          {displayResources()}
        </List>
      </div>
    </Sheet>

</div>)
}

export default Procedure