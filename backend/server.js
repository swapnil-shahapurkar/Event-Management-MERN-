import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Add CORS to handle cross-origin requests
import bcrypt from 'bcryptjs'; // Add bcrypt for password hashing
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// Create an Express app
const app = express();

// Check if variables are loaded
console.log('MONGO_URI_EVENT:', process.env.MONGO_URI_EVENT);
console.log('MONGO_URI_SIGNUP:', process.env.MONGO_URI_SIGNUP);

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all origins (for local development)
app.use(cors());

// **Database Connections**
// Connect to the Event Booking Database


// Connect to the Event Booking Database
const eventBookingDB = mongoose.createConnection(process.env.MONGO_URI_EVENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the Signup Database
const signupDB = mongoose.createConnection(process.env.MONGO_URI_SIGNUP, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if connections are successful
eventBookingDB.on('connected', () => console.log('✅ Event Booking DB Connected'));
signupDB.on('connected', () => console.log('✅ Signup DB Connected'));

eventBookingDB.on('error', (err) => console.error('❌ Event Booking DB Error:', err));
signupDB.on('error', (err) => console.error('❌ Signup DB Error:', err));

// Log connections
eventBookingDB.once('open', () => console.log('Connected to Event Booking Database'));
signupDB.once('open', () => console.log('Connected to Signup Database'));

// **Schemas and Models**
// Event Booking Schema and Model
const bookingSchema = new mongoose.Schema({
  fullName: String,
  aadharNumber: String,
  phoneNumber: String,
  gender: String,
  address: String,
  age: Number,
  email: String,
  eventDate: Date,
  event: String,
  hall: String,
  BID: String,
});

const Booking = eventBookingDB.model('Booking', bookingSchema);

// Signup Schema and Model
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const User = signupDB.model('User', userSchema);

// **Global Variables to store user data**
let loggedInUserEmail = null; // Store logged-in user's email
let loggedInUserName = null; // Store logged-in user's name (optional)

// **Routes**
// Serve the login page
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// **Endpoints**
// Handle event booking form submission
app.post('/submit-form', async (req, res) => {
  try {
    const { fullName, aadharNumber, phoneNumber, gender, address, age, email, eventDate, event, hall,BID } = req.body;

    const newBooking = new Booking({
      fullName,
      aadharNumber,
      phoneNumber,
      gender,
      address,
      age,
      email,
      eventDate,
      event,
      hall,
      BID,
    });

    await newBooking.save();
    res.status(200).json({ message: 'Booking registered successfully!', ok: true });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error in registration. Please try again.', ok: false });
  }
});

// Handle signup form submission
app.post('/submit-signup', async (req, res) => {
  console.log("signup received");
  try {
    const { email, username, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();
    res.status(200).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error in signup. Please try again.' });
  }
});

// Handle login form submission
app.post('/submit-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Save the logged-in user's email and name to the global variables
    loggedInUserEmail = user.email;
   loggedInUserName = user.username; // Optional, if you need the name

    res.status(200).json({
      message: 'Login successful!',
      success: true, // Send success response
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error in login. Please try again.' });
  }
});

// Handle fetching bookings (only if email matches the logged-in user's email)
app.post('/bookings', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email matches the logged-in user's email
    if (email !== loggedInUserEmail) {
      return res.status(403).json({ message: 'You are not authorized to view the bookings for this email.' });
    }

    console.log("Bookings read request received for email:", email);

    // Find bookings for the provided email
    const userBookings = await Booking.find({ email });

    if (userBookings.length > 0) {
      res.status(200).json(userBookings);
    } else {
      res.status(404).json({ message: 'No bookings found for this email address' });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'An error occurred while fetching bookings.' });
  }
});

app.get('/is-logged-in', (req, res) => {
  if (loggedInUserEmail) {  // Replace `loggedInUserEmail` with your variable
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});


// Handle logout route
app.post('/logout', (req, res) => {
 
  if (loggedInUserEmail) {
   
     loggedInUserEmail = null;

     loggedInUserName=null;
     res.status(200).json({ message: 'Logged out successfully!' });
  } else {
    res.status(400).json({ message: 'No user is logged in.' });
  }
});
// **Start the Server**
const PORT = process.env.PORT || 5000; // Port set to 5000 for local development
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
