"use strict";


/* ====== Define JS Constants ====== */
const sidebarToggler = document.getElementById('docs-sidebar-toggler');
const sidebar = document.getElementById('docs-sidebar');
const sidebarLinks = document.querySelectorAll('#docs-sidebar .scrollto');



/* ===== Responsive Sidebar ====== */

window.onload=function() 
{ 
    responsiveSidebar(); 
};

window.onresize=function() 
{ 
    responsiveSidebar(); 
};


function responsiveSidebar() {
    let w = window.innerWidth;
	if(w >= 1200) {
	    // if larger 
	    // console.log('larger');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
		
	} else {
	    // if smaller
	    console.log('smaller');
	    sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
	}
};

sidebarToggler.addEventListener('click', () => {
	if (sidebar.classList.contains('sidebar-visible')) {
		console.log('visible');
		sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
		
	} else {
		console.log('hidden');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
	}
});


/* ===== Smooth scrolling ====== */
/*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
/* Ref: https://github.com/iamdustan/smoothscroll */

sidebarLinks.forEach((sidebarLink) => {
	
	sidebarLink.addEventListener('click', (e) => {
		
		e.preventDefault();
		
		var target = sidebarLink.getAttribute("href").replace('#', '');
		
		//console.log(target);
		
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        
        
        //Collapse sidebar after clicking
		if (sidebar.classList.contains('sidebar-visible') && window.innerWidth < 1200){
			
			sidebar.classList.remove('sidebar-visible');
		    sidebar.classList.add('sidebar-hidden');
		} 
		
    });
	
});


/* ===== Gumshoe SrollSpy ===== */
/* Ref: https://github.com/cferdinandi/gumshoe  */
// Initialize Gumshoe
var spy = new Gumshoe('#docs-nav a', {
	offset: 69, //sticky header height
});


/* ====== SimpleLightbox Plugin ======= */
/*  Ref: https://github.com/andreknieriem/simplelightbox */

var lightbox = new SimpleLightbox('.simplelightbox-gallery a', {/* options */});


function setupInteractiveExamples() {
	// Find all run buttons
	const runButtons = document.querySelectorAll('.run-code-btn');
	
	runButtons.forEach(button => {
	  button.addEventListener('click', function() {
		const codeBlock = this.previousElementSibling.querySelector('code');
		const outputPanel = this.nextElementSibling;
		const code = codeBlock.textContent;
		
		// Clear previous output
		outputPanel.innerHTML = '';
		
		// Capture console.log outputs
		const originalConsoleLog = console.log;
		const logs = [];
		
		console.log = function(...args) {
		  logs.push(args.map(arg => 
			typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
		  originalConsoleLog.apply(console, args);
		};
		
		try {
		  // Execute the code
		  const result = new Function(code)();
		  
		  // Display logs
		  if (logs.length) {
			logs.forEach(log => {
			  const logElement = document.createElement('div');
			  logElement.className = 'console-log';
			  logElement.textContent = log;
			  outputPanel.appendChild(logElement);
			});
		  }
		  
		  // Display return value if any
		  if (result !== undefined) {
			const resultElement = document.createElement('div');
			resultElement.className = 'return-value';
			resultElement.textContent = `→ ${result}`;
			outputPanel.appendChild(resultElement);
		  }
		} catch (error) {
		  // Display error
		  const errorElement = document.createElement('div');
		  errorElement.className = 'error-message';
		  errorElement.textContent = `Error: ${error.message}`;
		  outputPanel.appendChild(errorElement);
		} finally {
		  // Restore console.log
		  console.log = originalConsoleLog;
		}
	  });
	});
  }
  
  // Call this function after the document is loaded
  document.addEventListener('DOMContentLoaded', function() {
	setupInteractiveExamples();
  });










