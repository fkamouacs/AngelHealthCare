import {React, useState, Fragment} from 'react'
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Avatar from '@mui/joy/Avatar';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {procedures} from "../fakedatabase.js"

 const Procedure = (props) => {
  const isId = (p) => {
    return p._id === props._id;
}
const [currentProcedure, setCurrentProcedure] = useState(procedures.find(isId))

const [members, setMembers] = useState([false, true, false]);
  const toggleMember = (index) => (event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.checked;
    setMembers(newMembers);
  };


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
          <ListItem >
            <Avatar aria-hidden="true" src="/static/images/avatar/1.jpg" />
            <Checkbox
              disabled
              label="Friedrich Oberbrunner"
              overlay
              checked={members[0]}
              onChange={toggleMember(0)}
            />
          </ListItem>
          <ListItem
            {...(members[1] && {
              variant: 'soft',
              color: 'primary',
            })}
          >
            <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
            <Checkbox
              overlay
              label={
                <Fragment>
                  Adeline O&apos;Reilly{' '}
                  {members[1] && (
                    <Typography
                      aria-hidden="true"
                      sx={{ display: 'block', fontSize: 'sm', color: 'neutral.500' }}
                    >
                      This user is your friend.
                    </Typography>
                  )}
                </Fragment>
              }
              checked={members[1]}
              onChange={toggleMember(1)}
              sx={{ color: 'inherit' }}
            />
          </ListItem>
          <ListItem {...(members[2] && { variant: 'soft', color: 'neutral' })}>
            <Avatar aria-hidden="true" variant="solid">
              FP
            </Avatar>
            <Checkbox
              label="Fernando Pidrillio"
              overlay
              color="neutral"
              checked={members[2]}
              onChange={toggleMember(2)}
            />
          </ListItem>
        </List>
      </div>
    </Sheet>


</div>)
}

export default Procedure