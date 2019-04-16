# Ambrosia

Ecommerce site for a pizza company

## Skills to learn from project

> * Unit Testing
> * Implement clean code standards
> * Loading screens

___

## Requirements

> * Cart
> * Login and signup
>   * Admin login
>   * User login
> * Show products
>   * Filter and sort by type
>   * Make edit to products info(admin)
> * Metrics
>   * Product details
>   * Sales
>   * Number of User
>   * Add custom products

## Features to have

> * Authorization
> * Loading state and screens
> * Unit Testing
> * Animation

## User Features

> * Login/SignUp
> * Add items to cart
> * Remove items from cart
> * Checkout cart

## Admin Permissions

> * Create new Products
> * Remove products
> * Add more to inventory
> * Remove from inventory
> * Access Metrics page

___

## Pages

> * Home
> * Browse
> * Cart
> * Checkout
> * Sign up
> * Login
> * Metrics
> * Chiefs

### Home

What the users see when they first enter the site

> * Can reroute user to sign up page
> * Show Summary of business
> * Quick list of products for sell
> * User can login

### Browse

Where the user can browse products

> * Show Products by type
> * Show all product category
> * User can add product to cart

### Cart

Shows all the items in the user's cart

> * Show total price of all items with tax
> * Can remove items from carts
> * Can checkout Items
> * Show all items in cart

### Checkout

Shows your order

### Sign Up

Where the user can sign up

> * User see all the things that they can do when they sign up

### Metrics

Where the admin can see the store details

> * Sales tab where admin can see all the sales from website
> * Number of User
> * Add custom products
> * Remove products

### User

Where the user can view and edit their profile

> * Can delete account
> * Can change Password
> * Show all previous orders

___

## Database Schemas

> * User
> * Product
> * Orders

### User Schema

> * User ID
> * Email
> * Username
> * Password
> * Cart - Array of current items
> * Previous orders - Array of pass orders

### Product Schema

> * Product ID
> * Name
> * Type
>   * Drink
>   * Pizza
>   * Desserts
>   * Bread
>   * Pasta
> * Price
> * Image

### Order Schema

> * Products - [Product ID, Quantity]
> * Date
> * User ID
> * Processed (in cart or Already order)