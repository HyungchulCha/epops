/* Responsive Status Check */
function sCheck(){
	
	var	wc	=	$('.s_check'),
		wcP	=	wc.find('.sc_p').css('display'),
		wcT	=	wc.find('.sc_t').css('display'),
		wcM	=	wc.find('.sc_m').css('display');
	
	
	return "block" === wcP ? "p" : "block" === wcT ? "t" : "block" === wcM ? "m" : void 0

}

/* Slide */
function fnSlide({ dom, loop, auto, center, direct, effect, breakPoint }) {

    var $dom = $(dom),
        $domP = $dom.parents('.s_o'),
        status = sCheck();

    var sSlide;

    if ($dom.length > 0) {

        /* s: set */
        var strSW = 's_w',
            strSL = 'sw_l'
            sL = $domP.find('.' + strSL),
            sLleng = sL.length,
            sC = $domP.find('.s_c'),
            btnPrev = $domP.find('.btn_prev'),
            btnNext = $domP.find('.btn_next'),
            btnPause = $domP.find('.btn_pause'),
            btnPlay = $domP.find('.btn_play'),
            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
            sP = $domP.find('.s_p'),
            sPleng = sP.length;

        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());
        !auto && (btnPlay.hide(), btnPause.hide());

        sSlide = new Swiper(dom, {
            wrapperClass: strSW,
            slideClass: strSL,
            loop: loop,
            autoplay: auto,
            centeredSlides: !center ? false : true,
            direction: !direct ? 'horizontal' : direct,
            effect: !effect ? 'slide' : effect,
            slidesPerView: "auto",
            slidesPerGroup: 1,
            nested: true,
            pagination: sPleng > 0 && {
                el: sP[0],
                clickable: true,
                renderBullet: function(i, c) {
                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                }
            },
            navigation: isBtn && {
                prevEl: btnPrev[0],
                nextEl: btnNext[0]
            },
            on: {
                init: function(a) {
                    var $wrap = $(a.el).parents('.s_o');
                    var isCount = $wrap.find('.s_c').length > 0;
                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                    isCount && ($wrap.find('.s_c strong').text(1), $wrap.find('.s_c span').text(listleng));
                    $wrap.find('.swiper-slide-duplicate a').attr('tabindex', '-1');
                },
                transitionEnd: function(a) {
                    var $wrap = $(a.el).parents('.s_o');
                    var isCount = $wrap.find('.s_c').length > 0;
                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                    isCount && ($wrap.find('.s_c strong').text(a.realIndex + 1), $wrap.find('.s_c span').text(listleng));
                    if (auto) {
                        if ($wrap.find('.btn_pause').css('display') !== 'none') {
                            a.autoplay.start();
                        } else {
                            a.autoplay.stop();
                        }
                    }
                }
            }
        });

        /* custom event */
        var $wrap = $(sSlide.el).parents('.s_o');
        var domLastFocus = loop ? $wrap.find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + ' a"]') : $wrap.find('.sw_l:last-child a');

        if (auto) {
            btnPlay.hide();
            btnPause.click(function() {
                if (sSlide !== undefined) {
                    sSlide.autoplay.stop();
                    $(this).next().show();
                    $(this).hide();
                    return false;
                }
            });
            btnPlay.click(function() {
                if (sSlide !== undefined) {
                    sSlide.autoplay.start();
                    $(this).prev().show();
                    $(this).hide();
                    return false;
                }
            });
        }

        $wrap.find('.s_w .sw_l a').focusin(function() {
            if (sSlide !== undefined) {
                var isFirstIndex = loop ? $(this).parents('.sw_l').attr('data-swiper-slide-index') === '0' : $(this).parents('.sw_l').index() === 0;
                if (auto) {
                    sSlide.autoplay.stop();
                    $wrap.find('.btn_pause').hide();
                    $wrap.find('.btn_play').show();
                }
                loop ? (isFirstIndex && sSlide.slideToLoop(0)) : (isFirstIndex && sSlide.slideTo(0));
            }
        });

        $wrap.find('.s_w').focusout(function() {
            if (sSlide !== undefined) {
                if (auto) {
                    sSlide.autoplay.start();
                    $wrap.find('.btn_pause').show();
                    $wrap.find('.btn_play').hide();
                }
            }
        });

        domLastFocus.keydown(function(e) {
            if (sSlide !== undefined) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 9) {
                    sSlide.slideTo(0);
                    if (auto) {
                        sSlide.autoplay.start();
                        $wrap.find('.btn_pause').show();
                        $wrap.find('.btn_play').hide();
                    }
                }
            }
        });

        /* e: set */

        if (breakPoint !== undefined) {

            $(window).on('resize', $.debounce(80, function(){

                var status = sCheck(),
                    isSame = breakPoint.includes(status);

                if (isSame) {
                    if (sSlide !== undefined) {
                        return;
                    } else {

                        /* s: set */
                        var strSW = 's_w',
                            strSL = 'sw_l'
                            sL = $domP.find('.' + strSL),
                            sLleng = sL.length,
                            sC = $domP.find('.s_c'),
                            btnPrev = $domP.find('.btn_prev'),
                            btnNext = $domP.find('.btn_next'),
                            btnPause = $domP.find('.btn_pause'),
                            btnPlay = $domP.find('.btn_play'),
                            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
                            sP = $domP.find('.s_p'),
                            sPleng = sP.length;

                        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());
                        !auto && (btnPlay.hide(), btnPause.hide());

                        sSlide = new Swiper(dom, {
                            wrapperClass: strSW,
                            slideClass: strSL,
                            loop: loop,
                            autoplay: auto,
                            centeredSlides: !center ? false : true,
                            direction: !direct ? 'horizontal' : direct,
                            effect: !effect ? 'slide' : effect,
                            slidesPerView: "auto",
                            slidesPerGroup: 1,
                            nested: true,
                            pagination: sPleng > 0 && {
                                el: sP[0],
                                clickable: true,
                                renderBullet: function(i, c) {
                                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                                }
                            },
                            navigation: isBtn && {
                                prevEl: btnPrev[0],
                                nextEl: btnNext[0]
                            },
                            on: {
                                init: function(a) {
                                    var $wrap = $(a.el).parents('.s_o');
                                    var isCount = $wrap.find('.s_c').length > 0;
                                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                                    isCount && ($wrap.find('.s_c strong').text(1), $wrap.find('.s_c span').text(listleng));
                                    $wrap.find('.swiper-slide-duplicate a').attr('tabindex', '-1');
                                },
                                transitionEnd: function(a) {
                                    var $wrap = $(a.el).parents('.s_o');
                                    var isCount = $wrap.find('.s_c').length > 0;
                                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                                    isCount && ($wrap.find('.s_c strong').text(a.realIndex + 1), $wrap.find('.s_c span').text(listleng));
                                    if (auto) {
                                        if ($wrap.find('.btn_pause').css('display') !== 'none') {
                                            a.autoplay.start();
                                        } else {
                                            a.autoplay.stop();
                                        }
                                    }
                                }
                            }
                        });

                        /* custom event */
                        var $wrap = $(sSlide.el).parents('.s_o');
                        var domLastFocus = loop ? $wrap.find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + ' a"]') : $wrap.find('.sw_l:last-child a');

                        if (auto) {
                            btnPlay.hide();
                            btnPause.click(function() {
                                if (sSlide !== undefined) {
                                    sSlide.autoplay.stop();
                                    $(this).next().show();
                                    $(this).hide();
                                    return false;
                                }
                            });
                            btnPlay.click(function() {
                                if (sSlide !== undefined) {
                                    sSlide.autoplay.start();
                                    $(this).prev().show();
                                    $(this).hide();
                                    return false;
                                }
                            });
                        }

                        $wrap.find('.s_w .sw_l a').focusin(function() {
                            if (sSlide !== undefined) {
                                var isFirstIndex = loop ? $(this).parents('.sw_l').attr('data-swiper-slide-index') === '0' : $(this).parents('.sw_l').index() === 0;
                                if (auto) {
                                    sSlide.autoplay.stop();
                                    $wrap.find('.btn_pause').hide();
                                    $wrap.find('.btn_play').show();
                                }
                                loop ? (isFirstIndex && sSlide.slideToLoop(0)) : (isFirstIndex && sSlide.slideTo(0));
                            }
                        });

                        $wrap.find('.s_w').focusout(function() {
                            if (sSlide !== undefined) {
                                if (auto) {
                                    sSlide.autoplay.start();
                                    $wrap.find('.btn_pause').show();
                                    $wrap.find('.btn_play').hide();
                                }
                            }
                        });

                        domLastFocus.keydown(function(e) {
                            if (sSlide !== undefined) {
                                var keyCode = e.keyCode || e.which;
                                if (keyCode === 9) {
                                    sSlide.slideTo(0);
                                    if (auto) {
                                        sSlide.autoplay.start();
                                        $wrap.find('.btn_pause').show();
                                        $wrap.find('.btn_play').hide();
                                    }
                                }
                            }
                        });

                        /* e: set */
    
                    }
                } else {
                    if (sSlide === undefined) {
                        return;
                    } else {
                        sSlide.destroy(true, true);
                        sSlide = undefined;
                    }
                }

            }));

            var isSame = breakPoint.includes(status);

            if (!isSame) {
                sSlide.destroy(true, true);
                sSlide = undefined;
            }

        }
    
    }
    
}

