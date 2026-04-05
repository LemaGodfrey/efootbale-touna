<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eFootball Pro League - Tournament Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        'orbitron': ['Orbitron', 'sans-serif'],
                        'inter': ['Inter', 'sans-serif'],
                    },
                    colors: {
                        'pitch-green': '#0a4d2e',
                        'pitch-light': '#1a6b3e',
                        'neon-blue': '#00d4ff',
                        'neon-purple': '#b829dd',
                        'accent-gold': '#ffd700',
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'slide-in': 'slideIn 0.5s ease-out',
                        'float': 'float 3s ease-in-out infinite',
                    },
                    keyframes: {
                        slideIn: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(19, 18, 18, 0.1);
        }
        .dark .glass-effect {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .gradient-text {
            background: linear-gradient(135deg, #00d4ff 0%, #b829dd 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .pitch-pattern {
            background-image: 
                linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent);
            background-size: 50px 50px;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .match-card {
            transition: all 0.3s ease;
        }
        .match-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
        }
    </style>
</head>
<body class="font-inter bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">

    <!-- Navigation -->
    <nav class="fixed w-full z-50 glass-effect border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-2 cursor-pointer" onclick="router.navigate('home')">
                    <i class="fas fa-futbol text-3xl text-neon-blue animate-pulse-slow"></i>
                    <span class="font-orbitron font-bold text-xl tracking-wider">EFOOTBALL<span class="text-neon-blue">PRO</span></span>
                </div>
                
                <div class="hidden md:flex items-center space-x-8">
                    <button onclick="router.navigate('tournaments')" class="hover:text-neon-blue transition-colors font-medium">Tournaments</button>
                    <button onclick="router.navigate('standings')" class="hover:text-neon-blue transition-colors font-medium">Standings</button>
                    <button onclick="router.navigate('fixtures')" class="hover:text-neon-blue transition-colors font-medium">Fixtures</button>
                    <button id="adminNavBtn" onclick="router.navigate('admin')" class="hidden hover:text-neon-blue transition-colors font-medium text-accent-gold">
                        <i class="fas fa-shield-alt mr-1"></i>Admin
                    </button>
                </div>

                <div class="flex items-center space-x-4">
                    <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <i class="fas fa-moon dark:hidden"></i>
                        <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
                    </button>
                    
                    <div id="authButtons">
                        <button onclick="router.navigate('login')" class="bg-neon-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30">
                            Sign In
                        </button>
                    </div>
                    
                    <div id="userMenu" class="hidden flex items-center space-x-3">
                        <div class="text-right hidden sm:block">
                            <div id="userNameDisplay" class="font-semibold text-sm"></div>
                            <div id="userRoleDisplay" class="text-xs text-gray-500 dark:text-gray-400"></div>
                        </div>
                        <button onclick="toggleUserMenu()" class="relative">
                            <img id="userAvatar" src="" alt="Profile" class="w-10 h-10 rounded-full border-2 border-neon-blue object-cover">
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        </button>
                        <div id="userDropdown" class="hidden absolute right-4 top-16 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-in">
                            <button onclick="router.navigate('profile')" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <i class="fas fa-user mr-2"></i>Profile
                            </button>
                            <button onclick="logout()" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 transition-colors">
                                <i class="fas fa-sign-out-alt mr-2"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content Container -->
    <main id="app" class="pt-16 min-h-screen">
        <!-- Dynamic content loads here -->
    </main>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-4 right-4 transform translate-y-20 opacity-0 transition-all duration-300 z-50">
        <div class="bg-white dark:bg-gray-800 border-l-4 border-neon-blue rounded-lg shadow-2xl p-4 flex items-center space-x-3 min-w-[300px]">
            <i id="toastIcon" class="fas fa-check-circle text-green-500 text-xl"></i>
            <div>
                <h4 id="toastTitle" class="font-semibold text-sm">Success</h4>
                <p id="toastMessage" class="text-sm text-gray-600 dark:text-gray-400">Operation completed successfully</p>
            </div>
        </div>
    </div>

    <!-- Live Chat Widget -->
    <div id="chatWidget" class="fixed bottom-4 left-4 z-40 hidden md:block">
        <button onclick="toggleChat()" class="bg-neon-purple text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-float">
            <i class="fas fa-comments text-2xl"></i>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>
        <div id="chatWindow" class="hidden absolute bottom-16 left-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-neon-blue to-neon-purple p-4 text-white">
                <h3 class="font-bold">Live Chat</h3>
                <p class="text-xs opacity-90">24 players online</p>
            </div>
            <div id="chatMessages" class="h-64 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                <div class="flex space-x-2">
                    <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm max-w-[200px]">
                        <span class="font-semibold text-xs text-neon-blue">ProPlayer99</span>
                        <p>Anyone up for a practice match?</p>
                    </div>
                </div>
            </div>
            <div class="p-3 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
                <input type="text" id="chatInput" placeholder="Type a message..." class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue">
                <button onclick="sendMessage()" class="bg-neon-blue text-white rounded-full w-10 h-10 hover:bg-blue-600 transition-colors">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>

    <script>
        // State Management
        const store = {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
            darkMode: localStorage.getItem('darkMode') === 'true' || false,
            tournaments: JSON.parse(localStorage.getItem('tournaments')) || [],
            matches: JSON.parse(localStorage.getItem('matches')) || [],
            players: JSON.parse(localStorage.getItem('players')) || [],
            
            init() {
                if (this.darkMode) document.documentElement.classList.add('dark');
                if (this.tournaments.length === 0) this.seedData();
                this.updateAuthUI();
            },

            seedData() {
                this.tournaments = [
                    {
                        id: 1,
                        name: "Champions League 2024",
                        type: "knockout",
                        status: "ongoing",
                        prize: "$5,000",
                        players: 32,
                        maxPlayers: 32,
                        startDate: "2024-03-15",
                        image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800",
                        description: "Elite knockout tournament featuring top eFootball players"
                    },
                    {
                        id: 2,
                        name: "Premier League Season",
                        type: "league",
                        status: "upcoming",
                        prize: "$10,000",
                        players: 20,
                        maxPlayers: 20,
                        startDate: "2024-04-01",
                        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
                        description: "Round-robin league format with weekly fixtures"
                    },
                    {
                        id: 3,
                        name: "Weekend Cup",
                        type: "group",
                        status: "registration",
                        prize: "$1,000",
                        players: 16,
                        maxPlayers: 16,
                        startDate: "2024-03-20",
                        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
                        description: "Quick weekend tournament with group stages"
                    }
                ];

                this.matches = [
                    { id: 1, tournamentId: 1, player1: "ProPlayer99", player2: "eFootballKing", score1: 3, score2: 1, status: "completed", date: "2024-03-15" },
                    { id: 2, tournamentId: 1, player1: "GoalMaster", player2: "TacticalGenius", score1: null, score2: null, status: "upcoming", date: "2024-03-16" },
                    { id: 3, tournamentId: 1, player1: "SpeedDemon", player2: "DefenseWall", score1: 2, score2: 2, status: "live", date: "2024-03-15" }
                ];

                this.players = [
                    { id: 1, username: "ProPlayer99", team: "Manchester United", wins: 45, losses: 12, points: 135, avatar: "https://i.pravatar.cc/150?img=11" },
                    { id: 2, username: "eFootballKing", team: "Real Madrid", wins: 42, losses: 15, points: 126, avatar: "https://i.pravatar.cc/150?img=12" },
                    { id: 3, username: "GoalMaster", team: "Bayern Munich", wins: 38, losses: 18, points: 114, avatar: "https://i.pravatar.cc/150?img=13" },
                    { id: 4, username: "TacticalGenius", team: "Manchester City", wins: 35, losses: 20, points: 105, avatar: "https://i.pravatar.cc/150?img=14" }
                ];

                this.saveData();
            },

            saveData() {
                localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
                localStorage.setItem('matches', JSON.stringify(this.matches));
                localStorage.setItem('players', JSON.stringify(this.players));
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            },

            updateAuthUI() {
                const authButtons = document.getElementById('authButtons');
                const userMenu = document.getElementById('userMenu');
                const adminNavBtn = document.getElementById('adminNavBtn');

                if (this.currentUser) {
                    authButtons.classList.add('hidden');
                    userMenu.classList.remove('hidden');
                    document.getElementById('userNameDisplay').textContent = this.currentUser.username;
                    document.getElementById('userRoleDisplay').textContent = this.currentUser.role === 'admin' ? 'Administrator' : 'Player';
                    document.getElementById('userAvatar').src = this.currentUser.avatar || `https://i.pravatar.cc/150?u=${this.currentUser.username}`;
                    
                    if (this.currentUser.role === 'admin') {
                        adminNavBtn.classList.remove('hidden');
                    }
                } else {
                    authButtons.classList.remove('hidden');
                    userMenu.classList.add('hidden');
                    adminNavBtn.classList.add('hidden');
                }
            }
        };

        // Router
        const router = {
            currentRoute: 'home',
            
            navigate(route, params = {}) {
                this.currentRoute = route;
                window.scrollTo(0, 0);
                this.render();
            },

            render() {
                const app = document.getElementById('app');
                const route = this.currentRoute;

                switch(route) {
                    case 'home':
                        app.innerHTML = this.getHomePage();
                        this.initHomeAnimations();
                        break;
                    case 'tournaments':
                        app.innerHTML = this.getTournamentsPage();
                        break;
                    case 'tournament-detail':
                        app.innerHTML = this.getTournamentDetailPage(params.id);
                        break;
                    case 'standings':
                        app.innerHTML = this.getStandingsPage();
                        break;
                    case 'fixtures':
                        app.innerHTML = this.getFixturesPage();
                        break;
                    case 'login':
                        app.innerHTML = this.getAuthPage('login');
                        break;
                    case 'register':
                        app.innerHTML = this.getAuthPage('register');
                        break;
                    case 'profile':
                        app.innerHTML = this.getProfilePage();
                        break;
                    case 'admin':
                        if (store.currentUser?.role !== 'admin') {
                            this.navigate('home');
                            return;
                        }
                        app.innerHTML = this.getAdminPage();
                        break;
                    default:
                        app.innerHTML = this.getHomePage();
                }
            },

            getHomePage() {
                return `
                    <div class="relative overflow-hidden">
                        <!-- Hero Section -->
                        <div class="relative h-screen flex items-center justify-center pitch-pattern bg-gradient-to-br from-pitch-green via-gray-900 to-black">
                            <div class="absolute inset-0 bg-black/40"></div>
                            <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
                                <div class="mb-6 inline-block animate-float">
                                    <span class="bg-neon-blue/20 text-neon-blue border border-neon-blue/50 px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase">
                                        Season 2024 Live
                                    </span>
                                </div>
                                <h1 class="font-orbitron text-5xl md:text-7xl font-black mb-6 leading-tight">
                                    COMPETE AT THE <span class="gradient-text">HIGHEST LEVEL</span>
                                </h1>
                                <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join the ultimate eFootball tournament platform. Battle for glory, prizes, and the championship title.
                                </p>
                                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button onclick="router.navigate('tournaments')" class="bg-neon-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
                                        <i class="fas fa-trophy"></i> Join Tournament
                                    </button>
                                    <button onclick="scrollToSection('features')" class="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                        <i class="fas fa-play"></i> Watch Live
                                    </button>
                                </div>
                                
                                <!-- Live Stats -->
                                <div class="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-neon-blue counter" data-target="1250">0</div>
                                        <div class="text-sm text-gray-400">Active Players</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-neon-purple counter" data-target="48">0</div>
                                        <div class="text-sm text-gray-400">Tournaments</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-accent-gold counter" data-target="$50K">0</div>
                                        <div class="text-sm text-gray-400">Prize Pool</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Animated Background Elements -->
                            <div class="absolute top-20 left-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-3xl animate-pulse"></div>
                            <div class="absolute bottom-20 right-10 w-48 h-48 bg-neon-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        <!-- Featured Tournaments -->
                        <section class="py-20 bg-gray-50 dark:bg-gray-900">
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div class="text-center mb-16">
                                    <h2 class="font-orbitron text-4xl font-bold mb-4">Featured Tournaments</h2>
                                    <p class="text-gray-600 dark:text-gray-400">Choose your battlefield and prove your skills</p>
                                </div>
                                
                                <div class="grid md:grid-cols-3 gap-8">
                                    ${store.tournaments.map(t => `
                                        <div class="match-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 group cursor-pointer" onclick="router.navigate('tournament-detail', {id: ${t.id}})">
                                            <div class="relative h-48 overflow-hidden">
                                                <img src="${t.image}" alt="${t.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                                <div class="absolute top-4 right-4">
                                                    <span class="bg-${t.status === 'live' ? 'red' : t.status === 'upcoming' ? 'yellow' : 'green'}-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                        ${t.status}
                                                    </span>
                                                </div>
                                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                <div class="absolute bottom-4 left-4 text-white">
                                                    <h3 class="font-bold text-xl">${t.name}</h3>
                                                    <p class="text-sm opacity-90">${t.type.toUpperCase()} Format</p>
                                                </div>
                                            </div>
                                            <div class="p-6">
                                                <div class="flex justify-between items-center mb-4">
                                                    <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                                        <i class="fas fa-users"></i>
                                                        <span>${t.players}/${t.maxPlayers} Players</span>
                                                    </div>
                                                    <div class="flex items-center space-x-2 text-accent-gold font-bold">
                                                        <i class="fas fa-trophy"></i>
                                                        <span>${t.prize}</span>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between items-center">
                                                    <span class="text-sm text-gray-500 dark:text-gray-400">Starts ${new Date(t.startDate).toLocaleDateString()}</span>
                                                    <button class="text-neon-blue font-semibold hover:underline">View Details →</button>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </section>

                        <!-- Live Matches Section -->
                        <section class="py-20 bg-gray-100 dark:bg-gray-800">
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div class="flex justify-between items-center mb-12">
                                    <div>
                                        <h2 class="font-orbitron text-3xl font-bold mb-2">Live Matches</h2>
                                        <p class="text-gray-600 dark:text-gray-400">Real-time action happening now</p>
                                    </div>
                                    <button onclick="router.navigate('fixtures')" class="text-neon-blue font-semibold hover:underline">View All Matches →</button>
                                </div>
                                
                                <div class="space-y-4">
                                    ${store.matches.filter(m => m.status === 'live' || m.status === 'upcoming').slice(0, 3).map(match => `
                                        <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:border-neon-blue/50 transition-colors">
                                            <div class="flex items-center space-x-4 flex-1">
                                                <div class="text-center w-24">
                                                    <div class="font-bold text-lg">${match.player1}</div>
                                                    <div class="text-xs text-gray-500">Home</div>
                                                </div>
                                                <div class="flex-1 flex items-center justify-center space-x-4">
                                                    ${match.status === 'live' ? `
                                                        <span class="text-4xl font-black text-neon-blue animate-pulse">${match.score1}</span>
                                                        <span class="text-2xl text-gray-400">-</span>
                                                        <span class="text-4xl font-black text-neon-purple animate-pulse">${match.score2}</span>
                                                    ` : `
                                                        <span class="text-2xl text-gray-400">VS</span>
                                                    `}
                                                </div>
                                                <div class="text-center w-24">
                                                    <div class="font-bold text-lg">${match.player2}</div>
                                                    <div class="text-xs text-gray-500">Away</div>
                                                </div>
                                            </div>
                                            <div class="ml-6 text-right">
                                                ${match.status === 'live' ? `
                                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse">
                                                        <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>LIVE
                                                    </span>
                                                ` : `
                                                    <span class="text-sm text-gray-500">${new Date(match.date).toLocaleDateString()}</span>
                                                `}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </section>

                        <!-- Features Grid -->
                        <section id="features" class="py-20 bg-white dark:bg-gray-900">
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div class="text-center mb-16">
                                    <h2 class="font-orbitron text-4xl font-bold mb-4">Why Choose Us</h2>
                                    <p class="text-gray-600 dark:text-gray-400">Professional tournament management at your fingertips</p>
                                </div>
                                
                                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    ${[
                                        { icon: 'fa-shield-alt', title: 'Fair Play', desc: 'Advanced anti-cheat systems and verified results' },
                                        { icon: 'fa-bolt', title: 'Instant Setup', desc: 'Create tournaments in minutes with automated scheduling' },
                                        { icon: 'fa-chart-line', title: 'Live Tracking', desc: 'Real-time standings and performance analytics' },
                                        { icon: 'fa-mobile-alt', title: 'Mobile Ready', desc: 'Manage tournaments on the go with full mobile support' }
                                    ].map(f => `
                                        <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-neon-blue/50 transition-all group">
                                            <div class="w-14 h-14 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <i class="fas ${f.icon} text-2xl text-neon-blue"></i>
                                            </div>
                                            <h3 class="font-bold text-lg mb-2">${f.title}</h3>
                                            <p class="text-gray-600 dark:text-gray-400 text-sm">${f.desc}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </section>
                    </div>
                `;
            },

            getTournamentsPage() {
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <h1 class="font-orbitron text-4xl font-bold mb-2">All Tournaments</h1>
                                    <p class="text-gray-600 dark:text-gray-400">Find your perfect competition</p>
                                </div>
                                ${store.currentUser?.role === 'admin' ? `
                                    <button onclick="openCreateTournamentModal()" class="bg-neon-blue text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                                        <i class="fas fa-plus"></i> Create Tournament
                                    </button>
                                ` : ''}
                            </div>

                            <!-- Filters -->
                            <div class="flex flex-wrap gap-4 mb-8">
                                <button onclick="filterTournaments('all')" class="filter-btn active px-4 py-2 rounded-full bg-neon-blue text-white text-sm font-medium transition-all">All</button>
                                <button onclick="filterTournaments('ongoing')" class="filter-btn px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">Ongoing</button>
                                <button onclick="filterTournaments('upcoming')" class="filter-btn px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">Upcoming</button>
                                <button onclick="filterTournaments('completed')" class="filter-btn px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">Completed</button>
                            </div>

                            <div id="tournamentGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${store.tournaments.map(t => `
                                    <div class="tournament-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all cursor-pointer" data-status="${t.status}" onclick="router.navigate('tournament-detail', {id: ${t.id}})">
                                        <div class="relative h-48">
                                            <img src="${t.image}" class="w-full h-full object-cover">
                                            <div class="absolute top-4 right-4">
                                                <span class="status-badge bg-${t.status === 'ongoing' ? 'green' : t.status === 'upcoming' ? 'blue' : 'gray'}-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                    ${t.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="p-6">
                                            <h3 class="font-bold text-xl mb-2">${t.name}</h3>
                                            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${t.description}</p>
                                            <div class="flex justify-between items-center text-sm">
                                                <span class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <i class="fas fa-calendar"></i> ${new Date(t.startDate).toLocaleDateString()}
                                                </span>
                                                <span class="font-bold text-accent-gold">${t.prize}</span>
                                            </div>
                                            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                                <div class="flex -space-x-2">
                                                    ${[1,2,3].map(i => `<div class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-gray-800"></div>`).join('')}
                                                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold">+${t.players - 3}</div>
                                                </div>
                                                <button class="text-neon-blue font-semibold text-sm">Details →</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            },

            getStandingsPage() {
                const sortedPlayers = [...store.players].sort((a, b) => b.points - a.points);
                
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
                        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 class="font-orbitron text-4xl font-bold mb-8 text-center">Global Rankings</h1>
                            
                            <!-- Top 3 Podium -->
                            <div class="flex justify-center items-end gap-4 mb-12 h-64">
                                ${sortedPlayers.slice(0, 3).map((player, index) => {
                                    const positions = [1, 0, 2]; // 2nd, 1st, 3rd
                                    const heights = ['h-40', 'h-56', 'h-32'];
                                    const colors = ['bg-gray-300', 'bg-yellow-400', 'bg-orange-400'];
                                    const actualPos = positions[index];
                                    const actualPlayer = sortedPlayers[actualPos];
                                    
                                    return `
                                        <div class="flex flex-col items-center ${actualPos === 1 ? 'z-10' : 'z-0'}">
                                            <div class="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-xl mb-2 overflow-hidden">
                                                <img src="${actualPlayer.avatar}" class="w-full h-full object-cover">
                                            </div>
                                            <div class="text-center mb-2">
                                                <div class="font-bold text-lg">${actualPlayer.username}</div>
                                                <div class="text-2xl font-black text-accent-gold">${actualPlayer.points} pts</div>
                                            </div>
                                            <div class="${heights[actualPos]} w-32 ${colors[actualPos]} rounded-t-2xl shadow-lg flex items-center justify-center">
                                                <span class="text-4xl font-black text-white/50">#${actualPos + 1}</span>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>

                            <!-- Full Table -->
                            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                <table class="w-full">
                                    <thead class="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Player</th>
                                            <th class="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">W</th>
                                            <th class="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">L</th>
                                            <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                        ${sortedPlayers.map((player, index) => `
                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full ${index < 3 ? 'bg-accent-gold text-black' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'} font-bold text-sm">
                                                        ${index + 1}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        <img class="h-10 w-10 rounded-full mr-3" src="${player.avatar}" alt="">
                                                        <div>
                                                            <div class="font-medium">${player.username}</div>
                                                            <div class="text-sm text-gray-500">${player.team}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">${player.wins}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-center text-red-600 font-semibold">${player.losses}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-right font-bold text-lg">${player.points}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            },

            getFixturesPage() {
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
                        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 class="font-orbitron text-4xl font-bold mb-8">Match Fixtures</h1>
                            
                            <div class="space-y-6">
                                ${store.matches.map(match => `
                                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div class="flex items-center justify-between mb-4">
                                            <span class="text-sm text-gray-500">${new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                                            <span class="px-3 py-1 rounded-full text-xs font-bold ${match.status === 'completed' ? 'bg-green-100 text-green-600' : match.status === 'live' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-600'} uppercase">
                                                ${match.status}
                                            </span>
                                        </div>
                                        
                                        <div class="flex items-center justify-between">
                                            <div class="flex-1 text-right pr-4">
                                                <div class="font-bold text-lg">${match.player1}</div>
                                                <div class="text-sm text-gray-500">Home</div>
                                            </div>
                                            
                                            <div class="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl min-w-[120px] text-center">
                                                ${match.status !== 'upcoming' ? `
                                                    <div class="text-3xl font-black font-orbitron">
                                                        <span class="${match.score1 > match.score2 ? 'text-green-500' : ''}">${match.score1}</span>
                                                        <span class="text-gray-400 mx-1">-</span>
                                                        <span class="${match.score2 > match.score1 ? 'text-green-500' : ''}">${match.score2}</span>
                                                    </div>
                                                ` : `
                                                    <div class="text-xl font-bold text-gray-400">VS</div>
                                                `}
                                            </div>
                                            
                                            <div class="flex-1 pl-4">
                                                <div class="font-bold text-lg">${match.player2}</div>
                                                <div class="text-sm text-gray-500">Away</div>
                                            </div>
                                        </div>
                                        
                                        ${store.currentUser && match.status === 'upcoming' ? `
                                            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                                                <button onclick="reportScore(${match.id})" class="text-sm bg-neon-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                                    Submit Score
                                                </button>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            },

            getAuthPage(type) {
                const isLogin = type === 'login';
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                        <div class="absolute inset-0 pitch-pattern opacity-5"></div>
                        <div class="max-w-md w-full space-y-8 relative z-10">
                            <div class="text-center">
                                <div class="mx-auto h-16 w-16 bg-neon-blue/20 rounded-full flex items-center justify-center mb-4">
                                    <i class="fas fa-futbol text-3xl text-neon-blue"></i>
                                </div>
                                <h2 class="font-orbitron text-3xl font-bold">${isLogin ? 'Welcome Back' : 'Join the League'}</h2>
                                <p class="mt-2 text-gray-600 dark:text-gray-400">${isLogin ? 'Sign in to your account' : 'Create your player profile'}</p>
                            </div>
                            
                            <form onsubmit="handleAuth(event, '${type}')" class="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Username</label>
                                        <input type="text" name="username" required class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all" placeholder="Enter username">
                                    </div>
                                    
                                    ${!isLogin ? `
                                        <div>
                                            <label class="block text-sm font-medium mb-1">Email</label>
                                            <input type="email" name="email" required class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all" placeholder="you@example.com">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-1">Favorite Team</label>
                                            <input type="text" name="team" required class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all" placeholder="e.g., Real Madrid">
                                        </div>
                                    ` : ''}
                                    
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Password</label>
                                        <input type="password" name="password" required class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all" placeholder="••••••••">
                                    </div>
                                </div>

                                <button type="submit" class="w-full bg-neon-blue text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/30">
                                    ${isLogin ? 'Sign In' : 'Create Account'}
                                </button>

                                <div class="text-center text-sm">
                                    ${isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button type="button" onclick="router.navigate('${isLogin ? 'register' : 'login'}')" class="text-neon-blue font-semibold hover:underline">
                                        ${isLogin ? 'Sign up' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                `;
            },

            getProfilePage() {
                if (!store.currentUser) {
                    router.navigate('login');
                    return '';
                }
                
                const userStats = store.players.find(p => p.username === store.currentUser.username) || { wins: 0, losses: 0, points: 0 };
                
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
                        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div class="h-32 bg-gradient-to-r from-neon-blue to-neon-purple relative">
                                    <button onclick="document.getElementById('avatarInput').click()" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                        <img src="${store.currentUser.avatar || `https://i.pravatar.cc/150?u=${store.currentUser.username}`}" class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg hover:opacity-80 transition-opacity cursor-pointer">
                                        <input type="file" id="avatarInput" class="hidden" accept="image/*" onchange="updateAvatar(event)">
                                    </button>
                                </div>
                                
                                <div class="pt-20 pb-8 px-8 text-center">
                                    <h1 class="font-orbitron text-3xl font-bold mb-1">${store.currentUser.username}</h1>
                                    <p class="text-gray-500 dark:text-gray-400 mb-6">${store.currentUser.team || 'No team set'}</p>
                                    
                                    <div class="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                            <div class="text-2xl font-bold text-green-500">${userStats.wins}</div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wider">Wins</div>
                                        </div>
                                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                            <div class="text-2xl font-bold text-red-500">${userStats.losses}</div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wider">Losses</div>
                                        </div>
                                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                            <div class="text-2xl font-bold text-accent-gold">${userStats.points}</div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wider">Points</div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-center gap-4">
                                        <button onclick="router.navigate('tournaments')" class="bg-neon-blue text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                                            Find Tournament
                                        </button>
                                        <button onclick="logout()" class="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            },

            getAdminPage() {
                return `
                    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 class="font-orbitron text-4xl font-bold mb-8">Admin Dashboard</h1>
                            
                            <div class="grid md:grid-cols-4 gap-6 mb-8">
                                ${[
                                    { label: 'Total Players', value: store.players.length, icon: 'fa-users', color: 'blue' },
                                    { label: 'Active Tournaments', value: store.tournaments.filter(t => t.status === 'ongoing').length, icon: 'fa-trophy', color: 'yellow' },
                                    { label: 'Matches Today', value: store.matches.filter(m => m.date === new Date().toISOString().split('T')[0]).length, icon: 'fa-gamepad', color: 'green' },
                                    { label: 'Pending Reports', value: 2, icon: 'fa-exclamation-triangle', color: 'red' }
                                ].map(stat => `
                                    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div class="flex items-center justify-between mb-4">
                                            <div class="w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center">
                                                <i class="fas ${stat.icon} text-${stat.color}-500 text-xl"></i>
                                            </div>
                                            <span class="text-3xl font-bold">${stat.value}</span>
                                        </div>
                                        <div class="text-gray-600 dark:text-gray-400 text-sm">${stat.label}</div>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                    <h2 class="font-bold text-xl">Manage Tournaments</h2>
                                    <button onclick="openCreateTournamentModal()" class="bg-neon-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                                        <i class="fas fa-plus mr-2"></i>New Tournament
                                    </button>
                                </div>
                                <table class="w-full">
                                    <thead class="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Players</th>
                                            <th class="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                        ${store.tournaments.map(t => `
                                            <tr>
                                                <td class="px-6 py-4 font-medium">${t.name}</td>
                                                <td class="px-6 py-4">
                                                    <select onchange="updateTournamentStatus(${t.id}, this.value)" class="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm py-1 px-3 focus:ring-2 focus:ring-neon-blue">
                                                        <option value="registration" ${t.status === 'registration' ? 'selected' : ''}>Registration</option>
                                                        <option value="ongoing" ${t.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                                                        <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Completed</option>
                                                    </select>
                                                </td>
                                                <td class="px-6 py-4">${t.players}/${t.maxPlayers}</td>
                                                <td class="px-6 py-4 text-right">
                                                    <button onclick="deleteTournament(${t.id})" class="text-red-500 hover:text-red-700 transition-colors">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            },

            initHomeAnimations() {
                // Counter animation
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = counter.getAttribute('data-target');
                    const isCurrency = target.includes('$');
                    const numericTarget = parseInt(target.replace(/\D/g, ''));
                    let current = 0;
                    const increment = numericTarget / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericTarget) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = isCurrency ? '$' + Math.floor(current / 1000) + 'K' : Math.floor(current);
                        }
                    }, 30);
                });
            }
        };

        // Helper Functions
        function toggleTheme() {
            store.darkMode = !store.darkMode;
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', store.darkMode);
        }

        function toggleUserMenu() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('hidden');
        }

        function handleAuth(e, type) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username');
            
            if (type === 'register') {
                const newUser = {
                    id: Date.now(),
                    username: username,
                    email: formData.get('email'),
                    team: formData.get('team'),
                    role: 'player',
                    avatar: `https://i.pravatar.cc/150?u=${username}`
                };
                store.players.push({
                    id: newUser.id,
                    username: username,
                    team: formData.get('team'),
                    wins: 0,
                    losses: 0,
                    points: 0,
                    avatar: newUser.avatar
                });
                store.currentUser = newUser;
                showToast('Account created successfully!', 'success');
            } else {
                // Login simulation
                const player = store.players.find(p => p.username === username);
                if (player) {
                    store.currentUser = {
                        id: player.id,
                        username: player.username,
                        team: player.team,
                        role: username.toLowerCase().includes('admin') ? 'admin' : 'player',
                        avatar: player.avatar
                    };
                    showToast('Welcome back!', 'success');
                } else {
                    showToast('User not found', 'error');
                    return;
                }
            }
            
            store.saveData();
            store.updateAuthUI();
            router.navigate('home');
        }

        function logout() {
            store.currentUser = null;
            store.saveData();
            store.updateAuthUI();
            router.navigate('home');
            showToast('Logged out successfully', 'success');
        }

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = document.getElementById('toastIcon');
            const title = document.getElementById('toastTitle');
            
            document.getElementById('toastMessage').textContent = message;
            title.textContent = type === 'success' ? 'Success' : 'Error';
            icon.className = `fas ${type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'} text-xl`;
            
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        function filterTournaments(status) {
            const cards = document.querySelectorAll('.tournament-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => {
                if (btn.textContent.toLowerCase() === status || (status === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('bg-neon-blue', 'text-white');
                    btn.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
                } else {
                    btn.classList.remove('bg-neon-blue', 'text-white');
                    btn.classList.add('bg-gray-200', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
                }
            });
            
            cards.forEach(card => {
                if (status === 'all' || card.dataset.status === status) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function openCreateTournamentModal() {
            const name = prompt('Tournament Name:');
            if (name) {
                const newTournament = {
                    id: Date.now(),
                    name: name,
                    type: 'knockout',
                    status: 'registration',
                    prize: '$1,000',
                    players: 0,
                    maxPlayers: 16,
                    startDate: new Date().toISOString().split('T')[0],
                    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800',
                    description: 'New tournament'
                };
                store.tournaments.push(newTournament);
                store.saveData();
                router.navigate('tournaments');
                showToast('Tournament created successfully!');
            }
        }

        function updateTournamentStatus(id, status) {
            const tournament = store.tournaments.find(t => t.id === id);
            if (tournament) {
                tournament.status = status;
                store.saveData();
                showToast('Status updated');
            }
        }

        function deleteTournament(id) {
            if (confirm('Are you sure you want to delete this tournament?')) {
                store.tournaments = store.tournaments.filter(t => t.id !== id);
                store.saveData();
                router.navigate('admin');
                showToast('Tournament deleted');
            }
        }

        function reportScore(matchId) {
            const score1 = prompt('Your score:');
            const score2 = prompt('Opponent score:');
            if (score1 !== null && score2 !== null) {
                showToast('Score submitted for verification', 'success');
            }
        }

        function updateAvatar(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    store.currentUser.avatar = e.target.result;
                    store.saveData();
                    store.updateAuthUI();
                    router.navigate('profile');
                    showToast('Avatar updated!');
                };
                reader.readAsDataURL(file);
            }
        }

        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.classList.toggle('hidden');
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            if (message) {
                const chatMessages = document.getElementById('chatMessages');
                const newMsg = document.createElement('div');
                newMsg.className = 'flex space-x-2 justify-end';
                newMsg.innerHTML = `
                    <div class="bg-neon-blue text-white rounded-lg p-2 text-sm max-w-[200px]">
                        <p>${message}</p>
                    </div>
                `;
                chatMessages.appendChild(newMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                input.value = '';
            }
        }

        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            store.init();
            router.render();
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#userMenu')) {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) dropdown.classList.add('hidden');
            }
        });
    </script>
</body>
</html>