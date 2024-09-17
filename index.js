// smooth scrollbar 




// video playing speed 
let vid = document.getElementById("grid-lines");
vid.playbackRate = 0.8;


// changing images on hover on project section 

const projectImages = document.querySelectorAll('.project img');
const projectData = [
    {
        images: [
            'Resources/Images/The Prexi (3).webp',
            'Resources/Images/The Prexi (1).webp',
            'Resources/Images/The Prexi (2).webp',
            'Resources/Images/The Prexi (4).webp'
        ]
    },
    {
        images: [
            'Resources/Images/eTrustScore (1).webp',
            'Resources/Images/eTrustScore (2).webp',
            'Resources/Images/eTrustScore (3).webp',
            'Resources/Images/eTrustScore (4).webp'
        ]
    },
    {
        images: [
            'Resources/Images/Alchemy-Interiors (4).webp',
            'Resources/Images/Alchemy-Interiors (1).webp',
            'Resources/Images/Alchemy-Interiors (2).webp',
            'Resources/Images/Alchemy-Interiors (3).webp'
        ]
    },
    {
        images: [
            'Resources/Images/MoonShine Golf (1).webp',
            'Resources/Images/MoonShine Golf (2).webp',
            'Resources/Images/MoonShine Golf (3).webp',
            'Resources/Images/MoonShine Golf (4).webp'
        ]
    }
];

projectImages.forEach((projectImage, projectIndex) => {
    const project = projectImage.closest('.project');
    const images = projectData[projectIndex].images;
    let currentIndex = 0;
    let intervalId;

    project.addEventListener('mouseenter', () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            projectImage.src = images[currentIndex];
        }, 500); // Change image every 500ms
    });

    project.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        projectImage.src = images[0]; // Reset to original image
    });
});








// Dynamic Content  service section 
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-wrapper .service-container ul li');
    const simageurl = [
        "Resources/On hover images/figma.webp",
        "Resources/On hover images/webflow developement.webp",
        "Resources/On hover images/figma.webp",
        "Resources/On hover images/custom website.webp"
    ];

    const dynamicContent = document.getElementById('dynamic-content');
    let img = dynamicContent.querySelector('img');

    if (!img) {
        img = document.createElement('img');
        dynamicContent.appendChild(img);
    }
    
    let targetLeft = 0;
    let targetTop = 0;
    let animationFrameId = null;

    function updatePosition() {
        const currentLeft = parseFloat(dynamicContent.style.left) || 0;
        const currentTop = parseFloat(dynamicContent.style.top) || 0;

        const newLeft = currentLeft + (targetLeft - currentLeft) * 0.1;
        const newTop = currentTop + (targetTop - currentTop) * 0.1;

        dynamicContent.style.left = `${newLeft}px`;
        dynamicContent.style.top = `${newTop}px`;

        if (Math.abs(targetLeft - newLeft) > 0.5 || Math.abs(targetTop - newTop) > 0.2) {
            animationFrameId = requestAnimationFrame(updatePosition);
        } else {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
      }
    }

    serviceItems.forEach((item, index) => {
        item.addEventListener('mousemove', (e) => {
            targetLeft = e.clientX - 100;
            targetTop = e.clientY - 300;

            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updatePosition);
            }
        });

        item.addEventListener('mouseover', () => {
            img.src = simageurl[index];
            dynamicContent.classList.add('active');
        });

        item.addEventListener('mouseout', () => {
            dynamicContent.classList.remove('active');
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        });
    });

});

