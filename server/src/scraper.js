"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScrapeAndSave = runScrapeAndSave;
require("dotenv/config");
var playwright_1 = require("playwright");
/**
 * Executa o scraping dos cursos e (opcionalmente) salva no banco.
 * Por agora, apenas faz o scrape e imprime os resultados; ajuste a parte de persistência conforme necessário.
 */
function runScrapeAndSave() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, previousCount, currentCount, showMoreBtn, _a, courseUrls, _i, courseUrls_1, url, data, course;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: true })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, , 20, 22]);
                    return [4 /*yield*/, page.goto(process.env.SCRAPPING_BASE_URL, {
                            waitUntil: 'networkidle',
                        })];
                case 4:
                    _b.sent();
                    console.log("Page loaded.");
                    return [4 /*yield*/, page.waitForSelector('article')];
                case 5:
                    _b.sent();
                    previousCount = 0;
                    _b.label = 6;
                case 6:
                    if (!true) return [3 /*break*/, 13];
                    return [4 /*yield*/, page.locator('article').count()];
                case 7:
                    currentCount = _b.sent();
                    console.log('Cursos carregados:', currentCount);
                    if (currentCount === previousCount)
                        return [3 /*break*/, 13];
                    previousCount = currentCount;
                    showMoreBtn = page.locator('#mainSection_btnShowMore');
                    return [4 /*yield*/, showMoreBtn.count()];
                case 8:
                    _a = (_b.sent()) === 0;
                    if (_a) return [3 /*break*/, 10];
                    return [4 /*yield*/, showMoreBtn.isVisible()];
                case 9:
                    _a = !(_b.sent());
                    _b.label = 10;
                case 10:
                    // se não existe ou não está visível, acabou.
                    if (_a) {
                        return [3 /*break*/, 13];
                    }
                    return [4 /*yield*/, Promise.all([
                            page.waitForLoadState('networkidle'),
                            showMoreBtn.click(),
                        ])];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, page.waitForTimeout(800)];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 13: return [4 /*yield*/, page.$$eval('article a', function (links) {
                        return __spreadArray([], new Set(links.map(function (a) { return a.href; })), true);
                    })];
                case 14:
                    courseUrls = _b.sent();
                    console.log('Total de URLs de cursos encontradas:', courseUrls.length);
                    _i = 0, courseUrls_1 = courseUrls;
                    _b.label = 15;
                case 15:
                    if (!(_i < courseUrls_1.length)) return [3 /*break*/, 19];
                    url = courseUrls_1[_i];
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle' })];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
                            return ({
                                name: (_b = (_a = document.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : undefined,
                                cover_url: (_d = (_c = document.querySelector('#mainSection_imgCourse')) === null || _c === void 0 ? void 0 : _c.src) !== null && _d !== void 0 ? _d : null,
                                start_date: (_f = (_e = document.querySelector('#mainSection_lblDtInicio')) === null || _e === void 0 ? void 0 : _e.textContent) !== null && _f !== void 0 ? _f : undefined,
                                end_date: (_h = (_g = document.querySelector('#mainSection_lblDtFim')) === null || _g === void 0 ? void 0 : _g.textContent) !== null && _h !== void 0 ? _h : undefined,
                                time: (_k = (_j = document.querySelector('#mainSection_lblHorario')) === null || _j === void 0 ? void 0 : _j.textContent) !== null && _k !== void 0 ? _k : undefined,
                                time_description: (_m = (_l = document.querySelector('.breadcrumb')) === null || _l === void 0 ? void 0 : _l.textContent) !== null && _m !== void 0 ? _m : undefined,
                                duration: (_p = (_o = document.querySelector('#mainSection_lblDuracao')) === null || _o === void 0 ? void 0 : _o.textContent) !== null && _p !== void 0 ? _p : undefined,
                                regime: (_r = (_q = document.querySelector('.breadcrumb')) === null || _q === void 0 ? void 0 : _q.textContent) !== null && _r !== void 0 ? _r : undefined,
                                location: (_t = (_s = document.querySelector('aside.signup ul li:first-child')) === null || _s === void 0 ? void 0 : _s.textContent) !== null && _t !== void 0 ? _t : undefined,
                                price: (_v = (_u = document.querySelector('#mainSection_lblPrice')) === null || _u === void 0 ? void 0 : _u.textContent) !== null && _v !== void 0 ? _v : undefined,
                                sponsor_img_url: (_x = (_w = document.querySelector('#mainSection_imgLogoParceiros')) === null || _w === void 0 ? void 0 : _w.src) !== null && _x !== void 0 ? _x : null,
                                has_download_button: 0,
                            });
                        })];
                case 17:
                    data = _b.sent();
                    course = __assign({ url: url }, data);
                    // Aqui você pode substituir por lógica de persistência no DB (Drizzle)
                    // Ex.: await db.insert(courses).values(mapCourseToSchema(course))
                    console.log('COURSE', course);
                    _b.label = 18;
                case 18:
                    _i++;
                    return [3 /*break*/, 15];
                case 19: return [3 /*break*/, 22];
                case 20: return [4 /*yield*/, browser.close()];
                case 21:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 22: return [2 /*return*/];
            }
        });
    });
}
