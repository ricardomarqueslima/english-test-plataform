// Application State
let currentUser = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testStartTime = null;
let testTimer = null;
let timeRemaining = 7200; // 2 hours in seconds
let hasStartedTest = false;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const testScreen = document.getElementById('test-screen');
const resultsScreen = document.getElementById('results-screen');
const loginForm = document.getElementById('login-form');
const questionContainer = document.getElementById('question-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const detailedResults = document.getElementById('detailed-results');
const testDuration = document.getElementById('test-duration');
const timerDisplay = document.getElementById('timer');
const understandRules = document.getElementById('understand-rules');
const startTestBtn = document.getElementById('start-test');
const backToLoginBtn = document.getElementById('back-to-login');
const printResultsBtn = document.getElementById('print-results');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    checkIfAlreadyTaken();
});

// Função para embaralhar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array]; // Criar cópia para não modificar o original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para embaralhar as opções das questões de múltipla escolha
function shuffleQuestionOptions() {
    questions.forEach(question => {
        if (question.type === 'multiple-choice' && question.options) {
            // Embaralhar as opções mantendo o mapeamento de qual é a correta
            question.options = shuffleArray(question.options);
        }
        
        if (question.type === 'drag-drop' && question.options) {
            // Embaralhar as opções de arrastar e soltar
            question.options = shuffleArray(question.options);
        }
        
        if (question.type === 'fill-blank' && question.options) {
            // Embaralhar as opções de preenchimento
            question.options = shuffleArray(question.options);
        }
    });
}

function initializeApp() {
    loginForm.addEventListener('submit', handleLogin);
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    finishBtn.addEventListener('click', finishTest);
    startTestBtn.addEventListener('click', startTest);
    backToLoginBtn.addEventListener('click', backToLogin);
    printResultsBtn.addEventListener('click', printResults);
    understandRules.addEventListener('change', toggleStartButton);
    
    // Anti-cheat measures
    window.addEventListener('beforeunload', handlePageUnload);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Disable right-click and certain keys during test
    document.addEventListener('contextmenu', (e) => {
        if (hasStartedTest) e.preventDefault();
    });
    
    document.addEventListener('keydown', (e) => {
        if (hasStartedTest) {
            // Disable F12, Ctrl+Shift+I, Ctrl+U, F5, Ctrl+R
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u') ||
                e.key === 'F5' ||
                (e.ctrlKey && e.key === 'r')) {
                e.preventDefault();
            }
        }
    });
}

