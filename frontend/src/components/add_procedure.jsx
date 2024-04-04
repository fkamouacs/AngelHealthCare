import {useState, useEffect} from 'react'
import { TextField, Button, Container, Typography } from '@mui/material';
import List from '@mui/joy/List';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import ListItem from '@mui/joy/ListItem';
import Avatar from '@mui/joy/Avatar';

import { getAvailableAccountsDate, getProcessById, addProcedure } from '../fakedatabase';

const Add_procedure = (props) => {
    const [formData, setFormData] = useState({
        name: '',
   
        date: ''
        
      });

    const [members, setMembers] = useState([]);
    const [availableStaff, setAvailableStaff] = useState([])
    const [assignedStaff, setAssignedStaff] = useState([])

    useEffect(() => {
        if(formData.date !== '') {
            setAvailableStaff(getAvailableAccountsDate(formData.date));
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

        addProcedure(formData.name, props.currentProcess.patient, formData.date, assignedStaff, [],[],props.currentProcess._id)
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
      </form>
    </Container>
    </div>
  )
}

export default Add_procedure