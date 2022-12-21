/** @type {import('next').NextConfig} */
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } = require('./secrets/secret')
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/RedRooms",
    DB_URI: "mongodb://mohith:sandy@ac-tswascw-shard-00-00.op7d7ju.mongodb.net:27017,ac-tswascw-shard-00-01.op7d7ju.mongodb.net:27017,ac-tswascw-shard-00-02.op7d7ju.mongodb.net:27017/redRooms?ssl=true&replicaSet=atlas-a6kv3r-shard-0&authSource=admin&retryWrites=true&w=majority",
    NEXTAUTH_URL: "http://localhost:3000/",
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    STMP_FROM_NAME: 'RedRooms',
    STMP_FROM_EMAIL: 'noreply@redrooms.com',
    STRIPE_API_KEY,
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com']
  },
}

module.exports = nextConfig