/* slide tab */
function fnSlideTab() {

    if ($('.tab_scrl').length > 0) {
        new Swiper('.tab_scrl', {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });
    }
    
}

/* Tab Common */
function tabCommon(wrapClass) {

    var tabWrap = $(wrapClass),
        tabList = tabWrap.find(".tab_list li"),
        tabContent = tabWrap.find(".tab_content");

    tabList.removeClass("on");
    tabList.first().addClass("on");
    tabList.find("a .hdn").remove();
    tabList.first().find("a").append('<em class="hdn">선택된 탭</em>');
    tabContent.removeClass("on");
    tabContent.first().addClass("on");

    tabList.find("a").click(function() {

        var 
        	thP = $(this).parent(),
            thPIdx = thP.index(),
        	isOn = thP.hasClass("on");

        if (!isOn) {
            tabList.removeClass("on");
            tabList.find("a .hdn").remove();
            thP.addClass("on");
            $(this).append('<em class="hdn">선택된 탭</em>');
            tabContent.removeClass("on");
            tabContent.eq(thPIdx).addClass('on');
        }
        
        var sTab = $(this).parents('.s_tab'),
        	isSTab = sTab.length > 0,
        	thPIdx = thP.index(),
	        thPLeft = thPIdx === 0 ? (thP.position().left - 8) : (thP.position().left);
        
        if (isSTab) {
        	sTab.animate({ scrollLeft: thPLeft }, 160, 'swing');
        }

        return false;
    });
    
}

