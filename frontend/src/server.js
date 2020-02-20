import express from 'express';
import dotenv from 'dotenv';
import React from 'react';
import App from './components/App';
import ReactDOMServer from "react-dom/server";
import { StyleSheetServer } from 'aphrodite';
import path from 'path';
import { StaticRouter, matchPath } from 'react-router';
import Routes from './routes';
import 'isomorphic-fetch';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const API = process.env.API_URL;

const initialState = {
  api: API.replace('api', 'localhost'),
};

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('*', async (req, res) => {
  const { loadData } = Routes.find(route => matchPath(req.url, route)) || {};
  const data = await (loadData ? loadData(API) : Promise.resolve(null)).catch(() => null);

  const context = {};
  const { html, css: { content, renderedClassNames } } = StyleSheetServer.renderStatic(() => {
    return ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App {...initialState} data={data} />
      </StaticRouter>
    );
  });

  if (context.status === 404) {
    res.status(404);
  }

  if (context.url) {
    return res.redirect(301, context.url);
  }

  const ssrData = {
    initialState,
    renderedClassNames,
    data,
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
});

app.listen(PORT, HOST);