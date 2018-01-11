const { path: rootPath } = require("app-root-path");
const { FuseBox, WebIndexPlugin } = require("fuse-box");
const path = require("path");

const fuse = FuseBox.init({
	homeDir: "src/",									
	output: "dist/$name.js",
	sourceMaps: { inline: false },
	plugins: [
		WebIndexPlugin({ bundles: ["app"] })
	]
});

fuse.dev({ httpServer: true, hmr: true });

fuse.bundle("app")
	.instructions(">index.tsx")
	.target("browser@es2015")
	.watch()
	.hmr();	

fuse.run();