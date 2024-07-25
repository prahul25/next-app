# Full-Stack Web Application

This full-stack web application, built with **Next.js** and **MongoDB**, features user authentication, profile management, and email functionalities.

## Features

- **User Authentication**: Sign-up, login, and password recovery with email verification.
- **Profile Management**: Users can view and manage their profiles.
- **Email Functionality**: Includes email verification and password reset features.
- **Middleware**: Ensures secure access to protected routes.

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables
Create a .env.local file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
GMAIL_MAIL=your_gmail_address
GMAIL_PASSWORD=your_gmail_password

```
### 3. Run the Development Server
```
npm run dev
```
Visit http://localhost:3000 to view the application locally.

### 4. Build and Deploy
To prepare the application for production:
```
npm run build
```
Deploy to your preferred hosting service, such as Vercel or Netlify.

## Live Demo
Explore the live version of the application:
```
https://next-app-navy-seven.vercel.app/signup
```

## GitHub Repository
View and contribute to the source code on GitHub:
```
https://github.com/prahul25/next-app
```

## Project Insights
- **Dynamic User Profiles**: Secure management of user profiles.
- **Advanced Email Handling**: Efficient email verification and password reset.
- **Secure Routes**: Middleware ensures only authenticated users can access protected routes.
- **Comprehensive Error Handling**: Handles both server and client-side errors.

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Email**: nodemailer
- **Authentication**: JWT, bcrypt

## Contribution
Contributions are welcome! Feel free to fork the repository, submit pull requests, or provide feedback.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
