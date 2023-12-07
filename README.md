# SENG-513-Project
# UCalgary Active Living Open-Gym Schedule Re-design

# Table of Contents

- [Description](#Description)
- [Product Video](#Product-Video)
- [Technical Video](#Technical-Video)
- [Installation](#Installation)

## Description

The system for viewing the open gym schedule can be cumbersome. With that being said, we propose the solution of an open gym schedule redesign. We created a more user-friendly and aesthetically pleasing interface that shows information that is personalized to each user. Some of the main features include different views for days/weeks and filtering activities by sport. Revamping the open gym schedule viewer will improve the experience of the students who continue to use it.

## Product Video

<a href="https://www.youtube.com/watch?v=qUZMICcguxU" target="_blank">
  <img src="http://img.youtube.com/vi/qUZMICcguxU/0.jpg" 
  alt="UCalgary Active Living Open-Gym Schedule Re-design" width="240" height="180" border="10" />
</a>

## Technical Video

# Installation

### Step 1: Clone the repository

`git clone` the repository to have access to all the source code

### Step 2: Node.js, npm, and dependencies

- Ensure that you have node.js and npm installed before proceeding.
- Run `npm install` in both the `next` and `packages/api` directories.

### Step 3: .env files

- In the `next` folder, create a new file called `.env.local` and paste the following: <br>
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG91Y2hlZC1wb2xsaXdvZy03NC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_Wfoeuu3xXROFKi9D25yU0oV4MgEVJD4118jG7uFqWk
```
- In the `packages/api` folder, create a new file called `.env` and paste the following: <br>
```
MONGO_URI = "mongodb+srv://opengym:W3m6nJqL7Sv72$q@cluster0.ez83orx.mongodb.net/?retryWrites=true&w=majority" 
```

### Step 4: Start the app

1. In a terminal, `cd` into the `packages/api` directory and run `npm run dev`
2. In another terminal, `cd` into the `next` directory and run `npm run dev`
3. Open http://localhost:3000 in your browser to see the app.


# Authors

- Hilton Luu
- Liam Sarjeant
- Al Mahmud Dipto
- Tenzin Dorjee
- Anthony Dam
