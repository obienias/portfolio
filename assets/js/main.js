/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

// document.addEventListener('DOMContentLoaded', () => {
//     const projects = document.querySelectorAll('.work__img');
//     const modal = document.getElementById('projectModal');
//     const closeBtn = document.querySelector('.close-btn');
  
//     projects.forEach(project => {
//       project.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent default anchor behavior
        
//         // Here, you can set the modal content based on the project clicked
//         // For simplicity, this example uses static content defined in the HTML
//         modal.style.display = "block";
//       });
//     });
  
//     // When the user clicks on (x), close the modal
//     closeBtn.onclick = function() {
//       modal.style.display = "none";
//     }
  
//     // Also close the modal if the user clicks anywhere outside of the modal content
//     window.onclick = function(event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }
//   });
  
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.work__subnav-btn');
    const workItems = document.querySelectorAll('.work__img');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            workItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = ''; // Show
                } else {
                    item.style.display = 'none'; // Hide
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/projects.json')
      .then(response => response.json())
      .then(projectsData => {
        const workContainer = document.getElementById('workContainer');
        const modal = document.getElementById('projectModal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalImage = modal.querySelector('.modal-image');
        const modalDescription = modal.querySelector('.modal-description');
        const closeModalButton = modal.querySelector('.close-btn');
  
        // Dynamically create gallery items
        projectsData.forEach(project => {
          const projectItem = document.createElement('a');
          projectItem.classList.add('work__img');
          projectItem.setAttribute('href', '#');
          projectItem.setAttribute('data-category', project.id);
          projectItem.innerHTML = `
            <img src="${project.image}" alt="">
            <h3 class="work__text">${project.title}</h3>
          `;
          workContainer.appendChild(projectItem);
  
          // Event listener for each project
          projectItem.addEventListener('click', function(e) {
            e.preventDefault();
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalDescription.textContent = project.description;
            modal.style.display = 'flex';
          });
        });
  
        // Close modal action
        closeModalButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        setupFiltering();
      })
      .catch(error => console.error('Error loading project data:', error));
  });
  

// document.addEventListener('DOMContentLoaded', () => {
//     const projectItems = document.querySelectorAll('.work__img');
//     const modal = document.getElementById('projectModal');
//     const modalTitle = modal.querySelector('.modal-title');
//     const modalImage = modal.querySelector('.modal-image');
//     const modalDescription = modal.querySelector('.modal-description');
//     const closeModalButton = modal.querySelector('.close-btn');

//     // Sample project data (you could fetch this from a server or define it in your script)
//     const projectsData = [
//         {
//             id: 'architecture',
//             title: '440 Penn',
//             image: 'assets/img/440Penn.jpg',
//             description: 'A detailed description of the 440 Penn project...'
//         },
//         // Add more projects here...
//     ];

//     projectItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             e.preventDefault(); // Prevent default anchor action
//             const projectId = this.getAttribute('data-category'); // Assuming data-category is unique for each project

//             // Find the project data
//             const project = projectsData.find(p => p.id === projectId);
//             if (project) {
//                 // Populate modal with project data
//                 modalTitle.textContent = project.title;
//                 modalImage.src = project.image;
//                 modalImage.alt = project.title;
//                 modalDescription.textContent = project.description;

//                 // Show the modal
//                 modal.style.display = 'flex';
//             }
//         });
//     });

//     // Close modal action
//     closeModalButton.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });
// });


//   document.addEventListener('DOMContentLoaded', () => {
//     const filterButtons = document.querySelectorAll('.work__subnav-btn');
//     const workItems = document.querySelectorAll('.work__img');

//     filterButtons.forEach(btn => {
//         btn.addEventListener('click', function() {
//             const filter = this.getAttribute('data-filter');

//             workItems.forEach(item => {
//                 if (filter === 'all' || item.getAttribute('data-category') === filter) {
//                     item.style.display = ''; // Show
//                 } else {
//                     item.style.display = 'none'; // Hide
//                 }
//             });
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const portfolioItems = document.querySelectorAll('.portfolio__item');
    
//     portfolioItems.forEach(item => {
//         item.addEventListener('click', function() {
//             const targetId = this.getAttribute('data-target');
//             const content = document.getElementById('portfolio-details');
            
            
//             const details = {
//                 'architectural-design': `
//                 <h2 class="section-title">Architectural Design</h2>
//                 <div class="work__container bd-grid">
//                     <a href="" class="work__img">
//                         <img src="assets/img/440Penn.jpg" alt="">
//                         <h3 class="work__text">Architectural Design</h3>
//                         <p>From concept to launch, discover web development projects 
//                         that deliver compelling user experiences through intuitive design and robust backend functionality.</p>
//                     </a>
//                     <a href="" class="work__img">
//                         <img src="assets/img/Mazza.jpg" alt="">
//                         <h3 class="work__text">Building Information Modeling (BIM)</h3>
//                         <p class="work__text">Building Information Modeling (BIM)</p>
//                     </a>
//                     <a href="" class="work__img">
//                         <img src="assets/img/BP.jpg" alt="">
//                         <h3 class="work__text">Web Development</h3>
//                     </a>
//                     <a href="" class="work__img">
//                         <img src="assets/img/440Penn.jpg" alt="">
//                         <h3 class="work__text">Architectural Design</h3>
//                     </a>
//                     <a href="" class="work__img">
//                         <img src="assets/img/Mazza.jpg" alt="">
//                         <h3 class="work__text">Building Information Modeling (BIM)</h3>
//                     </a>
//                     <a href="" class="work__img">
//                         <img src="assets/img/BP.jpg" alt="">
//                         <h3 class="work__text">Web Development</h3>
//                     </a>
//                 </div>`,
//                 'bim-project': `
//                 <h2 class="section-title">Architectural Design</h2>
//                 <div class="work__container bd-grid">
//                 <a href="" class="work__img">
//                     <img src="assets/img/Revisions.PNG" alt="">
//                     <h3 class="work__text">Architectural Design</h3>
//                 </a>
//                 <a href="" class="work__img">
//                     <img src="assets/img/BathFamily.PNG" alt="">
//                     <h3 class="work__text">Building Information Modeling (BIM)</h3>
//                 </a>
//                 <a href="" class="work__img">
//                     <img src="assets/img/Area to ROOM.PNG" alt="">
//                     <h3 class="work__text">Web Development</h3>
//                 </a>
//             </div>`,
//                 'web-development': `
//                 <h2 class="section-title">Web Development</h2>
//                     <div class="work__container bd-grid">
//                     <a href="" class="work__img">
//                     <img src="assets/img/web development.jpg" alt="">
//                     <h3 class="work__text">Web Development</h3>
//                 </a>
//                     </div>`
//             };

//             // Load the content.
//             content.innerHTML = details[targetId] || '<div class="detail-container"><p>Details not found.</p></div>';

//             // Scroll to the details section
//             content.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         });
//     });
// });
