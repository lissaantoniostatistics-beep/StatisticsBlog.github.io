// ===== GESTIONE DINAMICA DEL BLOG =====

// Lista degli homework - aggiorna qui i nuovi compiti
const homeworkList = [
    {
        id: 'homework-Caesar cipher',
        week: 'Week 2',
        title: 'Concepts of Dataset, Distribution, and Caesar Cipher',
        description: 'Explanation of dataset and distribution concepts using a DBMS (Access), analysis of univariate and bivariate distributions, and introduction to cryptanalysis with the Caesar Cipher.',
        date: '2024-10-14',
        tags: ['Descriptive Statistics', 'DBMS', 'Cryptography', 'Frequency Analysis'],
        filename: 'homework_2.html'
    },
    {
        id: 'homework-statistics-cybersecurity',
        week: 'Settimana 1',
        title: 'What is Statistics and Why Can It Be Useful for Cybersecurity',
        description: 'Understanding the fundamental role of statistics in cybersecurity: from threat detection to risk assessment. Exploring statistical methods that power modern security systems.',
        date: '2024-10-07',
        tags: ['Statistical Foundations', 'Cybersecurity', 'Threat Detection'],
        filename: 'homework-statistics-cybersecurity.html'
    }
];

// Funzione per formattare la data
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

// Funzione per creare una card homework
function createHomeworkCard(homework) {
    // Nota: Il link presuppone che il file sia in una sottocartella 'homework/'
    const url = `homework/${homework.filename}`; 

    return `
        <a href="${url}" class="homework-card">
            <div class="homework-header">
                <span class="homework-week">${homework.week}</span>
                <span class="homework-date">${formatDate(homework.date)}</span>
            </div>
            <h3 class="homework-title">${homework.title}</h3>
            <p class="homework-description">${homework.description}</p>
            <div class="homework-tags">
                ${homework.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <span class="homework-link">
                Leggi l'homework &rarr;
            </span>
        </a>
    `;
}

// Funzione per caricare gli homework nella pagina
function loadHomework() {
    const homeworkListElement = document.getElementById('homework-list');
    
    if (!homeworkListElement) return;
    
    // Ordina gli homework per data (dal più recente al meno recente)
    const sortedHomework = homeworkList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedHomework.length === 0) {
        homeworkListElement.innerHTML = `
            <div class="no-homework">
                <p class="no-homework-icon">📚</p>
                <p class="no-homework-text">Ancora nessun compito caricato. Torna presto!</p>
            </div>
        `;
    } else {
        homeworkListElement.innerHTML = sortedHomework.map(homework => createHomeworkCard(homework)).join('');
    }
}

// Funzione per aggiungere smooth scrolling per i link interni
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Funzione per evidenziare il link di navigazione attivo
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Verifica se l'href del link corrisponde al percorso corrente o alla home
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Funzione per animazioni (fade-in e slide-up) degli elementi a scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Ferma l'osservazione dopo l'animazione
            }
        });
    }, observerOptions);
    
    // Prepara e osserva tutte le card degli homework
    document.querySelectorAll('.homework-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Gestione del tema (es. Light/Dark mode)
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

// Mostra statistiche essenziali in console per il debug
function showBlogStats() {
    const totalHomework = homeworkList.length;
    
    console.log(`📊 Blog Statistico Caricato. Compiti totali: ${totalHomework}.`);
}

// Inizializzazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    loadHomework();
    addSmoothScrolling();
    highlightActiveNav();
    // Animazioni dopo un breve delay per garantire che il layout sia stabile
    setTimeout(addScrollAnimations, 100); 
    initializeTheme();
    showBlogStats();
});

// Funzione utility per aggiungere un nuovo homework (utile in fase di sviluppo)
window.addNewHomework = function(homeworkData) {
    homeworkList.push(homeworkData);
    loadHomework();
    setTimeout(addScrollAnimations, 100);
    console.log(`✨ Nuovo compito aggiunto: ${homeworkData.title}`);
}
