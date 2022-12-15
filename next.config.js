/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/RedRooms",
    NEXTAUTH_URL: "http://localhost:3000/",
    CLOUDINARY_CLOUD_NAME: "ravindramohith",
    CLOUDINARY_API_KEY: "342594479789283",
    CLOUDINARY_API_SECRET: "LpjrvJyRM3fmIG3BJb8bDmrL1V0",
  },
  images: {
    domains: ['res.cloudinary.com', 'a0.muscache.com']
  },
}

module.exports = nextConfig
