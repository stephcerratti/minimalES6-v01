/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "024baa4dbda5fc391e27"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default(); /**\n                                * Created by Edward_J_Apostol on 2016-08-29.\n                                */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.\n\n\n/* all the code that could be written here has\nbeen encapsulated (moved) into an 'App' class. the 'App' class\nis the application (i.e. your web site, the shopping cart project)\nitself. This is done for organization and cleanliness in code.\nSo now you only see two lines here in index.js\n *///# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBY0E7Ozs7OztBQUVBLElBQUlBLE1BQU0sbUJBQVYsQyxDQWhCQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNi0wOC0yOS5cbiAqL1xuLy8gdGhpcyBpcyB3aGVyZSB0aGUgXCJtYWluXCIgc2VjdGlvbiBvZiB5b3VyIGFwcCBiZWdpbnMuXG4vLyBpdHMgbGlrZSBhIGxhdW5jaCBwYWQsIHdoZXJlIHlvdSBicmluZyBhbGwgeW91ciBvdGhlciBjbGFzc2VzXG4vLyB0b2dldGhlciBmb3IgdXNlLlxuXG5cbi8qIGFsbCB0aGUgY29kZSB0aGF0IGNvdWxkIGJlIHdyaXR0ZW4gaGVyZSBoYXNcbmJlZW4gZW5jYXBzdWxhdGVkIChtb3ZlZCkgaW50byBhbiAnQXBwJyBjbGFzcy4gdGhlICdBcHAnIGNsYXNzXG5pcyB0aGUgYXBwbGljYXRpb24gKGkuZS4geW91ciB3ZWIgc2l0ZSwgdGhlIHNob3BwaW5nIGNhcnQgcHJvamVjdClcbml0c2VsZi4gVGhpcyBpcyBkb25lIGZvciBvcmdhbml6YXRpb24gYW5kIGNsZWFubGluZXNzIGluIGNvZGUuXG5TbyBub3cgeW91IG9ubHkgc2VlIHR3byBsaW5lcyBoZXJlIGluIGluZGV4LmpzXG4gKi9cbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuXG5cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n//the application needs some other files to work: webservice to get some data, catalog view to\n//see the products, and a shopping cart to manage the items/products. \n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _ShoppingCartView = __webpack_require__(5);\n\nvar _ShoppingCartView2 = _interopRequireDefault(_ShoppingCartView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n\n    //the constructor function ALWAYS EXISTS- usually calls on the init function that contains\n    //all the steps to perform the task.\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        this.shoppingCartView = new _ShoppingCartView2.default();\n        // this.\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n        this.initShoppingCart();\n        // this.initShoppingCartView();\n    }\n\n    //in this init function\n\n\n    _createClass(App, [{\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            //this app's bestbuywebservice is an instance of the BestBuy Web Service\n            //go to bestbuywebservice and run all its properties and functions\n            this.bbws = new _BestBuyWebService2.default();\n            //this app's webservice's api key is:\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            //this app's webservice's url to obtain the product data is:\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            //passing the webservice to receive the data, which it grabs and then returns it to\n            //this app. \n            //this bestbuy webservice is receiving the\n            //the bestbuy webservice needs to know about THIS app- it needs the products data and\n            //the products.  Those properties need to be filled with values.\n            this.bbws.getData(this);\n            //when we run getData, we are passing the app.js to BestBuyWebservice to populate the\n            //list of products in the app. \n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            //if there is actually product data, then this (theApp)\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                //pass the products to the carousel\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }, {\n        key: 'initShoppingCart',\n        value: function initShoppingCart() {\n            $(document).on('click', '.cart', this, function (event) {\n                console.log(event.data);\n                var theApp = event.data;\n                theApp.shoppingCartView.showCartPopup(theApp.products);\n                $(\".cartView\").fadeIn();\n            });\n            $(document).on('click', '.close', this, function (event) {\n                $(\".cartView\").fadeOut();\n            });\n        }\n    }]);\n\n    return App;\n}();\n\n// event.data.theApp.ShoppingCart\n// $(\"#div2\").fadeIn(\"slow\");\n// $(\"#div3\").fadeIn(3000);\n\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0Iiwic2hvcHBpbmdDYXJ0VmlldyIsImluaXRCZXN0QnV5V2ViU2VydmljZSIsImluaXRTaG9wcGluZ0NhcnQiLCJiYndzIiwiYXBpS2V5IiwidXJsIiwiZ2V0RGF0YSIsImdldFByb2R1Y3RzIiwic2hvd0NhdGFsb2ciLCJhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwiLCIkIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJ0aGVBcHAiLCJzaG93Q2FydFBvcHVwIiwiZmFkZUluIiwiZmFkZU91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7OztBQUlDO0FBQ0E7O0FBRUQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBR3FCQSxHOztBQUVqQjtBQUNBO0FBQ0EsbUJBQWE7QUFBQTs7QUFDVCxhQUFLQyxXQUFMLEdBQW1CLElBQW5CLENBRFMsQ0FDZ0I7QUFDekIsYUFBS0MsUUFBTCxHQUFnQixJQUFoQixDQUZTLENBRWE7QUFDdEIsYUFBS0MsV0FBTCxHQUFtQiwyQkFBbkIsQ0FIUyxDQUc2QjtBQUN0QyxhQUFLQyxZQUFMLEdBQW9CLDRCQUFwQjtBQUNBLGFBQUtDLGdCQUFMLEdBQXdCLGdDQUF4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUtDLHFCQUFMO0FBQ0EsYUFBS0MsZ0JBQUw7QUFDQTtBQUNIOztBQUVEOzs7OztnREFDdUI7QUFDbkI7QUFDQTtBQUNBLGlCQUFLQyxJQUFMLEdBQVksaUNBQVo7QUFDQTtBQUNBO0FBQ0EsaUJBQUtBLElBQUwsQ0FBVUMsTUFBVixHQUFtQiwwQkFBbkI7O0FBRUE7QUFDQTtBQUNBLGlCQUFLRCxJQUFMLENBQVVFLEdBQVYsbUZBQThGLEtBQUtGLElBQUwsQ0FBVUMsTUFBeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUcsT0FBVixDQUFrQixJQUFsQjtBQUNBO0FBQ0E7QUFFSDs7O3NDQUVZO0FBQ1Q7QUFDQTs7QUFFQTtBQUNRLGdCQUFHLEtBQUtWLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDOUI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtNLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUVIOztBQUVELGlCQUFLQyxXQUFMO0FBQ1A7OztzQ0FDaUI7O0FBRVY7QUFDQSxnQkFBSSxLQUFLWixXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzFCO0FBQ0EscUJBQUtFLFdBQUwsQ0FBaUJXLHFCQUFqQixDQUF1QyxLQUFLWixRQUE1QyxFQUFxRCxJQUFyRDtBQUNBO0FBQ0g7QUFDSjs7OzJDQUVrQjtBQUNmYSxjQUFFQyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLFVBQVNDLEtBQVQsRUFBZTtBQUNsREMsd0JBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEI7QUFDQSxvQkFBSUMsU0FBU0osTUFBTUcsSUFBbkI7QUFDQUMsdUJBQU9qQixnQkFBUCxDQUF3QmtCLGFBQXhCLENBQXNDRCxPQUFPcEIsUUFBN0M7QUFDQWEsa0JBQUUsV0FBRixFQUFlUyxNQUFmO0FBQ0gsYUFMRDtBQU1DVCxjQUFFQyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFFBQXhCLEVBQWtDLElBQWxDLEVBQXdDLFVBQVNDLEtBQVQsRUFBZTtBQUNwREgsa0JBQUUsV0FBRixFQUFlVSxPQUFmO0FBQ0gsYUFGQTtBQUdKOzs7Ozs7QUFHSjtBQUNXO0FBQ0E7OztrQkFsRlN6QixHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI4LlxuICovXG5cbiAvL3RoZSBhcHBsaWNhdGlvbiBuZWVkcyBzb21lIG90aGVyIGZpbGVzIHRvIHdvcms6IHdlYnNlcnZpY2UgdG8gZ2V0IHNvbWUgZGF0YSwgY2F0YWxvZyB2aWV3IHRvXG4gLy9zZWUgdGhlIHByb2R1Y3RzLCBhbmQgYSBzaG9wcGluZyBjYXJ0IHRvIG1hbmFnZSB0aGUgaXRlbXMvcHJvZHVjdHMuIFxuXG5pbXBvcnQgQmVzdEJ1eVdlYlNlcnZpY2UgZnJvbSAnLi9CZXN0QnV5V2ViU2VydmljZSc7XG5pbXBvcnQgQ2F0YWxvZ1ZpZXcgZnJvbSAnLi9DYXRhbG9nVmlldyc7XG5pbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4vU2hvcHBpbmdDYXJ0JztcbmltcG9ydCBTaG9wcGluZ0NhcnRWaWV3IGZyb20gJy4vU2hvcHBpbmdDYXJ0Vmlldyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcblxuICAgIC8vdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIEFMV0FZUyBFWElTVFMtIHVzdWFsbHkgY2FsbHMgb24gdGhlIGluaXQgZnVuY3Rpb24gdGhhdCBjb250YWluc1xuICAgIC8vYWxsIHRoZSBzdGVwcyB0byBwZXJmb3JtIHRoZSB0YXNrLlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsOyAvLyB0aGlzIHdpbGwgc3RvcmUgYWxsIG91ciBkYXRhXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsOyAvLyBzdG9yZXMgc3BlY2lmaWNhbGx5IHRoZSBwcm9kdWN0c1xuICAgICAgICB0aGlzLmNhdGFsb2dWaWV3ID0gbmV3IENhdGFsb2dWaWV3KCk7IC8vIHRoaXMgd2lsbCBkaXNwbGF5IG91ciBkYXRhXG4gICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB0aGlzLnNob3BwaW5nQ2FydFZpZXcgPSBuZXcgU2hvcHBpbmdDYXJ0VmlldygpO1xuICAgICAgICAvLyB0aGlzLlxuICAgICAgICAvLyBjYWxsIHRoZSBpbml0QmVzdEJ1eVdlYlNlcnZpY2UgdG8gaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgLy8gQmVzdEJ1eSBXZWIgU2VydmljZSBhbmQgcmV0dXJuIHRoZSBkYXRhXG4gICAgICAgIHRoaXMuaW5pdEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIHRoaXMuaW5pdFNob3BwaW5nQ2FydCgpO1xuICAgICAgICAvLyB0aGlzLmluaXRTaG9wcGluZ0NhcnRWaWV3KCk7XG4gICAgfVxuXG4gICAgLy9pbiB0aGlzIGluaXQgZnVuY3Rpb25cbiAgICBpbml0QmVzdEJ1eVdlYlNlcnZpY2UoKXtcbiAgICAgICAgLy90aGlzIGFwcCdzIGJlc3RidXl3ZWJzZXJ2aWNlIGlzIGFuIGluc3RhbmNlIG9mIHRoZSBCZXN0QnV5IFdlYiBTZXJ2aWNlXG4gICAgICAgIC8vZ28gdG8gYmVzdGJ1eXdlYnNlcnZpY2UgYW5kIHJ1biBhbGwgaXRzIHByb3BlcnRpZXMgYW5kIGZ1bmN0aW9uc1xuICAgICAgICB0aGlzLmJid3MgPSBuZXcgQmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICAgICAgLy90aGlzIGFwcCdzIHdlYnNlcnZpY2UncyBhcGkga2V5IGlzOlxuICAgICAgICAvLyB1c2UgeW91ciBvd24gQVBJIGtleSBmb3IgdGhpcyAodGhlIG9uZSBmcm9tIENvZHkpXG4gICAgICAgIHRoaXMuYmJ3cy5hcGlLZXkgPSBcIjhjY2RkZjRydGp6NWs1YnRxYW04NHFha1wiO1xuXG4gICAgICAgIC8vdGhpcyBhcHAncyB3ZWJzZXJ2aWNlJ3MgdXJsIHRvIG9idGFpbiB0aGUgcHJvZHVjdCBkYXRhIGlzOlxuICAgICAgICAvLyB0aGlzIHVzZXMgJ2JhY2t0aWNrcycgZm9yIGxvbmcgbXVsdGktbGluZSBzdHJpbmdzXG4gICAgICAgIHRoaXMuYmJ3cy51cmwgPSBgaHR0cHM6Ly9hcGkuYmVzdGJ1eS5jb20vdjEvcHJvZHVjdHMoKGNhdGVnb3J5UGF0aC5pZD1hYmNhdDA1MDIwMDApKT9hcGlLZXk9JHt0aGlzLmJid3MuYXBpS2V5fSZmb3JtYXQ9anNvbmA7XG5cbiAgICAgICAgLy8gcGFzcyB0aGUgcmVmZXJlbmNlIHRvIHRoaXMgYXBwIHRvIHN0b3JlIHRoZSBkYXRhXG4gICAgICAgIC8vcGFzc2luZyB0aGUgd2Vic2VydmljZSB0byByZWNlaXZlIHRoZSBkYXRhLCB3aGljaCBpdCBncmFicyBhbmQgdGhlbiByZXR1cm5zIGl0IHRvXG4gICAgICAgIC8vdGhpcyBhcHAuIFxuICAgICAgICAvL3RoaXMgYmVzdGJ1eSB3ZWJzZXJ2aWNlIGlzIHJlY2VpdmluZyB0aGVcbiAgICAgICAgLy90aGUgYmVzdGJ1eSB3ZWJzZXJ2aWNlIG5lZWRzIHRvIGtub3cgYWJvdXQgVEhJUyBhcHAtIGl0IG5lZWRzIHRoZSBwcm9kdWN0cyBkYXRhIGFuZFxuICAgICAgICAvL3RoZSBwcm9kdWN0cy4gIFRob3NlIHByb3BlcnRpZXMgbmVlZCB0byBiZSBmaWxsZWQgd2l0aCB2YWx1ZXMuXG4gICAgICAgIHRoaXMuYmJ3cy5nZXREYXRhKHRoaXMpO1xuICAgICAgICAvL3doZW4gd2UgcnVuIGdldERhdGEsIHdlIGFyZSBwYXNzaW5nIHRoZSBhcHAuanMgdG8gQmVzdEJ1eVdlYnNlcnZpY2UgdG8gcG9wdWxhdGUgdGhlXG4gICAgICAgIC8vbGlzdCBvZiBwcm9kdWN0cyBpbiB0aGUgYXBwLiBcblxuICAgIH1cblxuICAgIHByZXBDYXRhbG9nKCl7XG4gICAgICAgIC8vIHVzZSB0aGlzIGNvbnNvbGUubG9nIHRvIHRlc3QgdGhlIGRhdGFcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9kdWN0RGF0YSk7XG5cbiAgICAgICAgLy9pZiB0aGVyZSBpcyBhY3R1YWxseSBwcm9kdWN0IGRhdGEsIHRoZW4gdGhpcyAodGhlQXBwKVxuICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvZHVjdERhdGEhPW51bGwpe1xuICAgICAgICAgICAgLy8gb25seSBnZXQgdGhlIHByb2R1Y3RzIHByb3BlcnR5IChmb3Igbm93KVxuICAgICAgICAgICAgLy8gdGhpcyBjb2RlIHdhcyBjb3BpZWQgZnJvbSBTaW1wbGVIVFRQUmVxdWVzdC5odG1sXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5iYndzLmdldFByb2R1Y3RzKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd0NhdGFsb2coKTtcbn1cbiAgICBzaG93Q2F0YWxvZygpIHtcblxuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2F0YWxvZyBvbmx5IGlmIHRoZXJlIGFyZSBwcm9kdWN0c1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL3Bhc3MgdGhlIHByb2R1Y3RzIHRvIHRoZSBjYXJvdXNlbFxuICAgICAgICAgICAgdGhpcy5jYXRhbG9nVmlldy5hZGRQcm9kdWN0c1RvQ2Fyb3VzZWwodGhpcy5wcm9kdWN0cyx0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2F0YWxvZ1ZpZXcuc2hvd0NhdGFsb2coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRTaG9wcGluZ0NhcnQoKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2FydCcsIHRoaXMsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgbGV0IHRoZUFwcCA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0Vmlldy5zaG93Q2FydFBvcHVwKHRoZUFwcC5wcm9kdWN0cyk7XG4gICAgICAgICAgICAkKFwiLmNhcnRWaWV3XCIpLmZhZGVJbigpOyAgICAgXG4gICAgICAgIH0pXG4gICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlJywgdGhpcywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgJChcIi5jYXJ0Vmlld1wiKS5mYWRlT3V0KCk7XG4gICAgICAgIH0pOyBcbiAgICB9XG59XG5cbiAvLyBldmVudC5kYXRhLnRoZUFwcC5TaG9wcGluZ0NhcnRcbiAgICAgICAgICAgIC8vICQoXCIjZGl2MlwiKS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAgICAgLy8gJChcIiNkaXYzXCIpLmZhZGVJbigzMDAwKTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            //serviceChannel is the connection between our site and BestBuy\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            //listen to when the state changes in the serviceChannel\n            //we are passing theApp to the resultsPreprocessor function (which happens when the\n            //event occurs)\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            //we need to open the serviceChannel to get the data from BestBuy (the URL), \"GET\" is what will grab\n            //the data. \"Ture\" = the browser will continue to do things while it waits for the data.\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n\n        //resultsPreprocessor is the \"middle-man\" in this scenario \n\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            // let thisService = this BestBuywebservice file\n            var thisService = this; // a reference to the instance created from this class\n            //\n            var eventHandler = function eventHandler(evt) {\n                //we can't just write \"this\" to call on the bestbuywebservice file, since\n                //we would be calling it within a funciton, so it would only exist within this\n                //function. Therefore, we use thisServie, which we declared as the entire\n                //BestBuywebservice above. \n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n\n                //bestbuywebservce has the product data, and it matches the event target, so we are\n                //assigning it/storing it\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n\n                //now the app has a copy of the bestbuy api data as well; we assigned it below:\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n\n                //below we are telling theApp file to prepare the catalog\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                //if there is product data, then PARSE the data (convert to array of objects)\n                var jsonData = JSON.parse(this.productData);\n\n                //gets another copy of the data, which is explicity the PRODUCTS (not all the other\n                //data)\n                this.products = jsonData.products;\n\n                //return just the PRODUCTS, which gets stored in the products property of the app.\n                return this.products;\n            }\n            //return the data to theApp.\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQztBQUNBO0FBQ0E7QUFDREssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQTtBQUNBO0FBQ0FDLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCVCxHQUExQixFQUE4QixJQUE5QjtBQUNBSywyQkFBZUssSUFBZjtBQUNIOztBQUVEOzs7OzRDQUNvQk4sTSxFQUFPO0FBQ3ZCOztBQUVBO0FBQ0EsZ0JBQUlPLGNBQWMsSUFBbEIsQ0FKdUIsQ0FJQztBQUN4QjtBQUNBLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FGLDRCQUFZRyxPQUFaLENBQW9CRCxHQUFwQixFQUF3QlQsTUFBeEI7QUFDSCxhQU5EO0FBT0EsbUJBQU9RLFlBQVA7QUFDSDs7O2dDQUVPQyxHLEVBQUlULE0sRUFBTzs7QUFFZixnQkFBSVMsSUFBSUUsTUFBSixDQUFXQyxVQUFYLElBQXlCLENBQXpCLElBQThCSCxJQUFJRSxNQUFKLENBQVdFLE1BQVgsSUFBcUIsR0FBdkQsRUFBMkQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLHFCQUFLZixXQUFMLEdBQW1CVyxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9GLFdBQVAsR0FBcUJXLElBQUlFLE1BQUosQ0FBV0csWUFBaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9lLFdBQVA7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1Q7QUFDQTtBQUNBLGdCQUFHLEtBQUtqQixXQUFMLElBQWtCLElBQXJCLEVBQTBCO0FBQ3RCO0FBQ0Qsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7O0FBRUE7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCaUIsU0FBU2pCLFFBQXpCOztBQUVBO0FBQ0EsdUJBQU8sS0FBS0EsUUFBWjtBQUNGO0FBQ0Q7QUFDQSxtQkFmUyxDQWVEO0FBQ1g7Ozs7OztrQkEvRmdCSixpQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZXN0QnV5V2ViU2VydmljZXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudXJsID1cIlwiO1xuICAgICAgICB0aGlzLmFwaUtleSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldERhdGEodGhlQXBwKXtcbiAgICAgICAgLy8gdGhlQXBwIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYWluIGFwcFxuICAgICAgICAvLyB3ZSBjYW4gcGFzcyBpbmZvcm1hdGlvbiB0byBpdCwgaW5jbHVkaW5nIGRhdGFcbiAgICAgICAgLy8gdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoaXMgc2VydmljZVxuXG4gICAgICAgIC8vc2VydmljZUNoYW5uZWwgaXMgdGhlIGNvbm5lY3Rpb24gYmV0d2VlbiBvdXIgc2l0ZSBhbmQgQmVzdEJ1eVxuXG4gICAgICAgIGxldCBzZXJ2aWNlQ2hhbm5lbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy51cmw7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy8gKioqIFRvIHNvbHZlIHRoZSBpc3N1ZSBvZiBwYXNzaW5nIHRoZSBkYXRhIGJhY2sgdG8gdGhlIG1haW4gYXBwLi4uXG4gICAgICAgIC8vICoqKiBhbmQgZXZlbnR1YWxseSwgdG8gY2F0YWxvZ1ZpZXdcbiAgICAgICAgLy8gKioqIFlvdSBjb3VsZCB0aGUgYWRkRXZlbnRMaXN0ZW5lciB0byBjYWxsXG4gICAgICAgIC8vICoqKiBhIGRpZmZlcmVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGhhdmUgYm90aFxuICAgICAgICAvLyAqKiogdGhlIGV2ZW50IG9iamVjdCBhbmQgZGF0YVBsYWNlSG9sZGVyIGFzIHBhcmFtZXRlcnNcbiAgICAgICAgLy8gKioqIHNlZSBodHRwOi8vYml0Lmx5L2pzLXBhc3Ntb3JlYXJnc2V2ZW50XG4gICAgICAgICAqL1xuXG4gICAgICAgICAvL2xpc3RlbiB0byB3aGVuIHRoZSBzdGF0ZSBjaGFuZ2VzIGluIHRoZSBzZXJ2aWNlQ2hhbm5lbFxuICAgICAgICAgLy93ZSBhcmUgcGFzc2luZyB0aGVBcHAgdG8gdGhlIHJlc3VsdHNQcmVwcm9jZXNzb3IgZnVuY3Rpb24gKHdoaWNoIGhhcHBlbnMgd2hlbiB0aGVcbiAgICAgICAgIC8vZXZlbnQgb2NjdXJzKVxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgLy93ZSBuZWVkIHRvIG9wZW4gdGhlIHNlcnZpY2VDaGFubmVsIHRvIGdldCB0aGUgZGF0YSBmcm9tIEJlc3RCdXkgKHRoZSBVUkwpLCBcIkdFVFwiIGlzIHdoYXQgd2lsbCBncmFiXG4gICAgICAgIC8vdGhlIGRhdGEuIFwiVHVyZVwiID0gdGhlIGJyb3dzZXIgd2lsbCBjb250aW51ZSB0byBkbyB0aGluZ3Mgd2hpbGUgaXQgd2FpdHMgZm9yIHRoZSBkYXRhLlxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5zZW5kKCk7XG4gICAgfVxuXG4gICAgLy9yZXN1bHRzUHJlcHJvY2Vzc29yIGlzIHRoZSBcIm1pZGRsZS1tYW5cIiBpbiB0aGlzIHNjZW5hcmlvIFxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICAvLyBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzIEJlc3RCdXl3ZWJzZXJ2aWNlIGZpbGVcbiAgICAgICAgbGV0IHRoaXNTZXJ2aWNlID0gdGhpczsgLy8gYSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIGNyZWF0ZWQgZnJvbSB0aGlzIGNsYXNzXG4gICAgICAgIC8vXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBmdW5jdGlvbihldnQpe1xuICAgICAgICAgICAgLy93ZSBjYW4ndCBqdXN0IHdyaXRlIFwidGhpc1wiIHRvIGNhbGwgb24gdGhlIGJlc3RidXl3ZWJzZXJ2aWNlIGZpbGUsIHNpbmNlXG4gICAgICAgICAgICAvL3dlIHdvdWxkIGJlIGNhbGxpbmcgaXQgd2l0aGluIGEgZnVuY2l0b24sIHNvIGl0IHdvdWxkIG9ubHkgZXhpc3Qgd2l0aGluIHRoaXNcbiAgICAgICAgICAgIC8vZnVuY3Rpb24uIFRoZXJlZm9yZSwgd2UgdXNlIHRoaXNTZXJ2aWUsIHdoaWNoIHdlIGRlY2xhcmVkIGFzIHRoZSBlbnRpcmVcbiAgICAgICAgICAgIC8vQmVzdEJ1eXdlYnNlcnZpY2UgYWJvdmUuIFxuICAgICAgICAgICAgdGhpc1NlcnZpY2UucmVzdWx0cyhldnQsdGhlQXBwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyXG4gICAgfTtcblxuICAgIHJlc3VsdHMoZXZ0LHRoZUFwcCl7XG5cbiAgICAgICAgaWYgKGV2dC50YXJnZXQucmVhZHlTdGF0ZSA9PSA0ICYmIGV2dC50YXJnZXQuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAvLyBhc3NpZ24gdGhpcyBpbnN0YW5jZSdzIHByb2R1Y3REYXRhIHRvIGJlIHRoZSByZXNwb25zZVRleHRcblxuICAgICAgICAgICAgLy9iZXN0YnV5d2Vic2VydmNlIGhhcyB0aGUgcHJvZHVjdCBkYXRhLCBhbmQgaXQgbWF0Y2hlcyB0aGUgZXZlbnQgdGFyZ2V0LCBzbyB3ZSBhcmVcbiAgICAgICAgICAgIC8vYXNzaWduaW5nIGl0L3N0b3JpbmcgaXRcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBldnQudGFyZ2V0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGUgYXBwJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dCB0b29cblxuICAgICAgICAgICAgLy9ub3cgdGhlIGFwcCBoYXMgYSBjb3B5IG9mIHRoZSBiZXN0YnV5IGFwaSBkYXRhIGFzIHdlbGw7IHdlIGFzc2lnbmVkIGl0IGJlbG93OlxuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuXG4gICAgICAgICAgICAvL2JlbG93IHdlIGFyZSB0ZWxsaW5nIHRoZUFwcCBmaWxlIHRvIHByZXBhcmUgdGhlIGNhdGFsb2dcbiAgICAgICAgICAgIHRoZUFwcC5wcmVwQ2F0YWxvZygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZXhwbGljaXR5IGdldHMgdGhlIHByb2R1Y3RzIHByb3BlcnR5XG4gICAgICAgIC8vIGZyb20gdGhlIEpTT04gb2JqZWN0LiBpdCBhc3N1bWVzIHlvdSBoYXZlIHRoZSBKU09OIGRhdGFcbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGlzIHByb2R1Y3QgZGF0YSwgdGhlbiBQQVJTRSB0aGUgZGF0YSAoY29udmVydCB0byBhcnJheSBvZiBvYmplY3RzKVxuICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMucHJvZHVjdERhdGEpO1xuXG4gICAgICAgICAgIC8vZ2V0cyBhbm90aGVyIGNvcHkgb2YgdGhlIGRhdGEsIHdoaWNoIGlzIGV4cGxpY2l0eSB0aGUgUFJPRFVDVFMgKG5vdCBhbGwgdGhlIG90aGVyXG4gICAgICAgICAgIC8vZGF0YSlcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuXG4gICAgICAgICAgIC8vcmV0dXJuIGp1c3QgdGhlIFBST0RVQ1RTLCB3aGljaCBnZXRzIHN0b3JlZCBpbiB0aGUgcHJvZHVjdHMgcHJvcGVydHkgb2YgdGhlIGFwcC5cbiAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gdGhlIGRhdGEgdG8gdGhlQXBwLlxuICAgICAgICByZXR1cm47IC8vIGlmIHdlIGhhdmUgbm8gZGF0YSwgcmV0dXJuIG5vdGhpbmdcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\n\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n        // this.initCarousel();\n        //creating a property for theApp, that is null right now.\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    rtl: true,\n                    loop: true,\n                    margin: 10,\n                    nav: true,\n                    autoplay: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        },\n                        600: {\n                            items: 2\n                        },\n                        1000: {\n                            items: 4\n                        }\n                    }\n                });\n            });\n        }\n\n        /*\n        You should initialize the carousel here.\n        Right now this code just adds the div tags you would need to add\n        inside the carousel 'container'.\n        Note that this.carousel refers to the div by its class attribute.\n        Since more than one tag can belong to the same class,\n        you either have to give the carousel tag an id as well...or\n        refer to the carousel div tag as this.carousel[0] using bracket\n        notation (since classes mean their *could* be more than one tag\n        belonging to that class) - see line 88 below.\n         */\n\n        // }\n\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n            //console.log the event object\n            //console.log(e.target.getAttribute(\"data-sku\"));\n            //we are declaring the sku and finding it in the event object's target\n            //let theSku = e.target.getAttribute(\"data-sku\");\n            //this file as theApp property and has a shopping cart, which has a function\n            //called addItemToCart, where we could pass the sku.\n            // console.log(theApp);\n            // this.theApp.shoppingCart.addItemToCart(theSku);\n\n            return function (e) {\n                console.log(theApp);\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n                theApp.shoppingCart.removeItemFromCart(theSku);\n                theApp.shoppingCart.initShoppingCart(theSku);\n                // if(sessionStorage.getItem(\"Quantity\") == undefined) {\n                //     sessionStorage.setItem(\"Quantity\", 1);\n                // }\n                // else {\n                //     let newQuantity = sessionStorage.getItem(\"Quantity\");\n                //     newQuantity = parseInt(newQuantity);\n                //     newQuantity = newQuantity + 1;\n                //     sessionStorage.setItem (\"Quantity\", newQuantity);\n                // }\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            /* the loop creates all the elements for each item in the carousel.\n             * it recreates the following structure\n             * <div class=\"product-wrapper\">\n             * <img src=\"images/stretch-knit-dress.jpg\" alt=\"Image of stretch knit dress\" />\n             * <p class=\"product-type\">Dresses</p>\n             * <h3>Stretch Knit Dress</h3>\n             * <p class=\"price\">$169.00</p>\n             * </div>\n              * */\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n                //<div class=\"product-wrapper\"></div>\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"img\");\n                newImg.setAttribute(\"src\", product.image);\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.longDescription);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n                //<h3>TEXT NODE</h3>\n                //createTextNode create a space to place text within an element\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"type\", \"button\");\n                var addCartTextNode = document.createTextNode(\"Add to Cart\");\n                addToCartButton.appendChild(addCartTextNode);\n                //we added the \"this\" so that it knows to search \"this\" file for the function\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                //at the top, we have the new elements within the div created.  Below, \n                //we are appending (or placing) the new elements with the data.\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton); // added new quickView button\n                newDiv.appendChild(addToCartButton);\n                this.carousel[0].appendChild(newDiv);\n                //this will create :\n                //  <div>\n                //      <img src=\"somepicfrombestbuy\"></img>\n                //      <p>Buy Me Now</p>\n                //      <h3>Dell Inspirion 12\"</h3>\n                //      <p>299.99</p>\n                //      <button id=\"\" data-sku=\"\" type=\"button\">Quick View</button>\n                //      <buton id=\"\" data-sku=\"\" type=\"button\">Add to Cart</button>\n                //  </div> \n            }\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGhlQXBwIiwiJCIsInJlYWR5Iiwib3dsQ2Fyb3VzZWwiLCJydGwiLCJsb29wIiwibWFyZ2luIiwibmF2IiwiYXV0b3BsYXkiLCJyZXNwb25zaXZlIiwiaXRlbXMiLCJlIiwiY29uc29sZSIsImxvZyIsInRoZVNrdSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInNob3BwaW5nQ2FydCIsImFkZEl0ZW1Ub0NhcnQiLCJyZW1vdmVJdGVtRnJvbUNhcnQiLCJpbml0U2hvcHBpbmdDYXJ0IiwicHJvZHVjdHMiLCJ1bmRlZmluZWQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsIm5ld0RpdiIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJuZXdJbWciLCJpbWFnZSIsIm5hbWUiLCJza3UiLCJuZXdQYXJhIiwibmV3UGFyYVRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJsb25nRGVzY3JpcHRpb24iLCJhcHBlbmRDaGlsZCIsIm5ld0gzVGFnIiwibmV3SDNUYWdUZXh0Tm9kZSIsIm5ld1ByaWNlUGFyYSIsIm5ld1ByaWNlUGFyYVRleHROb2RlIiwicmVndWxhclByaWNlIiwicXVpY2tWaWV3QnV0dG9uIiwicXVpY2tWaWV3VGV4dE5vZGUiLCJhZGRUb0NhcnRCdXR0b24iLCJhZGRDYXJ0VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGlja0NhcnRCdXR0b24iLCJpbml0Q2Fyb3VzZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTtBQUNBOztJQUVxQkEsVztBQUVqQiwyQkFBYTtBQUFBOztBQUNSLGFBQUtDLFFBQUwsR0FBZ0JDLFNBQVNDLHNCQUFULENBQWdDLGNBQWhDLENBQWhCO0FBQ0Q7QUFDQTtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBRUg7Ozs7dUNBRWE7O0FBR2RDLGNBQUVILFFBQUYsRUFBWUksS0FBWixDQUFrQixZQUFVO0FBQzVCRCxrQkFBRSxlQUFGLEVBQW1CRSxXQUFuQixDQUErQjtBQUMvQkMseUJBQUksSUFEMkI7QUFFL0JDLDBCQUFLLElBRjBCO0FBRy9CQyw0QkFBTyxFQUh3QjtBQUkvQkMseUJBQUksSUFKMkI7QUFLL0JDLDhCQUFTLElBTHNCO0FBTS9CQyxnQ0FBVztBQUNQLDJCQUFFO0FBQ0VDLG1DQUFNO0FBRFIseUJBREs7QUFJUCw2QkFBSTtBQUNBQSxtQ0FBTTtBQUROLHlCQUpHO0FBT1AsOEJBQUs7QUFDREEsbUNBQU07QUFETDtBQVBFO0FBTm9CLGlCQUEvQjtBQWtCSCxhQW5CRztBQW9CSDs7QUFHTzs7Ozs7Ozs7Ozs7O0FBYUo7Ozs7MENBRWtCVixNLEVBQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBTyxVQUFTVyxDQUFULEVBQVc7QUFDZEMsd0JBQVFDLEdBQVIsQ0FBWWIsTUFBWjtBQUNBLG9CQUFJYyxTQUFTSCxFQUFFSSxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBYjtBQUNBaEIsdUJBQU9pQixZQUFQLENBQW9CQyxhQUFwQixDQUFrQ0osTUFBbEM7QUFDQWQsdUJBQU9pQixZQUFQLENBQW9CRSxrQkFBcEIsQ0FBdUNMLE1BQXZDO0FBQ0FkLHVCQUFPaUIsWUFBUCxDQUFvQkcsZ0JBQXBCLENBQXFDTixNQUFyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVILGFBaEJEO0FBaUJIOzs7OENBRXFCTyxRLEVBQVVyQixNLEVBQU87QUFDbkMsaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxnQkFBSXFCLGFBQWFDLFNBQWIsSUFBMEJELFlBQVksSUFBMUMsRUFBK0M7QUFDM0MsdUJBRDJDLENBQ2xDO0FBQ1o7O0FBRUQ7Ozs7Ozs7OztBQVNBLGlCQUFLLElBQUlFLElBQUUsQ0FBWCxFQUFjQSxJQUFFRixTQUFTRyxNQUF6QixFQUFpQ0QsR0FBakMsRUFBcUM7QUFDakMsb0JBQUlFLFVBQVVKLFNBQVNFLENBQVQsQ0FBZDtBQUNBWCx3QkFBUUMsR0FBUixDQUFZWSxPQUFaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFJQyxTQUFTNUIsU0FBUzZCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBRCx1QkFBT0UsWUFBUCxDQUFvQixPQUFwQixFQUE0QixpQkFBNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBSUMsU0FBUy9CLFNBQVM2QixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQUUsdUJBQU9ELFlBQVAsQ0FBb0IsS0FBcEIsRUFBMkJILFFBQVFLLEtBQW5DO0FBQ0FELHVCQUFPRCxZQUFQLENBQW9CLEtBQXBCLE9BQThCSCxRQUFRTSxJQUF0QyxFQWhCaUMsQ0FnQmM7QUFDL0NGLHVCQUFPRCxZQUFQLENBQW9CLFVBQXBCLEVBQStCSCxRQUFRTyxHQUF2Qzs7QUFFQTtBQUNBLG9CQUFJQyxVQUFVbkMsU0FBUzZCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBZDtBQUNBTSx3QkFBUUwsWUFBUixDQUFxQixPQUFyQixFQUE2QixjQUE3QjtBQUNBLG9CQUFJTSxrQkFBa0JwQyxTQUFTcUMsY0FBVCxDQUF3QlYsUUFBUVcsZUFBaEMsQ0FBdEI7QUFDQUgsd0JBQVFJLFdBQVIsQ0FBb0JILGVBQXBCOztBQUVBO0FBQ0Esb0JBQUlJLFdBQVd4QyxTQUFTNkIsYUFBVCxDQUF1QixJQUF2QixDQUFmO0FBQ0Esb0JBQUlZLG1CQUFtQnpDLFNBQVNxQyxjQUFULENBQXdCVixRQUFRTSxJQUFoQyxDQUF2QjtBQUNBTyx5QkFBU0QsV0FBVCxDQUFxQkUsZ0JBQXJCO0FBQ0E7QUFDQTs7QUFFQSxvQkFBSUMsZUFBZTFDLFNBQVM2QixhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0FhLDZCQUFhWixZQUFiLENBQTBCLE9BQTFCLEVBQWtDLE9BQWxDO0FBQ0Esb0JBQUlhLHVCQUF1QjNDLFNBQVNxQyxjQUFULENBQXdCVixRQUFRaUIsWUFBaEMsQ0FBM0I7QUFDQUYsNkJBQWFILFdBQWIsQ0FBeUJJLG9CQUF6Qjs7QUFFQSxvQkFBSUUsa0JBQWtCN0MsU0FBUzZCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQWdCLGdDQUFnQmYsWUFBaEIsQ0FBNkIsSUFBN0IsVUFBeUNILFFBQVFPLEdBQWpEO0FBQ0FXLGdDQUFnQmYsWUFBaEIsQ0FBNkIsVUFBN0IsRUFBeUNILFFBQVFPLEdBQWpEO0FBQ0FXLGdDQUFnQmYsWUFBaEIsQ0FBNkIsTUFBN0IsRUFBcUMsUUFBckM7QUFDQSxvQkFBSWdCLG9CQUFvQjlDLFNBQVNxQyxjQUFULENBQXdCLFlBQXhCLENBQXhCO0FBQ0FRLGdDQUFnQk4sV0FBaEIsQ0FBNEJPLGlCQUE1Qjs7QUFFQSxvQkFBSUMsa0JBQWtCL0MsU0FBUzZCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQWtCLGdDQUFnQmpCLFlBQWhCLENBQTZCLElBQTdCLFlBQTJDSCxRQUFRTyxHQUFuRDtBQUNBYSxnQ0FBZ0JqQixZQUFoQixDQUE2QixVQUE3QixFQUF5Q0gsUUFBUU8sR0FBakQ7QUFDQWEsZ0NBQWdCakIsWUFBaEIsQ0FBNkIsTUFBN0IsRUFBcUMsUUFBckM7QUFDQSxvQkFBSWtCLGtCQUFrQmhELFNBQVNxQyxjQUFULENBQXdCLGFBQXhCLENBQXRCO0FBQ0FVLGdDQUFnQlIsV0FBaEIsQ0FBNEJTLGVBQTVCO0FBQ0E7QUFDQUQsZ0NBQWdCRSxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsS0FBS0MsaUJBQUwsQ0FBdUIsS0FBS2hELE1BQTVCLENBQTFDLEVBQStFLEtBQS9FOztBQUdBO0FBQ0E7QUFDQTBCLHVCQUFPVyxXQUFQLENBQW1CUixNQUFuQjtBQUNBSCx1QkFBT1csV0FBUCxDQUFtQkosT0FBbkI7QUFDQVAsdUJBQU9XLFdBQVAsQ0FBbUJDLFFBQW5CO0FBQ0FaLHVCQUFPVyxXQUFQLENBQW1CRyxZQUFuQjtBQUNBZCx1QkFBT1csV0FBUCxDQUFtQk0sZUFBbkIsRUE1RGlDLENBNERJO0FBQ3JDakIsdUJBQU9XLFdBQVAsQ0FBbUJRLGVBQW5CO0FBQ0EscUJBQUtoRCxRQUFMLENBQWMsQ0FBZCxFQUFpQndDLFdBQWpCLENBQTZCWCxNQUE3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0QsaUJBQUt1QixZQUFMO0FBRUg7Ozs7OztrQkEzS2dCckQsVyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8vIHRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgdGhlIHByb2R1Y3QgZGF0YS4uLlxuLy8gUGVyaGFwcyBpbiBhIGNhcm91c2VsLlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nVmlld3tcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm93bC1jYXJvdXNlbFwiKTtcbiAgICAgICAgLy8gdGhpcy5pbml0Q2Fyb3VzZWwoKTtcbiAgICAgICAgLy9jcmVhdGluZyBhIHByb3BlcnR5IGZvciB0aGVBcHAsIHRoYXQgaXMgbnVsbCByaWdodCBub3cuXG4gICAgICAgIHRoaXMudGhlQXBwID0gbnVsbDtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgaW5pdENhcm91c2VsKCl7XG5cbiAgICAgICBcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoJy5vd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgcnRsOnRydWUsXG4gICAgbG9vcDp0cnVlLFxuICAgIG1hcmdpbjoxMCxcbiAgICBuYXY6dHJ1ZSxcbiAgICBhdXRvcGxheTp0cnVlLFxuICAgIHJlc3BvbnNpdmU6e1xuICAgICAgICAwOntcbiAgICAgICAgICAgIGl0ZW1zOjFcbiAgICAgICAgfSxcbiAgICAgICAgNjAwOntcbiAgICAgICAgICAgIGl0ZW1zOjJcbiAgICAgICAgfSxcbiAgICAgICAgMTAwMDp7XG4gICAgICAgICAgICBpdGVtczo0XG4gICAgICAgIH1cbiAgICB9XG59KTtcbn0pO1xufVxuICBcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgIFlvdSBzaG91bGQgaW5pdGlhbGl6ZSB0aGUgY2Fyb3VzZWwgaGVyZS5cbiAgICAgICAgUmlnaHQgbm93IHRoaXMgY29kZSBqdXN0IGFkZHMgdGhlIGRpdiB0YWdzIHlvdSB3b3VsZCBuZWVkIHRvIGFkZFxuICAgICAgICBpbnNpZGUgdGhlIGNhcm91c2VsICdjb250YWluZXInLlxuICAgICAgICBOb3RlIHRoYXQgdGhpcy5jYXJvdXNlbCByZWZlcnMgdG8gdGhlIGRpdiBieSBpdHMgY2xhc3MgYXR0cmlidXRlLlxuICAgICAgICBTaW5jZSBtb3JlIHRoYW4gb25lIHRhZyBjYW4gYmVsb25nIHRvIHRoZSBzYW1lIGNsYXNzLFxuICAgICAgICB5b3UgZWl0aGVyIGhhdmUgdG8gZ2l2ZSB0aGUgY2Fyb3VzZWwgdGFnIGFuIGlkIGFzIHdlbGwuLi5vclxuICAgICAgICByZWZlciB0byB0aGUgY2Fyb3VzZWwgZGl2IHRhZyBhcyB0aGlzLmNhcm91c2VsWzBdIHVzaW5nIGJyYWNrZXRcbiAgICAgICAgbm90YXRpb24gKHNpbmNlIGNsYXNzZXMgbWVhbiB0aGVpciAqY291bGQqIGJlIG1vcmUgdGhhbiBvbmUgdGFnXG4gICAgICAgIGJlbG9uZ2luZyB0byB0aGF0IGNsYXNzKSAtIHNlZSBsaW5lIDg4IGJlbG93LlxuICAgICAgICAgKi9cblxuICAgICAgICBcbiAgICAvLyB9XG5cbiAgICBvbkNsaWNrQ2FydEJ1dHRvbih0aGVBcHApe1xuICAgICAgICAvL2NvbnNvbGUubG9nIHRoZSBldmVudCBvYmplY3RcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiKSk7XG4gICAgICAgIC8vd2UgYXJlIGRlY2xhcmluZyB0aGUgc2t1IGFuZCBmaW5kaW5nIGl0IGluIHRoZSBldmVudCBvYmplY3QncyB0YXJnZXRcbiAgICAgICAgLy9sZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIik7XG4gICAgICAgIC8vdGhpcyBmaWxlIGFzIHRoZUFwcCBwcm9wZXJ0eSBhbmQgaGFzIGEgc2hvcHBpbmcgY2FydCwgd2hpY2ggaGFzIGEgZnVuY3Rpb25cbiAgICAgICAgLy9jYWxsZWQgYWRkSXRlbVRvQ2FydCwgd2hlcmUgd2UgY291bGQgcGFzcyB0aGUgc2t1LlxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGVBcHApO1xuICAgICAgICAvLyB0aGlzLnRoZUFwcC5zaG9wcGluZ0NhcnQuYWRkSXRlbVRvQ2FydCh0aGVTa3UpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgICAgICBsZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIik7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcbiAgICAgICAgICAgIHRoZUFwcC5zaG9wcGluZ0NhcnQucmVtb3ZlSXRlbUZyb21DYXJ0KHRoZVNrdSk7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmluaXRTaG9wcGluZ0NhcnQodGhlU2t1KTtcbiAgICAgICAgICAgIC8vIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJRdWFudGl0eVwiKSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiUXVhbnRpdHlcIiwgMSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBsZXQgbmV3UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiUXVhbnRpdHlcIik7XG4gICAgICAgICAgICAvLyAgICAgbmV3UXVhbnRpdHkgPSBwYXJzZUludChuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICAvLyAgICAgbmV3UXVhbnRpdHkgPSBuZXdRdWFudGl0eSArIDE7XG4gICAgICAgICAgICAvLyAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSAoXCJRdWFudGl0eVwiLCBuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByb2R1Y3RzVG9DYXJvdXNlbChwcm9kdWN0cywgdGhlQXBwKXtcbiAgICAgICAgdGhpcy50aGVBcHAgPSB0aGVBcHA7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RzID09PSB1bmRlZmluZWQgfHwgcHJvZHVjdHMgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm4gOyAvLyBkbyBub3QgZG8gYW55dGhpbmchIHRoZXJlIGlzIG5vIGRhdGFcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIHRoZSBsb29wIGNyZWF0ZXMgYWxsIHRoZSBlbGVtZW50cyBmb3IgZWFjaCBpdGVtIGluIHRoZSBjYXJvdXNlbC5cbiAgICAgICAgICogaXQgcmVjcmVhdGVzIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlXG4gICAgICAgICAqIDxkaXYgY2xhc3M9XCJwcm9kdWN0LXdyYXBwZXJcIj5cbiAgICAgICAgICogPGltZyBzcmM9XCJpbWFnZXMvc3RyZXRjaC1rbml0LWRyZXNzLmpwZ1wiIGFsdD1cIkltYWdlIG9mIHN0cmV0Y2gga25pdCBkcmVzc1wiIC8+XG4gICAgICAgICAqIDxwIGNsYXNzPVwicHJvZHVjdC10eXBlXCI+RHJlc3NlczwvcD5cbiAgICAgICAgICogPGgzPlN0cmV0Y2ggS25pdCBEcmVzczwvaDM+XG4gICAgICAgICAqIDxwIGNsYXNzPVwicHJpY2VcIj4kMTY5LjAwPC9wPlxuICAgICAgICAgKiA8L2Rpdj5cbiAgICAgICAgICAqICovXG4gICAgICAgIGZvciAobGV0IHA9MDsgcDxwcm9kdWN0cy5sZW5ndGg7IHArKyl7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdCk7XG4gICAgICAgICAgICAvLyBlYWNoIHByb2R1Y3QgaXMgYSBwcm9kdWN0IG9iamVjdFxuICAgICAgICAgICAgLy8gdXNlIGl0IHRvIGNyZWF0ZSB0aGUgZWxlbWVudFxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIERJViB0YWcgd2l0aCBjbGFzcyAncHJvZHVjdC13cmFwcGVyJ1xuICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3Qtd3JhcHBlclwiKTtcbiAgICAgICAgICAgIC8vPGRpdiBjbGFzcz1cInByb2R1Y3Qtd3JhcHBlclwiPjwvZGl2PlxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgSU1HIHRhZy4gU3VnZ2VzdCB0byBhZGQgZGF0YS1za3UgYXR0cmlidXRlIGhlcmUgdG9vXG4gICAgICAgICAgICAvLyBzbyB0aGF0IGlmIHlvdSAnY2xpY2snIG9uIHRoZSBpbWFnZSwgaXQgd291bGQgcG9wIHVwIGEgcXVpY2stdmlld1xuICAgICAgICAgICAgLy8gd2luZG93IGFuZCB5b3UgY2FuIHVzZSB0aGUgc2t1LlxuICAgICAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHByb2R1Y3QuaW1hZ2UpO1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBgJHtwcm9kdWN0Lm5hbWV9YCk7IC8vIHRoaXMgd29ya3MgdG9vXG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBQYXJhZ3JhcGggdG8gc2hvdyBhIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBsZXQgbmV3UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgbmV3UGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJvZHVjdC10eXBlXCIpO1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubG9uZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IEgzIHRhZyB0byBzaG93IHRoZSBuYW1lXG4gICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICBsZXQgbmV3SDNUYWdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubmFtZSk7XG4gICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcbiAgICAgICAgICAgIC8vPGgzPlRFWFQgTk9ERTwvaDM+XG4gICAgICAgICAgICAvL2NyZWF0ZVRleHROb2RlIGNyZWF0ZSBhIHNwYWNlIHRvIHBsYWNlIHRleHQgd2l0aGluIGFuIGVsZW1lbnRcblxuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgbmV3UHJpY2VQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcmljZVwiKTtcbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QucmVndWxhclByaWNlKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5hcHBlbmRDaGlsZChuZXdQcmljZVBhcmFUZXh0Tm9kZSk7XG5cbiAgICAgICAgICAgIGxldCBxdWlja1ZpZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIGBxdl8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIsIHByb2R1Y3Quc2t1KTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgbGV0IHF1aWNrVmlld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJRdWljayBWaWV3XCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFwcGVuZENoaWxkKHF1aWNrVmlld1RleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGNhcnRfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGxldCBhZGRDYXJ0VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCB0byBDYXJ0XCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFwcGVuZENoaWxkKGFkZENhcnRUZXh0Tm9kZSk7XG4gICAgICAgICAgICAvL3dlIGFkZGVkIHRoZSBcInRoaXNcIiBzbyB0aGF0IGl0IGtub3dzIHRvIHNlYXJjaCBcInRoaXNcIiBmaWxlIGZvciB0aGUgZnVuY3Rpb25cbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrQ2FydEJ1dHRvbih0aGlzLnRoZUFwcCkgLGZhbHNlKTtcblxuXG4gICAgICAgICAgICAvL2F0IHRoZSB0b3AsIHdlIGhhdmUgdGhlIG5ldyBlbGVtZW50cyB3aXRoaW4gdGhlIGRpdiBjcmVhdGVkLiAgQmVsb3csIFxuICAgICAgICAgICAgLy93ZSBhcmUgYXBwZW5kaW5nIChvciBwbGFjaW5nKSB0aGUgbmV3IGVsZW1lbnRzIHdpdGggdGhlIGRhdGEuXG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChxdWlja1ZpZXdCdXR0b24pOyAvLyBhZGRlZCBuZXcgcXVpY2tWaWV3IGJ1dHRvblxuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGFkZFRvQ2FydEJ1dHRvbik7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsWzBdLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgICAgICAvL3RoaXMgd2lsbCBjcmVhdGUgOlxuICAgICAgICAgICAgLy8gIDxkaXY+XG4gICAgICAgICAgICAvLyAgICAgIDxpbWcgc3JjPVwic29tZXBpY2Zyb21iZXN0YnV5XCI+PC9pbWc+XG4gICAgICAgICAgICAvLyAgICAgIDxwPkJ1eSBNZSBOb3c8L3A+XG4gICAgICAgICAgICAvLyAgICAgIDxoMz5EZWxsIEluc3BpcmlvbiAxMlwiPC9oMz5cbiAgICAgICAgICAgIC8vICAgICAgPHA+Mjk5Ljk5PC9wPlxuICAgICAgICAgICAgLy8gICAgICA8YnV0dG9uIGlkPVwiXCIgZGF0YS1za3U9XCJcIiB0eXBlPVwiYnV0dG9uXCI+UXVpY2sgVmlldzwvYnV0dG9uPlxuICAgICAgICAgICAgLy8gICAgICA8YnV0b24gaWQ9XCJcIiBkYXRhLXNrdT1cIlwiIHR5cGU9XCJidXR0b25cIj5BZGQgdG8gQ2FydDwvYnV0dG9uPlxuICAgICAgICAgICAgLy8gIDwvZGl2PiBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRDYXJvdXNlbCgpO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2F0YWxvZ1ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            // you can create a shoppingCart!\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart(sku) {\n            if (sessionStorage.getItem(sku) !== \"undefined\") {\n                if (sessionStorage.quantity) {\n                    sessionStorage.quantity = Number(sessionStorage.quantity) + 1;\n                } else {\n                    sessionStorage.quantity = 0;\n                }\n            }\n\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n            console.log(sku);\n            var theSku = sku;\n            if (sessionStorage.getItem(sku) == undefined) {\n                sessionStorage.setItem(sku, 1);\n                return;\n            }\n            //loop through the skus until it finds the matching sku\n            else {\n                    for (var i = 0; i < sessionStorage.length; i++) {\n                        var currentSku = sessionStorage.key(i);\n                        if (currentSku.toString() == theSku.toString()) {\n                            var currentValue = sessionStorage.getItem(currentSku);\n                            currentValue = parseInt(currentValue);\n                            currentValue = currentValue + 1;\n                            sessionStorage.setItem(theSku, currentValue);\n                        }\n                    }\n                }\n        }\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku) {}\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, qty) {}\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            // clear the entire cart\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJpbml0U2hvcHBpbmdDYXJ0Iiwic2t1Iiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwicXVhbnRpdHkiLCJOdW1iZXIiLCJ0aGVTa3UiLCJ1bmRlZmluZWQiLCJzZXRJdGVtIiwiaSIsImxlbmd0aCIsImN1cnJlbnRTa3UiLCJrZXkiLCJ0b1N0cmluZyIsImN1cnJlbnRWYWx1ZSIsInBhcnNlSW50IiwicXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLFk7QUFFakIsNEJBQWE7QUFBQTs7QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLFlBQUdDLE9BQUgsRUFBVztBQUNQO0FBQ0EsaUJBQUtDLGdCQUFMO0FBQ0gsU0FIRCxNQUlBO0FBQ0lILG9CQUFRQyxHQUFSLENBQVksc0RBQVo7QUFDSDtBQUNKOzs7O3lDQUVnQkcsRyxFQUFJO0FBQ2IsZ0JBQUlDLGVBQWVDLE9BQWYsQ0FBdUJGLEdBQXZCLE1BQWdDLFdBQXBDLEVBQWlEO0FBQ2pELG9CQUFJQyxlQUFlRSxRQUFuQixFQUE2QjtBQUM3QkYsbUNBQWVFLFFBQWYsR0FBMEJDLE9BQU9ILGVBQWVFLFFBQXRCLElBQWdDLENBQTFEO0FBQ0gsaUJBRkcsTUFFUztBQUNMRixtQ0FBZUUsUUFBZixHQUEwQixDQUExQjtBQUNQO0FBQ0o7O0FBRUdQLG9CQUFRQyxHQUFSLENBQVksaUNBQVo7QUFDSDs7O3NDQUVhRyxHLEVBQUk7QUFDZEosb0JBQVFDLEdBQVIsQ0FBWUcsR0FBWjtBQUNBLGdCQUFJSyxTQUFTTCxHQUFiO0FBQ0EsZ0JBQUlDLGVBQWVDLE9BQWYsQ0FBdUJGLEdBQXZCLEtBQStCTSxTQUFuQyxFQUE4QztBQUMxQ0wsK0JBQWVNLE9BQWYsQ0FBdUJQLEdBQXZCLEVBQTRCLENBQTVCO0FBQ0E7QUFDSDtBQUNEO0FBSkEsaUJBS0s7QUFDRCx5QkFBSyxJQUFJUSxJQUFJLENBQWIsRUFBZ0JBLElBQUdQLGVBQWVRLE1BQWxDLEVBQTBDRCxHQUExQyxFQUErQztBQUMzQyw0QkFBSUUsYUFBYVQsZUFBZVUsR0FBZixDQUFtQkgsQ0FBbkIsQ0FBakI7QUFDQSw0QkFBSUUsV0FBV0UsUUFBWCxNQUF5QlAsT0FBT08sUUFBUCxFQUE3QixFQUFnRDtBQUM1QyxnQ0FBSUMsZUFBZVosZUFBZUMsT0FBZixDQUF1QlEsVUFBdkIsQ0FBbkI7QUFDQUcsMkNBQWVDLFNBQVNELFlBQVQsQ0FBZjtBQUNBQSwyQ0FBZUEsZUFBZSxDQUE5QjtBQUNBWiwyQ0FBZU0sT0FBZixDQUF1QkYsTUFBdkIsRUFBK0JRLFlBQS9CO0FBQ0g7QUFFSjtBQUNKO0FBQ0o7OzsyQ0FFa0JiLEcsRUFBSSxDQUV0Qjs7O21EQUUwQkEsRyxFQUFJZSxHLEVBQUksQ0FFbEM7OztvQ0FFVTtBQUNQO0FBQ0g7Ozs7OztrQkF6RGdCcEIsWSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yOS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wcGluZ0NhcnR7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0aW5nIHNob3BwaW5nIGNhcnRcIik7XG4gICAgICAgIGlmKFN0b3JhZ2Upe1xuICAgICAgICAgICAgLy8geW91IGNhbiBjcmVhdGUgYSBzaG9wcGluZ0NhcnQhXG4gICAgICAgICAgICB0aGlzLmluaXRTaG9wcGluZ0NhcnQoKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IhIFNlc3Npb25TdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyIVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRTaG9wcGluZ0NhcnQoc2t1KXtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHNrdSkgIT09IFwidW5kZWZpbmVkXCIpIHsgXG4gICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UucXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnF1YW50aXR5ID0gTnVtYmVyKHNlc3Npb25TdG9yYWdlLnF1YW50aXR5KSsxO1xuICAgICAgICB9ICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnF1YW50aXR5ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaGVkIGNyZWF0aW5nIHNob3BwaW5nIGNhcnRcIik7XG4gICAgfVxuXG4gICAgYWRkSXRlbVRvQ2FydChza3Upe1xuICAgICAgICBjb25zb2xlLmxvZyhza3UpO1xuICAgICAgICBsZXQgdGhlU2t1ID0gc2t1O1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShza3UsIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vbG9vcCB0aHJvdWdoIHRoZSBza3VzIHVudGlsIGl0IGZpbmRzIHRoZSBtYXRjaGluZyBza3VcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8c2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNrdSA9IHNlc3Npb25TdG9yYWdlLmtleShpKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNrdS50b1N0cmluZygpID09IHRoZVNrdS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBwYXJzZUludChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgKyAxO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoZVNrdSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJdGVtRnJvbUNhcnQoc2t1KXtcblxuICAgIH1cblxuICAgIHVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0KHNrdSxxdHkpe1xuXG4gICAgfVxuXG4gICAgY2xlYXJDYXJ0KCl7XG4gICAgICAgIC8vIGNsZWFyIHRoZSBlbnRpcmUgY2FydFxuICAgIH1cblxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1Nob3BwaW5nQ2FydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ShoppingCartView = function () {\n\tfunction ShoppingCartView() {\n\t\t_classCallCheck(this, ShoppingCartView);\n\t}\n\n\t_createClass(ShoppingCartView, [{\n\t\tkey: 'showCartPopup',\n\t\tvalue: function showCartPopup(products) {\n\t\t\tconsole.log(products);\n\t\t\tvar output = \"\";\n\t\t\tvar CartView = $('.cartView');\n\t\t\t//maybe insert something here if the shopping cart is empty:\n\t\t\t//if(sessionStorage.length == 0) {\n\t\t\t//return ;\n\t\t\t//\t}\n\t\t\tfor (var i = 0; i < sessionStorage.length; i++) {\n\t\t\t\tvar currentSku = sessionStorage.key(i); //this is a string\n\t\t\t\tvar currentQuantity = sessionStorage.getItem(currentSku); //this is a string\n\t\t\t\t//we are running a loop within a loop, but there are more efficient ways\n\t\t\t\t//to do this: there is an array object method called \"filter\"\n\t\t\t\tfor (var p = 0; p < products.length; p++) {\n\t\t\t\t\tvar currentProduct = products[p];\n\t\t\t\t\tvar productSku = currentProduct.sku;\n\t\t\t\t\tproductSku = productSku.toString();\n\t\t\t\t\tif (productSku == currentSku) {\n\t\t\t\t\t\tvar image = currentProduct.image;\n\t\t\t\t\t\tvar name = currentProduct.name;\n\t\t\t\t\t\tvar price = currentProduct.price;\n\t\t\t\t\t\t// += : equals plus\n\t\t\t\t\t\toutput += '<div id=\"flex-container\" class=\"product-info\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\"cart-image\" src= \"' + image + '\" alt= \"' + name + '\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\"cart-name\"> ' + name + ' </p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\"cart-price\"> ' + price + ' </p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<form class=\"cart-quantity\"> ' + currentQuantity + ' </form>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>';\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t$('.cartView').append(output);\n\t\t}\n\t}]);\n\n\treturn ShoppingCartView;\n}();\n\nexports.default = ShoppingCartView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcz81OWU5Il0sIm5hbWVzIjpbIlNob3BwaW5nQ2FydFZpZXciLCJwcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJvdXRwdXQiLCJDYXJ0VmlldyIsIiQiLCJpIiwic2Vzc2lvblN0b3JhZ2UiLCJsZW5ndGgiLCJjdXJyZW50U2t1Iiwia2V5IiwiY3VycmVudFF1YW50aXR5IiwiZ2V0SXRlbSIsInAiLCJjdXJyZW50UHJvZHVjdCIsInByb2R1Y3RTa3UiLCJza3UiLCJ0b1N0cmluZyIsImltYWdlIiwibmFtZSIsInByaWNlIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxnQjtBQUNwQiw2QkFBYTtBQUFBO0FBQUU7Ozs7Z0NBQ0RDLFEsRUFBVTtBQUN2QkMsV0FBUUMsR0FBUixDQUFZRixRQUFaO0FBQ0EsT0FBSUcsU0FBUyxFQUFiO0FBQ0EsT0FBSUMsV0FBV0MsRUFBRSxXQUFGLENBQWY7QUFDQztBQUNBO0FBQ0M7QUFDRDtBQUNBLFFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxlQUFlQyxNQUFuQyxFQUEyQ0YsR0FBM0MsRUFBZ0Q7QUFDL0MsUUFBSUcsYUFBYUYsZUFBZUcsR0FBZixDQUFtQkosQ0FBbkIsQ0FBakIsQ0FEK0MsQ0FDUDtBQUN4QyxRQUFJSyxrQkFBa0JKLGVBQWVLLE9BQWYsQ0FBdUJILFVBQXZCLENBQXRCLENBRitDLENBRVc7QUFDMUQ7QUFDQTtBQUNBLFNBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJYixTQUFTUSxNQUE3QixFQUFxQ0ssR0FBckMsRUFBMEM7QUFDekMsU0FBSUMsaUJBQWlCZCxTQUFTYSxDQUFULENBQXJCO0FBQ0EsU0FBSUUsYUFBYUQsZUFBZUUsR0FBaEM7QUFDQ0Qsa0JBQWFBLFdBQVdFLFFBQVgsRUFBYjtBQUNELFNBQUlGLGNBQWNOLFVBQWxCLEVBQThCO0FBQzdCLFVBQUlTLFFBQVFKLGVBQWVJLEtBQTNCO0FBQ0EsVUFBSUMsT0FBT0wsZUFBZUssSUFBMUI7QUFDQSxVQUFJQyxRQUFRTixlQUFlTSxLQUEzQjtBQUNBO0FBQ0FqQixxSEFDbUNlLEtBRG5DLGdCQUNtREMsSUFEbkQsb0RBRTJCQSxJQUYzQix3REFHNEJDLEtBSDVCLDhEQUlrQ1QsZUFKbEM7QUFNQTtBQUVEO0FBQ0Q7QUFDRE4sS0FBRSxXQUFGLEVBQWVnQixNQUFmLENBQXNCbEIsTUFBdEI7QUFDRDs7Ozs7O2tCQW5DbUJKLGdCIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wcGluZ0NhcnRWaWV3IHtcblx0Y29uc3RydWN0b3IoKXt9XG5cdHNob3dDYXJ0UG9wdXAocHJvZHVjdHMpIHtcblx0XHRjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG5cdFx0bGV0IG91dHB1dCA9IFwiXCI7XG5cdFx0bGV0IENhcnRWaWV3ID0gJCgnLmNhcnRWaWV3Jyk7XG5cdFx0XHQvL21heWJlIGluc2VydCBzb21ldGhpbmcgaGVyZSBpZiB0aGUgc2hvcHBpbmcgY2FydCBpcyBlbXB0eTpcblx0XHRcdC8vaWYoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID09IDApIHtcblx0XHRcdFx0Ly9yZXR1cm4gO1xuXHRcdFx0Ly9cdH1cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGN1cnJlbnRTa3UgPSBzZXNzaW9uU3RvcmFnZS5rZXkoaSk7IC8vdGhpcyBpcyBhIHN0cmluZ1xuXHRcdFx0XHRsZXQgY3VycmVudFF1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjdXJyZW50U2t1KTsgLy90aGlzIGlzIGEgc3RyaW5nXG5cdFx0XHRcdC8vd2UgYXJlIHJ1bm5pbmcgYSBsb29wIHdpdGhpbiBhIGxvb3AsIGJ1dCB0aGVyZSBhcmUgbW9yZSBlZmZpY2llbnQgd2F5c1xuXHRcdFx0XHQvL3RvIGRvIHRoaXM6IHRoZXJlIGlzIGFuIGFycmF5IG9iamVjdCBtZXRob2QgY2FsbGVkIFwiZmlsdGVyXCJcblx0XHRcdFx0Zm9yIChsZXQgcCA9IDA7IHAgPCBwcm9kdWN0cy5sZW5ndGg7IHArKykge1xuXHRcdFx0XHRcdGxldCBjdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuXHRcdFx0XHRcdGxldCBwcm9kdWN0U2t1ID0gY3VycmVudFByb2R1Y3Quc2t1O1xuXHRcdFx0XHRcdFx0cHJvZHVjdFNrdSA9IHByb2R1Y3RTa3UudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRpZiAocHJvZHVjdFNrdSA9PSBjdXJyZW50U2t1KSB7XG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBjdXJyZW50UHJvZHVjdC5pbWFnZTtcblx0XHRcdFx0XHRcdGxldCBuYW1lID0gY3VycmVudFByb2R1Y3QubmFtZTtcblx0XHRcdFx0XHRcdGxldCBwcmljZSA9IGN1cnJlbnRQcm9kdWN0LnByaWNlO1xuXHRcdFx0XHRcdFx0Ly8gKz0gOiBlcXVhbHMgcGx1c1xuXHRcdFx0XHRcdFx0b3V0cHV0ICs9IGA8ZGl2IGlkPVwiZmxleC1jb250YWluZXJcIiBjbGFzcz1cInByb2R1Y3QtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cImNhcnQtaW1hZ2VcIiBzcmM9IFwiJHtpbWFnZX1cIiBhbHQ9IFwiJHtuYW1lfVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJjYXJ0LW5hbWVcIj4gJHtuYW1lfSA8L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cImNhcnQtcHJpY2VcIj4gJHtwcmljZX0gPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGZvcm0gY2xhc3M9XCJjYXJ0LXF1YW50aXR5XCI+ICR7Y3VycmVudFF1YW50aXR5fSA8L2Zvcm0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5gO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQkKCcuY2FydFZpZXcnKS5hcHBlbmQob3V0cHV0KTtcblx0fVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1Nob3BwaW5nQ2FydFZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);