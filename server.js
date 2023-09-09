const express = require('express')
const request = require('request')
const cors    = require('cors')

// Get PORT number from .env file.
require('dotenv').config()
const PORT = process.env.PORT

// Middleware that logs request method and path.
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('---')
    next()
}

const app = express()

// Add middleware.
app.use(cors())
app.use(requestLogger)

// Handle all incoming requests.
app.all('*', (req, res) => {
    try {

        if (req.method === 'OPTIONS') {

            // Preflight request handling.
            res.send()
    
        } else {
        
            // Remove the '/' character from the start of req.url
            // After that it only contains the target sites url.
            const url = req.url.slice(1)

            // User-Agent header is required by some websites.
            let headers = {
                'User-Agent': 'cors-proxy/1.0'
            }

            // Send a request to the target url and pipe the response
            // back to the client.
            request(
                { url, method: req.method, headers },
                (error, response, body) => {
                    if (error) console.error(error.message)
                }
            ).pipe(res)
        }
    
    } catch (error) { console.error(error.message) }
})

// Start the server.
app.listen(PORT, () => {
    console.log(`cors-proxy server running on port ${PORT || 3100}`)
})
