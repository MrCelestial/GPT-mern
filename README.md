# ChatGPT Bot with MERN Stack

## Overview

This project involves creating a ChatGPT bot using the MERN stack. The MERN stack includes MongoDB, Express.js, React.js, and Node.js, which together provide a robust framework for building dynamic web applications.

## Tech Stack

- **MongoDB**: A NoSQL database used to store chat history, user data, and any other relevant information.
- **Express.js**: A Node.js web application framework that serves as the backend server, handling API requests and responses.
- **React.js**: A JavaScript library for building user interfaces, used for the frontend of the chat application.
- **Node.js**: A JavaScript runtime that executes the server-side code and handles backend logic.
- **ChatGPT API**: The API from OpenAI that provides the language model for generating responses in the chat.

## Features

- **Real-time Chat**: Users can interact with the ChatGPT bot in real-time.
- **User Authentication**: Secure login and registration for users to access their chat history.
- **Chat History**: Store and retrieve chat conversations for user review.
- **Responsive UI**: A user-friendly interface built with React that adapts to different devices.

## Setup

### Prerequisites

- Node.js (>=14.0.0)
- MongoDB (>=4.0.0)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MrCelestial/GPT-mern.git
   cd GPT-Mern

2. **Install Dependencies**
  
   - For Backend:
       ```bash
       cd backend
       npm install
     ```
   - For Frontend:       
       ```bash
       cd ../frontend
       npm install
     ``` 
3. Configure Environment Variables

    Create a .env file in the backend directory and add the following variables:    
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CHATGPT_API_KEY=your_openai_api_key
    PORT=desired_port_number
   ```
4. Start the Development Servers
    - For the backend:
    ```bash
    cd backend
    npm start
   ```
   - For the Frontend:
    ```bash
    cd ../frontend
    npm start
   ```
   
## Usage
- **Frontend**: Navigate to http://localhost:5173 to access the chat interface as we are using VITE.
- **Backend** :Backend: The API is available at http://localhost:3001.

## Contributing
1. Fork the repository.
2. Create a feature branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Create a new Pull Request.

## Acknowledgements
- OpenAI for providing the ChatGPT API.
- MERN Stack for the powerful full-stack development framework.
