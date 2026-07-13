import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handlelogin = (e) => {
    e.preventDefault();
  };
  const handleSignup = (e) => {
    e.preventDefault();
  };

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
            <form onSubmit={handlelogin} className="w-96" action="">
              <TextField
                required
                fullWidth
                label="User Name"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              ></TextField>

              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              ></TextField>

              <button
                sx={{
                  marginTop: "1 rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className=" mt-4 w-96 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 "
              >
                Login
              </button>
            </form>

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
              Sign Up
            </button>
          </>
        ) : (
          <>
            <Typography variant="h5" className="text-blue-600">
              Sign Up
            </Typography>

            <form onSubmit={handleSignup} className="w-96" action="">
              <Stack className=" items-center relative mt-4 mx-32">
                <Avatar
                  sx={{
                    height: "7rem",
                    objectFit: "cover",
                  }}
                  className="!w-[7rem]"
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }}
                  component="label"
                  className="absolute w-8 h-8"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              {avatar.error && (
                <Typography
                  className="!mt-2.5 flex justify-center"
                  color="error"
                  variant="caption"
                >
                  {avatar.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Full Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              ></TextField>

              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              ></TextField>

              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              ></TextField>

              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              ></TextField>

              <button
                sx={{
                  marginTop: "1 rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className=" mt-4 w-96 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 "
              >
                Sign Up
              </button>
            </form>

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
