import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createChannel } from '../../providers/appProvider'

const styles = theme => ({
  form: {
  	marginTop: 16,
  	justifyContent: 'center',
  	display: 'flex'
  },
  paper: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
});

class AppContent extends React.Component {
	state = {
        channelName: "",
        channelAvatar:""
	  };

	handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		});
	};

	save = () => {
		createChannel({
          channelName: this.state.channelName,
          channelAvatar: this.state.channelAvatar,
          success: ()=>{},
          error: ()=>{}
        })
	}

	render() {
	    const { classes } = this.props;

	    return (
	    	<div className={classes.root}>
	    		<div className={classes.form}>
			    	<Paper className={classes.paper}>
				    	<TextField
				          id="channelName"
				          label="Channel name"
	      				  value={this.state.channelName}
	      				  onChange={this.handleChange('channelName')}
				          margin="normal"
				          fullWidth
				        />
				        <TextField
				          id="channelAvatar"
				          label="Channel avatar"
	      				  value={this.state.channelAvatar}
	      				  onChange={this.handleChange('channelAvatar')}
				          margin="normal"
				          fullWidth
				        />	        
						<Button 
							onClick={this.save}
							variant="contained" 
							color="primary">
				          Ceate channel
				        </Button>
					</Paper>
				</div>	
			</div>		    
        )	
    }
}

export default withStyles(styles)(AppContent);