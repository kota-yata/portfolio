
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "@charset \"UTF-8\";\n/* 全ページ共通スタイル */\nhtml {\n  width: 100vw;\n  min-height: 100vh;\n  padding: 0;\n  margin: 0;\n  scroll-behavior: smooth;\n  background: #444;\n  background-size: cover;\n  background-attachment: scroll;\n  background-repeat: repeat;\n  color: #f5f5f5; }\n\nbody {\n  width: 100vw;\n  overflow-x: hidden;\n  padding: 0;\n  margin: 0;\n  font-family: \"Poppins\", \"Noto Sans JP\", sans-serif;\n  background: #444;\n  color: #f5f5f5; }\n\nh3 {\n  text-align: center;\n  color: #444;\n  user-select: none; }\n\nh1, h2 {\n  text-align: center;\n  user-select: none; }\n\n.container {\n  background: #333;\n  border: 1px #4f4f4f solid;\n  border-radius: 20px;\n  box-shadow: 0 0 15px 7px rgba(51, 51, 51, 0.25); }\n  .container-info {\n    padding: 30px 50px; }\n  .container-title {\n    font-weight: bold;\n    font-size: 24px;\n    color: #a4a4a4; }\n  .container-desc {\n    margin-top: 20px;\n    font-family: \"Noto Sans JP\", sans-serif;\n    line-height: 25px;\n    letter-spacing: 2%;\n    color: #f5f5f5;\n    font-weight: 300; }\n  .container-large {\n    font-size: 18px; }\n  .container-small {\n    font-size: 14px; }\n\n@media screen and (max-width: 800px) {\n  .container-info {\n    padding: 20px 30px; }\n  .container-large {\n    font-size: 14px; }\n  .container-small {\n    font-size: 12px; } }\n";
  styleInject(css_248z);

  function noop() { }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty(obj) {
      return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
      if (store == null) {
          return noop;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
      component.$$.on_destroy.push(subscribe(store, callback));
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
      for (let i = 0; i < iterations.length; i += 1) {
          if (iterations[i])
              iterations[i].d(detaching);
      }
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function set_data(text, data) {
      data = '' + data;
      if (text.wholeText !== data)
          text.data = data;
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }
  function get_current_component() {
      if (!current_component)
          throw new Error('Function called outside component initialization');
      return current_component;
  }
  function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          set_current_component(null);
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  function create_component(block) {
      block && block.c();
  }
  function mount_component(component, target, anchor) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);
          if (on_destroy) {
              on_destroy.push(...new_on_destroy);
          }
          else {
              // Edge case - component was destroyed immediately,
              // most likely as a result of a binding initialising
              run_all(new_on_destroy);
          }
          component.$$.on_mount = [];
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const prop_values = options.props || {};
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : []),
          // everything else
          callbacks: blank_object(),
          dirty,
          skip_bound: false
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, prop_values, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              const nodes = children(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  const subscriber_queue = [];
  /**
   * Creates a `Readable` store that allows reading by subscription.
   * @param value initial value
   * @param {StartStopNotifier}start start and stop notifications for subscriptions
   */
  function readable(value, start) {
      return {
          subscribe: writable(value, start).subscribe
      };
  }
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  function writable(value, start = noop) {
      let stop;
      const subscribers = [];
      function set(new_value) {
          if (safe_not_equal(value, new_value)) {
              value = new_value;
              if (stop) { // store is ready
                  const run_queue = !subscriber_queue.length;
                  for (let i = 0; i < subscribers.length; i += 1) {
                      const s = subscribers[i];
                      s[1]();
                      subscriber_queue.push(s, value);
                  }
                  if (run_queue) {
                      for (let i = 0; i < subscriber_queue.length; i += 2) {
                          subscriber_queue[i][0](subscriber_queue[i + 1]);
                      }
                      subscriber_queue.length = 0;
                  }
              }
          }
      }
      function update(fn) {
          set(fn(value));
      }
      function subscribe(run, invalidate = noop) {
          const subscriber = [run, invalidate];
          subscribers.push(subscriber);
          if (subscribers.length === 1) {
              stop = start(set) || noop;
          }
          run(value);
          return () => {
              const index = subscribers.indexOf(subscriber);
              if (index !== -1) {
                  subscribers.splice(index, 1);
              }
              if (subscribers.length === 0) {
                  stop();
                  stop = null;
              }
          };
      }
      return { set, update, subscribe };
  }
  function derived(stores, fn, initial_value) {
      const single = !Array.isArray(stores);
      const stores_array = single
          ? [stores]
          : stores;
      const auto = fn.length < 2;
      return readable(initial_value, (set) => {
          let inited = false;
          const values = [];
          let pending = 0;
          let cleanup = noop;
          const sync = () => {
              if (pending) {
                  return;
              }
              cleanup();
              const result = fn(single ? values[0] : values, set);
              if (auto) {
                  set(result);
              }
              else {
                  cleanup = is_function(result) ? result : noop;
              }
          };
          const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
              values[i] = value;
              pending &= ~(1 << i);
              if (inited) {
                  sync();
              }
          }, () => {
              pending |= (1 << i);
          }));
          inited = true;
          sync();
          return function stop() {
              run_all(unsubscribers);
              cleanup();
          };
      });
  }

  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function getMergeFunction(key, options) {
  	if (!options.customMerge) {
  		return deepmerge
  	}
  	var customMerge = options.customMerge(key);
  	return typeof customMerge === 'function' ? customMerge : deepmerge
  }

  function getEnumerableOwnPropertySymbols(target) {
  	return Object.getOwnPropertySymbols
  		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
  			return target.propertyIsEnumerable(symbol)
  		})
  		: []
  }

  function getKeys(target) {
  	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  }

  function propertyIsOnObject(object, property) {
  	try {
  		return property in object
  	} catch(_) {
  		return false
  	}
  }

  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
  	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		getKeys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	getKeys(source).forEach(function(key) {
  		if (propertyIsUnsafe(target, key)) {
  			return
  		}

  		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
  			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  		} else {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  	// implementations can use it. The caller may not replace it.
  	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

  var cjs = deepmerge_1;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var dlv_umd = createCommonjsModule(function (module, exports) {
  !function(t,n){module.exports=function(t,n,e,i,o){for(n=n.split?n.split("."):n,i=0;i<n.length;i++)t=t?t[n[i]]:o;return t===o?e:t};}();

  });

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  var TYPE;
  (function (TYPE) {
      /**
       * Raw text
       */
      TYPE[TYPE["literal"] = 0] = "literal";
      /**
       * Variable w/o any format, e.g `var` in `this is a {var}`
       */
      TYPE[TYPE["argument"] = 1] = "argument";
      /**
       * Variable w/ number format
       */
      TYPE[TYPE["number"] = 2] = "number";
      /**
       * Variable w/ date format
       */
      TYPE[TYPE["date"] = 3] = "date";
      /**
       * Variable w/ time format
       */
      TYPE[TYPE["time"] = 4] = "time";
      /**
       * Variable w/ select format
       */
      TYPE[TYPE["select"] = 5] = "select";
      /**
       * Variable w/ plural format
       */
      TYPE[TYPE["plural"] = 6] = "plural";
      /**
       * Only possible within plural argument.
       * This is the `#` symbol that will be substituted with the count.
       */
      TYPE[TYPE["pound"] = 7] = "pound";
      /**
       * XML-like tag
       */
      TYPE[TYPE["tag"] = 8] = "tag";
  })(TYPE || (TYPE = {}));
  var SKELETON_TYPE;
  (function (SKELETON_TYPE) {
      SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
      SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
  })(SKELETON_TYPE || (SKELETON_TYPE = {}));
  /**
   * Type Guards
   */
  function isLiteralElement(el) {
      return el.type === TYPE.literal;
  }
  function isArgumentElement(el) {
      return el.type === TYPE.argument;
  }
  function isNumberElement(el) {
      return el.type === TYPE.number;
  }
  function isDateElement(el) {
      return el.type === TYPE.date;
  }
  function isTimeElement(el) {
      return el.type === TYPE.time;
  }
  function isSelectElement(el) {
      return el.type === TYPE.select;
  }
  function isPluralElement(el) {
      return el.type === TYPE.plural;
  }
  function isPoundElement(el) {
      return el.type === TYPE.pound;
  }
  function isTagElement(el) {
      return el.type === TYPE.tag;
  }
  function isNumberSkeleton(el) {
      return !!(el && typeof el === 'object' && el.type === 0 /* number */);
  }
  function isDateTimeSkeleton(el) {
      return !!(el && typeof el === 'object' && el.type === 1 /* dateTime */);
  }

  /**
   * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
   * with some tweaks
   */
  var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  /**
   * Parse Date time skeleton into Intl.DateTimeFormatOptions
   * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * @public
   * @param skeleton skeleton string
   */
  function parseDateTimeSkeleton(skeleton) {
      var result = {};
      skeleton.replace(DATE_TIME_REGEX, function (match) {
          var len = match.length;
          switch (match[0]) {
              // Era
              case 'G':
                  result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                  break;
              // Year
              case 'y':
                  result.year = len === 2 ? '2-digit' : 'numeric';
                  break;
              case 'Y':
              case 'u':
              case 'U':
              case 'r':
                  throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
              // Quarter
              case 'q':
              case 'Q':
                  throw new RangeError('`q/Q` (quarter) patterns are not supported');
              // Month
              case 'M':
              case 'L':
                  result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                  break;
              // Week
              case 'w':
              case 'W':
                  throw new RangeError('`w/W` (week) patterns are not supported');
              case 'd':
                  result.day = ['numeric', '2-digit'][len - 1];
                  break;
              case 'D':
              case 'F':
              case 'g':
                  throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
              // Weekday
              case 'E':
                  result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                  break;
              case 'e':
                  if (len < 4) {
                      throw new RangeError('`e..eee` (weekday) patterns are not supported');
                  }
                  result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                  break;
              case 'c':
                  if (len < 4) {
                      throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                  }
                  result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                  break;
              // Period
              case 'a': // AM, PM
                  result.hour12 = true;
                  break;
              case 'b': // am, pm, noon, midnight
              case 'B': // flexible day periods
                  throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
              // Hour
              case 'h':
                  result.hourCycle = 'h12';
                  result.hour = ['numeric', '2-digit'][len - 1];
                  break;
              case 'H':
                  result.hourCycle = 'h23';
                  result.hour = ['numeric', '2-digit'][len - 1];
                  break;
              case 'K':
                  result.hourCycle = 'h11';
                  result.hour = ['numeric', '2-digit'][len - 1];
                  break;
              case 'k':
                  result.hourCycle = 'h24';
                  result.hour = ['numeric', '2-digit'][len - 1];
                  break;
              case 'j':
              case 'J':
              case 'C':
                  throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
              // Minute
              case 'm':
                  result.minute = ['numeric', '2-digit'][len - 1];
                  break;
              // Second
              case 's':
                  result.second = ['numeric', '2-digit'][len - 1];
                  break;
              case 'S':
              case 'A':
                  throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
              // Zone
              case 'z': // 1..3, 4: specific non-location format
                  result.timeZoneName = len < 4 ? 'short' : 'long';
                  break;
              case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
              case 'O': // 1, 4: miliseconds in day short, long
              case 'v': // 1, 4: generic non-location format
              case 'V': // 1, 2, 3, 4: time zone ID or city
              case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
              case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                  throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
          }
          return '';
      });
      return result;
  }
  function icuUnitToEcma(unit) {
      return unit.replace(/^(.*?)-/, '');
  }
  var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
  var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
  function parseSignificantPrecision(str) {
      var result = {};
      str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
          // @@@ case
          if (typeof g2 !== 'string') {
              result.minimumSignificantDigits = g1.length;
              result.maximumSignificantDigits = g1.length;
          }
          // @@@+ case
          else if (g2 === '+') {
              result.minimumSignificantDigits = g1.length;
          }
          // .### case
          else if (g1[0] === '#') {
              result.maximumSignificantDigits = g1.length;
          }
          // .@@## or .@@@ case
          else {
              result.minimumSignificantDigits = g1.length;
              result.maximumSignificantDigits =
                  g1.length + (typeof g2 === 'string' ? g2.length : 0);
          }
          return '';
      });
      return result;
  }
  function parseSign(str) {
      switch (str) {
          case 'sign-auto':
              return {
                  signDisplay: 'auto',
              };
          case 'sign-accounting':
              return {
                  currencySign: 'accounting',
              };
          case 'sign-always':
              return {
                  signDisplay: 'always',
              };
          case 'sign-accounting-always':
              return {
                  signDisplay: 'always',
                  currencySign: 'accounting',
              };
          case 'sign-except-zero':
              return {
                  signDisplay: 'exceptZero',
              };
          case 'sign-accounting-except-zero':
              return {
                  signDisplay: 'exceptZero',
                  currencySign: 'accounting',
              };
          case 'sign-never':
              return {
                  signDisplay: 'never',
              };
      }
  }
  function parseNotationOptions(opt) {
      var result = {};
      var signOpts = parseSign(opt);
      if (signOpts) {
          return signOpts;
      }
      return result;
  }
  /**
   * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
   */
  function parseNumberSkeleton(tokens) {
      var result = {};
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
          var token = tokens_1[_i];
          switch (token.stem) {
              case 'percent':
                  result.style = 'percent';
                  continue;
              case 'currency':
                  result.style = 'currency';
                  result.currency = token.options[0];
                  continue;
              case 'group-off':
                  result.useGrouping = false;
                  continue;
              case 'precision-integer':
              case '.':
                  result.maximumFractionDigits = 0;
                  continue;
              case 'measure-unit':
                  result.style = 'unit';
                  result.unit = icuUnitToEcma(token.options[0]);
                  continue;
              case 'compact-short':
                  result.notation = 'compact';
                  result.compactDisplay = 'short';
                  continue;
              case 'compact-long':
                  result.notation = 'compact';
                  result.compactDisplay = 'long';
                  continue;
              case 'scientific':
                  result = __assign(__assign(__assign({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                  continue;
              case 'engineering':
                  result = __assign(__assign(__assign({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                  continue;
              case 'notation-simple':
                  result.notation = 'standard';
                  continue;
              // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
              case 'unit-width-narrow':
                  result.currencyDisplay = 'narrowSymbol';
                  result.unitDisplay = 'narrow';
                  continue;
              case 'unit-width-short':
                  result.currencyDisplay = 'code';
                  result.unitDisplay = 'short';
                  continue;
              case 'unit-width-full-name':
                  result.currencyDisplay = 'name';
                  result.unitDisplay = 'long';
                  continue;
              case 'unit-width-iso-code':
                  result.currencyDisplay = 'symbol';
                  continue;
          }
          // Precision
          // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision
          // precision-integer case
          if (FRACTION_PRECISION_REGEX.test(token.stem)) {
              if (token.options.length > 1) {
                  throw new RangeError('Fraction-precision stems only accept a single optional option');
              }
              token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                  // .000* case (before ICU67 it was .000+)
                  if (g2 === '*') {
                      result.minimumFractionDigits = g1.length;
                  }
                  // .### case
                  else if (g3 && g3[0] === '#') {
                      result.maximumFractionDigits = g3.length;
                  }
                  // .00## case
                  else if (g4 && g5) {
                      result.minimumFractionDigits = g4.length;
                      result.maximumFractionDigits = g4.length + g5.length;
                  }
                  else {
                      result.minimumFractionDigits = g1.length;
                      result.maximumFractionDigits = g1.length;
                  }
                  return '';
              });
              if (token.options.length) {
                  result = __assign(__assign({}, result), parseSignificantPrecision(token.options[0]));
              }
              continue;
          }
          if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
              result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
              continue;
          }
          var signOpts = parseSign(token.stem);
          if (signOpts) {
              result = __assign(__assign({}, result), signOpts);
          }
      }
      return result;
  }

  // @ts-nocheck
  var SyntaxError = /** @class */ (function (_super) {
      __extends(SyntaxError, _super);
      function SyntaxError(message, expected, found, location) {
          var _this = _super.call(this) || this;
          _this.message = message;
          _this.expected = expected;
          _this.found = found;
          _this.location = location;
          _this.name = "SyntaxError";
          if (typeof Error.captureStackTrace === "function") {
              Error.captureStackTrace(_this, SyntaxError);
          }
          return _this;
      }
      SyntaxError.buildMessage = function (expected, found) {
          function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
          }
          function literalEscape(s) {
              return s
                  .replace(/\\/g, "\\\\")
                  .replace(/"/g, "\\\"")
                  .replace(/\0/g, "\\0")
                  .replace(/\t/g, "\\t")
                  .replace(/\n/g, "\\n")
                  .replace(/\r/g, "\\r")
                  .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                  .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
          }
          function classEscape(s) {
              return s
                  .replace(/\\/g, "\\\\")
                  .replace(/\]/g, "\\]")
                  .replace(/\^/g, "\\^")
                  .replace(/-/g, "\\-")
                  .replace(/\0/g, "\\0")
                  .replace(/\t/g, "\\t")
                  .replace(/\n/g, "\\n")
                  .replace(/\r/g, "\\r")
                  .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                  .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
          }
          function describeExpectation(expectation) {
              switch (expectation.type) {
                  case "literal":
                      return "\"" + literalEscape(expectation.text) + "\"";
                  case "class":
                      var escapedParts = expectation.parts.map(function (part) {
                          return Array.isArray(part)
                              ? classEscape(part[0]) + "-" + classEscape(part[1])
                              : classEscape(part);
                      });
                      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                  case "any":
                      return "any character";
                  case "end":
                      return "end of input";
                  case "other":
                      return expectation.description;
              }
          }
          function describeExpected(expected1) {
              var descriptions = expected1.map(describeExpectation);
              var i;
              var j;
              descriptions.sort();
              if (descriptions.length > 0) {
                  for (i = 1, j = 1; i < descriptions.length; i++) {
                      if (descriptions[i - 1] !== descriptions[i]) {
                          descriptions[j] = descriptions[i];
                          j++;
                      }
                  }
                  descriptions.length = j;
              }
              switch (descriptions.length) {
                  case 1:
                      return descriptions[0];
                  case 2:
                      return descriptions[0] + " or " + descriptions[1];
                  default:
                      return descriptions.slice(0, -1).join(", ")
                          + ", or "
                          + descriptions[descriptions.length - 1];
              }
          }
          function describeFound(found1) {
              return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
          }
          return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
      };
      return SyntaxError;
  }(Error));
  function peg$parse(input, options) {
      options = options !== undefined ? options : {};
      var peg$FAILED = {};
      var peg$startRuleFunctions = { start: peg$parsestart };
      var peg$startRuleFunction = peg$parsestart;
      var peg$c0 = function () { return !ignoreTag; };
      var peg$c1 = function (x) { return x; };
      var peg$c2 = function () { return ignoreTag; };
      var peg$c3 = "<";
      var peg$c4 = peg$literalExpectation("<", false);
      var peg$c5 = function (parts) {
          return parts.join('');
      };
      var peg$c6 = function () { return '<'; };
      var peg$c7 = function (messageText) {
          return __assign({ type: TYPE.literal, value: messageText }, insertLocation());
      };
      var peg$c8 = "#";
      var peg$c9 = peg$literalExpectation("#", false);
      var peg$c10 = function () {
          return __assign({ type: TYPE.pound }, insertLocation());
      };
      var peg$c11 = peg$otherExpectation("tagElement");
      var peg$c12 = function (open, children, close) {
          if (open !== close) {
              error("Mismatch tag \"" + open + "\" !== \"" + close + "\"", location());
          }
          return __assign({ type: TYPE.tag, value: open, children: children }, insertLocation());
      };
      var peg$c13 = "/>";
      var peg$c14 = peg$literalExpectation("/>", false);
      var peg$c15 = function (value) {
          return __assign({ type: TYPE.literal, value: value.join('') }, insertLocation());
      };
      var peg$c16 = ">";
      var peg$c17 = peg$literalExpectation(">", false);
      var peg$c18 = function (tag) { return tag; };
      var peg$c19 = "</";
      var peg$c20 = peg$literalExpectation("</", false);
      var peg$c21 = peg$otherExpectation("argumentElement");
      var peg$c22 = "{";
      var peg$c23 = peg$literalExpectation("{", false);
      var peg$c24 = "}";
      var peg$c25 = peg$literalExpectation("}", false);
      var peg$c26 = function (value) {
          return __assign({ type: TYPE.argument, value: value }, insertLocation());
      };
      var peg$c27 = peg$otherExpectation("numberSkeletonId");
      var peg$c28 = /^['\/{}]/;
      var peg$c29 = peg$classExpectation(["'", "/", "{", "}"], false, false);
      var peg$c30 = peg$anyExpectation();
      var peg$c31 = peg$otherExpectation("numberSkeletonTokenOption");
      var peg$c32 = "/";
      var peg$c33 = peg$literalExpectation("/", false);
      var peg$c34 = function (option) { return option; };
      var peg$c35 = peg$otherExpectation("numberSkeletonToken");
      var peg$c36 = function (stem, options) {
          return { stem: stem, options: options };
      };
      var peg$c37 = function (tokens) {
          return __assign({ type: 0 /* number */, tokens: tokens, parsedOptions: shouldParseSkeleton ? parseNumberSkeleton(tokens) : {} }, insertLocation());
      };
      var peg$c38 = "::";
      var peg$c39 = peg$literalExpectation("::", false);
      var peg$c40 = function (skeleton) { return skeleton; };
      var peg$c41 = function () { messageCtx.push('numberArgStyle'); return true; };
      var peg$c42 = function (style) {
          messageCtx.pop();
          return style.replace(/\s*$/, '');
      };
      var peg$c43 = ",";
      var peg$c44 = peg$literalExpectation(",", false);
      var peg$c45 = "number";
      var peg$c46 = peg$literalExpectation("number", false);
      var peg$c47 = function (value, type, style) {
          return __assign({ type: type === 'number' ? TYPE.number : type === 'date' ? TYPE.date : TYPE.time, style: style && style[2], value: value }, insertLocation());
      };
      var peg$c48 = "'";
      var peg$c49 = peg$literalExpectation("'", false);
      var peg$c50 = /^[^']/;
      var peg$c51 = peg$classExpectation(["'"], true, false);
      var peg$c52 = /^[^a-zA-Z'{}]/;
      var peg$c53 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
      var peg$c54 = /^[a-zA-Z]/;
      var peg$c55 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
      var peg$c56 = function (pattern) {
          return __assign({ type: 1 /* dateTime */, pattern: pattern, parsedOptions: shouldParseSkeleton ? parseDateTimeSkeleton(pattern) : {} }, insertLocation());
      };
      var peg$c57 = function () { messageCtx.push('dateOrTimeArgStyle'); return true; };
      var peg$c58 = "date";
      var peg$c59 = peg$literalExpectation("date", false);
      var peg$c60 = "time";
      var peg$c61 = peg$literalExpectation("time", false);
      var peg$c62 = "plural";
      var peg$c63 = peg$literalExpectation("plural", false);
      var peg$c64 = "selectordinal";
      var peg$c65 = peg$literalExpectation("selectordinal", false);
      var peg$c66 = "offset:";
      var peg$c67 = peg$literalExpectation("offset:", false);
      var peg$c68 = function (value, pluralType, offset, options) {
          return __assign({ type: TYPE.plural, pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal', value: value, offset: offset ? offset[2] : 0, options: options.reduce(function (all, _a) {
                  var id = _a.id, value = _a.value, optionLocation = _a.location;
                  if (id in all) {
                      error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
                  }
                  all[id] = {
                      value: value,
                      location: optionLocation
                  };
                  return all;
              }, {}) }, insertLocation());
      };
      var peg$c69 = "select";
      var peg$c70 = peg$literalExpectation("select", false);
      var peg$c71 = function (value, options) {
          return __assign({ type: TYPE.select, value: value, options: options.reduce(function (all, _a) {
                  var id = _a.id, value = _a.value, optionLocation = _a.location;
                  if (id in all) {
                      error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
                  }
                  all[id] = {
                      value: value,
                      location: optionLocation
                  };
                  return all;
              }, {}) }, insertLocation());
      };
      var peg$c72 = "=";
      var peg$c73 = peg$literalExpectation("=", false);
      var peg$c74 = function (id) { messageCtx.push('select'); return true; };
      var peg$c75 = function (id, value) {
          messageCtx.pop();
          return __assign({ id: id,
              value: value }, insertLocation());
      };
      var peg$c76 = function (id) { messageCtx.push('plural'); return true; };
      var peg$c77 = function (id, value) {
          messageCtx.pop();
          return __assign({ id: id,
              value: value }, insertLocation());
      };
      var peg$c78 = peg$otherExpectation("whitespace");
      var peg$c79 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
      var peg$c80 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
      var peg$c81 = peg$otherExpectation("syntax pattern");
      var peg$c82 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
      var peg$c83 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
      var peg$c84 = peg$otherExpectation("optional whitespace");
      var peg$c85 = peg$otherExpectation("number");
      var peg$c86 = "-";
      var peg$c87 = peg$literalExpectation("-", false);
      var peg$c88 = function (negative, num) {
          return num
              ? negative
                  ? -num
                  : num
              : 0;
      };
      var peg$c90 = peg$otherExpectation("double apostrophes");
      var peg$c91 = "''";
      var peg$c92 = peg$literalExpectation("''", false);
      var peg$c93 = function () { return "'"; };
      var peg$c94 = function (escapedChar, quotedChars) {
          return escapedChar + quotedChars.replace("''", "'");
      };
      var peg$c95 = function (x) {
          return (x !== '<' &&
              x !== '{' &&
              !(isInPluralOption() && x === '#') &&
              !(isNestedMessageText() && x === '}'));
      };
      var peg$c96 = "\n";
      var peg$c97 = peg$literalExpectation("\n", false);
      var peg$c98 = function (x) {
          return x === '<' || x === '>' || x === '{' || x === '}' || (isInPluralOption() && x === '#');
      };
      var peg$c99 = peg$otherExpectation("argNameOrNumber");
      var peg$c100 = peg$otherExpectation("validTag");
      var peg$c101 = peg$otherExpectation("argNumber");
      var peg$c102 = "0";
      var peg$c103 = peg$literalExpectation("0", false);
      var peg$c104 = function () { return 0; };
      var peg$c105 = /^[1-9]/;
      var peg$c106 = peg$classExpectation([["1", "9"]], false, false);
      var peg$c107 = /^[0-9]/;
      var peg$c108 = peg$classExpectation([["0", "9"]], false, false);
      var peg$c109 = function (digits) {
          return parseInt(digits.join(''), 10);
      };
      var peg$c110 = peg$otherExpectation("argName");
      var peg$c111 = peg$otherExpectation("tagName");
      var peg$currPos = 0;
      var peg$savedPos = 0;
      var peg$posDetailsCache = [{ line: 1, column: 1 }];
      var peg$maxFailPos = 0;
      var peg$maxFailExpected = [];
      var peg$silentFails = 0;
      var peg$result;
      if (options.startRule !== undefined) {
          if (!(options.startRule in peg$startRuleFunctions)) {
              throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
          return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
          return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function error(message, location1) {
          location1 = location1 !== undefined
              ? location1
              : peg$computeLocation(peg$savedPos, peg$currPos);
          throw peg$buildSimpleError(message, location1);
      }
      function peg$literalExpectation(text1, ignoreCase) {
          return { type: "literal", text: text1, ignoreCase: ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
          return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
      }
      function peg$anyExpectation() {
          return { type: "any" };
      }
      function peg$endExpectation() {
          return { type: "end" };
      }
      function peg$otherExpectation(description) {
          return { type: "other", description: description };
      }
      function peg$computePosDetails(pos) {
          var details = peg$posDetailsCache[pos];
          var p;
          if (details) {
              return details;
          }
          else {
              p = pos - 1;
              while (!peg$posDetailsCache[p]) {
                  p--;
              }
              details = peg$posDetailsCache[p];
              details = {
                  line: details.line,
                  column: details.column
              };
              while (p < pos) {
                  if (input.charCodeAt(p) === 10) {
                      details.line++;
                      details.column = 1;
                  }
                  else {
                      details.column++;
                  }
                  p++;
              }
              peg$posDetailsCache[pos] = details;
              return details;
          }
      }
      function peg$computeLocation(startPos, endPos) {
          var startPosDetails = peg$computePosDetails(startPos);
          var endPosDetails = peg$computePosDetails(endPos);
          return {
              start: {
                  offset: startPos,
                  line: startPosDetails.line,
                  column: startPosDetails.column
              },
              end: {
                  offset: endPos,
                  line: endPosDetails.line,
                  column: endPosDetails.column
              }
          };
      }
      function peg$fail(expected1) {
          if (peg$currPos < peg$maxFailPos) {
              return;
          }
          if (peg$currPos > peg$maxFailPos) {
              peg$maxFailPos = peg$currPos;
              peg$maxFailExpected = [];
          }
          peg$maxFailExpected.push(expected1);
      }
      function peg$buildSimpleError(message, location1) {
          return new SyntaxError(message, [], "", location1);
      }
      function peg$buildStructuredError(expected1, found, location1) {
          return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
      }
      function peg$parsestart() {
          var s0;
          s0 = peg$parsemessage();
          return s0;
      }
      function peg$parsemessage() {
          var s0, s1;
          s0 = [];
          s1 = peg$parsemessageElement();
          while (s1 !== peg$FAILED) {
              s0.push(s1);
              s1 = peg$parsemessageElement();
          }
          return s0;
      }
      function peg$parsemessageElement() {
          var s0, s1, s2;
          s0 = peg$currPos;
          peg$savedPos = peg$currPos;
          s1 = peg$c0();
          if (s1) {
              s1 = undefined;
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsetagElement();
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c1(s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
              s0 = peg$parseliteralElement();
              if (s0 === peg$FAILED) {
                  s0 = peg$parseargumentElement();
                  if (s0 === peg$FAILED) {
                      s0 = peg$parsesimpleFormatElement();
                      if (s0 === peg$FAILED) {
                          s0 = peg$parsepluralElement();
                          if (s0 === peg$FAILED) {
                              s0 = peg$parseselectElement();
                              if (s0 === peg$FAILED) {
                                  s0 = peg$parsepoundElement();
                              }
                          }
                      }
                  }
              }
          }
          return s0;
      }
      function peg$parsemessageText() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          peg$savedPos = peg$currPos;
          s1 = peg$c2();
          if (s1) {
              s1 = undefined;
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parsedoubleApostrophes();
              if (s3 === peg$FAILED) {
                  s3 = peg$parsequotedString();
                  if (s3 === peg$FAILED) {
                      s3 = peg$parseunquotedString();
                      if (s3 === peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 60) {
                              s3 = peg$c3;
                              peg$currPos++;
                          }
                          else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c4);
                              }
                          }
                      }
                  }
              }
              if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parsedoubleApostrophes();
                      if (s3 === peg$FAILED) {
                          s3 = peg$parsequotedString();
                          if (s3 === peg$FAILED) {
                              s3 = peg$parseunquotedString();
                              if (s3 === peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 60) {
                                      s3 = peg$c3;
                                      peg$currPos++;
                                  }
                                  else {
                                      s3 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c4);
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
              else {
                  s2 = peg$FAILED;
              }
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c5(s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parsedoubleApostrophes();
              if (s2 === peg$FAILED) {
                  s2 = peg$parsequotedString();
                  if (s2 === peg$FAILED) {
                      s2 = peg$parseunquotedString();
                      if (s2 === peg$FAILED) {
                          s2 = peg$parsenonTagStartingAngleBracket();
                      }
                  }
              }
              if (s2 !== peg$FAILED) {
                  while (s2 !== peg$FAILED) {
                      s1.push(s2);
                      s2 = peg$parsedoubleApostrophes();
                      if (s2 === peg$FAILED) {
                          s2 = peg$parsequotedString();
                          if (s2 === peg$FAILED) {
                              s2 = peg$parseunquotedString();
                              if (s2 === peg$FAILED) {
                                  s2 = peg$parsenonTagStartingAngleBracket();
                              }
                          }
                      }
                  }
              }
              else {
                  s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c5(s1);
              }
              s0 = s1;
          }
          return s0;
      }
      function peg$parsenonTagStartingAngleBracket() {
          var s0, s1, s2;
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          s2 = peg$parseopeningTag();
          if (s2 === peg$FAILED) {
              s2 = peg$parseclosingTag();
              if (s2 === peg$FAILED) {
                  s2 = peg$parseselfClosingTag();
              }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
              s1 = undefined;
          }
          else {
              peg$currPos = s1;
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 60) {
                  s2 = peg$c3;
                  peg$currPos++;
              }
              else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c4);
                  }
              }
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c6();
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parseliteralElement() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parsemessageText();
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c7(s1);
          }
          s0 = s1;
          return s0;
      }
      function peg$parsepoundElement() {
          var s0, s1;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
              s1 = peg$c8;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c9);
              }
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10();
          }
          s0 = s1;
          return s0;
      }
      function peg$parsetagElement() {
          var s0, s1, s2, s3;
          peg$silentFails++;
          s0 = peg$parseselfClosingTag();
          if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseopeningTag();
              if (s1 !== peg$FAILED) {
                  s2 = peg$parsemessage();
                  if (s2 !== peg$FAILED) {
                      s3 = peg$parseclosingTag();
                      if (s3 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c12(s1, s2, s3);
                          s0 = s1;
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c11);
              }
          }
          return s0;
      }
      function peg$parseselfClosingTag() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 60) {
              s2 = peg$c3;
              peg$currPos++;
          }
          else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
              }
          }
          if (s2 !== peg$FAILED) {
              s3 = peg$parsevalidTag();
              if (s3 !== peg$FAILED) {
                  s4 = peg$parse_();
                  if (s4 !== peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c13) {
                          s5 = peg$c13;
                          peg$currPos += 2;
                      }
                      else {
                          s5 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c14);
                          }
                      }
                      if (s5 !== peg$FAILED) {
                          s2 = [s2, s3, s4, s5];
                          s1 = s2;
                      }
                      else {
                          peg$currPos = s1;
                          s1 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s1;
                      s1 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s1;
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c15(s1);
          }
          s0 = s1;
          return s0;
      }
      function peg$parseopeningTag() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 60) {
              s1 = peg$c3;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsevalidTag();
              if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 62) {
                      s3 = peg$c16;
                      peg$currPos++;
                  }
                  else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c17);
                      }
                  }
                  if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c18(s2);
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parseclosingTag() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c19) {
              s1 = peg$c19;
              peg$currPos += 2;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c20);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsevalidTag();
              if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 62) {
                      s3 = peg$c16;
                      peg$currPos++;
                  }
                  else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c17);
                      }
                  }
                  if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c18(s2);
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parseargumentElement() {
          var s0, s1, s2, s3, s4, s5;
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
              s1 = peg$c22;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parseargNameOrNumber();
                  if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 125) {
                              s5 = peg$c24;
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c25);
                              }
                          }
                          if (s5 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c26(s3);
                              s0 = s1;
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c21);
              }
          }
          return s0;
      }
      function peg$parsenumberSkeletonId() {
          var s0, s1, s2, s3, s4;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsewhiteSpace();
          if (s4 === peg$FAILED) {
              if (peg$c28.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
              }
              else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c29);
                  }
              }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
              s3 = undefined;
          }
          else {
              peg$currPos = s3;
              s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
              }
              else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c30);
                  }
              }
              if (s4 !== peg$FAILED) {
                  s3 = [s3, s4];
                  s2 = s3;
              }
              else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s2;
              s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  peg$silentFails++;
                  s4 = peg$parsewhiteSpace();
                  if (s4 === peg$FAILED) {
                      if (peg$c28.test(input.charAt(peg$currPos))) {
                          s4 = input.charAt(peg$currPos);
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c29);
                          }
                      }
                  }
                  peg$silentFails--;
                  if (s4 === peg$FAILED) {
                      s3 = undefined;
                  }
                  else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                      if (input.length > peg$currPos) {
                          s4 = input.charAt(peg$currPos);
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c30);
                          }
                      }
                      if (s4 !== peg$FAILED) {
                          s3 = [s3, s4];
                          s2 = s3;
                      }
                      else {
                          peg$currPos = s2;
                          s2 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s2;
                      s2 = peg$FAILED;
                  }
              }
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c27);
              }
          }
          return s0;
      }
      function peg$parsenumberSkeletonTokenOption() {
          var s0, s1, s2;
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 47) {
              s1 = peg$c32;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c33);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsenumberSkeletonId();
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c34(s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c31);
              }
          }
          return s0;
      }
      function peg$parsenumberSkeletonToken() {
          var s0, s1, s2, s3, s4;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
              s2 = peg$parsenumberSkeletonId();
              if (s2 !== peg$FAILED) {
                  s3 = [];
                  s4 = peg$parsenumberSkeletonTokenOption();
                  while (s4 !== peg$FAILED) {
                      s3.push(s4);
                      s4 = peg$parsenumberSkeletonTokenOption();
                  }
                  if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c36(s2, s3);
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c35);
              }
          }
          return s0;
      }
      function peg$parsenumberSkeleton() {
          var s0, s1, s2;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsenumberSkeletonToken();
          if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parsenumberSkeletonToken();
              }
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c37(s1);
          }
          s0 = s1;
          return s0;
      }
      function peg$parsenumberArgStyle() {
          var s0, s1, s2;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c38) {
              s1 = peg$c38;
              peg$currPos += 2;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c39);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsenumberSkeleton();
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c40(s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              peg$savedPos = peg$currPos;
              s1 = peg$c41();
              if (s1) {
                  s1 = undefined;
              }
              else {
                  s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                  s2 = peg$parsemessageText();
                  if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c42(s2);
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          return s0;
      }
      function peg$parsenumberFormatElement() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
              s1 = peg$c22;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parseargNameOrNumber();
                  if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 44) {
                              s5 = peg$c43;
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c44);
                              }
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parse_();
                              if (s6 !== peg$FAILED) {
                                  if (input.substr(peg$currPos, 6) === peg$c45) {
                                      s7 = peg$c45;
                                      peg$currPos += 6;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c46);
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      s8 = peg$parse_();
                                      if (s8 !== peg$FAILED) {
                                          s9 = peg$currPos;
                                          if (input.charCodeAt(peg$currPos) === 44) {
                                              s10 = peg$c43;
                                              peg$currPos++;
                                          }
                                          else {
                                              s10 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                  peg$fail(peg$c44);
                                              }
                                          }
                                          if (s10 !== peg$FAILED) {
                                              s11 = peg$parse_();
                                              if (s11 !== peg$FAILED) {
                                                  s12 = peg$parsenumberArgStyle();
                                                  if (s12 !== peg$FAILED) {
                                                      s10 = [s10, s11, s12];
                                                      s9 = s10;
                                                  }
                                                  else {
                                                      peg$currPos = s9;
                                                      s9 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s9;
                                                  s9 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s9;
                                              s9 = peg$FAILED;
                                          }
                                          if (s9 === peg$FAILED) {
                                              s9 = null;
                                          }
                                          if (s9 !== peg$FAILED) {
                                              s10 = peg$parse_();
                                              if (s10 !== peg$FAILED) {
                                                  if (input.charCodeAt(peg$currPos) === 125) {
                                                      s11 = peg$c24;
                                                      peg$currPos++;
                                                  }
                                                  else {
                                                      s11 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                          peg$fail(peg$c25);
                                                      }
                                                  }
                                                  if (s11 !== peg$FAILED) {
                                                      peg$savedPos = s0;
                                                      s1 = peg$c47(s3, s7, s9);
                                                      s0 = s1;
                                                  }
                                                  else {
                                                      peg$currPos = s0;
                                                      s0 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s0;
                                                  s0 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s0;
                                              s0 = peg$FAILED;
                                          }
                                      }
                                      else {
                                          peg$currPos = s0;
                                          s0 = peg$FAILED;
                                      }
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsedateTimeSkeletonLiteral() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
              s1 = peg$c48;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c49);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parsedoubleApostrophes();
              if (s3 === peg$FAILED) {
                  if (peg$c50.test(input.charAt(peg$currPos))) {
                      s3 = input.charAt(peg$currPos);
                      peg$currPos++;
                  }
                  else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c51);
                      }
                  }
              }
              if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parsedoubleApostrophes();
                      if (s3 === peg$FAILED) {
                          if (peg$c50.test(input.charAt(peg$currPos))) {
                              s3 = input.charAt(peg$currPos);
                              peg$currPos++;
                          }
                          else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c51);
                              }
                          }
                      }
                  }
              }
              else {
                  s2 = peg$FAILED;
              }
              if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 39) {
                      s3 = peg$c48;
                      peg$currPos++;
                  }
                  else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c49);
                      }
                  }
                  if (s3 !== peg$FAILED) {
                      s1 = [s1, s2, s3];
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
              s0 = [];
              s1 = peg$parsedoubleApostrophes();
              if (s1 === peg$FAILED) {
                  if (peg$c52.test(input.charAt(peg$currPos))) {
                      s1 = input.charAt(peg$currPos);
                      peg$currPos++;
                  }
                  else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c53);
                      }
                  }
              }
              if (s1 !== peg$FAILED) {
                  while (s1 !== peg$FAILED) {
                      s0.push(s1);
                      s1 = peg$parsedoubleApostrophes();
                      if (s1 === peg$FAILED) {
                          if (peg$c52.test(input.charAt(peg$currPos))) {
                              s1 = input.charAt(peg$currPos);
                              peg$currPos++;
                          }
                          else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c53);
                              }
                          }
                      }
                  }
              }
              else {
                  s0 = peg$FAILED;
              }
          }
          return s0;
      }
      function peg$parsedateTimeSkeletonPattern() {
          var s0, s1;
          s0 = [];
          if (peg$c54.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c55);
              }
          }
          if (s1 !== peg$FAILED) {
              while (s1 !== peg$FAILED) {
                  s0.push(s1);
                  if (peg$c54.test(input.charAt(peg$currPos))) {
                      s1 = input.charAt(peg$currPos);
                      peg$currPos++;
                  }
                  else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c55);
                      }
                  }
              }
          }
          else {
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsedateTimeSkeleton() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = [];
          s3 = peg$parsedateTimeSkeletonLiteral();
          if (s3 === peg$FAILED) {
              s3 = peg$parsedateTimeSkeletonPattern();
          }
          if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parsedateTimeSkeletonLiteral();
                  if (s3 === peg$FAILED) {
                      s3 = peg$parsedateTimeSkeletonPattern();
                  }
              }
          }
          else {
              s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
              s1 = input.substring(s1, peg$currPos);
          }
          else {
              s1 = s2;
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c56(s1);
          }
          s0 = s1;
          return s0;
      }
      function peg$parsedateOrTimeArgStyle() {
          var s0, s1, s2;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c38) {
              s1 = peg$c38;
              peg$currPos += 2;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c39);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parsedateTimeSkeleton();
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c40(s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              peg$savedPos = peg$currPos;
              s1 = peg$c57();
              if (s1) {
                  s1 = undefined;
              }
              else {
                  s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                  s2 = peg$parsemessageText();
                  if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c42(s2);
                      s0 = s1;
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          return s0;
      }
      function peg$parsedateOrTimeFormatElement() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
              s1 = peg$c22;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parseargNameOrNumber();
                  if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 44) {
                              s5 = peg$c43;
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c44);
                              }
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parse_();
                              if (s6 !== peg$FAILED) {
                                  if (input.substr(peg$currPos, 4) === peg$c58) {
                                      s7 = peg$c58;
                                      peg$currPos += 4;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c59);
                                      }
                                  }
                                  if (s7 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 4) === peg$c60) {
                                          s7 = peg$c60;
                                          peg$currPos += 4;
                                      }
                                      else {
                                          s7 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                              peg$fail(peg$c61);
                                          }
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      s8 = peg$parse_();
                                      if (s8 !== peg$FAILED) {
                                          s9 = peg$currPos;
                                          if (input.charCodeAt(peg$currPos) === 44) {
                                              s10 = peg$c43;
                                              peg$currPos++;
                                          }
                                          else {
                                              s10 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                  peg$fail(peg$c44);
                                              }
                                          }
                                          if (s10 !== peg$FAILED) {
                                              s11 = peg$parse_();
                                              if (s11 !== peg$FAILED) {
                                                  s12 = peg$parsedateOrTimeArgStyle();
                                                  if (s12 !== peg$FAILED) {
                                                      s10 = [s10, s11, s12];
                                                      s9 = s10;
                                                  }
                                                  else {
                                                      peg$currPos = s9;
                                                      s9 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s9;
                                                  s9 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s9;
                                              s9 = peg$FAILED;
                                          }
                                          if (s9 === peg$FAILED) {
                                              s9 = null;
                                          }
                                          if (s9 !== peg$FAILED) {
                                              s10 = peg$parse_();
                                              if (s10 !== peg$FAILED) {
                                                  if (input.charCodeAt(peg$currPos) === 125) {
                                                      s11 = peg$c24;
                                                      peg$currPos++;
                                                  }
                                                  else {
                                                      s11 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                          peg$fail(peg$c25);
                                                      }
                                                  }
                                                  if (s11 !== peg$FAILED) {
                                                      peg$savedPos = s0;
                                                      s1 = peg$c47(s3, s7, s9);
                                                      s0 = s1;
                                                  }
                                                  else {
                                                      peg$currPos = s0;
                                                      s0 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s0;
                                                  s0 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s0;
                                              s0 = peg$FAILED;
                                          }
                                      }
                                      else {
                                          peg$currPos = s0;
                                          s0 = peg$FAILED;
                                      }
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsesimpleFormatElement() {
          var s0;
          s0 = peg$parsenumberFormatElement();
          if (s0 === peg$FAILED) {
              s0 = peg$parsedateOrTimeFormatElement();
          }
          return s0;
      }
      function peg$parsepluralElement() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
              s1 = peg$c22;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parseargNameOrNumber();
                  if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 44) {
                              s5 = peg$c43;
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c44);
                              }
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parse_();
                              if (s6 !== peg$FAILED) {
                                  if (input.substr(peg$currPos, 6) === peg$c62) {
                                      s7 = peg$c62;
                                      peg$currPos += 6;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c63);
                                      }
                                  }
                                  if (s7 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 13) === peg$c64) {
                                          s7 = peg$c64;
                                          peg$currPos += 13;
                                      }
                                      else {
                                          s7 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                              peg$fail(peg$c65);
                                          }
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      s8 = peg$parse_();
                                      if (s8 !== peg$FAILED) {
                                          if (input.charCodeAt(peg$currPos) === 44) {
                                              s9 = peg$c43;
                                              peg$currPos++;
                                          }
                                          else {
                                              s9 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                  peg$fail(peg$c44);
                                              }
                                          }
                                          if (s9 !== peg$FAILED) {
                                              s10 = peg$parse_();
                                              if (s10 !== peg$FAILED) {
                                                  s11 = peg$currPos;
                                                  if (input.substr(peg$currPos, 7) === peg$c66) {
                                                      s12 = peg$c66;
                                                      peg$currPos += 7;
                                                  }
                                                  else {
                                                      s12 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                          peg$fail(peg$c67);
                                                      }
                                                  }
                                                  if (s12 !== peg$FAILED) {
                                                      s13 = peg$parse_();
                                                      if (s13 !== peg$FAILED) {
                                                          s14 = peg$parsenumber();
                                                          if (s14 !== peg$FAILED) {
                                                              s12 = [s12, s13, s14];
                                                              s11 = s12;
                                                          }
                                                          else {
                                                              peg$currPos = s11;
                                                              s11 = peg$FAILED;
                                                          }
                                                      }
                                                      else {
                                                          peg$currPos = s11;
                                                          s11 = peg$FAILED;
                                                      }
                                                  }
                                                  else {
                                                      peg$currPos = s11;
                                                      s11 = peg$FAILED;
                                                  }
                                                  if (s11 === peg$FAILED) {
                                                      s11 = null;
                                                  }
                                                  if (s11 !== peg$FAILED) {
                                                      s12 = peg$parse_();
                                                      if (s12 !== peg$FAILED) {
                                                          s13 = [];
                                                          s14 = peg$parsepluralOption();
                                                          if (s14 !== peg$FAILED) {
                                                              while (s14 !== peg$FAILED) {
                                                                  s13.push(s14);
                                                                  s14 = peg$parsepluralOption();
                                                              }
                                                          }
                                                          else {
                                                              s13 = peg$FAILED;
                                                          }
                                                          if (s13 !== peg$FAILED) {
                                                              s14 = peg$parse_();
                                                              if (s14 !== peg$FAILED) {
                                                                  if (input.charCodeAt(peg$currPos) === 125) {
                                                                      s15 = peg$c24;
                                                                      peg$currPos++;
                                                                  }
                                                                  else {
                                                                      s15 = peg$FAILED;
                                                                      if (peg$silentFails === 0) {
                                                                          peg$fail(peg$c25);
                                                                      }
                                                                  }
                                                                  if (s15 !== peg$FAILED) {
                                                                      peg$savedPos = s0;
                                                                      s1 = peg$c68(s3, s7, s11, s13);
                                                                      s0 = s1;
                                                                  }
                                                                  else {
                                                                      peg$currPos = s0;
                                                                      s0 = peg$FAILED;
                                                                  }
                                                              }
                                                              else {
                                                                  peg$currPos = s0;
                                                                  s0 = peg$FAILED;
                                                              }
                                                          }
                                                          else {
                                                              peg$currPos = s0;
                                                              s0 = peg$FAILED;
                                                          }
                                                      }
                                                      else {
                                                          peg$currPos = s0;
                                                          s0 = peg$FAILED;
                                                      }
                                                  }
                                                  else {
                                                      peg$currPos = s0;
                                                      s0 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s0;
                                                  s0 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s0;
                                              s0 = peg$FAILED;
                                          }
                                      }
                                      else {
                                          peg$currPos = s0;
                                          s0 = peg$FAILED;
                                      }
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parseselectElement() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
              s1 = peg$c22;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parseargNameOrNumber();
                  if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 44) {
                              s5 = peg$c43;
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c44);
                              }
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parse_();
                              if (s6 !== peg$FAILED) {
                                  if (input.substr(peg$currPos, 6) === peg$c69) {
                                      s7 = peg$c69;
                                      peg$currPos += 6;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c70);
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      s8 = peg$parse_();
                                      if (s8 !== peg$FAILED) {
                                          if (input.charCodeAt(peg$currPos) === 44) {
                                              s9 = peg$c43;
                                              peg$currPos++;
                                          }
                                          else {
                                              s9 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                  peg$fail(peg$c44);
                                              }
                                          }
                                          if (s9 !== peg$FAILED) {
                                              s10 = peg$parse_();
                                              if (s10 !== peg$FAILED) {
                                                  s11 = [];
                                                  s12 = peg$parseselectOption();
                                                  if (s12 !== peg$FAILED) {
                                                      while (s12 !== peg$FAILED) {
                                                          s11.push(s12);
                                                          s12 = peg$parseselectOption();
                                                      }
                                                  }
                                                  else {
                                                      s11 = peg$FAILED;
                                                  }
                                                  if (s11 !== peg$FAILED) {
                                                      s12 = peg$parse_();
                                                      if (s12 !== peg$FAILED) {
                                                          if (input.charCodeAt(peg$currPos) === 125) {
                                                              s13 = peg$c24;
                                                              peg$currPos++;
                                                          }
                                                          else {
                                                              s13 = peg$FAILED;
                                                              if (peg$silentFails === 0) {
                                                                  peg$fail(peg$c25);
                                                              }
                                                          }
                                                          if (s13 !== peg$FAILED) {
                                                              peg$savedPos = s0;
                                                              s1 = peg$c71(s3, s11);
                                                              s0 = s1;
                                                          }
                                                          else {
                                                              peg$currPos = s0;
                                                              s0 = peg$FAILED;
                                                          }
                                                      }
                                                      else {
                                                          peg$currPos = s0;
                                                          s0 = peg$FAILED;
                                                      }
                                                  }
                                                  else {
                                                      peg$currPos = s0;
                                                      s0 = peg$FAILED;
                                                  }
                                              }
                                              else {
                                                  peg$currPos = s0;
                                                  s0 = peg$FAILED;
                                              }
                                          }
                                          else {
                                              peg$currPos = s0;
                                              s0 = peg$FAILED;
                                          }
                                      }
                                      else {
                                          peg$currPos = s0;
                                          s0 = peg$FAILED;
                                      }
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsepluralRuleSelectValue() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 61) {
              s2 = peg$c72;
              peg$currPos++;
          }
          else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c73);
              }
          }
          if (s2 !== peg$FAILED) {
              s3 = peg$parsenumber();
              if (s3 !== peg$FAILED) {
                  s2 = [s2, s3];
                  s1 = s2;
              }
              else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s1;
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          if (s0 === peg$FAILED) {
              s0 = peg$parseargName();
          }
          return s0;
      }
      function peg$parseselectOption() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
              s2 = peg$parseargName();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parse_();
                  if (s3 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 123) {
                          s4 = peg$c22;
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c23);
                          }
                      }
                      if (s4 !== peg$FAILED) {
                          peg$savedPos = peg$currPos;
                          s5 = peg$c74();
                          if (s5) {
                              s5 = undefined;
                          }
                          else {
                              s5 = peg$FAILED;
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parsemessage();
                              if (s6 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 125) {
                                      s7 = peg$c24;
                                      peg$currPos++;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c25);
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c75(s2, s6);
                                      s0 = s1;
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsepluralOption() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
              s2 = peg$parsepluralRuleSelectValue();
              if (s2 !== peg$FAILED) {
                  s3 = peg$parse_();
                  if (s3 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 123) {
                          s4 = peg$c22;
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c23);
                          }
                      }
                      if (s4 !== peg$FAILED) {
                          peg$savedPos = peg$currPos;
                          s5 = peg$c76();
                          if (s5) {
                              s5 = undefined;
                          }
                          else {
                              s5 = peg$FAILED;
                          }
                          if (s5 !== peg$FAILED) {
                              s6 = peg$parsemessage();
                              if (s6 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 125) {
                                      s7 = peg$c24;
                                      peg$currPos++;
                                  }
                                  else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                          peg$fail(peg$c25);
                                      }
                                  }
                                  if (s7 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c77(s2, s6);
                                      s0 = s1;
                                  }
                                  else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                  }
                              }
                              else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                              }
                          }
                          else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parsewhiteSpace() {
          var s0;
          peg$silentFails++;
          if (peg$c79.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
          }
          else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c80);
              }
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              if (peg$silentFails === 0) {
                  peg$fail(peg$c78);
              }
          }
          return s0;
      }
      function peg$parsepatternSyntax() {
          var s0;
          peg$silentFails++;
          if (peg$c82.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
          }
          else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c83);
              }
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              if (peg$silentFails === 0) {
                  peg$fail(peg$c81);
              }
          }
          return s0;
      }
      function peg$parse_() {
          var s0, s1, s2;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsewhiteSpace();
          while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parsewhiteSpace();
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c84);
              }
          }
          return s0;
      }
      function peg$parsenumber() {
          var s0, s1, s2;
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
              s1 = peg$c86;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c87);
              }
          }
          if (s1 === peg$FAILED) {
              s1 = null;
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parseargNumber();
              if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c88(s1, s2);
                  s0 = s1;
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c85);
              }
          }
          return s0;
      }
      function peg$parsedoubleApostrophes() {
          var s0, s1;
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c91) {
              s1 = peg$c91;
              peg$currPos += 2;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c92);
              }
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c93();
          }
          s0 = s1;
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c90);
              }
          }
          return s0;
      }
      function peg$parsequotedString() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
              s1 = peg$c48;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c49);
              }
          }
          if (s1 !== peg$FAILED) {
              s2 = peg$parseescapedChar();
              if (s2 !== peg$FAILED) {
                  s3 = peg$currPos;
                  s4 = [];
                  if (input.substr(peg$currPos, 2) === peg$c91) {
                      s5 = peg$c91;
                      peg$currPos += 2;
                  }
                  else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c92);
                      }
                  }
                  if (s5 === peg$FAILED) {
                      if (peg$c50.test(input.charAt(peg$currPos))) {
                          s5 = input.charAt(peg$currPos);
                          peg$currPos++;
                      }
                      else {
                          s5 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c51);
                          }
                      }
                  }
                  while (s5 !== peg$FAILED) {
                      s4.push(s5);
                      if (input.substr(peg$currPos, 2) === peg$c91) {
                          s5 = peg$c91;
                          peg$currPos += 2;
                      }
                      else {
                          s5 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c92);
                          }
                      }
                      if (s5 === peg$FAILED) {
                          if (peg$c50.test(input.charAt(peg$currPos))) {
                              s5 = input.charAt(peg$currPos);
                              peg$currPos++;
                          }
                          else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c51);
                              }
                          }
                      }
                  }
                  if (s4 !== peg$FAILED) {
                      s3 = input.substring(s3, peg$currPos);
                  }
                  else {
                      s3 = s4;
                  }
                  if (s3 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 39) {
                          s4 = peg$c48;
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c49);
                          }
                      }
                      if (s4 === peg$FAILED) {
                          s4 = null;
                      }
                      if (s4 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c94(s2, s3);
                          s0 = s1;
                      }
                      else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s0;
              s0 = peg$FAILED;
          }
          return s0;
      }
      function peg$parseunquotedString() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
          }
          else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c30);
              }
          }
          if (s2 !== peg$FAILED) {
              peg$savedPos = peg$currPos;
              s3 = peg$c95(s2);
              if (s3) {
                  s3 = undefined;
              }
              else {
                  s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                  s2 = [s2, s3];
                  s1 = s2;
              }
              else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s1;
              s1 = peg$FAILED;
          }
          if (s1 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                  s1 = peg$c96;
                  peg$currPos++;
              }
              else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c97);
                  }
              }
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          return s0;
      }
      function peg$parseescapedChar() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
          }
          else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c30);
              }
          }
          if (s2 !== peg$FAILED) {
              peg$savedPos = peg$currPos;
              s3 = peg$c98(s2);
              if (s3) {
                  s3 = undefined;
              }
              else {
                  s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                  s2 = [s2, s3];
                  s1 = s2;
              }
              else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s1;
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          return s0;
      }
      function peg$parseargNameOrNumber() {
          var s0, s1;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = peg$parseargNumber();
          if (s1 === peg$FAILED) {
              s1 = peg$parseargName();
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c99);
              }
          }
          return s0;
      }
      function peg$parsevalidTag() {
          var s0, s1;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = peg$parseargNumber();
          if (s1 === peg$FAILED) {
              s1 = peg$parsetagName();
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c100);
              }
          }
          return s0;
      }
      function peg$parseargNumber() {
          var s0, s1, s2, s3, s4;
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 48) {
              s1 = peg$c102;
              peg$currPos++;
          }
          else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c103);
              }
          }
          if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c104();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$currPos;
              if (peg$c105.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
              }
              else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c106);
                  }
              }
              if (s2 !== peg$FAILED) {
                  s3 = [];
                  if (peg$c107.test(input.charAt(peg$currPos))) {
                      s4 = input.charAt(peg$currPos);
                      peg$currPos++;
                  }
                  else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c108);
                      }
                  }
                  while (s4 !== peg$FAILED) {
                      s3.push(s4);
                      if (peg$c107.test(input.charAt(peg$currPos))) {
                          s4 = input.charAt(peg$currPos);
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c108);
                          }
                      }
                  }
                  if (s3 !== peg$FAILED) {
                      s2 = [s2, s3];
                      s1 = s2;
                  }
                  else {
                      peg$currPos = s1;
                      s1 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c109(s1);
              }
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c101);
              }
          }
          return s0;
      }
      function peg$parseargName() {
          var s0, s1, s2, s3, s4;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsewhiteSpace();
          if (s4 === peg$FAILED) {
              s4 = peg$parsepatternSyntax();
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
              s3 = undefined;
          }
          else {
              peg$currPos = s3;
              s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
              }
              else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                      peg$fail(peg$c30);
                  }
              }
              if (s4 !== peg$FAILED) {
                  s3 = [s3, s4];
                  s2 = s3;
              }
              else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
              }
          }
          else {
              peg$currPos = s2;
              s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  peg$silentFails++;
                  s4 = peg$parsewhiteSpace();
                  if (s4 === peg$FAILED) {
                      s4 = peg$parsepatternSyntax();
                  }
                  peg$silentFails--;
                  if (s4 === peg$FAILED) {
                      s3 = undefined;
                  }
                  else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                      if (input.length > peg$currPos) {
                          s4 = input.charAt(peg$currPos);
                          peg$currPos++;
                      }
                      else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) {
                              peg$fail(peg$c30);
                          }
                      }
                      if (s4 !== peg$FAILED) {
                          s3 = [s3, s4];
                          s2 = s3;
                      }
                      else {
                          peg$currPos = s2;
                          s2 = peg$FAILED;
                      }
                  }
                  else {
                      peg$currPos = s2;
                      s2 = peg$FAILED;
                  }
              }
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c110);
              }
          }
          return s0;
      }
      function peg$parsetagName() {
          var s0, s1, s2, s3, s4;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          if (input.charCodeAt(peg$currPos) === 45) {
              s2 = peg$c86;
              peg$currPos++;
          }
          else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c87);
              }
          }
          if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$currPos;
              peg$silentFails++;
              s4 = peg$parsewhiteSpace();
              if (s4 === peg$FAILED) {
                  s4 = peg$parsepatternSyntax();
              }
              peg$silentFails--;
              if (s4 === peg$FAILED) {
                  s3 = undefined;
              }
              else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                  if (input.length > peg$currPos) {
                      s4 = input.charAt(peg$currPos);
                      peg$currPos++;
                  }
                  else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c30);
                      }
                  }
                  if (s4 !== peg$FAILED) {
                      s3 = [s3, s4];
                      s2 = s3;
                  }
                  else {
                      peg$currPos = s2;
                      s2 = peg$FAILED;
                  }
              }
              else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
              }
          }
          if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  if (input.charCodeAt(peg$currPos) === 45) {
                      s2 = peg$c86;
                      peg$currPos++;
                  }
                  else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) {
                          peg$fail(peg$c87);
                      }
                  }
                  if (s2 === peg$FAILED) {
                      s2 = peg$currPos;
                      s3 = peg$currPos;
                      peg$silentFails++;
                      s4 = peg$parsewhiteSpace();
                      if (s4 === peg$FAILED) {
                          s4 = peg$parsepatternSyntax();
                      }
                      peg$silentFails--;
                      if (s4 === peg$FAILED) {
                          s3 = undefined;
                      }
                      else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                      }
                      if (s3 !== peg$FAILED) {
                          if (input.length > peg$currPos) {
                              s4 = input.charAt(peg$currPos);
                              peg$currPos++;
                          }
                          else {
                              s4 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                  peg$fail(peg$c30);
                              }
                          }
                          if (s4 !== peg$FAILED) {
                              s3 = [s3, s4];
                              s2 = s3;
                          }
                          else {
                              peg$currPos = s2;
                              s2 = peg$FAILED;
                          }
                      }
                      else {
                          peg$currPos = s2;
                          s2 = peg$FAILED;
                      }
                  }
              }
          }
          else {
              s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
          }
          else {
              s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                  peg$fail(peg$c111);
              }
          }
          return s0;
      }
      var messageCtx = ['root'];
      function isNestedMessageText() {
          return messageCtx.length > 1;
      }
      function isInPluralOption() {
          return messageCtx[messageCtx.length - 1] === 'plural';
      }
      function insertLocation() {
          return options && options.captureLocation ? {
              location: location()
          } : {};
      }
      var ignoreTag = options && options.ignoreTag;
      var shouldParseSkeleton = options && options.shouldParseSkeleton;
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
      }
      else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
              peg$fail(peg$endExpectation());
          }
          throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
              ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
              : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
  }
  var pegParse = peg$parse;

  var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
  /**
   * Whether to convert `#` in plural rule options
   * to `{var, number}`
   * @param el AST Element
   * @param pluralStack current plural stack
   */
  function normalizeHashtagInPlural(els) {
      els.forEach(function (el) {
          // If we're encountering a plural el
          if (!isPluralElement(el) && !isSelectElement(el)) {
              return;
          }
          // Go down the options and search for # in any literal element
          Object.keys(el.options).forEach(function (id) {
              var _a;
              var opt = el.options[id];
              // If we got a match, we have to split this
              // and inject a NumberElement in the middle
              var matchingLiteralElIndex = -1;
              var literalEl = undefined;
              for (var i = 0; i < opt.value.length; i++) {
                  var el_1 = opt.value[i];
                  if (isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
                      matchingLiteralElIndex = i;
                      literalEl = el_1;
                      break;
                  }
              }
              if (literalEl) {
                  var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
                  var newEls = pegParse(newValue);
                  (_a = opt.value).splice.apply(_a, __spreadArrays([matchingLiteralElIndex, 1], newEls));
              }
              normalizeHashtagInPlural(opt.value);
          });
      });
  }

  function parse(input, opts) {
      opts = __assign({ normalizeHashtagInPlural: true, shouldParseSkeleton: true }, (opts || {}));
      var els = pegParse(input, opts);
      if (opts.normalizeHashtagInPlural) {
          normalizeHashtagInPlural(els);
      }
      return els;
  }

  //
  // Main
  //

  function memoize (fn, options) {
    var cache = options && options.cache
      ? options.cache
      : cacheDefault;

    var serializer = options && options.serializer
      ? options.serializer
      : serializerDefault;

    var strategy = options && options.strategy
      ? options.strategy
      : strategyDefault;

    return strategy(fn, {
      cache: cache,
      serializer: serializer
    })
  }

  //
  // Strategy
  //

  function isPrimitive (value) {
    return value == null || typeof value === 'number' || typeof value === 'boolean' // || typeof value === "string" 'unsafe' primitive for our needs
  }

  function monadic (fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);

    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
      computedValue = fn.call(this, arg);
      cache.set(cacheKey, computedValue);
    }

    return computedValue
  }

  function variadic (fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);

    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
      computedValue = fn.apply(this, args);
      cache.set(cacheKey, computedValue);
    }

    return computedValue
  }

  function assemble (fn, context, strategy, cache, serialize) {
    return strategy.bind(
      context,
      fn,
      cache,
      serialize
    )
  }

  function strategyDefault (fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;

    return assemble(
      fn,
      this,
      strategy,
      options.cache.create(),
      options.serializer
    )
  }

  function strategyVariadic (fn, options) {
    var strategy = variadic;

    return assemble(
      fn,
      this,
      strategy,
      options.cache.create(),
      options.serializer
    )
  }

  function strategyMonadic (fn, options) {
    var strategy = monadic;

    return assemble(
      fn,
      this,
      strategy,
      options.cache.create(),
      options.serializer
    )
  }

  //
  // Serializer
  //

  function serializerDefault () {
    return JSON.stringify(arguments)
  }

  //
  // Cache
  //

  function ObjectWithoutPrototypeCache () {
    this.cache = Object.create(null);
  }

  ObjectWithoutPrototypeCache.prototype.has = function (key) {
    return (key in this.cache)
  };

  ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key]
  };

  ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
  };

  var cacheDefault = {
    create: function create () {
      return new ObjectWithoutPrototypeCache()
    }
  };

  //
  // API
  //

  var src = memoize;
  var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic
  };
  src.strategies = strategies;

  var memoize$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), src, {
    'default': src,
    __moduleExports: src,
    strategies: strategies
  }));

  var ErrorCode;
  (function (ErrorCode) {
      // When we have a placeholder but no value to format
      ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
      // When value supplied is invalid
      ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
      // When we need specific Intl API but it's not available
      ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
  })(ErrorCode || (ErrorCode = {}));
  var FormatError = /** @class */ (function (_super) {
      __extends(FormatError, _super);
      function FormatError(msg, code, originalMessage) {
          var _this = _super.call(this, msg) || this;
          _this.code = code;
          _this.originalMessage = originalMessage;
          return _this;
      }
      FormatError.prototype.toString = function () {
          return "[formatjs Error: " + this.code + "] " + this.message;
      };
      return FormatError;
  }(Error));
  var InvalidValueError = /** @class */ (function (_super) {
      __extends(InvalidValueError, _super);
      function InvalidValueError(variableId, value, options, originalMessage) {
          return _super.call(this, "Invalid values for \"" + variableId + "\": \"" + value + "\". Options are \"" + Object.keys(options).join('", "') + "\"", "INVALID_VALUE" /* INVALID_VALUE */, originalMessage) || this;
      }
      return InvalidValueError;
  }(FormatError));
  var InvalidValueTypeError = /** @class */ (function (_super) {
      __extends(InvalidValueTypeError, _super);
      function InvalidValueTypeError(value, type, originalMessage) {
          return _super.call(this, "Value for \"" + value + "\" must be of type " + type, "INVALID_VALUE" /* INVALID_VALUE */, originalMessage) || this;
      }
      return InvalidValueTypeError;
  }(FormatError));
  var MissingValueError = /** @class */ (function (_super) {
      __extends(MissingValueError, _super);
      function MissingValueError(variableId, originalMessage) {
          return _super.call(this, "The intl string context variable \"" + variableId + "\" was not provided to the string \"" + originalMessage + "\"", "MISSING_VALUE" /* MISSING_VALUE */, originalMessage) || this;
      }
      return MissingValueError;
  }(FormatError));

  var PART_TYPE;
  (function (PART_TYPE) {
      PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
      PART_TYPE[PART_TYPE["object"] = 1] = "object";
  })(PART_TYPE || (PART_TYPE = {}));
  function mergeLiteral(parts) {
      if (parts.length < 2) {
          return parts;
      }
      return parts.reduce(function (all, part) {
          var lastPart = all[all.length - 1];
          if (!lastPart ||
              lastPart.type !== 0 /* literal */ ||
              part.type !== 0 /* literal */) {
              all.push(part);
          }
          else {
              lastPart.value += part.value;
          }
          return all;
      }, []);
  }
  function isFormatXMLElementFn(el) {
      return typeof el === 'function';
  }
  // TODO(skeleton): add skeleton support
  function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
  // For debugging
  originalMessage) {
      // Hot path for straight simple msg translations
      if (els.length === 1 && isLiteralElement(els[0])) {
          return [
              {
                  type: 0 /* literal */,
                  value: els[0].value,
              },
          ];
      }
      var result = [];
      for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
          var el = els_1[_i];
          // Exit early for string parts.
          if (isLiteralElement(el)) {
              result.push({
                  type: 0 /* literal */,
                  value: el.value,
              });
              continue;
          }
          // TODO: should this part be literal type?
          // Replace `#` in plural rules with the actual numeric value.
          if (isPoundElement(el)) {
              if (typeof currentPluralValue === 'number') {
                  result.push({
                      type: 0 /* literal */,
                      value: formatters.getNumberFormat(locales).format(currentPluralValue),
                  });
              }
              continue;
          }
          var varName = el.value;
          // Enforce that all required values are provided by the caller.
          if (!(values && varName in values)) {
              throw new MissingValueError(varName, originalMessage);
          }
          var value = values[varName];
          if (isArgumentElement(el)) {
              if (!value || typeof value === 'string' || typeof value === 'number') {
                  value =
                      typeof value === 'string' || typeof value === 'number'
                          ? String(value)
                          : '';
              }
              result.push({
                  type: typeof value === 'string' ? 0 /* literal */ : 1 /* object */,
                  value: value,
              });
              continue;
          }
          // Recursively format plural and select parts' option — which can be a
          // nested pattern structure. The choosing of the option to use is
          // abstracted-by and delegated-to the part helper object.
          if (isDateElement(el)) {
              var style = typeof el.style === 'string'
                  ? formats.date[el.style]
                  : isDateTimeSkeleton(el.style)
                      ? el.style.parsedOptions
                      : undefined;
              result.push({
                  type: 0 /* literal */,
                  value: formatters
                      .getDateTimeFormat(locales, style)
                      .format(value),
              });
              continue;
          }
          if (isTimeElement(el)) {
              var style = typeof el.style === 'string'
                  ? formats.time[el.style]
                  : isDateTimeSkeleton(el.style)
                      ? el.style.parsedOptions
                      : undefined;
              result.push({
                  type: 0 /* literal */,
                  value: formatters
                      .getDateTimeFormat(locales, style)
                      .format(value),
              });
              continue;
          }
          if (isNumberElement(el)) {
              var style = typeof el.style === 'string'
                  ? formats.number[el.style]
                  : isNumberSkeleton(el.style)
                      ? el.style.parsedOptions
                      : undefined;
              result.push({
                  type: 0 /* literal */,
                  value: formatters
                      .getNumberFormat(locales, style)
                      .format(value),
              });
              continue;
          }
          if (isTagElement(el)) {
              var children = el.children, value_1 = el.value;
              var formatFn = values[value_1];
              if (!isFormatXMLElementFn(formatFn)) {
                  throw new InvalidValueTypeError(value_1, 'function', originalMessage);
              }
              var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
              var chunks = formatFn(parts.map(function (p) { return p.value; }));
              if (!Array.isArray(chunks)) {
                  chunks = [chunks];
              }
              result.push.apply(result, chunks.map(function (c) {
                  return {
                      type: typeof c === 'string' ? 0 /* literal */ : 1 /* object */,
                      value: c,
                  };
              }));
          }
          if (isSelectElement(el)) {
              var opt = el.options[value] || el.options.other;
              if (!opt) {
                  throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
              }
              result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
              continue;
          }
          if (isPluralElement(el)) {
              var opt = el.options["=" + value];
              if (!opt) {
                  if (!Intl.PluralRules) {
                      throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", "MISSING_INTL_API" /* MISSING_INTL_API */, originalMessage);
                  }
                  var rule = formatters
                      .getPluralRules(locales, { type: el.pluralType })
                      .select(value - (el.offset || 0));
                  opt = el.options[rule] || el.options.other;
              }
              if (!opt) {
                  throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
              }
              result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
              continue;
          }
      }
      return mergeLiteral(result);
  }

  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */
  // -- MessageFormat --------------------------------------------------------
  function mergeConfig(c1, c2) {
      if (!c2) {
          return c1;
      }
      return __assign(__assign(__assign({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
          all[k] = __assign(__assign({}, c1[k]), (c2[k] || {}));
          return all;
      }, {}));
  }
  function mergeConfigs(defaultConfig, configs) {
      if (!configs) {
          return defaultConfig;
      }
      return Object.keys(defaultConfig).reduce(function (all, k) {
          all[k] = mergeConfig(defaultConfig[k], configs[k]);
          return all;
      }, __assign({}, defaultConfig));
  }
  function createFastMemoizeCache(store) {
      return {
          create: function () {
              return {
                  has: function (key) {
                      return key in store;
                  },
                  get: function (key) {
                      return store[key];
                  },
                  set: function (key, value) {
                      store[key] = value;
                  },
              };
          },
      };
  }
  // @ts-ignore this is to deal with rollup's default import shenanigans
  var _memoizeIntl = src || memoize$1;
  var memoizeIntl = _memoizeIntl;
  function createDefaultFormatters(cache) {
      if (cache === void 0) { cache = {
          number: {},
          dateTime: {},
          pluralRules: {},
      }; }
      return {
          getNumberFormat: memoizeIntl(function () {
              var _a;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArrays([void 0], args)))();
          }, {
              cache: createFastMemoizeCache(cache.number),
              strategy: memoizeIntl.strategies.variadic,
          }),
          getDateTimeFormat: memoizeIntl(function () {
              var _a;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArrays([void 0], args)))();
          }, {
              cache: createFastMemoizeCache(cache.dateTime),
              strategy: memoizeIntl.strategies.variadic,
          }),
          getPluralRules: memoizeIntl(function () {
              var _a;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArrays([void 0], args)))();
          }, {
              cache: createFastMemoizeCache(cache.pluralRules),
              strategy: memoizeIntl.strategies.variadic,
          }),
      };
  }
  var IntlMessageFormat = /** @class */ (function () {
      function IntlMessageFormat(message, locales, overrideFormats, opts) {
          var _this = this;
          if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
          this.formatterCache = {
              number: {},
              dateTime: {},
              pluralRules: {},
          };
          this.format = function (values) {
              var parts = _this.formatToParts(values);
              // Hot path for straight simple msg translations
              if (parts.length === 1) {
                  return parts[0].value;
              }
              var result = parts.reduce(function (all, part) {
                  if (!all.length ||
                      part.type !== 0 /* literal */ ||
                      typeof all[all.length - 1] !== 'string') {
                      all.push(part.value);
                  }
                  else {
                      all[all.length - 1] += part.value;
                  }
                  return all;
              }, []);
              if (result.length <= 1) {
                  return result[0] || '';
              }
              return result;
          };
          this.formatToParts = function (values) {
              return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
          };
          this.resolvedOptions = function () { return ({
              locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
          }); };
          this.getAst = function () { return _this.ast; };
          if (typeof message === 'string') {
              this.message = message;
              if (!IntlMessageFormat.__parse) {
                  throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
              }
              // Parse string messages into an AST.
              this.ast = IntlMessageFormat.__parse(message, {
                  normalizeHashtagInPlural: false,
                  ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
              });
          }
          else {
              this.ast = message;
          }
          if (!Array.isArray(this.ast)) {
              throw new TypeError('A message must be provided as a String or AST.');
          }
          // Creates a new object with the specified `formats` merged with the default
          // formats.
          this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
          // Defined first because it's used to build the format pattern.
          this.locales = locales;
          this.formatters =
              (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
      }
      Object.defineProperty(IntlMessageFormat, "defaultLocale", {
          get: function () {
              if (!IntlMessageFormat.memoizedDefaultLocale) {
                  IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
              }
              return IntlMessageFormat.memoizedDefaultLocale;
          },
          enumerable: false,
          configurable: true
      });
      IntlMessageFormat.memoizedDefaultLocale = null;
      IntlMessageFormat.__parse = parse;
      // Default format options used as the prototype of the `formats` provided to the
      // constructor. These are used when constructing the internal Intl.NumberFormat
      // and Intl.DateTimeFormat instances.
      IntlMessageFormat.formats = {
          number: {
              currency: {
                  style: 'currency',
              },
              percent: {
                  style: 'percent',
              },
          },
          date: {
              short: {
                  month: 'numeric',
                  day: 'numeric',
                  year: '2-digit',
              },
              medium: {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
              },
              long: {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
              },
              full: {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
              },
          },
          time: {
              short: {
                  hour: 'numeric',
                  minute: 'numeric',
              },
              medium: {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
              },
              long: {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  timeZoneName: 'short',
              },
              full: {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  timeZoneName: 'short',
              },
          },
      };
      return IntlMessageFormat;
  }());

  let i;const a=writable({});function l(e){return e in i}function s(e,n){if(!l(e))return null;const t=function(e){return i[e]||null}(e);if(n in t)return t[n];return dlv_umd(t,n)}function u(e){return null==e||l(e)?e:u(D(e))}function c(e,...n){a.update((o=>(o[e]=cjs.all([o[e]||{},...n]),o)));}const m=derived([a],(([e])=>Object.keys(e)));a.subscribe((e=>i=e));const f={};function d(e){return f[e]}function w(e){return I(e).reverse().some((e=>{var n;return null===(n=d(e))||void 0===n?void 0:n.size}))}function g(e,n){return Promise.all(n.map((n=>(function(e,n){f[e].delete(n),0===f[e].size&&delete f[e];}(e,n),n().then((e=>e.default||e)))))).then((n=>c(e,...n)))}const h={};function p(e){if(!w(e))return e in h?h[e]:void 0;const n=function(e){return I(e).reverse().map((e=>{const n=d(e);return [e,n?[...n]:[]]})).filter((([,e])=>e.length>0))}(e);return h[e]=Promise.all(n.map((([e,n])=>g(e,n)))).then((()=>{if(w(e))return p(e);delete h[e];})),h[e]}/*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */function y(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]]);}return t}const v={fallbackLocale:null,initialLocale:null,loadingDelay:200,formats:{number:{scientific:{notation:"scientific"},engineering:{notation:"engineering"},compactLong:{notation:"compact",compactDisplay:"long"},compactShort:{notation:"compact",compactDisplay:"short"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},warnOnMissingMessages:!0};function O(){return v}function j(e){const{formats:n}=e,t=y(e,["formats"]),o=e.initialLocale||e.fallbackLocale;return Object.assign(v,t,{initialLocale:o}),n&&("number"in n&&Object.assign(v.formats.number,n.number),"date"in n&&Object.assign(v.formats.date,n.date),"time"in n&&Object.assign(v.formats.time,n.time)),x.set(o)}const L=writable(!1);let k;const x=writable(null);function $(e,n){return 0===n.indexOf(e)&&e!==n}function E(e,n){return e===n||$(e,n)||$(n,e)}function D(e){const n=e.lastIndexOf("-");if(n>0)return e.slice(0,n);const{fallbackLocale:t}=O();return t&&!E(e,t)?t:null}function I(e){const n=e.split("-").map(((e,n,t)=>t.slice(0,n+1).join("-"))),{fallbackLocale:t}=O();return t&&!E(e,t)?n.concat(I(t)):n}function M(){return k}x.subscribe((e=>{k=e,"undefined"!=typeof window&&document.documentElement.setAttribute("lang",e);}));const N=x.set;x.set=e=>{if(u(e)&&w(e)){const{loadingDelay:n}=O();let t;return "undefined"!=typeof window&&null!=M()&&n?t=window.setTimeout((()=>L.set(!0)),n):L.set(!0),p(e).then((()=>{N(e);})).finally((()=>{clearTimeout(t),L.set(!1);}))}return N(e)},x.update=e=>N(e(k));const F=()=>"undefined"==typeof window?null:window.navigator.language||window.navigator.languages[0],C={},G=(e,n)=>{if(null==n)return;const t=s(n,e);return t||G(e,D(n))},J=(e,n)=>{if(n in C&&e in C[n])return C[n][e];const t=G(e,n);return t?((e,n,t)=>t?(n in C||(C[n]={}),e in C[n]||(C[n][e]=t),t):t)(e,n,t):void 0},U=e=>{const n=Object.create(null);return t=>{const o=JSON.stringify(t);return o in n?n[o]:n[o]=e(t)}},_=(e,n)=>{const{formats:t}=O();if(e in t&&n in t[e])return t[e][n];throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`)},q=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format numbers');return t&&(o=_("number",t)),new Intl.NumberFormat(n,o)})),B=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format dates');return t?o=_("date",t):0===Object.keys(o).length&&(o=_("date","short")),new Intl.DateTimeFormat(n,o)})),H=U((e=>{var{locale:n,format:t}=e,o=y(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format time values');return t?o=_("time",t):0===Object.keys(o).length&&(o=_("time","short")),new Intl.DateTimeFormat(n,o)})),K=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return q(Object.assign({locale:n},t))},Q=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return B(Object.assign({locale:n},t))},R=(e={})=>{var{locale:n=M()}=e,t=y(e,["locale"]);return H(Object.assign({locale:n},t))},V=U(((e,n=M())=>new IntlMessageFormat(e,n,O().formats))),W=(e,n={})=>{"object"==typeof e&&(e=(n=e).id);const{values:t,locale:o=M(),default:r}=n;if(null==o)throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");let i=J(e,o);if(i){if("string"!=typeof i)return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof i}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`),i}else O().warnOnMissingMessages&&console.warn(`[svelte-i18n] The message "${e}" was not found in "${I(o).join('", "')}".${w(M())?"\n\nNote: there are at least one loader still registered to this locale that wasn't executed.":""}`),i=r||e;return t?V(i,o).format(t):i},X=(e,n)=>R(n).format(e),Y=(e,n)=>Q(n).format(e),ee=(e,n)=>K(n).format(e),ne=(e,n=M())=>J(e,n),te=derived([x,a],(()=>W)),oe=derived([x],(()=>X)),re=derived([x],(()=>Y)),ie=derived([x],(()=>ee)),ae=derived([x,a],(()=>ne));

  var intro = "趣味でフロントエンド開発をしている日本人です。卒業研究のテーマにしたブロックチェーンと暗号技術の勉強も進めつつ、ハッカソンがきっかけで教育系のサービスをチームで開発しています。\n現在はCode for Japanでイベント運営のインターンとして働いていますが、2021年の夏から1年間留学に行くのでその間は仕事も中断して関わっているプロジェクトも一度抜ける予定です。\n連絡はメール(kota@yatagai.com)もしくはTwitterでお願いします。開発した作品に関する連絡はGitHubでIssueを立ててください。";
  var skills = {
  	jsts: "最もよく使う言語です。言語仕様で戸惑うことが少ないため、フロントエンドだけでなくアルゴリズムの実装などにも使うことがあります。",
  	svelte: "Nuxtなど他のフレームワークほどエコシステムが発達していないため、比較的小規模なWebサイトで使います。ちなみにこのWebサイトもSvelteで作っています。",
  	nuxt: "Svelteと比べてライブラリの数も多いので、チーム開発でしばらく使っていました。現在はあまり触っていませんが基本的なNuxtの仕様は理解しています。",
  	firebase: "僕はKVSが好きなのでFirestoreをよく使っています。現在関わっているプロジェクトはAWSのCognitoを使っていますが、個人プロジェクトではFirebase Authenticationを使うことが多いです。",
  	ras: "趣味でラズパイ4でNASサーバーを立てています。VPNで繋がないとあまりNASの良さが出ないので近いうちにVPNサーバーも立てる予定です。",
  	go: "分散してる自分のブログRSSをまとめたり、画像の拡張子変換CLIを作ったりしています。まだググりながらなんとか書いている状況ですが、いつか静的解析とかもGoでやってみたいですね。"
  };
  var works = {
  	sha256: "ご存知SHA-256のTypeScriptでのフルスクラッチ実装です。論文読んでる時は楽しかったんですが最後の全角文字の対応にめちゃくちゃハマりました。",
  	huffman: "ハフマン符号のTypeScript実装。別に全角文字対応もできたんですが、なんかSHA256の時で嫌いになったので8bitsで区切るようにしています。",
  	slouch: "ローカルファイルをネイティブアプリみたいに編集でき、かつサービス上にも保存しておけるMarkdownエディタです。個人的に重宝しています。",
  	pics: "僕が撮った写真を上げているギャラリーです。ほとんどLAに行った時の写真で一眼ですらないんですが、見ていると懐かしくて癒されます。",
  	summarizy: "論文を読みながらMD形式でメモを取れるアプリです。いちいちPDFプレビューアプリとエディタを画面分割するのが面倒だったので作りました。WYSIWYGエディタなのでMDのプレビューはありません。",
  	percom: "組み合わせと順列の列挙&総数カウントができるライブラリです。去年に再帰を理解したくて作り、最近リファクタリングしてリーダブルなコードになりました。",
  	neornd: "Cryptoモジュールを使ってランダムな数値や文字列、ランダムソートをするライブラリです。Math.random()も結構進化しているようなので段々使い道は減っていくかもしれませんが、またそれも良し。",
  	iso: "ISOの国コードから日本語名に変換するライブラリです。英語版からForkしてTypeScriptへの移行やツールの変更を加えて公開しています。",
  	rss: "Goで書いた僕のブログフィードをまとめたフィードです。Zenn、note、個人ブログのRSSを取ってきて、新しいフィードに統合してRSSとJSON形式で配信しています。",
  	kec: "Goで書いた、画像拡張子変換のCLIです。jpg/png/gifに対応していて、画像圧縮も一応作ったのですが、結構画像が荒くなったのでここのアルゴリズムも良いものを探していきたいです。",
  	"sgg-feed": "Goで書いたSGGメンバーのRSSをまとめたフィードです。RSSとJSON形式で配信しており、自分の勉強と速度向上のためにgoroutineを使おうと四苦八苦しています。"
  };
  var extra = {
  	license: "基本情報技術者",
  	award: "EPSON HackTrek 2021 優勝🥇",
  	favorite: "自転車, Rebuild.fm, Classic US HipHop",
  	email: "kota@yatagai.com"
  };
  var ja = {
  	intro: intro,
  	skills: skills,
  	works: works,
  	extra: extra
  };

  var intro$1 = "Hi there 👋\nI’m a front-end developer && high school student living in Japan. I have interest in algorithms which are not related to competitive programming such as hash, compression, cryptographic algorithm. Also, I’m studying SSI (Self-sovereign Identity) for my senior thesis in high school. Since I am going to study abroad this year, my whole ongoing projects are going to stop from the second half of this year to the first half of the next year.\n I’m currently working as an event management intern at Code for Japan. If you have any question about me/my project, feel free to send an email or contact me on Twitter!\n";
  var skills$1 = {
  	jsts: "My main language. I usually use them for front-end, and also when learning algorithm in order not to make it hard to learn because of language.",
  	svelte: "Since the ecosystem is not expanded as much as Nuxt.js, I usually use Svelte for small website such as this portfolio website.",
  	nuxt: "I used Nuxt.js for the first time at the hackathon held this spring, means I’m not familiar with this framwork yet, but I like to use this as the main framework.",
  	firebase: "Firestore is totally suitable for me since I like KVS. Currently I’m working on the project which use AWS cognito, but I usually use Firebase Authentication for authentication backend.",
  	ras: "As a hobby, I’ve set up my own NAS server on Rasberry Pi 4. I’m going to set up VPN server to connect to NAS outside my house.",
  	go: "I made integrated RSS feed of my blogs (note, Zenn, blog.kota-yata.com), and image file extension converter in Go. I’m using Go just as a hobby, but I hope I can use this language as my main one someday."
  };
  var works$1 = {
  	sha256: "SHA-256 implementation from scratch in TypeScript. It was really hard to deal with full-width symbols like Japanese and emoji.",
  	huffman: "Huffman Coding Algorithm written in TypeScript. You can encode/decode ASCII string.",
  	slouch: "Markdown editor which enables to edit local document from browser and overwrite them. You can also save the documents in cloud database.",
  	pics: "My personal photo gallery. You can search tags from the upper right search box. Though not every photo was taken by DSLR, my good old days are in this place :)",
  	summarizy: "Markdown memo app which make it easy to summarize while reading the paper or tech document. Memo area on left side is WYSIWYG editor so that there’s no preview.",
  	percom: "Permutation & Combination library. Since it’s little backbreaking to implement permutation or combination, I recommend to use this library instead.",
  	neornd: "A library which do boring random stuff instead of you. Random sorting, generating random number/string are availble on this library. Don’t use Math.random() for essential contents.",
  	iso: "ISO’s country code to country name in Japanese converter. Original repository is meikidd/iso-639-1.",
  	rss: "Integrated Feed of my blogs written in Golang. Including Zenn, note, blog.kota-yata.com. Available formats are RSS and JSON.",
  	kec: "Image format extension converter written in Golang. I'm looking for the suitable algorithm for resizing.",
  	"sgg-feed": "RSS/JSON feed of SGG members. Currently, I'm trying to use goroutine to make this faster."
  };
  var extra$1 = {
  	license: "Fundamental Engineering Japan",
  	award: "EPSON HackTrek 2021 First Prize 🥇",
  	favorite: "Cycling, Rebuild.fm, Classic US HipHop",
  	email: "kota@yatagai.com"
  };
  var en = {
  	intro: intro$1,
  	skills: skills$1,
  	works: works$1,
  	extra: extra$1
  };

  c('ja', ja);
  c('en', en);

  j({
    fallbackLocale: 'en',
    initialLocale: F(),
  });

  /* src/components/sections/AboutMe.svelte generated by Svelte v3.31.0 */

  function get_each_context(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[2] = list[i];
  	return child_ctx;
  }

  // (11:4) {#each paragraph as words}
  function create_each_block(ctx) {
  	let span;
  	let t_value = /*words*/ ctx[2] + "";
  	let t;
  	let br0;
  	let br1;

  	return {
  		c() {
  			span = element("span");
  			t = text(t_value);
  			br0 = element("br");
  			br1 = element("br");
  		},
  		m(target, anchor) {
  			insert(target, span, anchor);
  			append(span, t);
  			insert(target, br0, anchor);
  			insert(target, br1, anchor);
  		},
  		p: noop,
  		d(detaching) {
  			if (detaching) detach(span);
  			if (detaching) detach(br0);
  			if (detaching) detach(br1);
  		}
  	};
  }

  function create_fragment(ctx) {
  	let div2;
  	let div0;
  	let t1;
  	let div1;
  	let each_value = /*paragraph*/ ctx[0];
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  	}

  	return {
  		c() {
  			div2 = element("div");
  			div0 = element("div");
  			div0.textContent = "About Me";
  			t1 = space();
  			div1 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr(div0, "class", "container-title");
  			attr(div1, "class", "container-desc aboutme-desc svelte-1fx1d5c");
  			attr(div2, "class", "container container-large container-info aboutme svelte-1fx1d5c");
  		},
  		m(target, anchor) {
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div2, t1);
  			append(div2, div1);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div1, null);
  			}
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*paragraph*/ 1) {
  				each_value = /*paragraph*/ ctx[0];
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div1, null);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;
  			}
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div2);
  			destroy_each(each_blocks, detaching);
  		}
  	};
  }

  function instance($$self, $$props, $$invalidate) {
  	let $_;
  	component_subscribe($$self, te, $$value => $$invalidate(1, $_ = $$value));
  	const paragraph = $_("intro").split("\n");
  	return [paragraph];
  }

  class AboutMe extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance, create_fragment, safe_not_equal, {});
  	}
  }

  /* src/components/sections/Header.svelte generated by Svelte v3.31.0 */

  function create_fragment$1(ctx) {
  	let header;

  	return {
  		c() {
  			header = element("header");

  			header.innerHTML = `<div class="name svelte-1qoaq6q">KOTA YATAGAI</div> 
  <div class="quote svelte-1qoaq6q">Getting ready to study abroad ! 🚀</div>`;

  			attr(header, "class", "svelte-1qoaq6q");
  		},
  		m(target, anchor) {
  			insert(target, header, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(header);
  		}
  	};
  }

  class Header extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment$1, safe_not_equal, {});
  	}
  }

  /* src/components/PresentationCard.svelte generated by Svelte v3.31.0 */

  function create_fragment$2(ctx) {
  	let div;
  	let iframe;
  	let iframe_src_value;

  	return {
  		c() {
  			div = element("div");
  			iframe = element("iframe");
  			attr(iframe, "defer", "");
  			attr(iframe, "width", "400px");
  			attr(iframe, "height", "225px");
  			if (iframe.src !== (iframe_src_value = "https://www.youtube.com/embed/" + /*id*/ ctx[0])) attr(iframe, "src", iframe_src_value);
  			attr(iframe, "title", "YouTube video player");
  			attr(iframe, "frameborder", "0");
  			attr(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
  			iframe.allowFullscreen = true;
  			attr(iframe, "class", "svelte-4lqy9o");
  			attr(div, "class", "presentation svelte-4lqy9o");
  		},
  		m(target, anchor) {
  			insert(target, div, anchor);
  			append(div, iframe);
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*id*/ 1 && iframe.src !== (iframe_src_value = "https://www.youtube.com/embed/" + /*id*/ ctx[0])) {
  				attr(iframe, "src", iframe_src_value);
  			}
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div);
  		}
  	};
  }

  function instance$1($$self, $$props, $$invalidate) {
  	let { id } = $$props;

  	$$self.$$set = $$props => {
  		if ("id" in $$props) $$invalidate(0, id = $$props.id);
  	};

  	return [id];
  }

  class PresentationCard extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$1, create_fragment$2, safe_not_equal, { id: 0 });
  	}
  }

  /* src/components/WorkCard.svelte generated by Svelte v3.31.0 */

  function create_fragment$3(ctx) {
  	let div2;
  	let div0;
  	let a;
  	let img;
  	let t0;
  	let div1;
  	let t1;

  	return {
  		c() {
  			div2 = element("div");
  			div0 = element("div");
  			a = element("a");
  			img = element("img");
  			t0 = space();
  			div1 = element("div");
  			t1 = text(/*desc*/ ctx[3]);
  			attr(img, "alt", /*alt*/ ctx[1]);
  			attr(img, "class", "lazyload svelte-1y0jt9k");
  			attr(img, "data-src", /*src*/ ctx[2]);
  			attr(a, "href", /*url*/ ctx[0]);
  			attr(a, "class", "svelte-1y0jt9k");
  			attr(div0, "class", "workcard-image svelte-1y0jt9k");
  			attr(div1, "class", "workcard-desc svelte-1y0jt9k");
  			attr(div2, "class", "workcard svelte-1y0jt9k");
  		},
  		m(target, anchor) {
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div0, a);
  			append(a, img);
  			append(div2, t0);
  			append(div2, div1);
  			append(div1, t1);
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*alt*/ 2) {
  				attr(img, "alt", /*alt*/ ctx[1]);
  			}

  			if (dirty & /*src*/ 4) {
  				attr(img, "data-src", /*src*/ ctx[2]);
  			}

  			if (dirty & /*url*/ 1) {
  				attr(a, "href", /*url*/ ctx[0]);
  			}

  			if (dirty & /*desc*/ 8) set_data(t1, /*desc*/ ctx[3]);
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div2);
  		}
  	};
  }

  function instance$2($$self, $$props, $$invalidate) {
  	let { url } = $$props;
  	let { alt } = $$props;
  	let { src } = $$props;
  	let { desc } = $$props;

  	$$self.$$set = $$props => {
  		if ("url" in $$props) $$invalidate(0, url = $$props.url);
  		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
  		if ("src" in $$props) $$invalidate(2, src = $$props.src);
  		if ("desc" in $$props) $$invalidate(3, desc = $$props.desc);
  	};

  	return [url, alt, src, desc];
  }

  class WorkCard extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$2, create_fragment$3, safe_not_equal, { url: 0, alt: 1, src: 2, desc: 3 });
  	}
  }

  /* src/components/sections/MyWorks.svelte generated by Svelte v3.31.0 */

  function get_each_context$1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[3] = list[i];
  	return child_ctx;
  }

  function get_each_context_1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[6] = list[i].title;
  	child_ctx[7] = list[i].contents;
  	return child_ctx;
  }

  function get_each_context_2(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[10] = list[i].url;
  	child_ctx[11] = list[i].alt;
  	child_ctx[12] = list[i].src;
  	child_ctx[13] = list[i].desc;
  	return child_ctx;
  }

  // (104:6) {#each contents as { url, alt, src, desc }}
  function create_each_block_2(ctx) {
  	let workcard;
  	let current;

  	workcard = new WorkCard({
  			props: {
  				url: /*url*/ ctx[10],
  				alt: /*alt*/ ctx[11],
  				src: /*src*/ ctx[12],
  				desc: /*desc*/ ctx[13]
  			}
  		});

  	return {
  		c() {
  			create_component(workcard.$$.fragment);
  		},
  		m(target, anchor) {
  			mount_component(workcard, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i(local) {
  			if (current) return;
  			transition_in(workcard.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(workcard.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			destroy_component(workcard, detaching);
  		}
  	};
  }

  // (100:0) {#each works as { title, contents }}
  function create_each_block_1(ctx) {
  	let div2;
  	let div0;
  	let t0_value = /*title*/ ctx[6] + "";
  	let t0;
  	let t1;
  	let div1;
  	let current;
  	let each_value_2 = /*contents*/ ctx[7];
  	let each_blocks = [];

  	for (let i = 0; i < each_value_2.length; i += 1) {
  		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  	}

  	const out = i => transition_out(each_blocks[i], 1, 1, () => {
  		each_blocks[i] = null;
  	});

  	return {
  		c() {
  			div2 = element("div");
  			div0 = element("div");
  			t0 = text(t0_value);
  			t1 = space();
  			div1 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr(div0, "class", "container-title");
  			attr(div1, "class", "myworks-works svelte-17ra7zp");
  			attr(div2, "class", "container container-large container-info myworks svelte-17ra7zp");
  		},
  		m(target, anchor) {
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div0, t0);
  			append(div2, t1);
  			append(div2, div1);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div1, null);
  			}

  			current = true;
  		},
  		p(ctx, dirty) {
  			if (dirty & /*works*/ 1) {
  				each_value_2 = /*contents*/ ctx[7];
  				let i;

  				for (i = 0; i < each_value_2.length; i += 1) {
  					const child_ctx = get_each_context_2(ctx, each_value_2, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  						transition_in(each_blocks[i], 1);
  					} else {
  						each_blocks[i] = create_each_block_2(child_ctx);
  						each_blocks[i].c();
  						transition_in(each_blocks[i], 1);
  						each_blocks[i].m(div1, null);
  					}
  				}

  				group_outros();

  				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
  					out(i);
  				}

  				check_outros();
  			}
  		},
  		i(local) {
  			if (current) return;

  			for (let i = 0; i < each_value_2.length; i += 1) {
  				transition_in(each_blocks[i]);
  			}

  			current = true;
  		},
  		o(local) {
  			each_blocks = each_blocks.filter(Boolean);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				transition_out(each_blocks[i]);
  			}

  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(div2);
  			destroy_each(each_blocks, detaching);
  		}
  	};
  }

  // (113:4) {#each presentations as id}
  function create_each_block$1(ctx) {
  	let presentationcard;
  	let current;
  	presentationcard = new PresentationCard({ props: { id: /*id*/ ctx[3] } });

  	return {
  		c() {
  			create_component(presentationcard.$$.fragment);
  		},
  		m(target, anchor) {
  			mount_component(presentationcard, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i(local) {
  			if (current) return;
  			transition_in(presentationcard.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(presentationcard.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			destroy_component(presentationcard, detaching);
  		}
  	};
  }

  function create_fragment$4(ctx) {
  	let t0;
  	let div2;
  	let div0;
  	let t2;
  	let div1;
  	let current;
  	let each_value_1 = /*works*/ ctx[0];
  	let each_blocks_1 = [];

  	for (let i = 0; i < each_value_1.length; i += 1) {
  		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  	}

  	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
  		each_blocks_1[i] = null;
  	});

  	let each_value = /*presentations*/ ctx[1];
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  	}

  	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
  		each_blocks[i] = null;
  	});

  	return {
  		c() {
  			for (let i = 0; i < each_blocks_1.length; i += 1) {
  				each_blocks_1[i].c();
  			}

  			t0 = space();
  			div2 = element("div");
  			div0 = element("div");
  			div0.textContent = "Presentations";
  			t2 = space();
  			div1 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr(div0, "class", "container-title");
  			attr(div1, "class", "myworks-works svelte-17ra7zp");
  			attr(div2, "class", "container container-large container-info myworks svelte-17ra7zp");
  		},
  		m(target, anchor) {
  			for (let i = 0; i < each_blocks_1.length; i += 1) {
  				each_blocks_1[i].m(target, anchor);
  			}

  			insert(target, t0, anchor);
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div2, t2);
  			append(div2, div1);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div1, null);
  			}

  			current = true;
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*works*/ 1) {
  				each_value_1 = /*works*/ ctx[0];
  				let i;

  				for (i = 0; i < each_value_1.length; i += 1) {
  					const child_ctx = get_each_context_1(ctx, each_value_1, i);

  					if (each_blocks_1[i]) {
  						each_blocks_1[i].p(child_ctx, dirty);
  						transition_in(each_blocks_1[i], 1);
  					} else {
  						each_blocks_1[i] = create_each_block_1(child_ctx);
  						each_blocks_1[i].c();
  						transition_in(each_blocks_1[i], 1);
  						each_blocks_1[i].m(t0.parentNode, t0);
  					}
  				}

  				group_outros();

  				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
  					out(i);
  				}

  				check_outros();
  			}

  			if (dirty & /*presentations*/ 2) {
  				each_value = /*presentations*/ ctx[1];
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context$1(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  						transition_in(each_blocks[i], 1);
  					} else {
  						each_blocks[i] = create_each_block$1(child_ctx);
  						each_blocks[i].c();
  						transition_in(each_blocks[i], 1);
  						each_blocks[i].m(div1, null);
  					}
  				}

  				group_outros();

  				for (i = each_value.length; i < each_blocks.length; i += 1) {
  					out_1(i);
  				}

  				check_outros();
  			}
  		},
  		i(local) {
  			if (current) return;

  			for (let i = 0; i < each_value_1.length; i += 1) {
  				transition_in(each_blocks_1[i]);
  			}

  			for (let i = 0; i < each_value.length; i += 1) {
  				transition_in(each_blocks[i]);
  			}

  			current = true;
  		},
  		o(local) {
  			each_blocks_1 = each_blocks_1.filter(Boolean);

  			for (let i = 0; i < each_blocks_1.length; i += 1) {
  				transition_out(each_blocks_1[i]);
  			}

  			each_blocks = each_blocks.filter(Boolean);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				transition_out(each_blocks[i]);
  			}

  			current = false;
  		},
  		d(detaching) {
  			destroy_each(each_blocks_1, detaching);
  			if (detaching) detach(t0);
  			if (detaching) detach(div2);
  			destroy_each(each_blocks, detaching);
  		}
  	};
  }

  function instance$3($$self, $$props, $$invalidate) {
  	let $_;
  	component_subscribe($$self, te, $$value => $$invalidate(2, $_ = $$value));

  	const works = [
  		{
  			title: "Algorithms",
  			contents: [
  				{
  					url: "https://github.com/kota-yata/organic-sha256",
  					alt: "Organic-SHA256",
  					src: "../img/sha256.webp",
  					desc: $_("works.sha256")
  				},
  				{
  					url: "https://github.com/kota-yata/deno-huffman",
  					alt: "Deno-Huffman",
  					src: "../img/huffman.webp",
  					desc: $_("works.huffman")
  				}
  			]
  		},
  		{
  			title: "Web apps",
  			contents: [
  				{
  					url: "https://slouch.dev",
  					alt: "SLOUCH",
  					src: "../img/slouch.webp",
  					desc: $_("works.slouch")
  				},
  				{
  					url: "https://pics.kota-yata.com",
  					alt: "Photo Gallery",
  					src: "../img/pics.webp",
  					desc: $_("works.pics")
  				},
  				{
  					url: "https://editor.kota-yata.com",
  					alt: "Editor",
  					src: "../img/ogp.webp",
  					desc: $_("works.summarizy")
  				}
  			]
  		},
  		{
  			title: "npm packages",
  			contents: [
  				{
  					url: "https://www.npmjs.com/package/percom",
  					alt: "Percom",
  					src: "../img/percom.webp",
  					desc: $_("works.percom")
  				},
  				{
  					url: "https://www.npmjs.com/package/neornd",
  					alt: "neornd",
  					src: "../img/neornd.webp",
  					desc: $_("works.neornd")
  				},
  				{
  					url: "https://www.npmjs.com/package/iso-639-1-jp",
  					alt: "ISO-639-1-JP",
  					src: "../img/iso.webp",
  					desc: $_("works.iso")
  				}
  			]
  		},
  		{
  			title: "Others",
  			contents: [
  				{
  					url: "https://sgg-feed.appspot.com/",
  					alt: "sgg feed",
  					src: "../img/sgg-feed.webp",
  					desc: $_("works.sgg-feed")
  				},
  				{
  					url: "https://github.com/kota-yata/integrated-rss",
  					alt: "integrated rss",
  					src: "../img/rss.webp",
  					desc: $_("works.rss")
  				},
  				{
  					url: "https://github.com/kota-yata/kec",
  					alt: "kec",
  					src: "../img/kec.webp",
  					desc: $_("works.kec")
  				}
  			]
  		}
  	];

  	const presentations = ["BcaPCnWZuvY", "-JLTdhtyDGc", "UYZw55-2kGQ", "1WOFGFyNl4k"];
  	return [works, presentations];
  }

  class MyWorks extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$3, create_fragment$4, safe_not_equal, {});
  	}
  }

  /* src/components/sections/Profile.svelte generated by Svelte v3.31.0 */

  function create_fragment$5(ctx) {
  	let div6;

  	return {
  		c() {
  			div6 = element("div");

  			div6.innerHTML = `<div class="profile-face svelte-oiuo2z" oncontextmenu="return false;"><img alt="my face" class="lazyload svelte-oiuo2z" data-src="../img/me.webp"/></div> 
  <div class="profile-social svelte-oiuo2z"><div class="svelte-oiuo2z"><a href="https://zenn.dev/kota_yata" class="svelte-oiuo2z"><img alt="zenn" src="../svg/zenn.svg" class="svelte-oiuo2z"/></a></div> 
    <div class="svelte-oiuo2z"><a href="https://scrapbox.io/chicken" class="svelte-oiuo2z"><img alt="telegram" src="../svg/scrapbox.svg" class="svelte-oiuo2z"/></a></div> 
    <div class="svelte-oiuo2z"><a href="https://github.com/kota-yata" class="svelte-oiuo2z"><img alt="github" src="../svg/github.svg" class="svelte-oiuo2z"/></a></div> 
    <div class="svelte-oiuo2z"><a href="https://www.twitter.com/kota_yata" class="svelte-oiuo2z"><img alt="twitter" src="../svg/twitter.svg" class="svelte-oiuo2z"/></a></div></div>`;

  			attr(div6, "class", "profile svelte-oiuo2z");
  		},
  		m(target, anchor) {
  			insert(target, div6, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div6);
  		}
  	};
  }

  class Profile extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment$5, safe_not_equal, {});
  	}
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
  });

  /* src/components/sections/Posts.svelte generated by Svelte v3.31.0 */

  function get_each_context$2(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[1] = list[i].title;
  	child_ctx[2] = list[i].date;
  	child_ctx[3] = list[i].url;
  	child_ctx[4] = list[i].service;
  	return child_ctx;
  }

  // (35:4) {#each articles as { title, date, url, service }}
  function create_each_block$2(ctx) {
  	let div4;
  	let div0;
  	let t0_value = /*title*/ ctx[1] + "";
  	let t0;
  	let t1;
  	let div3;
  	let div1;
  	let t2_value = /*date*/ ctx[2] + "";
  	let t2;
  	let t3;
  	let div2;
  	let span;
  	let t4_value = /*service*/ ctx[4] + "";
  	let t4;
  	let t5;
  	let a;
  	let img;
  	let img_src_value;
  	let a_href_value;
  	let t6;

  	return {
  		c() {
  			div4 = element("div");
  			div0 = element("div");
  			t0 = text(t0_value);
  			t1 = space();
  			div3 = element("div");
  			div1 = element("div");
  			t2 = text(t2_value);
  			t3 = space();
  			div2 = element("div");
  			span = element("span");
  			t4 = text(t4_value);
  			t5 = space();
  			a = element("a");
  			img = element("img");
  			t6 = space();
  			attr(div0, "class", "posts-contents-article-title svelte-1aib8m5");
  			attr(div1, "class", "posts-contents-article-info-date svelte-1aib8m5");
  			attr(span, "class", "posts-contents-article-info-link-service svelte-1aib8m5");
  			attr(img, "alt", "external link");
  			if (img.src !== (img_src_value = "../svg/link.svg")) attr(img, "src", img_src_value);
  			attr(img, "class", "svelte-1aib8m5");
  			attr(a, "href", a_href_value = /*url*/ ctx[3]);
  			attr(a, "class", "svelte-1aib8m5");
  			attr(div2, "class", "posts-contents-article-info-link svelte-1aib8m5");
  			attr(div3, "class", "posts-contents-article-info svelte-1aib8m5");
  			attr(div4, "class", "posts-contents-article svelte-1aib8m5");
  		},
  		m(target, anchor) {
  			insert(target, div4, anchor);
  			append(div4, div0);
  			append(div0, t0);
  			append(div4, t1);
  			append(div4, div3);
  			append(div3, div1);
  			append(div1, t2);
  			append(div3, t3);
  			append(div3, div2);
  			append(div2, span);
  			append(span, t4);
  			append(div2, t5);
  			append(div2, a);
  			append(a, img);
  			append(div4, t6);
  		},
  		p(ctx, dirty) {
  			if (dirty & /*articles*/ 1 && t0_value !== (t0_value = /*title*/ ctx[1] + "")) set_data(t0, t0_value);
  			if (dirty & /*articles*/ 1 && t2_value !== (t2_value = /*date*/ ctx[2] + "")) set_data(t2, t2_value);
  			if (dirty & /*articles*/ 1 && t4_value !== (t4_value = /*service*/ ctx[4] + "")) set_data(t4, t4_value);

  			if (dirty & /*articles*/ 1 && a_href_value !== (a_href_value = /*url*/ ctx[3])) {
  				attr(a, "href", a_href_value);
  			}
  		},
  		d(detaching) {
  			if (detaching) detach(div4);
  		}
  	};
  }

  function create_fragment$6(ctx) {
  	let div2;
  	let div0;
  	let t1;
  	let div1;
  	let each_value = /*articles*/ ctx[0];
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  	}

  	return {
  		c() {
  			div2 = element("div");
  			div0 = element("div");
  			div0.textContent = "Recent Posts";
  			t1 = space();
  			div1 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr(div0, "class", "posts-title svelte-1aib8m5");
  			attr(div1, "class", "posts-contents container svelte-1aib8m5");
  			attr(div2, "class", "posts svelte-1aib8m5");
  		},
  		m(target, anchor) {
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div2, t1);
  			append(div2, div1);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div1, null);
  			}
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*articles*/ 1) {
  				each_value = /*articles*/ ctx[0];
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context$2(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block$2(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div1, null);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;
  			}
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div2);
  			destroy_each(each_blocks, detaching);
  		}
  	};
  }

  function instance$4($$self, $$props, $$invalidate) {
  	let articles = [];

  	onMount(async () => {
  		const response = await fetch("https://feed.kota-yata.com/api", {
  			method: "GET",
  			mode: "cors",
  			headers: { "Content-Type": "application/json" }
  		});

  		const result = await response.json();
  		const items = result.items;

  		for (let i = 0; i < 6; i++) {
  			const date = dayjs_min(items[i].date_published).format("YYYY-MM-DD");
  			const url = items[i].id;
  			let service = "blog.kota-yata.com";
  			if (url.includes("zenn.dev")) service = "zenn.dev";
  			if (url.includes("note.com")) service = "note.com";

  			const info = {
  				title: items[i].title,
  				date,
  				url,
  				service
  			};

  			$$invalidate(0, articles = articles.concat(info));
  		}
  	});

  	return [articles];
  }

  class Posts extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$4, create_fragment$6, safe_not_equal, {});
  	}
  }

  /* src/components/sections/Footer.svelte generated by Svelte v3.31.0 */

  function create_fragment$7(ctx) {
  	let footer;

  	return {
  		c() {
  			footer = element("footer");
  			footer.innerHTML = `<h3 class="svelte-1il0r3">© 2021 Kota Yatagai</h3>`;
  			attr(footer, "class", "svelte-1il0r3");
  		},
  		m(target, anchor) {
  			insert(target, footer, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(footer);
  		}
  	};
  }

  class Footer extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment$7, safe_not_equal, {});
  	}
  }

  /* src/components/sections/Extra.svelte generated by Svelte v3.31.0 */

  function get_each_context$3(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[2] = list[i].name;
  	child_ctx[3] = list[i].value;
  	return child_ctx;
  }

  // (28:4) {#each extras as { name, value }}
  function create_each_block$3(ctx) {
  	let div;
  	let span;
  	let t0_value = /*name*/ ctx[2] + "";
  	let t0;
  	let t1;
  	let t2_value = /*value*/ ctx[3] + "";
  	let t2;

  	return {
  		c() {
  			div = element("div");
  			span = element("span");
  			t0 = text(t0_value);
  			t1 = text(" : ");
  			t2 = text(t2_value);
  			attr(span, "class", "extra-data-title svelte-1q7g4kk");
  		},
  		m(target, anchor) {
  			insert(target, div, anchor);
  			append(div, span);
  			append(span, t0);
  			append(span, t1);
  			append(div, t2);
  		},
  		p: noop,
  		d(detaching) {
  			if (detaching) detach(div);
  		}
  	};
  }

  function create_fragment$8(ctx) {
  	let div2;
  	let div0;
  	let t1;
  	let div1;
  	let each_value = /*extras*/ ctx[0];
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  	}

  	return {
  		c() {
  			div2 = element("div");
  			div0 = element("div");
  			div0.textContent = "Extra info";
  			t1 = space();
  			div1 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr(div0, "class", "container-title extra-title");
  			attr(div1, "class", "extra-data svelte-1q7g4kk");
  			attr(div2, "class", "container container-info extra svelte-1q7g4kk");
  		},
  		m(target, anchor) {
  			insert(target, div2, anchor);
  			append(div2, div0);
  			append(div2, t1);
  			append(div2, div1);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div1, null);
  			}
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*extras*/ 1) {
  				each_value = /*extras*/ ctx[0];
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context$3(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block$3(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div1, null);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;
  			}
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(div2);
  			destroy_each(each_blocks, detaching);
  		}
  	};
  }

  function instance$5($$self, $$props, $$invalidate) {
  	let $_;
  	component_subscribe($$self, te, $$value => $$invalidate(1, $_ = $$value));

  	const extras = [
  		{
  			name: "License",
  			value: $_("extra.license")
  		},
  		{ name: "Award", value: $_("extra.award") },
  		{
  			name: "Favorite",
  			value: $_("extra.favorite")
  		},
  		{ name: "Email", value: $_("extra.email") }
  	];

  	return [extras];
  }

  class Extra extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$5, create_fragment$8, safe_not_equal, {});
  	}
  }

  /* src/routes/Home.svelte generated by Svelte v3.31.0 */

  function create_fragment$9(ctx) {
  	let main;
  	let header;
  	let t0;
  	let div2;
  	let div0;
  	let profile;
  	let t1;
  	let posts;
  	let t2;
  	let div1;
  	let aboutme;
  	let t3;
  	let myworks;
  	let t4;
  	let extra;
  	let t5;
  	let footer;
  	let current;
  	header = new Header({});
  	profile = new Profile({});
  	posts = new Posts({});
  	aboutme = new AboutMe({});
  	myworks = new MyWorks({});
  	extra = new Extra({});
  	footer = new Footer({});

  	return {
  		c() {
  			main = element("main");
  			create_component(header.$$.fragment);
  			t0 = space();
  			div2 = element("div");
  			div0 = element("div");
  			create_component(profile.$$.fragment);
  			t1 = space();
  			create_component(posts.$$.fragment);
  			t2 = space();
  			div1 = element("div");
  			create_component(aboutme.$$.fragment);
  			t3 = space();
  			create_component(myworks.$$.fragment);
  			t4 = space();
  			create_component(extra.$$.fragment);
  			t5 = space();
  			create_component(footer.$$.fragment);
  			attr(div0, "class", "contents-right svelte-1xj9ekj");
  			attr(div1, "class", "contents-left svelte-1xj9ekj");
  			attr(div2, "class", "contents svelte-1xj9ekj");
  			attr(main, "class", "svelte-1xj9ekj");
  		},
  		m(target, anchor) {
  			insert(target, main, anchor);
  			mount_component(header, main, null);
  			append(main, t0);
  			append(main, div2);
  			append(div2, div0);
  			mount_component(profile, div0, null);
  			append(div0, t1);
  			mount_component(posts, div0, null);
  			append(div2, t2);
  			append(div2, div1);
  			mount_component(aboutme, div1, null);
  			append(div1, t3);
  			mount_component(myworks, div1, null);
  			append(div1, t4);
  			mount_component(extra, div1, null);
  			append(div1, t5);
  			mount_component(footer, div1, null);
  			current = true;
  		},
  		p: noop,
  		i(local) {
  			if (current) return;
  			transition_in(header.$$.fragment, local);
  			transition_in(profile.$$.fragment, local);
  			transition_in(posts.$$.fragment, local);
  			transition_in(aboutme.$$.fragment, local);
  			transition_in(myworks.$$.fragment, local);
  			transition_in(extra.$$.fragment, local);
  			transition_in(footer.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(header.$$.fragment, local);
  			transition_out(profile.$$.fragment, local);
  			transition_out(posts.$$.fragment, local);
  			transition_out(aboutme.$$.fragment, local);
  			transition_out(myworks.$$.fragment, local);
  			transition_out(extra.$$.fragment, local);
  			transition_out(footer.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(main);
  			destroy_component(header);
  			destroy_component(profile);
  			destroy_component(posts);
  			destroy_component(aboutme);
  			destroy_component(myworks);
  			destroy_component(extra);
  			destroy_component(footer);
  		}
  	};
  }

  function instance$6($$self) {
  	onMount(() => {
  		lazyload();
  	});

  	return [];
  }

  class Home extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$6, create_fragment$9, safe_not_equal, {});
  	}
  }

  /* src/App.svelte generated by Svelte v3.31.0 */

  function create_fragment$a(ctx) {
  	let home;
  	let current;
  	home = new Home({});

  	return {
  		c() {
  			create_component(home.$$.fragment);
  		},
  		m(target, anchor) {
  			mount_component(home, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i(local) {
  			if (current) return;
  			transition_in(home.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(home.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			destroy_component(home, detaching);
  		}
  	};
  }

  class App extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment$a, safe_not_equal, {});
  	}
  }

  const app = new App({
    target: document.body,
    props: {}
  });

  return app;

}());
//# sourceMappingURL=bundle.js.map
