const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 
const PORT = 5000; 

// Enable CORS to allow requests from different origins
app.use(cors()); 
// Use body-parser to handle JSON data in requests
app.use(bodyParser.json()); 

app.post('/verify-recaptcha', async (req, res) => {
    const {token} = req.body;
    /*
    req.body = {
        token: "exampleToken123",
        issueType: "Discover New Store",
        message: "This is the user's message"
    };
    If we write const { token } = req.body; 
    we can directly extract the 'token' value from req.body 
    and store it in a variable called 'token'.

    Example: const token = req.body.token;

    To extract multiple values:
    const { token, message } = req.body;
    */

    const secretKey = '6Lc6vHYqAAAAADUL1BpsztQh6RkjSjcquP0ZRdc0'; // Used to check if the token is valid
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            // Send a POST request to Google reCAPTCHA API using axios.post
            // 'await' waits for the request to complete and return a result.
            // 'null' means no extra data is sent in the request body.
            params: {
                secret: secretKey, // The secret key
                response: token    // The token from the user
            }
        });

        const { success, score } = response.data;
        // Extract 'success' and 'score' from the response data.
        // 'success' indicates if the verification passed,
        // 'score' is a rating (1 is the highest score; higher is more trustworthy).
        if (success && score > 0.5) {
            res.status(200).send({message: 'Captcha verified', success: true});
            // Send an HTTP status code 200 (success) with a JSON response.
        } else {
            res.status(400).send({message: 'Captcha verification failed', success: false});
            // Send an HTTP status code 400 (bad request) if verification fails.
        }
    } catch (error) {
        // Catch errors from the 'try' block, such as failed API requests.
        console.error('Error verifying reCAPTCHA:', error);
        // Log the error to the console for debugging.
        res.status(500).send({ message: 'Server error' });
        // Send an HTTP status code 500 (server error) if something goes wrong.
    }
});

// Start the server and begin accepting requests from the frontend.
// The frontend sends a POST request to the server with the reCAPTCHA token.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Run the server using: node index.js
