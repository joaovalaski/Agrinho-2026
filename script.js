// --- MENU RESPONSIVO MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// Abre/fecha o menu mobile ao clicar nas barras
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fecha o menu móvel automaticamente ao clicar em um link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// --- BANCO DE DADOS DO QUIZ ---
const quizData = [
    {
        question: "Qual tecnologia evita o desperdício severo de água na agricultura?",
        options: ["Tratores maiores", "Irrigação por gotejamento inteligente", "Arado profundo do solo"],
        correct: 1,
        explanation: "🎉 Correto! A irrigação inteligente monitora a umidade do solo e aplica água gota a gota direto na raiz."
    },
    {
        question: "O que caracteriza a prática da agricultura regenerativa?",
        options: ["Recuperar a saúde do solo enquanto produz", "Usar mais defensivos químicos", "Expandir a área desmatando florestas"],
        correct: 0,
        explanation: "🎉 Exato! Ela foca em restaurar e enriquecer a biodiversidade do solo ao invés de apenas esgotá-lo."
    }
];

let currentQuestionIndex = 0;

// Carrega a questão atual na tela dentro do container css (.quiz-box)
function loadQuiz() {
    const quizBox = document.querySelector('.quiz-box');
    if (!quizBox) return; // Proteção caso a seção não exista na página

    const currentQuiz = quizData[currentQuestionIndex];
    
    // Injeta a estrutura de botões estilizados do CSS
    quizBox.innerHTML = `
        <h3>${currentQuiz.question}</h3>
        <div class="quiz-options">
            ${currentQuiz.options.map((option, index) => `
                <button type="button" class="quiz-btn" data-index="${index}">
                    ${option}
                </button>
            `).join('')}
        </div>
        <div id="quiz-feedback" style="margin-top: 15px; font-weight: bold; font-size: 1.1rem; min-height: 26px;"></div>
        <div id="quiz-actions" style="margin-top: 20px;"></div>
    `;

    // Vincula o evento de clique em cada botão gerado
    document.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const indexSelecionado = parseInt(e.target.dataset.index);
            checkAnswer(indexSelecionado);
        });
    });
}

// Verifica a resposta e pinta os botões (Verde para Certo, Vermelho para Errado)
function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackContainer = document.getElementById('quiz-feedback');
    const actionsContainer = document.getElementById('quiz-actions');
    const buttons = document.querySelectorAll('.quiz-btn');

    // Desabilita todos os botões após o primeiro clique para evitar trapaça
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        
        if (index === currentQuiz.correct) {
            // Destaca a alternativa correta em Verde
            btn.style.borderColor = "var(--verde-destaque)";
            btn.style.backgroundColor = "#e8f5e9";
            btn.style.color = "var(--verde-escuro)";
        } else if (index === selectedIndex) {
            // Destaca a alternativa errada que o usuário clicou em Vermelho
            btn.style.borderColor = "#e63946";
            btn.style.backgroundColor = "#ffe5ec";
            btn.style.color = "#b7094c";
        }
    });

    // Escreve o texto de feedback na tela
    if (selectedIndex === currentQuiz.correct) {
        feedbackContainer.style.color = "var(--verde-claro)";
        feedbackContainer.innerText = currentQuiz.explanation;
    } else {
        feedbackContainer.style.color = "#e63946";
        feedbackContainer.innerText = `❌ Incorreto. A resposta certa era: "${currentQuiz.options[currentQuiz.correct]}"`;
    }

    // Cria dinamicamente o botão de Avançar ou Reiniciar usando a classe de botão do formulário (.btn-submit)
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn-submit';
    nextBtn.style.padding = '0.8rem 1.5rem';

    if (currentQuestionIndex < quizData.length - 1) {
        nextBtn.innerText = "Próxima Pergunta ➔";
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuiz();
        });
    } else {
        nextBtn.innerText = "🔄 Reiniciar Quiz";
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            loadQuiz();
        });
    }
    
    actionsContainer.appendChild(nextBtn);
}

// Inicializa o quiz quando a página estiver totalmente carregada
document.addEventListener('DOMContentLoaded', loadQuiz);
