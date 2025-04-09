import { Box, Skeleton } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box data-testid="skeleton">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} height={40} width="60%" sx={{ mb: 2 }} />
      ))}
    </Box>
  );
}
