// --- MENU RESPONSIVO MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fecha o menu móvel automaticamente ao clicar em uma seção
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// --- BANCO DE DADOS E LÓGICA DO QUIZ ---
const quizData = [
    {
        question: "Qual tecnologia evita o desperdício severo de água na agricultura?",
        options: ["Tratores maiores", "Irrigação por gotejamento inteligente", "Arado profundo do solo"],
        correct: 1,
        explanation: "Correto! A irrigação inteligente monitora a umidade do solo e aplica água gota a gota direto na raiz."
    },
    {
        question: "O que caracteriza a prática da agricultura regenerativa?",
        options: ["Recuperar a saúde do solo enquanto produz", "Usar mais defensivos químicos", "Expandir a área desmatando florestas"],
        correct: 0,
        explanation: "Exato! Ela foca em restaurar e enriquecer a biodiversidade do solo ao invés de apenas esgotá-lo."
    }
];

let currentQuestionIndex = 0;

function loadQuiz() {
    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById('quiz-question').innerText = currentQuiz.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    document.getElementById('quiz-feedback').innerText = '';

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('quiz-btn');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    
    if (selectedIndex === currentQuiz.correct) {
        feedbackEl.style.color = "#2d6a4f"; // Cor verde claro para acertos
        feedbackEl.innerText = currentQuiz.explanation + " Avançando...";
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuiz();
            } else {
                document.getElementById('quiz-question').innerText = "Parabéns!";
                document.getElementById('quiz-options').innerHTML = "<p style='text-align:center;'>Você concluiu o teste de conhecimento socioambiental!</p>";
                feedbackEl.innerText = "";
            }
        }, 3000);
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.innerText = "Resposta incorreta. Tente analisar o cenário novamente!";
    }
}

// --- SIMULAÇÃO DE ENVIO DO FORMULÁRIO ---
function handleFormSubmit(event) {
    event.preventDefault();
    alert("Obrigado pelo contato! Sua mensagem foi enviada com sucesso e nossa equipe vai analisar sua sugestão para o campo.");
    event.target.reset();
}

// Executa a inicialização do Quiz assim que o site carrega
window.onload = () => {
    loadQuiz();
};