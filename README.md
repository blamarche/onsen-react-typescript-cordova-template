### Cordova-Typescript-React-OnsenUI VSCode Template

Requirements:
Android SDK & PATH, ANDROID_HOME set

Nodejs & NPM

Vscode & Cordova Tools extension preferred
```
npm install -g typescript
npm install -g cordova
npm install typings --global
```

Note: In typings folder, had to create a react-jsx-override/index.d.ts file, to add `[elemName: string]: any;` to JSX.IntrinsicElements to allow Onsen components to render

Change config.xml id attribute to com.<mycompany>.<appname>, and other settings as desired

Plugins recommended:
```
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-compat
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-device-motion
cordova plugin add cordova-plugin-device-orientation
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-crosswalk-webview
cordova plugin add cordova-plugin-wkwebview-engine
```

Run: `cordova platform add android`

Run: `cordova platform add ios`


To auto-compile .ts/.tsx scripts, run: `sh tsc.sh`


To build: `cordova build android`

To run on device: `cordova run android`

To emulate: `cordova emulate android`
