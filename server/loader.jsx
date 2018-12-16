import { StyleSheetServer } from 'aphrodite';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import manifest from '../build/asset-manifest.json';
import { hydrateThemeData } from '../src/actions/theme';
import { hydratePageData } from '../src/actions/page';
import { hydrateLocalizationData } from '../src/actions/localization';
import App from '../src/component/app/index';
import createStore from '../src/store/index';
import { getConfigForRoute, getPageDataForRoute } from '../src/utils/route';
import { ApplicationProvider } from '../src/context/application';

import theme from '../src/theme/light'

/**
 * Determine the appropriate data url based on the request's url;
 * Fetch the appropriate data for the route;
 * Render the app with the appropriate state
 *
 * @param {Request} req The HTTP request
 * @param {Response} res The HTTP response
 *
 * @returns null
 */

export default (req, res) => {
  const config = getConfigForRoute(req.url);
  if (config && config.api && config.api.pageData) {
    const absoluteUrl =
      process.env.REACT_APP_KLAW_API_BASE_URL + config.api.pageData;
    return getPageDataForRoute(absoluteUrl).then(data => {
      let typedData = Object.assign(data, { pageType: config.type });
      return render(req, res, typedData, config.type);
    });
  }
  return render(req, res, null, '');
};

/**
 * Inject dynamic content such as HTML, CSS, JS, etc. into the appropriate DOM
 * node in the template.
 *
 * @param {string} input The template input
 * @param {object} injectibles The injectible values
 */

const injectHTML = (input, injectibles) => {
  const { html, css, title, meta, link, body, scripts, state } = injectibles;
  let output = input.slice();
  output = output.replace('<html>', `<html ${html}>`);
  output = output.replace(/<title>.*?<\/title>/g, title);
  output = output.replace(
    '</head>',
    `${meta}${link}<style data-aphrodite>${css.content}</style></head>`
  );
  output = output.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  );
  output = output.replace('</body>', `${scripts.join('')}</body>`);
  return output;
};

/**
 * injects dynamic content into the page.
 *
 * @param {?} result ???
 * @param {?} context ???
 * @param {?} res ???
 * @param {?} modules ???
 * @param {?} htmlData ???
 * @param {?} store ???
 */

const injectRouteContent = (result, context, res, modules, htmlData, store) => {
  const routeHtml = result.html;
  const routeCss = result.css;

  if (context.url) {
    // If context has a url property, then we need to handle a redirect in Redux Router
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    // Load page-specific JS assets for code splitting
    const extractAssets = (assets, chunks) =>
      Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
        .map(k => assets[k]);

    // Format page-specific JS assets into <script> tags
    let extraChunks = extractAssets(manifest, modules).map(
      chunk => `<script type="text/javascript" src="/${chunk}"></script>`
    );

    extraChunks = extraChunks.concat(
      `<script>window.renderedClassNames = ${JSON.stringify(
        routeCss.renderedClassNames
      )};</script>`
    );

    // Tell Helmet to compute the right meta tags, title, etc.
    const helmet = Helmet.renderStatic();

    const html = injectHTML(htmlData, {
      body: routeHtml,
      css: routeCss,
      html: helmet.htmlAttributes.toString(),
      link: helmet.link.toString(),
      meta: helmet.meta.toString(),
      scripts: extraChunks,
      state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
      styles: routeCss,
      title: helmet.title.toString()
    });

    res.send(html);
  }
};

/**
 * injects dynamic content into the appropriate DOM nodes of the HTML input.
 *
 * @param {Request} req The HTTP request
 * @param {Response} res The HTTP response
 * @param {object} pageData data to inject into the application store
 * @param {string} pageType The type of page (article, topic, result, etc.)
 */

const render = (req, res, pageData, pageType) => {
  const buildHtmlPath = '../build/index.html';
  const htmlPath = path.resolve(__dirname, buildHtmlPath);

  return fs.readFile(htmlPath, 'utf8', (htmlError, htmlData) => {
    if (htmlError) {
      return res.status(404).end();
    }

    const context = {};
    const modules = [];
    const { store } = createStore(req.url);

    // Data hydration
    const language = process.env.KLAW_LOCALIZATION || 'en-us';
    const buildLanguagePath = `../src/localization/${language}.json`;
    const languagePath = path.resolve(__dirname, buildLanguagePath);

    return fs.readFile(
      languagePath,
      'utf8',
      (localizationError, localizationData) => {
        if (localizationError) {
          return res.status(404).end();
        }
        store.dispatch(hydratePageData(pageType, pageData));
        store.dispatch(hydrateThemeData(theme));
        store.dispatch(hydrateLocalizationData(localizationData));
        return serverRender(modules, store, req, context).then(result => {
          injectRouteContent(result, context, res, modules, htmlData, store);
        });
      }
    );
  });
};

const serverRender = (modules, store, req, context) => {
  const applicationContext = {
    strings: store.getState().localization,
    theme: store.getState().theme
  };

  return frontloadServerRender(
      () => StyleSheetServer.renderStatic(() => renderToString(<Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Frontload isServer>
            <ApplicationProvider value={applicationContext}>
              <App />
            </ApplicationProvider>
          </Frontload>
        </StaticRouter>
      </Provider>)));
}