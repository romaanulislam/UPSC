// UPSC Current Affairs Organizer - Main Application JavaScript

class CurrentAffairsApp {
    constructor() {
        this.data = {
            categories: [
                {
                    name: "Polity & Governance",
                    color: "#3B82F6",
                    icon: "🏛️",
                    articles: [
                        {
                            id: 1,
                            title: "Digital Personal Data Protection Act Implementation",
                            summary: "Government releases draft rules for Digital Personal Data Protection Act 2023 with focus on consent mechanisms and data localization requirements.",
                            source: "The Hindu",
                            date: "2025-05-29",
                            priority: "High",
                            tags: ["Data Protection", "Privacy", "Digital Rights"],
                            bookmarked: false,
                            read: false,
                            notes: ""
                        },
                        {
                            id: 2,
                            title: "One Nation One Election Committee Report",
                            summary: "Parliamentary committee submits recommendations on simultaneous elections for Lok Sabha and state assemblies, addressing constitutional and logistical challenges.",
                            source: "Indian Express",
                            date: "2025-05-28",
                            priority: "High",
                            tags: ["Elections", "Constitutional Reform", "Democracy"],
                            bookmarked: true,
                            read: true,
                            notes: "Important for constitutional reforms section. Focus on practical challenges and federal structure implications."
                        }
                    ]
                },
                {
                    name: "Economy & Finance",
                    color: "#10B981",
                    icon: "💰",
                    articles: [
                        {
                            id: 3,
                            title: "RBI Monetary Policy Review May 2025",
                            summary: "Reserve Bank of India maintains repo rate at 6.5% while revising GDP growth forecast to 7.2% for FY26 amid global economic uncertainties.",
                            source: "Business Standard",
                            date: "2025-05-27",
                            priority: "High",
                            tags: ["Monetary Policy", "Interest Rates", "GDP Growth"],
                            bookmarked: true,
                            read: false,
                            notes: ""
                        }
                    ]
                },
                {
                    name: "International Relations",
                    color: "#8B5CF6",
                    icon: "🌍",
                    articles: [
                        {
                            id: 4,
                            title: "India-UAE Comprehensive Economic Partnership Agreement Review",
                            summary: "First annual review of India-UAE CEPA shows 15% increase in bilateral trade, with focus on expanding cooperation in renewable energy and technology sectors.",
                            source: "The Hindu",
                            date: "2025-05-26",
                            priority: "Medium",
                            tags: ["Trade Agreement", "UAE", "Economic Partnership"],
                            bookmarked: false,
                            read: true,
                            notes: ""
                        }
                    ]
                },
                {
                    name: "Science & Technology",
                    color: "#F59E0B",
                    icon: "🔬",
                    articles: [
                        {
                            id: 5,
                            title: "ISRO's Shukrayaan-1 Venus Mission Update",
                            summary: "Indian Space Research Organisation announces successful completion of critical design review for Venus mission, scheduled for launch in December 2025.",
                            source: "Indian Express",
                            date: "2025-05-25",
                            priority: "High",
                            tags: ["ISRO", "Space Mission", "Venus", "Space Exploration"],
                            bookmarked: true,
                            read: false,
                            notes: ""
                        }
                    ]
                },
                {
                    name: "Environment & Ecology",
                    color: "#059669",
                    icon: "🌱",
                    articles: [
                        {
                            id: 6,
                            title: "National Green Hydrogen Mission Progress Report",
                            summary: "Ministry of New and Renewable Energy reports establishment of 50 Green Hydrogen production facilities under National Green Hydrogen Mission with 2 GW capacity.",
                            source: "Economic Times",
                            date: "2025-05-24",
                            priority: "Medium",
                            tags: ["Green Hydrogen", "Renewable Energy", "Climate Action"],
                            bookmarked: false,
                            read: true,
                            notes: ""
                        }
                    ]
                },
                {
                    name: "Society & Social Issues",
                    color: "#DC2626",
                    icon: "👥",
                    articles: []
                },
                {
                    name: "Defense & Security",
                    color: "#7C2D12",
                    icon: "🛡️",
                    articles: []
                },
                {
                    name: "Art & Culture",
                    color: "#BE185D",
                    icon: "🎨",
                    articles: []
                },
                {
                    name: "Geography & Disasters",
                    color: "#B45309",
                    icon: "🌍",
                    articles: []
                },
                {
                    name: "Miscellaneous",
                    color: "#6B7280",
                    icon: "📁",
                    articles: []
                }
            ],
            sources: ["The Hindu", "Indian Express", "Business Standard", "Economic Times", "PIB", "Yojana Magazine"],
            priorities: ["High", "Medium", "Low"],
            userStats: {
                totalArticles: 6,
                readToday: 2,
                bookmarked: 3,
                streak: 15
            }
        };

        this.currentArticleId = 6;
        this.currentQuizIndex = 0;
        this.quizQuestions = [];
        this.quizScore = 0;

        this.init();
    }

