import React from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import { Grid } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />

        <Grid
          container
          direction={"row"}
          spacing={0.5}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Grid size={{ xs: 4 }}>First</Grid>
          <Grid size={{ xs: 4 }}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid size={{ xs: 4 }}>Third</Grid>
        </Grid>
        <div>Footer</div>
      </>
    );
  };
};

export default AppLayout;
