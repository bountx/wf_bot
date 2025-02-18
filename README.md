# WF Bot

A Puppeteer bot for automated course registration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure credentials:
Edit the `.env` file with your credentials:
```
USOS_LOGIN=your_usos_login
USOS_PASSWORD=your_usos_password
LOGIN_ZAPISY_WF_URL=https://login.usos.uwr.edu.pl/cas/login
COURSE_ZAPISY_WF_URL=url_to_page_with_course_details
```

## Running the bot

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build  # Compile TypeScript to JavaScript
npm start      # Run the compiled JavaScript
```

## Bot Functionality

The bot will:
1. Open a browser window
2. Navigate to the USOS login page
3. Log in with your credentials
4. Navigate to the specified course registration page
5. Continuously check the registration button status
   - If the button is disabled, it will wait and retry
   - If the button is enabled, it will automatically click it
6. Automatically close the browser after 10 seconds of completing the registration
