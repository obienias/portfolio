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
        const workContainer = document.getElementById('work');
        const modal = document.getElementById('projectModal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalImage = modal.querySelector('.modal-image');
        const modalDescription = modal.querySelector('.modal-description');
        const closeModalButton = modal.querySelector('.close-btn');
        const leftNav = modal.querySelector('.left__nav');
        const rightNav = modal.querySelector('.right__nav');
        let currentIndex = 0;
        let imageIndex = 0;
  
        // Dynamically create gallery items
        projectsData.forEach((project, index) => {
          const projectItem = document.createElement('a');
          projectItem.classList.add('work__img');
          projectItem.setAttribute('href', '#');
          projectItem.setAttribute('data-category', project.id);
          projectItem.innerHTML = `
            <img src="${project.image_icon}" alt="">
            <h3 class="work__text">${project.title}</h3>
          `;
          workContainer.appendChild(projectItem);

          sr.reveal(projectItem, {interval: 200});
  
          // Event listener for each project
          projectItem.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            modalTitle.textContent = project.title;
            // modalImage.src = project.image;
            modalImage.src = project.image[0];
            modalImage.alt = project.title;
            modalDescription.innerHTML = project.description;
            modal.style.display = 'flex';
            imageIndex = 0;
            console.log(currentIndex)
          });
        });

        function updateModal() {
            console.log("test");
            modalImage.src = projectsData[currentIndex].image[imageIndex];
            const newSrc = projectsData[currentIndex].image[imageIndex] + '?v=' + new Date().getTime();
    // modalImage.src = newSrc;
    console.log("Updated image src to: ", newSrc); 
}
        

        leftNav.addEventListener('click', () => {
            if (imageIndex > 0) {
                imageIndex--;  // Move to the previous image
                console.log(imageIndex);
                updateModal();
                
            }
        });

        rightNav.addEventListener('click', () => {
            if (imageIndex < projectsData[currentIndex].image.length - 1) {
                imageIndex++;  // Move to the next image
                console.log(imageIndex);
                updateModal();
            }
                
                
        });
  
        // Close modal action
        closeModalButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        setupFiltering();
      })
      .catch(error => console.error('Error loading project data:', error));
  });
  

