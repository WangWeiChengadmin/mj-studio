import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { SignJWT, jwtVerify } from 'jose';
import { timingSafeEqual, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { eq } from 'drizzle-orm';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core';
import { existsSync as existsSync$1, mkdirSync } from 'fs';
import { join as join$1, dirname as dirname$2 } from 'path';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { consola } from 'consola';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse(body, boundary);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    // 主色调
    colors: {
      primary: "violet",
      secondary: "blue",
      success: "green",
      warning: "yellow",
      error: "red",
      neutral: "zinc"
    },
    // Modal 遮罩背景改为深色
    modal: {
      overlay: "bg-black/70 backdrop-blur-sm"
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "components",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "112f93f5-03fa-4a7c-89f6-2bd839268baf",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {},
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"dark\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _3bMEKkEReLel6qHHqZYU3qZCJaCnkQWTCqMPLybZwg = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

function defineNitroPlugin(def) {
  return def;
}

const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  // hashed
  name: text("name"),
  avatar: text("avatar"),
  // 头像 base64 或 URL
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const upstreams = sqliteTable("upstreams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  // 上游名称，用户自定义，如 "我的MJ", "公司API"
  baseUrl: text("base_url").notNull(),
  // API请求前缀
  apiKey: text("api_key").notNull(),
  // API密钥（主Key）
  apiKeys: text("api_keys", { mode: "json" }).$type(),
  // 多Key配置
  remark: text("remark"),
  // 备注说明
  sortOrder: integer("sort_order").notNull().default(999),
  // 排序顺序，0 表示置顶
  upstreamPlatform: text("upstream_platform").$type(),
  // 上游平台类型（用于余额查询）
  userApiKey: text("user_api_key"),
  // 用户在该平台的 Key（用于余额查询等）
  upstreamInfo: text("upstream_info", { mode: "json" }).$type(),
  // 上游信息缓存（余额、用户信息等）
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const aimodels = sqliteTable("aimodels", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  upstreamId: integer("upstream_id").notNull(),
  // 关联上游配置
  category: text("category").$type().notNull(),
  // 模型分类：image | chat
  modelType: text("model_type").$type().notNull(),
  // 界面显示的模型类型
  apiFormat: text("api_format").$type().notNull(),
  // 实际请求时使用的 API 格式
  modelName: text("model_name").notNull(),
  // 发送给上游的模型标识符
  estimatedTime: integer("estimated_time").notNull().default(60),
  // 预计时间（秒）
  keyName: text("key_name").notNull().default("default"),
  // 使用的 Key 名称
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
  // 软删除：null=正常，有值=已删除
});
const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().default(1),
  upstreamId: integer("upstream_id").notNull(),
  // 关联上游配置
  aimodelId: integer("aimodel_id").notNull(),
  // 关联 AI 模型
  taskType: text("task_type").$type().notNull().default("image"),
  // 任务类型：image | video
  modelType: text("model_type").$type().notNull(),
  // 实际使用的模型类型（冗余，便于查询）
  apiFormat: text("api_format").$type().notNull(),
  // 使用的请求格式（冗余，便于查询）
  modelName: text("model_name").notNull(),
  // 实际使用的模型名称（冗余，便于查询）
  prompt: text("prompt"),
  modelParams: text("model_params", { mode: "json" }).$type(),
  // 模型专用参数（JSON）
  images: text("images", { mode: "json" }).$type().default([]),
  type: text("type").notNull().default("imagine"),
  // imagine | blend（图片任务专用）
  status: text("status").$type().notNull().default("pending"),
  upstreamTaskId: text("upstream_task_id"),
  // 上游返回的任务ID
  progress: text("progress"),
  // 进度，如 "50%"
  resourceUrl: text("resource_url"),
  // 产物 URL（图片或视频），本地化前为远程 URL，本地化后为服务器相对路径
  error: text("error"),
  // 错误信息
  isBlurred: integer("is_blurred", { mode: "boolean" }).notNull().default(true),
  // 图片模糊状态（防窥屏）
  uniqueId: text("unique_id"),
  // 唯一标识（用于嵌入式绘图组件的去重和缓存）
  sourceType: text("source_type").$type().default("workbench"),
  // 任务来源：workbench=绘图工作台，chat=对话嵌入
  buttons: text("buttons", { mode: "json" }).$type(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
  // 软删除：null=正常，有值=已删除
});
const assistants = sqliteTable("assistants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  avatar: text("avatar"),
  // 头像图片路径
  systemPrompt: text("system_prompt"),
  upstreamId: integer("upstream_id"),
  // 关联上游配置
  aimodelId: integer("aimodel_id"),
  // 关联 AI 模型
  modelName: text("model_name"),
  // 当前使用的模型名（冗余，便于显示）
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  suggestions: text("suggestions", { mode: "json" }).$type(),
  // 开场白建议缓存
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  assistantId: integer("assistant_id").notNull(),
  title: text("title").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  conversationId: integer("conversation_id").notNull(),
  role: text("role").$type().notNull(),
  content: text("content").notNull(),
  files: text("files", { mode: "json" }).$type(),
  // 附件文件列表
  upstreamId: integer("upstream_id"),
  // 关联上游配置，仅 assistant 消息
  aimodelId: integer("aimodel_id"),
  // 关联 AI 模型，仅 assistant 消息
  modelName: text("model_name"),
  // 使用的模型名（冗余，便于显示），仅 assistant 消息
  mark: text("mark").$type(),
  // 消息标记：error=错误，compress-request=压缩请求，compress-response=压缩响应
  status: text("status").$type(),
  // AI 消息状态：created/pending/streaming/completed/stopped/failed
  sortId: integer("sort_id"),
  // 排序ID，用于压缩后消息重排序
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const userSettings = sqliteTable("user_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
}, (table) => [
  unique().on(table.userId, table.key)
]);
const workflows = sqliteTable("workflows", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  filename: text("filename").notNull(),
  // JSON 文件名，如 "wf-1735456789.json"
  thumbnail: text("thumbnail"),
  // 缩略图 URL
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
  // 软删除
});
const workflowRuns = sqliteTable("workflow_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workflowId: integer("workflow_id").notNull(),
  // 关联工作流（用于查询历史）
  userId: integer("user_id").notNull(),
  status: text("status").$type().notNull().default("pending"),
  runMode: text("run_mode").$type().notNull().default("normal"),
  // 运行模式：普通/单步
  snapshotFilename: text("snapshot_filename").notNull(),
  // 执行时的工作流快照文件
  error: text("error"),
  // 失败时的错误信息
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});
const workflowRunNodes = sqliteTable("workflow_run_nodes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  runId: integer("run_id").notNull(),
  // 关联执行记录
  nodeId: text("node_id").notNull(),
  // 节点 ID（快照中的 id）
  status: text("status").$type().notNull().default("idle"),
  inputs: text("inputs", { mode: "json" }).$type(),
  // 节点输入（通用 JSON）
  outputs: text("outputs", { mode: "json" }).$type(),
  // 节点输出（通用 JSON，包含 taskId 等）
  error: text("error"),
  // 错误信息
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
}, (table) => ({
  runNodeUnique: unique().on(table.runId, table.nodeId)
}));
const workflowTemplates = sqliteTable("workflow_templates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").$type().notNull().default("image"),
  filename: text("filename").notNull(),
  // 模板 JSON 文件名
  thumbnail: text("thumbnail"),
  // 预览图
  isBuiltin: integer("is_builtin", { mode: "boolean" }).notNull().default(false),
  // 是否内置模板
  userId: integer("user_id"),
  // 用户自建模板时的用户ID，内置模板为 null
  usageCount: integer("usage_count").notNull().default(0),
  // 使用次数
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  aimodels: aimodels,
  assistants: assistants,
  conversations: conversations,
  messages: messages,
  tasks: tasks,
  upstreams: upstreams,
  userSettings: userSettings,
  users: users,
  workflowRunNodes: workflowRunNodes,
  workflowRuns: workflowRuns,
  workflowTemplates: workflowTemplates,
  workflows: workflows
}, Symbol.toStringTag, { value: 'Module' }));

function getDbPath() {
  if (process.env.MJ_DATA_PATH) {
    return join$1(process.env.MJ_DATA_PATH, "data", "mj-studio.db");
  }
  return "./data/mj-studio.db";
}
const dbPath = getDbPath();
const dir = dirname$2(dbPath);
if (!existsSync$1(dir)) {
  mkdirSync(dir, { recursive: true });
}
const sqlite = new Database(dbPath);
const db = drizzle(sqlite, { schema });

const builtinTemplates = [
  {
    name: "\u6587\u751F\u56FE",
    description: "\u8F93\u5165\u63D0\u793A\u8BCD\u751F\u6210\u56FE\u7247",
    category: "image",
    filename: "text-to-image.json"
  },
  {
    name: "\u56FE\u751F\u56FE",
    description: "\u4E0A\u4F20\u53C2\u8003\u56FE\u751F\u6210\u65B0\u56FE\u7247",
    category: "image",
    filename: "image-to-image.json"
  },
  {
    name: "\u56FE\u7247\u6DF7\u5408",
    description: "\u6DF7\u5408\u591A\u5F20\u56FE\u7247\u751F\u6210\u65B0\u56FE\u7247",
    category: "image",
    filename: "image-blend.json"
  }
];
const _JkZw3FpXBESHcfZ3P5g6RGxE2wEDJefkBQC7FSYQezA = defineNitroPlugin(async () => {
  const existingTemplates = await db.select().from(workflowTemplates).where(eq(workflowTemplates.isBuiltin, true));
  if (existingTemplates.length === 0) {
    console.log("[Templates] \u521D\u59CB\u5316\u5185\u7F6E\u5DE5\u4F5C\u6D41\u6A21\u677F...");
    for (const template of builtinTemplates) {
      await db.insert(workflowTemplates).values({
        name: template.name,
        description: template.description,
        category: template.category,
        filename: template.filename,
        isBuiltin: true
      });
    }
    console.log("[Templates] \u5185\u7F6E\u6A21\u677F\u521D\u59CB\u5316\u5B8C\u6210");
  }
});

const _gPYVESAOD6ImXFmJXmT4hzSLT1UML0ByZ7BLHvhyu0 = defineNitroPlugin(async () => {
  const migrationsFolder = existsSync$1("/app/server/database/migrations") ? "/app/server/database/migrations" : "./server/database/migrations";
  try {
    migrate(db, { migrationsFolder });
    console.log("[DB] \u6570\u636E\u5E93\u8FC1\u79FB\u5B8C\u6210");
  } catch (error) {
    console.error("[DB] \u6570\u636E\u5E93\u8FC1\u79FB\u5931\u8D25:", error);
    throw error;
  }
});

const plugins = [
  _3bMEKkEReLel6qHHqZYU3qZCJaCnkQWTCqMPLybZwg,
_JkZw3FpXBESHcfZ3P5g6RGxE2wEDJefkBQC7FSYQezA,
_gPYVESAOD6ImXFmJXmT4hzSLT1UML0ByZ7BLHvhyu0
];

