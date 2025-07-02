# AI Chatbot

This project is a React-based AI Chatbot application that leverages Google's Generative AI model to provide interactive chat functionality. It features a user-friendly interface with message display, loading indicators, and supports light/dark theme toggling. Users can send messages and receive AI-generated responses in real-time.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- A Google Cloud account with access to the Generative AI API

## Getting a Google Generative AI API Key

To use this project, you need to obtain an API key for Google's Generative AI service:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select an existing project.
3. Enable the Generative AI API for your project.
4. Navigate to **APIs & Services > Credentials**.
5. Create an API key.
6. Restrict the API key as needed for security.

## Configuration

Create a `.env` file in the root of the project and add your API key as follows:

```
VITE_GOOGLE_AI_API_KEY=your_api_key_here
```

Make sure to replace `your_api_key_here` with the actual API key you obtained from Google Cloud.

## Installation

Install the project dependencies:

```bash
npm install
# or
yarn install
```

## Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to use the AI Chatbot.

## Usage

- Type your message in the input box and press Enter or click the send button.
- The AI will respond with generated messages.
- Use the theme toggle button to switch between light and dark modes.

## License

This project is licensed under the MIT License.
