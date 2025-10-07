const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const header = document.querySelector('header');

const NAVBAR_HEIGHT = header.offsetHeight || 80;

navToggle.addEventListener('click', () => {
	navMenu.classList.toggle('open');
	navToggle.classList.toggle('open');
});

function activateNavLink() {
	let scrollY = window.pageYOffset;
	const OFFSET = 20;

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - NAVBAR_HEIGHT - OFFSET;
		const sectionId = current.getAttribute('id');

		if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
			navItems.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${sectionId}`) {
					link.classList.add('active');
				}
			});
		}
	});
}

window.addEventListener('scroll', () => {
	activateNavLink();

	if (window.scrollY > 10) {
		header.classList.add('sticky-scrolled');
	} else {
		header.classList.remove('sticky-scrolled');
	}
});

window.addEventListener('DOMContentLoaded', () => {
	activateNavLink();
	console.log('[DOMContentLoaded] header position:', getComputedStyle(header).position);
});

window.addEventListener('hashchange', activateNavLink);

navItems.forEach(link => {
	link.addEventListener('click', function (e) {
		const targetId = this.getAttribute('href').slice(1);
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			e.preventDefault();
			const y = targetSection.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
		navMenu.classList.remove('open');
		navToggle.classList.remove('open');
	});
});