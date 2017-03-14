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
/******/ 	var hotCurrentHash = "44a8b0985a4083b938e1"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n//the application needs some other files to work: webservice to get some data, catalog view to\n//see the products, and a shopping cart to manage the items/products. \n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _ShoppingCartView = __webpack_require__(5);\n\nvar _ShoppingCartView2 = _interopRequireDefault(_ShoppingCartView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n\n    //the constructor function ALWAYS EXISTS- usually calls on the init function that contains\n    //all the steps to perform the task.\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        this.shoppingCartView = new _ShoppingCartView2.default();\n        // this.\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n        this.initShoppingCart();\n        this.clear = document.getElementById(\"clear-cart\");\n        this.clear = addEventListener(\"click\", this.clickClear(this), false);\n        // this.initShoppingCartView();\n    }\n\n    _createClass(App, [{\n        key: 'clickClear',\n        value: function clickClear(theApp) {\n            return function (e) {\n                theApp.shoppingCart.clearCart(theApp.products);\n            };\n        }\n        //in this init function\n\n    }, {\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            //this app's bestbuywebservice is an instance of the BestBuy Web Service\n            //go to bestbuywebservice and run all its properties and functions\n            this.bbws = new _BestBuyWebService2.default();\n            //this app's webservice's api key is:\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            //this app's webservice's url to obtain the product data is:\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            //passing the webservice to receive the data, which it grabs and then returns it to\n            //this app. \n            //this bestbuy webservice is receiving the\n            //the bestbuy webservice needs to know about THIS app- it needs the products data and\n            //the products.  Those properties need to be filled with values.\n            this.bbws.getData(this);\n            //when we run getData, we are passing the app.js to BestBuyWebservice to populate the\n            //list of products in the app. \n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            //if there is actually product data, then this (theApp)\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                //pass the products to the carousel\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }, {\n        key: 'initShoppingCart',\n        value: function initShoppingCart() {\n            $(document).on('click', '.cart', this, function (event) {\n                console.log(event.data);\n                var theApp = event.data;\n                theApp.shoppingCartView.showCartPopup(theApp.products);\n                $(\".cartView\").fadeIn();\n            });\n            $(document).on('click', '.close', this, function (event) {\n                $(\".cartView\").fadeOut();\n            });\n        }\n    }]);\n\n    return App;\n}();\n\n// event.data.theApp.ShoppingCart\n// $(\"#div2\").fadeIn(\"slow\");\n// $(\"#div3\").fadeIn(3000);\n\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0Iiwic2hvcHBpbmdDYXJ0VmlldyIsImluaXRCZXN0QnV5V2ViU2VydmljZSIsImluaXRTaG9wcGluZ0NhcnQiLCJjbGVhciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xpY2tDbGVhciIsInRoZUFwcCIsImUiLCJjbGVhckNhcnQiLCJiYndzIiwiYXBpS2V5IiwidXJsIiwiZ2V0RGF0YSIsImdldFByb2R1Y3RzIiwic2hvd0NhdGFsb2ciLCJhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwiLCIkIiwib24iLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwic2hvd0NhcnRQb3B1cCIsImZhZGVJbiIsImZhZGVPdXQiXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7QUFJQztBQUNBOztBQUVEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUdxQkEsRzs7QUFFakI7QUFDQTtBQUNBLG1CQUFhO0FBQUE7O0FBQ1QsYUFBS0MsV0FBTCxHQUFtQixJQUFuQixDQURTLENBQ2dCO0FBQ3pCLGFBQUtDLFFBQUwsR0FBZ0IsSUFBaEIsQ0FGUyxDQUVhO0FBQ3RCLGFBQUtDLFdBQUwsR0FBbUIsMkJBQW5CLENBSFMsQ0FHNkI7QUFDdEMsYUFBS0MsWUFBTCxHQUFvQiw0QkFBcEI7QUFDQSxhQUFLQyxnQkFBTCxHQUF3QixnQ0FBeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLQyxxQkFBTDtBQUNBLGFBQUtDLGdCQUFMO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQyxTQUFTQyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxhQUFLRixLQUFMLEdBQWFHLGlCQUFpQixPQUFqQixFQUEwQixLQUFLQyxVQUFMLENBQWdCLElBQWhCLENBQTFCLEVBQWlELEtBQWpELENBQWI7QUFDQTtBQUNIOzs7O21DQUVVQyxNLEVBQVE7QUFDZixtQkFBTyxVQUFTQyxDQUFULEVBQVk7QUFDZkQsdUJBQU9ULFlBQVAsQ0FBb0JXLFNBQXBCLENBQThCRixPQUFPWCxRQUFyQztBQUNILGFBRkQ7QUFHSDtBQUNEOzs7O2dEQUN1QjtBQUNuQjtBQUNBO0FBQ0EsaUJBQUtjLElBQUwsR0FBWSxpQ0FBWjtBQUNBO0FBQ0E7QUFDQSxpQkFBS0EsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLDBCQUFuQjs7QUFFQTtBQUNBO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUUsR0FBVixtRkFBOEYsS0FBS0YsSUFBTCxDQUFVQyxNQUF4Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRyxPQUFWLENBQWtCLElBQWxCO0FBQ0E7QUFDQTtBQUVIOzs7c0NBRVk7QUFDVDtBQUNBOztBQUVBO0FBQ1EsZ0JBQUcsS0FBS2xCLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDOUI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtjLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUVIOztBQUVELGlCQUFLQyxXQUFMO0FBQ1A7OztzQ0FDaUI7O0FBRVY7QUFDQSxnQkFBSSxLQUFLcEIsV0FBTCxJQUFvQixJQUF4QixFQUE4QjtBQUMxQjtBQUNBLHFCQUFLRSxXQUFMLENBQWlCbUIscUJBQWpCLENBQXVDLEtBQUtwQixRQUE1QyxFQUFxRCxJQUFyRDtBQUNBO0FBQ0g7QUFDSjs7OzJDQUVrQjtBQUNmcUIsY0FBRWQsUUFBRixFQUFZZSxFQUFaLENBQWUsT0FBZixFQUF3QixPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxVQUFTQyxLQUFULEVBQWU7QUFDbERDLHdCQUFRQyxHQUFSLENBQVlGLE1BQU1HLElBQWxCO0FBQ0Esb0JBQUlmLFNBQVNZLE1BQU1HLElBQW5CO0FBQ0FmLHVCQUFPUixnQkFBUCxDQUF3QndCLGFBQXhCLENBQXNDaEIsT0FBT1gsUUFBN0M7QUFDQXFCLGtCQUFFLFdBQUYsRUFBZU8sTUFBZjtBQUNILGFBTEQ7QUFNQ1AsY0FBRWQsUUFBRixFQUFZZSxFQUFaLENBQWUsT0FBZixFQUF3QixRQUF4QixFQUFrQyxJQUFsQyxFQUF3QyxVQUFTQyxLQUFULEVBQWU7QUFDcERGLGtCQUFFLFdBQUYsRUFBZVEsT0FBZjtBQUNILGFBRkE7QUFHSjs7Ozs7O0FBS0o7QUFDVztBQUNBOzs7a0JBM0ZTL0IsRyIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yOC5cbiAqL1xuXG4gLy90aGUgYXBwbGljYXRpb24gbmVlZHMgc29tZSBvdGhlciBmaWxlcyB0byB3b3JrOiB3ZWJzZXJ2aWNlIHRvIGdldCBzb21lIGRhdGEsIGNhdGFsb2cgdmlldyB0b1xuIC8vc2VlIHRoZSBwcm9kdWN0cywgYW5kIGEgc2hvcHBpbmcgY2FydCB0byBtYW5hZ2UgdGhlIGl0ZW1zL3Byb2R1Y3RzLiBcblxuaW1wb3J0IEJlc3RCdXlXZWJTZXJ2aWNlIGZyb20gJy4vQmVzdEJ1eVdlYlNlcnZpY2UnO1xuaW1wb3J0IENhdGFsb2dWaWV3IGZyb20gJy4vQ2F0YWxvZ1ZpZXcnO1xuaW1wb3J0IFNob3BwaW5nQ2FydCBmcm9tICcuL1Nob3BwaW5nQ2FydCc7XG5pbXBvcnQgU2hvcHBpbmdDYXJ0VmlldyBmcm9tICcuL1Nob3BwaW5nQ2FydFZpZXcnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XG5cbiAgICAvL3RoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBBTFdBWVMgRVhJU1RTLSB1c3VhbGx5IGNhbGxzIG9uIHRoZSBpbml0IGZ1bmN0aW9uIHRoYXQgY29udGFpbnNcbiAgICAvL2FsbCB0aGUgc3RlcHMgdG8gcGVyZm9ybSB0aGUgdGFzay5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gbnVsbDsgLy8gdGhpcyB3aWxsIHN0b3JlIGFsbCBvdXIgZGF0YVxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbnVsbDsgLy8gc3RvcmVzIHNwZWNpZmljYWxseSB0aGUgcHJvZHVjdHNcbiAgICAgICAgdGhpcy5jYXRhbG9nVmlldyA9IG5ldyBDYXRhbG9nVmlldygpOyAvLyB0aGlzIHdpbGwgZGlzcGxheSBvdXIgZGF0YVxuICAgICAgICB0aGlzLnNob3BwaW5nQ2FydCA9IG5ldyBTaG9wcGluZ0NhcnQoKTtcbiAgICAgICAgdGhpcy5zaG9wcGluZ0NhcnRWaWV3ID0gbmV3IFNob3BwaW5nQ2FydFZpZXcoKTtcbiAgICAgICAgLy8gdGhpcy5cbiAgICAgICAgLy8gY2FsbCB0aGUgaW5pdEJlc3RCdXlXZWJTZXJ2aWNlIHRvIGluaXRpYWxpemUgdGhlXG4gICAgICAgIC8vIEJlc3RCdXkgV2ViIFNlcnZpY2UgYW5kIHJldHVybiB0aGUgZGF0YVxuICAgICAgICB0aGlzLmluaXRCZXN0QnV5V2ViU2VydmljZSgpO1xuICAgICAgICB0aGlzLmluaXRTaG9wcGluZ0NhcnQoKTtcbiAgICAgICAgdGhpcy5jbGVhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItY2FydFwiKTtcbiAgICAgICAgdGhpcy5jbGVhciA9IGFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrQ2xlYXIodGhpcyksIGZhbHNlKTtcbiAgICAgICAgLy8gdGhpcy5pbml0U2hvcHBpbmdDYXJ0VmlldygpO1xuICAgIH1cblxuICAgIGNsaWNrQ2xlYXIodGhlQXBwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmNsZWFyQ2FydCh0aGVBcHAucHJvZHVjdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vaW4gdGhpcyBpbml0IGZ1bmN0aW9uXG4gICAgaW5pdEJlc3RCdXlXZWJTZXJ2aWNlKCl7XG4gICAgICAgIC8vdGhpcyBhcHAncyBiZXN0YnV5d2Vic2VydmljZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgQmVzdEJ1eSBXZWIgU2VydmljZVxuICAgICAgICAvL2dvIHRvIGJlc3RidXl3ZWJzZXJ2aWNlIGFuZCBydW4gYWxsIGl0cyBwcm9wZXJ0aWVzIGFuZCBmdW5jdGlvbnNcbiAgICAgICAgdGhpcy5iYndzID0gbmV3IEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIC8vdGhpcyBhcHAncyB3ZWJzZXJ2aWNlJ3MgYXBpIGtleSBpczpcbiAgICAgICAgLy8gdXNlIHlvdXIgb3duIEFQSSBrZXkgZm9yIHRoaXMgKHRoZSBvbmUgZnJvbSBDb2R5KVxuICAgICAgICB0aGlzLmJid3MuYXBpS2V5ID0gXCI4Y2NkZGY0cnRqejVrNWJ0cWFtODRxYWtcIjtcblxuICAgICAgICAvL3RoaXMgYXBwJ3Mgd2Vic2VydmljZSdzIHVybCB0byBvYnRhaW4gdGhlIHByb2R1Y3QgZGF0YSBpczpcbiAgICAgICAgLy8gdGhpcyB1c2VzICdiYWNrdGlja3MnIGZvciBsb25nIG11bHRpLWxpbmUgc3RyaW5nc1xuICAgICAgICB0aGlzLmJid3MudXJsID0gYGh0dHBzOi8vYXBpLmJlc3RidXkuY29tL3YxL3Byb2R1Y3RzKChjYXRlZ29yeVBhdGguaWQ9YWJjYXQwNTAyMDAwKSk/YXBpS2V5PSR7dGhpcy5iYndzLmFwaUtleX0mZm9ybWF0PWpzb25gO1xuXG4gICAgICAgIC8vIHBhc3MgdGhlIHJlZmVyZW5jZSB0byB0aGlzIGFwcCB0byBzdG9yZSB0aGUgZGF0YVxuICAgICAgICAvL3Bhc3NpbmcgdGhlIHdlYnNlcnZpY2UgdG8gcmVjZWl2ZSB0aGUgZGF0YSwgd2hpY2ggaXQgZ3JhYnMgYW5kIHRoZW4gcmV0dXJucyBpdCB0b1xuICAgICAgICAvL3RoaXMgYXBwLiBcbiAgICAgICAgLy90aGlzIGJlc3RidXkgd2Vic2VydmljZSBpcyByZWNlaXZpbmcgdGhlXG4gICAgICAgIC8vdGhlIGJlc3RidXkgd2Vic2VydmljZSBuZWVkcyB0byBrbm93IGFib3V0IFRISVMgYXBwLSBpdCBuZWVkcyB0aGUgcHJvZHVjdHMgZGF0YSBhbmRcbiAgICAgICAgLy90aGUgcHJvZHVjdHMuICBUaG9zZSBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgZmlsbGVkIHdpdGggdmFsdWVzLlxuICAgICAgICB0aGlzLmJid3MuZ2V0RGF0YSh0aGlzKTtcbiAgICAgICAgLy93aGVuIHdlIHJ1biBnZXREYXRhLCB3ZSBhcmUgcGFzc2luZyB0aGUgYXBwLmpzIHRvIEJlc3RCdXlXZWJzZXJ2aWNlIHRvIHBvcHVsYXRlIHRoZVxuICAgICAgICAvL2xpc3Qgb2YgcHJvZHVjdHMgaW4gdGhlIGFwcC4gXG5cbiAgICB9XG5cbiAgICBwcmVwQ2F0YWxvZygpe1xuICAgICAgICAvLyB1c2UgdGhpcyBjb25zb2xlLmxvZyB0byB0ZXN0IHRoZSBkYXRhXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdERhdGEpO1xuXG4gICAgICAgIC8vaWYgdGhlcmUgaXMgYWN0dWFsbHkgcHJvZHVjdCBkYXRhLCB0aGVuIHRoaXMgKHRoZUFwcClcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgIC8vIG9ubHkgZ2V0IHRoZSBwcm9kdWN0cyBwcm9wZXJ0eSAoZm9yIG5vdylcbiAgICAgICAgICAgIC8vIHRoaXMgY29kZSB3YXMgY29waWVkIGZyb20gU2ltcGxlSFRUUFJlcXVlc3QuaHRtbFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMuYmJ3cy5nZXRQcm9kdWN0cygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dDYXRhbG9nKCk7XG59XG4gICAgc2hvd0NhdGFsb2coKSB7XG5cbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNhdGFsb2cgb25seSBpZiB0aGVyZSBhcmUgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy9wYXNzIHRoZSBwcm9kdWN0cyB0byB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAgIHRoaXMuY2F0YWxvZ1ZpZXcuYWRkUHJvZHVjdHNUb0Nhcm91c2VsKHRoaXMucHJvZHVjdHMsdGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmNhdGFsb2dWaWV3LnNob3dDYXRhbG9nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2hvcHBpbmdDYXJ0KCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNhcnQnLCB0aGlzLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgICAgICAgIGxldCB0aGVBcHAgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydFZpZXcuc2hvd0NhcnRQb3B1cCh0aGVBcHAucHJvZHVjdHMpO1xuICAgICAgICAgICAgJChcIi5jYXJ0Vmlld1wiKS5mYWRlSW4oKTsgICAgIFxuICAgICAgICB9KVxuICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jbG9zZScsIHRoaXMsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICQoXCIuY2FydFZpZXdcIikuZmFkZU91dCgpO1xuICAgICAgICB9KTsgXG4gICAgfVxufVxuXG5cblxuIC8vIGV2ZW50LmRhdGEudGhlQXBwLlNob3BwaW5nQ2FydFxuICAgICAgICAgICAgLy8gJChcIiNkaXYyXCIpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgICAgICAvLyAkKFwiI2RpdjNcIikuZmFkZUluKDMwMDApO1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            //serviceChannel is the connection between our site and BestBuy\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            //listen to when the state changes in the serviceChannel\n            //we are passing theApp to the resultsPreprocessor function (which happens when the\n            //event occurs)\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            //we need to open the serviceChannel to get the data from BestBuy (the URL), \"GET\" is what will grab\n            //the data. \"Ture\" = the browser will continue to do things while it waits for the data.\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n\n        //resultsPreprocessor is the \"middle-man\" in this scenario \n\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            // let thisService = this BestBuywebservice file\n            var thisService = this; // a reference to the instance created from this class\n            //\n            var eventHandler = function eventHandler(evt) {\n                //we can't just write \"this\" to call on the bestbuywebservice file, since\n                //we would be calling it within a funciton, so it would only exist within this\n                //function. Therefore, we use thisServie, which we declared as the entire\n                //BestBuywebservice above. \n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n\n                //bestbuywebservce has the product data, and it matches the event target, so we are\n                //assigning it/storing it\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n\n                //now the app has a copy of the bestbuy api data as well; we assigned it below:\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n\n                //below we are telling theApp file to prepare the catalog\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                //if there is product data, then PARSE the data (convert to array of objects)\n                var jsonData = JSON.parse(this.productData);\n\n                //gets another copy of the data, which is explicity the PRODUCTS (not all the other\n                //data)\n                this.products = jsonData.products;\n\n                //return just the PRODUCTS, which gets stored in the products property of the app.\n                return this.products;\n            }\n            //return the data to theApp.\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQztBQUNBO0FBQ0E7QUFDREssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQTtBQUNBO0FBQ0FDLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCVCxHQUExQixFQUE4QixJQUE5QjtBQUNBSywyQkFBZUssSUFBZjtBQUNIOztBQUVEOzs7OzRDQUNvQk4sTSxFQUFPO0FBQ3ZCOztBQUVBO0FBQ0EsZ0JBQUlPLGNBQWMsSUFBbEIsQ0FKdUIsQ0FJQztBQUN4QjtBQUNBLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FGLDRCQUFZRyxPQUFaLENBQW9CRCxHQUFwQixFQUF3QlQsTUFBeEI7QUFDSCxhQU5EO0FBT0EsbUJBQU9RLFlBQVA7QUFDSDs7O2dDQUVPQyxHLEVBQUlULE0sRUFBTzs7QUFFZixnQkFBSVMsSUFBSUUsTUFBSixDQUFXQyxVQUFYLElBQXlCLENBQXpCLElBQThCSCxJQUFJRSxNQUFKLENBQVdFLE1BQVgsSUFBcUIsR0FBdkQsRUFBMkQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLHFCQUFLZixXQUFMLEdBQW1CVyxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9GLFdBQVAsR0FBcUJXLElBQUlFLE1BQUosQ0FBV0csWUFBaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9lLFdBQVA7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1Q7QUFDQTtBQUNBLGdCQUFHLEtBQUtqQixXQUFMLElBQWtCLElBQXJCLEVBQTBCO0FBQ3RCO0FBQ0Qsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7O0FBRUE7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCaUIsU0FBU2pCLFFBQXpCOztBQUVBO0FBQ0EsdUJBQU8sS0FBS0EsUUFBWjtBQUNGO0FBQ0Q7QUFDQSxtQkFmUyxDQWVEO0FBQ1g7Ozs7OztrQkEvRmdCSixpQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZXN0QnV5V2ViU2VydmljZXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudXJsID1cIlwiO1xuICAgICAgICB0aGlzLmFwaUtleSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldERhdGEodGhlQXBwKXtcbiAgICAgICAgLy8gdGhlQXBwIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYWluIGFwcFxuICAgICAgICAvLyB3ZSBjYW4gcGFzcyBpbmZvcm1hdGlvbiB0byBpdCwgaW5jbHVkaW5nIGRhdGFcbiAgICAgICAgLy8gdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoaXMgc2VydmljZVxuXG4gICAgICAgIC8vc2VydmljZUNoYW5uZWwgaXMgdGhlIGNvbm5lY3Rpb24gYmV0d2VlbiBvdXIgc2l0ZSBhbmQgQmVzdEJ1eVxuXG4gICAgICAgIGxldCBzZXJ2aWNlQ2hhbm5lbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy51cmw7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy8gKioqIFRvIHNvbHZlIHRoZSBpc3N1ZSBvZiBwYXNzaW5nIHRoZSBkYXRhIGJhY2sgdG8gdGhlIG1haW4gYXBwLi4uXG4gICAgICAgIC8vICoqKiBhbmQgZXZlbnR1YWxseSwgdG8gY2F0YWxvZ1ZpZXdcbiAgICAgICAgLy8gKioqIFlvdSBjb3VsZCB0aGUgYWRkRXZlbnRMaXN0ZW5lciB0byBjYWxsXG4gICAgICAgIC8vICoqKiBhIGRpZmZlcmVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGhhdmUgYm90aFxuICAgICAgICAvLyAqKiogdGhlIGV2ZW50IG9iamVjdCBhbmQgZGF0YVBsYWNlSG9sZGVyIGFzIHBhcmFtZXRlcnNcbiAgICAgICAgLy8gKioqIHNlZSBodHRwOi8vYml0Lmx5L2pzLXBhc3Ntb3JlYXJnc2V2ZW50XG4gICAgICAgICAqL1xuXG4gICAgICAgICAvL2xpc3RlbiB0byB3aGVuIHRoZSBzdGF0ZSBjaGFuZ2VzIGluIHRoZSBzZXJ2aWNlQ2hhbm5lbFxuICAgICAgICAgLy93ZSBhcmUgcGFzc2luZyB0aGVBcHAgdG8gdGhlIHJlc3VsdHNQcmVwcm9jZXNzb3IgZnVuY3Rpb24gKHdoaWNoIGhhcHBlbnMgd2hlbiB0aGVcbiAgICAgICAgIC8vZXZlbnQgb2NjdXJzKVxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgLy93ZSBuZWVkIHRvIG9wZW4gdGhlIHNlcnZpY2VDaGFubmVsIHRvIGdldCB0aGUgZGF0YSBmcm9tIEJlc3RCdXkgKHRoZSBVUkwpLCBcIkdFVFwiIGlzIHdoYXQgd2lsbCBncmFiXG4gICAgICAgIC8vdGhlIGRhdGEuIFwiVHVyZVwiID0gdGhlIGJyb3dzZXIgd2lsbCBjb250aW51ZSB0byBkbyB0aGluZ3Mgd2hpbGUgaXQgd2FpdHMgZm9yIHRoZSBkYXRhLlxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5zZW5kKCk7XG4gICAgfVxuXG4gICAgLy9yZXN1bHRzUHJlcHJvY2Vzc29yIGlzIHRoZSBcIm1pZGRsZS1tYW5cIiBpbiB0aGlzIHNjZW5hcmlvIFxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICAvLyBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzIEJlc3RCdXl3ZWJzZXJ2aWNlIGZpbGVcbiAgICAgICAgbGV0IHRoaXNTZXJ2aWNlID0gdGhpczsgLy8gYSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIGNyZWF0ZWQgZnJvbSB0aGlzIGNsYXNzXG4gICAgICAgIC8vXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBmdW5jdGlvbihldnQpe1xuICAgICAgICAgICAgLy93ZSBjYW4ndCBqdXN0IHdyaXRlIFwidGhpc1wiIHRvIGNhbGwgb24gdGhlIGJlc3RidXl3ZWJzZXJ2aWNlIGZpbGUsIHNpbmNlXG4gICAgICAgICAgICAvL3dlIHdvdWxkIGJlIGNhbGxpbmcgaXQgd2l0aGluIGEgZnVuY2l0b24sIHNvIGl0IHdvdWxkIG9ubHkgZXhpc3Qgd2l0aGluIHRoaXNcbiAgICAgICAgICAgIC8vZnVuY3Rpb24uIFRoZXJlZm9yZSwgd2UgdXNlIHRoaXNTZXJ2aWUsIHdoaWNoIHdlIGRlY2xhcmVkIGFzIHRoZSBlbnRpcmVcbiAgICAgICAgICAgIC8vQmVzdEJ1eXdlYnNlcnZpY2UgYWJvdmUuIFxuICAgICAgICAgICAgdGhpc1NlcnZpY2UucmVzdWx0cyhldnQsdGhlQXBwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyXG4gICAgfTtcblxuICAgIHJlc3VsdHMoZXZ0LHRoZUFwcCl7XG5cbiAgICAgICAgaWYgKGV2dC50YXJnZXQucmVhZHlTdGF0ZSA9PSA0ICYmIGV2dC50YXJnZXQuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAvLyBhc3NpZ24gdGhpcyBpbnN0YW5jZSdzIHByb2R1Y3REYXRhIHRvIGJlIHRoZSByZXNwb25zZVRleHRcblxuICAgICAgICAgICAgLy9iZXN0YnV5d2Vic2VydmNlIGhhcyB0aGUgcHJvZHVjdCBkYXRhLCBhbmQgaXQgbWF0Y2hlcyB0aGUgZXZlbnQgdGFyZ2V0LCBzbyB3ZSBhcmVcbiAgICAgICAgICAgIC8vYXNzaWduaW5nIGl0L3N0b3JpbmcgaXRcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBldnQudGFyZ2V0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGUgYXBwJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dCB0b29cblxuICAgICAgICAgICAgLy9ub3cgdGhlIGFwcCBoYXMgYSBjb3B5IG9mIHRoZSBiZXN0YnV5IGFwaSBkYXRhIGFzIHdlbGw7IHdlIGFzc2lnbmVkIGl0IGJlbG93OlxuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuXG4gICAgICAgICAgICAvL2JlbG93IHdlIGFyZSB0ZWxsaW5nIHRoZUFwcCBmaWxlIHRvIHByZXBhcmUgdGhlIGNhdGFsb2dcbiAgICAgICAgICAgIHRoZUFwcC5wcmVwQ2F0YWxvZygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZXhwbGljaXR5IGdldHMgdGhlIHByb2R1Y3RzIHByb3BlcnR5XG4gICAgICAgIC8vIGZyb20gdGhlIEpTT04gb2JqZWN0LiBpdCBhc3N1bWVzIHlvdSBoYXZlIHRoZSBKU09OIGRhdGFcbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGlzIHByb2R1Y3QgZGF0YSwgdGhlbiBQQVJTRSB0aGUgZGF0YSAoY29udmVydCB0byBhcnJheSBvZiBvYmplY3RzKVxuICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMucHJvZHVjdERhdGEpO1xuXG4gICAgICAgICAgIC8vZ2V0cyBhbm90aGVyIGNvcHkgb2YgdGhlIGRhdGEsIHdoaWNoIGlzIGV4cGxpY2l0eSB0aGUgUFJPRFVDVFMgKG5vdCBhbGwgdGhlIG90aGVyXG4gICAgICAgICAgIC8vZGF0YSlcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuXG4gICAgICAgICAgIC8vcmV0dXJuIGp1c3QgdGhlIFBST0RVQ1RTLCB3aGljaCBnZXRzIHN0b3JlZCBpbiB0aGUgcHJvZHVjdHMgcHJvcGVydHkgb2YgdGhlIGFwcC5cbiAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gdGhlIGRhdGEgdG8gdGhlQXBwLlxuICAgICAgICByZXR1cm47IC8vIGlmIHdlIGhhdmUgbm8gZGF0YSwgcmV0dXJuIG5vdGhpbmdcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\n\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n        // this.initCarousel();\n        //creating a property for theApp, that is null right now.\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    rtl: true,\n                    loop: true,\n                    margin: 10,\n                    nav: true,\n                    autoplay: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        },\n                        600: {\n                            items: 2\n                        },\n                        1000: {\n                            items: 4\n                        }\n                    }\n                });\n            });\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n            //console.log the event object\n            //console.log(e.target.getAttribute(\"data-sku\"));\n            //we are declaring the sku and finding it in the event object's target\n            //let theSku = e.target.getAttribute(\"data-sku\");\n            //this file as theApp property and has a shopping cart, which has a function\n            //called addItemToCart, where we could pass the sku.\n            // console.log(theApp);\n            // this.theApp.shoppingCart.addItemToCart(theSku);\n\n            return function (e) {\n                console.log(theApp);\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n                theApp.shoppingCart.removeItemFromCart(theSku);\n                theApp.shoppingCart.initShoppingCart(theSku);\n                // if(sessionStorage.getItem(\"Quantity\") == undefined) {\n                //     sessionStorage.setItem(\"Quantity\", 1);\n                // }\n                // else {\n                //     let newQuantity = sessionStorage.getItem(\"Quantity\");\n                //     newQuantity = parseInt(newQuantity);\n                //     newQuantity = newQuantity + 1;\n                //     sessionStorage.setItem (\"Quantity\", newQuantity);\n                // }\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n                //<div class=\"product-wrapper\"></div>\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"img\");\n                newImg.setAttribute(\"src\", product.image);\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.longDescription);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n                //<h3>TEXT NODE</h3>\n                //createTextNode create a space to place text within an element\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n                quickViewButton.addEventListener(\"click\", this.showQv(this.theApp), false);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"type\", \"button\");\n                var addCartTextNode = document.createTextNode(\"Add to Cart\");\n                addToCartButton.appendChild(addCartTextNode);\n                console.log(\"how many time am i running\");\n                //we added the \"this\" so that it knows to search \"this\" file for the function\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                //at the top, we have the new elements within the div created.  Below, \n                //we are appending (or placing) the new elements with the data.\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton); // added new quickView button\n                newDiv.appendChild(addToCartButton);\n                this.carousel[0].appendChild(newDiv);\n                var qvButtonId = \"#qv_\" + product.sku;\n                $(qvButtonId).on(\"click\", function (e) {\n                    console.log(\"I clicked on the button\");\n                    $(\".quick-view\").fadeIn();\n                    $(\".qv-close\").on(\"click\", function (e) {\n                        $(\".quick-view\").fadeOut();\n                    });\n                });\n            }\n            this.initCarousel();\n        }\n    }, {\n        key: \"showQv\",\n        value: function showQv(products) {\n            console.log(products);\n            var output = \"\";\n            var QuickView = $('.quick-view');\n            //maybe insert something here if the shopping cart is empty:\n            //if(sessionStorage.length == 0) {\n            //return ;\n            //  }\n            $(\".qv-info\").html(\"\");\n\n            for (var i = 0; i < sessionStorage.length; i++) {\n                var currentSku = sessionStorage.key(i); //this is a string\n                var currentQuantity = sessionStorage.getItem(currentSku); //this is a string\n                //we are running a loop within a loop, but there are more efficient ways\n                //to do this: there is an array object method called \"filter\"\n                for (var p = 0; p < products.length; p++) {\n                    var currentProduct = products[p];\n                    var productSku = currentProduct.sku;\n                    productSku = productSku.toString();\n                    if (productSku == currentSku) {\n                        // let image = currentProduct.image;\n                        // let name = currentProduct.name;\n                        // let price = currentProduct.regularPrice;\n                        // += : equals plus\n                        output += \"<div id=\\\"flex-container\\\" class=\\\"qv-product-info\\\">\\n                                    <img class=\\\"qv-image\\\" src= \\\"\" + currentProduct.image + \"\\\" alt= \\\"\" + name + \"\\\">\\n                                    \\n                                    <p class=\\\"qv-price\\\"> \" + currentProduct.regularPrice + \" </p>\\n                                    <input id=\\\"add\\\" type=\\\"number\\\" value=\" + currentQuantity + \">\\n                                    <button type=\\\"button\\\" class=\\\"qv-add\\\">Add to Cart</button>\\n                                    </div>\\n                                    \";\n                    }\n                    // <p class=\"cart-name\"> ${name} </p>\n                }\n            }\n            $('.qv-info').append(output);\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGhlQXBwIiwiJCIsInJlYWR5Iiwib3dsQ2Fyb3VzZWwiLCJydGwiLCJsb29wIiwibWFyZ2luIiwibmF2IiwiYXV0b3BsYXkiLCJyZXNwb25zaXZlIiwiaXRlbXMiLCJlIiwiY29uc29sZSIsImxvZyIsInRoZVNrdSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInNob3BwaW5nQ2FydCIsImFkZEl0ZW1Ub0NhcnQiLCJyZW1vdmVJdGVtRnJvbUNhcnQiLCJpbml0U2hvcHBpbmdDYXJ0IiwicHJvZHVjdHMiLCJ1bmRlZmluZWQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsIm5ld0RpdiIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJuZXdJbWciLCJpbWFnZSIsIm5hbWUiLCJza3UiLCJuZXdQYXJhIiwibmV3UGFyYVRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJsb25nRGVzY3JpcHRpb24iLCJhcHBlbmRDaGlsZCIsIm5ld0gzVGFnIiwibmV3SDNUYWdUZXh0Tm9kZSIsIm5ld1ByaWNlUGFyYSIsIm5ld1ByaWNlUGFyYVRleHROb2RlIiwicmVndWxhclByaWNlIiwicXVpY2tWaWV3QnV0dG9uIiwicXVpY2tWaWV3VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd1F2IiwiYWRkVG9DYXJ0QnV0dG9uIiwiYWRkQ2FydFRleHROb2RlIiwib25DbGlja0NhcnRCdXR0b24iLCJxdkJ1dHRvbklkIiwib24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiaW5pdENhcm91c2VsIiwib3V0cHV0IiwiUXVpY2tWaWV3IiwiaHRtbCIsImkiLCJzZXNzaW9uU3RvcmFnZSIsImN1cnJlbnRTa3UiLCJrZXkiLCJjdXJyZW50UXVhbnRpdHkiLCJnZXRJdGVtIiwi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QUEyQ2tDLEdBQTNDLEVBQWdEO0FBQzVDLG9CQUFJRSxhQUFhRCxlQUFlRSxHQUFmLENBQW1CSCxDQUFuQixDQUFqQixDQUQ0QyxDQUNKO0FBQ3hDLG9CQUFJSSxrQkFBa0JILGVBQWVJLE9BQWYsQ0FBdUJILFVBQXZCLENBQXRCLENBRjRDLENBRWM7QUFDMUQ7QUFDQTtBQUNBLHFCQUFLLElBQUlyQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFNBQVNHLE1BQTdCLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN0Qyx3QkFBSXlDLGlCQUFpQjNDLFNBQVNFLENBQVQsQ0FBckI7QUFDQSx3QkFBSTBDLGFBQWFELGVBQWVoQyxHQUFoQztBQUNJaUMsaUNBQWFBLFdBQVdDLFFBQVgsRUFBYjtBQUNKLHdCQUFJRCxjQUFjTCxVQUFsQixFQUE4QjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBTCxpS0FDMENTLGVBQWVsQyxLQUR6RCxrQkFDeUVDLElBRHpFLDhHQUdtQ2lDLGVBQWV0QixZQUhsRCwyRkFJa0RvQixlQUpsRDtBQVNIO0FBQ2U7QUFDbkI7QUFDSjtBQUNEN0QsY0FBRSxVQUFGLEVBQWNrRSxNQUFkLENBQXFCWixNQUFyQjtBQUVQOzs7Ozs7a0JBNUxnQjNELFciLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vLyB0aGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBwcm9kdWN0IGRhdGEuLi5cbi8vIFBlcmhhcHMgaW4gYSBjYXJvdXNlbC5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1ZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJvd2wtY2Fyb3VzZWxcIik7XG4gICAgICAgIC8vIHRoaXMuaW5pdENhcm91c2VsKCk7XG4gICAgICAgIC8vY3JlYXRpbmcgYSBwcm9wZXJ0eSBmb3IgdGhlQXBwLCB0aGF0IGlzIG51bGwgcmlnaHQgbm93LlxuICAgICAgICB0aGlzLnRoZUFwcCA9IG51bGw7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGluaXRDYXJvdXNlbCgpe1xuICAgXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKCcub3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgIHJ0bDp0cnVlLFxuICAgIGxvb3A6dHJ1ZSxcbiAgICBtYXJnaW46MTAsXG4gICAgbmF2OnRydWUsXG4gICAgYXV0b3BsYXk6dHJ1ZSxcbiAgICByZXNwb25zaXZlOntcbiAgICAgICAgMDp7XG4gICAgICAgICAgICBpdGVtczoxXG4gICAgICAgIH0sXG4gICAgICAgIDYwMDp7XG4gICAgICAgICAgICBpdGVtczoyXG4gICAgICAgIH0sXG4gICAgICAgIDEwMDA6e1xuICAgICAgICAgICAgaXRlbXM6NFxuICAgICAgICB9XG4gICAgfVxufSk7XG59KTtcbn1cbiAgXG4gICAgb25DbGlja0NhcnRCdXR0b24odGhlQXBwKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyB0aGUgZXZlbnQgb2JqZWN0XG4gICAgICAgIC8vY29uc29sZS5sb2coZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIikpO1xuICAgICAgICAvL3dlIGFyZSBkZWNsYXJpbmcgdGhlIHNrdSBhbmQgZmluZGluZyBpdCBpbiB0aGUgZXZlbnQgb2JqZWN0J3MgdGFyZ2V0XG4gICAgICAgIC8vbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICAvL3RoaXMgZmlsZSBhcyB0aGVBcHAgcHJvcGVydHkgYW5kIGhhcyBhIHNob3BwaW5nIGNhcnQsIHdoaWNoIGhhcyBhIGZ1bmN0aW9uXG4gICAgICAgIC8vY2FsbGVkIGFkZEl0ZW1Ub0NhcnQsIHdoZXJlIHdlIGNvdWxkIHBhc3MgdGhlIHNrdS5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhlQXBwKTtcbiAgICAgICAgLy8gdGhpcy50aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHApO1xuICAgICAgICAgICAgbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5hZGRJdGVtVG9DYXJ0KHRoZVNrdSk7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LnJlbW92ZUl0ZW1Gcm9tQ2FydCh0aGVTa3UpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5pbml0U2hvcHBpbmdDYXJ0KHRoZVNrdSk7XG4gICAgICAgICAgICAvLyBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiUXVhbnRpdHlcIikgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIlF1YW50aXR5XCIsIDEpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgbGV0IG5ld1F1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIlF1YW50aXR5XCIpO1xuICAgICAgICAgICAgLy8gICAgIG5ld1F1YW50aXR5ID0gcGFyc2VJbnQobmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgLy8gICAgIG5ld1F1YW50aXR5ID0gbmV3UXVhbnRpdHkgKyAxO1xuICAgICAgICAgICAgLy8gICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0gKFwiUXVhbnRpdHlcIiwgbmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUHJvZHVjdHNUb0Nhcm91c2VsKHByb2R1Y3RzLCB0aGVBcHApe1xuICAgICAgICB0aGlzLnRoZUFwcCA9IHRoZUFwcDtcblxuICAgICAgICBpZiAocHJvZHVjdHMgPT09IHVuZGVmaW5lZCB8fCBwcm9kdWN0cyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybiA7IC8vIGRvIG5vdCBkbyBhbnl0aGluZyEgdGhlcmUgaXMgbm8gZGF0YVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcD0wOyBwPHByb2R1Y3RzLmxlbmd0aDsgcCsrKXtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0ID0gcHJvZHVjdHNbcF07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KTtcbiAgICAgICAgICAgIC8vIGVhY2ggcHJvZHVjdCBpcyBhIHByb2R1Y3Qgb2JqZWN0XG4gICAgICAgICAgICAvLyB1c2UgaXQgdG8gY3JlYXRlIHRoZSBlbGVtZW50XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgRElWIHRhZyB3aXRoIGNsYXNzICdwcm9kdWN0LXdyYXBwZXInXG4gICAgICAgICAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJvZHVjdC13cmFwcGVyXCIpO1xuICAgICAgICAgICAgLy88ZGl2IGNsYXNzPVwicHJvZHVjdC13cmFwcGVyXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBJTUcgdGFnLiBTdWdnZXN0IHRvIGFkZCBkYXRhLXNrdSBhdHRyaWJ1dGUgaGVyZSB0b29cbiAgICAgICAgICAgIC8vIHNvIHRoYXQgaWYgeW91ICdjbGljaycgb24gdGhlIGltYWdlLCBpdCB3b3VsZCBwb3AgdXAgYSBxdWljay12aWV3XG4gICAgICAgICAgICAvLyB3aW5kb3cgYW5kIHlvdSBjYW4gdXNlIHRoZSBza3UuXG4gICAgICAgICAgICBsZXQgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgcHJvZHVjdC5pbWFnZSk7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGAke3Byb2R1Y3QubmFtZX1gKTsgLy8gdGhpcyB3b3JrcyB0b29cbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLHByb2R1Y3Quc2t1KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IFBhcmFncmFwaCB0byBzaG93IGEgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBuZXdQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXR5cGVcIik7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5sb25nRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgbmV3UGFyYS5hcHBlbmRDaGlsZChuZXdQYXJhVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgSDMgdGFnIHRvIHNob3cgdGhlIG5hbWVcbiAgICAgICAgICAgIGxldCBuZXdIM1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgICAgIGxldCBuZXdIM1RhZ1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5uYW1lKTtcbiAgICAgICAgICAgIG5ld0gzVGFnLmFwcGVuZENoaWxkKG5ld0gzVGFnVGV4dE5vZGUpO1xuICAgICAgICAgICAgLy88aDM+VEVYVCBOT0RFPC9oMz5cbiAgICAgICAgICAgIC8vY3JlYXRlVGV4dE5vZGUgY3JlYXRlIGEgc3BhY2UgdG8gcGxhY2UgdGV4dCB3aXRoaW4gYW4gZWxlbWVudFxuXG4gICAgICAgICAgICBsZXQgbmV3UHJpY2VQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBuZXdQcmljZVBhcmEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByaWNlXCIpO1xuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5yZWd1bGFyUHJpY2UpO1xuICAgICAgICAgICAgbmV3UHJpY2VQYXJhLmFwcGVuZENoaWxkKG5ld1ByaWNlUGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IHF1aWNrVmlld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYHF2XyR7cHJvZHVjdC5za3V9YCk7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIiwgcHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBsZXQgcXVpY2tWaWV3VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlF1aWNrIFZpZXdcIik7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uYXBwZW5kQ2hpbGQocXVpY2tWaWV3VGV4dE5vZGUpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNob3dRdih0aGlzLnRoZUFwcCkgLCBmYWxzZSk7XG5cblxuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGNhcnRfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGxldCBhZGRDYXJ0VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCB0byBDYXJ0XCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFwcGVuZENoaWxkKGFkZENhcnRUZXh0Tm9kZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhvdyBtYW55IHRpbWUgYW0gaSBydW5uaW5nXCIpXG4gICAgICAgICAgICAvL3dlIGFkZGVkIHRoZSBcInRoaXNcIiBzbyB0aGF0IGl0IGtub3dzIHRvIHNlYXJjaCBcInRoaXNcIiBmaWxlIGZvciB0aGUgZnVuY3Rpb25cbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrQ2FydEJ1dHRvbih0aGlzLnRoZUFwcCkgLGZhbHNlKTtcblxuXG4gICAgICAgICAgICAvL2F0IHRoZSB0b3AsIHdlIGhhdmUgdGhlIG5ldyBlbGVtZW50cyB3aXRoaW4gdGhlIGRpdiBjcmVhdGVkLiAgQmVsb3csIFxuICAgICAgICAgICAgLy93ZSBhcmUgYXBwZW5kaW5nIChvciBwbGFjaW5nKSB0aGUgbmV3IGVsZW1lbnRzIHdpdGggdGhlIGRhdGEuXG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChxdWlja1ZpZXdCdXR0b24pOyAvLyBhZGRlZCBuZXcgcXVpY2tWaWV3IGJ1dHRvblxuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGFkZFRvQ2FydEJ1dHRvbik7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsWzBdLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgICAgICBsZXQgcXZCdXR0b25JZCA9IGAjcXZfJHtwcm9kdWN0LnNrdX1gO1xuICAgICAgICAgICAgJChxdkJ1dHRvbklkKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSBjbGlja2VkIG9uIHRoZSBidXR0b25cIik7XG4gICAgICAgICAgICAgICAgJChcIi5xdWljay12aWV3XCIpLmZhZGVJbigpO1xuICAgICAgICAgICAgJChcIi5xdi1jbG9zZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAkKFwiLnF1aWNrLXZpZXdcIikuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdENhcm91c2VsKCk7XG5cbiAgICB9XG4gICAgc2hvd1F2KHByb2R1Y3RzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IFwiXCI7XG4gICAgICAgIGxldCBRdWlja1ZpZXcgPSAkKCcucXVpY2stdmlldycpO1xuICAgICAgICAgICAgLy9tYXliZSBpbnNlcnQgc29tZXRoaW5nIGhlcmUgaWYgdGhlIHNob3BwaW5nIGNhcnQgaXMgZW1wdHk6XG4gICAgICAgICAgICAvL2lmKHNlc3Npb25TdG9yYWdlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gO1xuICAgICAgICAgICAgLy8gIH1cbiAgICAgICAgICAgICQoXCIucXYtaW5mb1wiKS5odG1sKFwiXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlc3Npb25TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTa3UgPSBzZXNzaW9uU3RvcmFnZS5rZXkoaSk7IC8vdGhpcyBpcyBhIHN0cmluZ1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpOyAvL3RoaXMgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAvL3dlIGFyZSBydW5uaW5nIGEgbG9vcCB3aXRoaW4gYSBsb29wLCBidXQgdGhlcmUgYXJlIG1vcmUgZWZmaWNpZW50IHdheXNcbiAgICAgICAgICAgICAgICAvL3RvIGRvIHRoaXM6IHRoZXJlIGlzIGFuIGFycmF5IG9iamVjdCBtZXRob2QgY2FsbGVkIFwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHByb2R1Y3RzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdFNrdSA9IGN1cnJlbnRQcm9kdWN0LnNrdTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RTa3UgPSBwcm9kdWN0U2t1LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0U2t1ID09IGN1cnJlbnRTa3UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBpbWFnZSA9IGN1cnJlbnRQcm9kdWN0LmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IG5hbWUgPSBjdXJyZW50UHJvZHVjdC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHByaWNlID0gY3VycmVudFByb2R1Y3QucmVndWxhclByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKz0gOiBlcXVhbHMgcGx1c1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGlkPVwiZmxleC1jb250YWluZXJcIiBjbGFzcz1cInF2LXByb2R1Y3QtaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInF2LWltYWdlXCIgc3JjPSBcIiR7Y3VycmVudFByb2R1Y3QuaW1hZ2V9XCIgYWx0PSBcIiR7bmFtZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJxdi1wcmljZVwiPiAke2N1cnJlbnRQcm9kdWN0LnJlZ3VsYXJQcmljZX0gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYWRkXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPSR7Y3VycmVudFF1YW50aXR5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicXYtYWRkXCI+QWRkIHRvIENhcnQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8cCBjbGFzcz1cImNhcnQtbmFtZVwiPiAke25hbWV9IDwvcD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcucXYtaW5mbycpLmFwcGVuZChvdXRwdXQpO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhdGFsb2dWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            // you can create a shoppingCart!\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart(sku) {\n            if (sessionStorage.getItem(sku) !== \"undefined\") {\n                if (sessionStorage.quantity) {\n                    sessionStorage.quantity = Number(sessionStorage.quantity) + 1;\n                } else {\n                    sessionStorage.quantity = 0;\n                }\n            }\n            //this \"helperClick\" is just listening for stuff/clicks - will fire all the\n            // jquery on.(\"click\")\n            //document.on.(\"click\")\n            //this.\"helperClick()\"\n            //function showQuickView(item) - pass the item data\n            //a.stringify();\n            // $(\"\")\n\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n            console.log(this);\n            var theSku = sku;\n            if (sessionStorage.getItem(sku) == undefined) {\n                sessionStorage.setItem(sku, 1);\n                return;\n            }\n            //loop through the skus until it finds the matching sku\n            else {\n                    for (var i = 0; i < sessionStorage.length; i++) {\n                        var currentSku = sessionStorage.key(i);\n                        if (currentSku.toString() == theSku.toString()) {\n                            var currentValue = sessionStorage.getItem(currentSku);\n                            currentValue = parseInt(currentValue) + 1;\n                            //currentValue = currentValue + 1;\n                            sessionStorage.setItem(theSku, currentValue);\n                        }\n                    }\n                }\n        }\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku) {\n            //reset current quantity to zero\n            //if quantity is zero, display none.\n        }\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, qty) {}\n\n        // clearCart(){\n        //     sessionStorage.clear();\n        //     $(\"cartView\").html(\"\");\n        // }\n\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJpbml0U2hvcHBpbmdDYXJ0Iiwic2t1Iiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwicXVhbnRpdHkiLCJOdW1iZXIiLCJ0aGVTa3UiLCJ1bmRlZmluZWQiLCJzZXRJdGVtIiwiaSIsImxlbmd0aCIsImN1cnJlbnRTa3UiLCJrZXkiLCJ0b1N0cmluZyIsImN1cnJlbnRWYWx1ZSIsInBhcnNlSW50IiwicXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLFk7QUFFakIsNEJBQWE7QUFBQTs7QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLFlBQUdDLE9BQUgsRUFBVztBQUNQO0FBQ0EsaUJBQUtDLGdCQUFMO0FBQ0gsU0FIRCxNQUlBO0FBQ0lILG9CQUFRQyxHQUFSLENBQVksc0RBQVo7QUFDSDtBQUNKOzs7O3lDQUVnQkcsRyxFQUFJO0FBQ2pCLGdCQUFJQyxlQUFlQyxPQUFmLENBQXVCRixHQUF2QixNQUFnQyxXQUFwQyxFQUFpRDtBQUM3QyxvQkFBSUMsZUFBZUUsUUFBbkIsRUFBNkI7QUFDekJGLG1DQUFlRSxRQUFmLEdBQTBCQyxPQUFPSCxlQUFlRSxRQUF0QixJQUFnQyxDQUExRDtBQUNILGlCQUZELE1BRU87QUFDSEYsbUNBQWVFLFFBQWYsR0FBMEIsQ0FBMUI7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFQLG9CQUFRQyxHQUFSLENBQVksaUNBQVo7QUFDSDs7O3NDQUVhRyxHLEVBQUk7QUFDZEosb0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsZ0JBQUlRLFNBQVNMLEdBQWI7QUFDQSxnQkFBSUMsZUFBZUMsT0FBZixDQUF1QkYsR0FBdkIsS0FBK0JNLFNBQW5DLEVBQThDO0FBQzFDTCwrQkFBZU0sT0FBZixDQUF1QlAsR0FBdkIsRUFBNEIsQ0FBNUI7QUFDQTtBQUNIO0FBQ0Q7QUFKQSxpQkFLSztBQUNELHlCQUFLLElBQUlRLElBQUksQ0FBYixFQUFnQkEsSUFBR1AsZUFBZVEsTUFBbEMsRUFBMENELEdBQTFDLEVBQStDO0FBQzNDLDRCQUFJRSxhQUFhVCxlQUFlVSxHQUFmLENBQW1CSCxDQUFuQixDQUFqQjtBQUNBLDRCQUFJRSxXQUFXRSxRQUFYLE1BQXlCUCxPQUFPTyxRQUFQLEVBQTdCLEVBQWdEO0FBQzVDLGdDQUFJQyxlQUFlWixlQUFlQyxPQUFmLENBQXVCUSxVQUF2QixDQUFuQjtBQUNBRywyQ0FBZUMsU0FBU0QsWUFBVCxJQUF1QixDQUF0QztBQUNBO0FBQ0FaLDJDQUFlTSxPQUFmLENBQXVCRixNQUF2QixFQUErQlEsWUFBL0I7QUFDSDtBQUVKO0FBQ0o7QUFDSjs7OzJDQUVrQmIsRyxFQUFJO0FBQ25CO0FBQ0E7QUFDSDs7O21EQUUwQkEsRyxFQUFJZSxHLEVBQUksQ0FFbEM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7a0JBbEVpQnBCLFkiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0e1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgICAgICBpZihTdG9yYWdlKXtcbiAgICAgICAgICAgIC8vIHlvdSBjYW4gY3JlYXRlIGEgc2hvcHBpbmdDYXJ0IVxuICAgICAgICAgICAgdGhpcy5pbml0U2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yISBTZXNzaW9uU3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlciFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2hvcHBpbmdDYXJ0KHNrdSl7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHNrdSkgIT09IFwidW5kZWZpbmVkXCIpIHsgXG4gICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UucXVhbnRpdHkpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5xdWFudGl0eSA9IE51bWJlcihzZXNzaW9uU3RvcmFnZS5xdWFudGl0eSkrMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucXVhbnRpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vdGhpcyBcImhlbHBlckNsaWNrXCIgaXMganVzdCBsaXN0ZW5pbmcgZm9yIHN0dWZmL2NsaWNrcyAtIHdpbGwgZmlyZSBhbGwgdGhlXG4gICAgICAgIC8vIGpxdWVyeSBvbi4oXCJjbGlja1wiKVxuICAgICAgICAvL2RvY3VtZW50Lm9uLihcImNsaWNrXCIpXG4gICAgICAgIC8vdGhpcy5cImhlbHBlckNsaWNrKClcIlxuICAgICAgICAvL2Z1bmN0aW9uIHNob3dRdWlja1ZpZXcoaXRlbSkgLSBwYXNzIHRoZSBpdGVtIGRhdGFcbiAgICAgICAgLy9hLnN0cmluZ2lmeSgpO1xuICAgICAgICAvLyAkKFwiXCIpXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2hlZCBjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgIH1cblxuICAgIGFkZEl0ZW1Ub0NhcnQoc2t1KXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIGxldCB0aGVTa3UgPSBza3U7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHNrdSkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNrdSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdGhlIHNrdXMgdW50aWwgaXQgZmluZHMgdGhlIG1hdGNoaW5nIHNrdVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDxzZXNzaW9uU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2t1ID0gc2Vzc2lvblN0b3JhZ2Uua2V5KGkpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2t1LnRvU3RyaW5nKCkgPT0gdGhlU2t1LnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oY3VycmVudFNrdSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHBhcnNlSW50KGN1cnJlbnRWYWx1ZSkrMTtcbiAgICAgICAgICAgICAgICAgICAgLy9jdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgKyAxO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoZVNrdSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJdGVtRnJvbUNhcnQoc2t1KXtcbiAgICAgICAgLy9yZXNldCBjdXJyZW50IHF1YW50aXR5IHRvIHplcm9cbiAgICAgICAgLy9pZiBxdWFudGl0eSBpcyB6ZXJvLCBkaXNwbGF5IG5vbmUuXG4gICAgfVxuXG4gICAgdXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHF0eSl7XG5cbiAgICB9XG5cbiAgICAvLyBjbGVhckNhcnQoKXtcbiAgICAvLyAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAvLyAgICAgJChcImNhcnRWaWV3XCIpLmh0bWwoXCJcIik7XG4gICAgLy8gfVxufVxuICBcblxuICAgXG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TaG9wcGluZ0NhcnQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ShoppingCartView = function () {\n\tfunction ShoppingCartView() {\n\t\t_classCallCheck(this, ShoppingCartView);\n\t}\n\n\t_createClass(ShoppingCartView, [{\n\t\tkey: \"showCartPopup\",\n\t\tvalue: function showCartPopup(products) {\n\t\t\tconsole.log(products);\n\t\t\tvar output = \"\";\n\t\t\tvar CartView = $('.cartView');\n\t\t\t//maybe insert something here if the shopping cart is empty:\n\t\t\t//if(sessionStorage.length == 0) {\n\t\t\t//return ;\n\t\t\t//\t}\n\t\t\t$(\".productView\").html(\"\");\n\n\t\t\tfor (var i = 0; i < sessionStorage.length; i++) {\n\t\t\t\tvar currentSku = sessionStorage.key(i); //this is a string\n\t\t\t\tvar currentQuantity = sessionStorage.getItem(currentSku); //this is a string\n\t\t\t\t//we are running a loop within a loop, but there are more efficient ways\n\t\t\t\t//to do this: there is an array object method called \"filter\"\n\t\t\t\tfor (var p = 0; p < products.length; p++) {\n\t\t\t\t\tvar currentProduct = products[p];\n\t\t\t\t\tvar productSku = currentProduct.sku;\n\t\t\t\t\tproductSku = productSku.toString();\n\t\t\t\t\tif (productSku == currentSku) {\n\t\t\t\t\t\t// let image = currentProduct.image;\n\t\t\t\t\t\t// let name = currentProduct.name;\n\t\t\t\t\t\t// let price = currentProduct.regularPrice;\n\t\t\t\t\t\t// += : equals plus\n\t\t\t\t\t\toutput += \"<div id=\\\"flex-container\\\" class=\\\"product-info\\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\\"cart-image\\\" src= \\\"\" + currentProduct.image + \"\\\" alt= \\\"\" + name + \"\\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\\"cart-price\\\"> \" + currentProduct.regularPrice + \" </p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<input id=\\\"add\\\" type=\\\"number\\\" value=\" + currentQuantity + \">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button type=\\\"button\\\" class=\\\"update\\\">Update</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\";\n\t\t\t\t\t}\n\t\t\t\t\t// <p class=\"cart-name\"> ${name} </p>\n\t\t\t\t}\n\t\t\t}\n\t\t\t$('.productView').append(output);\n\t\t}\n\n\t\t// $(\".addToCart\").on(\"click\", function (){\n\t\t//    var inputField = parseInt($(\"#cartQuantity\").val()); \n\t\t//    // increaSE VALUE BY WHEN CLICK THE BUTTON            \n\t\t//     $(\"#cartQuantity\").val(inputField + 1);      \n\t\t//     });      \n\t\t//     $(\".addToCart\").click(function(){ \n\t\t//     //shows the input for cart quantities     \n\t\t//     $(\"#cartQuantity\").show(); \n\t\t// })\n\t\t// });\n\n\t}]);\n\n\treturn ShoppingCartView;\n}();\n\nexports.default = ShoppingCartView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcz81OWU5Il0sIm5hbWVzIjpbIlNob3BwaW5nQ2FydFZpZXciLCJwcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJvdXRwdXQiLCJDYXJ0VmlldyIsIiQiLCJodG1sIiwiaSIsInNlc3Npb25TdG9yYWdlIiwibGVuZ3RoIiwiY3VycmVudFNrdSIsImtleSIsImN1cnJlbnRRdWFudGl0eSIsImdldEl0ZW0iLCJwIiwiY3VycmVudFByb2R1Y3QiLCJwcm9kdWN0U2t1Iiwic2t1IiwidG9TdHJpbmciLCJpbWFnZSIsIm5hbWUiLCJyZWd1bGFyUHJpY2UiLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLGdCO0FBQ3BCLDZCQUFhO0FBQUE7QUFBRTs7OztnQ0FDREMsUSxFQUFVO0FBQ3ZCQyxXQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDQSxPQUFJRyxTQUFTLEVBQWI7QUFDQSxPQUFJQyxXQUFXQyxFQUFFLFdBQUYsQ0FBZjtBQUNDO0FBQ0E7QUFDQztBQUNEO0FBQ0FBLEtBQUUsY0FBRixFQUFrQkMsSUFBbEIsQ0FBdUIsRUFBdkI7O0FBRUEsUUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLGVBQWVDLE1BQW5DLEVBQTJDRixHQUEzQyxFQUFnRDtBQUMvQyxRQUFJRyxhQUFhRixlQUFlRyxHQUFmLENBQW1CSixDQUFuQixDQUFqQixDQUQrQyxDQUNQO0FBQ3hDLFFBQUlLLGtCQUFrQkosZUFBZUssT0FBZixDQUF1QkgsVUFBdkIsQ0FBdEIsQ0FGK0MsQ0FFVztBQUMxRDtBQUNBO0FBQ0EsU0FBSyxJQUFJSSxJQUFJLENBQWIsRUFBZ0JBLElBQUlkLFNBQVNTLE1BQTdCLEVBQXFDSyxHQUFyQyxFQUEwQztBQUN6QyxTQUFJQyxpQkFBaUJmLFNBQVNjLENBQVQsQ0FBckI7QUFDQSxTQUFJRSxhQUFhRCxlQUFlRSxHQUFoQztBQUNDRCxrQkFBYUEsV0FBV0UsUUFBWCxFQUFiO0FBQ0QsU0FBSUYsY0FBY04sVUFBbEIsRUFBOEI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQVAsNEhBQ21DWSxlQUFlSSxLQURsRCxrQkFDa0VDLElBRGxFLDRFQUc0QkwsZUFBZU0sWUFIM0MseUVBSXlDVCxlQUp6QztBQVNBO0FBQ0c7QUFDSjtBQUNEO0FBQ0RQLEtBQUUsY0FBRixFQUFrQmlCLE1BQWxCLENBQXlCbkIsTUFBekI7QUFFRDs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztrQkFyRG9CSixnQiIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0VmlldyB7XG5cdGNvbnN0cnVjdG9yKCl7fVxuXHRzaG93Q2FydFBvcHVwKHByb2R1Y3RzKSB7XG5cdFx0Y29uc29sZS5sb2cocHJvZHVjdHMpO1xuXHRcdGxldCBvdXRwdXQgPSBcIlwiO1xuXHRcdGxldCBDYXJ0VmlldyA9ICQoJy5jYXJ0VmlldycpO1xuXHRcdFx0Ly9tYXliZSBpbnNlcnQgc29tZXRoaW5nIGhlcmUgaWYgdGhlIHNob3BwaW5nIGNhcnQgaXMgZW1wdHk6XG5cdFx0XHQvL2lmKHNlc3Npb25TdG9yYWdlLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdC8vcmV0dXJuIDtcblx0XHRcdC8vXHR9XG5cdFx0XHQkKFwiLnByb2R1Y3RWaWV3XCIpLmh0bWwoXCJcIik7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGN1cnJlbnRTa3UgPSBzZXNzaW9uU3RvcmFnZS5rZXkoaSk7IC8vdGhpcyBpcyBhIHN0cmluZ1xuXHRcdFx0XHRsZXQgY3VycmVudFF1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjdXJyZW50U2t1KTsgLy90aGlzIGlzIGEgc3RyaW5nXG5cdFx0XHRcdC8vd2UgYXJlIHJ1bm5pbmcgYSBsb29wIHdpdGhpbiBhIGxvb3AsIGJ1dCB0aGVyZSBhcmUgbW9yZSBlZmZpY2llbnQgd2F5c1xuXHRcdFx0XHQvL3RvIGRvIHRoaXM6IHRoZXJlIGlzIGFuIGFycmF5IG9iamVjdCBtZXRob2QgY2FsbGVkIFwiZmlsdGVyXCJcblx0XHRcdFx0Zm9yIChsZXQgcCA9IDA7IHAgPCBwcm9kdWN0cy5sZW5ndGg7IHArKykge1xuXHRcdFx0XHRcdGxldCBjdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuXHRcdFx0XHRcdGxldCBwcm9kdWN0U2t1ID0gY3VycmVudFByb2R1Y3Quc2t1O1xuXHRcdFx0XHRcdFx0cHJvZHVjdFNrdSA9IHByb2R1Y3RTa3UudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRpZiAocHJvZHVjdFNrdSA9PSBjdXJyZW50U2t1KSB7XG5cdFx0XHRcdFx0XHQvLyBsZXQgaW1hZ2UgPSBjdXJyZW50UHJvZHVjdC5pbWFnZTtcblx0XHRcdFx0XHRcdC8vIGxldCBuYW1lID0gY3VycmVudFByb2R1Y3QubmFtZTtcblx0XHRcdFx0XHRcdC8vIGxldCBwcmljZSA9IGN1cnJlbnRQcm9kdWN0LnJlZ3VsYXJQcmljZTtcblx0XHRcdFx0XHRcdC8vICs9IDogZXF1YWxzIHBsdXNcblx0XHRcdFx0XHRcdG91dHB1dCArPSBgPGRpdiBpZD1cImZsZXgtY29udGFpbmVyXCIgY2xhc3M9XCJwcm9kdWN0LWluZm9cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJjYXJ0LWltYWdlXCIgc3JjPSBcIiR7Y3VycmVudFByb2R1Y3QuaW1hZ2V9XCIgYWx0PSBcIiR7bmFtZX1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJjYXJ0LXByaWNlXCI+ICR7Y3VycmVudFByb2R1Y3QucmVndWxhclByaWNlfSA8L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJhZGRcIiB0eXBlPVwibnVtYmVyXCIgdmFsdWU9JHtjdXJyZW50UXVhbnRpdHl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ1cGRhdGVcIj5VcGRhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0YDtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdC8vIDxwIGNsYXNzPVwiY2FydC1uYW1lXCI+ICR7bmFtZX0gPC9wPlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQkKCcucHJvZHVjdFZpZXcnKS5hcHBlbmQob3V0cHV0KTtcblxuXHR9XG5cdFxuXG5cdC8vICQoXCIuYWRkVG9DYXJ0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCl7XG4gLy8gICAgdmFyIGlucHV0RmllbGQgPSBwYXJzZUludCgkKFwiI2NhcnRRdWFudGl0eVwiKS52YWwoKSk7IFxuIC8vICAgIC8vIGluY3JlYVNFIFZBTFVFIEJZIFdIRU4gQ0xJQ0sgVEhFIEJVVFRPTiAgICAgICAgICAgIFxuIC8vICAgICAkKFwiI2NhcnRRdWFudGl0eVwiKS52YWwoaW5wdXRGaWVsZCArIDEpOyAgICAgIFxuIC8vICAgICB9KTsgICAgICBcbiAvLyAgICAgJChcIi5hZGRUb0NhcnRcIikuY2xpY2soZnVuY3Rpb24oKXsgXG4gLy8gICAgIC8vc2hvd3MgdGhlIGlucHV0IGZvciBjYXJ0IHF1YW50aXRpZXMgICAgIFxuIC8vICAgICAkKFwiI2NhcnRRdWFudGl0eVwiKS5zaG93KCk7IFxuIC8vIH0pXG4gLy8gfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);