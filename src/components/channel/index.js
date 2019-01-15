import React from 'react';
import lodash from 'lodash';
import { setMainCallback } from '../../providers/channelProvider'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { createRecord, readRecords, deleteRecord, createMessage } from '../../providers/channelProvider';

const styles = theme => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  form: {
  	marginTop: 16,
  	justifyContent: 'center',
  	display: 'flex'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class ChannelContent extends React.Component {
	/*
		note={
			id:'',
			text:''
		}
	*/
	state = {
    notes: [{
			id:'empty-record',
			text:''
		}],
    newNote: ''
 	};

 	componentDidMount () {
 		setMainCallback(this.dataCallback)
    readRecords();
  }

  handleNewNoteInput = event => {
    this.setState({
      newNote: event.target.value,
    });
  };

  dataCallback = (receivedData) => {
    if (receivedData.action === 'READ_LIST'){
      this.setState({
        notes: receivedData.content.map((item)=>({
          id: item.id,
          text: item.data
        })),
      });
    }

    if (receivedData.action === 'CREATE'){
      const notes = lodash.cloneDeep(this.state.notes);

      notes.push({
        id: receivedData.content.id,
        text: receivedData.content.data
      });

      this.setState({
        notes
      });
    }

    if (receivedData.action === 'DELETE'){
      console.log('DELETE', receivedData)
      this.setState({
        notes: this.state.notes.filter((item)=>item.id !== receivedData.content.id)
      });
    }
  }

  addNote = () => {
    createRecord(this.state.newNote);
    createMessage(this.state.newNote);
    this.setState({
      newNote: '',
    });
  }

  deleteNote = (id) => {
  	console.log(id)
    deleteRecord(id)
  }

  renderNote(){
  	return this.state.notes.map((note)=>(
  		<ListItem key={note.id} button>
              <ListItemText
                primary={note.text}
              />
              <ListItemSecondaryAction >
                <IconButton aria-label="Delete" onClick={()=>{this.deleteNote(note.id)}}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
        	</ListItem>
	  ));    	
  }

	render() {
	    const { channelID, classes } = this.props;

	    return (
    		<div className={classes.form}>
		    	<Paper className={classes.paper}>
		    		<Typography variant="h6" className={classes.title}>
	              		Notes
		            </Typography>
		            <List>
	                	{this.renderNote()}
	              	</List>
	              	<Divider />
	              	<div className={classes.container}>	              		
				      <Button variant="contained" color="primary" className={classes.button} onClick={this.addNote}>
				        Add
				        <AddIcon />
				      </Button>
				      <TextField
				      	multiline
				      	fullWidth
        				placeholder="write a note"
				        className={classes.input}
                onChange={this.handleNewNoteInput}
                value={this.state.newNote}
				      />
					</div>	
				</Paper>
			</div>		    
        )	
    }
}

export default withStyles(styles)(ChannelContent);