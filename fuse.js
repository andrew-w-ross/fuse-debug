const { FuseBox, WebIndexPlugin } = require("fuse-box");

const fuse = FuseBox.init({
	homeDir: "src/",
	output: "dist/$name.js",
	sourceMaps: true, //{ sourceRoot: "/src", inline: false },
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