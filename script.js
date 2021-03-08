document.addEventListener('DOMContentLoaded',function(){
    var header = document.querySelector('header'),
        top = document.querySelector('.top a'),
        menuOpen = document.querySelector('.menu_etc .menu_button a'),
        slideImges = document.querySelectorAll('.main_slideImg div'),
        pagerImages = document.querySelectorAll('.pager span'),
        progressBar = document.querySelector('.slide_duration_bar span'),
        membershipTop = document.getElementById('membership'),
        membershipEventTop = membershipTop.offsetTop - 200,
        membershipCard = document.querySelectorAll('.membership_card'),
        membershipCardLeft = document.querySelectorAll('.membership_card .card_left'),
        membershipCardRight = document.querySelectorAll('.membership_card .card_right'),
        membershipItem = document.querySelectorAll('.membership_wrap > div'),
        membershipPrev = document.querySelectorAll('.membership_prev'),
        membershipNext = document.querySelectorAll('.membership_next'),
        eventButtonPrev = document.querySelector('.event_prev'),
        eventButtonNext = document.querySelector('.event_next'),
        eventsWrap = document.querySelector('.events_wrap'),
        events = document.querySelector('.events'),
        eventItem = document.querySelectorAll('.event_item'),
        eventMain = document.querySelector('.event_main'),
        eventItemLen = eventItem.length,
        eventItemWidth = 440,
        slideIdx = 0,
        membershipIdx = 0,
        eventsMainIdx = 3,
        playSlide;

    
    function width_Desktop_header(){
        console.log(this.pageYOffset);
    console.log(membershipTop.offsetTop);
        if(pageYOffset >= membershipTop.offsetTop) {
            header.classList.remove('header_static');
            header.classList.add('header_scroll');
        } else{
            header.classList.remove('header_scroll');
            header.classList.remove('header_menu_open');
            header.classList.add('header_static');
        }
    }

    start();
    $(window).resize(function(){
        if($(window).width() > 1383){
            width_Desktop_header();
            window.addEventListener('scroll', width_Desktop_header);
        } else {
            header.classList.remove('header_static');
            header.classList.add('header_scroll');
            window.removeEventListener('scroll', width_Desktop_header);
        }
        for(var j = 0; j < membershipCardLeft.length; ++j){
            if($(window).width() > 1006) {
                membershipCardLeft[j].style.transform = "translateX(calc(-50% - 308px))";
                membershipCardRight[j].style.transform = "translateX(calc(-50% + 308px))";
            } else if($(window).width() > 750) {
                membershipCardLeft[j].style.transform = "translateX(calc(-50% - 150px))";
                membershipCardRight[j].style.transform = "translateX(calc(-50% + 150px))";
            } else if($(window).width() > 462) {
                membershipCardLeft[j].style.transform = "translateX(calc(-50% - 70px))";
                membershipCardRight[j].style.transform = "translateX(calc(-50% + 70px))";
            }
        }
    })

    menuOpen.addEventListener('click', function(ev){
        ev.preventDefault();
        header.classList.toggle('header_menu_open');
    })

    top.addEventListener('click', function(ev){
        ev.preventDefault();
        window.scroll({
            behavior: 'smooth',
            top: 0
        });
    });

    function start() {
        if($(window).width() > 1383) {
            width_Desktop_header();
        } else {
            header.classList.remove('header_static');
            header.classList.add('header_scroll');
        }
        playSlide = setInterval(function() {
        if(slideIdx == 4) {
            slideIdx = -1;
        }
        slideIdx += 1;
        for(var i = 0; i < slideImges.length; i++) {
            slideImges[i].classList.remove('active');
            pagerImages[i].classList.remove('active');
        }
        slideImges[slideIdx].classList.add('active');
        pagerImages[slideIdx].classList.add('active');
        }, 5120);
    }

    for(var i = 0; i < pagerImages.length; ++i) {
        pagerImages[i].addEventListener('click', function(e){
            clearInterval(playSlide);
            progressBar.classList.remove('startBar');
            void progressBar.offsetWidth;
            progressBar.classList.add('startBar');
            slideIdx = parseInt(e.target.innerText);
            for(var j = 0; j < slideImges.length; j++) {
                slideImges[j].classList.remove('active');
                pagerImages[j].classList.remove('active');
            }
            slideImges[slideIdx].classList.add('active');
            pagerImages[slideIdx].classList.add('active');
            start();
        });
    }

    console.log($(window).width());

    window.addEventListener('scroll', function(){
        if(this.pageYOffset > membershipEventTop){
            for(var i = 0; i < membershipCard.length; ++i){
                membershipCard[i].style.opacity = 1;
                for(var j = 0; j < membershipCardLeft.length; ++j){
                    if($(window).width() > 1006) {
                        membershipCardLeft[j].style.transform = "translateX(calc(-50% - 308px))";
                        membershipCardRight[j].style.transform = "translateX(calc(-50% + 308px))";
                    } else if($(window).width() > 750) {
                        membershipCardLeft[j].style.transform = "translateX(calc(-50% - 150px))";
                        membershipCardRight[j].style.transform = "translateX(calc(-50% + 150px))";
                    } else if($(window).width() > 462) {
                        membershipCardLeft[j].style.transform = "translateX(calc(-50% - 70px))";
                        membershipCardRight[j].style.transform = "translateX(calc(-50% + 70px))";
                    }
                }
            }
        }
    })
    
    for(var i = 0; i < membershipItem.length; ++i){
        membershipPrev[i].addEventListener('click', function(){
            if(membershipIdx == 0){
                membershipIdx = 2;
            } else{
                membershipIdx -= 1;
            }
            for(var j = 0; j < membershipItem.length; ++j){
                membershipItem[j].classList.remove('active');
            }
            membershipItem[membershipIdx].classList.add('active');
        })
    }

    for(var i = 0; i < membershipItem.length; ++i){
        membershipNext[i].addEventListener('click', function(){
            if(membershipIdx == 2){
                membershipIdx = 0;
            } else{
                membershipIdx += 1;
            }
            for(var j = 0; j < membershipItem.length; ++j){
                membershipItem[j].classList.remove('active');
            }
            membershipItem[membershipIdx].classList.add('active');
        })
    }
    events.style.width = eventItemWidth * eventItemLen + "px";

    eventButtonPrev.addEventListener("click", function(){
        eventItem[eventsMainIdx].classList.remove('event_main');
        if(eventsMainIdx == 3){
            eventsMainIdx = eventItemLen-4;
            eventItem[eventsMainIdx].classList.add('event_main');
            events.style.transition = "none";
            events.style.left = "calc(50% - 5940px)";
            void events.offsetWidth;
            events.style.transition = ".35s";
            events.style.left = "calc(50% - 5500px)";
            
        } else{
            eventsMainIdx -= 1;
            eventItem[eventsMainIdx].classList.add('event_main');
            events.style.left = "calc(50% - 220px - 440 * (" + eventsMainIdx + "px)";
        }
    })

    eventButtonNext.addEventListener("click", function(){
        eventItem[eventsMainIdx].classList.remove('event_main');
        if(eventsMainIdx == eventItemLen-4){
            eventsMainIdx = 3;
            eventItem[eventsMainIdx].classList.add('event_main');
            events.style.transition = "none";
            events.style.left = "calc(50% - 1100px)";
            void events.offsetWidth;
            events.style.transition = ".35s";
            events.style.left = "calc(50% - 1540px)";
            
        } else{
            eventsMainIdx += 1;
            eventItem[eventsMainIdx].classList.add('event_main');
            events.style.left = "calc(50% - 220px - 440 * (" + eventsMainIdx + "px)";
        }
    })
});