"use client";
import { getInstruments } from "@/entities/instrument/api";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInstruments();
        setInstruments(data);
      } catch (error) {
        console.error("Error fetching instruments:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      {!!instruments.length ? (
        <ul>
          {instruments.map((instrument) => (
            <li key={instrument.id}>
              {instrument.name} ({instrument.type})
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body1">
          No instruments found. Start by adding a new one
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/add-instrument")}
      >
        Click me!
      </Button>
    </Container>
  );
}
