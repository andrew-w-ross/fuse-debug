const { FuseBox, WebIndexPlugin } = require('fuse-box');

const fuse = FuseBox.init({
	homeDir: 'src/',
	output: 'dist/$name.js',
	sourceMaps: { inline: false, vendor: false }, //Not needed as we are debugging with vscode
	plugins: [
		WebIndexPlugin({			
			bundles: [ 'public/client' ],
			title: 'fuse-debug'
		})
	]
});

fuse.dev({ httpServer: false });

fuse
	.bundle('public/client')
	.instructions('>client/index.tsx')
	//When in dev push the version as high as possible
	.target('browser@es2017') 
	.watch('src/client/**')
	.hmr();

fuse
	.bundle('server')
	.instructions('>[server/index.ts]')
	.target('server@es2017')
	.watch('src/server/**')
	.hmr()	
	.completed((proc) => {		
		proc.require({
			close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
		});
	});

fuse.run();
