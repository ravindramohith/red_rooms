/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    DB_LOCAL_URI:"mongodb://localhost:27017/RedRooms"
  }
}

module.exports = nextConfig