function checkIfAlreadyTaken() {
    const testResults = localStorage.getItem('testResults');
    if (testResults) {
        const results = JSON.parse(testResults);
        if (results.length > 0) {
            // Test already taken, show results
            showScreen('results-screen');
            displayPreviousResults(results[results.length - 1]);
        }
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (fullName && email) {
        currentUser = { fullName, email, testDate: new Date().toISOString() };
        
        // Embaralhar as alternativas das questões de múltipla escolha para este usuário
        shuffleQuestionOptions();
        
        showScreen('instructions-screen');
    }
}

function toggleStartButton() {
    startTestBtn.disabled = !understandRules.checked;
}

function startTest() {
    hasStartedTest = true;
    userAnswers = new Array(questions.length).fill(null);
    testStartTime = new Date();
    
    showScreen('test-screen');
    startTimer();
    loadQuestion(0);
}

function backToLogin() {
    showScreen('login-screen');
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    understandRules.checked = false;
    toggleStartButton();
}

function startTimer() {
    testTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            autoFinishTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    timerDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Change color when time is running low
    if (timeRemaining <= 300) { // 5 minutes
        timerDisplay.style.color = '#ff0000';
        timerDisplay.style.fontWeight = 'bold';
    } else if (timeRemaining <= 600) { // 10 minutes
        timerDisplay.style.color = '#ff6600';
    }
}

function autoFinishTest() {
    alert('Tempo esgotado! A prova será finalizada automaticamente.');
    finishTest();
}

// Anti-cheat functions
function handlePageUnload(e) {
    if (hasStartedTest && !confirm('Tem certeza que deseja sair? A prova será encerrada!')) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
    if (hasStartedTest) {
        finishTest();
    }
}

function handleWindowBlur() {
    if (hasStartedTest) {
        alert('Você saiu da janela da prova! A prova será encerrada por motivos de segurança.');
        finishTest();
    }
}

function handleVisibilityChange() {
    if (hasStartedTest && document.hidden) {
        alert('Você mudou de aba! A prova será encerrada por motivos de segurança.');
        finishTest();
    }
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Question Navigation
function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Update progress
    const progress = ((index + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Questão ${index + 1} de ${questions.length}`;
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    finishBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    
    // Render question
    renderQuestion(question, index);
}

function renderQuestion(question, index) {
    questionContainer.innerHTML = '';
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-box';
    
    questionDiv.innerHTML = `
        <div class="question-number">Questão ${index + 1}</div>
        <div class="question-text">${question.question}</div>
        ${question.relatedText ? `<div class="related-text"><strong>Texto de referência:</strong><br>${question.relatedText}</div>` : ''}
        ${question.hint ? `<div class="hint"><i class="fas fa-lightbulb"></i> ${question.hint}</div>` : ''}
        <div class="answer-container" id="answer-container-${index}"></div>
    `;
    
    questionContainer.appendChild(questionDiv);
    
    // Render answer type based on question type
    const answerContainer = document.getElementById(`answer-container-${index}`);
    
    switch(question.type) {
        case 'multiple-choice':
            renderMultipleChoice(question, answerContainer);
            break;
        case 'drag-drop':
            renderDragDrop(question, answerContainer);
            break;
        case 'fill-blank':
            renderFillBlank(question, answerContainer);
            break;
    }
}

// Answer Type Renderers
function renderMultipleChoice(question, container) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'answer-options';
    
    question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.dataset.option = optionIndex;
        
        optionDiv.innerHTML = `
            <input type="radio" name="q${question.id}" id="q${question.id}o${optionIndex}" value="${optionIndex}">
            <label for="q${question.id}o${optionIndex}">${option.text}</label>
        `;
        
        optionDiv.addEventListener('click', () => {
            selectAnswer(question.id, optionIndex);
            document.querySelectorAll(`#${container.id} .answer-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            optionDiv.classList.add('selected');
        });
        
        optionsDiv.appendChild(optionDiv);
    });
    
    container.appendChild(optionsDiv);
    
    // Restore previous selection
    if (userAnswers[currentQuestionIndex] !== null) {
        const selectedOption = container.querySelector(`[data-option="${userAnswers[currentQuestionIndex]}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.querySelector('input').checked = true;
        }
    }
}

function renderDragDrop(question, container) {
    const dragDropDiv = document.createElement('div');
    dragDropDiv.className = 'drag-drop-container';
    
    if (question.baseWord) {
        // Suffix drag-drop
        dragDropDiv.innerHTML = `
            <div class="word-completion">
                <span class="base-word">${question.baseWord}</span>
                <span class="drop-zone" id="drop-zone-${question.id}">_____</span>
            </div>
            <div class="drag-items">
                ${question.options.map((option, index) => 
                    `<div class="drag-item" draggable="true" data-value="${option}">${option}</div>`
                ).join('')}
            </div>
        `;
    } else {
        // Regular drag-drop
        dragDropDiv.innerHTML = `
            <div class="drop-zone" id="drop-zone-${question.id}">Arraste a resposta correta aqui</div>
            <div class="drag-items">
                ${question.options.map((option, index) => 
                    `<div class="drag-item" draggable="true" data-value="${option}">${option}</div>`
                ).join('')}
            </div>
        `;
    }
    
    container.appendChild(dragDropDiv);
    
    // Setup drag and drop
    setupDragDrop(question, container);
    
    // Restore previous selection
    if (userAnswers[currentQuestionIndex] !== null) {
        const dropZone = container.querySelector(`#drop-zone-${question.id}`);
        dropZone.textContent = userAnswers[currentQuestionIndex];
        dropZone.classList.add('filled');
    }
}

function renderFillBlank(question, container) {
    const fillBlankDiv = document.createElement('div');
    fillBlankDiv.className = 'fill-blank-container';
    
    // Add options if available
    if (question.options) {
        fillBlankDiv.innerHTML = `
            <div class="fill-blank-options">
                ${question.options.map((option, index) => 
                    `<button class="option-btn" data-value="${option}">${option}</button>`
                ).join('')}
            </div>
        `;
    }
    
    const parts = question.question.split('______');
    const inputDiv = document.createElement('div');
    inputDiv.className = 'fill-blank-input-container';
    inputDiv.innerHTML = `
        ${parts[0]}
        <input type="text" class="blank-input" id="blank-${question.id}" placeholder="resposta">
        ${parts[1] || ''}
    `;
    
    fillBlankDiv.appendChild(inputDiv);
    container.appendChild(fillBlankDiv);
    
    // Add event listeners for options
    if (question.options) {
        const optionBtns = container.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                const input = container.querySelector(`#blank-${question.id}`);
                input.value = value;
                selectAnswer(question.id, value);
                
                // Highlight selected option
                optionBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }
    
    // Add event listener for input
    const input = container.querySelector(`#blank-${question.id}`);
    input.addEventListener('input', (e) => {
        selectAnswer(question.id, e.target.value.trim());
        
        // Update button selection if typing matches an option
        if (question.options) {
            const optionBtns = container.querySelectorAll('.option-btn');
            optionBtns.forEach(btn => {
                if (btn.dataset.value === e.target.value.trim()) {
                    optionBtns.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                }
            });
        }
    });
    
    // Restore previous answer
    if (userAnswers[currentQuestionIndex] !== null) {
        input.value = userAnswers[currentQuestionIndex];
        
        // Highlight matching option button
        if (question.options) {
            const optionBtns = container.querySelectorAll('.option-btn');
            optionBtns.forEach(btn => {
                if (btn.dataset.value === userAnswers[currentQuestionIndex]) {
                    btn.classList.add('selected');
                }
            });
        }
    }
}

