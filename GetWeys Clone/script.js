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