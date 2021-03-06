/*
 * nyroModal v2.alpha
 * for IE6
 *
 */
jQuery(function ($, undefined) {
    var $b = $('body'),
        $w = $(window),
        $h = $('html'),
        shown = 0,
        zIndex = 100;

    function isFullScreen() {
        return screen.height == $w.height() + 58;
    }

    $b.append('<style type="text/css">' +
        '.nyroModalCloseButton{font-size: 1px}' +
        '.nyroModalLink .nyroModalPrev, .nyroModalDom .nyroModalPrev, .nyroModalForm .nyroModalPrev, .nyroModalFormFile .nyroModalPrev {left: -10px}' +
        '</style>');
    $.nmObj({
        _reposition: function () {
            var elts = this.elts.cont.find('.nmReposition');
            if (elts.length) {
                var outer = this.getInternal()._getOuter($b),
                    fs = isFullScreen();
                var space = {
                    top: -(fs ? outer.h.border / 2 : 0),
                    left: -(fs ? outer.w.border / 2 : 0)
                };
                elts.each(function () {
                    var me = $(this),
                        offset = me.offset();
                    me.css({
                        top: offset.top - space.top,
                        left: offset.left - space.left
                    });
                });
                this.elts.cont.after(elts);
            }
            this.elts.cont.css('overflow', 'auto');
        }
    });
    $.nmInternal({
        _calculateFullSize: function () {
            var scrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
                ),
                offsetHeight = Math.max(
                    document.documentElement.offsetHeight,
                    document.body.offsetHeight
                ),
                scrollWidth = Math.max(
                    document.documentElement.scrollWidth,
                    document.body.scrollWidth
                ),
                offsetWidth = Math.max(
                    document.documentElement.offsetWidth,
                    document.body.offsetWidth
                );
            this.fullSize = {
                wW: $w.width(),
                wH: $w.height()
            };
            this.fullSize.h = scrollHeight < offsetHeight ? $w.height() : scrollHeight;
            this.fullSize.w = scrollWidth < offsetWidth ? $w.width() : scrollWidth;
            this.fullSize.viewW = Math.min(this.fullSize.w, this.fullSize.wW);
            this.fullSize.viewH = Math.min(this.fullSize.h, this.fullSize.wH);
        }
    });
    $.nmAnims({
        basic: {
            resize: function (nm, clb) {
                var space = nm.getInternal()._getSpaceReposition(),
                    outer = nm.getInternal()._getOuter(nm.elts.cont);
                nm.elts.cont.css({
                    width: nm.sizes.w,
                    height: nm.sizes.h,
                    top: space.top + (nm.getInternal().fullSize.viewH - outer.h.total - nm.sizes.h) / 2,
                    left: space.left + (nm.getInternal().fullSize.viewW - outer.w.total - nm.sizes.w) / 2
                });
                clb();
            }
        },
        fade: {
            resize: function (nm, clb) {
                var space = nm.getInternal()._getSpaceReposition(),
                    outer = nm.getInternal()._getOuter(nm.elts.cont);
                nm.elts.cont.animate({
                    width: nm.sizes.w,
                    height: nm.sizes.h,
                    top: space.top + (nm.getInternal().fullSize.viewH - outer.h.total - nm.sizes.h) / 2,
                    left: space.left + (nm.getInternal().fullSize.viewW - outer.w.total - nm.sizes.w) / 2
                }, clb);
            }
        }
    });
    $.nmFilters({
        ie6: {
            is: function () {
                return true;
            },
            initElts: function (nm) {
                nm.store.ie6 = true;
                if (shown == 0) {
                    $h.css({overflow: 'hidden'});
                    var w = $b.width(),
                        h = $b.outerHeight(true) + 'px';
                    if ($w.height() >= $b.outerHeight(true)) {
                        h = $w.height() + 'px';
                    } else
                        w += 20;
                    w += 'px';
                    $b.css({
                        width: w,
                        height: h,
                        position: 'static',
                        overflow: 'hidden'
                    });
                }
            },
            beforeShowBg: function (nm) {
                var space = nm.getInternal()._getSpaceReposition(),
                    outer = nm.getInternal()._getOuter($b);
                nm.elts.bg.css({
                    position: 'absolute',
                    top: space.top,
                    left: space.left,
                    width: nm.getInternal().fullSize.viewW + 200,
                    height: nm.getInternal().fullSize.viewH + 200
                });
                shown++;
            },
            afterHideBg: function (nm) {
                if (nm.store.ie6) {
                    nm.store.ie6 = false;
                    shown--;
                }
                if (shown == 0) {
                    $h.css({overflow: ''});
                    $b.css({
                        width: '',
                        height: '',
                        position: '',
                        overflow: ''
                    });
                }
            },
            size: function (nm) {
                if (!nm._hasFilter('image') && !nm._hasFilter('swf')) {
                    // apply min height and width
                    if (nm.sizes.h < 250)            nm.sizes.h = 250;
                    if (nm.sizes.w < 250)            nm.sizes.w = 250;
                    else if (nm.sizes.w > 1000)        nm.sizes.w = 1000;
                }
            },
            close: function (nm) {
                if (nm.store.ie6) {
                    nm.store.ie6 = false;
                    shown--;
                }
            },
            beforeShowLoad: function (nm) {
                var space = nm.getInternal()._getSpaceReposition(),
                    outer = nm.getInternal()._getOuter(nm.elts.load);
                nm.elts.load.css({
                    'z-index': zIndex++,
                    position: 'absolute',
                    top: space.top + (nm.getInternal().fullSize.viewH - nm.elts.load.height() - outer.h.margin) / 2,
                    left: space.left + (nm.getInternal().fullSize.viewW - nm.elts.load.width() - outer.w.margin) / 2
                });
            },
            beforeShowCont: function (nm) {
                var space = nm.getInternal()._getSpaceReposition(),
                    outer = nm.getInternal()._getOuter(nm.elts.cont);
                nm.elts.cont.css({
                    'z-index': zIndex++,
                    position: 'absolute',
                    top: space.top + (nm.getInternal().fullSize.viewH - outer.h.total - nm.sizes.h) / 2,
                    left: space.left + (nm.getInternal().fullSize.viewW - outer.w.total - nm.sizes.w) / 2
                });
            }
        }
    });
});