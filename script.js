// Mobile Menu Toggle
const Burger = document.querySelector('#Burger'); // Your burger icon
const nav_Mobile = document.querySelector('.nav_Mobile');

if (Burger && nav_Mobile) {
  Burger.addEventListener('click', function () {
    nav_Mobile.classList.toggle('-translate-x-full');
  });
}

// Submenu Data with Font Awesome Icons and URLs
const submenuData = {
  solutions: [
    { name: 'AI Agent', icon: 'fa-robot', url: 'agent.html' },
    { name: 'Client Portal', icon: 'fa-user-lock', url: 'portal.html' },
    { name: 'Deal Rooms', icon: 'fa-handshake', url: 'deal.html' },
    { name: 'Knowledge Base', icon: 'fa-book', url: 'knowledge.html' },
    { name: 'Project Management', icon: 'fa-diagram-project', url: 'management.html' }
  ],
  industries: [
    { name: 'Agencies', icon: 'fa-bullhorn', url: 'agencies.html' },
    { name: 'Consultants and Coaches', icon: 'fa-chalkboard-teacher', url: 'consultants.html' },
    { name: 'Design Agencies', icon: 'fa-paint-brush', url: 'design.html' },
    { name: 'Professional Services', icon: 'fa-briefcase', url: 'services.html' }
  ],
  resources: [
    { name: 'Blog', icon: 'fa-blog', url: 'blog.html' },
    { name: 'Contact Us', icon: 'fa-envelope', url: 'contact.html' },
    { name: 'Guides', icon: 'fa-map', url: 'guides.html' },
    { name: 'Roadmap', icon: 'fa-road', url: 'roadmap.html' }
  ]
};

// Submenu Slide Panel Logic
const menuLinks = document.querySelectorAll('.menu-link');
const mainPanel = document.getElementById('mainPanel');
const subPanel = document.getElementById('subPanel');
const subPanelTitle = document.getElementById('subPanelTitle');
const subPanelContent = document.getElementById('subPanelContent');
const backButton = document.getElementById('backButton');

if (menuLinks.length && mainPanel && subPanel && subPanelTitle && subPanelContent) {
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');
      const items = submenuData[target];

      if (!items) return;

      subPanelTitle.textContent = target.charAt(0).toUpperCase() + target.slice(1);

      subPanelContent.innerHTML = items
        .map(
          item => `
          <li>
            <a href="${item.url}" class="flex items-center">
              <i class="fa-solid ${item.icon} mr-2"></i> ${item.name}
            </a>
          </li>
        `
        )
        .join('');

      mainPanel.classList.replace('translate-x-0', '-translate-x-full');
      subPanel.classList.replace('translate-x-full', 'translate-x-0');
    });
  });
}

// Back button to return to main menu
if (backButton && mainPanel && subPanel) {
  backButton.addEventListener('click', () => {
    mainPanel.classList.replace('-translate-x-full', 'translate-x-0');
    subPanel.classList.replace('translate-x-0', 'translate-x-full');
  });
}

// Hover Dropdown Menus for Desktop
document.addEventListener("DOMContentLoaded", () => {
  const menus = [
    {
      trigger: document.getElementById("solutions-menu"),
      dropdown: document.querySelector(".sltMenu"),
    },
    {
      trigger: document.getElementById("industries-menu"),
      dropdown: document.querySelector(".indusMenu"),
    },
    {
      trigger: document.getElementById("resources-menu"),
      dropdown: document.querySelector(".rscMenu"),
    },
  ];

  let hideTimeout;

  menus.forEach(({ trigger, dropdown }) => {
    if (!trigger || !dropdown) return;

    const showMenu = () => {
      clearTimeout(hideTimeout);
      hideAllMenus();
      dropdown.classList.remove("hidden");
    };

    const hideMenu = () => {
      hideTimeout = setTimeout(() => {
        if (!dropdown.matches(":hover") && !trigger.matches(":hover")) {
          dropdown.classList.add("hidden");
        }
      }, 100);
    };

    trigger.addEventListener("mouseenter", showMenu);
    trigger.addEventListener("mouseleave", hideMenu);
    dropdown.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    dropdown.addEventListener("mouseleave", hideMenu);
  });

  function hideAllMenus() {
    document.querySelectorAll(".sltMenu, .indusMenu, .rscMenu").forEach(menu => {
      menu.classList.add("hidden");
    });
  }
});

