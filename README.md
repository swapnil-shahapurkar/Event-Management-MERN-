# Event Management System (MERN Stack)

This is a full-stack web application designed to manage events and bookings. The system allows users to search for venues, make bookings, and view their past bookings. The project is built using the MERN stack, which consists of MongoDB, Express.js, React, and Node.js. This application demonstrates the power of modern JavaScript technologies for building scalable and interactive web applications.

## Features

- **User Authentication**: Users can log in securely with their credentials to access event details and make bookings.
- **Search for Venues**: Users can enter their city name to search for nearby venues using an efficient algorithm.
- **Booking Events**: Users can fill out a booking form to reserve event slots and generate a receipt.
- **View Bookings**: Users can check their previous bookings and event details.
- **Receipt Generation**: After successful booking, users can download their receipt.

## Technologies Used

- **Frontend**: 
  - React.js: A JavaScript library for building user interfaces, used to build the entire frontend of the application.
  - HTML/CSS: For structuring and styling the web pages.
  - JavaScript: For client-side logic and interactivity.

- **Backend**:
  - Node.js: A JavaScript runtime built on Chrome's V8 engine, used to handle server-side logic.
  - Express.js: A web application framework for Node.js that simplifies routing and handling HTTP requests.
  - MongoDB: A NoSQL database used to store user data, bookings, event details, and venue information.

- **APIs**:
  - Custom API endpoints to handle user authentication, venue search, booking, and receipt generation.

- **Authentication**:
  - JWT (JSON Web Token): For secure user authentication and session management.

- **Version Control**:
  - Git & GitHub: For source code management and version control.

## How It Works

1. **User Authentication**: The user logs into the system by providing their username and password. If the credentials are valid, the user is redirected to the home page.
2. **Search for Venues**: From the homepage, the user can search for venues in their city by entering the city name. The system uses an efficient search algorithm to find and display the nearest venues.
3. **Making Bookings**: Once the user selects a venue, they are directed to a booking page where they fill out a booking form. If the form is validated, the system stores the booking details and generates a receipt.
4. **Viewing Previous Bookings**: Users can view a list of their past bookings from their profile page.
5. **Receipt Download**: After a successful booking, users can download the receipt for the event booking.

## Installation

To set up this project on your local machine, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/swapnil-shahapurkar/Event-Management-MERN-.git
