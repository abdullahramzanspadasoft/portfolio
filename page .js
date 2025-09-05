
 const darkToggle = document.getElementById('darkToggle');
    darkToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      darkToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      darkToggle.setAttribute('aria-pressed', isDark);
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const hamburgerToggle = document.getElementById('menuToggle');

    function updateActiveLink() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(`#${current}`)) {
          link.classList.add('active');
        }
      });
    }

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburgerToggle.checked) {
          hamburgerToggle.checked = false;
        }
      });
    });

    function isSectionInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50 &&
             rect.bottom >= 50;
    }

    // Animate skill levels
    const skillSection = document.querySelector('#skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    let skillsAnimated = false;
    function animateSkillLevels() {
      if (skillsAnimated) return;
      if (isSectionInViewport(skillSection)) {
        skillLevels.forEach(skill => {
          const target = parseInt(skill.dataset.skill);
          let count = 0;
          const increment = Math.ceil(target / 30);
          const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(interval);
            }
            skill.textContent = `${count}%`;
          }, 30);
        });
        skillsAnimated = true;
      }
    }

    function revealOnScroll() {
      document.querySelectorAll('section, .project-item').forEach(el => {
        if (isSectionInViewport(el)) {
          el.classList.add('in-view');
          if (el.classList.contains('project-item')) {
            const expTag = el.querySelector('.experience-tag');
            const expNum = expTag.querySelector('.experience-number');
            const target = parseInt(el.dataset.exp || "2");
            if (expNum && expNum.textContent === "0") {
              let count = 0;
              const interval = setInterval(() => {
                count++;
                expNum.textContent = count;
                if (count >= target) clearInterval(interval);
              }, 200);
            }
          }
        }
      });
    }

    window.addEventListener('scroll', () => {
      updateActiveLink();
      animateSkillLevels();
      revealOnScroll();
    });
    
    window.addEventListener('load', () => {
        updateActiveLink();
        animateSkillLevels();
        revealOnScroll();
    });
    


    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
const translations = {
  en: {
    homeTitle: "I'M DevAbdullah",
    intro: "I'M A FREELANCE UI/UX DESIGNER AND WEB DEVELOPER BASED IN LAHORE, PUNJAB, PAKISTAN.",
    about: "About Me",
    aboutDesc: "I am a passionate web developer with a knack for creating modern, user-friendly websites.",
    contactTitle: "Contact Us"
  },
  fr: {
    homeTitle: "JE SUIS DevAbdullah",
    intro: "JE SUIS UN CONCEPTEUR UI/UX FREELANCE ET DÉVELOPPEUR WEB BASÉ À LAHORE, PUNJAB, PAKISTAN.",
    about: "À propos de moi",
    aboutDesc: "Je suis un développeur web passionné, spécialisé dans la création de sites modernes et conviviaux.",
    contactTitle: "Contactez-nous"
  },
  ar: {
    homeTitle: "أنا ديف عبدالله",
    intro: "أنا مصمم واجهات ومطور ويب مستقل مقيم في لاهور، البنجاب، باكستان.",
    about: "معلومات عني",
    aboutDesc: "أنا مطور ويب شغوف، متخصص في إنشاء مواقع حديثة وسهلة الاستخدام.",
    contactTitle: "اتصل بنا"
  }
};

document.querySelectorAll('.lang-dropdown li').forEach(item => {
  item.addEventListener('click', () => {
    const lang = item.getAttribute('data-lang');
    applyTranslation(lang);
  });
});

function applyTranslation(lang) {
  const t = translations[lang];
  document.querySelector('.name-heading').textContent = t.homeTitle;
  document.querySelector('.intro-text').textContent = t.intro;
  document.querySelector('#about h2').textContent = t.about;
  document.querySelector('#about p').textContent = t.aboutDesc;
  document.querySelector('#contact h2').textContent = t.contactTitle;
}
document.addEventListener('DOMContentLoaded', () => {
  const customizerPanel = document.getElementById('customizer-panel');
  const customizerToggle = document.getElementById('customizer-toggle');
  const colorOptions = document.querySelectorAll('.color-option');
  const fontSelect = document.getElementById('font-select');
  const body = document.body;

  // Toggle the customizer panel
  if (customizerToggle) {
    customizerToggle.addEventListener('click', () => {
      const isExpanded = customizerToggle.getAttribute('aria-expanded') === 'true' || false;
      customizerPanel.classList.toggle('customizer-open');
      customizerToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Handle color selection
  colorOptions.forEach(button => {
    button.addEventListener('click', () => {
      const selectedColor = button.getAttribute('data-color');
      
      // Remove 'active-color' from all buttons
      colorOptions.forEach(btn => btn.classList.remove('active-color'));
      
      // Add 'active-color' to the clicked button
      button.classList.add('active-color');
      
      // Set the color theme on the body element
      body.setAttribute('data-color-theme', selectedColor);
      
      // Update the toggle button color
      customizerToggle.style.backgroundColor = getComputedStyle(button).backgroundColor;
    });
  });

  // Handle font selection
  if (fontSelect) {
    fontSelect.addEventListener('change', (event) => {
      const selectedFont = event.target.value;
      body.style.fontFamily = selectedFont;
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const customizeBtn = document.getElementById('customize-btn');
  const customizePanel = document.getElementById('customize-panel');
  const colorOptions = document.querySelectorAll('.color-option');
  const fontSelect = document.getElementById('font-select');

  // Toggle panel visibility
  customizeBtn.addEventListener('click', () => {
    const isExpanded = customizeBtn.getAttribute('aria-expanded') === 'true';
    customizeBtn.setAttribute('aria-expanded', !isExpanded);
    customizePanel.style.display = isExpanded ? 'none' : 'block';
  });

  // Apply selected color as primary color (example: change --primary-color CSS variable or body background)
  colorOptions.forEach(button => {
    button.addEventListener('click', () => {
      const color = button.getAttribute('data-color');
      // Example: change CSS variable or directly style elements
      document.documentElement.style.setProperty('--primary-color', color);
      // For demo, let's change link colors and buttons background
      document.querySelectorAll('a.btn-primary').forEach(el => {
        el.style.backgroundColor = color;
        el.style.borderColor = color;
      });
      // Also change nav logo color as example
      const logo = document.querySelector('.logo');
      if (logo) logo.style.color = color;
    });
  });

  // Apply selected font family to body
  fontSelect.addEventListener('change', () => {
    const font = fontSelect.value;
    document.body.style.fontFamily = font;
  });
});