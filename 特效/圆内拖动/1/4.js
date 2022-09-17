!(function (i, e) {
    var o = {
      name: "LampColour",
      factory: function (o) {
        var r,
          a = o.scopedata || {},
        //   t = i.sdk.utils.getParse(o.data),
          t =   function (e, t) {
            var a = typeof e;
            if ("string" !== a)
              return "object" === a ? e : "number" === a || "boolean" === a ? e : t;
            try {
              return JSON.parse(e);
            } catch (e) {
              return t;
            }
          },
          l = o.id,
          s =
            (t.title,
            i.sdk.utils.getI18nValue(
              {
                title: t.title,
                close: "关闭",
                cancel: "取消",
                commit: "确定",
                colorboard: "色板调色",
                rgbboard: "RGB调色",
                rgbwboard: "RGBW调色",
                currentcolor: "当前颜色",
                specialstring: "名称不能包含特殊字符",
                errortip: "请输入正确的值",
                colorpanchromatic: "设置色值",
                colorr: "设置R值",
                colorg: "设置G值",
                colorb: "设置B值",
                colorw: "设置W值",
                colorwhite: "设置白光",
                whiteTitle: "白光",
                panchromaticholder: "请输入6位色值",
                rgbholder: "请输入0~255范围内的值",
                editorInfo: "彩色",
              },
              UCD.i18n.util.getLang(l)
            )),
          n = i.sdk.utils.getI18nValue(
            { closeDialog: { close: "关闭" } },
            UCD.i18n.util.getLang("custom")
          ),
          d = { red: 0, green: 125, blue: 255 };
        t.iswhite && (d.white = 100);
        var c = [
          { fix: { r: 255, b: 0 }, dy: { name: "g", s: 0, e: 255 } },
          { fix: { g: 255, b: 0 }, dy: { name: "r", s: 255, e: 0 } },
          { fix: { r: 0, g: 255 }, dy: { name: "b", s: 0, e: 255 } },
          { fix: { r: 0, b: 255 }, dy: { name: "g", s: 255, e: 0 } },
          { fix: { g: 0, b: 255 }, dy: { name: "r", s: 0, e: 255 } },
          { fix: { r: 255, g: 0 }, dy: { name: "b", s: 255, e: 0 } },
        ];
        return {
          create: function (i) {
            return e(
              '<div class="' +
                this.name +
                ' LightColourMode LightColour ui-grid-card"></div>'
            );
          },
          data: {
            active: (r = {
              colourMode: void 0 == a.colourMode ? 0 : a.colourMode,
              active: void 0 == a.active ? 1 : a.active,
              color: a.color || d,
              title: i.sdk.utils.escapeHTML(s.title),
              editorInfo: s.editorInfo,
              lightSwitchs: void 0 == a.lightSwitchs ? 1 : Number(a.lightSwitchs),
              onTouch: function (i) {
                e.isFunction(o.ontouching) && o.ontouching.call(null, i);
              },
              onTouchEnd: function (i, r) {
                e.isFunction(o.ontouchend) && o.ontouchend.call(null, i, r);
              },
              onClose: function () {},
            }).active,
            colourMode: r.colourMode,
            color: r.color,
            lightSwitchs: r.lightSwitchs,
          },
          createRules: function () {
            return [{ sid: "colour", type: "int" }];
          },
          params: { Slider: null },
          mounted: function () {
            var i = this.$dom,
              o = this;
            "mode2" == t.uitype
              ? (i.html(o.HTMLSlider.join("")),
                (o.params.colorModel = new UCD.Colors()),
                (o.params.Slider = new UCD.RangeSlider({
                  container: i.find(".card-box"),
                  value: 50,
                  min: 0,
                  max: 100,
                  create: function () {
                    var i,
                      e,
                      a = o.$dom,
                      t = a.find(".ucd-rangeslider-wrap");
                    t.css(
                      "background",
                      "linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0))"
                    ),
                      a
                        .find(".ucd-rangeslider-bar")
                        .css("background", "transparent"),
                      (i = a.width = t.width()),
                      (e = r.value),
                      o.getColorFromPosition(i, e);
                  },
                  change: function (i, a) {
                    var t = i.find(".ucd-rangeslider-handle"),
                      l = o.getColorObject(t, e(this).width(), a);
                    i.hasClass("ucd-rangeslider-drag")
                      ? ((o.params.touching = !0),
                        r.onTouch &&
                          "function" == typeof r.onTouch &&
                          r.onTouch.call(null, l))
                      : ((o.params.touching = !1),
                        r.onTouchEnd &&
                          "function" == typeof r.onTouchEnd &&
                          r.onTouchEnd.call(null, l));
                  },
                })),
                e("body").find(".LampBanner-slide-wrap").hide())
              : (i.html(o.HTML.join("")),
                o.createDialog(),
                o.createColorModal(o.params.$dialog.find(".content")),
                (o.params.sliderR = o.createSlider({
                  container: o.params.$professionHtml.find(".slider-r .middle"),
                  min: 0,
                  max: 255,
                  step: 1,
                  inputwind: 123,
                })),
                (o.params.sliderG = o.createSlider({
                  container: o.params.$professionHtml.find(".slider-g .middle"),
                  min: 0,
                  max: 255,
                  step: 1,
                  inputwind: 123,
                })),
                (o.params.sliderB = o.createSlider({
                  container: o.params.$professionHtml.find(".slider-b .middle"),
                  min: 0,
                  max: 255,
                  step: 1,
                  inputwind: 123,
                })),
                t.iswhite &&
                  ((o.params.sliderW = o.createSlider({
                    container: o.params.$professionHtml.find(".slider-w .middle"),
                    min: 0,
                    max: 255,
                    step: 1,
                    inputwind: 123,
                  })),
                  (o.params.colorpickerSliderW = o.createSlider({
                    container: o.params.$dialog.find(".slider-w .middle"),
                    min: 0,
                    max: 255,
                    step: 1,
                    inputwind: 123,
                  }))),
                o.initEvent(i));
          },
          HTML: [
            '<div class="card-inner">',
            '   <div class="card-inner-img large color"></div>',
            '   <p class="card-status">' + r.title + "</p>",
            '   <p class="card-text">' + r.editorInfo + "</p>",
            "</div>",
          ],
          HTMLSlider: [
            '<div class="card-inner">',
            '   <div class="card-box lily-con"></div>',
            '   <p class="card-status">' + r.title + "</p>",
            '   <p class="card-text">' + r.editorInfo + "</p>",
            "</div>",
          ],
          dialogHtml: [
            '<div class="LampBanner-slide-wrap LightColour-color-con LampBanner-color-con colormode">',
            '   <div class="LampBanner-color picker">',
            '       <div class="color-picker">' + s.rgbboard + "</div>",
            '       <div class="close">' + n.closeDialog.close + "</div>",
            '       <p class="title">' + r.title + "</p>",
            '       <div class="color-current">',
            '           <div class="color-text">' + s.currentcolor + ":</div>",
            '           <div class="color-display">',
            '               <div class="color-display-box"></div>',
            '               <div class="color-value-text">',
            '                   <div class="pound-key">#</div>',
            '                   <div class="color-value" id="panchromatic">7b7b7b</div>',
            "               </div>",
            "           </div>",
            "       </div>",
            '       <div class="content"></div>',
            "   </div>",
            "</div>",
          ],
          professionHtml: [
            '<div class="LampBanner-slide-wrap LightColour-color-con LampBanner-color-con colorprofession">',
            '   <div class="LampBanner-color picker">',
            '       <div class="close">' + s.close + "</div>",
            '       <div class="color-picker">' + s.colorboard + "</div>",
            '       <p class="title">' + r.title + "</p>",
            '       <div class="color-current">',
            '           <div class="color-text">' + s.currentcolor + ":</div>",
            '           <div class="color-display">',
            '               <div class="color-display-box"></div>',
            '               <div class="color-value-text">',
            '                   <div class="pound-key">#</div>',
            '                   <div class="color-value" id="panchromatic">7b7b7b</div>',
            "               </div>",
            "           </div>",
            "       </div>",
            '       <div class="content">',
            '           <div class="slider-r">',
            '               <div class="left">R</div>',
            '               <div class="middle"></div>',
            '               <div class="right" id="red">123</div>',
            "           </div>",
            '           <div class="slider-g">',
            '               <div class="left">G</div>',
            '               <div class="middle"></div>',
            '               <div class="right" id="green">123</div>',
            "           </div>",
            '           <div class="slider-b">',
            '               <div class="left">B</div>',
            '               <div class="middle"></div>',
            '               <div class="right" id="blue">123</div>',
            "           </div>",
            "       </div>",
            "   </div>",
            "</div>",
          ],
          initEvent: function (o) {
            var a = this;
            o.tap(function (e) {
              a.params.$dialog.show(),
                a.params.$dialog.find(".title").length > 0 &&
                  i.sdk.utils.patchFontSize(a.params.$dialog, 2, ".title", 14),
                a.params.$dialog.find(".left").length > 0 &&
                  i.sdk.utils.patchFontSize(a.params.$dialog, 2, ".left", 12);
            }),
              a.params.$dialog.tap(function (o) {
                var t = e(o.target);
                t.hasClass("close")
                  ? (a.params.$dialog.hide(),
                    r.onClose &&
                      e.isFunction(r.onClose) &&
                      r.onClose.call(a.params.colorModel))
                  : t.hasClass("ucd-colorpicker-canvas")
                  ? a.params.$dialog.find(".ucd-colorpicker-handle").show()
                  : t.hasClass("color-picker")
                  ? (a.params.$dialog.hide(),
                    a.params.$professionHtml.show(),
                    a.params.$professionHtml.find(".title").length > 0 &&
                      i.sdk.utils.patchFontSize(
                        a.params.$professionHtml,
                        2,
                        ".title",
                        14
                      ))
                  : t.hasClass("picker") ||
                    t.closest(".picker").length ||
                    a.params.$dialog.hide();
              }),
              a.params.$professionHtml
                .find(".color-value, .right")
                .tap(function (o) {
                  a.params.$professionHtml.hide(),
                    a.params.$professionHtml.find(".title").length > 0 &&
                      i.sdk.utils.patchFontSize(
                        a.params.$professionHtml,
                        2,
                        ".title",
                        14
                      ),
                    a.createInputDialog(e(o.target)),
                    e(".ucd-dialog.ucd-createname.switch-light")
                      .find(".clearContImg")
                      .tap(function () {
                        e(".ucd-dialog.ucd-createname.switch-light")
                          .find(".nameInput")
                          .focus()
                          .val(""),
                          e(this).removeClass("block").addClass("none"),
                          a.params.$inputDialog.$content.removeClass(
                            "reg-string reg-null"
                          );
                      }),
                    e(".ucd-dialog.ucd-createname.switch-light")
                      .find(".nameInput")
                      .focus(function () {
                        e(".ucd-dialog.ucd-createname.switch-light").addClass(
                          "active"
                        );
                      }),
                    e(".ucd-dialog.ucd-createname.switch-light")
                      .find(".nameInput")
                      .blur(function () {
                        e(".ucd-dialog.ucd-createname.switch-light").removeClass(
                          "active"
                        );
                      }),
                    setTimeout(function () {
                      a.params.$inputDialog.element
                        .find(".nameInput")
                        .focus()
                        .val(e(o.target).text());
                    }, 50),
                    a.params.$inputDialog.element
                      .find(".nameInput")
                      .focus()
                      .val(e(o.target).text()),
                    (a.params.clickType = "professionHtml"),
                    e(".ucd-dialog.ucd-createname.switch-light")
                      .find(".nameInput")
                      .tap(function () {
                        e(this).focus().val(),
                          a.params.$inputDialog.$content.removeClass(
                            "reg-string reg-null"
                          );
                      });
                }),
              a.params.$professionHtml.tap(function (i) {
                var o = e(i.target);
                o.hasClass("close")
                  ? a.params.$professionHtml.hide()
                  : o.hasClass("color-picker") &&
                    (a.params.$professionHtml.hide(),
                    a.params.$dialog.show(),
                    a.params.$dialog.find(".ucd-colorpicker-handle").hide());
              }),
              a.params.$professionHtml.on("touchstart", function () {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              }),
              a.params.$dialog.on("touchstart", function () {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              });
          },
          createDialog: function () {
            var i = (this.params.$dialog = e(this.dialogHtml.join(""))
              .attr("data-for", r.id)
              .hide());
            i.appendTo(e("body"));
            var o = (this.params.$professionHtml = e(
                this.professionHtml.join("")
              )),
              a = [
                '<div class="slider-w">',
                '    <div class="left">' + s.whiteTitle + "</div>",
                '    <div class="middle"></div>',
                '    <div class="right" id="colorwhite">' +
                  this.data.color.white +
                  "</div>",
                "</div>",
              ];
            o.appendTo(e("body")),
              t.iswhite &&
                (e(a.join("")).appendTo(i.find(".LampBanner-color")),
                i.find(".color-picker").text(s.rgbwboard),
                e(
                  [
                    '<div class="slider-w">',
                    '    <div class="left">W</div>',
                    '    <div class="middle"></div>',
                    '    <div class="right" id="white">123</div>',
                    "</div>",
                  ].join("")
                ).appendTo(o.find(".content")),
                i.addClass("colorWhite dialogWhite"),
                o.addClass("colorWhite"));
          },
          createColorModal: function (i) {
            var o = e(i),
              a = 6.6666 * parseInt(e("html").css("font-size")),
              l = this;
            this.params.colorModel = new UCD.ColorPicker({
              container: o,
              d: a,
              label: r.editorInfo,
              showTip: !0,
              dots: [
                { color: "101, 101, 255" },
                { color: "255, 252, 150" },
                { color: "" },
                { color: "221, 89, 255" },
                { color: "105, 255, 120" },
              ],
              change: function (i, e) {
                if (-1 == i.target.className.indexOf("ucd-colorpicker-drag")) {
                  if (r.onTouchEnd && "function" == typeof r.onTouchEnd) {
                    var o = { red: e.r, green: e.g, blue: e.b };
                    t.iswhite &&
                      (o.white = (l.data.color && l.data.color.white) || 0),
                      r.onTouchEnd.call(null, o, l.data.active);
                  }
                } else if (r.onTouch && "function" == typeof r.onTouch) {
                  o = { red: e.r, green: e.g, blue: e.b };
                  t.iswhite &&
                    (o.white = (l.data.color && l.data.color.white) || 0),
                    r.onTouch.call(null, o);
                }
              },
            });
          },
          createSlider: function (i) {
            var o = this,
              a = o.params.$professionHtml,
              l = o.params.$dialog;
            return new UCD.RangeSlider({
              container: i.container,
              inside: !0,
              range: { min: i.min, max: i.max },
              step: i.step,
              value: i.inputwind,
              change: function (i, s) {
                i.siblings(".right").text(s);
                var n = Number(a.find(".slider-r .right").text()),
                  d = Number(a.find(".slider-g .right").text()),
                  c = Number(a.find(".slider-b .right").text());
                if (l.find(".ucd-colorpicker-canvas").is(":visible"))
                  var u = Number(l.find(".slider-w .right").text());
                else u = Number(a.find(".slider-w .right").text());
                (panchromatic =
                  "" +
                  o.formatZero(n.toString(16)) +
                  o.formatZero(d.toString(16)) +
                  o.formatZero(c.toString(16))),
                  a.find(".color-value-text .color-value").text(panchromatic),
                  a
                    .find(".color-display .color-display-box")
                    .css({ background: "#" + panchromatic }),
                  l.find(".color-value").text(panchromatic),
                  l
                    .find(".color-display-box")
                    .css({ background: "#" + panchromatic }),
                  Math.min(n, d, c) >= 250
                    ? (a
                        .find(".color-display .color-display-box")
                        .addClass("white"),
                      l.find(".color-display-box").addClass("white"))
                    : (a
                        .find(".color-display .color-display-box")
                        .removeClass("white"),
                      l.find(".color-display-box").removeClass("white"));
                var p = { red: n, green: d, blue: c };
                t.iswhite && (p.white = u),
                  i.hasClass("ucd-rangeslider-drag")
                    ? e.isFunction(r.onTouch) && r.onTouch.call(null, p)
                    : e.isFunction(r.onTouchEnd) && r.onTouchEnd.call(null, p);
              },
            });
          },
          createInputDialog: function (i) {
            e(".ucd-dialog.ucd-createname.switch-light").remove();
            var o = this,
              a = o.params.$professionHtml,
              l = i.attr("id"),
              n =
                (i.text(),
                Number(a.find(".slider-r .right").text()),
                Number(a.find(".slider-g .right").text()),
                Number(a.find(".slider-b .right").text()),
                {
                  panchromatic: s.colorpanchromatic,
                  red: s.colorr,
                  green: s.colorg,
                  blue: s.colorb,
                  white: s.colorw,
                  colorwhite: s.colorwhite,
                }),
              d = "panchromatic" === l,
              c = d ? s.panchromaticholder : s.rgbholder,
              u = [
                '<div class="insulateNew">' + n[l] + "</div>",
                '<div class="input-wrap-box">',
                '   <input class="nameInput" type="text" placeholder="' +
                  c +
                  '" maxlength="' +
                  (d ? 6 : 3) +
                  '"/>',
                '   <div class="clearContImg"></div>',
                "</div>",
                '<span class="tips-warning reg-string">' + s.errortip + "</span>",
                '<span class="tips-warning reg-null">' + s.errortip + "</span>",
              ];
            (o.params.$inputDialog = new UCD.Dialog({
              dialogClassName: "ucd-createname switch-light",
              buttons: [
                {
                  className: "btn-cancel",
                  label: s.cancel,
                  handler: function () {
                    "professionHtml" == o.params.clickType
                      ? o.params.$professionHtml.show()
                      : o.params.$dialog.show();
                    var i = o.params.$inputDialog.element.find(".clearContImg");
                    o.params.$inputDialog.element.find(".nameInput").val(""),
                      o.params.$inputDialog.hide(),
                      i.removeClass("none").addClass("block"),
                      o.params.$inputDialog.element.find(".nameInput").blur();
                  },
                },
                {
                  className: "btn-ok",
                  label: s.commit,
                  handler: function () {
                    var i,
                      s = o.params.$inputDialog.element.find(".clearContImg"),
                      n =
                        "" +
                        o.params.$inputDialog.element.find(".nameInput").val(),
                      c = n,
                      u = {};
                    function p(i) {
                      return (0, o.formatZero)("" + Number(i).toString(16));
                    }
                    (i = d
                      ? !isNaN(Number("0x" + n)) && 6 === n.length
                      : !isNaN(Number(n)) &&
                        Number(n) <= 255 &&
                        Number(n) >= 0 &&
                        n.length &&
                        !n.match(/[^0-9]/)),
                      new RegExp(/"|{|}|\/|\\|&|<|>|'|`/).test(n)
                        ? o.params.$inputDialog.element
                            .find(".ucd-dialog-content")
                            .addClass("reg-string")
                            .removeClass("reg-null")
                        : n.match(/^[ ]+$/) || !i
                        ? o.params.$inputDialog.element
                            .find(".ucd-dialog-content")
                            .addClass("reg-null")
                            .removeClass("reg-string")
                        : (o.params.$inputDialog.hide(),
                          "professionHtml" == o.params.clickType
                            ? o.params.$professionHtml.show()
                            : o.params.$dialog.show(),
                          d
                            ? ((u = {
                                red: parseInt(Number("0x" + n.slice(0, 2)), 10),
                                green: parseInt(Number("0x" + n.slice(2, 4)), 10),
                                blue: parseInt(Number("0x" + n.slice(4)), 10),
                              }),
                              t.iswhite &&
                                (u.white =
                                  (o.data.color && o.data.color.white) || 0))
                            : ((u = {
                                red: Number(a.find(".slider-r .right").text()),
                                green: Number(a.find(".slider-g .right").text()),
                                blue: Number(a.find(".slider-b .right").text()),
                              }),
                              t.iswhite &&
                                (u.white = Number(
                                  a.find(".slider-w .right").text()
                                )),
                              (u[(l = "colorwhite" == l ? "white" : l)] = Number(
                                n
                              )),
                              (c = "" + p(u.red) + p(u.green) + p(u.blue))),
                          a.find(".slider-r .right").text(u.red),
                          a.find(".slider-g .right").text(u.green),
                          a.find(".slider-b .right").text(u.blue),
                          a.find(".slider-w .right").text(u.white),
                          a.find(".color-value").text(c),
                          a
                            .find(".color-display-box")
                            .css({ background: "#" + c }),
                          o.params.$dialog.find(".color-value").text(c),
                          o.params.$dialog
                            .find(".color-display-box")
                            .css({ background: "#" + c }),
                          Math.min(u.red, u.green, u.blue) >= 250
                            ? (a.find(".color-display-box").addClass("white"),
                              o.params.$dialog
                                .find(".color-display-box")
                                .addClass("white"))
                            : (a.find(".color-display-box").removeClass("white"),
                              o.params.$dialog
                                .find(".color-display-box")
                                .removeClass("white")),
                          o.params.sliderR.setValue(u.red),
                          o.params.sliderG.setValue(u.green),
                          o.params.sliderB.setValue(u.blue),
                          t.iswhite &&
                            (o.params.sliderW.setValue(u.white),
                            o.params.colorpickerSliderW.setValue(u.white)),
                          e.isFunction(r.onTouch) &&
                            e.isFunction(r.onTouch) &&
                            (r.onTouch.call(null, u),
                            r.onTouchEnd.call(null, u))),
                      s.removeClass("none").addClass("block"),
                      o.params.$inputDialog.element.find(".nameInput").blur();
                  },
                },
              ],
              content: u.join(""),
            })),
              o.params.$inputDialog.element.on("touchstart", function () {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              });
          },
          show: function (o, r, a) {
            var t = this.$dom,
              l = t.find(".card-inner-img"),
              s = this.toRGBString(r);
            t.toggleClass("active", o),
              t.find(".card-text").length > 0 &&
                i.sdk.utils.patchFontSize(t, 1, ".card-text", 9),
              o
                ? l.css({ background: s, border: "1px solid transparent" })
                : e("body").hasClass("mode-dark")
                ? l.css({
                    background: "rgb(255, 255, 255)",
                    border: "1px solid rgba(255, 255, 255, 0.86)",
                  })
                : l.css({
                    background: "rgb(255, 255, 255)",
                    border: "1px solid rgb(0, 0, 0)",
                  }),
              0 != a && (s = "rgb(255, 255, 255)"),
              this.params.colorModel.setColor(s);
          },
          toRGBString: function (i) {
            return ["rgb(", i.red, ",", i.green, ",", i.blue, ")"].join("");
          },
          toRGBArray: function (i) {
            return [i.red, i.green, i.blue];
          },
          setValue: function (i) {
            if (i) {
              var e,
                o = this.params.Slider,
                r = this.getLenByColor(i),
                a = o.$element;
              this.params.touching || o.setValue(r),
                this.nearWhiteColor(i) &&
                  ((i = colorTemperature2rgb(5500)), (e = !0)),
                this.setDisplayColor(a, i, this.data.brightness, e);
            }
          },
          setDisplayColor: function (i, e, o, r) {
            var a,
              t,
              l,
              s = this.params.colorModel;
            s.setColor(e, "rgb"),
              (a = this.getHsvColor()),
              (l = r ? (10 * o) / 255 + 90 : (30 * o) / 255 + 70),
              s.setColor({ h: a.h, s: a.s, v: l }, "hsv"),
              (t = this.toRGBString(this.getRgbColor())),
              i.css({ background: t });
          },
          nearWhiteColor: function (i) {
            return i.red > 240 && i.green > 240 && i.blue > 240;
          },
          getHsvColor: function () {
            return this.params.colorModel
              ? this.params.colorModel.getColor("hsv")
              : null;
          },
          getRgbColor: function () {
            var i = this.params.colorModel
              ? this.params.colorModel.colors.rgb
              : null;
            return i ? { red: i.r, green: i.g, blue: i.b } : null;
          },
          getColorFromPosition: function (i, e) {
            var o = i || 100,
              r = (parseFloat(e) / 100) * o;
            return this.getColorByLetn(r, o);
          },
          getColorByLetn: function (i, e) {
            var o = (e / 6).toFixed(2),
              r = Math.floor(i / o),
              a = i - r * o,
              t = Math.round((a / o) * 255),
              l = c[r];
            if (!l) return "rgb(255,0,1)";
            var s = l.dy,
              n = l.fix,
              d = Math.round((t * (s.e - s.s)) / 255 + s.s),
              u = {};
            for (var p in n) u[p] = n[p];
            return (u[s.name] = d), "rgb(" + u.r + "," + u.g + "," + u.b + ")";
          },
          changeStringToRgb: function (i) {
            var e = i && i.indexOf("("),
              o = i && i.indexOf(")");
            if (!(e < 0 || o < 0)) {
              var r = i.substring(e + 1, o).split(",");
              return r && r.length && 3 == r.length ? r : void 0;
            }
            console.log("error: the color string " + i + " is not right");
          },
          checkColorForLineColor: function (i) {
            var e,
              o,
              r,
              a = i.length,
              t = !1,
              l = !1,
              s = ["r", "g", "b"],
              n = [255 - i[0], 255 - i[1], 255 - i[2]],
              d = Math.min.apply(Math, n),
              c = Math.max.apply(Math, n),
              u = n.indexOf(d),
              p = n.lastIndexOf(c);
            (i[u] = "255"), (i[p] = "0");
            for (var h = 0; h < a; h++)
              0 == i[h] && ((t = !0), (e = h)),
                255 == i[h] && ((l = !0), (o = h));
            for (var m = 0; m < a; m++) m == e || m == o || (r = m);
            if (t && l) {
              var g = {};
              return (
                (g[s[e]] = 0),
                (g[s[o]] = 255),
                { fix: g, dy: { name: s[r], value: i[r] } }
              );
            }
          },
          getLenByColor: function (i, e) {
            var o = this.changeStringToRgb(i);
            if (o) {
              for (
                var r,
                  a = this.checkColorForLineColor(o),
                  t = a.fix,
                  l = a.dy,
                  s = c.length,
                  n = 0;
                n < s;
                n++
              ) {
                var d = c[n],
                  u = d.fix,
                  p = d.dy,
                  h = !0;
                for (var m in u)
                  if (u[m] != t[m]) {
                    h = !1;
                    break;
                  }
                if (h) {
                  r = n;
                  break;
                }
              }
              return ((100 * (r + (l.value - p.s) / (p.e - p.s))) / 6).toFixed(2);
            }
          },
          getColorObject: function (i, e, o) {
            var r = this.getColorFromPosition(e, o),
              a = this.changeStringToRgb(r),
              l = { red: +a[0], green: +a[1], blue: +a[2] };
            return t.iswhite && (l.white = +a[3]), l;
          },
          ui: {
            ".card-text": function (i, e, o) {
              this.show(!!i.active && 0 == i.colourMode, i.color, i.colourMode);
              var r = this,
                a = r.params.$professionHtml,
                l = r.params.$dialog,
                s = i.color,
                n = "" + c(s.red) + c(s.green) + c(s.blue);
              if ("mode2" == t.uitype) {
                var d = this.toRGBString(i.color);
                e.colourMode || this.setValue(d),
                  this.$dom.find(".card-inner").addClass("cct-slider"),
                  this.$dom.find(".ucd-handle-circle").css("background", d);
              } else
                l.find(".ucd-colorpicker-handle").show(),
                  a.find(".slider-r .right").text(s.red),
                  a.find(".slider-g .right").text(s.green),
                  a.find(".slider-b .right").text(s.blue),
                  t.iswhite &&
                    (l.find(".slider-w .right").text(s.white),
                    a.find(".slider-w .right").text(s.white)),
                  a.find(".color-value").text(n),
                  a.find(".color-display-box").css({ background: "#" + n }),
                  l.find(".color-value").text(n),
                  l.find(".color-display-box").css({ background: "#" + n }),
                  r.params.sliderR.setValue(s.red),
                  r.params.sliderG.setValue(s.green),
                  r.params.sliderB.setValue(s.blue),
                  t.iswhite &&
                    (r.params.sliderW.setValue(s.white),
                    r.params.colorpickerSliderW.setValue(s.white)),
                  Math.min(s.red, s.green, s.blue) >= 250
                    ? (a.find(".color-display-box").addClass("white"),
                      l.find(".color-display-box").addClass("white"))
                    : (a.find(".color-display-box").removeClass("white"),
                      l.find(".color-display-box").removeClass("white")),
                  this.$dom.find(".card-inner").removeClass("cct-slider");
              function c(i) {
                return (0, r.formatZero)("" + Number(i).toString(16));
              }
              this.$dom.toggleClass("active", !!i.active && 0 == i.colourMode),
                void 0 != e.lightSwitchs &&
                  0 == e.lightSwitchs &&
                  this.$dom.removeClass("active");
            },
          },
          formatZero: function (i) {
            return ("00" + i).slice(-2);
          },
        };
      },
    };
    registerSDK(o);
function registerSDK(a) {
        var i = a.name,
          n = a.factory || a,e;
        if (!(i = i || n.name)) throw "sdk name missing";
        e.sdk.push({
          name: i,
          create: function (a, s, o) {
            var l = o.id,
              r = n(o),
              d = r.bind,
              c = { disables: [], actives: [], subs: [] },
              m = [],
              u = {},
              p = UCD.binds.util.isChanged;
            if (
              ((r.name = i),
              (r.bind = function (a, i) {
                if (
                  (d && d.call(this, a, i),
                  e.sdk.utils.updataJsondata(l, a),
                  void 0 === D.ruleData || (D.ruleData && 0 == D.ruleData.length))
                )
                  s.toggleClass("ucd-disabled", -1 != a.disables.indexOf(l)),
                    s.toggleClass("actived", -1 != a.actives.indexOf(l)),
                    s.toggleClass("disactive", -1 == a.actives.indexOf(l)),
                    s.toggleClass("sub", -1 != a.subs.indexOf(l));
                else {
                  for (var n = 0; n < m.length; n++) {
                    var o = m[n],
                      c = (i && i[o.name]) || a[o.name];
                    if (
                      (c &&
                        "{}" != JSON.stringify(c) &&
                        p(c, u[o.name]) &&
                        e.rulesHelper.compile(c, o, r),
                      (u[o.name] = t.extend(!0, {}, c)),
                      "bool" === o.type && void 0 !== o.key)
                    ) {
                      for (
                        var f = s.data("data-enable"),
                          h = o.key.split("."),
                          g = a,
                          v = 0;
                        v < h.length;
                        v++
                      )
                        g = g[h[v]];
                      void 0 === f || -1 === f || !!g != !!f
                        ? (s.removeClass("ucd-enable-readonly"),
                          c.disable || c.readonly || s.removeAttr("disabled"))
                        : (s.addClass("ucd-enable-readonly"),
                          s.attr("disabled", !0));
                    }
                  }
                  s.hasClass("ucd-rule-disabled") && s.removeClass("active");
                }
              }),
              (r.__data = c),
              e.sdk.utils.setComponent(o.id, r),
              (s = t(r.create(s, o)) || t("<div></div>")).addClass(r.name),
              "function" == typeof r.createRules)
            ) {
              var f = r.createRules();
              for (var h in ("object" == typeof f && (f = [].concat(f)), f)) {
                var g = f[h];
                if ("object" == typeof g) {
                  var v = ["__", g.sid, "RuleData"].join("");
                  (c[v] = {}), (g.name = v), (g.$dom = s), m.push(g);
                }
              }
            }
            return s;
          },
          init: function (a, i) {
            var n = a.id,
              s = e.sdk.utils.getComponent(n),
              o = s.mounted || s.init;
            UCD.binds.add(
              t.extend(!0, s, {
                id: n,
                $dom: i,
                data: s.__data,
                init: function (i, s) {
                  o.call(this, i, s);
                  var l = a._guidance;
                  if (l && l.title) {
                    var r = e.sdk.utils.getI18nInfo("guidance", l.title, [
                      n,
                      "value",
                    ]);
                    i.attr("guid-index", "");
                    var d,
                      c,
                      m =
                        window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth,
                      u = ((2 * m) / 3).toFixed(2) + "px",
                      p = m / 2,
                      f = i.position().left,
                      h =
                        i.position().top -
                        0.1888 * parseInt(t("html").css("font-size")),
                      g = t(i).width(),
                      v = "";
                    t('.guid-tip[guid-id="' + n + '"]').length > 0
                      ? (d = t('.guid-tip[guid-id="' + n + '"]')).text(r)
                      : ((d = t(
                          '<div class="guid-tip" style="max-width:' +
                            u +
                            ";top:" +
                            h +
                            'px;" guid-id="' +
                            n +
                            '">' +
                            r +
                            "</div>"
                        )),
                        t(".main-page-content").append(d)),
                      f > p / 2
                        ? ((v = "right"), d.css({ right: m - f - g + "px" }))
                        : ((v = "left"), d.css({ left: f + "px" })),
                      (c = t('<div class="guid-icon ' + v + '"></div>')),
                      l.preview && l.preview.value
                        ? (i.addClass("ui-show-guid"), d.addClass("ui-show-guid"))
                        : (i.removeClass("ui-show-guid"),
                          d.removeClass("ui-show-guid")),
                      i.append(c);
                  } else
                    l &&
                      0 == l.value &&
                      t('.guid-tip[guid-id="' + n + '"]').remove();
                },
                remove: function () {
                  e.sdk.utils.removeComponent(n);
                },
              })
            ),
              s.$dom.find(".card-status").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".card-status", 12),
              s.$dom.find(".card-inner .card-text").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 1, ".card-inner .card-text", 9),
              s.$dom.find(".ucd-modelist-label").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".ucd-modelist-label", 12),
              s.$dom.find(".ucd-modelist-desc").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".ucd-modelist-desc", 9),
              s.$dom.find(".ucd-modelist-button").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 1, ".ucd-modelist-button", 9),
              s.$dom.find(".banner-status").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".banner-status", 14),
              s.$dom.find(".result").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".result", 14),
              s.$dom.find(".param-leftper").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".param-leftper", 9),
              s.$dom.find(".ui-spinner-title").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".ui-spinner-title", 9),
              s.$dom.find(".ui-spinner-value").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".ui-spinner-value", 12),
              s.$dom.find(".card-inner-box .text").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".card-inner-box .text", 9),
              s.$dom.find(".status-text").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 1, ".status-text", 9),
              s.$dom.find(".slider-item").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 1, ".slider-item", 9),
              s.$dom.find(".card-layout-center").length > 0 &&
                e.sdk.utils.patchFontSize(s.$dom, 2, ".card-layout-center", 12);
          },
        });
      }
  })(window.D || (window.D = {}), jQuery);