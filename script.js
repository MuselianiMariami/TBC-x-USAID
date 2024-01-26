// DOM Elements
const header = document.querySelector('header');
const sideNavBtn = document.querySelector('button.nav-btn');
const overlayEl = document.querySelector('.overlay');
const clickEvent = new Event('click');
const partnersSlider = document.querySelector('.partners-slider');
const partnersSection = document.querySelector('section#partners');
const partnersContainer = document.querySelector('.partners-container');
const detailsElements = document.querySelectorAll('details');

//Sticky Header
const handleScroll = () => {
  header.classList.toggle('opacity', window.scrollY > 20 || document.documentElement.scrollTop > 20);
};
window.addEventListener('scroll', handleScroll);

// Burger and Overlay
const NavBtnClickDelay = () => {
  sideNavBtn.disabled = true;
  setTimeout(() => {
    sideNavBtn.disabled = false;
  }, 500);
};

overlayEl.addEventListener('click', () => {
  sideNavBtn.dispatchEvent(clickEvent);
});

sideNavBtn.addEventListener('click', () => {
  if (sideNavBtn.classList.contains('toggled')) {
    const sideNav = document.querySelector('nav:has(button.toggled) .nav-links');
    sideNav.classList.add('hideSideNav');

    setTimeout(() => {
      sideNavBtn.classList.remove('toggled');
      sideNav.classList.remove('hideSideNav');
    }, 300);
  } else {
    sideNavBtn.classList.toggle('toggled');
  }

  NavBtnClickDelay();
});

// Slider
let p = 0;

const changeLogos = () => {
  //HIDE PREVIOUS LOGOS
  const prevLogos = partnersSlider.firstElementChild;
  prevLogos.classList.add('hide');
  prevLogos.classList.remove('show');

  setTimeout(() => {
    partnersSlider.removeChild(prevLogos);
  }, 1300);

  //SHOW NEW LOGOS
  const newPartnersLogos = document.createElement('div');
  newPartnersLogos.classList.add('partners-logos');
  newPartnersLogos.classList.add('show');

  for (let i = p * 3; i < p * 3 + 3; ++i) {
    const imgEl = document.createElement('img');
    if (i === 6)
      imgEl.classList.add('centered');
    if (i < 7) {
      imgEl.src = `img/partners/logo-${i + 1}.png`;
      newPartnersLogos.append(imgEl);
    }
  }
  partnersSlider.prepend(newPartnersLogos);
};

let sliderInterval;

const setSliderInterval = () => {
  sliderInterval = setInterval(() => {
    if (p === 2) p = 0;
    else p++;
    changeLogos(p);
  }, 3000);
};

setSliderInterval();

const clickDelay = () => {
  sliderBtns.forEach(btn => btn.disabled = true);

    setTimeout(() => {
      sliderBtns.forEach(btn => btn.disabled = false);
    }, 1000);
};

partnersSection.addEventListener('mouseenter', () => {
  clearInterval(sliderInterval);
});

partnersSection.addEventListener('mouseleave', () => {
  setSliderInterval();
});

partnersContainer.addEventListener('click', (e) => {

  if (e.target.id === 'arrow-right') {
    if (p == 2) p = 0;
    else p++;
  }
  else if (e.target.id === 'arrow-left') {
    if (p == 0) p = 2;
    else p--;
  }
  else if (e.target.id === 'slider-dot-0')
    p = 0;
  else if (e.target.id === 'slider-dot-1')
    p = 1;
  else if (e.target.id === 'slider-dot-2')
    p = 2;

  changeLogos(p);
  clickDelay();
});

// FAQ Section
detailsElements.forEach((targetDetail) => {
  targetDetail.addEventListener('click', () => {
    detailsElements.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute('open');
      }
    });
  });
});
