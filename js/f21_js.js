
$(function(){
	 /* Mobile left Menu start */
     $(".icon_menu,.top_new_menu").on("click", function () {
        $('.slider_close, .m_menu_cover, .container.clearfix.bg_white').removeClass('hide').addClass('show');
        $('.l_container').addClass("open");

        $("html").addClass('noscroll');
	});
	
	/* Checkout Slide */
	$('.expand_p').each(function () {
		$(this).off('click');
		$(this).click(function () {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			
		});
	});

	$('#w_header_status_area, .top_new_account').on('click', function () {
        if ($("#myaccount .r_container").hasClass('open')) {
            $("#myaccount .r_container, .desktop_overlay").removeClass("open");
            $("html").removeClass("noscroll");
        }
        else {
            $("#myaccount .r_container, .desktop_overlay:first").addClass("open");
            $("html").addClass("noscroll");
            $('.c_container').addClass('open left');
            $(".r_container .icon_close, .desktop_overlay").on("click", function () {
                $('.c_container').removeClass('open left');
            });
        }
	});
	
	/* drop down Slide */
	$('.qna_p').each(function () {
		$(this).off('click');
		$(this).click(function () {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			
		});
	});
	
	/* Checkout Slide */
	$(".quick .expand_p").click(function () {
		$(".expand_c").slideToggle().css("display", "block");
		if($(".expand_p").hasClass("active")){
			$(".expand_p").removeClass("active");
		}
	});
	
	/* Left Popup
	$(".btn_right_side").on("click", function () {
        $(".r_container, .desktop_overlay").addClass("open");
        $('html').addClass('noscroll');
    });
	$(".r_container .icon_close, .desktop_overlay").on("click", function () {
        $(".r_container, .desktop_overlay").removeClass("open");
        $("#open_specialOffers").removeClass("show").addClass("hide");
        $('#divQuickView').html('');

        $('html').removeClass('noscroll');
        $('.soCouponPopClass').css('display', 'none');
    });
	 */
	
	$(".btn_right_side").on("click", function () {
	    
	    var btnIdx = $(this).index(); //-- 클릭한 버튼 인덱스 
	    $(".r_container, .desktop_overlay").removeClass("open"); //-- 전체에서 open class 제거 
	    
	    
	    $(".r_container").eq(btnIdx).addClass("open"); //-- 팝업객체 셀렉트/오픈 
	    $(".desktop_overlay").addClass("open");
        $('html').addClass('noscroll');
    });
    
	$(".r_container .icon_close, .desktop_overlay").on("click", function () {
        $(".r_container, .desktop_overlay").removeClass("open");
        $("#open_specialOffers").removeClass("show").addClass("hide");
        $('#divQuickView').html('');

        $('html').removeClass('noscroll');
        $('.soCouponPopClass').css('display', 'none');
    });

    /* Input*/
    $('.input_label').each(function () {
        $(this).click(function () {
            $(this).children('input').focus();
            $('.input_label').each(function () {
                if ($(this).children('input').val() == '') {
                    $(this).removeClass('focus');
                    $(this).find('.icon_delete').hide();
                }
            });
            $(this).addClass('focus');
        });

        /* Focus and focusout for input */
        $(this).find('input,textarea').focus(function () {
            $(this).parent('.input_label').addClass('focus');
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).parent('.input_label').removeClass('focus');
                $(this).parent('.input_label').find('.icon_delete').hide();
            }
        });

        // show and hide delete icon
        $(this).find('input').keydown(function () {
            if ($(this).val() == '')
                $(this).parent('.input_label').find('.icon_delete').hide();
            else
                $(this).parent('.input_label').find('.icon_delete').show();
        });
    });


	/* Quick View Slide*/
	$(".qv a, .mybag div a, #want a").on("click",function() {
		$("body, .r_container, .desktop_overlay").addClass("open");
	});
	$(".r_container .icon_close, .desktop_overlay").on("click",function() {
		$("body, .r_container, .desktop_overlay").removeClass("open");
	});

	/* Mobile Search Box */
	$(".m_header .nav_secondary .icon_search").on("click",function(){
		$(".m_search_container").slideToggle();
	});
	$(".m_search_container .icon_close").on("click",function(){
   		$(".m_search_container").slideToggle();
   	});
	

	/* Desktop Search Box */
	$(".show_desktop .icon_search").click(function(){
   		$(".d_search_container").animate({width: 'toggle'});
   	});
   	$(".d_search_container .icon_close").click(function(){
   		$(".d_search_container").animate({width: 'toggle'});
   	});
	
	/* Scroll */
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 800) {
	        $('.scrollToTop').fadeIn();
	    } else {
	        $('.scrollToTop').fadeOut("fast");
	    }
	});
	$('.scrollToTop').click(function () {
	    $('html, body').animate({
	        scrollTop: 0
	    }, 400);
	    return false;
	});

	/* Mobile Left Menu */
	$('.l_container .mega_menu').each(function () {
	    $(this).click(function () {
	        $(this).toggleClass('active');
	        $(this).find('.mega_sub').slideToggle();
	    });
	});

	/* Dropdown */
	$('.drop_p').each(function () {
	    $(this).click(function () {
	        $(this).next().addClass('open');
	    });
	});


	/* Checkout Input*/
	$('.input_label').each(function () {
		$(this).click(function (){
			$(this).addClass('focus');
		});
	});

	$('.tab_title').each(function () {
	    $(this).click(function () {
	        $(this).find('.tab_content').slideToggle();
	    });
	});

	/* Mobile Dropmenu */
	if (window.devicePixelRatio > 1 ) {
	  $('h1').click(function(){
			$('.nav_c').slideToggle();
			$('.side_left_menu').slideToggle();
		})
	}

	/* Filter Dropdown */
	$('.m_filer').click(function(){
		$('.side_menu').slideToggle();
	});

	/* 500 Under */
	$('.want_free').click(function(){
		$('#want').slideToggle();
	});

    /* tab Menu*/
    //if(matchMedia("screen and (min-width: 1024px)").matches) {
	if (window.innerWidth >= 768) {
		$(".tab_m > div").click(function () {
			var tabGroup = $(this).parent().parent();
			var tabMenuGroup = tabGroup.find(".tab_m > div");

			tabMenuGroup.removeClass("active");
			$(this).addClass("active");

			var index = tabMenuGroup.index(this);

			tabGroup.find(".tab_c > div").addClass("hide");
			tabGroup.find(".tab_c > div:eq(" + index + ")").css('display', 'none').removeClass("hide").show();
			
		});
	} else {
		$(".tab_m > div").mouseenter(function () {
			var tabGroup = $(this).parent().parent();
			var tabMenuGroup = tabGroup.find(".tab_m > div");

			tabMenuGroup.removeClass("active");
			$(this).addClass("active");

			var index = tabMenuGroup.index(this);

			tabGroup.find(".tab_c > div").addClass("hide");
			tabGroup.find(".tab_c > div:eq(" + index + ")").css('display', 'none').removeClass("hide").fadeIn(500);
		});
	}
	
	/* Header Fixed Scroll */
	$(document).resize(function() {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 10) {
				$('header').addClass('header_fixed');
				$('main,footer').addClass('main_fixed');
			} else {
				$('header').removeClass('header_fixed');
				$('main,footer').removeClass('main_fixed');
			}
		});
	});
	
	
})



	