/* Tab Accessibility */
function tabAccess(wrapClass) {

    var tabWrap = $(wrapClass),
        tabBox = tabWrap.find(".tab_box"),
        tabTitle = tabWrap.find(".tab_box .tab_title a");

    tabBox.removeClass("on");
    tabBox.first().addClass("on");
    tabBox.find(".tab_title a .hdn").remove();
    tabBox.first().find(".tab_title a").append('<em class="hdn">선택된 탭</em>');

    tabTitle.click(function() {
        tabBox.removeClass("on");
        $(this).parents(".tab_box").addClass("on");
        tabBox.find(".tab_title a .hdn").remove();
        $(this).append('<em class="hdn">선택된 탭</em>');

        return false;
    });

}

/* after hasCheck */
function afterHasCheck(dom, f, isResize, ratio) {
    var $dom = $(dom);
    $dom.length > 0 && $dom.each(!ratio ? f : function(){
        f($(this), ratio);
    });
    isResize && $(window).on('resize', $.debounce(80, function(){
        $dom.length > 0 && $dom.each(!ratio ? f : function(){
            f($(this), ratio);
        });
    }));
}

/*
    className : lt_l
    afterHasCheck('.lt_l', listToggle)
 */
function listToggle() {

    var th = $(this),
        thP = th.parents('.lt_p'),
        isOpen = thP.hasClass("open");

    !isOpen ? (th.append('<em class="hdn">열기</em>')) : (th.append('<em class="hdn">닫기</em>'));

    th.click(function() {

        var thP = $(this).parents('.lt_p'),
            isOpen = thP.hasClass("open"),
            thTxt = $(this).find(".hdn");

        !isOpen ? (thP.addClass("open"), thTxt.text("닫기")) : (thP.removeClass("open"), thTxt.text("열기"));

        var thPP = $(this).parents('.lt_ap'),
            thPPLinkText = thPP.find('.lt_al .hdn'),
            thPPList = thPP.find('.lt_p'),
            thPPListLeng = thPPList.length,
            checkNum = 0;

        thPPList.each(function(){
            var isOpen = $(this).hasClass('open');
            isOpen ? checkNum += 1 : checkNum -= 1;
        });

        if (checkNum === thPPListLeng) {
            thPP.addClass('open');
            thPPLinkText.text('닫기');
        } else if (checkNum === thPPListLeng * -1) {
            thPP.removeClass('open');
            thPPLinkText.text('열기');
        }

        return false;

    });
}
function listAllToggle() {

    var th = $(this),
        thP = th.parents('.lt_ap'),
        isOpen = thP.hasClass("open"),
        thPlist = thP.find('.lt_p');

    !isOpen ? (th.append('<em class="hdn">열기</em>'), thPlist.removeClass('open')) : (th.append('<em class="hdn">닫기</em>'), thPlist.addClass('open'));

    th.click(function(){

        var thP = $(this).parents('.lt_ap'),
            thTxt = $(this).find(".hdn"),
            isOpen = thP.hasClass("open"),
            thPlist = thP.find('.lt_p'),
            thPlistLinkTxt = thPlist.find('.lt_l .hdn');

        if (!isOpen) {
            thP.addClass("open");
            thTxt.text("닫기");
            thPlist.addClass('open');
            thPlistLinkTxt.text('닫기');
        } else {
            thP.removeClass("open");
            thTxt.text("열기");
            thPlist.removeClass("open");
            thPlistLinkTxt.text('열기');
        }

        return false;

    });
}

