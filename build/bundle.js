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
/******/ 	var hotCurrentHash = "f9f9ca23bac8812fff93"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n//the application needs some other files to work: webservice to get some data, catalog view to\n//see the products, and a shopping cart to manage the items/products. \n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _ShoppingCartView = __webpack_require__(5);\n\nvar _ShoppingCartView2 = _interopRequireDefault(_ShoppingCartView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n\n    //the constructor function ALWAYS EXISTS- usually calls on the init function that contains\n    //all the steps to perform the task.\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        this.shoppingCartView = new _ShoppingCartView2.default();\n        // this.\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n        this.initShoppingCart();\n        this.clear = document.getElementById(\"clear-cart\");\n        this.clear.addEventListener(\"click\", this.clickClear(this), false);\n        // this.initShoppingCartView();\n    }\n\n    _createClass(App, [{\n        key: 'clickClear',\n        value: function clickClear(theApp) {\n            return function (e) {\n                theApp.shoppingCart.clearCart();\n            };\n        }\n    }, {\n        key: 'clickRemove',\n        value: function clickRemove(theApp) {\n            return function (e) {\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.removeItemFromCart(theApp, theSku);\n                console.log(\"i am here in the clickRemove\");\n            };\n        }\n\n        //in this init function\n\n    }, {\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            //this app's bestbuywebservice is an instance of the BestBuy Web Service\n            //go to bestbuywebservice and run all its properties and functions\n            this.bbws = new _BestBuyWebService2.default();\n            //this app's webservice's api key is:\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            //this app's webservice's url to obtain the product data is:\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            //passing the webservice to receive the data, which it grabs and then returns it to\n            //this app. \n            //this bestbuy webservice is receiving the\n            //the bestbuy webservice needs to know about THIS app- it needs the products data and\n            //the products.  Those properties need to be filled with values.\n            this.bbws.getData(this);\n            //when we run getData, we are passing the app.js to BestBuyWebservice to populate the\n            //list of products in the app. \n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            //if there is actually product data, then this (theApp)\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                //pass the products to the carousel\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }, {\n        key: 'initShoppingCart',\n        value: function initShoppingCart() {\n            $(document).on('click', '.cart', this, function (event) {\n                console.log(event.data);\n                var theApp = event.data;\n                theApp.shoppingCartView.showCartPopup(theApp, theApp.products);\n                $(\".cartView\").fadeIn();\n            });\n            $(document).on('click', '.close', this, function (event) {\n                $(\".cartView\").fadeOut();\n            });\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0Iiwic2hvcHBpbmdDYXJ0VmlldyIsImluaXRCZXN0QnV5V2ViU2VydmljZSIsImluaXRTaG9wcGluZ0NhcnQiLCJjbGVhciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xpY2tDbGVhciIsInRoZUFwcCIsImUiLCJjbGVhckNhcnQiLCJ0aGVTa3UiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVJdGVtRnJvbUNhcnQiLCJjb25zb2xlIiwibG9nIiwiYmJ3cyIsImFwaUtleSIsInVybCIsImdldERhdGEiLCJnZXRQcm9kdWN0cyIsInNob3dDYXRhbG9nIiwiYWRkUHJvZHVjdHNUb0Nhcm91c2VsIiwiJCIsIm9uIiwiZXZlbnQiLCJkYXRhIiwic2hvd0NhcnRQb3B1cCIsImZhZGVJbiIsImZhZGVPdXQiXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7QUFJQztBQUNBOztBQUVEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUdxQkEsRzs7QUFFakI7QUFDQTtBQUNBLG1CQUFhO0FBQUE7O0FBQ1QsYUFBS0MsV0FBTCxHQUFtQixJQUFuQixDQURTLENBQ2dCO0FBQ3pCLGFBQUtDLFFBQUwsR0FBZ0IsSUFBaEIsQ0FGUyxDQUVhO0FBQ3RCLGFBQUtDLFdBQUwsR0FBbUIsMkJBQW5CLENBSFMsQ0FHNkI7QUFDdEMsYUFBS0MsWUFBTCxHQUFvQiw0QkFBcEI7QUFDQSxhQUFLQyxnQkFBTCxHQUF3QixnQ0FBeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLQyxxQkFBTDtBQUNBLGFBQUtDLGdCQUFMO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQyxTQUFTQyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxhQUFLRixLQUFMLENBQVdHLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLEtBQUtDLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBckMsRUFBNEQsS0FBNUQ7QUFDQTtBQUVIOzs7O21DQUVVQyxNLEVBQVE7QUFDZixtQkFBTyxVQUFTQyxDQUFULEVBQVk7QUFDZkQsdUJBQU9ULFlBQVAsQ0FBb0JXLFNBQXBCO0FBQ0gsYUFGRDtBQUdIOzs7b0NBRVdGLE0sRUFBUTtBQUNoQixtQkFBTyxVQUFTQyxDQUFULEVBQVk7QUFDZixvQkFBSUUsU0FBU0YsRUFBRUcsTUFBRixDQUFTQyxZQUFULENBQXNCLFVBQXRCLENBQWI7QUFDQUwsdUJBQU9ULFlBQVAsQ0FBb0JlLGtCQUFwQixDQUF1Q04sTUFBdkMsRUFBOENHLE1BQTlDO0FBQ0FJLHdCQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDSCxhQUpEO0FBS0g7O0FBRUQ7Ozs7Z0RBQ3VCO0FBQ25CO0FBQ0E7QUFDQSxpQkFBS0MsSUFBTCxHQUFZLGlDQUFaO0FBQ0E7QUFDQTtBQUNBLGlCQUFLQSxJQUFMLENBQVVDLE1BQVYsR0FBbUIsMEJBQW5COztBQUVBO0FBQ0E7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxHQUFWLG1GQUE4RixLQUFLRixJQUFMLENBQVVDLE1BQXhHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFLRCxJQUFMLENBQVVHLE9BQVYsQ0FBa0IsSUFBbEI7QUFDQTtBQUNBO0FBRUg7OztzQ0FFWTtBQUNUO0FBQ0E7O0FBRUE7QUFDUSxnQkFBRyxLQUFLeEIsV0FBTCxJQUFrQixJQUFyQixFQUEwQjtBQUM5QjtBQUNBO0FBQ0EscUJBQUtDLFFBQUwsR0FBZ0IsS0FBS29CLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUVIOztBQUVELGlCQUFLQyxXQUFMO0FBQ0g7OztzQ0FFYTtBQUNWO0FBQ0EsZ0JBQUksS0FBSzFCLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUI7QUFDQSxxQkFBS0UsV0FBTCxDQUFpQnlCLHFCQUFqQixDQUF1QyxLQUFLMUIsUUFBNUMsRUFBcUQsSUFBckQ7QUFDQTtBQUNIO0FBQ0o7OzsyQ0FFa0I7QUFDZjJCLGNBQUVwQixRQUFGLEVBQVlxQixFQUFaLENBQWUsT0FBZixFQUF3QixPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxVQUFTQyxLQUFULEVBQWU7QUFDbERYLHdCQUFRQyxHQUFSLENBQVlVLE1BQU1DLElBQWxCO0FBQ0Esb0JBQUluQixTQUFTa0IsTUFBTUMsSUFBbkI7QUFDQW5CLHVCQUFPUixnQkFBUCxDQUF3QjRCLGFBQXhCLENBQXNDcEIsTUFBdEMsRUFBNkNBLE9BQU9YLFFBQXBEO0FBQ0EyQixrQkFBRSxXQUFGLEVBQWVLLE1BQWY7QUFDSCxhQUxEO0FBTUNMLGNBQUVwQixRQUFGLEVBQVlxQixFQUFaLENBQWUsT0FBZixFQUF3QixRQUF4QixFQUFrQyxJQUFsQyxFQUF3QyxVQUFTQyxLQUFULEVBQWU7QUFDcERGLGtCQUFFLFdBQUYsRUFBZU0sT0FBZjtBQUNILGFBRkE7QUFHSjs7Ozs7O2tCQTlGZ0JuQyxHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI4LlxuICovXG5cbiAvL3RoZSBhcHBsaWNhdGlvbiBuZWVkcyBzb21lIG90aGVyIGZpbGVzIHRvIHdvcms6IHdlYnNlcnZpY2UgdG8gZ2V0IHNvbWUgZGF0YSwgY2F0YWxvZyB2aWV3IHRvXG4gLy9zZWUgdGhlIHByb2R1Y3RzLCBhbmQgYSBzaG9wcGluZyBjYXJ0IHRvIG1hbmFnZSB0aGUgaXRlbXMvcHJvZHVjdHMuIFxuXG5pbXBvcnQgQmVzdEJ1eVdlYlNlcnZpY2UgZnJvbSAnLi9CZXN0QnV5V2ViU2VydmljZSc7XG5pbXBvcnQgQ2F0YWxvZ1ZpZXcgZnJvbSAnLi9DYXRhbG9nVmlldyc7XG5pbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4vU2hvcHBpbmdDYXJ0JztcbmltcG9ydCBTaG9wcGluZ0NhcnRWaWV3IGZyb20gJy4vU2hvcHBpbmdDYXJ0Vmlldyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcblxuICAgIC8vdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIEFMV0FZUyBFWElTVFMtIHVzdWFsbHkgY2FsbHMgb24gdGhlIGluaXQgZnVuY3Rpb24gdGhhdCBjb250YWluc1xuICAgIC8vYWxsIHRoZSBzdGVwcyB0byBwZXJmb3JtIHRoZSB0YXNrLlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsOyAvLyB0aGlzIHdpbGwgc3RvcmUgYWxsIG91ciBkYXRhXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsOyAvLyBzdG9yZXMgc3BlY2lmaWNhbGx5IHRoZSBwcm9kdWN0c1xuICAgICAgICB0aGlzLmNhdGFsb2dWaWV3ID0gbmV3IENhdGFsb2dWaWV3KCk7IC8vIHRoaXMgd2lsbCBkaXNwbGF5IG91ciBkYXRhXG4gICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB0aGlzLnNob3BwaW5nQ2FydFZpZXcgPSBuZXcgU2hvcHBpbmdDYXJ0VmlldygpO1xuICAgICAgICAvLyB0aGlzLlxuICAgICAgICAvLyBjYWxsIHRoZSBpbml0QmVzdEJ1eVdlYlNlcnZpY2UgdG8gaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgLy8gQmVzdEJ1eSBXZWIgU2VydmljZSBhbmQgcmV0dXJuIHRoZSBkYXRhXG4gICAgICAgIHRoaXMuaW5pdEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIHRoaXMuaW5pdFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB0aGlzLmNsZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1jYXJ0XCIpO1xuICAgICAgICB0aGlzLmNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrQ2xlYXIodGhpcyksIGZhbHNlKTtcbiAgICAgICAgLy8gdGhpcy5pbml0U2hvcHBpbmdDYXJ0VmlldygpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjbGlja0NsZWFyKHRoZUFwcCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5jbGVhckNhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrUmVtb3ZlKHRoZUFwcCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5yZW1vdmVJdGVtRnJvbUNhcnQodGhlQXBwLHRoZVNrdSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImkgYW0gaGVyZSBpbiB0aGUgY2xpY2tSZW1vdmVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2luIHRoaXMgaW5pdCBmdW5jdGlvblxuICAgIGluaXRCZXN0QnV5V2ViU2VydmljZSgpe1xuICAgICAgICAvL3RoaXMgYXBwJ3MgYmVzdGJ1eXdlYnNlcnZpY2UgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIEJlc3RCdXkgV2ViIFNlcnZpY2VcbiAgICAgICAgLy9nbyB0byBiZXN0YnV5d2Vic2VydmljZSBhbmQgcnVuIGFsbCBpdHMgcHJvcGVydGllcyBhbmQgZnVuY3Rpb25zXG4gICAgICAgIHRoaXMuYmJ3cyA9IG5ldyBCZXN0QnV5V2ViU2VydmljZSgpO1xuICAgICAgICAvL3RoaXMgYXBwJ3Mgd2Vic2VydmljZSdzIGFwaSBrZXkgaXM6XG4gICAgICAgIC8vIHVzZSB5b3VyIG93biBBUEkga2V5IGZvciB0aGlzICh0aGUgb25lIGZyb20gQ29keSlcbiAgICAgICAgdGhpcy5iYndzLmFwaUtleSA9IFwiOGNjZGRmNHJ0ano1azVidHFhbTg0cWFrXCI7XG5cbiAgICAgICAgLy90aGlzIGFwcCdzIHdlYnNlcnZpY2UncyB1cmwgdG8gb2J0YWluIHRoZSBwcm9kdWN0IGRhdGEgaXM6XG4gICAgICAgIC8vIHRoaXMgdXNlcyAnYmFja3RpY2tzJyBmb3IgbG9uZyBtdWx0aS1saW5lIHN0cmluZ3NcbiAgICAgICAgdGhpcy5iYndzLnVybCA9IGBodHRwczovL2FwaS5iZXN0YnV5LmNvbS92MS9wcm9kdWN0cygoY2F0ZWdvcnlQYXRoLmlkPWFiY2F0MDUwMjAwMCkpP2FwaUtleT0ke3RoaXMuYmJ3cy5hcGlLZXl9JmZvcm1hdD1qc29uYDtcblxuICAgICAgICAvLyBwYXNzIHRoZSByZWZlcmVuY2UgdG8gdGhpcyBhcHAgdG8gc3RvcmUgdGhlIGRhdGFcbiAgICAgICAgLy9wYXNzaW5nIHRoZSB3ZWJzZXJ2aWNlIHRvIHJlY2VpdmUgdGhlIGRhdGEsIHdoaWNoIGl0IGdyYWJzIGFuZCB0aGVuIHJldHVybnMgaXQgdG9cbiAgICAgICAgLy90aGlzIGFwcC4gXG4gICAgICAgIC8vdGhpcyBiZXN0YnV5IHdlYnNlcnZpY2UgaXMgcmVjZWl2aW5nIHRoZVxuICAgICAgICAvL3RoZSBiZXN0YnV5IHdlYnNlcnZpY2UgbmVlZHMgdG8ga25vdyBhYm91dCBUSElTIGFwcC0gaXQgbmVlZHMgdGhlIHByb2R1Y3RzIGRhdGEgYW5kXG4gICAgICAgIC8vdGhlIHByb2R1Y3RzLiAgVGhvc2UgcHJvcGVydGllcyBuZWVkIHRvIGJlIGZpbGxlZCB3aXRoIHZhbHVlcy5cbiAgICAgICAgdGhpcy5iYndzLmdldERhdGEodGhpcyk7XG4gICAgICAgIC8vd2hlbiB3ZSBydW4gZ2V0RGF0YSwgd2UgYXJlIHBhc3NpbmcgdGhlIGFwcC5qcyB0byBCZXN0QnV5V2Vic2VydmljZSB0byBwb3B1bGF0ZSB0aGVcbiAgICAgICAgLy9saXN0IG9mIHByb2R1Y3RzIGluIHRoZSBhcHAuIFxuXG4gICAgfVxuXG4gICAgcHJlcENhdGFsb2coKXtcbiAgICAgICAgLy8gdXNlIHRoaXMgY29uc29sZS5sb2cgdG8gdGVzdCB0aGUgZGF0YVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3REYXRhKTtcblxuICAgICAgICAvL2lmIHRoZXJlIGlzIGFjdHVhbGx5IHByb2R1Y3QgZGF0YSwgdGhlbiB0aGlzICh0aGVBcHApXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvLyBvbmx5IGdldCB0aGUgcHJvZHVjdHMgcHJvcGVydHkgKGZvciBub3cpXG4gICAgICAgICAgICAvLyB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIFNpbXBsZUhUVFBSZXF1ZXN0Lmh0bWxcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLmJid3MuZ2V0UHJvZHVjdHMoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93Q2F0YWxvZygpO1xuICAgIH1cbiAgICBcbiAgICBzaG93Q2F0YWxvZygpIHtcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNhdGFsb2cgb25seSBpZiB0aGVyZSBhcmUgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy9wYXNzIHRoZSBwcm9kdWN0cyB0byB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAgIHRoaXMuY2F0YWxvZ1ZpZXcuYWRkUHJvZHVjdHNUb0Nhcm91c2VsKHRoaXMucHJvZHVjdHMsdGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmNhdGFsb2dWaWV3LnNob3dDYXRhbG9nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2hvcHBpbmdDYXJ0KCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNhcnQnLCB0aGlzLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgICAgICAgIGxldCB0aGVBcHAgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydFZpZXcuc2hvd0NhcnRQb3B1cCh0aGVBcHAsdGhlQXBwLnByb2R1Y3RzKTtcbiAgICAgICAgICAgICQoXCIuY2FydFZpZXdcIikuZmFkZUluKCk7ICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xvc2UnLCB0aGlzLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAkKFwiLmNhcnRWaWV3XCIpLmZhZGVPdXQoKTtcbiAgICAgICAgfSk7IFxuICAgIH1cbn1cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            //serviceChannel is the connection between our site and BestBuy\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            //listen to when the state changes in the serviceChannel\n            //we are passing theApp to the resultsPreprocessor function (which happens when the\n            //event occurs)\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            //we need to open the serviceChannel to get the data from BestBuy (the URL), \"GET\" is what will grab\n            //the data. \"Ture\" = the browser will continue to do things while it waits for the data.\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n\n        //resultsPreprocessor is the \"middle-man\" in this scenario \n\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            // let thisService = this BestBuywebservice file\n            var thisService = this; // a reference to the instance created from this class\n            //\n            var eventHandler = function eventHandler(evt) {\n                //we can't just write \"this\" to call on the bestbuywebservice file, since\n                //we would be calling it within a funciton, so it would only exist within this\n                //function. Therefore, we use thisServie, which we declared as the entire\n                //BestBuywebservice above. \n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n\n                //bestbuywebservce has the product data, and it matches the event target, so we are\n                //assigning it/storing it\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n\n                //now the app has a copy of the bestbuy api data as well; we assigned it below:\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n\n                //below we are telling theApp file to prepare the catalog\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                //if there is product data, then PARSE the data (convert to array of objects)\n                var jsonData = JSON.parse(this.productData);\n\n                //gets another copy of the data, which is explicity the PRODUCTS (not all the other\n                //data)\n                this.products = jsonData.products;\n\n                //return just the PRODUCTS, which gets stored in the products property of the app.\n                return this.products;\n            }\n            //return the data to theApp.\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQztBQUNBO0FBQ0E7QUFDREssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQTtBQUNBO0FBQ0FDLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCVCxHQUExQixFQUE4QixJQUE5QjtBQUNBSywyQkFBZUssSUFBZjtBQUNIOztBQUVEOzs7OzRDQUNvQk4sTSxFQUFPO0FBQ3ZCOztBQUVBO0FBQ0EsZ0JBQUlPLGNBQWMsSUFBbEIsQ0FKdUIsQ0FJQztBQUN4QjtBQUNBLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FGLDRCQUFZRyxPQUFaLENBQW9CRCxHQUFwQixFQUF3QlQsTUFBeEI7QUFDSCxhQU5EO0FBT0EsbUJBQU9RLFlBQVA7QUFDSDs7O2dDQUVPQyxHLEVBQUlULE0sRUFBTzs7QUFFZixnQkFBSVMsSUFBSUUsTUFBSixDQUFXQyxVQUFYLElBQXlCLENBQXpCLElBQThCSCxJQUFJRSxNQUFKLENBQVdFLE1BQVgsSUFBcUIsR0FBdkQsRUFBMkQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLHFCQUFLZixXQUFMLEdBQW1CVyxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9GLFdBQVAsR0FBcUJXLElBQUlFLE1BQUosQ0FBV0csWUFBaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQWQsdUJBQU9lLFdBQVA7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1Q7QUFDQTtBQUNBLGdCQUFHLEtBQUtqQixXQUFMLElBQWtCLElBQXJCLEVBQTBCO0FBQ3RCO0FBQ0Qsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7O0FBRUE7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCaUIsU0FBU2pCLFFBQXpCOztBQUVBO0FBQ0EsdUJBQU8sS0FBS0EsUUFBWjtBQUNGO0FBQ0Q7QUFDQSxtQkFmUyxDQWVEO0FBQ1g7Ozs7OztrQkEvRmdCSixpQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZXN0QnV5V2ViU2VydmljZXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudXJsID1cIlwiO1xuICAgICAgICB0aGlzLmFwaUtleSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldERhdGEodGhlQXBwKXtcbiAgICAgICAgLy8gdGhlQXBwIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYWluIGFwcFxuICAgICAgICAvLyB3ZSBjYW4gcGFzcyBpbmZvcm1hdGlvbiB0byBpdCwgaW5jbHVkaW5nIGRhdGFcbiAgICAgICAgLy8gdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoaXMgc2VydmljZVxuXG4gICAgICAgIC8vc2VydmljZUNoYW5uZWwgaXMgdGhlIGNvbm5lY3Rpb24gYmV0d2VlbiBvdXIgc2l0ZSBhbmQgQmVzdEJ1eVxuXG4gICAgICAgIGxldCBzZXJ2aWNlQ2hhbm5lbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy51cmw7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy8gKioqIFRvIHNvbHZlIHRoZSBpc3N1ZSBvZiBwYXNzaW5nIHRoZSBkYXRhIGJhY2sgdG8gdGhlIG1haW4gYXBwLi4uXG4gICAgICAgIC8vICoqKiBhbmQgZXZlbnR1YWxseSwgdG8gY2F0YWxvZ1ZpZXdcbiAgICAgICAgLy8gKioqIFlvdSBjb3VsZCB0aGUgYWRkRXZlbnRMaXN0ZW5lciB0byBjYWxsXG4gICAgICAgIC8vICoqKiBhIGRpZmZlcmVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGhhdmUgYm90aFxuICAgICAgICAvLyAqKiogdGhlIGV2ZW50IG9iamVjdCBhbmQgZGF0YVBsYWNlSG9sZGVyIGFzIHBhcmFtZXRlcnNcbiAgICAgICAgLy8gKioqIHNlZSBodHRwOi8vYml0Lmx5L2pzLXBhc3Ntb3JlYXJnc2V2ZW50XG4gICAgICAgICAqL1xuXG4gICAgICAgICAvL2xpc3RlbiB0byB3aGVuIHRoZSBzdGF0ZSBjaGFuZ2VzIGluIHRoZSBzZXJ2aWNlQ2hhbm5lbFxuICAgICAgICAgLy93ZSBhcmUgcGFzc2luZyB0aGVBcHAgdG8gdGhlIHJlc3VsdHNQcmVwcm9jZXNzb3IgZnVuY3Rpb24gKHdoaWNoIGhhcHBlbnMgd2hlbiB0aGVcbiAgICAgICAgIC8vZXZlbnQgb2NjdXJzKVxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgLy93ZSBuZWVkIHRvIG9wZW4gdGhlIHNlcnZpY2VDaGFubmVsIHRvIGdldCB0aGUgZGF0YSBmcm9tIEJlc3RCdXkgKHRoZSBVUkwpLCBcIkdFVFwiIGlzIHdoYXQgd2lsbCBncmFiXG4gICAgICAgIC8vdGhlIGRhdGEuIFwiVHVyZVwiID0gdGhlIGJyb3dzZXIgd2lsbCBjb250aW51ZSB0byBkbyB0aGluZ3Mgd2hpbGUgaXQgd2FpdHMgZm9yIHRoZSBkYXRhLlxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5vcGVuKFwiR0VUXCIsdXJsLHRydWUpO1xuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5zZW5kKCk7XG4gICAgfVxuXG4gICAgLy9yZXN1bHRzUHJlcHJvY2Vzc29yIGlzIHRoZSBcIm1pZGRsZS1tYW5cIiBpbiB0aGlzIHNjZW5hcmlvIFxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICAvLyBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzIEJlc3RCdXl3ZWJzZXJ2aWNlIGZpbGVcbiAgICAgICAgbGV0IHRoaXNTZXJ2aWNlID0gdGhpczsgLy8gYSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIGNyZWF0ZWQgZnJvbSB0aGlzIGNsYXNzXG4gICAgICAgIC8vXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBmdW5jdGlvbihldnQpe1xuICAgICAgICAgICAgLy93ZSBjYW4ndCBqdXN0IHdyaXRlIFwidGhpc1wiIHRvIGNhbGwgb24gdGhlIGJlc3RidXl3ZWJzZXJ2aWNlIGZpbGUsIHNpbmNlXG4gICAgICAgICAgICAvL3dlIHdvdWxkIGJlIGNhbGxpbmcgaXQgd2l0aGluIGEgZnVuY2l0b24sIHNvIGl0IHdvdWxkIG9ubHkgZXhpc3Qgd2l0aGluIHRoaXNcbiAgICAgICAgICAgIC8vZnVuY3Rpb24uIFRoZXJlZm9yZSwgd2UgdXNlIHRoaXNTZXJ2aWUsIHdoaWNoIHdlIGRlY2xhcmVkIGFzIHRoZSBlbnRpcmVcbiAgICAgICAgICAgIC8vQmVzdEJ1eXdlYnNlcnZpY2UgYWJvdmUuIFxuICAgICAgICAgICAgdGhpc1NlcnZpY2UucmVzdWx0cyhldnQsdGhlQXBwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyXG4gICAgfTtcblxuICAgIHJlc3VsdHMoZXZ0LHRoZUFwcCl7XG5cbiAgICAgICAgaWYgKGV2dC50YXJnZXQucmVhZHlTdGF0ZSA9PSA0ICYmIGV2dC50YXJnZXQuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAvLyBhc3NpZ24gdGhpcyBpbnN0YW5jZSdzIHByb2R1Y3REYXRhIHRvIGJlIHRoZSByZXNwb25zZVRleHRcblxuICAgICAgICAgICAgLy9iZXN0YnV5d2Vic2VydmNlIGhhcyB0aGUgcHJvZHVjdCBkYXRhLCBhbmQgaXQgbWF0Y2hlcyB0aGUgZXZlbnQgdGFyZ2V0LCBzbyB3ZSBhcmVcbiAgICAgICAgICAgIC8vYXNzaWduaW5nIGl0L3N0b3JpbmcgaXRcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBldnQudGFyZ2V0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGUgYXBwJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dCB0b29cblxuICAgICAgICAgICAgLy9ub3cgdGhlIGFwcCBoYXMgYSBjb3B5IG9mIHRoZSBiZXN0YnV5IGFwaSBkYXRhIGFzIHdlbGw7IHdlIGFzc2lnbmVkIGl0IGJlbG93OlxuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuXG4gICAgICAgICAgICAvL2JlbG93IHdlIGFyZSB0ZWxsaW5nIHRoZUFwcCBmaWxlIHRvIHByZXBhcmUgdGhlIGNhdGFsb2dcbiAgICAgICAgICAgIHRoZUFwcC5wcmVwQ2F0YWxvZygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZXhwbGljaXR5IGdldHMgdGhlIHByb2R1Y3RzIHByb3BlcnR5XG4gICAgICAgIC8vIGZyb20gdGhlIEpTT04gb2JqZWN0LiBpdCBhc3N1bWVzIHlvdSBoYXZlIHRoZSBKU09OIGRhdGFcbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGlzIHByb2R1Y3QgZGF0YSwgdGhlbiBQQVJTRSB0aGUgZGF0YSAoY29udmVydCB0byBhcnJheSBvZiBvYmplY3RzKVxuICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMucHJvZHVjdERhdGEpO1xuXG4gICAgICAgICAgIC8vZ2V0cyBhbm90aGVyIGNvcHkgb2YgdGhlIGRhdGEsIHdoaWNoIGlzIGV4cGxpY2l0eSB0aGUgUFJPRFVDVFMgKG5vdCBhbGwgdGhlIG90aGVyXG4gICAgICAgICAgIC8vZGF0YSlcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuXG4gICAgICAgICAgIC8vcmV0dXJuIGp1c3QgdGhlIFBST0RVQ1RTLCB3aGljaCBnZXRzIHN0b3JlZCBpbiB0aGUgcHJvZHVjdHMgcHJvcGVydHkgb2YgdGhlIGFwcC5cbiAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gdGhlIGRhdGEgdG8gdGhlQXBwLlxuICAgICAgICByZXR1cm47IC8vIGlmIHdlIGhhdmUgbm8gZGF0YSwgcmV0dXJuIG5vdGhpbmdcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: 'initCarousel',\n        value: function initCarousel() {\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    rtl: true,\n                    loop: false,\n                    margin: 10,\n                    nav: true,\n                    autoplay: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        },\n                        600: {\n                            items: 2\n                        },\n                        1000: {\n                            items: 4\n                        }\n                    }\n                });\n\n                $(function () {\n                    $('.sameHeight').matchHeight({ byRow: false });\n                });\n            });\n        }\n    }, {\n        key: 'onClickCartButton',\n        value: function onClickCartButton(theApp) {\n            return function (e) {\n                console.log(theApp);\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n            };\n        }\n    }, {\n        key: 'addProductsToCarousel',\n        value: function addProductsToCarousel(products, theApp) {\n            this.theApp = theApp;\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n\n                var newImg = document.createElement(\"div\");\n                newImg.setAttribute(\"style\", 'background-image: url(\\'' + product.image + '\\');height:200px; \\n            background-size:contain;background-repeat:no-repeat;background-position:center;');\n                newImg.setAttribute(\"alt\", '' + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                var newH3Tag = document.createElement(\"h3\");\n                newH3Tag.setAttribute(\"class\", \"light-grey-text product-name font-robmono\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n                //<h3>TEXT NODE</h3>\n                //createTextNode create a space to place text within an element\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price green-text font-robmono\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", 'cart_' + product.sku);\n                addToCartButton.setAttribute(\"class\", \"addToCart uppercase font-robmono\");\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"type\", \"button\");\n                var addCartTextNode = document.createTextNode(\"Add to Cart\");\n                addToCartButton.appendChild(addCartTextNode);\n                console.log(\"how many time am i running\");\n                //we added the \"this\" so that it knows to search \"this\" file for the function\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", 'qv_' + product.sku);\n                quickViewButton.setAttribute(\"class\", \"qv-button uppercase font-robmono\");\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n                quickViewButton.addEventListener(\"click\", this.showQv(this.theApp), false);\n\n                //at the top, we have the new elements within the div created.  Below, \n                //we are appending (or placing) the new elements with the data.\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton); // added new quickView button\n                newDiv.appendChild(addToCartButton);\n                this.carousel[0].appendChild(newDiv);\n\n                var qvButtonId = '#qv_' + product.sku;\n                $(qvButtonId).on(\"click\", this, function (e) {\n                    // console.log(\"I clicked on the button\");\n                    // console.log(e.data);\n                    var theSku = e.target.getAttribute(\"data-sku\");\n                    // console.log(theSku);\n                    e.data.showQv(e.data.theApp.products, theSku);\n                    $(\".quick-view\").fadeIn();\n                    $(\".qv-close\").on(\"click\", function (e) {\n                        $(\".quick-view\").fadeOut();\n                    });\n                });\n            }\n\n            this.initCarousel();\n        }\n    }, {\n        key: 'showQv',\n        value: function showQv(products, theSku) {\n            console.log(theSku);\n            console.log(products);\n\n            var output = \"\";\n            var QuickView = $('.quick-view');\n\n            $(\".qv-info\").html(\"\");\n\n            for (var p = 0; p < products.length; p++) {\n                var currentProduct = products[p];\n                var productSku = currentProduct.sku;\n                productSku = productSku.toString();\n                if (productSku == theSku) {\n                    console.log(\"i am here\");\n                    output += '<div class=\"qv-flex-container qv-info\">\\n                                <img class=\"qv-image\" src= \"' + currentProduct.image + '\" alt= \"' + name + '\">\\n                                <h4 class=\"qv-title light-grey-text font-robmono uppercase\">' + currentProduct.name + '</h4>\\n                            </div>\\n                            <div class=\"qv-text\">\\n                                <p class=\"qv-price green-text font-robmono\"> ' + currentProduct.regularPrice + ' </p>\\n                                <p class=\"qv-description light-grey-text\">' + currentProduct.longDescription + '</p>\\n                            </div>\\n                            <button type=\"button\" id=\"qv-' + theSku + '\" class=\"qv-add addToCart uppercase font-robmono\">Add to Cart</button>\\n                            ';\n                }\n            }\n\n            $('.qv-info').append(output);\n\n            if (document.getElementById('qv-' + theSku) === null) {\n                return;\n            } else {\n                var qvCartButton = document.getElementById('qv-' + theSku);\n                console.log(qvCartButton);\n                qvCartButton.addEventListener(\"click\", this.quickAddToCart(theSku, this.theApp), false);\n            }\n        }\n    }, {\n        key: 'quickAddToCart',\n        value: function quickAddToCart(theSku, theApp) {\n            return function (e) {\n\n                if (sessionStorage.getItem(theSku) == undefined) {\n                    sessionStorage.setItem(theSku, 1);\n                    return;\n                }\n                // console.log('i am here in the quickview cart Button');\n                else {\n                        for (var i = 0; i < sessionStorage.length; i++) {\n                            var currentSku = sessionStorage.key(i);\n                            var currentQuantity = sessionStorage.getItem(currentSku);\n                            if (theSku.toString() == currentSku.toString()) {\n                                currentQuantity = parseInt(currentQuantity) + 1;\n                                sessionStorage.setItem(currentSku, currentQuantity);\n                            }\n                        }\n                    }\n            };\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGhlQXBwIiwiJCIsInJlYWR5Iiwib3dsQ2Fyb3VzZWwiLCJydGwiLCJsb29wIiwibWFyZ2luIiwibmF2IiwiYXV0b3BsYXkiLCJyZXNwb25zaXZlIiwiaXRlbXMiLCJtYXRjaEhlaWdodCIsImJ5Um93IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0aGVTa3UiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJzaG9wcGluZ0NhcnQiLCJhZGRJdGVtVG9DYXJ0IiwicHJvZHVjdHMiLCJ1bmRlZmluZWQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsIm5ld0RpdiIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJuZXdJbWciLCJpbWFnZSIsIm5hbWUiLCJza3UiLCJuZXdIM1RhZyIsIm5ld0gzVGFnVGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImFwcGVuZENoaWxkIiwibmV3UHJpY2VQYXJhIiwibmV3UHJpY2VQYXJhVGV4dE5vZGUiLCJyZWd1bGFyUHJpY2UiLCJhZGRUb0NhcnRCdXR0b24iLCJhZGRDYXJ0VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGlja0NhcnRCdXR0b24iLCJxdWlja1ZpZXdCdXR0b24iLCJxdWlja1ZpZXdUZXh0Tm9kZSIsInNob3dRdiIsInF2QnV0dG9uSWQiLCJvbiIsImRhdGEiLCJmYWRlSW4iLCJmYWRlT3V0IiwiaW5pdENhcm91c2VsIiwib3V0cHV0IiwiUXVpY2tWaWV3IiwiaHRtbCIsImN1cnJlbnRQcm9kdWN0IiwicHJvZHVjdFNrdSIsInRvU3RyaW5nIiwibG9uZ0Rlc2NyaXB0aW9uIiwiYXBwZW5kIiwiZ2V0RWxlbWVudEJ5SWQiLCJxdkNhcnRCdXR0b24iLCJxdWlja0FkZFRvQ2FydCIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iLCJpIiwiY3VycmVudFNrdSIsImtleSIsImN1cnJlbnRRdWFudGl0eSIsInBhcnNlSW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxXO0FBRWpCLDJCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsQ0FBaEI7QUFDQSxhQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNIOzs7O3VDQUVhO0FBQ1ZDLGNBQUVILFFBQUYsRUFBWUksS0FBWixDQUFrQixZQUFVO0FBQ3hCRCxrQkFBRSxlQUFGLEVBQW1CRSxXQUFuQixDQUErQjtBQUMzQkMseUJBQUksSUFEdUI7QUFFM0JDLDBCQUFLLEtBRnNCO0FBRzNCQyw0QkFBTyxFQUhvQjtBQUkzQkMseUJBQUksSUFKdUI7QUFLM0JDLDhCQUFTLElBTGtCO0FBTTNCQyxnQ0FBVztBQUNQLDJCQUFFO0FBQ0VDLG1DQUFNO0FBRFIseUJBREs7QUFJUCw2QkFBSTtBQUNBQSxtQ0FBTTtBQUROLHlCQUpHO0FBT1AsOEJBQUs7QUFDREEsbUNBQU07QUFETDtBQVBFO0FBTmdCLGlCQUEvQjs7QUFtQkpULGtCQUFFLFlBQVc7QUFDVEEsc0JBQUUsYUFBRixFQUFpQlUsV0FBakIsQ0FBNkIsRUFBQ0MsT0FBTSxLQUFQLEVBQTdCO0FBQ0gsaUJBRkQ7QUFHQyxhQXZCRDtBQXdCSDs7OzBDQUVpQlosTSxFQUFPO0FBQ3JCLG1CQUFPLFVBQVNhLENBQVQsRUFBVztBQUNkQyx3QkFBUUMsR0FBUixDQUFZZixNQUFaO0FBQ0Esb0JBQUlnQixTQUFTSCxFQUFFSSxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBYjtBQUNBbEIsdUJBQU9tQixZQUFQLENBQW9CQyxhQUFwQixDQUFrQ0osTUFBbEM7QUFDSCxhQUpEO0FBS0g7Ozs4Q0FFcUJLLFEsRUFBVXJCLE0sRUFBTztBQUNuQyxpQkFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsZ0JBQUlxQixhQUFhQyxTQUFiLElB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R0FBZixDQUFtQkYsQ0FBbkIsQ0FBakI7QUFDQSxnQ0FBSUcsa0JBQWtCTixlQUFlQyxPQUFmLENBQXVCRyxVQUF2QixDQUF0QjtBQUNBLGdDQUFJcEQsT0FBTzBDLFFBQVAsTUFBcUJVLFdBQVdWLFFBQVgsRUFBekIsRUFBZ0Q7QUFDNUNZLGtEQUFrQkMsU0FBU0QsZUFBVCxJQUE0QixDQUE5QztBQUNBTiwrQ0FBZUUsT0FBZixDQUF1QkUsVUFBdkIsRUFBa0NFLGVBQWxDO0FBQ0g7QUFDSjtBQUNKO0FBQ0EsYUFqQkQ7QUFrQkg7Ozs7OztrQkFsTGdCMUUsVyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1ZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm93bC1jYXJvdXNlbFwiKTtcbiAgICAgICAgdGhpcy50aGVBcHAgPSBudWxsOyAgXG4gICAgfVxuXG4gICAgaW5pdENhcm91c2VsKCl7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcub3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgICAgIHJ0bDp0cnVlLFxuICAgICAgICAgICAgICAgIGxvb3A6ZmFsc2UsXG4gICAgICAgICAgICAgICAgbWFyZ2luOjEwLFxuICAgICAgICAgICAgICAgIG5hdjp0cnVlLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OnRydWUsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XG4gICAgICAgICAgICAgICAgICAgIDA6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICA2MDA6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAxMDAwOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOjRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcuc2FtZUhlaWdodCcpLm1hdGNoSGVpZ2h0KHtieVJvdzpmYWxzZX0pO1xuICAgICAgICB9KTsgIFxuICAgICAgICB9KTtcbiAgICB9XG4gIFxuICAgIG9uQ2xpY2tDYXJ0QnV0dG9uKHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgICAgICBsZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIik7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByb2R1Y3RzVG9DYXJvdXNlbChwcm9kdWN0cywgdGhlQXBwKXtcbiAgICAgICAgdGhpcy50aGVBcHAgPSB0aGVBcHA7XG4gICAgICAgIGlmIChwcm9kdWN0cyA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3RzID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIDsgLy8gZG8gbm90IGRvIGFueXRoaW5nISB0aGVyZSBpcyBubyBkYXRhXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuIFxuICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3Qtd3JhcHBlclwiKTtcblxuICAgICAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Byb2R1Y3QuaW1hZ2V9Jyk7aGVpZ2h0OjIwMHB4OyBcbiAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtgKTtcbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgYCR7cHJvZHVjdC5uYW1lfWApOyAvLyB0aGlzIHdvcmtzIHRvb1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuXG4gICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICBuZXdIM1RhZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxpZ2h0LWdyZXktdGV4dCBwcm9kdWN0LW5hbWUgZm9udC1yb2Jtb25vXCIpO1xuICAgICAgICAgICAgbGV0IG5ld0gzVGFnVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0Lm5hbWUpO1xuICAgICAgICAgICAgbmV3SDNUYWcuYXBwZW5kQ2hpbGQobmV3SDNUYWdUZXh0Tm9kZSk7XG4gICAgICAgICAgICAvLzxoMz5URVhUIE5PREU8L2gzPlxuICAgICAgICAgICAgLy9jcmVhdGVUZXh0Tm9kZSBjcmVhdGUgYSBzcGFjZSB0byBwbGFjZSB0ZXh0IHdpdGhpbiBhbiBlbGVtZW50XG5cbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaWNlIGdyZWVuLXRleHQgZm9udC1yb2Jtb25vXCIpO1xuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5yZWd1bGFyUHJpY2UpO1xuICAgICAgICAgICAgbmV3UHJpY2VQYXJhLmFwcGVuZENoaWxkKG5ld1ByaWNlUGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGNhcnRfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFkZFRvQ2FydCB1cHBlcmNhc2UgZm9udC1yb2Jtb25vXCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIsIHByb2R1Y3Quc2t1KTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgbGV0IGFkZENhcnRUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQWRkIHRvIENhcnRcIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uYXBwZW5kQ2hpbGQoYWRkQ2FydFRleHROb2RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaG93IG1hbnkgdGltZSBhbSBpIHJ1bm5pbmdcIilcbiAgICAgICAgICAgIC8vd2UgYWRkZWQgdGhlIFwidGhpc1wiIHNvIHRoYXQgaXQga25vd3MgdG8gc2VhcmNoIFwidGhpc1wiIGZpbGUgZm9yIHRoZSBmdW5jdGlvblxuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tDYXJ0QnV0dG9uKHRoaXMudGhlQXBwKSAsZmFsc2UpO1xuXG4gICAgICAgICAgICBsZXQgcXVpY2tWaWV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcXZfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInF2LWJ1dHRvbiB1cHBlcmNhc2UgZm9udC1yb2Jtb25vXCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIsIHByb2R1Y3Quc2t1KTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgbGV0IHF1aWNrVmlld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJRdWljayBWaWV3XCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFwcGVuZENoaWxkKHF1aWNrVmlld1RleHROb2RlKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zaG93UXYodGhpcy50aGVBcHApICwgZmFsc2UpO1xuXG4gICAgXG4gICAgICAgICAgICAvL2F0IHRoZSB0b3AsIHdlIGhhdmUgdGhlIG5ldyBlbGVtZW50cyB3aXRoaW4gdGhlIGRpdiBjcmVhdGVkLiAgQmVsb3csIFxuICAgICAgICAgICAgLy93ZSBhcmUgYXBwZW5kaW5nIChvciBwbGFjaW5nKSB0aGUgbmV3IGVsZW1lbnRzIHdpdGggdGhlIGRhdGEuXG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld0gzVGFnKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdQcmljZVBhcmEpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKHF1aWNrVmlld0J1dHRvbik7IC8vIGFkZGVkIG5ldyBxdWlja1ZpZXcgYnV0dG9uXG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0QnV0dG9uKTtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWxbMF0uYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHF2QnV0dG9uSWQgPSBgI3F2XyR7cHJvZHVjdC5za3V9YDtcbiAgICAgICAgICAgICQocXZCdXR0b25JZCkub24oXCJjbGlja1wiLCB0aGlzLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkkgY2xpY2tlZCBvbiB0aGUgYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoZVNrdSk7XG4gICAgICAgICAgICAgICAgZS5kYXRhLnNob3dRdihlLmRhdGEudGhlQXBwLnByb2R1Y3RzLHRoZVNrdSk7XG4gICAgICAgICAgICAgICAgJChcIi5xdWljay12aWV3XCIpLmZhZGVJbigpO1xuICAgICAgICAgICAgICAgICQoXCIucXYtY2xvc2VcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgJChcIi5xdWljay12aWV3XCIpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pOyAgXG4gICAgICAgIH1cblxuICAgIHRoaXMuaW5pdENhcm91c2VsKCk7XG5cbiAgICB9XG4gICBcbiAgICBzaG93UXYocHJvZHVjdHMsdGhlU2t1KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoZVNrdSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcblxuICAgICAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICAgICAgbGV0IFF1aWNrVmlldyA9ICQoJy5xdWljay12aWV3Jyk7XG5cbiAgICAgICAgJChcIi5xdi1pbmZvXCIpLmh0bWwoXCJcIik7XG5cbiAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCBwcm9kdWN0cy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9kdWN0ID0gcHJvZHVjdHNbcF07XG4gICAgICAgICAgICBsZXQgcHJvZHVjdFNrdSA9IGN1cnJlbnRQcm9kdWN0LnNrdTtcbiAgICAgICAgICAgICAgICBwcm9kdWN0U2t1ID0gcHJvZHVjdFNrdS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHByb2R1Y3RTa3UgPT0gdGhlU2t1KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpIGFtIGhlcmVcIik7IFxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cInF2LWZsZXgtY29udGFpbmVyIHF2LWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInF2LWltYWdlXCIgc3JjPSBcIiR7Y3VycmVudFByb2R1Y3QuaW1hZ2V9XCIgYWx0PSBcIiR7bmFtZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwicXYtdGl0bGUgbGlnaHQtZ3JleS10ZXh0IGZvbnQtcm9ibW9ubyB1cHBlcmNhc2VcIj4ke2N1cnJlbnRQcm9kdWN0Lm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXYtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInF2LXByaWNlIGdyZWVuLXRleHQgZm9udC1yb2Jtb25vXCI+ICR7Y3VycmVudFByb2R1Y3QucmVndWxhclByaWNlfSA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicXYtZGVzY3JpcHRpb24gbGlnaHQtZ3JleS10ZXh0XCI+JHtjdXJyZW50UHJvZHVjdC5sb25nRGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwicXYtJHt0aGVTa3V9XCIgY2xhc3M9XCJxdi1hZGQgYWRkVG9DYXJ0IHVwcGVyY2FzZSBmb250LXJvYm1vbm9cIj5BZGQgdG8gQ2FydDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCcucXYtaW5mbycpLmFwcGVuZChvdXRwdXQpO1xuXG4gICAgICAgIGlmICggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHF2LSR7dGhlU2t1fWApID09PSBudWxsKSB7IHJldHVybiB9IGVsc2UgeyAgIFxuICAgICAgICAgICAgbGV0IHF2Q2FydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBxdi0ke3RoZVNrdX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHF2Q2FydEJ1dHRvbik7XG4gICAgICAgICAgICBxdkNhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucXVpY2tBZGRUb0NhcnQodGhlU2t1LHRoaXMudGhlQXBwKSAsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHF1aWNrQWRkVG9DYXJ0KHRoZVNrdSx0aGVBcHApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoZVNrdSkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhlU2t1LCAxKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ2kgYW0gaGVyZSBpbiB0aGUgcXVpY2t2aWV3IGNhcnQgQnV0dG9uJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXNzaW9uU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2t1ID0gc2Vzc2lvblN0b3JhZ2Uua2V5KGkpO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuICAgICAgICAgICAgICAgIGlmICh0aGVTa3UudG9TdHJpbmcoKSA9PSBjdXJyZW50U2t1LnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YW50aXR5ID0gcGFyc2VJbnQoY3VycmVudFF1YW50aXR5KSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oY3VycmVudFNrdSxjdXJyZW50UXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhdGFsb2dWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart(sku) {\n            if (sessionStorage.getItem(sku) !== \"undefined\") {\n                if (sessionStorage.quantity) {\n                    sessionStorage.quantity = Number(sessionStorage.quantity) + 1;\n                } else {\n                    sessionStorage.quantity = 0;\n                }\n            }\n\n            sessionStorage.setItem(\"Quantity\", 1);\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n            console.log(\"add item to cart\");\n            var theSku = sku;\n            if (sessionStorage.getItem(sku) == undefined) {\n                sessionStorage.setItem(sku, 1);\n                return;\n            }\n            //loop through the skus until it finds the matching sku\n            else {\n                    for (var i = 0; i < sessionStorage.length; i++) {\n                        var currentSku = sessionStorage.key(i);\n                        if (currentSku.toString() == theSku.toString()) {\n                            var currentValue = sessionStorage.getItem(currentSku);\n                            currentValue = parseInt(currentValue) + 1;\n                            //currentValue = currentValue + 1;\n                            sessionStorage.setItem(theSku, currentValue);\n                        }\n                    }\n                }\n        }\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(theApp, sku) {\n            console.log(\"remove item\");\n\n            for (var i = 0; i < sessionStorage.length; i++) {\n                var currentSku = sessionStorage.key(i);\n                var currentQuantity = sessionStorage.getItem(currentSku);\n\n                this.deleteItem(theApp);\n                console.log(\"remove item loop of i\");\n            }\n        }\n    }, {\n        key: \"deleteItem\",\n        value: function deleteItem(theApp) {\n            var products = theApp.products;\n            console.log(\"did i run the deleteitem outside return\");\n            return function () {\n                console.log(\"did i run the deleteitem\");\n                var theSku = e.target.getAttribute(\"name\");\n                console.log(theSku);\n                var deletedItem = sessionStorage.getItem(theSku);\n                sessionStorage.removeItem(theSku);\n                theApp.ShoppingCartView.showCartPopup(products, theApp);\n                var newQuantity = sessionStorage.getItem(\"Quantity\");\n                newQuantity = newQuantity - deletedItem;\n\n                sessionStorage.setItem(\"Quantity\", newQuantity);\n                var currentValue = sessionStorage.getItem(\"Quantity\");\n                $(\"#cart-quantity\").val(currentValue);\n                if (parseInt(currentValue) == 0) {\n                    sessionStorage.clear();\n                    $(\"#cart-quantity\").hide();\n                    // $(document).on(\"click\", \".cart\", this, function())\n                }\n            };\n        }\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, qty) {}\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            console.log(\"clear cart\");\n            sessionStorage.clear();\n            $(\".product-info\").html(\"\");\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJpbml0U2hvcHBpbmdDYXJ0Iiwic2t1Iiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwicXVhbnRpdHkiLCJOdW1iZXIiLCJzZXRJdGVtIiwidGhlU2t1IiwidW5kZWZpbmVkIiwiaSIsImxlbmd0aCIsImN1cnJlbnRTa3UiLCJrZXkiLCJ0b1N0cmluZyIsImN1cnJlbnRWYWx1ZSIsInBhcnNlSW50IiwidGhlQXBwIiwiY3VycmVudFF1YW50aXR5IiwiZGVsZXRlSXRlbSIsInByb2R1Y3RzIiwiZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImRlbGV0ZWRJdGVtIiwicmVtb3ZlSXRlbSIsIlNob3BwaW5nQ2FydFZpZXciLCJzaG93Q2FydFBvcHVwIiwibmV3UXVhbnRpdHkiLCIkIiwidmFsIiwiY2xlYXIiLCJoaWRlIiwicXR5IiwiaHRtbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxZO0FBRWpCLDRCQUFhO0FBQUE7O0FBQ1RDLGdCQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQSxZQUFHQyxPQUFILEVBQVc7QUFDUCxpQkFBS0MsZ0JBQUw7QUFDSCxTQUZELE1BRU87QUFDSEgsb0JBQVFDLEdBQVIsQ0FBWSxzREFBWjtBQUNIO0FBQ0o7Ozs7eUNBRWdCRyxHLEVBQUk7QUFDakIsZ0JBQUlDLGVBQWVDLE9BQWYsQ0FBdUJGLEdBQXZCLE1BQWdDLFdBQXBDLEVBQWlEO0FBQzdDLG9CQUFJQyxlQUFlRSxRQUFuQixFQUE2QjtBQUN6QkYsbUNBQWVFLFFBQWYsR0FBMEJDLE9BQU9ILGVBQWVFLFFBQXRCLElBQWdDLENBQTFEO0FBQ0gsaUJBRkQsTUFFTztBQUNIRixtQ0FBZUUsUUFBZixHQUEwQixDQUExQjtBQUNIO0FBQ0o7O0FBRURGLDJCQUFlSSxPQUFmLENBQXVCLFVBQXZCLEVBQW1DLENBQW5DO0FBQ0FULG9CQUFRQyxHQUFSLENBQVksaUNBQVo7QUFDSDs7O3NDQUVhRyxHLEVBQUk7QUFDZEosb0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLGdCQUFJUyxTQUFTTixHQUFiO0FBQ0EsZ0JBQUlDLGVBQWVDLE9BQWYsQ0FBdUJGLEdBQXZCLEtBQStCTyxTQUFuQyxFQUE4QztBQUMxQ04sK0JBQWVJLE9BQWYsQ0FBdUJMLEdBQXZCLEVBQTRCLENBQTVCO0FBQ0E7QUFDSDtBQUNEO0FBSkEsaUJBS0s7QUFDRCx5QkFBSyxJQUFJUSxJQUFJLENBQWIsRUFBZ0JBLElBQUdQLGVBQWVRLE1BQWxDLEVBQTBDRCxHQUExQyxFQUErQztBQUMzQyw0QkFBSUUsYUFBYVQsZUFBZVUsR0FBZixDQUFtQkgsQ0FBbkIsQ0FBakI7QUFDQSw0QkFBSUUsV0FBV0UsUUFBWCxNQUF5Qk4sT0FBT00sUUFBUCxFQUE3QixFQUFnRDtBQUM1QyxnQ0FBSUMsZUFBZVosZUFBZUMsT0FBZixDQUF1QlEsVUFBdkIsQ0FBbkI7QUFDQUcsMkNBQWVDLFNBQVNELFlBQVQsSUFBdUIsQ0FBdEM7QUFDQTtBQUNBWiwyQ0FBZUksT0FBZixDQUF1QkMsTUFBdkIsRUFBK0JPLFlBQS9CO0FBQ0g7QUFFSjtBQUNKO0FBQ0o7OzsyQ0FHa0JFLE0sRUFBT2YsRyxFQUFJO0FBQzFCSixvQkFBUUMsR0FBUixDQUFZLGFBQVo7O0FBRUEsaUJBQUssSUFBSVcsSUFBRSxDQUFYLEVBQWNBLElBQUVQLGVBQWVRLE1BQS9CLEVBQXVDRCxHQUF2QyxFQUE0QztBQUN4QyxvQkFBSUUsYUFBYVQsZUFBZVUsR0FBZixDQUFtQkgsQ0FBbkIsQ0FBakI7QUFDQSxvQkFBSVEsa0JBQWtCZixlQUFlQyxPQUFmLENBQXVCUSxVQUF2QixDQUF0Qjs7QUFFQSxxQkFBS08sVUFBTCxDQUFnQkYsTUFBaEI7QUFDQW5CLHdCQUFRQyxHQUFSLENBQVksdUJBQVo7QUFDQztBQUVSOzs7bUNBRVVrQixNLEVBQVE7QUFDZixnQkFBSUcsV0FBV0gsT0FBT0csUUFBdEI7QUFDQXRCLG9CQUFRQyxHQUFSLENBQVkseUNBQVo7QUFDQSxtQkFBTyxZQUFXO0FBQ2RELHdCQUFRQyxHQUFSLENBQVksMEJBQVo7QUFDQSxvQkFBSVMsU0FBU2EsRUFBRUMsTUFBRixDQUFTQyxZQUFULENBQXNCLE1BQXRCLENBQWI7QUFDQXpCLHdCQUFRQyxHQUFSLENBQVlTLE1BQVo7QUFDQSxvQkFBSWdCLGNBQWNyQixlQUFlQyxPQUFmLENBQXVCSSxNQUF2QixDQUFsQjtBQUNBTCwrQkFBZXNCLFVBQWYsQ0FBMEJqQixNQUExQjtBQUNBUyx1QkFBT1MsZ0JBQVAsQ0FBd0JDLGFBQXhCLENBQXNDUCxRQUF0QyxFQUFnREgsTUFBaEQ7QUFDQSxvQkFBSVcsY0FBY3pCLGVBQWVDLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBbEI7QUFDQXdCLDhCQUFjQSxjQUFjSixXQUE1Qjs7QUFFQXJCLCtCQUFlSSxPQUFmLENBQXVCLFVBQXZCLEVBQW1DcUIsV0FBbkM7QUFDQSxvQkFBSWIsZUFBZVosZUFBZUMsT0FBZixDQUF1QixVQUF2QixDQUFuQjtBQUNBeUIsa0JBQUUsZ0JBQUYsRUFBb0JDLEdBQXBCLENBQXdCZixZQUF4QjtBQUNBLG9CQUFLQyxTQUFTRCxZQUFULEtBQTBCLENBQS9CLEVBQWtDO0FBQzlCWixtQ0FBZTRCLEtBQWY7QUFDQUYsc0JBQUUsZ0JBQUYsRUFBb0JHLElBQXBCO0FBQ0E7QUFFSDtBQUNKLGFBbkJEO0FBb0JIOzs7bURBRTBCOUIsRyxFQUFJK0IsRyxFQUFJLENBR2xDOzs7b0NBRVU7QUFDUG5DLG9CQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBSSwyQkFBZTRCLEtBQWY7QUFDQUYsY0FBRSxlQUFGLEVBQW1CSyxJQUFuQixDQUF3QixFQUF4QjtBQUNIOzs7Ozs7a0JBOUZnQnJDLFkiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0e1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgICAgICBpZihTdG9yYWdlKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciEgU2Vzc2lvblN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdFNob3BwaW5nQ2FydChza3Upe1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpICE9PSBcInVuZGVmaW5lZFwiKSB7IFxuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLnF1YW50aXR5KSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucXVhbnRpdHkgPSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UucXVhbnRpdHkpKzE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnF1YW50aXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJRdWFudGl0eVwiLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2hlZCBjcmVhdGluZyBzaG9wcGluZyBjYXJ0XCIpO1xuICAgIH1cblxuICAgIGFkZEl0ZW1Ub0NhcnQoc2t1KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGQgaXRlbSB0byBjYXJ0XCIpO1xuICAgICAgICBsZXQgdGhlU2t1ID0gc2t1O1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShza3UsIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vbG9vcCB0aHJvdWdoIHRoZSBza3VzIHVudGlsIGl0IGZpbmRzIHRoZSBtYXRjaGluZyBza3VcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8c2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNrdSA9IHNlc3Npb25TdG9yYWdlLmtleShpKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNrdS50b1N0cmluZygpID09IHRoZVNrdS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBwYXJzZUludChjdXJyZW50VmFsdWUpKzE7XG4gICAgICAgICAgICAgICAgICAgIC8vY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlICsgMTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGVTa3UsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW1vdmVJdGVtRnJvbUNhcnQodGhlQXBwLHNrdSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIGl0ZW1cIik7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHNlc3Npb25TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNrdSA9IHNlc3Npb25TdG9yYWdlLmtleShpKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0odGhlQXBwKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIGl0ZW0gbG9vcCBvZiBpXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZGVsZXRlSXRlbSh0aGVBcHApIHtcbiAgICAgICAgbGV0IHByb2R1Y3RzID0gdGhlQXBwLnByb2R1Y3RzO1xuICAgICAgICBjb25zb2xlLmxvZyhcImRpZCBpIHJ1biB0aGUgZGVsZXRlaXRlbSBvdXRzaWRlIHJldHVyblwiKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWQgaSBydW4gdGhlIGRlbGV0ZWl0ZW1cIik7XG4gICAgICAgICAgICBsZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZVNrdSk7XG4gICAgICAgICAgICBsZXQgZGVsZXRlZEl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoZVNrdSk7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHRoZVNrdSk7XG4gICAgICAgICAgICB0aGVBcHAuU2hvcHBpbmdDYXJ0Vmlldy5zaG93Q2FydFBvcHVwKHByb2R1Y3RzLCB0aGVBcHApO1xuICAgICAgICAgICAgbGV0IG5ld1F1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIlF1YW50aXR5XCIpO1xuICAgICAgICAgICAgbmV3UXVhbnRpdHkgPSBuZXdRdWFudGl0eSAtIGRlbGV0ZWRJdGVtO1xuXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiUXVhbnRpdHlcIiwgbmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJRdWFudGl0eVwiKTtcbiAgICAgICAgICAgICQoXCIjY2FydC1xdWFudGl0eVwiKS52YWwoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIGlmICAocGFyc2VJbnQoY3VycmVudFZhbHVlKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAkKFwiI2NhcnQtcXVhbnRpdHlcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2FydFwiLCB0aGlzLCBmdW5jdGlvbigpKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVRdWFudGl0eW9mSXRlbUluQ2FydChza3UscXR5KXtcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBjbGVhckNhcnQoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGVhciBjYXJ0XCIpICAgIFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAkKFwiLnByb2R1Y3QtaW5mb1wiKS5odG1sKFwiXCIpO1xuICAgIH1cbn1cbiAgXG5cbiAgIFxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2hvcHBpbmdDYXJ0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ShoppingCartView = function () {\n\tfunction ShoppingCartView() {\n\t\t_classCallCheck(this, ShoppingCartView);\n\t}\n\n\t_createClass(ShoppingCartView, [{\n\t\tkey: \"showCartPopup\",\n\t\tvalue: function showCartPopup(theApp, products) {\n\t\t\tconsole.log(products);\n\t\t\tvar output = \"\";\n\t\t\tvar CartView = $('.cartView');\n\n\t\t\t//maybe insert something here if the shopping cart is empty:\n\t\t\t//if(sessionStorage.length == 0) {\n\t\t\t//return ;\n\t\t\t//\t}\n\t\t\t$(\".product-info\").html(\"\");\n\n\t\t\tfor (var i = 0; i < sessionStorage.length; i++) {\n\t\t\t\tvar currentSku = sessionStorage.key(i); //this is a string\n\t\t\t\tvar currentQuantity = sessionStorage.getItem(currentSku); //this is a string\n\t\t\t\tfor (var p = 0; p < products.length; p++) {\n\t\t\t\t\tvar currentProduct = products[p];\n\t\t\t\t\tvar productSku = currentProduct.sku;\n\t\t\t\t\tproductSku = productSku.toString();\n\t\t\t\t\tif (productSku == currentSku) {\n\t\t\t\t\t\t// let image = currentProduct.image;\n\t\t\t\t\t\t// let name = currentProduct.name;\n\t\t\t\t\t\t// let price = currentProduct.regularPrice;\n\t\t\t\t\t\t// += : equals plus\n\t\t\t\t\t\toutput += \"<div id=\\\"flex-container\\\" class=\\\"product-info\\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\\"cart-image\\\" src= \\\"\" + currentProduct.image + \"\\\" alt= \\\"\" + name + \"\\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\\"cart-title\\\"> \" + currentProduct.manufacturer + \" </p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\\"cart-price green-text\\\">$\" + currentProduct.regularPrice + \" </p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<input id=\\\"add\\\" type=\\\"number\\\" value=\" + currentQuantity + \">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button type=\\\"button\\\" class=\\\"cart-update\\\">Update</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button type=\\\"button\\\" id=\\\"removeItem\\\" class=\\\"cart-remove\\\">Remove</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\";\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t$('.productView').append(output);\n\n\t\t\tvar removeButton = document.getElementById(\"removeItem\");\n\t\t\tif (removeButton !== null) {\n\t\t\t\tremoveButton.addEventListener(\"click\", theApp.clickRemove(theApp), false);\n\t\t\t\tconsole.log(\"i am in the removebutton\");\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn ShoppingCartView;\n}();\n// _${currentSku}\n\n// $(document).ready(function(){\n\n// let cartQuantity = 0;\n\n// $(\".addToCart\").on(\"click\", function (){\n//     cartQuantity += 1;\n//     console.log(\"i work\");\n//     $(\".cart-count\").html(cartQuantity);                   \n//     $(\"#cart-quantity\").show(); \n//  });\n\n// });\n\n\nexports.default = ShoppingCartView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcz81OWU5Il0sIm5hbWVzIjpbIlNob3BwaW5nQ2FydFZpZXciLCJ0aGVBcHAiLCJwcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJvdXRwdXQiLCJDYXJ0VmlldyIsIiQiLCJodG1sIiwiaSIsInNlc3Npb25TdG9yYWdlIiwibGVuZ3RoIiwiY3VycmVudFNrdSIsImtleSIsImN1cnJlbnRRdWFudGl0eSIsImdldEl0ZW0iLCJwIiwiY3VycmVudFByb2R1Y3QiLCJwcm9kdWN0U2t1Iiwic2t1IiwidG9TdHJpbmciLCJpbWFnZSIsIm5hbWUiLCJtYW51ZmFjdHVyZXIiLCJyZWd1bGFyUHJpY2UiLCJhcHBlbmQiLCJyZW1vdmVCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaWNrUmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxnQjtBQUNwQiw2QkFBYTtBQUFBO0FBQUU7Ozs7Z0NBQ0RDLE0sRUFBT0MsUSxFQUFVO0FBQzlCQyxXQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDQSxPQUFJRyxTQUFTLEVBQWI7QUFDQSxPQUFJQyxXQUFXQyxFQUFFLFdBQUYsQ0FBZjs7QUFFQztBQUNBO0FBQ0M7QUFDRDtBQUNBQSxLQUFFLGVBQUYsRUFBbUJDLElBQW5CLENBQXdCLEVBQXhCOztBQUVBLFFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxlQUFlQyxNQUFuQyxFQUEyQ0YsR0FBM0MsRUFBZ0Q7QUFDL0MsUUFBSUcsYUFBYUYsZUFBZUcsR0FBZixDQUFtQkosQ0FBbkIsQ0FBakIsQ0FEK0MsQ0FDUDtBQUN4QyxRQUFJSyxrQkFBa0JKLGVBQWVLLE9BQWYsQ0FBdUJILFVBQXZCLENBQXRCLENBRitDLENBRVc7QUFDMUQsU0FBSyxJQUFJSSxJQUFJLENBQWIsRUFBZ0JBLElBQUlkLFNBQVNTLE1BQTdCLEVBQXFDSyxHQUFyQyxFQUEwQztBQUN6QyxTQUFJQyxpQkFBaUJmLFNBQVNjLENBQVQsQ0FBckI7QUFDQSxTQUFJRSxhQUFhRCxlQUFlRSxHQUFoQztBQUNDRCxrQkFBYUEsV0FBV0UsUUFBWCxFQUFiO0FBQ0QsU0FBSUYsY0FBY04sVUFBbEIsRUFBOEI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQVAsNEhBQ21DWSxlQUFlSSxLQURsRCxrQkFDa0VDLElBRGxFLHdEQUU0QkwsZUFBZU0sWUFGM0MscUVBR3VDTixlQUFlTyxZQUh0RCx5RUFJeUNWLGVBSnpDO0FBU0E7QUFDRDtBQUNEO0FBQ0RQLEtBQUUsY0FBRixFQUFrQmtCLE1BQWxCLENBQXlCcEIsTUFBekI7O0FBRUEsT0FBSXFCLGVBQWVDLFNBQVNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDTSxPQUFJRixpQkFBaUIsSUFBckIsRUFBMkI7QUFDcEJBLGlCQUFhRyxnQkFBYixDQUE4QixPQUE5QixFQUF1QzVCLE9BQU82QixXQUFQLENBQW1CN0IsTUFBbkIsQ0FBdkMsRUFBbUUsS0FBbkU7QUFDQUUsWUFBUUMsR0FBUixDQUFZLDBCQUFaO0FBQ0g7QUFDWDs7Ozs7QUFFRDs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztrQkEzRHFCSixnQiIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0VmlldyB7XG5cdGNvbnN0cnVjdG9yKCl7fVxuXHRzaG93Q2FydFBvcHVwKHRoZUFwcCxwcm9kdWN0cykge1xuXHRcdGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcblx0XHRsZXQgb3V0cHV0ID0gXCJcIjtcblx0XHRsZXQgQ2FydFZpZXcgPSAkKCcuY2FydFZpZXcnKTtcblxuXHRcdFx0Ly9tYXliZSBpbnNlcnQgc29tZXRoaW5nIGhlcmUgaWYgdGhlIHNob3BwaW5nIGNhcnQgaXMgZW1wdHk6XG5cdFx0XHQvL2lmKHNlc3Npb25TdG9yYWdlLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdC8vcmV0dXJuIDtcblx0XHRcdC8vXHR9XG5cdFx0XHQkKFwiLnByb2R1Y3QtaW5mb1wiKS5odG1sKFwiXCIpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNlc3Npb25TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBjdXJyZW50U2t1ID0gc2Vzc2lvblN0b3JhZ2Uua2V5KGkpOyAvL3RoaXMgaXMgYSBzdHJpbmdcblx0XHRcdFx0bGV0IGN1cnJlbnRRdWFudGl0eSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oY3VycmVudFNrdSk7IC8vdGhpcyBpcyBhIHN0cmluZ1xuXHRcdFx0XHRmb3IgKGxldCBwID0gMDsgcCA8IHByb2R1Y3RzLmxlbmd0aDsgcCsrKSB7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRQcm9kdWN0ID0gcHJvZHVjdHNbcF07XG5cdFx0XHRcdFx0bGV0IHByb2R1Y3RTa3UgPSBjdXJyZW50UHJvZHVjdC5za3U7XG5cdFx0XHRcdFx0XHRwcm9kdWN0U2t1ID0gcHJvZHVjdFNrdS50b1N0cmluZygpO1xuXHRcdFx0XHRcdGlmIChwcm9kdWN0U2t1ID09IGN1cnJlbnRTa3UpIHtcblx0XHRcdFx0XHRcdC8vIGxldCBpbWFnZSA9IGN1cnJlbnRQcm9kdWN0LmltYWdlO1xuXHRcdFx0XHRcdFx0Ly8gbGV0IG5hbWUgPSBjdXJyZW50UHJvZHVjdC5uYW1lO1xuXHRcdFx0XHRcdFx0Ly8gbGV0IHByaWNlID0gY3VycmVudFByb2R1Y3QucmVndWxhclByaWNlO1xuXHRcdFx0XHRcdFx0Ly8gKz0gOiBlcXVhbHMgcGx1c1xuXHRcdFx0XHRcdFx0b3V0cHV0ICs9IGA8ZGl2IGlkPVwiZmxleC1jb250YWluZXJcIiBjbGFzcz1cInByb2R1Y3QtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cImNhcnQtaW1hZ2VcIiBzcmM9IFwiJHtjdXJyZW50UHJvZHVjdC5pbWFnZX1cIiBhbHQ9IFwiJHtuYW1lfVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJjYXJ0LXRpdGxlXCI+ICR7Y3VycmVudFByb2R1Y3QubWFudWZhY3R1cmVyfSA8L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cImNhcnQtcHJpY2UgZ3JlZW4tdGV4dFwiPiQke2N1cnJlbnRQcm9kdWN0LnJlZ3VsYXJQcmljZX0gPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwiYWRkXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPSR7Y3VycmVudFF1YW50aXR5fT5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FydC11cGRhdGVcIj5VcGRhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwicmVtb3ZlSXRlbVwiIGNsYXNzPVwiY2FydC1yZW1vdmVcIj5SZW1vdmU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0YDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQoJy5wcm9kdWN0VmlldycpLmFwcGVuZChvdXRwdXQpO1xuXG5cdFx0XHRsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW1vdmVJdGVtXCIpO1xuICAgICAgICBcdGlmIChyZW1vdmVCdXR0b24gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoZUFwcC5jbGlja1JlbW92ZSh0aGVBcHApLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaSBhbSBpbiB0aGUgcmVtb3ZlYnV0dG9uXCIpO1xuICAgICAgICAgICAgfVxuXHR9XG59XG5cdC8vIF8ke2N1cnJlbnRTa3V9XG5cbi8vICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFxuLy8gbGV0IGNhcnRRdWFudGl0eSA9IDA7XG5cbi8vICQoXCIuYWRkVG9DYXJ0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCl7XG4vLyAgICAgY2FydFF1YW50aXR5ICs9IDE7XG4vLyAgICAgY29uc29sZS5sb2coXCJpIHdvcmtcIik7XG4vLyAgICAgJChcIi5jYXJ0LWNvdW50XCIpLmh0bWwoY2FydFF1YW50aXR5KTsgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgJChcIiNjYXJ0LXF1YW50aXR5XCIpLnNob3coKTsgXG4vLyAgfSk7XG5cbi8vIH0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2hvcHBpbmdDYXJ0Vmlldy5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);