    init() {
        this.updateCurrentDate();
        this.updateStats();
        this.populateFilters();
        this.renderCategories();
        this.renderArticles();
        this.setupEventListeners();
        this.generateQuizQuestions();
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN', options);
        
        // Set today's date as default in add article form
        const today = now.toISOString().split('T')[0];
        document.getElementById('articleDate').value = today;
    }

    updateStats() {
        const stats = this.calculateStats();
        document.getElementById('totalArticles').textContent = stats.total;
        document.getElementById('readToday').textContent = stats.readToday;
        document.getElementById('bookmarkedCount').textContent = stats.bookmarked;
        document.getElementById('streakCount').textContent = stats.streak;
    }

    calculateStats() {
        const allArticles = this.getAllArticles();
        const today = new Date().toISOString().split('T')[0];
        
        return {
            total: allArticles.length,
            readToday: allArticles.filter(article => 
                article.read && article.date === today
            ).length,
            bookmarked: allArticles.filter(article => article.bookmarked).length,
            streak: this.data.userStats.streak
        };
    }

    getAllArticles() {
        return this.data.categories.flatMap(category => category.articles);
    }

    populateFilters() {
        // Populate category filter
        const categoryFilter = document.getElementById('categoryFilter');
        this.data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });

        // Populate source filter
        const sourceFilter = document.getElementById('sourceFilter');
        this.data.sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            sourceFilter.appendChild(option);
        });

        // Populate add article form
        const articleSource = document.getElementById('articleSource');
        const articleCategory = document.getElementById('articleCategory');
        
        this.data.sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            articleSource.appendChild(option);
        });

        this.data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            articleCategory.appendChild(option);
        });
    }

    renderCategories() {
        const grid = document.getElementById('categoriesGrid');
        grid.innerHTML = '';

        this.data.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.style.borderLeftColor = category.color;
            card.onclick = () => this.filterByCategory(category.name);

            card.innerHTML = `
                <div class="category-card__header">
                    <div class="category-card__icon">${category.icon}</div>
                    <div>
                        <div class="category-card__name">${category.name}</div>
                        <div class="category-card__count">${category.articles.length} articles</div>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    renderArticles(articles = null) {
        const grid = document.getElementById('articlesGrid');
        const articlesToRender = articles || this.getFilteredAndSortedArticles();

        if (articlesToRender.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state__icon">📄</div>
                    <p>No articles found matching your criteria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';

        articlesToRender.forEach(article => {
            const card = document.createElement('div');
            card.className = `article-card ${article.read ? 'article-card--read' : ''} ${article.bookmarked ? 'article-card--bookmarked' : ''}`;

            const category = this.data.categories.find(cat => 
                cat.articles.some(a => a.id === article.id)
            );

            card.innerHTML = `
                <div class="article-card__header">
                    <h3 class="article-card__title">${article.title}</h3>
                    <div class="article-card__meta">
                        <span class="article-source">${article.source}</span>
                        <span class="article-date">${this.formatDate(article.date)}</span>
                        <span class="article-priority article-priority--${article.priority.toLowerCase()}">${article.priority}</span>
                    </div>
                </div>
                <p class="article-card__summary">${article.summary}</p>
                <div class="article-card__tags">
                    ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
                <div class="article-card__actions">
                    <button class="btn btn--sm btn--outline" onclick="app.toggleRead(${article.id})">
                        ${article.read ? '✓ Read' : 'Mark Read'}
                    </button>
                    <button class="btn btn--sm btn--outline" onclick="app.toggleBookmark(${article.id})">
                        ${article.bookmarked ? '🔖 Saved' : 'Bookmark'}
                    </button>
                    <button class="btn btn--sm btn--secondary" onclick="app.openArticleDetail(${article.id})">
                        View Details
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    getFilteredAndSortedArticles() {
        let articles = this.getAllArticles();

        // Apply filters
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const sourceFilter = document.getElementById('sourceFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        if (searchTerm) {
            articles = articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.summary.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        if (categoryFilter) {
            const category = this.data.categories.find(cat => cat.name === categoryFilter);
            articles = category ? category.articles : [];
        }

        if (sourceFilter) {
            articles = articles.filter(article => article.source === sourceFilter);
        }

        if (priorityFilter) {
            articles = articles.filter(article => article.priority === priorityFilter);
        }

        // Apply sorting
        const sortBy = document.getElementById('sortSelect').value;
        switch (sortBy) {
            case 'date-desc':
                articles.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-asc':
                articles.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'priority':
                const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                articles.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
                break;
            case 'title':
                articles.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return articles;
    }

    filterByCategory(categoryName) {
        document.getElementById('categoryFilter').value = categoryName;
        this.renderArticles();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }

    toggleRead(articleId) {
        const article = this.findArticleById(articleId);
        if (article) {
            article.read = !article.read;
            this.updateStats();
            this.renderArticles();
        }
    }

    toggleBookmark(articleId) {
        const article = this.findArticleById(articleId);
        if (article) {
            article.bookmarked = !article.bookmarked;
            this.updateStats();
            this.renderArticles();
        }
    }

    findArticleById(id) {
        return this.getAllArticles().find(article => article.id === id);
    }

    openArticleDetail(articleId) {
        const article = this.findArticleById(articleId);
        if (!article) return;

        document.getElementById('articleDetailTitle').textContent = article.title;
        document.getElementById('articleDetailSource').textContent = article.source;
        document.getElementById('articleDetailDate').textContent = this.formatDate(article.date);
        document.getElementById('articleDetailPriority').textContent = article.priority;
        document.getElementById('articleDetailContent').textContent = article.summary;
        
        // Populate tags
        const tagsContainer = document.getElementById('articleDetailTags');
        tagsContainer.innerHTML = article.tags.map(tag => 
            `<span class="article-tag">${tag}</span>`
        ).join('');

        // Load existing notes
        document.getElementById('articleNotes').value = article.notes || '';

        // Store current article ID for saving notes
        this.currentDetailArticleId = articleId;

        this.showModal('articleDetailModal');
    }

    saveNotes() {
        const article = this.findArticleById(this.currentDetailArticleId);
        if (article) {
            article.notes = document.getElementById('articleNotes').value;
            // Show success feedback
            const btn = document.getElementById('saveNotesBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Saved!';
            btn.classList.add('btn--success');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('btn--success');
            }, 2000);
        }
    }

    addArticle() {
        // Get form values directly
        const title = document.getElementById('articleTitle').value.trim();
        const summary = document.getElementById('articleSummary').value.trim();
        const source = document.getElementById('articleSource').value;
        const categoryName = document.getElementById('articleCategory').value;
        const priority = document.getElementById('articlePriority').value;
        const tags = document.getElementById('articleTags').value;
        const date = document.getElementById('articleDate').value;

        // Validate required fields
        if (!title || !summary || !source || !categoryName) {
            alert('Please fill in all required fields (Title, Summary, Source, Category)');
            return;
        }

        const newArticle = {
            id: ++this.currentArticleId,
            title: title,
            summary: summary,
            source: source,
            date: date || new Date().toISOString().split('T')[0],
            priority: priority,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            bookmarked: false,
            read: false,
            notes: ''
        };

        const category = this.data.categories.find(cat => cat.name === categoryName);
        
        if (category) {
            category.articles.push(newArticle);
            this.updateStats();
            this.renderCategories();
            this.renderArticles();
            this.hideModal('addArticleModal');
            
            // Reset form
            document.getElementById('addArticleForm').reset();
            
            // Reset date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('articleDate').value = today;
            
            // Show success message
            alert('Article added successfully!');
        }
    }

    showBookmarks() {
        const bookmarkedArticles = this.getAllArticles().filter(article => article.bookmarked);
        const container = document.getElementById('bookmarksContent');

        if (bookmarkedArticles.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state__icon">🔖</div>
                    <p>No bookmarked articles yet.</p>
                </div>
            `;
        } else {
            container.innerHTML = '';
            bookmarkedArticles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'article-card';
                card.innerHTML = `
                    <div class="article-card__header">
                        <h3 class="article-card__title">${article.title}</h3>
                        <div class="article-card__meta">
                            <span class="article-source">${article.source}</span>
                            <span class="article-date">${this.formatDate(article.date)}</span>
                        </div>
                    </div>
                    <p class="article-card__summary">${article.summary}</p>
                    <div class="article-card__actions">
                        <button class="btn btn--sm btn--secondary" onclick="app.openArticleDetail(${article.id})">
                            View Details
                        </button>
                        <button class="btn btn--sm btn--outline" onclick="app.toggleBookmark(${article.id}); app.showBookmarks();">
                            Remove Bookmark
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        this.showModal('bookmarksModal');
    }

    showProgress() {
        this.updateProgressStats();
        this.renderProgressChart();
        this.showModal('progressModal');
    }

    updateProgressStats() {
        const allArticles = this.getAllArticles();
        const readArticles = allArticles.filter(article => article.read);
        
        // Calculate weekly progress (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyCount = readArticles.filter(article => 
            new Date(article.date) >= weekAgo
        ).length;

        // Calculate monthly progress (last 30 days)
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        const monthlyCount = readArticles.filter(article => 
            new Date(article.date) >= monthAgo
        ).length;

        // Find most active category
        const categoryStats = {};
        readArticles.forEach(article => {
            const category = this.data.categories.find(cat => 
                cat.articles.some(a => a.id === article.id)
            );
            if (category) {
                categoryStats[category.name] = (categoryStats[category.name] || 0) + 1;
            }
        });

        const topCategory = Object.keys(categoryStats).reduce((a, b) => 
            categoryStats[a] > categoryStats[b] ? a : b, 'None'
        );

        document.getElementById('weeklyProgress').textContent = weeklyCount;
        document.getElementById('monthlyProgress').textContent = monthlyCount;
        document.getElementById('topCategory').textContent = topCategory;
    }

    renderProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        // Category-wise reading data
        const categoryData = this.data.categories.map(category => ({
            label: category.name,
            data: category.articles.filter(article => article.read).length,
            backgroundColor: category.color + '80', // Add transparency
            borderColor: category.color,
            borderWidth: 1
        }));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.categories.map(cat => cat.name),
                datasets: [{
                    label: 'Articles Read',
                    data: this.data.categories.map(cat => 
                        cat.articles.filter(article => article.read).length
                    ),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    generateQuizQuestions() {
        const allArticles = this.getAllArticles();
        this.quizQuestions = allArticles.map(article => ({
            question: `Which source published: "${article.title}"?`,
            options: this.shuffleArray([
                article.source,
                ...this.data.sources.filter(s => s !== article.source).slice(0, 3)
            ]),
            correct: article.source,
            articleId: article.id
        }));
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startQuiz() {
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.generateQuizQuestions();
        this.showQuizQuestion();
        document.getElementById('startQuizBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'block';
    }

    showQuizQuestion() {
        if (this.currentQuizIndex >= this.quizQuestions.length) {
            this.showQuizResult();
            return;
        }

        const question = this.quizQuestions[this.currentQuizIndex];
        document.getElementById('quizQuestion').textContent = question.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.onclick = () => this.selectQuizOption(button, option, question.correct);
            optionsContainer.appendChild(button);
        });

        document.getElementById('quizResult').textContent = '';
        document.getElementById('nextQuestionBtn').textContent = 'Next Question';
    }

    selectQuizOption(button, selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.style.pointerEvents = 'none');

        if (selected === correct) {
            button.classList.add('correct');
            this.quizScore++;
            document.getElementById('quizResult').textContent = 'Correct! ✓';
        } else {
            button.classList.add('incorrect');
            document.getElementById('quizResult').textContent = `Incorrect. The answer is: ${correct}`;
            // Highlight correct answer
            options.forEach(opt => {
                if (opt.textContent === correct) {
                    opt.classList.add('correct');
                }
            });
        }
    }

    nextQuestion() {
        this.currentQuizIndex++;
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => {
            opt.style.pointerEvents = 'auto';
            opt.classList.remove('correct', 'incorrect');
        });

        if (this.currentQuizIndex >= this.quizQuestions.length) {
            document.getElementById('nextQuestionBtn').textContent = 'Show Results';
        }
        
        this.showQuizQuestion();
    }

    showQuizResult() {
        const percentage = Math.round((this.quizScore / this.quizQuestions.length) * 100);
        document.getElementById('quizQuestion').textContent = 'Quiz Complete!';
        document.getElementById('quizOptions').innerHTML = '';
        document.getElementById('quizResult').innerHTML = `
            <div style="text-align: center; font-size: 18px; margin: 20px 0;">
                <div>Score: ${this.quizScore}/${this.quizQuestions.length}</div>
                <div>Percentage: ${percentage}%</div>
                <div style="margin-top: 10px;">
                    ${percentage >= 70 ? '🎉 Excellent!' : percentage >= 50 ? '👍 Good job!' : '📚 Keep studying!'}
                </div>
            </div>
        `;
        document.getElementById('nextQuestionBtn').style.display = 'none';
        document.getElementById('startQuizBtn').style.display = 'block';
        document.getElementById('startQuizBtn').textContent = 'Start New Quiz';
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('sourceFilter').value = '';
        document.getElementById('priorityFilter').value = '';
        this.renderArticles();
    }

    setupEventListeners() {
        // Modal controls
        document.querySelectorAll('.modal__close, [data-modal]').forEach(element => {
            element.addEventListener('click', (e) => {
                const modalId = element.getAttribute('data-modal') || 
                               element.closest('.modal').id;
                this.hideModal(modalId);
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Header navigation
        document.getElementById('addArticleBtn').addEventListener('click', () => {
            this.showModal('addArticleModal');
        });

        document.getElementById('bookmarksBtn').addEventListener('click', () => {
            this.showBookmarks();
        });

        document.getElementById('progressBtn').addEventListener('click', () => {
            this.showProgress();
        });

        document.getElementById('quizBtn').addEventListener('click', () => {
            this.showModal('quizModal');
        });

        // Form submission - Fixed to use direct method call instead of FormData
        document.getElementById('addArticleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addArticle();
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderArticles();
        });

        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderArticles();
        });

        document.getElementById('sourceFilter').addEventListener('change', () => {
            this.renderArticles();
        });

        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.renderArticles();
        });

        document.getElementById('sortSelect').addEventListener('change', () => {
            this.renderArticles();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Notes saving
        document.getElementById('saveNotesBtn').addEventListener('click', () => {
            this.saveNotes();
        });

        // Quiz controls
        document.getElementById('startQuizBtn').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('nextQuestionBtn').addEventListener('click', () => {
            this.nextQuestion();
        });
    }
}

// Initialize the application
const app = new CurrentAffairsApp();