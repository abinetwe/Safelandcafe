//==================================================
// SUNNY BURGER & JUICE BAR
// script.js
// Navigation • UI Interactions • Hero Slider • Counters
//==================================================

//==============================
// PAGE LOADER
//==============================

document.addEventListener("DOMContentLoaded",()=>{
  const loader = document.getElementById("loader");
  if(loader){
    setTimeout(()=>{
      loader.style.opacity="0";
      loader.style.visibility="hidden";
    }, 1200);
  }
});

//==============================
// STICKY NAVBAR
//==============================

const header = document.getElementById("header");

window.addEventListener("scroll",()=>{
  if(window.scrollY > 80){
    header?.classList.add("scrolled");
  }
  else{
    header?.classList.remove("scrolled");
  }
});

//==============================
// MOBILE MENU (SLIDE FROM RIGHT)
//==============================

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.getElementById("navOverlay");

function closeMobileMenu(){
  hamburger?.classList.remove("active");
  navLinks?.classList.remove("active");
  navOverlay?.classList.remove("active");
  document.body.style.overflow="";
}

function openMobileMenu(){
  hamburger?.classList.add("active");
  navLinks?.classList.add("active");
  navOverlay?.classList.add("active");
  document.body.style.overflow="hidden";
}

hamburger?.addEventListener("click",()=>{
  if(navLinks.classList.contains("active")){
    closeMobileMenu();
  }
  else{
    openMobileMenu();
  }
});

navOverlay?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>{
    closeMobileMenu();
  });
});

document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    closeMobileMenu();
  }
});

//==============================
// SMOOTH SCROLL
//==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    const href = this.getAttribute("href");
    if(href === "#") return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior:"smooth" });
    }
  });
});

//==============================
// CUSTOM CURSOR
//==============================

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove",(e)=>{
  if(cursor){
    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";
  }
  if(cursor2){
    cursor2.style.left = e.clientX+"px";
    cursor2.style.top = e.clientY+"px";
  }
});

document.querySelectorAll("a,button,.food-card,.category-card").forEach(item=>{
  item.addEventListener("mouseenter",()=>{
    cursor2?.classList.add("hover");
  });
  item.addEventListener("mouseleave",()=>{
    cursor2?.classList.remove("hover");
  });
});

//==============================
// HERO IMAGE SLIDER
//==============================

const heroSlides = document.querySelectorAll(".hero-slide");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const sliderDotsWrap = document.getElementById("sliderDots");

let currentSlide = 0;
let sliderTimer = null;
const SLIDE_INTERVAL = 4000;

function buildDots(){
  if(!sliderDotsWrap) return;
  sliderDotsWrap.innerHTML = "";
  heroSlides.forEach((_, i)=>{
    const dot = document.createElement("span");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", ()=> goToSlide(i));
    sliderDotsWrap.appendChild(dot);
  });
}

function updateDots(){
  if(!sliderDotsWrap) return;
  [...sliderDotsWrap.children].forEach((dot,i)=>{
    dot.classList.toggle("active", i === currentSlide);
  });
}

function showSlide(index, direction){
  if(heroSlides.length === 0) return;
  heroSlides.forEach(slide=>{
    slide.classList.remove("active","slide-in-right","slide-in-left");
  });
  const slide = heroSlides[index];
  slide.classList.add("active");
  if(direction === "next"){
    slide.classList.add("slide-in-right");
  }
  else if(direction === "prev"){
    slide.classList.add("slide-in-left");
  }
  updateDots();
}

function goToSlide(index){
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  showSlide(currentSlide);
  restartAutoSlide();
}

function nextSlide(){
  const dir = "next";
  currentSlide = (currentSlide + 1) % heroSlides.length;
  showSlide(currentSlide, dir);
}

function prevSlide(){
  const dir = "prev";
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  showSlide(currentSlide, dir);
}

function restartAutoSlide(){
  if(sliderTimer) clearInterval(sliderTimer);
  sliderTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}

if(heroSlides.length > 0){
  buildDots();
  restartAutoSlide();
}

sliderNext?.addEventListener("click",()=>{
  nextSlide();
  restartAutoSlide();
});

sliderPrev?.addEventListener("click",()=>{
  prevSlide();
  restartAutoSlide();
});

//==============================
// TESTIMONIAL SLIDER
//==============================

const testimonials=[
  {
    name:"Abel T.",
    initials:"AT",
    review:"Sunny Ultra is massive and so worth it. Best burger in the area!",
    stars:5
  },
  {
    name:"Selam W.",
    initials:"SW",
    review:"Fast service and the fasting menu is genuinely delicious.",
    stars:5
  },
  {
    name:"Michael G.",
    initials:"MG",
    review:"The Meatlover pizza is loaded with toppings, amazing value.",
    stars:4
  }
];

const slider = document.getElementById("testimonialSlider");

let slideIndex=0;

function loadTestimonials(){
  if(!slider)return;
  slider.innerHTML="";
  testimonials.forEach(item=>{
    slider.innerHTML += `
      <div class="testimonial-card">
        <div class="customer">
          <div class="customer-avatar">${item.initials}</div>
          <h3>${item.name}</h3>
        </div>
        <div class="stars">${"⭐".repeat(item.stars)}</div>
        <p>${item.review}</p>
      </div>
    `;
  });
}

function autoSlide(){
  if(!slider)return;
  slideIndex++;
  if(slideIndex>=testimonials.length){
    slideIndex=0;
  }
  slider.style.transform=`translateX(-${slideIndex*380}px)`;
}

loadTestimonials();
setInterval(autoSlide, 4000);

//==============================
// SCROLL TO TOP
//==============================

const backTop = document.createElement("div");
backTop.className="back-top";
backTop.innerHTML=`<i class="fa-solid fa-arrow-up"></i>`;
document.body.appendChild(backTop);

window.addEventListener("scroll",()=>{
  if(window.scrollY>500){
    backTop.classList.add("active");
  }
  else{
    backTop.classList.remove("active");
  }
});

backTop.addEventListener("click",()=>{
  window.scrollTo({ top:0, behavior:"smooth" });
});

//==============================
// MESSAGE POPUP
//==============================

function showToast(text){
  let box = document.querySelector(".toast");
  if(!box){
    box = document.createElement("div");
    box.className="toast";
    document.body.appendChild(box);
  }
  box.innerHTML=text;
  box.classList.add("show");
  setTimeout(()=>{
    box.classList.remove("show");
  },3000);
}

//==============================
// LAZY IMAGE LOADING
//==============================

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("loaded");
      imageObserver.unobserve(entry.target);
    }
  });
});

images.forEach(img=>{
  imageObserver.observe(img);
});

//==============================
// ACTIVE NAV LINK
//==============================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const sectionTop = section.offsetTop-150;
    if(window.scrollY >= sectionTop){
      current = section.id;
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href") == "#"+current){
      link.classList.add("active");
    }
  });
});

//==============================
// BUTTON RIPPLE EFFECT
//==============================

document.querySelectorAll(".btn").forEach(button=>{
  button.addEventListener("click",function(e){
    const ripple = document.createElement("span");
    ripple.className="ripple";
    const rect = this.getBoundingClientRect();
    ripple.style.left = e.clientX-rect.left+"px";
    ripple.style.top = e.clientY-rect.top+"px";
    this.appendChild(ripple);
    setTimeout(()=>{
      ripple.remove();
    },600);
  });
});
