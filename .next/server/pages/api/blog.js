module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/blog.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/blog.ts":
/*!***************************!*\
  !*** ./pages/api/blog.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_functions_convertDatasetToJson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/functions/convertDatasetToJson */ "./shared/functions/convertDatasetToJson.ts");
/* harmony import */ var _shared_class_Centroid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/class/Centroid */ "./shared/class/Centroid.ts");
/* harmony import */ var _shared_functions_pearson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/functions/pearson */ "./shared/functions/pearson.ts");




const random = from => to => from + Math.random() * (to - from);

const kMean = (req, res) => {
  const CLUSTERS = 5; // set max cluster

  const MAX_ITERATIONS = 50; // set max iterations

  const n = 706; // set n of words

  const blogs = Object(_shared_functions_convertDatasetToJson__WEBPACK_IMPORTED_MODULE_0__["default"])()[0].blogs; // the blogs

  const centroids = []; // empty array for coming Centroid objects

  /* Generate random centroids */

  for (let i = 0; i < CLUSTERS; i++) {
    centroids[i] = new _shared_class_Centroid__WEBPACK_IMPORTED_MODULE_1__["Centroid"](); // for every cluster, add centroid

    /* ...Then loop MAX_ITERATIONS of times */

    for (let j = 0; j < n; j++) {
      centroids[i].setWordCount(j, random(0)(n)); // random min[j] (0) to max[j] (706)
    }
  }
  /* Iterate specified amount of time */


  for (let i = 0; i < MAX_ITERATIONS; i++) {
    centroids.forEach(e => e.clearAssignments()); // clear assignments for every centroid

    /* This assigns each blog to closest centroid */

    for (let j = 0; j < blogs.length; j++) {
      let distance = Infinity; // infinite value

      let best; // best centroid

      /* This finds closest centroid */

      for (let k = 0; k < centroids.length; k++) {
        const cDist = Object(_shared_functions_pearson__WEBPACK_IMPORTED_MODULE_2__["default"])(centroids[k], blogs[j]);

        if (cDist < distance) {
          best = centroids[k];
          distance = cDist;
        }
      }

      best.assign(blogs[j]); // assign blog to centroid
    }
    /* This for loop re calculates the center for each centroid */


    for (let y = 0; y < centroids.length; y++) {
      /* This for loop finds the average count for each word */
      for (let l = 0; l < n; l++) {
        var avg = 0;
        /* Iterate every blog assigned to this centroid */

        for (let j = 0; j < centroids[y]['assignments'].length; j++) {
          avg += centroids[y]['assignments'][j].wordCount[l];
        }

        avg /= centroids[y]['assignments'].length;
        centroids[y].setWordCount(l, avg); // update word count for the centroid
      }
    }
  }

  let arr = centroids.map(x => x.assignments.map(y => y.name));
  res.json(JSON.stringify(arr, null, 2));
};

/* harmony default export */ __webpack_exports__["default"] = (kMean);

/***/ }),

/***/ "./shared/class/Centroid.ts":
/*!**********************************!*\
  !*** ./shared/class/Centroid.ts ***!
  \**********************************/
/*! exports provided: Centroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Centroid", function() { return Centroid; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Centroid class
 */
class Centroid {
  constructor() {
    _defineProperty(this, "wordCount", {});

    _defineProperty(this, "assignments", []);
  }

  setWordCount(id, count) {
    this.wordCount[id] = count;
  }

  assign(blog) {
    this.assignments.push(blog);
  }

  clearAssignments() {
    this.assignments = [];
  }

}

/***/ }),

/***/ "./shared/functions/convertDatasetToJson.ts":
/*!**************************************************!*\
  !*** ./shared/functions/convertDatasetToJson.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let csvToJson = __webpack_require__(/*! convert-csv-to-json */ "convert-csv-to-json");
/**
 * Builds a json from blogdata.csv
 */


const jsonResult = () => {
  const rawJson = csvToJson.getJsonFromCsv('./shared/data/blogdata.csv');
  /* New Json Array */

  let arr = [{
    blogs: []
  }];

  for (let i = 0; i < rawJson.length; i++) {
    /* For storing total word count */
    let tmp = [];
    /* Get total word count */

    for (var propName in rawJson[i]) {
      if (rawJson[i].hasOwnProperty(propName)) {
        let v = parseInt(rawJson[i][propName]); // parse string to int

        if (v >= 0) tmp.push(v); // get rid of blog name from word list
      }
    }
    /* Store blog data in seperate objects */


    arr[0]['blogs'].push({
      name: rawJson[i]['Blog'],
      wordCount: tmp
    });
  }

  return arr;
};

