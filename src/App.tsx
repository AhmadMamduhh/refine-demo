import { Refine } from "@refinedev/core";
import {
    ThemedLayout,
    ErrorComponent,
    RefineThemes,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { customDataProvider } from "./rest-data-provider";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { CustomItemList } from "pages/items/list";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Red}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        dataProvider={customDataProvider(
                            "http://127.0.0.1:5000",   // Local Fastify running server must be used
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "items",
                                list: "/items",
                                show: "/items/:id",
                                create: "/items/create",
                                edit: "/items/edit/:id",
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
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="items" />
                                    }
                                />
                                <Route path="items">
                              
                                    <Route index element={<CustomItemList />} /> {/**   our own custom item listing component */}
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