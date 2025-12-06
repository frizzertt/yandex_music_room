import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <Grid 
        container 
        spacing={2} 
        justifyContent="center"
      >
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
  
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="outlined"
            onChange={this.handleTextFieldChange}
          />
        </Grid>
  
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
  
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
          <Button 
            variant="contained" 
            color="secondary" 
            to="/" 
            component={Link}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: "Room not found." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}