/******/ (function(modules) { // webpackBootstrap
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
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

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

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Calculator() {
	  this.stack = [];
	}

	Calculator.prototype.operations = {
	  // Arithmetic operations.
	  "+": {
	    arity: 2,
	    callback: function (a, b) {
	      return a + b;
	    }
	  },
	  "-": {
	    arity: 2,
	    callback: function (a, b) {
	      return a - b;
	    }
	  },
	  "*": {
	    arity: 2,
	    callback: function (a, b) {
	      return a * b;
	    }
	  },
	  "/": {
	    arity: 2,
	    callback: function (a, b) {
	      if (!b) {
	        throw "division by zero";
	      }

	      return a / b;
	    }
	  },

	  // Bitwise operations.
	  "&": {
	    arity: 2,
	    callback: function (a, b) {
	      return a & b;
	    }
	  },
	  "|": {
	    arity: 2,
	    callback: function (a, b) {
	      return a | b;
	    }
	  },
	  "^": {
	    arity: 2,
	    callback: function (a, b) {
	      return a ^ b;
	    }
	  },

	  // Boolean operations.
	  "=": {
	    arity: 2,
	    callback: function (a, b) {
	      return a === b ? 1 : 0;
	    }
	  },
	  "<>": {
	    arity: 2,
	    callback: function (a, b) {
	      return a !== b ? 1 : 0;
	    }
	  },
	  "<": {
	    arity: 2,
	    callback: function (a, b) {
	      return a < b ? 1 : 0;
	    }
	  },
	  ">": {
	    arity: 2,
	    callback: function (a, b) {
	      return a > b ? 1 : 0;
	    }
	  },
	  "<=": {
	    arity: 2,
	    callback: function (a, b) {
	      return a <= b ? 1 : 0;
	    }
	  },
	  ">=": {
	    arity: 2,
	    callback: function (a, b) {
	      return a >= b ? 1 : 0;
	    }
	  },
	  "!": {
	    arity: 1,
	    callback: function (a) {
	      return !a ? 1 : 0;
	    }
	  },

	  "sin": {
	    arity: 1,
	    callback: Math.sin
	  },
	  "tan": {
	    arity: 1,
	    callback: Math.tan
	  },
	  "cos": {
	    arity: 1,
	    callback: Math.cos
	  },
	  "pow": {
	    arity: 1,
	    callback: Math.pow
	  },
	  "log": {
	    arity: 1,
	    callback: Math.log
	  },
	  "exp": {
	    arity: 1,
	    callback: Math.exp
	  },
	  "round": {
	    arity: 1,
	    callback: Math.round
	  },

	  // Stack manipulation operations.
	  "dup": {
	    arity: 1,
	    callback: function (a) {
	      this.push(a);
	      this.push(a);
	    }
	  },
	  "drop": {
	    arity: 1,
	    callback: function () {}
	  },
	  "swap": {
	    arity: 2,
	    callback: function (a, b) {
	      this.push(b, a);
	    }
	  },
	  "over": {
	    arity: 2,
	    callback: function (a, b) {
	      this.push(a, b, a);
	    }
	  },
	  "rot": {
	    arity: 3,
	    callback: function (a, b, c) {
	      this.push(b, c, a);
	    }
	  },
	  "nip": {
	    arity: 2,
	    callback: function (a, b) {
	      this.push(b);
	    }
	  },
	  "tuck": {
	    arity: 2,
	    callback: function (a, b) {
	      this.push(b, a, b);
	    }
	  },
	  "clear": {
	    arity: 0,
	    callback: function () {
	      this.length = 0;
	    }
	  },
	  "depth": {
	    arity: 0,
	    callback: function () {
	      this.push(this.length);
	    }
	  }
	};

	Calculator.prototype.eval = function (line) {
	  var words = line.split(/\s+/);

	  if (!words.length) {
	    return;
	  }
	  for (var i = 0; i < words.length; ++i) {
	    var word = words[i];
	    var operation;
	    var result;

	    if (/^(\+|-)?[0-9]+(\.[0-9]+)?$/.test(word)) {
	      var value = parseFloat(word);

	      if (isNaN(value)) {
	        throw "unable to parse '" + word + "' into number";
	      }
	      this.stack.push(value);
	      continue;
	    }

	    operation = this.operations[word];
	    if (!operation) {
	      throw "unrecognized operation: '" + word + "'";
	    }
	    else if (this.stack.length < operation.arity) {
	      throw "stack underflow";
	    }

	    result = operation.callback.apply(
	      this.stack,
	      this.stack.splice(this.stack.length - operation.arity, operation.arity)
	    );
	    if (typeof result === "number") {
	      this.stack.push(result);
	    }
	  }
	};

	module.exports = Calculator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);

	(function () {
	  var calculator = new (__webpack_require__(1))();
	  var buffer = document.getElementById("ui-buffer");
	  var input = document.getElementById("ui-input");
	  var stack = document.getElementById("ui-stack");

	  input.focus();

	  function println(line, className) {
	    var li = document.createElement("li");

	    li.textContent = line;
	    if (className) {
	      li.setAttribute("class", className);
	    }
	    buffer.insertBefore(li, buffer.firstChild);
	  }

	  function updateStack() {
	    stack.innerHTML = "";
	    for (var i = 0; i < calculator.stack.length; ++i) {
	      var li = document.createElement("li");

	      li.textContent = String(calculator.stack[i]);
	      stack.insertBefore(li, stack.firstChild);
	    }
	  }

	  input.addEventListener("keydown", function (ev) {
	    var line = input.value.trim();
	    var exception;

	    if (ev.keyCode !== 13 || !line.length) {
	      return;
	    }
	    ev.preventDefault();
	    println(line);
	    try {
	      calculator.eval(line);
	      input.value = "";
	    }
	    catch (ex) {
	      if (typeof ex === "string") {
	        println(ex, "error");
	      } else {
	        exception = ex;
	      }
	    }
	    updateStack();
	    input.focus();
	    if (exception) {
	      throw exception;
	    }
	  });
	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n  font-family: \"Inconsolata\", monospace;\n  font-size: 1.1em;\n  margin: 0;\n  padding: 0;\n}\nbody {\n  background: #002b36;\n  color: #839496;\n}\nul {\n  list-style: none;\n}\nul li {\n  padding: 0.4em 1em;\n}\nul li:hover {\n  background: #003f50;\n}\n#container-left {\n  position: absolute;\n  top: 0%;\n  bottom: 100%;\n  left: 0%;\n  right: 80%;\n  width: 80%;\n  height: 100%;\n  overflow-y: auto;\n}\n#container-right {\n  background: #00171c;\n  position: absolute;\n  top: 0%;\n  bottom: 100%;\n  left: 80%;\n  right: 100%;\n  width: 20%;\n  height: 100%;\n  overflow-y: auto;\n}\n#ui-input {\n  background: #586e75;\n  border: 0;\n  color: #002b36;\n  cursor: pointer;\n  display: block;\n  padding: 0.4em 1em;\n  width: 100%;\n}\n#ui-buffer .error {\n  color: #dc322f;\n}\n#ui-stack li {\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);