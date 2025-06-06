# Ubuntu Linux Commands Cheat Sheet

A comprehensive, interactive cheat sheet for Ubuntu Linux commands. This is a static website that requires no dependencies, build processes, or server-side components.

>https://design.ubuntu.com/brand

## Features

- **Comprehensive Command Reference**: Covers essential Ubuntu/Linux commands across multiple categories
- **Interactive Search**: Search through commands and descriptions in real-time
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Ubuntu-themed UI**: Clean design using official Ubuntu colors and styling
- **Smooth Navigation**: Click navigation links for smooth scrolling to sections
- **Mobile-friendly**: Collapsible sidebar for mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks or build tools required

## Quick Start

### Option 1: Local File System
1. Download or clone this repository
2. Open `index.html` directly in any modern web browser
3. No server required - works completely offline!

### Option 2: Web Server
1. Copy all files to your web server directory
2. Access via your domain/subdomain
3. Works with any web server (Apache, Nginx, etc.)

### Option 3: GitHub Pages (or similar)
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://yourusername.github.io/linux-ultimate-reference`

## File Structure

```
linux-ultimate-reference/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styling and responsive design
├── js/
│   └── script.js           # Interactive functionality
├── images/
│   ├── ubuntu_cheatsheet_header.png
│   ├── file_system_icon.png
│   ├── system_icon.png
│   └── network_icon.png
└── readme.md               # This file
```

## Sections Covered

1. **Getting Started**
   - Terminal shortcuts
   - Basic navigation
   - Help commands

2. **File System Navigation**
   - Listing files and directories
   - Finding files and directories

3. **File Management**
   - Creating files and directories
   - Copying, moving, and renaming
   - Deleting files and directories
   - File permissions

4. **Text Manipulation**
   - Viewing file contents
   - Editing files
   - Searching within files

5. **System Information**
   - System and hardware info
   - Disk usage and management
   - Process management
   - Service management

6. **Package Management**
   - APT commands
   - DPKG commands

7. **Network Commands**
   - Network configuration
   - Connectivity testing
   - Network monitoring

8. **Compression and Archiving**
   - TAR archives
   - Compressed archives
   - ZIP files

9. **Advanced Tips and Tricks**
   - Command chaining
   - Redirections
   - Useful aliases
   - Cron jobs

## Usage Tips

### Search Functionality
- Use the search bar in the header to find specific commands
- Search works across command names, descriptions, and section titles
- Results are highlighted and the page automatically scrolls to the first match

### Navigation
- Click any item in the sidebar to jump to that section
- The active section is highlighted in the sidebar as you scroll
- On mobile, tap the hamburger menu (☰) to open/close the sidebar

### Mobile Experience
- Fully responsive design adapts to all screen sizes
- Touch-friendly interface with appropriate spacing
- Sidebar automatically closes after selecting a section on mobile

## Customization

### Colors
Ubuntu brand colors are defined as CSS custom properties in `styles.css`:
```css
:root {
    --ubuntu-orange: #E95420;
    --ubuntu-dark-orange: #C34113;
    --ubuntu-cool-grey: #333333;
    /* ... more colors */
}
```

### Adding New Sections
1. Add a new section in `index.html` with appropriate `id`
2. Add corresponding navigation link in the sidebar
3. Follow the existing table structure for consistency

### Images
- Place images in the `images/` directory
- Update image paths in HTML as needed
- Ensure images are optimized for web (compressed, appropriate format)

## Browser Compatibility

This site works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

Feel free to contribute by:
- Adding new commands
- Improving existing descriptions
- Fixing typos or errors
- Enhancing the design
- Adding new features

## License

This project is open source and available under the MIT License.

## Credits

- Ubuntu brand colors and design inspiration from Canonical
- Font Awesome icons for navigation
- Created for the Linux community with ❤️