/*
    className : dt_l
    afterHasCheck('.dt_l', targetToggle)
 */
function targetToggle() {

    var th = $(this),
        thTargetDiv = $("." + th.attr("data-target")),
        thBtnCloseTop = $(thTargetDiv.find(".btn_close")[0]);
        thBtnCloseBottom = $(thTargetDiv.find(".btn_close")[1])
        isIbw = thTargetDiv.find('.ib_w').length > 0;

    th.click(function() {
        var isOpen = thTargetDiv.hasClass('open');
        !isOpen ? (
            thTargetDiv.addClass("open"), 
            thBtnCloseTop.focus(),
            (isIbw && afterHasCheck('.ib_w', inlineBlockWidth))
        ) : thTargetDiv.removeClass("open");
        return false;
    });

    thBtnCloseTop.click(function() {
        thTargetDiv.removeClass("open");
        th.focus();
        return false;
    });

    thBtnCloseBottom.click(function() {
        thTargetDiv.removeClass("open");
        th.focus();
        return false;
    });

}
/*
    className : a
    afterHasCheck('a', newWindow)
 */
function newWindow() {
    var th = $(this),
        thTarget = th.attr("target"),
        thTitle = th.attr("title");

    if (thTarget === "_blank") {
        th.append('<i class="ico_window"><em class="hdn">새창</em></i>');    
        (thTitle === undefined || thTitle === null || thTitle === "") && th.attr("title", "새창");
    }
}
/*
    className : [class^="tab_"] .on a
    afterHasCheck('[class^="tab_"] .on a', tabSelected)
 */
