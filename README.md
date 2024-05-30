# [TimelessTrails](https://timeless-trails.onrender.com)

Timeless Trails is a web application that allows users to explore, book, and review historical tours. The platform provides detailed tour information, user account management, booking, and payment functionalities.Try website [TimelessTrails](https://timeless-trails.onrender.com),for api documentation [TimelessTrails](https://documenter.getpostman.com/view/24014746/2sA3Qv7AL1)

## Features

- **Tour Overview:** Visitors can view a list of available tours.
- **Tour Details:** Only logged-in users can access detailed information about each tour.
- **User Authentication:** Users can sign up, log in, and log out.
- **Account Management:** Users can update their profile information and change their passwords.
- **Bookings and Reviews:** Users can view their bookings and reviews.
- **Admin Features:** Admin users can view all bookings, create new tours, and edit existing tours.
- **Password Reset:** Users can reset their passwords via email.
- **Secure Payments:** Stripe is used for handling payments.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose for database management
- JSON Web Tokens (jsonwebtoken) and bcrypt.js for authentication and password management

### Frontend:

- Pug template engine
- Parcel for bundling frontend JavaScript files

### Email Services:

- Mailtrap for development environment
- MailerSend for production environment

### Image Handling:

- Multer and Sharp for image upload and processing

### Payment Processing:

- Stripe

### Security:

- HPP (HTTP Parameter Pollution) prevention
- Express-mongo-sanitize for data sanitization
- XSS-clean for preventing cross-site scripting
- Express-rate-limit for rate limiting

## Getting Started

1. Clone this repository to your local machine:

```
git clone https://github.com/enesuraz/timeless-trails.git
```

2. Navigate to the cloned repository:

```
cd timeless-trails
```

3. Create config.env file and type belowed statements with your informations

```
NODE_ENV=development
MONGO_SERVER=yourmongoserver
JWT_SECRET=yourjwtsecret
EXPIRES_JWT=90d
COOKIE_EXPIRES=anynumberyouwant
MAIL_TRAP_EMAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_TRAP_EMAIL_PORT=2525
MAIL_TRAP_EMAIL_USER=yourmailtrapuser
MAIL_TRAP_EMAIL_PASSWORD=yourmailtrappasword
EMAIL_FROM=youremail
SEND_MAILER_API=forproductionsendmilerapi
SEND_MAILER_USERNAME=forproductionsendmilerusername
STRIPE_SECRET_KEY=yourstripesecretkey
```

4. Navigate /public/js/stripe.js and change stripe key

5. For development type "npm run dev", for production type "npm run prod"

## Contact

For any inquiries or feedback, please contact [nfk7221@gmail.com](mailto:nfk7221@gmail.com).
