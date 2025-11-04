import { rateLimit } from 'express-rate-limit'

// Force HTTPS in production
export const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Render.com
    if (
        !req.secure &&
        req.get('x-forwarded-proto') !== 'https' &&
        process.env.NODE_ENV === 'production'
    ) {
        return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
}

// Rate limiting to prevent brute force attacks
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
})

// Production security settings
export const productionSecuritySettings = {
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
        httpOnly: true, // Prevent XSS accessing cookies
        sameSite: 'strict', // CSRF protection
    },
    cors: {
        origin: process.env.FRONTEND_URL || 'https://airbnb-clone-using-mern-frontend.onrender.com',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    helmet: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", process.env.FRONTEND_URL || 'https://airbnb-clone-using-mern-frontend.onrender.com'],
                imgSrc: ["'self'", "data:", "https:", "http:"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                fontSrc: ["'self'", "https:", "data:"],
                baseUri: ["'self'"],
                formAction: ["'self'"]
            }
        },
        crossOriginEmbedderPolicy: false, // If you need to embed third-party resources
    }
}