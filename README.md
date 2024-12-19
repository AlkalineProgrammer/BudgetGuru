# Budget Tracking App (React Native)

A simple Budget Tracking mobile application built with **React Native** that allows users to create accounts, log in, track their income and expenses, and manage their budgets. This app uses **Firebase Authentication** for email verification, sign-up, and logout, **Axios** for API calls, **Redux** for state management, and **JSON-Server** as a mock backend API for storing budget-related data.

## Features

- **User Authentication**: Users can sign up, verify their email, log in, and log out using Firebase Authentication.
- **Budget Management**: Users can add, view, update, and delete budget entries (income and expenses).
- **State Management**: Uses **Redux** for managing the app's state, such as user details and budget entries.
- **API Calls**: Axios is used to make HTTP requests to interact with the **JSON-Server** backend API.
- **Backend Simulation**: **JSON-Server** acts as a mock backend with data stored in a `db.json` file.

## Technologies Used

- **React Native**: Framework for building native mobile applications.
- **Firebase Authentication**: For user authentication (sign-up, login, email verification, and logout).
- **Redux**: State management library to handle app state (e.g., user data, budget entries).
- **Axios**: To make HTTP requests for interacting with the mock API.
- **JSON-Server**: Fake REST API to simulate the backend using a `db.json` file.
- **React Navigation**: To navigate between screens (e.g., login, dashboard).
- **React Native Paper**: For UI components (e.g., Buttons, TextInput).

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (version 14 or above)
- **React Native Development Environment** (Ensure you have [React Native CLI](https://reactnative.dev/docs/environment-setup) set up).
- **Firebase Account** (for Authentication)
- **JSON-Server** (to simulate a backend)
