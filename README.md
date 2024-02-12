# YTL-App

## Flow

1. For login, this app use Supabase for the authentication. For first time login, user need to enter the email and password
   `email : test@gmail.com`
   `password: test@1234`
2. Session will be stored using securestore. After the first time login, user will be able to login back using biometric authentication. Biometric option will be display as long as the session is not expired.
3. User will be able to navigate to Transaction History page. Some of the data will be masked with \*. In order to display it, user may click to 'show more info' and biometric authentication will prompt.
4. User may click to the list to show more details. Another Biometric authentication will be prompt. Once success, user will be redirect to the Transaction Detail page

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

## Installing Your Expo Project

To install Your Expo Project, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd ytl-app`
3. Install the dependencies: `npm install`

## Using Your Expo Project

To use Your Expo Project, follow these steps:

1. Start the project: `npx expo start -c`
2. Open the Expo client app on your iOS or Android phone.
3. Make sure you are using Expo Go. Press 's' to switch to Expo Go
4. Scan the QR code printed by `expo start` with Expo Go (Android) or the Camera app (iOS).
