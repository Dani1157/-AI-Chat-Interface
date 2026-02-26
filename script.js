// NEXUS ULTRA AI - Your Personal Coding Mentor
// FEATURES: Multiple Chats + Smart Suggestions + Learning Path

class NexusUltraAI {
    constructor() {
        this.isProcessing = false;
        this.userLevel = 'beginner';
        this.lessonHistory = [];
        this.conversations = this.loadConversations();
        this.currentConversationId = this.conversations[0]?.id || this.createNewConversation();
        this.suggestions = [
            "Teach me Flexbox",
            "Show me CSS Grid",
            "Responsive navbar",
            "Card design",
            "Center a div",
            "CSS animations",
            "Modern buttons",
            "Portfolio project"
        ];
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        this.setupEventListeners();
        this.renderConversations();
        this.loadMessages(this.currentConversationId);
        this.updateStatus('ready');
    }
    
    setupEventListeners() {
        // Send button
        const sendBtn = document.getElementById('sendButton');
        if (sendBtn) sendBtn.onclick = () => this.sendMessage();
        
        // Enter key
        const input = document.getElementById('messageInput');
        if (input) {
            input.onkeydown = (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            };
        }
        
        // New chat button
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.onclick = () => this.createNewConversation();
        }
        
        // Clear chat button
        const clearBtn = document.getElementById('clearChatBtn');
        if (clearBtn) {
            clearBtn.onclick = () => {
                if (confirm('Clear all messages in this chat?')) {
                    this.clearCurrentChat();
                }
            };
        }
        
        // Search chats
        const searchInput = document.getElementById('searchChats');
        if (searchInput) {
            searchInput.oninput = (e) => this.searchConversations(e.target.value);
        }
        