//comparison slider
const sliders = document.querySelectorAll(".image-comparison-slider");
sliders.forEach(slider => {
    const sliderImgWrapper = slider.querySelector(".img-wrapper");
    const sliderHandle = document.querySelector("#Splide__slider .handle");

    let isSliderLocked = false;

    slider.addEventListener("mouseenter", sliderMouseEnter);
    slider.addEventListener("mousemove", sliderMouseMove);
    slider.addEventListener("mouseleave", sliderMouseLeave);
    slider.addEventListener("touchstart", sliderTouchStart, { passive: true });
    slider.addEventListener("touchmove", sliderTouchMove, { passive: true });
    slider.addEventListener("touchend", sliderTouchEnd);

    function sliderMouseEnter() {
        isSliderLocked = false;
    }

    function sliderMouseMove(event) {
        if (isSliderLocked) return;
        const sliderRect = slider.getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const mouseX = event.clientX - sliderRect.left;
        updateSliderPosition(mouseX, sliderWidth);
    }

    function sliderMouseLeave() {
        isSliderLocked = true;
    }

    function sliderTouchStart(event) {
        isSliderLocked = false;
        sliderTouchMove(event);
    }

    function sliderTouchMove(event) {
        if (isSliderLocked) return;
        const touch = event.touches[0];
        const sliderRect = slider.getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const touchX = touch.clientX - sliderRect.left;
        updateSliderPosition(touchX, sliderWidth);
    }

    function sliderTouchEnd() {
        isSliderLocked = true;
    }

    function updateSliderPosition(positionX, sliderWidth) {
        const sliderHandleWidth = sliderHandle.clientWidth;
        let newPosition = (positionX / sliderWidth) * 100;
        newPosition = Math.max(0, Math.min(newPosition, 100));

        sliderImgWrapper.style.width = `${100 - newPosition}%`;
        sliderHandle.style.left = `calc(${newPosition}% - ${sliderHandleWidth / 2}px)`;
    }
});


// Adjust Height of the comparison slider

function handleSliderVisible(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {


      adjustSplideTrackHeight(entry.target);

    }
  });
}


const sliderObserver = new IntersectionObserver(handleSliderVisible, {
  root: null, 
  threshold: 0.1 
});


document.querySelectorAll('.image-comparison-slider').forEach(slider => {
  sliderObserver.observe(slider);
});


function adjustSplideTrackHeight(slider) {
  const sliderHeight = slider.offsetHeight;
  const splideTrack = slider.closest('.splide__track');
  if (splideTrack) {
    splideTrack.style.height = `${sliderHeight}px`;
  }
};


// playing lottie animation on feature section 
document.addEventListener('DOMContentLoaded', function() {
    const featureContents = document.querySelectorAll('.feature-content');
    const lottieFiles = document.querySelectorAll('.lottie-files');

    const lottiePaths = [
        'https://lottie.host/46a71eba-79c2-4135-a1f6-29e35a361382/48U1sxmVxA.json',
        'https://lottie.host/e220c615-5ccc-4400-9867-d810e2abfb6d/xZy6ombyjz.json',
        'https://lottie.host/5d2f2287-e157-437c-98ce-4336ec89b2d3/rypnq7sKYY.json',
        'https://lottie.host/c838b44c-1462-4e04-abfa-575758aa2585/9u5Vdk7lAR.json',
    ];

    featureContents.forEach((content, index) => {
            const animation = bodymovin.loadAnimation({
                wrapper: lottieFiles[index],
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: lottiePaths[index]
            });

            content.addEventListener('mouseenter', () => {
                animation.play();
            });

            content.addEventListener('mouseleave', () => {
                animation.stop();
            });
    });
});


// FAQ Accordion 
const accordionItems = document.querySelectorAll('#fq-section ul li');
accordionItems.forEach(item => {
    const accordionContent = item.querySelector('.fq-answers');
    item.addEventListener('click', () => { 
        item.classList.toggle('fq-onclick');
    });
});

//Animate on view


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const animateOnView = document.querySelectorAll('.hidden');
animateOnView.forEach((el) => observer.observe(el));


// // Toggle navigation on hamburger click
// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const navLinks = document.querySelector('.nav-links');

//     hamburger.addEventListener('click', () => {
//         navLinks.classList.toggle('nav-active');
//         hamburger.classList.toggle('toggle');
//     });
// });