const assets = {
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"7ef6-c+GjQPS2dP1JIE4239qEZhUcy8Q\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 32502,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"214dd-0kVcTP29xTtuD3iLr7UCv9pOV+o\"",
    "mtime": "2026-01-03T12:04:38.767Z",
    "size": 136413,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"7304-1SLyAs2vx7sLHw9bzFfRhfA6cUE\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 29444,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"579-+j2c9jicsXEPcg4+MARBXa8sFNI\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 1401,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"a4a-R5ABMxxOfV3ngGIXiRO0OzWbnPQ\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 2634,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"1536-YBoeTJwYAbychm4V9AoYPHL+lRg\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 5430,
    "path": "../public/favicon.ico"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"c2bb-UKq3I+KUH34f7lQTOa9azx0nc0A\"",
    "mtime": "2026-01-03T12:04:38.767Z",
    "size": 49851,
    "path": "../public/logo.png"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1cf-Mao+N+kZ+8vkgiIM8zo9zpZr92M\"",
    "mtime": "2026-01-03T12:04:38.766Z",
    "size": 463,
    "path": "../public/site.webmanifest"
  },
  "/_nuxt/1DNp92w6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10eaa-Tms8SPKysZn0kzAHmaEZ9Er8zfE\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 69290,
    "path": "../public/_nuxt/1DNp92w6.js"
  },
  "/_nuxt/2BvrFYEm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ca2-CUqZGi+0/H6NEFZAMl+rzABUC+A\"",
    "mtime": "2026-01-03T12:04:38.738Z",
    "size": 7330,
    "path": "../public/_nuxt/2BvrFYEm.js"
  },
  "/_nuxt/2EtD6e53.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a40-FxoxMur6Dw3zdZbmDxlIGKffGO4\"",
    "mtime": "2026-01-03T12:04:38.738Z",
    "size": 27200,
    "path": "../public/_nuxt/2EtD6e53.js"
  },
  "/_nuxt/2UxHyX5q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b24-TbqzitCxsAi/CC79SX3w/WqVaKM\"",
    "mtime": "2026-01-03T12:04:38.738Z",
    "size": 2852,
    "path": "../public/_nuxt/2UxHyX5q.js"
  },
  "/_nuxt/3e1v2bzS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244f-x//k8Ln2Mu2aG+nMmuAM/ZSHTfI\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 9295,
    "path": "../public/_nuxt/3e1v2bzS.js"
  },
  "/_nuxt/4A_iFExJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ebd-5HxcHSUO1Rp+MtmaNXIOazspDYQ\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 7869,
    "path": "../public/_nuxt/4A_iFExJ.js"
  },
  "/_nuxt/5i3qLPDT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53db-ZiyEJlLqhDLiRUPPS8qnjc7E8tY\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 21467,
    "path": "../public/_nuxt/5i3qLPDT.js"
  },
  "/_nuxt/85-TOEBH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ab13-tTb3MZeWSCVh54/HytL4NH/B4AE\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 43795,
    "path": "../public/_nuxt/85-TOEBH.js"
  },
  "/_nuxt/9BQeByXX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"75d4-sAMfZ0yJqsm5y0oiBXLOFEEiJLg\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 30164,
    "path": "../public/_nuxt/9BQeByXX.js"
  },
  "/_nuxt/B0m2ddpp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48ca-vlOlJTQln4FlkoNCT6son9MOgUc\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 18634,
    "path": "../public/_nuxt/B0m2ddpp.js"
  },
  "/_nuxt/B1dDrJ26.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17d61-TrwCTUCIFLHMi/rIhVQu658XLjc\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 97633,
    "path": "../public/_nuxt/B1dDrJ26.js"
  },
  "/_nuxt/B1yitclQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3add-ufimIYGXDlL0EgbcKm6sk+XsSGI\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 15069,
    "path": "../public/_nuxt/B1yitclQ.js"
  },
  "/_nuxt/B6aJPvgy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11140-XETFItwVwxRkr1lmxpmD5HhYfw4\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 69952,
    "path": "../public/_nuxt/B6aJPvgy.js"
  },
  "/_nuxt/B7mTdjB0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26d5-Zx7qpUhhqjqkejhteLDsh7vIk0c\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 9941,
    "path": "../public/_nuxt/B7mTdjB0.js"
  },
  "/_nuxt/BE2KfCdU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b63-e0T04SZfelrdzFyEAj5+idUPrEQ\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 15203,
    "path": "../public/_nuxt/BE2KfCdU.js"
  },
  "/_nuxt/BEDo0Tqx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7962-W8Zq6vkpJXFrPEIdunwl91AIHKs\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 31074,
    "path": "../public/_nuxt/BEDo0Tqx.js"
  },
  "/_nuxt/BERRCDM3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19bb-nUf63qq6pEagXjjvuNW38yym57E\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 6587,
    "path": "../public/_nuxt/BERRCDM3.js"
  },
  "/_nuxt/BETggiCN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c7d-AcNW89Tci3z8q5i7lPvI+IH2kRQ\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 11389,
    "path": "../public/_nuxt/BETggiCN.js"
  },
  "/_nuxt/BEwlwnbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f5-PZNMMq3Q3ZcnZluOhnwRXAv7MyI\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 1525,
    "path": "../public/_nuxt/BEwlwnbL.js"
  },
  "/_nuxt/BFfxhgS-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e545-9nfWWnq0D6YjsyCrBqY1RQMKQ0E\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 58693,
    "path": "../public/_nuxt/BFfxhgS-.js"
  },
  "/_nuxt/BGHnOYBU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dd4-zbHQm1TKEY+DRiYFP+TkYWHVucw\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 24020,
    "path": "../public/_nuxt/BGHnOYBU.js"
  },
  "/_nuxt/BGJmEYvX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1503-fxRxAQeZpp7xENOzrG1KuuTc+RI\"",
    "mtime": "2026-01-03T12:04:38.739Z",
    "size": 5379,
    "path": "../public/_nuxt/BGJmEYvX.js"
  },
  "/_nuxt/BGhP86RK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18eb-KhPO5L3uwPOjz8cU7RVKDIqFZxM\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 6379,
    "path": "../public/_nuxt/BGhP86RK.js"
  },
  "/_nuxt/BIGW1oBm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"119b1-TXRunCor+xNEpG3lfVJUp0LmK4U\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 72113,
    "path": "../public/_nuxt/BIGW1oBm.js"
  },
  "/_nuxt/BJDFO7_C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11ab-K0fUnPcRRWlV/GT25Mm8Gr1Rs/U\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 4523,
    "path": "../public/_nuxt/BJDFO7_C.js"
  },
  "/_nuxt/BKT0n4s3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6be-jhDljZmBYCA3gM0x3UdZJCGFfxk\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 1726,
    "path": "../public/_nuxt/BKT0n4s3.js"
  },
  "/_nuxt/BLmx8bSh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35fe-R023PiwOXs3BcHKnjis9I9KXkqM\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 13822,
    "path": "../public/_nuxt/BLmx8bSh.js"
  },
  "/_nuxt/BLtJtn59.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b6f-nHFCoDyJhJkOQzQ/IezDFb567j0\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 23407,
    "path": "../public/_nuxt/BLtJtn59.js"
  },
  "/_nuxt/BM1_JUlF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b02-ERlTjrOjBBLAXSCjjw/zvkNB0E8\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 6914,
    "path": "../public/_nuxt/BM1_JUlF.js"
  },
  "/_nuxt/BMWR74SV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cad-OB9h+m68LDZhNIJI/7Dm9Pp+W74\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 11437,
    "path": "../public/_nuxt/BMWR74SV.js"
  },
  "/_nuxt/BOxYQfEP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f96-96p84gnt/LnSzjWxHhzN4vH84tY\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 8086,
    "path": "../public/_nuxt/BOxYQfEP.js"
  },
  "/_nuxt/BPQ3VLAy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c358-mGmjlgi1tYtbl/r9q5mAvA8JVWU\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 181080,
    "path": "../public/_nuxt/BPQ3VLAy.js"
  },
  "/_nuxt/BQ8w6xss.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"172b-ORZ3F3hSbRBqfCkxIm3pXHgh4yk\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 5931,
    "path": "../public/_nuxt/BQ8w6xss.js"
  },
  "/_nuxt/BQBMYfgx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2596-s7aPjEmD1VNUDpAzjascs6vGOoM\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 9622,
    "path": "../public/_nuxt/BQBMYfgx.js"
  },
  "/_nuxt/BQpKpFx0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-3pWCFoNSl8tOZmOxg4gVQrZAKkY\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 177,
    "path": "../public/_nuxt/BQpKpFx0.js"
  },
  "/_nuxt/BR5kRUq4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e48-xClwbA8UXeeYcar4hSloUmZpd4s\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 20040,
    "path": "../public/_nuxt/BR5kRUq4.js"
  },
  "/_nuxt/BRHolxvo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18da-8++M5zKGJDCsg41tq/fftTBP6c8\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 6362,
    "path": "../public/_nuxt/BRHolxvo.js"
  },
  "/_nuxt/BRQX8RF5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d90-WWTNgk2gFJYqeXKCYWmQTWCk64M\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 3472,
    "path": "../public/_nuxt/BRQX8RF5.js"
  },
  "/_nuxt/BRZ36xJF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c1-dBb8JP58ygSE1o0pfid6KrDQYSo\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 1473,
    "path": "../public/_nuxt/BRZ36xJF.js"
  },
  "/_nuxt/BTI9YE7E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20a1-q9ZOVOva/gqr6eTx2Sz8OlWXnkE\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 8353,
    "path": "../public/_nuxt/BTI9YE7E.js"
  },
  "/_nuxt/BTJTHyun.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ca7-EideOLsA5wNU/nHGv5EArngV5s8\"",
    "mtime": "2026-01-03T12:04:38.740Z",
    "size": 3239,
    "path": "../public/_nuxt/BTJTHyun.js"
  },
  "/_nuxt/BTifaqeh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"62d0-JVtNtIFDWynX+x9fWmWPwClFd/g\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 25296,
    "path": "../public/_nuxt/BTifaqeh.js"
  },
  "/_nuxt/BV7otONQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"86d-3SQ19yFt37om3+7Q64AGATSSX9s\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 2157,
    "path": "../public/_nuxt/BV7otONQ.js"
  },
  "/_nuxt/BVQ-GDCI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14cd-X8H519wmmDXl743Y6idpYgwZSfk\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 5325,
    "path": "../public/_nuxt/BVQ-GDCI.js"
  },
  "/_nuxt/BWvSN4gD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2745-HIN4m3g5rCnkE6oZ43rkCdHdGRI\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 10053,
    "path": "../public/_nuxt/BWvSN4gD.js"
  },
  "/_nuxt/BXkSAIEj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5254-Axn1fQr9TF+GkmVdLvo6H+JJ8B8\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 21076,
    "path": "../public/_nuxt/BXkSAIEj.js"
  },
  "/_nuxt/BYV0-3_D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"98d3-uH6cYyeI4eujD8qDSW4cHNfX9rg\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 39123,
    "path": "../public/_nuxt/BYV0-3_D.js"
  },
  "/_nuxt/BYunw83y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12a0-AHQ/NDDXxCH9863kiX3w985xeU8\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 4768,
    "path": "../public/_nuxt/BYunw83y.js"
  },
  "/_nuxt/BZxhoCUq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b17-/qVerym4HRWqXlLYRUh4xLhGpoM\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 31511,
    "path": "../public/_nuxt/BZxhoCUq.js"
  },
  "/_nuxt/B_m7g4N7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e3-vD9JpGY0mKtBCmzkjdIj7UVuzls\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 739,
    "path": "../public/_nuxt/B_m7g4N7.js"
  },
  "/_nuxt/Bc6EcWN3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16d2-helrDcVzPjxcZ7PvY5Hh3V7+6uE\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 5842,
    "path": "../public/_nuxt/Bc6EcWN3.js"
  },
  "/_nuxt/BcOcwvcX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6cd-68IbxZPtS8UtKOhcJpPOx3Qxas4\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 1741,
    "path": "../public/_nuxt/BcOcwvcX.js"
  },
  "/_nuxt/BcVCzyr7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"339e-SKRI88NRDnPm6N2EqYajhTXuimk\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 13214,
    "path": "../public/_nuxt/BcVCzyr7.js"
  },
  "/_nuxt/BdImnpbu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3dec-bgwEd+WyhBylpI0pZOT+RO156Ts\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 15852,
    "path": "../public/_nuxt/BdImnpbu.js"
  },
  "/_nuxt/BdnUsdx6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2251-SYFMWiCOAz7wM7GBTxW8bo9kXBQ\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 8785,
    "path": "../public/_nuxt/BdnUsdx6.js"
  },
  "/_nuxt/BfHTSMKl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48c5-2KtadDLdcujxXy8y4Bt2hElnnOs\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 18629,
    "path": "../public/_nuxt/BfHTSMKl.js"
  },
  "/_nuxt/BfjtVDDH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37c3-xDmtEk31qK1Bh5UReLYFJAKxJ5I\"",
    "mtime": "2026-01-03T12:04:38.741Z",
    "size": 14275,
    "path": "../public/_nuxt/BfjtVDDH.js"
  },
  "/_nuxt/BgDCqdQA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1f1-Hu9sPs6I5PgTPGWd3WR7nOwmRy8\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 53745,
    "path": "../public/_nuxt/BgDCqdQA.js"
  },
  "/_nuxt/BgmUBLD9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f1-yV2s+b8FN3zMTPZpf6dZQj04v+I\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 753,
    "path": "../public/_nuxt/BgmUBLD9.js"
  },
  "/_nuxt/BhOHFoWU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da4d-R+kP5pmrFiRoo3VbW1IEmpd1Bf0\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 55885,
    "path": "../public/_nuxt/BhOHFoWU.js"
  },
  "/_nuxt/BkioyH1T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3258-47zr9C6nRRWlESN9ndo9NoGdvw4\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 12888,
    "path": "../public/_nuxt/BkioyH1T.js"
  },
  "/_nuxt/Bkuqu6BP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"356d-zBk2O671hcu14yjA5BaP8bRgML4\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 13677,
    "path": "../public/_nuxt/Bkuqu6BP.js"
  },
  "/_nuxt/BmXAJ9_W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"729-rN8IeRFLp6DZG7tp1HIrSBbwsc0\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 1833,
    "path": "../public/_nuxt/BmXAJ9_W.js"
  },
  "/_nuxt/Bmn6On1c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1506-J1rB1bjFmTVIluJU4sEaYsE3Juw\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 5382,
    "path": "../public/_nuxt/Bmn6On1c.js"
  },
  "/_nuxt/Bp3cYrEr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"98d8f-8RrU5b3H4tVuWhYXGrOMNc2PvMI\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 626063,
    "path": "../public/_nuxt/Bp3cYrEr.js"
  },
  "/_nuxt/Bp6g37R7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"223-LScnQcrupWjGOHlgVTaKyfzcpy0\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 547,
    "path": "../public/_nuxt/Bp6g37R7.js"
  },
  "/_nuxt/BqTXFGrv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"171d-lUINc6tasPVDaeXG5IELLZmCmt4\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 5917,
    "path": "../public/_nuxt/BqTXFGrv.js"
  },
  "/_nuxt/BqYA7rlc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"168e5-mgmTiKRuxEJmiFGY79i8BONQOOw\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 92389,
    "path": "../public/_nuxt/BqYA7rlc.js"
  },
  "/_nuxt/Br6cN0cg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25cf-e0sNS0wmKhLQ1Yv+4h34OHw0i1I\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 9679,
    "path": "../public/_nuxt/Br6cN0cg.js"
  },
  "/_nuxt/BrzmwbiE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1148-k62Qcv6nO077MQP/K2PH4atIuPw\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 4424,
    "path": "../public/_nuxt/BrzmwbiE.js"
  },
  "/_nuxt/BsBDnP6U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6a-S5dxQZEbI/H+eK2ceeQz2NIahw8\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 3434,
    "path": "../public/_nuxt/BsBDnP6U.js"
  },
  "/_nuxt/BsS91CYL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e74-4TsvZZCWM7loBhSgwbvT2cj+Fnw\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 3700,
    "path": "../public/_nuxt/BsS91CYL.js"
  },
  "/_nuxt/BspZqrRM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a11-tsm77NoL6WBKDwOyaY/9CUqp5qY\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 2577,
    "path": "../public/_nuxt/BspZqrRM.js"
  },
  "/_nuxt/BtCnVYZw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6c-GlWeoON+G/NFmOIlkTSvwGfstsM\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 3436,
    "path": "../public/_nuxt/BtCnVYZw.js"
  },
  "/_nuxt/BtOb2qkB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c37-RsS3y96TeMzX13BZFHTRQS5DKjk\"",
    "mtime": "2026-01-03T12:04:38.742Z",
    "size": 3127,
    "path": "../public/_nuxt/BtOb2qkB.js"
  },
  "/_nuxt/BthQWCQV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"239d-LHMBsyUFh86qGFvM+u7t3WkZtbw\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 9117,
    "path": "../public/_nuxt/BthQWCQV.js"
  },
  "/_nuxt/BtqSS_iP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28e5-Ht/82d0xW+dYHuRhknXADn5xqYk\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 10469,
    "path": "../public/_nuxt/BtqSS_iP.js"
  },
  "/_nuxt/BtvRca6l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13b0-mVuzs8Ruq+aXijpgj9PrmkTpYjk\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 5040,
    "path": "../public/_nuxt/BtvRca6l.js"
  },
  "/_nuxt/Bu9oaDYs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43b3-iTwat5xPVcR53kDSi2NpQL93qtI\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 17331,
    "path": "../public/_nuxt/Bu9oaDYs.js"
  },
  "/_nuxt/Buea-lGh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"290a-GCHC0QDId6leZ9Xhk+7ArK7tKlc\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 10506,
    "path": "../public/_nuxt/Buea-lGh.js"
  },
  "/_nuxt/BvAqAH-y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b3d-5cBMXzs00CDTGYrxxuKLI6ZDrZE\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 15165,
    "path": "../public/_nuxt/BvAqAH-y.js"
  },
  "/_nuxt/Bv_4Rxtq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c75-5QbmNaKwp169pqgnvicy8N3f0FI\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 23669,
    "path": "../public/_nuxt/Bv_4Rxtq.js"
  },
  "/_nuxt/BvzEVeQv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32ee-4/tmk993dh0d4g2xX+B5PIY73os\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 13038,
    "path": "../public/_nuxt/BvzEVeQv.js"
  },
  "/_nuxt/Bw305WKR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5125-tbBJwAwza6HClVoP6OvDw/UyczE\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 20773,
    "path": "../public/_nuxt/Bw305WKR.js"
  },
  "/_nuxt/BzJJZx-M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"524a-+n2NQF4pUrirtbVLSya0Zll9gp8\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 21066,
    "path": "../public/_nuxt/BzJJZx-M.js"
  },
  "/_nuxt/BzTr9Aqm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a873-3Bldgt/9rbmbe1FRfzwLO0vJIC8\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 43123,
    "path": "../public/_nuxt/BzTr9Aqm.js"
  },
  "/_nuxt/C-Jbm3Hp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2310-lFhL4W/OHHbKAVRYS3Bclqg/Yow\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 8976,
    "path": "../public/_nuxt/C-Jbm3Hp.js"
  },
  "/_nuxt/C-SQnVFl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"929-/U97HrLoeqgKudonAqqjJMFFlXA\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 2345,
    "path": "../public/_nuxt/C-SQnVFl.js"
  },
  "/_nuxt/C-s9zLdV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eae-NDv2GaUg52IGaXzIWcM4TuqYngM\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 3758,
    "path": "../public/_nuxt/C-s9zLdV.js"
  },
  "/_nuxt/C-sUppwS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4fb0-9u/H0VCkmpLkAg66rZH6BHxZdlo\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 20400,
    "path": "../public/_nuxt/C-sUppwS.js"
  },
  "/_nuxt/C0HS_06l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"123f-1Ufxt80Jy4qlc4UDFjRi9iUnjkU\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 4671,
    "path": "../public/_nuxt/C0HS_06l.js"
  },
  "/_nuxt/C0hk2d4L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f3f1-KgCzwoHRwjbxZaP6ink59wwzbbI\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 62449,
    "path": "../public/_nuxt/C0hk2d4L.js"
  },
  "/_nuxt/C151Ov-r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70d4-wGKAh6lOVnNsBzQyCibTcUdXssQ\"",
    "mtime": "2026-01-03T12:04:38.743Z",
    "size": 28884,
    "path": "../public/_nuxt/C151Ov-r.js"
  },
  "/_nuxt/C2t-YnRu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8be-BdSMgrO+USuA6E3a7KoahrHe8u0\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 2238,
    "path": "../public/_nuxt/C2t-YnRu.js"
  },
  "/_nuxt/C39BiMTA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70f1-XkEMDsROL+KqTkmkI7vaY0QDB/s\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 28913,
    "path": "../public/_nuxt/C39BiMTA.js"
  },
  "/_nuxt/C3B-1QV4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d28-XAzny1ImKuJUZamMlmHmm/BD/9Y\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 3368,
    "path": "../public/_nuxt/C3B-1QV4.js"
  },
  "/_nuxt/C3mMm8J8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2389-BXT9xKjaiqBfp3OCAewo89+9Wpg\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 9097,
    "path": "../public/_nuxt/C3mMm8J8.js"
  },
  "/_nuxt/C4EeE6gA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b08-KmbnfQ8Ei2Kon1V5upy/OVthJ3U\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 2824,
    "path": "../public/_nuxt/C4EeE6gA.js"
  },
  "/_nuxt/C4IJs8-o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1a-8aks3vVsZQj5hNxJQRsrey922aQ\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 3610,
    "path": "../public/_nuxt/C4IJs8-o.js"
  },
  "/_nuxt/C67Mt4MT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"224d-OdySHvjgFBhMvzBZUfmNzkjY2so\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 8781,
    "path": "../public/_nuxt/C67Mt4MT.js"
  },
  "/_nuxt/C8M2exoo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1f4-DRqIliTj8jrkpY6QITy6jlt6T6w\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 53748,
    "path": "../public/_nuxt/C8M2exoo.js"
  },
  "/_nuxt/C8lEn-DE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ea-+fq0/BxvZOQ+157ZaRNbUKWMmIo\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 1002,
    "path": "../public/_nuxt/C8lEn-DE.js"
  },
  "/_nuxt/C98Dy4si.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c01-VUG+1iT01a0kCn8IMegiA7kD8D8\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 7169,
    "path": "../public/_nuxt/C98Dy4si.js"
  },
  "/_nuxt/C9XAeP06.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"be64e-6j4+9QqAL4Yu9MlQeacqh3Jw6Lw\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 779854,
    "path": "../public/_nuxt/C9XAeP06.js"
  },
  "/_nuxt/C9dUb6Cb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b898-D//F1VTec6VOvR0PtDhv4wo4F3o\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 47256,
    "path": "../public/_nuxt/C9dUb6Cb.js"
  },
  "/_nuxt/C9oPPf7i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4634-IKtlrnOxcM/fpPNXGlwLJ7t8FIA\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 17972,
    "path": "../public/_nuxt/C9oPPf7i.js"
  },
  "/_nuxt/C9qVkTfN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d32-+bgXCmTpsUA7yaGorCtLZT8/SiQ\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 3378,
    "path": "../public/_nuxt/C9qVkTfN.js"
  },
  "/_nuxt/C9tS-k6U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cb6-WMEQhOmf/eRS2CBgxVt3VoKu15E\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 3254,
    "path": "../public/_nuxt/C9tS-k6U.js"
  },
  "/_nuxt/CA7CTBwS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8a28-Fa7ZMD0uw4f2GewRR4T7L3K1Cbc\"",
    "mtime": "2026-01-03T12:04:38.744Z",
    "size": 35368,
    "path": "../public/_nuxt/CA7CTBwS.js"
  },
  "/_nuxt/CDVJQ6XC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f34-l4lshctyWXL1K72SQV1MqxXk21E\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 7988,
    "path": "../public/_nuxt/CDVJQ6XC.js"
  },
  "/_nuxt/CDx5xZoG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12398-uTfzmRGdqlJD9zZxgyVMNApfoaw\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 74648,
    "path": "../public/_nuxt/CDx5xZoG.js"
  },
  "/_nuxt/CEL-wOlO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f5-gMIahiN1LceQHRvX/WPS7GXLlx8\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 5365,
    "path": "../public/_nuxt/CEL-wOlO.js"
  },
  "/_nuxt/CEu0bR-o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"170f-3XSkPgCStSs/gbtQ0HgxOEMmg+g\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 5903,
    "path": "../public/_nuxt/CEu0bR-o.js"
  },
  "/_nuxt/CF10PKvl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e84-3IDVeuUTU5679WbU0r2fTtR2PKM\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 7812,
    "path": "../public/_nuxt/CF10PKvl.js"
  },
  "/_nuxt/CFHQjOhq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5869-XrrvvE3T9W/Ui3W7fRUvxWPqAO4\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 22633,
    "path": "../public/_nuxt/CFHQjOhq.js"
  },
  "/_nuxt/CG6Dc4jp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97f00-rYm+CybCMCqxOZ2Np2GsfIrREbo\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 622336,
    "path": "../public/_nuxt/CG6Dc4jp.js"
  },
  "/_nuxt/CG8Ifv2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2362-2XkV97PLz425EG8zHr8ozCO4Tbo\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 9058,
    "path": "../public/_nuxt/CG8Ifv2g.js"
  },
  "/_nuxt/CH1njM8p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"586c-1ZAp+0fULnO1jBcrgqPtsC5TWrg\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 22636,
    "path": "../public/_nuxt/CH1njM8p.js"
  },
  "/_nuxt/CHDMZO_x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23d2-MxDpogrtntuihsXgp57aeVHvtDw\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 9170,
    "path": "../public/_nuxt/CHDMZO_x.js"
  },
  "/_nuxt/CHEUhdok.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b61-SZZdkrgQA3o9uSuq+/F1ScGkwVc\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 7009,
    "path": "../public/_nuxt/CHEUhdok.js"
  },
  "/_nuxt/CHLpvVh8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2301-/sCEGRGMod7gJaqHeCyM1VkU3yE\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 8961,
    "path": "../public/_nuxt/CHLpvVh8.js"
  },
  "/_nuxt/CHM0blh-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12bb-fPRx08SxnrB/lHHEB9RUmE0c4rI\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 4795,
    "path": "../public/_nuxt/CHM0blh-.js"
  },
  "/_nuxt/CIYbVf2q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10ae-NLPgxMCnw4YkTsB+eGeMKubz5GA\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 4270,
    "path": "../public/_nuxt/CIYbVf2q.js"
  },
  "/_nuxt/CJc9bBzg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f8d-k3Lgf+V6X6xXIpOEjbhQLDMsbZA\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 20365,
    "path": "../public/_nuxt/CJc9bBzg.js"
  },
  "/_nuxt/CJsX1qrP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"541-LMvwlitqJSwj7Av2hNHX8AOPpHg\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 1345,
    "path": "../public/_nuxt/CJsX1qrP.js"
  },
  "/_nuxt/CKIfxQSi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cbb-I6BRVMQJ4jtO03yUr51U8CBrIdc\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 3259,
    "path": "../public/_nuxt/CKIfxQSi.js"
  },
  "/_nuxt/CLZrNe3w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13959-u2WgLxZjSGiGVKgsFxdCAvGeDVs\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 80217,
    "path": "../public/_nuxt/CLZrNe3w.js"
  },
  "/_nuxt/CLxacb5B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29fc4-/ibtEGS/esefo3bwSjg2J3R8+Vc\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 171972,
    "path": "../public/_nuxt/CLxacb5B.js"
  },
  "/_nuxt/CMFEf1DS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6344-0Jnr1+q6s69kVi8yl/h0FUTFXOk\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 25412,
    "path": "../public/_nuxt/CMFEf1DS.js"
  },
  "/_nuxt/CO1LY3CK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b71-lXSTyB3PhPCG3roW6XpGpuYCwjY\"",
    "mtime": "2026-01-03T12:04:38.745Z",
    "size": 2929,
    "path": "../public/_nuxt/CO1LY3CK.js"
  },
  "/_nuxt/COkxafJQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1744-pWp1xoASWZq2Mx1hhUbkyiH9JF4\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 5956,
    "path": "../public/_nuxt/COkxafJQ.js"
  },
  "/_nuxt/COt5Ahok.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2adb0-ggLfNVkEhlpfCBmcvdtrZa7kwzY\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 175536,
    "path": "../public/_nuxt/COt5Ahok.js"
  },
  "/_nuxt/CPI9yk3n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1562-qJ1B/AASYM8Ps6zUdMkUp+TYD0Q\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 5474,
    "path": "../public/_nuxt/CPI9yk3n.js"
  },
  "/_nuxt/CR9Quhzy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25b9-dAHxCGCDgjQCCMn4sspRgiXLnOg\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 9657,
    "path": "../public/_nuxt/CR9Quhzy.js"
  },
  "/_nuxt/CS3Unz2-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"82d6-aUEs94AcfLqjSVpnmdfYdfX5koA\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 33494,
    "path": "../public/_nuxt/CS3Unz2-.js"
  },
  "/_nuxt/CSXwinHm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3cb-dBY8mmHRaAJolUqm6P2iCvXK5l8\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 971,
    "path": "../public/_nuxt/CSXwinHm.js"
  },
  "/_nuxt/CTRr51gU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b39-AV5b5gMlIyFBg8ZLVvBtodDGnYI\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 6969,
    "path": "../public/_nuxt/CTRr51gU.js"
  },
  "/_nuxt/CVO1_9PV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3530-TayDmxRMvy5Bv+gyldrxxN/vEUA\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 13616,
    "path": "../public/_nuxt/CVO1_9PV.js"
  },
  "/_nuxt/CVdnzihN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5869-0wTL7NugVjSeNU6NYBqZWcPB9LQ\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 22633,
    "path": "../public/_nuxt/CVdnzihN.js"
  },
  "/_nuxt/CWvOuK_U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3bd-sNWNHNRZaxj/1I0l509cNn7o5iQ\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 957,
    "path": "../public/_nuxt/CWvOuK_U.js"
  },
  "/_nuxt/CXZktZb0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1621-AEcbrimosSQuQ5BMADey+/ttt7Q\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 5665,
    "path": "../public/_nuxt/CXZktZb0.js"
  },
  "/_nuxt/CXsvEkWC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21a3-9L1fbMN0bK/i9rPGOI7wopyTNQA\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 8611,
    "path": "../public/_nuxt/CXsvEkWC.js"
  },
  "/_nuxt/CXtECtnM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1911-fZe8ASwOX9pa4m0uOxpB+WIlN/g\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 6417,
    "path": "../public/_nuxt/CXtECtnM.js"
  },
  "/_nuxt/CXu1NL6O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3612-uZMJDhuMJ5jp2C8KSSmarMr9BwA\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 13842,
    "path": "../public/_nuxt/CXu1NL6O.js"
  },
  "/_nuxt/CYsAdtH9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e11-ENPbAA6Qh0BVn248qDfk2RzVjSw\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 3601,
    "path": "../public/_nuxt/CYsAdtH9.js"
  },
  "/_nuxt/CZlF05X6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43b-UG0SiNiSIWrHV0qynZnNZxCg/UI\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 1083,
    "path": "../public/_nuxt/CZlF05X6.js"
  },
  "/_nuxt/CafNBF8u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1893-d496H0Z60lAg57LiRH/wyqJ+BmM\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 6291,
    "path": "../public/_nuxt/CafNBF8u.js"
  },
  "/_nuxt/Cb4P6-Nf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2927-Oyep6AmvfE7VmNxeobzv9EnTEbk\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 10535,
    "path": "../public/_nuxt/Cb4P6-Nf.js"
  },
  "/_nuxt/CbEc2mCq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1233-0WbrnGBhIy4VWMYroWxf1sHryNU\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 4659,
    "path": "../public/_nuxt/CbEc2mCq.js"
  },
  "/_nuxt/CbFg5uaA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c5c-wNJdDyMsk3QCi0Q7PExTVmW7i74\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 11356,
    "path": "../public/_nuxt/CbFg5uaA.js"
  },
  "/_nuxt/CbP-naxD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37fa-N4BRT8kVkqA5hlCxas2rmxzWz8Y\"",
    "mtime": "2026-01-03T12:04:38.746Z",
    "size": 14330,
    "path": "../public/_nuxt/CbP-naxD.js"
  },
  "/_nuxt/CbfX1IO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36d4-rw7+tMOmFbgQDhwnT0kx7VdqnBs\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 14036,
    "path": "../public/_nuxt/CbfX1IO0.js"
  },
  "/_nuxt/CeAyd5Ju.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ec8-glLTLoyDa+vRwJgKRTZSI8//SUU\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 24264,
    "path": "../public/_nuxt/CeAyd5Ju.js"
  },
  "/_nuxt/CeZK1NFH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ad1-RDeO7ZDbd/y3AkvJ+yTGGnLp4qQ\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 10961,
    "path": "../public/_nuxt/CeZK1NFH.js"
  },
  "/_nuxt/CfQXZHmo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42e6-JdP/XjojKBbDVeNQlQVl/w8pfP0\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 17126,
    "path": "../public/_nuxt/CfQXZHmo.js"
  },
  "/_nuxt/CfeIJUat.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36e1-FY6VCoMKMAjSPeJMOHVsy/P84A0\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 14049,
    "path": "../public/_nuxt/CfeIJUat.js"
  },
  "/_nuxt/Cg-RD9OK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5835-Z+RUSn27jfl1G9hQyN8PQCOIYfU\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 22581,
    "path": "../public/_nuxt/Cg-RD9OK.js"
  },
  "/_nuxt/CgjmDhmW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7930-Ff0OA8lLBGzysSITxYZNf2UXmK0\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 31024,
    "path": "../public/_nuxt/CgjmDhmW.js"
  },
  "/_nuxt/ChMvpjG-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2140-nsDheT+6UjCQula9axhiqVy8zEk\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 8512,
    "path": "../public/_nuxt/ChMvpjG-.js"
  },
  "/_nuxt/CiEDGshs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"343-74ekgV2sOHWLyiZma87fYO3gp6Y\"",
    "mtime": "2026-01-03T12:04:38.747Z",
    "size": 835,
    "path": "../public/_nuxt/CiEDGshs.js"
  },
  "/_nuxt/Cj5Yp3dK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2449-kV67DenHz/V4P1q+ue+MCXlkrK8\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 9289,
    "path": "../public/_nuxt/Cj5Yp3dK.js"
  },
  "/_nuxt/CkByrt1z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a65-kxPcLHTQHgDWu8PHCMqF1Se6xV4\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 6757,
    "path": "../public/_nuxt/CkByrt1z.js"
  },
  "/_nuxt/CkXjmgJE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42e7-+hm358z2R6HWIP4VA2TRRR+lsAA\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 17127,
    "path": "../public/_nuxt/CkXjmgJE.js"
  },
  "/_nuxt/CklMAg4u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"606e-x9rLwKiqfJKSw4tWQHznnBkeSik\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 24686,
    "path": "../public/_nuxt/CklMAg4u.js"
  },
  "/_nuxt/Cl-U1hlN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dee-ILlWFQ0srru/VzvBEtit7GDcfLo\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 24046,
    "path": "../public/_nuxt/Cl-U1hlN.js"
  },
  "/_nuxt/Cl0AqbOI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cde6-2wZVscFqX6aXlpwWOBp9g/ysBi8\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 183782,
    "path": "../public/_nuxt/Cl0AqbOI.js"
  },
  "/_nuxt/Cl2C_jUo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d6d-DnbZlZeWKNI2ol/ny++itBKG7h4\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 7533,
    "path": "../public/_nuxt/Cl2C_jUo.js"
  },
  "/_nuxt/ClbT195z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"157c-a87EDbFfSeF/+d3yiHj4X54Ju7c\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 5500,
    "path": "../public/_nuxt/ClbT195z.js"
  },
  "/_nuxt/Cm3UrAx6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22c1-vXRR/1ZcPrpI4u5n/kdpRiZu+Vc\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 8897,
    "path": "../public/_nuxt/Cm3UrAx6.js"
  },
  "/_nuxt/CmIQRyeF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2038-KghcRFjgi7G/U4ow+bSbc2NhRX8\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 8248,
    "path": "../public/_nuxt/CmIQRyeF.js"
  },
  "/_nuxt/Cmh6b_Ma.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"213b2-zmOe42ksJphKmz10crQCvFQhZ0k\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 136114,
    "path": "../public/_nuxt/Cmh6b_Ma.js"
  },
  "/_nuxt/Cn7AkR1O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dc5-LMzwTOBn4211QDVwlJ7BSXds7ws\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 24005,
    "path": "../public/_nuxt/Cn7AkR1O.js"
  },
  "/_nuxt/CnnebwVN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"df90-SUGs+9AZ7AN6m9cGUzEEm6BH0Zc\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 57232,
    "path": "../public/_nuxt/CnnebwVN.js"
  },
  "/_nuxt/CnnmHF94.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"665b-+0mkGXktTEYnrX15+WbpgNuwksQ\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 26203,
    "path": "../public/_nuxt/CnnmHF94.js"
  },
  "/_nuxt/Co6uUVPk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7383-UtqGMg+XKVkjElKCAJATsfd8CFU\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 29571,
    "path": "../public/_nuxt/Co6uUVPk.js"
  },
  "/_nuxt/Cp-IABpG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b08-0dMeGWm4gC22OpAzs7TTvP5ig+w\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 2824,
    "path": "../public/_nuxt/Cp-IABpG.js"
  },
  "/_nuxt/CpOuai2O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3fad-b7LPl/GBtVLBJGBACm1q0qtZb10\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 16301,
    "path": "../public/_nuxt/CpOuai2O.js"
  },
  "/_nuxt/Cq5zzVJU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bb-Rbl/PP9Xco3e+QNLbRu16G83ziw\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 699,
    "path": "../public/_nuxt/Cq5zzVJU.js"
  },
  "/_nuxt/CquLrc37.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8446-EvYMpIR1xzT2vLOdyWfTpPbQd2g\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 33862,
    "path": "../public/_nuxt/CquLrc37.js"
  },
  "/_nuxt/CsfeWuGM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2a-It3QYb6a3DEBTXizcOoI2IV7JS8\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 3370,
    "path": "../public/_nuxt/CsfeWuGM.js"
  },
  "/_nuxt/Csfq5Kiy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48cb-tPSCpNF7svRHRSnrhMp7s2aYFJE\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 18635,
    "path": "../public/_nuxt/Csfq5Kiy.js"
  },
  "/_nuxt/CuPHTKiy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"925f-jMata9/JB9ZDJZdkdT/rM7zR8aU\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 37471,
    "path": "../public/_nuxt/CuPHTKiy.js"
  },
  "/_nuxt/CufHLc7y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1185-1VigbHLzCrY+YqJ8YacXE865c70\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 4485,
    "path": "../public/_nuxt/CufHLc7y.js"
  },
  "/_nuxt/Cuk6v7N8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3863-ch+lyFS9QkuOdtlQcqnXQ5iOqcc\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 14435,
    "path": "../public/_nuxt/Cuk6v7N8.js"
  },
  "/_nuxt/Cv9koXgw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a65-Q1j891KpAph3EWu90fhfuUDvR08\"",
    "mtime": "2026-01-03T12:04:38.748Z",
    "size": 14949,
    "path": "../public/_nuxt/Cv9koXgw.js"
  },
  "/_nuxt/Cvjx9yec.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e7c7-lfQh0o6fAvAHhV3zEFy6qurT9ng\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 59335,
    "path": "../public/_nuxt/Cvjx9yec.js"
  },
  "/_nuxt/CxGSJlkm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c9-0JSq9WelsQShCN2zJp2R9BQyx4M\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 1225,
    "path": "../public/_nuxt/CxGSJlkm.js"
  },
  "/_nuxt/CxbxFI8M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b13-9Y5cUWnvn9TUbeAfn+y7ZxciIms\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 27411,
    "path": "../public/_nuxt/CxbxFI8M.js"
  },
  "/_nuxt/CxcJYWs2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"166-m0wRpfjs5OpbxvxoYQXZpoZywm0\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 358,
    "path": "../public/_nuxt/CxcJYWs2.js"
  },
  "/_nuxt/CyktbL80.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48c5-38IV7Gj1pi36TR7qiSHzlCs9XIo\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 18629,
    "path": "../public/_nuxt/CyktbL80.js"
  },
  "/_nuxt/CylS5w8V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a53-RPJqR2lLHygui18EmeBeOobkKvc\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 27219,
    "path": "../public/_nuxt/CylS5w8V.js"
  },
  "/_nuxt/CzGMH1O9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24a-nSk77obfFSgU3u+kory0wUNloJo\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 586,
    "path": "../public/_nuxt/CzGMH1O9.js"
  },
  "/_nuxt/CzTSHFRz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"895c-6xWJlVuC0j3DRe5Q2XEU5H01srE\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 35164,
    "path": "../public/_nuxt/CzTSHFRz.js"
  },
  "/_nuxt/Czb6vWdC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5bc-wGxRk5DQCXDqmvcK0mgHJJ/k6Z0\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 1468,
    "path": "../public/_nuxt/Czb6vWdC.js"
  },
  "/_nuxt/D-2ljcwZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"355b-ltA2RbrvMtKWMV4KgoBMozLYWVE\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 13659,
    "path": "../public/_nuxt/D-2ljcwZ.js"
  },
  "/_nuxt/D0YGMca9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1c-98CqF/TmSHN38DVd+EqJSKA689s\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 3356,
    "path": "../public/_nuxt/D0YGMca9.js"
  },
  "/_nuxt/D0r3Knsf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35bf-NpZrPk9jdEu6IxpilmRefOR1sKI\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 13759,
    "path": "../public/_nuxt/D0r3Knsf.js"
  },
  "/_nuxt/D17OF-Vu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17cd-Cz/TCF/9JorAHKqKlpNb/ab4wHU\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 6093,
    "path": "../public/_nuxt/D17OF-Vu.js"
  },
  "/_nuxt/D1j8_8rp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"267f-XGP6trMr+uDrpVsbuQ7BgVfNgiY\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 9855,
    "path": "../public/_nuxt/D1j8_8rp.js"
  },
  "/_nuxt/D22FLkUw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15469-p5+2GTJbwZcv08UMo+ZSMWqUYc0\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 87145,
    "path": "../public/_nuxt/D22FLkUw.js"
  },
  "/_nuxt/D3lLCCz7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c60-jIWrXoYDZEmlv99cyV9ZPbOX+G4\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 7264,
    "path": "../public/_nuxt/D3lLCCz7.js"
  },
  "/_nuxt/D41R7u62.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aa9-sukcNuDLixx+KveYe6JSgNn5R2I\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 2729,
    "path": "../public/_nuxt/D41R7u62.js"
  },
  "/_nuxt/D4_iv3hh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54f9-EjPNweFGDVKXbNMHPHQGASvboag\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 21753,
    "path": "../public/_nuxt/D4_iv3hh.js"
  },
  "/_nuxt/D4aSdv24.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"119fc-A/9gi8lJR/n+wHaa/twxW4sYVoE\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 72188,
    "path": "../public/_nuxt/D4aSdv24.js"
  },
  "/_nuxt/D4h5O-jR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ecc-X4WIf5/MKovdXkpn2ucY2Fvz+nI\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 7884,
    "path": "../public/_nuxt/D4h5O-jR.js"
  },
  "/_nuxt/D5-asLiD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f15-+JaXS6Ccm5m6jT3uzYhE9lYnhXY\"",
    "mtime": "2026-01-03T12:04:38.749Z",
    "size": 12053,
    "path": "../public/_nuxt/D5-asLiD.js"
  },
  "/_nuxt/D53aC0YG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37c3-REFite8OCBD9CZ+JTug00Oc+4So\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 14275,
    "path": "../public/_nuxt/D53aC0YG.js"
  },
  "/_nuxt/D5KoaKCx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48b7-CJZAUj4SYa7cWrWmLW1ca67ky3Y\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 18615,
    "path": "../public/_nuxt/D5KoaKCx.js"
  },
  "/_nuxt/D5W7aGTx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1675-XHgZzzyFkx81S5yafjgL+Tz5ZQk\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 5749,
    "path": "../public/_nuxt/D5W7aGTx.js"
  },
  "/_nuxt/D7Wf_XuP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15d6-aNZU8fUCDoVF4Y3xhpEcAsIiqC4\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 5590,
    "path": "../public/_nuxt/D7Wf_XuP.js"
  },
  "/_nuxt/D7XhsoTB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63be-mu6REgVL7o/qSPt8E6mEK6wG1G8\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 25534,
    "path": "../public/_nuxt/D7XhsoTB.js"
  },
  "/_nuxt/D7o27uSR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ed6-9vOVmjzyrmzC19PO6le7ndF06+E\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 16086,
    "path": "../public/_nuxt/D7o27uSR.js"
  },
  "/_nuxt/D7oLnXFd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"374c-u5ndhk1KsUHitkpMJ6KIbAiO+N0\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 14156,
    "path": "../public/_nuxt/D7oLnXFd.js"
  },
  "/_nuxt/D82EKSYY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f4c-oWCeiDU/QNNZpdlgtaW+nNaRXhU\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 16204,
    "path": "../public/_nuxt/D82EKSYY.js"
  },
  "/_nuxt/D87Tk5Gz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b897-0AQRUGQeQ66H6D6VCr1fiFPiQRg\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 47255,
    "path": "../public/_nuxt/D87Tk5Gz.js"
  },
  "/_nuxt/D8NT0WEE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12b81-ZL8CB+3TVD00EeqH4W5tL+id9Gk\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 76673,
    "path": "../public/_nuxt/D8NT0WEE.js"
  },
  "/_nuxt/D93ZcfNL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1036-S3MZjX4Hin0o4ilbuTPh0XpwNzg\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 4150,
    "path": "../public/_nuxt/D93ZcfNL.js"
  },
  "/_nuxt/D97Zzqfu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a09-Iv5nl+0fTHSk4kWPf95nbKZPxsM\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 2569,
    "path": "../public/_nuxt/D97Zzqfu.js"
  },
  "/_nuxt/DASMixbo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8bf-3EG8cTJhYIIWR7ug2uGWDLDnQOk\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 2239,
    "path": "../public/_nuxt/DASMixbo.js"
  },
  "/_nuxt/DAi9KRSo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bb0-kCaePAc0SkqzEXT/m+0Gi8SfIkE\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 11184,
    "path": "../public/_nuxt/DAi9KRSo.js"
  },
  "/_nuxt/DCNw9jAj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b8f-KFgXpzHctQi9/bClei1KOB2IEZc\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 15247,
    "path": "../public/_nuxt/DCNw9jAj.js"
  },
  "/_nuxt/DDAgXY8S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"edc-ZCJgxISvM1PhBq9ppy/wjOlO2/A\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 3804,
    "path": "../public/_nuxt/DDAgXY8S.js"
  },
  "/_nuxt/DDBovgxi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4574-d/J+ZBf0n//CjkNfIWz1VzFRqus\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 17780,
    "path": "../public/_nuxt/DDBovgxi.js"
  },
  "/_nuxt/DDbsPZ6N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b778-C2uyXW47qdwfa+ehzOv+5I4axTc\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 46968,
    "path": "../public/_nuxt/DDbsPZ6N.js"
  },
  "/_nuxt/DFQXde-d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e22-LyyCEV0p5Z9aQr/eORaTVl+VM/I\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 3618,
    "path": "../public/_nuxt/DFQXde-d.js"
  },
  "/_nuxt/DFWUc33u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b89a-kdAMrtWajzAsk0BG2fMBP82rYLk\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 47258,
    "path": "../public/_nuxt/DFWUc33u.js"
  },
  "/_nuxt/DFXneXwc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a58-ufxuxieWB6NqLaLpgayghVHVGFk\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 2648,
    "path": "../public/_nuxt/DFXneXwc.js"
  },
  "/_nuxt/DGP4VlC8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"370-+BO2faf7mWlGIXNzO7G4CbMKFxU\"",
    "mtime": "2026-01-03T12:04:38.750Z",
    "size": 880,
    "path": "../public/_nuxt/DGP4VlC8.js"
  },
  "/_nuxt/DGztddWO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c30a-RH66MQ8sciPFc9beujzj21brHp0\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 49930,
    "path": "../public/_nuxt/DGztddWO.js"
  },
  "/_nuxt/DH5Ifo-i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3861-ZsBIvSUlsHzh+aocazJKD4XzMVc\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 14433,
    "path": "../public/_nuxt/DH5Ifo-i.js"
  },
  "/_nuxt/DHCkPAjA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20c3-DO10fOlB7vIPhFS8p9gFYpgJYts\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 8387,
    "path": "../public/_nuxt/DHCkPAjA.js"
  },
  "/_nuxt/DHJKELXO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c8d-G52k5HF2RR+jOGOolyZJDXOaYjU\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 11405,
    "path": "../public/_nuxt/DHJKELXO.js"
  },
  "/_nuxt/DHQR4-dF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54fa-W/hdVrNNpDm+x5GKmst0yAXf+wg\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 21754,
    "path": "../public/_nuxt/DHQR4-dF.js"
  },
  "/_nuxt/DKYwYmdq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f58-vJSd9ic9Ki7+MMvwkK8/EYfWuM4\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 28504,
    "path": "../public/_nuxt/DKYwYmdq.js"
  },
  "/_nuxt/DM8c43g1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de9b-53OBHvVFMqGMDiNN3SmETU7v4nI\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 56987,
    "path": "../public/_nuxt/DM8c43g1.js"
  },
  "/_nuxt/DMzUqQB5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1555-w2sSUf4a9PU9eUlfADd1bDmy39c\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 5461,
    "path": "../public/_nuxt/DMzUqQB5.js"
  },
  "/_nuxt/DNMeEaky.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19545-26W2UcuLEjKXm3JXTLStYt2MBh8\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 103749,
    "path": "../public/_nuxt/DNMeEaky.js"
  },
  "/_nuxt/DPfMkruS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bf7f-Qa1TjFLyLxQt61atfNmRBMSFw44\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 49023,
    "path": "../public/_nuxt/DPfMkruS.js"
  },
  "/_nuxt/DQyhUUbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b89f-mbNr7NheThZgbVpyFJ27x8WEEK0\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 47263,
    "path": "../public/_nuxt/DQyhUUbL.js"
  },
  "/_nuxt/DRejpVBE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21c6-cSU6iijWxnDDoKf6SYL2MC+krG0\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 8646,
    "path": "../public/_nuxt/DRejpVBE.js"
  },
  "/_nuxt/DRg8JJMk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e58-kEpXueexTpseSOt5LwypGw4FnAI\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 3672,
    "path": "../public/_nuxt/DRg8JJMk.js"
  },
  "/_nuxt/DRw_LuNl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5870-v5eZ6Es2kI7CQZrGY35Jb3XlCxM\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 22640,
    "path": "../public/_nuxt/DRw_LuNl.js"
  },
  "/_nuxt/DTMYz4Jt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a1f-vu9QQsRTyzYUfRASvvmoDrADeRQ\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 18975,
    "path": "../public/_nuxt/DTMYz4Jt.js"
  },
  "/_nuxt/DTXzf-yb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7a89-jd2uJhOt9MKptoHn0CeG6fSuWpA\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 31369,
    "path": "../public/_nuxt/DTXzf-yb.js"
  },
  "/_nuxt/DU1UobuO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3194-nVg7XJ1slVnNP7zeSHudjIkh5XA\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 12692,
    "path": "../public/_nuxt/DU1UobuO.js"
  },
  "/_nuxt/DUszq2jm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ceb-ePBMCAX7SG0Irjogl+g1U5DwooA\"",
    "mtime": "2026-01-03T12:04:38.751Z",
    "size": 11499,
    "path": "../public/_nuxt/DUszq2jm.js"
  },
  "/_nuxt/DV7GczEv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e2d-hf5xgqV4aOl9FHZThG9lAy1Zgik\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 3629,
    "path": "../public/_nuxt/DV7GczEv.js"
  },
  "/_nuxt/DVFEvuxE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f48-fPUeydgkYizuS1KhZTFDcGs23ko\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 3912,
    "path": "../public/_nuxt/DVFEvuxE.js"
  },
  "/_nuxt/DVMEJ2y_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83fb-0g5XhPG2uspENrUTMRB2oVJl2Ws\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 33787,
    "path": "../public/_nuxt/DVMEJ2y_.js"
  },
  "/_nuxt/DVxCFoDh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"125e-rPW4zgr7v+vVuFzVhR3O1BAn6l4\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 4702,
    "path": "../public/_nuxt/DVxCFoDh.js"
  },
  "/_nuxt/DWVrQyU4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17ee2-zpeYJBWCGO0RYb4nQuA369jkp7s\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 98018,
    "path": "../public/_nuxt/DWVrQyU4.js"
  },
  "/_nuxt/DWedfzmr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42e3-jnQVGWyfAUj5Bj6u8/SJs5K6KHQ\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 17123,
    "path": "../public/_nuxt/DWedfzmr.js"
  },
  "/_nuxt/DWrx1Km3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ca-sUYQmgc2P2wmCjk8Rh9f9MvS3f4\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 1738,
    "path": "../public/_nuxt/DWrx1Km3.js"
  },
  "/_nuxt/DXbdFlpD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1abe-6NRBR7/r0g2IDmknK3kpzih1ojk\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 6846,
    "path": "../public/_nuxt/DXbdFlpD.js"
  },
  "/_nuxt/DXmwc3jG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19bc5-lhtr58XhHUpTDaJxaCZQkikaCVI\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 105413,
    "path": "../public/_nuxt/DXmwc3jG.js"
  },
  "/_nuxt/DXvB9xmW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28e8-nBEIEGHOcNa4HcECWKcBwaBdjY4\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 10472,
    "path": "../public/_nuxt/DXvB9xmW.js"
  },
  "/_nuxt/DXx00hUE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9c2-qwCT1UJGw96MV7I1b4bTT8AeVGI\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 2498,
    "path": "../public/_nuxt/DXx00hUE.js"
  },
  "/_nuxt/DZ_1_TWT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5652a-WC8rmWw+TafALIMakDdgdRsNycQ\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 353578,
    "path": "../public/_nuxt/DZ_1_TWT.js"
  },
  "/_nuxt/DZu-aV2c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90c-l+1owWXx4mFAFERX1RXPqvniqGI\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 2316,
    "path": "../public/_nuxt/DZu-aV2c.js"
  },
  "/_nuxt/DZxFcAj9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e30-yVVkcmgNW65ANRVm+VLJ2SLlsw4\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 3632,
    "path": "../public/_nuxt/DZxFcAj9.js"
  },
  "/_nuxt/D_Q5rh1f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f0d-VjwVFz1UQvwkVfDY01bvHv5WyjE\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 40717,
    "path": "../public/_nuxt/D_Q5rh1f.js"
  },
  "/_nuxt/Da5cRb03.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58e-U25QluuakpO2xnTv03qF0zxBP+w\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 1422,
    "path": "../public/_nuxt/Da5cRb03.js"
  },
  "/_nuxt/DamkcAzd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11b5-HQK54ylU6lv7yQmGvvpy1Qs6vqk\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 4533,
    "path": "../public/_nuxt/DamkcAzd.js"
  },
  "/_nuxt/DcaNXYhu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc3-LijOmfIAhYPWSK4/5Yy+NfqNUB0\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 3011,
    "path": "../public/_nuxt/DcaNXYhu.js"
  },
  "/_nuxt/Dd19v3D-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18ba-iDXottiR12BB0L25ZoQnLEK0ypY\"",
    "mtime": "2026-01-03T12:04:38.752Z",
    "size": 6330,
    "path": "../public/_nuxt/Dd19v3D-.js"
  },
  "/_nuxt/DdkO51Og.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39bf-PWzM4XI+e60VFDmJR99vHRsG5Ro\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 14783,
    "path": "../public/_nuxt/DdkO51Og.js"
  },
  "/_nuxt/Ddv68eIx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6863-kMtZ6hRkLXSKT61B4950edu4MjQ\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 26723,
    "path": "../public/_nuxt/Ddv68eIx.js"
  },
  "/_nuxt/Des-eS-w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c25-X/PPjzKtzZF+XWxRuaeQhmo8i2k\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 3109,
    "path": "../public/_nuxt/Des-eS-w.js"
  },
  "/_nuxt/Df6bDoY_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a212-Cv7Cl6GstBWr+LDlpJlov6rocDc\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 41490,
    "path": "../public/_nuxt/Df6bDoY_.js"
  },
  "/_nuxt/DffvPA4m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"350e0-S25WUqlOl6nvCzJCWsD4BtrzgQE\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 217312,
    "path": "../public/_nuxt/DffvPA4m.js"
  },
  "/_nuxt/Dg5xB15N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1524f-zcucI+A7PytVMLhkpoSrqhiidCA\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 86607,
    "path": "../public/_nuxt/Dg5xB15N.js"
  },
  "/_nuxt/DhmSosst.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"578f-vDEuXYbFdSp53sJakYJYyySpBHM\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 22415,
    "path": "../public/_nuxt/DhmSosst.js"
  },
  "/_nuxt/DiinP2Uv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d9ff-ywEBkRC7Yv0jV8fc5ykNc7k9pkU\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 55807,
    "path": "../public/_nuxt/DiinP2Uv.js"
  },
  "/_nuxt/DkFqJrB1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1596-3G3OFGROM9i9ksVKa6R6cdJ963M\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 5526,
    "path": "../public/_nuxt/DkFqJrB1.js"
  },
  "/_nuxt/DkwncUOv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18b6-LQOwiFyJgkHRaPJwthptaodiEjA\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 6326,
    "path": "../public/_nuxt/DkwncUOv.js"
  },
  "/_nuxt/Dn2_MT6a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b6b7-u7j0cjHRslAV1fUmpgFsfGGGfbY\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 46775,
    "path": "../public/_nuxt/Dn2_MT6a.js"
  },
  "/_nuxt/DnULxvSX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8a5e-lpZgdjKbVFHBYkOMCMZXYihb+Y0\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 35422,
    "path": "../public/_nuxt/DnULxvSX.js"
  },
  "/_nuxt/Dpen1YoG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4eb7-AvPl3zGEiUd4065DorZb6vqtYgw\"",
    "mtime": "2026-01-03T12:04:38.753Z",
    "size": 20151,
    "path": "../public/_nuxt/Dpen1YoG.js"
  },
  "/_nuxt/DqwNpetd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d7-BiRtKEQjWndnYLM1xGeXTGnUgo4\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 9431,
    "path": "../public/_nuxt/DqwNpetd.js"
  },
  "/_nuxt/Ds9Pl6UP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c116-r4ju47kR7xVipcrfRqKGFZsQs7Q\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 49430,
    "path": "../public/_nuxt/Ds9Pl6UP.js"
  },
  "/_nuxt/DsOJ9woJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6903-92zM8EdyhlDJkDUyI90qmuBNGSE\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 26883,
    "path": "../public/_nuxt/DsOJ9woJ.js"
  },
  "/_nuxt/DujSY10F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"222c-+vz5Fz3Rd7krqYgltyiILJ+jrZI\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 8748,
    "path": "../public/_nuxt/DujSY10F.js"
  },
  "/_nuxt/Dv7Oe6Be.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"201b9-egctmLOo5xmykIvLhAWQXWyOyrg\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 131513,
    "path": "../public/_nuxt/Dv7Oe6Be.js"
  },
  "/_nuxt/Dx-B1_4e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1418-ohHNPgtYXnauD/aqxkzI8itg0W4\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 5144,
    "path": "../public/_nuxt/Dx-B1_4e.js"
  },
  "/_nuxt/DxNHbxmM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5eda-SCcfTQoOMhgKbvW53terMJGrgh0\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 24282,
    "path": "../public/_nuxt/DxNHbxmM.js"
  },
  "/_nuxt/DxSwrfjg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d9d-+JszMF8EZq6NKEXa3HKw/aENHKU\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 23965,
    "path": "../public/_nuxt/DxSwrfjg.js"
  },
  "/_nuxt/DyJlTyXw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1979-yZm7XxOC7WNHkHBJ5C1VS3YJdOw\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 6521,
    "path": "../public/_nuxt/DyJlTyXw.js"
  },
  "/_nuxt/DyUgxO5C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52f2-Ygk7OMlegV2wheUL1iTZRiTNAe4\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 21234,
    "path": "../public/_nuxt/DyUgxO5C.js"
  },
  "/_nuxt/DyxjwDmM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2eaa-APqKmdYfXM9pEmPMpxnS6CfDnok\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 11946,
    "path": "../public/_nuxt/DyxjwDmM.js"
  },
  "/_nuxt/Dzze3sRP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b31-fLVYB1+5bZUeFgFknuJHDyCcx+Y\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 6961,
    "path": "../public/_nuxt/Dzze3sRP.js"
  },
  "/_nuxt/E3gJ1_iC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3903-b1i07XzPpd3BHF9/vi4M4mGWen8\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 14595,
    "path": "../public/_nuxt/E3gJ1_iC.js"
  },
  "/_nuxt/GNaDb_Wx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1743-V8AIZI3Y/AxKHPCfD9iYvgahwww\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 5955,
    "path": "../public/_nuxt/GNaDb_Wx.js"
  },
  "/_nuxt/GsRaNv29.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"586d-L030M/2jspEnPij9s4nOgEzypsw\"",
    "mtime": "2026-01-03T12:04:38.754Z",
    "size": 22637,
    "path": "../public/_nuxt/GsRaNv29.js"
  },
  "/_nuxt/IeuSbFQv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d30-sYP0nSd+3NXVJw+47fVgqFg0qZ8\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 7472,
    "path": "../public/_nuxt/IeuSbFQv.js"
  },
  "/_nuxt/K5feNrxe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156a8-HQvE8SBLk0RhWwbufwsLrZse3y0\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 87720,
    "path": "../public/_nuxt/K5feNrxe.js"
  },
  "/_nuxt/L9t79GZl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1950-bOSHs4QuofVjf2ggJ3A58EemLcc\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 6480,
    "path": "../public/_nuxt/L9t79GZl.js"
  },
  "/_nuxt/MzD3tlZU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ee7-5CI4WkFtYPgGA401EGnIE/VPkZU\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 12007,
    "path": "../public/_nuxt/MzD3tlZU.js"
  },
  "/_nuxt/P80f7IUj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"190d-MNsVFPp5RK4nVUBiyk+gaOZV35I\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 6413,
    "path": "../public/_nuxt/P80f7IUj.js"
  },
  "/_nuxt/Pmp26Uib.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30a8-g7F7ubYNQtAhMpp+/lHhaFKrS08\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 12456,
    "path": "../public/_nuxt/Pmp26Uib.js"
  },
  "/_nuxt/PoHY5YXO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"62d2-RQN1eJvOzFVrdHrv5KOv5WHUyDo\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 25298,
    "path": "../public/_nuxt/PoHY5YXO.js"
  },
  "/_nuxt/Ptiozo9H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8be-wlkrO7u58Qyh78e21teDpRodGLI\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 2238,
    "path": "../public/_nuxt/Ptiozo9H.js"
  },
  "/_nuxt/QIJgUcNo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cd8-ykfNfVR7SpPhRTSQr7BWvCulwXg\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 3288,
    "path": "../public/_nuxt/QIJgUcNo.js"
  },
  "/_nuxt/TimeAgo.CGTcmEuL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a3-1sYx5d6ZomsZMeJO6gVS9w/gyS4\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 419,
    "path": "../public/_nuxt/TimeAgo.CGTcmEuL.css"
  },
  "/_nuxt/TsXTqZ29.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c80-s22b3eruKgCVsSUo+W2xK5RbGLM\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 19584,
    "path": "../public/_nuxt/TsXTqZ29.js"
  },
  "/_nuxt/Ub_dL_ZW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c69-rLTpY+5jFJ8HiB9LJkIJyJMuDu4\"",
    "mtime": "2026-01-03T12:04:38.756Z",
    "size": 19561,
    "path": "../public/_nuxt/Ub_dL_ZW.js"
  },
  "/_nuxt/VOosw3JB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14dc-gSNd/NJu7Z0ArtyQOE1evDYfi4o\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 5340,
    "path": "../public/_nuxt/VOosw3JB.js"
  },
  "/_nuxt/Xqf5ue2O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b171-WUiq3sTmDBxaTTkndvBpkUaj7gc\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 110961,
    "path": "../public/_nuxt/Xqf5ue2O.js"
  },
  "/_nuxt/YqXBG_HV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e48-p9PjqMBmH3zLrxX9UY1AU+GByEo\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 20040,
    "path": "../public/_nuxt/YqXBG_HV.js"
  },
  "/_nuxt/Yzrsuije.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a207-6VR5nHiV/sPzx6yPxdz5gyf5xro\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 41479,
    "path": "../public/_nuxt/Yzrsuije.js"
  },
  "/_nuxt/_id_.-fUM5nTD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b06-cf+KmsHkE1ZpiGEbDB/d3I8ZyZA\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 2822,
    "path": "../public/_nuxt/_id_.-fUM5nTD.css"
  },
  "/_nuxt/_id_.ZXW_suVI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10ce-JSDdAmdE4WN7Tr+JqD4JLElGzCA\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 4302,
    "path": "../public/_nuxt/_id_.ZXW_suVI.css"
  },
  "/_nuxt/_ykCGR6B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e21-An+pMxfZ65ai0Qorzhvbu4935RE\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 3617,
    "path": "../public/_nuxt/_ykCGR6B.js"
  },
  "/_nuxt/aF-l9SMX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"523d-8Du5LV9IiXTk/SbmkF4ks2N69Jg\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 21053,
    "path": "../public/_nuxt/aF-l9SMX.js"
  },
  "/_nuxt/bCR0ucgS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bbd2-vySwLq9X8jM0xEZDMNhkugx5OWI\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 48082,
    "path": "../public/_nuxt/bCR0ucgS.js"
  },
  "/_nuxt/bN70gL4F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1876-TIy/lDxhgGcsWEw99X2SyGsc2kY\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 6262,
    "path": "../public/_nuxt/bN70gL4F.js"
  },
  "/_nuxt/bsi9C5jp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40301-7lPMZg4qQz/9kZQkjsBqHQRrU64\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 262913,
    "path": "../public/_nuxt/bsi9C5jp.js"
  },
  "/_nuxt/c8nO5XWb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c93-NT8JluaM4GN5W6kEh4pU+rwTrOI\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 15507,
    "path": "../public/_nuxt/c8nO5XWb.js"
  },
  "/_nuxt/cgN_UPQ0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e6bb-9gt6aBIHEuVa1wPsRbLiFD5KPss\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 190139,
    "path": "../public/_nuxt/cgN_UPQ0.js"
  },
  "/_nuxt/chat.8fu_toZ5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3e3-vT8QK6dIpz5qWiOoJRg2cUUuJOQ\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 995,
    "path": "../public/_nuxt/chat.8fu_toZ5.css"
  },
  "/_nuxt/dwOrl1Do.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"114d-Miso5NpR5/G0Yxf13F87fsg0n+4\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 4429,
    "path": "../public/_nuxt/dwOrl1Do.js"
  },
  "/_nuxt/entry.DDP-HRgX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e97d-5eoxAceyYPLgESnTQlJ+ziPBFHw\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 190845,
    "path": "../public/_nuxt/entry.DDP-HRgX.css"
  },
  "/_nuxt/error-404.BHXz9qfF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97e-00La5iNMKrKolX5yu2xCksupd5M\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 2430,
    "path": "../public/_nuxt/error-404.BHXz9qfF.css"
  },
  "/_nuxt/error-500.B-S4J4S0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"773-Wt1ETie83x1W8nIB4cuEYzFixjQ\"",
    "mtime": "2026-01-03T12:04:38.757Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.B-S4J4S0.css"
  },
  "/_nuxt/fKv21gyL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72a6-NAQ5XGMfb5UQlGDdcm+qEev6Mv8\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 29350,
    "path": "../public/_nuxt/fKv21gyL.js"
  },
  "/_nuxt/fWqGrwan.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2f0-F6NHguPtjXUitdWt0wZQ9WLn1tM\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 45808,
    "path": "../public/_nuxt/fWqGrwan.js"
  },
  "/_nuxt/fuZLfV_i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"477-0SRlnrwEvNDmMgmT4ASQhkc7LOk\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 1143,
    "path": "../public/_nuxt/fuZLfV_i.js"
  },
  "/_nuxt/g9-lgVsj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b680-ofFVdn8l5tpAocltff4iPbGQl3A\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 177792,
    "path": "../public/_nuxt/g9-lgVsj.js"
  },
  "/_nuxt/gcz8RCvz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4aeb-kFg8xkpBAlwmm7cdrxB4+IDSo1g\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 19179,
    "path": "../public/_nuxt/gcz8RCvz.js"
  },
  "/_nuxt/hJgmCMqR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"586c-LK9/vH1TOEejdSL+zMpF8l6CEHU\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 22636,
    "path": "../public/_nuxt/hJgmCMqR.js"
  },
  "/_nuxt/hegEt444.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b51-G3BXQ+3KNXzWihQj05Fol+jGA9g\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 35665,
    "path": "../public/_nuxt/hegEt444.js"
  },
  "/_nuxt/k_qm7-4y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2885-E1wwTNdDRSdy/TK9/xCbJeuErY4\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 10373,
    "path": "../public/_nuxt/k_qm7-4y.js"
  },
  "/_nuxt/lXgVvXCa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"400f7-QVw7n62VSskQpU7ySKu0y5hgH7Y\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 262391,
    "path": "../public/_nuxt/lXgVvXCa.js"
  },
  "/_nuxt/m17aaUwq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f5d-U1h3Jou48CRUxk75EZwNupGIZVs\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 12125,
    "path": "../public/_nuxt/m17aaUwq.js"
  },
  "/_nuxt/mjskCLCv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4690-QfKZ5lDahOrGHqHqAnRZS/qdZ5E\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 18064,
    "path": "../public/_nuxt/mjskCLCv.js"
  },
  "/_nuxt/oTG82Wo1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1479-D5T/ODzSSQb19xidnj5SObjindY\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 5241,
    "path": "../public/_nuxt/oTG82Wo1.js"
  },
  "/_nuxt/qdsjHGoJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54ef-oZ8O/q9vt+4PlOKIJZ3bXN3y3zo\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 21743,
    "path": "../public/_nuxt/qdsjHGoJ.js"
  },
  "/_nuxt/rGO070M0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3eca-Ku+CGXDSOl/mlC7j1AoiFXNkxnA\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 16074,
    "path": "../public/_nuxt/rGO070M0.js"
  },
  "/_nuxt/studio.D-KFsaBb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"275-mu3fd19TwiBsnE31iO98RaEIKfU\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 629,
    "path": "../public/_nuxt/studio.D-KFsaBb.css"
  },
  "/_nuxt/u5AG7uiY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2884-u6u96bSGyMDWd/UA7h2F9CgWqqw\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 10372,
    "path": "../public/_nuxt/u5AG7uiY.js"
  },
  "/_nuxt/uQ15kqef.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-TmPWMcgQkbD3GIAxcKVYCdkaico\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 442,
    "path": "../public/_nuxt/uQ15kqef.js"
  },
  "/_nuxt/uYugtg8r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bbd-skOQoS9eVSELniCgzkgDhaja9Bs\"",
    "mtime": "2026-01-03T12:04:38.758Z",
    "size": 3005,
    "path": "../public/_nuxt/uYugtg8r.js"
  },
  "/_nuxt/vGWfd6FD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"191a-IddXfXJJjUOcdcfg+zVWaujbyXU\"",
    "mtime": "2026-01-03T12:04:38.759Z",
    "size": 6426,
    "path": "../public/_nuxt/vGWfd6FD.js"
  },
  "/_nuxt/wDzz0qaB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aaeb-rwGKGhqDut2TIRHOOItrnHHA7vQ\"",
    "mtime": "2026-01-03T12:04:38.759Z",
    "size": 174827,
    "path": "../public/_nuxt/wDzz0qaB.js"
  },
  "/_nuxt/yv6CvBhz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"560-z89X1c4Vs2DClCTMcEOOvsJAmzo\"",
    "mtime": "2026-01-03T12:04:38.759Z",
    "size": 1376,
    "path": "../public/_nuxt/yv6CvBhz.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-5dfHfYO6B1mST4jpgHsrADxl1WA\"",
    "mtime": "2026-01-03T12:04:38.716Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/112f93f5-03fa-4a7c-89f6-2bd839268baf.json": {
    "type": "application/json",
    "etag": "\"8b-0e7k4a17i6iyQLZkfCCVT4ggy+k\"",
    "mtime": "2026-01-03T12:04:38.714Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/112f93f5-03fa-4a7c-89f6-2bd839268baf.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _O_CXNJ = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function getJwtSecret() {
  const secret = process.env.NUXT_JWT_SECRET || process.env.NUXT_SESSION_PASSWORD;
  if (!secret || secret.length < 32) {
    throw new Error("NUXT_JWT_SECRET \u73AF\u5883\u53D8\u91CF\u672A\u8BBE\u7F6E\u6216\u957F\u5EA6\u4E0D\u8DB332\u4F4D");
  }
  return new TextEncoder().encode(secret);
}
async function signJwt(payload) {
  const secret = getJwtSecret();
  const token = await new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(secret);
  return token;
}
async function verifyJwt(token) {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name
    };
  } catch {
    return null;
  }
}
function getTokenFromHeader(event) {
  const authHeader = getHeader(event, "authorization");
  if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
    return null;
  }
  return authHeader.slice(7);
}
function getTokenFromQuery(event) {
  const query = getQuery(event);
  return query.token || null;
}
async function getUserFromEvent(event) {
  const token = getTokenFromHeader(event) || getTokenFromQuery(event);
  if (!token) {
    return null;
  }
  return verifyJwt(token);
}
async function requireAuth(event) {
  const payload = await getUserFromEvent(event);
  if (!payload) {
    throw createError$1({
      statusCode: 401,
      message: "\u672A\u767B\u5F55\u6216\u767B\u5F55\u5DF2\u8FC7\u671F"
    });
  }
  return {
    user: {
      id: payload.userId,
      email: payload.email,
      name: payload.name
    }
  };
}

