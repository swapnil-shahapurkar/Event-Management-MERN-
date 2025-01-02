import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import HomePage from './components/homepage/home.js';
import BirthdayPage from "./components/Elist/Birthday.js";
import OfficialMeetings from "./components/Elist/official_meetings.js";
import KittyParty from "./components/Elist/Kitty_Party.js";
import Wedding from "./components/Elist/Wedding.js";
import Namingcremony from "./components/Elist/naming_ceremony.js";
import Concert from "./components/Elist/concerts_and_parties.js";
import EventBookingForm from "./components/bking/Booking.js";
import YourComponent from "./components/homepage/mybookings.js";
import PrivateRoute from './components/privateroute.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/booking" element={<PrivateRoute element={<EventBookingForm />} />} />
        <Route path="/birthday" element={<PrivateRoute element={<BirthdayPage />} />} />
        <Route path="/official" element={<PrivateRoute element={<OfficialMeetings />} />} />
        <Route path="/kitty" element={<PrivateRoute element={<KittyParty />} />} />
        <Route path="/wedding" element={<PrivateRoute element={<Wedding />} />} />
        <Route path="/naming" element={<PrivateRoute element={<Namingcremony />} />} />
        <Route path="/concert" element={<PrivateRoute element={<Concert />} />} />
        <Route path="/mybookings" element={<PrivateRoute element={<YourComponent />} />} />
      </Routes>
    </Router>
  );
}

export default App;
