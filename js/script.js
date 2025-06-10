// Global function for scrolling to top when logo is clicked
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

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
    
    // Enhanced Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearSearchButton = document.getElementById('clear-search');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            clearSearch();
            return;
        }
        
        // Show clear button
        clearSearchButton.style.display = 'block';
        
        // Remove previous highlights
        clearHighlights();
        
        // Search in command names, descriptions, and section titles
        const searchResults = [];
        
        // Search in tables
        const cells = document.querySelectorAll('td, th');
        cells.forEach(cell => {
            const text = cell.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                const row = cell.closest('tr');
                if (row) {
                    row.classList.add('search-highlight');
                    searchResults.push(row);
                }
            }
        });
        
        // Search in headings
        const headings = document.querySelectorAll('h2, h3, h4');
        headings.forEach(heading => {
            const text = heading.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                heading.classList.add('search-highlight');
                searchResults.push(heading);
            }
        });
        
        // Show results
        if (searchResults.length > 0) {
            // Scroll to first result
            const firstResult = searchResults[0];
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = firstResult.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Show search stats
            showSearchStats(searchResults.length, searchTerm);
        } else {
            showNoResults(searchTerm);
        }
    }
    
    function clearSearch() {
        searchInput.value = '';
        clearSearchButton.style.display = 'none';
        clearHighlights();
        hideSearchStats();
    }
    
    function clearHighlights() {
        const highlighted = document.querySelectorAll('.search-highlight');
        highlighted.forEach(el => el.classList.remove('search-highlight'));
    }
    
    function showSearchStats(count, term) {
        // Create or update search stats
        let statsEl = document.getElementById('search-stats');
        if (!statsEl) {
            statsEl = document.createElement('div');
            statsEl.id = 'search-stats';
            statsEl.className = 'search-stats';
            document.querySelector('.content-sections').insertBefore(statsEl, document.querySelector('.section'));
        }
        statsEl.innerHTML = `<i class="fas fa-search"></i> Found ${count} results for "${term}"`;
        statsEl.style.display = 'block';
    }
    
    function hideSearchStats() {
        const statsEl = document.getElementById('search-stats');
        if (statsEl) {
            statsEl.style.display = 'none';
        }
    }
    
    function showNoResults(term) {
        showSearchStats(0, term);
        const statsEl = document.getElementById('search-stats');
        statsEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> No results found for "${term}"`;
    }
    
    // Event listeners for search
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', clearSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search (debounced)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (searchInput.value.length > 2) {
                    performSearch();
                } else if (searchInput.value.length === 0) {
                    clearSearch();
                }
            }, 300);
        });
    }
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or user preference
    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        updateThemeIcon(savedTheme === 'dark');
    } else if (prefersDark) {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }
    
    function updateThemeIcon(isDark) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-theme');
            updateThemeIcon(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Copy to clipboard functionality
    function addCopyButtons() {
        const codeElements = document.querySelectorAll('code.copyable');
        
        codeElements.forEach(code => {
            code.style.position = 'relative';
            code.style.cursor = 'pointer';
            code.title = 'Click to copy';
            
            code.addEventListener('click', function() {
                const text = this.textContent;
                
                // Use modern clipboard API if available
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyNotification();
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyNotification();
                }
            });
        });
    }
    
    function showCopyNotification() {
        const notification = document.getElementById('copy-notification');
        if (notification) {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search or close mobile menu
        if (e.key === 'Escape') {
            if (searchInput.value) {
                clearSearch();
            } else if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Initialize copy buttons
    addCopyButtons();
    
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

