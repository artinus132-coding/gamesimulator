# TycoonSim — Phaser + Capacitor Prototype

This repository contains a minimal HTML5 tycoon/simulator prototype built with Phaser and wrapped with Capacitor for Android. The project is optimized for development from a Chromebook or cloud IDE and supports automated APK building via GitHub Actions.

What you get
- Phaser prototype (src/) — small gameplay loop: passive income and upgrades.
- Vite dev server for fast local/cloud development.
- Capacitor config to wrap web build as Android app.
- GitHub Actions workflow that builds a debug APK and uploads it as an artifact.

Quick development (Chromebook / Gitpod / Codespaces)
1. Open the repo in Gitpod or Codespaces, or use GitHub web editor to edit files.
   - Gitpod: prefix repo URL with https://gitpod.io/#https://github.com/USER/REPO
2. Install and run locally (if your environment supports Node):
   - npm ci
   - npm run dev
   The Vite server should start (accessible via preview). On a phone, open the dev URL or use a public tunnel.

Build an APK locally (in a Linux/macOS dev environment)
1. npm ci
2. npm run build
3. npx cap sync android
4. cd android && ./gradlew assembleDebug
5. APK is at `android/app/build/outputs/apk/debug/app-debug.apk`

Build an APK using GitHub Actions (works from Chromebook)
1. Push your code to the `main` branch on GitHub.
2. Go to the Actions tab → run the `Build Android APK (Capacitor + Vite)` workflow (or wait for push to main).
3. When finished, open the workflow run and download the `android-apks` artifact (contains the debug APK).
4. Transfer the APK to your Android device and install (enable installation from unknown sources if needed).

Notes about iOS / publishing
- The workflow produces a debug APK (signed with debug key). To publish to Google Play, produce a release build and sign with your release keystore (add keystore to GitHub Secrets) — I can help add that step.
- For iOS, Apple requires macOS signing. You can use a cloud macOS builder (EAS, Codemagic, Bitrise) to create and sign the iOS app later.

Next steps
- Open the repo in Gitpod: https://gitpod.io/#https://github.com/YOUR_USERNAME/gamesimulator
- After code is pushed to main, go to Actions → run the workflow or wait for push to trigger. Download the APK artifact and install it on your Android phone for testing.
