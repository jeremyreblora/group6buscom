// Edit the menu here once; every page uses it.
const menu = [
    { label: 'Home', href: 'home.html' },
    { label: 'About Me', children: [
        { label: 'About Me', href: 'about.html' },
        { label: 'Contact', href: 'contact.html' }
    ]},
    { label: 'Portfolio', children: [
        { label: 'My Portfolio', href: 'portfolio.html' },
        { label: 'Resume/CV', href: 'Resume.html' },
        { label: 'Application Letter', href: 'applicationletter.html' }
    ]},
    { label: 'Video', children: [
        { label: 'Video Pitch', href: 'videopitch.html' },
        { label: 'Mock Interview', href: 'mockinterview.html' }
    ]},
    { label: 'Networking', href: 'networking.html' },
    { label: 'Tracker', href: 'tracker.html' }
];

const current = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
const isHere = href => href.toLowerCase() === current;

const links = menu.map(item => {
    if (!item.children) {
        return `<a href="${item.href}" class="${isHere(item.href) ? 'active' : ''}">${item.label}</a>`;
    }
    const open = item.children.some(c => isHere(c.href));
    return `<div class="dropdown">
        <button class="drop-btn ${open ? 'active' : ''}">${item.label} &#9662;</button>
        <div class="drop-menu">
            ${item.children.map(c => `<a href="${c.href}" class="${isHere(c.href) ? 'active' : ''}">${c.label}</a>`).join('')}
        </div>
    </div>`;
}).join('');

const navbar = document.getElementById('navbar');
navbar.innerHTML = `<button class="menu-toggle" aria-label="Toggle menu">&#9776;</button>
                    <div class="nav-links">${links}</div>`;

// Mobile: open/close the whole menu
navbar.querySelector('.menu-toggle').addEventListener('click', () => navbar.classList.toggle('open'));

// Click a dropdown button to open it (works on touch too)
navbar.querySelectorAll('.drop-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        btn.parentElement.classList.toggle('open');
    });
});
document.addEventListener('click', () => {
    navbar.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
});
