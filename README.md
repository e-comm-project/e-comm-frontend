# AboutShe

**AboutShe** is an E-commerce web application designed for users to browse, purchase, and manage products online. This project is built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It leverages various modern web technologies to provide a seamless shopping experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with AboutShe, follow these steps:

Clone the repository:

```bash
git clone https://github.com/username/aboutshe.git
```

Navigate to the project directory:

```bash
cd aboutshe
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Usage

- **Browse Products**: Users can view a list of products on the homepage.
- **Product Details**: Click on a product to view detailed information.
- **Add to Cart**: Users can add products to their cart for purchase.
- **Checkout**: Complete the purchase process using various payment methods.
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Admin Dashboard**: Admin users can manage products, orders, and user roles.

## Features

- **React**: A JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Context API**: For managing application state.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing product and user data.
- **Node.js**: JavaScript runtime for building server-side applications.
- **Vite**: Next-generation front-end tooling for fast development.

## Components

### Components Directory

- **Footer.jsx**: Displays the footer section with social media links and other information.
- **Header.jsx**: Contains the main navigation links and user login status.
- **IsAdmin.jsx**: Checks if the logged-in user has admin privileges.
- **IsPrivate.jsx**: Protects routes that require user authentication.
- **Navbar.jsx**: Navigation bar with links to various pages.
- **PaymentMethod.jsx**: Manages different payment options during checkout.
- **SlideComponent.jsx**: Image slider for featured products.

### Context Directory

- **auth.context.jsx**: Manages authentication state and user data.
- **cart.context.jsx**: Handles the state of the shopping cart.

### Pages Directory

- **AboutUs.jsx**: Displays information about the company.
- **AdminDashboard.jsx**: Admin panel for managing the application.
- **ContactUs.jsx**: Page for users to contact customer support.
- **HomePage.jsx**: Main landing page with product listings.
- **Login.jsx**: User login page.
- **NotFound.jsx**: Displays a 404 error for non-existent routes.
- **Orders.jsx**: Displays user's past orders.
- **ProductDetails.jsx**: Detailed view of a specific product.
- **ProductList.jsx**: List of products available for purchase.
- **ProductsTab.jsx**: Admin view for managing products.
- **Profile.jsx**: User profile management page.
- **Signup.jsx**: User registration page.
- **UserTab.jsx**: Admin view for managing user roles and permissions.

### Styles

- **App.css**: Global styles for the application.
- **AdminDashboard.css**: Styles specific to the admin dashboard.
- **index.css**: General styles applied to the entire application.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
