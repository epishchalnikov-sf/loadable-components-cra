import express from 'express';
import { renderToString } from 'react-dom/server';
import App from './App';
import path from 'path';
import fs from "fs";
import React from 'react';
import { ChunkExtractor } from '@loadable/server';

const loadIndexHtml = async () => {
    const indexHtmlPath = path.resolve('./build/index.html');
    const indexHtml = await new Promise(resolve => {
        fs.readFile(indexHtmlPath, 'utf8', (err, fileContents) => {
            if (err) {
              console.error('Something went wrong:', err);
              throw err;
            }
        
            resolve(fileContents);
        });
    });

    return indexHtml;
};

const prepareBeforeStart = () => {
    return Promise.all([
        loadIndexHtml(),
    ]);
};

const serve = (publicFolder) => {
    const expressStatic = express.static(publicFolder);
  
    return (req, res, next) => {
      if (req.url === '/') {
        return next();
      } else if (['/server', '/admin'].some(path => req.url.startsWith(path))) {
        res.status(404).end('404 Not found');
      }
  
      expressStatic(req, res, next);
    };
  };

const startSsrServer = ([indexHtml]) => {
    const server = express();
    server.use(serve('./build'));
    server.get('*', (req, res) => {
        const statsFile = path.resolve('./build/loadable-stats.json');
        const extractor = new ChunkExtractor({ statsFile });
        const jsx = extractor.collectChunks(<App />);

        const renderedApp = renderToString(jsx);

        const scriptTags = extractor.getScriptTags();
        const linkTags = extractor.getLinkTags();
        const styleTags = extractor.getStyleTags();

        const document = indexHtml
            .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`)
            .replace('%REACT_APP_IS_SSR_MODE%', `${!process.env.NO_SSR}`)
            .replace('%REACT_APP_LINK_TAGS%', `<!-- linkTags --> ${linkTags} <!-- linkTags end -->`)
            .replace('%REACT_APP_STYLE_TAGS%', `<!-- styleTags --> ${styleTags} <!-- styleTags end -->`)
            .replace('%REACT_APP_SCRIPT_TAGS%', `<!-- scriptTags --> ${scriptTags} <!-- scriptTags end -->`);
        res.send(document);
    });
    
    server.listen(3000, () => console.log('listening on port 3000'));
};

prepareBeforeStart().then(startSsrServer);
