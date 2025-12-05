import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: 3,
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid size={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Create Room
              </Typography>
            </Grid>
            
            <Grid size={12}>
              <FormControl fullWidth>
                <FormHelperText component="div" sx={{ textAlign: "center", mb: 2 }}>
                  Guest Control of Playback State
                </FormHelperText>
                <RadioGroup 
                  row 
                  defaultValue="true"
                  onChange={this.handleGuestCanPauseChange}
                  sx={{ justifyContent: "center" }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                    sx={{ mx: 2 }}
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />}
                    label="No Control"
                    labelPlacement="bottom"
                    sx={{ mx: 2 }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl fullWidth>
                <TextField
                  required={true}
                  type="number"
                  onChange={this.handleVotesChange}
                  defaultValue={this.defaultVotes}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                  }}
                  fullWidth
                />
                <FormHelperText component="div" sx={{ textAlign: "center", mt: 1 }}>
                  Votes Required To Skip Song
                </FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid size={12}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Button 
                  color="secondary" 
                  variant="contained" 
                  onClick={this.handleRoomButtonPressed}
                  sx={{ width: "200px" }}
                >
                  Create A Room
                </Button>
                
                <Button 
                  color="primary" 
                  variant="contained" 
                  to="/" 
                  component={Link}
                  sx={{ width: "200px" }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
}