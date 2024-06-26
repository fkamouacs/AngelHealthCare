/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {React, useState, useEffect} from 'react'
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Avatar from '@mui/joy/Avatar';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import {Button} from '@mui/material';
import apis from "../api/index.js"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { getAvailableAccounts, getProcedureById, 
removeStaffProcedure, addStaffProcedure, getAvailableRooms,
addAccountSchedule, removeAccountSchedule, 
removeRoomProcedure, addRoomProcedure, 
removeRoomSchedule, addRoomSchedule, getAvailableResources, addResourceProcedure, addResourceSchedule, removeResourceProcedure, removeResourceSchedule, changeProcedureDate,
updateProcedureStaffDate,
completeProcedure} from "../fakedatabase.js"



 const Procedure = (props) => {

// const [currentProcedure, setCurrentProcedure] = useState(getProcedureById(props._id))
const [currentProcedure, setCurrentProcedure]  = useState([]);

//const [availableStaff, setAvailableStaff] = useState(getAvailableAccounts(currentProcedure._id,currentProcedure.date))
const [availableStaff, setAvailableStaff] = useState([])

// const [assignedStaff, setAssignedStaff] = useState(getProcedureById(props._id).staff)
const [assignedStaff, setAssignedStaff] = useState([])
const [members, setMembers] = useState([]);

// const [availableRooms, setAvailableRooms] = useState(getAvailableRooms(currentProcedure._id, currentProcedure.date))
const [availableRooms, setAvailableRooms] = useState([])
// const [assignedRoom, setAssignedRoom] = useState(getProcedureById(props._id).rooms)
const [assignedRoom, setAssignedRoom] = useState([])
const [roomMembers, setRoomMembers] = useState([]);


// const [availableResources, setAvialableResources] = useState(getAvailableResources(currentProcedure._id, currentProcedure.date))
const [availableResources, setAvialableResources] = useState([])
//const [assignedResources, setAssignedResources] = useState(getProcedureById(props._id).resources)
const [assignedResources, setAssignedResources] = useState([])
const [resourceMembers, setResourceMembers] = useState([])


const [showEditDate, setShowEditDate] = useState(false);
const [date, setDate] = useState();
const [dateError, setDateError] = useState(false)

const [completeProcedure, setCompleteProcedure] = useState(false);


useEffect(() => {

  // async function fetchData() {

  //   // You can await here
  //   await
  // }
  // fetchData();

  apis.getProcedureById(props._id).then(res => {
    console.log(res.data)
    setCurrentProcedure(res.data)
    setAssignedStaff(res.data.staff)
    setAssignedResources(res.data.resources)
    setAssignedRoom(res.data.rooms)
   
  }).then (() => {
    apis.getAvailableAccounts(currentProcedure._id,currentProcedure.date).then(res => {
      console.log(res.data);
      setAvailableStaff(res.data);
    }).then( () => {
      apis.getAvailableResources(currentProcedure._id, currentProcedure.date).then(res =>{
        console.log(res.data)
        setAvialableResources(res.data)
      }).then( () => {
        apis.getAvailableRooms(currentProcedure._id, currentProcedure.date).then(res => {
          console.log(res.data)
          setAvailableRooms(res.data)
        })
      })
    })
  })

 

  

 

},[])







function isGoodDate(dt){
  var reGoodDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
  return reGoodDate.test(dt);
}

const handleEnter = (e) => {
  if (e.key === "Enter") {
    if (isGoodDate(date)) {
      
      // update staff
      updateProcedureStaffDate(currentProcedure._id, date);
      
      // change procedure date
      changeProcedureDate(currentProcedure._id, date);

      setDateError(false);

      // update available staff
       
      const fetchAvailableStaff = getAvailableAccounts(currentProcedure._id,currentProcedure.date);
       
      let difference = fetchAvailableStaff.filter(x => !availableStaff.includes(x));
       let newAvailableStaff = [...availableStaff, ...difference]
      setAvailableStaff(newAvailableStaff);
      
      setAssignedStaff(getProcedureById(props._id).staff)
      setCurrentProcedure(getProcedureById(props._id))
    } else {
      setDateError(true);
    }
  }
}

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
  


    if (event.target.checked) {
        apis.addStaffProcedure(currentProcedure._id, id)

        // update staff schedule 
        apis.addAccountSchedule(id, currentProcedure.date)
    } else {
        apis.removeStaffProcedure(currentProcedure._id, id)

        //update staff schedule
        apis.removeAccountSchedule(id, currentProcedure.date);
    }

    // update fake database
    // if (event.target.checked) {
    //   addStaffProcedure(currentProcedure._id, id)
      
    //   // update staff schedule
    //   addAccountSchedule(id, currentProcedure.date)
    // } else {
    //   removeStaffProcedure(currentProcedure._id, id)
      
    //   // update staff schedule
    //   removeAccountSchedule(id, currentProcedure.date);
    // }

    // update state
    //setAssignedStaff(getProcedureById(props._id).staff);
    apis.getProcedureById(props._id).then(res => {
      setAssignedStaff(res.data._id.staff)  
    })
  };

const toggleMemberRooms = (index, id) => (event) => {
  const newMembers = [...roomMembers];
  newMembers[index] = {[id]: event.target.checked};
  setRoomMembers(newMembers);


  // update fake database
  // if (event.target.checked) {
  //   addRoomProcedure(currentProcedure._id, id);
  //   // update room schedule
  //   addRoomSchedule(id, currentProcedure.date)
  // } else {
  //   removeRoomProcedure(currentProcedure._id, id);
  //   // update room schedule
  //   removeRoomSchedule(id, currentProcedure.date);
  // }

  if (event.target.checked) {
    apis.addRoomProcedure(currentProcedure._id, id)
    // update room schedule
    apis.addRoomSchedule(id, currentProcedure.date)
  } else {
    apis.removeRoomProcedure(currentProcedure._id, id)
    // update room schedule
    apis.removeRoomSchedule(id, currentProcedure.date)
  }
}

