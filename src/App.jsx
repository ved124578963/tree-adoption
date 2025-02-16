import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; // Footer import
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminLogin from "./Pages/Adminlogin";
import AdminDashboard from "./Pages/AdminDashboard";
import Adminusers from "./Pages/Adminusers";
import Forgotpassword from "./Pages/Forgotpassword";
import Adopttrees from "./Pages/Adopttrees";
import Mytrees from "./Pages/Mytrees";
import Leaderboard from "./Pages/Leaderboard";
import Donatetree from "./Pages/Donatetree";
import ProfilePage from "./Components/ProfilePage";

function App() {
    const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {" "}
                {/* Full height wrapper */}
                <Navbar /> {/* Navbar at the top */}
                <main className="flex-grow">
                    {" "}
                    {/* Takes up remaining space */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/adminlogin" element={<AdminLogin />} />
                        <Route
                            path="/admindashboard"
                            element={<AdminDashboard />}
                        />
                        <Route path="/Adminusers" element={<Adminusers />} />
                        <Route
                            path="/Forgotpassword"
                            element={<Forgotpassword />}
                        />
                        <Route path="/Adopttrees" element={<Adopttrees />} />
                        <Route path="/Mytrees" element={<Mytrees />} />
                        <Route path="/Leaderboard" element={<Leaderboard />} />
                        <Route path="/Donatetree" element={<Donatetree />} />
                        <Route
                            path="/profile"
                            element={<ProfilePage user={user} />}
                        />
                    </Routes>
                </main>
                <Footer /> {/* Footer stays at the bottom */}
            </div>
        </Router>
    );
}

export default App;
