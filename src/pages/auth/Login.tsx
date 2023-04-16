import { Box, Button,  Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Box
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
        >
            <Box display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => loginWithRedirect()}
                    style={{ width: "240px" }}
                >
                    Sign in
                </Button>
                <Typography color="secondary">
                    Powered by Auth0
                </Typography>
            </Box>
        </Box>
    );
};