const toggleMemberResources = (index, id) => (event) => {
  const newMembers = [...resourceMembers];
  newMembers[index] = {[id]: event.target.checked};
  setResourceMembers(newMembers);


  //update fake database
  // if (event.target.checked) {
  //  addResourceProcedure(currentProcedure._id, id);
  //  //update resource schedule
  //  addResourceSchedule(id, currentProcedure.date);
  // } else {
  //  removeResourceProcedure(currentProcedure._id, id);
  //  // update resource schedule
  //  removeResourceSchedule(id, currentProcedure.date);
  // }


  if (event.target.checked) {
    apis.addResourceProcedure(currentProcedure._id, id)
    //update resource schedule
    apis.addResourceSchedule(id, currentProcedure.date)
  } else {
    apis.removeResourceProcedure(currentProcedure._id, id)
    // update resource schedule
    apis.removeResourceSchedule(id, currentProcedure.date)
  }

}
  const displayStaff = () => {
    
    if (members.length === availableStaff.length)
    
    return availableStaff.map((a, index )=> (
    <ListItem key={a._id} {...(a && { variant: 'soft', color: 'neutral' })}>
    <Avatar aria-hidden="true" variant="solid">
      FP
    </Avatar>
    <Checkbox
      label={`${a.firstName} ${a.lastName}`}
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
    <ListItem key={a._id} {...(a && { variant: 'soft', color: 'neutral' })}>
    <Avatar aria-hidden="true" variant="solid">
      FP
    </Avatar>
    <Checkbox
      label={a.number}
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
    <ListItem key={a._id} {...(a && { variant: 'soft', color: 'neutral' })}>
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

  const handleCompleteClick = () => {
    //completeProcedure(currentProcedure._id,props.currProcess);
    console.log(props.currProcess)
    apis.completeProcedure(currentProcedure._id, props.currProcess).then((res) => {

      setCompleteProcedure(true);
      console.log(res.data)
      props.setCurrentProcess(res.data)
      
    })
  }


  const handleDeleteProcedure = () => {
    apis.deleteProcedure(currentProcedure._id, props.currProcess).then((res) => {
    


         // send emails to assigned staff
         const email = {
          title: `${currentProcedure.name} procedure deleted`,
          text: `this procedure was deleted`,
          sender: 'huifu.li@stonybrook.edu',
          schedule: date,
        }

        let receivers = [];
        

         const fetchData = async () => {
          for (let i = 0; i < assignedStaff.length; i++) {
            // get account emails

            try {
              const response = await apis.getAccountById(assignedStaff[i])
              const data = await response.data.email
              receivers.push(data);
            } catch (error) {
              console.error("error fetching data: ", error);
            }

            // console.log("assignedstaff " + assignedStaff[i])
            // apis.getAccountById(assignedStaff[i]).then(res => {
            //   console.log(res.data)
            //   receivers.push(res.data.email)
            // })

           
          }
          processResults(receivers);
         }
         

         const processResults = (receivers) => {
          const sender = 'huifu.li@stonybrook.edu';
          console.log("testxd " + receivers)
          apis.sendEmail(email, receivers, sender).then((res) =>{
            console.log("email" + res.data)
          })
         }

         fetchData()


      props.setCurrentProcess(res.data)
      console.log(res);
      props.showProcedure(false);
      props.currentProcedure(null);
    })
  }


  const convertDate = (date) => {
    if(date == null)
      return;
    const onlyDate = date.slice(0,10);
    return onlyDate;
   }


  return (
    <div>
<Breadcrumbs aria-label="breadcrumbs">
  
  <Link key={"procedures"} color="neutral" onClick={() => {
      props.showProcess(false);
      props.currentProcess(null);
  }}>
    processes list
  </Link>

  <Link key={"procedures"} color="neutral" onClick={() => {
      props.showProcedure(false);
      props.currentProcedure(null);
  }}>
    procedures list
  </Link>
<Typography>{currentProcedure.name}</Typography>
</Breadcrumbs>

<div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
  <h1>{`${props.currentPatientName}'s ${currentProcedure.name} - ID: ${currentProcedure._id}`}</h1>
  <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
 
  
  {props.isAdmin ? ( <Button 
            style={{marginLeft: "1rem"}}
            variant="contained" 
            sx={{bgcolor: '#6682c4'}}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleDeleteProcedure}
        >
            Delete Procedure
        </Button>) : <></>}
 
</div>
  </div>
 
  <div style={{fontWeight: "bold"}}>{`${convertDate(currentProcedure.date)} `}</div>

<div style={{display: 'flex'}}>
<div style={{margin: '0 1rem 0 0'}}>
<Sheet
    style={{margin: '1rem 0', maxHeight: 200, overflow: 'auto'}}
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
      style={{margin: '1rem 0', maxHeight: 200, overflow: 'auto'}}
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


    </div>


    <div>

      
    <Sheet
      style={{margin: '1rem 0', maxHeight: 200, overflow: 'auto'}}
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
    {currentProcedure.stage === "primary"  && !completeProcedure ? 
    (<Button 
      style={{margin: "0 1rem"}}
       variant="contained" 
       sx={{bgcolor: '#6682c4'}}
       
       onClick={handleCompleteClick}
   >
       Complete Procedure
   </Button>) : <></>}

   {completeProcedure ? <>Procedure completed</> : <></>}
    </div>

    
</div>
</div>)
}

export default Procedure