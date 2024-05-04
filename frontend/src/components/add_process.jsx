/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import { TextField, Button, Container, Typography } from '@mui/material';
import { getAllPatients, addProcess, getAllProcesses } from '../fakedatabase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import apis from "../api/index.js"

const AddProcess = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        patient: '',
        
      });
      const [value, setValue] = useState('');

      // const [patients, setPatients] = useState(getAllPatients())
      const [patients, setPatients] = useState([])

      useEffect(() => {
        apis.getAllPatients().then(res => {
          setPatients(res.data)
          })
      },[])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleRadioChange = (event) => {
        setValue(event.target.value);

      };

      const handleSubmit = (e) => {
        e.preventDefault();
        

        console.log(formData);
        console.log(value)
        //addProcess(formData.name, value);

        apis.addProcess(formData.name, value).then(res => {
          console.log(res)
          apis.getAllProcesses().then(res => {
            let reversed = res.data.reverse()
            props.setProcesses(reversed)
           console.log(res.data);
         })
        }
       )


        // console.log(getAllProcesses())
        // props.setProcesses(getAllProcesses())
        
       
        props.showAddProcess(false);
      
      
      };

      
      const displayPatients = () => {
        return patients.map((p) => (
            
            <FormControlLabel key={p._id} value={p._id} control={<Radio />} label={p.name} />
           
            
        ))
      }


  return (
    <div>
         <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
        Add Process
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
        <RadioGroup
         style={{margin: '1rem 0', maxHeight: 200, overflow: 'auto'}}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleRadioChange}
      >
        {displayPatients()}
      </RadioGroup>

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
          onClick={() => props.showAddProcess(false)}
        >
          Cancel
        </Button>

        </form>
        </Container>
        
    </div>
  )
}

export default AddProcess