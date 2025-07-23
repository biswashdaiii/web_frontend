import { io } from 'socket.io-client';

/**
 * Initializes and returns a socket instance.
 * It's better to create a new instance for each chat session
 * to ensure proper authentication and room management.
 * @param {string} backendUrl - The URL of your backend server.
 * @param {string} token - The user's authentication JWT.
 * @returns {Socket} A configured Socket.io instance.
 */
export const initializeSocket = (backendUrl, token) => {
  // Guard against trying to connect without a token
  if (!token) {
    console.error("Socket Initialization Error: No authentication token was provided.");
    return null; // Return null if there's no token
  }

  // Create and return a new socket instance
  const socket = io(backendUrl, {
    // We will connect manually once the chat page is open
    autoConnect: false,
    // Send the token for authentication on every connection attempt
    auth: {
      token: token
    }
  });

  return socket;
};