// Tab Button Toggle & Tab Content Display
const container = document.getElementById('tab-buttons');
if (container) {
  const buttons = container.querySelectorAll('.tabs button');
  const tabContents = document.querySelectorAll('.portal, .agent');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      buttons.forEach(btn => {
        btn.classList.remove('bg-white', 'text-primary');
        btn.classList.add('text-white');
      });
      button.classList.add('bg-white', 'text-primary');
      button.classList.remove('text-white');

      tabContents.forEach(tab => tab.classList.add('hidden'));
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });
}

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal-on-scroll');

if (revealElements.length) {
  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-x-[100px]');
        entry.target.classList.add('opacity-100', 'translate-x-0');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.1,
  });

  revealElements.forEach(el => observer.observe(el));
}

// Footer Accordion Toggle (Mobile)
document.querySelectorAll('.footer-toggle').forEach((toggle) => {
  const content = toggle.nextElementSibling;
  if (!content) return;

  toggle.addEventListener('click', () => {
    const isOpen = content.classList.contains('max-sm:max-h-[1000px]');

    document.querySelectorAll('.footer-content').forEach((el) => {
      el.classList.remove('max-sm:max-h-[1000px]', 'max-sm:opacity-100');
      el.classList.add('max-sm:max-h-0', 'max-sm:opacity-0');
    });

    if (!isOpen) {
      content.classList.remove('max-sm:max-h-0', 'max-sm:opacity-0');
      content.classList.add('max-sm:max-h-[1000px]', 'max-sm:opacity-100');
    }
  });
});

// Animate images for features section in the Deal page
const animatedImages = document.querySelectorAll('.image-animation');
if (animatedImages.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  animatedImages.forEach((img) => observer.observe(img));
}

// Carousel animation in the knowledge page
const carousel = document.getElementById("carouselSlides");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (carousel && nextBtn && prevBtn) {
  const totalSlides = 3;
  let currentSlide = 0;

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

// Agencies Q&A toggle
document.querySelectorAll('.question-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const answer = toggle.nextElementSibling;
    const icon = toggle.querySelector('.icon');
    answer.classList.toggle('show');
    icon.classList.toggle('rotate-180');
  });
});

// Mobile menu for contact page
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('-translate-x-full');
    menu.classList.toggle('translate-x-0');
  });
}



//animation for the header links when hovered
  document.addEventListener("DOMContentLoaded", function () {
    const solutionsMenu = document.getElementById('solutions-menu');
    const industriesMenu = document.getElementById('industries-menu');
    const resourcesMenu = document.getElementById('resources-menu');

    const sltMenu = document.querySelector('.sltMenu');
    const indusMenu = document.querySelector('.indusMenu');
    const rscMenu = document.querySelector('.rscMenu');

    let hideTimeout;

    // Only run if all required elements are found
    if (solutionsMenu && industriesMenu && resourcesMenu &&
        sltMenu && indusMenu && rscMenu) {

      function showMenu(menu) {
        clearTimeout(hideTimeout);
        hideAllMenus();
        menu.classList.remove('hidden');
        menu.classList.add('menuBoxAnimate');
      }

      function hideMenu(menu) {
        hideTimeout = setTimeout(() => {
          menu.classList.add('hidden');
          menu.classList.remove('menuBoxAnimate');
        }, 200);
      }

      function hideAllMenus() {
        [sltMenu, indusMenu, rscMenu].forEach((menu) => {
          menu.classList.add('hidden');
          menu.classList.remove('menuBoxAnimate');
        });
      }

      solutionsMenu.addEventListener('mouseenter', () => showMenu(sltMenu));
      solutionsMenu.addEventListener('mouseleave', () => hideMenu(sltMenu));
      sltMenu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
      sltMenu.addEventListener('mouseleave', () => hideMenu(sltMenu));

      industriesMenu.addEventListener('mouseenter', () => showMenu(indusMenu));
      industriesMenu.addEventListener('mouseleave', () => hideMenu(indusMenu));
      indusMenu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
      indusMenu.addEventListener('mouseleave', () => hideMenu(indusMenu));

      resourcesMenu.addEventListener('mouseenter', () => showMenu(rscMenu));
      resourcesMenu.addEventListener('mouseleave', () => hideMenu(rscMenu));
      rscMenu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
      rscMenu.addEventListener('mouseleave', () => hideMenu(rscMenu));
    }
  });





