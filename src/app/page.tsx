import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  return <Container maxWidth="sm">
    <Typography variant="h3" gutterBottom>
      Welcome to String life web with Material UI!
    </Typography>
    <Button variant="contained" color="primary">
      Click me!
    </Button>
  </Container>;
}
