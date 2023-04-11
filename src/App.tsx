import { Authenticated, Refine } from "@refinedev/core";
import {
    ThemedLayout,
    ErrorComponent,
    RefineThemes,
    RefineSnackbarProvider,
    notificationProvider,
    AuthPage,
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
import { firebaseAuthProvider } from "auth/firebaseAuthProvider";
import { CustomBlogPostsList } from "pages/blog-posts/list";


const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Red}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        authProvider={firebaseAuthProvider}
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
                                <Route path="blog-posts">
                              
                              <Route index element={<CustomBlogPostsList />} /> {/**   our own custom item listing component */}
                              <Route
                                  path=":id"
                                  element={<MuiInferencer />}   /** Let the inferencer infer and use the generated component based on API response from the data provider */
                              />
                              <Route
                                  path="edit/:id"
                                  element={<MuiInferencer />} 
                              />
                              <Route
                                  path="create"
                                  element={<MuiInferencer />}
                              />
                                </Route>
                                </Route>

                            <Route
                            element={
                            <Authenticated fallback={<Outlet />}>
                                <NavigateToResource resource="blog-posts" />
                            </Authenticated>
                        }>
                                <Route
                                    path="/login"
                                    element={<AuthPage type="login" />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
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