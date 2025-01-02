import React, { useState } from "react";
import "./wedding.css"; // Ensure your CSS file is in the correct path

const OfficialMeetings = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [availableDates, setAvailableDates] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Available dates by month
  const calendarHash = {
    January: ["2025-01-04", "2025-01-09", "2025-01-15", "2025-01-20", "2025-01-27"],
    February: ["2025-02-01", "2025-02-07", "2025-02-13", "2025-02-19"],
    March: ["2025-03-02", "2025-03-06", "2025-03-11", "2025-03-19", "2025-03-24"],
    April: ["2025-04-02", "2025-04-09", "2025-04-14", "2025-04-19", "2025-04-25"],
    May: ["2025-05-02", "2025-05-08", "2025-05-12", "2025-05-18", "2025-05-26"],
    June: ["2025-06-03", "2025-06-09", "2025-06-14", "2025-06-21", "2025-06-27"],
    July: ["2025-07-02", "2025-07-07", "2025-07-13", "2025-07-20", "2025-07-29"],
    August: ["2025-08-02", "2025-08-08", "2025-08-15", "2025-08-19", "2025-08-25"],
    September: ["2025-09-01", "2025-09-06", "2025-09-12", "2025-09-17", "2025-09-22"],
    October: ["2025-10-04", "2025-10-10", "2025-10-14", "2025-10-19"],
    November: ["2025-11-02", "2025-11-07", "2025-11-12", "2025-11-18", "2025-11-25"],
    December: ["2025-12-03", "2025-12-10", "2025-12-15", "2025-12-20", "2025-12-26"],
  };
  

  // Handle calendar button click
  const handleCalendarButtonClick = () => {
    const dates = calendarHash[selectedMonth] || [];
    setAvailableDates(dates.length > 0 ? dates : ["No dates available"]);
    setIsPopupVisible(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="icon">
          <img src="/assets/icon.png" alt="Logo" />
        </div>
        <div className="home">
          <a href="/home">
            <i className="fa-solid fa-house"></i> Home
          </a>
        </div>
      </div>

      <div class="carousel">
      <div class="slides">
        <img src="/assets/meet1.jpg" alt="Image 1" />
        <img src="/assets/meet2.jpg" alt="Image 2" />
        <img src="/assets/meet3.webp" alt="Image 3" />
        <img src="/assets/meet4.jpeg" alt="Image 4" />
      </div>
    </div>

      {/* Description */}
      <div className="description" style={{ textAlign: "center" }}>
        <h1 className="animated fadeIn">Celebrate Your Special Day with Us!</h1>
        <p
          className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(239, 231, 237)" }}
        >
  "Official meetings are all about professionalism, and we provide the perfect space for your success."
  </p>
      </div>

      {/* Availability Section */}
      <div className="row2">
        <div className="col2 animated fadeInLeft">
          <h1>Check Venue Availability</h1>
          <p>
          Planning an official meeting? Select a month to find available dates. We offer the perfect environment for business events!

          </p>
        </div>
        <div className="col2 animated fadeInRight">
          <div className="calendar-icon">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
          <label htmlFor="month-select" style={{ alignSelf: "center" }}>
            Select a month:
          </label>
          <br />
          <select
  id="month-select"
  style={{ alignSelf: "center", color: "white" }}
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>

          <br />
          <button className="calendar-button" onClick={handleCalendarButtonClick}>
            Check Calendar
          </button>
        </div>
      </div>

      {/* Calendar Popup */}
      {isPopupVisible && (
        <div id="calendar-popup" className="calendar-popup">
          <div className="calendar-popup-content animated zoomIn">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="calendar">
              <h2>Available Dates</h2>
              <ul id="calendar-slots">
                {availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <div className="row3">
        <h3>Hit the button below to book your meeting!</h3>
        <button
          className="book"
          onClick={() => (window.location.href = "/booking")}
        >
          Book now
        </button>
      </div>

      {/* Footer */}
      <footer className="footer animated fadeInUp">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default OfficialMeetings;
