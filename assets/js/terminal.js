(function(){
  'use strict';

  // ─── BOOT SEQUENCE (optional — only if #boot-screen exists) ───
  var bootDelay = 0;
  var bootScreen = document.getElementById('boot-screen');
  if (bootScreen) {
    var bootLines = bootScreen.querySelectorAll('.boot-line');
    bootLines.forEach(function(line) {
      bootDelay += 150 + Math.random() * 200;
      setTimeout(function(){ line.classList.add('show'); }, bootDelay);
    });
    setTimeout(function(){
      bootScreen.classList.add('hidden');
    }, bootDelay + 800);
  }

  // ─── TYPING EFFECT (optional — only if #typed-name exists) ───
  var nameEl = document.getElementById('typed-name');
  if (nameEl) {
    var fullName = 'Sergio García Mondaray';
    var charIndex = 0;
    function typeChar() {
      if (charIndex < fullName.length) {
        nameEl.textContent += fullName[charIndex];
        charIndex++;
        setTimeout(typeChar, 50 + Math.random() * 80);
      }
    }
    setTimeout(typeChar, bootDelay + 1000);
  }

  // ─── INTERSECTION OBSERVER — SCROLL REVEAL ───
  var sections = document.querySelectorAll('.section');
  if (sections.length) {
    var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    sections.forEach(function(s){ sectionObserver.observe(s); });
  }

  // ─── STAGGER CHILDREN OBSERVER ───
  var staggerEls = document.querySelectorAll('.stagger-children');
  if (staggerEls.length) {
    var staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05 });
    staggerEls.forEach(function(s){ staggerObserver.observe(s); });
  }

  // ─── NAV ACTIVE STATE ───
  var navLinks = document.querySelectorAll('nav .nav-links a');
  if (navLinks.length && sections.length) {
    var navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) {
            link.classList.toggle('active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(function(s){ navObserver.observe(s); });
  }

  // ─── FOOTER YEAR ───
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ─── MOBILE NAV TOGGLE ───
  var toggle = document.querySelector('.nav-mobile-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      var links = document.querySelector('.nav-links');
      if (links) links.classList.toggle('open');
    });
  }

  // Close mobile nav when clicking a link
  var mobileLinks = document.querySelectorAll('nav .nav-links a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      var navLinksEl = document.querySelector('.nav-links');
      if (navLinksEl) navLinksEl.classList.remove('open');
    });
  });
})();
