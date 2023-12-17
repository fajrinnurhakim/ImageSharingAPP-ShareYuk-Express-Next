import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardShare from "./pages/dashboard";
import LoginRoute from "./routes/auth";
import Beranda from "./pages/beranda";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Login />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Register />
                            </>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <>
                                <home />
                            </>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <LoginRoute>
                                    <DashboardShare />
                                </LoginRoute>
                            </>
                        }
                    />
                    <Route
                        path="/beranda"
                        element={
                            <>
                                <LoginRoute>
                                    <Beranda />
                                </LoginRoute>
                            </>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
