import * as myFunctions from "./modules/functions.js";
import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import Swiper from 'swiper/bundle';
import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import AOS from 'aos';
import Typed from 'typed.js';

myFunctions.isWebp();
myFunctions.isTouch();
useDynamicAdapt();

const sideMenu = document.querySelector('.side-menu');
const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const sideMenuClose = document.querySelector('.side-menu__close');
const sideMenuLinks = sideMenu.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
  body.classList.add('noscroll');
})
sideMenuClose.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  body.classList.remove('noscroll');
})
sideMenuLinks.forEach(function (el) {
  el.addEventListener('click', () => {
    body.classList.remove('noscroll');
    sideMenu.classList.remove('open');
  })
})


const roomsSlider = new Swiper('.rooms .swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

const tabBtns = document.querySelectorAll('.rooms__tabs-btn');
const tabItems = document.querySelectorAll('.rooms__tabs-content-box');

tabBtns.forEach(function (item) {
  item.addEventListener('click', function () {
    let tabId = item.getAttribute('data-tab');
    let currentContent = document.querySelector(tabId);
    tabBtns.forEach(function (item) {
      item.classList.remove('active');
    });
    item.classList.add('active');
    tabItems.forEach(function (el) {
      el.classList.remove('active');
    });
    currentContent.classList.add('active');
  });
});

const feedbackSlider = new Swiper('.feedback .swiper', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
      centeredSlides: true,
    },
  }

});

const popupBtns = document.querySelectorAll('.popup-btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const modalWrap = document.querySelector('.modal-wrap');


popupBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');
    let modalColor = e.currentTarget.dataset.color;
    const modalColorText = document.querySelector('.room-color');

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');

    if (e.currentTarget.hasAttribute('data-color')) {
      document.querySelector(`[data-target="${path}"]`).classList.add(`modal--${modalColor}`);
      modalColorText.textContent = modalColor;
    }

    modalOverlay.classList.add('modal-overlay--visible');
    body.classList.add('noscroll');

    const closeIcons = document.querySelectorAll('.close-icon');
    closeIcons.forEach(el => {
      el.addEventListener('click', () => {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
          el.classList.remove('modal--visible');
          el.classList.remove(`modal--${modalColor}`);
          body.classList.remove('noscroll');
        });
      })
    })

    modalWrap.addEventListener('click', (e) => {

      if (e.target == modalWrap) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
          el.classList.remove('modal--visible');
          el.classList.remove(`modal--${modalColor}`);
          body.classList.remove('noscroll');
        });
      }
    });

  });
});

const selector = document.querySelectorAll('input[type="tel"]');
const im = new Inputmask("+380 (\\099) 999-99-99");
im.mask(selector);

const validator = new JustValidate('.modal-reserve__form');
validator
  .addField('.modal-reserve__input--name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не менее 3 символов',
    },
  ])

  .addField('.modal-reserve__input--phone', [
    {
      rule: 'required',
      errorMessage: 'Введите телефон',
    },
    {
      rule: 'function',
      validator: function () {
        const phone = document.querySelector('.modal-reserve__input--phone').inputmask.unmaskedvalue();
        return phone.length === 9;
      },
      errorMessage: 'Введите корректный номер телефона',
    },
  ])

  .onSuccess((event) => {
    event.target.reset();
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      body.classList.remove('noscroll');
      el.classList.remove(...[...el.classList].filter(n => n.indexOf('modal--') !== -1))
    })
  });

AOS.init({
  disable: 'mobile',
});

const typedText = document.querySelector('.hero__title').textContent;

const typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 50,
  showCursor: false,
});


console.log(typedText);
