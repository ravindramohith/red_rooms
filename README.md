# Red-Rooms: A Next.js Full Stack Project.

## Getting Started
First, Install all the required packages:

```bash
npm install
# or
yarn add
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

If you wanted to seed the data:

- for adding data to your database,
```bash
npm run seeder --import
```
 - for deleting all the data from your database,
```bash
npm run seeder --delete
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Next.Js has routes embedded in folder, we can handle all our pages in that folder by creating the files with route name. for the server side routes, there is a api folder in which we can create api routes by creating files of the route name.

## Overview

- This Hotel Booking App AKA Red Rooms is used for booking rooms in various hotels. User can check if the room is available at particular date and can book the room by logging in and paying with stripe. User can review on the Room already he had booked before only. Each room has its number of ratings by users, average ratings(Out of 5). User can edit his own profile and can change his Avatar too.
- There is also and admin portal which can perform CRUD operations on Users, Rooms, Bookings, Reviews.

## Server Side:
- Used **MongoDB** for storing Data(NoSQL DB).
- Used **mongoose** to connect our application to MongoDB and for creating *models* such as **Room, User, Booking**.
- Created all server side **routes** in `pages/api/` folder.
- Implemented each **controller** for each route in `controllers/` folder.
- Implemented various **middlewares** such as Error handlers, Authenticators, etc. in `middlewares/` folder.
- Implemented Authentication by using **Next Auth**.
- Used **cloudinary** to upload all the images.
- Integrated with **Stripe** for payments.

###### You can view the postman's documentation of API [here](https://documenter.getpostman.com/view/21503860/2s8Z73yApo).

## Client Side:
- Created all client side **routes/urls** in `pages/` folder.
- Constructed the Basic Layout under `components/layout/` folder.
- Contructed all other components under `components/` folder.
- Used `Next Link` for switching between pages.
- Used **Next Auth** for creating sessions to protect certain routes.
- Used **Redux** for **Global State Management** by wrapping application under store(which is created in `redux/store.js` file) and creating all the reducers in `redux/reducers/` folder with help of all global constants in `redux/constants/` folder by controlling it with the actions in `redux/actions/` folder.
- Implemented pagination by using *React pagination* for viewing all the Items in a systematic manner.
- Implemented search bar for searching various rooms by entering their locations and categories through **query params**.
- Implemented Carousel for viewing Rooms by scrolling, and Calender by chhosing dates of booking the rooms.
- Used ***Stripe checkout page*** for payments and **webhooks** to redirect back.