function tabSelected() {
    $(this).attr("title", '선택된 탭');
}
/* 
    className : target 
    afterHasCheck(target, domRatio, true, ratio)
*/
function domRatio(th, ratio) {
    th.css('height', th.outerWidth() * ratio);
}
/* 
    className : ib_w 
    afterHasCheck('.ib_w', inlineBlockWidth)
*/
function inlineBlockWidth() {
    var thClass = $(this).parent().attr('class');
    var isPdl = thClass.includes('pd_l');
    var pdVal = isPdl ? Number(thClass.split(' ')[0].split('pd_l')[1]) : 0;
    $(this).parent().css({
        'width': $(this).outerWidth() + pdVal
    });
}
/* 
    className : f_unit
    afterHasCheck('.f_unit', fUnitTextWidth)
*/
function fUnitTextWidth() {
    $(this).find('input').css({
        'padding-right': $(this).find('.f_txt').outerWidth()
    })
}
/* 
    className : form_area
    afterHasCheck('.form_area', formAreaTitleWidth)
*/
function formAreaTitleWidth() {

    var arr = [],
        th = $(this),
        thList = th.find('> ul > li'),
        thtitle = th.find('.fa_title'),
        isTitle = thtitle.length > 0,
        isPdNone = th.hasClass('pd_n'),
        per = 16;

    if (isPdNone) return;

    if (isTitle) {
        thList.each(function(){
            arr.push($(this).find('.fa_title').outerWidth());
        });
        arr.sort(function(a, b){ return b - a });
        thList.css('padding-left', arr[0] + per);
    }

}
/* 
    className : s_tab
    afterHasCheck('.s_tab', subTabScroll)
*/
function subTabScroll() {

    var th = $(this),
        thW = th.outerWidth(),
        thUl = th.find('ul'),
        thLi = th.find('li'),
        liOn = th.find('.on'),
        liOnPosX = liOn.position().left,
        thPd = 16,
        x = 0;

    th.scrollLeft(liOnPosX - (thPd / 2));
    thLi.each(function(){
        x =  x + $(this).outerWidth();
    });
    thW < x ? thUl.css('width', x + thPd) : thUl.removeAttr('style');

}

function boardLinkWidth() {

    var th = $(this),
        isEps = th.hasClass('board_link_elps'),
        thLink = th.find('.bl_link'),
        thLinkNot = th.find('> *').not('.bl_link'),
        totalWidth = 0;

    if (isEps) {
        thLinkNot.each(function(){
            totalWidth += $(this).outerWidth() + 8;
        });
    }

    thLink.css('max-width', 'calc(100% - ' + parseInt(totalWidth + 16) + 'px)');

}

function fCheckToggle() {
    var fci = $('.f_check input');
    fci.keydown(function(e){
        var codeKey = e.keyCode || e.which;
        if (codeKey === 13) {
            $(this).trigger('click');
        }
    });
}

function layerAlert({th, tit, cont, pf, cf, nf}){
    var $body = $('body');
    var la = `<div class="layer_alert">
        <div>
            <button class="btn_close">닫기</button>
            <div class="la_t">
                <h3>${!!tit ? tit : '알림'}</h3>
            </div>
            <div class="la_c">
                ${cont}
            </div>
            <div class="la_b">
                ${!!pf ? '<button class="btn_confirm">확인</button>' : ''}
                ${!!cf ? '<button class="btn_common">일반</button>' : ''}
                <button class="btn_cancel">취소</button>
            </div>
        </div>
    </div>
    `;
    $body.append(la);
    $('.layer_alert .btn_close').focus();
    $('.layer_alert .btn_close').click(function(){
        $('.layer_alert').remove();
        $(th).focus();
    });
    $('.layer_alert .btn_cancel').click(function(){
        !!nf && nf();
        $('.layer_alert').remove();
        $(th).focus();
    })
    !!pf && $('.layer_alert .btn_confirm').click(function(){
        pf();
        $('.layer_alert').remove();
        $(th).focus();
    });
    !!cf && $('.layer_alert .btn_common').click(function(){
        cf();
        $('.layer_alert').remove();
        $(th).focus();
    });
};

$(document).ready(function(){
    afterHasCheck('a', newWindow);
    afterHasCheck('.lt_l', listToggle);
    afterHasCheck('.lt_al', listAllToggle);
    afterHasCheck('.dt_l', targetToggle);
    afterHasCheck('[class^="tab_"] .on a', tabSelected);
    afterHasCheck('.ib_w', inlineBlockWidth);
    afterHasCheck('.f_unit', fUnitTextWidth);
    afterHasCheck('.form_area', formAreaTitleWidth);
    afterHasCheck('.s_tab', subTabScroll);
    afterHasCheck('.board_link', boardLinkWidth);
    fCheckToggle();
    fnSlideTab();
});