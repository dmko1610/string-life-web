"use client";
import { Instrument } from "@/entities/instrument/model";
import { fetchInstrumentsSafe } from "@/services/instrumentService";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import DashboardSkeleton from "./DashboardSkeleton";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Home() {
  const router = useRouter();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchInstrumentsSafe();
      setInstruments(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        {t("title")}
      </Typography>

      {loading ? (
        <DashboardSkeleton />
      ) : !!instruments.length ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {instruments.map((instrument) => (
            <ListItem key={instrument.id}>
              <ListItemText
                primary={instrument.name}
                secondary={instrument.type}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">
          No instruments found. Start by adding a new one
        </Typography>
      )}

      <LanguageSwitcher />

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
