import React, {
  useState
} from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  IconButton
} from '@material-ui/core';

import ForwardIcon from '@material-ui/icons/Forward';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[300]
    }
  }
});

function App() {

  const [aboutMe, setaboutMe] = useState(false);
  const [knowledge, setknowledge] = useState(false);
  const [experience, setexperience] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      {/* Main page */}
      <Typography variant='h4'>About Me</Typography>
      <Typography variant='h4'>Knowledge</Typography>
      <Typography variant='h4'>Experience</Typography>
      {/* About me */}
      <Dialog open={aboutMe} onClose={() => setaboutMe(false)}>
        <DialogTitle>About Me</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Peter Rothstein</Typography>
          <Typography variant='body1'>proth@iastate.edu</Typography>
          <Typography variant='body1'>COM S 309</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setaboutMe(false)}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton color='primary'
            onClick={() => setaboutMe(true)}>
            <ForwardIcon />
      </IconButton>
      {/* Knowledge */}
      <Dialog open={knowledge} onClose={() => setknowledge(false)}>
        <DialogTitle>Knowledge</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Java</Typography>
          <Typography variant='body1'>C</Typography>
          <Typography variant='body1'>Python</Typography>
          <Typography variant='body1'>HTML + CSS</Typography>
          <Typography variant='body1'>Swift</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setknowledge(false)}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton color='primary'
            onClick={() => setknowledge(true)}>
            <ForwardIcon />
      </IconButton>
      {/* Experience */}
      <Dialog open={experience} onClose={() => setexperience(false)}>
        <DialogTitle>Experience</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Internship</Typography>
          <Typography variant='body1'>Courses</Typography>
          <Typography variant='body1'>App Dev Projects</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setexperience(false)}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton color='primary'
            onClick={() => setexperience(true)}>
            <ForwardIcon />
      </IconButton>
    </ThemeProvider>
  );
}

export default App;
