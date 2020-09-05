const PRELOADER = document.getElementById('preloader');
const BODY = document.querySelector('body');


const setBodyToLoading = _ => {
    BODY.classList.add('loading');
}

/* const fadeEffect = setInterval(_ => {
    if (!PRELOADER.style.opacity) PRELOADER.style.opacity = 1;

    if (PRELOADER.style.opacity > 0) {
        PRELOADER.style.opacity -= .1
    } else {
        BODY.classList.remove('loading');
        clearInterval(fadeEffect);
    }
}, 50); */



setBodyToLoading();
BODY.classList.remove('loading');
PRELOADER.style.display = 'none';

//window.addEventListener('load', fadeEffect());