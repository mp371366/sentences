import express from 'express';
import dotenv from 'dotenv';
import React from 'react';
import App from './components/App/App';
import ReactDOMServer from "react-dom/server";
import { StyleSheetServer } from 'aphrodite';
import path from 'path';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const initialState = {
  db: process.env.DATABASE_URL,
};

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('*', async (req, res) => {
  try {
    const { html, css: { content, renderedClassNames } } = StyleSheetServer.renderStatic(() => {
      return ReactDOMServer.renderToString(<App {...initialState} />);
    });

    const ssrData = {
      initialState,
      renderedClassNames,
    };

    const template =
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Sentences Website" />
          <title>Sentences</title>
          <style data-aphrodite>{content}</style>
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{ __html: html }} />
          <script dangerouslySetInnerHTML={{ __html: `window.SSR_DATA = ${JSON.stringify(ssrData)};` }} />
          <script src="./bundle.js"></script>
        </body>
      </html>
      ;

    res.send(`<!doctype html>${ReactDOMServer.renderToStaticMarkup(template)}`);
  } catch (err) {
    res.send(`<h1 style="color: red;">${err}</h1>`);
  }
});

app.listen(PORT, HOST);