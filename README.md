# fuse-box-debug

This is a demonstration on how to debug a [fuse-box](http://fuse-box.org/) project with [visual studio code](https://code.visualstudio.com/). A walkthrough on how it works can be found on the [fuse-box vscode debugging guide.](https://fuse-box.org/page/debugging-with-vscode)

## Setup

- Install dependecies with `npm i`
- Open this project in `vscode` and install the 
[chrome-debug](https://github.com/Microsoft/vscode-chrome-debug) extension.
- Start `fuse-box` with the start task in vscode or `npm start` in your terminal
- Then hit `f5` in `vscode` to start fuse-box and launch a new instance of chrome with debugging enabled

Optionally there is a compound configuration `Start Both` that will let you debug the server as well.

## Notes

Currently when debugging source-maps won't update on hot reload it's currently tracked in issue fuse-box/fuse-box#673.
