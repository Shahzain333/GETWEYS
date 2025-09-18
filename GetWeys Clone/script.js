// Get elements
const sidebarToggle = document.getElementById('sidebarToggle');
const desktopSidebar = document.getElementById('desktopSidebar');
const mobileSidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('overlay');
const closeDesktopSidebar = document.getElementById('closeDesktopSidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Function to close all sidebars and overlay
function closeAllSidebars() {
    desktopSidebar.classList.remove('open');
    mobileSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset mobile sidebar state when closing
    resetMobileSidebar();
}

// Function to reset mobile sidebar to initial state
function resetMobileSidebar() {
    // Close all open submenus
    document.querySelectorAll('.mobile-sidebar-menu > li.active, .mobile-sidebar-submenu-1 > li.active, .mobile-sidebar-submenu-2 > li.active')
    .forEach(item => {
        item.classList.remove('active');
    });
}

// Sticky navbar with transition
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('main-header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > header.offsetHeight) {
        header.style.transform = 'translateY(-100%)'; // hide header
        navbar.classList.add('sticky');
    } else {
        header.style.transform = 'translateY(0)'; // show header again
        navbar.classList.remove('sticky');
    }
});

// Toggle sidebar based on screen size
sidebarToggle.addEventListener('click', function() {
    if (window.innerWidth >= 769) {
        // Desktop view - toggle sidebar
        desktopSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        // Mobile view - show mobile sidebar with overlay
        mobileSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Reset mobile sidebar state when opening (in case it was previously used)
        if (mobileSidebar.classList.contains('open')) {
            resetMobileSidebar();
        }
    }
});

// Close desktop sidebar
closeDesktopSidebar.addEventListener('click', function() {
    closeAllSidebars();
});

// Close mobile sidebar
closeSidebar.addEventListener('click', function() {
    closeAllSidebars();
});

// Close sidebar when clicking on overlay
overlay.addEventListener('click', function() {
    closeAllSidebars();
});

// Close sidebar when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllSidebars();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // If resizing to a different size, close any open sidebars
    if ((window.innerWidth >= 769 && mobileSidebar.classList.contains('open')) ||
        (window.innerWidth < 769 && desktopSidebar.classList.contains('open')) || 
        (window.innerWidth >= 425 && mobileSidebar.classList.contains('open')) || 
        (window.innerWidth < 425 && mobileSidebar.classList.contains('open'))) {

        closeAllSidebars();
    
    }
});

