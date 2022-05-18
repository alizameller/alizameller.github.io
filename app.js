// javascript file for interactivity
'use strict'; /* JavaScript normally does not throw errors at small mistakes, use this to get 
 more useful errors when you make mistakes */
const switcher = document.querySelector('.btn'); /* switcher is now a reference to the button 
 in the page */

switcher.addEventListener('click', function() { // creates 'click' event
    document.body.classList.toggle('light-theme'); // 'toggle' modifies the element's class attribute
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    console.log('current class name: ' + className);
});