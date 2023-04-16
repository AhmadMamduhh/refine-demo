import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import {
    ThemedLayout,
    ErrorComponent,
    RefineThemes,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { customDataProvider } from "./rest-data-provider";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";
// import { CustomItemList } from "pages/items/list";
// import { firebaseAuthProvider } from "auth/firebaseAuthProvider";
import { CustomBlogPostsList } from "pages/blog-posts/list";
import { useAuth0 } from "@auth0/auth0-react";
import { Login } from "pages/auth/Login";


const App: React.FC = () => {

    const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    /************************************ Auth0 auth provider setup ************************/
    const auth0AuthProvider: AuthBindings = {
        login: async () => {
            return {
                success: true,
            };
        },
        logout: async () => {
            logout({ logoutParams:{returnTo: window.location.origin }});
            return {
                success: true,
            };
        },
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        check: async () => {
            try {
                const token = await getIdTokenClaims();
                if (token) {
                    // axios.defaults.headers.common = {
                    //     Authorization: `Bearer ${token.__raw}`,
                    // };
                    return {
                        authenticated: true,
                    };
                } else {
                    return {
                        authenticated: false,
                        error: {
                            message: "Check failed",
                            name: "Token not found",
                        },
                        redirectTo: "/login",
                        logout: true,
                    };
                }
            } catch (error: any) {
                return {
                    authenticated: false,
                    error: new Error(error),
                    redirectTo: "/login",
                    logout: true,
                };
            }
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            if (user) {
                return {
                    ...user,
                    avatar: user.picture,
                };
            }
            return null;
        },
    };

    return (
        <ThemeProvider theme={RefineThemes.Red}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        authProvider={auth0AuthProvider}
                        dataProvider={customDataProvider(
                            "https://api.fake-rest.refine.dev",   // Using dummy demo API
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                show: "/blog-posts/:id",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
  <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />

                            <Route path="/blog-posts">
                                <Route index element={<CustomBlogPostsList />} />
                                <Route path="create" element={<MuiInferencer />} />
                                <Route path="edit/:id" element={<MuiInferencer />} />
                                <Route path="show/:id" element={<MuiInferencer />} />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="blog_posts" />
                                </Authenticated>
                            }
                        >
                            <Route path="/login" element={<Login />} />
                        </Route>

                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </BrowserRouter>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;