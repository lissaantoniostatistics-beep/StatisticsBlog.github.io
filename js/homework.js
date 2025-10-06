// ===== JAVASCRIPT SPECIFICO PER HOMEWORK =====

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza la pagina homework
    initializeHomeworkPage();
    
    // Aggiungi funzionalità per il codice
    initializeCodeBlocks();
    
    // Aggiungi smooth scrolling per ancore interne
    initializeSmoothScrolling();
    
    // Inizializza le animazioni
    initializeAnimations();
    
    console.log('📚 Pagina homework inizializzata con successo!');
});

// Inizializzazione generale della pagina
function initializeHomeworkPage() {
    // Aggiungi data di ultima modifica se non presente
    addLastModified();
    
    // Aggiungi tempo di lettura stimato
    addReadingTime();
    
    // Inizializza la navigazione
    setupNavigation();
}

// Aggiungi data di ultima modifica
function addLastModified() {
    const articleHeader = document.querySelector('.article-header .article-meta');
    if (articleHeader && !document.querySelector('.last-modified')) {
        const lastModified = document.createElement('span');
        lastModified.className = 'last-modified';
        lastModified.innerHTML = `📝 Ultimo aggiornamento: ${formatDate(new Date())}`;
        lastModified.style.color = '#718096';
        lastModified.style.fontSize = '0.9rem';
        articleHeader.appendChild(lastModified);
    }
}

// Calcola e aggiungi tempo di lettura stimato
function addReadingTime() {
    const content = document.querySelector('.article-content');
    if (!content) return;
    
    const text = content.textContent || content.innerText;
    const wordsPerMinute = 200; // Media di lettura in italiano
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const articleHeader = document.querySelector('.article-header .article-meta');
    if (articleHeader && !document.querySelector('.reading-time')) {
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `⏱️ ${readingTime} min di lettura`;
        readingTimeElement.style.color = '#718096';
        readingTimeElement.style.fontSize = '0.9rem';
        articleHeader.appendChild(readingTimeElement);
    }
}

// Configura la navigazione
function setupNavigation() {
    // Gestisci i link di navigazione tra homework
    const navLinks = document.querySelectorAll('.homework-navigation .nav-link');
    navLinks.forEach(link => {
        // Se il link punta a un file che non esiste, disabilitalo
        if (link.getAttribute('href').includes('[HOMEWORK_')) {
            link.style.opacity = '0.5';
            link.style.pointerEvents = 'none';
            link.innerHTML = link.classList.contains('nav-prev') ? 
                '← Nessun homework precedente' : 
                'Nessun homework successivo →';
        }
    });
}

// Inizializza i blocchi di codice
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    
    codeBlocks.forEach((block, index) => {
        // Aggiungi numerazione delle righe
        addLineNumbers(block);
        
        // Aggiungi pulsante copia
        addCopyButton(block, index);
        
        // Evidenzia sintassi se disponibile
        highlightSyntax(block);
    });
}

// Aggiungi numerazione delle righe al codice
function addLineNumbers(codeBlock) {
    const code = codeBlock.textContent;
    const lines = code.split('\n');
    
    if (lines.length > 3) { // Solo se ci sono più di 3 righe
        const numberedCode = lines.map((line, index) => {
            const lineNumber = (index + 1).toString().padStart(2, ' ');
            return `<span class="line-number">${lineNumber}</span>${line}`;
        }).join('\n');
        
        codeBlock.innerHTML = numberedCode;
        
        // Aggiungi stili per i numeri di riga
        const style = document.createElement('style');
        style.textContent = `
            .line-number {
                color: #718096;
                margin-right: 1rem;
                user-select: none;
                display: inline-block;
                width: 2rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Aggiungi pulsante copia per i blocchi di codice
function addCopyButton(codeBlock, index) {
    const container = codeBlock.closest('.code-block');
    if (!container) return;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '📋 Copia';
    copyButton.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: #4a5568;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: background 0.3s ease;
    `;
    
    container.style.position = 'relative';
    container.appendChild(copyButton);
    
    copyButton.addEventListener('click', function() {
        const code = codeBlock.textContent.replace(/^\d+\s/gm, ''); // Rimuovi numeri di riga
        navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '✅ Copiato!';
            copyButton.style.background = '#48bb78';
            setTimeout(() => {
                copyButton.innerHTML = '📋 Copia';
                copyButton.style.background = '#4a5568';
            }, 2000);
        });
    });
    
    copyButton.addEventListener('mouseenter', function() {
        if (!this.textContent.includes('Copiato')) {
            this.style.background = '#2d3748';
        }
    });
    
    copyButton.addEventListener('mouseleave', function() {
        if (!this.textContent.includes('Copiato')) {
            this.style.background = '#4a5568';
        }
    });
}

// Evidenziazione della sintassi (semplice)
function highlightSyntax(codeBlock) {
    let code = codeBlock.innerHTML;
    
    // Evidenzia parole chiave Python comuni
    const pythonKeywords = [
        'import', 'from', 'def', 'class', 'if', 'elif', 'else', 'for', 'while', 
        'try', 'except', 'finally', 'with', 'as', 'return', 'yield', 'break', 
        'continue', 'pass', 'lambda', 'and', 'or', 'not', 'in', 'is'
    ];
    
    pythonKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        code = code.replace(regex, `<span style="color: #e53e3e; font-weight: bold;">${keyword}</span>`);
    });
    
    // Evidenzia stringhe
    code = code.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, 
        '<span style="color: #38a169;">$1$2$3</span>');
    
    // Evidenzia commenti
    code = code.replace(/(#.*$)/gm, 
        '<span style="color: #718096; font-style: italic;">$1</span>');
    
    codeBlock.innerHTML = code;
}

// Smooth scrolling per ancore interne
function initializeSmoothScrolling() {
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

// Inizializza le animazioni
function initializeAnimations() {
    // Animazione fadeIn per le sezioni
    const sections = document.querySelectorAll('.content-section');
    
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Anima anche l'header dell'articolo
    const articleHeader = document.querySelector('.article-header');
    if (articleHeader) {
        articleHeader.style.opacity = '0';
        articleHeader.style.transform = 'translateY(-30px)';
        articleHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            articleHeader.style.opacity = '1';
            articleHeader.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Utility: Formatta data
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('it-IT', options);
}

// Funzione per aggiungere interattività ai grafici (placeholder)
function makeChartsInteractive() {
    // Placeholder per future funzionalità interattive con grafici
    // Potrebbe integrarsi con librerie come Chart.js, D3.js, ecc.
    console.log('📊 Grafici interattivi non ancora implementati');
}

// Funzione per gestire il tema (placeholder per future implementazioni)
function toggleTheme() {
    // Placeholder per toggle tema chiaro/scuro
    console.log('🌙 Toggle tema non ancora implementato');
}

// Aggiungi funzionalità di stampa ottimizzata
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        // Nasconde elementi non necessari per la stampa
        document.querySelectorAll('.copy-button').forEach(btn => {
            btn.style.display = 'none';
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Ripristina elementi dopo la stampa
        document.querySelectorAll('.copy-button').forEach(btn => {
            btn.style.display = 'block';
        });
    });
}

// Inizializza ottimizzazioni per la stampa
optimizeForPrint();

// Esporta funzioni utili
window.HomeworkUtils = {
    addCopyButton,
    highlightSyntax,
    formatDate,
    makeChartsInteractive
};
