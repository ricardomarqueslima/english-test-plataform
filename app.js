// Application State
let currentUser = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testStartTime = null;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
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
const restartBtn = document.getElementById('restart-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loginForm.addEventListener('submit', handleLogin);
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    finishBtn.addEventListener('click', finishTest);
    restartBtn.addEventListener('click', restartTest);
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (fullName && email) {
        currentUser = { fullName, email, testDate: new Date().toISOString() };
        userAnswers = new Array(questions.length).fill(null);
        testStartTime = new Date();
        
        showScreen('test-screen');
        loadQuestion(0);
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
    const testEndTime = new Date();
    const duration = Math.floor((testEndTime - testStartTime) / 1000 / 60); // minutes
    
    const results = calculateResults();
    
    // Save to localStorage for admin access
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
                isCorrect = selectedOption && selectedOption.correct;
                correctAnswer = question.options.find(opt => opt.correct).text;
                explanation = question.options.find(opt => opt.correct).explanation;
                break;
            case 'drag-drop':
            case 'fill-blank':
                isCorrect = userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
                correctAnswer = question.correctAnswer;
                explanation = question.explanation;
                break;
        }
        
        if (isCorrect) correctCount++;
        
        detailedResults.push({
            question: question.question,
            userAnswer: userAnswer || 'Não respondida',
            correctAnswer,
            isCorrect,
            explanation
        });
    });
    
    return {
        score: correctCount,
        total: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
        detailedResults
    };
}

function saveTestResults(results, duration) {
    const testResult = {
        user: currentUser,
        results,
        duration,
        timestamp: new Date().toISOString()
    };
    
    // Get existing results
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    existingResults.push(testResult);
    localStorage.setItem('testResults', JSON.stringify(existingResults));
}

function showResults(results, duration) {
    finalScore.textContent = results.score;
    
    // Score message based on percentage
    let message = '';
    if (results.percentage >= 90) {
        message = 'Excelente! Você acertou ' + results.percentage + '% das questões!';
    } else if (results.percentage >= 70) {
        message = 'Muito bem! Você acertou ' + results.percentage + '% das questões!';
    } else if (results.percentage >= 50) {
        message = 'Bom trabalho! Você acertou ' + results.percentage + '% das questões!';
    } else {
        message = 'Continue estudando! Você acertou ' + results.percentage + '% das questões.';
    }
    
    scoreMessage.textContent = message;
    
    // Render detailed results
    detailedResults.innerHTML = '';
    results.detailedResults.forEach((result, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
        
        resultDiv.innerHTML = `
            <div class="question-review">
                <strong>Questão ${index + 1}:</strong> ${result.question.substring(0, 100)}...
            </div>
            <div class="user-answer">
                <strong>Sua resposta:</strong> ${result.userAnswer}
            </div>
            <div class="correct-answer">
                <strong>Resposta correta:</strong> ${result.correctAnswer}
            </div>
            <div class="explanation">
                <strong>Explicação:</strong> ${result.explanation}
            </div>
        `;
        
        detailedResults.appendChild(resultDiv);
    });
    
    showScreen('results-screen');
}

function restartTest() {
    currentUser = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    testStartTime = null;
    
    document.getElementById('login-form').reset();
    showScreen('login-screen');
}

// Admin Dashboard Functions
function getAdminData() {
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');
    return {
        totalTests: results.length,
        averageScore: results.length > 0 
            ? Math.round(results.reduce((sum, r) => sum + r.results.score, 0) / results.length)
            : 0,
        results: results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
}

// Export for admin page
window.EnglishTestApp = {
    getAdminData,
    questions
};
