const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require("path");

const port = 9990;

var win;
let e = express();

e.use(express.json());

e.delete("/api/shutdown", (req, res) => {
    const magicNumber = req.body.magicNumber;
    const correctMagicNumber = "9987"; // Replace with your actual magic number
  
    if (magicNumber === correctMagicNumber) {
      res.send("Server shutting down...");
      process.exit();
    } else {
      res.status(403).send("Incorrect magic number");
    }
});

e.post("/api/fullscreen", (req, res) => {
    const magicNumber = req.body.magicNumber;
    const correctMagicNumber = "9987"; // Replace with your actual magic number

    if (magicNumber === correctMagicNumber) {
        res.send("Toggling fullscreen...");

        if (win) {
            win.setFullScreen(!win.isFullScreen());
        }
    } else {
        res.status(403).send("Incorrect magic number");
    }
});

e.use(express.static(path.join(__dirname, "build")));

let s = e.listen(port, "localhost");

function createWindow() {
    win = new BrowserWindow({ width: 1080, height: 1920, frame: false });
    win.setFullScreen(true);

    win.loadURL(`http://localhost:${port}`);

    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should devare the corresponding element.
        win = null;
    });
}

app.on("ready", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // startServer();
  
    createWindow();
});


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});


app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});
  
  