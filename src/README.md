# PROFI Bootstrap Template
This guide will help you get started with PROFI! All the important stuff – compiling the source, file structure, build tools, file includes – is documented here, but should you have any questions, always feel free to reach out to [support@htmlhunters.com](mailto:support@htmlhunters.com).

## Structure
Extract the zip file you received after purchase, and you would find the exact below files and folders:

```
├── graphics
│   ├── map-marker.png
│   ├── map-marker.sketch
│   └── md-pin.png
├── src
│   ├── assets
│   │   ├── images
│   │   ├── js
│   │   ├── scss
│   │   └── video
│   ├── booking.html
│   ├── booking_confirmation.html
│   ├── home_attorney.html
│   ├── home_beauty.html
│   ├── home_contractor.html
│   ├── home_restaurant.html
│   ├── home_therapist.html
│   └── order.html
├── readme.md
├── gulpfile.js
├── package-lock.json
└── package.json
```

## Tooling setup 
**Attention: minimum required version of Node.js is `13.8.0`.**

PROFI uses [npm scripts](https://docs.npmjs.com/misc/scripts) for its build system. Our package.json includes convenient methods for working with the framework, including compiling code, running local development server and more.

To use our build system locally, you’ll need a copy of template's source files and [Node](https://nodejs.org/). Follow these steps and you should be ready to rock:

1. [Download and install Node.js](https://nodejs.org/en/download/), which we use to manage our dependencies.
2. Unzip your theme and navigate to its root directory and run `npm install` to install our local dependencies listed in `package.json`.

When completed, you’ll be able to run the various commands provided from the command line. It's that simple! If you're not used to using terminal, don't worry, this is as advanced as it gets. If you want to kill the server and stop all tasks, just hit `Control + C`.

## Using npm scripts
Our `package.json` includes the following commands and tasks:

| Task | Description |
|------|-------------|
|`npm start`|Starts local development server with `browsersync`.|
`npm run build`|Compile & minify all your sources. Output of this command will be placed to the `/build` directory.|

Run `npm run` to see all the npm scripts. 

## Accessing local demo server
After running `npm start` allow it up to 5 minutes to build and then you will see the message:

```
[Browsersync] Access URLs:
 ---------------------------------------
       Local: http://localhost:3000
    External: http://192.168.31.253:3000
 ---------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 ---------------------------------------
[Browsersync] Serving files from: /profi-bootstrap-template/build
```

It means that local demo server is up and running. Access it by going to `http://localhost:3000` in your browser.