// Drag and Drop Setup
function setupDragDrop(question, container) {
    const dragItems = container.querySelectorAll('.drag-item');
    const dropZone = container.querySelector(`#drop-zone-${question.id}`);
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
        });
    });
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const value = e.dataTransfer.getData('text/plain');
        dropZone.textContent = value;
        dropZone.classList.add('filled');
        selectAnswer(question.id, value);
    });
}

// Answer Selection
function selectAnswer(questionId, answer) {
    userAnswers[currentQuestionIndex] = answer;
}

// Navigation Functions
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

// Test Completion
function finishTest() {
    if (testTimer) {
        clearInterval(testTimer);
    }
    
    hasStartedTest = false;
    const testEndTime = new Date();
    const duration = Math.floor((testEndTime - testStartTime) / 1000 / 60); // minutes
    
    const results = calculateResults();
    
    // Save to localStorage
    saveTestResults(results, duration);
    
    showResults(results, duration);
}

function calculateResults() {
    let correctCount = 0;
    const detailedResults = [];
    
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        let isCorrect = false;
        let correctAnswer = '';
        let explanation = '';
        
        switch(question.type) {
            case 'multiple-choice':
                const selectedOption = question.options[userAnswer];
                if (selectedOption) {
                    isCorrect = selectedOption.correct;
                    explanation = selectedOption.explanation;
                }
                const correctOption = question.options.find(opt => opt.correct);
                correctAnswer = correctOption ? correctOption.text : '';
                break;
                
            case 'drag-drop':
                isCorrect = userAnswer === question.correctAnswer || userAnswer === question.correctSuffix;
                correctAnswer = question.correctAnswer || question.correctSuffix;
                explanation = question.explanation;
                break;
                
            case 'fill-blank':
                isCorrect = userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
                correctAnswer = question.correctAnswer;
                explanation = question.explanation;
                break;
        }
        
        if (isCorrect) correctCount++;
        
        detailedResults.push({
            questionNumber: index + 1,
            question: question.question,
            userAnswer: userAnswer || 'Não respondida',
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
            explanation: explanation
        });
    });
    
    const score = Math.round((correctCount / questions.length) * 10 * 100) / 100; // Escala 0-10 com 2 decimais
    
    return {
        user: currentUser,
        score: score,
        correctCount: correctCount,
        totalQuestions: questions.length,
        detailedResults: detailedResults,
        completedAt: new Date().toISOString()
    };
}

