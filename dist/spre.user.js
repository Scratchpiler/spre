// ==UserScript==
// @name         SPRE
// @namespace    https://github.com/Scratchpiler
// @version      0.1.0
// @description  Run Scratch projects deterministically: rewind, savestates, frame stepping, frozen variables and replayable input movies.
// @match        https://scratch.mit.edu/projects/*
// @run-at       document-idle
// @grant        GM_getResourceURL
// @resource     resvg https://cdn.jsdelivr.net/npm/@resvg/resvg-wasm@2.6.2/index_bg.wasm
// @resource     font0 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/NotoSans-Medium.ttf
// @resource     font1 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/SourceSerifPro-Regular.otf
// @resource     font2 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/handlee-regular.ttf
// @resource     font3 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/Knewave.ttf
// @resource     font4 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/Griffy-Regular.ttf
// @resource     font5 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/Grand9K-Pixel.ttf
// @resource     font6 https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/Scratch.ttf
// ==/UserScript==
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/twgl.js/dist/4.x/twgl-full.js
  var require_twgl_full = __commonJS({
    "node_modules/twgl.js/dist/4.x/twgl-full.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["twgl"] = factory();
        else
          root["twgl"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return (
          /******/
          (function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module2 = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
              };
              modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
              module2.l = true;
              return module2.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports2, name, getter) {
              if (!__webpack_require__.o(exports2, name)) {
                Object.defineProperty(exports2, name, { enumerable: true, get: getter });
              }
            };
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
            __webpack_require__.t = function(value, mode) {
              if (mode & 1) value = __webpack_require__(value);
              if (mode & 8) return value;
              if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
              var ns = /* @__PURE__ */ Object.create(null);
              __webpack_require__.r(ns);
              Object.defineProperty(ns, "default", { enumerable: true, value });
              if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
              return ns;
            };
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                /******/
                function getDefault() {
                  return module2["default"];
                }
              ) : (
                /******/
                function getModuleExports() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = "./src/twgl-full.js");
          })({
            /***/
            "./src/attributes.js": (
              /*!***************************!*\
                !*** ./src/attributes.js ***!
                \***************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.createAttribsFromArrays = createAttribsFromArrays;
                exports2.createBuffersFromArrays = createBuffersFromArrays;
                exports2.createBufferFromArray = createBufferFromArray;
                exports2.createBufferFromTypedArray = createBufferFromTypedArray;
                exports2.createBufferInfoFromArrays = createBufferInfoFromArrays;
                exports2.setAttribInfoBufferFromArray = setAttribInfoBufferFromArray;
                exports2.setAttributePrefix = setAttributePrefix;
                exports2.setAttributeDefaults_ = setDefaults;
                exports2.getNumComponents_ = getNumComponents;
                exports2.getArray_ = getArray;
                var typedArrays2 = _interopRequireWildcard(__webpack_require__(
                  /*! ./typedarrays.js */
                  "./src/typedarrays.js"
                ));
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var STATIC_DRAW = 35044;
                var ARRAY_BUFFER = 34962;
                var ELEMENT_ARRAY_BUFFER = 34963;
                var BUFFER_SIZE = 34660;
                var BYTE = 5120;
                var UNSIGNED_BYTE = 5121;
                var SHORT = 5122;
                var UNSIGNED_SHORT = 5123;
                var INT = 5124;
                var UNSIGNED_INT = 5125;
                var FLOAT = 5126;
                var gl = void 0;
                var defaults = {
                  attribPrefix: ""
                };
                function setAttributePrefix(prefix) {
                  defaults.attribPrefix = prefix;
                }
                function setDefaults(newDefaults) {
                  helper.copyExistingProperties(newDefaults, defaults);
                }
                function setBufferFromTypedArray(gl2, type, buffer, array, drawType) {
                  gl2.bindBuffer(type, buffer);
                  gl2.bufferData(type, array, drawType || STATIC_DRAW);
                }
                function createBufferFromTypedArray(gl2, typedArray, type, drawType) {
                  if (helper.isBuffer(gl2, typedArray)) {
                    return typedArray;
                  }
                  type = type || ARRAY_BUFFER;
                  var buffer = gl2.createBuffer();
                  setBufferFromTypedArray(gl2, type, buffer, typedArray, drawType);
                  return buffer;
                }
                function isIndices(name) {
                  return name === "indices";
                }
                function getNormalizationForTypedArray(typedArray) {
                  if (typedArray instanceof Int8Array) {
                    return true;
                  }
                  if (typedArray instanceof Uint8Array) {
                    return true;
                  }
                  return false;
                }
                function getNormalizationForTypedArrayType(typedArrayType) {
                  if (typedArrayType === Int8Array) {
                    return true;
                  }
                  if (typedArrayType === Uint8Array) {
                    return true;
                  }
                  return false;
                }
                function getArray(array) {
                  return array.length ? array : array.data;
                }
                var texcoordRE = /coord|texture/i;
                var colorRE = /color|colour/i;
                function guessNumComponentsFromName(name, length2) {
                  var numComponents;
                  if (texcoordRE.test(name)) {
                    numComponents = 2;
                  } else if (colorRE.test(name)) {
                    numComponents = 4;
                  } else {
                    numComponents = 3;
                  }
                  if (length2 % numComponents > 0) {
                    throw new Error("Can not guess numComponents for attribute '".concat(name, "'. Tried ").concat(numComponents, " but ").concat(length2, " values is not evenly divisible by ").concat(numComponents, ". You should specify it."));
                  }
                  return numComponents;
                }
                function getNumComponents(array, arrayName) {
                  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
                }
                function makeTypedArray(array, name) {
                  if (typedArrays2.isArrayBuffer(array)) {
                    return array;
                  }
                  if (typedArrays2.isArrayBuffer(array.data)) {
                    return array.data;
                  }
                  if (Array.isArray(array)) {
                    array = {
                      data: array
                    };
                  }
                  var Type = array.type;
                  if (!Type) {
                    if (isIndices(name)) {
                      Type = Uint16Array;
                    } else {
                      Type = Float32Array;
                    }
                  }
                  return new Type(array.data);
                }
                function createAttribsFromArrays(gl2, arrays) {
                  var attribs = {};
                  Object.keys(arrays).forEach(function(arrayName) {
                    if (!isIndices(arrayName)) {
                      var array = arrays[arrayName];
                      var attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
                      if (array.value) {
                        if (!Array.isArray(array.value) && !typedArrays2.isArrayBuffer(array.value)) {
                          throw new Error("array.value is not array or typedarray");
                        }
                        attribs[attribName] = {
                          value: array.value
                        };
                      } else {
                        var buffer;
                        var type;
                        var normalization;
                        var numComponents;
                        if (array.buffer && array.buffer instanceof WebGLBuffer) {
                          buffer = array.buffer;
                          numComponents = array.numComponents || array.size;
                          type = array.type;
                          normalization = array.normalize;
                        } else if (typeof array === "number" || typeof array.data === "number") {
                          var numValues = array.data || array;
                          var arrayType = array.type || Float32Array;
                          var numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                          type = typedArrays2.getGLTypeForTypedArrayType(arrayType);
                          normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                          numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                          buffer = gl2.createBuffer();
                          gl2.bindBuffer(ARRAY_BUFFER, buffer);
                          gl2.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
                        } else {
                          var typedArray = makeTypedArray(array, arrayName);
                          buffer = createBufferFromTypedArray(gl2, typedArray, void 0, array.drawType);
                          type = typedArrays2.getGLTypeForTypedArray(typedArray);
                          normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArray(typedArray);
                          numComponents = getNumComponents(array, arrayName);
                        }
                        attribs[attribName] = {
                          buffer,
                          numComponents,
                          type,
                          normalize: normalization,
                          stride: array.stride || 0,
                          offset: array.offset || 0,
                          divisor: array.divisor === void 0 ? void 0 : array.divisor,
                          drawType: array.drawType
                        };
                      }
                    }
                  });
                  gl2.bindBuffer(ARRAY_BUFFER, null);
                  return attribs;
                }
                function setAttribInfoBufferFromArray(gl2, attribInfo, array, offset) {
                  array = makeTypedArray(array);
                  if (offset !== void 0) {
                    gl2.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
                    gl2.bufferSubData(ARRAY_BUFFER, offset, array);
                  } else {
                    setBufferFromTypedArray(gl2, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
                  }
                }
                function getBytesPerValueForGLType(gl2, type) {
                  if (type === BYTE) return 1;
                  if (type === UNSIGNED_BYTE) return 1;
                  if (type === SHORT) return 2;
                  if (type === UNSIGNED_SHORT) return 2;
                  if (type === INT) return 4;
                  if (type === UNSIGNED_INT) return 4;
                  if (type === FLOAT) return 4;
                  return 0;
                }
                var positionKeys = ["position", "positions", "a_position"];
                function getNumElementsFromNonIndexedArrays(arrays) {
                  var key;
                  var ii;
                  for (ii = 0; ii < positionKeys.length; ++ii) {
                    key = positionKeys[ii];
                    if (key in arrays) {
                      break;
                    }
                  }
                  if (ii === positionKeys.length) {
                    key = Object.keys(arrays)[0];
                  }
                  var array = arrays[key];
                  var length2 = getArray(array).length;
                  if (length2 === void 0) {
                    return 1;
                  }
                  var numComponents = getNumComponents(array, key);
                  var numElements = length2 / numComponents;
                  if (length2 % numComponents > 0) {
                    throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length2));
                  }
                  return numElements;
                }
                function getNumElementsFromAttributes(gl2, attribs) {
                  var key;
                  var ii;
                  for (ii = 0; ii < positionKeys.length; ++ii) {
                    key = positionKeys[ii];
                    if (key in attribs) {
                      break;
                    }
                    key = defaults.attribPrefix + key;
                    if (key in attribs) {
                      break;
                    }
                  }
                  if (ii === positionKeys.length) {
                    key = Object.keys(attribs)[0];
                  }
                  var attrib = attribs[key];
                  if (!attrib.buffer) {
                    return 1;
                  }
                  gl2.bindBuffer(ARRAY_BUFFER, attrib.buffer);
                  var numBytes = gl2.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
                  gl2.bindBuffer(ARRAY_BUFFER, null);
                  var bytesPerValue = getBytesPerValueForGLType(gl2, attrib.type);
                  var totalElements = numBytes / bytesPerValue;
                  var numComponents = attrib.numComponents || attrib.size;
                  var numElements = totalElements / numComponents;
                  if (numElements % 1 !== 0) {
                    throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length));
                  }
                  return numElements;
                }
                function createBufferInfoFromArrays(gl2, arrays, srcBufferInfo) {
                  var newAttribs = createAttribsFromArrays(gl2, arrays);
                  var bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
                  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
                  var indices = arrays.indices;
                  if (indices) {
                    var newIndices = makeTypedArray(indices, "indices");
                    bufferInfo.indices = createBufferFromTypedArray(gl2, newIndices, ELEMENT_ARRAY_BUFFER);
                    bufferInfo.numElements = newIndices.length;
                    bufferInfo.elementType = typedArrays2.getGLTypeForTypedArray(newIndices);
                  } else if (!bufferInfo.numElements) {
                    bufferInfo.numElements = getNumElementsFromAttributes(gl2, bufferInfo.attribs);
                  }
                  return bufferInfo;
                }
                function createBufferFromArray(gl2, array, arrayName) {
                  var type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
                  var typedArray = makeTypedArray(array, arrayName);
                  return createBufferFromTypedArray(gl2, typedArray, type);
                }
                function createBuffersFromArrays(gl2, arrays) {
                  var buffers = {};
                  Object.keys(arrays).forEach(function(key) {
                    buffers[key] = createBufferFromArray(gl2, arrays[key], key);
                  });
                  if (arrays.indices) {
                    buffers.numElements = arrays.indices.length;
                    buffers.elementType = typedArrays2.getGLTypeForTypedArray(makeTypedArray(arrays.indices), "indices");
                  } else {
                    buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
                  }
                  return buffers;
                }
              })
            ),
            /***/
            "./src/draw.js": (
              /*!*********************!*\
                !*** ./src/draw.js ***!
                \*********************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.drawBufferInfo = drawBufferInfo;
                exports2.drawObjectList = drawObjectList;
                var programs = _interopRequireWildcard(__webpack_require__(
                  /*! ./programs.js */
                  "./src/programs.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var TRIANGLES = 4;
                var UNSIGNED_SHORT = 5123;
                function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
                  type = type === void 0 ? TRIANGLES : type;
                  var indices = bufferInfo.indices;
                  var elementType = bufferInfo.elementType;
                  var numElements = count === void 0 ? bufferInfo.numElements : count;
                  offset = offset === void 0 ? 0 : offset;
                  if (elementType || indices) {
                    if (instanceCount !== void 0) {
                      gl.drawElementsInstanced(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
                    } else {
                      gl.drawElements(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset);
                    }
                  } else {
                    if (instanceCount !== void 0) {
                      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
                    } else {
                      gl.drawArrays(type, offset, numElements);
                    }
                  }
                }
                function drawObjectList(gl, objectsToDraw) {
                  var lastUsedProgramInfo = null;
                  var lastUsedBufferInfo = null;
                  objectsToDraw.forEach(function(object) {
                    if (object.active === false) {
                      return;
                    }
                    var programInfo = object.programInfo;
                    var bufferInfo = object.vertexArrayInfo || object.bufferInfo;
                    var bindBuffers = false;
                    var type = object.type === void 0 ? TRIANGLES : object.type;
                    if (programInfo !== lastUsedProgramInfo) {
                      lastUsedProgramInfo = programInfo;
                      gl.useProgram(programInfo.program);
                      bindBuffers = true;
                    }
                    if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
                      if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
                        gl.bindVertexArray(null);
                      }
                      lastUsedBufferInfo = bufferInfo;
                      programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
                    }
                    programs.setUniforms(programInfo, object.uniforms);
                    drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
                  });
                  if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
                    gl.bindVertexArray(null);
                  }
                }
              })
            ),
            /***/
            "./src/framebuffers.js": (
              /*!*****************************!*\
                !*** ./src/framebuffers.js ***!
                \*****************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.bindFramebufferInfo = bindFramebufferInfo;
                exports2.createFramebufferInfo = createFramebufferInfo;
                exports2.resizeFramebufferInfo = resizeFramebufferInfo;
                var textures = _interopRequireWildcard(__webpack_require__(
                  /*! ./textures.js */
                  "./src/textures.js"
                ));
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var gl = void 0;
                var FRAMEBUFFER = 36160;
                var RENDERBUFFER = 36161;
                var TEXTURE_2D = 3553;
                var UNSIGNED_BYTE = 5121;
                var DEPTH_COMPONENT = 6402;
                var RGBA = 6408;
                var DEPTH_COMPONENT24 = 33190;
                var DEPTH_COMPONENT32F = 36012;
                var DEPTH24_STENCIL8 = 35056;
                var DEPTH32F_STENCIL8 = 36013;
                var RGBA4 = 32854;
                var RGB5_A1 = 32855;
                var RGB565 = 36194;
                var DEPTH_COMPONENT16 = 33189;
                var STENCIL_INDEX = 6401;
                var STENCIL_INDEX8 = 36168;
                var DEPTH_STENCIL = 34041;
                var COLOR_ATTACHMENT0 = 36064;
                var DEPTH_ATTACHMENT = 36096;
                var STENCIL_ATTACHMENT = 36128;
                var DEPTH_STENCIL_ATTACHMENT = 33306;
                var CLAMP_TO_EDGE = 33071;
                var LINEAR = 9729;
                var defaultAttachments = [{
                  format: RGBA,
                  type: UNSIGNED_BYTE,
                  min: LINEAR,
                  wrap: CLAMP_TO_EDGE
                }, {
                  format: DEPTH_STENCIL
                }];
                var attachmentsByFormat = {};
                attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
                attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
                attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
                attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
                attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
                attachmentsByFormat[DEPTH_COMPONENT24] = DEPTH_ATTACHMENT;
                attachmentsByFormat[DEPTH_COMPONENT32F] = DEPTH_ATTACHMENT;
                attachmentsByFormat[DEPTH24_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
                attachmentsByFormat[DEPTH32F_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
                function getAttachmentPointForFormat(format, internalFormat) {
                  return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
                }
                var renderbufferFormats = {};
                renderbufferFormats[RGBA4] = true;
                renderbufferFormats[RGB5_A1] = true;
                renderbufferFormats[RGB565] = true;
                renderbufferFormats[DEPTH_STENCIL] = true;
                renderbufferFormats[DEPTH_COMPONENT16] = true;
                renderbufferFormats[STENCIL_INDEX] = true;
                renderbufferFormats[STENCIL_INDEX8] = true;
                function isRenderbufferFormat(format) {
                  return renderbufferFormats[format];
                }
                var MAX_COLOR_ATTACHMENT_POINTS = 32;
                function isColorAttachmentPoint(attachmentPoint) {
                  return attachmentPoint >= COLOR_ATTACHMENT0 && attachmentPoint < COLOR_ATTACHMENT0 + MAX_COLOR_ATTACHMENT_POINTS;
                }
                function createFramebufferInfo(gl2, attachments, width, height) {
                  var target = FRAMEBUFFER;
                  var fb = gl2.createFramebuffer();
                  gl2.bindFramebuffer(target, fb);
                  width = width || gl2.drawingBufferWidth;
                  height = height || gl2.drawingBufferHeight;
                  attachments = attachments || defaultAttachments;
                  var usedColorAttachmentsPoints = [];
                  var framebufferInfo = {
                    framebuffer: fb,
                    attachments: [],
                    width,
                    height
                  };
                  attachments.forEach(function(attachmentOptions, i2) {
                    var attachment = attachmentOptions.attachment;
                    var samples = attachmentOptions.samples;
                    var format = attachmentOptions.format;
                    var attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
                    if (!attachmentPoint) {
                      attachmentPoint = COLOR_ATTACHMENT0 + i2;
                    }
                    if (isColorAttachmentPoint(attachmentPoint)) {
                      usedColorAttachmentsPoints.push(attachmentPoint);
                    }
                    if (!attachment) {
                      if (samples !== void 0 || isRenderbufferFormat(format)) {
                        attachment = gl2.createRenderbuffer();
                        gl2.bindRenderbuffer(RENDERBUFFER, attachment);
                        if (samples > 1) {
                          gl2.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
                        } else {
                          gl2.renderbufferStorage(RENDERBUFFER, format, width, height);
                        }
                      } else {
                        var textureOptions = Object.assign({}, attachmentOptions);
                        textureOptions.width = width;
                        textureOptions.height = height;
                        if (textureOptions.auto === void 0) {
                          textureOptions.auto = false;
                          textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR;
                          textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR;
                          textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE;
                          textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE;
                        }
                        attachment = textures.createTexture(gl2, textureOptions);
                      }
                    }
                    if (helper.isRenderbuffer(gl2, attachment)) {
                      gl2.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
                    } else if (helper.isTexture(gl2, attachment)) {
                      if (attachmentOptions.layer !== void 0) {
                        gl2.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
                      } else {
                        gl2.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D, attachment, attachmentOptions.level || 0);
                      }
                    } else {
                      throw new Error("unknown attachment type");
                    }
                    framebufferInfo.attachments.push(attachment);
                  });
                  if (gl2.drawBuffers) {
                    gl2.drawBuffers(usedColorAttachmentsPoints);
                  }
                  return framebufferInfo;
                }
                function resizeFramebufferInfo(gl2, framebufferInfo, attachments, width, height) {
                  width = width || gl2.drawingBufferWidth;
                  height = height || gl2.drawingBufferHeight;
                  framebufferInfo.width = width;
                  framebufferInfo.height = height;
                  attachments = attachments || defaultAttachments;
                  attachments.forEach(function(attachmentOptions, ndx) {
                    var attachment = framebufferInfo.attachments[ndx];
                    var format = attachmentOptions.format;
                    var samples = attachmentOptions.samples;
                    if (samples !== void 0 || helper.isRenderbuffer(gl2, attachment)) {
                      gl2.bindRenderbuffer(RENDERBUFFER, attachment);
                      if (samples > 1) {
                        gl2.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
                      } else {
                        gl2.renderbufferStorage(RENDERBUFFER, format, width, height);
                      }
                    } else if (helper.isTexture(gl2, attachment)) {
                      textures.resizeTexture(gl2, attachment, attachmentOptions, width, height);
                    } else {
                      throw new Error("unknown attachment type");
                    }
                  });
                }
                function bindFramebufferInfo(gl2, framebufferInfo, target) {
                  target = target || FRAMEBUFFER;
                  if (framebufferInfo) {
                    gl2.bindFramebuffer(target, framebufferInfo.framebuffer);
                    gl2.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
                  } else {
                    gl2.bindFramebuffer(target, null);
                    gl2.viewport(0, 0, gl2.drawingBufferWidth, gl2.drawingBufferHeight);
                  }
                }
              })
            ),
            /***/
            "./src/helper.js": (
              /*!***********************!*\
                !*** ./src/helper.js ***!
                \***********************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                exports2.__esModule = true;
                exports2.copyExistingProperties = copyExistingProperties;
                exports2.copyNamedProperties = copyNamedProperties;
                exports2.error = error;
                exports2.warn = warn;
                exports2.isBuffer = isBuffer;
                exports2.isRenderbuffer = isRenderbuffer;
                exports2.isShader = isShader;
                exports2.isTexture = isTexture;
                exports2.isSampler = isSampler;
                function copyNamedProperties(names, src, dst) {
                  names.forEach(function(name) {
                    var value = src[name];
                    if (value !== void 0) {
                      dst[name] = value;
                    }
                  });
                }
                function copyExistingProperties(src, dst) {
                  Object.keys(dst).forEach(function(key) {
                    if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {
                      dst[key] = src[key];
                    }
                  });
                }
                function error() {
                  var _console;
                  (_console = console).error.apply(_console, arguments);
                }
                function warn() {
                  var _console2;
                  (_console2 = console).warn.apply(_console2, arguments);
                }
                function isBuffer(gl, t) {
                  return typeof WebGLBuffer !== "undefined" && t instanceof WebGLBuffer;
                }
                function isRenderbuffer(gl, t) {
                  return typeof WebGLRenderbuffer !== "undefined" && t instanceof WebGLRenderbuffer;
                }
                function isShader(gl, t) {
                  return typeof WebGLShader !== "undefined" && t instanceof WebGLShader;
                }
                function isTexture(gl, t) {
                  return typeof WebGLTexture !== "undefined" && t instanceof WebGLTexture;
                }
                function isSampler(gl, t) {
                  return typeof WebGLSampler !== "undefined" && t instanceof WebGLSampler;
                }
              })
            ),
            /***/
            "./src/m4.js": (
              /*!*******************!*\
                !*** ./src/m4.js ***!
                \*******************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.axisRotate = axisRotate;
                exports2.axisRotation = axisRotation;
                exports2.copy = copy;
                exports2.create = create;
                exports2.frustum = frustum;
                exports2.getAxis = getAxis;
                exports2.getTranslation = getTranslation;
                exports2.identity = identity;
                exports2.inverse = inverse;
                exports2.lookAt = lookAt;
                exports2.multiply = multiply;
                exports2.negate = negate;
                exports2.ortho = ortho;
                exports2.perspective = perspective;
                exports2.rotateX = rotateX;
                exports2.rotateY = rotateY;
                exports2.rotateZ = rotateZ;
                exports2.rotationX = rotationX;
                exports2.rotationY = rotationY;
                exports2.rotationZ = rotationZ;
                exports2.scale = scale;
                exports2.scaling = scaling;
                exports2.setAxis = setAxis;
                exports2.setDefaultType = setDefaultType;
                exports2.setTranslation = setTranslation;
                exports2.transformDirection = transformDirection;
                exports2.transformNormal = transformNormal;
                exports2.transformPoint = transformPoint2;
                exports2.translate = translate;
                exports2.translation = translation;
                exports2.transpose = transpose;
                var v32 = _interopRequireWildcard(__webpack_require__(
                  /*! ./v3.js */
                  "./src/v3.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var MatType = Float32Array;
                function setDefaultType(ctor) {
                  var oldType = MatType;
                  MatType = ctor;
                  return oldType;
                }
                function negate(m, dst) {
                  dst = dst || new MatType(16);
                  dst[0] = -m[0];
                  dst[1] = -m[1];
                  dst[2] = -m[2];
                  dst[3] = -m[3];
                  dst[4] = -m[4];
                  dst[5] = -m[5];
                  dst[6] = -m[6];
                  dst[7] = -m[7];
                  dst[8] = -m[8];
                  dst[9] = -m[9];
                  dst[10] = -m[10];
                  dst[11] = -m[11];
                  dst[12] = -m[12];
                  dst[13] = -m[13];
                  dst[14] = -m[14];
                  dst[15] = -m[15];
                  return dst;
                }
                function create() {
                  return new MatType(16).fill(0);
                }
                function copy(m, dst) {
                  dst = dst || new MatType(16);
                  dst[0] = m[0];
                  dst[1] = m[1];
                  dst[2] = m[2];
                  dst[3] = m[3];
                  dst[4] = m[4];
                  dst[5] = m[5];
                  dst[6] = m[6];
                  dst[7] = m[7];
                  dst[8] = m[8];
                  dst[9] = m[9];
                  dst[10] = m[10];
                  dst[11] = m[11];
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                  return dst;
                }
                function identity(dst) {
                  dst = dst || new MatType(16);
                  dst[0] = 1;
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = 1;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = 1;
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function transpose(m, dst) {
                  dst = dst || new MatType(16);
                  if (dst === m) {
                    var t;
                    t = m[1];
                    m[1] = m[4];
                    m[4] = t;
                    t = m[2];
                    m[2] = m[8];
                    m[8] = t;
                    t = m[3];
                    m[3] = m[12];
                    m[12] = t;
                    t = m[6];
                    m[6] = m[9];
                    m[9] = t;
                    t = m[7];
                    m[7] = m[13];
                    m[13] = t;
                    t = m[11];
                    m[11] = m[14];
                    m[14] = t;
                    return dst;
                  }
                  var m00 = m[0 * 4 + 0];
                  var m01 = m[0 * 4 + 1];
                  var m02 = m[0 * 4 + 2];
                  var m03 = m[0 * 4 + 3];
                  var m10 = m[1 * 4 + 0];
                  var m11 = m[1 * 4 + 1];
                  var m12 = m[1 * 4 + 2];
                  var m13 = m[1 * 4 + 3];
                  var m20 = m[2 * 4 + 0];
                  var m21 = m[2 * 4 + 1];
                  var m22 = m[2 * 4 + 2];
                  var m23 = m[2 * 4 + 3];
                  var m30 = m[3 * 4 + 0];
                  var m31 = m[3 * 4 + 1];
                  var m32 = m[3 * 4 + 2];
                  var m33 = m[3 * 4 + 3];
                  dst[0] = m00;
                  dst[1] = m10;
                  dst[2] = m20;
                  dst[3] = m30;
                  dst[4] = m01;
                  dst[5] = m11;
                  dst[6] = m21;
                  dst[7] = m31;
                  dst[8] = m02;
                  dst[9] = m12;
                  dst[10] = m22;
                  dst[11] = m32;
                  dst[12] = m03;
                  dst[13] = m13;
                  dst[14] = m23;
                  dst[15] = m33;
                  return dst;
                }
                function inverse(m, dst) {
                  dst = dst || new MatType(16);
                  var m00 = m[0 * 4 + 0];
                  var m01 = m[0 * 4 + 1];
                  var m02 = m[0 * 4 + 2];
                  var m03 = m[0 * 4 + 3];
                  var m10 = m[1 * 4 + 0];
                  var m11 = m[1 * 4 + 1];
                  var m12 = m[1 * 4 + 2];
                  var m13 = m[1 * 4 + 3];
                  var m20 = m[2 * 4 + 0];
                  var m21 = m[2 * 4 + 1];
                  var m22 = m[2 * 4 + 2];
                  var m23 = m[2 * 4 + 3];
                  var m30 = m[3 * 4 + 0];
                  var m31 = m[3 * 4 + 1];
                  var m32 = m[3 * 4 + 2];
                  var m33 = m[3 * 4 + 3];
                  var tmp_0 = m22 * m33;
                  var tmp_1 = m32 * m23;
                  var tmp_2 = m12 * m33;
                  var tmp_3 = m32 * m13;
                  var tmp_4 = m12 * m23;
                  var tmp_5 = m22 * m13;
                  var tmp_6 = m02 * m33;
                  var tmp_7 = m32 * m03;
                  var tmp_8 = m02 * m23;
                  var tmp_9 = m22 * m03;
                  var tmp_10 = m02 * m13;
                  var tmp_11 = m12 * m03;
                  var tmp_12 = m20 * m31;
                  var tmp_13 = m30 * m21;
                  var tmp_14 = m10 * m31;
                  var tmp_15 = m30 * m11;
                  var tmp_16 = m10 * m21;
                  var tmp_17 = m20 * m11;
                  var tmp_18 = m00 * m31;
                  var tmp_19 = m30 * m01;
                  var tmp_20 = m00 * m21;
                  var tmp_21 = m20 * m01;
                  var tmp_22 = m00 * m11;
                  var tmp_23 = m10 * m01;
                  var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
                  var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
                  var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
                  var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
                  var d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
                  dst[0] = d * t0;
                  dst[1] = d * t1;
                  dst[2] = d * t2;
                  dst[3] = d * t3;
                  dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
                  dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
                  dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
                  dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
                  dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
                  dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
                  dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
                  dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
                  dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
                  dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
                  dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
                  dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
                  return dst;
                }
                function multiply(a, b, dst) {
                  dst = dst || new MatType(16);
                  var a00 = a[0];
                  var a01 = a[1];
                  var a02 = a[2];
                  var a03 = a[3];
                  var a10 = a[4 + 0];
                  var a11 = a[4 + 1];
                  var a12 = a[4 + 2];
                  var a13 = a[4 + 3];
                  var a20 = a[8 + 0];
                  var a21 = a[8 + 1];
                  var a22 = a[8 + 2];
                  var a23 = a[8 + 3];
                  var a30 = a[12 + 0];
                  var a31 = a[12 + 1];
                  var a32 = a[12 + 2];
                  var a33 = a[12 + 3];
                  var b00 = b[0];
                  var b01 = b[1];
                  var b02 = b[2];
                  var b03 = b[3];
                  var b10 = b[4 + 0];
                  var b11 = b[4 + 1];
                  var b12 = b[4 + 2];
                  var b13 = b[4 + 3];
                  var b20 = b[8 + 0];
                  var b21 = b[8 + 1];
                  var b22 = b[8 + 2];
                  var b23 = b[8 + 3];
                  var b30 = b[12 + 0];
                  var b31 = b[12 + 1];
                  var b32 = b[12 + 2];
                  var b33 = b[12 + 3];
                  dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
                  dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
                  dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
                  dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
                  dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
                  dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
                  dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
                  dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
                  dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
                  dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
                  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
                  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
                  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
                  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
                  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
                  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
                  return dst;
                }
                function setTranslation(a, v, dst) {
                  dst = dst || identity();
                  if (a !== dst) {
                    dst[0] = a[0];
                    dst[1] = a[1];
                    dst[2] = a[2];
                    dst[3] = a[3];
                    dst[4] = a[4];
                    dst[5] = a[5];
                    dst[6] = a[6];
                    dst[7] = a[7];
                    dst[8] = a[8];
                    dst[9] = a[9];
                    dst[10] = a[10];
                    dst[11] = a[11];
                  }
                  dst[12] = v[0];
                  dst[13] = v[1];
                  dst[14] = v[2];
                  dst[15] = 1;
                  return dst;
                }
                function getTranslation(m, dst) {
                  dst = dst || v32.create();
                  dst[0] = m[12];
                  dst[1] = m[13];
                  dst[2] = m[14];
                  return dst;
                }
                function getAxis(m, axis, dst) {
                  dst = dst || v32.create();
                  var off = axis * 4;
                  dst[0] = m[off + 0];
                  dst[1] = m[off + 1];
                  dst[2] = m[off + 2];
                  return dst;
                }
                function setAxis(a, v, axis, dst) {
                  if (dst !== a) {
                    dst = copy(a, dst);
                  }
                  var off = axis * 4;
                  dst[off + 0] = v[0];
                  dst[off + 1] = v[1];
                  dst[off + 2] = v[2];
                  return dst;
                }
                function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
                  dst = dst || new MatType(16);
                  var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
                  var rangeInv = 1 / (zNear - zFar);
                  dst[0] = f / aspect;
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = f;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = (zNear + zFar) * rangeInv;
                  dst[11] = -1;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = zNear * zFar * rangeInv * 2;
                  dst[15] = 0;
                  return dst;
                }
                function ortho(left, right, bottom, top, near, far, dst) {
                  dst = dst || new MatType(16);
                  dst[0] = 2 / (right - left);
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = 2 / (top - bottom);
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = 2 / (near - far);
                  dst[11] = 0;
                  dst[12] = (right + left) / (left - right);
                  dst[13] = (top + bottom) / (bottom - top);
                  dst[14] = (far + near) / (near - far);
                  dst[15] = 1;
                  return dst;
                }
                function frustum(left, right, bottom, top, near, far, dst) {
                  dst = dst || new MatType(16);
                  var dx = right - left;
                  var dy = top - bottom;
                  var dz = near - far;
                  dst[0] = 2 * near / dx;
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = 2 * near / dy;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = (left + right) / dx;
                  dst[9] = (top + bottom) / dy;
                  dst[10] = far / dz;
                  dst[11] = -1;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = near * far / dz;
                  dst[15] = 0;
                  return dst;
                }
                var xAxis;
                var yAxis;
                var zAxis;
                function lookAt(eye, target, up, dst) {
                  dst = dst || new MatType(16);
                  xAxis = xAxis || v32.create();
                  yAxis = yAxis || v32.create();
                  zAxis = zAxis || v32.create();
                  v32.normalize(v32.subtract(eye, target, zAxis), zAxis);
                  v32.normalize(v32.cross(up, zAxis, xAxis), xAxis);
                  v32.normalize(v32.cross(zAxis, xAxis, yAxis), yAxis);
                  dst[0] = xAxis[0];
                  dst[1] = xAxis[1];
                  dst[2] = xAxis[2];
                  dst[3] = 0;
                  dst[4] = yAxis[0];
                  dst[5] = yAxis[1];
                  dst[6] = yAxis[2];
                  dst[7] = 0;
                  dst[8] = zAxis[0];
                  dst[9] = zAxis[1];
                  dst[10] = zAxis[2];
                  dst[11] = 0;
                  dst[12] = eye[0];
                  dst[13] = eye[1];
                  dst[14] = eye[2];
                  dst[15] = 1;
                  return dst;
                }
                function translation(v, dst) {
                  dst = dst || new MatType(16);
                  dst[0] = 1;
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = 1;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = 1;
                  dst[11] = 0;
                  dst[12] = v[0];
                  dst[13] = v[1];
                  dst[14] = v[2];
                  dst[15] = 1;
                  return dst;
                }
                function translate(m, v, dst) {
                  dst = dst || new MatType(16);
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  var m00 = m[0];
                  var m01 = m[1];
                  var m02 = m[2];
                  var m03 = m[3];
                  var m10 = m[1 * 4 + 0];
                  var m11 = m[1 * 4 + 1];
                  var m12 = m[1 * 4 + 2];
                  var m13 = m[1 * 4 + 3];
                  var m20 = m[2 * 4 + 0];
                  var m21 = m[2 * 4 + 1];
                  var m22 = m[2 * 4 + 2];
                  var m23 = m[2 * 4 + 3];
                  var m30 = m[3 * 4 + 0];
                  var m31 = m[3 * 4 + 1];
                  var m32 = m[3 * 4 + 2];
                  var m33 = m[3 * 4 + 3];
                  if (m !== dst) {
                    dst[0] = m00;
                    dst[1] = m01;
                    dst[2] = m02;
                    dst[3] = m03;
                    dst[4] = m10;
                    dst[5] = m11;
                    dst[6] = m12;
                    dst[7] = m13;
                    dst[8] = m20;
                    dst[9] = m21;
                    dst[10] = m22;
                    dst[11] = m23;
                  }
                  dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
                  dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
                  dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
                  dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
                  return dst;
                }
                function rotationX(angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[0] = 1;
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = c;
                  dst[6] = s;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = -s;
                  dst[10] = c;
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function rotateX(m, angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var m10 = m[4];
                  var m11 = m[5];
                  var m12 = m[6];
                  var m13 = m[7];
                  var m20 = m[8];
                  var m21 = m[9];
                  var m22 = m[10];
                  var m23 = m[11];
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[4] = c * m10 + s * m20;
                  dst[5] = c * m11 + s * m21;
                  dst[6] = c * m12 + s * m22;
                  dst[7] = c * m13 + s * m23;
                  dst[8] = c * m20 - s * m10;
                  dst[9] = c * m21 - s * m11;
                  dst[10] = c * m22 - s * m12;
                  dst[11] = c * m23 - s * m13;
                  if (m !== dst) {
                    dst[0] = m[0];
                    dst[1] = m[1];
                    dst[2] = m[2];
                    dst[3] = m[3];
                    dst[12] = m[12];
                    dst[13] = m[13];
                    dst[14] = m[14];
                    dst[15] = m[15];
                  }
                  return dst;
                }
                function rotationY(angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[0] = c;
                  dst[1] = 0;
                  dst[2] = -s;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = 1;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = s;
                  dst[9] = 0;
                  dst[10] = c;
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function rotateY(m, angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var m00 = m[0 * 4 + 0];
                  var m01 = m[0 * 4 + 1];
                  var m02 = m[0 * 4 + 2];
                  var m03 = m[0 * 4 + 3];
                  var m20 = m[2 * 4 + 0];
                  var m21 = m[2 * 4 + 1];
                  var m22 = m[2 * 4 + 2];
                  var m23 = m[2 * 4 + 3];
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[0] = c * m00 - s * m20;
                  dst[1] = c * m01 - s * m21;
                  dst[2] = c * m02 - s * m22;
                  dst[3] = c * m03 - s * m23;
                  dst[8] = c * m20 + s * m00;
                  dst[9] = c * m21 + s * m01;
                  dst[10] = c * m22 + s * m02;
                  dst[11] = c * m23 + s * m03;
                  if (m !== dst) {
                    dst[4] = m[4];
                    dst[5] = m[5];
                    dst[6] = m[6];
                    dst[7] = m[7];
                    dst[12] = m[12];
                    dst[13] = m[13];
                    dst[14] = m[14];
                    dst[15] = m[15];
                  }
                  return dst;
                }
                function rotationZ(angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[0] = c;
                  dst[1] = s;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = -s;
                  dst[5] = c;
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = 1;
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function rotateZ(m, angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var m00 = m[0 * 4 + 0];
                  var m01 = m[0 * 4 + 1];
                  var m02 = m[0 * 4 + 2];
                  var m03 = m[0 * 4 + 3];
                  var m10 = m[1 * 4 + 0];
                  var m11 = m[1 * 4 + 1];
                  var m12 = m[1 * 4 + 2];
                  var m13 = m[1 * 4 + 3];
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  dst[0] = c * m00 + s * m10;
                  dst[1] = c * m01 + s * m11;
                  dst[2] = c * m02 + s * m12;
                  dst[3] = c * m03 + s * m13;
                  dst[4] = c * m10 - s * m00;
                  dst[5] = c * m11 - s * m01;
                  dst[6] = c * m12 - s * m02;
                  dst[7] = c * m13 - s * m03;
                  if (m !== dst) {
                    dst[8] = m[8];
                    dst[9] = m[9];
                    dst[10] = m[10];
                    dst[11] = m[11];
                    dst[12] = m[12];
                    dst[13] = m[13];
                    dst[14] = m[14];
                    dst[15] = m[15];
                  }
                  return dst;
                }
                function axisRotation(axis, angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var x2 = axis[0];
                  var y = axis[1];
                  var z = axis[2];
                  var n = Math.sqrt(x2 * x2 + y * y + z * z);
                  x2 /= n;
                  y /= n;
                  z /= n;
                  var xx = x2 * x2;
                  var yy = y * y;
                  var zz = z * z;
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  var oneMinusCosine = 1 - c;
                  dst[0] = xx + (1 - xx) * c;
                  dst[1] = x2 * y * oneMinusCosine + z * s;
                  dst[2] = x2 * z * oneMinusCosine - y * s;
                  dst[3] = 0;
                  dst[4] = x2 * y * oneMinusCosine - z * s;
                  dst[5] = yy + (1 - yy) * c;
                  dst[6] = y * z * oneMinusCosine + x2 * s;
                  dst[7] = 0;
                  dst[8] = x2 * z * oneMinusCosine + y * s;
                  dst[9] = y * z * oneMinusCosine - x2 * s;
                  dst[10] = zz + (1 - zz) * c;
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function axisRotate(m, axis, angleInRadians, dst) {
                  dst = dst || new MatType(16);
                  var x2 = axis[0];
                  var y = axis[1];
                  var z = axis[2];
                  var n = Math.sqrt(x2 * x2 + y * y + z * z);
                  x2 /= n;
                  y /= n;
                  z /= n;
                  var xx = x2 * x2;
                  var yy = y * y;
                  var zz = z * z;
                  var c = Math.cos(angleInRadians);
                  var s = Math.sin(angleInRadians);
                  var oneMinusCosine = 1 - c;
                  var r00 = xx + (1 - xx) * c;
                  var r01 = x2 * y * oneMinusCosine + z * s;
                  var r02 = x2 * z * oneMinusCosine - y * s;
                  var r10 = x2 * y * oneMinusCosine - z * s;
                  var r11 = yy + (1 - yy) * c;
                  var r12 = y * z * oneMinusCosine + x2 * s;
                  var r20 = x2 * z * oneMinusCosine + y * s;
                  var r21 = y * z * oneMinusCosine - x2 * s;
                  var r22 = zz + (1 - zz) * c;
                  var m00 = m[0];
                  var m01 = m[1];
                  var m02 = m[2];
                  var m03 = m[3];
                  var m10 = m[4];
                  var m11 = m[5];
                  var m12 = m[6];
                  var m13 = m[7];
                  var m20 = m[8];
                  var m21 = m[9];
                  var m22 = m[10];
                  var m23 = m[11];
                  dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
                  dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
                  dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
                  dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
                  dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
                  dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
                  dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
                  dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
                  dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
                  dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
                  dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
                  dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
                  if (m !== dst) {
                    dst[12] = m[12];
                    dst[13] = m[13];
                    dst[14] = m[14];
                    dst[15] = m[15];
                  }
                  return dst;
                }
                function scaling(v, dst) {
                  dst = dst || new MatType(16);
                  dst[0] = v[0];
                  dst[1] = 0;
                  dst[2] = 0;
                  dst[3] = 0;
                  dst[4] = 0;
                  dst[5] = v[1];
                  dst[6] = 0;
                  dst[7] = 0;
                  dst[8] = 0;
                  dst[9] = 0;
                  dst[10] = v[2];
                  dst[11] = 0;
                  dst[12] = 0;
                  dst[13] = 0;
                  dst[14] = 0;
                  dst[15] = 1;
                  return dst;
                }
                function scale(m, v, dst) {
                  dst = dst || new MatType(16);
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  dst[0] = v0 * m[0 * 4 + 0];
                  dst[1] = v0 * m[0 * 4 + 1];
                  dst[2] = v0 * m[0 * 4 + 2];
                  dst[3] = v0 * m[0 * 4 + 3];
                  dst[4] = v1 * m[1 * 4 + 0];
                  dst[5] = v1 * m[1 * 4 + 1];
                  dst[6] = v1 * m[1 * 4 + 2];
                  dst[7] = v1 * m[1 * 4 + 3];
                  dst[8] = v2 * m[2 * 4 + 0];
                  dst[9] = v2 * m[2 * 4 + 1];
                  dst[10] = v2 * m[2 * 4 + 2];
                  dst[11] = v2 * m[2 * 4 + 3];
                  if (m !== dst) {
                    dst[12] = m[12];
                    dst[13] = m[13];
                    dst[14] = m[14];
                    dst[15] = m[15];
                  }
                  return dst;
                }
                function transformPoint2(m, v, dst) {
                  dst = dst || v32.create();
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
                  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
                  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
                  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
                  return dst;
                }
                function transformDirection(m, v, dst) {
                  dst = dst || v32.create();
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
                  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
                  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
                  return dst;
                }
                function transformNormal(m, v, dst) {
                  dst = dst || v32.create();
                  var mi = inverse(m);
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
                  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
                  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
                  return dst;
                }
              })
            ),
            /***/
            "./src/primitives.js": (
              /*!***************************!*\
                !*** ./src/primitives.js ***!
                \***************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.create3DFVertices = create3DFVertices;
                exports2.createAugmentedTypedArray = createAugmentedTypedArray;
                exports2.createCubeVertices = createCubeVertices;
                exports2.createPlaneVertices = createPlaneVertices;
                exports2.createSphereVertices = createSphereVertices;
                exports2.createTruncatedConeVertices = createTruncatedConeVertices;
                exports2.createXYQuadVertices = createXYQuadVertices;
                exports2.createCrescentVertices = createCrescentVertices;
                exports2.createCylinderVertices = createCylinderVertices;
                exports2.createTorusVertices = createTorusVertices;
                exports2.createDiscVertices = createDiscVertices;
                exports2.deindexVertices = deindexVertices;
                exports2.flattenNormals = flattenNormals;
                exports2.makeRandomVertexColors = makeRandomVertexColors;
                exports2.reorientDirections = reorientDirections;
                exports2.reorientNormals = reorientNormals;
                exports2.reorientPositions = reorientPositions;
                exports2.reorientVertices = reorientVertices;
                exports2.concatVertices = concatVertices;
                exports2.duplicateVertices = duplicateVertices;
                exports2.createDiscBuffers = exports2.createDiscBufferInfo = exports2.createTorusBuffers = exports2.createTorusBufferInfo = exports2.createCylinderBuffers = exports2.createCylinderBufferInfo = exports2.createCrescentBuffers = exports2.createCrescentBufferInfo = exports2.createCresentVertices = exports2.createCresentBuffers = exports2.createCresentBufferInfo = exports2.createXYQuadBuffers = exports2.createXYQuadBufferInfo = exports2.createTruncatedConeBuffers = exports2.createTruncatedConeBufferInfo = exports2.createSphereBuffers = exports2.createSphereBufferInfo = exports2.createPlaneBuffers = exports2.createPlaneBufferInfo = exports2.createCubeBuffers = exports2.createCubeBufferInfo = exports2.create3DFBuffers = exports2.create3DFBufferInfo = void 0;
                var attributes = _interopRequireWildcard(__webpack_require__(
                  /*! ./attributes.js */
                  "./src/attributes.js"
                ));
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                var typedArrays2 = _interopRequireWildcard(__webpack_require__(
                  /*! ./typedarrays.js */
                  "./src/typedarrays.js"
                ));
                var m42 = _interopRequireWildcard(__webpack_require__(
                  /*! ./m4.js */
                  "./src/m4.js"
                ));
                var v32 = _interopRequireWildcard(__webpack_require__(
                  /*! ./v3.js */
                  "./src/v3.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var getArray = attributes.getArray_;
                var getNumComponents = attributes.getNumComponents_;
                function augmentTypedArray(typedArray, numComponents) {
                  var cursor = 0;
                  typedArray.push = function() {
                    for (var ii = 0; ii < arguments.length; ++ii) {
                      var value = arguments[ii];
                      if (value instanceof Array || typedArrays2.isArrayBuffer(value)) {
                        for (var jj = 0; jj < value.length; ++jj) {
                          typedArray[cursor++] = value[jj];
                        }
                      } else {
                        typedArray[cursor++] = value;
                      }
                    }
                  };
                  typedArray.reset = function(opt_index) {
                    cursor = opt_index || 0;
                  };
                  typedArray.numComponents = numComponents;
                  Object.defineProperty(typedArray, "numElements", {
                    get: function get() {
                      return this.length / this.numComponents | 0;
                    }
                  });
                  return typedArray;
                }
                function createAugmentedTypedArray(numComponents, numElements, opt_type) {
                  var Type = opt_type || Float32Array;
                  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
                }
                function allButIndices(name) {
                  return name !== "indices";
                }
                function deindexVertices(vertices) {
                  var indices = vertices.indices;
                  var newVertices = {};
                  var numElements = indices.length;
                  function expandToUnindexed(channel) {
                    var srcBuffer = vertices[channel];
                    var numComponents = srcBuffer.numComponents;
                    var dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
                    for (var ii = 0; ii < numElements; ++ii) {
                      var ndx = indices[ii];
                      var offset = ndx * numComponents;
                      for (var jj = 0; jj < numComponents; ++jj) {
                        dstBuffer.push(srcBuffer[offset + jj]);
                      }
                    }
                    newVertices[channel] = dstBuffer;
                  }
                  Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
                  return newVertices;
                }
                function flattenNormals(vertices) {
                  if (vertices.indices) {
                    throw new Error("can not flatten normals of indexed vertices. deindex them first");
                  }
                  var normals = vertices.normal;
                  var numNormals = normals.length;
                  for (var ii = 0; ii < numNormals; ii += 9) {
                    var nax = normals[ii + 0];
                    var nay = normals[ii + 1];
                    var naz = normals[ii + 2];
                    var nbx = normals[ii + 3];
                    var nby = normals[ii + 4];
                    var nbz = normals[ii + 5];
                    var ncx = normals[ii + 6];
                    var ncy = normals[ii + 7];
                    var ncz = normals[ii + 8];
                    var nx = nax + nbx + ncx;
                    var ny = nay + nby + ncy;
                    var nz = naz + nbz + ncz;
                    var length2 = Math.sqrt(nx * nx + ny * ny + nz * nz);
                    nx /= length2;
                    ny /= length2;
                    nz /= length2;
                    normals[ii + 0] = nx;
                    normals[ii + 1] = ny;
                    normals[ii + 2] = nz;
                    normals[ii + 3] = nx;
                    normals[ii + 4] = ny;
                    normals[ii + 5] = nz;
                    normals[ii + 6] = nx;
                    normals[ii + 7] = ny;
                    normals[ii + 8] = nz;
                  }
                  return vertices;
                }
                function applyFuncToV3Array(array, matrix, fn) {
                  var len = array.length;
                  var tmp = new Float32Array(3);
                  for (var ii = 0; ii < len; ii += 3) {
                    fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
                    array[ii] = tmp[0];
                    array[ii + 1] = tmp[1];
                    array[ii + 2] = tmp[2];
                  }
                }
                function transformNormal(mi, v, dst) {
                  dst = dst || v32.create();
                  var v0 = v[0];
                  var v1 = v[1];
                  var v2 = v[2];
                  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
                  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
                  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
                  return dst;
                }
                function reorientDirections(array, matrix) {
                  applyFuncToV3Array(array, matrix, m42.transformDirection);
                  return array;
                }
                function reorientNormals(array, matrix) {
                  applyFuncToV3Array(array, m42.inverse(matrix), transformNormal);
                  return array;
                }
                function reorientPositions(array, matrix) {
                  applyFuncToV3Array(array, matrix, m42.transformPoint);
                  return array;
                }
                function reorientVertices(arrays, matrix) {
                  Object.keys(arrays).forEach(function(name) {
                    var array = arrays[name];
                    if (name.indexOf("pos") >= 0) {
                      reorientPositions(array, matrix);
                    } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
                      reorientDirections(array, matrix);
                    } else if (name.indexOf("norm") >= 0) {
                      reorientNormals(array, matrix);
                    }
                  });
                  return arrays;
                }
                function createXYQuadVertices(size, xOffset, yOffset) {
                  size = size || 2;
                  xOffset = xOffset || 0;
                  yOffset = yOffset || 0;
                  size *= 0.5;
                  return {
                    position: {
                      numComponents: 2,
                      data: [xOffset + -1 * size, yOffset + -1 * size, xOffset + 1 * size, yOffset + -1 * size, xOffset + -1 * size, yOffset + 1 * size, xOffset + 1 * size, yOffset + 1 * size]
                    },
                    normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                    texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
                    indices: [0, 1, 2, 2, 1, 3]
                  };
                }
                function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
                  width = width || 1;
                  depth = depth || 1;
                  subdivisionsWidth = subdivisionsWidth || 1;
                  subdivisionsDepth = subdivisionsDepth || 1;
                  matrix = matrix || m42.identity();
                  var numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  for (var z = 0; z <= subdivisionsDepth; z++) {
                    for (var x2 = 0; x2 <= subdivisionsWidth; x2++) {
                      var u = x2 / subdivisionsWidth;
                      var v = z / subdivisionsDepth;
                      positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
                      normals.push(0, 1, 0);
                      texcoords.push(u, v);
                    }
                  }
                  var numVertsAcross = subdivisionsWidth + 1;
                  var indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
                  for (var _z = 0; _z < subdivisionsDepth; _z++) {
                    for (var _x = 0; _x < subdivisionsWidth; _x++) {
                      indices.push((_z + 0) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x, (_z + 0) * numVertsAcross + _x + 1);
                      indices.push((_z + 1) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x + 1, (_z + 0) * numVertsAcross + _x + 1);
                    }
                  }
                  var arrays = reorientVertices({
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  }, matrix);
                  return arrays;
                }
                function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
                  if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
                    throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
                  }
                  opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
                  opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
                  opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
                  opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
                  var latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
                  var longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
                  var numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  for (var y = 0; y <= subdivisionsHeight; y++) {
                    for (var x2 = 0; x2 <= subdivisionsAxis; x2++) {
                      var u = x2 / subdivisionsAxis;
                      var v = y / subdivisionsHeight;
                      var theta = longRange * u + opt_startLongitudeInRadians;
                      var phi = latRange * v + opt_startLatitudeInRadians;
                      var sinTheta = Math.sin(theta);
                      var cosTheta = Math.cos(theta);
                      var sinPhi = Math.sin(phi);
                      var cosPhi = Math.cos(phi);
                      var ux = cosTheta * sinPhi;
                      var uy = cosPhi;
                      var uz = sinTheta * sinPhi;
                      positions.push(radius * ux, radius * uy, radius * uz);
                      normals.push(ux, uy, uz);
                      texcoords.push(1 - u, v);
                    }
                  }
                  var numVertsAround = subdivisionsAxis + 1;
                  var indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
                  for (var _x2 = 0; _x2 < subdivisionsAxis; _x2++) {
                    for (var _y = 0; _y < subdivisionsHeight; _y++) {
                      indices.push((_y + 0) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2);
                      indices.push((_y + 1) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2 + 1);
                    }
                  }
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                var CUBE_FACE_INDICES = [
                  [3, 7, 5, 1],
                  // right
                  [6, 2, 0, 4],
                  // left
                  [6, 7, 3, 2],
                  // ??
                  [0, 1, 5, 4],
                  // ??
                  [7, 6, 4, 5],
                  // front
                  [2, 3, 1, 0]
                  // back
                ];
                function createCubeVertices(size) {
                  size = size || 1;
                  var k = size / 2;
                  var cornerVertices = [[-k, -k, -k], [+k, -k, -k], [-k, +k, -k], [+k, +k, -k], [-k, -k, +k], [+k, -k, +k], [-k, +k, +k], [+k, +k, +k]];
                  var faceNormals = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
                  var uvCoords = [[1, 0], [0, 0], [0, 1], [1, 1]];
                  var numVertices = 6 * 4;
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  var indices = createAugmentedTypedArray(3, 6 * 2, Uint16Array);
                  for (var f = 0; f < 6; ++f) {
                    var faceIndices = CUBE_FACE_INDICES[f];
                    for (var v = 0; v < 4; ++v) {
                      var position = cornerVertices[faceIndices[v]];
                      var normal = faceNormals[f];
                      var uv = uvCoords[v];
                      positions.push(position);
                      normals.push(normal);
                      texcoords.push(uv);
                    }
                    var offset = 4 * f;
                    indices.push(offset + 0, offset + 1, offset + 2);
                    indices.push(offset + 0, offset + 2, offset + 3);
                  }
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
                  if (radialSubdivisions < 3) {
                    throw new Error("radialSubdivisions must be 3 or greater");
                  }
                  if (verticalSubdivisions < 1) {
                    throw new Error("verticalSubdivisions must be 1 or greater");
                  }
                  var topCap = opt_topCap === void 0 ? true : opt_topCap;
                  var bottomCap = opt_bottomCap === void 0 ? true : opt_bottomCap;
                  var extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
                  var numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  var indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
                  var vertsAroundEdge = radialSubdivisions + 1;
                  var slant = Math.atan2(bottomRadius - topRadius, height);
                  var cosSlant = Math.cos(slant);
                  var sinSlant = Math.sin(slant);
                  var start2 = topCap ? -2 : 0;
                  var end = verticalSubdivisions + (bottomCap ? 2 : 0);
                  for (var yy = start2; yy <= end; ++yy) {
                    var v = yy / verticalSubdivisions;
                    var y = height * v;
                    var ringRadius = void 0;
                    if (yy < 0) {
                      y = 0;
                      v = 1;
                      ringRadius = bottomRadius;
                    } else if (yy > verticalSubdivisions) {
                      y = height;
                      v = 1;
                      ringRadius = topRadius;
                    } else {
                      ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
                    }
                    if (yy === -2 || yy === verticalSubdivisions + 2) {
                      ringRadius = 0;
                      v = 0;
                    }
                    y -= height / 2;
                    for (var ii = 0; ii < vertsAroundEdge; ++ii) {
                      var sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
                      var cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
                      positions.push(sin * ringRadius, y, cos * ringRadius);
                      if (yy < 0) {
                        normals.push(0, -1, 0);
                      } else if (yy > verticalSubdivisions) {
                        normals.push(0, 1, 0);
                      } else if (ringRadius === 0) {
                        normals.push(0, 0, 0);
                      } else {
                        normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
                      }
                      texcoords.push(ii / radialSubdivisions, 1 - v);
                    }
                  }
                  for (var _yy = 0; _yy < verticalSubdivisions + extra; ++_yy) {
                    if (_yy === 1 && topCap || _yy === verticalSubdivisions + extra - 2 && bottomCap) {
                      continue;
                    }
                    for (var _ii = 0; _ii < radialSubdivisions; ++_ii) {
                      indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 0) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii);
                      indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 0 + _ii);
                    }
                  }
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                function expandRLEData(rleData, padding) {
                  padding = padding || [];
                  var data = [];
                  for (var ii = 0; ii < rleData.length; ii += 4) {
                    var runLength = rleData[ii];
                    var element = rleData.slice(ii + 1, ii + 4);
                    element.push.apply(element, padding);
                    for (var jj = 0; jj < runLength; ++jj) {
                      data.push.apply(data, element);
                    }
                  }
                  return data;
                }
                function create3DFVertices() {
                  var positions = [
                    // left column front
                    0,
                    0,
                    0,
                    0,
                    150,
                    0,
                    30,
                    0,
                    0,
                    0,
                    150,
                    0,
                    30,
                    150,
                    0,
                    30,
                    0,
                    0,
                    // top rung front
                    30,
                    0,
                    0,
                    30,
                    30,
                    0,
                    100,
                    0,
                    0,
                    30,
                    30,
                    0,
                    100,
                    30,
                    0,
                    100,
                    0,
                    0,
                    // middle rung front
                    30,
                    60,
                    0,
                    30,
                    90,
                    0,
                    67,
                    60,
                    0,
                    30,
                    90,
                    0,
                    67,
                    90,
                    0,
                    67,
                    60,
                    0,
                    // left column back
                    0,
                    0,
                    30,
                    30,
                    0,
                    30,
                    0,
                    150,
                    30,
                    0,
                    150,
                    30,
                    30,
                    0,
                    30,
                    30,
                    150,
                    30,
                    // top rung back
                    30,
                    0,
                    30,
                    100,
                    0,
                    30,
                    30,
                    30,
                    30,
                    30,
                    30,
                    30,
                    100,
                    0,
                    30,
                    100,
                    30,
                    30,
                    // middle rung back
                    30,
                    60,
                    30,
                    67,
                    60,
                    30,
                    30,
                    90,
                    30,
                    30,
                    90,
                    30,
                    67,
                    60,
                    30,
                    67,
                    90,
                    30,
                    // top
                    0,
                    0,
                    0,
                    100,
                    0,
                    0,
                    100,
                    0,
                    30,
                    0,
                    0,
                    0,
                    100,
                    0,
                    30,
                    0,
                    0,
                    30,
                    // top rung front
                    100,
                    0,
                    0,
                    100,
                    30,
                    0,
                    100,
                    30,
                    30,
                    100,
                    0,
                    0,
                    100,
                    30,
                    30,
                    100,
                    0,
                    30,
                    // under top rung
                    30,
                    30,
                    0,
                    30,
                    30,
                    30,
                    100,
                    30,
                    30,
                    30,
                    30,
                    0,
                    100,
                    30,
                    30,
                    100,
                    30,
                    0,
                    // between top rung and middle
                    30,
                    30,
                    0,
                    30,
                    60,
                    30,
                    30,
                    30,
                    30,
                    30,
                    30,
                    0,
                    30,
                    60,
                    0,
                    30,
                    60,
                    30,
                    // top of middle rung
                    30,
                    60,
                    0,
                    67,
                    60,
                    30,
                    30,
                    60,
                    30,
                    30,
                    60,
                    0,
                    67,
                    60,
                    0,
                    67,
                    60,
                    30,
                    // front of middle rung
                    67,
                    60,
                    0,
                    67,
                    90,
                    30,
                    67,
                    60,
                    30,
                    67,
                    60,
                    0,
                    67,
                    90,
                    0,
                    67,
                    90,
                    30,
                    // bottom of middle rung.
                    30,
                    90,
                    0,
                    30,
                    90,
                    30,
                    67,
                    90,
                    30,
                    30,
                    90,
                    0,
                    67,
                    90,
                    30,
                    67,
                    90,
                    0,
                    // front of bottom
                    30,
                    90,
                    0,
                    30,
                    150,
                    30,
                    30,
                    90,
                    30,
                    30,
                    90,
                    0,
                    30,
                    150,
                    0,
                    30,
                    150,
                    30,
                    // bottom
                    0,
                    150,
                    0,
                    0,
                    150,
                    30,
                    30,
                    150,
                    30,
                    0,
                    150,
                    0,
                    30,
                    150,
                    30,
                    30,
                    150,
                    0,
                    // left side
                    0,
                    0,
                    0,
                    0,
                    0,
                    30,
                    0,
                    150,
                    30,
                    0,
                    0,
                    0,
                    0,
                    150,
                    30,
                    0,
                    150,
                    0
                  ];
                  var texcoords = [
                    // left column front
                    0.22,
                    0.19,
                    0.22,
                    0.79,
                    0.34,
                    0.19,
                    0.22,
                    0.79,
                    0.34,
                    0.79,
                    0.34,
                    0.19,
                    // top rung front
                    0.34,
                    0.19,
                    0.34,
                    0.31,
                    0.62,
                    0.19,
                    0.34,
                    0.31,
                    0.62,
                    0.31,
                    0.62,
                    0.19,
                    // middle rung front
                    0.34,
                    0.43,
                    0.34,
                    0.55,
                    0.49,
                    0.43,
                    0.34,
                    0.55,
                    0.49,
                    0.55,
                    0.49,
                    0.43,
                    // left column back
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    0,
                    1,
                    1,
                    // top rung back
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    0,
                    1,
                    1,
                    // middle rung back
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    0,
                    1,
                    1,
                    // top
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    // top rung front
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    // under top rung
                    0,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    // between top rung and middle
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    // top of middle rung
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    // front of middle rung
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    // bottom of middle rung.
                    0,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    // front of bottom
                    0,
                    0,
                    1,
                    1,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    1,
                    1,
                    // bottom
                    0,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    // left side
                    0,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    0,
                    1,
                    1,
                    1,
                    0
                  ];
                  var normals = expandRLEData([
                    // left column front
                    // top rung front
                    // middle rung front
                    18,
                    0,
                    0,
                    1,
                    // left column back
                    // top rung back
                    // middle rung back
                    18,
                    0,
                    0,
                    -1,
                    // top
                    6,
                    0,
                    1,
                    0,
                    // top rung front
                    6,
                    1,
                    0,
                    0,
                    // under top rung
                    6,
                    0,
                    -1,
                    0,
                    // between top rung and middle
                    6,
                    1,
                    0,
                    0,
                    // top of middle rung
                    6,
                    0,
                    1,
                    0,
                    // front of middle rung
                    6,
                    1,
                    0,
                    0,
                    // bottom of middle rung.
                    6,
                    0,
                    -1,
                    0,
                    // front of bottom
                    6,
                    1,
                    0,
                    0,
                    // bottom
                    6,
                    0,
                    -1,
                    0,
                    // left side
                    6,
                    -1,
                    0,
                    0
                  ]);
                  var colors = expandRLEData([
                    // left column front
                    // top rung front
                    // middle rung front
                    18,
                    200,
                    70,
                    120,
                    // left column back
                    // top rung back
                    // middle rung back
                    18,
                    80,
                    70,
                    200,
                    // top
                    6,
                    70,
                    200,
                    210,
                    // top rung front
                    6,
                    200,
                    200,
                    70,
                    // under top rung
                    6,
                    210,
                    100,
                    70,
                    // between top rung and middle
                    6,
                    210,
                    160,
                    70,
                    // top of middle rung
                    6,
                    70,
                    180,
                    210,
                    // front of middle rung
                    6,
                    100,
                    70,
                    210,
                    // bottom of middle rung.
                    6,
                    76,
                    210,
                    100,
                    // front of bottom
                    6,
                    140,
                    210,
                    80,
                    // bottom
                    6,
                    90,
                    130,
                    110,
                    // left side
                    6,
                    160,
                    160,
                    220
                  ], [255]);
                  var numVerts = positions.length / 3;
                  var arrays = {
                    position: createAugmentedTypedArray(3, numVerts),
                    texcoord: createAugmentedTypedArray(2, numVerts),
                    normal: createAugmentedTypedArray(3, numVerts),
                    color: createAugmentedTypedArray(4, numVerts, Uint8Array),
                    indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
                  };
                  arrays.position.push(positions);
                  arrays.texcoord.push(texcoords);
                  arrays.normal.push(normals);
                  arrays.color.push(colors);
                  for (var ii = 0; ii < numVerts; ++ii) {
                    arrays.indices.push(ii);
                  }
                  return arrays;
                }
                function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
                  if (subdivisionsDown <= 0) {
                    throw new Error("subdivisionDown must be > 0");
                  }
                  startOffset = startOffset || 0;
                  endOffset = endOffset || 1;
                  var subdivisionsThick = 2;
                  var offsetRange = endOffset - startOffset;
                  var numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  function lerp(a, b, s) {
                    return a + (b - a) * s;
                  }
                  function createArc(arcRadius, x3, normalMult, normalAdd, uMult, uAdd) {
                    for (var z = 0; z <= subdivisionsDown; z++) {
                      var uBack2 = x3 / (subdivisionsThick - 1);
                      var v = z / subdivisionsDown;
                      var xBack = (uBack2 - 0.5) * 2;
                      var angle = (startOffset + v * offsetRange) * Math.PI;
                      var s = Math.sin(angle);
                      var c = Math.cos(angle);
                      var radius = lerp(verticalRadius, arcRadius, s);
                      var px = xBack * thickness;
                      var py = c * verticalRadius;
                      var pz = s * radius;
                      positions.push(px, py, pz);
                      var n = v32.add(v32.multiply([0, s, c], normalMult), normalAdd);
                      normals.push(n);
                      texcoords.push(uBack2 * uMult + uAdd, v);
                    }
                  }
                  for (var x2 = 0; x2 < subdivisionsThick; x2++) {
                    var uBack = (x2 / (subdivisionsThick - 1) - 0.5) * 2;
                    createArc(outerRadius, x2, [1, 1, 1], [0, 0, 0], 1, 0);
                    createArc(outerRadius, x2, [0, 0, 0], [uBack, 0, 0], 0, 0);
                    createArc(innerRadius, x2, [1, 1, 1], [0, 0, 0], 1, 0);
                    createArc(innerRadius, x2, [0, 0, 0], [uBack, 0, 0], 0, 1);
                  }
                  var indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
                  function createSurface(leftArcOffset, rightArcOffset) {
                    for (var z = 0; z < subdivisionsDown; ++z) {
                      indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
                      indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
                    }
                  }
                  var numVerticesDown = subdivisionsDown + 1;
                  createSurface(numVerticesDown * 0, numVerticesDown * 4);
                  createSurface(numVerticesDown * 5, numVerticesDown * 7);
                  createSurface(numVerticesDown * 6, numVerticesDown * 2);
                  createSurface(numVerticesDown * 3, numVerticesDown * 1);
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
                  return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
                }
                function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
                  if (radialSubdivisions < 3) {
                    throw new Error("radialSubdivisions must be 3 or greater");
                  }
                  if (bodySubdivisions < 3) {
                    throw new Error("verticalSubdivisions must be 3 or greater");
                  }
                  startAngle = startAngle || 0;
                  endAngle = endAngle || Math.PI * 2;
                  var range = endAngle - startAngle;
                  var radialParts = radialSubdivisions + 1;
                  var bodyParts = bodySubdivisions + 1;
                  var numVertices = radialParts * bodyParts;
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  var indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
                  for (var slice = 0; slice < bodyParts; ++slice) {
                    var v = slice / bodySubdivisions;
                    var sliceAngle = v * Math.PI * 2;
                    var sliceSin = Math.sin(sliceAngle);
                    var ringRadius = radius + sliceSin * thickness;
                    var ny = Math.cos(sliceAngle);
                    var y = ny * thickness;
                    for (var ring = 0; ring < radialParts; ++ring) {
                      var u = ring / radialSubdivisions;
                      var ringAngle = startAngle + u * range;
                      var xSin = Math.sin(ringAngle);
                      var zCos = Math.cos(ringAngle);
                      var x2 = xSin * ringRadius;
                      var z = zCos * ringRadius;
                      var nx = xSin * sliceSin;
                      var nz = zCos * sliceSin;
                      positions.push(x2, y, z);
                      normals.push(nx, ny, nz);
                      texcoords.push(u, 1 - v);
                    }
                  }
                  for (var _slice = 0; _slice < bodySubdivisions; ++_slice) {
                    for (var _ring = 0; _ring < radialSubdivisions; ++_ring) {
                      var nextRingIndex = 1 + _ring;
                      var nextSliceIndex = 1 + _slice;
                      indices.push(radialParts * _slice + _ring, radialParts * nextSliceIndex + _ring, radialParts * _slice + nextRingIndex);
                      indices.push(radialParts * nextSliceIndex + _ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * _slice + nextRingIndex);
                    }
                  }
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
                  if (divisions < 3) {
                    throw new Error("divisions must be at least 3");
                  }
                  stacks = stacks ? stacks : 1;
                  stackPower = stackPower ? stackPower : 1;
                  innerRadius = innerRadius ? innerRadius : 0;
                  var numVertices = (divisions + 1) * (stacks + 1);
                  var positions = createAugmentedTypedArray(3, numVertices);
                  var normals = createAugmentedTypedArray(3, numVertices);
                  var texcoords = createAugmentedTypedArray(2, numVertices);
                  var indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
                  var firstIndex = 0;
                  var radiusSpan = radius - innerRadius;
                  var pointsPerStack = divisions + 1;
                  for (var stack = 0; stack <= stacks; ++stack) {
                    var stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
                    for (var i2 = 0; i2 <= divisions; ++i2) {
                      var theta = 2 * Math.PI * i2 / divisions;
                      var x2 = stackRadius * Math.cos(theta);
                      var z = stackRadius * Math.sin(theta);
                      positions.push(x2, 0, z);
                      normals.push(0, 1, 0);
                      texcoords.push(1 - i2 / divisions, stack / stacks);
                      if (stack > 0 && i2 !== divisions) {
                        var a = firstIndex + (i2 + 1);
                        var b = firstIndex + i2;
                        var c = firstIndex + i2 - pointsPerStack;
                        var d = firstIndex + (i2 + 1) - pointsPerStack;
                        indices.push(a, b, c);
                        indices.push(a, c, d);
                      }
                    }
                    firstIndex += divisions + 1;
                  }
                  return {
                    position: positions,
                    normal: normals,
                    texcoord: texcoords,
                    indices
                  };
                }
                function randInt(range) {
                  return Math.random() * range | 0;
                }
                function makeRandomVertexColors(vertices, options) {
                  options = options || {};
                  var numElements = vertices.position.numElements;
                  var vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
                  var rand = options.rand || function(ndx, channel) {
                    return channel < 3 ? randInt(256) : 255;
                  };
                  vertices.color = vColors;
                  if (vertices.indices) {
                    for (var ii = 0; ii < numElements; ++ii) {
                      vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
                    }
                  } else {
                    var numVertsPerColor = options.vertsPerColor || 3;
                    var numSets = numElements / numVertsPerColor;
                    for (var _ii2 = 0; _ii2 < numSets; ++_ii2) {
                      var color = [rand(_ii2, 0), rand(_ii2, 1), rand(_ii2, 2), rand(_ii2, 3)];
                      for (var jj = 0; jj < numVertsPerColor; ++jj) {
                        vColors.push(color);
                      }
                    }
                  }
                  return vertices;
                }
                function createBufferFunc(fn) {
                  return function(gl) {
                    var arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
                    return attributes.createBuffersFromArrays(gl, arrays);
                  };
                }
                function createBufferInfoFunc(fn) {
                  return function(gl) {
                    var arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
                    return attributes.createBufferInfoFromArrays(gl, arrays);
                  };
                }
                var arraySpecPropertyNames = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
                function copyElements(src, dst, dstNdx, offset) {
                  offset = offset || 0;
                  var length2 = src.length;
                  for (var ii = 0; ii < length2; ++ii) {
                    dst[dstNdx + ii] = src[ii] + offset;
                  }
                }
                function createArrayOfSameType(srcArray, length2) {
                  var arraySrc = getArray(srcArray);
                  var newArray = new arraySrc.constructor(length2);
                  var newArraySpec = newArray;
                  if (arraySrc.numComponents && arraySrc.numElements) {
                    augmentTypedArray(newArray, arraySrc.numComponents);
                  }
                  if (srcArray.data) {
                    newArraySpec = {
                      data: newArray
                    };
                    helper.copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
                  }
                  return newArraySpec;
                }
                function concatVertices(arrayOfArrays) {
                  var names = {};
                  var baseName;
                  var _loop = function _loop2(ii2) {
                    var arrays = arrayOfArrays[ii2];
                    Object.keys(arrays).forEach(function(name) {
                      if (!names[name]) {
                        names[name] = [];
                      }
                      if (!baseName && name !== "indices") {
                        baseName = name;
                      }
                      var arrayInfo = arrays[name];
                      var numComponents = getNumComponents(arrayInfo, name);
                      var array = getArray(arrayInfo);
                      var numElements = array.length / numComponents;
                      names[name].push(numElements);
                    });
                  };
                  for (var ii = 0; ii < arrayOfArrays.length; ++ii) {
                    _loop(ii);
                  }
                  function getLengthOfCombinedArrays(name) {
                    var length2 = 0;
                    var arraySpec;
                    for (var _ii3 = 0; _ii3 < arrayOfArrays.length; ++_ii3) {
                      var arrays = arrayOfArrays[_ii3];
                      var arrayInfo = arrays[name];
                      var array = getArray(arrayInfo);
                      length2 += array.length;
                      if (!arraySpec || arrayInfo.data) {
                        arraySpec = arrayInfo;
                      }
                    }
                    return {
                      length: length2,
                      spec: arraySpec
                    };
                  }
                  function copyArraysToNewArray(name, base2, newArray) {
                    var baseIndex = 0;
                    var offset = 0;
                    for (var _ii4 = 0; _ii4 < arrayOfArrays.length; ++_ii4) {
                      var arrays = arrayOfArrays[_ii4];
                      var arrayInfo = arrays[name];
                      var array = getArray(arrayInfo);
                      if (name === "indices") {
                        copyElements(array, newArray, offset, baseIndex);
                        baseIndex += base2[_ii4];
                      } else {
                        copyElements(array, newArray, offset);
                      }
                      offset += array.length;
                    }
                  }
                  var base = names[baseName];
                  var newArrays = {};
                  Object.keys(names).forEach(function(name) {
                    var info = getLengthOfCombinedArrays(name);
                    var newArraySpec = createArrayOfSameType(info.spec, info.length);
                    copyArraysToNewArray(name, base, getArray(newArraySpec));
                    newArrays[name] = newArraySpec;
                  });
                  return newArrays;
                }
                function duplicateVertices(arrays) {
                  var newArrays = {};
                  Object.keys(arrays).forEach(function(name) {
                    var arraySpec = arrays[name];
                    var srcArray = getArray(arraySpec);
                    var newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
                    copyElements(srcArray, getArray(newArraySpec), 0);
                    newArrays[name] = newArraySpec;
                  });
                  return newArrays;
                }
                var create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
                exports2.create3DFBufferInfo = create3DFBufferInfo;
                var create3DFBuffers = createBufferFunc(create3DFVertices);
                exports2.create3DFBuffers = create3DFBuffers;
                var createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
                exports2.createCubeBufferInfo = createCubeBufferInfo;
                var createCubeBuffers = createBufferFunc(createCubeVertices);
                exports2.createCubeBuffers = createCubeBuffers;
                var createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
                exports2.createPlaneBufferInfo = createPlaneBufferInfo;
                var createPlaneBuffers = createBufferFunc(createPlaneVertices);
                exports2.createPlaneBuffers = createPlaneBuffers;
                var createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
                exports2.createSphereBufferInfo = createSphereBufferInfo;
                var createSphereBuffers = createBufferFunc(createSphereVertices);
                exports2.createSphereBuffers = createSphereBuffers;
                var createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
                exports2.createTruncatedConeBufferInfo = createTruncatedConeBufferInfo;
                var createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
                exports2.createTruncatedConeBuffers = createTruncatedConeBuffers;
                var createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
                exports2.createXYQuadBufferInfo = createXYQuadBufferInfo;
                var createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
                exports2.createXYQuadBuffers = createXYQuadBuffers;
                var createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
                exports2.createCrescentBufferInfo = createCrescentBufferInfo;
                var createCrescentBuffers = createBufferFunc(createCrescentVertices);
                exports2.createCrescentBuffers = createCrescentBuffers;
                var createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
                exports2.createCylinderBufferInfo = createCylinderBufferInfo;
                var createCylinderBuffers = createBufferFunc(createCylinderVertices);
                exports2.createCylinderBuffers = createCylinderBuffers;
                var createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
                exports2.createTorusBufferInfo = createTorusBufferInfo;
                var createTorusBuffers = createBufferFunc(createTorusVertices);
                exports2.createTorusBuffers = createTorusBuffers;
                var createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
                exports2.createDiscBufferInfo = createDiscBufferInfo;
                var createDiscBuffers = createBufferFunc(createDiscVertices);
                exports2.createDiscBuffers = createDiscBuffers;
                var createCresentBufferInfo = createCrescentBufferInfo;
                exports2.createCresentBufferInfo = createCresentBufferInfo;
                var createCresentBuffers = createCrescentBuffers;
                exports2.createCresentBuffers = createCresentBuffers;
                var createCresentVertices = createCrescentVertices;
                exports2.createCresentVertices = createCresentVertices;
              })
            ),
            /***/
            "./src/programs.js": (
              /*!*************************!*\
                !*** ./src/programs.js ***!
                \*************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.createAttributeSetters = createAttributeSetters;
                exports2.createProgram = createProgram;
                exports2.createProgramAsync = createProgramAsync;
                exports2.createProgramFromScripts = createProgramFromScripts;
                exports2.createProgramFromSources = createProgramFromSources;
                exports2.createProgramInfo = createProgramInfo;
                exports2.createProgramInfoAsync = createProgramInfoAsync;
                exports2.createProgramInfoFromProgram = createProgramInfoFromProgram;
                exports2.createUniformSetters = createUniformSetters;
                exports2.createUniformBlockSpecFromProgram = createUniformBlockSpecFromProgram;
                exports2.createUniformBlockInfoFromProgram = createUniformBlockInfoFromProgram;
                exports2.createUniformBlockInfo = createUniformBlockInfo;
                exports2.createTransformFeedback = createTransformFeedback;
                exports2.createTransformFeedbackInfo = createTransformFeedbackInfo;
                exports2.bindTransformFeedbackInfo = bindTransformFeedbackInfo;
                exports2.setAttributes = setAttributes;
                exports2.setBuffersAndAttributes = setBuffersAndAttributes;
                exports2.setUniforms = setUniforms;
                exports2.setUniformBlock = setUniformBlock;
                exports2.setBlockUniforms = setBlockUniforms;
                exports2.bindUniformBlock = bindUniformBlock;
                exports2.setUniformsAndBindTextures = void 0;
                var utils = _interopRequireWildcard(__webpack_require__(
                  /*! ./utils.js */
                  "./src/utils.js"
                ));
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
                  try {
                    var info = gen[key](arg);
                    var value = info.value;
                  } catch (error2) {
                    reject(error2);
                    return;
                  }
                  if (info.done) {
                    resolve(value);
                  } else {
                    Promise.resolve(value).then(_next, _throw);
                  }
                }
                function _asyncToGenerator(fn) {
                  return function() {
                    var self2 = this, args = arguments;
                    return new Promise(function(resolve, reject) {
                      var gen = fn.apply(self2, args);
                      function _next(value) {
                        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                      }
                      function _throw(err2) {
                        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err2);
                      }
                      _next(void 0);
                    });
                  };
                }
                function _toConsumableArray(arr) {
                  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
                }
                function _nonIterableSpread() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _unsupportedIterableToArray(o, minLen) {
                  if (!o) return;
                  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                  var n = Object.prototype.toString.call(o).slice(8, -1);
                  if (n === "Object" && o.constructor) n = o.constructor.name;
                  if (n === "Map" || n === "Set") return Array.from(o);
                  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                }
                function _iterableToArray(iter) {
                  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
                }
                function _arrayWithoutHoles(arr) {
                  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                }
                function _arrayLikeToArray(arr, len) {
                  if (len == null || len > arr.length) len = arr.length;
                  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
                    arr2[i2] = arr[i2];
                  }
                  return arr2;
                }
                var error = helper.error;
                var warn = helper.warn;
                function getElementById(id) {
                  return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
                }
                var TEXTURE0 = 33984;
                var DYNAMIC_DRAW = 35048;
                var ARRAY_BUFFER = 34962;
                var ELEMENT_ARRAY_BUFFER = 34963;
                var UNIFORM_BUFFER = 35345;
                var TRANSFORM_FEEDBACK_BUFFER = 35982;
                var TRANSFORM_FEEDBACK = 36386;
                var COMPILE_STATUS = 35713;
                var LINK_STATUS = 35714;
                var FRAGMENT_SHADER = 35632;
                var VERTEX_SHADER = 35633;
                var SEPARATE_ATTRIBS = 35981;
                var ACTIVE_UNIFORMS = 35718;
                var ACTIVE_ATTRIBUTES = 35721;
                var TRANSFORM_FEEDBACK_VARYINGS = 35971;
                var ACTIVE_UNIFORM_BLOCKS = 35382;
                var UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
                var UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
                var UNIFORM_BLOCK_DATA_SIZE = 35392;
                var UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
                var FLOAT = 5126;
                var FLOAT_VEC2 = 35664;
                var FLOAT_VEC3 = 35665;
                var FLOAT_VEC4 = 35666;
                var INT = 5124;
                var INT_VEC2 = 35667;
                var INT_VEC3 = 35668;
                var INT_VEC4 = 35669;
                var BOOL = 35670;
                var BOOL_VEC2 = 35671;
                var BOOL_VEC3 = 35672;
                var BOOL_VEC4 = 35673;
                var FLOAT_MAT2 = 35674;
                var FLOAT_MAT3 = 35675;
                var FLOAT_MAT4 = 35676;
                var SAMPLER_2D = 35678;
                var SAMPLER_CUBE = 35680;
                var SAMPLER_3D = 35679;
                var SAMPLER_2D_SHADOW = 35682;
                var FLOAT_MAT2x3 = 35685;
                var FLOAT_MAT2x4 = 35686;
                var FLOAT_MAT3x2 = 35687;
                var FLOAT_MAT3x4 = 35688;
                var FLOAT_MAT4x2 = 35689;
                var FLOAT_MAT4x3 = 35690;
                var SAMPLER_2D_ARRAY = 36289;
                var SAMPLER_2D_ARRAY_SHADOW = 36292;
                var SAMPLER_CUBE_SHADOW = 36293;
                var UNSIGNED_INT = 5125;
                var UNSIGNED_INT_VEC2 = 36294;
                var UNSIGNED_INT_VEC3 = 36295;
                var UNSIGNED_INT_VEC4 = 36296;
                var INT_SAMPLER_2D = 36298;
                var INT_SAMPLER_3D = 36299;
                var INT_SAMPLER_CUBE = 36300;
                var INT_SAMPLER_2D_ARRAY = 36303;
                var UNSIGNED_INT_SAMPLER_2D = 36306;
                var UNSIGNED_INT_SAMPLER_3D = 36307;
                var UNSIGNED_INT_SAMPLER_CUBE = 36308;
                var UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
                var TEXTURE_2D = 3553;
                var TEXTURE_CUBE_MAP = 34067;
                var TEXTURE_3D = 32879;
                var TEXTURE_2D_ARRAY = 35866;
                var typeMap = {};
                function getBindPointForSamplerType(gl2, type) {
                  return typeMap[type].bindPoint;
                }
                function floatSetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1f(location2, v);
                  };
                }
                function floatArraySetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1fv(location2, v);
                  };
                }
                function floatVec2Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform2fv(location2, v);
                  };
                }
                function floatVec3Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform3fv(location2, v);
                  };
                }
                function floatVec4Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform4fv(location2, v);
                  };
                }
                function intSetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1i(location2, v);
                  };
                }
                function intArraySetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1iv(location2, v);
                  };
                }
                function intVec2Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform2iv(location2, v);
                  };
                }
                function intVec3Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform3iv(location2, v);
                  };
                }
                function intVec4Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform4iv(location2, v);
                  };
                }
                function uintSetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1ui(location2, v);
                  };
                }
                function uintArraySetter(gl2, location2) {
                  return function(v) {
                    gl2.uniform1uiv(location2, v);
                  };
                }
                function uintVec2Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform2uiv(location2, v);
                  };
                }
                function uintVec3Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform3uiv(location2, v);
                  };
                }
                function uintVec4Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniform4uiv(location2, v);
                  };
                }
                function floatMat2Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix2fv(location2, false, v);
                  };
                }
                function floatMat3Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix3fv(location2, false, v);
                  };
                }
                function floatMat4Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix4fv(location2, false, v);
                  };
                }
                function floatMat23Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix2x3fv(location2, false, v);
                  };
                }
                function floatMat32Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix3x2fv(location2, false, v);
                  };
                }
                function floatMat24Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix2x4fv(location2, false, v);
                  };
                }
                function floatMat42Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix4x2fv(location2, false, v);
                  };
                }
                function floatMat34Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix3x4fv(location2, false, v);
                  };
                }
                function floatMat43Setter(gl2, location2) {
                  return function(v) {
                    gl2.uniformMatrix4x3fv(location2, false, v);
                  };
                }
                function samplerSetter(gl2, type, unit, location2) {
                  var bindPoint = getBindPointForSamplerType(gl2, type);
                  return utils.isWebGL2(gl2) ? function(textureOrPair) {
                    var texture;
                    var sampler;
                    if (helper.isTexture(gl2, textureOrPair)) {
                      texture = textureOrPair;
                      sampler = null;
                    } else {
                      texture = textureOrPair.texture;
                      sampler = textureOrPair.sampler;
                    }
                    gl2.uniform1i(location2, unit);
                    gl2.activeTexture(TEXTURE0 + unit);
                    gl2.bindTexture(bindPoint, texture);
                    gl2.bindSampler(unit, sampler);
                  } : function(texture) {
                    gl2.uniform1i(location2, unit);
                    gl2.activeTexture(TEXTURE0 + unit);
                    gl2.bindTexture(bindPoint, texture);
                  };
                }
                function samplerArraySetter(gl2, type, unit, location2, size) {
                  var bindPoint = getBindPointForSamplerType(gl2, type);
                  var units = new Int32Array(size);
                  for (var ii = 0; ii < size; ++ii) {
                    units[ii] = unit + ii;
                  }
                  return utils.isWebGL2(gl2) ? function(textures) {
                    gl2.uniform1iv(location2, units);
                    textures.forEach(function(textureOrPair, index) {
                      gl2.activeTexture(TEXTURE0 + units[index]);
                      var texture;
                      var sampler;
                      if (helper.isTexture(gl2, textureOrPair)) {
                        texture = textureOrPair;
                        sampler = null;
                      } else {
                        texture = textureOrPair.texture;
                        sampler = textureOrPair.sampler;
                      }
                      gl2.bindSampler(unit, sampler);
                      gl2.bindTexture(bindPoint, texture);
                    });
                  } : function(textures) {
                    gl2.uniform1iv(location2, units);
                    textures.forEach(function(texture, index) {
                      gl2.activeTexture(TEXTURE0 + units[index]);
                      gl2.bindTexture(bindPoint, texture);
                    });
                  };
                }
                typeMap[FLOAT] = {
                  Type: Float32Array,
                  size: 4,
                  setter: floatSetter,
                  arraySetter: floatArraySetter
                };
                typeMap[FLOAT_VEC2] = {
                  Type: Float32Array,
                  size: 8,
                  setter: floatVec2Setter,
                  cols: 2
                };
                typeMap[FLOAT_VEC3] = {
                  Type: Float32Array,
                  size: 12,
                  setter: floatVec3Setter,
                  cols: 3
                };
                typeMap[FLOAT_VEC4] = {
                  Type: Float32Array,
                  size: 16,
                  setter: floatVec4Setter,
                  cols: 4
                };
                typeMap[INT] = {
                  Type: Int32Array,
                  size: 4,
                  setter: intSetter,
                  arraySetter: intArraySetter
                };
                typeMap[INT_VEC2] = {
                  Type: Int32Array,
                  size: 8,
                  setter: intVec2Setter,
                  cols: 2
                };
                typeMap[INT_VEC3] = {
                  Type: Int32Array,
                  size: 12,
                  setter: intVec3Setter,
                  cols: 3
                };
                typeMap[INT_VEC4] = {
                  Type: Int32Array,
                  size: 16,
                  setter: intVec4Setter,
                  cols: 4
                };
                typeMap[UNSIGNED_INT] = {
                  Type: Uint32Array,
                  size: 4,
                  setter: uintSetter,
                  arraySetter: uintArraySetter
                };
                typeMap[UNSIGNED_INT_VEC2] = {
                  Type: Uint32Array,
                  size: 8,
                  setter: uintVec2Setter,
                  cols: 2
                };
                typeMap[UNSIGNED_INT_VEC3] = {
                  Type: Uint32Array,
                  size: 12,
                  setter: uintVec3Setter,
                  cols: 3
                };
                typeMap[UNSIGNED_INT_VEC4] = {
                  Type: Uint32Array,
                  size: 16,
                  setter: uintVec4Setter,
                  cols: 4
                };
                typeMap[BOOL] = {
                  Type: Uint32Array,
                  size: 4,
                  setter: intSetter,
                  arraySetter: intArraySetter
                };
                typeMap[BOOL_VEC2] = {
                  Type: Uint32Array,
                  size: 8,
                  setter: intVec2Setter,
                  cols: 2
                };
                typeMap[BOOL_VEC3] = {
                  Type: Uint32Array,
                  size: 12,
                  setter: intVec3Setter,
                  cols: 3
                };
                typeMap[BOOL_VEC4] = {
                  Type: Uint32Array,
                  size: 16,
                  setter: intVec4Setter,
                  cols: 4
                };
                typeMap[FLOAT_MAT2] = {
                  Type: Float32Array,
                  size: 32,
                  setter: floatMat2Setter,
                  rows: 2,
                  cols: 2
                };
                typeMap[FLOAT_MAT3] = {
                  Type: Float32Array,
                  size: 48,
                  setter: floatMat3Setter,
                  rows: 3,
                  cols: 3
                };
                typeMap[FLOAT_MAT4] = {
                  Type: Float32Array,
                  size: 64,
                  setter: floatMat4Setter,
                  rows: 4,
                  cols: 4
                };
                typeMap[FLOAT_MAT2x3] = {
                  Type: Float32Array,
                  size: 32,
                  setter: floatMat23Setter,
                  rows: 2,
                  cols: 3
                };
                typeMap[FLOAT_MAT2x4] = {
                  Type: Float32Array,
                  size: 32,
                  setter: floatMat24Setter,
                  rows: 2,
                  cols: 4
                };
                typeMap[FLOAT_MAT3x2] = {
                  Type: Float32Array,
                  size: 48,
                  setter: floatMat32Setter,
                  rows: 3,
                  cols: 2
                };
                typeMap[FLOAT_MAT3x4] = {
                  Type: Float32Array,
                  size: 48,
                  setter: floatMat34Setter,
                  rows: 3,
                  cols: 4
                };
                typeMap[FLOAT_MAT4x2] = {
                  Type: Float32Array,
                  size: 64,
                  setter: floatMat42Setter,
                  rows: 4,
                  cols: 2
                };
                typeMap[FLOAT_MAT4x3] = {
                  Type: Float32Array,
                  size: 64,
                  setter: floatMat43Setter,
                  rows: 4,
                  cols: 3
                };
                typeMap[SAMPLER_2D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D
                };
                typeMap[SAMPLER_CUBE] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_CUBE_MAP
                };
                typeMap[SAMPLER_3D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_3D
                };
                typeMap[SAMPLER_2D_SHADOW] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D
                };
                typeMap[SAMPLER_2D_ARRAY] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D_ARRAY
                };
                typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D_ARRAY
                };
                typeMap[SAMPLER_CUBE_SHADOW] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_CUBE_MAP
                };
                typeMap[INT_SAMPLER_2D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D
                };
                typeMap[INT_SAMPLER_3D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_3D
                };
                typeMap[INT_SAMPLER_CUBE] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_CUBE_MAP
                };
                typeMap[INT_SAMPLER_2D_ARRAY] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D_ARRAY
                };
                typeMap[UNSIGNED_INT_SAMPLER_2D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D
                };
                typeMap[UNSIGNED_INT_SAMPLER_3D] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_3D
                };
                typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_CUBE_MAP
                };
                typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
                  Type: null,
                  size: 0,
                  setter: samplerSetter,
                  arraySetter: samplerArraySetter,
                  bindPoint: TEXTURE_2D_ARRAY
                };
                function floatAttribSetter(gl2, index) {
                  return function(b) {
                    if (b.value) {
                      gl2.disableVertexAttribArray(index);
                      switch (b.value.length) {
                        case 4:
                          gl2.vertexAttrib4fv(index, b.value);
                          break;
                        case 3:
                          gl2.vertexAttrib3fv(index, b.value);
                          break;
                        case 2:
                          gl2.vertexAttrib2fv(index, b.value);
                          break;
                        case 1:
                          gl2.vertexAttrib1fv(index, b.value);
                          break;
                        default:
                          throw new Error("the length of a float constant value must be between 1 and 4!");
                      }
                    } else {
                      gl2.bindBuffer(ARRAY_BUFFER, b.buffer);
                      gl2.enableVertexAttribArray(index);
                      gl2.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                      if (b.divisor !== void 0) {
                        gl2.vertexAttribDivisor(index, b.divisor);
                      }
                    }
                  };
                }
                function intAttribSetter(gl2, index) {
                  return function(b) {
                    if (b.value) {
                      gl2.disableVertexAttribArray(index);
                      if (b.value.length === 4) {
                        gl2.vertexAttrib4iv(index, b.value);
                      } else {
                        throw new Error("The length of an integer constant value must be 4!");
                      }
                    } else {
                      gl2.bindBuffer(ARRAY_BUFFER, b.buffer);
                      gl2.enableVertexAttribArray(index);
                      gl2.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT, b.stride || 0, b.offset || 0);
                      if (b.divisor !== void 0) {
                        gl2.vertexAttribDivisor(index, b.divisor);
                      }
                    }
                  };
                }
                function uintAttribSetter(gl2, index) {
                  return function(b) {
                    if (b.value) {
                      gl2.disableVertexAttribArray(index);
                      if (b.value.length === 4) {
                        gl2.vertexAttrib4uiv(index, b.value);
                      } else {
                        throw new Error("The length of an unsigned integer constant value must be 4!");
                      }
                    } else {
                      gl2.bindBuffer(ARRAY_BUFFER, b.buffer);
                      gl2.enableVertexAttribArray(index);
                      gl2.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT, b.stride || 0, b.offset || 0);
                      if (b.divisor !== void 0) {
                        gl2.vertexAttribDivisor(index, b.divisor);
                      }
                    }
                  };
                }
                function matAttribSetter(gl2, index, typeInfo) {
                  var defaultSize = typeInfo.size;
                  var count = typeInfo.count;
                  return function(b) {
                    gl2.bindBuffer(ARRAY_BUFFER, b.buffer);
                    var numComponents = b.size || b.numComponents || defaultSize;
                    var size = numComponents / count;
                    var type = b.type || FLOAT;
                    var typeInfo2 = typeMap[type];
                    var stride = typeInfo2.size * numComponents;
                    var normalize = b.normalize || false;
                    var offset = b.offset || 0;
                    var rowOffset = stride / count;
                    for (var i2 = 0; i2 < count; ++i2) {
                      gl2.enableVertexAttribArray(index + i2);
                      gl2.vertexAttribPointer(index + i2, size, type, normalize, stride, offset + rowOffset * i2);
                      if (b.divisor !== void 0) {
                        gl2.vertexAttribDivisor(index + i2, b.divisor);
                      }
                    }
                  };
                }
                var attrTypeMap = {};
                attrTypeMap[FLOAT] = {
                  size: 4,
                  setter: floatAttribSetter
                };
                attrTypeMap[FLOAT_VEC2] = {
                  size: 8,
                  setter: floatAttribSetter
                };
                attrTypeMap[FLOAT_VEC3] = {
                  size: 12,
                  setter: floatAttribSetter
                };
                attrTypeMap[FLOAT_VEC4] = {
                  size: 16,
                  setter: floatAttribSetter
                };
                attrTypeMap[INT] = {
                  size: 4,
                  setter: intAttribSetter
                };
                attrTypeMap[INT_VEC2] = {
                  size: 8,
                  setter: intAttribSetter
                };
                attrTypeMap[INT_VEC3] = {
                  size: 12,
                  setter: intAttribSetter
                };
                attrTypeMap[INT_VEC4] = {
                  size: 16,
                  setter: intAttribSetter
                };
                attrTypeMap[UNSIGNED_INT] = {
                  size: 4,
                  setter: uintAttribSetter
                };
                attrTypeMap[UNSIGNED_INT_VEC2] = {
                  size: 8,
                  setter: uintAttribSetter
                };
                attrTypeMap[UNSIGNED_INT_VEC3] = {
                  size: 12,
                  setter: uintAttribSetter
                };
                attrTypeMap[UNSIGNED_INT_VEC4] = {
                  size: 16,
                  setter: uintAttribSetter
                };
                attrTypeMap[BOOL] = {
                  size: 4,
                  setter: intAttribSetter
                };
                attrTypeMap[BOOL_VEC2] = {
                  size: 8,
                  setter: intAttribSetter
                };
                attrTypeMap[BOOL_VEC3] = {
                  size: 12,
                  setter: intAttribSetter
                };
                attrTypeMap[BOOL_VEC4] = {
                  size: 16,
                  setter: intAttribSetter
                };
                attrTypeMap[FLOAT_MAT2] = {
                  size: 4,
                  setter: matAttribSetter,
                  count: 2
                };
                attrTypeMap[FLOAT_MAT3] = {
                  size: 9,
                  setter: matAttribSetter,
                  count: 3
                };
                attrTypeMap[FLOAT_MAT4] = {
                  size: 16,
                  setter: matAttribSetter,
                  count: 4
                };
                var gl = void 0;
                var errorRE = /ERROR:\s*\d+:(\d+)/gi;
                function addLineNumbersWithError(src) {
                  var log = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
                  var lineOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
                  var matches = _toConsumableArray(log.matchAll(errorRE));
                  var lineNoToErrorMap = new Map(matches.map(function(m, ndx) {
                    var lineNo = parseInt(m[1]);
                    var next = matches[ndx + 1];
                    var end = next ? next.index : log.length;
                    var msg = log.substring(m.index, end);
                    return [lineNo - 1, msg];
                  }));
                  return src.split("\n").map(function(line, lineNo) {
                    var err2 = lineNoToErrorMap.get(lineNo);
                    return "".concat(lineNo + 1 + lineOffset, ": ").concat(line).concat(err2 ? "\n\n^^^ ".concat(err2) : "");
                  }).join("\n");
                }
                var spaceRE = /^[ \t]*\n/;
                function prepShaderSource(shaderSource) {
                  var lineOffset = 0;
                  if (spaceRE.test(shaderSource)) {
                    lineOffset = 1;
                    shaderSource = shaderSource.replace(spaceRE, "");
                  }
                  return {
                    lineOffset,
                    shaderSource
                  };
                }
                function reportError(progOptions, msg) {
                  progOptions.errorCallback(msg);
                  if (progOptions.callback) {
                    setTimeout(function() {
                      progOptions.callback("".concat(msg, "\n").concat(progOptions.errors.join("\n")));
                    });
                  }
                  return null;
                }
                function loadShader(gl2, shaderSource, shaderType, progOptions) {
                  var shader = gl2.createShader(shaderType);
                  gl2.shaderSource(shader, prepShaderSource(shaderSource).shaderSource);
                  gl2.compileShader(shader);
                  if (!progOptions.callback && !checkShaderStatus(gl2, shaderType, shader, progOptions.errorCallback)) {
                    gl2.deleteShader(shader);
                    return null;
                  }
                  return shader;
                }
                function checkShaderStatus(gl2, shaderType, shader, errFn) {
                  errFn = errFn || error;
                  var compiled = gl2.getShaderParameter(shader, COMPILE_STATUS);
                  if (!compiled) {
                    var lastError = gl2.getShaderInfoLog(shader);
                    var _prepShaderSource = prepShaderSource(gl2.getShaderSource(shader)), lineOffset = _prepShaderSource.lineOffset, shaderSource = _prepShaderSource.shaderSource;
                    errFn("".concat(addLineNumbersWithError(shaderSource, lastError, lineOffset), "\nError compiling ").concat(utils.glEnumToString(gl2, shaderType), ": ").concat(lastError));
                  }
                  return compiled;
                }
                function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
                  var transformFeedbackVaryings;
                  var transformFeedbackMode;
                  var callback;
                  if (typeof opt_locations === "function") {
                    opt_errorCallback = opt_locations;
                    opt_locations = void 0;
                  }
                  if (typeof opt_attribs === "function") {
                    opt_errorCallback = opt_attribs;
                    opt_attribs = void 0;
                  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
                    if (opt_attribs.errorCallback && opt_attribs.errors) {
                      return opt_attribs;
                    }
                    var opt = opt_attribs;
                    opt_errorCallback = opt.errorCallback;
                    opt_attribs = opt.attribLocations;
                    transformFeedbackVaryings = opt.transformFeedbackVaryings;
                    transformFeedbackMode = opt.transformFeedbackMode;
                    callback = opt.callback;
                  }
                  var _errorCallback = opt_errorCallback || error;
                  var errors = [];
                  var options = {
                    errorCallback: function errorCallback(msg) {
                      errors.push(msg);
                      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                      }
                      _errorCallback.apply(void 0, [msg].concat(args));
                    },
                    transformFeedbackVaryings,
                    transformFeedbackMode,
                    callback,
                    errors
                  };
                  if (opt_attribs) {
                    var attribLocations = {};
                    if (Array.isArray(opt_attribs)) {
                      opt_attribs.forEach(function(attrib, ndx) {
                        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
                      });
                    } else {
                      attribLocations = opt_attribs;
                    }
                    options.attribLocations = attribLocations;
                  }
                  return options;
                }
                var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
                function getShaderTypeFromScriptType(gl2, scriptType) {
                  if (scriptType.indexOf("frag") >= 0) {
                    return FRAGMENT_SHADER;
                  } else if (scriptType.indexOf("vert") >= 0) {
                    return VERTEX_SHADER;
                  }
                  return void 0;
                }
                function deleteShaders(gl2, shaders) {
                  shaders.forEach(function(shader) {
                    gl2.deleteShader(shader);
                  });
                }
                var wait = function wait2() {
                  var ms = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                  return new Promise(function(resolve) {
                    return setTimeout(resolve, ms);
                  });
                };
                function createProgram(gl2, shaders, opt_attribs, opt_locations, opt_errorCallback) {
                  var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                  var realShaders = [];
                  var newShaders = [];
                  for (var ndx = 0; ndx < shaders.length; ++ndx) {
                    var shader = shaders[ndx];
                    if (typeof shader === "string") {
                      var elem = getElementById(shader);
                      var src = elem ? elem.text : shader;
                      var type = gl2[defaultShaderType[ndx]];
                      if (elem && elem.type) {
                        type = getShaderTypeFromScriptType(gl2, elem.type) || type;
                      }
                      shader = loadShader(gl2, src, type, progOptions);
                      newShaders.push(shader);
                    }
                    if (helper.isShader(gl2, shader)) {
                      realShaders.push(shader);
                    }
                  }
                  if (realShaders.length !== shaders.length) {
                    deleteShaders(gl2, newShaders);
                    return reportError(progOptions, "not enough shaders for program");
                  }
                  var program = gl2.createProgram();
                  realShaders.forEach(function(shader2) {
                    gl2.attachShader(program, shader2);
                  });
                  if (progOptions.attribLocations) {
                    Object.keys(progOptions.attribLocations).forEach(function(attrib) {
                      gl2.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
                    });
                  }
                  var varyings = progOptions.transformFeedbackVaryings;
                  if (varyings) {
                    if (varyings.attribs) {
                      varyings = varyings.attribs;
                    }
                    if (!Array.isArray(varyings)) {
                      varyings = Object.keys(varyings);
                    }
                    gl2.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
                  }
                  gl2.linkProgram(program);
                  if (progOptions.callback) {
                    checkForProgramLinkCompletionAsync(gl2, program, progOptions);
                    return null;
                  } else {
                    if (!checkProgramStatus(gl2, program, progOptions.errorCallback)) {
                      gl2.deleteProgram(program);
                      deleteShaders(gl2, newShaders);
                      return null;
                    }
                    return program;
                  }
                }
                function createProgramAsync(gl2, shaders) {
                  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    args[_key2 - 2] = arguments[_key2];
                  }
                  return new Promise(function(resolve, reject) {
                    var programOptions = getProgramOptions.apply(void 0, args);
                    programOptions.callback = function(err2, program) {
                      if (err2) {
                        reject(err2);
                      } else {
                        resolve(program);
                      }
                    };
                    createProgram(gl2, shaders, programOptions);
                  });
                }
                function createProgramInfoAsync(gl2, shaders) {
                  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                    args[_key3 - 2] = arguments[_key3];
                  }
                  return new Promise(function(resolve, reject) {
                    var programOptions = getProgramOptions.apply(void 0, args);
                    programOptions.callback = function(err2, programInfo) {
                      if (err2) {
                        reject(err2);
                      } else {
                        resolve(programInfo);
                      }
                    };
                    createProgramInfo(gl2, shaders, programOptions);
                  });
                }
                function checkForProgramLinkCompletionAsync(_x, _x2, _x3) {
                  return _checkForProgramLinkCompletionAsync.apply(this, arguments);
                }
                function _checkForProgramLinkCompletionAsync() {
                  _checkForProgramLinkCompletionAsync = _asyncToGenerator(/* @__PURE__ */ regeneratorRuntime.mark(function _callee(gl2, program, progOptions) {
                    var ext, checkFn, waitTime, success, err2, errFn;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            ext = gl2.getExtension("KHR_parallel_shader_compile");
                            checkFn = ext ? function(gl3, program2) {
                              return gl3.getProgramParameter(program2, ext.COMPLETION_STATUS_KHR);
                            } : function() {
                              return true;
                            };
                            waitTime = 0;
                          case 3:
                            _context.next = 5;
                            return wait(waitTime);
                          case 5:
                            waitTime = 1e3 / 60;
                          case 6:
                            if (!checkFn(gl2, program)) {
                              _context.next = 3;
                              break;
                            }
                          case 7:
                            success = checkProgramStatus(gl2, program, progOptions.errorCallback);
                            err2 = success ? void 0 : progOptions.errors.join("\n");
                            if (!success) {
                              errFn = progOptions.errorCallback || error;
                              errFn(err2);
                              gl2.deleteProgram(program);
                              program = null;
                            }
                            progOptions.callback(err2, program);
                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return _checkForProgramLinkCompletionAsync.apply(this, arguments);
                }
                function checkProgramStatus(gl2, program, errFn) {
                  errFn = errFn || error;
                  var linked = gl2.getProgramParameter(program, LINK_STATUS);
                  if (!linked) {
                    var lastError = gl2.getProgramInfoLog(program);
                    errFn("Error in program linking: ".concat(lastError));
                  }
                  return linked;
                }
                function createShaderFromScript(gl2, scriptId, opt_shaderType, progOptions) {
                  var shaderSource = "";
                  var shaderScript = getElementById(scriptId);
                  if (!shaderScript) {
                    return reportError(progOptions, "unknown script element: ".concat(scriptId));
                  }
                  shaderSource = shaderScript.text;
                  var shaderType = opt_shaderType || getShaderTypeFromScriptType(gl2, shaderScript.type);
                  if (!shaderType) {
                    return reportError(progOptions, "unknown shader type");
                  }
                  return loadShader(gl2, shaderSource, shaderType, progOptions);
                }
                function createProgramFromScripts(gl2, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
                  var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                  var shaders = [];
                  for (var ii = 0; ii < shaderScriptIds.length; ++ii) {
                    var shader = createShaderFromScript(gl2, shaderScriptIds[ii], gl2[defaultShaderType[ii]], progOptions);
                    if (!shader) {
                      return null;
                    }
                    shaders.push(shader);
                  }
                  return createProgram(gl2, shaders, progOptions);
                }
                function createProgramFromSources(gl2, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
                  var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                  var shaders = [];
                  for (var ii = 0; ii < shaderSources.length; ++ii) {
                    var shader = loadShader(gl2, shaderSources[ii], gl2[defaultShaderType[ii]], progOptions);
                    if (!progOptions.callback && !shader) {
                      return null;
                    }
                    shaders.push(shader);
                  }
                  return createProgram(gl2, shaders, progOptions);
                }
                function isBuiltIn(info) {
                  var name = info.name;
                  return name.startsWith("gl_") || name.startsWith("webgl_");
                }
                var tokenRE = /(\.|\[|]|\w+)/g;
                var isDigit = function isDigit2(s) {
                  return s >= "0" && s <= "9";
                };
                function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
                  var tokens = fullPath.split(tokenRE).filter(function(s) {
                    return s !== "";
                  });
                  var tokenNdx = 0;
                  var path = "";
                  for (; ; ) {
                    var token = tokens[tokenNdx++];
                    path += token;
                    var isArrayIndex = isDigit(token[0]);
                    var accessor = isArrayIndex ? parseInt(token) : token;
                    if (isArrayIndex) {
                      path += tokens[tokenNdx++];
                    }
                    var isLastToken = tokenNdx === tokens.length;
                    if (isLastToken) {
                      node[accessor] = setter;
                      break;
                    } else {
                      var _token = tokens[tokenNdx++];
                      var isArray = _token === "[";
                      var child = node[accessor] || (isArray ? [] : {});
                      node[accessor] = child;
                      node = child;
                      uniformSetters[path] = uniformSetters[path] || /* @__PURE__ */ (function(node2) {
                        return function(value) {
                          setUniformTree(node2, value);
                        };
                      })(child);
                      path += _token;
                    }
                  }
                }
                function createUniformSetters(gl2, program) {
                  var textureUnit = 0;
                  function createUniformSetter(program2, uniformInfo2, location3) {
                    var isArray = uniformInfo2.name.endsWith("[0]");
                    var type = uniformInfo2.type;
                    var typeInfo = typeMap[type];
                    if (!typeInfo) {
                      throw new Error("unknown type: 0x".concat(type.toString(16)));
                    }
                    var setter2;
                    if (typeInfo.bindPoint) {
                      var unit = textureUnit;
                      textureUnit += uniformInfo2.size;
                      if (isArray) {
                        setter2 = typeInfo.arraySetter(gl2, type, unit, location3, uniformInfo2.size);
                      } else {
                        setter2 = typeInfo.setter(gl2, type, unit, location3, uniformInfo2.size);
                      }
                    } else {
                      if (typeInfo.arraySetter && isArray) {
                        setter2 = typeInfo.arraySetter(gl2, location3);
                      } else {
                        setter2 = typeInfo.setter(gl2, location3);
                      }
                    }
                    setter2.location = location3;
                    return setter2;
                  }
                  var uniformSetters = {};
                  var uniformTree = {};
                  var numUniforms = gl2.getProgramParameter(program, ACTIVE_UNIFORMS);
                  for (var ii = 0; ii < numUniforms; ++ii) {
                    var uniformInfo = gl2.getActiveUniform(program, ii);
                    if (isBuiltIn(uniformInfo)) {
                      continue;
                    }
                    var name = uniformInfo.name;
                    if (name.endsWith("[0]")) {
                      name = name.substr(0, name.length - 3);
                    }
                    var location2 = gl2.getUniformLocation(program, uniformInfo.name);
                    if (location2) {
                      var setter = createUniformSetter(program, uniformInfo, location2);
                      uniformSetters[name] = setter;
                      addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
                    }
                  }
                  return uniformSetters;
                }
                function createTransformFeedbackInfo(gl2, program) {
                  var info = {};
                  var numVaryings = gl2.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
                  for (var ii = 0; ii < numVaryings; ++ii) {
                    var varying = gl2.getTransformFeedbackVarying(program, ii);
                    info[varying.name] = {
                      index: ii,
                      type: varying.type,
                      size: varying.size
                    };
                  }
                  return info;
                }
                function bindTransformFeedbackInfo(gl2, transformFeedbackInfo, bufferInfo) {
                  if (transformFeedbackInfo.transformFeedbackInfo) {
                    transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
                  }
                  if (bufferInfo.attribs) {
                    bufferInfo = bufferInfo.attribs;
                  }
                  for (var name in bufferInfo) {
                    var varying = transformFeedbackInfo[name];
                    if (varying) {
                      var buf = bufferInfo[name];
                      if (buf.offset) {
                        gl2.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
                      } else {
                        gl2.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
                      }
                    }
                  }
                }
                function createTransformFeedback(gl2, programInfo, bufferInfo) {
                  var tf = gl2.createTransformFeedback();
                  gl2.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
                  gl2.useProgram(programInfo.program);
                  bindTransformFeedbackInfo(gl2, programInfo, bufferInfo);
                  gl2.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
                  return tf;
                }
                function createUniformBlockSpecFromProgram(gl2, program) {
                  var numUniforms = gl2.getProgramParameter(program, ACTIVE_UNIFORMS);
                  var uniformData = [];
                  var uniformIndices = [];
                  for (var ii = 0; ii < numUniforms; ++ii) {
                    uniformIndices.push(ii);
                    uniformData.push({});
                    var uniformInfo = gl2.getActiveUniform(program, ii);
                    uniformData[ii].name = uniformInfo.name;
                  }
                  [
                    ["UNIFORM_TYPE", "type"],
                    ["UNIFORM_SIZE", "size"],
                    // num elements
                    ["UNIFORM_BLOCK_INDEX", "blockNdx"],
                    ["UNIFORM_OFFSET", "offset"]
                  ].forEach(function(pair) {
                    var pname = pair[0];
                    var key = pair[1];
                    gl2.getActiveUniforms(program, uniformIndices, gl2[pname]).forEach(function(value, ndx) {
                      uniformData[ndx][key] = value;
                    });
                  });
                  var blockSpecs = {};
                  var numUniformBlocks = gl2.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
                  for (var _ii = 0; _ii < numUniformBlocks; ++_ii) {
                    var name = gl2.getActiveUniformBlockName(program, _ii);
                    var blockSpec = {
                      index: gl2.getUniformBlockIndex(program, name),
                      usedByVertexShader: gl2.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
                      usedByFragmentShader: gl2.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
                      size: gl2.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_DATA_SIZE),
                      uniformIndices: gl2.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
                    };
                    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
                    blockSpecs[name] = blockSpec;
                  }
                  return {
                    blockSpecs,
                    uniformData
                  };
                }
                var arraySuffixRE = /\[\d+\]\.$/;
                var pad = function pad2(v, padding) {
                  return ((v + (padding - 1)) / padding | 0) * padding;
                };
                function createUniformBlockUniformSetter(view, isArray, rows, cols) {
                  if (isArray || rows) {
                    cols = cols || 1;
                    var numElements = view.length;
                    var totalRows = numElements / 4;
                    return function(value) {
                      var dst = 0;
                      var src = 0;
                      for (var row = 0; row < totalRows; ++row) {
                        for (var col = 0; col < cols; ++col) {
                          view[dst++] = value[src++];
                        }
                        dst += 4 - cols;
                      }
                    };
                  } else {
                    return function(value) {
                      if (value.length) {
                        view.set(value);
                      } else {
                        view[0] = value;
                      }
                    };
                  }
                }
                function createUniformBlockInfoFromProgram(gl2, program, uniformBlockSpec, blockName) {
                  var blockSpecs = uniformBlockSpec.blockSpecs;
                  var uniformData = uniformBlockSpec.uniformData;
                  var blockSpec = blockSpecs[blockName];
                  if (!blockSpec) {
                    warn("no uniform block object named:", blockName);
                    return {
                      name: blockName,
                      uniforms: {}
                    };
                  }
                  var array = new ArrayBuffer(blockSpec.size);
                  var buffer = gl2.createBuffer();
                  var uniformBufferIndex = blockSpec.index;
                  gl2.bindBuffer(UNIFORM_BUFFER, buffer);
                  gl2.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
                  var prefix = blockName + ".";
                  if (arraySuffixRE.test(prefix)) {
                    prefix = prefix.replace(arraySuffixRE, ".");
                  }
                  var uniforms = {};
                  var setters = {};
                  var setterTree = {};
                  blockSpec.uniformIndices.forEach(function(uniformNdx) {
                    var data = uniformData[uniformNdx];
                    var name = data.name;
                    if (name.startsWith(prefix)) {
                      name = name.substr(prefix.length);
                    }
                    var isArray = name.endsWith("[0]");
                    if (isArray) {
                      name = name.substr(0, name.length - 3);
                    }
                    var typeInfo = typeMap[data.type];
                    var Type = typeInfo.Type;
                    var byteLength = isArray ? pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
                    var uniformView = new Type(array, data.offset, byteLength / Type.BYTES_PER_ELEMENT);
                    uniforms[name] = uniformView;
                    var setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
                    setters[name] = setter;
                    addSetterToUniformTree(name, setter, setterTree, setters);
                  });
                  return {
                    name: blockName,
                    array,
                    asFloat: new Float32Array(array),
                    // for debugging
                    buffer,
                    uniforms,
                    setters
                  };
                }
                function createUniformBlockInfo(gl2, programInfo, blockName) {
                  return createUniformBlockInfoFromProgram(gl2, programInfo.program, programInfo.uniformBlockSpec, blockName);
                }
                function bindUniformBlock(gl2, programInfo, uniformBlockInfo) {
                  var uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
                  var blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
                  if (blockSpec) {
                    var bufferBindIndex = blockSpec.index;
                    gl2.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
                    return true;
                  }
                  return false;
                }
                function setUniformBlock(gl2, programInfo, uniformBlockInfo) {
                  if (bindUniformBlock(gl2, programInfo, uniformBlockInfo)) {
                    gl2.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
                  }
                }
                function setBlockUniforms(uniformBlockInfo, values) {
                  var setters = uniformBlockInfo.setters;
                  for (var name in values) {
                    var setter = setters[name];
                    if (setter) {
                      var value = values[name];
                      setter(value);
                    }
                  }
                }
                function setUniformTree(tree, values) {
                  for (var name in values) {
                    var prop = tree[name];
                    if (typeof prop === "function") {
                      prop(values[name]);
                    } else {
                      setUniformTree(tree[name], values[name]);
                    }
                  }
                }
                function setUniforms(setters) {
                  var actualSetters = setters.uniformSetters || setters;
                  var numArgs = arguments.length <= 1 ? 0 : arguments.length - 1;
                  for (var aNdx = 0; aNdx < numArgs; ++aNdx) {
                    var values = aNdx + 1 < 1 || arguments.length <= aNdx + 1 ? void 0 : arguments[aNdx + 1];
                    if (Array.isArray(values)) {
                      var numValues = values.length;
                      for (var ii = 0; ii < numValues; ++ii) {
                        setUniforms(actualSetters, values[ii]);
                      }
                    } else {
                      for (var name in values) {
                        var setter = actualSetters[name];
                        if (setter) {
                          setter(values[name]);
                        }
                      }
                    }
                  }
                }
                var setUniformsAndBindTextures = setUniforms;
                exports2.setUniformsAndBindTextures = setUniformsAndBindTextures;
                function createAttributeSetters(gl2, program) {
                  var attribSetters = {};
                  var numAttribs = gl2.getProgramParameter(program, ACTIVE_ATTRIBUTES);
                  for (var ii = 0; ii < numAttribs; ++ii) {
                    var attribInfo = gl2.getActiveAttrib(program, ii);
                    if (isBuiltIn(attribInfo)) {
                      continue;
                    }
                    var index = gl2.getAttribLocation(program, attribInfo.name);
                    var typeInfo = attrTypeMap[attribInfo.type];
                    var setter = typeInfo.setter(gl2, index, typeInfo);
                    setter.location = index;
                    attribSetters[attribInfo.name] = setter;
                  }
                  return attribSetters;
                }
                function setAttributes(setters, buffers) {
                  for (var name in buffers) {
                    var setter = setters[name];
                    if (setter) {
                      setter(buffers[name]);
                    }
                  }
                }
                function setBuffersAndAttributes(gl2, programInfo, buffers) {
                  if (buffers.vertexArrayObject) {
                    gl2.bindVertexArray(buffers.vertexArrayObject);
                  } else {
                    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
                    if (buffers.indices) {
                      gl2.bindBuffer(ELEMENT_ARRAY_BUFFER, buffers.indices);
                    }
                  }
                }
                function createProgramInfoFromProgram(gl2, program) {
                  var uniformSetters = createUniformSetters(gl2, program);
                  var attribSetters = createAttributeSetters(gl2, program);
                  var programInfo = {
                    program,
                    uniformSetters,
                    attribSetters
                  };
                  if (utils.isWebGL2(gl2)) {
                    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl2, program);
                    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl2, program);
                  }
                  return programInfo;
                }
                var notIdRE = /\s|{|}|;/;
                function createProgramInfo(gl2, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
                  var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                  var errors = [];
                  shaderSources = shaderSources.map(function(source) {
                    if (!notIdRE.test(source)) {
                      var script = getElementById(source);
                      if (!script) {
                        var err2 = "no element with id: ".concat(source);
                        progOptions.errorCallback(err2);
                        errors.push(err2);
                      } else {
                        source = script.text;
                      }
                    }
                    return source;
                  });
                  if (errors.length) {
                    return reportError(progOptions, "");
                  }
                  var origCallback = progOptions.callback;
                  if (origCallback) {
                    progOptions.callback = function(err2, program2) {
                      var programInfo;
                      if (!err2) {
                        programInfo = createProgramInfoFromProgram(gl2, program2);
                      }
                      origCallback(err2, programInfo);
                    };
                  }
                  var program = createProgramFromSources(gl2, shaderSources, progOptions);
                  if (!program) {
                    return null;
                  }
                  return createProgramInfoFromProgram(gl2, program);
                }
              })
            ),
            /***/
            "./src/textures.js": (
              /*!*************************!*\
                !*** ./src/textures.js ***!
                \*************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.setTextureDefaults_ = setDefaults;
                exports2.createSampler = createSampler;
                exports2.createSamplers = createSamplers;
                exports2.setSamplerParameters = setSamplerParameters;
                exports2.createTexture = createTexture;
                exports2.setEmptyTexture = setEmptyTexture;
                exports2.setTextureFromArray = setTextureFromArray;
                exports2.loadTextureFromUrl = loadTextureFromUrl;
                exports2.setTextureFromElement = setTextureFromElement;
                exports2.setTextureFilteringForSize = setTextureFilteringForSize;
                exports2.setTextureParameters = setTextureParameters;
                exports2.setDefaultTextureColor = setDefaultTextureColor;
                exports2.createTextures = createTextures;
                exports2.resizeTexture = resizeTexture;
                exports2.canGenerateMipmap = canGenerateMipmap;
                exports2.canFilter = canFilter;
                exports2.getNumComponentsForFormat = getNumComponentsForFormat;
                exports2.getBytesPerElementForInternalFormat = getBytesPerElementForInternalFormat;
                exports2.getFormatAndTypeForInternalFormat = getFormatAndTypeForInternalFormat;
                var utils = _interopRequireWildcard(__webpack_require__(
                  /*! ./utils.js */
                  "./src/utils.js"
                ));
                var typedArrays2 = _interopRequireWildcard(__webpack_require__(
                  /*! ./typedarrays.js */
                  "./src/typedarrays.js"
                ));
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var gl = void 0;
                var defaults = {
                  textureColor: new Uint8Array([128, 192, 255, 255]),
                  textureOptions: {},
                  crossOrigin: void 0
                };
                var isArrayBuffer = typedArrays2.isArrayBuffer;
                var getShared2DContext = /* @__PURE__ */ (function() {
                  var s_ctx;
                  return function getShared2DContext2() {
                    s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
                    return s_ctx;
                  };
                })();
                var ALPHA = 6406;
                var RGB = 6407;
                var RGBA = 6408;
                var LUMINANCE = 6409;
                var LUMINANCE_ALPHA = 6410;
                var DEPTH_COMPONENT = 6402;
                var DEPTH_STENCIL = 34041;
                var CLAMP_TO_EDGE = 33071;
                var NEAREST = 9728;
                var LINEAR = 9729;
                var TEXTURE_2D = 3553;
                var TEXTURE_CUBE_MAP = 34067;
                var TEXTURE_3D = 32879;
                var TEXTURE_2D_ARRAY = 35866;
                var TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
                var TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
                var TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
                var TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
                var TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
                var TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
                var TEXTURE_MIN_FILTER = 10241;
                var TEXTURE_MAG_FILTER = 10240;
                var TEXTURE_WRAP_S = 10242;
                var TEXTURE_WRAP_T = 10243;
                var TEXTURE_WRAP_R = 32882;
                var TEXTURE_MIN_LOD = 33082;
                var TEXTURE_MAX_LOD = 33083;
                var TEXTURE_BASE_LEVEL = 33084;
                var TEXTURE_MAX_LEVEL = 33085;
                var UNPACK_ALIGNMENT = 3317;
                var UNPACK_ROW_LENGTH = 3314;
                var UNPACK_IMAGE_HEIGHT = 32878;
                var UNPACK_SKIP_PIXELS = 3316;
                var UNPACK_SKIP_ROWS = 3315;
                var UNPACK_SKIP_IMAGES = 32877;
                var UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
                var UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
                var UNPACK_FLIP_Y_WEBGL = 37440;
                var R8 = 33321;
                var R8_SNORM = 36756;
                var R16F = 33325;
                var R32F = 33326;
                var R8UI = 33330;
                var R8I = 33329;
                var RG16UI = 33338;
                var RG16I = 33337;
                var RG32UI = 33340;
                var RG32I = 33339;
                var RG8 = 33323;
                var RG8_SNORM = 36757;
                var RG16F = 33327;
                var RG32F = 33328;
                var RG8UI = 33336;
                var RG8I = 33335;
                var R16UI = 33332;
                var R16I = 33331;
                var R32UI = 33334;
                var R32I = 33333;
                var RGB8 = 32849;
                var SRGB8 = 35905;
                var RGB565 = 36194;
                var RGB8_SNORM = 36758;
                var R11F_G11F_B10F = 35898;
                var RGB9_E5 = 35901;
                var RGB16F = 34843;
                var RGB32F = 34837;
                var RGB8UI = 36221;
                var RGB8I = 36239;
                var RGB16UI = 36215;
                var RGB16I = 36233;
                var RGB32UI = 36209;
                var RGB32I = 36227;
                var RGBA8 = 32856;
                var SRGB8_ALPHA8 = 35907;
                var RGBA8_SNORM = 36759;
                var RGB5_A1 = 32855;
                var RGBA4 = 32854;
                var RGB10_A2 = 32857;
                var RGBA16F = 34842;
                var RGBA32F = 34836;
                var RGBA8UI = 36220;
                var RGBA8I = 36238;
                var RGB10_A2UI = 36975;
                var RGBA16UI = 36214;
                var RGBA16I = 36232;
                var RGBA32I = 36226;
                var RGBA32UI = 36208;
                var DEPTH_COMPONENT16 = 33189;
                var DEPTH_COMPONENT24 = 33190;
                var DEPTH_COMPONENT32F = 36012;
                var DEPTH32F_STENCIL8 = 36013;
                var DEPTH24_STENCIL8 = 35056;
                var BYTE = 5120;
                var UNSIGNED_BYTE = 5121;
                var SHORT = 5122;
                var UNSIGNED_SHORT = 5123;
                var INT = 5124;
                var UNSIGNED_INT = 5125;
                var FLOAT = 5126;
                var UNSIGNED_SHORT_4_4_4_4 = 32819;
                var UNSIGNED_SHORT_5_5_5_1 = 32820;
                var UNSIGNED_SHORT_5_6_5 = 33635;
                var HALF_FLOAT = 5131;
                var HALF_FLOAT_OES = 36193;
                var UNSIGNED_INT_2_10_10_10_REV = 33640;
                var UNSIGNED_INT_10F_11F_11F_REV = 35899;
                var UNSIGNED_INT_5_9_9_9_REV = 35902;
                var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
                var UNSIGNED_INT_24_8 = 34042;
                var RG = 33319;
                var RG_INTEGER = 33320;
                var RED = 6403;
                var RED_INTEGER = 36244;
                var RGB_INTEGER = 36248;
                var RGBA_INTEGER = 36249;
                var formatInfo = {};
                {
                  var f = formatInfo;
                  f[ALPHA] = {
                    numColorComponents: 1
                  };
                  f[LUMINANCE] = {
                    numColorComponents: 1
                  };
                  f[LUMINANCE_ALPHA] = {
                    numColorComponents: 2
                  };
                  f[RGB] = {
                    numColorComponents: 3
                  };
                  f[RGBA] = {
                    numColorComponents: 4
                  };
                  f[RED] = {
                    numColorComponents: 1
                  };
                  f[RED_INTEGER] = {
                    numColorComponents: 1
                  };
                  f[RG] = {
                    numColorComponents: 2
                  };
                  f[RG_INTEGER] = {
                    numColorComponents: 2
                  };
                  f[RGB] = {
                    numColorComponents: 3
                  };
                  f[RGB_INTEGER] = {
                    numColorComponents: 3
                  };
                  f[RGBA] = {
                    numColorComponents: 4
                  };
                  f[RGBA_INTEGER] = {
                    numColorComponents: 4
                  };
                  f[DEPTH_COMPONENT] = {
                    numColorComponents: 1
                  };
                  f[DEPTH_STENCIL] = {
                    numColorComponents: 2
                  };
                }
                var s_textureInternalFormatInfo;
                function getTextureInternalFormatInfo(internalFormat) {
                  if (!s_textureInternalFormatInfo) {
                    var t = {};
                    t[ALPHA] = {
                      textureFormat: ALPHA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [1, 2, 2, 4],
                      type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                    };
                    t[LUMINANCE] = {
                      textureFormat: LUMINANCE,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [1, 2, 2, 4],
                      type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                    };
                    t[LUMINANCE_ALPHA] = {
                      textureFormat: LUMINANCE_ALPHA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [2, 4, 4, 8],
                      type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                    };
                    t[RGB] = {
                      textureFormat: RGB,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [3, 6, 6, 12, 2],
                      type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_5_6_5]
                    };
                    t[RGBA] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4, 8, 8, 16, 2, 2],
                      type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1]
                    };
                    t[DEPTH_COMPONENT] = {
                      textureFormat: DEPTH_COMPONENT,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2, 4],
                      type: [UNSIGNED_INT, UNSIGNED_SHORT]
                    };
                    t[R8] = {
                      textureFormat: RED,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [1],
                      type: [UNSIGNED_BYTE]
                    };
                    t[R8_SNORM] = {
                      textureFormat: RED,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [1],
                      type: [BYTE]
                    };
                    t[R16F] = {
                      textureFormat: RED,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [4, 2],
                      type: [FLOAT, HALF_FLOAT]
                    };
                    t[R32F] = {
                      textureFormat: RED,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [FLOAT]
                    };
                    t[R8UI] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [1],
                      type: [UNSIGNED_BYTE]
                    };
                    t[R8I] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [1],
                      type: [BYTE]
                    };
                    t[R16UI] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2],
                      type: [UNSIGNED_SHORT]
                    };
                    t[R16I] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2],
                      type: [SHORT]
                    };
                    t[R32UI] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_INT]
                    };
                    t[R32I] = {
                      textureFormat: RED_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [INT]
                    };
                    t[RG8] = {
                      textureFormat: RG,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [2],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RG8_SNORM] = {
                      textureFormat: RG,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [2],
                      type: [BYTE]
                    };
                    t[RG16F] = {
                      textureFormat: RG,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [8, 4],
                      type: [FLOAT, HALF_FLOAT]
                    };
                    t[RG32F] = {
                      textureFormat: RG,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [8],
                      type: [FLOAT]
                    };
                    t[RG8UI] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RG8I] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2],
                      type: [BYTE]
                    };
                    t[RG16UI] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_SHORT]
                    };
                    t[RG16I] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [SHORT]
                    };
                    t[RG32UI] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [8],
                      type: [UNSIGNED_INT]
                    };
                    t[RG32I] = {
                      textureFormat: RG_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [8],
                      type: [INT]
                    };
                    t[RGB8] = {
                      textureFormat: RGB,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [3],
                      type: [UNSIGNED_BYTE]
                    };
                    t[SRGB8] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [3],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RGB565] = {
                      textureFormat: RGB,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [3, 2],
                      type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_6_5]
                    };
                    t[RGB8_SNORM] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [3],
                      type: [BYTE]
                    };
                    t[R11F_G11F_B10F] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [12, 6, 4],
                      type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_10F_11F_11F_REV]
                    };
                    t[RGB9_E5] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [12, 6, 4],
                      type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_5_9_9_9_REV]
                    };
                    t[RGB16F] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [12, 6],
                      type: [FLOAT, HALF_FLOAT]
                    };
                    t[RGB32F] = {
                      textureFormat: RGB,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [12],
                      type: [FLOAT]
                    };
                    t[RGB8UI] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [3],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RGB8I] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [3],
                      type: [BYTE]
                    };
                    t[RGB16UI] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [6],
                      type: [UNSIGNED_SHORT]
                    };
                    t[RGB16I] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [6],
                      type: [SHORT]
                    };
                    t[RGB32UI] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [12],
                      type: [UNSIGNED_INT]
                    };
                    t[RGB32I] = {
                      textureFormat: RGB_INTEGER,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [12],
                      type: [INT]
                    };
                    t[RGBA8] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4],
                      type: [UNSIGNED_BYTE]
                    };
                    t[SRGB8_ALPHA8] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RGBA8_SNORM] = {
                      textureFormat: RGBA,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [4],
                      type: [BYTE]
                    };
                    t[RGB5_A1] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4, 2, 4],
                      type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_INT_2_10_10_10_REV]
                    };
                    t[RGBA4] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4, 2],
                      type: [UNSIGNED_BYTE, UNSIGNED_SHORT_4_4_4_4]
                    };
                    t[RGB10_A2] = {
                      textureFormat: RGBA,
                      colorRenderable: true,
                      textureFilterable: true,
                      bytesPerElement: [4],
                      type: [UNSIGNED_INT_2_10_10_10_REV]
                    };
                    t[RGBA16F] = {
                      textureFormat: RGBA,
                      colorRenderable: false,
                      textureFilterable: true,
                      bytesPerElement: [16, 8],
                      type: [FLOAT, HALF_FLOAT]
                    };
                    t[RGBA32F] = {
                      textureFormat: RGBA,
                      colorRenderable: false,
                      textureFilterable: false,
                      bytesPerElement: [16],
                      type: [FLOAT]
                    };
                    t[RGBA8UI] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_BYTE]
                    };
                    t[RGBA8I] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [BYTE]
                    };
                    t[RGB10_A2UI] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_INT_2_10_10_10_REV]
                    };
                    t[RGBA16UI] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [8],
                      type: [UNSIGNED_SHORT]
                    };
                    t[RGBA16I] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [8],
                      type: [SHORT]
                    };
                    t[RGBA32I] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [16],
                      type: [INT]
                    };
                    t[RGBA32UI] = {
                      textureFormat: RGBA_INTEGER,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [16],
                      type: [UNSIGNED_INT]
                    };
                    t[DEPTH_COMPONENT16] = {
                      textureFormat: DEPTH_COMPONENT,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [2, 4],
                      type: [UNSIGNED_SHORT, UNSIGNED_INT]
                    };
                    t[DEPTH_COMPONENT24] = {
                      textureFormat: DEPTH_COMPONENT,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_INT]
                    };
                    t[DEPTH_COMPONENT32F] = {
                      textureFormat: DEPTH_COMPONENT,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [FLOAT]
                    };
                    t[DEPTH24_STENCIL8] = {
                      textureFormat: DEPTH_STENCIL,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [UNSIGNED_INT_24_8]
                    };
                    t[DEPTH32F_STENCIL8] = {
                      textureFormat: DEPTH_STENCIL,
                      colorRenderable: true,
                      textureFilterable: false,
                      bytesPerElement: [4],
                      type: [FLOAT_32_UNSIGNED_INT_24_8_REV]
                    };
                    Object.keys(t).forEach(function(internalFormat2) {
                      var info = t[internalFormat2];
                      info.bytesPerElementMap = {};
                      info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                        var type = info.type[ndx];
                        info.bytesPerElementMap[type] = bytesPerElement;
                      });
                    });
                    s_textureInternalFormatInfo = t;
                  }
                  return s_textureInternalFormatInfo[internalFormat];
                }
                function getBytesPerElementForInternalFormat(internalFormat, type) {
                  var info = getTextureInternalFormatInfo(internalFormat);
                  if (!info) {
                    throw "unknown internal format";
                  }
                  var bytesPerElement = info.bytesPerElementMap[type];
                  if (bytesPerElement === void 0) {
                    throw "unknown internal format";
                  }
                  return bytesPerElement;
                }
                function getFormatAndTypeForInternalFormat(internalFormat) {
                  var info = getTextureInternalFormatInfo(internalFormat);
                  if (!info) {
                    throw "unknown internal format";
                  }
                  return {
                    format: info.textureFormat,
                    type: info.type[0]
                  };
                }
                function isPowerOf2(value) {
                  return (value & value - 1) === 0;
                }
                function canGenerateMipmap(gl2, width, height, internalFormat) {
                  if (!utils.isWebGL2(gl2)) {
                    return isPowerOf2(width) && isPowerOf2(height);
                  }
                  var info = getTextureInternalFormatInfo(internalFormat);
                  if (!info) {
                    throw "unknown internal format";
                  }
                  return info.colorRenderable && info.textureFilterable;
                }
                function canFilter(internalFormat) {
                  var info = getTextureInternalFormatInfo(internalFormat);
                  if (!info) {
                    throw "unknown internal format";
                  }
                  return info.textureFilterable;
                }
                function getNumComponentsForFormat(format) {
                  var info = formatInfo[format];
                  if (!info) {
                    throw "unknown format: " + format;
                  }
                  return info.numColorComponents;
                }
                function getTextureTypeForArrayType(gl2, src, defaultType) {
                  if (isArrayBuffer(src)) {
                    return typedArrays2.getGLTypeForTypedArray(src);
                  }
                  return defaultType || UNSIGNED_BYTE;
                }
                function guessDimensions(gl2, target, width, height, numElements) {
                  if (numElements % 1 !== 0) {
                    throw "can't guess dimensions";
                  }
                  if (!width && !height) {
                    var size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
                    if (size % 1 === 0) {
                      width = size;
                      height = size;
                    } else {
                      width = numElements;
                      height = 1;
                    }
                  } else if (!height) {
                    height = numElements / width;
                    if (height % 1) {
                      throw "can't guess dimensions";
                    }
                  } else if (!width) {
                    width = numElements / height;
                    if (width % 1) {
                      throw "can't guess dimensions";
                    }
                  }
                  return {
                    width,
                    height
                  };
                }
                function setDefaultTextureColor(color) {
                  defaults.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
                }
                function setDefaults(newDefaults) {
                  helper.copyExistingProperties(newDefaults, defaults);
                  if (newDefaults.textureColor) {
                    setDefaultTextureColor(newDefaults.textureColor);
                  }
                }
                function setPackState(gl2, options) {
                  if (options.colorspaceConversion !== void 0) {
                    gl2.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
                  }
                  if (options.premultiplyAlpha !== void 0) {
                    gl2.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
                  }
                  if (options.flipY !== void 0) {
                    gl2.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
                  }
                }
                function setSkipStateToDefault(gl2) {
                  gl2.pixelStorei(UNPACK_ALIGNMENT, 4);
                  if (utils.isWebGL2(gl2)) {
                    gl2.pixelStorei(UNPACK_ROW_LENGTH, 0);
                    gl2.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
                    gl2.pixelStorei(UNPACK_SKIP_PIXELS, 0);
                    gl2.pixelStorei(UNPACK_SKIP_ROWS, 0);
                    gl2.pixelStorei(UNPACK_SKIP_IMAGES, 0);
                  }
                }
                function setTextureSamplerParameters(gl2, target, parameteriFn, options) {
                  if (options.minMag) {
                    parameteriFn.call(gl2, target, TEXTURE_MIN_FILTER, options.minMag);
                    parameteriFn.call(gl2, target, TEXTURE_MAG_FILTER, options.minMag);
                  }
                  if (options.min) {
                    parameteriFn.call(gl2, target, TEXTURE_MIN_FILTER, options.min);
                  }
                  if (options.mag) {
                    parameteriFn.call(gl2, target, TEXTURE_MAG_FILTER, options.mag);
                  }
                  if (options.wrap) {
                    parameteriFn.call(gl2, target, TEXTURE_WRAP_S, options.wrap);
                    parameteriFn.call(gl2, target, TEXTURE_WRAP_T, options.wrap);
                    if (target === TEXTURE_3D || helper.isSampler(gl2, target)) {
                      parameteriFn.call(gl2, target, TEXTURE_WRAP_R, options.wrap);
                    }
                  }
                  if (options.wrapR) {
                    parameteriFn.call(gl2, target, TEXTURE_WRAP_R, options.wrapR);
                  }
                  if (options.wrapS) {
                    parameteriFn.call(gl2, target, TEXTURE_WRAP_S, options.wrapS);
                  }
                  if (options.wrapT) {
                    parameteriFn.call(gl2, target, TEXTURE_WRAP_T, options.wrapT);
                  }
                  if (options.minLod) {
                    parameteriFn.call(gl2, target, TEXTURE_MIN_LOD, options.minLod);
                  }
                  if (options.maxLod) {
                    parameteriFn.call(gl2, target, TEXTURE_MAX_LOD, options.maxLod);
                  }
                  if (options.baseLevel) {
                    parameteriFn.call(gl2, target, TEXTURE_BASE_LEVEL, options.baseLevel);
                  }
                  if (options.maxLevel) {
                    parameteriFn.call(gl2, target, TEXTURE_MAX_LEVEL, options.maxLevel);
                  }
                }
                function setTextureParameters(gl2, tex, options) {
                  var target = options.target || TEXTURE_2D;
                  gl2.bindTexture(target, tex);
                  setTextureSamplerParameters(gl2, target, gl2.texParameteri, options);
                }
                function setSamplerParameters(gl2, sampler, options) {
                  setTextureSamplerParameters(gl2, sampler, gl2.samplerParameteri, options);
                }
                function createSampler(gl2, options) {
                  var sampler = gl2.createSampler();
                  setSamplerParameters(gl2, sampler, options);
                  return sampler;
                }
                function createSamplers(gl2, samplerOptions) {
                  var samplers = {};
                  Object.keys(samplerOptions).forEach(function(name) {
                    samplers[name] = createSampler(gl2, samplerOptions[name]);
                  });
                  return samplers;
                }
                function make1Pixel(color) {
                  color = color || defaults.textureColor;
                  if (isArrayBuffer(color)) {
                    return color;
                  }
                  return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
                }
                function setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat) {
                  options = options || defaults.textureOptions;
                  internalFormat = internalFormat || RGBA;
                  var target = options.target || TEXTURE_2D;
                  width = width || options.width;
                  height = height || options.height;
                  gl2.bindTexture(target, tex);
                  if (canGenerateMipmap(gl2, width, height, internalFormat)) {
                    gl2.generateMipmap(target);
                  } else {
                    var filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
                    gl2.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
                    gl2.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
                    gl2.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
                    gl2.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
                  }
                }
                function shouldAutomaticallySetTextureFilteringForSize(options) {
                  return options.auto === true || options.auto === void 0 && options.level === void 0;
                }
                function getCubeFaceOrder(gl2, options) {
                  options = options || {};
                  return options.cubeFaceOrder || [TEXTURE_CUBE_MAP_POSITIVE_X, TEXTURE_CUBE_MAP_NEGATIVE_X, TEXTURE_CUBE_MAP_POSITIVE_Y, TEXTURE_CUBE_MAP_NEGATIVE_Y, TEXTURE_CUBE_MAP_POSITIVE_Z, TEXTURE_CUBE_MAP_NEGATIVE_Z];
                }
                function getCubeFacesWithNdx(gl2, options) {
                  var faces = getCubeFaceOrder(gl2, options);
                  var facesWithNdx = faces.map(function(face, ndx) {
                    return {
                      face,
                      ndx
                    };
                  });
                  facesWithNdx.sort(function(a, b) {
                    return a.face - b.face;
                  });
                  return facesWithNdx;
                }
                function setTextureFromElement(gl2, tex, element, options) {
                  options = options || defaults.textureOptions;
                  var target = options.target || TEXTURE_2D;
                  var level = options.level || 0;
                  var width = element.width;
                  var height = element.height;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type = options.type || formatType.type;
                  setPackState(gl2, options);
                  gl2.bindTexture(target, tex);
                  if (target === TEXTURE_CUBE_MAP) {
                    var imgWidth = element.width;
                    var imgHeight = element.height;
                    var size;
                    var slices;
                    if (imgWidth / 6 === imgHeight) {
                      size = imgHeight;
                      slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
                    } else if (imgHeight / 6 === imgWidth) {
                      size = imgWidth;
                      slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
                    } else if (imgWidth / 3 === imgHeight / 2) {
                      size = imgWidth / 3;
                      slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
                    } else if (imgWidth / 2 === imgHeight / 3) {
                      size = imgWidth / 2;
                      slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
                    } else {
                      throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
                    }
                    var ctx = getShared2DContext();
                    if (ctx) {
                      ctx.canvas.width = size;
                      ctx.canvas.height = size;
                      width = size;
                      height = size;
                      getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                        var xOffset = slices[f2.ndx * 2 + 0] * size;
                        var yOffset = slices[f2.ndx * 2 + 1] * size;
                        ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                        gl2.texImage2D(f2.face, level, internalFormat, format, type, ctx.canvas);
                      });
                      ctx.canvas.width = 1;
                      ctx.canvas.height = 1;
                    } else if (typeof createImageBitmap !== "undefined") {
                      width = size;
                      height = size;
                      getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                        var xOffset = slices[f2.ndx * 2 + 0] * size;
                        var yOffset = slices[f2.ndx * 2 + 1] * size;
                        gl2.texImage2D(f2.face, level, internalFormat, size, size, 0, format, type, null);
                        createImageBitmap(element, xOffset, yOffset, size, size, {
                          premultiplyAlpha: "none",
                          colorSpaceConversion: "none"
                        }).then(function(imageBitmap) {
                          setPackState(gl2, options);
                          gl2.bindTexture(target, tex);
                          gl2.texImage2D(f2.face, level, internalFormat, format, type, imageBitmap);
                          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                            setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat);
                          }
                        });
                      });
                    }
                  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    var smallest = Math.min(element.width, element.height);
                    var largest = Math.max(element.width, element.height);
                    var depth = largest / smallest;
                    if (depth % 1 !== 0) {
                      throw "can not compute 3D dimensions of element";
                    }
                    var xMult = element.width === largest ? 1 : 0;
                    var yMult = element.height === largest ? 1 : 0;
                    gl2.pixelStorei(UNPACK_ALIGNMENT, 1);
                    gl2.pixelStorei(UNPACK_ROW_LENGTH, element.width);
                    gl2.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
                    gl2.pixelStorei(UNPACK_SKIP_IMAGES, 0);
                    gl2.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
                    for (var d = 0; d < depth; ++d) {
                      var srcX = d * smallest * xMult;
                      var srcY = d * smallest * yMult;
                      gl2.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
                      gl2.pixelStorei(UNPACK_SKIP_ROWS, srcY);
                      gl2.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
                    }
                    setSkipStateToDefault(gl2);
                  } else {
                    gl2.texImage2D(target, level, internalFormat, format, type, element);
                  }
                  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                    setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat);
                  }
                  setTextureParameters(gl2, tex, options);
                }
                function noop() {
                }
                function urlIsSameOrigin(url) {
                  if (typeof document !== "undefined") {
                    var a = document.createElement("a");
                    a.href = url;
                    return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
                  } else {
                    var localOrigin = new URL(location.href).origin;
                    var urlOrigin = new URL(url, location.href).origin;
                    return urlOrigin === localOrigin;
                  }
                }
                function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
                  return crossOrigin === void 0 && !urlIsSameOrigin(url) ? "anonymous" : crossOrigin;
                }
                function loadImage(url, crossOrigin, callback) {
                  callback = callback || noop;
                  var img;
                  crossOrigin = crossOrigin !== void 0 ? crossOrigin : defaults.crossOrigin;
                  crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
                  if (typeof Image !== "undefined") {
                    img = new Image();
                    if (crossOrigin !== void 0) {
                      img.crossOrigin = crossOrigin;
                    }
                    var clearEventHandlers = function clearEventHandlers2() {
                      img.removeEventListener("error", onError);
                      img.removeEventListener("load", onLoad);
                      img = null;
                    };
                    var onError = function onError2() {
                      var msg = "couldn't load image: " + url;
                      helper.error(msg);
                      callback(msg, img);
                      clearEventHandlers();
                    };
                    var onLoad = function onLoad2() {
                      callback(null, img);
                      clearEventHandlers();
                    };
                    img.addEventListener("error", onError);
                    img.addEventListener("load", onLoad);
                    img.src = url;
                    return img;
                  } else if (typeof ImageBitmap !== "undefined") {
                    var err2;
                    var bm;
                    var cb = function cb2() {
                      callback(err2, bm);
                    };
                    var options = {};
                    if (crossOrigin) {
                      options.mode = "cors";
                    }
                    fetch(url, options).then(function(response) {
                      if (!response.ok) {
                        throw response;
                      }
                      return response.blob();
                    }).then(function(blob) {
                      return createImageBitmap(blob, {
                        premultiplyAlpha: "none",
                        colorSpaceConversion: "none"
                      });
                    }).then(function(bitmap) {
                      bm = bitmap;
                      setTimeout(cb);
                    })["catch"](function(e) {
                      err2 = e;
                      setTimeout(cb);
                    });
                    img = null;
                  }
                  return img;
                }
                function isTexImageSource(obj) {
                  return typeof ImageBitmap !== "undefined" && obj instanceof ImageBitmap || typeof ImageData !== "undefined" && obj instanceof ImageData || typeof HTMLElement !== "undefined" && obj instanceof HTMLElement;
                }
                function loadAndUseImage(obj, crossOrigin, callback) {
                  if (isTexImageSource(obj)) {
                    setTimeout(function() {
                      callback(null, obj);
                    });
                    return obj;
                  }
                  return loadImage(obj, crossOrigin, callback);
                }
                function setTextureTo1PixelColor(gl2, tex, options) {
                  options = options || defaults.textureOptions;
                  var target = options.target || TEXTURE_2D;
                  gl2.bindTexture(target, tex);
                  if (options.color === false) {
                    return;
                  }
                  var color = make1Pixel(options.color);
                  if (target === TEXTURE_CUBE_MAP) {
                    for (var ii = 0; ii < 6; ++ii) {
                      gl2.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
                    }
                  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    gl2.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
                  } else {
                    gl2.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
                  }
                }
                function loadTextureFromUrl(gl2, tex, options, callback) {
                  callback = callback || noop;
                  options = options || defaults.textureOptions;
                  setTextureTo1PixelColor(gl2, tex, options);
                  options = Object.assign({}, options);
                  var img = loadAndUseImage(options.src, options.crossOrigin, function(err2, img2) {
                    if (err2) {
                      callback(err2, tex, img2);
                    } else {
                      setTextureFromElement(gl2, tex, img2, options);
                      callback(null, tex, img2);
                    }
                  });
                  return img;
                }
                function loadCubemapFromUrls(gl2, tex, options, callback) {
                  callback = callback || noop;
                  var urls = options.src;
                  if (urls.length !== 6) {
                    throw "there must be 6 urls for a cubemap";
                  }
                  var level = options.level || 0;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type = options.type || UNSIGNED_BYTE;
                  var target = options.target || TEXTURE_2D;
                  if (target !== TEXTURE_CUBE_MAP) {
                    throw "target must be TEXTURE_CUBE_MAP";
                  }
                  setTextureTo1PixelColor(gl2, tex, options);
                  options = Object.assign({}, options);
                  var numToLoad = 6;
                  var errors = [];
                  var faces = getCubeFaceOrder(gl2, options);
                  var imgs;
                  function uploadImg(faceTarget) {
                    return function(err2, img) {
                      --numToLoad;
                      if (err2) {
                        errors.push(err2);
                      } else {
                        if (img.width !== img.height) {
                          errors.push("cubemap face img is not a square: " + img.src);
                        } else {
                          setPackState(gl2, options);
                          gl2.bindTexture(target, tex);
                          if (numToLoad === 5) {
                            getCubeFaceOrder(gl2).forEach(function(otherTarget) {
                              gl2.texImage2D(otherTarget, level, internalFormat, format, type, img);
                            });
                          } else {
                            gl2.texImage2D(faceTarget, level, internalFormat, format, type, img);
                          }
                          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                            gl2.generateMipmap(target);
                          }
                        }
                      }
                      if (numToLoad === 0) {
                        callback(errors.length ? errors : void 0, tex, imgs);
                      }
                    };
                  }
                  imgs = urls.map(function(url, ndx) {
                    return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
                  });
                }
                function loadSlicesFromUrls(gl2, tex, options, callback) {
                  callback = callback || noop;
                  var urls = options.src;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type = options.type || UNSIGNED_BYTE;
                  var target = options.target || TEXTURE_2D_ARRAY;
                  if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) {
                    throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
                  }
                  setTextureTo1PixelColor(gl2, tex, options);
                  options = Object.assign({}, options);
                  var numToLoad = urls.length;
                  var errors = [];
                  var imgs;
                  var level = options.level || 0;
                  var width = options.width;
                  var height = options.height;
                  var depth = urls.length;
                  var firstImage = true;
                  function uploadImg(slice) {
                    return function(err2, img) {
                      --numToLoad;
                      if (err2) {
                        errors.push(err2);
                      } else {
                        setPackState(gl2, options);
                        gl2.bindTexture(target, tex);
                        if (firstImage) {
                          firstImage = false;
                          width = options.width || img.width;
                          height = options.height || img.height;
                          gl2.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                          for (var s = 0; s < depth; ++s) {
                            gl2.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                          }
                        } else {
                          var src = img;
                          var ctx;
                          if (img.width !== width || img.height !== height) {
                            ctx = getShared2DContext();
                            src = ctx.canvas;
                            ctx.canvas.width = width;
                            ctx.canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                          }
                          gl2.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                          if (ctx && src === ctx.canvas) {
                            ctx.canvas.width = 0;
                            ctx.canvas.height = 0;
                          }
                        }
                        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                          gl2.generateMipmap(target);
                        }
                      }
                      if (numToLoad === 0) {
                        callback(errors.length ? errors : void 0, tex, imgs);
                      }
                    };
                  }
                  imgs = urls.map(function(url, ndx) {
                    return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
                  });
                }
                function setTextureFromArray(gl2, tex, src, options) {
                  options = options || defaults.textureOptions;
                  var target = options.target || TEXTURE_2D;
                  gl2.bindTexture(target, tex);
                  var width = options.width;
                  var height = options.height;
                  var depth = options.depth;
                  var level = options.level || 0;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type = options.type || getTextureTypeForArrayType(gl2, src, formatType.type);
                  if (!isArrayBuffer(src)) {
                    var Type = typedArrays2.getTypedArrayTypeForGLType(type);
                    src = new Type(src);
                  } else if (src instanceof Uint8ClampedArray) {
                    src = new Uint8Array(src.buffer);
                  }
                  var bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
                  var numElements = src.byteLength / bytesPerElement;
                  if (numElements % 1) {
                    throw "length wrong size for format: " + utils.glEnumToString(gl2, format);
                  }
                  var dimensions;
                  if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    if (!width && !height && !depth) {
                      var size = Math.cbrt(numElements);
                      if (size % 1 !== 0) {
                        throw "can't guess cube size of array of numElements: " + numElements;
                      }
                      width = size;
                      height = size;
                      depth = size;
                    } else if (width && (!height || !depth)) {
                      dimensions = guessDimensions(gl2, target, height, depth, numElements / width);
                      height = dimensions.width;
                      depth = dimensions.height;
                    } else if (height && (!width || !depth)) {
                      dimensions = guessDimensions(gl2, target, width, depth, numElements / height);
                      width = dimensions.width;
                      depth = dimensions.height;
                    } else {
                      dimensions = guessDimensions(gl2, target, width, height, numElements / depth);
                      width = dimensions.width;
                      height = dimensions.height;
                    }
                  } else {
                    dimensions = guessDimensions(gl2, target, width, height, numElements);
                    width = dimensions.width;
                    height = dimensions.height;
                  }
                  setSkipStateToDefault(gl2);
                  gl2.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
                  setPackState(gl2, options);
                  if (target === TEXTURE_CUBE_MAP) {
                    var elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
                    var faceSize = numElements / 6 * elementsPerElement;
                    getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                      var offset = faceSize * f2.ndx;
                      var data = src.subarray(offset, offset + faceSize);
                      gl2.texImage2D(f2.face, level, internalFormat, width, height, 0, format, type, data);
                    });
                  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    gl2.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
                  } else {
                    gl2.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
                  }
                  return {
                    width,
                    height,
                    depth,
                    type
                  };
                }
                function setEmptyTexture(gl2, tex, options) {
                  var target = options.target || TEXTURE_2D;
                  gl2.bindTexture(target, tex);
                  var level = options.level || 0;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type = options.type || formatType.type;
                  setPackState(gl2, options);
                  if (target === TEXTURE_CUBE_MAP) {
                    for (var ii = 0; ii < 6; ++ii) {
                      gl2.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
                    }
                  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    gl2.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
                  } else {
                    gl2.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
                  }
                }
                function createTexture(gl2, options, callback) {
                  callback = callback || noop;
                  options = options || defaults.textureOptions;
                  var tex = gl2.createTexture();
                  var target = options.target || TEXTURE_2D;
                  var width = options.width || 1;
                  var height = options.height || 1;
                  var internalFormat = options.internalFormat || RGBA;
                  gl2.bindTexture(target, tex);
                  if (target === TEXTURE_CUBE_MAP) {
                    gl2.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
                    gl2.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
                  }
                  var src = options.src;
                  if (src) {
                    if (typeof src === "function") {
                      src = src(gl2, options);
                    }
                    if (typeof src === "string") {
                      loadTextureFromUrl(gl2, tex, options, callback);
                    } else if (isArrayBuffer(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer(src[0]))) {
                      var dimensions = setTextureFromArray(gl2, tex, src, options);
                      width = dimensions.width;
                      height = dimensions.height;
                    } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
                      if (target === TEXTURE_CUBE_MAP) {
                        loadCubemapFromUrls(gl2, tex, options, callback);
                      } else {
                        loadSlicesFromUrls(gl2, tex, options, callback);
                      }
                    } else {
                      setTextureFromElement(gl2, tex, src, options);
                      width = src.width;
                      height = src.height;
                    }
                  } else {
                    setEmptyTexture(gl2, tex, options);
                  }
                  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                    setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat);
                  }
                  setTextureParameters(gl2, tex, options);
                  return tex;
                }
                function resizeTexture(gl2, tex, options, width, height, depth) {
                  width = width || options.width;
                  height = height || options.height;
                  depth = depth || options.depth;
                  var target = options.target || TEXTURE_2D;
                  gl2.bindTexture(target, tex);
                  var level = options.level || 0;
                  var internalFormat = options.internalFormat || options.format || RGBA;
                  var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                  var format = options.format || formatType.format;
                  var type;
                  var src = options.src;
                  if (!src) {
                    type = options.type || formatType.type;
                  } else if (isArrayBuffer(src) || Array.isArray(src) && typeof src[0] === "number") {
                    type = options.type || getTextureTypeForArrayType(gl2, src, formatType.type);
                  } else {
                    type = options.type || formatType.type;
                  }
                  if (target === TEXTURE_CUBE_MAP) {
                    for (var ii = 0; ii < 6; ++ii) {
                      gl2.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
                    }
                  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
                    gl2.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                  } else {
                    gl2.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                  }
                }
                function isAsyncSrc(src) {
                  return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
                }
                function createTextures(gl2, textureOptions, callback) {
                  callback = callback || noop;
                  var numDownloading = 0;
                  var errors = [];
                  var textures = {};
                  var images = {};
                  function callCallbackIfReady() {
                    if (numDownloading === 0) {
                      setTimeout(function() {
                        callback(errors.length ? errors : void 0, textures, images);
                      }, 0);
                    }
                  }
                  Object.keys(textureOptions).forEach(function(name) {
                    var options = textureOptions[name];
                    var onLoadFn;
                    if (isAsyncSrc(options.src)) {
                      onLoadFn = function onLoadFn2(err2, tex, img) {
                        images[name] = img;
                        --numDownloading;
                        if (err2) {
                          errors.push(err2);
                        }
                        callCallbackIfReady();
                      };
                      ++numDownloading;
                    }
                    textures[name] = createTexture(gl2, options, onLoadFn);
                  });
                  callCallbackIfReady();
                  return textures;
                }
              })
            ),
            /***/
            "./src/twgl-full.js": (
              /*!**************************!*\
                !*** ./src/twgl-full.js ***!
                \**************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                var _exportNames = {
                  m4: true,
                  v3: true,
                  primitives: true
                };
                exports2.primitives = exports2.v3 = exports2.m4 = void 0;
                var m42 = _interopRequireWildcard(__webpack_require__(
                  /*! ./m4.js */
                  "./src/m4.js"
                ));
                exports2.m4 = m42;
                var v32 = _interopRequireWildcard(__webpack_require__(
                  /*! ./v3.js */
                  "./src/v3.js"
                ));
                exports2.v3 = v32;
                var primitives = _interopRequireWildcard(__webpack_require__(
                  /*! ./primitives.js */
                  "./src/primitives.js"
                ));
                exports2.primitives = primitives;
                var _twgl = __webpack_require__(
                  /*! ./twgl.js */
                  "./src/twgl.js"
                );
                Object.keys(_twgl).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = _twgl[key];
                });
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
              })
            ),
            /***/
            "./src/twgl.js": (
              /*!*********************!*\
                !*** ./src/twgl.js ***!
                \*********************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                var _exportNames = {
                  addExtensionsToContext: true,
                  getContext: true,
                  getWebGLContext: true,
                  resizeCanvasToDisplaySize: true,
                  setDefaults: true,
                  attributes: true,
                  textures: true,
                  utils: true,
                  draw: true,
                  framebuffers: true,
                  programs: true,
                  typedarrays: true,
                  vertexArrays: true
                };
                exports2.addExtensionsToContext = addExtensionsToContext;
                exports2.getContext = getContext;
                exports2.getWebGLContext = getWebGLContext;
                exports2.resizeCanvasToDisplaySize = resizeCanvasToDisplaySize;
                exports2.setDefaults = setDefaults;
                exports2.vertexArrays = exports2.typedarrays = exports2.programs = exports2.framebuffers = exports2.draw = exports2.utils = exports2.textures = exports2.attributes = void 0;
                var attributes = _interopRequireWildcard(__webpack_require__(
                  /*! ./attributes.js */
                  "./src/attributes.js"
                ));
                exports2.attributes = attributes;
                Object.keys(attributes).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = attributes[key];
                });
                var textures = _interopRequireWildcard(__webpack_require__(
                  /*! ./textures.js */
                  "./src/textures.js"
                ));
                exports2.textures = textures;
                Object.keys(textures).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = textures[key];
                });
                var helper = _interopRequireWildcard(__webpack_require__(
                  /*! ./helper.js */
                  "./src/helper.js"
                ));
                var utils = _interopRequireWildcard(__webpack_require__(
                  /*! ./utils.js */
                  "./src/utils.js"
                ));
                exports2.utils = utils;
                Object.keys(utils).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = utils[key];
                });
                var draw = _interopRequireWildcard(__webpack_require__(
                  /*! ./draw.js */
                  "./src/draw.js"
                ));
                exports2.draw = draw;
                Object.keys(draw).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = draw[key];
                });
                var framebuffers = _interopRequireWildcard(__webpack_require__(
                  /*! ./framebuffers.js */
                  "./src/framebuffers.js"
                ));
                exports2.framebuffers = framebuffers;
                Object.keys(framebuffers).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = framebuffers[key];
                });
                var programs = _interopRequireWildcard(__webpack_require__(
                  /*! ./programs.js */
                  "./src/programs.js"
                ));
                exports2.programs = programs;
                Object.keys(programs).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = programs[key];
                });
                var typedarrays = _interopRequireWildcard(__webpack_require__(
                  /*! ./typedarrays.js */
                  "./src/typedarrays.js"
                ));
                exports2.typedarrays = typedarrays;
                Object.keys(typedarrays).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = typedarrays[key];
                });
                var vertexArrays = _interopRequireWildcard(__webpack_require__(
                  /*! ./vertex-arrays.js */
                  "./src/vertex-arrays.js"
                ));
                exports2.vertexArrays = vertexArrays;
                Object.keys(vertexArrays).forEach(function(key) {
                  if (key === "default" || key === "__esModule") return;
                  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                  exports2[key] = vertexArrays[key];
                });
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var gl = void 0;
                var defaults = {
                  addExtensionsToContext: true
                };
                function setDefaults(newDefaults) {
                  helper.copyExistingProperties(newDefaults, defaults);
                  attributes.setAttributeDefaults_(newDefaults);
                  textures.setTextureDefaults_(newDefaults);
                }
                var prefixRE = /^(.*?)_/;
                function addExtensionToContext(gl2, extensionName) {
                  utils.glEnumToString(gl2, 0);
                  var ext = gl2.getExtension(extensionName);
                  if (ext) {
                    var enums = {};
                    var fnSuffix = prefixRE.exec(extensionName)[1];
                    var enumSuffix = "_" + fnSuffix;
                    for (var key in ext) {
                      var value = ext[key];
                      var isFunc = typeof value === "function";
                      var suffix = isFunc ? fnSuffix : enumSuffix;
                      var name = key;
                      if (key.endsWith(suffix)) {
                        name = key.substring(0, key.length - suffix.length);
                      }
                      if (gl2[name] !== void 0) {
                        if (!isFunc && gl2[name] !== value) {
                          helper.warn(name, gl2[name], value, key);
                        }
                      } else {
                        if (isFunc) {
                          gl2[name] = /* @__PURE__ */ (function(origFn) {
                            return function() {
                              return origFn.apply(ext, arguments);
                            };
                          })(value);
                        } else {
                          gl2[name] = value;
                          enums[name] = value;
                        }
                      }
                    }
                    enums.constructor = {
                      name: ext.constructor.name
                    };
                    utils.glEnumToString(enums, 0);
                  }
                  return ext;
                }
                var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_float", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_disjoint_timer_query_webgl2", "EXT_frag_depth", "EXT_sRGB", "EXT_shader_texture_lod", "EXT_texture_filter_anisotropic", "OES_element_index_uint", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_atc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_pvrtc", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_depth_texture", "WEBGL_draw_buffers"];
                function addExtensionsToContext(gl2) {
                  for (var ii = 0; ii < supportedExtensions.length; ++ii) {
                    addExtensionToContext(gl2, supportedExtensions[ii]);
                  }
                }
                function create3DContext(canvas, opt_attribs) {
                  var names = ["webgl", "experimental-webgl"];
                  var context = null;
                  for (var ii = 0; ii < names.length; ++ii) {
                    context = canvas.getContext(names[ii], opt_attribs);
                    if (context) {
                      if (defaults.addExtensionsToContext) {
                        addExtensionsToContext(context);
                      }
                      break;
                    }
                  }
                  return context;
                }
                function getWebGLContext(canvas, opt_attribs) {
                  var gl2 = create3DContext(canvas, opt_attribs);
                  return gl2;
                }
                function createContext(canvas, opt_attribs) {
                  var names = ["webgl2", "webgl", "experimental-webgl"];
                  var context = null;
                  for (var ii = 0; ii < names.length; ++ii) {
                    context = canvas.getContext(names[ii], opt_attribs);
                    if (context) {
                      if (defaults.addExtensionsToContext) {
                        addExtensionsToContext(context);
                      }
                      break;
                    }
                  }
                  return context;
                }
                function getContext(canvas, opt_attribs) {
                  var gl2 = createContext(canvas, opt_attribs);
                  return gl2;
                }
                function resizeCanvasToDisplaySize(canvas, multiplier) {
                  multiplier = multiplier || 1;
                  multiplier = Math.max(0, multiplier);
                  var width = canvas.clientWidth * multiplier | 0;
                  var height = canvas.clientHeight * multiplier | 0;
                  if (canvas.width !== width || canvas.height !== height) {
                    canvas.width = width;
                    canvas.height = height;
                    return true;
                  }
                  return false;
                }
              })
            ),
            /***/
            "./src/typedarrays.js": (
              /*!****************************!*\
                !*** ./src/typedarrays.js ***!
                \****************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                exports2.__esModule = true;
                exports2.getGLTypeForTypedArray = getGLTypeForTypedArray;
                exports2.getGLTypeForTypedArrayType = getGLTypeForTypedArrayType;
                exports2.getTypedArrayTypeForGLType = getTypedArrayTypeForGLType;
                exports2.isArrayBuffer = void 0;
                var gl = void 0;
                var BYTE = 5120;
                var UNSIGNED_BYTE = 5121;
                var SHORT = 5122;
                var UNSIGNED_SHORT = 5123;
                var INT = 5124;
                var UNSIGNED_INT = 5125;
                var FLOAT = 5126;
                var UNSIGNED_SHORT_4_4_4_4 = 32819;
                var UNSIGNED_SHORT_5_5_5_1 = 32820;
                var UNSIGNED_SHORT_5_6_5 = 33635;
                var HALF_FLOAT = 5131;
                var UNSIGNED_INT_2_10_10_10_REV = 33640;
                var UNSIGNED_INT_10F_11F_11F_REV = 35899;
                var UNSIGNED_INT_5_9_9_9_REV = 35902;
                var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
                var UNSIGNED_INT_24_8 = 34042;
                var glTypeToTypedArray = {};
                {
                  var tt = glTypeToTypedArray;
                  tt[BYTE] = Int8Array;
                  tt[UNSIGNED_BYTE] = Uint8Array;
                  tt[SHORT] = Int16Array;
                  tt[UNSIGNED_SHORT] = Uint16Array;
                  tt[INT] = Int32Array;
                  tt[UNSIGNED_INT] = Uint32Array;
                  tt[FLOAT] = Float32Array;
                  tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
                  tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
                  tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
                  tt[HALF_FLOAT] = Uint16Array;
                  tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
                  tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
                  tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
                  tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
                  tt[UNSIGNED_INT_24_8] = Uint32Array;
                }
                function getGLTypeForTypedArray(typedArray) {
                  if (typedArray instanceof Int8Array) {
                    return BYTE;
                  }
                  if (typedArray instanceof Uint8Array) {
                    return UNSIGNED_BYTE;
                  }
                  if (typedArray instanceof Uint8ClampedArray) {
                    return UNSIGNED_BYTE;
                  }
                  if (typedArray instanceof Int16Array) {
                    return SHORT;
                  }
                  if (typedArray instanceof Uint16Array) {
                    return UNSIGNED_SHORT;
                  }
                  if (typedArray instanceof Int32Array) {
                    return INT;
                  }
                  if (typedArray instanceof Uint32Array) {
                    return UNSIGNED_INT;
                  }
                  if (typedArray instanceof Float32Array) {
                    return FLOAT;
                  }
                  throw new Error("unsupported typed array type");
                }
                function getGLTypeForTypedArrayType(typedArrayType) {
                  if (typedArrayType === Int8Array) {
                    return BYTE;
                  }
                  if (typedArrayType === Uint8Array) {
                    return UNSIGNED_BYTE;
                  }
                  if (typedArrayType === Uint8ClampedArray) {
                    return UNSIGNED_BYTE;
                  }
                  if (typedArrayType === Int16Array) {
                    return SHORT;
                  }
                  if (typedArrayType === Uint16Array) {
                    return UNSIGNED_SHORT;
                  }
                  if (typedArrayType === Int32Array) {
                    return INT;
                  }
                  if (typedArrayType === Uint32Array) {
                    return UNSIGNED_INT;
                  }
                  if (typedArrayType === Float32Array) {
                    return FLOAT;
                  }
                  throw new Error("unsupported typed array type");
                }
                function getTypedArrayTypeForGLType(type) {
                  var CTOR = glTypeToTypedArray[type];
                  if (!CTOR) {
                    throw new Error("unknown gl type");
                  }
                  return CTOR;
                }
                var isArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
                  return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
                } : function isArrayBuffer2(a) {
                  return a && a.buffer && a.buffer instanceof ArrayBuffer;
                };
                exports2.isArrayBuffer = isArrayBuffer;
              })
            ),
            /***/
            "./src/utils.js": (
              /*!**********************!*\
                !*** ./src/utils.js ***!
                \**********************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                exports2.__esModule = true;
                exports2.isWebGL1 = isWebGL1;
                exports2.isWebGL2 = isWebGL2;
                exports2.glEnumToString = void 0;
                function isWebGL2(gl) {
                  return !!gl.texStorage2D;
                }
                function isWebGL1(gl) {
                  return !gl.texStorage2D;
                }
                var glEnumToString = /* @__PURE__ */ (function() {
                  var haveEnumsForType = {};
                  var enums = {};
                  function addEnums(gl) {
                    var type = gl.constructor.name;
                    if (!haveEnumsForType[type]) {
                      for (var key in gl) {
                        if (typeof gl[key] === "number") {
                          var existing = enums[gl[key]];
                          enums[gl[key]] = existing ? "".concat(existing, " | ").concat(key) : key;
                        }
                      }
                      haveEnumsForType[type] = true;
                    }
                  }
                  return function glEnumToString2(gl, value) {
                    addEnums(gl);
                    return enums[value] || (typeof value === "number" ? "0x".concat(value.toString(16)) : value);
                  };
                })();
                exports2.glEnumToString = glEnumToString;
              })
            ),
            /***/
            "./src/v3.js": (
              /*!*******************!*\
                !*** ./src/v3.js ***!
                \*******************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                exports2.__esModule = true;
                exports2.add = add;
                exports2.copy = copy;
                exports2.create = create;
                exports2.cross = cross;
                exports2.distance = distance;
                exports2.distanceSq = distanceSq;
                exports2.divide = divide;
                exports2.divScalar = divScalar;
                exports2.dot = dot;
                exports2.lerp = lerp;
                exports2.lerpV = lerpV;
                exports2.length = length2;
                exports2.lengthSq = lengthSq;
                exports2.max = max2;
                exports2.min = min;
                exports2.mulScalar = mulScalar;
                exports2.multiply = multiply;
                exports2.negate = negate;
                exports2.normalize = normalize;
                exports2.setDefaultType = setDefaultType;
                exports2.subtract = subtract;
                var VecType = Float32Array;
                function setDefaultType(ctor) {
                  var oldType = VecType;
                  VecType = ctor;
                  return oldType;
                }
                function create(x2, y, z) {
                  var dst = new VecType(3);
                  if (x2) {
                    dst[0] = x2;
                  }
                  if (y) {
                    dst[1] = y;
                  }
                  if (z) {
                    dst[2] = z;
                  }
                  return dst;
                }
                function add(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] + b[0];
                  dst[1] = a[1] + b[1];
                  dst[2] = a[2] + b[2];
                  return dst;
                }
                function subtract(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] - b[0];
                  dst[1] = a[1] - b[1];
                  dst[2] = a[2] - b[2];
                  return dst;
                }
                function lerp(a, b, t, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] + t * (b[0] - a[0]);
                  dst[1] = a[1] + t * (b[1] - a[1]);
                  dst[2] = a[2] + t * (b[2] - a[2]);
                  return dst;
                }
                function lerpV(a, b, t, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] + t[0] * (b[0] - a[0]);
                  dst[1] = a[1] + t[1] * (b[1] - a[1]);
                  dst[2] = a[2] + t[2] * (b[2] - a[2]);
                  return dst;
                }
                function max2(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = Math.max(a[0], b[0]);
                  dst[1] = Math.max(a[1], b[1]);
                  dst[2] = Math.max(a[2], b[2]);
                  return dst;
                }
                function min(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = Math.min(a[0], b[0]);
                  dst[1] = Math.min(a[1], b[1]);
                  dst[2] = Math.min(a[2], b[2]);
                  return dst;
                }
                function mulScalar(v, k, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = v[0] * k;
                  dst[1] = v[1] * k;
                  dst[2] = v[2] * k;
                  return dst;
                }
                function divScalar(v, k, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = v[0] / k;
                  dst[1] = v[1] / k;
                  dst[2] = v[2] / k;
                  return dst;
                }
                function cross(a, b, dst) {
                  dst = dst || new VecType(3);
                  var t1 = a[2] * b[0] - a[0] * b[2];
                  var t2 = a[0] * b[1] - a[1] * b[0];
                  dst[0] = a[1] * b[2] - a[2] * b[1];
                  dst[1] = t1;
                  dst[2] = t2;
                  return dst;
                }
                function dot(a, b) {
                  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
                }
                function length2(v) {
                  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
                }
                function lengthSq(v) {
                  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
                }
                function distance(a, b) {
                  var dx = a[0] - b[0];
                  var dy = a[1] - b[1];
                  var dz = a[2] - b[2];
                  return Math.sqrt(dx * dx + dy * dy + dz * dz);
                }
                function distanceSq(a, b) {
                  var dx = a[0] - b[0];
                  var dy = a[1] - b[1];
                  var dz = a[2] - b[2];
                  return dx * dx + dy * dy + dz * dz;
                }
                function normalize(a, dst) {
                  dst = dst || new VecType(3);
                  var lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
                  var len = Math.sqrt(lenSq);
                  if (len > 1e-5) {
                    dst[0] = a[0] / len;
                    dst[1] = a[1] / len;
                    dst[2] = a[2] / len;
                  } else {
                    dst[0] = 0;
                    dst[1] = 0;
                    dst[2] = 0;
                  }
                  return dst;
                }
                function negate(v, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = -v[0];
                  dst[1] = -v[1];
                  dst[2] = -v[2];
                  return dst;
                }
                function copy(v, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = v[0];
                  dst[1] = v[1];
                  dst[2] = v[2];
                  return dst;
                }
                function multiply(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] * b[0];
                  dst[1] = a[1] * b[1];
                  dst[2] = a[2] * b[2];
                  return dst;
                }
                function divide(a, b, dst) {
                  dst = dst || new VecType(3);
                  dst[0] = a[0] / b[0];
                  dst[1] = a[1] / b[1];
                  dst[2] = a[2] / b[2];
                  return dst;
                }
              })
            ),
            /***/
            "./src/vertex-arrays.js": (
              /*!******************************!*\
                !*** ./src/vertex-arrays.js ***!
                \******************************/
              /*! no static exports found */
              /***/
              (function(module2, exports2, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                  "@babel/helpers - typeof";
                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                exports2.__esModule = true;
                exports2.createVertexArrayInfo = createVertexArrayInfo;
                exports2.createVAOAndSetAttributes = createVAOAndSetAttributes;
                exports2.createVAOFromBufferInfo = createVAOFromBufferInfo;
                var programs = _interopRequireWildcard(__webpack_require__(
                  /*! ./programs.js */
                  "./src/programs.js"
                ));
                function _getRequireWildcardCache() {
                  if (typeof WeakMap !== "function") return null;
                  var cache = /* @__PURE__ */ new WeakMap();
                  _getRequireWildcardCache = function _getRequireWildcardCache2() {
                    return cache;
                  };
                  return cache;
                }
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  }
                  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
                    return { "default": obj };
                  }
                  var cache = _getRequireWildcardCache();
                  if (cache && cache.has(obj)) {
                    return cache.get(obj);
                  }
                  var newObj = {};
                  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                      if (desc && (desc.get || desc.set)) {
                        Object.defineProperty(newObj, key, desc);
                      } else {
                        newObj[key] = obj[key];
                      }
                    }
                  }
                  newObj["default"] = obj;
                  if (cache) {
                    cache.set(obj, newObj);
                  }
                  return newObj;
                }
                var ELEMENT_ARRAY_BUFFER = 34963;
                function createVertexArrayInfo(gl, programInfos, bufferInfo) {
                  var vao = gl.createVertexArray();
                  gl.bindVertexArray(vao);
                  if (!programInfos.length) {
                    programInfos = [programInfos];
                  }
                  programInfos.forEach(function(programInfo) {
                    programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
                  });
                  gl.bindVertexArray(null);
                  return {
                    numElements: bufferInfo.numElements,
                    elementType: bufferInfo.elementType,
                    vertexArrayObject: vao
                  };
                }
                function createVAOAndSetAttributes(gl, setters, attribs, indices) {
                  var vao = gl.createVertexArray();
                  gl.bindVertexArray(vao);
                  programs.setAttributes(setters, attribs);
                  if (indices) {
                    gl.bindBuffer(ELEMENT_ARRAY_BUFFER, indices);
                  }
                  gl.bindVertexArray(null);
                  return vao;
                }
                function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
                  return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
                }
              })
            )
            /******/
          })
        );
      });
    }
  });

  // node_modules/jpeg-js/lib/encoder.js
  var require_encoder = __commonJS({
    "node_modules/jpeg-js/lib/encoder.js"(exports, module) {
      var btoa = btoa || function(buf) {
        return Buffer.from(buf).toString("base64");
      };
      function JPEGEncoder(quality) {
        var self2 = this;
        var fround = Math.round;
        var ffloor = Math.floor;
        var YTable = new Array(64);
        var UVTable = new Array(64);
        var fdtbl_Y = new Array(64);
        var fdtbl_UV = new Array(64);
        var YDC_HT;
        var UVDC_HT;
        var YAC_HT;
        var UVAC_HT;
        var bitcode = new Array(65535);
        var category = new Array(65535);
        var outputfDCTQuant = new Array(64);
        var DU = new Array(64);
        var byteout = [];
        var bytenew = 0;
        var bytepos = 7;
        var YDU = new Array(64);
        var UDU = new Array(64);
        var VDU = new Array(64);
        var clt = new Array(256);
        var RGB_YUV_TABLE = new Array(2048);
        var currentQuality;
        var ZigZag = [
          0,
          1,
          5,
          6,
          14,
          15,
          27,
          28,
          2,
          4,
          7,
          13,
          16,
          26,
          29,
          42,
          3,
          8,
          12,
          17,
          25,
          30,
          41,
          43,
          9,
          11,
          18,
          24,
          31,
          40,
          44,
          53,
          10,
          19,
          23,
          32,
          39,
          45,
          52,
          54,
          20,
          22,
          33,
          38,
          46,
          51,
          55,
          60,
          21,
          34,
          37,
          47,
          50,
          56,
          59,
          61,
          35,
          36,
          48,
          49,
          57,
          58,
          62,
          63
        ];
        var std_dc_luminance_nrcodes = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
        var std_dc_luminance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var std_ac_luminance_nrcodes = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125];
        var std_ac_luminance_values = [
          1,
          2,
          3,
          0,
          4,
          17,
          5,
          18,
          33,
          49,
          65,
          6,
          19,
          81,
          97,
          7,
          34,
          113,
          20,
          50,
          129,
          145,
          161,
          8,
          35,
          66,
          177,
          193,
          21,
          82,
          209,
          240,
          36,
          51,
          98,
          114,
          130,
          9,
          10,
          22,
          23,
          24,
          25,
          26,
          37,
          38,
          39,
          40,
          41,
          42,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          131,
          132,
          133,
          134,
          135,
          136,
          137,
          138,
          146,
          147,
          148,
          149,
          150,
          151,
          152,
          153,
          154,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
          185,
          186,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
          225,
          226,
          227,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          241,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250
        ];
        var std_dc_chrominance_nrcodes = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
        var std_dc_chrominance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var std_ac_chrominance_nrcodes = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119];
        var std_ac_chrominance_values = [
          0,
          1,
          2,
          3,
          17,
          4,
          5,
          33,
          49,
          6,
          18,
          65,
          81,
          7,
          97,
          113,
          19,
          34,
          50,
          129,
          8,
          20,
          66,
          145,
          161,
          177,
          193,
          9,
          35,
          51,
          82,
          240,
          21,
          98,
          114,
          209,
          10,
          22,
          36,
          52,
          225,
          37,
          241,
          23,
          24,
          25,
          26,
          38,
          39,
          40,
          41,
          42,
          53,
          54,
          55,
          56,
          57,
          58,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          130,
          131,
          132,
          133,
          134,
          135,
          136,
          137,
          138,
          146,
          147,
          148,
          149,
          150,
          151,
          152,
          153,
          154,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
          185,
          186,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
          226,
          227,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250
        ];
        function initQuantTables(sf) {
          var YQT = [
            16,
            11,
            10,
            16,
            24,
            40,
            51,
            61,
            12,
            12,
            14,
            19,
            26,
            58,
            60,
            55,
            14,
            13,
            16,
            24,
            40,
            57,
            69,
            56,
            14,
            17,
            22,
            29,
            51,
            87,
            80,
            62,
            18,
            22,
            37,
            56,
            68,
            109,
            103,
            77,
            24,
            35,
            55,
            64,
            81,
            104,
            113,
            92,
            49,
            64,
            78,
            87,
            103,
            121,
            120,
            101,
            72,
            92,
            95,
            98,
            112,
            100,
            103,
            99
          ];
          for (var i2 = 0; i2 < 64; i2++) {
            var t = ffloor((YQT[i2] * sf + 50) / 100);
            if (t < 1) {
              t = 1;
            } else if (t > 255) {
              t = 255;
            }
            YTable[ZigZag[i2]] = t;
          }
          var UVQT = [
            17,
            18,
            24,
            47,
            99,
            99,
            99,
            99,
            18,
            21,
            26,
            66,
            99,
            99,
            99,
            99,
            24,
            26,
            56,
            99,
            99,
            99,
            99,
            99,
            47,
            66,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99,
            99
          ];
          for (var j = 0; j < 64; j++) {
            var u = ffloor((UVQT[j] * sf + 50) / 100);
            if (u < 1) {
              u = 1;
            } else if (u > 255) {
              u = 255;
            }
            UVTable[ZigZag[j]] = u;
          }
          var aasf = [
            1,
            1.387039845,
            1.306562965,
            1.175875602,
            1,
            0.785694958,
            0.5411961,
            0.275899379
          ];
          var k = 0;
          for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
              fdtbl_Y[k] = 1 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8);
              fdtbl_UV[k] = 1 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8);
              k++;
            }
          }
        }
        function computeHuffmanTbl(nrcodes, std_table) {
          var codevalue = 0;
          var pos_in_table = 0;
          var HT = new Array();
          for (var k = 1; k <= 16; k++) {
            for (var j = 1; j <= nrcodes[k]; j++) {
              HT[std_table[pos_in_table]] = [];
              HT[std_table[pos_in_table]][0] = codevalue;
              HT[std_table[pos_in_table]][1] = k;
              pos_in_table++;
              codevalue++;
            }
            codevalue *= 2;
          }
          return HT;
        }
        function initHuffmanTbl() {
          YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes, std_dc_luminance_values);
          UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes, std_dc_chrominance_values);
          YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes, std_ac_luminance_values);
          UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes, std_ac_chrominance_values);
        }
        function initCategoryNumber() {
          var nrlower = 1;
          var nrupper = 2;
          for (var cat = 1; cat <= 15; cat++) {
            for (var nr = nrlower; nr < nrupper; nr++) {
              category[32767 + nr] = cat;
              bitcode[32767 + nr] = [];
              bitcode[32767 + nr][1] = cat;
              bitcode[32767 + nr][0] = nr;
            }
            for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) {
              category[32767 + nrneg] = cat;
              bitcode[32767 + nrneg] = [];
              bitcode[32767 + nrneg][1] = cat;
              bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg;
            }
            nrlower <<= 1;
            nrupper <<= 1;
          }
        }
        function initRGBYUVTable() {
          for (var i2 = 0; i2 < 256; i2++) {
            RGB_YUV_TABLE[i2] = 19595 * i2;
            RGB_YUV_TABLE[i2 + 256 >> 0] = 38470 * i2;
            RGB_YUV_TABLE[i2 + 512 >> 0] = 7471 * i2 + 32768;
            RGB_YUV_TABLE[i2 + 768 >> 0] = -11059 * i2;
            RGB_YUV_TABLE[i2 + 1024 >> 0] = -21709 * i2;
            RGB_YUV_TABLE[i2 + 1280 >> 0] = 32768 * i2 + 8421375;
            RGB_YUV_TABLE[i2 + 1536 >> 0] = -27439 * i2;
            RGB_YUV_TABLE[i2 + 1792 >> 0] = -5329 * i2;
          }
        }
        function writeBits(bs) {
          var value = bs[0];
          var posval = bs[1] - 1;
          while (posval >= 0) {
            if (value & 1 << posval) {
              bytenew |= 1 << bytepos;
            }
            posval--;
            bytepos--;
            if (bytepos < 0) {
              if (bytenew == 255) {
                writeByte(255);
                writeByte(0);
              } else {
                writeByte(bytenew);
              }
              bytepos = 7;
              bytenew = 0;
            }
          }
        }
        function writeByte(value) {
          byteout.push(value);
        }
        function writeWord(value) {
          writeByte(value >> 8 & 255);
          writeByte(value & 255);
        }
        function fDCTQuant(data, fdtbl) {
          var d0, d1, d2, d3, d4, d5, d6, d7;
          var dataOff = 0;
          var i2;
          var I8 = 8;
          var I64 = 64;
          for (i2 = 0; i2 < I8; ++i2) {
            d0 = data[dataOff];
            d1 = data[dataOff + 1];
            d2 = data[dataOff + 2];
            d3 = data[dataOff + 3];
            d4 = data[dataOff + 4];
            d5 = data[dataOff + 5];
            d6 = data[dataOff + 6];
            d7 = data[dataOff + 7];
            var tmp0 = d0 + d7;
            var tmp7 = d0 - d7;
            var tmp1 = d1 + d6;
            var tmp6 = d1 - d6;
            var tmp2 = d2 + d5;
            var tmp5 = d2 - d5;
            var tmp3 = d3 + d4;
            var tmp4 = d3 - d4;
            var tmp10 = tmp0 + tmp3;
            var tmp13 = tmp0 - tmp3;
            var tmp11 = tmp1 + tmp2;
            var tmp12 = tmp1 - tmp2;
            data[dataOff] = tmp10 + tmp11;
            data[dataOff + 4] = tmp10 - tmp11;
            var z1 = (tmp12 + tmp13) * 0.707106781;
            data[dataOff + 2] = tmp13 + z1;
            data[dataOff + 6] = tmp13 - z1;
            tmp10 = tmp4 + tmp5;
            tmp11 = tmp5 + tmp6;
            tmp12 = tmp6 + tmp7;
            var z5 = (tmp10 - tmp12) * 0.382683433;
            var z2 = 0.5411961 * tmp10 + z5;
            var z4 = 1.306562965 * tmp12 + z5;
            var z3 = tmp11 * 0.707106781;
            var z11 = tmp7 + z3;
            var z13 = tmp7 - z3;
            data[dataOff + 5] = z13 + z2;
            data[dataOff + 3] = z13 - z2;
            data[dataOff + 1] = z11 + z4;
            data[dataOff + 7] = z11 - z4;
            dataOff += 8;
          }
          dataOff = 0;
          for (i2 = 0; i2 < I8; ++i2) {
            d0 = data[dataOff];
            d1 = data[dataOff + 8];
            d2 = data[dataOff + 16];
            d3 = data[dataOff + 24];
            d4 = data[dataOff + 32];
            d5 = data[dataOff + 40];
            d6 = data[dataOff + 48];
            d7 = data[dataOff + 56];
            var tmp0p2 = d0 + d7;
            var tmp7p2 = d0 - d7;
            var tmp1p2 = d1 + d6;
            var tmp6p2 = d1 - d6;
            var tmp2p2 = d2 + d5;
            var tmp5p2 = d2 - d5;
            var tmp3p2 = d3 + d4;
            var tmp4p2 = d3 - d4;
            var tmp10p2 = tmp0p2 + tmp3p2;
            var tmp13p2 = tmp0p2 - tmp3p2;
            var tmp11p2 = tmp1p2 + tmp2p2;
            var tmp12p2 = tmp1p2 - tmp2p2;
            data[dataOff] = tmp10p2 + tmp11p2;
            data[dataOff + 32] = tmp10p2 - tmp11p2;
            var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781;
            data[dataOff + 16] = tmp13p2 + z1p2;
            data[dataOff + 48] = tmp13p2 - z1p2;
            tmp10p2 = tmp4p2 + tmp5p2;
            tmp11p2 = tmp5p2 + tmp6p2;
            tmp12p2 = tmp6p2 + tmp7p2;
            var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433;
            var z2p2 = 0.5411961 * tmp10p2 + z5p2;
            var z4p2 = 1.306562965 * tmp12p2 + z5p2;
            var z3p2 = tmp11p2 * 0.707106781;
            var z11p2 = tmp7p2 + z3p2;
            var z13p2 = tmp7p2 - z3p2;
            data[dataOff + 40] = z13p2 + z2p2;
            data[dataOff + 24] = z13p2 - z2p2;
            data[dataOff + 8] = z11p2 + z4p2;
            data[dataOff + 56] = z11p2 - z4p2;
            dataOff++;
          }
          var fDCTQuant2;
          for (i2 = 0; i2 < I64; ++i2) {
            fDCTQuant2 = data[i2] * fdtbl[i2];
            outputfDCTQuant[i2] = fDCTQuant2 > 0 ? fDCTQuant2 + 0.5 | 0 : fDCTQuant2 - 0.5 | 0;
          }
          return outputfDCTQuant;
        }
        function writeAPP0() {
          writeWord(65504);
          writeWord(16);
          writeByte(74);
          writeByte(70);
          writeByte(73);
          writeByte(70);
          writeByte(0);
          writeByte(1);
          writeByte(1);
          writeByte(0);
          writeWord(1);
          writeWord(1);
          writeByte(0);
          writeByte(0);
        }
        function writeAPP1(exifBuffer) {
          if (!exifBuffer) return;
          writeWord(65505);
          if (exifBuffer[0] === 69 && exifBuffer[1] === 120 && exifBuffer[2] === 105 && exifBuffer[3] === 102) {
            writeWord(exifBuffer.length + 2);
          } else {
            writeWord(exifBuffer.length + 5 + 2);
            writeByte(69);
            writeByte(120);
            writeByte(105);
            writeByte(102);
            writeByte(0);
          }
          for (var i2 = 0; i2 < exifBuffer.length; i2++) {
            writeByte(exifBuffer[i2]);
          }
        }
        function writeSOF0(width, height) {
          writeWord(65472);
          writeWord(17);
          writeByte(8);
          writeWord(height);
          writeWord(width);
          writeByte(3);
          writeByte(1);
          writeByte(17);
          writeByte(0);
          writeByte(2);
          writeByte(17);
          writeByte(1);
          writeByte(3);
          writeByte(17);
          writeByte(1);
        }
        function writeDQT() {
          writeWord(65499);
          writeWord(132);
          writeByte(0);
          for (var i2 = 0; i2 < 64; i2++) {
            writeByte(YTable[i2]);
          }
          writeByte(1);
          for (var j = 0; j < 64; j++) {
            writeByte(UVTable[j]);
          }
        }
        function writeDHT() {
          writeWord(65476);
          writeWord(418);
          writeByte(0);
          for (var i2 = 0; i2 < 16; i2++) {
            writeByte(std_dc_luminance_nrcodes[i2 + 1]);
          }
          for (var j = 0; j <= 11; j++) {
            writeByte(std_dc_luminance_values[j]);
          }
          writeByte(16);
          for (var k = 0; k < 16; k++) {
            writeByte(std_ac_luminance_nrcodes[k + 1]);
          }
          for (var l = 0; l <= 161; l++) {
            writeByte(std_ac_luminance_values[l]);
          }
          writeByte(1);
          for (var m = 0; m < 16; m++) {
            writeByte(std_dc_chrominance_nrcodes[m + 1]);
          }
          for (var n = 0; n <= 11; n++) {
            writeByte(std_dc_chrominance_values[n]);
          }
          writeByte(17);
          for (var o = 0; o < 16; o++) {
            writeByte(std_ac_chrominance_nrcodes[o + 1]);
          }
          for (var p = 0; p <= 161; p++) {
            writeByte(std_ac_chrominance_values[p]);
          }
        }
        function writeCOM(comments) {
          if (typeof comments === "undefined" || comments.constructor !== Array) return;
          comments.forEach((e) => {
            if (typeof e !== "string") return;
            writeWord(65534);
            var l = e.length;
            writeWord(l + 2);
            var i2;
            for (i2 = 0; i2 < l; i2++)
              writeByte(e.charCodeAt(i2));
          });
        }
        function writeSOS() {
          writeWord(65498);
          writeWord(12);
          writeByte(3);
          writeByte(1);
          writeByte(0);
          writeByte(2);
          writeByte(17);
          writeByte(3);
          writeByte(17);
          writeByte(0);
          writeByte(63);
          writeByte(0);
        }
        function processDU(CDU, fdtbl, DC, HTDC, HTAC) {
          var EOB = HTAC[0];
          var M16zeroes = HTAC[240];
          var pos;
          var I16 = 16;
          var I63 = 63;
          var I64 = 64;
          var DU_DCT = fDCTQuant(CDU, fdtbl);
          for (var j = 0; j < I64; ++j) {
            DU[ZigZag[j]] = DU_DCT[j];
          }
          var Diff = DU[0] - DC;
          DC = DU[0];
          if (Diff == 0) {
            writeBits(HTDC[0]);
          } else {
            pos = 32767 + Diff;
            writeBits(HTDC[category[pos]]);
            writeBits(bitcode[pos]);
          }
          var end0pos = 63;
          for (; end0pos > 0 && DU[end0pos] == 0; end0pos--) {
          }
          ;
          if (end0pos == 0) {
            writeBits(EOB);
            return DC;
          }
          var i2 = 1;
          var lng;
          while (i2 <= end0pos) {
            var startpos = i2;
            for (; DU[i2] == 0 && i2 <= end0pos; ++i2) {
            }
            var nrzeroes = i2 - startpos;
            if (nrzeroes >= I16) {
              lng = nrzeroes >> 4;
              for (var nrmarker = 1; nrmarker <= lng; ++nrmarker)
                writeBits(M16zeroes);
              nrzeroes = nrzeroes & 15;
            }
            pos = 32767 + DU[i2];
            writeBits(HTAC[(nrzeroes << 4) + category[pos]]);
            writeBits(bitcode[pos]);
            i2++;
          }
          if (end0pos != I63) {
            writeBits(EOB);
          }
          return DC;
        }
        function initCharLookupTable() {
          var sfcc = String.fromCharCode;
          for (var i2 = 0; i2 < 256; i2++) {
            clt[i2] = sfcc(i2);
          }
        }
        this.encode = function(image, quality2) {
          var time_start = (/* @__PURE__ */ new Date()).getTime();
          if (quality2) setQuality(quality2);
          byteout = new Array();
          bytenew = 0;
          bytepos = 7;
          writeWord(65496);
          writeAPP0();
          writeCOM(image.comments);
          writeAPP1(image.exifBuffer);
          writeDQT();
          writeSOF0(image.width, image.height);
          writeDHT();
          writeSOS();
          var DCY = 0;
          var DCU = 0;
          var DCV = 0;
          bytenew = 0;
          bytepos = 7;
          this.encode.displayName = "_encode_";
          var imageData = image.data;
          var width = image.width;
          var height = image.height;
          var quadWidth = width * 4;
          var tripleWidth = width * 3;
          var x2, y = 0;
          var r, g, b;
          var start2, p, col, row, pos;
          while (y < height) {
            x2 = 0;
            while (x2 < quadWidth) {
              start2 = quadWidth * y + x2;
              p = start2;
              col = -1;
              row = 0;
              for (pos = 0; pos < 64; pos++) {
                row = pos >> 3;
                col = (pos & 7) * 4;
                p = start2 + row * quadWidth + col;
                if (y + row >= height) {
                  p -= quadWidth * (y + 1 + row - height);
                }
                if (x2 + col >= quadWidth) {
                  p -= x2 + col - quadWidth + 4;
                }
                r = imageData[p++];
                g = imageData[p++];
                b = imageData[p++];
                YDU[pos] = (RGB_YUV_TABLE[r] + RGB_YUV_TABLE[g + 256 >> 0] + RGB_YUV_TABLE[b + 512 >> 0] >> 16) - 128;
                UDU[pos] = (RGB_YUV_TABLE[r + 768 >> 0] + RGB_YUV_TABLE[g + 1024 >> 0] + RGB_YUV_TABLE[b + 1280 >> 0] >> 16) - 128;
                VDU[pos] = (RGB_YUV_TABLE[r + 1280 >> 0] + RGB_YUV_TABLE[g + 1536 >> 0] + RGB_YUV_TABLE[b + 1792 >> 0] >> 16) - 128;
              }
              DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
              DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
              DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
              x2 += 32;
            }
            y += 8;
          }
          if (bytepos >= 0) {
            var fillbits = [];
            fillbits[1] = bytepos + 1;
            fillbits[0] = (1 << bytepos + 1) - 1;
            writeBits(fillbits);
          }
          writeWord(65497);
          if (typeof module === "undefined") return new Uint8Array(byteout);
          return Buffer.from(byteout);
          var jpegDataUri = "data:image/jpeg;base64," + btoa(byteout.join(""));
          byteout = [];
          var duration = (/* @__PURE__ */ new Date()).getTime() - time_start;
          return jpegDataUri;
        };
        function setQuality(quality2) {
          if (quality2 <= 0) {
            quality2 = 1;
          }
          if (quality2 > 100) {
            quality2 = 100;
          }
          if (currentQuality == quality2) return;
          var sf = 0;
          if (quality2 < 50) {
            sf = Math.floor(5e3 / quality2);
          } else {
            sf = Math.floor(200 - quality2 * 2);
          }
          initQuantTables(sf);
          currentQuality = quality2;
        }
        function init() {
          var time_start = (/* @__PURE__ */ new Date()).getTime();
          if (!quality) quality = 50;
          initCharLookupTable();
          initHuffmanTbl();
          initCategoryNumber();
          initRGBYUVTable();
          setQuality(quality);
          var duration = (/* @__PURE__ */ new Date()).getTime() - time_start;
        }
        init();
      }
      if (typeof module !== "undefined") {
        module.exports = encode2;
      } else if (typeof window !== "undefined") {
        window["jpeg-js"] = window["jpeg-js"] || {};
        window["jpeg-js"].encode = encode2;
      }
      function encode2(imgData, qu) {
        if (typeof qu === "undefined") qu = 50;
        var encoder2 = new JPEGEncoder(qu);
        var data = encoder2.encode(imgData, qu);
        return {
          data,
          width: imgData.width,
          height: imgData.height
        };
      }
    }
  });

  // node_modules/jpeg-js/lib/decoder.js
  var require_decoder = __commonJS({
    "node_modules/jpeg-js/lib/decoder.js"(exports, module) {
      var JpegImage = (function jpegImage() {
        "use strict";
        var dctZigZag = new Int32Array([
          0,
          1,
          8,
          16,
          9,
          2,
          3,
          10,
          17,
          24,
          32,
          25,
          18,
          11,
          4,
          5,
          12,
          19,
          26,
          33,
          40,
          48,
          41,
          34,
          27,
          20,
          13,
          6,
          7,
          14,
          21,
          28,
          35,
          42,
          49,
          56,
          57,
          50,
          43,
          36,
          29,
          22,
          15,
          23,
          30,
          37,
          44,
          51,
          58,
          59,
          52,
          45,
          38,
          31,
          39,
          46,
          53,
          60,
          61,
          54,
          47,
          55,
          62,
          63
        ]);
        var dctCos1 = 4017;
        var dctSin1 = 799;
        var dctCos3 = 3406;
        var dctSin3 = 2276;
        var dctCos6 = 1567;
        var dctSin6 = 3784;
        var dctSqrt2 = 5793;
        var dctSqrt1d2 = 2896;
        function constructor() {
        }
        function buildHuffmanTable(codeLengths, values) {
          var k = 0, code = [], i2, j, length2 = 16;
          while (length2 > 0 && !codeLengths[length2 - 1])
            length2--;
          code.push({ children: [], index: 0 });
          var p = code[0], q;
          for (i2 = 0; i2 < length2; i2++) {
            for (j = 0; j < codeLengths[i2]; j++) {
              p = code.pop();
              p.children[p.index] = values[k];
              while (p.index > 0) {
                if (code.length === 0)
                  throw new Error("Could not recreate Huffman Table");
                p = code.pop();
              }
              p.index++;
              code.push(p);
              while (code.length <= i2) {
                code.push(q = { children: [], index: 0 });
                p.children[p.index] = q.children;
                p = q;
              }
              k++;
            }
            if (i2 + 1 < length2) {
              code.push(q = { children: [], index: 0 });
              p.children[p.index] = q.children;
              p = q;
            }
          }
          return code[0].children;
        }
        function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive, opts) {
          var precision = frame.precision;
          var samplesPerLine = frame.samplesPerLine;
          var scanLines = frame.scanLines;
          var mcusPerLine = frame.mcusPerLine;
          var progressive = frame.progressive;
          var maxH = frame.maxH, maxV = frame.maxV;
          var startOffset = offset, bitsData = 0, bitsCount = 0;
          function readBit() {
            if (bitsCount > 0) {
              bitsCount--;
              return bitsData >> bitsCount & 1;
            }
            bitsData = data[offset++];
            if (bitsData == 255) {
              var nextByte = data[offset++];
              if (nextByte) {
                throw new Error("unexpected marker: " + (bitsData << 8 | nextByte).toString(16));
              }
            }
            bitsCount = 7;
            return bitsData >>> 7;
          }
          function decodeHuffman(tree) {
            var node = tree, bit;
            while ((bit = readBit()) !== null) {
              node = node[bit];
              if (typeof node === "number")
                return node;
              if (typeof node !== "object")
                throw new Error("invalid huffman sequence");
            }
            return null;
          }
          function receive(length2) {
            var n2 = 0;
            while (length2 > 0) {
              var bit = readBit();
              if (bit === null) return;
              n2 = n2 << 1 | bit;
              length2--;
            }
            return n2;
          }
          function receiveAndExtend(length2) {
            var n2 = receive(length2);
            if (n2 >= 1 << length2 - 1)
              return n2;
            return n2 + (-1 << length2) + 1;
          }
          function decodeBaseline(component2, zz) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t);
            zz[0] = component2.pred += diff;
            var k2 = 1;
            while (k2 < 64) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15)
                  break;
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              zz[z] = receiveAndExtend(s);
              k2++;
            }
          }
          function decodeDCFirst(component2, zz) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
            zz[0] = component2.pred += diff;
          }
          function decodeDCSuccessive(component2, zz) {
            zz[0] |= readBit() << successive;
          }
          var eobrun = 0;
          function decodeACFirst(component2, zz) {
            if (eobrun > 0) {
              eobrun--;
              return;
            }
            var k2 = spectralStart, e = spectralEnd;
            while (k2 <= e) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15) {
                  eobrun = receive(r) + (1 << r) - 1;
                  break;
                }
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              zz[z] = receiveAndExtend(s) * (1 << successive);
              k2++;
            }
          }
          var successiveACState = 0, successiveACNextValue;
          function decodeACSuccessive(component2, zz) {
            var k2 = spectralStart, e = spectralEnd, r = 0;
            while (k2 <= e) {
              var z = dctZigZag[k2];
              var direction = zz[z] < 0 ? -1 : 1;
              switch (successiveACState) {
                case 0:
                  var rs = decodeHuffman(component2.huffmanTableAC);
                  var s = rs & 15, r = rs >> 4;
                  if (s === 0) {
                    if (r < 15) {
                      eobrun = receive(r) + (1 << r);
                      successiveACState = 4;
                    } else {
                      r = 16;
                      successiveACState = 1;
                    }
                  } else {
                    if (s !== 1)
                      throw new Error("invalid ACn encoding");
                    successiveACNextValue = receiveAndExtend(s);
                    successiveACState = r ? 2 : 3;
                  }
                  continue;
                case 1:
                // skipping r zero items
                case 2:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  else {
                    r--;
                    if (r === 0)
                      successiveACState = successiveACState == 2 ? 3 : 0;
                  }
                  break;
                case 3:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  else {
                    zz[z] = successiveACNextValue << successive;
                    successiveACState = 0;
                  }
                  break;
                case 4:
                  if (zz[z])
                    zz[z] += (readBit() << successive) * direction;
                  break;
              }
              k2++;
            }
            if (successiveACState === 4) {
              eobrun--;
              if (eobrun === 0)
                successiveACState = 0;
            }
          }
          function decodeMcu(component2, decode3, mcu2, row, col) {
            var mcuRow = mcu2 / mcusPerLine | 0;
            var mcuCol = mcu2 % mcusPerLine;
            var blockRow = mcuRow * component2.v + row;
            var blockCol = mcuCol * component2.h + col;
            if (component2.blocks[blockRow] === void 0 && opts.tolerantDecoding)
              return;
            decode3(component2, component2.blocks[blockRow][blockCol]);
          }
          function decodeBlock(component2, decode3, mcu2) {
            var blockRow = mcu2 / component2.blocksPerLine | 0;
            var blockCol = mcu2 % component2.blocksPerLine;
            if (component2.blocks[blockRow] === void 0 && opts.tolerantDecoding)
              return;
            decode3(component2, component2.blocks[blockRow][blockCol]);
          }
          var componentsLength = components.length;
          var component, i2, j, k, n;
          var decodeFn;
          if (progressive) {
            if (spectralStart === 0)
              decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
            else
              decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
          } else {
            decodeFn = decodeBaseline;
          }
          var mcu = 0, marker;
          var mcuExpected;
          if (componentsLength == 1) {
            mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
          } else {
            mcuExpected = mcusPerLine * frame.mcusPerColumn;
          }
          if (!resetInterval) resetInterval = mcuExpected;
          var h2, v;
          while (mcu < mcuExpected) {
            for (i2 = 0; i2 < componentsLength; i2++)
              components[i2].pred = 0;
            eobrun = 0;
            if (componentsLength == 1) {
              component = components[0];
              for (n = 0; n < resetInterval; n++) {
                decodeBlock(component, decodeFn, mcu);
                mcu++;
              }
            } else {
              for (n = 0; n < resetInterval; n++) {
                for (i2 = 0; i2 < componentsLength; i2++) {
                  component = components[i2];
                  h2 = component.h;
                  v = component.v;
                  for (j = 0; j < v; j++) {
                    for (k = 0; k < h2; k++) {
                      decodeMcu(component, decodeFn, mcu, j, k);
                    }
                  }
                }
                mcu++;
                if (mcu === mcuExpected) break;
              }
            }
            if (mcu === mcuExpected) {
              do {
                if (data[offset] === 255) {
                  if (data[offset + 1] !== 0) {
                    break;
                  }
                }
                offset += 1;
              } while (offset < data.length - 2);
            }
            bitsCount = 0;
            marker = data[offset] << 8 | data[offset + 1];
            if (marker < 65280) {
              throw new Error("marker was not found");
            }
            if (marker >= 65488 && marker <= 65495) {
              offset += 2;
            } else
              break;
          }
          return offset - startOffset;
        }
        function buildComponentData(frame, component) {
          var lines = [];
          var blocksPerLine = component.blocksPerLine;
          var blocksPerColumn = component.blocksPerColumn;
          var samplesPerLine = blocksPerLine << 3;
          var R = new Int32Array(64), r = new Uint8Array(64);
          function quantizeAndInverse(zz, dataOut, dataIn) {
            var qt = component.quantizationTable;
            var v0, v1, v2, v32, v4, v5, v6, v7, t;
            var p = dataIn;
            var i3;
            for (i3 = 0; i3 < 64; i3++)
              p[i3] = zz[i3] * qt[i3];
            for (i3 = 0; i3 < 8; ++i3) {
              var row = 8 * i3;
              if (p[1 + row] == 0 && p[2 + row] == 0 && p[3 + row] == 0 && p[4 + row] == 0 && p[5 + row] == 0 && p[6 + row] == 0 && p[7 + row] == 0) {
                t = dctSqrt2 * p[0 + row] + 512 >> 10;
                p[0 + row] = t;
                p[1 + row] = t;
                p[2 + row] = t;
                p[3 + row] = t;
                p[4 + row] = t;
                p[5 + row] = t;
                p[6 + row] = t;
                p[7 + row] = t;
                continue;
              }
              v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
              v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
              v2 = p[2 + row];
              v32 = p[6 + row];
              v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
              v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
              v5 = p[3 + row] << 4;
              v6 = p[5 + row] << 4;
              t = v0 - v1 + 1 >> 1;
              v0 = v0 + v1 + 1 >> 1;
              v1 = t;
              t = v2 * dctSin6 + v32 * dctCos6 + 128 >> 8;
              v2 = v2 * dctCos6 - v32 * dctSin6 + 128 >> 8;
              v32 = t;
              t = v4 - v6 + 1 >> 1;
              v4 = v4 + v6 + 1 >> 1;
              v6 = t;
              t = v7 + v5 + 1 >> 1;
              v5 = v7 - v5 + 1 >> 1;
              v7 = t;
              t = v0 - v32 + 1 >> 1;
              v0 = v0 + v32 + 1 >> 1;
              v32 = t;
              t = v1 - v2 + 1 >> 1;
              v1 = v1 + v2 + 1 >> 1;
              v2 = t;
              t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
              v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
              v7 = t;
              t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
              v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
              v6 = t;
              p[0 + row] = v0 + v7;
              p[7 + row] = v0 - v7;
              p[1 + row] = v1 + v6;
              p[6 + row] = v1 - v6;
              p[2 + row] = v2 + v5;
              p[5 + row] = v2 - v5;
              p[3 + row] = v32 + v4;
              p[4 + row] = v32 - v4;
            }
            for (i3 = 0; i3 < 8; ++i3) {
              var col = i3;
              if (p[1 * 8 + col] == 0 && p[2 * 8 + col] == 0 && p[3 * 8 + col] == 0 && p[4 * 8 + col] == 0 && p[5 * 8 + col] == 0 && p[6 * 8 + col] == 0 && p[7 * 8 + col] == 0) {
                t = dctSqrt2 * dataIn[i3 + 0] + 8192 >> 14;
                p[0 * 8 + col] = t;
                p[1 * 8 + col] = t;
                p[2 * 8 + col] = t;
                p[3 * 8 + col] = t;
                p[4 * 8 + col] = t;
                p[5 * 8 + col] = t;
                p[6 * 8 + col] = t;
                p[7 * 8 + col] = t;
                continue;
              }
              v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
              v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
              v2 = p[2 * 8 + col];
              v32 = p[6 * 8 + col];
              v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
              v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
              v5 = p[3 * 8 + col];
              v6 = p[5 * 8 + col];
              t = v0 - v1 + 1 >> 1;
              v0 = v0 + v1 + 1 >> 1;
              v1 = t;
              t = v2 * dctSin6 + v32 * dctCos6 + 2048 >> 12;
              v2 = v2 * dctCos6 - v32 * dctSin6 + 2048 >> 12;
              v32 = t;
              t = v4 - v6 + 1 >> 1;
              v4 = v4 + v6 + 1 >> 1;
              v6 = t;
              t = v7 + v5 + 1 >> 1;
              v5 = v7 - v5 + 1 >> 1;
              v7 = t;
              t = v0 - v32 + 1 >> 1;
              v0 = v0 + v32 + 1 >> 1;
              v32 = t;
              t = v1 - v2 + 1 >> 1;
              v1 = v1 + v2 + 1 >> 1;
              v2 = t;
              t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
              v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
              v7 = t;
              t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
              v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
              v6 = t;
              p[0 * 8 + col] = v0 + v7;
              p[7 * 8 + col] = v0 - v7;
              p[1 * 8 + col] = v1 + v6;
              p[6 * 8 + col] = v1 - v6;
              p[2 * 8 + col] = v2 + v5;
              p[5 * 8 + col] = v2 - v5;
              p[3 * 8 + col] = v32 + v4;
              p[4 * 8 + col] = v32 - v4;
            }
            for (i3 = 0; i3 < 64; ++i3) {
              var sample3 = 128 + (p[i3] + 8 >> 4);
              dataOut[i3] = sample3 < 0 ? 0 : sample3 > 255 ? 255 : sample3;
            }
          }
          requestMemoryAllocation(samplesPerLine * blocksPerColumn * 8);
          var i2, j;
          for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
            var scanLine = blockRow << 3;
            for (i2 = 0; i2 < 8; i2++)
              lines.push(new Uint8Array(samplesPerLine));
            for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
              quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
              var offset = 0, sample2 = blockCol << 3;
              for (j = 0; j < 8; j++) {
                var line = lines[scanLine + j];
                for (i2 = 0; i2 < 8; i2++)
                  line[sample2 + i2] = r[offset++];
              }
            }
          }
          return lines;
        }
        function clampTo8bit(a) {
          return a < 0 ? 0 : a > 255 ? 255 : a;
        }
        constructor.prototype = {
          load: function load(path) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = (function() {
              var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
              this.parse(data);
              if (this.onload)
                this.onload();
            }).bind(this);
            xhr.send(null);
          },
          parse: function parse(data) {
            var maxResolutionInPixels = this.opts.maxResolutionInMP * 1e3 * 1e3;
            var offset = 0, length2 = data.length;
            function readUint16() {
              var value = data[offset] << 8 | data[offset + 1];
              offset += 2;
              return value;
            }
            function readDataBlock() {
              var length3 = readUint16();
              var array = data.subarray(offset, offset + length3 - 2);
              offset += array.length;
              return array;
            }
            function prepareComponents(frame2) {
              var maxH2 = 1, maxV2 = 1;
              var component2, componentId2;
              for (componentId2 in frame2.components) {
                if (frame2.components.hasOwnProperty(componentId2)) {
                  component2 = frame2.components[componentId2];
                  if (maxH2 < component2.h) maxH2 = component2.h;
                  if (maxV2 < component2.v) maxV2 = component2.v;
                }
              }
              var mcusPerLine = Math.ceil(frame2.samplesPerLine / 8 / maxH2);
              var mcusPerColumn = Math.ceil(frame2.scanLines / 8 / maxV2);
              for (componentId2 in frame2.components) {
                if (frame2.components.hasOwnProperty(componentId2)) {
                  component2 = frame2.components[componentId2];
                  var blocksPerLine = Math.ceil(Math.ceil(frame2.samplesPerLine / 8) * component2.h / maxH2);
                  var blocksPerColumn = Math.ceil(Math.ceil(frame2.scanLines / 8) * component2.v / maxV2);
                  var blocksPerLineForMcu = mcusPerLine * component2.h;
                  var blocksPerColumnForMcu = mcusPerColumn * component2.v;
                  var blocksToAllocate = blocksPerColumnForMcu * blocksPerLineForMcu;
                  var blocks = [];
                  requestMemoryAllocation(blocksToAllocate * 256);
                  for (var i3 = 0; i3 < blocksPerColumnForMcu; i3++) {
                    var row = [];
                    for (var j2 = 0; j2 < blocksPerLineForMcu; j2++)
                      row.push(new Int32Array(64));
                    blocks.push(row);
                  }
                  component2.blocksPerLine = blocksPerLine;
                  component2.blocksPerColumn = blocksPerColumn;
                  component2.blocks = blocks;
                }
              }
              frame2.maxH = maxH2;
              frame2.maxV = maxV2;
              frame2.mcusPerLine = mcusPerLine;
              frame2.mcusPerColumn = mcusPerColumn;
            }
            var jfif = null;
            var adobe = null;
            var pixels = null;
            var frame, resetInterval;
            var quantizationTables = [], frames = [];
            var huffmanTablesAC = [], huffmanTablesDC = [];
            var fileMarker = readUint16();
            var malformedDataOffset = -1;
            this.comments = [];
            if (fileMarker != 65496) {
              throw new Error("SOI not found");
            }
            fileMarker = readUint16();
            while (fileMarker != 65497) {
              var i2, j, l;
              switch (fileMarker) {
                case 65280:
                  break;
                case 65504:
                // APP0 (Application Specific)
                case 65505:
                // APP1
                case 65506:
                // APP2
                case 65507:
                // APP3
                case 65508:
                // APP4
                case 65509:
                // APP5
                case 65510:
                // APP6
                case 65511:
                // APP7
                case 65512:
                // APP8
                case 65513:
                // APP9
                case 65514:
                // APP10
                case 65515:
                // APP11
                case 65516:
                // APP12
                case 65517:
                // APP13
                case 65518:
                // APP14
                case 65519:
                // APP15
                case 65534:
                  var appData = readDataBlock();
                  if (fileMarker === 65534) {
                    var comment = String.fromCharCode.apply(null, appData);
                    this.comments.push(comment);
                  }
                  if (fileMarker === 65504) {
                    if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                      jfif = {
                        version: { major: appData[5], minor: appData[6] },
                        densityUnits: appData[7],
                        xDensity: appData[8] << 8 | appData[9],
                        yDensity: appData[10] << 8 | appData[11],
                        thumbWidth: appData[12],
                        thumbHeight: appData[13],
                        thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                      };
                    }
                  }
                  if (fileMarker === 65505) {
                    if (appData[0] === 69 && appData[1] === 120 && appData[2] === 105 && appData[3] === 102 && appData[4] === 0) {
                      this.exifBuffer = appData.subarray(5, appData.length);
                    }
                  }
                  if (fileMarker === 65518) {
                    if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                      adobe = {
                        version: appData[6],
                        flags0: appData[7] << 8 | appData[8],
                        flags1: appData[9] << 8 | appData[10],
                        transformCode: appData[11]
                      };
                    }
                  }
                  break;
                case 65499:
                  var quantizationTablesLength = readUint16();
                  var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                  while (offset < quantizationTablesEnd) {
                    var quantizationTableSpec = data[offset++];
                    requestMemoryAllocation(64 * 4);
                    var tableData = new Int32Array(64);
                    if (quantizationTableSpec >> 4 === 0) {
                      for (j = 0; j < 64; j++) {
                        var z = dctZigZag[j];
                        tableData[z] = data[offset++];
                      }
                    } else if (quantizationTableSpec >> 4 === 1) {
                      for (j = 0; j < 64; j++) {
                        var z = dctZigZag[j];
                        tableData[z] = readUint16();
                      }
                    } else
                      throw new Error("DQT: invalid table spec");
                    quantizationTables[quantizationTableSpec & 15] = tableData;
                  }
                  break;
                case 65472:
                // SOF0 (Start of Frame, Baseline DCT)
                case 65473:
                // SOF1 (Start of Frame, Extended DCT)
                case 65474:
                  readUint16();
                  frame = {};
                  frame.extended = fileMarker === 65473;
                  frame.progressive = fileMarker === 65474;
                  frame.precision = data[offset++];
                  frame.scanLines = readUint16();
                  frame.samplesPerLine = readUint16();
                  frame.components = {};
                  frame.componentsOrder = [];
                  var pixelsInFrame = frame.scanLines * frame.samplesPerLine;
                  if (pixelsInFrame > maxResolutionInPixels) {
                    var exceededAmount = Math.ceil((pixelsInFrame - maxResolutionInPixels) / 1e6);
                    throw new Error(`maxResolutionInMP limit exceeded by ${exceededAmount}MP`);
                  }
                  var componentsCount = data[offset++], componentId;
                  var maxH = 0, maxV = 0;
                  for (i2 = 0; i2 < componentsCount; i2++) {
                    componentId = data[offset];
                    var h2 = data[offset + 1] >> 4;
                    var v = data[offset + 1] & 15;
                    var qId = data[offset + 2];
                    if (h2 <= 0 || v <= 0) {
                      throw new Error("Invalid sampling factor, expected values above 0");
                    }
                    frame.componentsOrder.push(componentId);
                    frame.components[componentId] = {
                      h: h2,
                      v,
                      quantizationIdx: qId
                    };
                    offset += 3;
                  }
                  prepareComponents(frame);
                  frames.push(frame);
                  break;
                case 65476:
                  var huffmanLength = readUint16();
                  for (i2 = 2; i2 < huffmanLength; ) {
                    var huffmanTableSpec = data[offset++];
                    var codeLengths = new Uint8Array(16);
                    var codeLengthSum = 0;
                    for (j = 0; j < 16; j++, offset++) {
                      codeLengthSum += codeLengths[j] = data[offset];
                    }
                    requestMemoryAllocation(16 + codeLengthSum);
                    var huffmanValues = new Uint8Array(codeLengthSum);
                    for (j = 0; j < codeLengthSum; j++, offset++)
                      huffmanValues[j] = data[offset];
                    i2 += 17 + codeLengthSum;
                    (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                  }
                  break;
                case 65501:
                  readUint16();
                  resetInterval = readUint16();
                  break;
                case 65500:
                  readUint16();
                  readUint16();
                  break;
                case 65498:
                  var scanLength = readUint16();
                  var selectorsCount = data[offset++];
                  var components = [], component;
                  for (i2 = 0; i2 < selectorsCount; i2++) {
                    component = frame.components[data[offset++]];
                    var tableSpec = data[offset++];
                    component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                    component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                    components.push(component);
                  }
                  var spectralStart = data[offset++];
                  var spectralEnd = data[offset++];
                  var successiveApproximation = data[offset++];
                  var processed = decodeScan(
                    data,
                    offset,
                    frame,
                    components,
                    resetInterval,
                    spectralStart,
                    spectralEnd,
                    successiveApproximation >> 4,
                    successiveApproximation & 15,
                    this.opts
                  );
                  offset += processed;
                  break;
                case 65535:
                  if (data[offset] !== 255) {
                    offset--;
                  }
                  break;
                default:
                  if (data[offset - 3] == 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                    offset -= 3;
                    break;
                  } else if (fileMarker === 224 || fileMarker == 225) {
                    if (malformedDataOffset !== -1) {
                      throw new Error(`first unknown JPEG marker at offset ${malformedDataOffset.toString(16)}, second unknown JPEG marker ${fileMarker.toString(16)} at offset ${(offset - 1).toString(16)}`);
                    }
                    malformedDataOffset = offset - 1;
                    const nextOffset = readUint16();
                    if (data[offset + nextOffset - 2] === 255) {
                      offset += nextOffset - 2;
                      break;
                    }
                  }
                  throw new Error("unknown JPEG marker " + fileMarker.toString(16));
              }
              fileMarker = readUint16();
            }
            if (frames.length != 1)
              throw new Error("only single frame JPEGs supported");
            for (var i2 = 0; i2 < frames.length; i2++) {
              var cp = frames[i2].components;
              for (var j in cp) {
                cp[j].quantizationTable = quantizationTables[cp[j].quantizationIdx];
                delete cp[j].quantizationIdx;
              }
            }
            this.width = frame.samplesPerLine;
            this.height = frame.scanLines;
            this.jfif = jfif;
            this.adobe = adobe;
            this.components = [];
            for (var i2 = 0; i2 < frame.componentsOrder.length; i2++) {
              var component = frame.components[frame.componentsOrder[i2]];
              this.components.push({
                lines: buildComponentData(frame, component),
                scaleX: component.h / frame.maxH,
                scaleY: component.v / frame.maxV
              });
            }
          },
          getData: function getData(width, height) {
            var scaleX = this.width / width, scaleY = this.height / height;
            var component1, component2, component3, component4;
            var component1Line, component2Line, component3Line, component4Line;
            var x2, y;
            var offset = 0;
            var Y, Cb, Cr, K, C, M, Ye, R, G, B;
            var colorTransform;
            var dataLength = width * height * this.components.length;
            requestMemoryAllocation(dataLength);
            var data = new Uint8Array(dataLength);
            switch (this.components.length) {
              case 1:
                component1 = this.components[0];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  for (x2 = 0; x2 < width; x2++) {
                    Y = component1Line[0 | x2 * component1.scaleX * scaleX];
                    data[offset++] = Y;
                  }
                }
                break;
              case 2:
                component1 = this.components[0];
                component2 = this.components[1];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  for (x2 = 0; x2 < width; x2++) {
                    Y = component1Line[0 | x2 * component1.scaleX * scaleX];
                    data[offset++] = Y;
                    Y = component2Line[0 | x2 * component2.scaleX * scaleX];
                    data[offset++] = Y;
                  }
                }
                break;
              case 3:
                colorTransform = true;
                if (this.adobe && this.adobe.transformCode)
                  colorTransform = true;
                else if (typeof this.opts.colorTransform !== "undefined")
                  colorTransform = !!this.opts.colorTransform;
                component1 = this.components[0];
                component2 = this.components[1];
                component3 = this.components[2];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
                  for (x2 = 0; x2 < width; x2++) {
                    if (!colorTransform) {
                      R = component1Line[0 | x2 * component1.scaleX * scaleX];
                      G = component2Line[0 | x2 * component2.scaleX * scaleX];
                      B = component3Line[0 | x2 * component3.scaleX * scaleX];
                    } else {
                      Y = component1Line[0 | x2 * component1.scaleX * scaleX];
                      Cb = component2Line[0 | x2 * component2.scaleX * scaleX];
                      Cr = component3Line[0 | x2 * component3.scaleX * scaleX];
                      R = clampTo8bit(Y + 1.402 * (Cr - 128));
                      G = clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                      B = clampTo8bit(Y + 1.772 * (Cb - 128));
                    }
                    data[offset++] = R;
                    data[offset++] = G;
                    data[offset++] = B;
                  }
                }
                break;
              case 4:
                if (!this.adobe)
                  throw new Error("Unsupported color mode (4 components)");
                colorTransform = false;
                if (this.adobe && this.adobe.transformCode)
                  colorTransform = true;
                else if (typeof this.opts.colorTransform !== "undefined")
                  colorTransform = !!this.opts.colorTransform;
                component1 = this.components[0];
                component2 = this.components[1];
                component3 = this.components[2];
                component4 = this.components[3];
                for (y = 0; y < height; y++) {
                  component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
                  component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
                  component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
                  component4Line = component4.lines[0 | y * component4.scaleY * scaleY];
                  for (x2 = 0; x2 < width; x2++) {
                    if (!colorTransform) {
                      C = component1Line[0 | x2 * component1.scaleX * scaleX];
                      M = component2Line[0 | x2 * component2.scaleX * scaleX];
                      Ye = component3Line[0 | x2 * component3.scaleX * scaleX];
                      K = component4Line[0 | x2 * component4.scaleX * scaleX];
                    } else {
                      Y = component1Line[0 | x2 * component1.scaleX * scaleX];
                      Cb = component2Line[0 | x2 * component2.scaleX * scaleX];
                      Cr = component3Line[0 | x2 * component3.scaleX * scaleX];
                      K = component4Line[0 | x2 * component4.scaleX * scaleX];
                      C = 255 - clampTo8bit(Y + 1.402 * (Cr - 128));
                      M = 255 - clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                      Ye = 255 - clampTo8bit(Y + 1.772 * (Cb - 128));
                    }
                    data[offset++] = 255 - C;
                    data[offset++] = 255 - M;
                    data[offset++] = 255 - Ye;
                    data[offset++] = 255 - K;
                  }
                }
                break;
              default:
                throw new Error("Unsupported color mode");
            }
            return data;
          },
          copyToImageData: function copyToImageData(imageData, formatAsRGBA) {
            var width = imageData.width, height = imageData.height;
            var imageDataArray = imageData.data;
            var data = this.getData(width, height);
            var i2 = 0, j = 0, x2, y;
            var Y, K, C, M, R, G, B;
            switch (this.components.length) {
              case 1:
                for (y = 0; y < height; y++) {
                  for (x2 = 0; x2 < width; x2++) {
                    Y = data[i2++];
                    imageDataArray[j++] = Y;
                    imageDataArray[j++] = Y;
                    imageDataArray[j++] = Y;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              case 3:
                for (y = 0; y < height; y++) {
                  for (x2 = 0; x2 < width; x2++) {
                    R = data[i2++];
                    G = data[i2++];
                    B = data[i2++];
                    imageDataArray[j++] = R;
                    imageDataArray[j++] = G;
                    imageDataArray[j++] = B;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              case 4:
                for (y = 0; y < height; y++) {
                  for (x2 = 0; x2 < width; x2++) {
                    C = data[i2++];
                    M = data[i2++];
                    Y = data[i2++];
                    K = data[i2++];
                    R = 255 - clampTo8bit(C * (1 - K / 255) + K);
                    G = 255 - clampTo8bit(M * (1 - K / 255) + K);
                    B = 255 - clampTo8bit(Y * (1 - K / 255) + K);
                    imageDataArray[j++] = R;
                    imageDataArray[j++] = G;
                    imageDataArray[j++] = B;
                    if (formatAsRGBA) {
                      imageDataArray[j++] = 255;
                    }
                  }
                }
                break;
              default:
                throw new Error("Unsupported color mode");
            }
          }
        };
        var totalBytesAllocated = 0;
        var maxMemoryUsageBytes = 0;
        function requestMemoryAllocation(increaseAmount = 0) {
          var totalMemoryImpactBytes = totalBytesAllocated + increaseAmount;
          if (totalMemoryImpactBytes > maxMemoryUsageBytes) {
            var exceededAmount = Math.ceil((totalMemoryImpactBytes - maxMemoryUsageBytes) / 1024 / 1024);
            throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${exceededAmount}MB`);
          }
          totalBytesAllocated = totalMemoryImpactBytes;
        }
        constructor.resetMaxMemoryUsage = function(maxMemoryUsageBytes_) {
          totalBytesAllocated = 0;
          maxMemoryUsageBytes = maxMemoryUsageBytes_;
        };
        constructor.getBytesAllocated = function() {
          return totalBytesAllocated;
        };
        constructor.requestMemoryAllocation = requestMemoryAllocation;
        return constructor;
      })();
      if (typeof module !== "undefined") {
        module.exports = decode2;
      } else if (typeof window !== "undefined") {
        window["jpeg-js"] = window["jpeg-js"] || {};
        window["jpeg-js"].decode = decode2;
      }
      function decode2(jpegData, userOpts = {}) {
        var defaultOpts = {
          // "undefined" means "Choose whether to transform colors based on the image’s color model."
          colorTransform: void 0,
          useTArray: false,
          formatAsRGBA: true,
          tolerantDecoding: true,
          maxResolutionInMP: 100,
          // Don't decode more than 100 megapixels
          maxMemoryUsageInMB: 512
          // Don't decode if memory footprint is more than 512MB
        };
        var opts = { ...defaultOpts, ...userOpts };
        var arr = new Uint8Array(jpegData);
        var decoder = new JpegImage();
        decoder.opts = opts;
        JpegImage.resetMaxMemoryUsage(opts.maxMemoryUsageInMB * 1024 * 1024);
        decoder.parse(arr);
        var channels = opts.formatAsRGBA ? 4 : 3;
        var bytesNeeded = decoder.width * decoder.height * channels;
        try {
          JpegImage.requestMemoryAllocation(bytesNeeded);
          var image = {
            width: decoder.width,
            height: decoder.height,
            exifBuffer: decoder.exifBuffer,
            data: opts.useTArray ? new Uint8Array(bytesNeeded) : Buffer.alloc(bytesNeeded)
          };
          if (decoder.comments.length > 0) {
            image["comments"] = decoder.comments;
          }
        } catch (err2) {
          if (err2 instanceof RangeError) {
            throw new Error("Could not allocate enough memory for the image. Required: " + bytesNeeded);
          }
          if (err2 instanceof ReferenceError) {
            if (err2.message === "Buffer is not defined") {
              throw new Error("Buffer is not globally defined in this environment. Consider setting useTArray to true");
            }
          }
          throw err2;
        }
        decoder.copyToImageData(image, opts.formatAsRGBA);
        return image;
      }
    }
  });

  // node_modules/jpeg-js/index.js
  var require_jpeg_js = __commonJS({
    "node_modules/jpeg-js/index.js"(exports, module) {
      var encode2 = require_encoder();
      var decode2 = require_decoder();
      module.exports = {
        encode: encode2,
        decode: decode2
      };
    }
  });

  // node_modules/hull.js/src/intersect.js
  var require_intersect = __commonJS({
    "node_modules/hull.js/src/intersect.js"(exports, module) {
      function ccw(x1, y1, x2, y2, x3, y3) {
        var cw = (y3 - y1) * (x2 - x1) - (y2 - y1) * (x3 - x1);
        return cw > 0 ? true : cw < 0 ? false : true;
      }
      function intersect(seg1, seg2) {
        var x1 = seg1[0][0], y1 = seg1[0][1], x2 = seg1[1][0], y2 = seg1[1][1], x3 = seg2[0][0], y3 = seg2[0][1], x4 = seg2[1][0], y4 = seg2[1][1];
        return ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) && ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4);
      }
      module.exports = intersect;
    }
  });

  // node_modules/hull.js/src/grid.js
  var require_grid = __commonJS({
    "node_modules/hull.js/src/grid.js"(exports, module) {
      function Grid(points, cellSize) {
        this._cells = [];
        this._cellSize = cellSize;
        points.forEach(function(point2) {
          var cellXY = this.point2CellXY(point2), x2 = cellXY[0], y = cellXY[1];
          if (this._cells[x2] === void 0) {
            this._cells[x2] = [];
          }
          if (this._cells[x2][y] === void 0) {
            this._cells[x2][y] = [];
          }
          this._cells[x2][y].push(point2);
        }, this);
      }
      Grid.prototype = {
        cellPoints: function(x2, y) {
          return this._cells[x2] !== void 0 && this._cells[x2][y] !== void 0 ? this._cells[x2][y] : [];
        },
        rangePoints: function(bbox) {
          var tlCellXY = this.point2CellXY([bbox[0], bbox[1]]), brCellXY = this.point2CellXY([bbox[2], bbox[3]]), points = [];
          for (var x2 = tlCellXY[0]; x2 <= brCellXY[0]; x2++) {
            for (var y = tlCellXY[1]; y <= brCellXY[1]; y++) {
              points = points.concat(this.cellPoints(x2, y));
            }
          }
          return points;
        },
        removePoint: function(point2) {
          var cellXY = this.point2CellXY(point2), cell = this._cells[cellXY[0]][cellXY[1]], pointIdxInCell;
          for (var i2 = 0; i2 < cell.length; i2++) {
            if (cell[i2][0] === point2[0] && cell[i2][1] === point2[1]) {
              pointIdxInCell = i2;
              break;
            }
          }
          cell.splice(pointIdxInCell, 1);
          return cell;
        },
        point2CellXY: function(point2) {
          var x2 = parseInt(point2[0] / this._cellSize), y = parseInt(point2[1] / this._cellSize);
          return [x2, y];
        },
        extendBbox: function(bbox, scaleFactor) {
          return [
            bbox[0] - scaleFactor * this._cellSize,
            bbox[1] - scaleFactor * this._cellSize,
            bbox[2] + scaleFactor * this._cellSize,
            bbox[3] + scaleFactor * this._cellSize
          ];
        }
      };
      function grid(points, cellSize) {
        return new Grid(points, cellSize);
      }
      module.exports = grid;
    }
  });

  // node_modules/hull.js/src/format.js
  var require_format = __commonJS({
    "node_modules/hull.js/src/format.js"(exports, module) {
      module.exports = {
        toXy: function(pointset, format) {
          if (format === void 0) {
            return pointset.slice();
          }
          return pointset.map(function(pt) {
            var _getXY = new Function("pt", "return [pt" + format[0] + ",pt" + format[1] + "];");
            return _getXY(pt);
          });
        },
        fromXy: function(pointset, format) {
          if (format === void 0) {
            return pointset.slice();
          }
          return pointset.map(function(pt) {
            var _getObj = new Function("pt", "var o = {}; o" + format[0] + "= pt[0]; o" + format[1] + "= pt[1]; return o;");
            return _getObj(pt);
          });
        }
      };
    }
  });

  // node_modules/hull.js/src/convex.js
  var require_convex = __commonJS({
    "node_modules/hull.js/src/convex.js"(exports, module) {
      function _cross(o, a, b) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      }
      function _upperTangent(pointset) {
        var lower = [];
        for (var l = 0; l < pointset.length; l++) {
          while (lower.length >= 2 && _cross(lower[lower.length - 2], lower[lower.length - 1], pointset[l]) <= 0) {
            lower.pop();
          }
          lower.push(pointset[l]);
        }
        lower.pop();
        return lower;
      }
      function _lowerTangent(pointset) {
        var reversed = pointset.reverse(), upper = [];
        for (var u = 0; u < reversed.length; u++) {
          while (upper.length >= 2 && _cross(upper[upper.length - 2], upper[upper.length - 1], reversed[u]) <= 0) {
            upper.pop();
          }
          upper.push(reversed[u]);
        }
        upper.pop();
        return upper;
      }
      function convex(pointset) {
        var convex2, upper = _upperTangent(pointset), lower = _lowerTangent(pointset);
        convex2 = lower.concat(upper);
        convex2.push(pointset[0]);
        return convex2;
      }
      module.exports = convex;
    }
  });

  // node_modules/hull.js/src/hull.js
  var require_hull = __commonJS({
    "node_modules/hull.js/src/hull.js"(exports, module) {
      "use strict";
      var intersect = require_intersect();
      var grid = require_grid();
      var formatUtil = require_format();
      var convexHull = require_convex();
      function _filterDuplicates(pointset) {
        return pointset.filter(function(el, idx, arr) {
          var prevEl = arr[idx - 1];
          return idx === 0 || !(prevEl[0] === el[0] && prevEl[1] === el[1]);
        });
      }
      function _sortByX(pointset) {
        return pointset.sort(function(a, b) {
          if (a[0] == b[0]) {
            return a[1] - b[1];
          } else {
            return a[0] - b[0];
          }
        });
      }
      function _sqLength(a, b) {
        return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
      }
      function _cos(o, a, b) {
        var aShifted = [a[0] - o[0], a[1] - o[1]], bShifted = [b[0] - o[0], b[1] - o[1]], sqALen = _sqLength(o, a), sqBLen = _sqLength(o, b), dot = aShifted[0] * bShifted[0] + aShifted[1] * bShifted[1];
        return dot / Math.sqrt(sqALen * sqBLen);
      }
      function _intersect(segment, pointset) {
        for (var i2 = 0; i2 < pointset.length - 1; i2++) {
          var seg = [pointset[i2], pointset[i2 + 1]];
          if (segment[0][0] === seg[0][0] && segment[0][1] === seg[0][1] || segment[0][0] === seg[1][0] && segment[0][1] === seg[1][1]) {
            continue;
          }
          if (intersect(segment, seg)) {
            return true;
          }
        }
        return false;
      }
      function _occupiedArea(pointset) {
        var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (var i2 = pointset.length - 1; i2 >= 0; i2--) {
          if (pointset[i2][0] < minX) {
            minX = pointset[i2][0];
          }
          if (pointset[i2][1] < minY) {
            minY = pointset[i2][1];
          }
          if (pointset[i2][0] > maxX) {
            maxX = pointset[i2][0];
          }
          if (pointset[i2][1] > maxY) {
            maxY = pointset[i2][1];
          }
        }
        return [
          maxX - minX,
          // width
          maxY - minY
          // height
        ];
      }
      function _bBoxAround(edge) {
        return [
          Math.min(edge[0][0], edge[1][0]),
          // left
          Math.min(edge[0][1], edge[1][1]),
          // top
          Math.max(edge[0][0], edge[1][0]),
          // right
          Math.max(edge[0][1], edge[1][1])
          // bottom
        ];
      }
      function _midPoint(edge, innerPoints, convex) {
        var point2 = null, angle1Cos = MAX_CONCAVE_ANGLE_COS, angle2Cos = MAX_CONCAVE_ANGLE_COS, a1Cos, a2Cos;
        for (var i2 = 0; i2 < innerPoints.length; i2++) {
          a1Cos = _cos(edge[0], edge[1], innerPoints[i2]);
          a2Cos = _cos(edge[1], edge[0], innerPoints[i2]);
          if (a1Cos > angle1Cos && a2Cos > angle2Cos && !_intersect([edge[0], innerPoints[i2]], convex) && !_intersect([edge[1], innerPoints[i2]], convex)) {
            angle1Cos = a1Cos;
            angle2Cos = a2Cos;
            point2 = innerPoints[i2];
          }
        }
        return point2;
      }
      function _concave(convex, maxSqEdgeLen, maxSearchArea, grid2, edgeSkipList) {
        var edge, keyInSkipList, scaleFactor, midPoint, bBoxAround, bBoxWidth, bBoxHeight, midPointInserted = false;
        for (var i2 = 0; i2 < convex.length - 1; i2++) {
          edge = [convex[i2], convex[i2 + 1]];
          keyInSkipList = edge[0].join() + "," + edge[1].join();
          if (_sqLength(edge[0], edge[1]) < maxSqEdgeLen || edgeSkipList[keyInSkipList] === true) {
            continue;
          }
          scaleFactor = 0;
          bBoxAround = _bBoxAround(edge);
          do {
            bBoxAround = grid2.extendBbox(bBoxAround, scaleFactor);
            bBoxWidth = bBoxAround[2] - bBoxAround[0];
            bBoxHeight = bBoxAround[3] - bBoxAround[1];
            midPoint = _midPoint(edge, grid2.rangePoints(bBoxAround), convex);
            scaleFactor++;
          } while (midPoint === null && (maxSearchArea[0] > bBoxWidth || maxSearchArea[1] > bBoxHeight));
          if (bBoxWidth >= maxSearchArea[0] && bBoxHeight >= maxSearchArea[1]) {
            edgeSkipList[keyInSkipList] = true;
          }
          if (midPoint !== null) {
            convex.splice(i2 + 1, 0, midPoint);
            grid2.removePoint(midPoint);
            midPointInserted = true;
          }
        }
        if (midPointInserted) {
          return _concave(convex, maxSqEdgeLen, maxSearchArea, grid2, edgeSkipList);
        }
        return convex;
      }
      function hull2(pointset, concavity, format) {
        var convex, concave, innerPoints, occupiedArea, maxSearchArea, cellSize, points, maxEdgeLen = concavity || 20;
        if (pointset.length < 4) {
          return pointset.slice();
        }
        points = _filterDuplicates(_sortByX(formatUtil.toXy(pointset, format)));
        occupiedArea = _occupiedArea(points);
        maxSearchArea = [
          occupiedArea[0] * MAX_SEARCH_BBOX_SIZE_PERCENT,
          occupiedArea[1] * MAX_SEARCH_BBOX_SIZE_PERCENT
        ];
        convex = convexHull(points);
        innerPoints = points.filter(function(pt) {
          return convex.indexOf(pt) < 0;
        });
        cellSize = Math.ceil(1 / (points.length / (occupiedArea[0] * occupiedArea[1])));
        concave = _concave(
          convex,
          Math.pow(maxEdgeLen, 2),
          maxSearchArea,
          grid(innerPoints, cellSize),
          {}
        );
        return formatUtil.fromXy(concave, format);
      }
      var MAX_CONCAVE_ANGLE_COS = Math.cos(90 / (180 / Math.PI));
      var MAX_SEARCH_BBOX_SIZE_PERCENT = 0.6;
      module.exports = hull2;
    }
  });

  // spre-worker:spre:compositor-worker
  var spre_compositor_worker_default = 'var Jn=Object.create;var gn=Object.defineProperty;var ea=Object.getOwnPropertyDescriptor;var ra=Object.getOwnPropertyNames;var ta=Object.getPrototypeOf,na=Object.prototype.hasOwnProperty;var aa=(f,e)=>()=>{try{return e||f((e={exports:{}}).exports,e),e.exports}catch(o){throw e=0,o}};var ia=(f,e,o,c)=>{if(e&&typeof e=="object"||typeof e=="function")for(let m of ra(e))!na.call(f,m)&&m!==o&&gn(f,m,{get:()=>e[m],enumerable:!(c=ea(e,m))||c.enumerable});return f};var oa=(f,e,o)=>(o=f!=null?Jn(ta(f)):{},ia(e||!f||!f.__esModule?gn(o,"default",{value:f,enumerable:!0}):o,f));var wn=aa((Rt,ln)=>{(function(e,o){typeof Rt=="object"&&typeof ln=="object"?ln.exports=o():typeof define=="function"&&define.amd?define([],o):typeof Rt=="object"?Rt.twgl=o():e.twgl=o()})(typeof self<"u"?self:Rt,function(){return(function(f){var e={};function o(c){if(e[c])return e[c].exports;var m=e[c]={i:c,l:!1,exports:{}};return f[c].call(m.exports,m,m.exports,o),m.l=!0,m.exports}return o.m=f,o.c=e,o.d=function(c,m,T){o.o(c,m)||Object.defineProperty(c,m,{enumerable:!0,get:T})},o.r=function(c){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(c,"__esModule",{value:!0})},o.t=function(c,m){if(m&1&&(c=o(c)),m&8||m&4&&typeof c=="object"&&c&&c.__esModule)return c;var T=Object.create(null);if(o.r(T),Object.defineProperty(T,"default",{enumerable:!0,value:c}),m&2&&typeof c!="string")for(var x in c)o.d(T,x,function(b){return c[b]}.bind(null,x));return T},o.n=function(c){var m=c&&c.__esModule?function(){return c.default}:function(){return c};return o.d(m,"a",m),m},o.o=function(c,m){return Object.prototype.hasOwnProperty.call(c,m)},o.p="",o(o.s="./src/twgl-full.js")})({"./src/attributes.js":(function(f,e,o){"use strict";function c(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(v){return typeof v}:c=function(v){return v&&typeof Symbol=="function"&&v.constructor===Symbol&&v!==Symbol.prototype?"symbol":typeof v},c(t)}e.__esModule=!0,e.createAttribsFromArrays=Xe,e.createBuffersFromArrays=r,e.createBufferFromArray=yr,e.createBufferFromTypedArray=ge,e.createBufferInfoFromArrays=wr,e.setAttribInfoBufferFromArray=De,e.setAttributePrefix=_e,e.setAttributeDefaults_=ze,e.getNumComponents_=Be,e.getArray_=w;var m=b(o("./src/typedarrays.js")),T=b(o("./src/helper.js"));function x(){if(typeof WeakMap!="function")return null;var t=new WeakMap;return x=function(){return t},t}function b(t){if(t&&t.__esModule)return t;if(t===null||c(t)!=="object"&&typeof t!="function")return{default:t};var n=x();if(n&&n.has(t))return n.get(t);var v={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in t)if(Object.prototype.hasOwnProperty.call(t,_)){var R=d?Object.getOwnPropertyDescriptor(t,_):null;R&&(R.get||R.set)?Object.defineProperty(v,_,R):v[_]=t[_]}return v.default=t,n&&n.set(t,v),v}var S=35044,G=34962,z=34963,y=34660,M=5120,I=5121,C=5122,N=5123,ee=5124,Me=5125,Ee=5126,xe=void 0,Ie={attribPrefix:""};function _e(t){Ie.attribPrefix=t}function ze(t){T.copyExistingProperties(t,Ie)}function de(t,n,v,d,_){t.bindBuffer(n,v),t.bufferData(n,d,_||S)}function ge(t,n,v,d){if(T.isBuffer(t,n))return n;v=v||G;var _=t.createBuffer();return de(t,v,_,n,d),_}function A(t){return t==="indices"}function F(t){return t instanceof Int8Array||t instanceof Uint8Array}function D(t){return t===Int8Array||t===Uint8Array}function w(t){return t.length?t:t.data}var re=/coord|texture/i,fe=/color|colour/i;function Te(t,n){var v;if(re.test(t)?v=2:fe.test(t)?v=4:v=3,n%v>0)throw new Error("Can not guess numComponents for attribute \'".concat(t,"\'. Tried ").concat(v," but ").concat(n," values is not evenly divisible by ").concat(v,". You should specify it."));return v}function Be(t,n){return t.numComponents||t.size||Te(n,w(t).length)}function Pe(t,n){if(m.isArrayBuffer(t))return t;if(m.isArrayBuffer(t.data))return t.data;Array.isArray(t)&&(t={data:t});var v=t.type;return v||(A(n)?v=Uint16Array:v=Float32Array),new v(t.data)}function Xe(t,n){var v={};return Object.keys(n).forEach(function(d){if(!A(d)){var _=n[d],R=_.attrib||_.name||_.attribName||Ie.attribPrefix+d;if(_.value){if(!Array.isArray(_.value)&&!m.isArrayBuffer(_.value))throw new Error("array.value is not array or typedarray");v[R]={value:_.value}}else{var Z,J,ne,te;if(_.buffer&&_.buffer instanceof WebGLBuffer)Z=_.buffer,te=_.numComponents||_.size,J=_.type,ne=_.normalize;else if(typeof _=="number"||typeof _.data=="number"){var Q=_.data||_,$=_.type||Float32Array,Ae=Q*$.BYTES_PER_ELEMENT;J=m.getGLTypeForTypedArrayType($),ne=_.normalize!==void 0?_.normalize:D($),te=_.numComponents||_.size||Te(d,Q),Z=t.createBuffer(),t.bindBuffer(G,Z),t.bufferData(G,Ae,_.drawType||S)}else{var ye=Pe(_,d);Z=ge(t,ye,void 0,_.drawType),J=m.getGLTypeForTypedArray(ye),ne=_.normalize!==void 0?_.normalize:F(ye),te=Be(_,d)}v[R]={buffer:Z,numComponents:te,type:J,normalize:ne,stride:_.stride||0,offset:_.offset||0,divisor:_.divisor===void 0?void 0:_.divisor,drawType:_.drawType}}}}),t.bindBuffer(G,null),v}function De(t,n,v,d){v=Pe(v),d!==void 0?(t.bindBuffer(G,n.buffer),t.bufferSubData(G,d,v)):de(t,G,n.buffer,v,n.drawType)}function er(t,n){return n===M||n===I?1:n===C||n===N?2:n===ee||n===Me||n===Ee?4:0}var je=["position","positions","a_position"];function Ne(t){var n,v;for(v=0;v<je.length&&(n=je[v],!(n in t));++v);v===je.length&&(n=Object.keys(t)[0]);var d=t[n],_=w(d).length;if(_===void 0)return 1;var R=Be(d,n),Z=_/R;if(_%R>0)throw new Error("numComponents ".concat(R," not correct for length ").concat(_));return Z}function He(t,n){var v,d;for(d=0;d<je.length&&(v=je[d],!(v in n||(v=Ie.attribPrefix+v,v in n)));++d);d===je.length&&(v=Object.keys(n)[0]);var _=n[v];if(!_.buffer)return 1;t.bindBuffer(G,_.buffer);var R=t.getBufferParameter(G,y);t.bindBuffer(G,null);var Z=er(t,_.type),J=R/Z,ne=_.numComponents||_.size,te=J/ne;if(te%1!==0)throw new Error("numComponents ".concat(ne," not correct for length ").concat(length));return te}function wr(t,n,v){var d=Xe(t,n),_=Object.assign({},v||{});_.attribs=Object.assign({},v?v.attribs:{},d);var R=n.indices;if(R){var Z=Pe(R,"indices");_.indices=ge(t,Z,z),_.numElements=Z.length,_.elementType=m.getGLTypeForTypedArray(Z)}else _.numElements||(_.numElements=He(t,_.attribs));return _}function yr(t,n,v){var d=v==="indices"?z:G,_=Pe(n,v);return ge(t,_,d)}function r(t,n){var v={};return Object.keys(n).forEach(function(d){v[d]=yr(t,n[d],d)}),n.indices?(v.numElements=n.indices.length,v.elementType=m.getGLTypeForTypedArray(Pe(n.indices),"indices")):v.numElements=Ne(n),v}}),"./src/draw.js":(function(f,e,o){"use strict";function c(y){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(I){return typeof I}:c=function(I){return I&&typeof Symbol=="function"&&I.constructor===Symbol&&I!==Symbol.prototype?"symbol":typeof I},c(y)}e.__esModule=!0,e.drawBufferInfo=G,e.drawObjectList=z;var m=x(o("./src/programs.js"));function T(){if(typeof WeakMap!="function")return null;var y=new WeakMap;return T=function(){return y},y}function x(y){if(y&&y.__esModule)return y;if(y===null||c(y)!=="object"&&typeof y!="function")return{default:y};var M=T();if(M&&M.has(y))return M.get(y);var I={},C=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var N in y)if(Object.prototype.hasOwnProperty.call(y,N)){var ee=C?Object.getOwnPropertyDescriptor(y,N):null;ee&&(ee.get||ee.set)?Object.defineProperty(I,N,ee):I[N]=y[N]}return I.default=y,M&&M.set(y,I),I}var b=4,S=5123;function G(y,M,I,C,N,ee){I=I===void 0?b:I;var Me=M.indices,Ee=M.elementType,xe=C===void 0?M.numElements:C;N=N===void 0?0:N,Ee||Me?ee!==void 0?y.drawElementsInstanced(I,xe,Ee===void 0?S:M.elementType,N,ee):y.drawElements(I,xe,Ee===void 0?S:M.elementType,N):ee!==void 0?y.drawArraysInstanced(I,N,xe,ee):y.drawArrays(I,N,xe)}function z(y,M){var I=null,C=null;M.forEach(function(N){if(N.active!==!1){var ee=N.programInfo,Me=N.vertexArrayInfo||N.bufferInfo,Ee=!1,xe=N.type===void 0?b:N.type;ee!==I&&(I=ee,y.useProgram(ee.program),Ee=!0),(Ee||Me!==C)&&(C&&C.vertexArrayObject&&!Me.vertexArrayObject&&y.bindVertexArray(null),C=Me,m.setBuffersAndAttributes(y,ee,Me)),m.setUniforms(ee,N.uniforms),G(y,Me,xe,N.count,N.offset,N.instanceCount)}}),C&&C.vertexArrayObject&&y.bindVertexArray(null)}}),"./src/framebuffers.js":(function(f,e,o){"use strict";function c(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(n){return typeof n}:c=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},c(r)}e.__esModule=!0,e.bindFramebufferInfo=yr,e.createFramebufferInfo=He,e.resizeFramebufferInfo=wr;var m=b(o("./src/textures.js")),T=b(o("./src/helper.js"));function x(){if(typeof WeakMap!="function")return null;var r=new WeakMap;return x=function(){return r},r}function b(r){if(r&&r.__esModule)return r;if(r===null||c(r)!=="object"&&typeof r!="function")return{default:r};var t=x();if(t&&t.has(r))return t.get(r);var n={},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in r)if(Object.prototype.hasOwnProperty.call(r,d)){var _=v?Object.getOwnPropertyDescriptor(r,d):null;_&&(_.get||_.set)?Object.defineProperty(n,d,_):n[d]=r[d]}return n.default=r,t&&t.set(r,n),n}var S=void 0,G=36160,z=36161,y=3553,M=5121,I=6402,C=6408,N=33190,ee=36012,Me=35056,Ee=36013,xe=32854,Ie=32855,_e=36194,ze=33189,de=6401,ge=36168,A=34041,F=36064,D=36096,w=36128,re=33306,fe=33071,Te=9729,Be=[{format:C,type:M,min:Te,wrap:fe},{format:A}],Pe={};Pe[A]=re,Pe[de]=w,Pe[ge]=w,Pe[I]=D,Pe[ze]=D,Pe[N]=D,Pe[ee]=D,Pe[Me]=re,Pe[Ee]=re;function Xe(r,t){return Pe[r]||Pe[t]}var De={};De[xe]=!0,De[Ie]=!0,De[_e]=!0,De[A]=!0,De[ze]=!0,De[de]=!0,De[ge]=!0;function er(r){return De[r]}var je=32;function Ne(r){return r>=F&&r<F+je}function He(r,t,n,v){var d=G,_=r.createFramebuffer();r.bindFramebuffer(d,_),n=n||r.drawingBufferWidth,v=v||r.drawingBufferHeight,t=t||Be;var R=[],Z={framebuffer:_,attachments:[],width:n,height:v};return t.forEach(function(J,ne){var te=J.attachment,Q=J.samples,$=J.format,Ae=J.attachmentPoint||Xe($,J.internalFormat);if(Ae||(Ae=F+ne),Ne(Ae)&&R.push(Ae),!te)if(Q!==void 0||er($))te=r.createRenderbuffer(),r.bindRenderbuffer(z,te),Q>1?r.renderbufferStorageMultisample(z,Q,$,n,v):r.renderbufferStorage(z,$,n,v);else{var ye=Object.assign({},J);ye.width=n,ye.height=v,ye.auto===void 0&&(ye.auto=!1,ye.min=ye.min||ye.minMag||Te,ye.mag=ye.mag||ye.minMag||Te,ye.wrapS=ye.wrapS||ye.wrap||fe,ye.wrapT=ye.wrapT||ye.wrap||fe),te=m.createTexture(r,ye)}if(T.isRenderbuffer(r,te))r.framebufferRenderbuffer(d,Ae,z,te);else if(T.isTexture(r,te))J.layer!==void 0?r.framebufferTextureLayer(d,Ae,te,J.level||0,J.layer):r.framebufferTexture2D(d,Ae,J.target||y,te,J.level||0);else throw new Error("unknown attachment type");Z.attachments.push(te)}),r.drawBuffers&&r.drawBuffers(R),Z}function wr(r,t,n,v,d){v=v||r.drawingBufferWidth,d=d||r.drawingBufferHeight,t.width=v,t.height=d,n=n||Be,n.forEach(function(_,R){var Z=t.attachments[R],J=_.format,ne=_.samples;if(ne!==void 0||T.isRenderbuffer(r,Z))r.bindRenderbuffer(z,Z),ne>1?r.renderbufferStorageMultisample(z,ne,J,v,d):r.renderbufferStorage(z,J,v,d);else if(T.isTexture(r,Z))m.resizeTexture(r,Z,_,v,d);else throw new Error("unknown attachment type")})}function yr(r,t,n){n=n||G,t?(r.bindFramebuffer(n,t.framebuffer),r.viewport(0,0,t.width,t.height)):(r.bindFramebuffer(n,null),r.viewport(0,0,r.drawingBufferWidth,r.drawingBufferHeight))}}),"./src/helper.js":(function(f,e,o){"use strict";e.__esModule=!0,e.copyExistingProperties=m,e.copyNamedProperties=c,e.error=T,e.warn=x,e.isBuffer=b,e.isRenderbuffer=S,e.isShader=G,e.isTexture=z,e.isSampler=y;function c(M,I,C){M.forEach(function(N){var ee=I[N];ee!==void 0&&(C[N]=ee)})}function m(M,I){Object.keys(I).forEach(function(C){I.hasOwnProperty(C)&&M.hasOwnProperty(C)&&(I[C]=M[C])})}function T(){var M;(M=console).error.apply(M,arguments)}function x(){var M;(M=console).warn.apply(M,arguments)}function b(M,I){return typeof WebGLBuffer<"u"&&I instanceof WebGLBuffer}function S(M,I){return typeof WebGLRenderbuffer<"u"&&I instanceof WebGLRenderbuffer}function G(M,I){return typeof WebGLShader<"u"&&I instanceof WebGLShader}function z(M,I){return typeof WebGLTexture<"u"&&I instanceof WebGLTexture}function y(M,I){return typeof WebGLSampler<"u"&&I instanceof WebGLSampler}}),"./src/m4.js":(function(f,e,o){"use strict";function c(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(n){return typeof n}:c=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},c(r)}e.__esModule=!0,e.axisRotate=er,e.axisRotation=De,e.copy=y,e.create=z,e.frustum=ze,e.getAxis=Ee,e.getTranslation=Me,e.identity=M,e.inverse=C,e.lookAt=F,e.multiply=N,e.negate=G,e.ortho=_e,e.perspective=Ie,e.rotateX=fe,e.rotateY=Be,e.rotateZ=Xe,e.rotationX=re,e.rotationY=Te,e.rotationZ=Pe,e.scale=Ne,e.scaling=je,e.setAxis=xe,e.setDefaultType=S,e.setTranslation=ee,e.transformDirection=wr,e.transformNormal=yr,e.transformPoint=He,e.translate=w,e.translation=D,e.transpose=I;var m=x(o("./src/v3.js"));function T(){if(typeof WeakMap!="function")return null;var r=new WeakMap;return T=function(){return r},r}function x(r){if(r&&r.__esModule)return r;if(r===null||c(r)!=="object"&&typeof r!="function")return{default:r};var t=T();if(t&&t.has(r))return t.get(r);var n={},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in r)if(Object.prototype.hasOwnProperty.call(r,d)){var _=v?Object.getOwnPropertyDescriptor(r,d):null;_&&(_.get||_.set)?Object.defineProperty(n,d,_):n[d]=r[d]}return n.default=r,t&&t.set(r,n),n}var b=Float32Array;function S(r){var t=b;return b=r,t}function G(r,t){return t=t||new b(16),t[0]=-r[0],t[1]=-r[1],t[2]=-r[2],t[3]=-r[3],t[4]=-r[4],t[5]=-r[5],t[6]=-r[6],t[7]=-r[7],t[8]=-r[8],t[9]=-r[9],t[10]=-r[10],t[11]=-r[11],t[12]=-r[12],t[13]=-r[13],t[14]=-r[14],t[15]=-r[15],t}function z(){return new b(16).fill(0)}function y(r,t){return t=t||new b(16),t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],t}function M(r){return r=r||new b(16),r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function I(r,t){if(t=t||new b(16),t===r){var n;return n=r[1],r[1]=r[4],r[4]=n,n=r[2],r[2]=r[8],r[8]=n,n=r[3],r[3]=r[12],r[12]=n,n=r[6],r[6]=r[9],r[9]=n,n=r[7],r[7]=r[13],r[13]=n,n=r[11],r[11]=r[14],r[14]=n,t}var v=r[0],d=r[1],_=r[2],R=r[3],Z=r[4],J=r[5],ne=r[6],te=r[7],Q=r[8],$=r[9],Ae=r[10],ye=r[11],Le=r[12],Ge=r[13],Ve=r[14],Je=r[15];return t[0]=v,t[1]=Z,t[2]=Q,t[3]=Le,t[4]=d,t[5]=J,t[6]=$,t[7]=Ge,t[8]=_,t[9]=ne,t[10]=Ae,t[11]=Ve,t[12]=R,t[13]=te,t[14]=ye,t[15]=Je,t}function C(r,t){t=t||new b(16);var n=r[0],v=r[1],d=r[2],_=r[3],R=r[4],Z=r[5],J=r[6],ne=r[7],te=r[8],Q=r[9],$=r[10],Ae=r[11],ye=r[12],Le=r[13],Ge=r[14],Ve=r[15],Je=$*Ve,tr=Ge*Ae,nr=J*Ve,ar=Ge*ne,cr=J*Ae,pr=$*ne,_r=d*Ve,ir=Ge*_,E=d*Ae,g=$*_,P=d*ne,B=J*_,U=te*Le,H=ye*Q,ie=R*Le,oe=ye*Z,pe=R*Q,ue=te*Z,ve=n*Le,be=ye*v,ae=n*Q,he=te*v,ce=n*Z,k=R*v,we=Je*Z+ar*Q+cr*Le-(tr*Z+nr*Q+pr*Le),Ye=tr*v+_r*Q+g*Le-(Je*v+ir*Q+E*Le),or=nr*v+ir*Z+P*Le-(ar*v+_r*Z+B*Le),Qe=pr*v+E*Z+B*Q-(cr*v+g*Z+P*Q),Ce=1/(n*we+R*Ye+te*or+ye*Qe);return t[0]=Ce*we,t[1]=Ce*Ye,t[2]=Ce*or,t[3]=Ce*Qe,t[4]=Ce*(tr*R+nr*te+pr*ye-(Je*R+ar*te+cr*ye)),t[5]=Ce*(Je*n+ir*te+E*ye-(tr*n+_r*te+g*ye)),t[6]=Ce*(ar*n+_r*R+B*ye-(nr*n+ir*R+P*ye)),t[7]=Ce*(cr*n+g*R+P*te-(pr*n+E*R+B*te)),t[8]=Ce*(U*ne+oe*Ae+pe*Ve-(H*ne+ie*Ae+ue*Ve)),t[9]=Ce*(H*_+ve*Ae+he*Ve-(U*_+be*Ae+ae*Ve)),t[10]=Ce*(ie*_+be*ne+ce*Ve-(oe*_+ve*ne+k*Ve)),t[11]=Ce*(ue*_+ae*ne+k*Ae-(pe*_+he*ne+ce*Ae)),t[12]=Ce*(ie*$+ue*Ge+H*J-(pe*Ge+U*J+oe*$)),t[13]=Ce*(ae*Ge+U*d+be*$-(ve*$+he*Ge+H*d)),t[14]=Ce*(ve*J+k*Ge+oe*d-(ce*Ge+ie*d+be*J)),t[15]=Ce*(ce*$+pe*d+he*J-(ae*J+k*$+ue*d)),t}function N(r,t,n){n=n||new b(16);var v=r[0],d=r[1],_=r[2],R=r[3],Z=r[4],J=r[5],ne=r[6],te=r[7],Q=r[8],$=r[9],Ae=r[10],ye=r[11],Le=r[12],Ge=r[13],Ve=r[14],Je=r[15],tr=t[0],nr=t[1],ar=t[2],cr=t[3],pr=t[4],_r=t[5],ir=t[6],E=t[7],g=t[8],P=t[9],B=t[10],U=t[11],H=t[12],ie=t[13],oe=t[14],pe=t[15];return n[0]=v*tr+Z*nr+Q*ar+Le*cr,n[1]=d*tr+J*nr+$*ar+Ge*cr,n[2]=_*tr+ne*nr+Ae*ar+Ve*cr,n[3]=R*tr+te*nr+ye*ar+Je*cr,n[4]=v*pr+Z*_r+Q*ir+Le*E,n[5]=d*pr+J*_r+$*ir+Ge*E,n[6]=_*pr+ne*_r+Ae*ir+Ve*E,n[7]=R*pr+te*_r+ye*ir+Je*E,n[8]=v*g+Z*P+Q*B+Le*U,n[9]=d*g+J*P+$*B+Ge*U,n[10]=_*g+ne*P+Ae*B+Ve*U,n[11]=R*g+te*P+ye*B+Je*U,n[12]=v*H+Z*ie+Q*oe+Le*pe,n[13]=d*H+J*ie+$*oe+Ge*pe,n[14]=_*H+ne*ie+Ae*oe+Ve*pe,n[15]=R*H+te*ie+ye*oe+Je*pe,n}function ee(r,t,n){return n=n||M(),r!==n&&(n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11]),n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n}function Me(r,t){return t=t||m.create(),t[0]=r[12],t[1]=r[13],t[2]=r[14],t}function Ee(r,t,n){n=n||m.create();var v=t*4;return n[0]=r[v+0],n[1]=r[v+1],n[2]=r[v+2],n}function xe(r,t,n,v){v!==r&&(v=y(r,v));var d=n*4;return v[d+0]=t[0],v[d+1]=t[1],v[d+2]=t[2],v}function Ie(r,t,n,v,d){d=d||new b(16);var _=Math.tan(Math.PI*.5-.5*r),R=1/(n-v);return d[0]=_/t,d[1]=0,d[2]=0,d[3]=0,d[4]=0,d[5]=_,d[6]=0,d[7]=0,d[8]=0,d[9]=0,d[10]=(n+v)*R,d[11]=-1,d[12]=0,d[13]=0,d[14]=n*v*R*2,d[15]=0,d}function _e(r,t,n,v,d,_,R){return R=R||new b(16),R[0]=2/(t-r),R[1]=0,R[2]=0,R[3]=0,R[4]=0,R[5]=2/(v-n),R[6]=0,R[7]=0,R[8]=0,R[9]=0,R[10]=2/(d-_),R[11]=0,R[12]=(t+r)/(r-t),R[13]=(v+n)/(n-v),R[14]=(_+d)/(d-_),R[15]=1,R}function ze(r,t,n,v,d,_,R){R=R||new b(16);var Z=t-r,J=v-n,ne=d-_;return R[0]=2*d/Z,R[1]=0,R[2]=0,R[3]=0,R[4]=0,R[5]=2*d/J,R[6]=0,R[7]=0,R[8]=(r+t)/Z,R[9]=(v+n)/J,R[10]=_/ne,R[11]=-1,R[12]=0,R[13]=0,R[14]=d*_/ne,R[15]=0,R}var de,ge,A;function F(r,t,n,v){return v=v||new b(16),de=de||m.create(),ge=ge||m.create(),A=A||m.create(),m.normalize(m.subtract(r,t,A),A),m.normalize(m.cross(n,A,de),de),m.normalize(m.cross(A,de,ge),ge),v[0]=de[0],v[1]=de[1],v[2]=de[2],v[3]=0,v[4]=ge[0],v[5]=ge[1],v[6]=ge[2],v[7]=0,v[8]=A[0],v[9]=A[1],v[10]=A[2],v[11]=0,v[12]=r[0],v[13]=r[1],v[14]=r[2],v[15]=1,v}function D(r,t){return t=t||new b(16),t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function w(r,t,n){n=n||new b(16);var v=t[0],d=t[1],_=t[2],R=r[0],Z=r[1],J=r[2],ne=r[3],te=r[4],Q=r[5],$=r[6],Ae=r[7],ye=r[8],Le=r[9],Ge=r[10],Ve=r[11],Je=r[12],tr=r[13],nr=r[14],ar=r[15];return r!==n&&(n[0]=R,n[1]=Z,n[2]=J,n[3]=ne,n[4]=te,n[5]=Q,n[6]=$,n[7]=Ae,n[8]=ye,n[9]=Le,n[10]=Ge,n[11]=Ve),n[12]=R*v+te*d+ye*_+Je,n[13]=Z*v+Q*d+Le*_+tr,n[14]=J*v+$*d+Ge*_+nr,n[15]=ne*v+Ae*d+Ve*_+ar,n}function re(r,t){t=t||new b(16);var n=Math.cos(r),v=Math.sin(r);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=v,t[7]=0,t[8]=0,t[9]=-v,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function fe(r,t,n){n=n||new b(16);var v=r[4],d=r[5],_=r[6],R=r[7],Z=r[8],J=r[9],ne=r[10],te=r[11],Q=Math.cos(t),$=Math.sin(t);return n[4]=Q*v+$*Z,n[5]=Q*d+$*J,n[6]=Q*_+$*ne,n[7]=Q*R+$*te,n[8]=Q*Z-$*v,n[9]=Q*J-$*d,n[10]=Q*ne-$*_,n[11]=Q*te-$*R,r!==n&&(n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15]),n}function Te(r,t){t=t||new b(16);var n=Math.cos(r),v=Math.sin(r);return t[0]=n,t[1]=0,t[2]=-v,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=v,t[9]=0,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Be(r,t,n){n=n||new b(16);var v=r[0],d=r[1],_=r[2],R=r[3],Z=r[8],J=r[9],ne=r[10],te=r[11],Q=Math.cos(t),$=Math.sin(t);return n[0]=Q*v-$*Z,n[1]=Q*d-$*J,n[2]=Q*_-$*ne,n[3]=Q*R-$*te,n[8]=Q*Z+$*v,n[9]=Q*J+$*d,n[10]=Q*ne+$*_,n[11]=Q*te+$*R,r!==n&&(n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15]),n}function Pe(r,t){t=t||new b(16);var n=Math.cos(r),v=Math.sin(r);return t[0]=n,t[1]=v,t[2]=0,t[3]=0,t[4]=-v,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Xe(r,t,n){n=n||new b(16);var v=r[0],d=r[1],_=r[2],R=r[3],Z=r[4],J=r[5],ne=r[6],te=r[7],Q=Math.cos(t),$=Math.sin(t);return n[0]=Q*v+$*Z,n[1]=Q*d+$*J,n[2]=Q*_+$*ne,n[3]=Q*R+$*te,n[4]=Q*Z-$*v,n[5]=Q*J-$*d,n[6]=Q*ne-$*_,n[7]=Q*te-$*R,r!==n&&(n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15]),n}function De(r,t,n){n=n||new b(16);var v=r[0],d=r[1],_=r[2],R=Math.sqrt(v*v+d*d+_*_);v/=R,d/=R,_/=R;var Z=v*v,J=d*d,ne=_*_,te=Math.cos(t),Q=Math.sin(t),$=1-te;return n[0]=Z+(1-Z)*te,n[1]=v*d*$+_*Q,n[2]=v*_*$-d*Q,n[3]=0,n[4]=v*d*$-_*Q,n[5]=J+(1-J)*te,n[6]=d*_*$+v*Q,n[7]=0,n[8]=v*_*$+d*Q,n[9]=d*_*$-v*Q,n[10]=ne+(1-ne)*te,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function er(r,t,n,v){v=v||new b(16);var d=t[0],_=t[1],R=t[2],Z=Math.sqrt(d*d+_*_+R*R);d/=Z,_/=Z,R/=Z;var J=d*d,ne=_*_,te=R*R,Q=Math.cos(n),$=Math.sin(n),Ae=1-Q,ye=J+(1-J)*Q,Le=d*_*Ae+R*$,Ge=d*R*Ae-_*$,Ve=d*_*Ae-R*$,Je=ne+(1-ne)*Q,tr=_*R*Ae+d*$,nr=d*R*Ae+_*$,ar=_*R*Ae-d*$,cr=te+(1-te)*Q,pr=r[0],_r=r[1],ir=r[2],E=r[3],g=r[4],P=r[5],B=r[6],U=r[7],H=r[8],ie=r[9],oe=r[10],pe=r[11];return v[0]=ye*pr+Le*g+Ge*H,v[1]=ye*_r+Le*P+Ge*ie,v[2]=ye*ir+Le*B+Ge*oe,v[3]=ye*E+Le*U+Ge*pe,v[4]=Ve*pr+Je*g+tr*H,v[5]=Ve*_r+Je*P+tr*ie,v[6]=Ve*ir+Je*B+tr*oe,v[7]=Ve*E+Je*U+tr*pe,v[8]=nr*pr+ar*g+cr*H,v[9]=nr*_r+ar*P+cr*ie,v[10]=nr*ir+ar*B+cr*oe,v[11]=nr*E+ar*U+cr*pe,r!==v&&(v[12]=r[12],v[13]=r[13],v[14]=r[14],v[15]=r[15]),v}function je(r,t){return t=t||new b(16),t[0]=r[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=r[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Ne(r,t,n){n=n||new b(16);var v=t[0],d=t[1],_=t[2];return n[0]=v*r[0],n[1]=v*r[1],n[2]=v*r[2],n[3]=v*r[3],n[4]=d*r[4],n[5]=d*r[5],n[6]=d*r[6],n[7]=d*r[7],n[8]=_*r[8],n[9]=_*r[9],n[10]=_*r[10],n[11]=_*r[11],r!==n&&(n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15]),n}function He(r,t,n){n=n||m.create();var v=t[0],d=t[1],_=t[2],R=v*r[3]+d*r[7]+_*r[11]+r[15];return n[0]=(v*r[0]+d*r[4]+_*r[8]+r[12])/R,n[1]=(v*r[1]+d*r[5]+_*r[9]+r[13])/R,n[2]=(v*r[2]+d*r[6]+_*r[10]+r[14])/R,n}function wr(r,t,n){n=n||m.create();var v=t[0],d=t[1],_=t[2];return n[0]=v*r[0]+d*r[4]+_*r[8],n[1]=v*r[1]+d*r[5]+_*r[9],n[2]=v*r[2]+d*r[6]+_*r[10],n}function yr(r,t,n){n=n||m.create();var v=C(r),d=t[0],_=t[1],R=t[2];return n[0]=d*v[0]+_*v[1]+R*v[2],n[1]=d*v[4]+_*v[5]+R*v[6],n[2]=d*v[8]+_*v[9]+R*v[10],n}}),"./src/primitives.js":(function(f,e,o){"use strict";function c(E){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(P){return typeof P}:c=function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},c(E)}e.__esModule=!0,e.create3DFVertices=Te,e.createAugmentedTypedArray=C,e.createCubeVertices=w,e.createPlaneVertices=A,e.createSphereVertices=F,e.createTruncatedConeVertices=re,e.createXYQuadVertices=ge,e.createCrescentVertices=Be,e.createCylinderVertices=Pe,e.createTorusVertices=Xe,e.createDiscVertices=De,e.deindexVertices=ee,e.flattenNormals=Me,e.makeRandomVertexColors=je,e.reorientDirections=Ie,e.reorientNormals=_e,e.reorientPositions=ze,e.reorientVertices=de,e.concatVertices=t,e.duplicateVertices=n,e.createDiscBuffers=e.createDiscBufferInfo=e.createTorusBuffers=e.createTorusBufferInfo=e.createCylinderBuffers=e.createCylinderBufferInfo=e.createCrescentBuffers=e.createCrescentBufferInfo=e.createCresentVertices=e.createCresentBuffers=e.createCresentBufferInfo=e.createXYQuadBuffers=e.createXYQuadBufferInfo=e.createTruncatedConeBuffers=e.createTruncatedConeBufferInfo=e.createSphereBuffers=e.createSphereBufferInfo=e.createPlaneBuffers=e.createPlaneBufferInfo=e.createCubeBuffers=e.createCubeBufferInfo=e.create3DFBuffers=e.create3DFBufferInfo=void 0;var m=z(o("./src/attributes.js")),T=z(o("./src/helper.js")),x=z(o("./src/typedarrays.js")),b=z(o("./src/m4.js")),S=z(o("./src/v3.js"));function G(){if(typeof WeakMap!="function")return null;var E=new WeakMap;return G=function(){return E},E}function z(E){if(E&&E.__esModule)return E;if(E===null||c(E)!=="object"&&typeof E!="function")return{default:E};var g=G();if(g&&g.has(E))return g.get(E);var P={},B=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var U in E)if(Object.prototype.hasOwnProperty.call(E,U)){var H=B?Object.getOwnPropertyDescriptor(E,U):null;H&&(H.get||H.set)?Object.defineProperty(P,U,H):P[U]=E[U]}return P.default=E,g&&g.set(E,P),P}var y=m.getArray_,M=m.getNumComponents_;function I(E,g){var P=0;return E.push=function(){for(var B=0;B<arguments.length;++B){var U=arguments[B];if(U instanceof Array||x.isArrayBuffer(U))for(var H=0;H<U.length;++H)E[P++]=U[H];else E[P++]=U}},E.reset=function(B){P=B||0},E.numComponents=g,Object.defineProperty(E,"numElements",{get:function(){return this.length/this.numComponents|0}}),E}function C(E,g,P){var B=P||Float32Array;return I(new B(E*g),E)}function N(E){return E!=="indices"}function ee(E){var g=E.indices,P={},B=g.length;function U(H){for(var ie=E[H],oe=ie.numComponents,pe=C(oe,B,ie.constructor),ue=0;ue<B;++ue)for(var ve=g[ue],be=ve*oe,ae=0;ae<oe;++ae)pe.push(ie[be+ae]);P[H]=pe}return Object.keys(E).filter(N).forEach(U),P}function Me(E){if(E.indices)throw new Error("can not flatten normals of indexed vertices. deindex them first");for(var g=E.normal,P=g.length,B=0;B<P;B+=9){var U=g[B+0],H=g[B+1],ie=g[B+2],oe=g[B+3],pe=g[B+4],ue=g[B+5],ve=g[B+6],be=g[B+7],ae=g[B+8],he=U+oe+ve,ce=H+pe+be,k=ie+ue+ae,we=Math.sqrt(he*he+ce*ce+k*k);he/=we,ce/=we,k/=we,g[B+0]=he,g[B+1]=ce,g[B+2]=k,g[B+3]=he,g[B+4]=ce,g[B+5]=k,g[B+6]=he,g[B+7]=ce,g[B+8]=k}return E}function Ee(E,g,P){for(var B=E.length,U=new Float32Array(3),H=0;H<B;H+=3)P(g,[E[H],E[H+1],E[H+2]],U),E[H]=U[0],E[H+1]=U[1],E[H+2]=U[2]}function xe(E,g,P){P=P||S.create();var B=g[0],U=g[1],H=g[2];return P[0]=B*E[0]+U*E[1]+H*E[2],P[1]=B*E[4]+U*E[5]+H*E[6],P[2]=B*E[8]+U*E[9]+H*E[10],P}function Ie(E,g){return Ee(E,g,b.transformDirection),E}function _e(E,g){return Ee(E,b.inverse(g),xe),E}function ze(E,g){return Ee(E,g,b.transformPoint),E}function de(E,g){return Object.keys(E).forEach(function(P){var B=E[P];P.indexOf("pos")>=0?ze(B,g):P.indexOf("tan")>=0||P.indexOf("binorm")>=0?Ie(B,g):P.indexOf("norm")>=0&&_e(B,g)}),E}function ge(E,g,P){return E=E||2,g=g||0,P=P||0,E*=.5,{position:{numComponents:2,data:[g+-1*E,P+-1*E,g+1*E,P+-1*E,g+-1*E,P+1*E,g+1*E,P+1*E]},normal:[0,0,1,0,0,1,0,0,1,0,0,1],texcoord:[0,0,1,0,0,1,1,1],indices:[0,1,2,2,1,3]}}function A(E,g,P,B,U){E=E||1,g=g||1,P=P||1,B=B||1,U=U||b.identity();for(var H=(P+1)*(B+1),ie=C(3,H),oe=C(3,H),pe=C(2,H),ue=0;ue<=B;ue++)for(var ve=0;ve<=P;ve++){var be=ve/P,ae=ue/B;ie.push(E*be-E*.5,0,g*ae-g*.5),oe.push(0,1,0),pe.push(be,ae)}for(var he=P+1,ce=C(3,P*B*2,Uint16Array),k=0;k<B;k++)for(var we=0;we<P;we++)ce.push((k+0)*he+we,(k+1)*he+we,(k+0)*he+we+1),ce.push((k+1)*he+we,(k+1)*he+we+1,(k+0)*he+we+1);var Ye=de({position:ie,normal:oe,texcoord:pe,indices:ce},U);return Ye}function F(E,g,P,B,U,H,ie){if(g<=0||P<=0)throw new Error("subdivisionAxis and subdivisionHeight must be > 0");B=B||0,U=U||Math.PI,H=H||0,ie=ie||Math.PI*2;for(var oe=U-B,pe=ie-H,ue=(g+1)*(P+1),ve=C(3,ue),be=C(3,ue),ae=C(2,ue),he=0;he<=P;he++)for(var ce=0;ce<=g;ce++){var k=ce/g,we=he/P,Ye=pe*k+H,or=oe*we+B,Qe=Math.sin(Ye),Ce=Math.cos(Ye),Oe=Math.sin(or),We=Math.cos(or),gr=Ce*Oe,sr=We,br=Qe*Oe;ve.push(E*gr,E*sr,E*br),be.push(gr,sr,br),ae.push(1-k,we)}for(var lr=g+1,xr=C(3,g*P*2,Uint16Array),Ke=0;Ke<g;Ke++)for(var Ze=0;Ze<P;Ze++)xr.push((Ze+0)*lr+Ke,(Ze+0)*lr+Ke+1,(Ze+1)*lr+Ke),xr.push((Ze+1)*lr+Ke,(Ze+0)*lr+Ke+1,(Ze+1)*lr+Ke+1);return{position:ve,normal:be,texcoord:ae,indices:xr}}var D=[[3,7,5,1],[6,2,0,4],[6,7,3,2],[0,1,5,4],[7,6,4,5],[2,3,1,0]];function w(E){E=E||1;for(var g=E/2,P=[[-g,-g,-g],[+g,-g,-g],[-g,+g,-g],[+g,+g,-g],[-g,-g,+g],[+g,-g,+g],[-g,+g,+g],[+g,+g,+g]],B=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],U=[[1,0],[0,0],[0,1],[1,1]],H=24,ie=C(3,H),oe=C(3,H),pe=C(2,H),ue=C(3,12,Uint16Array),ve=0;ve<6;++ve){for(var be=D[ve],ae=0;ae<4;++ae){var he=P[be[ae]],ce=B[ve],k=U[ae];ie.push(he),oe.push(ce),pe.push(k)}var we=4*ve;ue.push(we+0,we+1,we+2),ue.push(we+0,we+2,we+3)}return{position:ie,normal:oe,texcoord:pe,indices:ue}}function re(E,g,P,B,U,H,ie){if(B<3)throw new Error("radialSubdivisions must be 3 or greater");if(U<1)throw new Error("verticalSubdivisions must be 1 or greater");for(var oe=H===void 0?!0:H,pe=ie===void 0?!0:ie,ue=(oe?2:0)+(pe?2:0),ve=(B+1)*(U+1+ue),be=C(3,ve),ae=C(3,ve),he=C(2,ve),ce=C(3,B*(U+ue/2)*2,Uint16Array),k=B+1,we=Math.atan2(E-g,P),Ye=Math.cos(we),or=Math.sin(we),Qe=oe?-2:0,Ce=U+(pe?2:0),Oe=Qe;Oe<=Ce;++Oe){var We=Oe/U,gr=P*We,sr=void 0;Oe<0?(gr=0,We=1,sr=E):Oe>U?(gr=P,We=1,sr=g):sr=E+(g-E)*(Oe/U),(Oe===-2||Oe===U+2)&&(sr=0,We=0),gr-=P/2;for(var br=0;br<k;++br){var lr=Math.sin(br*Math.PI*2/B),xr=Math.cos(br*Math.PI*2/B);be.push(lr*sr,gr,xr*sr),Oe<0?ae.push(0,-1,0):Oe>U?ae.push(0,1,0):sr===0?ae.push(0,0,0):ae.push(lr*Ye,or,xr*Ye),he.push(br/B,1-We)}}for(var Ke=0;Ke<U+ue;++Ke)if(!(Ke===1&&oe||Ke===U+ue-2&&pe))for(var Ze=0;Ze<B;++Ze)ce.push(k*(Ke+0)+0+Ze,k*(Ke+0)+1+Ze,k*(Ke+1)+1+Ze),ce.push(k*(Ke+0)+0+Ze,k*(Ke+1)+1+Ze,k*(Ke+1)+0+Ze);return{position:be,normal:ae,texcoord:he,indices:ce}}function fe(E,g){g=g||[];for(var P=[],B=0;B<E.length;B+=4){var U=E[B],H=E.slice(B+1,B+4);H.push.apply(H,g);for(var ie=0;ie<U;++ie)P.push.apply(P,H)}return P}function Te(){var E=[0,0,0,0,150,0,30,0,0,0,150,0,30,150,0,30,0,0,30,0,0,30,30,0,100,0,0,30,30,0,100,30,0,100,0,0,30,60,0,30,90,0,67,60,0,30,90,0,67,90,0,67,60,0,0,0,30,30,0,30,0,150,30,0,150,30,30,0,30,30,150,30,30,0,30,100,0,30,30,30,30,30,30,30,100,0,30,100,30,30,30,60,30,67,60,30,30,90,30,30,90,30,67,60,30,67,90,30,0,0,0,100,0,0,100,0,30,0,0,0,100,0,30,0,0,30,100,0,0,100,30,0,100,30,30,100,0,0,100,30,30,100,0,30,30,30,0,30,30,30,100,30,30,30,30,0,100,30,30,100,30,0,30,30,0,30,60,30,30,30,30,30,30,0,30,60,0,30,60,30,30,60,0,67,60,30,30,60,30,30,60,0,67,60,0,67,60,30,67,60,0,67,90,30,67,60,30,67,60,0,67,90,0,67,90,30,30,90,0,30,90,30,67,90,30,30,90,0,67,90,30,67,90,0,30,90,0,30,150,30,30,90,30,30,90,0,30,150,0,30,150,30,0,150,0,0,150,30,30,150,30,0,150,0,30,150,30,30,150,0,0,0,0,0,0,30,0,150,30,0,0,0,0,150,30,0,150,0],g=[.22,.19,.22,.79,.34,.19,.22,.79,.34,.79,.34,.19,.34,.19,.34,.31,.62,.19,.34,.31,.62,.31,.62,.19,.34,.43,.34,.55,.49,.43,.34,.55,.49,.55,.49,.43,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0],P=fe([18,0,0,1,18,0,0,-1,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,-1,0,6,-1,0,0]),B=fe([18,200,70,120,18,80,70,200,6,70,200,210,6,200,200,70,6,210,100,70,6,210,160,70,6,70,180,210,6,100,70,210,6,76,210,100,6,140,210,80,6,90,130,110,6,160,160,220],[255]),U=E.length/3,H={position:C(3,U),texcoord:C(2,U),normal:C(3,U),color:C(4,U,Uint8Array),indices:C(3,U/3,Uint16Array)};H.position.push(E),H.texcoord.push(g),H.normal.push(P),H.color.push(B);for(var ie=0;ie<U;++ie)H.indices.push(ie);return H}function Be(E,g,P,B,U,H,ie){if(U<=0)throw new Error("subdivisionDown must be > 0");H=H||0,ie=ie||1;var oe=2,pe=ie-H,ue=(U+1)*2*(2+oe),ve=C(3,ue),be=C(3,ue),ae=C(2,ue);function he(Ce,Oe,We){return Ce+(Oe-Ce)*We}function ce(Ce,Oe,We,gr,sr,br){for(var lr=0;lr<=U;lr++){var xr=Oe/(oe-1),Ke=lr/U,Ze=(xr-.5)*2,Fr=(H+Ke*pe)*Math.PI,Ar=Math.sin(Fr),Gr=Math.cos(Fr),Wr=he(E,Ce,Ar),vt=Ze*B,ht=Gr*E,mt=Ar*Wr;ve.push(vt,ht,mt);var Mr=S.add(S.multiply([0,Ar,Gr],We),gr);be.push(Mr),ae.push(xr*sr+br,Ke)}}for(var k=0;k<oe;k++){var we=(k/(oe-1)-.5)*2;ce(g,k,[1,1,1],[0,0,0],1,0),ce(g,k,[0,0,0],[we,0,0],0,0),ce(P,k,[1,1,1],[0,0,0],1,0),ce(P,k,[0,0,0],[we,0,0],0,1)}var Ye=C(3,U*2*(2+oe),Uint16Array);function or(Ce,Oe){for(var We=0;We<U;++We)Ye.push(Ce+We+0,Ce+We+1,Oe+We+0),Ye.push(Ce+We+1,Oe+We+1,Oe+We+0)}var Qe=U+1;return or(Qe*0,Qe*4),or(Qe*5,Qe*7),or(Qe*6,Qe*2),or(Qe*3,Qe*1),{position:ve,normal:be,texcoord:ae,indices:Ye}}function Pe(E,g,P,B,U,H){return re(E,E,g,P,B,U,H)}function Xe(E,g,P,B,U,H){if(P<3)throw new Error("radialSubdivisions must be 3 or greater");if(B<3)throw new Error("verticalSubdivisions must be 3 or greater");U=U||0,H=H||Math.PI*2;for(var ie=H-U,oe=P+1,pe=B+1,ue=oe*pe,ve=C(3,ue),be=C(3,ue),ae=C(2,ue),he=C(3,P*B*2,Uint16Array),ce=0;ce<pe;++ce)for(var k=ce/B,we=k*Math.PI*2,Ye=Math.sin(we),or=E+Ye*g,Qe=Math.cos(we),Ce=Qe*g,Oe=0;Oe<oe;++Oe){var We=Oe/P,gr=U+We*ie,sr=Math.sin(gr),br=Math.cos(gr),lr=sr*or,xr=br*or,Ke=sr*Ye,Ze=br*Ye;ve.push(lr,Ce,xr),be.push(Ke,Qe,Ze),ae.push(We,1-k)}for(var Fr=0;Fr<B;++Fr)for(var Ar=0;Ar<P;++Ar){var Gr=1+Ar,Wr=1+Fr;he.push(oe*Fr+Ar,oe*Wr+Ar,oe*Fr+Gr),he.push(oe*Wr+Ar,oe*Wr+Gr,oe*Fr+Gr)}return{position:ve,normal:be,texcoord:ae,indices:he}}function De(E,g,P,B,U){if(g<3)throw new Error("divisions must be at least 3");P=P||1,U=U||1,B=B||0;for(var H=(g+1)*(P+1),ie=C(3,H),oe=C(3,H),pe=C(2,H),ue=C(3,P*g*2,Uint16Array),ve=0,be=E-B,ae=g+1,he=0;he<=P;++he){for(var ce=B+be*Math.pow(he/P,U),k=0;k<=g;++k){var we=2*Math.PI*k/g,Ye=ce*Math.cos(we),or=ce*Math.sin(we);if(ie.push(Ye,0,or),oe.push(0,1,0),pe.push(1-k/g,he/P),he>0&&k!==g){var Qe=ve+(k+1),Ce=ve+k,Oe=ve+k-ae,We=ve+(k+1)-ae;ue.push(Qe,Ce,Oe),ue.push(Qe,Oe,We)}}ve+=g+1}return{position:ie,normal:oe,texcoord:pe,indices:ue}}function er(E){return Math.random()*E|0}function je(E,g){g=g||{};var P=E.position.numElements,B=C(4,P,Uint8Array),U=g.rand||function(be,ae){return ae<3?er(256):255};if(E.color=B,E.indices)for(var H=0;H<P;++H)B.push(U(H,0),U(H,1),U(H,2),U(H,3));else for(var ie=g.vertsPerColor||3,oe=P/ie,pe=0;pe<oe;++pe)for(var ue=[U(pe,0),U(pe,1),U(pe,2),U(pe,3)],ve=0;ve<ie;++ve)B.push(ue);return E}function Ne(E){return function(g){var P=E.apply(this,Array.prototype.slice.call(arguments,1));return m.createBuffersFromArrays(g,P)}}function He(E){return function(g){var P=E.apply(null,Array.prototype.slice.call(arguments,1));return m.createBufferInfoFromArrays(g,P)}}var wr=["numComponents","size","type","normalize","stride","offset","attrib","name","attribName"];function yr(E,g,P,B){B=B||0;for(var U=E.length,H=0;H<U;++H)g[P+H]=E[H]+B}function r(E,g){var P=y(E),B=new P.constructor(g),U=B;return P.numComponents&&P.numElements&&I(B,P.numComponents),E.data&&(U={data:B},T.copyNamedProperties(wr,E,U)),U}function t(E){for(var g={},P,B=function(ve){var be=E[ve];Object.keys(be).forEach(function(ae){g[ae]||(g[ae]=[]),!P&&ae!=="indices"&&(P=ae);var he=be[ae],ce=M(he,ae),k=y(he),we=k.length/ce;g[ae].push(we)})},U=0;U<E.length;++U)B(U);function H(ue){for(var ve=0,be,ae=0;ae<E.length;++ae){var he=E[ae],ce=he[ue],k=y(ce);ve+=k.length,(!be||ce.data)&&(be=ce)}return{length:ve,spec:be}}function ie(ue,ve,be){for(var ae=0,he=0,ce=0;ce<E.length;++ce){var k=E[ce],we=k[ue],Ye=y(we);ue==="indices"?(yr(Ye,be,he,ae),ae+=ve[ce]):yr(Ye,be,he),he+=Ye.length}}var oe=g[P],pe={};return Object.keys(g).forEach(function(ue){var ve=H(ue),be=r(ve.spec,ve.length);ie(ue,oe,y(be)),pe[ue]=be}),pe}function n(E){var g={};return Object.keys(E).forEach(function(P){var B=E[P],U=y(B),H=r(B,U.length);yr(U,y(H),0),g[P]=H}),g}var v=He(Te);e.create3DFBufferInfo=v;var d=Ne(Te);e.create3DFBuffers=d;var _=He(w);e.createCubeBufferInfo=_;var R=Ne(w);e.createCubeBuffers=R;var Z=He(A);e.createPlaneBufferInfo=Z;var J=Ne(A);e.createPlaneBuffers=J;var ne=He(F);e.createSphereBufferInfo=ne;var te=Ne(F);e.createSphereBuffers=te;var Q=He(re);e.createTruncatedConeBufferInfo=Q;var $=Ne(re);e.createTruncatedConeBuffers=$;var Ae=He(ge);e.createXYQuadBufferInfo=Ae;var ye=Ne(ge);e.createXYQuadBuffers=ye;var Le=He(Be);e.createCrescentBufferInfo=Le;var Ge=Ne(Be);e.createCrescentBuffers=Ge;var Ve=He(Pe);e.createCylinderBufferInfo=Ve;var Je=Ne(Pe);e.createCylinderBuffers=Je;var tr=He(Xe);e.createTorusBufferInfo=tr;var nr=Ne(Xe);e.createTorusBuffers=nr;var ar=He(De);e.createDiscBufferInfo=ar;var cr=Ne(De);e.createDiscBuffers=cr;var pr=Le;e.createCresentBufferInfo=pr;var _r=Ge;e.createCresentBuffers=_r;var ir=Be;e.createCresentVertices=ir}),"./src/programs.js":(function(f,e,o){"use strict";function c(a){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(l){return typeof l}:c=function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},c(a)}e.__esModule=!0,e.createAttributeSetters=Xt,e.createProgram=hr,e.createProgramAsync=pt,e.createProgramFromScripts=Wt,e.createProgramFromSources=kt,e.createProgramInfo=Kt,e.createProgramInfoAsync=ft,e.createProgramInfoFromProgram=et,e.createUniformSetters=Hr,e.createUniformBlockSpecFromProgram=wt,e.createUniformBlockInfoFromProgram=Zr,e.createUniformBlockInfo=Jr,e.createTransformFeedback=gt,e.createTransformFeedbackInfo=dt,e.bindTransformFeedbackInfo=Et,e.setAttributes=Ft,e.setBuffersAndAttributes=Pt,e.setUniforms=St,e.setUniformBlock=Tt,e.setBlockUniforms=At,e.bindUniformBlock=ct,e.setUniformsAndBindTextures=void 0;var m=b(o("./src/utils.js")),T=b(o("./src/helper.js"));function x(){if(typeof WeakMap!="function")return null;var a=new WeakMap;return x=function(){return a},a}function b(a){if(a&&a.__esModule)return a;if(a===null||c(a)!=="object"&&typeof a!="function")return{default:a};var h=x();if(h&&h.has(a))return h.get(a);var l={},V=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var W in a)if(Object.prototype.hasOwnProperty.call(a,W)){var L=V?Object.getOwnPropertyDescriptor(a,W):null;L&&(L.get||L.set)?Object.defineProperty(l,W,L):l[W]=a[W]}return l.default=a,h&&h.set(a,l),l}function S(a,h,l,V,W,L,K){try{var i=a[L](K),u=i.value}catch(s){l(s);return}i.done?h(u):Promise.resolve(u).then(V,W)}function G(a){return function(){var h=this,l=arguments;return new Promise(function(V,W){var L=a.apply(h,l);function K(u){S(L,V,W,K,i,"next",u)}function i(u){S(L,V,W,K,i,"throw",u)}K(void 0)})}}function z(a){return C(a)||I(a)||M(a)||y()}function y(){throw new TypeError(`Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(a,h){if(a){if(typeof a=="string")return N(a,h);var l=Object.prototype.toString.call(a).slice(8,-1);if(l==="Object"&&a.constructor&&(l=a.constructor.name),l==="Map"||l==="Set")return Array.from(a);if(l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return N(a,h)}}function I(a){if(typeof Symbol<"u"&&Symbol.iterator in Object(a))return Array.from(a)}function C(a){if(Array.isArray(a))return N(a)}function N(a,h){(h==null||h>a.length)&&(h=a.length);for(var l=0,V=new Array(h);l<h;l++)V[l]=a[l];return V}var ee=T.error,Me=T.warn;function Ee(a){return typeof document<"u"&&document.getElementById?document.getElementById(a):null}var xe=33984,Ie=35048,_e=34962,ze=34963,de=35345,ge=35982,A=36386,F=35713,D=35714,w=35632,re=35633,fe=35981,Te=35718,Be=35721,Pe=35971,Xe=35382,De=35396,er=35398,je=35392,Ne=35395,He=5126,wr=35664,yr=35665,r=35666,t=5124,n=35667,v=35668,d=35669,_=35670,R=35671,Z=35672,J=35673,ne=35674,te=35675,Q=35676,$=35678,Ae=35680,ye=35679,Le=35682,Ge=35685,Ve=35686,Je=35687,tr=35688,nr=35689,ar=35690,cr=36289,pr=36292,_r=36293,ir=5125,E=36294,g=36295,P=36296,B=36298,U=36299,H=36300,ie=36303,oe=36306,pe=36307,ue=36308,ve=36311,be=3553,ae=34067,he=32879,ce=35866,k={};function we(a,h){return k[h].bindPoint}function Ye(a,h){return function(l){a.uniform1f(h,l)}}function or(a,h){return function(l){a.uniform1fv(h,l)}}function Qe(a,h){return function(l){a.uniform2fv(h,l)}}function Ce(a,h){return function(l){a.uniform3fv(h,l)}}function Oe(a,h){return function(l){a.uniform4fv(h,l)}}function We(a,h){return function(l){a.uniform1i(h,l)}}function gr(a,h){return function(l){a.uniform1iv(h,l)}}function sr(a,h){return function(l){a.uniform2iv(h,l)}}function br(a,h){return function(l){a.uniform3iv(h,l)}}function lr(a,h){return function(l){a.uniform4iv(h,l)}}function xr(a,h){return function(l){a.uniform1ui(h,l)}}function Ke(a,h){return function(l){a.uniform1uiv(h,l)}}function Ze(a,h){return function(l){a.uniform2uiv(h,l)}}function Fr(a,h){return function(l){a.uniform3uiv(h,l)}}function Ar(a,h){return function(l){a.uniform4uiv(h,l)}}function Gr(a,h){return function(l){a.uniformMatrix2fv(h,!1,l)}}function Wr(a,h){return function(l){a.uniformMatrix3fv(h,!1,l)}}function vt(a,h){return function(l){a.uniformMatrix4fv(h,!1,l)}}function ht(a,h){return function(l){a.uniformMatrix2x3fv(h,!1,l)}}function mt(a,h){return function(l){a.uniformMatrix3x2fv(h,!1,l)}}function Mr(a,h){return function(l){a.uniformMatrix2x4fv(h,!1,l)}}function $e(a,h){return function(l){a.uniformMatrix4x2fv(h,!1,l)}}function nt(a,h){return function(l){a.uniformMatrix3x4fv(h,!1,l)}}function $r(a,h){return function(l){a.uniformMatrix4x3fv(h,!1,l)}}function vr(a,h,l,V){var W=we(a,h);return m.isWebGL2(a)?function(L){var K,i;T.isTexture(a,L)?(K=L,i=null):(K=L.texture,i=L.sampler),a.uniform1i(V,l),a.activeTexture(xe+l),a.bindTexture(W,K),a.bindSampler(l,i)}:function(L){a.uniform1i(V,l),a.activeTexture(xe+l),a.bindTexture(W,L)}}function rr(a,h,l,V,W){for(var L=we(a,h),K=new Int32Array(W),i=0;i<W;++i)K[i]=l+i;return m.isWebGL2(a)?function(u){a.uniform1iv(V,K),u.forEach(function(s,p){a.activeTexture(xe+K[p]);var O,X;T.isTexture(a,s)?(O=s,X=null):(O=s.texture,X=s.sampler),a.bindSampler(l,X),a.bindTexture(L,O)})}:function(u){a.uniform1iv(V,K),u.forEach(function(s,p){a.activeTexture(xe+K[p]),a.bindTexture(L,s)})}}k[He]={Type:Float32Array,size:4,setter:Ye,arraySetter:or},k[wr]={Type:Float32Array,size:8,setter:Qe,cols:2},k[yr]={Type:Float32Array,size:12,setter:Ce,cols:3},k[r]={Type:Float32Array,size:16,setter:Oe,cols:4},k[t]={Type:Int32Array,size:4,setter:We,arraySetter:gr},k[n]={Type:Int32Array,size:8,setter:sr,cols:2},k[v]={Type:Int32Array,size:12,setter:br,cols:3},k[d]={Type:Int32Array,size:16,setter:lr,cols:4},k[ir]={Type:Uint32Array,size:4,setter:xr,arraySetter:Ke},k[E]={Type:Uint32Array,size:8,setter:Ze,cols:2},k[g]={Type:Uint32Array,size:12,setter:Fr,cols:3},k[P]={Type:Uint32Array,size:16,setter:Ar,cols:4},k[_]={Type:Uint32Array,size:4,setter:We,arraySetter:gr},k[R]={Type:Uint32Array,size:8,setter:sr,cols:2},k[Z]={Type:Uint32Array,size:12,setter:br,cols:3},k[J]={Type:Uint32Array,size:16,setter:lr,cols:4},k[ne]={Type:Float32Array,size:32,setter:Gr,rows:2,cols:2},k[te]={Type:Float32Array,size:48,setter:Wr,rows:3,cols:3},k[Q]={Type:Float32Array,size:64,setter:vt,rows:4,cols:4},k[Ge]={Type:Float32Array,size:32,setter:ht,rows:2,cols:3},k[Ve]={Type:Float32Array,size:32,setter:Mr,rows:2,cols:4},k[Je]={Type:Float32Array,size:48,setter:mt,rows:3,cols:2},k[tr]={Type:Float32Array,size:48,setter:nt,rows:3,cols:4},k[nr]={Type:Float32Array,size:64,setter:$e,rows:4,cols:2},k[ar]={Type:Float32Array,size:64,setter:$r,rows:4,cols:3},k[$]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:be},k[Ae]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ae},k[ye]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:he},k[Le]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:be},k[cr]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ce},k[pr]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ce},k[_r]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ae},k[B]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:be},k[U]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:he},k[H]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ae},k[ie]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ce},k[oe]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:be},k[pe]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:he},k[ue]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ae},k[ve]={Type:null,size:0,setter:vr,arraySetter:rr,bindPoint:ce};function fr(a,h){return function(l){if(l.value)switch(a.disableVertexAttribArray(h),l.value.length){case 4:a.vertexAttrib4fv(h,l.value);break;case 3:a.vertexAttrib3fv(h,l.value);break;case 2:a.vertexAttrib2fv(h,l.value);break;case 1:a.vertexAttrib1fv(h,l.value);break;default:throw new Error("the length of a float constant value must be between 1 and 4!")}else a.bindBuffer(_e,l.buffer),a.enableVertexAttribArray(h),a.vertexAttribPointer(h,l.numComponents||l.size,l.type||He,l.normalize||!1,l.stride||0,l.offset||0),l.divisor!==void 0&&a.vertexAttribDivisor(h,l.divisor)}}function Cr(a,h){return function(l){if(l.value)if(a.disableVertexAttribArray(h),l.value.length===4)a.vertexAttrib4iv(h,l.value);else throw new Error("The length of an integer constant value must be 4!");else a.bindBuffer(_e,l.buffer),a.enableVertexAttribArray(h),a.vertexAttribIPointer(h,l.numComponents||l.size,l.type||t,l.stride||0,l.offset||0),l.divisor!==void 0&&a.vertexAttribDivisor(h,l.divisor)}}function Qr(a,h){return function(l){if(l.value)if(a.disableVertexAttribArray(h),l.value.length===4)a.vertexAttrib4uiv(h,l.value);else throw new Error("The length of an unsigned integer constant value must be 4!");else a.bindBuffer(_e,l.buffer),a.enableVertexAttribArray(h),a.vertexAttribIPointer(h,l.numComponents||l.size,l.type||ir,l.stride||0,l.offset||0),l.divisor!==void 0&&a.vertexAttribDivisor(h,l.divisor)}}function at(a,h,l){var V=l.size,W=l.count;return function(L){a.bindBuffer(_e,L.buffer);for(var K=L.size||L.numComponents||V,i=K/W,u=L.type||He,s=k[u],p=s.size*K,O=L.normalize||!1,X=L.offset||0,Y=p/W,j=0;j<W;++j)a.enableVertexAttribArray(h+j),a.vertexAttribPointer(h+j,i,u,O,p,X+Y*j),L.divisor!==void 0&&a.vertexAttribDivisor(h+j,L.divisor)}}var Ue={};Ue[He]={size:4,setter:fr},Ue[wr]={size:8,setter:fr},Ue[yr]={size:12,setter:fr},Ue[r]={size:16,setter:fr},Ue[t]={size:4,setter:Cr},Ue[n]={size:8,setter:Cr},Ue[v]={size:12,setter:Cr},Ue[d]={size:16,setter:Cr},Ue[ir]={size:4,setter:Qr},Ue[E]={size:8,setter:Qr},Ue[g]={size:12,setter:Qr},Ue[P]={size:16,setter:Qr},Ue[_]={size:4,setter:Cr},Ue[R]={size:8,setter:Cr},Ue[Z]={size:12,setter:Cr},Ue[J]={size:16,setter:Cr},Ue[ne]={size:4,setter:at,count:2},Ue[te]={size:9,setter:at,count:3},Ue[Q]={size:16,setter:at,count:4};var it=void 0,yt=/ERROR:\\s*\\d+:(\\d+)/gi;function an(a){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,V=z(h.matchAll(yt)),W=new Map(V.map(function(L,K){var i=parseInt(L[1]),u=V[K+1],s=u?u.index:h.length,p=h.substring(L.index,s);return[i-1,p]}));return a.split(`\n`).map(function(L,K){var i=W.get(K);return"".concat(K+1+l,": ").concat(L).concat(i?`\n\n^^^ `.concat(i):"")}).join(`\n`)}var Ot=/^[ \\t]*\\n/;function Ut(a){var h=0;return Ot.test(a)&&(h=1,a=a.replace(Ot,"")),{lineOffset:h,shaderSource:a}}function ot(a,h){return a.errorCallback(h),a.callback&&setTimeout(function(){a.callback("".concat(h,`\n`).concat(a.errors.join(`\n`)))}),null}function kr(a,h,l,V){var W=a.createShader(l);return a.shaderSource(W,Ut(h).shaderSource),a.compileShader(W),!V.callback&&!zr(a,l,W,V.errorCallback)?(a.deleteShader(W),null):W}function zr(a,h,l,V){V=V||ee;var W=a.getShaderParameter(l,F);if(!W){var L=a.getShaderInfoLog(l),K=Ut(a.getShaderSource(l)),i=K.lineOffset,u=K.shaderSource;V("".concat(an(u,L,i),`\nError compiling `).concat(m.glEnumToString(a,h),": ").concat(L))}return W}function Rr(a,h,l){var V,W,L;if(typeof h=="function"&&(l=h,h=void 0),typeof a=="function")l=a,a=void 0;else if(a&&!Array.isArray(a)){if(a.errorCallback&&a.errors)return a;var K=a;l=K.errorCallback,a=K.attribLocations,V=K.transformFeedbackVaryings,W=K.transformFeedbackMode,L=K.callback}var i=l||ee,u=[],s={errorCallback:function(X){u.push(X);for(var Y=arguments.length,j=new Array(Y>1?Y-1:0),q=1;q<Y;q++)j[q-1]=arguments[q];i.apply(void 0,[X].concat(j))},transformFeedbackVaryings:V,transformFeedbackMode:W,callback:L,errors:u};if(a){var p={};Array.isArray(a)?a.forEach(function(O,X){p[O]=h?h[X]:X}):p=a,s.attribLocations=p}return s}var Ir=["VERTEX_SHADER","FRAGMENT_SHADER"];function Vr(a,h){if(h.indexOf("frag")>=0)return w;if(h.indexOf("vert")>=0)return re}function Dr(a,h){h.forEach(function(l){a.deleteShader(l)})}var Lt=function(){var h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return new Promise(function(l){return setTimeout(l,h)})};function hr(a,h,l,V,W){for(var L=Rr(l,V,W),K=[],i=[],u=0;u<h.length;++u){var s=h[u];if(typeof s=="string"){var p=Ee(s),O=p?p.text:s,X=a[Ir[u]];p&&p.type&&(X=Vr(a,p.type)||X),s=kr(a,O,X,L),i.push(s)}T.isShader(a,s)&&K.push(s)}if(K.length!==h.length)return Dr(a,i),ot(L,"not enough shaders for program");var Y=a.createProgram();K.forEach(function(q){a.attachShader(Y,q)}),L.attribLocations&&Object.keys(L.attribLocations).forEach(function(q){a.bindAttribLocation(Y,L.attribLocations[q],q)});var j=L.transformFeedbackVaryings;return j&&(j.attribs&&(j=j.attribs),Array.isArray(j)||(j=Object.keys(j)),a.transformFeedbackVaryings(Y,j,L.transformFeedbackMode||fe)),a.linkProgram(Y),L.callback?(Gt(a,Y,L),null):_t(a,Y,L.errorCallback)?Y:(a.deleteProgram(Y),Dr(a,i),null)}function pt(a,h){for(var l=arguments.length,V=new Array(l>2?l-2:0),W=2;W<l;W++)V[W-2]=arguments[W];return new Promise(function(L,K){var i=Rr.apply(void 0,V);i.callback=function(u,s){u?K(u):L(s)},hr(a,h,i)})}function ft(a,h){for(var l=arguments.length,V=new Array(l>2?l-2:0),W=2;W<l;W++)V[W-2]=arguments[W];return new Promise(function(L,K){var i=Rr.apply(void 0,V);i.callback=function(u,s){u?K(u):L(s)},Kt(a,h,i)})}function Gt(a,h,l){return Nr.apply(this,arguments)}function Nr(){return Nr=G(regeneratorRuntime.mark(function a(h,l,V){var W,L,K,i,u,s;return regeneratorRuntime.wrap(function(O){for(;;)switch(O.prev=O.next){case 0:W=h.getExtension("KHR_parallel_shader_compile"),L=W?function(X,Y){return X.getProgramParameter(Y,W.COMPLETION_STATUS_KHR)}:function(){return!0},K=0;case 3:return O.next=5,Lt(K);case 5:K=1e3/60;case 6:if(!L(h,l)){O.next=3;break}case 7:i=_t(h,l,V.errorCallback),u=i?void 0:V.errors.join(`\n`),i||(s=V.errorCallback||ee,s(u),h.deleteProgram(l),l=null),V.callback(u,l);case 11:case"end":return O.stop()}},a)})),Nr.apply(this,arguments)}function _t(a,h,l){l=l||ee;var V=a.getProgramParameter(h,D);if(!V){var W=a.getProgramInfoLog(h);l("Error in program linking: ".concat(W))}return V}function Vt(a,h,l,V){var W="",L=Ee(h);if(!L)return ot(V,"unknown script element: ".concat(h));W=L.text;var K=l||Vr(a,L.type);return K?kr(a,W,K,V):ot(V,"unknown shader type")}function Wt(a,h,l,V,W){for(var L=Rr(l,V,W),K=[],i=0;i<h.length;++i){var u=Vt(a,h[i],a[Ir[i]],L);if(!u)return null;K.push(u)}return hr(a,K,L)}function kt(a,h,l,V,W){for(var L=Rr(l,V,W),K=[],i=0;i<h.length;++i){var u=kr(a,h[i],a[Ir[i]],L);if(!L.callback&&!u)return null;K.push(u)}return hr(a,K,L)}function bt(a){var h=a.name;return h.startsWith("gl_")||h.startsWith("webgl_")}var ut=/(\\.|\\[|]|\\w+)/g,zt=function(h){return h>="0"&&h<="9"};function Ht(a,h,l,V){for(var W=a.split(ut).filter(function(j){return j!==""}),L=0,K="";;){var i=W[L++];K+=i;var u=zt(i[0]),s=u?parseInt(i):i;u&&(K+=W[L++]);var p=L===W.length;if(p){l[s]=h;break}else{var O=W[L++],X=O==="[",Y=l[s]||(X?[]:{});l[s]=Y,l=Y,V[K]=V[K]||(function(j){return function(q){Xr(j,q)}})(Y),K+=O}}}function Hr(a,h){var l=0;function V(X,Y,j){var q=Y.name.endsWith("[0]"),se=Y.type,Re=k[se];if(!Re)throw new Error("unknown type: 0x".concat(se.toString(16)));var me;if(Re.bindPoint){var Fe=l;l+=Y.size,q?me=Re.arraySetter(a,se,Fe,j,Y.size):me=Re.setter(a,se,Fe,j,Y.size)}else Re.arraySetter&&q?me=Re.arraySetter(a,j):me=Re.setter(a,j);return me.location=j,me}for(var W={},L={},K=a.getProgramParameter(h,Te),i=0;i<K;++i){var u=a.getActiveUniform(h,i);if(!bt(u)){var s=u.name;s.endsWith("[0]")&&(s=s.substr(0,s.length-3));var p=a.getUniformLocation(h,u.name);if(p){var O=V(h,u,p);W[s]=O,Ht(s,O,L,W)}}}return W}function dt(a,h){for(var l={},V=a.getProgramParameter(h,Pe),W=0;W<V;++W){var L=a.getTransformFeedbackVarying(h,W);l[L.name]={index:W,type:L.type,size:L.size}}return l}function Et(a,h,l){h.transformFeedbackInfo&&(h=h.transformFeedbackInfo),l.attribs&&(l=l.attribs);for(var V in l){var W=h[V];if(W){var L=l[V];L.offset?a.bindBufferRange(ge,W.index,L.buffer,L.offset,L.size):a.bindBufferBase(ge,W.index,L.buffer)}}}function gt(a,h,l){var V=a.createTransformFeedback();return a.bindTransformFeedback(A,V),a.useProgram(h.program),Et(a,h,l),a.bindTransformFeedback(A,null),V}function wt(a,h){for(var l=a.getProgramParameter(h,Te),V=[],W=[],L=0;L<l;++L){W.push(L),V.push({});var K=a.getActiveUniform(h,L);V[L].name=K.name}[["UNIFORM_TYPE","type"],["UNIFORM_SIZE","size"],["UNIFORM_BLOCK_INDEX","blockNdx"],["UNIFORM_OFFSET","offset"]].forEach(function(X){var Y=X[0],j=X[1];a.getActiveUniforms(h,W,a[Y]).forEach(function(q,se){V[se][j]=q})});for(var i={},u=a.getProgramParameter(h,Xe),s=0;s<u;++s){var p=a.getActiveUniformBlockName(h,s),O={index:a.getUniformBlockIndex(h,p),usedByVertexShader:a.getActiveUniformBlockParameter(h,s,De),usedByFragmentShader:a.getActiveUniformBlockParameter(h,s,er),size:a.getActiveUniformBlockParameter(h,s,je),uniformIndices:a.getActiveUniformBlockParameter(h,s,Ne)};O.used=O.usedByVertexShader||O.usedByFragmentShader,i[p]=O}return{blockSpecs:i,uniformData:V}}var xt=/\\[\\d+\\]\\.$/,on=function(h,l){return((h+(l-1))/l|0)*l};function fn(a,h,l,V){if(h||l){V=V||1;var W=a.length,L=W/4;return function(K){for(var i=0,u=0,s=0;s<L;++s){for(var p=0;p<V;++p)a[i++]=K[u++];i+=4-V}}}else return function(K){K.length?a.set(K):a[0]=K}}function Zr(a,h,l,V){var W=l.blockSpecs,L=l.uniformData,K=W[V];if(!K)return Me("no uniform block object named:",V),{name:V,uniforms:{}};var i=new ArrayBuffer(K.size),u=a.createBuffer(),s=K.index;a.bindBuffer(de,u),a.uniformBlockBinding(h,K.index,s);var p=V+".";xt.test(p)&&(p=p.replace(xt,"."));var O={},X={},Y={};return K.uniformIndices.forEach(function(j){var q=L[j],se=q.name;se.startsWith(p)&&(se=se.substr(p.length));var Re=se.endsWith("[0]");Re&&(se=se.substr(0,se.length-3));var me=k[q.type],Fe=me.Type,mr=Re?on(me.size,16)*q.size:me.size*q.size,Se=new Fe(i,q.offset,mr/Fe.BYTES_PER_ELEMENT);O[se]=Se;var ke=fn(Se,Re,me.rows,me.cols);X[se]=ke,Ht(se,ke,Y,X)}),{name:V,array:i,asFloat:new Float32Array(i),buffer:u,uniforms:O,setters:X}}function Jr(a,h,l){return Zr(a,h.program,h.uniformBlockSpec,l)}function ct(a,h,l){var V=h.uniformBlockSpec||h,W=V.blockSpecs[l.name];if(W){var L=W.index;return a.bindBufferRange(de,L,l.buffer,l.offset||0,l.array.byteLength),!0}return!1}function Tt(a,h,l){ct(a,h,l)&&a.bufferData(de,l.array,Ie)}function At(a,h){var l=a.setters;for(var V in h){var W=l[V];if(W){var L=h[V];W(L)}}}function Xr(a,h){for(var l in h){var V=a[l];typeof V=="function"?V(h[l]):Xr(a[l],h[l])}}function St(a){for(var h=a.uniformSetters||a,l=arguments.length<=1?0:arguments.length-1,V=0;V<l;++V){var W=V+1<1||arguments.length<=V+1?void 0:arguments[V+1];if(Array.isArray(W))for(var L=W.length,K=0;K<L;++K)St(h,W[K]);else for(var i in W){var u=h[i];u&&u(W[i])}}}var un=St;e.setUniformsAndBindTextures=un;function Xt(a,h){for(var l={},V=a.getProgramParameter(h,Be),W=0;W<V;++W){var L=a.getActiveAttrib(h,W);if(!bt(L)){var K=a.getAttribLocation(h,L.name),i=Ue[L.type],u=i.setter(a,K,i);u.location=K,l[L.name]=u}}return l}function Ft(a,h){for(var l in h){var V=a[l];V&&V(h[l])}}function Pt(a,h,l){l.vertexArrayObject?a.bindVertexArray(l.vertexArrayObject):(Ft(h.attribSetters||h,l.attribs),l.indices&&a.bindBuffer(ze,l.indices))}function et(a,h){var l=Hr(a,h),V=Xt(a,h),W={program:h,uniformSetters:l,attribSetters:V};return m.isWebGL2(a)&&(W.uniformBlockSpec=wt(a,h),W.transformFeedbackInfo=dt(a,h)),W}var Yt=/\\s|{|}|;/;function Kt(a,h,l,V,W){var L=Rr(l,V,W),K=[];if(h=h.map(function(s){if(!Yt.test(s)){var p=Ee(s);if(p)s=p.text;else{var O="no element with id: ".concat(s);L.errorCallback(O),K.push(O)}}return s}),K.length)return ot(L,"");var i=L.callback;i&&(L.callback=function(s,p){var O;s||(O=et(a,p)),i(s,O)});var u=kt(a,h,L);return u?et(a,u):null}}),"./src/textures.js":(function(f,e,o){"use strict";function c(i){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(s){return typeof s}:c=function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},c(i)}e.__esModule=!0,e.setTextureDefaults_=Ht,e.createSampler=xt,e.createSamplers=on,e.setSamplerParameters=wt,e.createTexture=V,e.setEmptyTexture=l,e.setTextureFromArray=h,e.loadTextureFromUrl=Yt,e.setTextureFromElement=At,e.setTextureFilteringForSize=Zr,e.setTextureParameters=gt,e.setDefaultTextureColor=zt,e.createTextures=K,e.resizeTexture=W,e.canGenerateMipmap=Vt,e.canFilter=Wt,e.getNumComponentsForFormat=kt,e.getBytesPerElementForInternalFormat=Gt,e.getFormatAndTypeForInternalFormat=Nr;var m=S(o("./src/utils.js")),T=S(o("./src/typedarrays.js")),x=S(o("./src/helper.js"));function b(){if(typeof WeakMap!="function")return null;var i=new WeakMap;return b=function(){return i},i}function S(i){if(i&&i.__esModule)return i;if(i===null||c(i)!=="object"&&typeof i!="function")return{default:i};var u=b();if(u&&u.has(i))return u.get(i);var s={},p=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in i)if(Object.prototype.hasOwnProperty.call(i,O)){var X=p?Object.getOwnPropertyDescriptor(i,O):null;X&&(X.get||X.set)?Object.defineProperty(s,O,X):s[O]=i[O]}return s.default=i,u&&u.set(i,s),s}var G=void 0,z={textureColor:new Uint8Array([128,192,255,255]),textureOptions:{},crossOrigin:void 0},y=T.isArrayBuffer,M=(function(){var i;return function(){return i=i||(typeof document<"u"&&document.createElement?document.createElement("canvas").getContext("2d"):null),i}})(),I=6406,C=6407,N=6408,ee=6409,Me=6410,Ee=6402,xe=34041,Ie=33071,_e=9728,ze=9729,de=3553,ge=34067,A=32879,F=35866,D=34069,w=34070,re=34071,fe=34072,Te=34073,Be=34074,Pe=10241,Xe=10240,De=10242,er=10243,je=32882,Ne=33082,He=33083,wr=33084,yr=33085,r=3317,t=3314,n=32878,v=3316,d=3315,_=32877,R=37443,Z=37441,J=37440,ne=33321,te=36756,Q=33325,$=33326,Ae=33330,ye=33329,Le=33338,Ge=33337,Ve=33340,Je=33339,tr=33323,nr=36757,ar=33327,cr=33328,pr=33336,_r=33335,ir=33332,E=33331,g=33334,P=33333,B=32849,U=35905,H=36194,ie=36758,oe=35898,pe=35901,ue=34843,ve=34837,be=36221,ae=36239,he=36215,ce=36233,k=36209,we=36227,Ye=32856,or=35907,Qe=36759,Ce=32855,Oe=32854,We=32857,gr=34842,sr=34836,br=36220,lr=36238,xr=36975,Ke=36214,Ze=36232,Fr=36226,Ar=36208,Gr=33189,Wr=33190,vt=36012,ht=36013,mt=35056,Mr=5120,$e=5121,nt=5122,$r=5123,vr=5124,rr=5125,fr=5126,Cr=32819,Qr=32820,at=33635,Ue=5131,it=36193,yt=33640,an=35899,Ot=35902,Ut=36269,ot=34042,kr=33319,zr=33320,Rr=6403,Ir=36244,Vr=36248,Dr=36249,Lt={};{var hr=Lt;hr[I]={numColorComponents:1},hr[ee]={numColorComponents:1},hr[Me]={numColorComponents:2},hr[C]={numColorComponents:3},hr[N]={numColorComponents:4},hr[Rr]={numColorComponents:1},hr[Ir]={numColorComponents:1},hr[kr]={numColorComponents:2},hr[zr]={numColorComponents:2},hr[C]={numColorComponents:3},hr[Vr]={numColorComponents:3},hr[N]={numColorComponents:4},hr[Dr]={numColorComponents:4},hr[Ee]={numColorComponents:1},hr[xe]={numColorComponents:2}}var pt;function ft(i){if(!pt){var u={};u[I]={textureFormat:I,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1,2,2,4],type:[$e,Ue,it,fr]},u[ee]={textureFormat:ee,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1,2,2,4],type:[$e,Ue,it,fr]},u[Me]={textureFormat:Me,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[2,4,4,8],type:[$e,Ue,it,fr]},u[C]={textureFormat:C,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3,6,6,12,2],type:[$e,Ue,it,fr,at]},u[N]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,8,8,16,2,2],type:[$e,Ue,it,fr,Cr,Qr]},u[Ee]={textureFormat:Ee,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2,4],type:[rr,$r]},u[ne]={textureFormat:Rr,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1],type:[$e]},u[te]={textureFormat:Rr,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[1],type:[Mr]},u[Q]={textureFormat:Rr,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[4,2],type:[fr,Ue]},u[$]={textureFormat:Rr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[4],type:[fr]},u[Ae]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[1],type:[$e]},u[ye]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[1],type:[Mr]},u[ir]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[$r]},u[E]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[nt]},u[g]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[rr]},u[P]={textureFormat:Ir,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[vr]},u[tr]={textureFormat:kr,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[2],type:[$e]},u[nr]={textureFormat:kr,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[2],type:[Mr]},u[ar]={textureFormat:kr,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[8,4],type:[fr,Ue]},u[cr]={textureFormat:kr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[8],type:[fr]},u[pr]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[$e]},u[_r]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[Mr]},u[Le]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[$r]},u[Ge]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[nt]},u[Ve]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[rr]},u[Je]={textureFormat:zr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[vr]},u[B]={textureFormat:C,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3],type:[$e]},u[U]={textureFormat:C,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[3],type:[$e]},u[H]={textureFormat:C,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3,2],type:[$e,at]},u[ie]={textureFormat:C,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[3],type:[Mr]},u[oe]={textureFormat:C,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6,4],type:[fr,Ue,an]},u[pe]={textureFormat:C,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6,4],type:[fr,Ue,Ot]},u[ue]={textureFormat:C,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6],type:[fr,Ue]},u[ve]={textureFormat:C,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[fr]},u[be]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[3],type:[$e]},u[ae]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[3],type:[Mr]},u[he]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[6],type:[$r]},u[ce]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[6],type:[nt]},u[k]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[rr]},u[we]={textureFormat:Vr,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[vr]},u[Ye]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[$e]},u[or]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[$e]},u[Qe]={textureFormat:N,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[4],type:[Mr]},u[Ce]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,2,4],type:[$e,Qr,yt]},u[Oe]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,2],type:[$e,Cr]},u[We]={textureFormat:N,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[yt]},u[gr]={textureFormat:N,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[16,8],type:[fr,Ue]},u[sr]={textureFormat:N,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[16],type:[fr]},u[br]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[$e]},u[lr]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[Mr]},u[xr]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[yt]},u[Ke]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[$r]},u[Ze]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[nt]},u[Fr]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[16],type:[vr]},u[Ar]={textureFormat:Dr,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[16],type:[rr]},u[Gr]={textureFormat:Ee,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2,4],type:[$r,rr]},u[Wr]={textureFormat:Ee,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[rr]},u[vt]={textureFormat:Ee,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[fr]},u[mt]={textureFormat:xe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[ot]},u[ht]={textureFormat:xe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[Ut]},Object.keys(u).forEach(function(s){var p=u[s];p.bytesPerElementMap={},p.bytesPerElement.forEach(function(O,X){var Y=p.type[X];p.bytesPerElementMap[Y]=O})}),pt=u}return pt[i]}function Gt(i,u){var s=ft(i);if(!s)throw"unknown internal format";var p=s.bytesPerElementMap[u];if(p===void 0)throw"unknown internal format";return p}function Nr(i){var u=ft(i);if(!u)throw"unknown internal format";return{format:u.textureFormat,type:u.type[0]}}function _t(i){return(i&i-1)===0}function Vt(i,u,s,p){if(!m.isWebGL2(i))return _t(u)&&_t(s);var O=ft(p);if(!O)throw"unknown internal format";return O.colorRenderable&&O.textureFilterable}function Wt(i){var u=ft(i);if(!u)throw"unknown internal format";return u.textureFilterable}function kt(i){var u=Lt[i];if(!u)throw"unknown format: "+i;return u.numColorComponents}function bt(i,u,s){return y(u)?T.getGLTypeForTypedArray(u):s||$e}function ut(i,u,s,p,O){if(O%1!==0)throw"can\'t guess dimensions";if(!s&&!p){var X=Math.sqrt(O/(u===ge?6:1));X%1===0?(s=X,p=X):(s=O,p=1)}else if(p){if(!s&&(s=O/p,s%1))throw"can\'t guess dimensions"}else if(p=O/s,p%1)throw"can\'t guess dimensions";return{width:s,height:p}}function zt(i){z.textureColor=new Uint8Array([i[0]*255,i[1]*255,i[2]*255,i[3]*255])}function Ht(i){x.copyExistingProperties(i,z),i.textureColor&&zt(i.textureColor)}function Hr(i,u){u.colorspaceConversion!==void 0&&i.pixelStorei(R,u.colorspaceConversion),u.premultiplyAlpha!==void 0&&i.pixelStorei(Z,u.premultiplyAlpha),u.flipY!==void 0&&i.pixelStorei(J,u.flipY)}function dt(i){i.pixelStorei(r,4),m.isWebGL2(i)&&(i.pixelStorei(t,0),i.pixelStorei(n,0),i.pixelStorei(v,0),i.pixelStorei(d,0),i.pixelStorei(_,0))}function Et(i,u,s,p){p.minMag&&(s.call(i,u,Pe,p.minMag),s.call(i,u,Xe,p.minMag)),p.min&&s.call(i,u,Pe,p.min),p.mag&&s.call(i,u,Xe,p.mag),p.wrap&&(s.call(i,u,De,p.wrap),s.call(i,u,er,p.wrap),(u===A||x.isSampler(i,u))&&s.call(i,u,je,p.wrap)),p.wrapR&&s.call(i,u,je,p.wrapR),p.wrapS&&s.call(i,u,De,p.wrapS),p.wrapT&&s.call(i,u,er,p.wrapT),p.minLod&&s.call(i,u,Ne,p.minLod),p.maxLod&&s.call(i,u,He,p.maxLod),p.baseLevel&&s.call(i,u,wr,p.baseLevel),p.maxLevel&&s.call(i,u,yr,p.maxLevel)}function gt(i,u,s){var p=s.target||de;i.bindTexture(p,u),Et(i,p,i.texParameteri,s)}function wt(i,u,s){Et(i,u,i.samplerParameteri,s)}function xt(i,u){var s=i.createSampler();return wt(i,s,u),s}function on(i,u){var s={};return Object.keys(u).forEach(function(p){s[p]=xt(i,u[p])}),s}function fn(i){return i=i||z.textureColor,y(i)?i:new Uint8Array([i[0]*255,i[1]*255,i[2]*255,i[3]*255])}function Zr(i,u,s,p,O,X){s=s||z.textureOptions,X=X||N;var Y=s.target||de;if(p=p||s.width,O=O||s.height,i.bindTexture(Y,u),Vt(i,p,O,X))i.generateMipmap(Y);else{var j=Wt(X)?ze:_e;i.texParameteri(Y,Pe,j),i.texParameteri(Y,Xe,j),i.texParameteri(Y,De,Ie),i.texParameteri(Y,er,Ie)}}function Jr(i){return i.auto===!0||i.auto===void 0&&i.level===void 0}function ct(i,u){return u=u||{},u.cubeFaceOrder||[D,w,re,fe,Te,Be]}function Tt(i,u){var s=ct(i,u),p=s.map(function(O,X){return{face:O,ndx:X}});return p.sort(function(O,X){return O.face-X.face}),p}function At(i,u,s,p){p=p||z.textureOptions;var O=p.target||de,X=p.level||0,Y=s.width,j=s.height,q=p.internalFormat||p.format||N,se=Nr(q),Re=p.format||se.format,me=p.type||se.type;if(Hr(i,p),i.bindTexture(O,u),O===ge){var Fe=s.width,mr=s.height,Se,ke;if(Fe/6===mr)Se=mr,ke=[0,0,1,0,2,0,3,0,4,0,5,0];else if(mr/6===Fe)Se=Fe,ke=[0,0,0,1,0,2,0,3,0,4,0,5];else if(Fe/3===mr/2)Se=Fe/3,ke=[0,0,1,0,2,0,0,1,1,1,2,1];else if(Fe/2===mr/3)Se=Fe/2,ke=[0,0,1,0,0,1,1,1,0,2,1,2];else throw"can\'t figure out cube map from element: "+(s.src?s.src:s.nodeName);var qe=M();qe?(qe.canvas.width=Se,qe.canvas.height=Se,Y=Se,j=Se,Tt(i,p).forEach(function(jr){var cn=ke[jr.ndx*2+0]*Se,sn=ke[jr.ndx*2+1]*Se;qe.drawImage(s,cn,sn,Se,Se,0,0,Se,Se),i.texImage2D(jr.face,X,q,Re,me,qe.canvas)}),qe.canvas.width=1,qe.canvas.height=1):typeof createImageBitmap<"u"&&(Y=Se,j=Se,Tt(i,p).forEach(function(jr){var cn=ke[jr.ndx*2+0]*Se,sn=ke[jr.ndx*2+1]*Se;i.texImage2D(jr.face,X,q,Se,Se,0,Re,me,null),createImageBitmap(s,cn,sn,Se,Se,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then(function(Zn){Hr(i,p),i.bindTexture(O,u),i.texImage2D(jr.face,X,q,Re,me,Zn),Jr(p)&&Zr(i,u,p,Y,j,q)})}))}else if(O===A||O===F){var ur=Math.min(s.width,s.height),Pr=Math.max(s.width,s.height),Or=Pr/ur;if(Or%1!==0)throw"can not compute 3D dimensions of element";var Yr=s.width===Pr?1:0,Br=s.height===Pr?1:0;i.pixelStorei(r,1),i.pixelStorei(t,s.width),i.pixelStorei(n,0),i.pixelStorei(_,0),i.texImage3D(O,X,q,ur,ur,ur,0,Re,me,null);for(var Ur=0;Ur<Or;++Ur){var Mt=Ur*ur*Yr,Lr=Ur*ur*Br;i.pixelStorei(v,Mt),i.pixelStorei(d,Lr),i.texSubImage3D(O,X,0,0,Ur,ur,ur,1,Re,me,s)}dt(i)}else i.texImage2D(O,X,q,Re,me,s);Jr(p)&&Zr(i,u,p,Y,j,q),gt(i,u,p)}function Xr(){}function St(i){if(typeof document<"u"){var u=document.createElement("a");return u.href=i,u.hostname===location.hostname&&u.port===location.port&&u.protocol===location.protocol}else{var s=new URL(location.href).origin,p=new URL(i,location.href).origin;return p===s}}function un(i,u){return u===void 0&&!St(i)?"anonymous":u}function Xt(i,u,s){s=s||Xr;var p;if(u=u!==void 0?u:z.crossOrigin,u=un(i,u),typeof Image<"u"){p=new Image,u!==void 0&&(p.crossOrigin=u);var O=function(){p.removeEventListener("error",X),p.removeEventListener("load",Y),p=null},X=function(){var Fe="couldn\'t load image: "+i;x.error(Fe),s(Fe,p),O()},Y=function(){s(null,p),O()};return p.addEventListener("error",X),p.addEventListener("load",Y),p.src=i,p}else if(typeof ImageBitmap<"u"){var j,q,se=function(){s(j,q)},Re={};u&&(Re.mode="cors"),fetch(i,Re).then(function(me){if(!me.ok)throw me;return me.blob()}).then(function(me){return createImageBitmap(me,{premultiplyAlpha:"none",colorSpaceConversion:"none"})}).then(function(me){q=me,setTimeout(se)}).catch(function(me){j=me,setTimeout(se)}),p=null}return p}function Ft(i){return typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof ImageData<"u"&&i instanceof ImageData||typeof HTMLElement<"u"&&i instanceof HTMLElement}function Pt(i,u,s){return Ft(i)?(setTimeout(function(){s(null,i)}),i):Xt(i,u,s)}function et(i,u,s){s=s||z.textureOptions;var p=s.target||de;if(i.bindTexture(p,u),s.color!==!1){var O=fn(s.color);if(p===ge)for(var X=0;X<6;++X)i.texImage2D(D+X,0,N,1,1,0,N,$e,O);else p===A||p===F?i.texImage3D(p,0,N,1,1,1,0,N,$e,O):i.texImage2D(p,0,N,1,1,0,N,$e,O)}}function Yt(i,u,s,p){p=p||Xr,s=s||z.textureOptions,et(i,u,s),s=Object.assign({},s);var O=Pt(s.src,s.crossOrigin,function(X,Y){X?p(X,u,Y):(At(i,u,Y,s),p(null,u,Y))});return O}function Kt(i,u,s,p){p=p||Xr;var O=s.src;if(O.length!==6)throw"there must be 6 urls for a cubemap";var X=s.level||0,Y=s.internalFormat||s.format||N,j=Nr(Y),q=s.format||j.format,se=s.type||$e,Re=s.target||de;if(Re!==ge)throw"target must be TEXTURE_CUBE_MAP";et(i,u,s),s=Object.assign({},s);var me=6,Fe=[],mr=ct(i,s),Se;function ke(qe){return function(ur,Pr){--me,ur?Fe.push(ur):Pr.width!==Pr.height?Fe.push("cubemap face img is not a square: "+Pr.src):(Hr(i,s),i.bindTexture(Re,u),me===5?ct(i).forEach(function(Or){i.texImage2D(Or,X,Y,q,se,Pr)}):i.texImage2D(qe,X,Y,q,se,Pr),Jr(s)&&i.generateMipmap(Re)),me===0&&p(Fe.length?Fe:void 0,u,Se)}}Se=O.map(function(qe,ur){return Pt(qe,s.crossOrigin,ke(mr[ur]))})}function a(i,u,s,p){p=p||Xr;var O=s.src,X=s.internalFormat||s.format||N,Y=Nr(X),j=s.format||Y.format,q=s.type||$e,se=s.target||F;if(se!==A&&se!==F)throw"target must be TEXTURE_3D or TEXTURE_2D_ARRAY";et(i,u,s),s=Object.assign({},s);var Re=O.length,me=[],Fe,mr=s.level||0,Se=s.width,ke=s.height,qe=O.length,ur=!0;function Pr(Or){return function(Yr,Br){if(--Re,Yr)me.push(Yr);else{if(Hr(i,s),i.bindTexture(se,u),ur){ur=!1,Se=s.width||Br.width,ke=s.height||Br.height,i.texImage3D(se,mr,X,Se,ke,qe,0,j,q,null);for(var Ur=0;Ur<qe;++Ur)i.texSubImage3D(se,mr,0,0,Ur,Se,ke,1,j,q,Br)}else{var Mt=Br,Lr;(Br.width!==Se||Br.height!==ke)&&(Lr=M(),Mt=Lr.canvas,Lr.canvas.width=Se,Lr.canvas.height=ke,Lr.drawImage(Br,0,0,Se,ke)),i.texSubImage3D(se,mr,0,0,Or,Se,ke,1,j,q,Mt),Lr&&Mt===Lr.canvas&&(Lr.canvas.width=0,Lr.canvas.height=0)}Jr(s)&&i.generateMipmap(se)}Re===0&&p(me.length?me:void 0,u,Fe)}}Fe=O.map(function(Or,Yr){return Pt(Or,s.crossOrigin,Pr(Yr))})}function h(i,u,s,p){p=p||z.textureOptions;var O=p.target||de;i.bindTexture(O,u);var X=p.width,Y=p.height,j=p.depth,q=p.level||0,se=p.internalFormat||p.format||N,Re=Nr(se),me=p.format||Re.format,Fe=p.type||bt(i,s,Re.type);if(y(s))s instanceof Uint8ClampedArray&&(s=new Uint8Array(s.buffer));else{var mr=T.getTypedArrayTypeForGLType(Fe);s=new mr(s)}var Se=Gt(se,Fe),ke=s.byteLength/Se;if(ke%1)throw"length wrong size for format: "+m.glEnumToString(i,me);var qe;if(O===A||O===F)if(!X&&!Y&&!j){var ur=Math.cbrt(ke);if(ur%1!==0)throw"can\'t guess cube size of array of numElements: "+ke;X=ur,Y=ur,j=ur}else X&&(!Y||!j)?(qe=ut(i,O,Y,j,ke/X),Y=qe.width,j=qe.height):Y&&(!X||!j)?(qe=ut(i,O,X,j,ke/Y),X=qe.width,j=qe.height):(qe=ut(i,O,X,Y,ke/j),X=qe.width,Y=qe.height);else qe=ut(i,O,X,Y,ke),X=qe.width,Y=qe.height;if(dt(i),i.pixelStorei(r,p.unpackAlignment||1),Hr(i,p),O===ge){var Pr=Se/s.BYTES_PER_ELEMENT,Or=ke/6*Pr;Tt(i,p).forEach(function(Yr){var Br=Or*Yr.ndx,Ur=s.subarray(Br,Br+Or);i.texImage2D(Yr.face,q,se,X,Y,0,me,Fe,Ur)})}else O===A||O===F?i.texImage3D(O,q,se,X,Y,j,0,me,Fe,s):i.texImage2D(O,q,se,X,Y,0,me,Fe,s);return{width:X,height:Y,depth:j,type:Fe}}function l(i,u,s){var p=s.target||de;i.bindTexture(p,u);var O=s.level||0,X=s.internalFormat||s.format||N,Y=Nr(X),j=s.format||Y.format,q=s.type||Y.type;if(Hr(i,s),p===ge)for(var se=0;se<6;++se)i.texImage2D(D+se,O,X,s.width,s.height,0,j,q,null);else p===A||p===F?i.texImage3D(p,O,X,s.width,s.height,s.depth,0,j,q,null):i.texImage2D(p,O,X,s.width,s.height,0,j,q,null)}function V(i,u,s){s=s||Xr,u=u||z.textureOptions;var p=i.createTexture(),O=u.target||de,X=u.width||1,Y=u.height||1,j=u.internalFormat||N;i.bindTexture(O,p),O===ge&&(i.texParameteri(O,De,Ie),i.texParameteri(O,er,Ie));var q=u.src;if(q)if(typeof q=="function"&&(q=q(i,u)),typeof q=="string")Yt(i,p,u,s);else if(y(q)||Array.isArray(q)&&(typeof q[0]=="number"||Array.isArray(q[0])||y(q[0]))){var se=h(i,p,q,u);X=se.width,Y=se.height}else Array.isArray(q)&&(typeof q[0]=="string"||Ft(q[0]))?O===ge?Kt(i,p,u,s):a(i,p,u,s):(At(i,p,q,u),X=q.width,Y=q.height);else l(i,p,u);return Jr(u)&&Zr(i,p,u,X,Y,j),gt(i,p,u),p}function W(i,u,s,p,O,X){p=p||s.width,O=O||s.height,X=X||s.depth;var Y=s.target||de;i.bindTexture(Y,u);var j=s.level||0,q=s.internalFormat||s.format||N,se=Nr(q),Re=s.format||se.format,me,Fe=s.src;if(Fe&&(y(Fe)||Array.isArray(Fe)&&typeof Fe[0]=="number")?me=s.type||bt(i,Fe,se.type):me=s.type||se.type,Y===ge)for(var mr=0;mr<6;++mr)i.texImage2D(D+mr,j,q,p,O,0,Re,me,null);else Y===A||Y===F?i.texImage3D(Y,j,q,p,O,X,0,Re,me,null):i.texImage2D(Y,j,q,p,O,0,Re,me,null)}function L(i){return typeof i=="string"||Array.isArray(i)&&typeof i[0]=="string"}function K(i,u,s){s=s||Xr;var p=0,O=[],X={},Y={};function j(){p===0&&setTimeout(function(){s(O.length?O:void 0,X,Y)},0)}return Object.keys(u).forEach(function(q){var se=u[q],Re;L(se.src)&&(Re=function(Fe,mr,Se){Y[q]=Se,--p,Fe&&O.push(Fe),j()},++p),X[q]=V(i,se,Re)}),j(),X}}),"./src/twgl-full.js":(function(f,e,o){"use strict";function c(y){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(I){return typeof I}:c=function(I){return I&&typeof Symbol=="function"&&I.constructor===Symbol&&I!==Symbol.prototype?"symbol":typeof I},c(y)}e.__esModule=!0;var m={m4:!0,v3:!0,primitives:!0};e.primitives=e.v3=e.m4=void 0;var T=z(o("./src/m4.js"));e.m4=T;var x=z(o("./src/v3.js"));e.v3=x;var b=z(o("./src/primitives.js"));e.primitives=b;var S=o("./src/twgl.js");Object.keys(S).forEach(function(y){y==="default"||y==="__esModule"||Object.prototype.hasOwnProperty.call(m,y)||(e[y]=S[y])});function G(){if(typeof WeakMap!="function")return null;var y=new WeakMap;return G=function(){return y},y}function z(y){if(y&&y.__esModule)return y;if(y===null||c(y)!=="object"&&typeof y!="function")return{default:y};var M=G();if(M&&M.has(y))return M.get(y);var I={},C=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var N in y)if(Object.prototype.hasOwnProperty.call(y,N)){var ee=C?Object.getOwnPropertyDescriptor(y,N):null;ee&&(ee.get||ee.set)?Object.defineProperty(I,N,ee):I[N]=y[N]}return I.default=y,M&&M.set(y,I),I}}),"./src/twgl.js":(function(f,e,o){"use strict";function c(w){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(fe){return typeof fe}:c=function(fe){return fe&&typeof Symbol=="function"&&fe.constructor===Symbol&&fe!==Symbol.prototype?"symbol":typeof fe},c(w)}e.__esModule=!0;var m={addExtensionsToContext:!0,getContext:!0,getWebGLContext:!0,resizeCanvasToDisplaySize:!0,setDefaults:!0,attributes:!0,textures:!0,utils:!0,draw:!0,framebuffers:!0,programs:!0,typedarrays:!0,vertexArrays:!0};e.addExtensionsToContext=ze,e.getContext=F,e.getWebGLContext=ge,e.resizeCanvasToDisplaySize=D,e.setDefaults=Ee,e.vertexArrays=e.typedarrays=e.programs=e.framebuffers=e.draw=e.utils=e.textures=e.attributes=void 0;var T=N(o("./src/attributes.js"));e.attributes=T,Object.keys(T).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=T[w])});var x=N(o("./src/textures.js"));e.textures=x,Object.keys(x).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=x[w])});var b=N(o("./src/helper.js")),S=N(o("./src/utils.js"));e.utils=S,Object.keys(S).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=S[w])});var G=N(o("./src/draw.js"));e.draw=G,Object.keys(G).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=G[w])});var z=N(o("./src/framebuffers.js"));e.framebuffers=z,Object.keys(z).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=z[w])});var y=N(o("./src/programs.js"));e.programs=y,Object.keys(y).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=y[w])});var M=N(o("./src/typedarrays.js"));e.typedarrays=M,Object.keys(M).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=M[w])});var I=N(o("./src/vertex-arrays.js"));e.vertexArrays=I,Object.keys(I).forEach(function(w){w==="default"||w==="__esModule"||Object.prototype.hasOwnProperty.call(m,w)||(e[w]=I[w])});function C(){if(typeof WeakMap!="function")return null;var w=new WeakMap;return C=function(){return w},w}function N(w){if(w&&w.__esModule)return w;if(w===null||c(w)!=="object"&&typeof w!="function")return{default:w};var re=C();if(re&&re.has(w))return re.get(w);var fe={},Te=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Be in w)if(Object.prototype.hasOwnProperty.call(w,Be)){var Pe=Te?Object.getOwnPropertyDescriptor(w,Be):null;Pe&&(Pe.get||Pe.set)?Object.defineProperty(fe,Be,Pe):fe[Be]=w[Be]}return fe.default=w,re&&re.set(w,fe),fe}var ee=void 0,Me={addExtensionsToContext:!0};function Ee(w){b.copyExistingProperties(w,Me),T.setAttributeDefaults_(w),x.setTextureDefaults_(w)}var xe=/^(.*?)_/;function Ie(w,re){S.glEnumToString(w,0);var fe=w.getExtension(re);if(fe){var Te={},Be=xe.exec(re)[1],Pe="_"+Be;for(var Xe in fe){var De=fe[Xe],er=typeof De=="function",je=er?Be:Pe,Ne=Xe;Xe.endsWith(je)&&(Ne=Xe.substring(0,Xe.length-je.length)),w[Ne]!==void 0?!er&&w[Ne]!==De&&b.warn(Ne,w[Ne],De,Xe):er?w[Ne]=(function(He){return function(){return He.apply(fe,arguments)}})(De):(w[Ne]=De,Te[Ne]=De)}Te.constructor={name:fe.constructor.name},S.glEnumToString(Te,0)}return fe}var _e=["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_float","EXT_color_buffer_half_float","EXT_disjoint_timer_query","EXT_disjoint_timer_query_webgl2","EXT_frag_depth","EXT_sRGB","EXT_shader_texture_lod","EXT_texture_filter_anisotropic","OES_element_index_uint","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_pvrtc","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_depth_texture","WEBGL_draw_buffers"];function ze(w){for(var re=0;re<_e.length;++re)Ie(w,_e[re])}function de(w,re){for(var fe=["webgl","experimental-webgl"],Te=null,Be=0;Be<fe.length;++Be)if(Te=w.getContext(fe[Be],re),Te){Me.addExtensionsToContext&&ze(Te);break}return Te}function ge(w,re){var fe=de(w,re);return fe}function A(w,re){for(var fe=["webgl2","webgl","experimental-webgl"],Te=null,Be=0;Be<fe.length;++Be)if(Te=w.getContext(fe[Be],re),Te){Me.addExtensionsToContext&&ze(Te);break}return Te}function F(w,re){var fe=A(w,re);return fe}function D(w,re){re=re||1,re=Math.max(0,re);var fe=w.clientWidth*re|0,Te=w.clientHeight*re|0;return w.width!==fe||w.height!==Te?(w.width=fe,w.height=Te,!0):!1}}),"./src/typedarrays.js":(function(f,e,o){"use strict";e.__esModule=!0,e.getGLTypeForTypedArray=ze,e.getGLTypeForTypedArrayType=de,e.getTypedArrayTypeForGLType=ge,e.isArrayBuffer=void 0;var c=void 0,m=5120,T=5121,x=5122,b=5123,S=5124,G=5125,z=5126,y=32819,M=32820,I=33635,C=5131,N=33640,ee=35899,Me=35902,Ee=36269,xe=34042,Ie={};{var _e=Ie;_e[m]=Int8Array,_e[T]=Uint8Array,_e[x]=Int16Array,_e[b]=Uint16Array,_e[S]=Int32Array,_e[G]=Uint32Array,_e[z]=Float32Array,_e[y]=Uint16Array,_e[M]=Uint16Array,_e[I]=Uint16Array,_e[C]=Uint16Array,_e[N]=Uint32Array,_e[ee]=Uint32Array,_e[Me]=Uint32Array,_e[Ee]=Uint32Array,_e[xe]=Uint32Array}function ze(F){if(F instanceof Int8Array)return m;if(F instanceof Uint8Array||F instanceof Uint8ClampedArray)return T;if(F instanceof Int16Array)return x;if(F instanceof Uint16Array)return b;if(F instanceof Int32Array)return S;if(F instanceof Uint32Array)return G;if(F instanceof Float32Array)return z;throw new Error("unsupported typed array type")}function de(F){if(F===Int8Array)return m;if(F===Uint8Array||F===Uint8ClampedArray)return T;if(F===Int16Array)return x;if(F===Uint16Array)return b;if(F===Int32Array)return S;if(F===Uint32Array)return G;if(F===Float32Array)return z;throw new Error("unsupported typed array type")}function ge(F){var D=Ie[F];if(!D)throw new Error("unknown gl type");return D}var A=typeof SharedArrayBuffer<"u"?function(D){return D&&D.buffer&&(D.buffer instanceof ArrayBuffer||D.buffer instanceof SharedArrayBuffer)}:function(D){return D&&D.buffer&&D.buffer instanceof ArrayBuffer};e.isArrayBuffer=A}),"./src/utils.js":(function(f,e,o){"use strict";e.__esModule=!0,e.isWebGL1=m,e.isWebGL2=c,e.glEnumToString=void 0;function c(x){return!!x.texStorage2D}function m(x){return!x.texStorage2D}var T=(function(){var x={},b={};function S(G){var z=G.constructor.name;if(!x[z]){for(var y in G)if(typeof G[y]=="number"){var M=b[G[y]];b[G[y]]=M?"".concat(M," | ").concat(y):y}x[z]=!0}}return function(z,y){return S(z),b[y]||(typeof y=="number"?"0x".concat(y.toString(16)):y)}})();e.glEnumToString=T}),"./src/v3.js":(function(f,e,o){"use strict";e.__esModule=!0,e.add=x,e.copy=ze,e.create=T,e.cross=C,e.distance=Ee,e.distanceSq=xe,e.divide=ge,e.divScalar=I,e.dot=N,e.lerp=S,e.lerpV=G,e.length=ee,e.lengthSq=Me,e.max=z,e.min=y,e.mulScalar=M,e.multiply=de,e.negate=_e,e.normalize=Ie,e.setDefaultType=m,e.subtract=b;var c=Float32Array;function m(A){var F=c;return c=A,F}function T(A,F,D){var w=new c(3);return A&&(w[0]=A),F&&(w[1]=F),D&&(w[2]=D),w}function x(A,F,D){return D=D||new c(3),D[0]=A[0]+F[0],D[1]=A[1]+F[1],D[2]=A[2]+F[2],D}function b(A,F,D){return D=D||new c(3),D[0]=A[0]-F[0],D[1]=A[1]-F[1],D[2]=A[2]-F[2],D}function S(A,F,D,w){return w=w||new c(3),w[0]=A[0]+D*(F[0]-A[0]),w[1]=A[1]+D*(F[1]-A[1]),w[2]=A[2]+D*(F[2]-A[2]),w}function G(A,F,D,w){return w=w||new c(3),w[0]=A[0]+D[0]*(F[0]-A[0]),w[1]=A[1]+D[1]*(F[1]-A[1]),w[2]=A[2]+D[2]*(F[2]-A[2]),w}function z(A,F,D){return D=D||new c(3),D[0]=Math.max(A[0],F[0]),D[1]=Math.max(A[1],F[1]),D[2]=Math.max(A[2],F[2]),D}function y(A,F,D){return D=D||new c(3),D[0]=Math.min(A[0],F[0]),D[1]=Math.min(A[1],F[1]),D[2]=Math.min(A[2],F[2]),D}function M(A,F,D){return D=D||new c(3),D[0]=A[0]*F,D[1]=A[1]*F,D[2]=A[2]*F,D}function I(A,F,D){return D=D||new c(3),D[0]=A[0]/F,D[1]=A[1]/F,D[2]=A[2]/F,D}function C(A,F,D){D=D||new c(3);var w=A[2]*F[0]-A[0]*F[2],re=A[0]*F[1]-A[1]*F[0];return D[0]=A[1]*F[2]-A[2]*F[1],D[1]=w,D[2]=re,D}function N(A,F){return A[0]*F[0]+A[1]*F[1]+A[2]*F[2]}function ee(A){return Math.sqrt(A[0]*A[0]+A[1]*A[1]+A[2]*A[2])}function Me(A){return A[0]*A[0]+A[1]*A[1]+A[2]*A[2]}function Ee(A,F){var D=A[0]-F[0],w=A[1]-F[1],re=A[2]-F[2];return Math.sqrt(D*D+w*w+re*re)}function xe(A,F){var D=A[0]-F[0],w=A[1]-F[1],re=A[2]-F[2];return D*D+w*w+re*re}function Ie(A,F){F=F||new c(3);var D=A[0]*A[0]+A[1]*A[1]+A[2]*A[2],w=Math.sqrt(D);return w>1e-5?(F[0]=A[0]/w,F[1]=A[1]/w,F[2]=A[2]/w):(F[0]=0,F[1]=0,F[2]=0),F}function _e(A,F){return F=F||new c(3),F[0]=-A[0],F[1]=-A[1],F[2]=-A[2],F}function ze(A,F){return F=F||new c(3),F[0]=A[0],F[1]=A[1],F[2]=A[2],F}function de(A,F,D){return D=D||new c(3),D[0]=A[0]*F[0],D[1]=A[1]*F[1],D[2]=A[2]*F[2],D}function ge(A,F,D){return D=D||new c(3),D[0]=A[0]/F[0],D[1]=A[1]/F[1],D[2]=A[2]/F[2],D}}),"./src/vertex-arrays.js":(function(f,e,o){"use strict";function c(y){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?c=function(I){return typeof I}:c=function(I){return I&&typeof Symbol=="function"&&I.constructor===Symbol&&I!==Symbol.prototype?"symbol":typeof I},c(y)}e.__esModule=!0,e.createVertexArrayInfo=S,e.createVAOAndSetAttributes=G,e.createVAOFromBufferInfo=z;var m=x(o("./src/programs.js"));function T(){if(typeof WeakMap!="function")return null;var y=new WeakMap;return T=function(){return y},y}function x(y){if(y&&y.__esModule)return y;if(y===null||c(y)!=="object"&&typeof y!="function")return{default:y};var M=T();if(M&&M.has(y))return M.get(y);var I={},C=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var N in y)if(Object.prototype.hasOwnProperty.call(y,N)){var ee=C?Object.getOwnPropertyDescriptor(y,N):null;ee&&(ee.get||ee.set)?Object.defineProperty(I,N,ee):I[N]=y[N]}return I.default=y,M&&M.set(y,I),I}var b=34963;function S(y,M,I){var C=y.createVertexArray();return y.bindVertexArray(C),M.length||(M=[M]),M.forEach(function(N){m.setBuffersAndAttributes(y,N,I)}),y.bindVertexArray(null),{numElements:I.numElements,elementType:I.elementType,vertexArrayObject:C}}function G(y,M,I,C){var N=y.createVertexArray();return y.bindVertexArray(N),m.setAttributes(M,I),C&&y.bindBuffer(b,C),y.bindVertexArray(null),N}function z(y,M,I){return G(y,M.attribSetters||M,I.attribs,I.indices)}})})})});var xn=oa(wn(),1),{m4:Tn,v3:qt}=xn.default;var dr={color:{uniformName:"u_color",mask:1,converter:f=>f/200%1,shapeChanges:!1},fisheye:{uniformName:"u_fisheye",mask:2,converter:f=>Math.max(0,(f+100)/100),shapeChanges:!0},whirl:{uniformName:"u_whirl",mask:4,converter:f=>-f*Math.PI/180,shapeChanges:!0},pixelate:{uniformName:"u_pixelate",mask:8,converter:f=>Math.abs(f)/10,shapeChanges:!0},mosaic:{uniformName:"u_mosaic",mask:16,converter:f=>Math.max(1,Math.min(Math.round((Math.abs(f)+10)/10),512)),shapeChanges:!0},brightness:{uniformName:"u_brightness",mask:32,converter:f=>Math.max(-100,Math.min(f,100))/100,shapeChanges:!1},ghost:{uniformName:"u_ghost",mask:64,converter:f=>1-Math.max(0,Math.min(f,100))/100,shapeChanges:!1}},fa=Object.keys(dr),An=dr.fisheye.mask|dr.whirl.mask|dr.pixelate.mask|dr.mosaic.mask,rt=.5,tt=.5,ua=[0,0,0];function ca([f,e,o],c){let m=0,T=f/255,x=e/255,b=o/255,S=0;x<b&&(S=x,x=b,b=S,m=-1),T<x&&(S=T,T=x,x=S,m=-2/6-m);let G=T-Math.min(x,b);return c[0]=Math.abs(m+(x-b)/(6*G+Number.EPSILON)),c[1]=G/(T+Number.EPSILON),c[2]=T,c}function sa([f,e,o],c){if(e===0)return c[0]=c[1]=c[2]=o*255+.5,c;let m=f%1,T=m*6|0,x=m*6-T,b=o*(1-e),S=o*(1-e*x),G=o*(1-e*(1-x)),z=0,y=0,M=0;switch(T){case 0:z=o,y=G,M=b;break;case 1:z=S,y=o,M=b;break;case 2:z=b,y=o,M=G;break;case 3:z=b,y=S,M=o;break;case 4:z=G,y=b,M=o;break;case 5:z=o,y=b,M=S;break}return c[0]=z*255+.5,c[1]=y*255+.5,c[2]=M*255+.5,c}function $t(f,e,o){if(e[3]===0)return e;let c=f.enabledEffects;typeof o=="number"&&(c&=o);let m=f.uniforms,T=(c&dr.color.mask)!==0,x=(c&dr.brightness.mask)!==0;if(T||x){let b=e[3]/255;if(e[0]/=b,e[1]/=b,e[2]/=b,T){let S=ca(e,ua),G=.11/2,z=.09;S[2]<G?(S[0]=0,S[1]=1,S[2]=G):S[1]<z&&(S[0]=0,S[1]=z),S[0]=m.u_color+S[0]+1,sa(S,e)}if(x){let S=m.u_brightness*255;e[0]+=S,e[1]+=S,e[2]+=S}e[0]*=b,e[1]*=b,e[2]*=b}return(c&dr.ghost.mask)!==0&&(e[0]*=m.u_ghost,e[1]*=m.u_ghost,e[2]*=m.u_ghost,e[3]*=m.u_ghost),e}function Sn(f,e,o){qt.copy(e,o);let c=f.enabledEffects,m=f.uniforms;if((c&dr.mosaic.mask)!==0&&(o[0]=m.u_mosaic*o[0]%1,o[1]=m.u_mosaic*o[1]%1),(c&dr.pixelate.mask)!==0){f.skin.getTexture();let T=f.skin.size,x=T[0]/m.u_pixelate,b=T[1]/m.u_pixelate;o[0]=(Math.floor(o[0]*x)+rt)/x,o[1]=(Math.floor(o[1]*b)+tt)/b}if((c&dr.whirl.mask)!==0){let x=o[0]-rt,b=o[1]-tt,S=Math.sqrt(Math.pow(x,2)+Math.pow(b,2)),G=Math.max(1-S/.5,0),z=m.u_whirl*G*G,y=Math.sin(z),M=Math.cos(z);o[0]=M*x+y*b+rt,o[1]=-y*x+M*b+tt}if((c&dr.fisheye.mask)!==0){let T=(o[0]-rt)/rt,x=(o[1]-tt)/tt,b=Math.sqrt(T*T+x*x),S=Math.pow(Math.min(b,1),m.u_fisheye)*Math.max(1,b),G=T/b,z=x/b;o[0]=rt+S*G*rt,o[1]=tt+S*z*tt}return o}var la=qt.create(),Fn=1e-6,Ya=Tn.ortho(-1,1,-1,1,-1,1);function Pn(f,e){let o=la,c=e[0],m=e[1],T=f.inverseMatrix,x=c*T[3]+m*T[7]+T[15];return o[0]=.5-(c*T[0]+m*T[4]+T[12])/x,o[1]=(c*T[1]+m*T[5]+T[13])/x+.5,Math.abs(o[0])<Fn&&(o[0]=0),Math.abs(o[1])<Fn&&(o[1]=0),f.enabledEffects!==0&&o[0]>=0&&o[0]<1&&o[1]>=0&&o[1]<1&&Sn(f,o,o),o}var Qt=(f,e)=>e^(f^e)&f-e>>31,Zt=(f,e)=>f^(f^e)&f-e>>31,Bt=(f,e,o)=>e>=f.width||o>=f.height||e<0||o<0?0:f.data[(o*f.width+e)*4+3],Mn=(f,e,o,c)=>{let m=Zt(0,Qt(e,f.width-1)),T=Zt(0,Qt(o,f.height-1));if(m>=f.width||T>=f.height||m<0||T<0)return c.fill(0);let x=(T*f.width+m)*4,b=f.data,S=b[x+3]/255;return c[0]=b[x]*S,c[1]=b[x+1]*S,c[2]=b[x+2]*S,c[3]=b[x+3],c},va=(f,e,o,c)=>{let m=Zt(0,Qt(e,f.width-1)),x=(Zt(0,Qt(o,f.height-1))*f.width+m)*4,b=f.data;return c[0]=b[x],c[1]=b[x+1],c[2]=b[x+2],c[3]=b[x+3],c},jt=[new Uint8ClampedArray(4),new Uint8ClampedArray(4),new Uint8ClampedArray(4),new Uint8ClampedArray(4)],Jt=class{constructor(){this.width=0,this.height=0,this.data=null,this.premultiplied=!1,this.colorAt=Mn}update(e,o,c,m=!1){this.width=e,this.height=o,e&&o&&(this.data=c,this.premultiplied=m,this.colorAt=m?va:Mn)}colorAtNearest(e,o){return this.data?this.colorAt(this,Math.floor(e[0]*(this.width-1)),Math.floor(e[1]*(this.height-1)),o):o.fill(0)}colorAtLinear(e,o){if(!this.data)return o.fill(0);let c=e[0]*(this.width-1),m=e[1]*(this.height-1),T=c%1,x=m%1,b=1-T,S=1-x,G=Math.floor(c),z=Math.floor(m),y=this.colorAt(this,G,z,jt[0]),M=this.colorAt(this,G+1,z,jt[1]),I=this.colorAt(this,G,z+1,jt[2]),C=this.colorAt(this,G+1,z+1,jt[3]);return o[0]=y[0]*b*S+I[0]*b*x+M[0]*T*S+C[0]*T*x,o[1]=y[1]*b*S+I[1]*b*x+M[1]*T*S+C[1]*T*x,o[2]=y[2]*b*S+I[2]*b*x+M[2]*T*S+C[2]*T*x,o[3]=y[3]*b*S+I[3]*b*x+M[3]*T*S+C[3]*T*x,o}isTouchingNearest(e){if(this.data)return Bt(this,Math.floor(e[0]*(this.width-1)),Math.floor(e[1]*(this.height-1)))>0}isTouchingLinear(e){if(!this.data)return;let o=Math.floor(e[0]*(this.width-1)),c=Math.floor(e[1]*(this.height-1));return Bt(this,o,c)>0||Bt(this,o+1,c)>0||Bt(this,o,c+1)>0||Bt(this,o+1,c+1)>0}};var st=480,lt=360;if(new Uint8Array(new Uint32Array([1]).buffer)[0]!==1)throw new Error("the compositor needs a little-endian platform");function Rn(){let f=new Map;return{rasters:f,apply(e=[],o=[]){for(let c of o)f.delete(c);for(let c of e){if(c.patch){let T=f.get(c.key);if(!T)continue;let{x,y:b,width:S,height:G,data:z}=c.patch;for(let y=0;y<G;y++){let M=y*S*4;T.data.set(z.subarray(M,M+S*4),((b+y)*T.width+x)*4)}continue}let m=new Jt;m.update(c.width,c.height,c.data,c.premultiplied),f.set(c.key,{width:c.width,height:c.height,data:c.data,premultiplied:c.premultiplied,silhouette:m})}}}}var Bn=f=>({inverseMatrix:f.inverse,enabledEffects:f.enabledEffects,ghostOnly:f.enabledEffects===dr.ghost.mask,uniforms:f.uniforms,skin:{size:f.skinSize,getTexture(){}}}),hn=new Uint8ClampedArray(4),vn=new Float32Array(3),ha=dr.color.mask|dr.brightness.mask|dr.ghost.mask,Cn=f=>f.words??(f.words=new Uint32Array(f.data.buffer,f.data.byteOffset,f.data.length>>2)),mn=4278190080;function en(f,e,o,c,m,T){if(T>=255){f[e]=o+.5|c+.5<<8|m+.5<<16|mn;return}let x=1-T/255,b=f[e],S=o+(b&255)*x,G=c+(b>>>8&255)*x,z=m+(b>>>16&255)*x;f[e]=Math.min(255,S+.5|0)|Math.min(255,G+.5|0)<<8|Math.min(255,z+.5|0)<<16|mn}function In(f,e,o,c,m,T,x,b){if(e===null){en(o,c,m,T,x,b);return}if(e.ghostOnly){let G=e.uniforms.u_ghost;G!==0&&en(o,c,m*G,T*G,x*G,b*G);return}let S=hn;S[0]=m,S[1]=T,S[2]=x,S[3]=b,$t(e,S),S[3]!==0&&en(o,c,S[0],S[1],S[2],S[3])}function ma(f,e,o,c,m,T){let{out32:x,rowStart:b,width:S,xScale:G,yScale:z}=m,y=f.inverse,M=e.width,I=e.premultiplied,C=Cn(e),N=M-1,ee=e.height-1,Me=-y[0]*G,Ee=y[1]*G,xe=T===null;for(let Ie=o[0];Ie<=o[1];Ie++){let _e=lt/2-(Ie+.5)*z,ze=(c[0]+.5)*G-st/2,de=.5-(ze*y[0]+_e*y[4]+y[12]),ge=ze*y[1]+_e*y[5]+y[13]+.5,A=(Ie-b)*S+c[0];for(let F=c[0];F<=c[1];F++,A++,de+=Me,ge+=Ee){if(de<0||ge<0||de>1||ge>1)continue;let D=Math.floor(de*N),w=Math.floor(ge*ee);D=D<0?0:D>N?N:D,w=w<0?0:w>ee?ee:w;let re=C[w*M+D],fe=re>>>24;if(fe===0)continue;if(fe===255&&xe){x[A]=re;continue}let Te=I?1:fe/255;In(f,T,x,A,(re&255)*Te,(re>>>8&255)*Te,(re>>>16&255)*Te,fe)}}}function ya(f,e,o,c,m,T){let{out32:x,rowStart:b,width:S,xScale:G,yScale:z}=m,y=f.inverse,M=e.width,I=e.premultiplied,C=Cn(e),N=M-1,ee=e.height-1,Me=-y[0]*G,Ee=y[1]*G;for(let xe=o[0];xe<=o[1];xe++){let Ie=lt/2-(xe+.5)*z,_e=(c[0]+.5)*G-st/2,ze=.5-(_e*y[0]+Ie*y[4]+y[12]),de=_e*y[1]+Ie*y[5]+y[13]+.5,ge=(xe-b)*S+c[0];for(let A=c[0];A<=c[1];A++,ge++,ze+=Me,de+=Ee){if(ze<0||de<0||ze>1||de>1)continue;let F=ze*N,D=de*ee,w=Math.floor(F),re=Math.floor(D),fe=w<0?0:w>N?N:w,Te=w+1>N?N:w+1<0?0:w+1,Be=(re<0?0:re>ee?ee:re)*M,Pe=(re+1>ee?ee:re+1<0?0:re+1)*M,Xe=C[Be+fe],De=C[Be+Te],er=C[Pe+fe],je=C[Pe+Te],Ne=Xe>>>24,He=De>>>24,wr=er>>>24,yr=je>>>24;if((Ne|He|wr|yr)===0)continue;let r=F-w,t=D-re,n=(1-r)*(1-t),v=r*(1-t),d=(1-r)*t,_=r*t,R=I?n:n*Ne/255,Z=I?v:v*He/255,J=I?d:d*wr/255,ne=I?_:_*yr/255;In(f,T,x,ge,(Xe&255)*R+(De&255)*Z+(er&255)*J+(je&255)*ne,(Xe>>>8&255)*R+(De>>>8&255)*Z+(er>>>8&255)*J+(je>>>8&255)*ne,(Xe>>>16&255)*R+(De>>>16&255)*Z+(er>>>16&255)*J+(je>>>16&255)*ne,Ne*n+He*v+wr*d+yr*_)}}}function pa(f,e,o,c,m){let T=(f.enabledEffects&ha)!==0?Bn(f):null;f.nearest?ma(f,e,o,c,m,T):ya(f,e,o,c,m,T)}function _a(f,e,o,c,m){let{out32:T,rowStart:x,width:b,xScale:S,yScale:G}=m,z=Bn(f),y=e.silhouette;for(let M=o[0];M<=o[1];M++){vn[1]=lt/2-(M+.5)*G;let I=(M-x)*b+c[0];for(let C=c[0];C<=c[1];C++,I++){vn[0]=(C+.5)*S-st/2;let N=Pn(z,vn);if(N[0]<0||N[1]<0||N[0]>1||N[1]>1)continue;let ee=f.nearest?y.colorAtNearest(N,hn):y.colorAtLinear(N,hn);f.enabledEffects!==0&&$t(z,ee),ee[3]!==0&&en(T,I,ee[0],ee[1],ee[2],ee[3])}}}function ba(f,e,o,c,m){let T=f.inverse;T[3]===0&&T[7]===0&&T[15]===1&&(f.enabledEffects&An)===0?pa(f,e,o,c,m):_a(f,e,o,c,m)}function Dn(f,e,o,c,m){let{width:T,height:x,background:b}=f,S=st/T,G=lt/x,z=new Uint32Array(m.buffer,m.byteOffset,(c-o)*T);z.fill((b[0]|b[1]<<8|b[2]<<16|mn)>>>0);let y={out32:z,rowStart:o,width:T,xScale:S,yScale:G};for(let M of f.layers){let I=e.get(M.raster);if(!I)continue;let C=[Math.max(0,Math.floor((M.bounds.left+st/2)/S)-1),Math.min(T-1,Math.ceil((M.bounds.right+st/2)/S)+1)],N=[Math.max(o,Math.floor((lt/2-M.bounds.top)/G)-1),Math.min(c-1,Math.ceil((lt/2-M.bounds.bottom)/G)+1)];C[0]>C[1]||N[0]>N[1]||ba(M,I,N,C,y)}return m}var da=(f,e)=>{typeof f.on=="function"?f.on("message",e):f.addEventListener("message",o=>e(o.data))};function Nn(f,{loadRasterizer:e}={}){let o=Rn(),c=null,m=(x,b)=>f.postMessage({job:x,pixels:b.buffer},[b.buffer]);da(f,async x=>{switch(x.type){case"init":c=e(x);break;case"rasters":o.apply(x.rasters,x.dropped);break;case"band":{let{scene:b,rowStart:S,rowEnd:G,job:z}=x,y=new Uint8ClampedArray((G-S)*b.width*4);Dn(b,o.rasters,S,G,y),m(z,y);break}case"rasterize":{let b=await c;m(x.job,b.svg(x.svg,null,x.scale,x.width,x.height));break}}})}var le,Kr=new Array(128).fill(void 0);Kr.push(void 0,null,!0,!1);var Dt=Kr.length;function Sr(f){Dt===Kr.length&&Kr.push(Kr.length+1);let e=Dt;return Dt=Kr[e],Kr[e]=f,e}function Tr(f){return Kr[f]}function Ea(f){f<132||(Kr[f]=Dt,Dt=f)}function qr(f){let e=Tr(f);return Ea(f),e}var Nt=0,Ct=null;function rn(){return(Ct===null||Ct.byteLength===0)&&(Ct=new Uint8Array(le.memory.buffer)),Ct}var tn=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},ga=typeof tn.encodeInto=="function"?function(f,e){return tn.encodeInto(f,e)}:function(f,e){let o=tn.encode(f);return e.set(o),{read:f.length,written:o.length}};function pn(f,e,o){if(o===void 0){let b=tn.encode(f),S=e(b.length,1)>>>0;return rn().subarray(S,S+b.length).set(b),Nt=b.length,S}let c=f.length,m=e(c,1)>>>0,T=rn(),x=0;for(;x<c;x++){let b=f.charCodeAt(x);if(b>127)break;T[m+x]=b}if(x!==c){x!==0&&(f=f.slice(x)),m=o(m,c,c=x+f.length*3,1)>>>0;let b=rn().subarray(m+x,m+c),S=ga(f,b);x+=S.written,m=o(m,c,x,1)>>>0}return Nt=x,m}function _n(f){return f==null}var It=null;function Er(){return(It===null||It.byteLength===0)&&(It=new Int32Array(le.memory.buffer)),It}var Ln=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Ln.decode();function nn(f,e){return f=f>>>0,Ln.decode(rn().subarray(f,f+e))}function wa(f,e){if(!(f instanceof e))throw new Error(`expected instance of ${e.name}`);return f.ptr}function xa(f,e){try{return f.apply(this,e)}catch(o){le.__wbindgen_exn_store(Sr(o))}}var On=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(f=>le.__wbg_bbox_free(f>>>0)),yn=class Gn{static __wrap(e){e=e>>>0;let o=Object.create(Gn.prototype);return o.__wbg_ptr=e,On.register(o,o.__wbg_ptr,o),o}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,On.unregister(this),e}free(){let e=this.__destroy_into_raw();le.__wbg_bbox_free(e)}get x(){return le.__wbg_get_bbox_x(this.__wbg_ptr)}set x(e){le.__wbg_set_bbox_x(this.__wbg_ptr,e)}get y(){return le.__wbg_get_bbox_y(this.__wbg_ptr)}set y(e){le.__wbg_set_bbox_y(this.__wbg_ptr,e)}get width(){return le.__wbg_get_bbox_width(this.__wbg_ptr)}set width(e){le.__wbg_set_bbox_width(this.__wbg_ptr,e)}get height(){return le.__wbg_get_bbox_height(this.__wbg_ptr)}set height(e){le.__wbg_set_bbox_height(this.__wbg_ptr,e)}},Un=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(f=>le.__wbg_renderedimage_free(f>>>0)),Ta=class Vn{static __wrap(e){e=e>>>0;let o=Object.create(Vn.prototype);return o.__wbg_ptr=e,Un.register(o,o.__wbg_ptr,o),o}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Un.unregister(this),e}free(){let e=this.__destroy_into_raw();le.__wbg_renderedimage_free(e)}get width(){return le.renderedimage_width(this.__wbg_ptr)>>>0}get height(){return le.renderedimage_height(this.__wbg_ptr)>>>0}asPng(){try{let m=le.__wbindgen_add_to_stack_pointer(-16);le.renderedimage_asPng(m,this.__wbg_ptr);var e=Er()[m/4+0],o=Er()[m/4+1],c=Er()[m/4+2];if(c)throw qr(o);return qr(e)}finally{le.__wbindgen_add_to_stack_pointer(16)}}get pixels(){let e=le.renderedimage_pixels(this.__wbg_ptr);return qr(e)}},Aa=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(f=>le.__wbg_resvg_free(f>>>0)),Sa=class{__destroy_into_raw(){let f=this.__wbg_ptr;return this.__wbg_ptr=0,Aa.unregister(this),f}free(){let f=this.__destroy_into_raw();le.__wbg_resvg_free(f)}constructor(f,e,o){try{let S=le.__wbindgen_add_to_stack_pointer(-16);var c=_n(e)?0:pn(e,le.__wbindgen_malloc,le.__wbindgen_realloc),m=Nt;le.resvg_new(S,Sr(f),c,m,_n(o)?0:Sr(o));var T=Er()[S/4+0],x=Er()[S/4+1],b=Er()[S/4+2];if(b)throw qr(x);return this.__wbg_ptr=T>>>0,this}finally{le.__wbindgen_add_to_stack_pointer(16)}}get width(){return le.resvg_width(this.__wbg_ptr)}get height(){return le.resvg_height(this.__wbg_ptr)}render(){try{let c=le.__wbindgen_add_to_stack_pointer(-16);le.resvg_render(c,this.__wbg_ptr);var f=Er()[c/4+0],e=Er()[c/4+1],o=Er()[c/4+2];if(o)throw qr(e);return Ta.__wrap(f)}finally{le.__wbindgen_add_to_stack_pointer(16)}}toString(){let f,e;try{let m=le.__wbindgen_add_to_stack_pointer(-16);le.resvg_toString(m,this.__wbg_ptr);var o=Er()[m/4+0],c=Er()[m/4+1];return f=o,e=c,nn(o,c)}finally{le.__wbindgen_add_to_stack_pointer(16),le.__wbindgen_free(f,e,1)}}innerBBox(){let f=le.resvg_innerBBox(this.__wbg_ptr);return f===0?void 0:yn.__wrap(f)}getBBox(){let f=le.resvg_getBBox(this.__wbg_ptr);return f===0?void 0:yn.__wrap(f)}cropByBBox(f){wa(f,yn),le.resvg_cropByBBox(this.__wbg_ptr,f.__wbg_ptr)}imagesToResolve(){try{let c=le.__wbindgen_add_to_stack_pointer(-16);le.resvg_imagesToResolve(c,this.__wbg_ptr);var f=Er()[c/4+0],e=Er()[c/4+1],o=Er()[c/4+2];if(o)throw qr(e);return qr(f)}finally{le.__wbindgen_add_to_stack_pointer(16)}}resolveImage(f,e){try{let m=le.__wbindgen_add_to_stack_pointer(-16),T=pn(f,le.__wbindgen_malloc,le.__wbindgen_realloc),x=Nt;le.resvg_resolveImage(m,this.__wbg_ptr,T,x,Sr(e));var o=Er()[m/4+0],c=Er()[m/4+1];if(c)throw qr(o)}finally{le.__wbindgen_add_to_stack_pointer(16)}}};async function Fa(f,e){if(typeof Response=="function"&&f instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(f,e)}catch(c){if(f.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n",c);else throw c}let o=await f.arrayBuffer();return await WebAssembly.instantiate(o,e)}else{let o=await WebAssembly.instantiate(f,e);return o instanceof WebAssembly.Instance?{instance:o,module:f}:o}}function Pa(){let f={};return f.wbg={},f.wbg.__wbg_new_28c511d9baebfa89=function(e,o){let c=new Error(nn(e,o));return Sr(c)},f.wbg.__wbindgen_memory=function(){let e=le.memory;return Sr(e)},f.wbg.__wbg_buffer_12d079cc21e14bdb=function(e){let o=Tr(e).buffer;return Sr(o)},f.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb=function(e,o,c){let m=new Uint8Array(Tr(e),o>>>0,c>>>0);return Sr(m)},f.wbg.__wbindgen_object_drop_ref=function(e){qr(e)},f.wbg.__wbg_new_63b92bc8671ed464=function(e){let o=new Uint8Array(Tr(e));return Sr(o)},f.wbg.__wbg_values_839f3396d5aac002=function(e){let o=Tr(e).values();return Sr(o)},f.wbg.__wbg_next_196c84450b364254=function(){return xa(function(e){let o=Tr(e).next();return Sr(o)},arguments)},f.wbg.__wbg_done_298b57d23c0fc80c=function(e){return Tr(e).done},f.wbg.__wbg_value_d93c65011f51a456=function(e){let o=Tr(e).value;return Sr(o)},f.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6=function(e){let o;try{o=Tr(e)instanceof Uint8Array}catch{o=!1}return o},f.wbg.__wbindgen_string_get=function(e,o){let c=Tr(o),m=typeof c=="string"?c:void 0;var T=_n(m)?0:pn(m,le.__wbindgen_malloc,le.__wbindgen_realloc),x=Nt;Er()[e/4+1]=x,Er()[e/4+0]=T},f.wbg.__wbg_new_16b304a2cfa7ff4a=function(){let e=new Array;return Sr(e)},f.wbg.__wbindgen_string_new=function(e,o){let c=nn(e,o);return Sr(c)},f.wbg.__wbg_push_a5b05aedc7234f9f=function(e,o){return Tr(e).push(Tr(o))},f.wbg.__wbg_length_c20a40f15020d68a=function(e){return Tr(e).length},f.wbg.__wbg_set_a47bac70306a19a7=function(e,o,c){Tr(e).set(Tr(o),c>>>0)},f.wbg.__wbindgen_throw=function(e,o){throw new Error(nn(e,o))},f}function Ma(f,e){return le=f.exports,Wn.__wbindgen_wasm_module=e,It=null,Ct=null,le}async function Wn(f){if(le!==void 0)return le;typeof f>"u"&&(f=new URL("index_bg.wasm",void 0));let e=Pa();(typeof f=="string"||typeof Request=="function"&&f instanceof Request||typeof URL=="function"&&f instanceof URL)&&(f=fetch(f));let{instance:o,module:c}=await Fa(await f,e);return Ma(o,c)}var Ra=Wn,bn=!1,kn=async f=>{if(bn)throw new Error("Already initialized. The `initWasm()` function can be used only once.");await Ra(await f),bn=!0},dn=class extends Sa{constructor(f,e){if(!bn)throw new Error("Wasm has not been initialized. Call `initWasm()` function.");let o=e?.font;if(o&&Ba(o)){let c={...e,font:{...o,fontBuffers:void 0}};super(f,JSON.stringify(c),o.fontBuffers)}else super(f,JSON.stringify(e))}};function Ba(f){return Object.prototype.hasOwnProperty.call(f,"fontBuffers")}function zn(f){let e=f,o=e.match(/<svg [^>]*>/);o&&o[0].indexOf("xmlns=")===-1&&(e=e.replace("<svg ",\'<svg xmlns="http://www.w3.org/2000/svg" \')),o&&o[0].indexOf("&ns_")!==-1&&e.indexOf("<!DOCTYPE")===-1&&(e=e.replace(o[0],o[0].replace(/&ns_[^;]+;/g,"http://ns.adobe.com/Extensibility/1.0/"))),e.includes("data:img/png")&&(e=e.replace(/(<image[^>]+?xlink:href=["\'])data:img\\/png/g,(m,T)=>`${T}data:image/png`));let c=/(<[^>]+?xmlns:(?!xml=)[^ ]+=)"http:\\/\\/www.w3.org\\/XML\\/1998\\/namespace"/g;return e.match(c)!==null&&(e=e.replace(c,(m,T)=>`${T}"http://dummy.namespace"`)),e=e.replace(/<(\\/?)\\s*svg:/g,"<$1"),e=e.replace(/<metadata>[\\s\\S]*<\\/metadata>/,"<metadata></metadata>"),e=e.replace(/<script[\\s\\S]*>[\\s\\S]*<\\/script>/,"<script><\\/script>"),e}var Hn=f=>{if(f===void 0)return null;let e=/^\\s*([+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?)\\s*(px)?\\s*$/i.exec(f);return e?Number(e[1]):null},En=(f,e)=>{let o=new RegExp(`\\\\s${e}\\\\s*=\\\\s*("([^"]*)"|\'([^\']*)\')`,"i").exec(f);return o?o[2]??o[3]:void 0};function Xn(f){let e=/<svg\\b[^>]*>/i.exec(f)?.[0];if(!e)return null;let o=En(e,"viewBox");if(o!==void 0){let T=o.trim().split(/[\\s,]+/).map(Number);if(T.length===4&&T.every(Number.isFinite))return{x:T[0],y:T[1],width:T[2],height:T[3]}}let c=Hn(En(e,"width")),m=Hn(En(e,"height"));return c===null||m===null?null:{x:0,y:0,width:c,height:m}}var Yn={"Sans Serif":"Noto Sans",Serif:"Source Serif Pro",Handwriting:"Handlee",Marker:"Knewave",Curly:"Griffy",Pixel:"Grand9K Pixel",Scratch:"ScratchFont"},Ca=/(font-family\\s*=\\s*)(["\'])([^"\']*)\\2/g,Ia=/(font-family\\s*:\\s*)([^;"\']+)/g,Kn=f=>f.split(",").map(e=>{let o=e.trim().replace(/^[\'"]|[\'"]$/g,"");return Yn[o]?`\'${Yn[o]}\'`:e.trim()}).join(", "),Da=f=>{let e=0;for(let o of f.matchAll(/\\sstroke(-width)?\\s*=\\s*["\']([^"\']*)["\']/g))e=Math.max(e,o[1]?Number(o[2])||0:1);return e},qn=(f,e)=>{let o=/<svg\\b[^>]*>/i.exec(f)[0],c=o;for(let[m,T]of Object.entries(e)){let x=new RegExp(`\\\\s${m}\\\\s*=\\\\s*("[^"]*"|\'[^\']*\')`,"i");c=x.test(c)?c.replace(x,` ${m}="${T}"`):c.replace(/^<svg\\b/i,`<svg ${m}="${T}"`)}return f.replace(o,c)},$n=null;function jn(f){return $n??=kn(f),$n}function Qn({fonts:f=[]}={}){let e={fontBuffers:f,loadSystemFonts:!1,defaultFontFamily:"Noto Sans",sansSerifFamily:"Noto Sans",serifFamily:"Source Serif Pro"},o=x=>zn(String(x)).replace(Ca,(b,S,G,z)=>`${S}${G}${Kn(z).replaceAll(G,G===\'"\'?"\'":\'"\')}${G}`).replace(Ia,(b,S,G)=>`${S}${Kn(G)}`),c=x=>{try{let b=new dn(x,{font:e}),S=b.getBBox(),G=S?{x:S.x,y:S.y,width:S.width,height:S.height}:null;return S?.free?.(),b.free?.(),G??{x:0,y:0,width:0,height:0}}catch{return{x:0,y:0,width:0,height:0}}};return{normalize:x=>{let b=o(x),S=/<svg\\b[^>]*>/i.exec(b)?.[0];if(!S)return b;if(/\\sviewBox\\s*=/i.test(S)){if(/\\swidth\\s*=/i.test(S)&&/\\sheight\\s*=/i.test(S))return b;let C=Xn(b);return C?qn(b,{width:C.width,height:C.height}):b}let z=c(b),y=z.width===0||z.height===0?0:Da(b)/2,M=z.width+y*2,I=z.height+y*2;return qn(b,{width:M,height:I,viewBox:`${z.x-y} ${z.y-y} ${M} ${I}`})},svg:(x,b,S,G,z)=>{let y=new Uint8ClampedArray(G*z*4),M,I;try{M=new dn(x,{fitTo:{mode:"zoom",value:S},font:e}),I=M.render()}catch{return M?.free?.(),y}let C=I.pixels,N=Math.min(G,I.width),ee=Math.min(z,I.height);for(let Me=0;Me<ee;Me++){let Ee=Me*I.width*4,xe=Me*G*4;for(let Ie=0;Ie<N;Ie++,Ee+=4,xe+=4){let _e=C[Ee+3];_e!==0&&(y[xe+3]=_e,_e===255?(y[xe]=C[Ee],y[xe+1]=C[Ee+1],y[xe+2]=C[Ee+2]):(y[xe]=C[Ee]*255/_e,y[xe+1]=C[Ee+1]*255/_e,y[xe+2]=C[Ee+2]*255/_e))}}return I.free?.(),M.free?.(),y}}}var Na=async({wasm:f,fonts:e})=>(await jn(f),Qn({fonts:e})),Oa=typeof self<"u"&&typeof self.postMessage=="function"?self:(await import("node:worker_threads")).parentPort;Nn(Oa,{loadRasterizer:Na});\n/*! Bundled license information:\n\ntwgl.js/dist/4.x/twgl-full.js:\n  (*!\n   * @license twgl.js 4.24.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.\n   * Available via the MIT license.\n   * see: http://github.com/greggman/twgl.js for details\n   *)\n*/\n';

  // src/render/twgl.js
  var import_twgl = __toESM(require_twgl_full(), 1);
  var { m4, v3 } = import_twgl.default;

  // src/render/effects.js
  var EFFECT_INFO = {
    color: { uniformName: "u_color", mask: 1 << 0, converter: (x2) => x2 / 200 % 1, shapeChanges: false },
    fisheye: { uniformName: "u_fisheye", mask: 1 << 1, converter: (x2) => Math.max(0, (x2 + 100) / 100), shapeChanges: true },
    whirl: { uniformName: "u_whirl", mask: 1 << 2, converter: (x2) => -x2 * Math.PI / 180, shapeChanges: true },
    pixelate: { uniformName: "u_pixelate", mask: 1 << 3, converter: (x2) => Math.abs(x2) / 10, shapeChanges: true },
    mosaic: {
      uniformName: "u_mosaic",
      mask: 1 << 4,
      converter: (x2) => Math.max(1, Math.min(Math.round((Math.abs(x2) + 10) / 10), 512)),
      shapeChanges: true
    },
    brightness: { uniformName: "u_brightness", mask: 1 << 5, converter: (x2) => Math.max(-100, Math.min(x2, 100)) / 100, shapeChanges: false },
    ghost: { uniformName: "u_ghost", mask: 1 << 6, converter: (x2) => 1 - Math.max(0, Math.min(x2, 100)) / 100, shapeChanges: false }
  };
  var EFFECTS = Object.keys(EFFECT_INFO);
  var DISTORTION_MASK = EFFECT_INFO.fisheye.mask | EFFECT_INFO.whirl.mask | EFFECT_INFO.pixelate.mask | EFFECT_INFO.mosaic.mask;
  var CENTER_X = 0.5;
  var CENTER_Y = 0.5;
  var hsvScratch = [0, 0, 0];
  function rgbToHsv([red, green, blue], dst) {
    let K = 0;
    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;
    let tmp = 0;
    if (g < b) {
      tmp = g;
      g = b;
      b = tmp;
      K = -1;
    }
    if (r < g) {
      tmp = r;
      r = g;
      g = tmp;
      K = -2 / 6 - K;
    }
    const chroma = r - Math.min(g, b);
    dst[0] = Math.abs(K + (g - b) / (6 * chroma + Number.EPSILON));
    dst[1] = chroma / (r + Number.EPSILON);
    dst[2] = r;
    return dst;
  }
  function hsvToRgb([hue, s, v], dst) {
    if (s === 0) {
      dst[0] = dst[1] = dst[2] = v * 255 + 0.5;
      return dst;
    }
    const h2 = hue % 1;
    const i2 = h2 * 6 | 0;
    const f = h2 * 6 - i2;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    let r = 0;
    let g = 0;
    let b = 0;
    switch (i2) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    dst[0] = r * 255 + 0.5;
    dst[1] = g * 255 + 0.5;
    dst[2] = b * 255 + 0.5;
    return dst;
  }
  function transformColor(drawable, inOutColor, effectMask) {
    if (inOutColor[3] === 0) return inOutColor;
    let effects = drawable.enabledEffects;
    if (typeof effectMask === "number") effects &= effectMask;
    const uniforms = drawable.uniforms;
    const enableColor = (effects & EFFECT_INFO.color.mask) !== 0;
    const enableBrightness = (effects & EFFECT_INFO.brightness.mask) !== 0;
    if (enableColor || enableBrightness) {
      const alpha = inOutColor[3] / 255;
      inOutColor[0] /= alpha;
      inOutColor[1] /= alpha;
      inOutColor[2] /= alpha;
      if (enableColor) {
        const hsv = rgbToHsv(inOutColor, hsvScratch);
        const minV = 0.11 / 2;
        const minS = 0.09;
        if (hsv[2] < minV) {
          hsv[0] = 0;
          hsv[1] = 1;
          hsv[2] = minV;
        } else if (hsv[1] < minS) {
          hsv[0] = 0;
          hsv[1] = minS;
        }
        hsv[0] = uniforms.u_color + hsv[0] + 1;
        hsvToRgb(hsv, inOutColor);
      }
      if (enableBrightness) {
        const brightness = uniforms.u_brightness * 255;
        inOutColor[0] += brightness;
        inOutColor[1] += brightness;
        inOutColor[2] += brightness;
      }
      inOutColor[0] *= alpha;
      inOutColor[1] *= alpha;
      inOutColor[2] *= alpha;
    }
    if ((effects & EFFECT_INFO.ghost.mask) !== 0) {
      inOutColor[0] *= uniforms.u_ghost;
      inOutColor[1] *= uniforms.u_ghost;
      inOutColor[2] *= uniforms.u_ghost;
      inOutColor[3] *= uniforms.u_ghost;
    }
    return inOutColor;
  }
  function transformPoint(drawable, vec, dst) {
    v3.copy(vec, dst);
    const effects = drawable.enabledEffects;
    const uniforms = drawable.uniforms;
    if ((effects & EFFECT_INFO.mosaic.mask) !== 0) {
      dst[0] = uniforms.u_mosaic * dst[0] % 1;
      dst[1] = uniforms.u_mosaic * dst[1] % 1;
    }
    if ((effects & EFFECT_INFO.pixelate.mask) !== 0) {
      drawable.skin.getTexture();
      const skinSize = drawable.skin.size;
      const texelX = skinSize[0] / uniforms.u_pixelate;
      const texelY = skinSize[1] / uniforms.u_pixelate;
      dst[0] = (Math.floor(dst[0] * texelX) + CENTER_X) / texelX;
      dst[1] = (Math.floor(dst[1] * texelY) + CENTER_Y) / texelY;
    }
    if ((effects & EFFECT_INFO.whirl.mask) !== 0) {
      const RADIUS = 0.5;
      const offsetX = dst[0] - CENTER_X;
      const offsetY = dst[1] - CENTER_Y;
      const offsetMagnitude = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
      const whirlFactor = Math.max(1 - offsetMagnitude / RADIUS, 0);
      const whirlActual = uniforms.u_whirl * whirlFactor * whirlFactor;
      const sinWhirl = Math.sin(whirlActual);
      const cosWhirl = Math.cos(whirlActual);
      dst[0] = cosWhirl * offsetX + sinWhirl * offsetY + CENTER_X;
      dst[1] = -sinWhirl * offsetX + cosWhirl * offsetY + CENTER_Y;
    }
    if ((effects & EFFECT_INFO.fisheye.mask) !== 0) {
      const vX = (dst[0] - CENTER_X) / CENTER_X;
      const vY = (dst[1] - CENTER_Y) / CENTER_Y;
      const vLength = Math.sqrt(vX * vX + vY * vY);
      const r = Math.pow(Math.min(vLength, 1), uniforms.u_fisheye) * Math.max(1, vLength);
      const unitX = vX / vLength;
      const unitY = vY / vLength;
      dst[0] = CENTER_X + r * unitX * CENTER_X;
      dst[1] = CENTER_Y + r * unitY * CENTER_Y;
    }
    return dst;
  }

  // src/render/rectangle.js
  var Rectangle = class _Rectangle {
    constructor() {
      this.left = -Infinity;
      this.right = Infinity;
      this.bottom = -Infinity;
      this.top = Infinity;
    }
    initFromBounds(left, right, bottom, top) {
      this.left = left;
      this.right = right;
      this.bottom = bottom;
      this.top = top;
      return this;
    }
    initFromPointsAABB(points) {
      this.left = Infinity;
      this.right = -Infinity;
      this.top = -Infinity;
      this.bottom = Infinity;
      for (let i2 = 0; i2 < points.length; i2++) {
        const x2 = points[i2][0];
        const y = points[i2][1];
        if (x2 < this.left) this.left = x2;
        if (x2 > this.right) this.right = x2;
        if (y > this.top) this.top = y;
        if (y < this.bottom) this.bottom = y;
      }
      return this;
    }
    initFromModelMatrix(m) {
      const m30 = m[12];
      const m31 = m[13];
      const x2 = Math.abs(0.5 * m[0]) + Math.abs(0.5 * m[4]);
      const y = Math.abs(0.5 * m[1]) + Math.abs(0.5 * m[5]);
      this.left = -x2 + m30;
      this.right = x2 + m30;
      this.top = y + m31;
      this.bottom = -y + m31;
      return this;
    }
    intersects(other) {
      return this.left <= other.right && other.left <= this.right && this.top >= other.bottom && other.top >= this.bottom;
    }
    clamp(left, right, bottom, top) {
      this.left = Math.max(this.left, left);
      this.right = Math.min(this.right, right);
      this.bottom = Math.max(this.bottom, bottom);
      this.top = Math.min(this.top, top);
      this.left = Math.min(this.left, right);
      this.right = Math.max(this.right, left);
      this.bottom = Math.min(this.bottom, top);
      this.top = Math.max(this.top, bottom);
    }
    snapToInt() {
      this.left = Math.floor(this.left);
      this.right = Math.ceil(this.right);
      this.bottom = Math.floor(this.bottom);
      this.top = Math.ceil(this.top);
    }
    get width() {
      return Math.abs(this.left - this.right);
    }
    get height() {
      return Math.abs(this.top - this.bottom);
    }
    static intersect(a, b, result = new _Rectangle()) {
      result.left = Math.max(a.left, b.left);
      result.right = Math.min(a.right, b.right);
      result.top = Math.min(a.top, b.top);
      result.bottom = Math.max(a.bottom, b.bottom);
      return result;
    }
    static union(a, b, result = new _Rectangle()) {
      result.left = Math.min(a.left, b.left);
      result.right = Math.max(a.right, b.right);
      result.top = Math.max(a.top, b.top);
      result.bottom = Math.min(a.bottom, b.bottom);
      return result;
    }
  };

  // src/render/drawable.js
  var touchingPosition = v3.create();
  var FLOATING_POINT_ERROR_ALLOWANCE = 1e-6;
  var hullProjection = m4.ortho(-1, 1, -1, 1, -1, 1);
  function localPositionOf(drawable, vec) {
    const local = touchingPosition;
    const v0 = vec[0];
    const v1 = vec[1];
    const m = drawable.inverseMatrix;
    const d = v0 * m[3] + v1 * m[7] + m[15];
    local[0] = 0.5 - (v0 * m[0] + v1 * m[4] + m[12]) / d;
    local[1] = (v0 * m[1] + v1 * m[5] + m[13]) / d + 0.5;
    if (Math.abs(local[0]) < FLOATING_POINT_ERROR_ALLOWANCE) local[0] = 0;
    if (Math.abs(local[1]) < FLOATING_POINT_ERROR_ALLOWANCE) local[1] = 0;
    if (drawable.enabledEffects !== 0 && local[0] >= 0 && local[0] < 1 && local[1] >= 0 && local[1] < 1) {
      transformPoint(drawable, local, local);
    }
    return local;
  }
  var Drawable = class {
    constructor(id, group) {
      this.id = id;
      this.group = group;
      this.uniforms = { u_modelMatrix: m4.identity() };
      this.effectValues = {};
      for (const name of EFFECTS) {
        this.uniforms[EFFECT_INFO[name].uniformName] = EFFECT_INFO[name].converter(0);
        this.effectValues[name] = 0;
      }
      this.position = v3.create(0, 0);
      this.scaleVector = v3.create(100, 100);
      this.direction = 90;
      this.transformDirty = true;
      this.rotationMatrix = m4.identity();
      this.rotationTransformDirty = true;
      this.rotationAdjusted = v3.create();
      this.rotationCenterDirty = true;
      this.skinScale = v3.create(0, 0, 0);
      this.skinScaleDirty = true;
      this.inverseMatrix = m4.identity();
      this.inverseTransformDirty = true;
      this.visible = true;
      this.enabledEffects = 0;
      this.convexHullPoints = null;
      this.convexHullDirty = true;
      this.transformedHullPoints = null;
      this.transformedHullDirty = true;
      this.skinRef = null;
      this.isTouching = this.isTouchingNever;
    }
    get skin() {
      return this.skinRef;
    }
    set skin(newSkin) {
      if (this.skinRef === newSkin) return;
      this.skinRef?.drawables.delete(this);
      this.skinRef = newSkin;
      this.skinRef?.drawables.add(this);
      this.skinWasAltered();
    }
    get scale() {
      return [this.scaleVector[0], this.scaleVector[1]];
    }
    dispose() {
      this.skin = null;
    }
    setTransformDirty() {
      this.transformDirty = true;
      this.inverseTransformDirty = true;
      this.transformedHullDirty = true;
    }
    updatePosition(position) {
      if (this.position[0] !== position[0] || this.position[1] !== position[1]) {
        this.position[0] = Math.round(position[0]);
        this.position[1] = Math.round(position[1]);
        this.setTransformDirty();
      }
    }
    updateDirection(direction) {
      if (this.direction !== direction) {
        this.direction = direction;
        this.rotationTransformDirty = true;
        this.setTransformDirty();
      }
    }
    updateScale(scale) {
      if (this.scaleVector[0] !== scale[0] || this.scaleVector[1] !== scale[1]) {
        this.scaleVector[0] = scale[0];
        this.scaleVector[1] = scale[1];
        this.rotationCenterDirty = true;
        this.skinScaleDirty = true;
        this.setTransformDirty();
      }
    }
    updateVisible(visible) {
      if (this.visible !== visible) {
        this.visible = visible;
        this.convexHullDirty = true;
      }
    }
    updateEffect(name, rawValue) {
      const info = EFFECT_INFO[name];
      if (!info) return;
      this.effectValues[name] = rawValue;
      if (rawValue) this.enabledEffects |= info.mask;
      else this.enabledEffects &= ~info.mask;
      this.uniforms[info.uniformName] = info.converter(rawValue);
      if (info.shapeChanges) this.convexHullDirty = true;
    }
    calculateTransform() {
      if (this.rotationTransformDirty) {
        const rotation = (270 - this.direction) * Math.PI / 180;
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        this.rotationMatrix[0] = c;
        this.rotationMatrix[1] = s;
        this.rotationMatrix[4] = -s;
        this.rotationMatrix[5] = c;
        this.rotationTransformDirty = false;
      }
      if (this.rotationCenterDirty && this.skin !== null) {
        const center = this.skin.rotationCenter;
        const size = this.skin.size;
        this.rotationAdjusted[0] = (center[0] - size[0] / 2) * this.scaleVector[0] / 100;
        this.rotationAdjusted[1] = (center[1] - size[1] / 2) * this.scaleVector[1] / 100 * -1;
        this.rotationCenterDirty = false;
      }
      if (this.skinScaleDirty && this.skin !== null) {
        const size = this.skin.size;
        this.skinScale[0] = size[0] * this.scaleVector[0] / 100;
        this.skinScale[1] = size[1] * this.scaleVector[1] / 100;
        this.skinScaleDirty = false;
      }
      const model = this.uniforms.u_modelMatrix;
      const r = this.rotationMatrix;
      model[0] = this.skinScale[0] * r[0];
      model[1] = this.skinScale[0] * r[1];
      model[4] = this.skinScale[1] * r[4];
      model[5] = this.skinScale[1] * r[5];
      model[12] = r[0] * this.rotationAdjusted[0] + r[4] * this.rotationAdjusted[1] + this.position[0];
      model[13] = r[1] * this.rotationAdjusted[0] + r[5] * this.rotationAdjusted[1] + this.position[1];
      this.transformDirty = false;
    }
    get modelMatrix() {
      if (this.transformDirty) this.calculateTransform();
      return this.uniforms.u_modelMatrix;
    }
    needsConvexHullPoints() {
      return !this.convexHullPoints || this.convexHullDirty || this.convexHullPoints.length === 0;
    }
    setConvexHullPoints(points) {
      this.convexHullPoints = points;
      this.convexHullDirty = false;
      this.transformedHullPoints = points.map(() => v3.create());
      this.transformedHullDirty = true;
    }
    isTouchingNever() {
      return false;
    }
    isTouchingNearest(vec) {
      return this.skin.isTouchingNearest(localPositionOf(this, vec));
    }
    isTouchingLinear(vec) {
      return this.skin.isTouchingLinear(localPositionOf(this, vec));
    }
    getBounds(result = new Rectangle()) {
      if (this.needsConvexHullPoints()) throw new Error("Needs updated convex hull points before bounds calculation.");
      if (this.transformDirty) this.calculateTransform();
      return result.initFromPointsAABB(this.transformedHull());
    }
    getBoundsForBubble(result = new Rectangle()) {
      if (this.needsConvexHullPoints()) throw new Error("Needs updated convex hull points before bubble bounds calculation.");
      if (this.transformDirty) this.calculateTransform();
      const slice = 8;
      const points = this.transformedHull();
      const maxY = Math.max(...points.map((p) => p[1]));
      return result.initFromPointsAABB(points.filter((p) => p[1] > maxY - slice));
    }
    getAABB(result = new Rectangle()) {
      if (this.transformDirty) this.calculateTransform();
      return result.initFromModelMatrix(this.uniforms.u_modelMatrix);
    }
    getFastBounds(result) {
      return this.needsConvexHullPoints() ? this.getAABB(result) : this.getBounds(result);
    }
    transformedHull() {
      if (!this.transformedHullDirty) return this.transformedHullPoints;
      const size = this.skin.size;
      const halfXPixel = 1 / size[0] / 2;
      const halfYPixel = 1 / size[1] / 2;
      const tm = m4.multiply(this.uniforms.u_modelMatrix, hullProjection);
      for (let i2 = 0; i2 < this.convexHullPoints.length; i2++) {
        const point2 = this.convexHullPoints[i2];
        const dst = this.transformedHullPoints[i2];
        dst[0] = 0.5 + -point2[0] / size[0] - halfXPixel;
        dst[1] = point2[1] / size[1] - 0.5 + halfYPixel;
        m4.transformPoint(tm, dst, dst);
      }
      this.transformedHullDirty = false;
      return this.transformedHullPoints;
    }
    updateMatrix() {
      if (this.transformDirty) this.calculateTransform();
      if (this.inverseTransformDirty) {
        const inverse = this.inverseMatrix;
        m4.copy(this.uniforms.u_modelMatrix, inverse);
        inverse[10] = 1;
        m4.inverse(inverse, inverse);
        this.inverseTransformDirty = false;
      }
    }
    updateCPURenderAttributes() {
      this.updateMatrix();
      if (this.skin) {
        this.skin.updateSilhouette(this.scaleVector);
        this.isTouching = this.skin.useNearest(this.scaleVector, this) ? this.isTouchingNearest : this.isTouchingLinear;
      } else {
        this.isTouching = this.isTouchingNever;
      }
    }
    skinWasAltered() {
      this.rotationCenterDirty = true;
      this.skinScaleDirty = true;
      this.convexHullDirty = true;
      this.setTransformDirty();
    }
    sampleColor4b(vec, dst, effectMask) {
      const local = localPositionOf(this, vec);
      if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
        return dst;
      }
      const color = this.skin.silhouette.colorAtNearest(local, dst);
      if (this.enabledEffects === 0) return color;
      return transformColor(this, color, effectMask);
    }
  };

  // src/render/silhouette.js
  var intMin = (i2, j) => j ^ (i2 ^ j) & i2 - j >> 31;
  var intMax = (i2, j) => i2 ^ (i2 ^ j) & i2 - j >> 31;
  var alphaAt = (silhouette, x2, y) => {
    if (x2 >= silhouette.width || y >= silhouette.height || x2 < 0 || y < 0) return 0;
    return silhouette.data[(y * silhouette.width + x2) * 4 + 3];
  };
  var straightColorAt = (silhouette, xIn, yIn, dst) => {
    const x2 = intMax(0, intMin(xIn, silhouette.width - 1));
    const y = intMax(0, intMin(yIn, silhouette.height - 1));
    if (x2 >= silhouette.width || y >= silhouette.height || x2 < 0 || y < 0) return dst.fill(0);
    const offset = (y * silhouette.width + x2) * 4;
    const data = silhouette.data;
    const alpha = data[offset + 3] / 255;
    dst[0] = data[offset] * alpha;
    dst[1] = data[offset + 1] * alpha;
    dst[2] = data[offset + 2] * alpha;
    dst[3] = data[offset + 3];
    return dst;
  };
  var premultipliedColorAt = (silhouette, xIn, yIn, dst) => {
    const x2 = intMax(0, intMin(xIn, silhouette.width - 1));
    const y = intMax(0, intMin(yIn, silhouette.height - 1));
    const offset = (y * silhouette.width + x2) * 4;
    const data = silhouette.data;
    dst[0] = data[offset];
    dst[1] = data[offset + 1];
    dst[2] = data[offset + 2];
    dst[3] = data[offset + 3];
    return dst;
  };
  var corners = [new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4)];
  var Silhouette = class {
    constructor() {
      this.width = 0;
      this.height = 0;
      this.data = null;
      this.premultiplied = false;
      this.colorAt = straightColorAt;
    }
    update(width, height, data, premultiplied = false) {
      this.width = width;
      this.height = height;
      if (!(width && height)) return;
      this.data = data;
      this.premultiplied = premultiplied;
      this.colorAt = premultiplied ? premultipliedColorAt : straightColorAt;
    }
    colorAtNearest(vec, dst) {
      if (!this.data) return dst.fill(0);
      return this.colorAt(this, Math.floor(vec[0] * (this.width - 1)), Math.floor(vec[1] * (this.height - 1)), dst);
    }
    colorAtLinear(vec, dst) {
      if (!this.data) return dst.fill(0);
      const x2 = vec[0] * (this.width - 1);
      const y = vec[1] * (this.height - 1);
      const x1D = x2 % 1;
      const y1D = y % 1;
      const x0D = 1 - x1D;
      const y0D = 1 - y1D;
      const xFloor = Math.floor(x2);
      const yFloor = Math.floor(y);
      const x0y0 = this.colorAt(this, xFloor, yFloor, corners[0]);
      const x1y0 = this.colorAt(this, xFloor + 1, yFloor, corners[1]);
      const x0y1 = this.colorAt(this, xFloor, yFloor + 1, corners[2]);
      const x1y1 = this.colorAt(this, xFloor + 1, yFloor + 1, corners[3]);
      dst[0] = x0y0[0] * x0D * y0D + x0y1[0] * x0D * y1D + x1y0[0] * x1D * y0D + x1y1[0] * x1D * y1D;
      dst[1] = x0y0[1] * x0D * y0D + x0y1[1] * x0D * y1D + x1y0[1] * x1D * y0D + x1y1[1] * x1D * y1D;
      dst[2] = x0y0[2] * x0D * y0D + x0y1[2] * x0D * y1D + x1y0[2] * x1D * y0D + x1y1[2] * x1D * y1D;
      dst[3] = x0y0[3] * x0D * y0D + x0y1[3] * x0D * y1D + x1y0[3] * x1D * y0D + x1y1[3] * x1D * y1D;
      return dst;
    }
    isTouchingNearest(vec) {
      if (!this.data) return void 0;
      return alphaAt(this, Math.floor(vec[0] * (this.width - 1)), Math.floor(vec[1] * (this.height - 1))) > 0;
    }
    isTouchingLinear(vec) {
      if (!this.data) return void 0;
      const x2 = Math.floor(vec[0] * (this.width - 1));
      const y = Math.floor(vec[1] * (this.height - 1));
      return alphaAt(this, x2, y) > 0 || alphaAt(this, x2 + 1, y) > 0 || alphaAt(this, x2, y + 1) > 0 || alphaAt(this, x2 + 1, y + 1) > 0;
    }
  };

  // src/render/compositor.js
  var NATIVE_WIDTH = 480;
  var NATIVE_HEIGHT = 360;
  if (new Uint8Array(new Uint32Array([1]).buffer)[0] !== 1) throw new Error("the compositor needs a little-endian platform");
  function createRasterStore() {
    const rasters = /* @__PURE__ */ new Map();
    return {
      rasters,
      apply(updates = [], dropped = []) {
        for (const key of dropped) rasters.delete(key);
        for (const update of updates) {
          if (update.patch) {
            const raster = rasters.get(update.key);
            if (!raster) continue;
            const { x: x2, y, width, height, data } = update.patch;
            for (let row = 0; row < height; row++) {
              const from = row * width * 4;
              raster.data.set(data.subarray(from, from + width * 4), ((y + row) * raster.width + x2) * 4);
            }
            continue;
          }
          const silhouette = new Silhouette();
          silhouette.update(update.width, update.height, update.data, update.premultiplied);
          rasters.set(update.key, { width: update.width, height: update.height, data: update.data, premultiplied: update.premultiplied, silhouette });
        }
      }
    };
  }
  var layerView = (layer) => ({
    inverseMatrix: layer.inverse,
    enabledEffects: layer.enabledEffects,
    ghostOnly: layer.enabledEffects === EFFECT_INFO.ghost.mask,
    uniforms: layer.uniforms,
    skin: { size: layer.skinSize, getTexture() {
    } }
  });
  var sample = new Uint8ClampedArray(4);
  var point = new Float32Array(3);
  var COLOR_EFFECTS_MASK = EFFECT_INFO.color.mask | EFFECT_INFO.brightness.mask | EFFECT_INFO.ghost.mask;
  var words = (raster) => raster.words ?? (raster.words = new Uint32Array(raster.data.buffer, raster.data.byteOffset, raster.data.length >> 2));
  var OPAQUE = 4278190080;
  function blendInto(out32, i2, r, g, b, a) {
    if (a >= 255) {
      out32[i2] = r + 0.5 | g + 0.5 << 8 | b + 0.5 << 16 | OPAQUE;
      return;
    }
    const keep = 1 - a / 255;
    const dst = out32[i2];
    const nr = r + (dst & 255) * keep;
    const ng = g + (dst >>> 8 & 255) * keep;
    const nb = b + (dst >>> 16 & 255) * keep;
    out32[i2] = Math.min(255, nr + 0.5 | 0) | Math.min(255, ng + 0.5 | 0) << 8 | Math.min(255, nb + 0.5 | 0) << 16 | OPAQUE;
  }
  function finishPixel(layer, view, out32, i2, r, g, b, a) {
    if (view === null) {
      blendInto(out32, i2, r, g, b, a);
      return;
    }
    if (view.ghostOnly) {
      const ghost = view.uniforms.u_ghost;
      if (ghost !== 0) blendInto(out32, i2, r * ghost, g * ghost, b * ghost, a * ghost);
      return;
    }
    const color = sample;
    color[0] = r;
    color[1] = g;
    color[2] = b;
    color[3] = a;
    transformColor(view, color);
    if (color[3] !== 0) blendInto(out32, i2, color[0], color[1], color[2], color[3]);
  }
  function affineNearest(layer, raster, rows, columns, frame, view) {
    const { out32, rowStart, width: outWidth, xScale, yScale } = frame;
    const m = layer.inverse;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    const maxX = width - 1;
    const maxY = raster.height - 1;
    const du = -m[0] * xScale;
    const dv = m[1] * xScale;
    const plain = view === null;
    for (let row = rows[0]; row <= rows[1]; row++) {
      const y = NATIVE_HEIGHT / 2 - (row + 0.5) * yScale;
      const x0 = (columns[0] + 0.5) * xScale - NATIVE_WIDTH / 2;
      let u = 0.5 - (x0 * m[0] + y * m[4] + m[12]);
      let v = x0 * m[1] + y * m[5] + m[13] + 0.5;
      let i2 = (row - rowStart) * outWidth + columns[0];
      for (let column = columns[0]; column <= columns[1]; column++, i2++, u += du, v += dv) {
        if (u < 0 || v < 0 || u > 1 || v > 1) continue;
        let x2 = Math.floor(u * maxX);
        let yy = Math.floor(v * maxY);
        x2 = x2 < 0 ? 0 : x2 > maxX ? maxX : x2;
        yy = yy < 0 ? 0 : yy > maxY ? maxY : yy;
        const p = src[yy * width + x2];
        const a = p >>> 24;
        if (a === 0) continue;
        if (a === 255 && plain) {
          out32[i2] = p;
          continue;
        }
        const f = premultiplied ? 1 : a / 255;
        finishPixel(layer, view, out32, i2, (p & 255) * f, (p >>> 8 & 255) * f, (p >>> 16 & 255) * f, a);
      }
    }
  }
  function affineLinear(layer, raster, rows, columns, frame, view) {
    const { out32, rowStart, width: outWidth, xScale, yScale } = frame;
    const m = layer.inverse;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    const maxX = width - 1;
    const maxY = raster.height - 1;
    const du = -m[0] * xScale;
    const dv = m[1] * xScale;
    for (let row = rows[0]; row <= rows[1]; row++) {
      const y = NATIVE_HEIGHT / 2 - (row + 0.5) * yScale;
      const x0 = (columns[0] + 0.5) * xScale - NATIVE_WIDTH / 2;
      let u = 0.5 - (x0 * m[0] + y * m[4] + m[12]);
      let v = x0 * m[1] + y * m[5] + m[13] + 0.5;
      let i2 = (row - rowStart) * outWidth + columns[0];
      for (let column = columns[0]; column <= columns[1]; column++, i2++, u += du, v += dv) {
        if (u < 0 || v < 0 || u > 1 || v > 1) continue;
        const fx = u * maxX;
        const fy = v * maxY;
        const xa = Math.floor(fx);
        const ya = Math.floor(fy);
        const xl = xa < 0 ? 0 : xa > maxX ? maxX : xa;
        const xr = xa + 1 > maxX ? maxX : xa + 1 < 0 ? 0 : xa + 1;
        const yt = (ya < 0 ? 0 : ya > maxY ? maxY : ya) * width;
        const yb = (ya + 1 > maxY ? maxY : ya + 1 < 0 ? 0 : ya + 1) * width;
        const p00 = src[yt + xl];
        const p10 = src[yt + xr];
        const p01 = src[yb + xl];
        const p11 = src[yb + xr];
        const a00 = p00 >>> 24;
        const a10 = p10 >>> 24;
        const a01 = p01 >>> 24;
        const a11 = p11 >>> 24;
        if ((a00 | a10 | a01 | a11) === 0) continue;
        const x1D = fx - xa;
        const y1D = fy - ya;
        const w00 = (1 - x1D) * (1 - y1D);
        const w10 = x1D * (1 - y1D);
        const w01 = (1 - x1D) * y1D;
        const w11 = x1D * y1D;
        const f00 = premultiplied ? w00 : w00 * a00 / 255;
        const f10 = premultiplied ? w10 : w10 * a10 / 255;
        const f01 = premultiplied ? w01 : w01 * a01 / 255;
        const f11 = premultiplied ? w11 : w11 * a11 / 255;
        finishPixel(
          layer,
          view,
          out32,
          i2,
          (p00 & 255) * f00 + (p10 & 255) * f10 + (p01 & 255) * f01 + (p11 & 255) * f11,
          (p00 >>> 8 & 255) * f00 + (p10 >>> 8 & 255) * f10 + (p01 >>> 8 & 255) * f01 + (p11 >>> 8 & 255) * f11,
          (p00 >>> 16 & 255) * f00 + (p10 >>> 16 & 255) * f10 + (p01 >>> 16 & 255) * f01 + (p11 >>> 16 & 255) * f11,
          a00 * w00 + a10 * w10 + a01 * w01 + a11 * w11
        );
      }
    }
  }
  function compositeAffine(layer, raster, rows, columns, frame) {
    const view = (layer.enabledEffects & COLOR_EFFECTS_MASK) !== 0 ? layerView(layer) : null;
    if (layer.nearest) affineNearest(layer, raster, rows, columns, frame, view);
    else affineLinear(layer, raster, rows, columns, frame, view);
  }
  function compositeDistorted(layer, raster, rows, columns, frame) {
    const { out32, rowStart, width, xScale, yScale } = frame;
    const view = layerView(layer);
    const silhouette = raster.silhouette;
    for (let row = rows[0]; row <= rows[1]; row++) {
      point[1] = NATIVE_HEIGHT / 2 - (row + 0.5) * yScale;
      let i2 = (row - rowStart) * width + columns[0];
      for (let column = columns[0]; column <= columns[1]; column++, i2++) {
        point[0] = (column + 0.5) * xScale - NATIVE_WIDTH / 2;
        const local = localPositionOf(view, point);
        if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) continue;
        const color = layer.nearest ? silhouette.colorAtNearest(local, sample) : silhouette.colorAtLinear(local, sample);
        if (layer.enabledEffects !== 0) transformColor(view, color);
        if (color[3] === 0) continue;
        blendInto(out32, i2, color[0], color[1], color[2], color[3]);
      }
    }
  }
  function compositeLayer(layer, raster, rows, columns, frame) {
    const m = layer.inverse;
    const affine = m[3] === 0 && m[7] === 0 && m[15] === 1 && (layer.enabledEffects & DISTORTION_MASK) === 0;
    if (affine) compositeAffine(layer, raster, rows, columns, frame);
    else compositeDistorted(layer, raster, rows, columns, frame);
  }
  function compositeBand(scene, rasters, rowStart, rowEnd, out) {
    const { width, height, background } = scene;
    const xScale = NATIVE_WIDTH / width;
    const yScale = NATIVE_HEIGHT / height;
    const out32 = new Uint32Array(out.buffer, out.byteOffset, (rowEnd - rowStart) * width);
    out32.fill((background[0] | background[1] << 8 | background[2] << 16 | OPAQUE) >>> 0);
    const frame = { out32, rowStart, width, xScale, yScale };
    for (const layer of scene.layers) {
      const raster = rasters.get(layer.raster);
      if (!raster) continue;
      const columns = [
        Math.max(0, Math.floor((layer.bounds.left + NATIVE_WIDTH / 2) / xScale) - 1),
        Math.min(width - 1, Math.ceil((layer.bounds.right + NATIVE_WIDTH / 2) / xScale) + 1)
      ];
      const rows = [
        Math.max(rowStart, Math.floor((NATIVE_HEIGHT / 2 - layer.bounds.top) / yScale) - 1),
        Math.min(rowEnd - 1, Math.ceil((NATIVE_HEIGHT / 2 - layer.bounds.bottom) / yScale) + 1)
      ];
      if (columns[0] > columns[1] || rows[0] > rows[1]) continue;
      compositeLayer(layer, raster, rows, columns, frame);
    }
    return out;
  }

  // src/render/pool.js
  var onMessage = (endpoint, handler) => {
    if (typeof endpoint.on === "function") endpoint.on("message", handler);
    else endpoint.addEventListener("message", (event) => handler(event.data));
  };
  var copyEntry = (entry) => entry.patch ? { ...entry, patch: { ...entry.patch, data: entry.patch.data.slice() } } : { ...entry, data: entry.data.slice() };
  var bufferOf = (entry) => entry.patch ? entry.patch.data.buffer : entry.data.buffer;
  function createCompositorPool({ threads = 0, spawn, rasterizer = null, workerInit = null } = {}) {
    const local = createRasterStore();
    const workers = [];
    const pending = /* @__PURE__ */ new Map();
    let nextJob = 1;
    let nextRasterWorker = 0;
    for (let i2 = 0; i2 < threads; i2++) {
      const worker = spawn();
      onMessage(worker, (message) => {
        const resolve = pending.get(message.job);
        if (!resolve) return;
        pending.delete(message.job);
        resolve(message);
      });
      if (workerInit) worker.postMessage({ type: "init", ...workerInit });
      workers.push(worker);
    }
    const call = (worker, message, transfer = []) => new Promise((resolve) => {
      const job = nextJob++;
      pending.set(job, resolve);
      worker.postMessage({ ...message, job }, transfer);
    });
    return {
      get threads() {
        return workers.length;
      },
      upload(entries) {
        if (!entries.length) return;
        if (!workers.length) {
          local.apply(entries, []);
          return;
        }
        for (const worker of workers) {
          const copies = entries.map(copyEntry);
          worker.postMessage({ type: "rasters", rasters: copies, dropped: [] }, copies.map(bufferOf));
        }
      },
      drop(keys) {
        if (!keys.length) return;
        if (!workers.length) {
          local.apply([], keys);
          return;
        }
        for (const worker of workers) worker.postMessage({ type: "rasters", rasters: [], dropped: keys });
      },
      async rasterize(request) {
        if (!workers.length || !workerInit) {
          if (!rasterizer) throw new Error("this pool has no SVG rasterizer");
          return rasterizer.svg(request.svg, null, request.scale, request.width, request.height);
        }
        const worker = workers[nextRasterWorker++ % workers.length];
        const reply = await call(worker, { type: "rasterize", ...request });
        return new Uint8ClampedArray(reply.pixels);
      },
      async composite(scene) {
        const out = new Uint8ClampedArray(scene.width * scene.height * 4);
        if (!workers.length) {
          compositeBand(scene, local.rasters, 0, scene.height, out);
          return { width: scene.width, height: scene.height, data: out };
        }
        const bandHeight = Math.ceil(scene.height / workers.length);
        await Promise.all(workers.map(async (worker, i2) => {
          const rowStart = i2 * bandHeight;
          const rowEnd = Math.min(scene.height, rowStart + bandHeight);
          if (rowStart >= rowEnd) return;
          const reply = await call(worker, { type: "band", scene, rowStart, rowEnd });
          out.set(new Uint8ClampedArray(reply.pixels), rowStart * scene.width * 4);
        }));
        return { width: scene.width, height: scene.height, data: out };
      },
      terminate() {
        for (const worker of workers) worker.terminate();
        workers.length = 0;
      }
    };
  }

  // node_modules/@resvg/resvg-wasm/index.mjs
  var wasm;
  var heap = new Array(128).fill(void 0);
  heap.push(void 0, null, true, false);
  var heap_next = heap.length;
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  function getObject(idx) {
    return heap[idx];
  }
  function dropObject(idx) {
    if (idx < 132)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
  var WASM_VECTOR_LEN = 0;
  var cachedUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
      cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
  }
  var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
    throw Error("TextEncoder not available");
  } };
  var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length, 1) >>> 0;
      getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8Memory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127)
        break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
      ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  function isLikeNone(x2) {
    return x2 === void 0 || x2 === null;
  }
  var cachedInt32Memory0 = null;
  function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
      cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
  }
  var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
    throw Error("TextDecoder not available");
  } };
  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }
  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
      throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      wasm.__wbindgen_exn_store(addHeapObject(e));
    }
  }
  var BBoxFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_bbox_free(ptr >>> 0));
  var BBox = class _BBox {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(_BBox.prototype);
      obj.__wbg_ptr = ptr;
      BBoxFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      BBoxFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_bbox_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
      const ret = wasm.__wbg_get_bbox_x(this.__wbg_ptr);
      return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
      wasm.__wbg_set_bbox_x(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
      const ret = wasm.__wbg_get_bbox_y(this.__wbg_ptr);
      return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
      wasm.__wbg_set_bbox_y(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
      const ret = wasm.__wbg_get_bbox_width(this.__wbg_ptr);
      return ret;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
      wasm.__wbg_set_bbox_width(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get height() {
      const ret = wasm.__wbg_get_bbox_height(this.__wbg_ptr);
      return ret;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
      wasm.__wbg_set_bbox_height(this.__wbg_ptr, arg0);
    }
  };
  var RenderedImageFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_renderedimage_free(ptr >>> 0));
  var RenderedImage = class _RenderedImage {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(_RenderedImage.prototype);
      obj.__wbg_ptr = ptr;
      RenderedImageFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      RenderedImageFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_renderedimage_free(ptr);
    }
    /**
    * Get the PNG width
    * @returns {number}
    */
    get width() {
      const ret = wasm.renderedimage_width(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
    * Get the PNG height
    * @returns {number}
    */
    get height() {
      const ret = wasm.renderedimage_height(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
    * Write the image data to Uint8Array
    * @returns {Uint8Array}
    */
    asPng() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.renderedimage_asPng(retptr, this.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
          throw takeObject(r1);
        }
        return takeObject(r0);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    /**
    * Get the RGBA pixels of the image
    * @returns {Uint8Array}
    */
    get pixels() {
      const ret = wasm.renderedimage_pixels(this.__wbg_ptr);
      return takeObject(ret);
    }
  };
  var ResvgFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_resvg_free(ptr >>> 0));
  var Resvg = class {
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      ResvgFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_resvg_free(ptr);
    }
    /**
    * @param {Uint8Array | string} svg
    * @param {string | undefined} [options]
    * @param {Array<any> | undefined} [custom_font_buffers]
    */
    constructor(svg, options, custom_font_buffers) {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = isLikeNone(options) ? 0 : passStringToWasm0(options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.resvg_new(retptr, addHeapObject(svg), ptr0, len0, isLikeNone(custom_font_buffers) ? 0 : addHeapObject(custom_font_buffers));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
          throw takeObject(r1);
        }
        this.__wbg_ptr = r0 >>> 0;
        return this;
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    /**
    * Get the SVG width
    * @returns {number}
    */
    get width() {
      const ret = wasm.resvg_width(this.__wbg_ptr);
      return ret;
    }
    /**
    * Get the SVG height
    * @returns {number}
    */
    get height() {
      const ret = wasm.resvg_height(this.__wbg_ptr);
      return ret;
    }
    /**
    * Renders an SVG in Wasm
    * @returns {RenderedImage}
    */
    render() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.resvg_render(retptr, this.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
          throw takeObject(r1);
        }
        return RenderedImage.__wrap(r0);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    /**
    * Output usvg-simplified SVG string
    * @returns {string}
    */
    toString() {
      let deferred1_0;
      let deferred1_1;
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.resvg_toString(retptr, this.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
      }
    }
    /**
    * Calculate a maximum bounding box of all visible elements in this SVG.
    *
    * Note: path bounding box are approx values.
    * @returns {BBox | undefined}
    */
    innerBBox() {
      const ret = wasm.resvg_innerBBox(this.__wbg_ptr);
      return ret === 0 ? void 0 : BBox.__wrap(ret);
    }
    /**
    * Calculate a maximum bounding box of all visible elements in this SVG.
    * This will first apply transform.
    * Similar to `SVGGraphicsElement.getBBox()` DOM API.
    * @returns {BBox | undefined}
    */
    getBBox() {
      const ret = wasm.resvg_getBBox(this.__wbg_ptr);
      return ret === 0 ? void 0 : BBox.__wrap(ret);
    }
    /**
    * Use a given `BBox` to crop the svg. Currently this method simply changes
    * the viewbox/size of the svg and do not move the elements for simplicity
    * @param {BBox} bbox
    */
    cropByBBox(bbox) {
      _assertClass(bbox, BBox);
      wasm.resvg_cropByBBox(this.__wbg_ptr, bbox.__wbg_ptr);
    }
    /**
    * @returns {Array<any>}
    */
    imagesToResolve() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.resvg_imagesToResolve(retptr, this.__wbg_ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
          throw takeObject(r1);
        }
        return takeObject(r0);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    /**
    * @param {string} href
    * @param {Uint8Array} buffer
    */
    resolveImage(href, buffer) {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(href, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.resvg_resolveImage(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(buffer));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        if (r1) {
          throw takeObject(r0);
        }
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_new_28c511d9baebfa89 = function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_memory = function() {
      const ret = wasm.memory;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
      const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
      takeObject(arg0);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_values_839f3396d5aac002 = function(arg0) {
      const ret = getObject(arg0).values();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_196c84450b364254 = function() {
      return handleError(function(arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_done_298b57d23c0fc80c = function(arg0) {
      const ret = getObject(arg0).done;
      return ret;
    };
    imports.wbg.__wbg_value_d93c65011f51a456 = function(arg0) {
      const ret = getObject(arg0).value;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6 = function(arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len1;
      getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_new_16b304a2cfa7ff4a = function() {
      const ret = new Array();
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_a5b05aedc7234f9f = function(arg0, arg1) {
      const ret = getObject(arg0).push(getObject(arg1));
      return ret;
    };
    imports.wbg.__wbg_length_c20a40f15020d68a = function(arg0) {
      const ret = getObject(arg0).length;
      return ret;
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    return imports;
  }
  function __wbg_init_memory(imports, maybe_memory) {
  }
  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;
    return wasm;
  }
  async function __wbg_init(input) {
    if (wasm !== void 0)
      return wasm;
    if (typeof input === "undefined") {
      input = new URL("index_bg.wasm", void 0);
    }
    const imports = __wbg_get_imports();
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    __wbg_init_memory(imports);
    const { instance, module } = await __wbg_load(await input, imports);
    return __wbg_finalize_init(instance, module);
  }
  var dist_default = __wbg_init;
  var initialized = false;
  var initWasm = async (module_or_path) => {
    if (initialized) {
      throw new Error("Already initialized. The `initWasm()` function can be used only once.");
    }
    await dist_default(await module_or_path);
    initialized = true;
  };
  var Resvg2 = class extends Resvg {
    /**
     * @param {Uint8Array | string} svg
     * @param {ResvgRenderOptions | undefined} options
     */
    constructor(svg, options) {
      if (!initialized)
        throw new Error("Wasm has not been initialized. Call `initWasm()` function.");
      const font = options?.font;
      if (!!font && isCustomFontsOptions(font)) {
        const serializableOptions = {
          ...options,
          font: {
            ...font,
            fontBuffers: void 0
          }
        };
        super(svg, JSON.stringify(serializableOptions), font.fontBuffers);
      } else {
        super(svg, JSON.stringify(options));
      }
    }
  };
  function isCustomFontsOptions(value) {
    return Object.prototype.hasOwnProperty.call(value, "fontBuffers");
  }

  // src/render/raster/svg-fixup.js
  function fixupSvgString(input) {
    let svg = input;
    const svgAttrs = svg.match(/<svg [^>]*>/);
    if (svgAttrs && svgAttrs[0].indexOf("xmlns=") === -1) {
      svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    if (svgAttrs && svgAttrs[0].indexOf("&ns_") !== -1 && svg.indexOf("<!DOCTYPE") === -1) {
      svg = svg.replace(svgAttrs[0], svgAttrs[0].replace(/&ns_[^;]+;/g, "http://ns.adobe.com/Extensibility/1.0/"));
    }
    if (svg.includes("data:img/png")) {
      svg = svg.replace(/(<image[^>]+?xlink:href=["'])data:img\/png/g, ($0, $1) => `${$1}data:image/png`);
    }
    const xmlnsRegex = /(<[^>]+?xmlns:(?!xml=)[^ ]+=)"http:\/\/www.w3.org\/XML\/1998\/namespace"/g;
    if (svg.match(xmlnsRegex) !== null) svg = svg.replace(xmlnsRegex, ($0, $1) => `${$1}"http://dummy.namespace"`);
    svg = svg.replace(/<(\/?)\s*svg:/g, "<$1");
    svg = svg.replace(/<metadata>[\s\S]*<\/metadata>/, "<metadata></metadata>");
    svg = svg.replace(/<script[\s\S]*>[\s\S]*<\/script>/, "<script><\/script>");
    return svg;
  }

  // src/geometry.js
  var svgLength = (text) => {
    if (text === void 0) return null;
    const match = /^\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)\s*(px)?\s*$/i.exec(text);
    return match ? Number(match[1]) : null;
  };
  var svgAttribute = (tag, name) => {
    const match = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i").exec(tag);
    return match ? match[2] ?? match[3] : void 0;
  };
  function svgViewBox(text) {
    const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
    if (!tag) return null;
    const viewBox = svgAttribute(tag, "viewBox");
    if (viewBox !== void 0) {
      const parts = viewBox.trim().split(/[\s,]+/).map(Number);
      if (parts.length === 4 && parts.every(Number.isFinite)) {
        return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
      }
    }
    const width = svgLength(svgAttribute(tag, "width"));
    const height = svgLength(svgAttribute(tag, "height"));
    if (width === null || height === null) return null;
    return { x: 0, y: 0, width, height };
  }

  // src/render/raster/svg.js
  var SCRATCH_FONT_FAMILIES = {
    "Sans Serif": "Noto Sans",
    Serif: "Source Serif Pro",
    Handwriting: "Handlee",
    Marker: "Knewave",
    Curly: "Griffy",
    Pixel: "Grand9K Pixel",
    Scratch: "ScratchFont"
  };
  var FONT_ATTRIBUTE = /(font-family\s*=\s*)(["'])([^"']*)\2/g;
  var FONT_STYLE = /(font-family\s*:\s*)([^;"']+)/g;
  var renameFamilies = (list) => list.split(",").map((name) => {
    const bare = name.trim().replace(/^['"]|['"]$/g, "");
    return SCRATCH_FONT_FAMILIES[bare] ? `'${SCRATCH_FONT_FAMILIES[bare]}'` : name.trim();
  }).join(", ");
  var largestStrokeWidth = (svg) => {
    let largest = 0;
    for (const match of svg.matchAll(/\sstroke(-width)?\s*=\s*["']([^"']*)["']/g)) {
      largest = Math.max(largest, match[1] ? Number(match[2]) || 0 : 1);
    }
    return largest;
  };
  var setRootAttributes = (svg, attributes) => {
    const tag = /<svg\b[^>]*>/i.exec(svg)[0];
    let next = tag;
    for (const [name, value] of Object.entries(attributes)) {
      const pattern = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*')`, "i");
      next = pattern.test(next) ? next.replace(pattern, ` ${name}="${value}"`) : next.replace(/^<svg\b/i, `<svg ${name}="${value}"`);
    }
    return svg.replace(tag, next);
  };
  var wasmReady = null;
  function initSvgRasterizer(wasm2) {
    wasmReady ??= initWasm(wasm2);
    return wasmReady;
  }
  function createSvgRasterizer({ fonts = [] } = {}) {
    const fontOptions = {
      fontBuffers: fonts,
      loadSystemFonts: false,
      defaultFontFamily: "Noto Sans",
      sansSerifFamily: "Noto Sans",
      serifFamily: "Source Serif Pro"
    };
    const prepare = (svg2) => fixupSvgString(String(svg2)).replace(FONT_ATTRIBUTE, (_, prefix, quote, list) => `${prefix}${quote}${renameFamilies(list).replaceAll(quote, quote === '"' ? "'" : '"')}${quote}`).replace(FONT_STYLE, (_, prefix, list) => `${prefix}${renameFamilies(list)}`);
    const measure = (svg2) => {
      try {
        const resvg = new Resvg2(svg2, { font: fontOptions });
        const bbox = resvg.getBBox();
        const box = bbox ? { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height } : null;
        bbox?.free?.();
        resvg.free?.();
        return box ?? { x: 0, y: 0, width: 0, height: 0 };
      } catch {
        return { x: 0, y: 0, width: 0, height: 0 };
      }
    };
    const normalize = (svgIn) => {
      const svg2 = prepare(svgIn);
      const tag = /<svg\b[^>]*>/i.exec(svg2)?.[0];
      if (!tag) return svg2;
      const hasViewBox = /\sviewBox\s*=/i.test(tag);
      if (hasViewBox) {
        if (/\swidth\s*=/i.test(tag) && /\sheight\s*=/i.test(tag)) return svg2;
        const box2 = svgViewBox(svg2);
        return box2 ? setRootAttributes(svg2, { width: box2.width, height: box2.height }) : svg2;
      }
      const box = measure(svg2);
      const half = box.width === 0 || box.height === 0 ? 0 : largestStrokeWidth(svg2) / 2;
      const width = box.width + half * 2;
      const height = box.height + half * 2;
      return setRootAttributes(svg2, { width, height, viewBox: `${box.x - half} ${box.y - half} ${width} ${height}` });
    };
    const svg = (source, viewBox, scale, width, height) => {
      const out = new Uint8ClampedArray(width * height * 4);
      let resvg;
      let image;
      try {
        resvg = new Resvg2(source, { fitTo: { mode: "zoom", value: scale }, font: fontOptions });
        image = resvg.render();
      } catch {
        resvg?.free?.();
        return out;
      }
      const pixels = image.pixels;
      const copyWidth = Math.min(width, image.width);
      const copyHeight = Math.min(height, image.height);
      for (let row = 0; row < copyHeight; row++) {
        let from = row * image.width * 4;
        let to = row * width * 4;
        for (let column = 0; column < copyWidth; column++, from += 4, to += 4) {
          const alpha = pixels[from + 3];
          if (alpha === 0) continue;
          out[to + 3] = alpha;
          if (alpha === 255) {
            out[to] = pixels[from];
            out[to + 1] = pixels[from + 1];
            out[to + 2] = pixels[from + 2];
          } else {
            out[to] = pixels[from] * 255 / alpha;
            out[to + 1] = pixels[from + 1] * 255 / alpha;
            out[to + 2] = pixels[from + 2] * 255 / alpha;
          }
        }
      }
      image.free?.();
      resvg.free?.();
      return out;
    };
    return { normalize, svg };
  }

  // src/display/browser-pool.js
  var defaultThreads = () => Math.max(1, Math.min(6, (globalThis.navigator?.hardwareConcurrency ?? 2) - 1));
  var canSpawnWorkers = (url) => {
    try {
      new Worker(url, { type: "module" }).terminate();
      return true;
    } catch {
      return false;
    }
  };
  async function createBrowserPool({ assets, threads = defaultThreads() } = {}) {
    const url = URL.createObjectURL(new Blob([spre_compositor_worker_default], { type: "text/javascript" }));
    if (threads > 0 && canSpawnWorkers(url)) {
      return createCompositorPool({ threads, spawn: () => new Worker(url, { type: "module" }), workerInit: { wasm: assets.wasm, fonts: assets.fonts } });
    }
    await initSvgRasterizer(assets.wasm);
    return createCompositorPool({ threads: 0, rasterizer: createSvgRasterizer({ fonts: assets.fonts }) });
  }

  // src/display/assets.js
  var FONT_FILES = [
    "NotoSans-Medium.ttf",
    "SourceSerifPro-Regular.otf",
    "handlee-regular.ttf",
    "Knewave.ttf",
    "Griffy-Regular.ttf",
    "Grand9K-Pixel.ttf",
    "Scratch.ttf"
  ];
  var PIXEL_FONT_INDEX = FONT_FILES.indexOf("Grand9K-Pixel.ttf");
  async function registerPixelFont(assets, family = "SPRE Pixel") {
    if (typeof FontFace === "undefined") return false;
    const face = new FontFace(family, assets.fonts[PIXEL_FONT_INDEX]);
    await face.load();
    document.fonts.add(face);
    return true;
  }

  // src/display/panel/dom.js
  function h(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(props ?? {})) {
      if (value === void 0 || value === null || value === false) continue;
      if (key === "class") element.className = value;
      else if (key === "style") Object.assign(element.style, value);
      else if (key === "dataset") Object.assign(element.dataset, value);
      else if (key.startsWith("on") && typeof value === "function") element.addEventListener(key.slice(2).toLowerCase(), value);
      else if (key === "html") element.innerHTML = value;
      else if (value === true) element.setAttribute(key, "");
      else element.setAttribute(key, value);
    }
    append(element, children);
    return element;
  }
  function append(parent, children) {
    for (const child of children.flat(Infinity)) {
      if (child === null || child === void 0 || child === false) continue;
      parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return parent;
  }
  function replaceChildren(parent, ...children) {
    parent.replaceChildren();
    return append(parent, children);
  }
  var formatValue = (value) => {
    if (value === null || value === void 0) return "";
    if (typeof value === "object" && "length" in value) return `${value.length} item${value.length === 1 ? "" : "s"}`;
    return String(value);
  };

  // src/display/panel/icons.js
  var icon = (paths, size = 16) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  var ICONS = {
    play: icon('<path d="M7.5 5.2v13.6a.6.6 0 0 0 .9.5l10.8-6.8a.6.6 0 0 0 0-1L8.4 4.7a.6.6 0 0 0-.9.5Z"/>'),
    pause: icon('<path d="M8 5v14M16 5v14"/>'),
    stepBack: icon('<path d="M17 6.5v11L9.5 12 17 6.5Z"/><path d="M7 6v12"/>'),
    stepForward: icon('<path d="M7 6.5v11l7.5-5.5L7 6.5Z"/><path d="M17 6v12"/>'),
    flag: icon('<path d="M6 21V4"/><path d="M6 4.5c3-1.6 5.5 1.4 8.5 0S18.5 4 18.5 4v8.5s-1 .9-4 .9-5.5-2.6-8.5-.9"/>'),
    stop: icon('<path d="M8.8 3.5h6.4l4.5 4.5v6.4l-4.5 4.5H8.8l-4.5-4.5V8l4.5-4.5Z"/>'),
    record: icon('<circle cx="12" cy="12" r="5.5"/>'),
    snow: icon('<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2"/>'),
    search: icon('<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>'),
    save: icon('<path d="M5 4h11l3 3v13H5V4Z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>'),
    restore: icon('<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>'),
    trash: icon('<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>'),
    download: icon('<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>'),
    upload: icon('<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 19.5h14"/>'),
    cut: icon('<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M8.3 15.7 18 4M15.7 15.7 6 4"/>'),
    close: icon('<path d="M6 6l12 12M18 6 6 18"/>'),
    chevron: icon('<path d="m9 6 6 6-6 6"/>'),
    dice: icon('<rect x="4.5" y="4.5" width="15" height="15" rx="3.5"/><circle cx="9" cy="9" r=".6" fill="currentColor"/><circle cx="15" cy="15" r=".6" fill="currentColor"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>'),
    blank: icon('<rect x="4.5" y="6" width="15" height="12" rx="3"/><path d="M9 12h6"/>'),
    plus: icon('<path d="M12 5v14M5 12h14"/>')
  };

  // src/display/panel/inputs.js
  var download = (filename, text) => {
    const link = h("a", { href: URL.createObjectURL(new Blob([text], { type: "application/json" })), download: filename });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1e3);
  };
  var describe = (event) => {
    switch (event.type) {
      case "key":
        return `${event.down === false ? "Release" : "Press"} ${event.key}`;
      case "mouse": {
        const where = event.x !== void 0 ? ` at ${Math.round(event.x)}, ${Math.round(event.y)}` : "";
        if (event.down === true) return `Mouse down${where}${event.target ? ` on ${event.target}` : ""}`;
        if (event.down === false) return `Mouse up${where}`;
        return `Mouse move${where}`;
      }
      case "flag":
        return "Green flag";
      case "stop":
        return "Stop all";
      case "answer":
        return `Answer "${event.text}"`;
      case "poke":
        return `Set variable to ${JSON.stringify(event.value)}`;
      case "list":
        return `List ${event.op}`;
      case "hold":
        return `Hold variable (${event.mode ?? "freeze"})`;
      case "release":
        return "Release held values";
      case "wheel":
        return `Scroll ${event.deltaY < 0 ? "up" : "down"}`;
      case "turbo":
        return `Turbo ${event.on ? "on" : "off"}`;
      default:
        return event.type;
    }
  };
  function createInputsTab({ client }) {
    const file = h("input", { type: "file", accept: ".json,application/json", hidden: true });
    const showMoves = h("input", { type: "checkbox", id: "spre-moves" });
    const list = h("ul", { class: "rows" });
    const note = h("div", { class: "note" });
    const cut = h("button", { class: "pill", title: "Forget recorded inputs after this frame so you can play them differently", onClick: () => client.call("timeline.cut") }, h("span", { html: ICONS.cut }), "Cut here");
    const element = h(
      "div",
      {},
      h(
        "div",
        { class: "toolbar" },
        cut,
        h("button", {
          class: "pill",
          onClick: async () => download("spre-movie.json", JSON.stringify(await client.call("spre.movie"), null, 1))
        }, h("span", { html: ICONS.download }), "Export movie"),
        h("button", { class: "pill", onClick: () => file.click() }, h("span", { html: ICONS.upload }), "Play a movie"),
        h("label", { class: "pill", for: "spre-moves" }, showMoves, "Mouse moves"),
        file
      ),
      note,
      list
    );
    let timer = null;
    const render = async () => {
      const { total, events, pending } = await client.call("input.log", { last: 300 });
      const shown = events.filter((event) => showMoves.checked || !(event.type === "mouse" && event.down === void 0));
      note.textContent = total === 0 ? "Everything you do to the project lands here, frame by frame: keys, clicks, answers and every value you change. Export it as a movie to replay the run exactly." : `${total} input${total === 1 ? "" : "s"} so far${pending.length ? `, ${pending.length} still to come` : ""}.`;
      replaceChildren(list, [
        ...pending.slice(0, 50).map((event) => ({ ...event, upcoming: true })).reverse(),
        ...shown.slice().reverse()
      ].map((event) => h(
        "li",
        { class: "row", style: event.upcoming ? { opacity: 0.55 } : void 0 },
        h("span", { class: "marker", style: { background: "var(--event)" }, "aria-hidden": "true" }),
        h("span", { class: "name" }, describe(event)),
        h("span", { class: "value", style: { color: "var(--muted)", fontFamily: "var(--pixel)", fontSize: "10px", lineHeight: "24px" } }, `${event.frame}`),
        h("span")
      )));
    };
    showMoves.addEventListener("change", render);
    file.addEventListener("change", async () => {
      const [chosen] = file.files;
      if (!chosen) return;
      try {
        const movie = JSON.parse(await chosen.text());
        if (!Array.isArray(movie.events)) throw new Error("it has no events");
        await client.call("input.schedule", movie.events);
      } catch (error) {
        note.textContent = `Could not play that movie: ${error.message}`;
      }
      file.value = "";
      render();
    });
    return {
      element,
      show() {
        render();
        clearInterval(timer);
        timer = setInterval(render, 700);
      },
      hide() {
        clearInterval(timer);
      },
      update(status) {
        cut.disabled = !status.timeline || status.timeline.start === null;
      },
      dispose() {
        clearInterval(timer);
      }
    };
  }

  // src/display/panel/memory.js
  var POLL_MS = 350;
  var NUMBER = /^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;
  var parseValue = (text) => NUMBER.test(text.trim()) && String(Number(text)) === text.trim() ? Number(text) : text;
  var editable = ({ value, held, onCommit, label }) => {
    const input = h("input", { class: `value${held ? " held" : ""}`, value: formatValue(value), "aria-label": label, spellcheck: "false" });
    input.dataset.committed = input.value;
    const commit = () => {
      if (input.value === input.dataset.committed) return;
      input.dataset.committed = input.value;
      onCommit(parseValue(input.value));
    };
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") input.blur();
      if (event.key === "Escape") {
        input.value = input.dataset.committed;
        input.blur();
      }
      event.stopPropagation();
    });
    input.addEventListener("keyup", (event) => event.stopPropagation());
    input.addEventListener("blur", commit);
    return input;
  };
  var refreshInput = (input, value, held) => {
    input.classList.toggle("held", held);
    if (input.matches(":focus")) return;
    const text = formatValue(value);
    if (input.value !== text) input.value = text;
    input.dataset.committed = text;
  };
  function createMemoryTab({ client }) {
    const filter = h("input", { class: "field", type: "search", placeholder: "Filter by name or /regex/", "aria-label": "Filter" });
    const scope = h("select", { class: "field", "aria-label": "Sprite" }, h("option", { value: "" }, "All sprites"));
    const kind = h(
      "select",
      { class: "field", "aria-label": "Kind" },
      h("option", { value: "any" }, "Variables and lists"),
      h("option", { value: "var" }, "Variables"),
      h("option", { value: "list" }, "Lists")
    );
    const counter = h("span", { class: "counter" });
    const list = h("ul", { class: "rows" });
    const message = h("div", { class: "note" });
    const element = h("div", {}, h("div", { class: "toolbar" }, filter, scope, kind), list, message);
    const rows = /* @__PURE__ */ new Map();
    const open = /* @__PURE__ */ new Set();
    let timer = null;
    let refreshing = false;
    for (const control of [filter, scope, kind]) control.addEventListener("input", () => refresh());
    for (const control of [filter]) control.addEventListener("keydown", (event) => event.stopPropagation());
    const toggleHold = (row, selection) => {
      if (row.held) client.call("holds.release", selection);
      else client.call("holds.set", { ...selection, mode: "freeze" });
    };
    const listItems = async (row, drawer) => {
      const holds = await client.call("holds.list");
      const heldIndexes = new Set(holds.filter((hold) => hold.target === row.data.target && hold.variable === row.data.id && hold.index !== void 0).map((hold) => hold.index));
      const data = await client.call("vars.get", row.data.target, row.data.id, { limit: 200 });
      const selection = { target: row.data.target, variable: row.data.id };
      replaceChildren(
        drawer,
        data.items.map((item, i2) => {
          const index = i2 + 1;
          const held = heldIndexes.has(index);
          return h(
            "div",
            { class: "item" },
            h("span", { class: "index" }, index),
            editable({ value: item, held, label: `${row.data.name} item ${index}`, onCommit: (value) => client.call("lists.edit", row.data.target, row.data.id, "set", { index, value }) }),
            h("button", {
              class: `icon-button small${held ? " held" : ""}`,
              title: held ? "Release this item" : "Hold this item",
              "aria-label": held ? "Release this item" : "Hold this item",
              html: ICONS.snow,
              onClick: async () => {
                await client.call(held ? "holds.release" : "holds.set", held ? { ...selection, index } : { ...selection, index, mode: "freeze" });
                listItems(row, drawer);
              }
            })
          );
        }),
        data.length > data.items.length ? h("div", { class: "note" }, `Showing ${data.items.length} of ${data.length} items`) : null,
        h(
          "div",
          { style: { display: "flex", gap: "6px", padding: "6px 4px 2px" } },
          h("button", { class: "pill", onClick: async () => {
            await client.call("lists.edit", row.data.target, row.data.id, "push", { value: "" });
            listItems(row, drawer);
          } }, "Add item"),
          h("button", { class: "pill", onClick: async () => {
            await client.call("lists.edit", row.data.target, row.data.id, "wipe");
            listItems(row, drawer);
          } }, "Blank every item"),
          h("button", { class: "pill", onClick: async () => {
            await client.call("lists.edit", row.data.target, row.data.id, "clear");
            listItems(row, drawer);
          } }, "Remove all")
        )
      );
    };
    const holdDrawer = (row, drawer) => {
      const selection = { target: row.data.target, variable: row.data.id };
      const low = h("input", { class: "field", style: { flex: "0 1 64px" }, value: "1", "aria-label": "Lowest value" });
      const high = h("input", { class: "field", style: { flex: "0 1 64px" }, value: "10", "aria-label": "Highest value" });
      for (const field of [low, high]) field.addEventListener("keydown", (event) => event.stopPropagation());
      replaceChildren(drawer, h(
        "div",
        { style: { display: "flex", flexWrap: "wrap", gap: "6px", padding: "4px" } },
        h("button", { class: "pill", onClick: () => client.call("holds.set", { ...selection, mode: "freeze" }) }, "Freeze here"),
        h("button", { class: "pill", onClick: () => client.call("holds.set", { ...selection, mode: "blank" }) }, "Keep blank"),
        h("button", { class: "pill", onClick: () => client.call("holds.set", { ...selection, mode: "random", low: parseValue(low.value), high: parseValue(high.value) }) }, "Randomize"),
        low,
        high,
        h("button", { class: "pill", onClick: () => client.call("holds.release", selection) }, "Release")
      ));
    };
    const createRow = (data) => {
      const key = `${data.target}|${data.id}`;
      const row = { data, held: data.held };
      const marker = h("span", { class: `marker${data.kind === "list" ? " list" : ""}`, "aria-hidden": "true" });
      const name = h(
        "button",
        { class: "name", style: { textAlign: "left" }, "aria-expanded": "false", title: data.kind === "list" ? "Show items" : "Hold options" },
        data.name,
        h("span", { class: "owner" }, data.clone ? `${data.targetName} clone` : data.targetName)
      );
      const value = data.kind === "list" ? h("button", { class: "value list", onClick: () => name.click() }, formatValue(data.value)) : editable({ value: data.value, held: data.held, label: data.name, onCommit: (next) => client.call("vars.set", data.target, data.id, next) });
      const freeze = h("button", { class: `icon-button small${data.held ? " held" : ""}`, html: ICONS.snow, onClick: () => toggleHold(row, { target: data.target, variable: data.id }) });
      const drawer = h("div", { class: "items", hidden: true });
      const item = h("li", {}, h("div", { class: "row" }, marker, name, value, h("span", { class: "actions" }, freeze)), drawer);
      name.addEventListener("click", () => {
        const expanded = drawer.hidden;
        drawer.hidden = !expanded;
        name.setAttribute("aria-expanded", String(expanded));
        if (expanded) {
          open.add(key);
          if (data.kind === "list") listItems(row, drawer);
          else holdDrawer(row, drawer);
        } else {
          open.delete(key);
        }
      });
      row.update = (next) => {
        row.data = next;
        row.held = next.held;
        freeze.classList.toggle("held", next.held);
        const label = next.held ? `Release ${next.name}` : `Freeze ${next.name}`;
        freeze.title = label;
        freeze.setAttribute("aria-label", label);
        if (next.kind === "list") {
          value.textContent = formatValue(next.value);
          value.classList.toggle("held", next.held);
        } else {
          refreshInput(value, next.value, next.held);
        }
      };
      row.element = item;
      row.update(data);
      return row;
    };
    const refreshScope = async () => {
      const targets = await client.call("targets.list");
      const chosen = scope.value;
      replaceChildren(
        scope,
        h("option", { value: "" }, "All sprites"),
        targets.filter((target) => !target.clone).map((target) => h("option", { value: target.target }, target.name))
      );
      scope.value = chosen;
    };
    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      try {
        const result = await client.call("vars.list", { target: scope.value || void 0, kind: kind.value, filter: filter.value.trim(), limit: 300 });
        const seen = /* @__PURE__ */ new Set();
        const ordered = result.rows.map((data) => {
          const key = `${data.target}|${data.id}`;
          seen.add(key);
          let row = rows.get(key);
          if (row) row.update(data);
          else rows.set(key, row = createRow(data));
          return row.element;
        });
        for (const key of [...rows.keys()]) if (!seen.has(key)) rows.delete(key);
        const current = [...list.children];
        if (current.length !== ordered.length || current.some((child, i2) => child !== ordered[i2])) replaceChildren(list, ordered);
        message.textContent = result.total === 0 ? filter.value ? "Nothing matches that filter." : "This project has no variables or lists here." : result.total > result.rows.length ? `Showing ${result.rows.length} of ${result.total}. Narrow the filter to see the rest.` : "";
        counter.textContent = String(result.total);
      } catch (error) {
        message.textContent = error.message;
      } finally {
        refreshing = false;
      }
    };
    return {
      element,
      show() {
        refreshScope();
        refresh();
        clearInterval(timer);
        timer = setInterval(refresh, POLL_MS);
      },
      hide() {
        clearInterval(timer);
        timer = null;
      },
      dispose() {
        clearInterval(timer);
      }
    };
  }

  // src/display/panel/scan.js
  function createScanTab({ client }) {
    const value = h("input", { class: "field", placeholder: "Value to look for, e.g. your score", "aria-label": "Value" });
    value.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Enter") start2();
    });
    const summary = h("div", { class: "note" });
    const list = h("ul", { class: "rows" });
    const narrowButtons = [
      ["equals", "Still equals"],
      ["changed", "Changed"],
      ["unchanged", "Unchanged"],
      ["increased", "Went up"],
      ["decreased", "Went down"]
    ].map(([mode, label]) => h("button", { class: "pill", disabled: true, onClick: () => narrow(mode) }, label));
    const element = h(
      "div",
      {},
      h(
        "div",
        { class: "toolbar" },
        value,
        h("button", { class: "pill strong", onClick: () => start2() }, h("span", { html: ICONS.search }), "Find"),
        h("button", { class: "pill", title: "Start from every variable, then narrow by how they change", onClick: () => start2(true) }, "Take all"),
        narrowButtons,
        h("button", { class: "pill", onClick: () => reset() }, "Reset")
      ),
      summary,
      list
    );
    let timer = null;
    let active = false;
    const describe2 = (count) => {
      if (!active) return "Type a value you can see in the game, then press Find. Change it in the game and narrow the results until one variable is left.";
      if (count === 0) return "No variables match. Reset and try a different value.";
      return count === 1 ? "1 variable matches." : `${count} variables match.`;
    };
    const render = async () => {
      const result = await client.call("scan.results", { limit: 200 });
      summary.textContent = describe2(result.count);
      narrowButtons.forEach((button) => {
        button.disabled = !active;
      });
      replaceChildren(list, result.rows.map((row) => h(
        "li",
        { class: "row" },
        h("span", { class: "marker", "aria-hidden": "true" }),
        h("span", { class: "name" }, row.name, h("span", { class: "owner" }, row.targetName)),
        h("span", { class: "value", title: `was ${formatValue(row.previous)}` }, formatValue(row.value)),
        h("span", { class: "actions" }, h("button", {
          class: "icon-button small",
          title: `Freeze ${row.name}`,
          "aria-label": `Freeze ${row.name}`,
          html: ICONS.snow,
          onClick: () => client.call("holds.set", { target: row.target, variable: row.id, mode: "freeze" })
        }))
      )));
    };
    const start2 = async (everything = false) => {
      const text = value.value.trim();
      if (!everything && text === "") {
        value.focus();
        return;
      }
      await client.call("scan.start", everything ? void 0 : parseValue(text));
      active = true;
      render();
    };
    const narrow = async (mode) => {
      await client.call("scan.narrow", mode, parseValue(value.value.trim()));
      render();
    };
    const reset = async () => {
      await client.call("scan.reset");
      active = false;
      render();
    };
    return {
      element,
      show() {
        render();
        clearInterval(timer);
        timer = setInterval(() => active && render(), 500);
      },
      hide() {
        clearInterval(timer);
      },
      dispose() {
        clearInterval(timer);
      }
    };
  }

  // src/display/panel/states.js
  var download2 = (filename, text) => {
    const link = h("a", { href: URL.createObjectURL(new Blob([text], { type: "application/json" })), download: filename });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1e3);
  };
  function createStatesTab({ client }) {
    const name = h("input", { class: "field", placeholder: "Name this savestate", "aria-label": "Savestate name" });
    name.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Enter") save();
    });
    const file = h("input", { type: "file", accept: ".json,application/json", hidden: true });
    const list = h("ul", { class: "rows" });
    const note = h("div", { class: "note" });
    const element = h(
      "div",
      {},
      h(
        "div",
        { class: "toolbar" },
        name,
        h("button", { class: "pill strong", onClick: () => save() }, h("span", { html: ICONS.save }), "Save"),
        h("button", { class: "pill", onClick: () => file.click() }, h("span", { html: ICONS.upload }), "Import"),
        file
      ),
      list,
      note
    );
    const render = async () => {
      const states = await client.call("states.list");
      note.textContent = states.length ? "" : "A savestate holds the whole world: every sprite, clone, script and pen line. Load one to jump straight back.";
      replaceChildren(list, states.slice().reverse().map((state) => h(
        "li",
        { class: "row" },
        h("span", { class: "marker", style: { background: "var(--violet)" }, "aria-hidden": "true" }),
        h("span", { class: "name" }, state.name),
        h("span", { class: "value", style: { color: "var(--muted)" } }, `frame ${state.frame}`),
        h(
          "span",
          { class: "actions" },
          h("button", { class: "icon-button small", title: `Load ${state.name}`, "aria-label": `Load ${state.name}`, html: ICONS.restore, onClick: () => client.call("states.load", state.name) }),
          h("button", {
            class: "icon-button small",
            title: `Export ${state.name}`,
            "aria-label": `Export ${state.name}`,
            html: ICONS.download,
            onClick: async () => download2(`${state.name}.spre.json`, await client.call("states.export", state.name))
          }),
          h("button", {
            class: "icon-button small",
            title: `Delete ${state.name}`,
            "aria-label": `Delete ${state.name}`,
            html: ICONS.trash,
            onClick: async () => {
              await client.call("states.drop", state.name);
              render();
            }
          })
        )
      )));
    };
    const save = async () => {
      await client.call("states.save", name.value.trim() || void 0);
      name.value = "";
      render();
    };
    file.addEventListener("change", async () => {
      const [chosen] = file.files;
      if (!chosen) return;
      try {
        await client.call("states.import", await chosen.text());
        note.textContent = "";
      } catch (error) {
        note.textContent = `That file is not a SPRE savestate: ${error.message}`;
      }
      file.value = "";
      render();
    });
    return { element, show: render };
  }

  // src/display/panel/styles.js
  var PANEL_CSS = `
:host {
    all: initial;
    --paper: #eef0f4;
    --card: #ffffff;
    --card-raised: #f7f8fa;
    --ink: #1d2230;
    --muted: #6b7286;
    --faint: #9aa1b2;
    --hair: rgba(29, 34, 48, 0.08);
    --hair-strong: rgba(29, 34, 48, 0.14);
    --violet: #6a4df5;
    --violet-soft: rgba(106, 77, 245, 0.12);
    --ice: #1ba7c4;
    --ice-soft: rgba(27, 167, 196, 0.13);
    --data: #ff8c1a;
    --list: #ff661a;
    --event: #ffbf00;
    --live: #e5484d;
    --shell: rgba(29, 34, 48, 0.05);
    --shadow: 0 34px 70px -34px rgba(29, 34, 48, 0.42), 0 3px 10px -4px rgba(29, 34, 48, 0.14);
    --highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --spring: cubic-bezier(0.32, 0.72, 0, 1);
    --snap: cubic-bezier(0.2, 0.9, 0.1, 1);
    --ui: ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", "Noto Sans", sans-serif;
    --pixel: "SPRE Pixel", ui-sans-serif, system-ui, sans-serif;
    font: 400 12.5px/1.4 var(--ui);
    color: var(--ink);
    font-variant-numeric: tabular-nums;
}

@media (prefers-color-scheme: dark) {
    :host {
        --paper: #16181e;
        --card: #1f222a;
        --card-raised: #252933;
        --ink: #e9ebf1;
        --muted: #9097a8;
        --faint: #6c7387;
        --hair: rgba(233, 235, 241, 0.08);
        --hair-strong: rgba(233, 235, 241, 0.14);
        --violet: #8b74ff;
        --violet-soft: rgba(139, 116, 255, 0.16);
        --ice: #3cc3df;
        --ice-soft: rgba(60, 195, 223, 0.15);
        --shell: rgba(233, 235, 241, 0.05);
        --shadow: 0 34px 70px -30px rgba(0, 0, 0, 0.7), 0 3px 10px -4px rgba(0, 0, 0, 0.5);
        --highlight: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
}

* { box-sizing: border-box; }

[hidden] { display: none !important; }

button, input, select { font: inherit; color: inherit; }

button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

button:focus-visible, input:focus-visible, select:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid var(--violet);
    outline-offset: 2px;
}

.shell {
    position: fixed;
    z-index: 2147483000;
    padding: 5px;
    border-radius: 20px;
    background: var(--shell);
    box-shadow: var(--shadow);
    outline: 1px solid var(--hair);
    outline-offset: -1px;
    transform-origin: 100% 100%;
    animation: open 520ms var(--spring) both;
}

.shell.inline {
    position: relative;
    inset: auto;
    width: 100%;
    height: 100%;
    z-index: auto;
    animation: none;
}

.shell.inline .head { cursor: default; }

@keyframes open {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to { opacity: 1; transform: none; }
}

.core {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    background: var(--card);
    box-shadow: var(--highlight);
}

.head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 10px 10px 8px 10px;
    cursor: grab;
    user-select: none;
    touch-action: none;
}

.head:active { cursor: grabbing; }

.island {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 3px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
}

.icon-button {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    color: var(--ink);
    transition: transform 260ms var(--spring), background-color 200ms var(--snap), color 200ms var(--snap);
}

.icon-button:hover { background: var(--hair); }
.icon-button:active { transform: scale(0.92); }
.icon-button[disabled] { opacity: 0.35; pointer-events: none; }
.icon-button.primary { background: var(--violet); color: #fff; }
.icon-button.primary:hover { background: var(--violet); transform: scale(1.04); }
.icon-button.small { width: 24px; height: 24px; }
.icon-button.is-on { color: var(--live); }
.icon-button.is-on svg circle { fill: currentColor; }
.icon-button.held { color: var(--ice); background: var(--ice-soft); }

.clock {
    display: grid;
    justify-items: start;
    min-width: 0;
    line-height: 1;
}

.frame {
    font-family: var(--pixel);
    font-size: 22px;
    letter-spacing: 0.02em;
    color: var(--ink);
    white-space: nowrap;
}

.time {
    margin-top: 4px;
    font-family: var(--pixel);
    font-size: 10px;
    color: var(--muted);
    white-space: nowrap;
}

.speeds {
    display: flex;
    padding: 2px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
}

.speeds button {
    min-width: 24px;
    height: 22px;
    padding: 0 6px;
    border-radius: 999px;
    color: var(--muted);
    font-size: 11.5px;
    transition: background-color 220ms var(--snap), color 220ms var(--snap);
}

.speeds button[aria-pressed="true"] {
    background: var(--card);
    color: var(--ink);
    box-shadow: 0 1px 2px rgba(29, 34, 48, 0.12), inset 0 0 0 1px var(--hair);
}

.tape-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 0 10px 10px 10px;
}

.tape {
    position: relative;
    height: 30px;
    border-radius: 9px;
    background:
        repeating-linear-gradient(90deg, transparent 0 7px, var(--hair) 7px 8px) 0 100% / 100% 6px no-repeat,
        var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    cursor: ew-resize;
    touch-action: none;
    overflow: hidden;
}

.tape[aria-disabled="true"] { cursor: default; }

.tape .recorded {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--violet-soft);
    transform-origin: 0 50%;
}

.tape .key {
    position: absolute;
    top: 7px;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background: var(--violet);
    opacity: 0.55;
    transform: rotate(45deg);
}

.tape .input-mark {
    position: absolute;
    bottom: 3px;
    width: 3px;
    height: 3px;
    margin-left: -1.5px;
    border-radius: 999px;
    background: var(--event);
}

.tape .playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--violet);
    transition: transform 140ms var(--snap);
}

.tape .playhead::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -4px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--violet);
    box-shadow: 0 0 0 2px var(--card);
}

.tape-span {
    font-family: var(--pixel);
    font-size: 10px;
    color: var(--faint);
    white-space: nowrap;
}

.tabs {
    position: relative;
    display: flex;
    gap: 2px;
    padding: 0 8px;
    border-bottom: 1px solid var(--hair);
}

.tabs button {
    position: relative;
    padding: 8px 8px 9px;
    color: var(--muted);
    transition: color 200ms var(--snap);
}

.tabs button[aria-selected="true"] { color: var(--ink); }

.tabs .indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--violet);
    transition: transform 420ms var(--spring), width 420ms var(--spring);
}

.body {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
}

.toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 10px;
    background: var(--card);
    border-bottom: 1px solid var(--hair);
}

.field {
    flex: 1 1 120px;
    min-width: 0;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    outline-offset: 0;
}

.field::placeholder { color: var(--faint); }

select.field { flex: 0 1 auto; padding-right: 6px; }

.pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    color: var(--ink);
    white-space: nowrap;
    transition: transform 240ms var(--spring), background-color 200ms var(--snap);
}

.pill:hover { background: var(--card-raised); }
.pill:active { transform: scale(0.96); }
.pill.strong { background: var(--violet); color: #fff; box-shadow: none; }
.pill[disabled] { opacity: 0.4; pointer-events: none; }

.rows { list-style: none; margin: 0; padding: 4px 0; }

.row {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) minmax(0, 1.1fr) auto;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    padding: 2px 8px 2px 12px;
}

.row + .row { box-shadow: inset 0 1px 0 var(--hair); }
.row:hover { background: var(--card-raised); }

.marker { width: 8px; height: 8px; border-radius: 3px; background: var(--data); }
.marker.list { background: var(--list); border-radius: 1px; }

.name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.owner { color: var(--faint); margin-left: 4px; }

.value {
    min-width: 0;
    height: 24px;
    padding: 0 8px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background-color 200ms var(--snap);
}

.value:hover, .value:focus { background: var(--paper); }
.value.held { color: var(--ice); background: var(--ice-soft); }
.value.list { color: var(--muted); text-align: right; }

.actions { display: flex; gap: 2px; }

.items { margin: 0 8px 6px 28px; padding: 4px; border-radius: 10px; background: var(--paper); }
.item { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 6px; min-height: 26px; }
.item .index { color: var(--faint); text-align: right; font-size: 11px; }
.item .value { text-align: left; }

.note { padding: 12px 14px; color: var(--muted); }
.note strong { color: var(--ink); font-weight: 600; }
.error { color: var(--live); }

.counter { margin-left: auto; align-self: center; color: var(--muted); }

.launcher {
    position: fixed;
    z-index: 2147483000;
    right: 18px;
    bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    padding: 0 14px 0 6px;
    border-radius: 999px;
    background: var(--card);
    box-shadow: var(--shadow);
    outline: 1px solid var(--hair);
    color: var(--ink);
    transition: transform 300ms var(--spring);
}

.launcher:hover { transform: translateY(-1px); }
.launcher .badge { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 999px; background: var(--violet); color: #fff; }
.launcher .frame { font-size: 14px; }

.resize {
    position: absolute;
    right: 2px;
    bottom: 2px;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
    touch-action: none;
}

@media (prefers-reduced-motion: reduce) {
    *, .shell { animation: none !important; transition: none !important; }
}
`;

  // src/display/panel/index.js
  var SPEEDS = [[0.25, "\xBC"], [0.5, "\xBD"], [1, "1\xD7"], [2, "2\xD7"], [4, "4\xD7"], [Infinity, "\u221E"]];
  var PREFS_KEY = "spre.panel";
  var readPrefs = () => {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY)) ?? {};
    } catch {
      return {};
    }
  };
  var writePrefs = (prefs) => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
    }
  };
  var formatTime = (ms) => {
    const total = Math.max(0, ms) / 1e3;
    const minutes = Math.floor(total / 60);
    const seconds = total - minutes * 60;
    return `${String(minutes).padStart(2, "0")}:${seconds.toFixed(2).padStart(5, "0")}`;
  };
  var groupDigits = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  var iconButton = (name, label, onClick, extra = "") => h("button", { class: `icon-button ${extra}`, "aria-label": label, title: label, onClick, html: ICONS[name] });
  function createPanel({ client, mount = document.body, open = true, hotkey = "S", inline = false } = {}) {
    const host = h("div", { "data-spre-panel": "" });
    const shadow = host.attachShadow({ mode: "open" });
    const prefs = { width: 384, height: 500, ...readPrefs() };
    let status = null;
    let busySeek = null;
    let queuedSeek = null;
    const playButton = iconButton("play", "Play", () => client.call(status?.running ? "time.pause" : "time.resume"), "primary");
    const backButton = iconButton("stepBack", "Back one frame", () => seek((status?.frame ?? 1) - 1));
    const forwardButton = iconButton("stepForward", "Forward one frame", () => client.call("time.step", 1));
    const frameText = h("span", { class: "frame" }, "0");
    const timeText = h("span", { class: "time" }, "00:00.00");
    const speedButtons = SPEEDS.map(([value, label]) => h("button", {
      "aria-pressed": "false",
      title: Number.isFinite(value) ? `Run at ${label}` : "Run as fast as possible",
      onClick: () => client.call("time.speed", value)
    }, label));
    const recordButton = iconButton("record", "Record the timeline", () => client.call(status?.timeline?.recording ? "timeline.stop" : "timeline.start"), "small");
    const recorded = h("div", { class: "recorded" });
    const keys = h("div");
    const marks = h("div");
    const playhead = h("div", { class: "playhead" });
    const tape = h("div", { class: "tape", role: "slider", tabindex: "0", "aria-label": "Timeline", "aria-valuemin": "0" }, recorded, keys, marks, playhead);
    const span = h("span", { class: "tape-span" }, "");
    const tabs = [
      ["Memory", createMemoryTab({ client })],
      ["Scan", createScanTab({ client })],
      ["Savestates", createStatesTab({ client })],
      ["Inputs", createInputsTab({ client })]
    ];
    const indicator = h("span", { class: "indicator" });
    const tabButtons = tabs.map(([label], i2) => h("button", { role: "tab", "aria-selected": "false", onClick: () => selectTab(i2) }, label));
    const body = h("div", { class: "body", role: "tabpanel" });
    const tabBar = h(
      "div",
      { class: "tabs", role: "tablist" },
      tabButtons,
      indicator,
      h(
        "span",
        { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: "2px" } },
        iconButton("flag", "Green flag", () => client.call("project.flag"), "small"),
        iconButton("stop", "Stop all", () => client.call("project.stop"), "small"),
        inline ? null : iconButton("close", "Hide panel (Alt+Shift+" + hotkey + ")", () => setOpen(false), "small")
      )
    );
    const head = h(
      "div",
      { class: "head" },
      h("div", { class: "island" }, backButton, playButton, forwardButton),
      h("div", { class: "clock" }, frameText, timeText),
      h("div", { class: "speeds", role: "group", "aria-label": "Speed" }, speedButtons)
    );
    const resize = h("div", { class: "resize", "aria-hidden": "true" });
    const shell = h(
      "div",
      { class: `shell${inline ? " inline" : ""}`, role: inline ? "region" : "dialog", "aria-label": "SPRE" },
      h("div", { class: "core" }, head, h("div", { class: "tape-row" }, recordButton, tape, span), tabBar, body),
      inline ? null : resize
    );
    const launcherFrame = h("span", { class: "frame" }, "0");
    const launcher = h(
      "button",
      { class: "launcher", "aria-label": "Open SPRE", onClick: () => setOpen(true) },
      h("span", { class: "badge", html: ICONS.play }),
      launcherFrame
    );
    shadow.append(h("style", {}, PANEL_CSS), shell, launcher);
    mount.append(host);
    const place = () => {
      if (inline) return;
      const width = Math.min(prefs.width, innerWidth - 16);
      const height = Math.min(prefs.height, innerHeight - 16);
      const left = Math.min(Math.max(8, prefs.left ?? innerWidth - width - 18), innerWidth - width - 8);
      const top = Math.min(Math.max(8, prefs.top ?? innerHeight - height - 18), innerHeight - height - 8);
      Object.assign(shell.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
    };
    let activeTab = Math.min(prefs.tab ?? 0, tabs.length - 1);
    const selectTab = (index) => {
      tabs[activeTab][1].hide?.();
      activeTab = index;
      prefs.tab = index;
      writePrefs(prefs);
      tabButtons.forEach((button, i2) => button.setAttribute("aria-selected", String(i2 === index)));
      replaceChildren(body, tabs[index][1].element);
      tabs[index][1].show?.(status);
      requestAnimationFrame(() => {
        const button = tabButtons[index];
        indicator.style.width = `${button.offsetWidth - 16}px`;
        indicator.style.transform = `translateX(${button.offsetLeft + 8}px)`;
      });
    };
    const setOpen = (requested) => {
      const value = inline || requested;
      shell.hidden = !value;
      launcher.hidden = value;
      prefs.open = value;
      writePrefs(prefs);
      if (value) {
        place();
        selectTab(activeTab);
      } else {
        tabs[activeTab][1].hide?.();
      }
    };
    const frameOf = (clientX) => {
      const range = status?.timeline;
      if (!range || range.start === null) return null;
      const rect = tape.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return Math.round(range.start + ratio * (range.end - range.start));
    };
    const seek = async (frame) => {
      if (frame === null || frame < 0) return;
      if (busySeek) {
        queuedSeek = frame;
        return;
      }
      busySeek = client.call("timeline.seek", frame).catch(() => null);
      await busySeek;
      busySeek = null;
      if (queuedSeek !== null) {
        const next = queuedSeek;
        queuedSeek = null;
        seek(next);
      }
    };
    let scrubbing = null;
    tape.addEventListener("pointerdown", (event) => {
      if (status?.timeline?.start === null) return;
      tape.setPointerCapture(event.pointerId);
      scrubbing = { resume: status?.running };
      if (status?.running) client.call("time.pause");
      seek(frameOf(event.clientX));
    });
    tape.addEventListener("pointermove", (event) => {
      if (scrubbing) seek(frameOf(event.clientX));
    });
    tape.addEventListener("pointerup", async () => {
      if (!scrubbing) return;
      const { resume } = scrubbing;
      scrubbing = null;
      await busySeek;
      if (resume) client.call("time.resume");
    });
    tape.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 30 : 1;
      if (event.key === "ArrowLeft") seek((status?.frame ?? 0) - step);
      else if (event.key === "ArrowRight") seek((status?.frame ?? 0) + step);
      else return;
      event.preventDefault();
    });
    const startDrag = (event, apply) => {
      if (event.button !== 0 || event.target.closest("button")) return;
      const startX = event.clientX;
      const startY = event.clientY;
      const rect = shell.getBoundingClientRect();
      const move = (moveEvent) => {
        apply(rect, moveEvent.clientX - startX, moveEvent.clientY - startY);
        place();
      };
      const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
        writePrefs(prefs);
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    };
    if (!inline) head.addEventListener("pointerdown", (event) => startDrag(event, (rect, dx, dy) => {
      prefs.left = rect.left + dx;
      prefs.top = rect.top + dy;
    }));
    resize.addEventListener("pointerdown", (event) => startDrag(event, (rect, dx, dy) => {
      prefs.left = rect.left;
      prefs.top = rect.top;
      prefs.width = Math.max(320, rect.width + dx);
      prefs.height = Math.max(300, rect.height + dy);
    }));
    const renderTape = () => {
      const range = status.timeline;
      const active = range && range.start !== null;
      tape.setAttribute("aria-disabled", String(!active));
      recordButton.classList.toggle("is-on", Boolean(range?.recording));
      recordButton.title = range?.recording ? "Stop recording the timeline" : "Record the timeline";
      if (!active) {
        recorded.style.transform = "scaleX(0)";
        playhead.style.transform = "translateX(-10px)";
        span.textContent = range?.error ? "cannot record" : "not recording";
        backButton.disabled = true;
        return;
      }
      const length2 = Math.max(1, range.end - range.start);
      const width = tape.clientWidth;
      const x2 = (frame) => (frame - range.start) / length2 * width;
      recorded.style.width = `${width}px`;
      recorded.style.transform = `scaleX(${Math.min(1, Math.max(0, (status.frame - range.start) / length2))})`;
      playhead.style.transform = `translateX(${x2(status.frame)}px)`;
      if (keys.dataset.signature !== `${range.keyframes.length}:${range.start}:${range.end}:${width}`) {
        keys.dataset.signature = `${range.keyframes.length}:${range.start}:${range.end}:${width}`;
        replaceChildren(keys, range.keyframes.map((frame) => h("span", { class: "key", style: { left: `${x2(frame)}px` } })));
      }
      tape.setAttribute("aria-valuemin", String(range.start));
      tape.setAttribute("aria-valuemax", String(range.end));
      tape.setAttribute("aria-valuenow", String(status.frame));
      span.textContent = groupDigits(range.end);
      backButton.disabled = status.frame - 1 < range.start;
    };
    const renderInputMarks = (frames) => {
      const range = status?.timeline;
      if (!range || range.start === null) return replaceChildren(marks);
      const length2 = Math.max(1, range.end - range.start);
      const width = tape.clientWidth;
      const seen = /* @__PURE__ */ new Set();
      replaceChildren(marks, frames.filter((frame) => frame >= range.start).map((frame) => Math.round((frame - range.start) / length2 * width)).filter((px) => !seen.has(px) && seen.add(px)).map((px) => h("span", { class: "input-mark", style: { left: `${px}px` } })));
    };
    client.on("status", (next) => {
      status = next;
      frameText.textContent = groupDigits(next.frame);
      launcherFrame.textContent = groupDigits(next.frame);
      timeText.textContent = formatTime(next.time);
      playButton.innerHTML = next.running ? ICONS.pause : ICONS.play;
      playButton.setAttribute("aria-label", next.running ? "Pause" : "Play");
      playButton.title = next.running ? "Pause" : "Play";
      forwardButton.disabled = next.running;
      speedButtons.forEach((button, i2) => button.setAttribute("aria-pressed", String(SPEEDS[i2][0] === next.speed)));
      if (!shell.hidden) {
        renderTape();
        tabs[activeTab][1].update?.(next);
      }
    });
    const marksTimer = setInterval(async () => {
      if (shell.hidden || !status?.timeline?.recording) return;
      try {
        const movie = await client.call("spre.movie");
        renderInputMarks(movie.events.map((event) => event.frame));
      } catch {
      }
    }, 2e3);
    const onKey = (event) => {
      if (event.altKey && event.shiftKey && event.code === `Key${hotkey}`) {
        event.preventDefault();
        setOpen(shell.hidden);
      }
    };
    addEventListener("keydown", onKey, true);
    addEventListener("resize", place);
    setOpen(prefs.open ?? open);
    return {
      host,
      setOpen,
      get open() {
        return !shell.hidden;
      },
      dispose() {
        clearInterval(marksTimer);
        removeEventListener("keydown", onKey, true);
        removeEventListener("resize", place);
        tabs.forEach(([, tab]) => tab.dispose?.());
        host.remove();
      }
    };
  }

  // src/render/skins.js
  var MAX_TEXTURE_DIMENSION = 2048;
  var INDEX_OFFSET = 8;
  function mipScaleFor(scale, maxTextureScale) {
    const scaleMax = scale ? Math.max(Math.abs(scale[0]), Math.abs(scale[1])) : 100;
    const requestedScale = Math.min(scaleMax / 100, maxTextureScale);
    const mipLevel = Math.max(Math.ceil(Math.log2(requestedScale)) + INDEX_OFFSET, 0);
    return { mipLevel, mipScale: Math.pow(2, mipLevel - INDEX_OFFSET) };
  }
  var EMPTY_TEXTURE = Object.freeze({ empty: true });
  var PRESENT_TEXTURE = Object.freeze({ empty: false });
  var Skin = class {
    constructor(id) {
      this.id = id;
      this.rotationCenter = v3.create(0, 0);
      this.silhouette = new Silhouette();
      this.emptyTexture = void 0;
      this.drawables = /* @__PURE__ */ new Set();
    }
    get size() {
      return [0, 0];
    }
    useNearest() {
      return true;
    }
    calculateRotationCenter() {
      return [this.size[0] / 2, this.size[1] / 2];
    }
    getTexture() {
      return this.emptyTexture;
    }
    updateSilhouette() {
    }
    setEmptyImageData() {
      this.emptyTexture = EMPTY_TEXTURE;
      this.rotationCenter[0] = 0;
      this.rotationCenter[1] = 0;
      this.silhouette.update(1, 1, new Uint8ClampedArray(4));
      this.altered();
    }
    isTouchingNearest(vec) {
      return this.silhouette.isTouchingNearest(vec);
    }
    isTouchingLinear(vec) {
      return this.silhouette.isTouchingLinear(vec);
    }
    altered() {
      for (const drawable of this.drawables) drawable.skinWasAltered();
    }
    dispose() {
      this.id = -1;
    }
  };
  var SvgSkin = class extends Skin {
    constructor(id, rasterizer) {
      super(id);
      this.kind = "svg";
      this.rasterizer = rasterizer;
      this.svg = null;
      this.viewBox = null;
      this.svgSize = [0, 0];
      this.mips = [];
      this.largestMIPScale = 0;
      this.maxTextureScale = 1;
      this.loaded = false;
      this.version = 0;
    }
    get size() {
      return [this.svgSize[0], this.svgSize[1]];
    }
    useNearest(scale, drawable) {
      if ((drawable.enabledEffects & DISTORTION_MASK) !== 0) return false;
      if (drawable.direction % 90 !== 0) return false;
      return Math.abs(scale[0]) > 99 && Math.abs(scale[0]) < 101 && Math.abs(scale[1]) > 99 && Math.abs(scale[1]) < 101;
    }
    createMIP(scale) {
      const width = Math.floor(this.svgSize[0] * scale);
      const height = Math.floor(this.svgSize[1] * scale);
      if (width <= 0 || height <= 0) return super.getTexture();
      const raster = this.takePrefetched(scale, width, height) ?? this.rasterizer.svg(this.svg, this.viewBox, scale, width, height);
      if (this.largestMIPScale < scale) {
        this.silhouette.update(width, height, raster);
        this.largestMIPScale = scale;
      }
      return PRESENT_TEXTURE;
    }
    takePrefetched(scale, width, height) {
      const raster = this.prefetched?.get(scale);
      if (!raster) return null;
      this.prefetched.delete(scale);
      return raster.length === width * height * 4 ? raster : null;
    }
    updateSilhouette(scale = [100, 100]) {
      this.getTexture(scale);
    }
    mipScaleFor(scale) {
      return mipScaleFor(scale, this.maxTextureScale);
    }
    getTexture(scale) {
      const { mipLevel, mipScale } = this.mipScaleFor(scale);
      if (this.loaded && !this.mips[mipLevel]) this.mips[mipLevel] = this.createMIP(mipScale);
      return this.mips[mipLevel] || super.getTexture();
    }
    resetMIPs() {
      this.mips.length = 0;
      this.largestMIPScale = 0;
    }
    setSVG(svgIn, rotationCenter) {
      const svg = this.rasterizer?.normalize ? this.rasterizer.normalize(svgIn) : svgIn;
      this.svg = svg;
      this.prefetched = null;
      this.loaded = false;
      const box = svgViewBox(svg) ?? { x: 0, y: 0, width: 0, height: 0 };
      this.viewBox = box;
      this.svgSize[0] = box.width;
      this.svgSize[1] = box.height;
      if (box.width === 0 || box.height === 0) {
        this.setEmptyImageData();
        return;
      }
      const maxDimension = Math.ceil(Math.max(box.width, box.height));
      for (let testScale = 2; maxDimension * testScale <= MAX_TEXTURE_DIMENSION; testScale *= 2) {
        this.maxTextureScale = testScale;
      }
      this.resetMIPs();
      const center = rotationCenter ?? this.calculateRotationCenter();
      this.rotationCenter[0] = center[0] - box.x;
      this.rotationCenter[1] = center[1] - box.y;
      this.loaded = true;
      this.altered();
    }
    restoreSilhouette(largestMIPScale) {
      if (!this.loaded || largestMIPScale <= this.largestMIPScale) return;
      this.createMIP(largestMIPScale);
    }
  };
  var BitmapSkin = class extends Skin {
    constructor(id) {
      super(id);
      this.kind = "bitmap";
      this.costumeResolution = 1;
      this.textureSize = [0, 0];
      this.texture = null;
      this.bitmap = null;
      this.version = 0;
    }
    get size() {
      return [this.textureSize[0] / this.costumeResolution, this.textureSize[1] / this.costumeResolution];
    }
    getTexture() {
      return this.texture || super.getTexture();
    }
    setBitmap(bitmap, costumeResolution, rotationCenter) {
      if (!bitmap.width || !bitmap.height) {
        this.setEmptyImageData();
        return;
      }
      this.bitmap = bitmap;
      this.version++;
      this.texture = PRESENT_TEXTURE;
      this.silhouette.update(bitmap.width, bitmap.height, bitmap.data);
      this.costumeResolution = costumeResolution || 2;
      this.textureSize = [bitmap.width, bitmap.height];
      const center = rotationCenter ?? this.calculateRotationCenter();
      this.rotationCenter[0] = center[0];
      this.rotationCenter[1] = center[1];
      this.altered();
    }
  };
  var SQRT2 = 1.4142135623730951;
  var LINE_EPSILON = 1e-3;
  var DEFAULT_PEN = { color4f: [0, 0, 1, 1], diameter: 1 };
  var PenSkin = class extends Skin {
    constructor(id, nativeSize) {
      super(id);
      this.kind = "pen";
      this.penSize = [...nativeSize];
      this.rotationCenter[0] = nativeSize[0] / 2;
      this.rotationCenter[1] = nativeSize[1] / 2;
      this.pixels = new Uint8ClampedArray(nativeSize[0] * nativeSize[1] * 4);
      this.silhouettePixels = new Uint8ClampedArray(this.pixels.length);
      this.silhouetteDirty = true;
      this.version = 0;
      this.pending = null;
      this.history = [];
    }
    markDirty(left, top, right, bottom) {
      const rect = this.pending;
      if (!rect) this.pending = { left, top, right, bottom };
      else {
        rect.left = Math.min(rect.left, left);
        rect.top = Math.min(rect.top, top);
        rect.right = Math.max(rect.right, right);
        rect.bottom = Math.max(rect.bottom, bottom);
      }
    }
    changesSince(version) {
      if (version === this.version) return null;
      const oldest = this.history[0];
      if (version < 0 || !oldest || oldest.version > version + 1) return { left: 0, top: 0, right: this.penSize[0] - 1, bottom: this.penSize[1] - 1 };
      let rect = null;
      for (const entry of this.history) {
        if (entry.version <= version) continue;
        rect = rect ? { left: Math.min(rect.left, entry.left), top: Math.min(rect.top, entry.top), right: Math.max(rect.right, entry.right), bottom: Math.max(rect.bottom, entry.bottom) } : { ...entry };
      }
      return rect;
    }
    get size() {
      return this.penSize;
    }
    useNearest(scale) {
      return Math.max(scale[0], scale[1]) >= 100;
    }
    getTexture() {
      return PRESENT_TEXTURE;
    }
    touched() {
      this.silhouetteDirty = true;
      this.version++;
      const rect = this.pending ?? { left: 0, top: 0, right: this.penSize[0] - 1, bottom: this.penSize[1] - 1 };
      this.history.push({ version: this.version, left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
      if (this.history.length > 256) this.history.shift();
      this.pending = null;
    }
    clear() {
      this.pixels.fill(0);
      this.markDirty(0, 0, this.penSize[0] - 1, this.penSize[1] - 1);
      this.touched();
    }
    drawPoint(attributes, x2, y) {
      this.drawLine(attributes, x2, y, x2, y);
    }
    drawLine(attributes, x0In, y0In, x1In, y1In) {
      const diameter = attributes.diameter || DEFAULT_PEN.diameter;
      const offset = diameter === 1 || diameter === 3 ? 0.5 : 0;
      const x0 = x0In + offset;
      const y0 = y0In + offset;
      const x1 = x1In + offset;
      const y1 = y1In + offset;
      const color = attributes.color4f || DEFAULT_PEN.color4f;
      const alpha = color[3];
      const red = color[0] * alpha;
      const green = color[1] * alpha;
      const blue = color[2] * alpha;
      const dx = x1 - x0;
      const dy = y1 - y0;
      const length2 = Math.sqrt(dx * dx + dy * dy);
      const pointDx = Math.abs(dx) < LINE_EPSILON && Math.abs(dy) < LINE_EPSILON ? LINE_EPSILON : dx;
      const nx = pointDx / Math.max(length2, LINE_EPSILON);
      const ny = dy / Math.max(length2, LINE_EPSILON);
      const reach = diameter * 0.5 + SQRT2;
      const halfWidth = this.penSize[0] / 2;
      const halfHeight = this.penSize[1] / 2;
      const columnStart = Math.max(0, Math.floor(Math.min(x0, x1) - reach + halfWidth - 0.5));
      const columnEnd = Math.min(this.penSize[0] - 1, Math.ceil(Math.max(x0, x1) + reach + halfWidth - 0.5));
      const rowStart = Math.max(0, Math.floor(halfHeight - Math.max(y0, y1) - reach - 0.5));
      const rowEnd = Math.min(this.penSize[1] - 1, Math.ceil(halfHeight - Math.min(y0, y1) + reach - 0.5));
      const thicknessBias = (diameter - 1) * 0.5;
      const pixels = this.pixels;
      let wrote = false;
      for (let row = rowStart; row <= rowEnd; row++) {
        const sy = halfHeight - row - 0.5 - y0;
        let index = (row * this.penSize[0] + columnStart) * 4;
        for (let column = columnStart; column <= columnEnd; column++, index += 4) {
          const sx = column + 0.5 - halfWidth - x0;
          const along = sx * nx + sy * ny;
          const across = sy * nx - sx * ny;
          const outside = along - Math.min(Math.max(along, 0), length2);
          const coverage = Math.min(Math.max(1 - (Math.sqrt(outside * outside + across * across) - thicknessBias), 0), 1);
          if (coverage === 0) continue;
          const sourceAlpha = alpha * coverage;
          const keep = 1 - sourceAlpha;
          pixels[index] = red * coverage * 255 + pixels[index] * keep;
          pixels[index + 1] = green * coverage * 255 + pixels[index + 1] * keep;
          pixels[index + 2] = blue * coverage * 255 + pixels[index + 2] * keep;
          pixels[index + 3] = sourceAlpha * 255 + pixels[index + 3] * keep;
          wrote = true;
        }
      }
      if (wrote) {
        this.markDirty(columnStart, rowStart, columnEnd, rowEnd);
        this.touched();
      }
    }
    updateSilhouette() {
      if (!this.silhouetteDirty) return;
      this.silhouettePixels.set(this.pixels);
      this.silhouette.update(this.penSize[0], this.penSize[1], this.silhouettePixels, true);
      this.silhouetteDirty = false;
    }
  };
  var BUBBLE = { MAX_LINE_WIDTH: 170, MIN_WIDTH: 50, STROKE_WIDTH: 4, PADDING: 10, TAIL_HEIGHT: 12, FONT_SIZE: 14, LINE_HEIGHT: 16 };
  var HELVETICA_WIDTHS = [
    278,
    278,
    355,
    556,
    556,
    889,
    667,
    191,
    333,
    333,
    389,
    584,
    278,
    333,
    278,
    278,
    556,
    556,
    556,
    556,
    556,
    556,
    556,
    556,
    556,
    556,
    278,
    278,
    584,
    584,
    584,
    556,
    1015,
    667,
    667,
    722,
    722,
    667,
    611,
    778,
    722,
    278,
    500,
    667,
    556,
    833,
    722,
    778,
    667,
    778,
    722,
    667,
    611,
    722,
    667,
    944,
    667,
    667,
    611,
    278,
    278,
    278,
    469,
    556,
    333,
    556,
    556,
    500,
    556,
    556,
    278,
    556,
    556,
    222,
    222,
    500,
    222,
    833,
    556,
    556,
    556,
    556,
    333,
    500,
    278,
    556,
    500,
    722,
    500,
    500,
    500,
    334,
    260,
    334,
    584
  ];
  var measureBubbleText = (text) => {
    let units = 0;
    for (const ch of text) {
      const code = ch.codePointAt(0);
      units += code >= 32 && code <= 126 ? HELVETICA_WIDTHS[code - 32] : 556;
    }
    return units * BUBBLE.FONT_SIZE / 1e3;
  };
  function wrapBubbleText(text) {
    const lines = [];
    for (const paragraph of String(text).split("\n")) {
      let line = "";
      for (const word of paragraph.split(/(?<=\s)/)) {
        if (measureBubbleText(line + word) <= BUBBLE.MAX_LINE_WIDTH || line === "") {
          line += word;
          while (measureBubbleText(line) > BUBBLE.MAX_LINE_WIDTH && line.length > 1) {
            let cut = line.length - 1;
            while (cut > 1 && measureBubbleText(line.slice(0, cut)) > BUBBLE.MAX_LINE_WIDTH) cut--;
            lines.push(line.slice(0, cut));
            line = line.slice(cut);
          }
        } else {
          lines.push(line);
          line = word;
        }
      }
      lines.push(line);
    }
    return lines;
  }
  var TextSkin = class extends Skin {
    constructor(id) {
      super(id);
      this.kind = "text";
      this.textSize = [0, 0];
      this.params = { type: "say", text: "", pointsLeft: false };
    }
    get size() {
      return this.textSize;
    }
    getTexture() {
      return PRESENT_TEXTURE;
    }
    setTextAndType(type, text, pointsLeft) {
      this.params = { type, text, pointsLeft };
      const lines = wrapBubbleText(text);
      const longest = lines.reduce((widest, line) => Math.max(widest, measureBubbleText(line)), 0);
      const paddedWidth = Math.max(longest, BUBBLE.MIN_WIDTH) + BUBBLE.PADDING * 2;
      const paddedHeight = BUBBLE.LINE_HEIGHT * lines.length + BUBBLE.PADDING * 2;
      this.textSize = [paddedWidth + BUBBLE.STROKE_WIDTH, paddedHeight + BUBBLE.STROKE_WIDTH + BUBBLE.TAIL_HEIGHT];
      this.altered();
    }
  };

  // src/render/display-renderer.js
  var NATIVE_WIDTH2 = 480;
  function createDisplayRenderer({ pool }) {
    const skins = /* @__PURE__ */ new Map();
    const inFlight = /* @__PURE__ */ new Set();
    let current = { scene: { background: [255, 255, 255], layers: [] }, bubbles: [] };
    const rasterKeysOf = (key, skin) => skin.kind === "svg" ? [...skin.ready.values()] : [key];
    const request = (key, skin, mipScale) => {
      if (skin.pending.has(mipScale)) return;
      const width = Math.floor(skin.size[0] * mipScale);
      const height = Math.floor(skin.size[1] * mipScale);
      if (width <= 0 || height <= 0) return;
      skin.pending.add(mipScale);
      const job = pool.rasterize({ svg: skin.svg, scale: mipScale, width, height }).then((data) => {
        skin.pending.delete(mipScale);
        if (skins.get(key) !== skin) return;
        const rasterKey = `${key}@${mipScale}`;
        pool.upload([{ key: rasterKey, width, height, data, premultiplied: false }]);
        skin.ready.set(mipScale, rasterKey);
      });
      inFlight.add(job);
      job.finally(() => inFlight.delete(job));
    };
    const bestReady = (skin, mipScale) => {
      let best = null;
      let bestDistance = Infinity;
      for (const [scale, rasterKey] of skin.ready) {
        const distance = Math.abs(Math.log2(scale / mipScale));
        if (distance < bestDistance) {
          best = rasterKey;
          bestDistance = distance;
        }
      }
      return best;
    };
    return {
      apply(update) {
        const uploads = [];
        const dropped = [];
        for (const key of update.dropped ?? []) {
          const skin = skins.get(key);
          if (!skin) continue;
          dropped.push(...rasterKeysOf(key, skin));
          skins.delete(key);
        }
        for (const entry of update.skins ?? []) {
          if (entry.patch) {
            uploads.push(entry);
          } else if (entry.kind === "svg") {
            skins.set(entry.key, { kind: "svg", svg: entry.svg, size: entry.size, maxTextureScale: entry.maxTextureScale, ready: /* @__PURE__ */ new Map(), pending: /* @__PURE__ */ new Set() });
          } else {
            skins.set(entry.key, { kind: "raster" });
            uploads.push({ key: entry.key, width: entry.width, height: entry.height, data: entry.data, premultiplied: entry.premultiplied });
          }
        }
        pool.drop(dropped);
        pool.upload(uploads);
        current = { scene: update.scene, bubbles: update.bubbles ?? [] };
      },
      get bubbles() {
        return current.bubbles;
      },
      render({ width = NATIVE_WIDTH2, height = width * 3 / 4 } = {}) {
        const displayScale = width / NATIVE_WIDTH2;
        const layers = [];
        for (const layer of current.scene.layers) {
          const skin = skins.get(layer.skin);
          if (!skin) continue;
          if (skin.kind !== "svg") {
            layers.push({ ...layer, raster: layer.skin });
            continue;
          }
          const { mipScale } = mipScaleFor([layer.scale[0] * displayScale, layer.scale[1] * displayScale], skin.maxTextureScale);
          const exact = skin.ready.get(mipScale);
          if (!exact) request(layer.skin, skin, mipScale);
          const raster = exact ?? bestReady(skin, mipScale);
          if (raster) layers.push({ ...layer, raster });
        }
        return pool.composite({ width, height, background: current.scene.background, layers });
      },
      async settle() {
        while (inFlight.size) await Promise.all([...inFlight]);
      }
    };
  }

  // src/display/stage-view.js
  var NATIVE_WIDTH3 = 480;
  var NATIVE_HEIGHT2 = 360;
  var KEY_NAMES = { " ": "space", ArrowLeft: "left arrow", ArrowRight: "right arrow", ArrowUp: "up arrow", ArrowDown: "down arrow", Enter: "enter" };
  var scratchKey = (event) => {
    if (KEY_NAMES[event.key]) return KEY_NAMES[event.key];
    return event.key.length === 1 ? event.key : null;
  };
  function drawBubble(ctx, bubble, scale) {
    const x2 = (bubble.x + NATIVE_WIDTH3 / 2) * scale;
    const y = (NATIVE_HEIGHT2 / 2 - bubble.y) * scale;
    const width = bubble.width * scale;
    const height = (bubble.height - 12) * scale;
    const radius = 16 * scale;
    ctx.save();
    ctx.translate(x2 + 2 * scale, y + 2 * scale);
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(width - 4 * scale, 0, width - 4 * scale, height, radius);
    ctx.arcTo(width - 4 * scale, height, 0, height, radius);
    ctx.arcTo(0, height, 0, 0, radius);
    ctx.arcTo(0, 0, width, 0, radius);
    ctx.closePath();
    const tailX = bubble.pointsLeft ? 24 * scale : width - 40 * scale;
    if (bubble.type === "say") {
      ctx.moveTo(tailX, height);
      ctx.lineTo(tailX + 8 * scale, height + 10 * scale);
      ctx.lineTo(tailX + 16 * scale, height);
    } else {
      ctx.moveTo(tailX + 8 * scale + 4 * scale, height + 7 * scale);
      ctx.arc(tailX + 8 * scale, height + 7 * scale, 4 * scale, 0, Math.PI * 2);
    }
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 4 * scale;
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "#575E75";
    ctx.font = `${14 * scale}px "Helvetica Neue", Helvetica, sans-serif`;
    ctx.textBaseline = "top";
    String(bubble.text).split("\n").forEach((line, i2) => ctx.fillText(line, 10 * scale, (10 + 16 * i2) * scale, width - 20 * scale));
    ctx.restore();
  }
  function createStageView({ client, pool, canvas, interactive = true, keyboardTarget = canvas }) {
    const display = createDisplayRenderer({ pool });
    const ctx = canvas.getContext("2d");
    let dirty = false;
    let rendering = false;
    let frameRequest = null;
    let lastFrame = null;
    const cleanups = [];
    const sizeCanvas = () => {
      const ratio = globalThis.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(NATIVE_WIDTH3, Math.round(rect.width * ratio));
      const height = Math.round(width * NATIVE_HEIGHT2 / NATIVE_WIDTH3);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        dirty = true;
      }
    };
    const paint = async () => {
      frameRequest = null;
      if (rendering || !dirty) return;
      rendering = true;
      dirty = false;
      try {
        sizeCanvas();
        const frame = await display.render({ width: canvas.width, height: canvas.height });
        lastFrame = frame;
        ctx.putImageData(new ImageData(frame.data, frame.width, frame.height), 0, 0);
        const scale = canvas.width / NATIVE_WIDTH3;
        for (const bubble of display.bubbles) drawBubble(ctx, bubble, scale);
      } finally {
        rendering = false;
      }
      display.settle().then(() => invalidate());
      if (dirty) invalidate();
    };
    const invalidate = () => {
      dirty = true;
      if (frameRequest === null) frameRequest = requestAnimationFrame(paint);
    };
    cleanups.push(client.on("frame", (message) => {
      display.apply(message.scene);
      invalidate();
    }));
    const toScratch = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / rect.width * NATIVE_WIDTH3 - NATIVE_WIDTH3 / 2,
        y: NATIVE_HEIGHT2 / 2 - (event.clientY - rect.top) / rect.height * NATIVE_HEIGHT2
      };
    };
    const listen = (target, type, handler, options) => {
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };
    if (interactive) {
      listen(canvas, "pointermove", (event) => client.input({ type: "mouse", ...toScratch(event) }));
      listen(canvas, "pointerdown", (event) => {
        canvas.setPointerCapture?.(event.pointerId);
        keyboardTarget.focus?.({ preventScroll: true });
        client.input({ type: "mouse", ...toScratch(event), down: true });
      });
      listen(canvas, "pointerup", (event) => client.input({ type: "mouse", ...toScratch(event), down: false }));
      listen(canvas, "wheel", (event) => {
        event.preventDefault();
        client.input({ type: "wheel", deltaY: event.deltaY });
      }, { passive: false });
      const onKey = (down) => (event) => {
        const key = scratchKey(event);
        if (!key || event.repeat) return;
        event.preventDefault();
        client.input({ type: "key", key, down });
      };
      listen(keyboardTarget, "keydown", onKey(true));
      listen(keyboardTarget, "keyup", onKey(false));
    }
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => invalidate());
    resizeObserver?.observe(canvas);
    return {
      display,
      get lastFrame() {
        return lastFrame;
      },
      invalidate,
      dispose() {
        for (const cleanup of cleanups) cleanup();
        resizeObserver?.disconnect();
      }
    };
  }

  // src/render/scene.js
  var uniformsOf = (drawable) => {
    const { u_modelMatrix: ignored, ...rest } = drawable.uniforms;
    return rest;
  };
  function sourceFor(skin) {
    if (skin instanceof SvgSkin) {
      if (!skin.loaded) return null;
      return {
        key: `s${skin.id}.${skin.version}`,
        produce: () => ({ kind: "svg", svg: skin.svg, size: skin.size, maxTextureScale: skin.maxTextureScale })
      };
    }
    if (skin instanceof BitmapSkin) {
      if (!skin.bitmap) return null;
      return {
        key: `b${skin.id}.${skin.version}`,
        produce: () => ({ kind: "raster", width: skin.bitmap.width, height: skin.bitmap.height, data: skin.bitmap.data.slice(), premultiplied: false })
      };
    }
    if (skin instanceof PenSkin) {
      return {
        key: `p${skin.id}`,
        pen: skin,
        produce: () => ({ kind: "raster", width: skin.penSize[0], height: skin.penSize[1], data: skin.pixels.slice(), premultiplied: true })
      };
    }
    return null;
  }
  function describeScene(renderer) {
    const layers = [];
    const bubbles = [];
    const sources = /* @__PURE__ */ new Map();
    for (const id of renderer.drawList) {
      const drawable = renderer.allDrawables[id];
      const skin = drawable?.skin;
      if (!drawable.visible || !skin) continue;
      if (skin instanceof TextSkin) {
        bubbles.push({ id, ...skin.params, x: drawable.position[0], y: drawable.position[1], width: skin.size[0], height: skin.size[1] });
        continue;
      }
      const source = sourceFor(skin);
      if (!source) continue;
      drawable.updateMatrix();
      const aabb = drawable.getAABB();
      sources.set(source.key, source);
      layers.push({
        id,
        skin: source.key,
        scale: drawable.scale,
        inverse: Float32Array.from(drawable.inverseMatrix),
        enabledEffects: drawable.enabledEffects,
        uniforms: uniformsOf(drawable),
        skinSize: skin.size,
        nearest: skin.useNearest(drawable.scaleVector, drawable),
        bounds: { left: aabb.left, right: aabb.right, bottom: aabb.bottom, top: aabb.top }
      });
    }
    return { scene: { background: [...renderer.backgroundColor3b], layers }, bubbles, sources };
  }
  function penPatch(pen, rect) {
    const width = rect.right - rect.left + 1;
    const height = rect.bottom - rect.top + 1;
    const data = new Uint8ClampedArray(width * height * 4);
    for (let row = 0; row < height; row++) {
      const from = ((rect.top + row) * pen.penSize[0] + rect.left) * 4;
      data.set(pen.pixels.subarray(from, from + width * 4), row * width * 4);
    }
    return { x: rect.left, y: rect.top, width, height, data };
  }
  function createSceneChannel({ keepFrames = 300 } = {}) {
    const sent = /* @__PURE__ */ new Map();
    let tick = 0;
    return {
      update({ scene, bubbles, sources }) {
        tick++;
        const skins = [];
        for (const [key, source] of sources) {
          const known = sent.get(key);
          if (source.pen) {
            if (known === void 0) {
              skins.push({ key, ...source.produce() });
            } else {
              const rect = source.pen.changesSince(known.version);
              if (rect) skins.push({ key, patch: penPatch(source.pen, rect) });
            }
            sent.set(key, { version: source.pen.version, used: tick });
          } else if (known) {
            known.used = tick;
          } else {
            skins.push({ key, ...source.produce() });
            sent.set(key, { used: tick });
          }
        }
        const dropped = [];
        for (const [key, entry] of sent) {
          if (tick - entry.used > keepFrames) {
            dropped.push(key);
            sent.delete(key);
          }
        }
        return { scene, bubbles, skins, dropped };
      },
      reset() {
        sent.clear();
      }
    };
  }

  // src/remote/debugger.js
  var LIST_PREVIEW = 8;
  var preview = (value) => Array.isArray(value) ? { length: value.length, items: value.slice(0, LIST_PREVIEW) } : value;
  var looseEquals = (a, b) => {
    if (String(a) === String(b)) return true;
    const x2 = Number(a);
    const y = Number(b);
    return String(a).trim() !== "" && String(b).trim() !== "" && !Number.isNaN(x2) && x2 === y;
  };
  var matcher = (filter) => {
    if (!filter) return () => true;
    if (filter.startsWith("/") && filter.lastIndexOf("/") > 0) {
      const cut = filter.lastIndexOf("/");
      const pattern = new RegExp(filter.slice(1, cut), filter.slice(cut + 1));
      return (name) => pattern.test(name);
    }
    const needle = filter.toLowerCase();
    return (name) => name.toLowerCase().includes(needle);
  };
  function createDebugger({ spre, vm }) {
    const runtime = vm.runtime;
    const states = /* @__PURE__ */ new Map();
    let scanHits = null;
    let stateCounter = 0;
    const refOf = (target) => spre.refOf(target);
    const nameOf = (target) => target.isStage ? "Stage" : target.sprite.name;
    const heldKeys = () => {
      const keys = /* @__PURE__ */ new Set();
      for (const hold of spre.memory.holds()) keys.add(`${hold.target}|${hold.variable}`);
      return keys;
    };
    const eachVariable = function* ({ target, kind = "any", clones = false } = {}) {
      for (const owner of runtime.targets) {
        if (!clones && !owner.isOriginal) continue;
        const ref = refOf(owner);
        if (target && ref !== target) continue;
        for (const variable of Object.values(owner.variables)) {
          if (variable.type === "broadcast_msg") continue;
          const isList = variable.type === "list";
          if (kind === "var" && isList) continue;
          if (kind === "list" && !isList) continue;
          yield { owner, ref, variable };
        }
      }
    };
    const row = ({ owner, ref, variable }, held) => ({
      target: ref,
      targetName: nameOf(owner),
      clone: !owner.isOriginal,
      id: variable.id,
      name: variable.name,
      kind: variable.type === "list" ? "list" : "var",
      cloud: Boolean(variable.isCloud),
      value: preview(variable.value),
      held: held.has(`${ref}|${variable.id}`)
    });
    const requireVariable = (target, id) => {
      const variable = spre.memory.variableOf(target, id);
      if (!variable) throw new Error(`no variable ${id} on ${target}`);
      return variable;
    };
    const scanRows = () => scanHits.map((hit) => {
      const variable = spre.memory.variableOf(hit.target, hit.variable);
      const target = spre.memory.targetOf(hit.target);
      return { target: hit.target, targetName: target ? nameOf(target) : hit.target, id: hit.variable, name: hit.name, value: variable?.value, previous: hit.value };
    });
    return {
      "targets.list"() {
        return runtime.targets.map((target) => ({
          target: refOf(target),
          name: nameOf(target),
          isStage: target.isStage,
          clone: !target.isOriginal,
          x: target.x,
          y: target.y,
          direction: target.direction,
          size: target.size,
          visible: target.visible,
          costume: target.getCostumes()[target.currentCostume]?.name ?? null
        }));
      },
      "vars.list"({ target, kind = "any", filter = "", clones = false, offset = 0, limit = 200 } = {}) {
        const accept = matcher(filter);
        const held = heldKeys();
        const rows = [];
        let total = 0;
        for (const entry of eachVariable({ target, kind, clones })) {
          if (!accept(entry.variable.name)) continue;
          if (total >= offset && rows.length < limit) rows.push(row(entry, held));
          total++;
        }
        return { total, rows };
      },
      "vars.get"(target, id, { offset = 0, limit = 1e3 } = {}) {
        const variable = requireVariable(target, id);
        if (!Array.isArray(variable.value)) return variable.value;
        return { length: variable.value.length, offset, items: variable.value.slice(offset, offset + limit) };
      },
      "vars.set"(target, id, value) {
        requireVariable(target, id);
        spre.input.send({ type: "poke", target, variable: id, value });
        return true;
      },
      "lists.edit"(target, id, op, { index, value, values } = {}) {
        requireVariable(target, id);
        spre.input.send({ type: "list", target, variable: id, op, index, value, values });
        return true;
      },
      "holds.set"(hold) {
        const variable = requireVariable(hold.target, hold.variable);
        const filled = { ...hold };
        if ((filled.mode ?? "freeze") === "freeze" && filled.value === void 0) {
          const current = filled.index === void 0 ? variable.value : variable.value[filled.index - 1];
          filled.value = Array.isArray(current) ? [...current] : current;
        }
        spre.input.send({ type: "hold", ...filled });
        return true;
      },
      "holds.release"(selection = {}) {
        spre.input.send({ type: "release", ...selection });
        return true;
      },
      "holds.list"() {
        return spre.memory.holds();
      },
      "scan.start"(value) {
        scanHits = [];
        for (const { ref, variable } of eachVariable({ kind: "var", clones: true })) {
          if (value === void 0 || looseEquals(variable.value, value)) scanHits.push({ target: ref, variable: variable.id, name: variable.name, value: variable.value });
        }
        return { count: scanHits.length };
      },
      "scan.narrow"(mode, value) {
        if (!scanHits) throw new Error("start a scan first");
        const keep = {
          equals: (now) => looseEquals(now, value),
          changed: (now, before) => !looseEquals(now, before),
          unchanged: (now, before) => looseEquals(now, before),
          increased: (now, before) => Number(now) > Number(before),
          decreased: (now, before) => Number(now) < Number(before)
        }[mode];
        if (!keep) throw new Error(`unknown scan mode ${mode}`);
        scanHits = scanHits.flatMap((hit) => {
          const variable = spre.memory.variableOf(hit.target, hit.variable);
          if (!variable || !keep(variable.value, hit.value)) return [];
          return [{ ...hit, value: variable.value }];
        });
        return { count: scanHits.length };
      },
      "scan.results"({ offset = 0, limit = 200 } = {}) {
        if (!scanHits) return { count: 0, rows: [] };
        return { count: scanHits.length, rows: scanRows().slice(offset, offset + limit) };
      },
      "scan.reset"() {
        scanHits = null;
        return true;
      },
      "states.save"(name) {
        const label = name || `state ${++stateCounter}`;
        states.delete(label);
        states.set(label, { name: label, frame: spre.frame, savedAt: Date.now(), snapshot: spre.snapshot() });
        return { name: label, frame: spre.frame };
      },
      "states.load"(name) {
        const label = name ?? [...states.keys()].at(-1);
        const state = states.get(label);
        if (!state) throw new Error(`no savestate named "${label}"`);
        spre.restore(state.snapshot);
        return { name: label, frame: spre.frame };
      },
      "states.list"() {
        return [...states.values()].map(({ name, frame, savedAt }) => ({ name, frame, savedAt }));
      },
      "states.drop"(name) {
        return states.delete(name);
      },
      "states.export"(name) {
        const state = states.get(name);
        if (!state) throw new Error(`no savestate named "${name}"`);
        return JSON.stringify(state);
      },
      "states.import"(data, name) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (!parsed?.snapshot?.spre) throw new Error("not a SPRE savestate");
        const label = name || parsed.name || `state ${++stateCounter}`;
        states.set(label, { ...parsed, name: label });
        return { name: label, frame: parsed.frame };
      },
      "input.send"(event) {
        spre.input.send(event);
        return true;
      },
      "input.schedule"(events) {
        spre.input.schedule(events);
        return events.length;
      },
      "input.log"({ last = 200 } = {}) {
        const log = spre.input.log();
        return { total: log.length, events: log.slice(-last), pending: spre.input.pending().slice(0, last) };
      },
      "spre.hash"() {
        return spre.hash();
      },
      "spre.snapshot"() {
        return JSON.stringify(spre.snapshot());
      },
      "spre.movie"() {
        return spre.movie();
      },
      "project.flag"() {
        spre.greenFlag();
        return true;
      },
      "project.stop"() {
        spre.stopAll();
        return true;
      },
      "project.turbo"(on = true) {
        spre.turbo(on);
        return true;
      }
    };
  }

  // src/remote/timeline.js
  function createTimeline(spre, { every = 30, maxKeyframes = 240, seriesFrames = 3600 } = {}) {
    let keyframes = [];
    let recording = false;
    let error = null;
    const watched = /* @__PURE__ */ new Map();
    const thin = () => {
      if (keyframes.length <= maxKeyframes) return;
      const half = Math.floor(keyframes.length / 2);
      keyframes = [...keyframes.slice(0, half).filter((_, i2) => i2 % 2 === 0), ...keyframes.slice(half)];
    };
    const capture = () => {
      try {
        keyframes.push({ frame: spre.frame, snapshot: spre.snapshot() });
        thin();
      } catch (problem) {
        recording = false;
        error = problem.message;
      }
    };
    const sample2 = () => {
      for (const entry of watched.values()) {
        const variable = spre.memory.variableOf(entry.target, entry.variable);
        const value = variable ? Array.isArray(variable.value) ? variable.value.length : variable.value : null;
        entry.values.push([spre.frame, value]);
        if (entry.values.length > seriesFrames) entry.values.splice(0, entry.values.length - seriesFrames);
      }
    };
    const keyframeAtOrBefore = (frame) => {
      let best = null;
      for (const keyframe of keyframes) {
        if (keyframe.frame <= frame && (!best || keyframe.frame > best.frame)) best = keyframe;
      }
      return best;
    };
    return {
      afterFrame() {
        if (!recording) return;
        if (keyframes.length === 0 || spre.frame - keyframes[keyframes.length - 1].frame >= every) capture();
        sample2();
      },
      start(options = {}) {
        if (options.every) every = options.every;
        recording = true;
        error = null;
        if (!keyframes.some((keyframe) => keyframe.frame === spre.frame)) capture();
        return this.info();
      },
      stop() {
        recording = false;
        return this.info();
      },
      clear() {
        keyframes = [];
        for (const entry of watched.values()) entry.values.length = 0;
        return this.info();
      },
      info() {
        const log = spre.input.log();
        const pending = spre.input.pending();
        const lastEvent = Math.max(log.at(-1)?.frame ?? 0, pending.at(-1)?.frame ?? 0);
        return {
          recording,
          error,
          every,
          frame: spre.frame,
          start: keyframes[0]?.frame ?? null,
          end: Math.max(spre.frame, lastEvent, keyframes.at(-1)?.frame ?? 0),
          keyframes: keyframes.map((keyframe) => keyframe.frame)
        };
      },
      seek(target) {
        const keyframe = keyframeAtOrBefore(target);
        if (!keyframe) throw new Error(`no keyframe at or before frame ${target}`);
        const replay = [...spre.input.log(), ...spre.input.pending()].filter((event) => event.frame >= keyframe.frame);
        spre.restore(keyframe.snapshot);
        spre.input.clear();
        spre.input.schedule(replay);
        if (target > spre.frame) spre.step(target - spre.frame);
        return this.info();
      },
      cut() {
        const keep = spre.input.pending().filter((event) => event.frame < spre.frame);
        spre.input.clear();
        spre.input.schedule(keep);
        keyframes = keyframes.filter((keyframe) => keyframe.frame <= spre.frame);
        return this.info();
      },
      watch(target, variable) {
        const key = `${target}|${variable}`;
        if (!watched.has(key)) watched.set(key, { target, variable, values: [] });
        return key;
      },
      unwatch(target, variable) {
        watched.delete(`${target}|${variable}`);
      },
      series(target, variable) {
        return watched.get(`${target}|${variable}`)?.values.map(([frame, value]) => ({ frame, value })) ?? [];
      }
    };
  }

  // src/remote/backend.js
  var PROTOCOL_VERSION = 1;
  var defaultTiming = {
    now: () => performance.now(),
    later: (fn, ms) => setTimeout(fn, ms),
    cancel: (handle) => clearTimeout(handle)
  };
  var MAX_CATCH_UP_FRAMES = 8;
  var TURBO_SLICE_MS = 12;
  var STATUS_INTERVAL_MS = 100;
  function createBackend({ spre, vm, name = "project", timing = defaultTiming, timeline: timelineOptions } = {}) {
    const timeline = createTimeline(spre, timelineOptions);
    const methods = createDebugger({ spre, vm });
    const sessions = /* @__PURE__ */ new Set();
    let running = false;
    let speed = 1;
    let anchorTime = 0;
    let anchorFrame = 0;
    let timer = null;
    let lastStatusAt = -Infinity;
    let version = 0;
    const touched = () => {
      version++;
    };
    const fps = () => 1e3 / spre.clock.frameMs;
    const status = () => ({
      ...spre.status(),
      running,
      speed,
      fps: fps(),
      holds: spre.memory.holds().length,
      timeline: timeline.info()
    });
    const sendTo = (session, message) => {
      if (!session.closed) session.port.send(message);
    };
    const broadcast = ({ force = false } = {}) => {
      const now = timing.now();
      const statusDue = force || now - lastStatusAt >= STATUS_INTERVAL_MS;
      if (statusDue) lastStatusAt = now;
      let described = null;
      let current = null;
      for (const session of sessions) {
        if (session.scene && !session.awaitingAck && session.sentVersion !== version) {
          described ??= describeScene(vm.runtime.renderer);
          current ??= status();
          session.awaitingAck = true;
          session.sentVersion = version;
          sendTo(session, { type: "frame", status: current, scene: session.channel.update(described) });
        } else if (statusDue && session.status) {
          current ??= status();
          sendTo(session, { type: "status", status: current });
        }
        if (session.watching.size) {
          const changes = [];
          for (const [key, watch] of session.watching) {
            const variable = spre.memory.variableOf(watch.target, watch.variable);
            const value = variable ? variable.value : void 0;
            const shown = Array.isArray(value) ? value.length : value;
            if (shown === watch.last) continue;
            watch.last = shown;
            changes.push({ key, target: watch.target, variable: watch.variable, value: Array.isArray(value) ? { length: value.length } : value });
          }
          if (changes.length) sendTo(session, { type: "event", name: "watch", data: changes });
        }
      }
    };
    const runFrame = () => {
      touched();
      spre.step(1);
      timeline.afterFrame();
    };
    const schedule = () => {
      if (timer !== null || !running) return;
      const delay = Number.isFinite(speed) ? Math.max(1, Math.min(spre.clock.frameMs / speed, 16)) : 0;
      timer = timing.later(tick, delay);
    };
    const reanchor = () => {
      anchorTime = timing.now();
      anchorFrame = spre.frame;
    };
    const tick = () => {
      timer = null;
      if (!running) return;
      const started = timing.now();
      try {
        if (!Number.isFinite(speed)) {
          do
            runFrame();
          while (timing.now() - started < TURBO_SLICE_MS);
        } else {
          const due = anchorFrame + Math.floor((started - anchorTime) * fps() * speed / 1e3);
          let ran = 0;
          while (spre.frame < due && ran < MAX_CATCH_UP_FRAMES) {
            runFrame();
            ran++;
          }
          if (spre.frame < due) reanchor();
        }
      } catch (error) {
        running = false;
        for (const session of sessions) sendTo(session, { type: "event", name: "error", data: error.message });
      }
      broadcast();
      schedule();
    };
    const time = {
      "time.status": () => status(),
      "time.pause"() {
        running = false;
        if (timer !== null) timing.cancel(timer);
        timer = null;
        broadcast({ force: true });
        return status();
      },
      "time.resume"() {
        if (!running) {
          running = true;
          reanchor();
          schedule();
        }
        return status();
      },
      "time.step"(frames = 1) {
        for (let i2 = 0; i2 < frames; i2++) runFrame();
        reanchor();
        broadcast({ force: true });
        return status();
      },
      "time.speed"(value) {
        if (value !== void 0) {
          const next = Number(value);
          if (!(next > 0)) throw new RangeError("speed must be above 0 (Infinity runs flat out)");
          speed = next;
          reanchor();
        }
        return status();
      },
      "timeline.start": (options) => timeline.start(options),
      "timeline.stop": () => timeline.stop(),
      "timeline.clear": () => timeline.clear(),
      "timeline.info": () => timeline.info(),
      "timeline.seek"(frame) {
        touched();
        const info = timeline.seek(frame);
        reanchor();
        broadcast({ force: true });
        return info;
      },
      "timeline.cut": () => timeline.cut(),
      "timeline.series": (target, variable) => timeline.series(target, variable)
    };
    const handlers = { ...methods, ...time };
    const MUTATING = ["states.load", "vars.set", "lists.edit", "holds.", "project.", "input.send", "input.schedule", "timeline.cut"];
    const afterCall = (method) => {
      if (!MUTATING.some((prefix) => method.startsWith(prefix))) return;
      touched();
      if (!running) broadcast({ force: true });
    };
    const connect = (port) => {
      const session = {
        port,
        scene: false,
        status: false,
        awaitingAck: false,
        sentVersion: -1,
        closed: false,
        channel: createSceneChannel(),
        watching: /* @__PURE__ */ new Map()
      };
      sessions.add(session);
      port.onClose(() => {
        session.closed = true;
        sessions.delete(session);
      });
      port.onMessage(async (message) => {
        switch (message.type) {
          case "hello":
            session.scene = Boolean(message.scene);
            session.status = message.status !== false;
            session.channel.reset();
            session.awaitingAck = false;
            session.sentVersion = -1;
            sendTo(session, { type: "welcome", protocol: PROTOCOL_VERSION, name, status: status(), methods: Object.keys(handlers).concat(["watch.set"]) });
            broadcast({ force: true });
            break;
          case "ack":
            session.awaitingAck = false;
            if (!running) broadcast();
            break;
          case "input":
            spre.input.send(message.event);
            touched();
            if (!running) broadcast({ force: true });
            break;
          case "call": {
            try {
              let value;
              if (message.method === "watch.set") {
                session.watching = new Map((message.args[0] ?? []).map((w) => [`${w.target}|${w.variable}`, { ...w, last: /* @__PURE__ */ Symbol("unseen") }]));
                value = session.watching.size;
              } else {
                const handler = handlers[message.method];
                if (!handler) throw new Error(`unknown method ${message.method}`);
                value = await handler(...message.args ?? []);
              }
              sendTo(session, { type: "result", id: message.id, value });
              afterCall(message.method);
            } catch (error) {
              sendTo(session, { type: "error", id: message.id, message: error.message });
            }
            break;
          }
        }
      });
      return session;
    };
    return {
      connect,
      status,
      call: (method, ...args) => handlers[method](...args),
      get running() {
        return running;
      },
      start() {
        return time["time.resume"]();
      },
      stop() {
        return time["time.pause"]();
      },
      timeline
    };
  }

  // src/remote/client.js
  function connectClient(port, { scene = false, status = true } = {}) {
    const pending = /* @__PURE__ */ new Map();
    const listeners = /* @__PURE__ */ new Map();
    let nextId = 1;
    let welcomed;
    const ready = new Promise((resolve) => {
      welcomed = resolve;
    });
    const emit = (name, data) => {
      for (const listener of listeners.get(name) ?? []) listener(data);
    };
    port.onMessage(async (message) => {
      switch (message.type) {
        case "welcome":
          if (message.protocol !== PROTOCOL_VERSION) emit("error", `backend speaks protocol ${message.protocol}, display speaks ${PROTOCOL_VERSION}`);
          welcomed(message);
          emit("status", message.status);
          break;
        case "result":
        case "error": {
          const call = pending.get(message.id);
          if (!call) return;
          pending.delete(message.id);
          if (message.type === "result") call.resolve(message.value);
          else call.reject(new Error(message.message));
          break;
        }
        case "frame": {
          emit("status", message.status);
          const handlers = listeners.get("frame") ?? /* @__PURE__ */ new Set();
          try {
            await Promise.all([...handlers].map((handler) => handler(message)));
          } finally {
            port.send({ type: "ack" });
          }
          break;
        }
        case "status":
          emit("status", message.status);
          break;
        case "event":
          emit(message.name, message.data);
          break;
      }
    });
    port.onClose(() => {
      for (const call of pending.values()) call.reject(new Error("connection closed"));
      pending.clear();
      emit("close");
    });
    port.send({ type: "hello", protocol: PROTOCOL_VERSION, scene, status });
    return {
      ready,
      call(method, ...args) {
        const id = nextId++;
        return new Promise((resolve, reject) => {
          pending.set(id, { resolve, reject });
          port.send({ type: "call", id, method, args });
        });
      },
      input(event) {
        port.send({ type: "input", event });
      },
      on(name, listener) {
        if (!listeners.has(name)) listeners.set(name, /* @__PURE__ */ new Set());
        listeners.get(name).add(listener);
        return () => listeners.get(name).delete(listener);
      },
      close() {
        port.close();
      }
    };
  }

  // src/remote/transport.js
  var createEndpoint = () => {
    const messageHandlers = /* @__PURE__ */ new Set();
    const closeHandlers = /* @__PURE__ */ new Set();
    let closed = false;
    return {
      handlers: messageHandlers,
      deliver(message) {
        for (const handler of messageHandlers) handler(message);
      },
      shut() {
        if (closed) return;
        closed = true;
        for (const handler of closeHandlers) handler();
      },
      get closed() {
        return closed;
      },
      onMessage(handler) {
        messageHandlers.add(handler);
        return () => messageHandlers.delete(handler);
      },
      onClose(handler) {
        closeHandlers.add(handler);
        return () => closeHandlers.delete(handler);
      }
    };
  };
  function createLoopback() {
    const a = createEndpoint();
    const b = createEndpoint();
    const link = (from, to) => ({
      send(message) {
        if (from.closed) return;
        queueMicrotask(() => to.deliver(message));
      },
      onMessage: from.onMessage,
      onClose: from.onClose,
      close() {
        from.shut();
        to.shut();
      },
      get bufferedAmount() {
        return 0;
      }
    });
    return [link(a, b), link(b, a)];
  }

  // src/browser/assets.js
  var CDN = {
    wasm: "https://cdn.jsdelivr.net/npm/@resvg/resvg-wasm@2.6.2/index_bg.wasm",
    font: (name) => `https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/${name}`
  };
  var RESOURCE_NAMES = ["resvg", ...FONT_FILES.map((_, i2) => `font${i2}`)];
  var RESOURCE_URLS = [CDN.wasm, ...FONT_FILES.map(CDN.font)];
  var decodeDataUrl = (url) => {
    const comma = url.indexOf(",");
    const binary = atob(url.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let i2 = 0; i2 < binary.length; i2++) bytes[i2] = binary.charCodeAt(i2);
    return bytes;
  };
  var fromResource = async (name) => {
    const getUrl = globalThis.GM_getResourceURL ?? globalThis.GM?.getResourceUrl;
    if (typeof getUrl !== "function") return null;
    const url = await getUrl(name);
    if (!url) return null;
    if (url.startsWith("data:")) return decodeDataUrl(url);
    return new Uint8Array(await (await fetch(url)).arrayBuffer());
  };
  var fromNetwork = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());
  async function loadPageAssets() {
    const bytes = await Promise.all(RESOURCE_NAMES.map(async (name, i2) => await fromResource(name).catch(() => null) ?? fromNetwork(RESOURCE_URLS[i2])));
    const [wasm2, ...fonts] = bytes;
    return { wasm: wasm2, fonts };
  }

  // src/clock.js
  var MS_PER_MINUTE = 6e4;
  var toEpochMs = (epoch) => {
    if (epoch instanceof Date) return epoch.getTime();
    if (typeof epoch === "string") {
      const ms = Date.parse(epoch);
      if (Number.isNaN(ms)) throw new RangeError(`unparseable epoch "${epoch}"`);
      return ms;
    }
    if (typeof epoch !== "number" || !Number.isFinite(epoch)) throw new RangeError(`bad epoch ${epoch}`);
    return epoch;
  };
  function createClock({ epoch = "2025-01-01T00:00:00Z", fps = 30, opCostMs = 1e-3, utcOffsetMinutes = 0 } = {}) {
    const state = {
      epoch: toEpochMs(epoch),
      frameMs: 1e3 / fps,
      opCostMs,
      utcOffsetMinutes,
      frameStart: 0,
      nextFrameStart: 0
    };
    const work = { ops: 0 };
    const elapsed = () => state.frameStart + work.ops * state.opCostMs;
    const now = () => state.epoch + elapsed();
    return {
      now,
      elapsed,
      frameNow: () => state.epoch + state.frameStart,
      work,
      charge(ops = 1) {
        work.ops += ops;
      },
      get ops() {
        return work.ops;
      },
      get frameMs() {
        return state.frameMs;
      },
      get utcOffsetMinutes() {
        return state.utcOffsetMinutes;
      },
      beginFrame() {
        state.frameStart = state.nextFrameStart;
        work.ops = 0;
      },
      endFrame() {
        state.nextFrameStart = state.frameStart + Math.max(state.frameMs, work.ops * state.opCostMs);
      },
      localParts(ms = now()) {
        const shifted = new Date(Math.trunc(ms) + state.utcOffsetMinutes * MS_PER_MINUTE);
        return {
          year: shifted.getUTCFullYear(),
          month: shifted.getUTCMonth() + 1,
          date: shifted.getUTCDate(),
          dayofweek: shifted.getUTCDay() + 1,
          hour: shifted.getUTCHours(),
          minute: shifted.getUTCMinutes(),
          second: shifted.getUTCSeconds()
        };
      },
      configure({ fps: fps2, opCostMs: opCostMs2, utcOffsetMinutes: utcOffsetMinutes2 } = {}) {
        if (fps2 !== void 0) state.frameMs = 1e3 / fps2;
        if (opCostMs2 !== void 0) state.opCostMs = opCostMs2;
        if (utcOffsetMinutes2 !== void 0) state.utcOffsetMinutes = utcOffsetMinutes2;
      },
      save: () => ({ ...state, ops: work.ops }),
      load({ ops, ...saved }) {
        Object.assign(state, saved);
        work.ops = ops;
      }
    };
  }
  function makeVirtualDate(clock, RealDate = Date) {
    function VirtualDate(...args) {
      if (!new.target) return new RealDate(clock.now()).toString();
      return Reflect.construct(RealDate, args.length ? args : [clock.now()], new.target);
    }
    VirtualDate.prototype = RealDate.prototype;
    VirtualDate.now = () => clock.now();
    VirtualDate.UTC = RealDate.UTC;
    VirtualDate.parse = RealDate.parse;
    return VirtualDate;
  }

  // src/encode.js
  var TAG = "$spre";
  var SnapshotError = class extends Error {
    constructor(message, path) {
      super(path ? `${message} at ${path}` : message);
      this.name = "SnapshotError";
      this.path = path;
    }
  };
  var isPlainObject = (value) => {
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  };
  var isPlainItem = (item) => typeof item === "string" || typeof item === "boolean" || item === null || typeof item === "number" && Number.isFinite(item) && !Object.is(item, -0);
  var isPlainList = (list) => {
    for (let i2 = 0; i2 < list.length; i2++) if (!isPlainItem(list[i2])) return false;
    return true;
  };
  function encodeValue(value, refs = {}, path = "$") {
    if (value === void 0) return { [TAG]: "undefined" };
    if (value === null || typeof value === "string" || typeof value === "boolean") return value;
    if (typeof value === "number") {
      if (Number.isNaN(value)) return { [TAG]: "NaN" };
      if (value === Infinity) return { [TAG]: "Infinity" };
      if (value === -Infinity) return { [TAG]: "-Infinity" };
      if (Object.is(value, -0)) return { [TAG]: "-0" };
      return value;
    }
    if (typeof value === "bigint") return { [TAG]: "bigint", v: String(value) };
    if (typeof value !== "object") throw new SnapshotError(`cannot encode a ${typeof value}`, path);
    if (Array.isArray(value)) {
      if (isPlainList(value)) return value.slice();
      return value.map((item, i2) => encodeValue(item, refs, `${path}[${i2}]`));
    }
    const special = refs.encode?.(value, path);
    if (special !== void 0) return { [TAG]: special.kind, ...special.data };
    if (!isPlainObject(value)) {
      throw new SnapshotError(`cannot encode an instance of ${value.constructor?.name ?? "an unknown class"}`, path);
    }
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = encodeValue(item, refs, `${path}.${key}`);
    if (Object.hasOwn(value, TAG)) return { [TAG]: "object", v: out };
    return out;
  }
  function decodeValue(value, refs = {}, path = "$") {
    if (value === null || typeof value !== "object") return value;
    if (Array.isArray(value)) {
      if (isPlainList(value)) return value.slice();
      return value.map((item, i2) => decodeValue(item, refs, `${path}[${i2}]`));
    }
    if (Object.hasOwn(value, TAG)) {
      switch (value[TAG]) {
        case "undefined":
          return void 0;
        case "NaN":
          return NaN;
        case "Infinity":
          return Infinity;
        case "-Infinity":
          return -Infinity;
        case "-0":
          return -0;
        case "bigint":
          return BigInt(value.v);
        case "object": {
          const out2 = {};
          for (const [key, item] of Object.entries(value.v)) out2[key] = decodeValue(item, refs, `${path}.${key}`);
          return out2;
        }
        default: {
          const decoded = refs.decode?.(value[TAG], value, path);
          if (decoded === void 0) throw new SnapshotError(`unknown tag "${value[TAG]}"`, path);
          return decoded.value;
        }
      }
    }
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = decodeValue(item, refs, `${path}.${key}`);
    return out;
  }
  var floatView = new Float64Array(1);
  var wordView = new Uint32Array(floatView.buffer);
  function createHasher() {
    let h1 = 3735928559;
    let h2 = 1103547991;
    const word = (n) => {
      h1 = Math.imul(h1 ^ n, 2654435761);
      h2 = Math.imul(h2 ^ n, 1597334677);
    };
    const text = (value) => {
      word(value.length);
      for (let i2 = 0; i2 < value.length; i2++) word(value.charCodeAt(i2));
    };
    const visit = (value) => {
      if (value === null) return word(1);
      switch (typeof value) {
        case "undefined":
          return word(2);
        case "boolean":
          return word(value ? 3 : 4);
        case "number":
          floatView[0] = value;
          word(5);
          word(wordView[0]);
          return word(wordView[1]);
        case "string":
          word(6);
          return text(value);
        default:
          break;
      }
      if (Array.isArray(value)) {
        word(7);
        word(value.length);
        for (let i2 = 0; i2 < value.length; i2++) visit(value[i2]);
        return void 0;
      }
      const keys = Object.keys(value).filter((key) => value[key] !== void 0).sort();
      word(8);
      word(keys.length);
      for (const key of keys) {
        text(key);
        visit(value[key]);
      }
      return void 0;
    };
    return {
      add: visit,
      digest() {
        let a = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
        const b = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(a ^ a >>> 13, 3266489909);
        a >>>= 0;
        return (b >>> 0).toString(16).padStart(8, "0") + a.toString(16).padStart(8, "0");
      }
    };
  }
  function hashValue(value) {
    const hasher = createHasher();
    hasher.add(value);
    return hasher.digest();
  }

  // src/extensions.js
  var TARGET_MOVED = "TARGET_MOVED";
  var PEN_STATE = "Scratch.pen";
  var isPenMoveListener = (fn) => fn.name === "bound _onTargetMoved";
  function ensurePenLayer(runtime) {
    const clear = runtime._primitives.pen_clear;
    const renderer = runtime.renderer;
    if (!clear || !renderer?.allSkins) return false;
    if (renderer.allSkins.some((skin) => skin?.kind === "pen")) return false;
    clear({}, null);
    return true;
  }
  function reattachPenListeners(runtime) {
    const cloneHooks = runtime.listeners("targetWasCreated").filter((fn) => fn.name === "bound _onTargetCreated");
    for (const target of runtime.targets) {
      for (const listener of target.listeners(TARGET_MOVED).filter(isPenMoveListener)) target.removeListener(TARGET_MOVED, listener);
    }
    if (!cloneHooks.length) return;
    for (const target of runtime.targets) {
      const penState = target.getCustomState(PEN_STATE);
      if (!penState?.penDown) continue;
      const source = { getCustomState: (key) => key === PEN_STATE ? { penDown: true } : void 0 };
      for (const hook of cloneHooks) hook(target, source);
      target._customState[PEN_STATE] = penState;
    }
  }

  // src/input.js
  var STAGE_W = 480;
  var STAGE_H = 360;
  var KEY_ALIASES = {
    space: " ",
    "left arrow": "ArrowLeft",
    "right arrow": "ArrowRight",
    "up arrow": "ArrowUp",
    "down arrow": "ArrowDown",
    enter: "Enter"
  };
  var EVENT_TYPES = ["key", "mouse", "wheel", "answer", "loudness", "username", "flag", "stop", "turbo", "cloud", "poke", "list", "hold", "release"];
  var clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  var validate = (event) => {
    if (!event || !EVENT_TYPES.includes(event.type)) {
      throw new TypeError(`unknown input event ${JSON.stringify(event)}; expected one of ${EVENT_TYPES.join(", ")}`);
    }
    return event;
  };
  function createInput(ctx, { answers = null } = {}) {
    const { runtime } = ctx;
    let schedule = [];
    let head = 0;
    let log = [];
    let seq = 0;
    let loudness = -1;
    let answerSource = answers;
    const targetNamed = (name) => {
      const target = name === "stage" || name === "_stage_" ? runtime.getTargetForStage() : runtime.getSpriteTargetByName(name);
      if (!target) throw new Error(`no sprite named "${name}"`);
      return target;
    };
    const applyMouse = ({ x: x2, y, down, target, wasDragged = false }) => {
      const mouse = runtime.ioDevices.mouse;
      if (down && target !== void 0 && x2 === void 0 && y === void 0) {
        const picked2 = targetNamed(target);
        if (!picked2.isStage) ({ x: x2, y } = picked2);
        else if (mouse._clientX === void 0) x2 = y = 0;
      }
      if (x2 !== void 0) {
        mouse._clientX = x2 + STAGE_W / 2;
        mouse._scratchX = Math.round(clamp(x2, -STAGE_W / 2, STAGE_W / 2));
      }
      if (y !== void 0) {
        mouse._clientY = STAGE_H / 2 - y;
        mouse._scratchY = Math.round(clamp(y, -STAGE_H / 2, STAGE_H / 2));
      }
      if (down === void 0) return;
      const wasDown = mouse._isDown;
      mouse._isDown = Boolean(down);
      if (wasDown === mouse._isDown || wasDragged) return;
      const cx = mouse._clientX;
      const cy = mouse._clientY;
      if (!(cx > 0 && cx < STAGE_W && cy > 0 && cy < STAGE_H)) return;
      const picked = target !== void 0 ? targetNamed(target) : mouse._pickTarget(cx, cy);
      const pressed = !wasDown && mouse._isDown;
      if (picked.draggable ? !pressed : pressed) mouse._activateClickHats(picked);
    };
    const apply = (event) => {
      switch (event.type) {
        case "key":
          runtime.ioDevices.keyboard.postData({ key: KEY_ALIASES[event.key] ?? event.key, isDown: event.down !== false });
          break;
        case "mouse":
          applyMouse(event);
          break;
        case "wheel":
          runtime.ioDevices.mouseWheel.postData({ deltaY: event.deltaY });
          break;
        case "answer":
          ctx.waits.submit(String(event.text));
          break;
        case "loudness":
          loudness = Number(event.value);
          break;
        case "username":
          runtime.ioDevices.userData.postData({ username: String(event.name) });
          break;
        case "flag":
          runtime.greenFlag();
          break;
        case "stop":
          runtime.stopAll();
          break;
        case "turbo":
          runtime.turboMode = Boolean(event.on);
          break;
        case "cloud":
          runtime.ioDevices.cloud.postData({ varUpdate: { name: event.name, value: event.value } });
          break;
        case "poke":
        case "list":
        case "hold":
        case "release":
          ctx.memory.apply(event);
          break;
      }
    };
    const record = (event) => {
      log.push({ frame: ctx.frame, ...event });
      apply(event);
    };
    const offerAnswer = () => {
      const question = ctx.waits.question;
      if (!question || answerSource === null) return;
      let text;
      if (typeof answerSource === "function") {
        text = answerSource({ question: question.text, sprite: question.target.isStage ? "stage" : question.target.getName(), frame: ctx.frame });
      } else if (answerSource.length) {
        text = answerSource.shift();
      }
      if (text !== void 0) record({ type: "answer", text: String(text) });
    };
    const insertionPoint = (frame) => {
      let lo = head;
      let hi = schedule.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (schedule[mid].frame <= frame) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    };
    const at = (frame, event) => {
      if (!Number.isInteger(frame) || frame < 0) throw new RangeError(`bad frame ${frame}`);
      const item = { frame, seq: seq++, event: { ...validate(event) } };
      const index = insertionPoint(frame);
      if (index === schedule.length) schedule.push(item);
      else schedule.splice(index, 0, item);
    };
    const pendingItems = () => schedule.slice(head);
    const soon = (event) => at(ctx.frame, event);
    return {
      get loudness() {
        return loudness;
      },
      applyFrame(frame) {
        while (head < schedule.length && schedule[head].frame <= frame) record(schedule[head++].event);
        if (head > 1024 && head * 2 > schedule.length) {
          schedule = schedule.slice(head);
          head = 0;
        }
        offerAnswer();
      },
      api: {
        at,
        send: soon,
        schedule(events) {
          for (const { frame, ...event } of events) at(frame, event);
        },
        key: (key, down = true) => soon({ type: "key", key, down }),
        tap(key, frames = 1) {
          at(ctx.frame, { type: "key", key, down: true });
          at(ctx.frame + frames, { type: "key", key, down: false });
        },
        mouse: ({ x: x2, y, down, target } = {}) => soon({ type: "mouse", x: x2, y, down, target }),
        click(target, { x: x2, y, frames = 1 } = {}) {
          at(ctx.frame, { type: "mouse", x: x2, y, down: true, target });
          at(ctx.frame + frames, { type: "mouse", down: false, target });
        },
        wheel: (deltaY) => soon({ type: "wheel", deltaY }),
        answer: (text) => soon({ type: "answer", text }),
        setLoudness: (value) => soon({ type: "loudness", value }),
        username: (name) => soon({ type: "username", name }),
        cloud: (name, value) => soon({ type: "cloud", name, value }),
        answers(source) {
          answerSource = typeof source === "function" ? source : source ? [...source] : null;
        },
        pending: () => pendingItems().map(({ frame, event }) => ({ frame, ...event })),
        clear() {
          schedule = [];
          head = 0;
        },
        log: () => log.map((entry) => ({ ...entry })),
        state() {
          const mouse = runtime.ioDevices.mouse;
          return {
            keys: [...runtime.ioDevices.keyboard._keysPressed],
            mouse: { x: mouse._scratchX ?? 0, y: mouse._scratchY ?? 0, down: mouse._isDown },
            loudness,
            username: runtime.ioDevices.userData._username,
            question: ctx.waits.question?.text ?? null
          };
        }
      },
      save() {
        const mouse = runtime.ioDevices.mouse;
        return {
          keys: [...runtime.ioDevices.keyboard._keysPressed],
          mouse: { clientX: mouse._clientX, clientY: mouse._clientY, x: mouse._scratchX, y: mouse._scratchY, down: mouse._isDown },
          username: runtime.ioDevices.userData._username,
          loudness,
          seq,
          schedule: pendingItems().map((item) => ({ ...item, event: { ...item.event } }))
        };
      },
      load(saved) {
        runtime.ioDevices.keyboard._keysPressed = [...saved.keys];
        const mouse = runtime.ioDevices.mouse;
        mouse._clientX = saved.mouse.clientX;
        mouse._clientY = saved.mouse.clientY;
        mouse._scratchX = saved.mouse.x;
        mouse._scratchY = saved.mouse.y;
        mouse._isDown = saved.mouse.down;
        runtime.ioDevices.userData._username = saved.username;
        loudness = saved.loudness;
        seq = saved.seq;
        schedule = saved.schedule.map((item) => ({ ...item, event: { ...item.event } }));
        head = 0;
        log = log.filter((entry) => entry.frame < ctx.frame);
      }
    };
  }

  // src/memory.js
  var holdKey = ({ target, variable, index }) => `${target}|${variable}|${index ?? ""}`;
  var isIntLike = (value) => typeof value === "number" ? Number.isInteger(value) : !String(value).includes(".");
  function createMemory(ctx) {
    const { runtime } = ctx;
    const holds = /* @__PURE__ */ new Map();
    const targetOf = (ref) => {
      if (ref === "stage") return runtime.getTargetForStage();
      if (ref.startsWith("sprite:")) return runtime.targets.find((t) => t.isOriginal && !t.isStage && t.sprite.name === ref.slice(7));
      if (ref.startsWith("clone:")) return runtime.targets.find((t) => !t.isOriginal && t.id === ref.slice(6));
      return void 0;
    };
    const variableOf = (ref, id) => targetOf(ref)?.variables[id];
    const requireVariable = (ref, id) => {
      const variable = variableOf(ref, id);
      if (!variable) throw new Error(`no variable ${id} on ${ref}`);
      return variable;
    };
    const randomBetween = (low, high) => {
      const from = Number(low) || 0;
      const to = Number(high) || 0;
      const lo = Math.min(from, to);
      const hi = Math.max(from, to);
      const draw = ctx.rng.next("debugger");
      if (isIntLike(low) && isIntLike(high)) return lo + Math.floor(draw * (hi + 1 - lo));
      return draw * (hi - lo) + lo;
    };
    const applyHold = (hold) => {
      const variable = variableOf(hold.target, hold.variable);
      if (!variable) return;
      const value = hold.mode === "random" ? randomBetween(hold.low, hold.high) : hold.mode === "blank" ? "" : hold.value;
      if (variable.type === "list") {
        if (hold.index === void 0) {
          if (hold.mode === "blank") variable.value = [];
          else if (Array.isArray(hold.value)) variable.value = [...hold.value];
          return;
        }
        if (hold.index >= 1 && hold.index <= variable.value.length) variable.value[hold.index - 1] = value;
        return;
      }
      variable.value = value;
    };
    const editList = (variable, { op, index, value, values }) => {
      const list = variable.value;
      switch (op) {
        case "push":
          list.push(value);
          break;
        case "insert":
          list.splice(Math.max(0, index - 1), 0, value);
          break;
        case "set":
          if (index >= 1 && index <= list.length) list[index - 1] = value;
          break;
        case "remove":
          if (index >= 1 && index <= list.length) list.splice(index - 1, 1);
          break;
        case "clear":
          list.length = 0;
          break;
        case "wipe":
          list.fill("");
          break;
        case "replace":
          variable.value = [...values];
          break;
        default:
          throw new Error(`unknown list operation ${op}`);
      }
    };
    return {
      targetOf,
      variableOf,
      apply(event) {
        switch (event.type) {
          case "poke":
            requireVariable(event.target, event.variable).value = event.value;
            break;
          case "list":
            editList(requireVariable(event.target, event.variable), event);
            break;
          case "hold": {
            const hold = { target: event.target, variable: event.variable, index: event.index, mode: event.mode ?? "freeze", value: event.value, low: event.low, high: event.high };
            holds.delete(holdKey(hold));
            holds.set(holdKey(hold), hold);
            applyHold(hold);
            break;
          }
          case "release":
            if (event.target === void 0) holds.clear();
            else {
              for (const [key, hold] of holds) {
                if (hold.target !== event.target) continue;
                if (event.variable !== void 0 && hold.variable !== event.variable) continue;
                if (event.index !== void 0 && hold.index !== event.index) continue;
                holds.delete(key);
              }
            }
            break;
        }
      },
      applyHolds() {
        for (const hold of holds.values()) applyHold(hold);
      },
      holds: () => [...holds.values()].map((hold) => ({ ...hold })),
      save: () => [...holds.values()].map((hold) => ({ ...hold })),
      load(saved) {
        holds.clear();
        for (const hold of saved) holds.set(holdKey(hold), { ...hold });
      }
    };
  }

  // src/internals.js
  function discoverInternals(runtime) {
    let threadClasses = null;
    let VariableClass = null;
    const probeThreadClasses = () => {
      if (threadClasses) return threadClasses;
      const target = runtime.targets[0];
      if (!target) throw new Error("cannot discover the Thread class: the runtime has no targets");
      const probe = runtime._pushThread(null, target);
      runtime.threads.splice(runtime.threads.indexOf(probe), 1);
      threadClasses = { Thread: probe.constructor, StackFrame: probe.stackFrames[0].constructor };
      return threadClasses;
    };
    return {
      Timer: runtime.sequencer.timer.constructor,
      get Thread() {
        return probeThreadClasses().Thread;
      },
      get StackFrame() {
        return probeThreadClasses().StackFrame;
      },
      get Variable() {
        if (VariableClass) return VariableClass;
        for (const target of runtime.targets) {
          const variable = Object.values(target.variables)[0];
          if (variable) return VariableClass = variable.constructor;
        }
        return null;
      },
      status: {
        RUNNING: 0,
        PROMISE_WAIT: 1,
        YIELD: 2,
        YIELD_TICK: 3,
        DONE: 4
      }
    };
  }

  // src/scope.js
  var TIMEOUT_MAX = 2147483647;
  var normalizeDelay = (ms) => {
    const delay = Number(ms);
    if (!(delay > 0)) return 0;
    if (delay > TIMEOUT_MAX) return 1;
    return delay;
  };
  function createTimers(clock) {
    const pending = /* @__PURE__ */ new Map();
    let nextId = 1;
    let seq = 0;
    const add = (fn, ms, args, repeat) => {
      const id = nextId++;
      const delay = normalizeDelay(ms);
      pending.set(id, { id, due: clock.now() + delay, seq: seq++, fn, args, repeat: repeat ? Math.max(delay, 1) : 0 });
      return id;
    };
    return {
      setTimeout: (fn, ms, ...args) => add(fn, ms, args, false),
      setInterval: (fn, ms, ...args) => add(fn, ms, args, true),
      clear: (id) => {
        pending.delete(id);
      },
      get size() {
        return pending.size;
      },
      describe: () => [...pending.values()].map((t) => ({ due: t.due, repeat: t.repeat, fn: t.fn?.name || "anonymous" })),
      fireDue(now) {
        for (; ; ) {
          let first = null;
          for (const timer of pending.values()) {
            if (timer.due > now) continue;
            if (!first || timer.due < first.due || timer.due === first.due && timer.seq < first.seq) first = timer;
          }
          if (!first) return;
          if (first.repeat) {
            first.due += first.repeat;
            first.seq = seq++;
          } else {
            pending.delete(first.id);
          }
          if (typeof first.fn === "function") first.fn(...first.args);
        }
      },
      clearAll() {
        pending.clear();
      }
    };
  }
  function createScope({ clock, rng, timers, currentStream }) {
    const VirtualDate = makeVirtualDate(clock);
    const performanceNow = () => clock.elapsed();
    const random = () => rng.next(currentStream());
    let depth = 0;
    let saved = null;
    const swapPerformance = (now) => {
      const perf = globalThis.performance;
      if (!perf) return void 0;
      const had = Object.hasOwn(perf, "now");
      const previous = perf.now;
      try {
        Object.defineProperty(perf, "now", { value: now, configurable: true, writable: true });
      } catch {
        return void 0;
      }
      return { perf, had, previous };
    };
    const restorePerformance = (swap) => {
      if (!swap) return;
      if (swap.had) Object.defineProperty(swap.perf, "now", { value: swap.previous, configurable: true, writable: true });
      else delete swap.perf.now;
    };
    const enter = () => {
      if (depth++ > 0) return;
      saved = {
        Date: globalThis.Date,
        random: Math.random,
        setTimeout: globalThis.setTimeout,
        clearTimeout: globalThis.clearTimeout,
        setInterval: globalThis.setInterval,
        clearInterval: globalThis.clearInterval,
        performance: swapPerformance(performanceNow)
      };
      globalThis.Date = VirtualDate;
      Math.random = random;
      globalThis.setTimeout = timers.setTimeout;
      globalThis.clearTimeout = timers.clear;
      globalThis.setInterval = timers.setInterval;
      globalThis.clearInterval = timers.clear;
    };
    const exit = () => {
      if (--depth > 0) return;
      globalThis.Date = saved.Date;
      Math.random = saved.random;
      globalThis.setTimeout = saved.setTimeout;
      globalThis.clearTimeout = saved.clearTimeout;
      globalThis.setInterval = saved.setInterval;
      globalThis.clearInterval = saved.clearInterval;
      restorePerformance(saved.performance);
      saved = null;
    };
    return {
      VirtualDate,
      get active() {
        return depth > 0;
      },
      run(fn) {
        enter();
        try {
          return fn();
        } finally {
          exit();
        }
      }
    };
  }

  // src/primitives.js
  var ORIGINAL = /* @__PURE__ */ Symbol("spre.original");
  var MS_PER_DAY = 24 * 60 * 60 * 1e3;
  var Y2K = Date.UTC(2e3, 0, 1);
  var toNumber = (value) => {
    if (typeof value === "number") return Number.isNaN(value) ? 0 : value;
    const n = Number(value);
    return Number.isNaN(n) ? 0 : n;
  };
  var wrapClamp = (n, min, max2) => {
    const range = max2 - min + 1;
    return n - Math.floor((n - min) / range) * range;
  };
  var RANDOM_STREAMS = {
    operator_random: "operator",
    motion_goto: "motion",
    motion_glideto: "motion",
    motion_pointtowards: "motion",
    looks_switchcostumeto: "looks",
    looks_switchbackdropto: "looks",
    looks_switchbackdroptoandwait: "looks",
    looks_say: "looks",
    looks_think: "looks",
    looks_sayforsecs: "looks",
    looks_thinkforsecs: "looks",
    data_itemoflist: "data",
    data_deleteoflist: "data",
    data_insertatlist: "data",
    data_replaceitemoflist: "data",
    control_create_clone_of: "control",
    sensing_askandwait: "sensing"
  };
  var soundIndex = (soundName, target) => {
    const sounds = target.sprite.sounds;
    if (sounds.length === 0) return -1;
    const byName = sounds.findIndex((sound) => sound.name === soundName);
    if (byName !== -1) return byName;
    const oneIndexed = parseInt(soundName, 10);
    return Number.isNaN(oneIndexed) ? -1 : wrapClamp(oneIndexed - 1, 0, sounds.length - 1);
  };
  var soundDurationMs = (sound, target) => {
    if (!(sound.rate > 0) || !(sound.sampleCount > 0)) return null;
    const pitch = target.getCustomState("Scratch.sound")?.effects?.pitch ?? 0;
    return 1e3 * sound.sampleCount / sound.rate / Math.pow(2, pitch / 120);
  };
  var isThenable = (value) => value !== null && typeof value === "object" && typeof value.then === "function";
  var silence = (result) => {
    if (isThenable(result)) result.then(() => {
    }, () => {
    });
  };
  function overridesFor(ctx) {
    const { clock, rng, waits, input } = ctx;
    const bubbleFor = (type) => (original) => (args, util) => {
      ctx.original(`looks_${type}`)(args, util);
      const target = util.target;
      const usageId = target.getCustomState("Scratch.looks")?.usageId ?? null;
      const delay = normalizeDelay(1e3 * args.SECS);
      return waits.add(util.thread, { kind: "bubble", due: clock.now() + delay, target, type, usageId });
    };
    const nextFrameInsteadOfPromise = (original) => (args, util) => {
      const result = original(args, util);
      if (!isThenable(result)) return result;
      silence(result);
      return waits.add(util.thread, { kind: "tick", due: clock.now() });
    };
    return {
      sound_seteffectto: nextFrameInsteadOfPromise,
      sound_changeeffectby: nextFrameInsteadOfPromise,
      sound_setvolumeto: nextFrameInsteadOfPromise,
      sound_changevolumeby: nextFrameInsteadOfPromise,
      operator_random: (original) => (args, util) => {
        const forced = rng.takePick({ from: args.FROM, to: args.TO, target: util.target.getName() });
        return forced ? forced.value : original(args, util);
      },
      looks_sayforsecs: bubbleFor("say"),
      looks_thinkforsecs: bubbleFor("think"),
      sensing_askandwait: () => (args, util) => waits.ask(String(args.QUESTION), util.target, util.thread),
      sensing_answer: () => () => waits.answer,
      sensing_loudness: () => () => input.loudness,
      sensing_loud: () => () => input.loudness > 10,
      sensing_current: () => (args) => {
        const parts = clock.localParts();
        const option = String(args.CURRENTMENU).toLowerCase();
        return Object.hasOwn(parts, option) ? parts[option] : 0;
      },
      sensing_dayssince2000: () => () => (Math.trunc(clock.now()) - Y2K) / MS_PER_DAY,
      event_whengreaterthan: (original) => (args, util) => {
        if (String(args.WHENGREATERTHANMENU).toLowerCase() === "loudness") {
          return input.loudness > toNumber(args.VALUE);
        }
        return original(args, util);
      },
      sound_play: (original) => (args, util) => {
        const index = soundIndex(args.SOUND_MENU, util.target);
        if (index >= 0) waits.stopSound(util.target, util.target.sprite.sounds[index].soundId);
        return original(args, util);
      },
      sound_playuntildone: (original) => (args, util) => {
        const target = util.target;
        const index = soundIndex(args.SOUND_MENU, target);
        if (index >= 0) waits.stopSound(target, target.sprite.sounds[index].soundId);
        silence(original(args, util));
        if (index < 0) return void 0;
        const sound = target.sprite.sounds[index];
        const duration = soundDurationMs(sound, target);
        if (duration === null) return void 0;
        return waits.add(util.thread, { kind: "sound", due: clock.now() + duration, target, soundId: sound.soundId });
      },
      sound_stopallsounds: (original) => (args, util) => {
        waits.stopSound(null, null);
        return original(args, util);
      }
    };
  }
  function createPrimitives(ctx) {
    const { runtime } = ctx;
    const work = ctx.clock.work;
    const overrides = overridesFor(ctx);
    const resetCaches = () => {
      for (const target of runtime.targets) target.blocks.resetCache();
      runtime.flyoutBlocks?.resetCache();
      runtime.monitorBlocks?.resetCache();
    };
    const counted = (impl) => function(args, util) {
      work.ops++;
      return impl(args, util);
    };
    const streamed = (impl, stream) => function(args, util) {
      work.ops++;
      const previous = ctx.stream;
      ctx.stream = stream;
      const result = impl(args, util);
      ctx.stream = previous;
      return result;
    };
    const wrap = (opcode, original) => {
      const impl = overrides[opcode] ? overrides[opcode](original) : original;
      const stream = RANDOM_STREAMS[opcode];
      const wrapped = stream ? streamed(impl, stream) : counted(impl);
      wrapped[ORIGINAL] = original;
      return wrapped;
    };
    return {
      install() {
        let changed = false;
        for (const [opcode, fn] of Object.entries(runtime._primitives)) {
          if (typeof fn !== "function" || fn[ORIGINAL]) continue;
          runtime._primitives[opcode] = wrap(opcode, fn);
          changed = true;
        }
        if (changed) resetCaches();
      },
      uninstall() {
        for (const [opcode, fn] of Object.entries(runtime._primitives)) {
          if (fn?.[ORIGINAL]) runtime._primitives[opcode] = fn[ORIGINAL];
        }
        resetCaches();
      },
      original(opcode) {
        const fn = runtime._primitives[opcode];
        return fn?.[ORIGINAL] ?? fn;
      },
      overridden: Object.keys(overrides)
    };
  }

  // src/rng.js
  var seedWord = (text) => {
    let h2 = 1779033703 ^ text.length;
    for (let i2 = 0; i2 < text.length; i2++) {
      h2 = Math.imul(h2 ^ text.charCodeAt(i2), 3432918353);
      h2 = h2 << 13 | h2 >>> 19;
    }
    return () => {
      h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
      h2 = Math.imul(h2 ^ h2 >>> 13, 3266489909);
      return (h2 ^= h2 >>> 16) >>> 0;
    };
  };
  var sfc32 = (s) => {
    const t = (s[0] + s[1] | 0) + s[3] | 0;
    s[3] = s[3] + 1 | 0;
    s[0] = s[1] ^ s[1] >>> 9;
    s[1] = s[2] + (s[2] << 3) | 0;
    s[2] = s[2] << 21 | s[2] >>> 11;
    s[2] = s[2] + t | 0;
    return t >>> 0;
  };
  var unitDouble = (s) => ((sfc32(s) >>> 5) * 67108864 + (sfc32(s) >>> 6)) / 9007199254740992;
  var freshState = (seed, name) => {
    const word = seedWord(`${seed}\0${name}`);
    const state = [word() | 0, word() | 0, word() | 0, word() | 0];
    for (let i2 = 0; i2 < 12; i2++) sfc32(state);
    return state;
  };
  var checkUnit = (value) => {
    if (typeof value !== "number" || !(value >= 0 && value < 1)) {
      throw new RangeError(`queued draws must be numbers in [0, 1), got ${value}`);
    }
    return value;
  };
  function createRng(seed = 0) {
    let currentSeed = String(seed);
    const streams = /* @__PURE__ */ new Map();
    const forcedPicks = [];
    const overrides = /* @__PURE__ */ new Map();
    let pickOverride = null;
    const stream = (name) => {
      let entry = streams.get(name);
      if (!entry) {
        entry = { state: freshState(currentSeed, name), draws: 0, queue: [] };
        streams.set(name, entry);
      }
      return entry;
    };
    const next = (name, context) => {
      const entry = stream(name);
      entry.draws++;
      const override = overrides.get(name);
      if (override) {
        const value = override(context ?? { stream: name, draw: entry.draws });
        if (value !== void 0) return checkUnit(value);
      }
      if (entry.queue.length) return entry.queue.shift();
      return unitDouble(entry.state);
    };
    return {
      get seed() {
        return currentSeed;
      },
      next,
      stream: (name) => ({ name, draws: stream(name).draws, queued: stream(name).queue.length }),
      streams: () => [...streams.keys()],
      reseed(newSeed) {
        currentSeed = String(newSeed);
        streams.clear();
        forcedPicks.length = 0;
      },
      queue(name, ...values) {
        stream(name).queue.push(...values.map(checkUnit));
      },
      override(name, fn) {
        if (fn) overrides.set(name, fn);
        else overrides.delete(name);
      },
      force(...values) {
        forcedPicks.push(...values);
      },
      onPick(fn) {
        pickOverride = fn ?? null;
      },
      takePick(request) {
        if (pickOverride) {
          const value = pickOverride(request);
          if (value !== void 0) return { value };
        }
        if (forcedPicks.length) return { value: forcedPicks.shift() };
        return null;
      },
      save() {
        return {
          seed: currentSeed,
          streams: Object.fromEntries([...streams].map(([name, entry]) => [name, {
            state: entry.state.map((n) => n >>> 0),
            draws: entry.draws,
            queue: [...entry.queue]
          }])),
          forced: [...forcedPicks]
        };
      },
      load(saved) {
        currentSeed = saved.seed;
        streams.clear();
        for (const [name, entry] of Object.entries(saved.streams)) {
          streams.set(name, { state: entry.state.map((n) => n | 0), draws: entry.draws, queue: [...entry.queue] });
        }
        forcedPicks.length = 0;
        forcedPicks.push(...saved.forced);
      }
    };
  }

  // src/snapshot.js
  var SNAPSHOT_VERSION = 1;
  var TARGET_PROPS = [
    "x",
    "y",
    "direction",
    "draggable",
    "visible",
    "size",
    "currentCostume",
    "rotationStyle",
    "volume",
    "tempo",
    "videoTransparency",
    "videoState",
    "textToSpeechLanguage",
    "dragging",
    "drawableID"
  ];
  function createSnapshots(ctx) {
    const { runtime, internals } = ctx;
    const refOf = (target) => {
      if (!target) return null;
      if (target.isStage) return "stage";
      return target.isOriginal ? `sprite:${target.sprite.name}` : `clone:${target.id}`;
    };
    const originalsByRef = () => {
      const map = /* @__PURE__ */ new Map();
      for (const target of runtime.targets) if (target.isOriginal) map.set(refOf(target), target);
      return map;
    };
    const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const replacer = (mapping) => {
      if (!mapping.size) return (text) => text;
      const pattern = new RegExp([...mapping.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|"), "g");
      return (text) => typeof text === "string" ? text.replace(pattern, (match) => mapping.get(match)) : text;
    };
    const canonicalIds = () => {
      const originals = runtime.targets.filter((t) => t.isOriginal);
      return {
        canon: replacer(new Map(originals.map((t) => [t.id, `@${refOf(t)}`]))),
        real: replacer(new Map(originals.map((t) => [`@${refOf(t)}`, t.id])))
      };
    };
    const ownerOfVariable = (variable) => runtime.targets.find((t) => t.variables[variable.id] === variable);
    const timerBase = (timer) => {
      const nowObj = timer.nowObj;
      if (nowObj === ctx.scope.VirtualDate || nowObj === ctx.clockNowObj) return "clock";
      if (nowObj === ctx.realDate || nowObj === globalThis.performance || typeof nowObj?.now !== "function") return null;
      return "frame";
    };
    function capture({ strict = true } = {}) {
      if (ctx.inFrame) throw new SnapshotError("snapshots can only be taken between frames");
      const problems = [];
      const threadIndex = new Map(runtime.threads.map((thread, i2) => [thread, i2]));
      const Stage = runtime.getTargetForStage()?.constructor;
      const refs = {
        encode(value, path) {
          if (value instanceof internals.Timer) {
            const base = timerBase(value);
            if (!base) problems.push(`${path}: timer reads a clock SPRE does not control`);
            return { kind: "timer", data: { start: value.startTime, base: base ?? "clock" } };
          }
          if (runtime.threads.length && value instanceof internals.Thread) {
            return { kind: "thread", data: { i: threadIndex.get(value) ?? -1 } };
          }
          if (Stage && value instanceof Stage) return { kind: "target", data: { ref: refOf(value) } };
          if (internals.Variable && value instanceof internals.Variable) {
            const owner = ownerOfVariable(value);
            if (!owner) problems.push(`${path}: variable "${value.name}" belongs to no live target`);
            return { kind: "variable", data: { owner: refOf(owner), id: value.id } };
          }
          return void 0;
        }
      };
      const encode2 = (value, path) => {
        try {
          return encodeValue(value, refs, path);
        } catch (error) {
          if (!(error instanceof SnapshotError)) throw error;
          problems.push(error.message);
          return null;
        }
      };
      const containerOf = (thread) => {
        if (thread.blockContainer === runtime.monitorBlocks) return "monitor";
        if (thread.blockContainer === runtime.flyoutBlocks) return "flyout";
        return "target";
      };
      const targets = runtime.targets.map((target) => {
        const ref = refOf(target);
        return {
          ref,
          sprite: target.isStage ? null : target.sprite.name,
          props: encode2(Object.fromEntries(TARGET_PROPS.map((key) => [key, target[key]])), `${ref}.props`),
          effects: encode2({ ...target.effects }, `${ref}.effects`),
          variables: Object.values(target.variables).map((variable) => ({
            id: variable.id,
            name: variable.name,
            type: variable.type,
            cloud: Boolean(variable.isCloud),
            value: encode2(variable.value, `${ref}.variables.${variable.name}`)
          })),
          edge: encode2({ ...target._edgeActivatedHatValues }, `${ref}.edge`),
          custom: encode2({ ...target._customState }, `${ref}.custom`)
        };
      });
      const cloneOrder = {};
      for (const target of runtime.targets) {
        if (!target.isOriginal || target.isStage || target.sprite.clones.length < 2) continue;
        cloneOrder[target.sprite.name] = target.sprite.clones.filter((c) => !c.isOriginal).map(refOf);
      }
      const waits = ctx.waits.save();
      const controlledWaiters = new Set(waits.entries.map((entry) => entry.thread));
      const threads = runtime.threads.map((thread, i2) => {
        const path = `threads[${i2}]`;
        if (thread.status === internals.status.PROMISE_WAIT && !controlledWaiters.has(thread)) {
          problems.push(`${path}: waits on a promise SPRE does not control (block ${thread.peekStack()})`);
        }
        return {
          target: refOf(thread.target),
          container: containerOf(thread),
          top: thread.topBlock,
          status: thread.status,
          stack: [...thread.stack],
          frames: thread.stackFrames.map((frame, j) => ({
            loop: frame.isLoop,
            warp: frame.warpMode,
            justReported: encode2(frame.justReported, `${path}.frames[${j}].justReported`),
            reporting: frame.reported === null ? null : frame.reporting,
            reported: encode2(frame.reported, `${path}.frames[${j}].reported`),
            waitingReporter: encode2(frame.waitingReporter, `${path}.frames[${j}].waitingReporter`),
            params: encode2(frame.params, `${path}.frames[${j}].params`),
            context: encode2(frame.executionContext, `${path}.frames[${j}].context`)
          })),
          stackClick: Boolean(thread.stackClick),
          updateMonitor: Boolean(thread.updateMonitor),
          killed: thread.isKilled,
          justReported: encode2(thread.justReported, `${path}.justReported`),
          warpTimer: encode2(thread.warpTimer, `${path}.warpTimer`),
          glow: thread.requestScriptGlowInFrame,
          glowBlock: thread.blockGlowInFrame
        };
      });
      const encodedWaits = waits.entries.map((entry) => ({
        ...entry,
        thread: entry.thread ? threadIndex.get(entry.thread) ?? -1 : -1,
        target: entry.target ? refOf(entry.target) : void 0
      }));
      const renderer = runtime.renderer;
      if (renderer && typeof renderer.save !== "function") {
        problems.push("the attached renderer cannot save its state (layer order, pen, bubbles)");
      }
      if (ctx.timers.size) {
        problems.push(`${ctx.timers.size} pending setTimeout/setInterval callback(s) from inside the VM cannot be saved`);
      }
      const ids = canonicalIds();
      const monitors = [...runtime._monitorState.values()].map((record) => ({
        id: ids.canon(record.get("id")),
        visible: Boolean(record.get("visible"))
      }));
      const monitored = Object.values(runtime.monitorBlocks._blocks).filter((block) => block.isMonitored !== void 0).map((block) => ({ id: ids.canon(block.id), on: Boolean(block.isMonitored) }));
      const projectTimer = runtime.ioDevices.clock;
      const snapshot = {
        spre: SNAPSHOT_VERSION,
        frame: ctx.frame,
        clock: ctx.clock.save(),
        rng: encode2(ctx.rng.save(), "rng"),
        input: encode2(ctx.input.save(), "input"),
        holds: encode2(ctx.memory.save(), "holds"),
        waits: {
          seq: waits.seq,
          answer: encode2(waits.answer, "answer"),
          entries: encodedWaits,
          questions: waits.questions.map((question) => ({
            text: question.text,
            target: refOf(question.target),
            wasVisible: question.wasVisible,
            wasStage: question.wasStage,
            wait: question.wait
          }))
        },
        runtime: {
          currentMSecs: runtime.currentMSecs,
          turbo: Boolean(runtime.turboMode),
          cloneCounter: runtime._cloneCounter,
          projectTimer: {
            start: projectTimer._projectTimer.startTime,
            paused: projectTimer._paused,
            pausedTime: projectTimer._pausedTime
          }
        },
        targets,
        executable: runtime.executableTargets.map(refOf),
        cloneOrder,
        threads,
        monitors,
        monitored,
        renderer: renderer && typeof renderer.save === "function" ? renderer.save() : null
      };
      if (problems.length) {
        if (strict) throw new SnapshotError(`cannot snapshot deterministically:
  ${problems.join("\n  ")}`);
        snapshot.problems = problems;
      }
      return snapshot;
    }
    function restore(snapshot) {
      if (snapshot?.spre !== SNAPSHOT_VERSION) throw new SnapshotError(`not a SPRE v${SNAPSHOT_VERSION} snapshot`);
      if (ctx.inFrame) throw new SnapshotError("snapshots can only be restored between frames");
      const originals = originalsByRef();
      for (const saved of snapshot.targets) {
        if (saved.ref.startsWith("clone:")) {
          if (!originals.has(`sprite:${saved.sprite}`)) throw new SnapshotError(`no sprite "${saved.sprite}" to clone`);
        } else if (!originals.has(saved.ref)) {
          throw new SnapshotError(`the project has no target ${saved.ref}`);
        }
      }
      const Variable = internals.Variable;
      const { Thread, StackFrame } = snapshot.threads.length ? internals : {};
      runtime.threads = [];
      for (const target of [...runtime.targets]) {
        if (!target.isOriginal) runtime.disposeTarget(target);
      }
      const byRef = new Map(originals);
      for (const saved of snapshot.targets) {
        if (!saved.ref.startsWith("clone:")) continue;
        const original = originals.get(`sprite:${saved.sprite}`);
        const clone = original.sprite.createClone();
        clone.id = saved.ref.slice("clone:".length);
        byRef.set(saved.ref, clone);
      }
      const targetOf = (ref) => {
        if (ref === null) return null;
        const target = byRef.get(ref);
        if (!target) throw new SnapshotError(`snapshot refers to missing target ${ref}`);
        return target;
      };
      const threads = snapshot.threads.map((saved) => new Thread(saved.top));
      const deadThread = () => {
        const thread = new Thread(null);
        thread.status = internals.status.DONE;
        return thread;
      };
      const refs = {
        decode(kind, data) {
          switch (kind) {
            case "timer": {
              const timer = new internals.Timer(data.base === "frame" ? ctx.frameNowObj : ctx.scope.VirtualDate);
              timer.startTime = data.start;
              return { value: timer };
            }
            case "thread":
              return { value: data.i >= 0 ? threads[data.i] : deadThread() };
            case "target":
              return { value: targetOf(data.ref) };
            case "variable":
              return { value: targetOf(data.owner).variables[data.id] };
          }
          return void 0;
        }
      };
      const decode2 = (value, path) => decodeValue(value, refs, path);
      for (const saved of snapshot.targets) {
        const target = targetOf(saved.ref);
        const previous = { ...target.variables };
        for (const key of Object.keys(target.variables)) delete target.variables[key];
        for (const entry of saved.variables) {
          let variable = previous[entry.id];
          if (!variable || variable.type !== entry.type) variable = new Variable(entry.id, entry.name, entry.type, entry.cloud);
          variable.name = entry.name;
          variable.isCloud = entry.cloud;
          target.variables[entry.id] = variable;
        }
      }
      for (const saved of snapshot.targets) {
        const target = targetOf(saved.ref);
        Object.assign(target, decode2(saved.props, `${saved.ref}.props`));
        const effects = decode2(saved.effects, `${saved.ref}.effects`);
        for (const key of Object.keys(target.effects)) delete target.effects[key];
        Object.assign(target.effects, effects);
        for (const entry of saved.variables) {
          target.variables[entry.id].value = decode2(entry.value, `${saved.ref}.variables.${entry.name}`);
        }
        target._edgeActivatedHatValues = decode2(saved.edge, `${saved.ref}.edge`);
        target._customState = decode2(saved.custom, `${saved.ref}.custom`);
      }
      const renderer = runtime.renderer;
      if (renderer && snapshot.renderer && typeof renderer.load === "function") {
        renderer.load(snapshot.renderer);
      } else if (renderer) {
        for (const target of byRef.values()) target.updateAllDrawableProperties();
      }
      runtime.targets = snapshot.targets.map((saved) => targetOf(saved.ref));
      runtime.executableTargets = snapshot.executable.map(targetOf);
      for (const [spriteName, clones] of Object.entries(snapshot.cloneOrder)) {
        const original = originals.get(`sprite:${spriteName}`);
        original.sprite.clones = [original, ...clones.map(targetOf)];
      }
      runtime._cloneCounter = snapshot.runtime.cloneCounter;
      runtime.currentMSecs = snapshot.runtime.currentMSecs;
      runtime.turboMode = snapshot.runtime.turbo;
      const projectClock = runtime.ioDevices.clock;
      projectClock._projectTimer.startTime = snapshot.runtime.projectTimer.start;
      projectClock._paused = snapshot.runtime.projectTimer.paused;
      projectClock._pausedTime = snapshot.runtime.projectTimer.pausedTime;
      snapshot.threads.forEach((saved, i2) => {
        const thread = threads[i2];
        const path = `threads[${i2}]`;
        thread.target = targetOf(saved.target);
        thread.blockContainer = saved.container === "monitor" ? runtime.monitorBlocks : saved.container === "flyout" ? runtime.flyoutBlocks : thread.target.blocks;
        for (const blockId of saved.stack) {
          if (blockId !== null && !thread.blockContainer.getBlock(blockId)) {
            throw new SnapshotError(`block ${blockId} is not in this project`, path);
          }
        }
        thread.stack = [...saved.stack];
        thread.stackFrames = saved.frames.map((savedFrame, j) => {
          const frame = new StackFrame(savedFrame.warp);
          frame.isLoop = savedFrame.loop;
          frame.justReported = decode2(savedFrame.justReported, `${path}.frames[${j}].justReported`);
          frame.reporting = savedFrame.reporting ?? "";
          frame.reported = decode2(savedFrame.reported, `${path}.frames[${j}].reported`);
          frame.waitingReporter = decode2(savedFrame.waitingReporter, `${path}.frames[${j}].waitingReporter`);
          frame.params = decode2(savedFrame.params, `${path}.frames[${j}].params`);
          frame.executionContext = decode2(savedFrame.context, `${path}.frames[${j}].context`);
          return frame;
        });
        thread.status = saved.status;
        thread.stackClick = saved.stackClick;
        thread.updateMonitor = saved.updateMonitor;
        thread.isKilled = saved.killed;
        thread.justReported = decode2(saved.justReported, `${path}.justReported`);
        thread.warpTimer = decode2(saved.warpTimer, `${path}.warpTimer`);
        thread.requestScriptGlowInFrame = saved.glow;
        thread.blockGlowInFrame = saved.glowBlock;
      });
      runtime.threads = threads;
      const entries = snapshot.waits.entries.map((entry) => {
        const restored = { ...entry, thread: entry.thread >= 0 ? threads[entry.thread] : null };
        if (entry.target !== void 0) restored.target = targetOf(entry.target);
        else delete restored.target;
        return restored;
      });
      ctx.waits.load({
        seq: snapshot.waits.seq,
        answer: decode2(snapshot.waits.answer, "answer"),
        entries,
        questions: snapshot.waits.questions.map((question) => ({ ...question, target: targetOf(question.target) }))
      });
      const ids = canonicalIds();
      let monitorState = runtime._monitorState;
      for (const { id, visible } of snapshot.monitors) {
        const realId = ids.real(id);
        const record = monitorState.get(realId);
        if (record && record.get("visible") !== visible) monitorState = monitorState.set(realId, record.set("visible", visible));
      }
      runtime._monitorState = monitorState;
      for (const { id, on } of snapshot.monitored) {
        const block = runtime.monitorBlocks.getBlock(ids.real(id));
        if (block) block.isMonitored = on;
      }
      ctx.frame = snapshot.frame;
      ctx.clock.load(snapshot.clock);
      ctx.rng.load(decode2(snapshot.rng, "rng"));
      ctx.input.load(decode2(snapshot.input, "input"));
      ctx.memory.load(decode2(snapshot.holds ?? [], "holds"));
      ctx.timers.clearAll();
      ctx.waits.replayQuestionPrompt();
      runtime._refreshTargets = true;
    }
    return { capture, restore, refOf };
  }

  // src/waits.js
  var PENDING = Object.freeze({ then() {
  } });
  var byDueThenSeq = (a, b) => a.due - b.due || a.seq - b.seq;
  function createWaits(ctx) {
    const { runtime, clock } = ctx;
    let entries = [];
    let questions = [];
    let answer = "";
    let seq = 0;
    const say = (target, type, text) => {
      const updateBubble = runtime.listeners("SAY").find((fn) => fn.name === "bound _updateBubble");
      if (updateBubble) updateBubble(target, type, text);
      else runtime.emit("SAY", target, type, text);
    };
    const resume = (thread, blockId) => {
      if (!thread || !runtime.threads.includes(thread)) return;
      thread.pushReportedValue(void 0);
      thread.status = ctx.internals.status.RUNNING;
      let stackFrame;
      let nextBlockId;
      do {
        const popped = thread.popStack();
        if (popped === null) return;
        nextBlockId = thread.target.blocks.getNextBlock(popped);
        if (nextBlockId !== null) break;
        stackFrame = thread.peekStackFrame();
      } while (stackFrame !== null && !stackFrame.isLoop);
      thread.pushStack(nextBlockId);
    };
    const finish = (entry) => {
      if (entry.kind === "bubble") {
        const usageId = entry.target.getCustomState("Scratch.looks")?.usageId ?? null;
        if (usageId === entry.usageId) say(entry.target, entry.type, "");
      }
      resume(entry.thread, entry.block);
    };
    const remove = (predicate) => {
      const removed = entries.filter(predicate);
      if (removed.length) entries = entries.filter((entry) => !removed.includes(entry));
      return removed;
    };
    const showNextQuestion = () => {
      const question = questions[0];
      if (!question) return;
      if (question.wasVisible && !question.wasStage) {
        say(question.target, "say", question.text);
        runtime.emit("QUESTION", "");
      } else {
        runtime.emit("QUESTION", question.text);
      }
    };
    return {
      add(thread, entry) {
        entries.push({ seq: seq++, thread, block: thread.peekStack(), ...entry });
        return PENDING;
      },
      resolveDue(now) {
        const ready = remove((entry) => entry.due !== null && entry.due <= now).sort(byDueThenSeq);
        for (const entry of ready) finish(entry);
      },
      stopSound(target, soundId) {
        const now = clock.now();
        for (const entry of entries) {
          if (entry.kind !== "sound") continue;
          if (target !== null && (entry.target !== target || entry.soundId !== soundId)) continue;
          entry.due = Math.min(entry.due, now);
        }
      },
      ask(text, target, thread) {
        const wasAsking = questions.length > 0;
        const wait = { seq: seq++, kind: "question", due: null, thread, block: thread.peekStack() };
        entries.push(wait);
        questions.push({ text, target, wasVisible: target.visible, wasStage: target.isStage, wait });
        if (!wasAsking) showNextQuestion();
        return PENDING;
      },
      get answer() {
        return answer;
      },
      get question() {
        return questions[0] ?? null;
      },
      submit(text) {
        answer = text;
        const question = questions.shift();
        if (!question) return false;
        if (question.wasVisible && !question.wasStage) say(question.target, "say", "");
        remove((entry) => entry === question.wait);
        resume(question.wait.thread, question.wait.block);
        showNextQuestion();
        return true;
      },
      onProjectStart() {
        answer = "";
      },
      onStopAll() {
        entries = [];
        questions = [];
      },
      onStopForTarget(target) {
        const currentlyAsking = questions.length > 0 && questions[0].target === target;
        const dropped = questions.filter((question) => question.target === target);
        if (!dropped.length) return;
        questions = questions.filter((question) => question.target !== target);
        remove((entry) => dropped.some((question) => question.wait === entry));
        if (!currentlyAsking) return;
        say(target, "say", "");
        if (questions.length) showNextQuestion();
        else runtime.emit("QUESTION", null);
      },
      get pending() {
        return entries.length;
      },
      save() {
        return {
          seq,
          answer,
          entries: entries.map((entry) => ({ ...entry })),
          questions: questions.map((question) => ({ ...question, wait: entries.indexOf(question.wait) }))
        };
      },
      load(saved) {
        seq = saved.seq;
        answer = saved.answer;
        entries = saved.entries.map((entry) => ({ ...entry }));
        questions = saved.questions.map((question) => ({ ...question, wait: entries[question.wait] }));
      },
      replayQuestionPrompt() {
        const question = questions[0];
        if (!question) runtime.emit("QUESTION", null);
        else runtime.emit("QUESTION", question.wasVisible && !question.wasStage ? "" : question.text);
      }
    };
  }

  // src/index.js
  var ATTACHED = /* @__PURE__ */ Symbol.for("spre.attached");
  var ENGINE_STREAM = "engine";
  var macrotask = () => new Promise((resolve) => {
    if (typeof setImmediate === "function") setImmediate(resolve);
    else setTimeout(resolve, 0);
  });
  function attach(vm, options = {}) {
    const runtime = vm.runtime ?? vm;
    if (runtime[ATTACHED]) throw new Error("SPRE is already attached to this runtime");
    const {
      seed = 0,
      epoch,
      fps = 30,
      opCostMs = 1e-3,
      utcOffsetMinutes = 0,
      answers = null
    } = options;
    const clock = createClock({ epoch, fps, opCostMs, utcOffsetMinutes });
    const ctx = {
      vm,
      runtime,
      clock,
      rng: createRng(seed),
      internals: discoverInternals(runtime),
      stream: ENGINE_STREAM,
      frame: 0,
      inFrame: false,
      realDate: Date,
      frameNowObj: { now: () => runtime.currentMSecs },
      clockNowObj: { now: clock.now }
    };
    ctx.timers = createTimers(clock);
    ctx.scope = createScope({ clock, rng: ctx.rng, timers: ctx.timers, currentStream: () => ctx.stream });
    ctx.waits = createWaits(ctx);
    ctx.input = createInput(ctx, { answers });
    ctx.memory = createMemory(ctx);
    const primitives = createPrimitives(ctx);
    ctx.original = primitives.original;
    const snapshots = createSnapshots(ctx);
    if (runtime._steppingInterval) {
      clearInterval(runtime._steppingInterval);
      runtime._steppingInterval = null;
    }
    const projectClock = runtime.ioDevices.clock;
    const elapsedProjectTime = projectClock._projectTimer.timeElapsed();
    runtime.currentStepTime = clock.frameMs;
    runtime.currentMSecs = clock.frameNow();
    projectClock._projectTimer.startTime = runtime.currentMSecs - elapsedProjectTime;
    const sequencer = runtime.sequencer;
    const originalSequencerNow = sequencer.timer.nowObj;
    sequencer.timer.nowObj = ctx.clockNowObj;
    const stepThreadOfPrototype = Object.getPrototypeOf(sequencer).stepThread;
    sequencer.stepThread = function(thread) {
      clock.charge(1);
      return stepThreadOfPrototype.call(this, thread);
    };
    runtime.updateCurrentMSecs = function() {
      this.currentMSecs = clock.frameNow();
    };
    const listeners = {
      PROJECT_START: () => ctx.waits.onProjectStart(),
      PROJECT_STOP_ALL: () => ctx.waits.onStopAll(),
      STOP_FOR_TARGET: (target) => ctx.waits.onStopForTarget(target),
      EXTENSION_ADDED: () => {
        primitives.install();
        ensurePenLayer(runtime);
      }
    };
    for (const [event, fn] of Object.entries(listeners)) runtime.on(event, fn);
    primitives.install();
    ensurePenLayer(runtime);
    runtime[ATTACHED] = true;
    const stepFrame = () => {
      clock.beginFrame();
      ctx.inFrame = true;
      try {
        ctx.scope.run(() => {
          ctx.stream = ENGINE_STREAM;
          const now = clock.now();
          ctx.timers.fireDue(now);
          ctx.waits.resolveDue(now);
          ctx.input.applyFrame(ctx.frame);
          ctx.memory.applyHolds();
          runtime._step();
          ctx.memory.applyHolds();
        });
      } finally {
        ctx.stream = ENGINE_STREAM;
        ctx.inFrame = false;
        clock.endFrame();
        ctx.frame++;
      }
    };
    const runFrames = (count, until) => {
      for (let i2 = 0; i2 < count; i2++) {
        stepFrame();
        if (until?.(spre)) return true;
      }
      return false;
    };
    const spre = {
      vm,
      runtime,
      get frame() {
        return ctx.frame;
      },
      get time() {
        return clock.elapsed();
      },
      get now() {
        return clock.now();
      },
      step(frames = 1) {
        runFrames(frames);
        return ctx.frame;
      },
      run({ frames = Infinity, until, idle = false } = {}) {
        const stop = idle ? (s) => !runtime.threads.length || until?.(s) : until;
        if (!Number.isFinite(frames) && !stop) throw new RangeError("run() needs a frame limit or a stop condition");
        const stopped = runFrames(frames, stop);
        return { frame: ctx.frame, stopped };
      },
      async runAsync({ frames = Infinity, until, idle = false } = {}) {
        const stop = idle ? (s) => !runtime.threads.length || until?.(s) : until;
        if (!Number.isFinite(frames) && !stop) throw new RangeError("runAsync() needs a frame limit or a stop condition");
        for (let i2 = 0; i2 < frames; i2++) {
          stepFrame();
          await macrotask();
          if (stop?.(spre)) return { frame: ctx.frame, stopped: true };
        }
        return { frame: ctx.frame, stopped: false };
      },
      greenFlag() {
        ctx.input.api.send({ type: "flag" });
      },
      stopAll() {
        ctx.input.api.send({ type: "stop" });
      },
      turbo(on = true) {
        ctx.input.api.send({ type: "turbo", on });
      },
      input: ctx.input.api,
      memory: {
        targetOf: (ref) => ctx.memory.targetOf(ref),
        variableOf: (ref, id) => ctx.memory.variableOf(ref, id),
        holds: () => ctx.memory.holds()
      },
      rng: {
        get seed() {
          return ctx.rng.seed;
        },
        reseed: (newSeed) => ctx.rng.reseed(newSeed),
        queue: (stream, ...values) => ctx.rng.queue(stream, ...values),
        override: (stream, fn) => ctx.rng.override(stream, fn),
        force: (...values) => ctx.rng.force(...values),
        onPick: (fn) => ctx.rng.onPick(fn),
        stream: (name) => ctx.rng.stream(name),
        streams: () => ctx.rng.streams()
      },
      clock: {
        now: clock.now,
        elapsed: clock.elapsed,
        get frameMs() {
          return clock.frameMs;
        },
        configure: (settings) => {
          clock.configure(settings);
          runtime.currentStepTime = clock.frameMs;
        }
      },
      snapshot: (options2) => snapshots.capture(options2),
      restore: (snapshot) => ctx.scope.run(() => {
        snapshots.restore(snapshot);
        reattachPenListeners(runtime);
      }),
      hash() {
        const { input: { schedule, seq, ...input }, ...world } = snapshots.capture({ strict: false });
        return hashValue({ ...world, input });
      },
      refOf: snapshots.refOf,
      movie: () => ({ spre: 1, seed: ctx.rng.seed, fps: 1e3 / clock.frameMs, events: ctx.input.api.log() }),
      status() {
        return {
          frame: ctx.frame,
          time: clock.elapsed(),
          threads: runtime.threads.length,
          clones: runtime._cloneCounter,
          waits: ctx.waits.pending,
          question: ctx.waits.question?.text ?? null,
          timers: ctx.timers.size
        };
      },
      detach() {
        for (const [event, fn] of Object.entries(listeners)) runtime.removeListener(event, fn);
        primitives.uninstall();
        delete sequencer.stepThread;
        delete runtime.updateCurrentMSecs;
        sequencer.timer.nowObj = originalSequencerNow;
        delete runtime[ATTACHED];
      }
    };
    return spre;
  }

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start2) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start2 += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    // determined by compression function
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var zls = function(d, dict) {
    if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
      err(6, "invalid zlib data");
    if ((d[1] >> 5 & 1) == +!dict)
      err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
    return (d[1] >> 3 & 4) + 2;
  };
  var Inflate = /* @__PURE__ */ (function() {
    function Inflate2(opts, cb) {
      if (typeof opts == "function")
        cb = opts, opts = {};
      this.ondata = cb;
      var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
      this.s = { i: 0, b: dict ? dict.length : 0 };
      this.o = new u8(32768);
      this.p = new u8(0);
      if (dict)
        this.o.set(dict);
    }
    Inflate2.prototype.e = function(c) {
      if (!this.ondata)
        err(5);
      if (this.d)
        err(4);
      if (!this.p.length)
        this.p = c;
      else if (c.length) {
        var n = new u8(this.p.length + c.length);
        n.set(this.p), n.set(c, this.p.length), this.p = n;
      }
    };
    Inflate2.prototype.c = function(final) {
      this.s.i = +(this.d = final || false);
      var bts = this.s.b;
      var dt = inflt(this.p, this.s, this.o);
      this.ondata(slc(dt, bts, this.s.b), this.d);
      this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
      this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    };
    Inflate2.prototype.push = function(chunk, final) {
      this.e(chunk), this.c(final);
    };
    return Inflate2;
  })();
  var Unzlib = /* @__PURE__ */ (function() {
    function Unzlib2(opts, cb) {
      Inflate.call(this, opts, cb);
      this.v = opts && opts.dictionary ? 2 : 1;
    }
    Unzlib2.prototype.push = function(chunk, final) {
      Inflate.prototype.e.call(this, chunk);
      if (this.v) {
        if (this.p.length < 6 && !final)
          return;
        this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
      }
      if (final) {
        if (this.p.length < 4)
          err(6, "invalid zlib data");
        this.p = this.p.subarray(0, -4);
      }
      Inflate.prototype.c.call(this, final);
    };
    return Unzlib2;
  })();
  function unzlibSync(data, opts) {
    return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }

  // node_modules/iobuffer/lib/text.js
  function decode(bytes, encoding = "utf8") {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(bytes);
  }
  var encoder = new TextEncoder();
  function encode(str) {
    return encoder.encode(str);
  }

  // node_modules/iobuffer/lib/iobuffer.js
  var defaultByteLength = 1024 * 8;
  var hostBigEndian = (() => {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    return !((view[0] = 1) & array[0]);
  })();
  var typedArrays = {
    int8: globalThis.Int8Array,
    uint8: globalThis.Uint8Array,
    int16: globalThis.Int16Array,
    uint16: globalThis.Uint16Array,
    int32: globalThis.Int32Array,
    uint32: globalThis.Uint32Array,
    uint64: globalThis.BigUint64Array,
    int64: globalThis.BigInt64Array,
    float32: globalThis.Float32Array,
    float64: globalThis.Float64Array
  };
  var IOBuffer = class _IOBuffer {
    /**
     * Reference to the internal ArrayBuffer object.
     */
    buffer;
    /**
     * Byte length of the internal ArrayBuffer.
     */
    byteLength;
    /**
     * Byte offset of the internal ArrayBuffer.
     */
    byteOffset;
    /**
     * Byte length of the internal ArrayBuffer.
     */
    length;
    /**
     * The current offset of the buffer's pointer.
     */
    offset;
    lastWrittenByte;
    littleEndian;
    _data;
    _mark;
    _marks;
    /**
     * Create a new IOBuffer.
     * @param data - The data to construct the IOBuffer with.
     * If data is a number, it will be the new buffer's length<br>
     * If data is `undefined`, the buffer will be initialized with a default length of 8Kb<br>
     * If data is an ArrayBuffer, SharedArrayBuffer, an ArrayBufferView (Typed Array), an IOBuffer instance,
     * or a Node.js Buffer, a view will be created over the underlying ArrayBuffer.
     * @param options - An object for the options.
     * @returns A new IOBuffer instance.
     */
    constructor(data = defaultByteLength, options = {}) {
      let dataIsGiven = false;
      if (typeof data === "number") {
        data = new ArrayBuffer(data);
      } else {
        dataIsGiven = true;
        this.lastWrittenByte = data.byteLength;
      }
      const offset = options.offset ? options.offset >>> 0 : 0;
      const byteLength = data.byteLength - offset;
      let dvOffset = offset;
      if (ArrayBuffer.isView(data) || data instanceof _IOBuffer) {
        if (data.byteLength !== data.buffer.byteLength) {
          dvOffset = data.byteOffset + offset;
        }
        data = data.buffer;
      }
      if (dataIsGiven) {
        this.lastWrittenByte = byteLength;
      } else {
        this.lastWrittenByte = 0;
      }
      this.buffer = data;
      this.length = byteLength;
      this.byteLength = byteLength;
      this.byteOffset = dvOffset;
      this.offset = 0;
      this.littleEndian = true;
      this._data = new DataView(this.buffer, dvOffset, byteLength);
      this._mark = 0;
      this._marks = [];
    }
    /**
     * Checks if the memory allocated to the buffer is sufficient to store more
     * bytes after the offset.
     * @param byteLength - The needed memory in bytes.
     * @returns `true` if there is sufficient space and `false` otherwise.
     */
    available(byteLength = 1) {
      return this.offset + byteLength <= this.length;
    }
    /**
     * Check if little-endian mode is used for reading and writing multi-byte
     * values.
     * @returns `true` if little-endian mode is used, `false` otherwise.
     */
    isLittleEndian() {
      return this.littleEndian;
    }
    /**
     * Set little-endian mode for reading and writing multi-byte values.
     * @returns This.
     */
    setLittleEndian() {
      this.littleEndian = true;
      return this;
    }
    /**
     * Check if big-endian mode is used for reading and writing multi-byte values.
     * @returns `true` if big-endian mode is used, `false` otherwise.
     */
    isBigEndian() {
      return !this.littleEndian;
    }
    /**
     * Switches to big-endian mode for reading and writing multi-byte values.
     * @returns This.
     */
    setBigEndian() {
      this.littleEndian = false;
      return this;
    }
    /**
     * Move the pointer n bytes forward.
     * @param n - Number of bytes to skip.
     * @returns This.
     */
    skip(n = 1) {
      this.offset += n;
      return this;
    }
    /**
     * Move the pointer n bytes backward.
     * @param n - Number of bytes to move back.
     * @returns This.
     */
    back(n = 1) {
      this.offset -= n;
      return this;
    }
    /**
     * Move the pointer to the given offset.
     * @param offset - The offset to move to.
     * @returns This.
     */
    seek(offset) {
      this.offset = offset;
      return this;
    }
    /**
     * Store the current pointer offset.
     * @see {@link IOBuffer#reset}
     * @returns This.
     */
    mark() {
      this._mark = this.offset;
      return this;
    }
    /**
     * Move the pointer back to the last pointer offset set by mark.
     * @see {@link IOBuffer#mark}
     * @returns This.
     */
    reset() {
      this.offset = this._mark;
      return this;
    }
    /**
     * Push the current pointer offset to the mark stack.
     * @see {@link IOBuffer#popMark}
     * @returns This.
     */
    pushMark() {
      this._marks.push(this.offset);
      return this;
    }
    /**
     * Pop the last pointer offset from the mark stack, and set the current
     * pointer offset to the popped value.
     * @see {@link IOBuffer#pushMark}
     * @returns This.
     */
    popMark() {
      const offset = this._marks.pop();
      if (offset === void 0) {
        throw new Error("Mark stack empty");
      }
      this.seek(offset);
      return this;
    }
    /**
     * Move the pointer offset back to 0.
     * @returns This.
     */
    rewind() {
      this.offset = 0;
      return this;
    }
    /**
     * Make sure the buffer has sufficient memory to write a given byteLength at
     * the current pointer offset.
     * If the buffer's memory is insufficient, this method will create a new
     * buffer (a copy) with a length that is twice (byteLength + current offset).
     * @param byteLength - The needed memory in bytes.
     * @returns This.
     */
    ensureAvailable(byteLength = 1) {
      if (!this.available(byteLength)) {
        const lengthNeeded = this.offset + byteLength;
        const newLength = lengthNeeded * 2;
        const newArray = new Uint8Array(newLength);
        newArray.set(new Uint8Array(this.buffer));
        this.buffer = newArray.buffer;
        this.length = newLength;
        this.byteLength = newLength;
        this._data = new DataView(this.buffer);
      }
      return this;
    }
    /**
     * Read a byte and return false if the byte's value is 0, or true otherwise.
     * Moves pointer forward by one byte.
     * @returns The read boolean.
     */
    readBoolean() {
      return this.readUint8() !== 0;
    }
    /**
     * Read a signed 8-bit integer and move pointer forward by 1 byte.
     * @returns The read byte.
     */
    readInt8() {
      return this._data.getInt8(this.offset++);
    }
    /**
     * Read an unsigned 8-bit integer and move pointer forward by 1 byte.
     * @returns The read byte.
     */
    readUint8() {
      return this._data.getUint8(this.offset++);
    }
    /**
     * Alias for {@link IOBuffer#readUint8}.
     * @returns The read byte.
     */
    readByte() {
      return this.readUint8();
    }
    /**
     * Read `n` bytes and move pointer forward by `n` bytes.
     * @param n - Number of bytes to read.
     * @returns The read bytes.
     */
    readBytes(n = 1) {
      return this.readArray(n, "uint8");
    }
    /**
     * Creates an array of corresponding to the type `type` and size `size`.
     * For example, type `uint8` will create a `Uint8Array`.
     * @param size - size of the resulting array
     * @param type - number type of elements to read
     * @returns The read array.
     */
    readArray(size, type) {
      const bytes = typedArrays[type].BYTES_PER_ELEMENT * size;
      const offset = this.byteOffset + this.offset;
      const slice = this.buffer.slice(offset, offset + bytes);
      if (this.littleEndian === hostBigEndian && type !== "uint8" && type !== "int8") {
        const slice2 = new Uint8Array(this.buffer.slice(offset, offset + bytes));
        slice2.reverse();
        const returnArray2 = new typedArrays[type](slice2.buffer);
        this.offset += bytes;
        returnArray2.reverse();
        return returnArray2;
      }
      const returnArray = new typedArrays[type](slice);
      this.offset += bytes;
      return returnArray;
    }
    /**
     * Read a 16-bit signed integer and move pointer forward by 2 bytes.
     * @returns The read value.
     */
    readInt16() {
      const value = this._data.getInt16(this.offset, this.littleEndian);
      this.offset += 2;
      return value;
    }
    /**
     * Read a 16-bit unsigned integer and move pointer forward by 2 bytes.
     * @returns The read value.
     */
    readUint16() {
      const value = this._data.getUint16(this.offset, this.littleEndian);
      this.offset += 2;
      return value;
    }
    /**
     * Read a 32-bit signed integer and move pointer forward by 4 bytes.
     * @returns The read value.
     */
    readInt32() {
      const value = this._data.getInt32(this.offset, this.littleEndian);
      this.offset += 4;
      return value;
    }
    /**
     * Read a 32-bit unsigned integer and move pointer forward by 4 bytes.
     * @returns The read value.
     */
    readUint32() {
      const value = this._data.getUint32(this.offset, this.littleEndian);
      this.offset += 4;
      return value;
    }
    /**
     * Read a 32-bit floating number and move pointer forward by 4 bytes.
     * @returns The read value.
     */
    readFloat32() {
      const value = this._data.getFloat32(this.offset, this.littleEndian);
      this.offset += 4;
      return value;
    }
    /**
     * Read a 64-bit floating number and move pointer forward by 8 bytes.
     * @returns The read value.
     */
    readFloat64() {
      const value = this._data.getFloat64(this.offset, this.littleEndian);
      this.offset += 8;
      return value;
    }
    /**
     * Read a 64-bit signed integer number and move pointer forward by 8 bytes.
     * @returns The read value.
     */
    readBigInt64() {
      const value = this._data.getBigInt64(this.offset, this.littleEndian);
      this.offset += 8;
      return value;
    }
    /**
     * Read a 64-bit unsigned integer number and move pointer forward by 8 bytes.
     * @returns The read value.
     */
    readBigUint64() {
      const value = this._data.getBigUint64(this.offset, this.littleEndian);
      this.offset += 8;
      return value;
    }
    /**
     * Read a 1-byte ASCII character and move pointer forward by 1 byte.
     * @returns The read character.
     */
    readChar() {
      return String.fromCharCode(this.readInt8());
    }
    /**
     * Read `n` 1-byte ASCII characters and move pointer forward by `n` bytes.
     * @param n - Number of characters to read.
     * @returns The read characters.
     */
    readChars(n = 1) {
      let result = "";
      for (let i2 = 0; i2 < n; i2++) {
        result += this.readChar();
      }
      return result;
    }
    /**
     * Read the next `n` bytes, return a UTF-8 decoded string and move pointer
     * forward by `n` bytes.
     * @param n - Number of bytes to read.
     * @returns The decoded string.
     */
    readUtf8(n = 1) {
      return decode(this.readBytes(n));
    }
    /**
     * Read the next `n` bytes, return a string decoded with `encoding` and move pointer
     * forward by `n` bytes.
     * If no encoding is passed, the function is equivalent to @see {@link IOBuffer#readUtf8}
     * @param n - Number of bytes to read.
     * @param encoding - The encoding to use. Default is 'utf8'.
     * @returns The decoded string.
     */
    decodeText(n = 1, encoding = "utf8") {
      return decode(this.readBytes(n), encoding);
    }
    /**
     * Write 0xff if the passed value is truthy, 0x00 otherwise and move pointer
     * forward by 1 byte.
     * @param value - The value to write.
     * @returns This.
     */
    writeBoolean(value) {
      this.writeUint8(value ? 255 : 0);
      return this;
    }
    /**
     * Write `value` as an 8-bit signed integer and move pointer forward by 1 byte.
     * @param value - The value to write.
     * @returns This.
     */
    writeInt8(value) {
      this.ensureAvailable(1);
      this._data.setInt8(this.offset++, value);
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as an 8-bit unsigned integer and move pointer forward by 1
     * byte.
     * @param value - The value to write.
     * @returns This.
     */
    writeUint8(value) {
      this.ensureAvailable(1);
      this._data.setUint8(this.offset++, value);
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * An alias for {@link IOBuffer#writeUint8}.
     * @param value - The value to write.
     * @returns This.
     */
    writeByte(value) {
      return this.writeUint8(value);
    }
    /**
     * Write all elements of `bytes` as uint8 values and move pointer forward by
     * `bytes.length` bytes.
     * @param bytes - The array of bytes to write.
     * @returns This.
     */
    writeBytes(bytes) {
      this.ensureAvailable(bytes.length);
      for (let i2 = 0; i2 < bytes.length; i2++) {
        this._data.setUint8(this.offset++, bytes[i2]);
      }
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 16-bit signed integer and move pointer forward by 2
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeInt16(value) {
      this.ensureAvailable(2);
      this._data.setInt16(this.offset, value, this.littleEndian);
      this.offset += 2;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 16-bit unsigned integer and move pointer forward by 2
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeUint16(value) {
      this.ensureAvailable(2);
      this._data.setUint16(this.offset, value, this.littleEndian);
      this.offset += 2;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 32-bit signed integer and move pointer forward by 4
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeInt32(value) {
      this.ensureAvailable(4);
      this._data.setInt32(this.offset, value, this.littleEndian);
      this.offset += 4;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 32-bit unsigned integer and move pointer forward by 4
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeUint32(value) {
      this.ensureAvailable(4);
      this._data.setUint32(this.offset, value, this.littleEndian);
      this.offset += 4;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 32-bit floating number and move pointer forward by 4
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeFloat32(value) {
      this.ensureAvailable(4);
      this._data.setFloat32(this.offset, value, this.littleEndian);
      this.offset += 4;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 64-bit floating number and move pointer forward by 8
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeFloat64(value) {
      this.ensureAvailable(8);
      this._data.setFloat64(this.offset, value, this.littleEndian);
      this.offset += 8;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 64-bit signed bigint and move pointer forward by 8
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeBigInt64(value) {
      this.ensureAvailable(8);
      this._data.setBigInt64(this.offset, value, this.littleEndian);
      this.offset += 8;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write `value` as a 64-bit unsigned bigint and move pointer forward by 8
     * bytes.
     * @param value - The value to write.
     * @returns This.
     */
    writeBigUint64(value) {
      this.ensureAvailable(8);
      this._data.setBigUint64(this.offset, value, this.littleEndian);
      this.offset += 8;
      this._updateLastWrittenByte();
      return this;
    }
    /**
     * Write the charCode of `str`'s first character as an 8-bit unsigned integer
     * and move pointer forward by 1 byte.
     * @param str - The character to write.
     * @returns This.
     */
    writeChar(str) {
      return this.writeUint8(str.charCodeAt(0));
    }
    /**
     * Write the charCodes of all `str`'s characters as 8-bit unsigned integers
     * and move pointer forward by `str.length` bytes.
     * @param str - The characters to write.
     * @returns This.
     */
    writeChars(str) {
      for (let i2 = 0; i2 < str.length; i2++) {
        this.writeUint8(str.charCodeAt(i2));
      }
      return this;
    }
    /**
     * UTF-8 encode and write `str` to the current pointer offset and move pointer
     * forward according to the encoded length.
     * @param str - The string to write.
     * @returns This.
     */
    writeUtf8(str) {
      return this.writeBytes(encode(str));
    }
    /**
     * Export a Uint8Array view of the internal buffer.
     * The view starts at the byte offset and its length
     * is calculated to stop at the last written byte or the original length.
     * @returns A new Uint8Array view.
     */
    toArray() {
      return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
    }
    /**
     *  Get the total number of bytes written so far, regardless of the current offset.
     * @returns - Total number of bytes.
     */
    getWrittenByteLength() {
      return this.lastWrittenByte - this.byteOffset;
    }
    /**
     * Update the last written byte offset
     * @private
     */
    _updateLastWrittenByte() {
      if (this.offset > this.lastWrittenByte) {
        this.lastWrittenByte = this.offset;
      }
    }
  };

  // node_modules/fast-png/lib/helpers/crc.js
  var crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 3988292384 ^ c >>> 1;
      } else {
        c = c >>> 1;
      }
    }
    crcTable[n] = c;
  }
  var initialCrc = 4294967295;
  function updateCrc(currentCrc, data, length2) {
    let c = currentCrc;
    for (let n = 0; n < length2; n++) {
      c = crcTable[(c ^ data[n]) & 255] ^ c >>> 8;
    }
    return c;
  }
  function crc(data, length2) {
    return (updateCrc(initialCrc, data, length2) ^ initialCrc) >>> 0;
  }
  function checkCrc(buffer, crcLength, chunkName) {
    const expectedCrc = buffer.readUint32();
    const actualCrc = crc(new Uint8Array(buffer.buffer, buffer.byteOffset + buffer.offset - crcLength - 4, crcLength), crcLength);
    if (actualCrc !== expectedCrc) {
      throw new Error(`CRC mismatch for chunk ${chunkName}. Expected ${expectedCrc}, found ${actualCrc}`);
    }
  }

  // node_modules/fast-png/lib/helpers/unfilter.js
  function unfilterNone(currentLine, newLine, bytesPerLine) {
    for (let i2 = 0; i2 < bytesPerLine; i2++) {
      newLine[i2] = currentLine[i2];
    }
  }
  function unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    for (; i2 < bytesPerPixel; i2++) {
      newLine[i2] = currentLine[i2];
    }
    for (; i2 < bytesPerLine; i2++) {
      newLine[i2] = currentLine[i2] + newLine[i2 - bytesPerPixel] & 255;
    }
  }
  function unfilterUp(currentLine, newLine, prevLine, bytesPerLine) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2];
      }
    } else {
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + prevLine[i2] & 255;
      }
    }
  }
  function unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2];
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + (newLine[i2 - bytesPerPixel] >> 1) & 255;
      }
    } else {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2] + (prevLine[i2] >> 1) & 255;
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + (newLine[i2 - bytesPerPixel] + prevLine[i2] >> 1) & 255;
      }
    }
  }
  function unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2];
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + newLine[i2 - bytesPerPixel] & 255;
      }
    } else {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2] + prevLine[i2] & 255;
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + paethPredictor(newLine[i2 - bytesPerPixel], prevLine[i2], prevLine[i2 - bytesPerPixel]) & 255;
      }
    }
  }
  function paethPredictor(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc)
      return a;
    else if (pb <= pc)
      return b;
    else
      return c;
  }

  // node_modules/fast-png/lib/helpers/apply_unfilter.js
  function applyUnfilter(filterType, currentLine, newLine, prevLine, passLineBytes, bytesPerPixel) {
    switch (filterType) {
      case 0:
        unfilterNone(currentLine, newLine, passLineBytes);
        break;
      case 1:
        unfilterSub(currentLine, newLine, passLineBytes, bytesPerPixel);
        break;
      case 2:
        unfilterUp(currentLine, newLine, prevLine, passLineBytes);
        break;
      case 3:
        unfilterAverage(currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        break;
      case 4:
        unfilterPaeth(currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        break;
      default:
        throw new Error(`Unsupported filter: ${filterType}`);
    }
  }

  // node_modules/fast-png/lib/helpers/decode_interlace_adam7.js
  var uint16 = new Uint16Array([255]);
  var uint8 = new Uint8Array(uint16.buffer);
  var osIsLittleEndian = uint8[0] === 255;
  function decodeInterlaceAdam7(params) {
    const { data, width, height, channels, depth } = params;
    const passes = [
      { x: 0, y: 0, xStep: 8, yStep: 8 },
      // Pass 1
      { x: 4, y: 0, xStep: 8, yStep: 8 },
      // Pass 2
      { x: 0, y: 4, xStep: 4, yStep: 8 },
      // Pass 3
      { x: 2, y: 0, xStep: 4, yStep: 4 },
      // Pass 4
      { x: 0, y: 2, xStep: 2, yStep: 4 },
      // Pass 5
      { x: 1, y: 0, xStep: 2, yStep: 2 },
      // Pass 6
      { x: 0, y: 1, xStep: 1, yStep: 2 }
      // Pass 7
    ];
    const bytesPerPixel = Math.ceil(depth / 8) * channels;
    const resultData = new Uint8Array(height * width * bytesPerPixel);
    let offset = 0;
    for (let passIndex = 0; passIndex < 7; passIndex++) {
      const pass = passes[passIndex];
      const passWidth = Math.ceil((width - pass.x) / pass.xStep);
      const passHeight = Math.ceil((height - pass.y) / pass.yStep);
      if (passWidth <= 0 || passHeight <= 0)
        continue;
      const passLineBytes = passWidth * bytesPerPixel;
      const prevLine = new Uint8Array(passLineBytes);
      for (let y = 0; y < passHeight; y++) {
        const filterType = data[offset++];
        const currentLine = data.subarray(offset, offset + passLineBytes);
        offset += passLineBytes;
        const newLine = new Uint8Array(passLineBytes);
        applyUnfilter(filterType, currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        prevLine.set(newLine);
        for (let x2 = 0; x2 < passWidth; x2++) {
          const outputX = pass.x + x2 * pass.xStep;
          const outputY = pass.y + y * pass.yStep;
          if (outputX >= width || outputY >= height)
            continue;
          for (let i2 = 0; i2 < bytesPerPixel; i2++) {
            resultData[(outputY * width + outputX) * bytesPerPixel + i2] = newLine[x2 * bytesPerPixel + i2];
          }
        }
      }
    }
    if (depth === 16) {
      const uint16Data = new Uint16Array(resultData.buffer);
      if (osIsLittleEndian) {
        for (let k = 0; k < uint16Data.length; k++) {
          uint16Data[k] = swap16(uint16Data[k]);
        }
      }
      return uint16Data;
    } else {
      return resultData;
    }
  }
  function swap16(val) {
    return (val & 255) << 8 | val >> 8 & 255;
  }

  // node_modules/fast-png/lib/helpers/decode_interlace_null.js
  var uint162 = new Uint16Array([255]);
  var uint82 = new Uint8Array(uint162.buffer);
  var osIsLittleEndian2 = uint82[0] === 255;
  var empty = new Uint8Array(0);
  function decodeInterlaceNull(params) {
    const { data, width, height, channels, depth } = params;
    const bytesPerPixel = Math.ceil(depth / 8) * channels;
    const bytesPerLine = Math.ceil(depth / 8 * channels * width);
    const newData = new Uint8Array(height * bytesPerLine);
    let prevLine = empty;
    let offset = 0;
    let currentLine;
    let newLine;
    for (let i2 = 0; i2 < height; i2++) {
      currentLine = data.subarray(offset + 1, offset + 1 + bytesPerLine);
      newLine = newData.subarray(i2 * bytesPerLine, (i2 + 1) * bytesPerLine);
      switch (data[offset]) {
        case 0:
          unfilterNone(currentLine, newLine, bytesPerLine);
          break;
        case 1:
          unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel);
          break;
        case 2:
          unfilterUp(currentLine, newLine, prevLine, bytesPerLine);
          break;
        case 3:
          unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
          break;
        case 4:
          unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
          break;
        default:
          throw new Error(`Unsupported filter: ${data[offset]}`);
      }
      prevLine = newLine;
      offset += bytesPerLine + 1;
    }
    if (depth === 16) {
      const uint16Data = new Uint16Array(newData.buffer);
      if (osIsLittleEndian2) {
        for (let k = 0; k < uint16Data.length; k++) {
          uint16Data[k] = swap162(uint16Data[k]);
        }
      }
      return uint16Data;
    } else {
      return newData;
    }
  }
  function swap162(val) {
    return (val & 255) << 8 | val >> 8 & 255;
  }

  // node_modules/fast-png/lib/helpers/signature.js
  var pngSignature = Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10);
  function checkSignature(buffer) {
    if (!hasPngSignature(buffer.readBytes(pngSignature.length))) {
      throw new Error("wrong PNG signature");
    }
  }
  function hasPngSignature(array) {
    if (array.length < pngSignature.length) {
      return false;
    }
    for (let i2 = 0; i2 < pngSignature.length; i2++) {
      if (array[i2] !== pngSignature[i2]) {
        return false;
      }
    }
    return true;
  }

  // node_modules/fast-png/lib/helpers/text.js
  var textChunkName = "tEXt";
  var NULL = 0;
  var latin1Decoder = new TextDecoder("latin1");
  function validateKeyword(keyword) {
    validateLatin1(keyword);
    if (keyword.length === 0 || keyword.length > 79) {
      throw new Error("keyword length must be between 1 and 79");
    }
  }
  var latin1Regex = /^[\u0000-\u00FF]*$/;
  function validateLatin1(text) {
    if (!latin1Regex.test(text)) {
      throw new Error("invalid latin1 text");
    }
  }
  function decodetEXt(text, buffer, length2) {
    const keyword = readKeyword(buffer);
    text[keyword] = readLatin1(buffer, length2 - keyword.length - 1);
  }
  function readKeyword(buffer) {
    buffer.mark();
    while (buffer.readByte() !== NULL) {
    }
    const end = buffer.offset;
    buffer.reset();
    const keyword = latin1Decoder.decode(buffer.readBytes(end - buffer.offset - 1));
    buffer.skip(1);
    validateKeyword(keyword);
    return keyword;
  }
  function readLatin1(buffer, length2) {
    return latin1Decoder.decode(buffer.readBytes(length2));
  }

  // node_modules/fast-png/lib/internal_types.js
  var ColorType = {
    UNKNOWN: -1,
    GREYSCALE: 0,
    TRUECOLOUR: 2,
    INDEXED_COLOUR: 3,
    GREYSCALE_ALPHA: 4,
    TRUECOLOUR_ALPHA: 6
  };
  var CompressionMethod = {
    UNKNOWN: -1,
    DEFLATE: 0
  };
  var FilterMethod = {
    UNKNOWN: -1,
    ADAPTIVE: 0
  };
  var InterlaceMethod = {
    UNKNOWN: -1,
    NO_INTERLACE: 0,
    ADAM7: 1
  };
  var DisposeOpType = {
    NONE: 0,
    BACKGROUND: 1,
    PREVIOUS: 2
  };
  var BlendOpType = {
    SOURCE: 0,
    OVER: 1
  };

  // node_modules/fast-png/lib/png_decoder.js
  var PngDecoder = class extends IOBuffer {
    _checkCrc;
    _inflator;
    _png;
    _apng;
    _end;
    _hasPalette;
    _palette;
    _hasTransparency;
    _transparency;
    _compressionMethod;
    _filterMethod;
    _interlaceMethod;
    _colorType;
    _isAnimated;
    _numberOfFrames;
    _numberOfPlays;
    _frames;
    _writingDataChunks;
    _chunks;
    _inflatorResult;
    constructor(data, options = {}) {
      super(data);
      const { checkCrc: checkCrc2 = false } = options;
      this._checkCrc = checkCrc2;
      this._inflator = new Unzlib((chunk, final) => {
        this._chunks.push(chunk);
        if (final) {
          const totalLength = this._chunks.reduce((sum, c) => sum + c.length, 0);
          this._inflatorResult = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk2 of this._chunks) {
            this._inflatorResult.set(chunk2, offset);
            offset += chunk2.length;
          }
          this._chunks = [];
        }
      });
      this._chunks = [];
      this._png = {
        width: -1,
        height: -1,
        channels: -1,
        data: new Uint8Array(0),
        depth: 1,
        text: {}
      };
      this._apng = {
        width: -1,
        height: -1,
        channels: -1,
        depth: 1,
        numberOfFrames: 1,
        numberOfPlays: 0,
        text: {},
        frames: []
      };
      this._end = false;
      this._hasPalette = false;
      this._palette = [];
      this._hasTransparency = false;
      this._transparency = new Uint16Array(0);
      this._compressionMethod = CompressionMethod.UNKNOWN;
      this._filterMethod = FilterMethod.UNKNOWN;
      this._interlaceMethod = InterlaceMethod.UNKNOWN;
      this._colorType = ColorType.UNKNOWN;
      this._isAnimated = false;
      this._numberOfFrames = 1;
      this._numberOfPlays = 0;
      this._frames = [];
      this._writingDataChunks = false;
      this._inflatorResult = new Uint8Array(0);
      this.setBigEndian();
    }
    decode() {
      checkSignature(this);
      while (!this._end) {
        const length2 = this.readUint32();
        const type = this.readChars(4);
        this.decodeChunk(length2, type);
      }
      this._inflator.push(new Uint8Array(0), true);
      this.decodeImage();
      return this._png;
    }
    decodeApng() {
      checkSignature(this);
      while (!this._end) {
        const length2 = this.readUint32();
        const type = this.readChars(4);
        this.decodeApngChunk(length2, type);
      }
      this.decodeApngImage();
      return this._apng;
    }
    // https://www.w3.org/TR/PNG/#5Chunk-layout
    decodeChunk(length2, type) {
      const offset = this.offset;
      switch (type) {
        // 11.2 Critical chunks
        case "IHDR":
          this.decodeIHDR();
          break;
        case "PLTE":
          this.decodePLTE(length2);
          break;
        case "IDAT":
          this.decodeIDAT(length2);
          break;
        case "IEND":
          this._end = true;
          break;
        // 11.3 Ancillary chunks
        case "tRNS":
          this.decodetRNS(length2);
          break;
        case "iCCP":
          this.decodeiCCP(length2);
          break;
        case textChunkName:
          decodetEXt(this._png.text, this, length2);
          break;
        case "pHYs":
          this.decodepHYs();
          break;
        default:
          this.skip(length2);
          break;
      }
      if (this.offset - offset !== length2) {
        throw new Error(`Length mismatch while decoding chunk ${type}`);
      }
      if (this._checkCrc) {
        checkCrc(this, length2 + 4, type);
      } else {
        this.skip(4);
      }
    }
    decodeApngChunk(length2, type) {
      const offset = this.offset;
      if (type !== "fdAT" && type !== "IDAT" && this._writingDataChunks) {
        this.pushDataToFrame();
      }
      switch (type) {
        case "acTL":
          this.decodeACTL();
          break;
        case "fcTL":
          this.decodeFCTL();
          break;
        case "fdAT":
          this.decodeFDAT(length2);
          break;
        default:
          this.decodeChunk(length2, type);
          this.offset = offset + length2;
          break;
      }
      if (this.offset - offset !== length2) {
        throw new Error(`Length mismatch while decoding chunk ${type}`);
      }
      if (this._checkCrc) {
        checkCrc(this, length2 + 4, type);
      } else {
        this.skip(4);
      }
    }
    // https://www.w3.org/TR/PNG/#11IHDR
    decodeIHDR() {
      const image = this._png;
      image.width = this.readUint32();
      image.height = this.readUint32();
      image.depth = checkBitDepth(this.readUint8());
      const colorType = this.readUint8();
      this._colorType = colorType;
      let channels;
      switch (colorType) {
        case ColorType.GREYSCALE:
          channels = 1;
          break;
        case ColorType.TRUECOLOUR:
          channels = 3;
          break;
        case ColorType.INDEXED_COLOUR:
          channels = 1;
          break;
        case ColorType.GREYSCALE_ALPHA:
          channels = 2;
          break;
        case ColorType.TRUECOLOUR_ALPHA:
          channels = 4;
          break;
        // Kept for exhaustiveness.
        // eslint-disable-next-line unicorn/no-useless-switch-case
        case ColorType.UNKNOWN:
        default:
          throw new Error(`Unknown color type: ${colorType}`);
      }
      this._png.channels = channels;
      this._compressionMethod = this.readUint8();
      if (this._compressionMethod !== CompressionMethod.DEFLATE) {
        throw new Error(`Unsupported compression method: ${this._compressionMethod}`);
      }
      this._filterMethod = this.readUint8();
      this._interlaceMethod = this.readUint8();
    }
    decodeACTL() {
      this._numberOfFrames = this.readUint32();
      this._numberOfPlays = this.readUint32();
      this._isAnimated = true;
    }
    decodeFCTL() {
      const image = {
        sequenceNumber: this.readUint32(),
        width: this.readUint32(),
        height: this.readUint32(),
        xOffset: this.readUint32(),
        yOffset: this.readUint32(),
        delayNumber: this.readUint16(),
        delayDenominator: this.readUint16(),
        disposeOp: this.readUint8(),
        blendOp: this.readUint8(),
        data: new Uint8Array(0)
      };
      this._frames.push(image);
    }
    // https://www.w3.org/TR/PNG/#11PLTE
    decodePLTE(length2) {
      if (length2 % 3 !== 0) {
        throw new RangeError(`PLTE field length must be a multiple of 3. Got ${length2}`);
      }
      const l = length2 / 3;
      this._hasPalette = true;
      const palette = [];
      this._palette = palette;
      for (let i2 = 0; i2 < l; i2++) {
        palette.push([this.readUint8(), this.readUint8(), this.readUint8()]);
      }
    }
    // https://www.w3.org/TR/PNG/#11IDAT
    decodeIDAT(length2) {
      this._writingDataChunks = true;
      const dataLength = length2;
      const dataOffset = this.offset + this.byteOffset;
      try {
        this._inflator.push(new Uint8Array(this.buffer, dataOffset, dataLength), false);
      } catch (error) {
        throw new Error("Error while decompressing the data:", { cause: error });
      }
      this.skip(length2);
    }
    decodeFDAT(length2) {
      this._writingDataChunks = true;
      let dataLength = length2;
      let dataOffset = this.offset + this.byteOffset;
      dataOffset += 4;
      dataLength -= 4;
      try {
        this._inflator.push(new Uint8Array(this.buffer, dataOffset, dataLength), false);
      } catch (error) {
        throw new Error("Error while decompressing the data:", { cause: error });
      }
      this.skip(length2);
    }
    // https://www.w3.org/TR/PNG/#11tRNS
    decodetRNS(length2) {
      switch (this._colorType) {
        case ColorType.GREYSCALE:
        case ColorType.TRUECOLOUR: {
          if (length2 % 2 !== 0) {
            throw new RangeError(`tRNS chunk length must be a multiple of 2. Got ${length2}`);
          }
          if (length2 / 2 > this._png.width * this._png.height) {
            throw new Error(`tRNS chunk contains more alpha values than there are pixels (${length2 / 2} vs ${this._png.width * this._png.height})`);
          }
          this._hasTransparency = true;
          this._transparency = new Uint16Array(length2 / 2);
          for (let i2 = 0; i2 < length2 / 2; i2++) {
            this._transparency[i2] = this.readUint16();
          }
          break;
        }
        case ColorType.INDEXED_COLOUR: {
          if (length2 > this._palette.length) {
            throw new Error(`tRNS chunk contains more alpha values than there are palette colors (${length2} vs ${this._palette.length})`);
          }
          let i2 = 0;
          for (; i2 < length2; i2++) {
            const alpha = this.readByte();
            this._palette[i2].push(alpha);
          }
          for (; i2 < this._palette.length; i2++) {
            this._palette[i2].push(255);
          }
          break;
        }
        // Kept for exhaustiveness.
        /* eslint-disable unicorn/no-useless-switch-case */
        case ColorType.UNKNOWN:
        case ColorType.GREYSCALE_ALPHA:
        case ColorType.TRUECOLOUR_ALPHA:
        default: {
          throw new Error(`tRNS chunk is not supported for color type ${this._colorType}`);
        }
      }
    }
    // https://www.w3.org/TR/PNG/#11iCCP
    decodeiCCP(length2) {
      const name = readKeyword(this);
      const compressionMethod = this.readUint8();
      if (compressionMethod !== CompressionMethod.DEFLATE) {
        throw new Error(`Unsupported iCCP compression method: ${compressionMethod}`);
      }
      const compressedProfile = this.readBytes(length2 - name.length - 2);
      this._png.iccEmbeddedProfile = {
        name,
        profile: unzlibSync(compressedProfile)
      };
    }
    // https://www.w3.org/TR/PNG/#11pHYs
    decodepHYs() {
      const ppuX = this.readUint32();
      const ppuY = this.readUint32();
      const unitSpecifier = this.readByte();
      this._png.resolution = {
        x: ppuX,
        y: ppuY,
        unit: unitSpecifier
      };
    }
    decodeApngImage() {
      this._apng.width = this._png.width;
      this._apng.height = this._png.height;
      this._apng.channels = this._png.channels;
      this._apng.depth = this._png.depth;
      this._apng.numberOfFrames = this._numberOfFrames;
      this._apng.numberOfPlays = this._numberOfPlays;
      this._apng.text = this._png.text;
      this._apng.resolution = this._png.resolution;
      for (let i2 = 0; i2 < this._numberOfFrames; i2++) {
        const newFrame = {
          sequenceNumber: this._frames[i2].sequenceNumber,
          delayNumber: this._frames[i2].delayNumber,
          delayDenominator: this._frames[i2].delayDenominator,
          data: this._apng.depth === 8 ? new Uint8Array(this._apng.width * this._apng.height * this._apng.channels) : new Uint16Array(this._apng.width * this._apng.height * this._apng.channels)
        };
        const frame = this._frames.at(i2);
        if (frame) {
          frame.data = decodeInterlaceNull({
            data: frame.data,
            width: frame.width,
            height: frame.height,
            channels: this._apng.channels,
            depth: this._apng.depth
          });
          if (this._hasPalette) {
            this._apng.palette = this._palette;
          }
          if (this._hasTransparency) {
            this._apng.transparency = this._transparency;
          }
          if (i2 === 0 || frame.xOffset === 0 && frame.yOffset === 0 && frame.width === this._png.width && frame.height === this._png.height) {
            newFrame.data = frame.data;
          } else {
            const prevFrame = this._apng.frames.at(i2 - 1);
            this.disposeFrame(frame, prevFrame, newFrame);
            this.addFrameDataToCanvas(newFrame, frame);
          }
          this._apng.frames.push(newFrame);
        }
      }
      return this._apng;
    }
    disposeFrame(frame, prevFrame, imageFrame) {
      switch (frame.disposeOp) {
        case DisposeOpType.NONE:
          break;
        case DisposeOpType.BACKGROUND:
          for (let row = 0; row < this._png.height; row++) {
            for (let col = 0; col < this._png.width; col++) {
              const index = (row * frame.width + col) * this._png.channels;
              for (let channel = 0; channel < this._png.channels; channel++) {
                imageFrame.data[index + channel] = 0;
              }
            }
          }
          break;
        case DisposeOpType.PREVIOUS:
          imageFrame.data.set(prevFrame.data);
          break;
        default:
          throw new Error("Unknown disposeOp");
      }
    }
    addFrameDataToCanvas(imageFrame, frame) {
      const maxValue = 1 << this._png.depth;
      const calculatePixelIndices = (row, col) => {
        const index = ((row + frame.yOffset) * this._png.width + frame.xOffset + col) * this._png.channels;
        const frameIndex = (row * frame.width + col) * this._png.channels;
        return { index, frameIndex };
      };
      switch (frame.blendOp) {
        case BlendOpType.SOURCE:
          for (let row = 0; row < frame.height; row++) {
            for (let col = 0; col < frame.width; col++) {
              const { index, frameIndex } = calculatePixelIndices(row, col);
              for (let channel = 0; channel < this._png.channels; channel++) {
                imageFrame.data[index + channel] = frame.data[frameIndex + channel];
              }
            }
          }
          break;
        // https://www.w3.org/TR/png-3/#13Alpha-channel-processing
        case BlendOpType.OVER:
          for (let row = 0; row < frame.height; row++) {
            for (let col = 0; col < frame.width; col++) {
              const { index, frameIndex } = calculatePixelIndices(row, col);
              for (let channel = 0; channel < this._png.channels; channel++) {
                const sourceAlpha = frame.data[frameIndex + this._png.channels - 1] / maxValue;
                const foregroundValue = channel % (this._png.channels - 1) === 0 ? 1 : frame.data[frameIndex + channel];
                const value = Math.floor(sourceAlpha * foregroundValue + (1 - sourceAlpha) * imageFrame.data[index + channel]);
                imageFrame.data[index + channel] += value;
              }
            }
          }
          break;
        default:
          throw new Error("Unknown blendOp");
      }
    }
    decodeImage() {
      const data = this._inflatorResult;
      if (this._filterMethod !== FilterMethod.ADAPTIVE) {
        throw new Error(`Filter method ${this._filterMethod} not supported`);
      }
      if (this._interlaceMethod === InterlaceMethod.NO_INTERLACE) {
        this._png.data = decodeInterlaceNull({
          data,
          width: this._png.width,
          height: this._png.height,
          channels: this._png.channels,
          depth: this._png.depth
        });
      } else if (this._interlaceMethod === InterlaceMethod.ADAM7) {
        this._png.data = decodeInterlaceAdam7({
          data,
          width: this._png.width,
          height: this._png.height,
          channels: this._png.channels,
          depth: this._png.depth
        });
      } else {
        throw new Error(`Interlace method ${this._interlaceMethod} not supported`);
      }
      if (this._hasPalette) {
        this._png.palette = this._palette;
      }
      if (this._hasTransparency) {
        this._png.transparency = this._transparency;
      }
    }
    pushDataToFrame() {
      this._inflator.push(new Uint8Array(0), true);
      const result = this._inflatorResult;
      const lastFrame = this._frames.at(-1);
      if (lastFrame) {
        lastFrame.data = result;
      } else {
        this._frames.push({
          sequenceNumber: 0,
          width: this._png.width,
          height: this._png.height,
          xOffset: 0,
          yOffset: 0,
          delayNumber: 0,
          delayDenominator: 0,
          disposeOp: DisposeOpType.NONE,
          blendOp: BlendOpType.SOURCE,
          data: result
        });
      }
      this._inflator = new Unzlib((chunk, final) => {
        this._chunks.push(chunk);
        if (final) {
          const totalLength = this._chunks.reduce((sum, c) => sum + c.length, 0);
          this._inflatorResult = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk2 of this._chunks) {
            this._inflatorResult.set(chunk2, offset);
            offset += chunk2.length;
          }
          this._chunks = [];
        }
      });
      this._chunks = [];
      this._writingDataChunks = false;
    }
  };
  function checkBitDepth(value) {
    if (value !== 1 && value !== 2 && value !== 4 && value !== 8 && value !== 16) {
      throw new Error(`invalid bit depth: ${value}`);
    }
    return value;
  }

  // node_modules/fast-png/lib/convert_indexed_to_rgb.js
  function convertIndexedToRgb(decodedImage) {
    const palette = decodedImage.palette;
    const depth = decodedImage.depth;
    if (!palette) {
      throw new Error("Color palette is undefined.");
    }
    checkDataSize(decodedImage);
    const indexSize = decodedImage.width * decodedImage.height;
    const resSize = indexSize * palette[0].length;
    const res = new Uint8Array(resSize);
    let indexPos = 0;
    let offset = 0;
    const indexes = new Uint8Array(indexSize);
    let bit = 255;
    switch (depth) {
      case 1:
        bit = 128;
        break;
      case 2:
        bit = 192;
        break;
      case 4:
        bit = 240;
        break;
      case 8:
        bit = 255;
        break;
      default:
        throw new Error("Incorrect depth value");
    }
    for (const byte of decodedImage.data) {
      let bit2 = bit;
      let shift = 8;
      while (bit2) {
        shift -= depth;
        indexes[indexPos++] = (byte & bit2) >> shift;
        bit2 = bit2 >> depth;
        if (indexPos % decodedImage.width === 0) {
          break;
        }
      }
    }
    if (decodedImage.palette) {
      for (const index of indexes) {
        const color = decodedImage.palette.at(index);
        if (!color) {
          throw new Error("Incorrect index of palette color");
        }
        res.set(color, offset);
        offset += color.length;
      }
    }
    return res;
  }
  function checkDataSize(image) {
    const expectedSize = image.depth < 8 ? Math.ceil(image.width * image.depth / 8) * image.height * image.channels : image.width * image.height * image.channels;
    if (image.data.length !== expectedSize) {
      throw new RangeError(`wrong data size. Found ${image.data.length}, expected ${expectedSize}`);
    }
  }

  // node_modules/fast-png/lib/index.js
  function decodePng(data, options) {
    const decoder = new PngDecoder(data, options);
    return decoder.decode();
  }

  // src/render/raster/bitmap.js
  var import_jpeg_js = __toESM(require_jpeg_js(), 1);
  var toRgba = (decoded) => {
    const { width, height } = decoded;
    const pixels = width * height;
    const out = new Uint8ClampedArray(pixels * 4);
    if (decoded.palette) {
      const rgb = convertIndexedToRgb(decoded);
      const channels2 = rgb.length / pixels;
      for (let i2 = 0; i2 < pixels; i2++) {
        out[i2 * 4] = rgb[i2 * channels2];
        out[i2 * 4 + 1] = rgb[i2 * channels2 + 1];
        out[i2 * 4 + 2] = rgb[i2 * channels2 + 2];
        out[i2 * 4 + 3] = channels2 === 4 ? rgb[i2 * channels2 + 3] : 255;
      }
      return out;
    }
    const { data, channels, depth } = decoded;
    const shift = depth === 16 ? 8 : 0;
    const scaleLow = depth < 8 ? 255 / ((1 << depth) - 1) : 1;
    const read = (index) => shift ? data[index] >> shift : data[index] * scaleLow;
    for (let i2 = 0; i2 < pixels; i2++) {
      const at = i2 * channels;
      if (channels <= 2) {
        const gray = read(at);
        out[i2 * 4] = gray;
        out[i2 * 4 + 1] = gray;
        out[i2 * 4 + 2] = gray;
        out[i2 * 4 + 3] = channels === 2 ? read(at + 1) : 255;
      } else {
        out[i2 * 4] = read(at);
        out[i2 * 4 + 1] = read(at + 1);
        out[i2 * 4 + 2] = read(at + 2);
        out[i2 * 4 + 3] = channels === 4 ? read(at + 3) : 255;
      }
    }
    return out;
  };
  function decodeBitmap(bytes, format) {
    const kind = String(format).toLowerCase();
    if (kind === "png") {
      const decoded = decodePng(bytes);
      return { width: decoded.width, height: decoded.height, data: toRgba(decoded) };
    }
    if (kind === "jpg" || kind === "jpeg") {
      const decoded = import_jpeg_js.default.decode(bytes, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 1024 });
      return { width: decoded.width, height: decoded.height, data: new Uint8ClampedArray(decoded.data) };
    }
    throw new Error(`unsupported bitmap format ${format}`);
  }
  function upscaleNearest2x({ width, height, data }) {
    const out = new Uint8ClampedArray(width * height * 16);
    const source = new Uint32Array(data.buffer, data.byteOffset, width * height);
    const target = new Uint32Array(out.buffer);
    const outWidth = width * 2;
    for (let y = 0; y < height; y++) {
      for (let x2 = 0; x2 < width; x2++) {
        const pixel = source[y * width + x2];
        const at = y * 2 * outWidth + x2 * 2;
        target[at] = pixel;
        target[at + 1] = pixel;
        target[at + outWidth] = pixel;
        target[at + outWidth + 1] = pixel;
      }
    }
    return { width: outWidth, height: height * 2, data: out };
  }

  // src/render/costumes.js
  var decodeText = (bytes) => typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
  function skinCostume(renderer, costume, bytes) {
    const format = String(costume.dataFormat).toLowerCase();
    const hasCenter = typeof costume.rotationCenterX === "number" && !Number.isNaN(costume.rotationCenterX) && typeof costume.rotationCenterY === "number" && !Number.isNaN(costume.rotationCenterY);
    if (format === "svg") {
      const skinId2 = renderer.createSVGSkin(decodeText(bytes), hasCenter ? [costume.rotationCenterX, costume.rotationCenterY] : void 0);
      costume.skinId = skinId2;
      costume.size = renderer.getSkinSize(skinId2);
      if (!hasCenter) {
        [costume.rotationCenterX, costume.rotationCenterY] = renderer.getSkinRotationCenter(skinId2);
        costume.bitmapResolution = 1;
      }
      return skinId2;
    }
    let bitmap = decodeBitmap(bytes, format);
    const scale = costume.bitmapResolution === 1 ? 2 : 1;
    if (scale === 2) bitmap = upscaleNearest2x(bitmap);
    let center;
    if (hasCenter) {
      costume.rotationCenterX *= scale;
      costume.rotationCenterY *= scale;
      center = [costume.rotationCenterX / 2, costume.rotationCenterY / 2];
    }
    costume.bitmapResolution = 2;
    const skinId = renderer.createBitmapSkin(bitmap, 2, center);
    costume.skinId = skinId;
    const size = renderer.getSkinSize(skinId);
    costume.size = [size[0] * 2, size[1] * 2];
    if (!hasCenter) {
      const rotation = renderer.getSkinRotationCenter(skinId);
      costume.rotationCenterX = rotation[0] * 2;
      costume.rotationCenterY = rotation[1] * 2;
    }
    return skinId;
  }

  // src/render/cpu-renderer.js
  var import_hull = __toESM(require_hull(), 1);

  // src/render/pixels.js
  var BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var toBase64 = (bytes) => {
    let out = "";
    let i2 = 0;
    for (; i2 + 2 < bytes.length; i2 += 3) {
      const n = bytes[i2] << 16 | bytes[i2 + 1] << 8 | bytes[i2 + 2];
      out += BASE64[n >> 18] + BASE64[n >> 12 & 63] + BASE64[n >> 6 & 63] + BASE64[n & 63];
    }
    if (i2 < bytes.length) {
      const n = bytes[i2] << 16 | (bytes[i2 + 1] ?? 0) << 8;
      out += BASE64[n >> 18] + BASE64[n >> 12 & 63] + (i2 + 1 < bytes.length ? BASE64[n >> 6 & 63] : "=") + "=";
    }
    return out;
  };
  var fromBase64 = (text) => {
    const clean = text.replace(/=+$/, "");
    const bytes = new Uint8Array(Math.floor(clean.length * 3 / 4));
    let at = 0;
    for (let i2 = 0; i2 < clean.length; i2 += 4) {
      const n = BASE64.indexOf(clean[i2]) << 18 | BASE64.indexOf(clean[i2 + 1]) << 12 | (BASE64.indexOf(clean[i2 + 2] ?? "A") & 63) << 6 | BASE64.indexOf(clean[i2 + 3] ?? "A") & 63;
      if (at < bytes.length) bytes[at++] = n >> 16;
      if (at < bytes.length) bytes[at++] = n >> 8 & 255;
      if (at < bytes.length) bytes[at++] = n & 255;
    }
    return bytes;
  };
  function packPixels(pixels) {
    const words2 = new Uint32Array(pixels.buffer, pixels.byteOffset, pixels.length / 4);
    const runs = [];
    let i2 = 0;
    while (i2 < words2.length) {
      const word = words2[i2];
      let end = i2 + 1;
      while (end < words2.length && words2[end] === word && end - i2 < 4294967295) end++;
      runs.push(end - i2, word);
      i2 = end;
    }
    return toBase64(new Uint8Array(new Uint32Array(runs).buffer));
  }
  function unpackPixels(text, into) {
    const bytes = fromBase64(text);
    const runs = new Uint32Array(bytes.buffer, 0, bytes.length / 4);
    const words2 = new Uint32Array(into.buffer, into.byteOffset, into.length / 4);
    let at = 0;
    for (let i2 = 0; i2 < runs.length; i2 += 2) {
      words2.fill(runs[i2 + 1], at, at + runs[i2]);
      at += runs[i2];
    }
    if (at !== words2.length) throw new Error(`pixel data covers ${at} of ${words2.length} pixels`);
    return into;
  }

  // src/render/cpu-renderer.js
  var FENCE_WIDTH = 15;
  var MAX_TOUCH_SIZE = [3, 3];
  var touchingPoint = v3.create();
  var candidatesBounds = new Rectangle();
  var fenceBounds = new Rectangle();
  var touchingColor = new Uint8ClampedArray(4);
  var blendColor = new Uint8ClampedArray(4);
  var stampColor = new Uint8ClampedArray(4);
  var maskMatches = (a, b) => a[3] > 0 && (a[0] & 252) === (b[0] & 252) && (a[1] & 252) === (b[1] & 252) && (a[2] & 252) === (b[2] & 252);
  var colorMatches = (a, b, offset) => (a[0] & 248) === (b[offset + 0] & 248) && (a[1] & 248) === (b[offset + 1] & 248) && (a[2] & 240) === (b[offset + 2] & 240);
  var determinant = (A, B, C) => (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
  function sampleColor3b(vec, candidates, dst = new Uint8ClampedArray(3)) {
    dst.fill(0);
    let blendAlpha = 1;
    for (let index = 0; blendAlpha !== 0 && index < candidates.length; index++) {
      candidates[index].drawable.sampleColor4b(vec, blendColor);
      dst[0] += blendColor[0] * blendAlpha;
      dst[1] += blendColor[1] * blendAlpha;
      dst[2] += blendColor[2] * blendAlpha;
      blendAlpha *= 1 - blendColor[3] / 255;
    }
    dst[0] += blendAlpha * 255;
    dst[1] += blendAlpha * 255;
    dst[2] += blendAlpha * 255;
    return dst;
  }
  var toImageData = (bitmap) => {
    if (bitmap?.data && bitmap.width !== void 0) return bitmap;
    if (bitmap && typeof bitmap.getContext === "function") {
      if (!bitmap.width || !bitmap.height) return { width: 0, height: 0, data: new Uint8ClampedArray(0) };
      return bitmap.getContext("2d").getImageData(0, 0, bitmap.width, bitmap.height);
    }
    return { width: bitmap?.width ?? 0, height: bitmap?.height ?? 0, data: new Uint8ClampedArray(0) };
  };
  var CpuRenderer = class _CpuRenderer {
    constructor({ rasterizer, nativeSize = [480, 360] } = {}) {
      this.rasterizer = rasterizer;
      this.nativeSize = [...nativeSize];
      this.xLeft = -nativeSize[0] / 2;
      this.xRight = nativeSize[0] / 2;
      this.yBottom = -nativeSize[1] / 2;
      this.yTop = nativeSize[1] / 2;
      this.groupOrdering = [];
      this.layerGroups = {};
      this.drawList = [];
      this.allDrawables = [];
      this.allSkins = [];
      this.nextDrawableId = 0;
      this.nextSkinId = 0;
      this.backgroundColor3b = new Uint8ClampedArray([255, 255, 255]);
      this.frames = 0;
    }
    get isCpuRenderer() {
      return true;
    }
    setBackgroundColor(red, green, blue) {
      this.backgroundColor3b[0] = red * 255;
      this.backgroundColor3b[1] = green * 255;
      this.backgroundColor3b[2] = blue * 255;
    }
    getNativeSize() {
      return [...this.nativeSize];
    }
    setLayerGroupOrdering(ordering) {
      this.groupOrdering = [...ordering];
      this.layerGroups = {};
      this.groupOrdering.forEach((name, groupIndex) => {
        this.layerGroups[name] = { groupIndex, drawListOffset: 0 };
      });
    }
    endIndexForKnownLayerGroup(group) {
      if (group.groupIndex === this.groupOrdering.length - 1) return this.drawList.length;
      return this.layerGroups[this.groupOrdering[group.groupIndex + 1]].drawListOffset;
    }
    updateOffsets(delta, groupIndex) {
      for (let i2 = groupIndex + 1; i2 < this.groupOrdering.length; i2++) {
        this.layerGroups[this.groupOrdering[i2]].drawListOffset += delta;
      }
    }
    createDrawable(group) {
      const layerGroup = this.layerGroups[group];
      if (!layerGroup) return void 0;
      const id = this.nextDrawableId++;
      const drawable = new Drawable(id, group);
      drawable.skin = null;
      this.allDrawables[id] = drawable;
      this.drawList.splice(this.endIndexForKnownLayerGroup(layerGroup), 0, id);
      this.updateOffsets(1, layerGroup.groupIndex);
      return id;
    }
    destroyDrawable(id, group) {
      const layerGroup = this.layerGroups[group];
      const drawable = this.allDrawables[id];
      if (!layerGroup || !drawable) return;
      drawable.dispose();
      delete this.allDrawables[id];
      const end = this.endIndexForKnownLayerGroup(layerGroup);
      for (let index = layerGroup.drawListOffset; index < end; index++) {
        if (this.drawList[index] !== id) continue;
        this.drawList.splice(index, 1);
        this.updateOffsets(-1, layerGroup.groupIndex);
        return;
      }
    }
    getDrawableOrder(id) {
      return this.drawList.indexOf(id);
    }
    setDrawableOrder(id, order, group, isRelative, min) {
      const layerGroup = this.layerGroups[group];
      if (!layerGroup) return void 0;
      const start2 = layerGroup.drawListOffset;
      const end = this.endIndexForKnownLayerGroup(layerGroup);
      let oldIndex = start2;
      while (oldIndex < end && this.drawList[oldIndex] !== id) oldIndex++;
      if (oldIndex >= end) return null;
      if (order === 0) return oldIndex;
      this.drawList.splice(oldIndex, 1);
      let newIndex = isRelative ? order + oldIndex : order;
      const possibleMin = (min || 0) + start2;
      newIndex = Math.max(newIndex, possibleMin >= start2 && possibleMin < end ? possibleMin : start2);
      newIndex = Math.min(newIndex, end);
      this.drawList.splice(newIndex, 0, id);
      return newIndex;
    }
    get visibleDrawList() {
      return this.drawList.filter((id) => this.allDrawables[id].visible);
    }
    addSkin(skin) {
      this.allSkins[skin.id] = skin;
      return skin.id;
    }
    reskin(skinId, newSkin) {
      const oldSkin = this.allSkins[skinId];
      this.allSkins[skinId] = newSkin;
      for (const drawable of this.allDrawables) {
        if (drawable && drawable.skin === oldSkin) drawable.skin = newSkin;
      }
      oldSkin?.dispose();
    }
    createSVGSkin(svg, rotationCenter) {
      const skin = new SvgSkin(this.nextSkinId++, this.rasterizer);
      skin.setSVG(svg, rotationCenter);
      return this.addSkin(skin);
    }
    updateSVGSkin(skinId, svg, rotationCenter) {
      const existing = this.allSkins[skinId];
      if (existing instanceof SvgSkin) {
        existing.setSVG(svg, rotationCenter);
        return;
      }
      const skin = new SvgSkin(skinId, this.rasterizer);
      skin.setSVG(svg, rotationCenter);
      this.reskin(skinId, skin);
    }
    createBitmapSkin(bitmap, resolution, rotationCenter) {
      const skin = new BitmapSkin(this.nextSkinId++);
      skin.setBitmap(toImageData(bitmap), resolution, rotationCenter);
      return this.addSkin(skin);
    }
    updateBitmapSkin(skinId, bitmap, resolution, rotationCenter) {
      const existing = this.allSkins[skinId];
      if (existing instanceof BitmapSkin) {
        existing.setBitmap(toImageData(bitmap), resolution, rotationCenter);
        return;
      }
      const skin = new BitmapSkin(skinId);
      skin.setBitmap(toImageData(bitmap), resolution, rotationCenter);
      this.reskin(skinId, skin);
    }
    createPenSkin() {
      return this.addSkin(new PenSkin(this.nextSkinId++, this.nativeSize));
    }
    createTextSkin(type, text, pointsLeft) {
      const skin = new TextSkin(this.nextSkinId++);
      skin.setTextAndType(type, text, pointsLeft);
      return this.addSkin(skin);
    }
    updateTextSkin(skinId, type, text, pointsLeft) {
      const existing = this.allSkins[skinId];
      if (existing instanceof TextSkin) {
        existing.setTextAndType(type, text, pointsLeft);
        return;
      }
      const skin = new TextSkin(skinId);
      skin.setTextAndType(type, text, pointsLeft);
      this.reskin(skinId, skin);
    }
    destroySkin(skinId) {
      this.allSkins[skinId]?.dispose();
      delete this.allSkins[skinId];
    }
    updateDrawableSkinId(id, skinId) {
      const drawable = this.allDrawables[id];
      if (drawable) drawable.skin = this.allSkins[skinId] ?? null;
    }
    updateDrawablePosition(id, position) {
      this.allDrawables[id]?.updatePosition(position);
    }
    updateDrawableDirection(id, direction) {
      this.allDrawables[id]?.updateDirection(direction);
    }
    updateDrawableScale(id, scale) {
      this.allDrawables[id]?.updateScale(scale);
    }
    updateDrawableDirectionScale(id, direction, scale) {
      const drawable = this.allDrawables[id];
      if (!drawable) return;
      drawable.updateDirection(direction);
      drawable.updateScale(scale);
    }
    updateDrawableVisible(id, visible) {
      this.allDrawables[id]?.updateVisible(visible);
    }
    updateDrawableEffect(id, name, value) {
      this.allDrawables[id]?.updateEffect(name, value);
    }
    updateDrawableProperties(id, properties) {
      const drawable = this.allDrawables[id];
      if (!drawable) return;
      if ("skinId" in properties) this.updateDrawableSkinId(id, properties.skinId);
      if ("position" in properties) drawable.updatePosition(properties.position);
      if ("direction" in properties) drawable.updateDirection(properties.direction);
      if ("scale" in properties) drawable.updateScale(properties.scale);
      if ("visible" in properties) drawable.updateVisible(properties.visible);
      for (const name of Object.keys(EFFECT_INFO)) {
        if (name in properties) drawable.updateEffect(name, properties[name]);
      }
    }
    getCurrentSkinSize(id) {
      const skin = this.allDrawables[id]?.skin;
      return skin ? skin.size : [100, 100];
    }
    getSkinSize(skinId) {
      return this.allSkins[skinId]?.size ?? [0, 0];
    }
    getSkinRotationCenter(skinId) {
      return this.allSkins[skinId]?.calculateRotationCenter() ?? [0, 0];
    }
    getFencedPositionOfDrawable(id, position) {
      let x2 = position[0];
      let y = position[1];
      const drawable = this.allDrawables[id];
      if (!drawable) return [x2, y];
      const dx = x2 - drawable.position[0];
      const dy = y - drawable.position[1];
      const aabb = drawable.getAABB(fenceBounds);
      const inset = Math.floor(Math.min(aabb.width, aabb.height) / 2);
      const sx = this.xRight - Math.min(FENCE_WIDTH, inset);
      if (aabb.right + dx < -sx) x2 = Math.ceil(drawable.position[0] - (sx + aabb.right));
      else if (aabb.left + dx > sx) x2 = Math.floor(drawable.position[0] + (sx - aabb.left));
      const sy = this.yTop - Math.min(FENCE_WIDTH, inset);
      if (aabb.top + dy < -sy) y = Math.ceil(drawable.position[1] - (sy + aabb.top));
      else if (aabb.bottom + dy > sy) y = Math.floor(drawable.position[1] + (sy - aabb.bottom));
      return [x2, y];
    }
    convexHullPointsOf(id) {
      const drawable = this.allDrawables[id];
      const [width, height] = drawable.skin.size;
      if (!drawable.visible || width === 0 || height === 0) return [];
      drawable.updateCPURenderAttributes();
      const leftHull = [];
      const rightHull = [];
      let leftEnd = -1;
      let rightEnd = -1;
      const pixel = v3.create();
      const effected = v3.create();
      let current;
      for (let y = 0; y < height; y++) {
        pixel[1] = y / height;
        let x2 = 0;
        for (; x2 < width; x2++) {
          pixel[0] = x2 / width;
          transformPoint(drawable, pixel, effected);
          if (drawable.skin.isTouchingLinear(effected)) {
            current = [x2, y];
            break;
          }
        }
        if (x2 >= width) continue;
        while (leftEnd > 0 && !(determinant(leftHull[leftEnd], leftHull[leftEnd - 1], current) > 0)) --leftEnd;
        leftHull[++leftEnd] = current;
        for (x2 = width - 1; x2 >= 0; x2--) {
          pixel[0] = x2 / width;
          transformPoint(drawable, pixel, effected);
          if (drawable.skin.isTouchingLinear(effected)) {
            current = [x2, y];
            break;
          }
        }
        while (rightEnd > 0 && !(determinant(rightHull[rightEnd], rightHull[rightEnd - 1], current) < 0)) --rightEnd;
        rightHull[++rightEnd] = current;
      }
      const points = leftHull;
      points.length = leftEnd + 1;
      for (let j = rightEnd; j >= 0; --j) points.push(rightHull[j]);
      return (0, import_hull.default)(points, Infinity);
    }
    ensureHull(drawable) {
      if (drawable.needsConvexHullPoints()) drawable.setConvexHullPoints(this.convexHullPointsOf(drawable.id));
    }
    getBounds(id) {
      const drawable = this.allDrawables[id];
      if (!drawable?.skin) return null;
      this.ensureHull(drawable);
      return drawable.getFastBounds();
    }
    getBoundsForBubble(id) {
      const drawable = this.allDrawables[id];
      if (!drawable?.skin) return null;
      this.ensureHull(drawable);
      return drawable.getBoundsForBubble();
    }
    touchingBounds(id) {
      const drawable = this.allDrawables[id];
      if (!drawable.skin || !drawable.skin.getTexture([100, 100])) return null;
      const bounds = drawable.getFastBounds();
      bounds.clamp(this.xLeft, this.xRight, this.yBottom, this.yTop);
      bounds.snapToInt();
      if (bounds.width === 0 || bounds.height === 0) return null;
      return bounds;
    }
    candidatesTouching(id, candidateIds) {
      const bounds = this.touchingBounds(id);
      const result = [];
      if (bounds === null) return result;
      for (let index = candidateIds.length - 1; index >= 0; index--) {
        const candidateId = candidateIds[index];
        if (candidateId === id) continue;
        const drawable = this.allDrawables[candidateId];
        if (drawable.skin instanceof TextSkin) continue;
        if (!drawable.skin || !drawable.visible) continue;
        drawable.updateCPURenderAttributes();
        const candidateBounds = drawable.getFastBounds();
        candidateBounds.snapToInt();
        if (bounds.intersects(candidateBounds)) {
          result.push({ id: candidateId, drawable, intersection: Rectangle.intersect(bounds, candidateBounds) });
        }
      }
      return result;
    }
    static candidatesBounds(candidates) {
      return candidates.reduce((memo, { intersection }) => memo ? Rectangle.union(memo, intersection, candidatesBounds) : intersection, null);
    }
    isTouchingColor(id, color3b, mask3b) {
      const candidates = this.candidatesTouching(id, this.visibleDrawList);
      let bounds;
      if (colorMatches(color3b, this.backgroundColor3b, 0)) {
        bounds = this.touchingBounds(id);
        if (bounds === null) return false;
      } else if (candidates.length === 0) {
        return false;
      } else {
        bounds = _CpuRenderer.candidatesBounds(candidates);
      }
      const drawable = this.allDrawables[id];
      const point2 = touchingPoint;
      const color = touchingColor;
      const hasMask = Boolean(mask3b);
      drawable.updateCPURenderAttributes();
      const effectMask = ~EFFECT_INFO.ghost.mask;
      for (let y = bounds.bottom; y <= bounds.top; y++) {
        for (let x2 = bounds.left; x2 <= bounds.right; x2++) {
          point2[1] = y;
          point2[0] = x2;
          const inside = hasMask ? maskMatches(drawable.sampleColor4b(point2, color, effectMask), mask3b) : drawable.isTouching(point2);
          if (inside) {
            sampleColor3b(point2, candidates, color);
            if (colorMatches(color, color3b, 0)) return true;
          }
        }
      }
      return false;
    }
    isTouchingDrawables(id, candidateIds = this.drawList) {
      const candidates = this.candidatesTouching(id, candidateIds.filter((candidateId) => this.allDrawables[candidateId]?.visible));
      if (candidates.length === 0 || !this.allDrawables[id].visible) return false;
      const bounds = _CpuRenderer.candidatesBounds(candidates);
      const drawable = this.allDrawables[id];
      const point2 = touchingPoint;
      drawable.updateCPURenderAttributes();
      for (let x2 = bounds.left; x2 <= bounds.right; x2++) {
        point2[0] = x2;
        for (let y = bounds.bottom; y <= bounds.top; y++) {
          point2[1] = y;
          if (drawable.isTouching(point2)) {
            for (let index = 0; index < candidates.length; index++) {
              if (candidates[index].drawable.isTouching(point2)) return true;
            }
          }
        }
      }
      return false;
    }
    clientSpaceToScratchBounds(centerX, centerY, widthIn = 1, heightIn = 1) {
      const width = Math.max(1, Math.min(Math.round(widthIn), MAX_TOUCH_SIZE[0]));
      const height = Math.max(1, Math.min(Math.round(heightIn), MAX_TOUCH_SIZE[1]));
      const x2 = centerX - (width - 1) / 2;
      const y = centerY + (height - 1) / 2;
      const xOfs = width % 2 ? 0 : -0.5;
      const yOfs = height % 2 ? 0 : -0.5;
      return new Rectangle().initFromBounds(
        Math.floor(this.xLeft + x2 + xOfs),
        Math.floor(this.xLeft + x2 + xOfs + width - 1),
        Math.ceil(this.yTop - y + yOfs),
        Math.ceil(this.yTop - y + yOfs + height - 1)
      );
    }
    drawableTouching(id, centerX, centerY, touchWidth, touchHeight) {
      const drawable = this.allDrawables[id];
      if (!drawable) return false;
      const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
      const position = v3.create();
      drawable.updateCPURenderAttributes();
      for (position[1] = bounds.bottom; position[1] <= bounds.top; position[1]++) {
        for (position[0] = bounds.left; position[0] <= bounds.right; position[0]++) {
          if (drawable.isTouching(position)) return true;
        }
      }
      return false;
    }
    pick(centerX, centerY, touchWidth, touchHeight, candidateIdsIn) {
      const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
      if (bounds.left === -Infinity || bounds.bottom === -Infinity) return false;
      const candidateIds = (candidateIdsIn || this.drawList).filter((id) => {
        const drawable = this.allDrawables[id];
        if (!drawable.visible || drawable.uniforms.u_ghost === 0) return false;
        if (!bounds.intersects(drawable.getFastBounds())) return false;
        drawable.updateCPURenderAttributes();
        return true;
      });
      if (candidateIds.length === 0) return false;
      const hits = [];
      const position = v3.create(0, 0, 0);
      for (position[1] = bounds.bottom; position[1] <= bounds.top; position[1]++) {
        for (position[0] = bounds.left; position[0] <= bounds.right; position[0]++) {
          for (let d = candidateIds.length - 1; d >= 0; d--) {
            const id = candidateIds[d];
            if (this.allDrawables[id].isTouching(position)) {
              hits[id] = (hits[id] || 0) + 1;
              break;
            }
          }
        }
      }
      hits[-1] = 0;
      let hit = -1;
      for (const hitId in hits) {
        if (Object.hasOwn(hits, hitId) && hits[hitId] > hits[hit]) hit = hitId;
      }
      return Number(hit);
    }
    penClear(penSkinId) {
      this.allSkins[penSkinId]?.clear();
    }
    penPoint(penSkinId, attributes, x2, y) {
      this.allSkins[penSkinId]?.drawPoint(attributes, x2, y);
    }
    penLine(penSkinId, attributes, x0, y0, x1, y1) {
      this.allSkins[penSkinId]?.drawLine(attributes, x0, y0, x1, y1);
    }
    penStamp(penSkinId, stampId) {
      const stamp = this.allDrawables[stampId];
      const pen = this.allSkins[penSkinId];
      if (!stamp || !pen) return;
      const bounds = this.touchingBounds(stampId);
      if (!bounds) return;
      stamp.skin.getTexture(stamp.scaleVector);
      stamp.updateMatrix();
      const nearest = stamp.skin.useNearest(stamp.scaleVector, stamp);
      const [penWidth, penHeight] = pen.size;
      const pixels = pen.pixels;
      const point2 = v3.create();
      let wrote = false;
      let dirtyLeft = penWidth;
      let dirtyRight = -1;
      let dirtyTop = penHeight;
      let dirtyBottom = -1;
      for (let row = 0; row < bounds.height; row++) {
        const y = bounds.top - row - 0.5;
        const penRow = Math.floor(penHeight / 2 - y);
        if (penRow < 0 || penRow >= penHeight) continue;
        for (let column = 0; column < bounds.width; column++) {
          const x2 = bounds.left + column + 0.5;
          const penColumn = Math.floor(x2 + penWidth / 2);
          if (penColumn < 0 || penColumn >= penWidth) continue;
          point2[0] = x2;
          point2[1] = y;
          const local = localPositionOf(stamp, point2);
          if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) continue;
          const color = nearest ? stamp.skin.silhouette.colorAtNearest(local, stampColor) : stamp.skin.silhouette.colorAtLinear(local, stampColor);
          if (stamp.enabledEffects !== 0) transformColor(stamp, color);
          if (color[3] === 0) continue;
          const index = (penRow * penWidth + penColumn) * 4;
          const keep = 1 - color[3] / 255;
          pixels[index] = color[0] + pixels[index] * keep;
          pixels[index + 1] = color[1] + pixels[index + 1] * keep;
          pixels[index + 2] = color[2] + pixels[index + 2] * keep;
          pixels[index + 3] = color[3] + pixels[index + 3] * keep;
          wrote = true;
          if (penColumn < dirtyLeft) dirtyLeft = penColumn;
          if (penColumn > dirtyRight) dirtyRight = penColumn;
          if (penRow < dirtyTop) dirtyTop = penRow;
          if (penRow > dirtyBottom) dirtyBottom = penRow;
        }
      }
      if (wrote) {
        pen.markDirty(dirtyLeft, dirtyTop, dirtyRight, dirtyBottom);
        pen.touched();
      }
    }
    save() {
      return {
        background: [...this.backgroundColor3b],
        groups: this.groupOrdering.map((name) => this.layerGroups[name].drawListOffset),
        drawList: [...this.drawList],
        nextDrawableId: this.nextDrawableId,
        nextSkinId: this.nextSkinId,
        drawables: this.allDrawables.filter(Boolean).map((drawable) => ({
          id: drawable.id,
          group: drawable.group,
          skinId: drawable.skin ? drawable.skin.id : null,
          position: [drawable.position[0], drawable.position[1]],
          direction: drawable.direction,
          scale: drawable.scale,
          visible: drawable.visible,
          effects: { ...drawable.effectValues },
          hull: !drawable.needsConvexHullPoints()
        })),
        skins: this.allSkins.filter(Boolean).map((skin) => {
          const saved = { id: skin.id, kind: skin.kind ?? "empty", size: skin.size };
          if (skin instanceof SvgSkin) saved.mip = skin.largestMIPScale;
          if (skin instanceof PenSkin) saved.pixels = packPixels(skin.pixels);
          if (skin instanceof TextSkin) saved.params = { ...skin.params };
          return saved;
        })
      };
    }
    load(saved) {
      this.backgroundColor3b.set(saved.background);
      saved.groups.forEach((offset, i2) => {
        this.layerGroups[this.groupOrdering[i2]].drawListOffset = offset;
      });
      const keep = new Set(saved.skins.map((skin) => skin.id));
      this.allSkins.forEach((skin, id) => {
        if (skin && !keep.has(id)) this.destroySkin(id);
      });
      for (const entry of saved.skins) {
        let skin = this.allSkins[entry.id];
        if (entry.kind === "text") {
          if (!(skin instanceof TextSkin)) skin = this.allSkins[entry.id] = new TextSkin(entry.id);
          skin.setTextAndType(entry.params.type, entry.params.text, entry.params.pointsLeft);
        } else if (entry.kind === "pen") {
          if (!(skin instanceof PenSkin)) skin = this.allSkins[entry.id] = new PenSkin(entry.id, this.nativeSize);
          unpackPixels(entry.pixels, skin.pixels);
          skin.markDirty(0, 0, skin.penSize[0] - 1, skin.penSize[1] - 1);
          skin.touched();
        } else if (!skin || (skin.kind ?? "empty") !== entry.kind) {
          throw new Error(`renderer has no ${entry.kind} skin ${entry.id} to restore; is this the same project?`);
        }
        if (entry.kind === "svg" && skin.largestMIPScale !== entry.mip) {
          skin.resetMIPs();
          if (entry.mip > 0) skin.restoreSilhouette(entry.mip);
        }
      }
      for (const drawable of this.allDrawables) drawable?.dispose();
      this.allDrawables = [];
      for (const entry of saved.drawables) {
        const drawable = new Drawable(entry.id, entry.group);
        drawable.skin = entry.skinId === null ? null : this.allSkins[entry.skinId] ?? null;
        drawable.updatePosition(entry.position);
        drawable.updateDirection(entry.direction);
        drawable.updateScale(entry.scale);
        drawable.updateVisible(entry.visible);
        for (const [name, value] of Object.entries(entry.effects)) drawable.updateEffect(name, value);
        this.allDrawables[entry.id] = drawable;
      }
      for (const entry of saved.drawables) {
        if (entry.hull) this.ensureHull(this.allDrawables[entry.id]);
      }
      this.drawList = [...saved.drawList];
      this.nextDrawableId = saved.nextDrawableId;
      this.nextSkinId = saved.nextSkinId;
    }
    resize() {
    }
    setStageSize() {
    }
    setUseGpuMode() {
    }
    setDebugCanvas() {
    }
    requestSnapshot(callback) {
      this.snapshotProvider?.(callback);
    }
    draw() {
      for (const id of this.drawList) {
        const drawable = this.allDrawables[id];
        if (drawable.visible && drawable.skin) drawable.skin.getTexture(drawable.scaleVector);
      }
      this.frames++;
    }
  };

  // src/browser/adopt.js
  var LAYER_GROUPS = ["background", "video", "pen", "sprite"];
  var costumesBySkin = (runtime) => {
    const map = /* @__PURE__ */ new Map();
    for (const target of runtime.targets) {
      for (const costume of target.sprite.costumes) if (costume.skinId !== void 0) map.set(costume.skinId, costume);
    }
    return map;
  };
  var kindOf = (skin) => {
    if (!skin) return null;
    if ("_framebuffer" in skin && "_lineShader" in skin) return "pen";
    if ("_bubbleType" in skin) return "text";
    if ("_svgImage" in skin) return "svg";
    if ("_textureSize" in skin) return "bitmap";
    return null;
  };
  var bitmapOfCostume = (costume) => {
    let bitmap = decodeBitmap(costume.asset.data, costume.dataFormat);
    if (costume.size && costume.size[0] === bitmap.width * 2) bitmap = upscaleNearest2x(bitmap);
    return bitmap;
  };
  function readPenPixels(page2, skin) {
    const gl = page2._gl;
    const [width, height] = skin._size;
    const pixels = new Uint8Array(width * height * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, skin._framebuffer.framebuffer);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return pixels;
  }
  function groupOfIndex(page2, index) {
    const order = page2._groupOrdering;
    for (let i2 = order.length - 1; i2 >= 0; i2--) {
      if (index >= page2._layerGroups[order[i2]].drawListOffset) return order[i2];
    }
    return order[0];
  }
  function mirrorPageRenderer(page2, runtime, rasterizer) {
    const cpu = new CpuRenderer({ rasterizer });
    cpu.setLayerGroupOrdering(page2._groupOrdering ?? LAYER_GROUPS);
    const costumes = costumesBySkin(runtime);
    const skipped = [];
    page2._allSkins.forEach((skin, id) => {
      const kind = kindOf(skin);
      if (!kind) return;
      if (kind === "pen") {
        const pen = new PenSkin(id, cpu.nativeSize);
        try {
          pen.pixels.set(readPenPixels(page2, skin));
        } catch (error) {
          skipped.push(`pen layer pixels: ${error.message}`);
        }
        pen.touched();
        cpu.allSkins[id] = pen;
        return;
      }
      if (kind === "text") {
        const text = new TextSkin(id);
        text.setTextAndType(skin._bubbleType || "say", skin._text ?? "", Boolean(skin._pointsLeft));
        cpu.allSkins[id] = text;
        return;
      }
      const costume = costumes.get(id);
      if (!costume?.asset?.data) {
        skipped.push(`skin ${id} has no costume asset`);
        return;
      }
      try {
        if (kind === "svg") {
          cpu.nextSkinId = id;
          skinCostume(cpu, { ...costume, dataFormat: "svg" }, costume.asset.data);
        } else {
          cpu.nextSkinId = id;
          cpu.createBitmapSkin(bitmapOfCostume(costume), 2, [costume.rotationCenterX / 2, costume.rotationCenterY / 2]);
        }
      } catch (error) {
        skipped.push(`${costume.name}: ${error.message}`);
      }
    });
    page2._drawList.forEach((id, index) => {
      const source = page2._allDrawables[id];
      if (!source) return;
      const drawable = new Drawable(id, groupOfIndex(page2, index));
      drawable.skin = source._skin ? cpu.allSkins[source._skin.id] ?? null : null;
      drawable.updatePosition([source._position[0], source._position[1]]);
      drawable.updateDirection(source._direction);
      drawable.updateScale([source._scale[0], source._scale[1]]);
      drawable.updateVisible(source._visible);
      cpu.allDrawables[id] = drawable;
    });
    cpu.drawList = [...page2._drawList];
    for (const name of cpu.groupOrdering) cpu.layerGroups[name].drawListOffset = page2._layerGroups[name]?.drawListOffset ?? 0;
    cpu.nextSkinId = page2._nextSkinId;
    cpu.nextDrawableId = page2._nextDrawableId;
    cpu.setBackgroundColor(...page2._backgroundColor4f.slice(0, 3));
    return { cpu, skipped };
  }
  function installRenderer(vm, cpu) {
    vm.renderer = cpu;
    vm.runtime.renderer = cpu;
    for (const target of vm.runtime.targets) {
      target.renderer = cpu;
      target.updateAllDrawableProperties();
    }
  }

  // src/browser/page-backend.js
  var toScratchPoint = (data) => ({
    x: data.x !== void 0 && data.canvasWidth ? 480 * (data.x / data.canvasWidth) - 240 : void 0,
    y: data.y !== void 0 && data.canvasHeight ? 180 - 360 * (data.y / data.canvasHeight) : void 0
  });
  function routeGuiInput(vm, spre) {
    const runtime = vm.runtime;
    const originals = {
      postIOData: vm.postIOData,
      greenFlag: vm.greenFlag,
      stopAll: vm.stopAll,
      setTurboMode: vm.setTurboMode,
      start: runtime.start
    };
    vm.postIOData = function(device, data) {
      switch (device) {
        case "keyboard":
          if (data.key) spre.input.send({ type: "key", key: data.key, down: data.isDown !== false });
          return;
        case "mouse": {
          const event = { type: "mouse", ...toScratchPoint(data) };
          if (data.isDown !== void 0) event.down = data.isDown;
          if (data.wasDragged) event.wasDragged = true;
          spre.input.send(event);
          return;
        }
        case "mouseWheel":
          spre.input.send({ type: "wheel", deltaY: data.deltaY });
          return;
        case "userData":
          spre.input.send({ type: "username", name: data.username ?? "" });
          return;
        case "cloud":
          if (data.varUpdate) spre.input.send({ type: "cloud", name: data.varUpdate.name, value: data.varUpdate.value });
          return;
        default:
          originals.postIOData.call(this, device, data);
      }
    };
    vm.greenFlag = () => spre.greenFlag();
    vm.stopAll = () => spre.stopAll();
    vm.setTurboMode = (on) => {
      spre.turbo(Boolean(on));
      vm.emit(on ? "TURBO_MODE_ON" : "TURBO_MODE_OFF");
    };
    runtime.start = () => {
    };
    const onAnswer = (text) => spre.input.send({ type: "answer", text: String(text ?? "") });
    runtime.on("ANSWER", onAnswer);
    return () => {
      Object.assign(vm, { postIOData: originals.postIOData, greenFlag: originals.greenFlag, stopAll: originals.stopAll, setTurboMode: originals.setTurboMode });
      runtime.start = originals.start;
      runtime.removeListener("ANSWER", onAnswer);
    };
  }
  async function adoptPageVM(vm, { assets, seed = Date.now(), keepCloud = false, ...options } = {}) {
    const runtime = vm.runtime;
    const page2 = vm.renderer;
    if (!page2?._allSkins) throw new Error("this page has no scratch-render renderer to take over");
    await initSvgRasterizer(assets.wasm);
    const rasterizer = createSvgRasterizer({ fonts: assets.fonts });
    if (runtime._steppingInterval) {
      clearInterval(runtime._steppingInterval);
      runtime._steppingInterval = null;
    }
    const { cpu, skipped } = mirrorPageRenderer(page2, runtime, rasterizer);
    installRenderer(vm, cpu);
    const cloud = runtime.ioDevices.cloud;
    const cloudProvider = cloud.provider;
    if (!keepCloud) cloud.provider = null;
    const spre = attach(vm, { seed, ...options });
    const unroute = routeGuiInput(vm, spre);
    const backend = createBackend({ spre, vm, name: document.title });
    return {
      spre,
      backend,
      cpu,
      pageRenderer: page2,
      skipped,
      detach() {
        backend.stop();
        unroute();
        spre.detach();
        cloud.provider = cloudProvider;
        installRenderer(vm, page2);
        vm.runtime.start();
      }
    };
  }

  // src/browser/vm-lookup.js
  var FIBER_KEY = /^__react(Fiber|Container|InternalInstance)\$/;
  var isValidVM = (v) => v != null && typeof v.runtime === "object" && v.runtime.targets !== void 0 && typeof v.on === "function";
  function fiberRoot() {
    const candidates = [document.getElementById("app"), document.body, ...document.querySelectorAll("*")];
    for (const el of candidates) {
      const key = el && Object.keys(el).find((k) => FIBER_KEY.test(k));
      if (!key) continue;
      let fiber = el[key];
      while (fiber?.return) fiber = fiber.return;
      if (fiber) return fiber;
    }
    return null;
  }
  function bfsFindVM(root) {
    const queue = [root];
    const seen = /* @__PURE__ */ new Set();
    for (let i2 = 0; i2 < queue.length; i2++) {
      const node = queue[i2];
      if (!node || seen.has(node)) continue;
      seen.add(node);
      for (const props of [node.memoizedProps, node.pendingProps, node.stateNode?.props]) {
        if (isValidVM(props?.vm)) return props.vm;
      }
      queue.push(node.child, node.sibling);
    }
    return null;
  }

  // src/browser/userscript.js
  var page = typeof unsafeWindow === "undefined" ? globalThis : unsafeWindow;
  var findVM = () => {
    if (isValidVM(page.vm)) return page.vm;
    const root = fiberRoot();
    return root ? bfsFindVM(root) : null;
  };
  var projectReady = (vm) => vm && vm.runtime.targets.length > 0 && vm.renderer?._allSkins;
  function overlayFor(pageCanvas) {
    const overlay = h("canvas", { "data-spre-stage": "", style: { position: "fixed", pointerEvents: "none", zIndex: "2147482000", imageRendering: "auto" } });
    document.body.append(overlay);
    const sync = () => {
      const rect = pageCanvas.getBoundingClientRect();
      const left = rect.left + pageCanvas.clientLeft;
      const top = rect.top + pageCanvas.clientTop;
      Object.assign(overlay.style, { left: `${left}px`, top: `${top}px`, width: `${pageCanvas.clientWidth}px`, height: `${pageCanvas.clientHeight}px`, display: rect.width ? "block" : "none" });
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(pageCanvas);
    addEventListener("scroll", sync, true);
    addEventListener("resize", sync);
    const timer = setInterval(sync, 500);
    return {
      overlay,
      dispose() {
        observer.disconnect();
        removeEventListener("scroll", sync, true);
        removeEventListener("resize", sync);
        clearInterval(timer);
        overlay.remove();
      }
    };
  }
  async function start(vm, setLabel) {
    setLabel("Loading the renderer\u2026");
    const assets = await loadPageAssets();
    await registerPixelFont(assets).catch(() => false);
    const pageCanvas = vm.renderer.canvas;
    const session = await adoptPageVM(vm, { assets });
    const pool = await createBrowserPool({ assets });
    const [backendPort, displayPort] = createLoopback();
    session.backend.connect(backendPort);
    const client = connectClient(displayPort, { scene: true });
    const { overlay, dispose: disposeOverlay } = overlayFor(pageCanvas);
    const stage = createStageView({ client, pool, canvas: overlay, interactive: false });
    session.cpu.snapshotProvider = (callback) => callback(overlay.toDataURL("image/png"));
    const panel = createPanel({ client });
    await client.ready;
    await client.call("timeline.start");
    session.backend.start();
    page.spre = {
      ...session,
      client,
      stop() {
        panel.dispose();
        stage.dispose();
        disposeOverlay();
        pool.terminate();
        session.detach();
        delete page.spre;
      }
    };
    return page.spre;
  }
  function offer(vm) {
    const host = h("div", { "data-spre-offer": "" });
    const shadow = host.attachShadow({ mode: "open" });
    const label = h("span", {}, "Run with SPRE");
    const button = h("button", { class: "launcher", title: "Take over this project with the deterministic SPRE runtime (Alt+Shift+S)" }, h("span", { class: "badge", html: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7.5 5.2v13.6a.6.6 0 0 0 .9.5l10.8-6.8a.6.6 0 0 0 0-1L8.4 4.7a.6.6 0 0 0-.9.5Z"/></svg>' }), label);
    shadow.append(h("style", {}, PANEL_CSS), button);
    document.body.append(host);
    let starting = false;
    const go = async () => {
      if (starting) return;
      starting = true;
      try {
        await start(vm, (text) => {
          label.textContent = text;
        });
        host.remove();
      } catch (error) {
        label.textContent = `SPRE could not start: ${error.message}`;
        starting = false;
        console.error("[SPRE]", error);
      }
    };
    button.addEventListener("click", go);
    addEventListener("keydown", (event) => {
      if (event.altKey && event.shiftKey && event.code === "KeyS" && !page.spre) {
        event.preventDefault();
        go();
      }
    }, true);
  }
  var waitForProject = () => {
    const vm = findVM();
    if (projectReady(vm)) offer(vm);
    else setTimeout(waitForProject, 500);
  };
  waitForProject();
})();
