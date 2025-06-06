document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 992) {
            sidebar.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position with offset for header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') return;
        
        // Remove previous highlights
        const previousHighlights = document.querySelectorAll('.search-highlight');
        previousHighlights.forEach(el => {
            el.classList.remove('search-highlight');
        });
        
        // Search in command names and descriptions
        const commandCells = document.querySelectorAll('td code');
        let found = false;
        let firstMatch = null;
        
        commandCells.forEach(cell => {
            const commandText = cell.textContent.toLowerCase();
            
            if (commandText.includes(searchTerm)) {
                const row = cell.closest('tr');
                row.classList.add('search-highlight');
                found = true;
                
                if (!firstMatch) {
                    firstMatch = row;
                }
            }
        });
        
        // Also search in section and subsection titles
        const titles = document.querySelectorAll('h2, h3');
        
        titles.forEach(title => {
            const titleText = title.textContent.toLowerCase();
            
            if (titleText.includes(searchTerm)) {
                const section = title.closest('section') || title.closest('.subsection');
                section.classList.add('search-highlight');
                found = true;
                
                if (!firstMatch) {
                    firstMatch = section;
                }
            }
        });
        
        // Scroll to first match
        if (firstMatch) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = firstMatch.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            alert('No matches found for: ' + searchTerm);
        }
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Highlight current section in navigation based on scroll position
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add active class style
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            background-color: var(--ubuntu-dark-orange);
            border-left: 4px solid var(--ubuntu-orange);
            padding-left: 16px;
        }
    `;
    document.head.appendChild(style);
    
    // Call on scroll and on load
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();
});

