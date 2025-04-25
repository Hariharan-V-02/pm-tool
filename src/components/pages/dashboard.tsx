import React from "react";
import { Box, Grid } from "@mui/material";
import PieChart from "../dashboard/piechart";
import BarChart from "../dashboard/barchart";
import LineChart from "../dashboard/linechart";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "#f4f3f3",
              borderRadius: 5,
              height: "100%",
              width: "700px",
            }}
          >
            <BarChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "#f4f3f3",
              borderRadius: 5,
              height: "100%",
              width: "100%",
            }}
          >
            <PieChart />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          background: "#f4f3f3",
          borderRadius: 5,
          height: "100%",
          width: "100%",
          marginTop: 7,
        }}
      >
        <LineChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