// Toggle mobile sidebar submenus
document.querySelectorAll('.mobile-sidebar-menu > li').forEach(item => {
    
    const link = item.querySelector('a');
    const submenu = item.querySelector('.mobile-sidebar-submenu-1');
    
    if (submenu) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other open submenus at the same level
            document.querySelectorAll('.mobile-sidebar-menu > li.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// Toggle nested submenus in mobile sidebar (level 2)
document.querySelectorAll('.mobile-sidebar-submenu-1 > li').forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('.mobile-sidebar-submenu-2');
    
    if (submenu) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other open submenus at the same level
            const parentList = item.parentElement;
            parentList.querySelectorAll('li.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// Toggle nested submenus in mobile sidebar (level 3)
document.querySelectorAll('.mobile-sidebar-submenu-2 > li').forEach(item => {
    
    const link = item.querySelector('a');
    const submenu = item.querySelector('.mobile-sidebar-submenu-3');
    
    if (submenu) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other open submenus at the same level
            const parentList = item.parentElement;
            parentList.querySelectorAll('li.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
    
});


// ========================== projects ======================================

// document.addEventListener("DOMContentLoaded", () => {
//   const slider = document.getElementById("portfolio-cards-container");
//   const dotsContainer = document.getElementById("portfolio-dots");

//   const cardsPerView = 3;                // visible cards
//   const clonesCountDefault = cardsPerView; // number of clones on each side
//   let originalCount = 0;
//   let clonesCount = 0;
//   let cardWidth = 0;

//   // Drag state
//   let isDown = false;
//   let startX = 0;
//   let scrollLeft = 0;
//   let isDragging = false;
//   let preventClick = false;

//   // throttle helper
//   function throttle(fn, wait = 100) {
//     let last = 0;
//     return (...args) => {
//       const now = Date.now();
//       if (now - last >= wait) {
//         last = now;
//         fn(...args);
//       }
//     };
//   }

//   // --- Setup infinite clones --- 
//   // Run once on initial load. We clone `clonesCount` cards to head and tail.
//   function createClones() {
//     // Avoid recreating clones if already created
//     // Determine original elements BEFORE cloning
//     const currentCards = Array.from(slider.querySelectorAll(".portfolio-card"));
//     // If clones are already present (we will detect by data-clone attribute), do nothing
//     const hasClones = currentCards.some(c => c.dataset.clone === "true");
//     if (hasClones) return;

//     originalCount = currentCards.length;
//     if (originalCount === 0) return;

//     clonesCount = Math.min(clonesCountDefault, originalCount);

//     // prepare fragments
//     const prependFrag = document.createDocumentFragment();
//     const appendFrag = document.createDocumentFragment();

//     // clone last N for prepend (preserve order)
//     for (let i = originalCount - clonesCount; i < originalCount; i++) {
//       const n = currentCards[i].cloneNode(true);
//       n.dataset.clone = "true";
//       prependFrag.appendChild(n);
//     }

//     // clone first N for append
//     for (let i = 0; i < clonesCount; i++) {
//       const n = currentCards[i].cloneNode(true);
//       n.dataset.clone = "true";
//       appendFrag.appendChild(n);
//     }

//     // insert prepend at the beginning and append at the end
//     slider.insertBefore(prependFrag, slider.firstChild);
//     slider.appendChild(appendFrag);
//   }

//   // compute card width including margin-left + margin-right
//   function computeCardWidth() {
//     const allCards = slider.querySelectorAll(".portfolio-card");
//     if (!allCards.length) return 0;
//     const card = allCards[0];
//     const style = window.getComputedStyle(card);
//     const marginLeft = parseFloat(style.marginLeft) || 0;
//     const marginRight = parseFloat(style.marginRight) || 0;
//     return Math.round(card.offsetWidth + marginLeft + marginRight);
//   }

//   // Build dots for pages (grouped by cardsPerView)
//   function buildDots() {
//     const pages = Math.ceil(originalCount / cardsPerView);
//     dotsContainer.innerHTML = "";
//     for (let i = 0; i < pages; i++) {
//       const d = document.createElement("div");
//       d.className = "portfolio-dots";
//       d.dataset.index = i;
//       if (i === 0) d.classList.add("active");
//       dotsContainer.appendChild(d);
//       d.addEventListener("click", () => {
//         goToPage(i);
//       });
//     }
//   }

//   function setActiveDot(pageIndex) {
//     const dots = Array.from(dotsContainer.querySelectorAll(".portfolio-dots"));
//     dots.forEach((dot, i) => dot.classList.toggle("active", i === pageIndex));
//   }

//   // convert a raw index in the full (cloned) list to real original index
//   function rawToReal(rawIndex) {
//     // rawIndex = index in slider children (0 .. total-1)
//     // realIndex = (rawIndex - clonesCount) mod originalCount
//     let r = rawIndex - clonesCount;
//     r %= originalCount;
//     if (r < 0) r += originalCount;
//     return r;
//   }

//   // convert real index to raw index in cloned list (pointing to the central/original area)
//   function realToRaw(realIndex) {
//     return clonesCount + (realIndex % originalCount);
//   }

//   // snap logic after drag: snap to nearest card and correct clones
//   function snapToNearest() {
//     const allCards = slider.querySelectorAll(".portfolio-card");
//     if (allCards.length === 0) return;
//     cardWidth = computeCardWidth();
//     const rawNearest = Math.round(slider.scrollLeft / cardWidth);
//     // smooth snap to the nearest raw position first
//     const targetPos = rawNearest * cardWidth;
//     slider.scrollTo({ left: targetPos, behavior: "smooth" });

//     // determine real index for dot update
//     const realIndex = rawToReal(rawNearest);
//     const pageIndex = Math.floor(realIndex / cardsPerView);
//     setActiveDot(pageIndex);

//     // after smooth completes, if we landed in clone area, jump instantly to the equivalent real item
//     // use timeout slightly larger than the smooth duration
//     setTimeout(() => {
//       // recalc nearest after animation finish
//       const nowRaw = Math.round(slider.scrollLeft / cardWidth);
//       if (nowRaw < clonesCount) {
//         // in prepended clones -> jump forward by originalCount
//         const newRaw = nowRaw + originalCount;
//         slider.scrollLeft = newRaw * cardWidth; // instant
//       } else if (nowRaw >= clonesCount + originalCount) {
//         // in appended clones -> jump back by originalCount
//         const newRaw = nowRaw - originalCount;
//         slider.scrollLeft = newRaw * cardWidth; // instant
//       }
//     }, 350);
//   }

//   // Jump to a specific page (group of cardsPerView)
//   function goToPage(pageIndex) {
//     if (originalCount === 0) return;
//     cardWidth = computeCardWidth();
//     const targetReal = pageIndex * cardsPerView; // first card index of that page (real)
//     const targetRaw = realToRaw(targetReal);
//     slider.scrollTo({ left: targetRaw * cardWidth, behavior: "smooth" });
//     setActiveDot(pageIndex);

//     // ensure we are on canonical real area after animation
//     setTimeout(() => {
//       const nowRaw = Math.round(slider.scrollLeft / cardWidth);
//       if (nowRaw < clonesCount) {
//         slider.scrollLeft = (nowRaw + originalCount) * cardWidth;
//       } else if (nowRaw >= clonesCount + originalCount) {
//         slider.scrollLeft = (nowRaw - originalCount) * cardWidth;
//       }
//     }, 350);
//   }

//   // update dot while scrolling (throttled)
//   const updateActiveDotOnScroll = throttle(() => {
//     const allCards = slider.querySelectorAll(".portfolio-card");
//     if (allCards.length === 0) return;
//     cardWidth = computeCardWidth();
//     const rawIndex = Math.round(slider.scrollLeft / cardWidth);
//     const realIndex = rawToReal(rawIndex);
//     const pageIndex = Math.floor(realIndex / cardsPerView);
//     setActiveDot(pageIndex);
//   }, 80);

//   // Prevent image native dragging and suppress click right after drag
//   function wireImageHandlers() {
//     slider.querySelectorAll("img").forEach((img) => {
//       img.setAttribute("draggable", "false");
//       img.addEventListener("click", (e) => {
//         if (preventClick) {
//           e.preventDefault();
//           e.stopImmediatePropagation();
//           preventClick = false;
//         }
//       });
//     });
//   }

//   // --- Event bindings for dragging & touch ---
//   function bindDragHandlers() {
//     // hover cursor
//     slider.addEventListener("mouseenter", () => slider.classList.add("grab"));
//     slider.addEventListener("mouseleave", () => {
//       slider.classList.remove("grab");
//       slider.classList.remove("grabbing");
//     });

//     // mouse
//     slider.addEventListener("mousedown", (e) => {
//       isDown = true;
//       isDragging = false;
//       startX = e.pageX - slider.offsetLeft;
//       scrollLeft = slider.scrollLeft;
//       slider.classList.add("grabbing");
//     });

//     document.addEventListener("mouseup", () => {
//       if (!isDown) return;
//       isDown = false;
//       slider.classList.remove("grabbing");
//       if (isDragging) {
//         preventClick = true;
//         snapToNearest();
//       }
//     });

//     slider.addEventListener("mousemove", (e) => {
//       if (!isDown) return;
//       e.preventDefault();
//       const x = e.pageX - slider.offsetLeft;
//       const walk = (x - startX) * 1.5; // speed multiplier
//       if (Math.abs(walk) > 5) isDragging = true;
//       slider.scrollLeft = scrollLeft - walk;
//     });

//     // touch
//     slider.addEventListener("touchstart", (e) => {
//       const t = e.touches[0];
//       isDown = true;
//       isDragging = false;
//       startX = t.pageX - slider.offsetLeft;
//       scrollLeft = slider.scrollLeft;
//     }, { passive: true });

//     slider.addEventListener("touchmove", (e) => {
//       if (!isDown) return;
//       const t = e.touches[0];
//       const x = t.pageX - slider.offsetLeft;
//       const walk = (x - startX) * 1.5;
//       if (Math.abs(walk) > 5) isDragging = true;
//       slider.scrollLeft = scrollLeft - walk;
//     }, { passive: false });

//     slider.addEventListener("touchend", () => {
//       isDown = false;
//       if (isDragging) {
//         preventClick = true;
//         snapToNearest();
//       }
//     });

//     // update dots while scrolling
//     slider.addEventListener("scroll", updateActiveDotOnScroll);
//   }

//   // --- Initialize after images loaded ---
//   function waitForImagesThenInit() {
//     // create clones first (based on initial DOM)
//     createClones();

//     // wait for ALL images (including clones) to load
//     const imgs = Array.from(slider.querySelectorAll("img"));
//     if (imgs.length === 0) {
//       postInit();
//       return;
//     }

//     let loaded = 0;
//     imgs.forEach((img) => {
//       if (img.complete) {
//         loaded++;
//       } else {
//         img.addEventListener("load", () => {
//           loaded++;
//           if (loaded === imgs.length) postInit();
//         });
//         img.addEventListener("error", () => {
//           loaded++;
//           if (loaded === imgs.length) postInit();
//         });
//       }
//     });

//     if (loaded === imgs.length) postInit();
//   }

//   // After images loaded and clones created
//   function postInit() {
//     // compute sizes
//     cardWidth = computeCardWidth();
//     // set initial scroll to the "real" first card (skip prepended clones)
//     if (originalCount === 0) return;
//     slider.scrollLeft = clonesCount * cardWidth;

//     // build dots for pages and wire images
//     buildDots();
//     wireImageHandlers();
//     bindDragHandlers();
//   }

//   // Recalculate on resize (recompute cardWidth and reposition to equivalent real index)
//   window.addEventListener("resize", () => {
//     // recompute widths and realign current view to central original area
//     const allCards = slider.querySelectorAll(".portfolio-card");
//     if (!allCards.length) return;
//     const oldCardWidth = cardWidth;
//     cardWidth = computeCardWidth();

//     // compute current real index and reposition to canonical raw index
//     const rawIndex = Math.round(slider.scrollLeft / (oldCardWidth || cardWidth));
//     const realIndex = rawToReal(rawIndex);
//     const canonicalRaw = realToRaw(realIndex);
//     slider.scrollLeft = canonicalRaw * cardWidth;
//   });

//   // Kick off initialization
//   waitForImagesThenInit();
// });

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper with infinite loop
    const swiper = new Swiper('#portfolio-slider', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        centeredSlides: false,
        
        // Disable default pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Responsive BreakPoints  
        breakpoints: {
            640: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
    
    // Custom pagination functionality
    const customBullets = document.querySelectorAll('.custom-bullet');
    
    customBullets.forEach(bullet => {
        bullet.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            
            // Remove active class from all bullets
            customBullets.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked bullet
            this.classList.add('active');
            
            // Move to the corresponding slide group (each group has 3 slides)
            swiper.slideTo(index * 3);
        });
    });
    
    // Update custom pagination when slide changes
    swiper.on('slideChange', function () {
        const realIndex = swiper.realIndex;
        const groupIndex = Math.floor(realIndex / 3) % 3; // 3 groups total
        
        // Remove active class from all bullets
        customBullets.forEach(b => b.classList.remove('active'));
        
        // Add active class to current group bullet
        customBullets[groupIndex].classList.add('active');
        
        // Update info text
        const infoText = document.querySelector('.portfolio-info');
        infoText.innerHTML = `Viewing group ${groupIndex + 1} of 3 | Slide to see more <span class="infinite-indicator">Infinite Scroll</span>`;
    });
    

});


// ========================= FAQS ===============================================
const accordians = document.querySelectorAll('.accordions');

accordians.forEach( (accordian) => {
    
    const icon = accordian.querySelectorAll('.qustion .icon');
    const question = accordian.querySelector('.question');
    const answer = accordian.querySelector('.answer');

    question.addEventListener('click', () =>{
        // Toggle active state
        answer.classList.toggle("active");

        // Change plus to minus
        if (icon.classList.contains("fa-plus")) {
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
        } else {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        }
    });
});