function saveTestResults(results, duration) {
    // Salvar no localStorage (backup local)
    const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    testResults.push({
        ...results,
        duration: duration
    });
    localStorage.setItem('testResults', JSON.stringify(testResults));
    
    // Salvar no Firebase
    const resultData = {
        ...results,
        duration: duration,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    // Gerar um ID único para o resultado
    const newResultRef = database.ref('testResults').push();
    
    // Salvar no Firebase
    newResultRef.set(resultData)
        .then(() => {
            console.log('Resultado salvo no Firebase com sucesso!');
            // Adicionar indicador visual de salvamento
            showSaveStatus('success');
        })
        .catch((error) => {
            console.error('Erro ao salvar no Firebase:', error);
            showSaveStatus('error');
        });
}

function showResults(results, duration) {
    showScreen('results-screen');
    
    finalScore.textContent = results.score.toFixed(1);
    
    let message = '';
    let csLewisQuote = '';
    
    if (results.score === 10) {
        message = '🏆 PERFEITO! Nota máxima! Você demonstrou excelência absoluta no domínio da língua inglesa!';
        csLewisQuote = '"You are never too old to set another goal or to dream a new dream." - C.S. Lewis';
    } else if (results.score >= 9) {
        message = '🌟 EXCELENTE! Parabéns pelo resultado extraordinário! Seu domínio do inglês é impressionante!';
        csLewisQuote = '"Courage, dear heart." - C.S. Lewis';
    } else if (results.score >= 8) {
        message = '✨ MUITO BOM! Excelente desempenho! Você está no caminho certo para a fluência!';
        csLewisQuote = '"What you see and what you hear depends a great deal on where you are standing." - C.S. Lewis';
    } else if (results.score >= 7) {
        message = '👏 PARABÉNS! Você foi aprovado! Continue dedicando-se aos estudos!';
        csLewisQuote = '"We are what we believe we are." - C.S. Lewis';
    } else if (results.score >= 5) {
        message = '📚 Continue estudando! Você está progredindo, mas ainda há espaço para melhorias.';
        csLewisQuote = '"Hardships often prepare ordinary people for an extraordinary destiny." - C.S. Lewis';
    } else {
        message = '💪 Não desista! Todo expert já foi iniciante. Continue praticando!';
        csLewisQuote = '"There are far, far better things ahead than any we leave behind." - C.S. Lewis';
    }
    
    scoreMessage.innerHTML = `
        <div style="margin-bottom: 20px;">${message}</div>
        <div style="font-style: italic; color: #667eea; border-top: 2px solid #667eea; padding-top: 15px; margin-top: 15px;">
            ${csLewisQuote}
        </div>
    `;
    testDuration.textContent = `Tempo utilizado: ${duration} minutos`;
    
    // Show detailed results
    detailedResults.innerHTML = `
        <h3>Resultado Detalhado (${results.correctCount}/${results.totalQuestions} corretas)</h3>
        <div class="results-summary">
            ${results.detailedResults.map(result => `
                <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-header">
                        <span class="question-number">Questão ${result.questionNumber}</span>
                        <span class="result-status">
                            <i class="fas ${result.isCorrect ? 'fa-check' : 'fa-times'}"></i>
                            ${result.isCorrect ? 'Correto' : 'Incorreto'}
                        </span>
                    </div>
                    <div class="result-details">
                        <p><strong>Pergunta:</strong> ${result.question}</p>
                        <p><strong>Sua resposta:</strong> ${result.userAnswer}</p>
                        <p><strong>Resposta correta:</strong> ${result.correctAnswer}</p>
                        ${result.explanation ? `<p><strong>Explicação:</strong> ${result.explanation}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayPreviousResults(results) {
    finalScore.textContent = results.score.toFixed(1);
    scoreMessage.innerHTML = `
        <div>Você já realizou esta prova anteriormente.</div>
        <div style="margin-top: 15px; font-style: italic; color: #667eea;">
            "Once a king or queen of Narnia, always a king or queen of Narnia." - C.S. Lewis
        </div>
    `;
    testDuration.textContent = `Tempo utilizado: ${results.duration} minutos`;
    
    detailedResults.innerHTML = `
        <h3>Resultado Anterior (${results.correctCount}/${results.totalQuestions} corretas)</h3>
        <p><strong>Realizada em:</strong> ${new Date(results.completedAt).toLocaleString('pt-BR')}</p>
        <div class="results-summary">
            ${results.detailedResults.map(result => `
                <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-header">
                        <span class="question-number">Questão ${result.questionNumber}</span>
                        <span class="result-status">
                            <i class="fas ${result.isCorrect ? 'fa-check' : 'fa-times'}"></i>
                            ${result.isCorrect ? 'Correto' : 'Incorreto'}
                        </span>
                    </div>
                    <div class="result-details">
                        <p><strong>Pergunta:</strong> ${result.question}</p>
                        <p><strong>Sua resposta:</strong> ${result.userAnswer}</p>
                        <p><strong>Resposta correta:</strong> ${result.correctAnswer}</p>
                        ${result.explanation ? `<p><strong>Explicação:</strong> ${result.explanation}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function printResults() {
    window.print();
}

// Função para mostrar status de salvamento
function showSaveStatus(status) {
    const statusDiv = document.createElement('div');
    statusDiv.className = `save-status ${status}`;
    
    if (status === 'success') {
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Resultado salvo com sucesso na nuvem!';
        statusDiv.style.backgroundColor = '#4caf50';
    } else {
        statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro ao salvar. Resultado salvo apenas localmente.';
        statusDiv.style.backgroundColor = '#f44336';
    }
    
    statusDiv.style.cssText += `
        position: fixed;
        top: 20px;
        right: 20px;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(statusDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        statusDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => statusDiv.remove(), 300);
    }, 5000);
}