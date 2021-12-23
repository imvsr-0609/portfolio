const typewriter = document.querySelector('.typewriter');
const hamburger = document.querySelector('[data-hamburger-btn');
const sidebar = document.querySelector('.portfolio__sidebar');
const hamburgerIcon = document.querySelector('[data-hamburger-icon');
const sidebarLink = document.querySelectorAll('.sidebar__link');
const contactForm = document.querySelector('[data-contact-form]');
const contactName = document.querySelector('[data-contact-name]');
const contactEmail = document.querySelector('[data-contact-email]');
const contactSubject = document.querySelector('[data-contact-subject]');
const contactMessage = document.querySelector('[data-contact-message]');
const resumeButton = document.querySelector('[data-resume-download]');
const sections = document.querySelectorAll('section[id]');
const body = document.querySelector('[data-portfolio-body');

var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

body.addEventListener('scroll', () => {
	let scrollY = body.scrollTop;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute('id');

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector('.sidebar__link a[href*=' + sectionId + ']')
				.classList.add('active');
		} else {
			document
				.querySelector('.sidebar__link a[href*=' + sectionId + ']')
				.classList.remove('active');
		}
	});
});

window.onload = () => {
	var elements = document.getElementsByClassName('typewriter');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '.typewriter > .wrap { border-right: 0.08em solid #fff}';
	document.body.appendChild(css);
};

hamburger.addEventListener('click', () => {
	sidebar.classList.toggle('sidebar__active');
	hamburgerIcon.classList.toggle('fa-times');
});

sidebarLink.forEach((link) =>
	link.addEventListener('click', () => {
		sidebar.classList.remove('sidebar__active');
	}),
);

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	window.open(
		`mailto:imvdntsingh@gmail.com?subject=${contactSubject.value}&body=${contactMessage.value}`,
	);
	contactForm.reset();
});

// resumeButton.addEventListener('click', () => {
// 	window.open(
// 		'file:///D://Certificates/Resume/Vedant_Singh_Resume.pdf',
// 		'Download',
// 	);
// });
