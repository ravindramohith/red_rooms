/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/RedRooms"
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com']
  },
}

module.exports = nextConfig
