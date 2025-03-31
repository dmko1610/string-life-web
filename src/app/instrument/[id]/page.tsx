"use client";

import { Button, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function InstrumentDetails() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <Container>
      <Typography>Instrument Details</Typography>
      <Typography>Instrument ID: {id}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
}
