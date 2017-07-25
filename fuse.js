const { path: rootPath } = require("app-root-path");
const { FuseBox, WebIndexPlugin } = require("fuse-box");
const path = require("path");

const fuse = FuseBox.init({
	homeDir: "src/",									
	output: "dist/$name.js",
	modulesFolder: path.join(rootPath, "node_modules"), //Only needed if you are globally linking for dev purposes
	sourceMaps: { sourceRoot: "src", inline: false }, //By default the sourceRoot is /src this generally breaks the vscode debugger	
	plugins: [
		WebIndexPlugin({ bundles: ["app"] })
	]
});

fuse.dev({ httpServer: true, hmr: true });

fuse.bundle("app")
	.instructions(">index.tsx")
	.watch()
	.hmr();	

fuse.run();