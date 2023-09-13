import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { App } from '../src/App';
const PORT = 3006;
const app = express();

/**
 * express route handler for /stream
 */
app.get('/stream', (req, response) => {
    const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
        bootstrapScripts: ['/bundle.js'],
        onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
        }
    });
});

app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve('./public/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.use(express.static('./public'));
app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});