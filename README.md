
# F2FApp - Farmer-to-Farmer Cordova Application

## Overview

F2FApp is a mobile application designed to bridge the gap between farmers and buyers. 
Built using Apache Cordova, this app allows farmers to list their products for sale and 
buyers to browse and place orders for nearby products. This lightweight, efficient app is 
ideal for fostering local trade and enhancing agricultural market accessibility.

## Features

- **Buyer Features**
  - View nearby products listed by farmers.
  - Place orders for selected products.
  - Track orders via the Buyer Dashboard.

- **Farmer Features**
  - Create new product listings.
  - Manage existing listings (edit or remove).
  - Track orders placed by buyers.

- **General Features**
  - Intuitive user interface optimized for mobile screens.
  - Local storage for managing sessions and temporary data.
  - Responsive design compatible with Android devices.

## Project Structure

```
F2FApp/
├── config.xml               # Cordova configuration file (important for app setup)
├── package.json             # Project dependencies and metadata
├── package-lock.json        # Dependency lock file for consistency
├── .gitignore               # Files and folders to exclude from Git versioning
├── README.txt               # Project documentation
├── resources/               # Icons and splash screen assets
│   └── android/
│       └── icon/            # App icons for different screen densities
├── www/                     # Front-end files (HTML, CSS, JavaScript)
│   ├── images/              # Image assets used in the app
│   ├── index.html           # Landing/login page
│   ├── buyer.html           # Buyer Dashboard
│   ├── farmer.html          # Farmer Dashboard
│   ├── add_listing_farmer.html # Farmer product listing page
│   ├── track_orders_buyer.html  # Order tracking page for buyers
│   ├── track_orders_farmer.html # Order tracking page for farmers
│   ├── login.js             # Login functionality
│   ├── register.html        # Registration page
│   ├── register.js          # Registration functionality
│   ├── buyer.js             # Buyer-side JavaScript logic
│   ├── farmer.js            # Farmer-side JavaScript logic
│   └── server.js            # Placeholder for server communication (future expansion)
└── platforms/               # Platform-specific build files (ignored in Git)
```

## Prerequisites

Before you can build and run the app, ensure the following tools are installed:

1. **Node.js and npm**
   - Download and install from [Node.js Official Site](https://nodejs.org).

2. **Cordova CLI**
   - Install globally using npm:
     ```
     npm install -g cordova
     ```

3. **Java JDK**
   - Install Java Development Kit (JDK 8 or JDK 11 recommended).

4. **Android SDK & Android Studio**
   - Install Android Studio and required SDK tools from [Android Developer Site](https://developer.android.com/studio).

5. **Gradle**
   - Ensure Gradle is installed or included with Android Studio.

6. **Environment Variables**
   - `JAVA_HOME` → Path to your JDK installation.
   - `ANDROID_HOME` → Path to your Android SDK.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/YourUsername/F2FApp.git
   cd F2FApp
   ```

2. Install project dependencies:
   ```
   npm install
   ```

3. Add Android platform to Cordova:
   ```
   cordova platform add android
   ```

## Running the App

### Building for Android
1. Build the app:
   ```
   cordova build android
   ```

2. Test on an emulator:
   ```
   cordova emulate android
   ```

3. Test on a physical device:
   - Connect your Android device via USB and ensure USB Debugging is enabled.
   - Run the app:
     ```
     cordova run android --device
     ```

### Without USB
1. Build the app to generate the APK file:
   ```
   cordova build android
   ```
2. Locate the APK:
   - Found in `platforms/android/app/build/outputs/apk/debug/app-debug.apk`.
3. Transfer the APK to your device (via Telegram, email, or cloud).
4. Enable "Install Unknown Apps" on your device.
5. Install and test the app.

## Icons and Splash Screens

### Using `cordova-res`
1. Install the `cordova-res` tool globally:
   ```
   npm install -g cordova-res
   ```

2. Place a high-resolution icon (e.g., 1024x1024 PNG) in the `resources/` folder.

3. Generate icons for all densities:
   ```
   cordova-res android --skip-config --copy
   ```

4. Verify icons are correctly listed in `config.xml`.

## Troubleshooting

- **Gradle Not Found**
  - Install Gradle or ensure it is correctly set up in your PATH.

- **Build Failures**
  - Ensure `JAVA_HOME` and `ANDROID_HOME` are set correctly.
  - Verify required SDK tools are installed via Android Studio.

- **App Not Installing**
  - Remove any conflicting versions of the app from your device.
  - Ensure "Install Unknown Apps" is enabled.

## Generating a Signed APK for Distribution

1. Build in release mode:
   ```
   cordova build android --release
   ```

2. Sign the APK:
   ```
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk f2fapp
   ```

3. Optimize the APK using `zipalign`:
   ```
   zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk F2FApp.apk
   ```

4. Your final APK (`F2FApp.apk`) is ready for distribution.

## License

This project is open-source and free to use. Ensure compliance with Apache Cordova and any included plugin licenses.

---

