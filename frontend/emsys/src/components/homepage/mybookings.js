import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const YourComponent = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [paddingTop, setPaddingTop] = useState('200px');
  const navigate = useNavigate(); // Initialize navigate

  const fetchBookings = async (email) => {
    setPaddingTop('0px');
    try {
      // Send a POST request to the backend to fetch bookings for the email
      const response = await axios.post('http://localhost:5000/bookings', { email });

      // If the request is successful, set the bookings state
      setBookings(response.data);
      setError(''); // Clear any previous error
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error fetching bookings');
      } else {
        setError('An error occurred. Please try again.');
      }
      setBookings([]); // Clear previous bookings in case of error
    }
  };

  const handleFetchBookings = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    fetchBookings(email);
  };

  const handleBackToHome = () => {
    navigate('/home'); // Navigate back to the home page
  };

  return (
    <div style={{backgroundColor:"black",width:"600 px",height:"auto",maxHeight:"5000px",minHeight:"800px",paddingTop:paddingTop,transition: "padding-top 1s ease-out"}}>
    <div style={styles.container}>
      <h2 style={styles.header}>Your Event Bookings</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={styles.input}
      />
      <button onClick={handleFetchBookings} style={styles.button}>Get Bookings</button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.bookingsContainer}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} style={styles.bookingCard}>
              <h3 style={styles.bookingReceiptHeader}>Booking Receipt</h3>
              <p style={styles.bookingText}>Full Name: <span style={styles.bookingDetail}>{booking.fullName}</span></p>
              <p style={styles.bookingText}>Aadhar Number: <span style={styles.bookingDetail}>{booking.aadharNumber}</span></p>
              <p style={styles.bookingText}>Phone Number: <span style={styles.bookingDetail}>{booking.phoneNumber}</span></p>
              <p style={styles.bookingText}>Gender: <span style={styles.bookingDetail}>{booking.gender}</span></p>
              <p style={styles.bookingText}>Address: <span style={styles.bookingDetail}>{booking.address}</span></p>
              <p style={styles.bookingText}>Age: <span style={styles.bookingDetail}>{booking.age}</span></p>
              <p style={styles.bookingText}>Email: <span style={styles.bookingDetail}>{booking.email}</span></p>
              <p style={styles.bookingText}>Event: <span style={styles.bookingDetail}>{booking.event}</span></p>
              <p style={styles.bookingText}>Event Date: <span style={styles.bookingDetail}>{new Date(booking.eventDate).toLocaleDateString()}</span></p>
              <p style={styles.bookingText}>Venu: <span style={styles.bookingDetail}>{booking.hall}</span></p>
              <p style={styles.bookingText}>BookingId: <span style={styles.bookingDetail}>{booking.BID}</span></p>
            </div>
          ))
        ) : (
          <p style={styles.noBookings}></p>
        )}
      </div>

      <button onClick={handleBackToHome} style={styles.backButton}>Back to Home</button>
    </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    backgroundColor: '#000000', // Global pitch black background
    color: '#FFFFFF', // White text
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'white', // Blue text
    fontSize: '44px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '2px solid  rgb(12, 65, 239)', // Yellow border
    backgroundColor: '#333333', // Dark input background
    color: '#FFFFFF', // White text in input
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: '0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgb(2, 113, 241)', // Calm dark-toned button color (dark blue-gray)
    color: '#FFFFFF',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: '0.3s',
  },
  error: {
    color: 'White', // Red color for error
    textAlign: 'center',
    marginTop: '10px',
  },
  bookingsContainer: {
    marginTop: '20px',
  },
  bookingCard: {
    backgroundColor: '#0D0D0D', // Super dark black background for booking cards
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)', // Darker shadow for more depth
    transition: '0.3s',
    color: '#FFFFFF', // White text in the card
  },
  bookingText: {
    margin: '5px 0',
    fontSize: '16px',
  },
  bookingDetail: {
    fontWeight: 'bold',
    color: '#F39C12', // Yellow text for details
  },
  bookingReceiptHeader: {
    color: '#FFFFFF', // White text for "Booking Receipt"
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '15px',
    textShadow: '0 0 10px #F39C12', // Glowing effect on the text
  },
  noBookings: {
    color: '#E74C3C', // Red text for "no bookings"
    textAlign: 'center',
    fontSize: '18px',
  },
  backButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'green', // Purple color for "Back to Home" button
    color: '#FFFFFF',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    marginTop: '20px',
  },
};

export default YourComponent;
