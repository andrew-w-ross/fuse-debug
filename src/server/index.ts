import * as express from 'express';
import { Server } from 'net';
import { path as rootPath } from 'app-root-path';
import * as path from 'path';

const app = express();

let server: Server | undefined;

const PORT = 3000;
const PUBLIC_PATH = path.join(rootPath, 'dist', 'public');
const INDEX_PATH = path.join(rootPath, 'dist', 'index.html');

app.use('/public', express.static(PUBLIC_PATH));
app.use('/favicon.ico', (req, res) => {
	res.status(404).end();
});
app.get('/caps/:message', async (req, res) => {
	const { message = 'No Message' } = req.params;	
	await wait(500);
	res.end(message.toUpperCase());
});
app.use((req, res) => {
	res.sendFile(INDEX_PATH);
});

function wait(time = 5) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

export async function startup() {
	if (server != null) {
		throw new Error('Server already listening.');
	}

	await new Promise((resolve) => {
		server = app.listen(PORT, () => {
			console.log(`Listening @ http://localhost:${PORT}`);
		});
	});
}

export async function shutdown() {
	//Fuse box is quite quick so sometimes shutdown will be called before the server finished initializing
	//spinWait hopefully stops this race condition
	const spinWait = async () => {
		for (let i = 0; i < 5; i++) {			
			if (server != null && server.listening) {
				return;
			}
			await wait();
		}
		throw new Error(`Wait timed out.`);
	};
	await spinWait();
	await new Promise((resolve) => {
		if (server != null) {
			server.close(resolve);
		}
	});
	server = undefined;
}

if (module.parent == null) {
	startup();
}
