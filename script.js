function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loader() {
  tl = gsap.timeline();

  gsap.to(".loader", {
    y: "-100%",
    duration: 1,
    delay: 2,
  });

  gsap.to(".cover", {
    opacity: 1,
    duration: 1,
    delay: 1,
  });
}
function page1Animation() {
  let typeSplit = new SplitType(".hero h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  let typeSplit2 = new SplitType(".hero p", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".hero h1 .word", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 3,
    ease: "power1.out",
  });

  gsap.from(".hero p .line", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 3.5,
    ease: "power1.out",
  });
}
function page2Animation() {
  let page2 = document.querySelector(".page2");
  let videoC = document.querySelector(".video-container");
  let video = document.querySelector(".video-container video");
  let flag = 0;

  let typeSplit = new SplitType(".hero2 h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".hero2 h1 .char", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 40%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".msg h1", {
    x: "-45%",
    duration: 5,
    ease: "none",
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 40%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });

  page2.addEventListener("mouseenter", function () {
    gsap.to(".watch", {
      opacity: 1,
      scale: 1,
    });
  });

  page2.addEventListener("mousemove", function (dets) {
    gsap.to(".watch", {
      x: dets.x - 100,
      y: dets.y - 800,
    });
  });

  page2.addEventListener("mouseleave", function () {
    gsap.to(".watch", {
      opacity: 0,
      scale: 0,
    });
  });

  videoC.addEventListener("mouseenter", function () {
    gsap.to(".watch", {
      opacity: 0,
      scale: 0,
    });
    gsap.to(".pause", {
      opacity: 1,
      scale: 1,
    });
  });

  videoC.addEventListener("mousemove", function (dets) {
    gsap.to(".pause", {
      x: dets.x - 100,
      y: dets.y - 800,
    });
  });

  videoC.addEventListener("mouseleave", function () {
    gsap.to(".pause", {
      opacity: 0,
      scale: 0,
    });
    gsap.to(".watch", {
      opacity: 1,
      scale: 1,
    });
  });

  page2.addEventListener("click", function () {
    if (flag == 0) {
      gsap.to(videoC, {
        height: "100vh",
        onComplete: video.play(),
      });
      flag = 1;
    } else {
      gsap.to(videoC, {
        height: "0vh",
        onComplete: video.load(),
      });
      flag = 0;
    }
  });
}
function page3Animation() {
  let typeSplit1 = new SplitType(".story h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  let typeSplit2 = new SplitType(".story p", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".story h1 .char", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 20%",
      end: "top 10%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.from(".story p .line", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 20%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".first", {
    height: "50vh",
    width: "25%",
    transform: "translateY(0%) rotate(0deg)",
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 0%",
      end: "top -10%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".second", {
    height: "50vh",
    width: "25%",
    transform: "translateY(0%) rotate(0deg)",
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top -0%",
      end: "top -10%",
      // markers: true,
      scrub: true,
    },
  });
}
function page4Animation() {
  let typeSplit1 = new SplitType(".play h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  let typeSplit2 = new SplitType(".play p", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".play h1 .char", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 20%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.from(".play p .line", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 0%",
      end: "top -10%",
      // markers: true,
      scrub: true,
    },
  });
  gsap.to(".img-div, .img2-div", {
    x: "-50%",
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 10%",
      end: "top -10%",
      scrub: true,
      // markers: true,
    },
  });

  gsap.to(".img3-div, .img4-div", {
    x: "40%",
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 10%",
      end: "top -10%",
      scrub: true,
      // markers: true,
    },
  });
}
function page5Animation() {
  let typeSplit1 = new SplitType(".coming h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  let typeSplit2 = new SplitType(".coming p", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".coming h1 .char", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 20%",
      end: "top 10%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.from(".coming p .line", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 10%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".inside", {
    transform: "translate(0%, 0%) rotate(0deg)",
    opacity: 1,
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top -15%",
      end: "top -30%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".overlayImg", {
    height: "40vh",
    width: "50%",
    transform: "rotate(0deg)",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top -30%",
      end: "top -50%",
      // markers: true,
      scrub: true,
    },
  });
}
function page5Animation2() {
  let typeSplit1 = new SplitType(".overlay h1", {
    types: "lines, words, chars",
    tagName: "span",
  });

  let typeSplit2 = new SplitType(".overlay p", {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from(".overlay h1 .char", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top -50%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.from(".overlay p .line", {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top -60%",
      end: "top -70%",
      // markers: true,
      scrub: true,
    },
  });

  gsap.to(".overlay button", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top -70%",
      end: "top -75%",
      // markers: true,
      scrub: true,
    },
  });
}
function page6Animation() {
  gsap.to(".rotateDiv", {
    transform: "rotate(0deg) translate(0%, 0%)",
    scrollTrigger: {
      trigger: ".page6",
      scroller: ".main",
      start: "top 10%",
      end: "top 0%",
      // markers: true,
      scrub: true,
    },
  });
}
function tilt(){
  // script.js
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".tilt-image");

  images.forEach((image) => {
    image.addEventListener("mousemove", (e) => {
      const { width, height, top, left } = image.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const xPercent = x / width;
      const yPercent = y / height;

      const xRotation = (yPercent - 0.5) * 50; // Adjust max tilt degree
      const yRotation = (xPercent - 0.5) * -50; // Adjust max tilt degree

      image.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });
});
}
loco();
loader();
page1Animation();
page2Animation();
page3Animation();
page4Animation();
page5Animation();
page5Animation2();
page6Animation();
tilt();

