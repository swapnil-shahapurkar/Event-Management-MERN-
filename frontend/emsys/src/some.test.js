// Login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './components/login';

test('renders Login form with username and password fields', () => {
  render(<Login onLogin={jest.fn()} />);
  
  // Check if the username and password fields are rendered
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  
  // Check if the Login button is rendered
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('calls onLogin with username and password when form is submitted', () => {
  const mockOnLogin = jest.fn();
  render(<Login onLogin={mockOnLogin} />);
  
  // Find the input elements and simulate user input
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  
  // Simulate form submission
  fireEvent.submit(screen.getByText(/login/i));
  
  // Check if the onLogin function was called with the correct arguments
  expect(mockOnLogin).toHaveBeenCalledWith({
    username: 'testUser',
    password: 'password123',
  });
});

test('does not call onLogin if username or password is empty', () => {
  const mockOnLogin = jest.fn();
  render(<Login onLogin={mockOnLogin} />);
  
  // Submit the form with empty fields
  fireEvent.submit(screen.getByText(/login/i));
  
  // Ensure onLogin is not called if the fields are empty
  expect(mockOnLogin).not.toHaveBeenCalled();
});

test('username and password fields are required', () => {
  const mockOnLogin = jest.fn();
  render(<Login onLogin={mockOnLogin} />);
  
  // Fire a submit event without entering any data
  fireEvent.submit(screen.getByText(/login/i));
  
  // Check if the username and password fields are not empty
  expect(screen.getByLabelText(/username/i).value).toBe('');
  expect(screen.getByLabelText(/password/i).value).toBe('');
});
