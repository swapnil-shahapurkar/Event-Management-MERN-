import React, { useState } from "react";
import "./wedding.css"; // Ensure your CSS file is in the correct path

const KittyParty = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [availableDates, setAvailableDates] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Available dates by month
  const calendarHash = {
    January: ["2025-01-04", "2025-01-11", "2025-01-16", "2025-01-23", "2025-01-27"],
    February: ["2025-02-03", "2025-02-06", "2025-02-14", "2025-02-20"],
    March: ["2025-03-01", "2025-03-05", "2025-03-10", "2025-03-16", "2025-03-25"],
    April: ["2025-04-02", "2025-04-06", "2025-04-12", "2025-04-19", "2025-04-25"],
    May: ["2025-05-02", "2025-05-08", "2025-05-15", "2025-05-23", "2025-05-30"],
    June: ["2025-06-01", "2025-06-04", "2025-06-12", "2025-06-17", "2025-06-22"],
    July: ["2025-07-02", "2025-07-06", "2025-07-14", "2025-07-19", "2025-07-27"],
    August: ["2025-08-02", "2025-08-08", "2025-08-14", "2025-08-22", "2025-08-29"],
    September: ["2025-09-03", "2025-09-09", "2025-09-13", "2025-09-21", "2025-09-26"],
    October: ["2025-10-03", "2025-10-08", "2025-10-16", "2025-10-23"],
    November: ["2025-11-02", "2025-11-07", "2025-11-13", "2025-11-18", "2025-11-24"],
    December: ["2025-12-04", "2025-12-10", "2025-12-14", "2025-12-21", "2025-12-28"],
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

      {/* Carousel */}
      <div class="carousel">
      <div class="slides">
        <img src="/assets/kitty1.jpg" alt="Image 1" />
        <img src="/assets/kitty2.jpg" alt="Image 2" />
        <img src="/assets/kitty3.jpg" alt="Image 3" />
        <img src="/assets/kitty4.jpg" alt="Image 4" />
      </div>
    </div>

      {/* Description */}
      <div className="description" style={{ textAlign: "center" }}>
        <h1 className="animated fadeIn">Celebrate Your Special Day with Us!</h1>
        <p
          className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(243, 243, 243)" }}
        >
  "Kitty parties are all about fun and friendship, and we’re here to make yours unforgettable."
  </p>
      </div>

      {/* Availability Section */}
      <div className="row2">
        <div className="col2 animated fadeInLeft">
          <h1>Check Venue Availability</h1>
          <p>
          Planning a kitty party? Select a month to check when our venue is free for your gathering. Let’s make it a memorable event!
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
        <h3>Hit the button below to book your kitty party!</h3>
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

export default KittyParty;
