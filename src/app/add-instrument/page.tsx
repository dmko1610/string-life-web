"use client";
import { addInstrument } from "@/entities/instrument/api";
import {
  Button,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function AddInstrument() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value as string);
  };
  const handleSelect = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleSubmit = async () => {
    try {
      await addInstrument(name, type);
      setName("");
      setType("");
      alert("Instrument has been added!");
    } catch (error) {
      console.error("something happened ", error);
      alert("Error adding instrument");
    }
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
        onChange={handleChange}
      />
      <Select
        fullWidth
        label="Instrument's type"
        value={type}
        onChange={handleSelect}
      >
        <MenuItem value="acoustic">Acoustic</MenuItem>
        <MenuItem value="electro">Electro</MenuItem>
        <MenuItem value="bass">Bass</MenuItem>
        <MenuItem value="ukulele">Ukulele</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
}
