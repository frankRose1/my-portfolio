import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { Mutation } from 'react-apollo';
import { SEND_EMAIL_MUTATION } from '../graphql';
import Error from './Shared/Error';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const Contact = ({ classes, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [comments, setComments] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e, mutation) => {
    e.preventDefault();
    mutation();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* Title */}
        <Typography className={classes.title} variant='headline'>
          Want to chat? Send a message!
        </Typography>
        <Mutation
          mutation={SEND_EMAIL_MUTATION}
          variables={{
            senderEmail: email,
            senderName: name,
            subject,
            comments,
            senderPhone: phone
          }}
          onCompleted={data => {
            console.log(data);
            setShowDialog(true);
          }}
        >
          {(sendEmail, { loading, error }) => (
            <form
              className={classes.form}
              onSubmit={e => handleSubmit(e, sendEmail)}
            >
              {/* Email */}
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='Company or personal email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              {/* Name */}
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                  id='name'
                  placeholder='Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>

              {/* Phone (Optional) */}
              <FormControl margin='normal' fullWidth>
                <InputLabel htmlFor='phone'>Phone</InputLabel>
                <Input
                  id='phone'
                  placeholder='Phone number'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </FormControl>

              {/* Subject */}
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='subject'>Subject</InputLabel>
                <Input
                  id='subject'
                  placeholder='Subject'
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </FormControl>

              {/* Comments */}
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='comments'>Comments</InputLabel>
                <TextField
                  id='comments'
                  placeholder='Include some comments regarding your message'
                  rows='4'
                  multiline
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                />
              </FormControl>

              <Button
                type='submit'
                className={classes.button}
                fullWidth
                variant='contained'
                className={classes.submit}
                disabled={
                  loading ||
                  !email.trim() ||
                  !name.trim() ||
                  !subject.trim() ||
                  !comments.trim()
                }
              >
                Send{loading ? 'ing your message' : ''}
              </Button>

              {/* Error Alert */}
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </Paper>

      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        disableBackdropClick={true}
      >
        <DialogTitle>Your message has been sent!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for reaching out, I will get back to you as soon as I can!
          </DialogContentText>
          <DialogActions>
            <Button
              className={classes.button}
              onClick={() => history.push('/')}
              color='accent'
              variant='contained'
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 550,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  button: {
    backgroundColor: theme.palette.info.main,
    color: '#fff'
  }
});

export default withStyles(styles)(Contact);
