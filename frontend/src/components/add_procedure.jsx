import {useState, useEffect} from 'react'
import { TextField, Button, Container, Typography } from '@mui/material';
import List from '@mui/joy/List';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import ListItem from '@mui/joy/ListItem';
import Avatar from '@mui/joy/Avatar';

import { getAvailableAccountsDate, getProcessById, addProcedure, getAvailableRoomsDate,
getAvailableResourcesDate, 
getAllProcedures} from '../fakedatabase';

const Add_procedure = (props) => {
    const [formData, setFormData] = useState({
        name: '',
   
        date: ''
        
      });

    const [members, setMembers] = useState([]);
    const [availableStaff, setAvailableStaff] = useState([])
    const [assignedStaff, setAssignedStaff] = useState([])


    const [availableRooms, setAvailableRooms] = useState([])
    const [assignedRoom, setAssignedRoom] = useState([])
    const [roomMembers, setRoomMembers] = useState([]);

    const [availableResources, setAvialableResources] = useState([])
    const [assignedResources, setAssignedResources] = useState([])
    const [resourceMembers, setResourceMembers] = useState([])

    useEffect(() => {
        if(formData.date !== '') {
            setAvailableStaff(getAvailableAccountsDate(formData.date));
            setAvailableRooms(getAvailableRoomsDate(formData.date))
            setAvialableResources(getAvailableResourcesDate(formData.date));
            console.log("XD")
        }
        
    },[formData.date])


    useEffect(() => {
        if (availableStaff.length !== 0) {
            const arr = [];
            for(let i = 0; i < availableStaff.length; i++) {
            
              if (assignedStaff.find((el) => el === availableStaff[i]._id)) {
                arr.push({[availableStaff[i]._id]: true})
              } else {
                arr.push({[availableStaff[i]._id]: false});
              }
            }
            setMembers(arr)
        }
        
      },[availableStaff])

      useEffect(() => {
        if (availableRooms.length !== 0) {
            const arr = [];
            for(let i = 0; i < availableRooms.length; i++) {
            
              if (assignedRoom.find((el) => el === availableRooms[i]._id)) {
                arr.push({[availableRooms[i]._id]: true})
              } else {
                arr.push({[availableRooms[i]._id]: false});
              }
            }
            setRoomMembers(arr)
        }
        
      
      },[availableRooms])

      useEffect(() => {
        if (availableResources.length !== 0) {
            const arr = [];
            for(let i = 0; i < availableResources.length; i++) {
            
              if (assignedResources.find((el) => el === availableResources[i]._id)) {
                arr.push({[availableResources[i]._id]: true})
              } else {
                arr.push({[availableResources[i]._id]: false});
              }
            }
            setResourceMembers(arr)
        }
        
      
      },[availableResources])


    const toggleMember = (index, id) => (event) => {
        const newMembers = [...members];
        newMembers[index] = {[id]: event.target.checked };
        setMembers(newMembers);
        
        
        if (event.target.checked) {
            setAssignedStaff([...assignedStaff, id])
        } else {
            // remove staff
            setAssignedStaff(assignedStaff.filter((s)=> 
                s !== id
            ))
        }

      };

      const toggleMemberRooms = (index, id) => (event) => {
        const newMembers = [...roomMembers];
        newMembers[index] = {[id]: event.target.checked };
        setRoomMembers(newMembers);
        
        
        if (event.target.checked) {
            setAssignedRoom([...assignedRoom, id])
        } else {
            // remove room
            setAssignedRoom(assignedRoom.filter((s)=> 
                s !== id
            ))
        }

      };

      const toggleMemberResources = (index, id) => (event) => {
        const newMembers = [...resourceMembers];
        newMembers[index] = {[id]: event.target.checked };
        setResourceMembers(newMembers);
        
        
        if (event.target.checked) {
            setAssignedResources([...assignedResources, id])
        } else {
            // remove resource
            setAssignedResources(assignedResources.filter((s)=> 
                s !== id
            ))
        }

      };

    

      const displayStaff = () => {
    
        if (members.length === availableStaff.length )
        
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


      const displayRoom = () => {
        if (roomMembers.length === availableRooms.length )
        
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
        if (resourceMembers.length === availableResources.length )
        
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


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(assignedStaff)

        console.log(formData);

        addProcedure(formData.name, props.currentProcess.patient, formData.date, assignedStaff, assignedResources, assignedRoom, props.currentProcess._id)

        const newProcedureIds = getProcessById(props.currentProcess._id).procedureIds
        
        let difference = newProcedureIds.filter(x => !props.currentProcess.procedureIds.includes(x));
        
        const newState = {...props.currentProcess}
        newState.procedureIds = [...props.currentProcess.procedureIds, ...difference]
        
        props.setCurrentProcess(newState)


        props.showAddProcedure(false);
      };

    

  return (
    <div>
        <h1>{`Add Procedure to ${props.currentProcess.patient}'s ${props.currentProcess.name}`}</h1>
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Procedure
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        
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
        id="room"
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
          {displayRoom()}
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
        id="resources"
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


        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>

        <Button
         
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '1rem' }}
          onClick={() => props.showAddProcedure(false)}
        >
          Cancle
        </Button>
      </form>
    </Container>
    </div>
  )
}

export default Add_procedure