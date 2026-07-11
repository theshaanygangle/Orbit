import React, { useState } from "react";
import { Container, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  return (
    <Container
      component={"main"}
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5" className="text-blue-600">
              Login
            </Typography>
            <form className="w-96" action="">
              <TextField
                required
                fullWidth
                label="User Name"
                margin="normal"
                variant="outlined"
              ></TextField>

              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
              ></TextField>
            </form>

            <button
              sx={{
                marginTop: "1 rem",
              }}
              fullWidth
              varient="contained"
              color="primary"
              type="submit"
              className=" mt-4 w-96 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 "
            >
              Login
            </button>

            <Typography className="!mt-2 !text-sm text-gray-500">OR</Typography>

            <button
              sx={{
                marginTop: "1 rem",
              }}
              fullWidth
              variant="text"
              onClick={toggleLogin}
              className="mt-2 w-96 text-blue-400"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <Typography variant="h5" className="text-blue-600">
              Register
            </Typography>
            <form className="w-96" action="">
              <TextField
                required
                fullWidth
                label="Full Name"
                margin="normal"
                variant="outlined"
              ></TextField>

              <TextField
                required
                fullWidth
                label="Set User Name"
                margin="normal"
                variant="outlined"
              ></TextField>

              <TextField
                required
                fullWidth
                label="Set Password"
                margin="normal"
                variant="outlined"
              ></TextField>
              <TextField
                required
                fullWidth
                label="ReEnter Password"
                margin="normal"
                variant="outlined"
              ></TextField>
            </form>

            <button
              sx={{
                marginTop: "1 rem",
              }}
              fullWidth
              varient="contained"
              color="primary"
              type="submit"
              className=" mt-4 w-96 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 "
            >
              Sign Up
            </button>

            <Typography className="!mt-2 !text-sm text-gray-500">
              Already have account ?
            </Typography>

            <button
              sx={{
                marginTop: "1 rem",
              }}
              fullWidth
              variant="text"
              onClick={toggleLogin}
              className="mt-2 w-96 text-blue-400"
            >
              Login
            </button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
