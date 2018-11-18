import { StyleSheetServer } from "aphrodite";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { Frontload, frontloadServerRender } from "react-frontload";
import Helmet from "react-helmet";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import manifest from "../build/asset-manifest.json";
import { hydratePageData } from "../src/actions/page";
import App from "../src/component/app/index";
import createStore from "../src/store/index";

import {
  getApiUrlForRoute,
  getPageDataForRoute,
  getPageTypeForRoute
} from "../src/utils/route";

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
  return getApiUrlForRoute(req.url)
    .then(apiUrlForRoute => getPageDataForRoute(apiUrlForRoute))
    .then(pageData => {
     return render(req, res, pageData, getPageTypeForRoute(req.url))
  });
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
  output = output.replace("<html>", `<html ${html}>`);
  output = output.replace(/<title>.*?<\/title>/g, title);
  output = output.replace(
    "</head>",
    `${meta}${link}<style data-aphrodite>${css.content}</style></head>`
  );
  output = output.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  );
  output = output.replace("</body>", `${scripts.join("")}</body>`);
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
        .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
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
      html: helmet.htmlAttributes.toString(),
      css: routeCss,
      title: helmet.title.toString(),
      link: helmet.link.toString(),
      meta: helmet.meta.toString(),
      styles: routeCss,
      body: routeHtml,
      scripts: extraChunks,
      state: JSON.stringify(store.getState()).replace(/</g, "\\u003c")
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
  const buildHtmlPath = "../build/index.html";
  const htmlPath = path.resolve(__dirname, buildHtmlPath);

  return fs.readFile(htmlPath, "utf8", (error, htmlData) => {
    if (error) return res.status(404).end();

    const context = {};
    const modules = [];
    const { store } = createStore(req.url);

    // Data hydration
    store.dispatch(hydratePageData(pageType, pageData));

    return serverRender(modules, store, req, context).then(result => {
      injectRouteContent(result, context, res, modules, htmlData, store);
    });
  });
};

const serverRender = (modules, store, req, context) =>
  frontloadServerRender(() =>
    StyleSheetServer.renderStatic(() =>
      renderToString(
        <Loadable.Capture report={module => modules.push(module)}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <Frontload isServer>
                <App />
              </Frontload>
            </StaticRouter>
          </Provider>
        </Loadable.Capture>
      )
    )
  );
