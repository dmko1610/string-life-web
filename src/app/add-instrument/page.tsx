"use client";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddInstrument() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("Instrument added", name);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Add New Instrument</Typography>
      <TextField
        fullWidth
        label="Instrument Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
}
