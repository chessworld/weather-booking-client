## Weather Booking Client Installation Instructions

Ionic global installation:
```sh
npm install -g @ionic/cli
```

Install node modules:
```sh
npm install
```

Local deployment:
```sh
ionic build
ionic serve
```

Build and Running the App on ios emulator
```sh
npm run build
npx cap copy
npx cap add ios
npx cap open ios
```

Running the App on ios with hot reload for debugging purposes

```sh
ionic serve
ionic capacitor run ios -l --external
```
