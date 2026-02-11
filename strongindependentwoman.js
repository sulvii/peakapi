import { am as ae, g as q, p as Q, N as de, O as ve, y as fe, r as B, k as S, s as z, B as me, V as ee, q as se, d as he, t as X, i as l, c as E, m as ge, w as le, a as D, n as ie, S as G, Q as ye, j as we, P as be, u as ke, b as Ve, h as W, x as xe, _ as Se, a5 as Te, a3 as C, a4 as c, a7 as s, ab as A, G as I, a8 as b, Y as L, a9 as j, F as O, aa as F, ad as Ce, ae as Ie } from "./riot.js";
import { t as Be } from "./CNq9briRrLt5xLvAtvFX.js";
import { c as Pe } from "./C0RFwly0g9YGRi_LsGYO.js";
import { r as _e, n as Y, u as J, s as Ee, m as re, t as Re, v as Ye, H as Ae, w as Oe } from "./B2Wl1dTYGDNWyRGCsTrn.js";
import { u as Le } from "./B6MUTcUUCN-Eukh31AcA.js";
import { V as H } from "./BjaXBrjW-M0JIWVUYET-.js";
import { g as He, h as $e, i as Xe, f as We, j as Me, k as N, b as je, c as Fe, e as te, l as pe } from "./d5D1FXlSeC8asNVkxmD4.js";
import { M as ze, V as De } from "./Bc1aSaYtJb6uhl_ZMLj3.js";
import { V as Ge, a as Ne } from "./CdB1bfKKkQwcYkJ7t6X4.js";
import { g as Ue, V as oe, a as qe, b as Qe, c as Je } from "./DfMOWNa6f-o_Zt33EQzg.js";
import { V as ne } from "./DYIZhBaAJYDa1Oh_QUuL.js";
import { V as $ } from "./T1QXXEer9cPforTn-Tf-.js";
import { V as p } from "./B9ki-r0r136Br9kOFDql.js";
import { u as Ke, V as Ze, c as et } from "./BNxj9PIqs9K8O8AAK8N5.js";
import "./B-RDfs-KWPjalmto38el.js";
import "./Bw4fBqy2Ca1g-sVL-KEC.js";
import "./DpusLTrXWq9ABhRNTmxC.js";
const tt = e => {
  const {
    touchstartX: n,
    touchendX: o,
    touchstartY: t,
    touchendY: i
  } = e;
  const r = 0.5;
  const a = 16;
  e.offsetX = o - n;
  e.offsetY = i - t;
  if (Math.abs(e.offsetY) < r * Math.abs(e.offsetX)) {
    if (e.left && o < n - a) {
      e.left(e);
    }
    if (e.right && o > n + a) {
      e.right(e);
    }
  }
  if (Math.abs(e.offsetX) < r * Math.abs(e.offsetY)) {
    if (e.up && i < t - a) {
      e.up(e);
    }
    if (e.down && i > t + a) {
      e.down(e);
    }
  }
};
function ot(e, n) {
  const o = e.changedTouches[0];
  n.touchstartX = o.clientX;
  n.touchstartY = o.clientY;
  n.start?.({
    originalEvent: e,
    ...n
  });
}
function nt(e, n) {
  const o = e.changedTouches[0];
  n.touchendX = o.clientX;
  n.touchendY = o.clientY;
  n.end?.({
    originalEvent: e,
    ...n
  });
  tt(n);
}
function at(e, n) {
  const o = e.changedTouches[0];
  n.touchmoveX = o.clientX;
  n.touchmoveY = o.clientY;
  n.move?.({
    originalEvent: e,
    ...n
  });
}
function st(e = {}) {
  const n = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: o => ot(o, n),
    touchend: o => nt(o, n),
    touchmove: o => at(o, n)
  };
}
function lt(e, n) {
  const o = n.value;
  const t = o?.parent ? e.parentElement : e;
  const i = o?.options ?? {
    passive: true
  };
  const r = n.instance?.$.uid;
  if (!t || r === undefined) {
    return;
  }
  const a = st(n.value);
  t._touchHandlers = t._touchHandlers ?? Object.create(null);
  t._touchHandlers[r] = a;
  ae(a).forEach(d => {
    t.addEventListener(d, a[d], i);
  });
}
function it(e, n) {
  const o = n.value?.parent ? e.parentElement : e;
  const t = n.instance?.$.uid;
  if (!o?._touchHandlers || t === undefined) {
    return;
  }
  const i = o._touchHandlers[t];
  ae(i).forEach(r => {
    o.removeEventListener(r, i[r]);
  });
  delete o._touchHandlers[t];
}
const U = {
  mounted: lt,
  unmounted: it
};
const ue = Symbol.for("vuetify:v-window");
const ce = Symbol.for("vuetify:v-window-group");
const rt = Q({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: e => typeof e == "boolean" || e === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: undefined
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...re(),
  ...Ee(),
  ...ge()
}, "VWindow");
const ut = q()({
  name: "VWindow",
  directives: {
    vTouch: U
  },
  props: rt(),
  emits: {
    "update:modelValue": e => true
  },
  setup(e, n) {
    let {
      slots: o
    } = n;
    const {
      themeClasses: t
    } = de(e);
    const {
      isRtl: i
    } = ve();
    const {
      t: r
    } = fe();
    const a = _e(e, ce);
    const d = B();
    const g = S(() => i.value ? !e.reverse : e.reverse);
    const v = z(false);
    const T = S(() => {
      if (e.crossfade) {
        return "v-window-crossfade-transition";
      }
      const w = e.direction === "vertical" ? "y" : "x";
      const f = (g.value ? !v.value : v.value) ? "-reverse" : "";
      return `v-window-${w}${f}-transition`;
    });
    const _ = z(0);
    const P = B(undefined);
    const k = S(() => a.items.value.findIndex(w => a.selected.value.includes(w.id)));
    me(k, (w, V) => {
      let f;
      const R = {
        left: 0,
        top: 0
      };
      if (ee && V >= 0) {
        f = Ue(d.value);
        R.left = f?.scrollLeft;
        R.top = f?.scrollTop;
      }
      const K = a.items.value.length;
      const Z = K - 1;
      if (K <= 2) {
        v.value = w < V;
      } else if (w === Z && V === 0) {
        v.value = false;
      } else if (w === 0 && V === Z) {
        v.value = true;
      } else {
        v.value = w < V;
      }
      se(() => {
        if (!ee || !f) {
          return;
        }
        if (f.scrollTop !== R.top) {
          f.scrollTo({
            ...R,
            behavior: "instant"
          });
        }
        requestAnimationFrame(() => {
          if (!f) {
            return;
          }
          if (f.scrollTop !== R.top) {
            f.scrollTo({
              ...R,
              behavior: "instant"
            });
          }
        });
      });
    }, {
      flush: "sync"
    });
    he(ue, {
      transition: T,
      isReversed: v,
      transitionCount: _,
      transitionHeight: P,
      rootRef: d
    });
    const y = X(() => e.continuous || k.value !== 0);
    const m = X(() => e.continuous || k.value !== a.items.value.length - 1);
    function h() {
      if (y.value) {
        a.prev();
      }
    }
    function u() {
      if (m.value) {
        a.next();
      }
    }
    const x = S(() => {
      const w = [];
      const V = {
        icon: i.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${g.value ? "right" : "left"}`,
        onClick: a.prev,
        "aria-label": r("$vuetify.carousel.prev")
      };
      w.push(y.value ? o.prev ? o.prev({
        props: V
      }) : l(Y, V, null) : E("div", null, null));
      const f = {
        icon: i.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${g.value ? "left" : "right"}`,
        onClick: a.next,
        "aria-label": r("$vuetify.carousel.next")
      };
      w.push(m.value ? o.next ? o.next({
        props: f
      }) : l(Y, f, null) : E("div", null, null));
      return w;
    });
    const M = S(() => e.touch === false ? e.touch : {
      ...{
        left: () => {
          if (g.value) {
            h();
          } else {
            u();
          }
        },
        right: () => {
          if (g.value) {
            u();
          } else {
            h();
          }
        },
        start: V => {
          let {
            originalEvent: f
          } = V;
          f.stopPropagation();
        }
      },
      ...(e.touch === true ? {} : e.touch)
    });
    J(() => le(l(e.tag, {
      ref: d,
      class: D(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover",
        "v-window--vertical-arrows": !!e.verticalArrows,
        "v-window--crossfade": !!e.crossfade
      }, t.value, e.class]),
      style: ie([e.style, {
        "--v-window-transition-duration": ye() ? null : G(e.transitionDuration, "ms")
      }])
    }, {
      default: () => [E("div", {
        class: "v-window__container",
        style: {
          height: P.value
        }
      }, [o.default?.({
        group: a
      }), e.showArrows !== false && E("div", {
        class: D(["v-window__controls", {
          "v-window__controls--left": e.verticalArrows === "left" || e.verticalArrows === true
        }, {
          "v-window__controls--right": e.verticalArrows === "right"
        }])
      }, [x.value])]), o.additional?.({
        group: a
      })]
    }), [[U, M.value]]));
    return {
      group: a
    };
  }
});
const ct = Q({
  reverseTransition: {
    type: [Boolean, String],
    default: undefined
  },
  transition: {
    type: [Boolean, String],
    default: undefined
  },
  ...re(),
  ...Ye(),
  ...$e()
}, "VWindowItem");
const dt = q()({
  name: "VWindowItem",
  directives: {
    vTouch: U
  },
  props: ct(),
  emits: {
    "group:selected": e => true
  },
  setup(e, n) {
    let {
      slots: o
    } = n;
    const t = we(ue);
    const i = Re(e, ce);
    const {
      isBooted: r
    } = Ke();
    if (!t || !i) {
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    }
    const a = z(false);
    const d = S(() => r.value && (t.isReversed.value ? e.reverseTransition !== false : e.transition !== false));
    function g() {
      if (!!a.value && !!t) {
        a.value = false;
        if (t.transitionCount.value > 0) {
          t.transitionCount.value -= 1;
          if (t.transitionCount.value === 0) {
            t.transitionHeight.value = undefined;
          }
        }
      }
    }
    function v() {
      if (!a.value && !!t) {
        a.value = true;
        if (t.transitionCount.value === 0) {
          t.transitionHeight.value = G(t.rootRef.value?.clientHeight);
        }
        t.transitionCount.value += 1;
      }
    }
    function T() {
      g();
    }
    function _(y) {
      if (a.value) {
        se(() => {
          if (!!d.value && !!a.value && !!t) {
            t.transitionHeight.value = G(y.clientHeight);
          }
        });
      }
    }
    const P = S(() => {
      const y = t.isReversed.value ? e.reverseTransition : e.transition;
      if (d.value) {
        return {
          name: typeof y != "string" ? t.transition.value : y,
          onBeforeEnter: v,
          onAfterEnter: g,
          onEnterCancelled: T,
          onBeforeLeave: v,
          onAfterLeave: g,
          onLeaveCancelled: T,
          onEnter: _
        };
      } else {
        return false;
      }
    });
    const {
      hasContent: k
    } = He(e, i.isSelected);
    J(() => l(ze, {
      transition: P.value,
      disabled: !r.value
    }, {
      default: () => [le(E("div", {
        class: D(["v-window-item", i.selectedClass.value, e.class]),
        style: ie(e.style)
      }, [k.value && o.default?.()]), [[be, i.isSelected.value]])]
    }));
    return {
      groupItem: i
    };
  }
});
const vt = Q({
  id: String,
  interactive: Boolean,
  text: String,
  ...xe(Me({
    closeOnBack: false,
    location: "end",
    locationStrategy: "connected",
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: "auto",
    scrim: false,
    scrollStrategy: "reposition",
    transition: null
  }), ["absolute", "retainFocus", "captureFocus", "disableInitialFocus"])
}, "VTooltip");
const ft = q()({
  name: "VTooltip",
  props: vt(),
  emits: {
    "update:modelValue": e => true
  },
  setup(e, n) {
    let {
      slots: o
    } = n;
    const t = ke(e, "modelValue");
    const {
      scopeId: i
    } = Xe();
    const r = Ve();
    const a = X(() => e.id || `v-tooltip-${r}`);
    const d = B();
    const g = S(() => e.location.split(" ").length > 1 ? e.location : e.location + " center");
    const v = S(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center");
    const T = X(() => e.transition ?? (t.value ? "scale-transition" : "fade-transition"));
    const _ = S(() => W({
      "aria-describedby": a.value
    }, e.activatorProps));
    J(() => {
      const P = N.filterProps(e);
      return l(N, W({
        ref: d,
        class: ["v-tooltip", {
          "v-tooltip--interactive": e.interactive
        }, e.class],
        style: e.style,
        id: a.value
      }, P, {
        modelValue: t.value,
        "onUpdate:modelValue": k => t.value = k,
        transition: T.value,
        absolute: true,
        location: g.value,
        origin: v.value,
        role: "tooltip",
        activatorProps: _.value,
        _disableGlobalStack: true
      }, i), {
        activator: o.activator,
        default: function () {
          for (var k = arguments.length, y = new Array(k), m = 0; m < k; m++) {
            y[m] = arguments[m];
          }
          return o.default?.(...y) ?? e.text;
        }
      });
    });
    return We({}, d);
  }
});
const mt = ["src"];
const ht = ["src"];
const gt = ["href"];
const yt = {
  class: "text-xs text-disabled"
};
const wt = {
  key: 3,
  class: "v-img__placeholder",
  style: {
    "z-index": "9999"
  }
};
const Xt = {
  __name: "video",
  props: {
    video: {
      type: Object,
      required: true,
      default: {
        poster: "video.png"
      }
    },
    streams: {
      type: Object,
      default: {
        status: null,
        msg: null,
        token: null,
        data: []
      }
    },
    config: {
      type: Object,
      required: true
    },
    ads: {
      type: Array,
      default: []
    }
  },
  setup(e) {
    const n = "https://cdn.cdn777-rock.online";
    const {
      xs: o
    } = Se();
    const t = Te();
    const i = e;
    const r = B(0);
    const a = B(false);
    const d = B(null);
    const g = B(false);
    const v = B(false);
    const T = B(false);
    function _() {
      Ce.reload({
        only: ["streams"],
        onStart: () => {
          v.value = true;
        },
        onFinish: () => {
          v.value = false;
        }
      });
    }
    const P = m => {
      a.value = true;
      d.value = m;
    };
    function k() {
      Ie.post("/api/stats/view/add", {
        token: i.streams.token,
        id: i.video.hashId,
        data: {
          referrer: document.referrer,
          href: window.location.href,
          count: 1,
          blocked: false,
          ancestorOrigins: null
        }
      }).then(function (m) {
        T.value = true;
      });
    }
    const y = m => {
      a.value = false;
      if (!T.value) {
        k();
      }
    };
    if (i.ads.length && !t().params.nt) {
      i.ads.forEach(m => Le({
        src: m.src,
        ...m.data,
        fetchpriority: false,
        referrerpolicy: false,
        crossorigin: false
      }, {
        trigger: "client"
      }));
    }
    return (m, h) => {
      c();
      return C(O, null, [l(I(Ae), null, {
        default: s(() => [E("title", null, A(e.video.name), 1)]),
        _: 1
      }), l(et, {
        height: "100vh",
        color: "black"
      }, {
        default: s(() => [d.value ? (c(), b(H, {
          key: 0
        }, {
          default: s(() => [l(Y, {
            class: "ma-1",
            "prepend-icon": "mdi-arrow-left",
            position: "absolute",
            style: {
              "z-index": "1"
            },
            onClick: h[0] ||= u => d.value = null
          }, {
            default: s(() => [...(h[5] ||= [L("Back", -1)])]),
            _: 1
          }), l(N, {
            "model-value": a.value,
            class: "align-center justify-center"
          }, {
            default: s(() => [l(Oe, {
              color: "pink",
              indeterminate: "",
              size: "64"
            })]),
            _: 1
          }, 8, ["model-value"]), d.value?.adblock ? (c(), C("iframe", {
            key: 0,
            ref_key: "iframe",
            ref: g,
            onLoad: h[1] ||= u => y(this),
            src: d.value.link,
            frameborder: "0",
            allowfullscreen: "",
            width: "100%",
            height: "100%",
            style: {
              background: "black"
            },
            sandbox: "allow-scripts allow-same-origin allow-forms allow-presentation allow-orientation-lock"
          }, null, 40, mt)) : (c(), C("iframe", {
            key: 1,
            ref_key: "iframe",
            ref: g,
            onLoad: h[2] ||= u => y(this),
            src: d.value.link,
            frameborder: "0",
            allowfullscreen: "",
            width: "100%",
            height: "100%",
            style: {
              background: "black"
            }
          }, null, 40, ht))]),
          _: 1
        })) : (c(), b(De, {
          key: 1,
          src: I(n) + "/" + e.video.poster,
          gradient: "rgba(16, 16, 23, 0.71), #000000",
          height: "100%",
          cover: ""
        }, {
          default: s(() => [l(Ge, {
            color: "rgba(0, 0, 0, 0)"
          }, {
            append: s(() => [e.streams.status === "success" ? (c(), C(O, {
              key: 0
            }, [I(o) ? (c(), b(je, {
              key: 0
            }, {
              activator: s(({
                props: u
              }) => [l(te, W({
                variant: "tonal",
                "append-icon": "mdi-menu-down"
              }, u, {
                rounded: ""
              }), {
                default: s(() => [L(A(e.streams.data[r.value].label), 1)]),
                _: 1
              }, 16)]),
              default: s(() => [l(Fe, null, {
                default: s(() => [(c(true), C(O, null, F(e.streams.data, (u, x) => {
                  c();
                  return b(oe, {
                    key: u,
                    title: u.label,
                    active: x === r.value,
                    onClick: M => r.value = x,
                    link: ""
                  }, null, 8, ["title", "active", "onClick"]);
                }), 128))]),
                _: 1
              })]),
              _: 1
            })) : (c(), b(pe, {
              key: 1,
              modelValue: r.value,
              "onUpdate:modelValue": h[3] ||= u => r.value = u,
              filter: "",
              mandatory: ""
            }, {
              default: s(() => [(c(true), C(O, null, F(e.streams.data, u => {
                c();
                return b(te, {
                  key: u
                }, {
                  default: s(() => [L(A(u.label), 1)]),
                  _: 2
                }, 1024);
              }), 128))]),
              _: 1
            }, 8, ["modelValue"])), !I(t)().params.nt && e.config.access.allow_download ? (c(), C("a", {
              key: 2,
              href: I(t)("files.mirror.show", e.video.hashId),
              class: "text-decoration-none",
              target: "_blank"
            }, [l(ft, {
              text: "Download",
              location: "bottom"
            }, {
              activator: s(({
                props: u
              }) => [l(Y, W(u, {
                size: "small",
                color: "surface-variant",
                variant: "text",
                icon: "mdi-download"
              }), null, 16)]),
              _: 1
            })], 8, gt)) : j("", true)], 64)) : j("", true)]),
            default: s(() => [e.config?.player.name ? (c(), b(Ne, {
              key: 0,
              text: I(t)().params.nt ? "" : e.video?.name
            }, null, 8, ["text"])) : j("", true)]),
            _: 1
          }), I(Pe)() ? (c(), b(H, {
            key: 0
          }, {
            default: s(() => [l(ne), l($, null, {
              default: s(() => [l(p, {
                border: "start",
                title: "Sandbox detected",
                text: "Sandboxed embed is not allowed, please remove it!",
                type: "error",
                variant: "tonal"
              })]),
              _: 1
            })]),
            _: 1
          })) : e.streams.status === "success" ? (c(), b(H, {
            key: 1
          }, {
            default: s(() => [l($, {
              class: "pt-0 pb-0"
            }, {
              default: s(() => [e.streams.data.length > 0 ? (c(), b(ut, {
                key: 0,
                modelValue: r.value,
                "onUpdate:modelValue": h[4] ||= u => r.value = u,
                direction: "vertical"
              }, {
                default: s(() => [(c(true), C(O, null, F(e.streams.data, u => {
                  c();
                  return b(dt, {
                    key: u
                  }, {
                    default: s(() => [l(qe, {
                      items: u.mirrors,
                      height: "80vh"
                    }, {
                      default: s(({
                        item: x
                      }) => [l(oe, {
                        onClick: M => P(x),
                        class: "mb-1 pa-1 pa-sm-2 mb-sm-2",
                        "base-color": "",
                        rounded: "",
                        variant: "tonal",
                        link: ""
                      }, {
                        prepend: s(() => [l(Ze, {
                          color: "black",
                          size: "small",
                          image: I(n) + "/mirror/" + x.driver + ".png"
                        }, null, 8, ["image"])]),
                        append: s(() => [l(Y, {
                          variant: "tonal",
                          size: "small",
                          icon: "mdi-play"
                        })]),
                        default: s(() => [l(Qe, null, {
                          default: s(() => [L(A(x?.symbol ?? x.driver), 1)]),
                          _: 2
                        }, 1024), l(Je, {
                          class: "mt-sm-1"
                        }, {
                          default: s(() => [E("span", yt, A(I(Be)(x.uploaded_at)), 1)]),
                          _: 2
                        }, 1024)]),
                        _: 2
                      }, 1032, ["onClick"])]),
                      _: 1
                    }, 8, ["items"])]),
                    _: 2
                  }, 1024);
                }), 128))]),
                _: 1
              }, 8, ["modelValue"])) : (c(), b(p, {
                key: 1,
                text: "The video is mirroring now",
                type: "error"
              }))]),
              _: 1
            })]),
            _: 1
          })) : e.streams.status === "error" ? (c(), b(H, {
            key: 2
          }, {
            default: s(() => [l(ne), l($, null, {
              default: s(() => [l(p, {
                key: "",
                text: e.streams.msg,
                type: "error"
              }, null, 8, ["text"])]),
              _: 1
            })]),
            _: 1
          })) : (c(), C("div", wt, [l($, {
            class: "d-flex align-center justify-center",
            style: {
              height: "100vh"
            }
          }, {
            default: s(() => [l(Y, {
              color: "grey-lighten-1",
              icon: "mdi-play",
              onClick: _,
              loading: v.value
            }, null, 8, ["loading"])]),
            _: 1
          })]))]),
          _: 1
        }, 8, ["src"]))]),
        _: 1
      })], 64);
    };
  }
};
export { Xt as default };