function safeLog(fn) {
  try {
    fn();
  } catch {
  }
}
function calcSize(text) {
  return new TextEncoder().encode(text).length;
}
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}
function formatDuration(ms) {
  if (ms < 1e3) return `${ms}ms`;
  return `${(ms / 1e3).toFixed(1)}s`;
}
function truncateTitle(title) {
  if (!title) return "\u65E0\u6807\u9898";
  if (title.length <= 15) return title;
  return title.slice(0, 15) + "...";
}
function prefix(ctx, event) {
  if (ctx.conversationId) {
    return `[Chat] ${ctx.type}${event} | \u5BF9\u8BDD#${ctx.conversationId} "${truncateTitle(ctx.conversationTitle)}"`;
  }
  if (ctx.assistantId) {
    return `[Chat] ${ctx.type}${event} | \u52A9\u624B#${ctx.assistantId} "${ctx.assistantName || "\u672A\u77E5"}"`;
  }
  return `[Chat] ${ctx.type}${event}`;
}
function logRequest(ctx, stats) {
  safeLog(() => {
    const total = stats.systemPromptSize + stats.historySize + stats.currentSize;
    const keyInfo = ctx.keyName ? ` Key:${ctx.keyName}` : "";
    const upstream = ctx.configName || ctx.baseUrl || "\u672A\u77E5";
    const parts = [
      prefix(ctx, "\u8BF7\u6C42"),
      `\u4E0A\u6E38:${upstream} \u6A21\u578B:${ctx.modelName || "\u672A\u77E5"}${keyInfo}`,
      `\u63D0\u793A\u8BCD:${formatSize(stats.systemPromptSize)} \u5386\u53F2:${stats.historyCount}\u6761/${formatSize(stats.historySize)} \u5F53\u524D:${formatSize(stats.currentSize)}`,
      `\u603B\u8BA1:${formatSize(total)}`
    ];
    console.log(parts.join(" | "));
  });
}
function logCompressRequest(ctx, compressCount, compressSize, promptSize) {
  safeLog(() => {
    const total = compressSize + promptSize;
    const keyInfo = ctx.keyName ? ` Key:${ctx.keyName}` : "";
    const upstream = ctx.configName || ctx.baseUrl || "\u672A\u77E5";
    const parts = [
      prefix(ctx, "\u8BF7\u6C42"),
      `\u4E0A\u6E38:${upstream} \u6A21\u578B:${ctx.modelName || "\u672A\u77E5"}${keyInfo}`,
      `\u5F85\u538B\u7F29:${compressCount}\u6761/${formatSize(compressSize)} \u63D0\u793A\u8BCD:${formatSize(promptSize)}`,
      `\u603B\u8BA1:${formatSize(total)}`
    ];
    console.log(parts.join(" | "));
  });
}
function logComplete(ctx, responseSize, durationMs) {
  safeLog(() => {
    const parts = [
      prefix(ctx, "\u5B8C\u6210"),
      `\u54CD\u5E94:${formatSize(responseSize)}`,
      `\u8017\u65F6:${formatDuration(durationMs)}`
    ];
    console.log(parts.join(" | "));
  });
}
function logResponse(ctx, responseSize, durationMs) {
  safeLog(() => {
    const parts = [
      prefix(ctx, "\u54CD\u5E94"),
      `\u54CD\u5E94:${formatSize(responseSize)}`,
      `\u8017\u65F6:${formatDuration(durationMs)}`
    ];
    console.log(parts.join(" | "));
  });
}
function logTitleResponse(ctx, title, durationMs) {
  safeLog(() => {
    const parts = [
      prefix(ctx, "\u54CD\u5E94"),
      `\u6807\u9898:"${title}"`,
      `\u8017\u65F6:${formatDuration(durationMs)}`
    ];
    console.log(parts.join(" | "));
  });
}
function logError(ctx, error) {
  safeLog(() => {
    console.error(`${prefix(ctx, "\u9519\u8BEF")} | ${error}`);
  });
}

const scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}
async function verifyPassword(storedPassword, suppliedPassword) {
  const [salt, key] = storedPassword.split(":");
  if (!salt || !key) return false;
  const derivedKey = await scryptAsync(suppliedPassword, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  return timingSafeEqual(derivedKey, keyBuffer);
}

const collections = {
  'heroicons': () => import('../_/icons.mjs').then(m => m.default),
  'lucide': () => import('../_/icons2.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _ZHiAAs = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_XU1D26 = () => import('../routes/api/assistants/_id_.delete.mjs');
const _lazy_Lagmvb = () => import('../routes/api/assistants/_id_.get.mjs');
const _lazy_OkJPQN = () => import('../routes/api/assistants/_id_.put.mjs');
const _lazy_3kDRcW = () => import('../routes/api/assistants/_id/suggestions.post.mjs');
const _lazy_qv2v6a = () => import('../routes/api/index.get.mjs');
const _lazy_bHpbz9 = () => import('../routes/api/index.post.mjs');
const _lazy_k5jO9n = () => import('../routes/api/auth/login.post.mjs');
const _lazy_m9KZFi = () => import('../routes/api/auth/register.post.mjs');
const _lazy_FMHWCY = () => import('../routes/api/conversations/_id_.delete.mjs');
const _lazy_VMXetC = () => import('../routes/api/conversations/_id_.get.mjs');
const _lazy_Hwp4bv = () => import('../routes/api/conversations/_id_.put.mjs');
const _lazy_DLgezo = () => import('../routes/api/conversations/_id/compress.post.mjs');
const _lazy_mjc4CX = () => import('../routes/api/conversations/_id/generate-title.post.mjs');
const _lazy_yjBqB2 = () => import('../routes/api/conversations/_id/messages-manual.post.mjs');
const _lazy_JhfTG0 = () => import('../routes/api/conversations/_id/messages.post.mjs');
const _lazy_B2roax = () => import('../routes/api/conversations/_id/streaming.get.mjs');
const _lazy_O9bEkN = () => import('../routes/api/index.get2.mjs');
const _lazy_gfbFRL = () => import('../routes/api/index.post2.mjs');
const _lazy_W2OnNJ = () => import('../routes/api/events.get.mjs');
const _lazy_3XDW0u = () => import('../routes/api/files/_name_.get.mjs');
const _lazy_ewi4p7 = () => import('../routes/api/files/upload.post.mjs');
const _lazy_JKsGqp = () => import('../routes/api/illustrations/blur.patch.mjs');
const _lazy_TEaAXR = () => import('../routes/api/index.post3.mjs');
const _lazy_WdYdNI = () => import('../routes/api/illustrations/regenerate.post.mjs');
const _lazy_FUKYbz = () => import('../routes/api/images/_name_.get.mjs');
const _lazy_BqQzXF = () => import('../routes/api/images/upload.post.mjs');
const _lazy_V_yuS2 = () => import('../routes/api/messages/_id_.delete.mjs');
const _lazy_opg1d5 = () => import('../routes/api/messages/_id_.patch.mjs');
const _lazy_FRDOTr = () => import('../routes/api/messages/_id/delete-until.post.mjs');
const _lazy_Dd3lot = () => import('../routes/api/messages/_id/fork.post.mjs');
const _lazy_VPrIPE = () => import('../routes/api/messages/_id/replay.post.mjs');
const _lazy_xPiEkI = () => import('../routes/api/messages/_id/stop.post.mjs');
const _lazy_MMdUFT = () => import('../routes/api/prompts/optimize.post.mjs');
const _lazy_ZrzP8A = () => import('../routes/api/index.get3.mjs');
const _lazy_yY2XKk = () => import('../routes/api/index.put.mjs');
const _lazy_ViV4hE = () => import('../routes/api/tasks/_id_.delete.mjs');
const _lazy_aDI2f4 = () => import('../routes/api/tasks/_id_.get.mjs');
const _lazy_JlCd81 = () => import('../routes/api/tasks/_id/blur.patch.mjs');
const _lazy_93FiUh = () => import('../routes/api/tasks/_id/cancel.post.mjs');
const _lazy_5B2AZp = () => import('../routes/api/tasks/_id/logs.get.mjs');
const _lazy_XFv7eS = () => import('../routes/api/tasks/_id/restore.post.mjs');
const _lazy_mSv4Gi = () => import('../routes/api/tasks/_id/retry.post.mjs');
const _lazy_jVH4A4 = () => import('../routes/api/tasks/action.post.mjs');
const _lazy_5CAoix = () => import('../routes/api/tasks/blur-batch.patch.mjs');
const _lazy_UbZtOp = () => import('../routes/api/index.get4.mjs');
const _lazy_ol38tY = () => import('../routes/api/index.post4.mjs');
const _lazy_6L98uf = () => import('../routes/api/tasks/trash/empty.delete.mjs');
const _lazy_Y7SK5M = () => import('../routes/api/tasks/index.get.mjs');
const _lazy_6GDVB_ = () => import('../routes/api/upstreams/_id_.delete.mjs');
const _lazy_TTrv0k = () => import('../routes/api/upstreams/_id_.put.mjs');
const _lazy_Hihe_s = () => import('../routes/api/upstreams/_id/balance.get.mjs');
const _lazy_SsLqpM = () => import('../routes/api/index.get5.mjs');
const _lazy_FAZKLG = () => import('../routes/api/index.post5.mjs');
const _lazy_3l5SLw = () => import('../routes/api/user/delete.post.mjs');
const _lazy_kf6gQw = () => import('../routes/api/user/email.put.mjs');
const _lazy__ruKHl = () => import('../routes/api/index.get6.mjs');
const _lazy_ZG4qq9 = () => import('../routes/api/index.put2.mjs');
const _lazy_m1Y4NB = () => import('../routes/api/user/password.put.mjs');
const _lazy_ESClrN = () => import('../routes/api/workflow-runs/_id_.get.mjs');
const _lazy_Awko5x = () => import('../routes/api/workflow-runs/_id_.patch.mjs');
const _lazy_wHpt7u = () => import('../routes/api/workflow-runs/_id/cancel.post.mjs');
const _lazy_rr7pow = () => import('../routes/api/workflow-runs/_id/continue.post.mjs');
const _lazy_4u0_1n = () => import('../routes/api/workflow-runs/_id/events.get.mjs');
const _lazy_sYVYOI = () => import('../routes/api/workflow-runs/_id/execute-node.post.mjs');
const _lazy_CyzhsW = () => import('../routes/api/workflow-runs/_id/retry.post.mjs');
const _lazy_TQFBIe = () => import('../routes/api/workflow-templates/_id/use.post.mjs');
const _lazy__jIvKp = () => import('../routes/api/index.get7.mjs');
const _lazy_yPkjeE = () => import('../routes/api/workflows/_id_.delete.mjs');
const _lazy_yLtdyQ = () => import('../routes/api/workflows/_id_.get.mjs');
const _lazy_RxlJCL = () => import('../routes/api/workflows/_id_.put.mjs');
const _lazy_aXBIBC = () => import('../routes/api/workflows/_id/run-node.post.mjs');
const _lazy_nT4WEa = () => import('../routes/api/workflows/_id/run.post.mjs');
const _lazy_E3vDxW = () => import('../routes/api/workflows/_id/runs.get.mjs');
const _lazy_r7XoZM = () => import('../routes/api/index.get8.mjs');
const _lazy_lZSh6c = () => import('../routes/api/index.post6.mjs');
const _lazy_FvXvb2 = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _O_CXNJ, lazy: false, middleware: true, method: undefined },
  { route: '/api/assistants/:id', handler: _lazy_XU1D26, lazy: true, middleware: false, method: "delete" },
  { route: '/api/assistants/:id', handler: _lazy_Lagmvb, lazy: true, middleware: false, method: "get" },
  { route: '/api/assistants/:id', handler: _lazy_OkJPQN, lazy: true, middleware: false, method: "put" },
  { route: '/api/assistants/:id/suggestions', handler: _lazy_3kDRcW, lazy: true, middleware: false, method: "post" },
  { route: '/api/assistants', handler: _lazy_qv2v6a, lazy: true, middleware: false, method: "get" },
  { route: '/api/assistants', handler: _lazy_bHpbz9, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_k5jO9n, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_m9KZFi, lazy: true, middleware: false, method: "post" },
  { route: '/api/conversations/:id', handler: _lazy_FMHWCY, lazy: true, middleware: false, method: "delete" },
  { route: '/api/conversations/:id', handler: _lazy_VMXetC, lazy: true, middleware: false, method: "get" },
  { route: '/api/conversations/:id', handler: _lazy_Hwp4bv, lazy: true, middleware: false, method: "put" },
  { route: '/api/conversations/:id/compress', handler: _lazy_DLgezo, lazy: true, middleware: false, method: "post" },
  { route: '/api/conversations/:id/generate-title', handler: _lazy_mjc4CX, lazy: true, middleware: false, method: "post" },
  { route: '/api/conversations/:id/messages-manual', handler: _lazy_yjBqB2, lazy: true, middleware: false, method: "post" },
  { route: '/api/conversations/:id/messages', handler: _lazy_JhfTG0, lazy: true, middleware: false, method: "post" },
  { route: '/api/conversations/:id/streaming', handler: _lazy_B2roax, lazy: true, middleware: false, method: "get" },
  { route: '/api/conversations', handler: _lazy_O9bEkN, lazy: true, middleware: false, method: "get" },
  { route: '/api/conversations', handler: _lazy_gfbFRL, lazy: true, middleware: false, method: "post" },
  { route: '/api/events', handler: _lazy_W2OnNJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/files/:name', handler: _lazy_3XDW0u, lazy: true, middleware: false, method: "get" },
  { route: '/api/files/upload', handler: _lazy_ewi4p7, lazy: true, middleware: false, method: "post" },
  { route: '/api/illustrations/blur', handler: _lazy_JKsGqp, lazy: true, middleware: false, method: "patch" },
  { route: '/api/illustrations', handler: _lazy_TEaAXR, lazy: true, middleware: false, method: "post" },
  { route: '/api/illustrations/regenerate', handler: _lazy_WdYdNI, lazy: true, middleware: false, method: "post" },
  { route: '/api/images/:name', handler: _lazy_FUKYbz, lazy: true, middleware: false, method: "get" },
  { route: '/api/images/upload', handler: _lazy_BqQzXF, lazy: true, middleware: false, method: "post" },
  { route: '/api/messages/:id', handler: _lazy_V_yuS2, lazy: true, middleware: false, method: "delete" },
  { route: '/api/messages/:id', handler: _lazy_opg1d5, lazy: true, middleware: false, method: "patch" },
  { route: '/api/messages/:id/delete-until', handler: _lazy_FRDOTr, lazy: true, middleware: false, method: "post" },
  { route: '/api/messages/:id/fork', handler: _lazy_Dd3lot, lazy: true, middleware: false, method: "post" },
  { route: '/api/messages/:id/replay', handler: _lazy_VPrIPE, lazy: true, middleware: false, method: "post" },
  { route: '/api/messages/:id/stop', handler: _lazy_xPiEkI, lazy: true, middleware: false, method: "post" },
  { route: '/api/prompts/optimize', handler: _lazy_MMdUFT, lazy: true, middleware: false, method: "post" },
  { route: '/api/settings', handler: _lazy_ZrzP8A, lazy: true, middleware: false, method: "get" },
  { route: '/api/settings', handler: _lazy_yY2XKk, lazy: true, middleware: false, method: "put" },
  { route: '/api/tasks/:id', handler: _lazy_ViV4hE, lazy: true, middleware: false, method: "delete" },
  { route: '/api/tasks/:id', handler: _lazy_aDI2f4, lazy: true, middleware: false, method: "get" },
  { route: '/api/tasks/:id/blur', handler: _lazy_JlCd81, lazy: true, middleware: false, method: "patch" },
  { route: '/api/tasks/:id/cancel', handler: _lazy_93FiUh, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/:id/logs', handler: _lazy_5B2AZp, lazy: true, middleware: false, method: "get" },
  { route: '/api/tasks/:id/restore', handler: _lazy_XFv7eS, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/:id/retry', handler: _lazy_mSv4Gi, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/action', handler: _lazy_jVH4A4, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/blur-batch', handler: _lazy_5CAoix, lazy: true, middleware: false, method: "patch" },
  { route: '/api/tasks', handler: _lazy_UbZtOp, lazy: true, middleware: false, method: "get" },
  { route: '/api/tasks', handler: _lazy_ol38tY, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/trash/empty', handler: _lazy_6L98uf, lazy: true, middleware: false, method: "delete" },
  { route: '/api/tasks/trash', handler: _lazy_Y7SK5M, lazy: true, middleware: false, method: "get" },
  { route: '/api/upstreams/:id', handler: _lazy_6GDVB_, lazy: true, middleware: false, method: "delete" },
  { route: '/api/upstreams/:id', handler: _lazy_TTrv0k, lazy: true, middleware: false, method: "put" },
  { route: '/api/upstreams/:id/balance', handler: _lazy_Hihe_s, lazy: true, middleware: false, method: "get" },
  { route: '/api/upstreams', handler: _lazy_SsLqpM, lazy: true, middleware: false, method: "get" },
  { route: '/api/upstreams', handler: _lazy_FAZKLG, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/delete', handler: _lazy_3l5SLw, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email', handler: _lazy_kf6gQw, lazy: true, middleware: false, method: "put" },
  { route: '/api/user', handler: _lazy__ruKHl, lazy: true, middleware: false, method: "get" },
  { route: '/api/user', handler: _lazy_ZG4qq9, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/password', handler: _lazy_m1Y4NB, lazy: true, middleware: false, method: "put" },
  { route: '/api/workflow-runs/:id', handler: _lazy_ESClrN, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflow-runs/:id', handler: _lazy_Awko5x, lazy: true, middleware: false, method: "patch" },
  { route: '/api/workflow-runs/:id/cancel', handler: _lazy_wHpt7u, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflow-runs/:id/continue', handler: _lazy_rr7pow, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflow-runs/:id/events', handler: _lazy_4u0_1n, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflow-runs/:id/execute-node', handler: _lazy_sYVYOI, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflow-runs/:id/retry', handler: _lazy_CyzhsW, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflow-templates/:id/use', handler: _lazy_TQFBIe, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflow-templates', handler: _lazy__jIvKp, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflows/:id', handler: _lazy_yPkjeE, lazy: true, middleware: false, method: "delete" },
  { route: '/api/workflows/:id', handler: _lazy_yLtdyQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflows/:id', handler: _lazy_RxlJCL, lazy: true, middleware: false, method: "put" },
  { route: '/api/workflows/:id/run-node', handler: _lazy_aXBIBC, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflows/:id/run', handler: _lazy_nT4WEa, lazy: true, middleware: false, method: "post" },
  { route: '/api/workflows/:id/runs', handler: _lazy_E3vDxW, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflows', handler: _lazy_r7XoZM, lazy: true, middleware: false, method: "get" },
  { route: '/api/workflows', handler: _lazy_lZSh6c, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_FvXvb2, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _ZHiAAs, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_FvXvb2, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { withoutTrailingSlash as $, logComplete as A, logResponse as B, messages as C, tasks as D, workflowRuns as E, workflowRunNodes as F, workflows as G, workflowTemplates as H, buildAssetsURL as I, useRuntimeConfig as J, getResponseStatusText as K, getResponseStatus as L, defineRenderHandler as M, publicAssetsURL as N, destr as O, getRouteRules as P, useNitroApp as Q, defu as R, parseQuery as S, klona as T, defuFn as U, hasProtocol as V, isScriptProtocol as W, joinURL as X, withQuery as Y, sanitizeStatusCode as Z, withTrailingSlash as _, readBody as a, getContext as a0, $fetch$1 as a1, baseURL as a2, createHooks as a3, executeAsync as a4, toRouteMatcher as a5, createRouter$1 as a6, isEqual as a7, nodeServer as a8, db as b, createError$1 as c, defineEventHandler as d, getQuery as e, setHeader as f, getRouterParam as g, hashPassword as h, getHeader as i, setResponseStatus as j, sendStream as k, logTitleResponse as l, readMultipartFormData as m, assistants as n, conversations as o, upstreams as p, aimodels as q, requireAuth as r, signJwt as s, userSettings as t, users as u, verifyPassword as v, calcSize as w, logCompressRequest as x, logRequest as y, logError as z };
//# sourceMappingURL=nitro.mjs.map
