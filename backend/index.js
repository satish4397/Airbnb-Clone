import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
<<<<<<< HEAD
import { requireHTTPS, apiLimiter, productionSecuritySettings } from './middleware/security.js'
=======
>>>>>>> 50e2cdf24e928d6631f20cbe2179efa9cf89664c
let port = process.env.PORT || 8000

let app = express()

// Security middleware
app.use(requireHTTPS) // Force HTTPS in production
app.use(helmet(productionSecuritySettings.helmet)) // Security headers
app.use(express.json())
app.use(cookieParser())
<<<<<<< HEAD
app.use(cors(productionSecuritySettings.cors))

// Rate limiting for API routes
app.use('/api/', apiLimiter)
=======
app.use(cors({
    origin:"https://airbnb-clone-using-mern-frontend.onrender.com",
    credentials: true
}))
>>>>>>> 50e2cdf24e928d6631f20cbe2179efa9cf89664c

app.use("/api/auth", authRouter )
app.use("/api/user", userRouter )
app.use("/api/listing",listingRouter )
app.use("/api/booking",bookingRouter )

// health check for Render / uptime monitoring
app.get('/health', (req, res) => res.status(200).json({status: 'ok'}))

// connect to DB first, then start the server
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}).catch((err) => {
    console.error('Failed to start server:', err)
})
