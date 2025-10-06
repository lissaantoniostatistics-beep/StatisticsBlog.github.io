// ===== GESTIONE DINAMICA DEL BLOG =====

// Lista degli homework - aggiungi qui i nuovi homework
const homeworkList = [
    // Esempio di homework - rimuovi questo quando aggiungi i tuoi veri homework
    {
        id: 'homework-1',
        week: 'Settimana 1',
        title: 'Introduzione alla Statistica Descrittiva',
        description: 'Analisi di dataset reali utilizzando misure di tendenza centrale e variabilità. Esplorazione di distribuzioni di frequenza e rappresentazioni grafiche.',
        date: '2024-10-01',
        tags: ['Statistica Descrittiva', 'Tendenza Centrale', 'Variabilità'],
        filename: 'homework-1.html'
    }
    // Aggiungi nuovi homework qui seguendo questo formato:
    /*
    {
        id: 'homework-2',
        week: 'Settimana 2',
        title: 'Titolo del tuo homework',
        description: 'Breve descrizione del homework',
        date: '2024-10-08',
        tags: ['Tag1', 'Tag2', 'Tag3'],
        filename: 'homework-2.html'
    }
    */
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
    return `
        <div class="homework-card">
            <div class="homework-header">
                <span class="homework-week">${homework.week}</span>
                <span class="homework-date">${formatDate(homework.date)}</span>
            </div>
            <h3 class="homework-title">${homework.title}</h3>
            <p class="homework-description">${homework.description}</p>
            <div class="homework-tags">
                ${homework.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="homework/${homework.filename}" class="homework-link">
                Leggi l'homework
            </a>
        </div>
    `;
}

// Funzione per caricare gli homework
function loadHomework() {
    const homeworkGrid = document.getElementById('homework-grid');
    
    if (!homeworkGrid) return;
    
    // Ordina gli homework per data (più recenti prima)
    const sortedHomework = homeworkList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedHomework.length === 0) {
        homeworkGrid.innerHTML = `
            <div class="no-homework">
                <p class="no-homework-text">Nessun homework ancora pubblicato. Torna presto per vedere i nuovi contenuti!</p>
            </div>
        `;
    } else {
        homeworkGrid.innerHTML = sortedHomework.map(homework => createHomeworkCard(homework)).join('');
    }
}

// Funzione per aggiungere smooth scrolling
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

// Funzione per evidenziare la navigazione attiva
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Funzione per aggiungere animazioni al scroll
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
            }
        });
    }, observerOptions);
    
    // Osserva le card degli homework
    document.querySelectorAll('.homework-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Funzione per gestire il tema (opzionale - per future implementazioni)
function initializeTheme() {
    // Placeholder per gestione tema chiaro/scuro
    // Implementabile in futuro se necessario
}

// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Carica gli homework
    loadHomework();
    
    // Aggiungi smooth scrolling
    addSmoothScrolling();
    
    // Evidenzia navigazione attiva
    highlightActiveNav();
    
    // Aggiungi animazioni dopo un breve delay per permettere il rendering
    setTimeout(addScrollAnimations, 100);
    
    // Inizializza tema
    initializeTheme();
    
    console.log('Blog di Statistica caricato con successo!');
});

// Utility: Funzione per aggiungere un nuovo homework (per sviluppo)
function addNewHomework(homeworkData) {
    homeworkList.push(homeworkData);
    loadHomework();
    setTimeout(addScrollAnimations, 100);
}

// Esporta funzioni per uso globale (se necessario)
window.BlogUtils = {
    addNewHomework,
    loadHomework,
    formatDate
};
