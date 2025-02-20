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
import AdminTrees from "./Pages/AdminTrees";
import ReportsAnalytics from "./Pages/ReportsAnalytics";
import Adminemails from "./Pages/Adminemails";
import Treemanagement from "./Pages/Treemanagement";
import Feedback from "./Pages/Feedback";
import Floatingbutton from "./Components/Floatingbutton";
import Registertree from "./Pages/Registertree";
import AdminWhatsapp from "./Pages/AdminWhatsapp";
import ChatButton from "./Pages/ChatButton";
import Eventmanagement from "./Pages/Eventmanagement";
import EventList from "./Pages/Eventlist";
import Request from "./Pages/Request";
import Social from "./Pages/Social";
import ProfileSidebar from "./Components/ProfileSidebar";


function App() {
    const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {" "}
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
                            element={<ProfilePage  />}
                        />
                        
                        <Route path="/AdminTrees" element={<AdminTrees />} />
                        <Route path="/ReportsAnalytics" element={<ReportsAnalytics/>} />
                        <Route path="/Adminemails" element={<Adminemails/>} />
                        <Route path="/Treemanagement" element={<Treemanagement/>} />
                        <Route path="/Feedback" element={<Feedback/>} />
                        <Route path="/Registertree" element={<Registertree/>} />
                        <Route path="/AdminWhatsapp" element={<AdminWhatsapp/>} />
                        <Route path="/Eventmanagement" element={<Eventmanagement/>} />
                        <Route path="/Eventlist" element={<EventList />} />
                        <Route path="/Request" element={<Request />} />
                        <Route path="/Social" element={<Social/>} />
                        <Route path="/ProfileSidebar" element={<ProfileSidebar/>} />
                    </Routes>
                </main>
                <ChatButton /> 
                <Footer /> {/* Footer stays at the bottom */}
            </div>
        </Router>
    );
}

export default App;
