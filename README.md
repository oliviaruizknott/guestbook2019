# Guestbook 2019

The guests and moments of 2019 in the Ruiz-Knott household, visualized.

## About

This webapp displays who came over and for what on every day of 2019.

It’s a static site, hosted on GitHub pages. You can interact with the visualization (hover and click for unfolding information) at the main page (`/`).

To run it locally, start the dev server in the root directory by running `npm start`.

### NFC Features

Added later (2023): Some other special features with NFC tags!

Prepare some NFC tags with data like this, where `livvy-dev.local` is replaced with your local IP address, and the names after the `#` match with the `name`s of guests (not `full_name`s) from the `guest.json` file:

```
http://livvy-dev.local:3000/nfc/#malika
http://livvy-dev.local:3000/nfc/#matt
http://livvy-dev.local:3000/nfc/#daisy
http://livvy-dev.local:3000/nfc/#norton
... etc
```

Start the websocket server by running `node server.mjs` in the root directory, then (in another terminal window) start the dev server as usual with `npm start`.

First, open the page on desktop at `livvy-dev.local:3000/nfc` (or with your IP). This `/nfc` page will show a QR code instead of the regular instructions. Scan that with your phone.

On your phone, it will bring up a special mobile `/nfc` page, with instructions to tap a photo. (Ideally, the prepared NFC tags are attached to the given guest’s photo.) Tap a guest’s NFC tag with your phone to see their data highlighted on the desktop view.

## Available Scripts

(This section edited from the template.)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
