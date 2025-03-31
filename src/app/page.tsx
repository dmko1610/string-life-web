"use client";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        No instruments found. Start by adding a new one
      </Typography>

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
