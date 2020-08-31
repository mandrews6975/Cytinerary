import React, {
  useState
} from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

import lightBlue from '@material-ui/core/colors/lightBlue';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  IconButton
} from '@material-ui/core';

import './App.css';

import ForwardIcon from '@material-ui/icons/Forward';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      main: indigo[800]
    },
    background: {
      default: lightBlue[100]
    }
  }
});

function App() {

  const [aboutMe, setaboutMe] = useState(false);
  const [knowledge, setknowledge] = useState(false);
  const [experience, setexperience] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <div style={{
        backgroundColor: theme.palette.background.default,
        minHeight: window.innerHeight
      }}>
        {/* Main page */}
        <Typography color='primary' variant='h4'>About Me</Typography>
        <Typography color='primary' variant='h4'>Knowledge</Typography>
        <Typography color='primary' variant='h4'>Experience</Typography>
        {/* About me */}
        <Dialog open={aboutMe} onClose={() => setaboutMe(false)}>
          <DialogTitle>About Me</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>Name: Peter Rothstein</Typography>
            <Typography variant='body1'>Interests: Cyber-Security, Automation</Typography>
            <Typography variant='body1'>Hobbies: Working Out, Basketball, Soccer, Hiking</Typography>
            <Typography variant='body1'>Contact: proth@iastate.edu</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setaboutMe(false)}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
        <IconButton style={{ position: 'fixed', marginTop: '-128px', marginLeft: '150px' }} color='secondary'
              onClick={() => setaboutMe(true)}>
              <ForwardIcon />
        </IconButton>
        {/* Knowledge */}
        <Dialog open={knowledge} onClose={() => setknowledge(false)}>
          <DialogTitle>Knowledge</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>Java</Typography>
            <Typography variant='body1'>C</Typography>
            <Typography variant='body1'>C++</Typography>
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
        <IconButton style={{ position: 'fixed', marginTop: '-85px', marginLeft: '169px' }} color='secondary'
              onClick={() => setknowledge(true)}>
              <ForwardIcon />
        </IconButton>
        {/* Experience */}
        <Dialog open={experience} onClose={() => setexperience(false)}>
          <DialogTitle> Experience</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>Software Engineering Internship</Typography>
            <Typography variant='body1'>Courses: 227, 228</Typography>
            <Typography variant='body1'>XCode App Dev Project</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setexperience(false)}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
        <IconButton style={{ position: 'fixed', marginTop: '-45px', marginLeft: '169px' }} color='secondary'
              onClick={() => setexperience(true)}>
              <ForwardIcon />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}
export default App;
