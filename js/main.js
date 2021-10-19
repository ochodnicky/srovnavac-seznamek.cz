(function () {
    "use strict";

    const header = document.querySelector(".header");
    const headerButton = document.querySelector(".header .button");

    function handleMenu() {

        let topOffset = window.pageYOffset || document.documentElement.scrollTop;
        if (topOffset > 1) {
            header.classList.add(
                'header--fixed'
            );
            headerButton.classList.remove(
                'button--outlineWhite'
            );
        } else {
            header.classList.remove(
                'header--fixed'
            );
            headerButton.classList.add(
                'button--outlineWhite'
            );
        }

    }
    document.addEventListener("scroll", handleMenu);
    handleMenu();

    function scrollTo() {
        const links = document.querySelectorAll('.scroll');
        links.forEach(each => (each.onclick = scrollAnchors));
    }

    function scrollAnchors(e, respond = null) {
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        e.preventDefault();
        var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        const header = document.querySelector('.header');
        const headerHeight = header.offsetHeight;
        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);
        window.scrollBy({
            top: originalTop - headerHeight + 1,
            left: 0,
            behavior: 'smooth'
        });
        const checkIfDone = setInterval(function () {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }

    scrollTo();
    
    tippy('[data-tippy-content]');

    $(document).ready(function () {
        $('.services').owlCarousel({
            items: 3,
            margin: 20,
            nav: true,
            navText: [],
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 30,
                },
                768: {
                    items: 2,
                    margin: 30,
                    
                },
                992: {
                    items: 3
                }
            },
            navContainer: '#owl-nav',
        });

        $('.table-carousel').owlCarousel({
            items: 3,
            margin: 0,
            nav: true,
            navText: [],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });


        $('.js-showServicesMore').click(function () {
            $('.services .service').toggleClass('opened');
        });
    });
})();