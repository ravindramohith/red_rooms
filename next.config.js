/** @type {import('next').NextConfig} */
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = require('./secrets/secret')
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/RedRooms",
    NEXTAUTH_URL: "http://localhost:3000/",
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    STMP_FROM_NAME: 'RedRooms',
    STMP_FROM_EMAIL: 'noreply@redrooms.com'
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com']
  },
}

module.exports = nextConfig