/* harmony default export */ __webpack_exports__["default"] = (jsonResult);

/***/ }),

/***/ "./shared/functions/pearson.ts":
/*!*************************************!*\
  !*** ./shared/functions/pearson.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Written according to the Pearson distance algorithm in:
 * https://coursepress.lnu.se/kurs/web-intelligence/files/2019/11/3.-Clustering.pdf
 */

/**
 *
 * @param a blog a
 * @param b blog b
 * @param totalWords
 */
const pearson = (a, b) => {
  let sumA = 0,
      sumB = 0,
      sumAsq = 0,
      sumBsq = 0,
      pSum = 0,
      cntA,
      cntB;
  const n = 706;

  for (let i = 0; i < n; i++) {
    cntA = a.wordCount[i];
    cntB = b.wordCount[i];
    sumA += cntA;
    sumB += cntB;
    sumAsq += cntA ** 2;
    sumBsq += cntB ** 2;
    pSum += cntA * cntB;
  }

  const num = pSum - sumA * sumB / n;
  const den = Math.sqrt((sumAsq - sumA ** 2 / n) * (sumBsq - sumB ** 2 / n));
  return 1 - num / den;
};

/* harmony default export */ __webpack_exports__["default"] = (pearson);

/***/ }),

/***/ "convert-csv-to-json":
/*!**************************************!*\
  !*** external "convert-csv-to-json" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("convert-csv-to-json");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2Jsb2cudHMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2NsYXNzL0NlbnRyb2lkLnRzIiwid2VicGFjazovLy8uL3NoYXJlZC9mdW5jdGlvbnMvY29udmVydERhdGFzZXRUb0pzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2Z1bmN0aW9ucy9wZWFyc29uLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnZlcnQtY3N2LXRvLWpzb25cIiJdLCJuYW1lcyI6WyJyYW5kb20iLCJmcm9tIiwidG8iLCJNYXRoIiwia01lYW4iLCJyZXEiLCJyZXMiLCJDTFVTVEVSUyIsIk1BWF9JVEVSQVRJT05TIiwibiIsImJsb2dzIiwianNvblJlc3VsdCIsImNlbnRyb2lkcyIsImkiLCJDZW50cm9pZCIsImoiLCJzZXRXb3JkQ291bnQiLCJmb3JFYWNoIiwiZSIsImNsZWFyQXNzaWdubWVudHMiLCJsZW5ndGgiLCJkaXN0YW5jZSIsIkluZmluaXR5IiwiYmVzdCIsImsiLCJjRGlzdCIsInBlYXJzb24iLCJhc3NpZ24iLCJ5IiwibCIsImF2ZyIsIndvcmRDb3VudCIsImFyciIsIm1hcCIsIngiLCJhc3NpZ25tZW50cyIsIm5hbWUiLCJqc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsImlkIiwiY291bnQiLCJibG9nIiwicHVzaCIsImNzdlRvSnNvbiIsInJlcXVpcmUiLCJyYXdKc29uIiwiZ2V0SnNvbkZyb21Dc3YiLCJ0bXAiLCJwcm9wTmFtZSIsImhhc093blByb3BlcnR5IiwidiIsInBhcnNlSW50IiwiYSIsImIiLCJzdW1BIiwic3VtQiIsInN1bUFzcSIsInN1bUJzcSIsInBTdW0iLCJjbnRBIiwiY250QiIsIm51bSIsImRlbiIsInNxcnQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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LElBQVI7QUFDQUosVUFBTSxJQUFJRyxJQUFJLElBQUksQ0FBbEI7QUFDQUYsVUFBTSxJQUFJRyxJQUFJLElBQUksQ0FBbEI7QUFDQUYsUUFBSSxJQUFJQyxJQUFJLEdBQUdDLElBQWY7QUFDRDs7QUFFRCxRQUFNQyxHQUFHLEdBQUdILElBQUksR0FBSUosSUFBSSxHQUFHQyxJQUFSLEdBQWdCL0MsQ0FBbkM7QUFDQSxRQUFNc0QsR0FBRyxHQUFHNUQsSUFBSSxDQUFDNkQsSUFBTCxDQUFVLENBQUNQLE1BQU0sR0FBR0YsSUFBSSxJQUFJLENBQVIsR0FBWTlDLENBQXRCLEtBQTRCaUQsTUFBTSxHQUFHRixJQUFJLElBQUksQ0FBUixHQUFZL0MsQ0FBakQsQ0FBVixDQUFaO0FBRUEsU0FBTyxJQUFJcUQsR0FBRyxHQUFHQyxHQUFqQjtBQUNELENBekJEOztBQTJCZXJDLHNFQUFmLEU7Ozs7Ozs7Ozs7O0FDdENBLGdEIiwiZmlsZSI6InBhZ2VzL2FwaS9ibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9hcGkvYmxvZy50c1wiKTtcbiIsImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xyXG5pbXBvcnQganNvblJlc3VsdCBmcm9tICcuLi8uLi9zaGFyZWQvZnVuY3Rpb25zL2NvbnZlcnREYXRhc2V0VG9Kc29uJ1xyXG5cclxuaW1wb3J0IHsgQ2VudHJvaWQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2xhc3MvQ2VudHJvaWQnXHJcbmltcG9ydCBwZWFyc29uIGZyb20gJy4uLy4uL3NoYXJlZC9mdW5jdGlvbnMvcGVhcnNvbidcclxuXHJcbmNvbnN0IHJhbmRvbSA9IChmcm9tOiBudW1iZXIpID0+ICh0bzogbnVtYmVyKSA9PlxyXG4gIGZyb20gKyBNYXRoLnJhbmRvbSgpICogKHRvIC0gZnJvbSlcclxuXHJcbmNvbnN0IGtNZWFuID0gKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc3QgQ0xVU1RFUlM6IG51bWJlciA9IDUgLy8gc2V0IG1heCBjbHVzdGVyXHJcbiAgY29uc3QgTUFYX0lURVJBVElPTlM6IG51bWJlciA9IDUwIC8vIHNldCBtYXggaXRlcmF0aW9uc1xyXG4gIGNvbnN0IG46IG51bWJlciA9IDcwNiAvLyBzZXQgbiBvZiB3b3Jkc1xyXG4gIGNvbnN0IGJsb2dzID0ganNvblJlc3VsdCgpWzBdLmJsb2dzIC8vIHRoZSBibG9nc1xyXG5cclxuICBjb25zdCBjZW50cm9pZHM6IEFycmF5PGFueT4gPSBbXSAvLyBlbXB0eSBhcnJheSBmb3IgY29taW5nIENlbnRyb2lkIG9iamVjdHNcclxuXHJcbiAgLyogR2VuZXJhdGUgcmFuZG9tIGNlbnRyb2lkcyAqL1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQ0xVU1RFUlM7IGkrKykge1xyXG4gICAgY2VudHJvaWRzW2ldID0gbmV3IENlbnRyb2lkKCkgLy8gZm9yIGV2ZXJ5IGNsdXN0ZXIsIGFkZCBjZW50cm9pZFxyXG5cclxuICAgIC8qIC4uLlRoZW4gbG9vcCBNQVhfSVRFUkFUSU9OUyBvZiB0aW1lcyAqL1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcclxuICAgICAgY2VudHJvaWRzW2ldLnNldFdvcmRDb3VudChqLCByYW5kb20oMCkobikpIC8vIHJhbmRvbSBtaW5bal0gKDApIHRvIG1heFtqXSAoNzA2KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogSXRlcmF0ZSBzcGVjaWZpZWQgYW1vdW50IG9mIHRpbWUgKi9cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9JVEVSQVRJT05TOyBpKyspIHtcclxuICAgIGNlbnRyb2lkcy5mb3JFYWNoKChlKSA9PiBlLmNsZWFyQXNzaWdubWVudHMoKSkgLy8gY2xlYXIgYXNzaWdubWVudHMgZm9yIGV2ZXJ5IGNlbnRyb2lkXHJcblxyXG4gICAgLyogVGhpcyBhc3NpZ25zIGVhY2ggYmxvZyB0byBjbG9zZXN0IGNlbnRyb2lkICovXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJsb2dzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGxldCBkaXN0YW5jZTogbnVtYmVyID0gSW5maW5pdHkgLy8gaW5maW5pdGUgdmFsdWVcclxuICAgICAgbGV0IGJlc3Q6IGFueSAvLyBiZXN0IGNlbnRyb2lkXHJcblxyXG4gICAgICAvKiBUaGlzIGZpbmRzIGNsb3Nlc3QgY2VudHJvaWQgKi9cclxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjZW50cm9pZHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICBjb25zdCBjRGlzdDogbnVtYmVyID0gcGVhcnNvbihjZW50cm9pZHNba10sIGJsb2dzW2pdKVxyXG4gICAgICAgIGlmIChjRGlzdCA8IGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICBiZXN0ID0gY2VudHJvaWRzW2tdXHJcbiAgICAgICAgICBkaXN0YW5jZSA9IGNEaXN0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGJlc3QuYXNzaWduKGJsb2dzW2pdKSAvLyBhc3NpZ24gYmxvZyB0byBjZW50cm9pZFxyXG4gICAgfVxyXG5cclxuICAgIC8qIFRoaXMgZm9yIGxvb3AgcmUgY2FsY3VsYXRlcyB0aGUgY2VudGVyIGZvciBlYWNoIGNlbnRyb2lkICovXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNlbnRyb2lkcy5sZW5ndGg7IHkrKykge1xyXG4gICAgICAvKiBUaGlzIGZvciBsb29wIGZpbmRzIHRoZSBhdmVyYWdlIGNvdW50IGZvciBlYWNoIHdvcmQgKi9cclxuICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCBuOyBsKyspIHtcclxuICAgICAgICB2YXIgYXZnOiBudW1iZXIgPSAwXHJcbiAgICAgICAgLyogSXRlcmF0ZSBldmVyeSBibG9nIGFzc2lnbmVkIHRvIHRoaXMgY2VudHJvaWQgKi9cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNlbnRyb2lkc1t5XVsnYXNzaWdubWVudHMnXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgYXZnICs9IGNlbnRyb2lkc1t5XVsnYXNzaWdubWVudHMnXVtqXS53b3JkQ291bnRbbF1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXZnIC89IGNlbnRyb2lkc1t5XVsnYXNzaWdubWVudHMnXS5sZW5ndGhcclxuICAgICAgICBjZW50cm9pZHNbeV0uc2V0V29yZENvdW50KGwsIGF2ZykgLy8gdXBkYXRlIHdvcmQgY291bnQgZm9yIHRoZSBjZW50cm9pZFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXQgYXJyID0gY2VudHJvaWRzLm1hcCgoeCkgPT4geC5hc3NpZ25tZW50cy5tYXAoKHk6IGFueSkgPT4geS5uYW1lKSlcclxuICByZXMuanNvbihKU09OLnN0cmluZ2lmeShhcnIsIG51bGwsIDIpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrTWVhblxyXG4iLCIvKipcclxuICogQ2VudHJvaWQgY2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDZW50cm9pZCB7XHJcbiAgd29yZENvdW50OiBhbnkgPSB7fVxyXG4gIGFzc2lnbm1lbnRzOiBhbnkgPSBbXVxyXG5cclxuICBzZXRXb3JkQ291bnQoaWQ6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xyXG4gICAgdGhpcy53b3JkQ291bnRbaWRdID0gY291bnRcclxuICB9XHJcblxyXG4gIGFzc2lnbihibG9nKSB7XHJcbiAgICB0aGlzLmFzc2lnbm1lbnRzLnB1c2goYmxvZylcclxuICB9XHJcblxyXG4gIGNsZWFyQXNzaWdubWVudHMoKSB7XHJcbiAgICB0aGlzLmFzc2lnbm1lbnRzID0gW11cclxuICB9XHJcbn1cclxuIiwibGV0IGNzdlRvSnNvbiA9IHJlcXVpcmUoJ2NvbnZlcnQtY3N2LXRvLWpzb24nKVxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkcyBhIGpzb24gZnJvbSBibG9nZGF0YS5jc3ZcclxuICovXHJcbmNvbnN0IGpzb25SZXN1bHQgPSAoKSA9PiB7XHJcbiAgY29uc3QgcmF3SnNvbiA9IGNzdlRvSnNvbi5nZXRKc29uRnJvbUNzdignLi9zaGFyZWQvZGF0YS9ibG9nZGF0YS5jc3YnKVxyXG5cclxuICAvKiBOZXcgSnNvbiBBcnJheSAqL1xyXG4gIGxldCBhcnI6IGFueSA9IFtcclxuICAgIHtcclxuICAgICAgYmxvZ3M6IFtdLFxyXG4gICAgfSxcclxuICBdXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3SnNvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgLyogRm9yIHN0b3JpbmcgdG90YWwgd29yZCBjb3VudCAqL1xyXG4gICAgbGV0IHRtcCA9IFtdXHJcblxyXG4gICAgLyogR2V0IHRvdGFsIHdvcmQgY291bnQgKi9cclxuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHJhd0pzb25baV0pIHtcclxuICAgICAgaWYgKHJhd0pzb25baV0uaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XHJcbiAgICAgICAgbGV0IHYgPSBwYXJzZUludChyYXdKc29uW2ldW3Byb3BOYW1lXSkgLy8gcGFyc2Ugc3RyaW5nIHRvIGludFxyXG4gICAgICAgIGlmICh2ID49IDApIHRtcC5wdXNoKHYpIC8vIGdldCByaWQgb2YgYmxvZyBuYW1lIGZyb20gd29yZCBsaXN0XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBTdG9yZSBibG9nIGRhdGEgaW4gc2VwZXJhdGUgb2JqZWN0cyAqL1xyXG4gICAgYXJyWzBdWydibG9ncyddLnB1c2goe1xyXG4gICAgICBuYW1lOiByYXdKc29uW2ldWydCbG9nJ10sXHJcbiAgICAgIHdvcmRDb3VudDogdG1wLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBhcnJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQganNvblJlc3VsdFxyXG4iLCIvKipcclxuICogV3JpdHRlbiBhY2NvcmRpbmcgdG8gdGhlIFBlYXJzb24gZGlzdGFuY2UgYWxnb3JpdGhtIGluOlxyXG4gKiBodHRwczovL2NvdXJzZXByZXNzLmxudS5zZS9rdXJzL3dlYi1pbnRlbGxpZ2VuY2UvZmlsZXMvMjAxOS8xMS8zLi1DbHVzdGVyaW5nLnBkZlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gYSBibG9nIGFcclxuICogQHBhcmFtIGIgYmxvZyBiXHJcbiAqIEBwYXJhbSB0b3RhbFdvcmRzXHJcbiAqL1xyXG5jb25zdCBwZWFyc29uID0gKGE6IGFueSwgYjogYW55KSA9PiB7XHJcbiAgbGV0IHN1bUE6IG51bWJlciA9IDAsXHJcbiAgICBzdW1COiBudW1iZXIgPSAwLFxyXG4gICAgc3VtQXNxOiBudW1iZXIgPSAwLFxyXG4gICAgc3VtQnNxOiBudW1iZXIgPSAwLFxyXG4gICAgcFN1bTogbnVtYmVyID0gMCxcclxuICAgIGNudEE6IG51bWJlcixcclxuICAgIGNudEI6IG51bWJlclxyXG5cclxuICBjb25zdCBuID0gNzA2XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICBjbnRBID0gYS53b3JkQ291bnRbaV1cclxuICAgIGNudEIgPSBiLndvcmRDb3VudFtpXVxyXG4gICAgc3VtQSArPSBjbnRBXHJcbiAgICBzdW1CICs9IGNudEJcclxuICAgIHN1bUFzcSArPSBjbnRBICoqIDJcclxuICAgIHN1bUJzcSArPSBjbnRCICoqIDJcclxuICAgIHBTdW0gKz0gY250QSAqIGNudEJcclxuICB9XHJcblxyXG4gIGNvbnN0IG51bSA9IHBTdW0gLSAoc3VtQSAqIHN1bUIpIC8gblxyXG4gIGNvbnN0IGRlbiA9IE1hdGguc3FydCgoc3VtQXNxIC0gc3VtQSAqKiAyIC8gbikgKiAoc3VtQnNxIC0gc3VtQiAqKiAyIC8gbikpXHJcblxyXG4gIHJldHVybiAxIC0gbnVtIC8gZGVuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBlYXJzb25cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29udmVydC1jc3YtdG8tanNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9