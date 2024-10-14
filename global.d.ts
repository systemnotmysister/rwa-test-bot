import { WebApp } from 'telegram-web-app';
import { TelegramWebApp, WebAppBackButton } from "@kloktunov/react-telegram-webapp";
// Access the BackButton
const backButton = WebApp.BackButton;

// Show the back button
backButton.show();

// Set a callback for when the back button is clicked
backButton.onClick(() => {
  // Your code here
});