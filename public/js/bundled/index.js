// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
          ? window
          : typeof global !== "undefined"
            ? global
            : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === "function" &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== "undefined" &&
    typeof module.require === "function" &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === "function" &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, "root", {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})(
  {
    kx4kz: [
      function (require, module, exports) {
        var global = arguments[3];
        var HMR_HOST = null;
        var HMR_PORT = null;
        var HMR_SECURE = false;
        var HMR_ENV_HASH = "d6ea1d42532a7575";
        var HMR_USE_SSE = false;
        module.bundle.HMR_BUNDLE_ID = "4c74fe43c064fd94";
        ("use strict");
        /* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
        var OldModule = module.bundle.Module;
        function Module(moduleName) {
          OldModule.call(this, moduleName);
          this.hot = {
            data: module.bundle.hotData[moduleName],
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function (fn) {
              this._acceptCallbacks.push(fn || function () {});
            },
            dispose: function (fn) {
              this._disposeCallbacks.push(fn);
            },
          };
          module.bundle.hotData[moduleName] = undefined;
        }
        module.bundle.Module = Module;
        module.bundle.hotData = {};
        var checkedAssets /*: {|[string]: boolean|} */,
          assetsToDispose /*: Array<[ParcelRequire, string]> */,
          assetsToAccept /*: Array<[ParcelRequire, string]> */;
        function getHostname() {
          return (
            HMR_HOST ||
            (location.protocol.indexOf("http") === 0
              ? location.hostname
              : "localhost")
          );
        }
        function getPort() {
          return HMR_PORT || location.port;
        }
        // eslint-disable-next-line no-redeclare
        var parent = module.bundle.parent;
        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== "undefined"
        ) {
          var hostname = getHostname();
          var port = getPort();
          var protocol =
            HMR_SECURE ||
            (location.protocol == "https:" &&
              !["localhost", "127.0.0.1", "0.0.0.0"].includes(hostname))
              ? "wss"
              : "ws";
          var ws;
          if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
          else
            try {
              ws = new WebSocket(
                protocol + "://" + hostname + (port ? ":" + port : "") + "/"
              );
            } catch (err) {
              if (err.message) console.error(err.message);
              ws = {};
            }
          // Web extension context
          var extCtx =
            typeof browser === "undefined"
              ? typeof chrome === "undefined"
                ? null
                : chrome
              : browser;
          // Safari doesn't support sourceURL in error stacks.
          // eval may also be disabled via CSP, so do a quick check.
          var supportsSourceURL = false;
          try {
            (0, eval)('throw new Error("test"); //# sourceURL=test.js');
          } catch (err) {
            supportsSourceURL = err.stack.includes("test.js");
          }
          // $FlowFixMe
          ws.onmessage = async function (event /*: {data: string, ...} */) {
            checkedAssets = {} /*: {|[string]: boolean|} */;
            assetsToAccept = [];
            assetsToDispose = [];
            var data /*: HMRMessage */ = JSON.parse(event.data);
            if (data.type === "update") {
              // Remove error overlay if there is one
              if (typeof document !== "undefined") removeErrorOverlay();
              let assets = data.assets.filter(
                (asset) => asset.envHash === HMR_ENV_HASH
              );
              // Handle HMR Update
              let handled = assets.every((asset) => {
                return (
                  asset.type === "css" ||
                  (asset.type === "js" &&
                    hmrAcceptCheck(
                      module.bundle.root,
                      asset.id,
                      asset.depsByBundle
                    ))
                );
              });
              if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (
                  typeof window !== "undefined" &&
                  typeof CustomEvent !== "undefined"
                )
                  window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {}; /*: {|[string]: boolean|} */
                for (let i = 0; i < assetsToDispose.length; i++) {
                  let id = assetsToDispose[i][1];
                  if (!processedAssets[id]) {
                    hmrDispose(assetsToDispose[i][0], id);
                    processedAssets[id] = true;
                  }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for (let i = 0; i < assetsToAccept.length; i++) {
                  let id = assetsToAccept[i][1];
                  if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                  }
                }
              } else fullReload();
            }
            if (data.type === "error") {
              // Log parcel errors to console
              for (let ansiDiagnostic of data.diagnostics.ansi) {
                let stack = ansiDiagnostic.codeframe
                  ? ansiDiagnostic.codeframe
                  : ansiDiagnostic.stack;
                console.error(
                  "\uD83D\uDEA8 [parcel]: " +
                    ansiDiagnostic.message +
                    "\n" +
                    stack +
                    "\n\n" +
                    ansiDiagnostic.hints.join("\n")
                );
              }
              if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
              }
            }
          };
          if (ws instanceof WebSocket) {
            ws.onerror = function (e) {
              if (e.message) console.error(e.message);
            };
            ws.onclose = function () {
              console.warn(
                "[parcel] \uD83D\uDEA8 Connection to the HMR server was lost"
              );
            };
          }
        }
        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID);
          if (overlay) {
            overlay.remove();
            console.log("[parcel] \u2728 Error resolved");
          }
        }
        function createErrorOverlay(diagnostics) {
          var overlay = document.createElement("div");
          overlay.id = OVERLAY_ID;
          let errorHTML =
            '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
          for (let diagnostic of diagnostics) {
            let stack = diagnostic.frames.length
              ? diagnostic.frames.reduce((p, frame) => {
                  return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
                }, "")
              : diagnostic.stack;
            errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint) => "<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
          }
          errorHTML += "</div>";
          overlay.innerHTML = errorHTML;
          return overlay;
        }
        function fullReload() {
          if ("reload" in location) location.reload();
          else if (extCtx && extCtx.runtime && extCtx.runtime.reload)
            extCtx.runtime.reload();
        }
        function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
          var modules = bundle.modules;
          if (!modules) return [];
          var parents = [];
          var k, d, dep;
          for (k in modules)
            for (d in modules[k][1]) {
              dep = modules[k][1][d];
              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              )
                parents.push([bundle, k]);
            }
          if (bundle.parent)
            parents = parents.concat(getParents(bundle.parent, id));
          return parents;
        }
        function updateLink(link) {
          var href = link.getAttribute("href");
          if (!href) return;
          var newLink = link.cloneNode();
          newLink.onload = function () {
            if (link.parentNode !== null)
              // $FlowFixMe
              link.parentNode.removeChild(link);
          };
          newLink.setAttribute(
            "href", // $FlowFixMe
            href.split("?")[0] + "?" + Date.now()
          );
          // $FlowFixMe
          link.parentNode.insertBefore(newLink, link.nextSibling);
        }
        var cssTimeout = null;
        function reloadCSS() {
          if (cssTimeout) return;
          cssTimeout = setTimeout(function () {
            var links = document.querySelectorAll('link[rel="stylesheet"]');
            for (var i = 0; i < links.length; i++) {
              // $FlowFixMe[incompatible-type]
              var href /*: string */ = links[i].getAttribute("href");
              var hostname = getHostname();
              var servedFromHMRServer =
                hostname === "localhost"
                  ? new RegExp(
                      "^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" +
                        getPort()
                    ).test(href)
                  : href.indexOf(hostname + ":" + getPort());
              var absolute =
                /^https?:\/\//i.test(href) &&
                href.indexOf(location.origin) !== 0 &&
                !servedFromHMRServer;
              if (!absolute) updateLink(links[i]);
            }
            cssTimeout = null;
          }, 50);
        }
        function hmrDownload(asset) {
          if (asset.type === "js") {
            if (typeof document !== "undefined") {
              let script = document.createElement("script");
              script.src = asset.url + "?t=" + Date.now();
              if (asset.outputFormat === "esmodule") script.type = "module";
              return new Promise((resolve, reject) => {
                var _document$head;
                script.onload = () => resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null ||
                  _document$head === void 0 ||
                  _document$head.appendChild(script);
              });
            } else if (typeof importScripts === "function") {
              // Worker scripts
              if (asset.outputFormat === "esmodule")
                return import(asset.url + "?t=" + Date.now());
              else
                return new Promise((resolve, reject) => {
                  try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                  } catch (err) {
                    reject(err);
                  }
                });
            }
          }
        }
        async function hmrApplyUpdates(assets) {
          global.parcelHotUpdate = Object.create(null);
          let scriptsToRemove;
          try {
            // If sourceURL comments aren't supported in eval, we need to load
            // the update from the dev server over HTTP so that stack traces
            // are correct in errors/logs. This is much slower than eval, so
            // we only do it if needed (currently just Safari).
            // https://bugs.webkit.org/show_bug.cgi?id=137297
            // This path is also taken if a CSP disallows eval.
            if (!supportsSourceURL) {
              let promises = assets.map((asset) => {
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null ||
                  _hmrDownload === void 0
                  ? void 0
                  : _hmrDownload.catch((err) => {
                      // Web extension fix
                      if (
                        extCtx &&
                        extCtx.runtime &&
                        extCtx.runtime.getManifest().manifest_version == 3 &&
                        typeof ServiceWorkerGlobalScope != "undefined" &&
                        global instanceof ServiceWorkerGlobalScope
                      ) {
                        extCtx.runtime.reload();
                        return;
                      }
                      throw err;
                    });
              });
              scriptsToRemove = await Promise.all(promises);
            }
            assets.forEach(function (asset) {
              hmrApply(module.bundle.root, asset);
            });
          } finally {
            delete global.parcelHotUpdate;
            if (scriptsToRemove)
              scriptsToRemove.forEach((script) => {
                if (script) {
                  var _document$head2;
                  (_document$head2 = document.head) === null ||
                    _document$head2 === void 0 ||
                    _document$head2.removeChild(script);
                }
              });
          }
        }
        function hmrApply(bundle /*: ParcelRequire */, asset /*:  HMRAsset */) {
          var modules = bundle.modules;
          if (!modules) return;
          if (asset.type === "css") reloadCSS();
          else if (asset.type === "js") {
            let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
            if (deps) {
              if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for (let dep in oldDeps)
                  if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                  }
              }
              if (supportsSourceURL)
                // Global eval. We would use `new Function` here but browser
                // support for source maps is better with eval.
                (0, eval)(asset.output);
              // $FlowFixMe
              let fn = global.parcelHotUpdate[asset.id];
              modules[asset.id] = [fn, deps];
            } else if (bundle.parent) hmrApply(bundle.parent, asset);
          }
        }
        function hmrDelete(bundle, id) {
          let modules = bundle.modules;
          if (!modules) return;
          if (modules[id]) {
            // Collect dependencies that will become orphaned when this module is deleted.
            let deps = modules[id][1];
            let orphans = [];
            for (let dep in deps) {
              let parents = getParents(module.bundle.root, deps[dep]);
              if (parents.length === 1) orphans.push(deps[dep]);
            }
            // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
            delete modules[id];
            delete bundle.cache[id];
            // Now delete the orphans.
            orphans.forEach((id) => {
              hmrDelete(module.bundle.root, id);
            });
          } else if (bundle.parent) hmrDelete(bundle.parent, id);
        }
        function hmrAcceptCheck(
          bundle /*: ParcelRequire */,
          id /*: string */,
          depsByBundle /*: ?{ [string]: { [string]: string } }*/
        ) {
          if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
          // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
          let parents = getParents(module.bundle.root, id);
          let accepted = false;
          while (parents.length > 0) {
            let v = parents.shift();
            let a = hmrAcceptCheckOne(v[0], v[1], null);
            if (a)
              // If this parent accepts, stop traversing upward, but still consider siblings.
              accepted = true;
            else {
              // Otherwise, queue the parents in the next level upward.
              let p = getParents(module.bundle.root, v[1]);
              if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
              }
              parents.push(...p);
            }
          }
          return accepted;
        }
        function hmrAcceptCheckOne(
          bundle /*: ParcelRequire */,
          id /*: string */,
          depsByBundle /*: ?{ [string]: { [string]: string } }*/
        ) {
          var modules = bundle.modules;
          if (!modules) return;
          if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
            // If we reached the root bundle without finding where the asset should go,
            // there's nothing to do. Mark as "accepted" so we don't reload the page.
            if (!bundle.parent) return true;
            return hmrAcceptCheck(bundle.parent, id, depsByBundle);
          }
          if (checkedAssets[id]) return true;
          checkedAssets[id] = true;
          var cached = bundle.cache[id];
          assetsToDispose.push([bundle, id]);
          if (!cached || (cached.hot && cached.hot._acceptCallbacks.length)) {
            assetsToAccept.push([bundle, id]);
            return true;
          }
        }
        function hmrDispose(bundle /*: ParcelRequire */, id /*: string */) {
          var cached = bundle.cache[id];
          bundle.hotData[id] = {};
          if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
          if (cached && cached.hot && cached.hot._disposeCallbacks.length)
            cached.hot._disposeCallbacks.forEach(function (cb) {
              cb(bundle.hotData[id]);
            });
          delete bundle.cache[id];
        }
        function hmrAccept(bundle /*: ParcelRequire */, id /*: string */) {
          // Execute the module.
          bundle(id);
          // Run the accept callbacks in the new version of the module.
          var cached = bundle.cache[id];
          if (cached && cached.hot && cached.hot._acceptCallbacks.length)
            cached.hot._acceptCallbacks.forEach(function (cb) {
              var assetsToAlsoAccept = cb(function () {
                return getParents(module.bundle.root, id);
              });
              if (assetsToAlsoAccept && assetsToAccept.length) {
                assetsToAlsoAccept.forEach(function (a) {
                  hmrDispose(a[0], a[1]);
                });
                // $FlowFixMe[method-unbinding]
                assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
              }
            });
        }
      },
      {},
    ],
    f2QDv: [
      function (require, module, exports) {
        var _adminUsersForm = require("./adminUsersForm");
        var _map = require("./map");
        var _stripe = require("./stripe");
        var _reviewFormLogic = require("./reviewFormLogic");
        var _tourFormLogic = require("./tourFormLogic");
        var _userFormLogic = require("./userFormLogic");
        // Admin Users
        const usersAdmin = document.querySelectorAll(".form--users");
        const usersAdminDelete = document.querySelectorAll(
          ".form__delete--user-delete"
        );
        usersAdmin?.forEach((form) => {
          form.addEventListener(
            "submit",
            (0, _adminUsersForm.handleAdminUsersSubmit)
          );
        });
        usersAdminDelete?.forEach((btn) => {
          btn.addEventListener(
            "click",
            (0, _adminUsersForm.handleAdminUsersDelete)
          );
        });
        // Reviews
        const createReviewForm = document.querySelector(".form--create-review");
        const updateReviewForms = document.querySelectorAll(
          ".form--update-review"
        );
        const deleteReviewButtons = document.querySelectorAll(
          ".form__delete--review-delete"
        );
        const deleteReviewBtn = document.querySelector(".review__delete-btn");
        createReviewForm?.addEventListener(
          "submit",
          (0, _reviewFormLogic.handleSubmitReview)
        );
        updateReviewForms?.forEach((el) => {
          el.addEventListener(
            "submit",
            (0, _reviewFormLogic.handleSubmitReview)
          );
        });
        deleteReviewBtn?.addEventListener(
          "click",
          (0, _reviewFormLogic.handleDeleteReview)
        );
        deleteReviewButtons?.forEach((btn) => {
          btn.addEventListener(
            "click",
            (0, _reviewFormLogic.handleDeleteReview)
          );
        });
        window.handleStar = function handleStar(e) {
          const starRate = +e.target.closest(".form__star").dataset.star;
          const allButtons = e.target
            .closest(".form__group--stars")
            .querySelectorAll(".form__star");
          (0, _reviewFormLogic.makeStartRate)(allButtons, starRate);
        };
        // Stripe
        const bookingBtn = document.querySelector(".btn--booking");
        bookingBtn?.addEventListener("click", (e) => {
          const tourId = e.target.dataset.tour;
          (0, _stripe.bookingTour)(tourId, e.target);
        });
        // Tour Form
        const addLocationBtn = document.querySelector(".btn--locations");
        const addUserBtn = document.querySelector(".btn--user");
        const photosFile = document.getElementById("photos");
        const coverImage = document.getElementById("cover");
        const dateBtn = document.querySelector(".btn--date");
        const deleteBtn = document.querySelectorAll(".btn--delete-tour");
        addLocationBtn?.addEventListener(
          "click",
          (0, _tourFormLogic.handleAddLocationsClick)
        );
        window.deleteLocationItem = function deleteLocationItem(e) {
          e.preventDefault();
          const locations = JSON.parse(e.target.dataset.locations);
          const order = e.target.dataset.order;
          locations.splice(+order, 1);
          (0, _tourFormLogic.generateLocationsMarkup)(locations, e.target);
        };
        addUserBtn?.addEventListener(
          "click",
          (0, _tourFormLogic.handleAddUser)
        );
        window.deleteUser = function deleteUser(e) {
          const id = e.target.dataset.user;
          const element = e.target.closest(".form__user");
          element.remove();
          (0, _tourFormLogic.guides).splice(
            (0, _tourFormLogic.guides).indexOf(id),
            1
          );
        };
        photosFile?.addEventListener(
          "change",
          (0, _tourFormLogic.handlePhotosFile)
        );
        coverImage?.addEventListener(
          "change",
          (0, _tourFormLogic.handleCoverImage)
        );
        dateBtn?.addEventListener("click", (0, _tourFormLogic.handleAddDate));
        window.deleteDate = function deleteDate(e) {
          const date = e.target.dataset.date;
          const element = e.target.closest(".form__date");
          element.remove();
          (0, _tourFormLogic.dates).splice(
            (0, _tourFormLogic.guides).indexOf(date),
            1
          );
        };
        (0, _tourFormLogic.tourForm)?.addEventListener(
          "submit",
          (0, _tourFormLogic.handleTourSubmit)
        );
        deleteBtn?.forEach((btn) => {
          btn.addEventListener("click", (0, _tourFormLogic.handleDeleteTour));
        });
        // User Form
        const logout = document.querySelector("#logout");
        const userDeleteButton = document.querySelector(
          ".form__delete--delete-yourself"
        );
        (0, _userFormLogic.userImageFile)?.addEventListener(
          "change",
          (0, _userFormLogic.handleUserImage)
        );
        (0, _userFormLogic.form)?.addEventListener(
          "submit",
          (0, _userFormLogic.handleUserSubmit)
        );
        (0, _userFormLogic.updateForm)?.addEventListener(
          "submit",
          (0, _userFormLogic.handleUserSubmit)
        );
        logout?.addEventListener("click", (0, _userFormLogic.handleLogout));
        userDeleteButton?.addEventListener(
          "click",
          (0, _userFormLogic.handleDeleteUser)
        );
        // Map
        if (document.getElementById("map")) (0, _map.handleMap)();
        //Stripe Alert
        const stripeAlert = document.querySelector("body").dataset?.alert;
        if (stripeAlert) alert(stripeAlert);
      },
      {
        "./adminUsersForm": "acrFa",
        "./map": "GDuAq",
        "./reviewFormLogic": "dVpOn",
        "./tourFormLogic": "9ujYj",
        "./userFormLogic": "KPv2U",
        "./stripe": "10tSC",
      },
    ],
    acrFa: [
      function (require, module, exports) {
        // form message
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(
          exports,
          "handleAdminUsersSubmit",
          () => handleAdminUsersSubmit
        );
        parcelHelpers.export(
          exports,
          "handleAdminUsersDelete",
          () => handleAdminUsersDelete
        );
        var _messages = require("./messages");
        // Update or Delete User
        async function handleAsync(route, form, inputs) {
          try {
            const headers = inputs
              ? {
                  "Content-Type": "application/json",
                }
              : {};
            const body = inputs ? JSON.stringify(inputs) : "";
            const res = await fetch(`/api/v1/users/${route}`, {
              method: inputs ? "PATCH" : "DELETE",
              body,
              headers,
            });
            const data = await res.json();
            if (data.status === "fail" || data.status === "error")
              throw new Error(data.message);
            if (data.status === "success") {
              if (inputs)
                (0, _messages.formMessage)(
                  form,
                  ["success", "open"],
                  "Updated data successfully!!!",
                  false
                );
              else
                (0, _messages.formMessage)(
                  form,
                  ["success", "open"],
                  "Deleted data successfully!!!",
                  true
                );
            }
          } catch (err) {
            (0, _messages.formMessage)(form, ["open"], err.message, false);
          }
        }
        function handleAdminUsersSubmit(e) {
          e.preventDefault();
          const id = e.target.id.split("-")[1];
          const username = document.getElementById(`username-${id}`).value;
          const email = document.getElementById(`email-${id}`).value;
          const role = document.getElementById(`role-${id}`).value;
          if (role === "admin") {
            (0, _messages.formMessage)(
              e.target,
              ["open"],
              "Deleted this functionality because this is test environment :)",
              false
            );
            return;
          }
          const inputs = {
            name: username,
            email,
            role,
          };
          handleAsync(id, e.target, inputs);
        }
        function handleAdminUsersDelete(e) {
          const form = e.target.closest(".form--users");
          const id = form.id.split("-")[1];
          handleAsync(id, form);
        }
      },
      {
        "./messages": "he2u6",
        "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3",
      },
    ],
    he2u6: [
      function (require, module, exports) {
        // ------------------ Form Message -------------------
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, "formMessage", () => formMessage);
        function formMessage(formName, classNameList, msg, reload) {
          const timeout = classNameList.includes("success") ? 3000 : 5000;
          const formError = formName.querySelector(".form__error");
          formError.innerHTML = msg;
          formError.classList.add(...classNameList);
          window.setTimeout(() => {
            formError.innerHTML = "";
            formError.classList.remove(...classNameList);
            if (reload) location.reload(true);
          }, timeout);
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3" },
    ],
    gkKU3: [
      function (require, module, exports) {
        exports.interopDefault = function (a) {
          return a && a.__esModule
            ? a
            : {
                default: a,
              };
        };
        exports.defineInteropFlag = function (a) {
          Object.defineProperty(a, "__esModule", {
            value: true,
          });
        };
        exports.exportAll = function (source, dest) {
          Object.keys(source).forEach(function (key) {
            if (
              key === "default" ||
              key === "__esModule" ||
              Object.prototype.hasOwnProperty.call(dest, key)
            )
              return;
            Object.defineProperty(dest, key, {
              enumerable: true,
              get: function () {
                return source[key];
              },
            });
          });
          return dest;
        };
        exports.export = function (dest, destName, get) {
          Object.defineProperty(dest, destName, {
            enumerable: true,
            get: get,
          });
        };
      },
      {},
    ],
    GDuAq: [
      function (require, module, exports) {
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, "handleMap", () => handleMap);
        function handleMap() {
          const locations = JSON.parse(
            document.getElementById("map").dataset.locations
          );
          var map = L.map("map");
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
          const points = [];
          locations.forEach((loc) => {
            points.push([loc.coordinates[1], loc.coordinates[0]]);
            L.marker([loc.coordinates[1], loc.coordinates[0]])
              .addTo(map)
              .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
                autoClose: false,
              })
              .openPopup();
          });
          const bounds = L.latLngBounds(points).pad(0.5);
          map.fitBounds(bounds);
          map.scrollWheelZoom.disable();
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3" },
    ],
    dVpOn: [
      function (require, module, exports) {
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        // --------------------- Make Rate -------------------
        parcelHelpers.export(exports, "makeStartRate", () => makeStartRate);
        parcelHelpers.export(
          exports,
          "handleSubmitReview",
          () => handleSubmitReview
        );
        // ----------------- Delete Review ----------------------
        parcelHelpers.export(
          exports,
          "handleDeleteReview",
          () => handleDeleteReview
        );
        var _messages = require("./messages");
        function makeStartRate(buttons, rate) {
          buttons.forEach((el, i) => {
            const hrefAttribute = `/assets/icons.svg#icon-star${rate >= i + 1 ? "" : "-outlined"}`;
            el.querySelector("use").setAttribute("href", hrefAttribute);
          });
        }
        // ----------------- Create Review ----------------------
        async function handleAsyncReview(route, id, inputs, form) {
          const path =
            route === "review" || route === "delete"
              ? `/api/v1/reviews/${id}`
              : `/api/v1/tours/${id}/reviews`;
          let method;
          if (route === "review") method = "PATCH";
          if (route === "delete") method = "DELETE";
          if (route === "tour") method = "POST";
          const body = inputs ? JSON.stringify(inputs) : "";
          try {
            const res = await fetch(path, {
              method,
              body,
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            if (data.status === "fail" || data.status === "error")
              throw new Error(data.message);
            if (
              data.status === "success" &&
              (route === "review" || route === "tour")
            )
              (0, _messages.formMessage)(
                form,
                ["success", "open"],
                route === "review"
                  ? "Updated Review Successfully"
                  : "Created Review Successfully",
                true
              );
            if (data.status === "success" && route === "delete") {
              alert("Deleted successfully");
              window.setTimeout(() => {
                location.reload(true);
              }, 3000);
            }
          } catch (err) {
            if (err.message.includes("Duplicate"))
              err.message = "You can not create more than 1 review";
            if (form)
              (0, _messages.formMessage)(form, ["open"], err.message, false);
            else alert(err.message);
          }
        }
        function handleSubmitReview(e) {
          e.preventDefault();
          const id = e.target.id.split("-");
          const starRate = e.target.querySelectorAll(
            "use[href='/assets/icons.svg#icon-star']"
          ).length;
          const review = document.getElementById("review").value;
          const inputs = {
            rating: starRate,
            review,
          };
          handleAsyncReview(id[0], id[1], inputs, e.target);
        }
        function handleDeleteReview(e) {
          e.preventDefault();
          handleAsyncReview("delete", e.target.dataset.id);
        }
      },
      {
        "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3",
        "./messages": "he2u6",
      },
    ],
    "9ujYj": [
      function (require, module, exports) {
        // ---------------- Form Message -------------
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, "tourForm", () => tourForm);
        // -------------------Locations Funcionalities----------------------
        parcelHelpers.export(
          exports,
          "generateLocationsMarkup",
          () => generateLocationsMarkup
        );
        parcelHelpers.export(
          exports,
          "handleAddLocationsClick",
          () => handleAddLocationsClick
        );
        parcelHelpers.export(exports, "guides", () => guides);
        parcelHelpers.export(exports, "handleAddUser", () => handleAddUser);
        parcelHelpers.export(
          exports,
          "handlePhotosFile",
          () => handlePhotosFile
        );
        parcelHelpers.export(
          exports,
          "handleCoverImage",
          () => handleCoverImage
        );
        parcelHelpers.export(exports, "dates", () => dates);
        parcelHelpers.export(exports, "handleAddDate", () => handleAddDate);
        parcelHelpers.export(
          exports,
          "handleTourSubmit",
          () => handleTourSubmit
        );
        // Delete tour
        parcelHelpers.export(
          exports,
          "handleDeleteTour",
          () => handleDeleteTour
        );
        var _messages = require("./messages");
        const tourForm = document.querySelector(".form--tour");
        function generateLocationsMarkup(items, el) {
          let markup = ``;
          items.forEach((item, i) => {
            const uuid = Math.random().toString(36).substring(2, 4);
            markup += `
            <div class='form__group--location'>
            <div class='location-group'>
                <label for='description-${uuid}' class='form__label'>Description</label>
                <input type='text' class='form__input form__input--description' value='${item.description}' id='description-${uuid}'/>
            </div>
            <div class='location-group'>
                <label for='coordinates-${uuid}' class='form__label'>Coordinates</label>
                <input type='text' class='form__input form__input--coordinates' value='${item.coordinates}' id='coordinates-${uuid}'/>
            </div>
            <div class='location-group'>
                <label for='day-${uuid}' class='form__label'>Day</label>
                <input type='text' class='form__input form__input--day' value='${item.day}' id='day-${uuid}'/>
            </div>
            <button type='button' class='form__delete form__delete--location' onclick="deleteLocationItem(event)" data-locations='${JSON.stringify(items)}' data-order='${i}'>Delete</button>
            </div>
        `;
          });
          const parentElement = el.closest(".form__group--locations");
          parentElement.innerHTML = "";
          parentElement.insertAdjacentHTML("beforeend", markup);
        }
        function handleAddLocationsClick(e) {
          e.preventDefault();
          const uuid = Math.random().toString(36).substring(2, 4);
          const markup = `
    <div class='form__group--location'>
    <div class='location-group'>
        <label for='description-${uuid}' class='form__label'>Description</label>
        <input type='text' class='form__input form__input--description' id='description-${uuid}' placeholder='Batman'/>
    </div>
    <div class='location-group'>
        <label for='coordinates-${uuid}' class='form__label'>Coordinates</label>
        <input type='text' class='form__input form__input--coordinates' placeholder='32,42' id='coordinates-${uuid}'/>
    </div>
    <div class='location-group'>
        <label for='day-${uuid}' class='form__label'>Day</label>
        <input type='text' class='form__input form__input--day' placeholder='5' id='day-${uuid}'/>
    </div>
    </div>
    `;
          const parentElement = e.target
            .closest(".form__group")
            .querySelector(".form__group--locations");
          parentElement.insertAdjacentHTML("beforeend", markup);
        }
        function locationInputs(className) {
          return Array.from(document.querySelectorAll(`.${className}`))
            .map((el) => el.value)
            .filter((el) => el !== "");
        }
        let guides = [];
        const selectUsers = document.getElementById("users");
        const usersContainer = document.querySelector(".form__users");
        Array.from(document.querySelectorAll(`.form__delete--user`))?.map(
          (el) => guides.push(JSON.parse(el.dataset.user))
        );
        function handleAddUser() {
          const value = selectUsers.value.split("-");
          if (guides.includes(value[0])) return;
          const markup = `
    <div class='form__user'>
       <span>${value[1]}</span>
       <span>${value[2]}</span>
        <button class='form__delete form__delete--user' type='button' onclick="deleteUser(event)" data-user=${value[0]}>Delete</button>
    </div>
  `;
          usersContainer.insertAdjacentHTML("beforeend", markup);
          guides.push(value[0]);
        }
        // --------------- Show Images ---------------
        const photosContainer = document.querySelector(".form__images");
        const coverImageContainer =
          document.querySelector(".form__cover-image");
        function handlePhotosFile() {
          if (
            Object.keys(photosFile.files).length < 4 ||
            Object.keys(photosFile.files).length > 4
          ) {
            (0, _messages.formMessage)(
              form,
              ["open"],
              "Please specify 4 images",
              false
            );
            return;
          }
          photosContainer.innerHTML = "";
          Object.values(photosFile.files).forEach((el) => {
            let reader = new FileReader();
            reader.onload = function (e) {
              const markup = `
        <img src="${e.target.result}"/>
      `;
              photosContainer.insertAdjacentHTML("beforeend", markup);
            };
            reader.readAsDataURL(el);
          });
        }
        function handleCoverImage() {
          coverImageContainer.innerHTML = "";
          const file = coverImage.files[0];
          let reader = new FileReader();
          reader.onload = function (e) {
            const markup = `
        <img src="${e.target.result}"/>
      `;
            coverImageContainer.insertAdjacentHTML("beforeend", markup);
          };
          reader.readAsDataURL(file);
        }
        // ---------------- Date -----------
        const dateInput = document.querySelector(".form__input--date");
        const datesContainer = document.querySelector(
          ".form__group--dates-container "
        );
        let dates = [];
        Array.from(document.querySelectorAll(`.form__delete--date`))?.map(
          (el) => dates.push(JSON.parse(el.dataset.date))
        );
        function handleAddDate() {
          if (!dateInput.value) return;
          const value = new Date(dateInput.value);
          const isoDateValue = value.toISOString();
          if (dates.includes(isoDateValue)) return;
          const markup = `
  <div class='form__date'>
     <span>${value.toLocaleDateString("en-US")}</span>
      <button class='form__delete form__delete--date' type='button' onclick="deleteDate(event)" data-date=${isoDateValue}>Delete</button>
  </div>
`;
          datesContainer.insertAdjacentHTML("beforeend", markup);
          dates.push(isoDateValue);
        }
        // Check location coordinates
        function checkLocationCoordinates(...inputs) {
          return inputs.length !== 2 || inputs.every((inp) => isFinite(inp));
        }
        // ------------------ Send Request -----------
        async function handleAsync(route, inputs, method) {
          try {
            const res = await fetch(`/api/v1/tours/${route}`, {
              method: method,
              body: inputs,
            });
            const data = await res.json();
            if (data.status === "fail" || data.status === "error")
              throw new Error(data.message);
            if (data.status === "success") {
              (0, _messages.formMessage)(
                tourForm,
                ["success", "open"],
                "Updated data successfully!!!",
                false
              );
              window.setTimeout(() => {
                location.assign("/account/admin-tours");
              }, 6000);
            }
          } catch (err) {
            (0, _messages.formMessage)(tourForm, ["open"], err.message, false);
          }
        }
        function handleTourSubmit(e) {
          e.preventDefault();
          // Locations
          const descriptions = locationInputs("form__input--description");
          const coordinates = locationInputs("form__input--coordinates");
          const days = locationInputs("form__input--day");
          if (
            descriptions.length !== coordinates.length ||
            descriptions.length !== days.length ||
            coordinates.length !== days.length
          ) {
            (0, _messages.formMessage)(
              tourForm,
              ["open"],
              "Please specify location values correctly!!!",
              false
            );
            return;
          }
          // Check Location coordinates
          coordinates.forEach((coord) => {
            if (!checkLocationCoordinates(coord)) {
              (0, _messages.formMessage)(
                tourForm,
                ["open"],
                "Please specify location coordinates correctly!!!",
                false
              );
              return;
            }
          });
          const locationsArray = descriptions.map((item, i) => {
            return {
              type: "Point",
              description: item,
              coordinates: [
                +coordinates[i].split(",")[0],
                +coordinates[i].split(",")[1],
              ],
              day: days[i],
            };
          });
          // Start Location
          const startDescription =
            document.getElementById("startDescription").value;
          const startAddress = document.getElementById("startAddress").value;
          const startCoordinates =
            document.getElementById("startCoordinates").value;
          // Check start location values
          if (!startAddress || !startDescription || !startCoordinates) {
            (0, _messages.formMessage)(
              tourForm,
              ["open"],
              "Please specify startlocation values correctly!!!",
              false
            );
            return;
          }
          // Start Location coordinates check
          if (!checkLocationCoordinates(startCoordinates.split(","))) {
            (0, _messages.formMessage)(
              tourForm,
              ["open"],
              "Please specify startLocation coordinates like placeholder!!!",
              false
            );
            return;
          }
          const startLocation = {
            type: "Point",
            description: startDescription,
            address: startAddress,
            coordinates: startCoordinates
              ? [
                  +startCoordinates.split(",")[0],
                  +startCoordinates.split(",")[1],
                ]
              : [],
          };
          // Other Inputs
          const name = document.getElementById("name").value;
          const duration = document.getElementById("duration").value;
          const maxGroupSize = document.getElementById("maxGroupSize").value;
          const difficulty = document.getElementById("difficulty").value;
          const price = document.getElementById("price").value;
          const summary = document.getElementById("summary").value;
          const description = document.getElementById("description").value;
          const coverImage1 = document.getElementById("cover").files[0];
          // Check duration === day locations total
          if (days.reduce((acc, el) => acc + Number(el), 0) !== +duration) {
            (0, _messages.formMessage)(
              tourForm,
              ["open"],
              "Duration and total locations day must be equal",
              false
            );
            return;
          }
          // Create Form Data
          const inputs = new FormData();
          if (name) inputs.append("name", name);
          if (
            startLocation.address &&
            startLocation.description &&
            startLocation.coordinates
          )
            inputs.append("startLocation", JSON.stringify(startLocation));
          if (duration) inputs.append("duration", duration);
          if (maxGroupSize) inputs.append("maxGroupSize", maxGroupSize);
          if (difficulty) inputs.append("difficulty", difficulty);
          if (price) inputs.append("price", price);
          if (description) inputs.append("description", description);
          if (summary) inputs.append("summary", summary);
          if (coverImage1) inputs.append("imageCover", coverImage1);
          if (locationsArray.length > 0)
            inputs.append("locations", JSON.stringify(locationsArray));
          if (guides.length > 0)
            inputs.append("guides", JSON.stringify(guides));
          dates.forEach((el) => {
            inputs.append("startDates", el);
          });
          Object.values(document.getElementById("photos").files).forEach(
            (el) => {
              inputs.append("images", el);
            }
          );
          if (e.target.id === "create tour")
            // Create Tour
            handleAsync("", inputs, "POST");
          // Update Tour
          else handleAsync(e.target.dataset.id, inputs, "PATCH");
        }
        async function handleDeleteTour(e) {
          e.preventDefault();
          const tourId = e.target.dataset.id;
          try {
            const res = await fetch(`/api/v1/tours/${tourId}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data.status === "fail" || data.status === "error")
              throw new Error(data.message);
            if (data.status === "success") {
              alert("Successfully delete tour");
              window.setTimeout(() => {
                location.assign("/account/admin-tours");
              }, 6000);
            }
          } catch (err) {
            alert(err.message);
          }
        }
      },
      {
        "./messages": "he2u6",
        "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3",
      },
    ],
    KPv2U: [
      function (require, module, exports) {
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, "form", () => form);
        parcelHelpers.export(exports, "updateForm", () => updateForm);
        parcelHelpers.export(exports, "userImageFile", () => userImageFile);
        parcelHelpers.export(exports, "handleUserImage", () => handleUserImage);
        parcelHelpers.export(
          exports,
          "handleUserSubmit",
          () => handleUserSubmit
        );
        // Logout Functionality
        parcelHelpers.export(exports, "handleLogout", () => handleLogout);
        parcelHelpers.export(
          exports,
          "handleDeleteUser",
          () => handleDeleteUser
        );
        const form = document.querySelector(".form");
        const updateForm = document.querySelector(".form--user-settings");
        const userImageFile = document.getElementById("photo");
        // Show Image
        const userImage = document.querySelector(
          ".form__label--user-photo img"
        );
        function handleUserImage() {
          const file = userImageFile.files[0];
          let reader = new FileReader();
          reader.onload = function (e) {
            userImage.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
        // Send Form Message
        function formMessage(formName, classNameList, msg, reload) {
          const formError = formName.querySelector(".form__error");
          formError.innerHTML = msg;
          formError.classList.add(...classNameList);
          window.setTimeout(() => {
            formError.innerHTML = "";
            formError.classList.remove(...classNameList);
            if (reload) location.reload(true);
          }, 5000);
        }
        async function handleAsync(route, inputs) {
          try {
            // if profile image exists don't send headers
            const headers =
              route !== "update-me"
                ? {
                    "Content-Type": "application/json",
                  }
                : {};
            const res = await fetch(`/api/v1/users/${route}`, {
              method: route.includes("update") ? "PATCH" : "POST",
              body: route === "update-me" ? inputs : JSON.stringify(inputs),
              headers,
            });
            const data = await res.json();
            // if error
            if (data.status === "fail" || data.status === "error")
              throw new Error(data.message);
            if (data.status === "success") {
              // if success and update profile info
              if (route === "update-me")
                formMessage(
                  updateForm,
                  ["success", "open"],
                  "Updated data successfully!!!",
                  true
                );
              else if (route === "update-password")
                formMessage(
                  form,
                  ["success", "open"],
                  "Updated password successfully!!!",
                  true
                );
              else if (route === "forgotPassword")
                formMessage(
                  form,
                  ["success", "open"],
                  "We sent reset password link to your email,Check your email box!!!",
                  true
                );
              else if (route.includes("resetPassword")) {
                formMessage(
                  form,
                  ["success", "open"],
                  "Changed Password Successfully",
                  false
                );
                window.setTimeout(() => {
                  location.assign("/");
                }, 6000);
              } else location.assign("/");
            }
          } catch (err) {
            // if err and update profile info
            if (route === "update-me")
              formMessage(updateForm, ["open"], err.message, false);
            else formMessage(form, ["open"], err.message, false);
          }
        }
        function handleUserSubmit(e) {
          e.preventDefault();
          let inputs = {};
          // if signup or login add email and password
          if (e.target.id === "signup" || e.target.id === "login")
            inputs = {
              email: document.getElementById("email").value,
              password: document.getElementById("password").value,
            };
          // if signup add name and passwordConfirm values
          if (e.target.id === "signup") {
            inputs.name = document.getElementById("username").value;
            inputs.passwordConfirm =
              document.getElementById("passwordConfirm").value;
            handleAsync("signup", inputs);
          } else if (e.target.id === "login") handleAsync("login", inputs);
          else if (e.target.id === "changeSettings") {
            inputs = new FormData();
            inputs.append("name", document.getElementById("name").value);
            inputs.append("email", document.getElementById("email").value);
            inputs.append("photo", document.getElementById("photo").files[0]);
            handleAsync("update-me", inputs);
          } else if (e.target.id === "changePassword") {
            inputs = {
              currentPassword: document.getElementById("oldPassword").value,
              password: document.getElementById("newPassword").value,
              passwordConfirm: document.getElementById("newPassword confirm")
                .value,
            };
            handleAsync("update-password", inputs);
          } else if (e.target.id === "forgot")
            handleAsync("forgotPassword", {
              email: document.getElementById("email").value,
            });
          else if (e.target.id === "reset") {
            inputs = {
              password: document.getElementById("password").value,
              passwordConfirm: document.getElementById("passwordConfirm").value,
            };
            const token = window.location.pathname.split("/")[3];
            handleAsync(`resetPassword/${token}`, inputs);
          }
        }
        async function handleLogout(e) {
          try {
            const res = await fetch(`/api/v1/users/logout`);
            const data = await res.json();
            if (data.status === "success") location.assign("/");
          } catch (err) {
            alert(err.message);
          }
        }
        async function handleDeleteUser() {
          try {
            const res = await fetch(`/api/v1/users/delete-me`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data.status === "success") location.assign("/login");
          } catch (err) {
            alert(err.message);
          }
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3" },
    ],
    "10tSC": [
      function (require, module, exports) {
        var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, "bookingTour", () => bookingTour);
        const stripe = Stripe(
          "pk_test_51PGkLyRrGUrKgUKb3gNBWstBMDxauNYZrGosYFKQzPMnK9ROSfDhZ27fytSijOnZTernd7TJm5n6hFyS2NmOjR7700Rj267gnP"
        );
        async function bookingTour(tourId, el) {
          try {
            const res = await fetch(
              `/api/v1/bookings/checkout-session/${tourId}`
            );
            const session = await res.json();
            el.innerHTML = "...Processing";
            await stripe.redirectToCheckout({
              sessionId: session.session.id,
            });
          } catch (err) {
            console.err(err);
            alert(err.message);
          }
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "gkKU3" },
    ],
  },
  ["kx4kz", "f2QDv"],
  "f2QDv",
  "parcelRequire11c7"
);

//# sourceMappingURL=index.js.map