        // Settings button (just for fun)
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.onclick = () => {
                alert('NEXUS AI Mentor v3.0\n\nFeatures:\n• Multiple Chats\n• Smart Suggestions\n• CSS Mastery\n• Project Ideas\n• Learning Path');
            };
        }
    }
    
    sendMessage() {
        if (this.isProcessing) return;
        
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage('user', message);
        input.value = '';
        this.saveMessage('user', message);
        
        this.showTyping();
        this.isProcessing = true;
        
        setTimeout(() => {
            const response = this.generateSmartResponse(message);
            this.hideTyping();
            this.addMessage('bot', response);
            this.saveMessage('bot', response);
            
            // Show suggestions after response
            this.showSuggestions(message);
            
            this.isProcessing = false;
        }, 800);
    }
    
    generateSmartResponse(message) {
        const msg = message.toLowerCase().trim();
        
        if (msg.includes('flex') || msg.includes('flexbox')) {
            return this.teachFlexbox();
        }
        
        if (msg.includes('grid')) {
            return this.teachGrid();
        }
        
        if (msg.includes('responsive') || msg.includes('mobile')) {
            return this.teachResponsive();
        }
        
        if (msg.includes('animation') || msg.includes('transition')) {
            return this.teachAnimations();
        }
        
        if (msg.includes('navbar') || msg.includes('nav bar') || msg.includes('menu')) {
            return this.teachNavbar();
        }
        
        if (msg.includes('card') || msg.includes('cards')) {
            return this.teachCards();
        }
        
        if (msg.includes('center') || msg.includes('centering')) {
            return this.teachCentering();
        }
        
        if (msg.includes('button') || msg.includes('buttons')) {
            return this.teachButtons();
        }
        
        if (msg.includes('form') || msg.includes('forms')) {
            return this.teachForms();
        }
        
        if (msg.includes('position') || msg.includes('absolute') || msg.includes('relative')) {
            return this.teachPosition();
        }
        
        if (msg.includes('learn') || msg.includes('start') || msg.includes('beginner')) {
            return this.getLearningPath();
        }
        
        if (msg.includes('project') || msg.includes('build') || msg.includes('create')) {
            return this.getProjectIdeas();
        }
        
        if (msg.includes('help') || msg.includes('debug')) {
            return this.getHelp();
        }
        
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            return "Hello! I'm your CSS mentor. Ask me about Flexbox, Grid, animations, or any CSS topic!";
        }
        
        return this.getDefaultResponse();
    }
    
    showSuggestions(lastMessage) {
        // Remove old suggestions
        const oldSuggestions = document.querySelector('.suggestions-container');
        if (oldSuggestions) oldSuggestions.remove();
        
        // Generate contextual suggestions based on last message
        let contextualSuggestions = [];
        const msg = lastMessage.toLowerCase();
        
        if (msg.includes('flexbox') || msg.includes('flex')) {
            contextualSuggestions = [
                "Show me flexbox examples",
                "Flexbox vs Grid",
                "Center with flexbox",
                "Flexbox navbar",
                "Flexbox cheat sheet"
            ];
        } else if (msg.includes('grid')) {
            contextualSuggestions = [
                "Responsive grid",
                "Grid template areas",
                "Grid vs flexbox",
                "Photo gallery grid",
                "Grid layout examples"
            ];
        } else if (msg.includes('navbar')) {
            contextualSuggestions = [
                "Sticky navbar",
                "Mobile hamburger menu",
                "Navbar with dropdown",
                "Transparent navbar",
                "Animated navbar"
            ];
        } else if (msg.includes('card')) {
            contextualSuggestions = [
                "Card grid layout",
                "Card hover effects",
                "Pricing cards",
                "Profile cards",
                "Animated cards"
            ];
        } else if (msg.includes('animation')) {
            contextualSuggestions = [
                "Loading spinner",
                "Hover animations",
                "Keyframe examples",
                "Page transitions",
                "Scroll animations"
            ];
        } else if (msg.includes('button')) {
            contextualSuggestions = [
                "Gradient buttons",
                "3D buttons",
                "Icon buttons",
                "Button hover effects",
                "Button loading state"
            ];
        } else if (msg.includes('responsive')) {
            contextualSuggestions = [
                "Mobile-first design",
                "Media queries",
                "Responsive images",
                "Responsive typography",
                "Viewport units"
            ];
        } else if (msg.includes('project') || msg.includes('build')) {
            contextualSuggestions = [
                "Portfolio project",
                "E-commerce layout",
                "Dashboard design",
                "Landing page",
                "CSS art project"
            ];
        } else {
            contextualSuggestions = this.suggestions;
        }
        
        // Create suggestions container
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggestions-container mt-3';
        suggestionsDiv.innerHTML = `
            <div class="d-flex flex-wrap gap-2">
                ${contextualSuggestions.map(s => `
                    <button class="suggestion-chip btn btn-sm" 
                            style="background: rgba(102,126,234,0.1); border: 1px solid rgba(102,126,234,0.3); color: white; border-radius: 20px; padding: 5px 15px; font-size: 0.9rem; transition: all 0.3s ease;"
                            onmouseover="this.style.background='rgba(102,126,234,0.3)'" 
                            onmouseout="this.style.background='rgba(102,126,234,0.1)'"
                            onclick="document.getElementById('messageInput').value = '${s}'; window.app.sendMessage()">
                        ${s}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add to input area
        const inputArea = document.querySelector('.input-area');
        if (inputArea) {
            inputArea.appendChild(suggestionsDiv);
        }
    }
    
    createNewConversation() {
        const id = Date.now();
        const conversation = {
            id: id,
            title: `Chat ${this.conversations.length + 1}`,
            messages: [],
            createdAt: new Date().toISOString(),
            lastMessage: 'New conversation'
        };
        
        this.conversations.unshift(conversation);
        this.currentConversationId = id;
        this.saveConversations();
        this.renderConversations();
        this.clearChatArea();
        this.showWelcomeMessage();
        
        return id;
    }
    
    loadMessages(conversationId) {
        const conversation = this.conversations.find(c => c.id === conversationId);
        if (!conversation) return;
        
        this.clearChatArea();
        
        if (conversation.messages.length === 0) {
            this.showWelcomeMessage();
        } else {
            conversation.messages.forEach(msg => {
                this.addMessage(msg.type, msg.content, true); // Skip saving when loading
            });
        }
    }
    
    clearChatArea() {
        const container = document.getElementById('messagesContainer');
        if (container) {
            container.innerHTML = '';
        }
        
        // Remove suggestions
        const suggestions = document.querySelector('.suggestions-container');
        if (suggestions) suggestions.remove();
    }
    
    clearCurrentChat() {
        const conversation = this.conversations.find(c => c.id === this.currentConversationId);
        if (conversation) {
            conversation.messages = [];
            conversation.lastMessage = 'New conversation';
            this.saveConversations();
            this.loadMessages(this.currentConversationId);
        }
    }
    
    saveMessage(type, content) {
        const conversation = this.conversations.find(c => c.id === this.currentConversationId);
        if (conversation) {
            conversation.messages.push({
                type,
                content,
                timestamp: new Date().toISOString()
            });
            conversation.lastMessage = content.substring(0, 40) + (content.length > 40 ? '...' : '');
            this.saveConversations();
            this.renderConversations();
        }
    }
    
    renderConversations() {
        const list = document.getElementById('conversationsList');
        if (!list) return;
        
        list.innerHTML = '';
        
        this.conversations.forEach(conv => {
            const div = document.createElement('div');
            div.className = `conversation-item p-3 ${conv.id === this.currentConversationId ? 'active' : ''}`;
            div.dataset.id = conv.id;
            
            const date = new Date(conv.createdAt);
            const timeStr = this.formatTime(date);
            
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="conversation-avatar me-3">
                        <i class="bi bi-chat-dots"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-0 text-white">${this.escapeHtml(conv.title)}</h6>
                        <small class="text-white-50">${this.escapeHtml(conv.lastMessage)}</small>
                    </div>
                    <small class="text-white-50">${timeStr}</small>
                </div>
            `;
            
            div.onclick = () => this.switchConversation(conv.id);
            list.appendChild(div);
        });
    }
    
    switchConversation(id) {
        this.currentConversationId = id;
        this.renderConversations();
        this.loadMessages(id);
    }
    
    searchConversations(query) {
        const items = document.querySelectorAll('.conversation-item');
        const searchTerm = query.toLowerCase();
        
        items.forEach(item => {
            const title = item.querySelector('h6')?.textContent.toLowerCase() || '';
            const lastMsg = item.querySelector('small')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || lastMsg.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    formatTime(date) {
        if (!date) return '';
        
        const d = new Date(date);
        const now = new Date();
        
        if (d.toDateString() === now.toDateString()) {
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    }
    
    loadConversations() {
        const saved = localStorage.getItem('nexus_conversations');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return this.getDefaultConversations();
            }
        }
        return this.getDefaultConversations();
    }
    
    getDefaultConversations() {
        return [{
            id: Date.now(),
            title: 'Main Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            lastMessage: 'Start learning CSS!'
        }];
    }
    
    saveConversations() {
        localStorage.setItem('nexus_conversations', JSON.stringify(this.conversations));
    }
    
    // ============= TEACHING METHODS =============
    
    teachFlexbox() {
        return `**🎯 CSS FLEXBOX MASTERCLASS**

Flexbox is perfect for 1D layouts (rows OR columns).

**PARENT PROPERTIES:**
\`\`\`css
.container {
    display: flex;              /* Enable flexbox */
    flex-direction: row;        /* row | column */
    justify-content: center;    /* Main axis: center | space-between | space-around */
    align-items: center;        /* Cross axis: center | flex-start | flex-end */
    flex-wrap: wrap;           /* Allow items to wrap */
    gap: 20px;                  /* Space between items */
}
\`\`\`

**CHILD PROPERTIES:**
\`\`\`css
.item {
    flex: 1;                    /* Grow and shrink equally */
    align-self: center;         /* Override align-items */
    order: 1;                   /* Change order */
}
\`\`\`

**📱 PRACTICAL EXAMPLE - Navigation Bar:**
\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
    color: white;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}
\`\`\`

**🎯 CENTERING WITH FLEXBOX:**
\`\`\`css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
\`\`\`

**Want to see more flexbox examples? Try one of the suggestions below!**`;
    }
    
    teachGrid() {
        return `**📐 CSS GRID MASTERCLASS**

Grid is for 2D layouts (rows AND columns).

**BASIC GRID:**
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    gap: 20px;
}
\`\`\`

**RESPONSIVE GRID:**
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}
\`\`\`

**COMPLETE PAGE LAYOUT:**
\`\`\`css
.page {
    display: grid;
    grid-template-areas: 
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    min-height: 100vh;
    gap: 20px;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

**Want to build a specific grid layout? Check out the suggestions below!**`;
    }
    
    teachResponsive() {
        return `**📱 RESPONSIVE DESIGN MASTERCLASS**

**MOBILE-FIRST APPROACH:**
\`\`\`css
/* Base styles (mobile) */
.element {
    width: 100%;
    padding: 15px;
}

/* Tablet */
@media (min-width: 768px) {
    .element {
        width: 50%;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .element {
        width: 33.333%;
    }
}
\`\`\`

**RESPONSIVE NAVBAR:**
\`\`\`css
.navbar {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .navbar {
        flex-direction: row;
        justify-content: space-between;
    }
}
\`\`\`

**MODERN APPROACH:**
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}
\`\`\`

**Try the responsive design suggestions below!**`;
    }
    
    teachAnimations() {
        return `**✨ CSS ANIMATIONS MASTERCLASS**

**TRANSITIONS:**
\`\`\`css
.button {
    transition: all 0.3s ease;
}

.button:hover {
    transform: scale(1.1);
}
\`\`\`

**KEYFRAMES:**
\`\`\`css
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.element {
    animation: slideIn 1s ease forwards;
}
\`\`\`

**LOADING SPINNER:**
\`\`\`css
.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
\`\`\`

**Want more animation examples? Check the suggestions!**`;
    }
    
    teachNavbar() {
        return `**🧭 MODERN NAVBAR TUTORIAL**

**HTML:**
\`\`\`html
<nav class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
    <button class="hamburger">☰</button>
</nav>
\`\`\`

**CSS:**
\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background: #333;
    color: white;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.hamburger {
    display: none;
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }
    
    .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: #333;
        flex-direction: column;
        padding: 2rem;
    }
    
    .nav-links.active {
        display: flex;
    }
}
\`\`\`

**Want a different navbar style? Try the suggestions!**`;
    }
    
    teachCards() {
        return `**🃏 BEAUTIFUL CARD DESIGN**

**HTML:**
\`\`\`html
<div class="card">
    <img src="image.jpg" alt="Card image" class="card-image">
    <div class="card-content">
        <h3 class="card-title">Card Title</h3>
        <p class="card-text">Description text here.</p>
        <button class="card-button">Learn More</button>
    </div>
</div>
\`\`\`

**CSS:**
\`\`\`css
.card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    max-width: 350px;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 20px;
}

.card-button {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.card-button:hover {
    background: #2980b9;
}
\`\`\`

**CARD GRID:**
\`\`\`css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
\`\`\`

**Want different card styles? Check the suggestions!**`;
    }
    
    teachCentering() {
        return `**🎯 COMPLETE CENTERING GUIDE**

**METHOD 1: FLEXBOX (Best)**
\`\`\`css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
\`\`\`

**METHOD 2: GRID**
\`\`\`css
.parent {
    display: grid;
    place-items: center;
    height: 100vh;
}
\`\`\`

**METHOD 3: ABSOLUTE**
\`\`\`css
.parent {
    position: relative;
    height: 100vh;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
\`\`\`

**METHOD 4: TEXT CENTERING**
\`\`\`css
.text {
    text-align: center;
    line-height: 100px; /* For single line */
}
\`\`\`

**Which method would you like to learn more about?**`;
    }
    
    teachButtons() {
        return `**🔘 MODERN BUTTON DESIGNS**

**GRADIENT BUTTON:**
\`\`\`css
.btn-gradient {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102,126,234,0.3);
}
\`\`\`

**OUTLINE BUTTON:**
\`\`\`css
.btn-outline {
    background: transparent;
    color: #3498db;
    border: 2px solid #3498db;
    padding: 10px 25px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-outline:hover {
    background: #3498db;
    color: white;
}
\`\`\`

**3D BUTTON:**
\`\`\`css
.btn-3d {
    background: #3498db;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    box-shadow: 0 5px 0 #2980b9;
    cursor: pointer;
    transition: all 0.1s ease;
}

.btn-3d:active {
    transform: translateY(5px);
    box-shadow: none;
}
\`\`\`

**Try the button suggestions below for more styles!**`;
    }
    
    teachForms() {
        return `**📝 MODERN FORM DESIGN**

**HTML:**
\`\`\`html
<form class="form">
    <h2>Contact Us</h2>
    
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="John Doe">
    </div>
    
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="john@example.com">
    </div>
    
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="5"></textarea>
    </div>
    
    <button type="submit">Send</button>
</form>
\`\`\`

**CSS:**
\`\`\`css
.form {
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #555;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
}

button[type="submit"] {
    width: 100%;
    padding: 14px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button[type="submit"]:hover {
    background: #2980b9;
}
\`\`\`

**Want form validation or different styles? Try the suggestions!**`;
    }
    
    teachPosition() {
        return `**📍 CSS POSITIONING GUIDE**

**1. STATIC (Default)**
\`\`\`css
.element { position: static; }
\`\`\`

**2. RELATIVE**
\`\`\`css
.element {
    position: relative;
    top: 20px;
    left: 20px;
}
\`\`\`

**3. ABSOLUTE**
\`\`\`css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    right: 0;
}
\`\`\`

**4. FIXED**
\`\`\`css
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
\`\`\`

**5. STICKY**
\`\`\`css
.sidebar {
    position: sticky;
    top: 20px;
}
\`\`\`

**BADGE EXAMPLE:**
\`\`\`css
.card {
    position: relative;
}

.badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
}
\`\`\`

**Need help with a specific positioning problem?**`;
    }
    
    getLearningPath() {
        return `**📚 YOUR CSS LEARNING PATH**

**WEEK 1-2: FOUNDATIONS**
- [ ] CSS Basics (colors, fonts, margins)
- [ ] Box model (padding, borders, margin)
- [ ] Selectors (class, id, elements)

**WEEK 3-4: LAYOUTS**
- [ ] **Flexbox** ⭐ Most important!
- [ ] CSS Grid
- [ ] Positioning

**WEEK 5-6: RESPONSIVE**
- [ ] Media queries
- [ ] Mobile-first design
- [ ] Responsive units

**WEEK 7-8: ADVANCED**
- [ ] Animations
- [ ] Transitions
- [ ] CSS Variables

**🎯 QUICK PROJECT:**
\`\`\`css
.profile-card {
    /* Start here! */
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
\`\`\`

**Want to start with a specific topic? Use the suggestions below!**`;
    }
    
    getProjectIdeas() {
        return `**🚀 CSS PROJECT IDEAS**

**BEGINNER PROJECTS:**
1. **Personal Profile Card**
   - Practice: Box model, flexbox

2. **Simple Navigation Bar**
   - Practice: Flexbox, hover effects

3. **Button Gallery**
   - Practice: Transitions, styling

4. **Photo Gallery**
   - Practice: Grid layout

**INTERMEDIATE PROJECTS:**
5. **Landing Page**
   - Sections: Hero, features, footer

6. **Pricing Cards**
   - Features: 3 tiers, hover effects

7. **Dashboard UI**
   - Features: Sidebar, cards, charts

8. **CSS Art**
   - Practice: Positioning, creativity

**ADVANCED PROJECTS:**
9. **Portfolio Website**
   - Practice: Everything!

10. **CSS Framework**
    - Practice: System design

**🎯 START HERE:**
\`\`\`html
<div class="project-card">
    <h3>My First Project</h3>
    <p>I'll build this with CSS!</p>
</div>
\`\`\`

**Which project interests you? Try the suggestions!**`;
    }
    
    getHelp() {
        return `**🔧 QUICK CSS HELP**

**COMMON ISSUES:**

**"My flexbox isn't working!"**
✅ Parent needs \`display: flex\`

**"My element won't center!"**
✅ Parent needs a height
✅ Use \`justify-content: center\` + \`align-items: center\`

**"Hover not working!"**
✅ No space: \`.button:hover\` not \`.button :hover\`

**"Image stretched!"**
✅ Add \`object-fit: cover\`

**"Z-index not working!"**
✅ Element needs position: relative, absolute, or fixed

**🐛 DEBUGGING TIP:**
\`\`\`css
* { outline: 1px solid red; } /* See all elements */
\`\`\`

**Describe your problem and I'll help!**`;
    }
    
    getDefaultResponse() {
        const responses = [
            "I'm your CSS mentor! Ask me about Flexbox, Grid, animations, or any styling topic!",
            "Want to learn something new? I can teach you modern CSS techniques!",
            "Having trouble with a layout? Tell me what you're trying to build!",
            "From centering divs to complex animations - I've got you covered!",
            "Try one of the suggestions below or ask me anything about CSS!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    addMessage(type, content, skipSave = false) {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message animate__animated animate__fadeInUp`;
        
        let formattedContent = content;
        if (type === 'bot' && typeof marked !== 'undefined') {
            formattedContent = marked.parse(content);
        } else if (type === 'user') {
            formattedContent = `<p>${this.escapeHtml(content)}</p>`;
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="bi bi-${type === 'bot' ? 'cpu' : 'person-fill'}"></i>
            </div>
            <div style="flex: 1;">
                <div class="message-content">
                    ${formattedContent}
                </div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        
        const welcome = container.querySelector('.welcome-screen');
        if (welcome) welcome.remove();
        
        container.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.style.display = 'flex';
        this.scrollToBottom();
    }
    
    hideTyping() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.style.display = 'none';
    }
    
    scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showWelcomeMessage() {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        
        const welcomeHTML = `
            <div class="welcome-screen">
                <div class="welcome-content">
                    <div class="ai-logo-glow mb-4">
                        <i class="bi bi-cpu"></i>
                    </div>
                    <h3 class="text-white mb-3">🎨 CSS MASTER MENTOR</h3>
                    <p class="text-white-50 mb-4">I'll teach you CSS with multiple chats and smart suggestions!</p>
                    
                    <div class="quick-prompts">
                        <div class="row g-2">
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='Teach me Flexbox'; window.app.sendMessage()">
                                    <i class="bi bi-grid-3x3-gap-fill me-2"></i>Learn Flexbox
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='Show me CSS Grid'; window.app.sendMessage()">
                                    <i class="bi bi-border-all me-2"></i>CSS Grid
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='Create a responsive navbar'; window.app.sendMessage()">
                                    <i class="bi bi-list me-2"></i>Navbar
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='Design a card component'; window.app.sendMessage()">
                                    <i class="bi bi-card-text me-2"></i>Cards
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='How to center a div?'; window.app.sendMessage()">
                                    <i class="bi bi-arrows-move me-2"></i>Center Div
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="prompt-chip" onclick="document.getElementById('messageInput').value='Show me animations'; window.app.sendMessage()">
                                    <i class="bi bi-play-circle me-2"></i>Animations
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = welcomeHTML;
    }
    
    updateStatus(status) {
        const statusDiv = document.getElementById('apiStatus');
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="status-dot-success me-2"></div>
                    <small class="text-white-50">CSS Mentor • Multiple Chats • Smart Suggestions</small>
                </div>
            `;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NexusUltraAI();
});