export const en = {
    // Common
    common: {
        cancel: "Cancel",
        save: "Save",
        done: "Done",
        back: "Back",
        next: "Next",
        previous: "Previous",
        close: "Close",
        enable: "Enable",
        disable: "Disable",
        delete: "Delete",
        edit: "Edit",
        settings: "Settings",
        language: "Language",
        notifications: "Notifications",
        account: "Account",
        help: "Help & Support",
        about: "About",
    },

    // Settings Screen
    settings: {
        title: "Settings",
        subtitle: "Customize your experience",
        account: {
            title: "Account",
            subtitle: "Manage your account",
        },
        aiChatbot: {
            title: "AI Chatbot",
            subtitle: "Configure your AI settings",
        },
        notifications: {
            title: "Notifications",
            subtitle: "Configure alerts",
        },
        language: {
            title: "Language",
            subtitle: "App language",
        },
        theme: {
            title: "Theme",
            subtitle: "Dark mode settings",
        },
        help: {
            title: "Help & Support",
            subtitle: "Get help",
        },
        about: {
            title: "About AllyAI",
            version: "Version",
            updated: "Updated on",
        },
        loading: "Loading settings...",
    },

    // Language Modal
    languageModal: {
        title: "Language",
        selectLanguage: "SELECT YOUR",
        languages: {
            en: "English",
            pl: "Polish",
        },
    },

    // Theme Modal
    themeModal: {
        title: "Theme",
        selectTheme: "SELECT YOUR",
        themes: {
            light: "Light",
            dark: "Dark",
            auto: "Auto",
        },
        descriptions: {
            light: "Always use light theme",
            dark: "Always use dark theme",
            auto: "Follow system settings",
        },
    },

    // Notifications Modal
    notificationsModal: {
        title: "Notifications",
        manageNotifications: "MANAGE THE",
        features: {
            stayTuned: {
                title: "Stay Tuned",
                description: "Receive information about a possible app update",
            },
            instantInsights: {
                title: "Instant Insights",
                description:
                    "Get immediate AI-driven insights and recommendations tailored to your needs",
            },
        },
        notNow: "Not Now",
    },

    // Home Screen
    home: {
        title: "Welcome to AllyAI",
        subtitle: "Your AI assistant is ready to help",
        newChat: "Start New Chat",
        newChatSubtitle: "Begin a conversation with AllyAI",
        recentChats: "Recent Chats",
    },

    // Premium Upgrade
    premium: {
        title: "Premium Plan",
        subtitle:
            "Unlock access to many features and get unlimited AI conversations",
        upgradeButton: "Upgrade Plan",
    },

    // Chat History
    chatHistory: {
        clearAll: "Clear All",
        emptyTitle: "No conversations yet",
        emptySubtitle: "Start your first chat with AllyAI",
        recentChats: {
            1: {
                title: "React Native Navigation Help",
                lastMessage: "How do I implement bottom tabs?",
                timestamp: "2 hours ago",
            },
            2: {
                title: "JavaScript Async/Await",
                lastMessage: "Can you explain promises?",
                timestamp: "1 day ago",
            },
            3: {
                title: "Mobile App Design",
                lastMessage: "What's the best color scheme?",
                timestamp: "3 days ago",
            },
            4: {
                title: "API Integration",
                lastMessage: "How to handle errors?",
                timestamp: "1 week ago",
            },
        },
    },

    // Chat Screen
    chat: {
        placeholder: "Type your message...",
        send: "Send",
        newChat: "New Chat",
        clearChat: "Clear Chat",
        subtitle: "Start a conversation",
        welcomeMessage:
            "Hello! I'm AllyAI, your personal assistant. How can I help you today?",
    },

    // Navigation
    navigation: {
        home: "Home",
        chat: "Chat",
        settings: "Settings",
        profile: "Profile",
    },

    // Profile Screen
    profile: {
        title: "Profile",
        subtitle: "Manage your profile",
        subscription: "Subscription",
        subscriptionSubtitle: "Manage your plan",
        usageStats: "Usage Stats",
        usageStatsSubtitle: "View your activity",
        dataExport: "Data Export",
        dataExportSubtitle: "Download your data",
        preferences: "Preferences",
        privacy: "Privacy",
        userName: "AllyAI User",
        userEmail: "user@allyai.com",
        conversations: "Conversations",
        messages: "Messages",
        daysActive: "Days Active",
        login: "Login",
        loginSubtitle: "Login to your account",
    },

    // Login/Register Screen
    auth: {
        title: "Welcome Back",
        subtitle: "Sign in to continue",
        registerTitle: "Create Account",
        registerSubtitle: "Join AllyAI today",
        email: "Email",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
        loginButton: "Sign In",
        registerButton: "Create Account",
        forgotPassword: "Forgot Password?",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        signUp: "Sign Up",
        signIn: "Sign In",
        google: "Continue with Google",
        facebook: "Continue with Facebook",
        termsAndPrivacy: "By signing up, you agree to our Terms of Service and Privacy Policy",
        loginSuccess: "Login successful!",
        registerSuccess: "Account created successfully!",
        invalidCredentials: "Invalid email or password",
        emailExists: "An account with this email already exists",
        weakPassword: "Password should be at least 6 characters",
        invalidEmail: "Please enter a valid email address",
        passwordsDontMatch: "Passwords don't match",
    },

    // AI Chatbot Settings Screen
    aiChatbotSettings: {
        title: "AI Chatbot Settings",
        subtitle: "Customize your AI assistant",
        personality: {
            title: "AI Personality",
            subtitle: "Choose communication style",
        },
        responseStyle: {
            title: "Response Style",
            subtitle: "Customize response format",
        },
        conversationLength: {
            title: "Conversation Length",
            subtitle: "Set context length",
        },
        capabilities: {
            title: "AI Capabilities",
            subtitle: "Enable/disable features",
        },
        resetSettings: {
            title: "Reset Settings",
            subtitle: "Restore default settings",
        },
    },

    // Account Management Screen
    accountManagement: {
        title: "Account Management",
        subtitle: "Manage your account and security",
        accountInfo: "Account Information",
        security: "Security",
        accountActions: "Account Actions",
        email: {
            title: "Email Address",
            subtitle: "Manage email address",
        },
        password: {
            title: "Change Password",
            subtitle: "Update your password for security",
        },
        logout: {
            title: "Logout",
            subtitle: "Sign out of account",
        },
        deleteAccount: {
            title: "Delete Account",
            subtitle: "Permanently delete your account",
        },
    },

    // Change Password
    changePassword: {
        currentPassword: "Current Password",
        currentPasswordPlaceholder: "Enter current password",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter new password",
        confirmButton: "Change Password",
    },

    // AI Personality
    aiPersonality: {
        title: "AI Personality",
        subtitle: "Choose how your AI assistant behaves",
        friendly: {
            name: "Friendly",
            description: "Warm, approachable, and conversational",
        },
        professional: {
            name: "Professional",
            description: "Formal, precise, and business-focused",
        },
        creative: {
            name: "Creative",
            description: "Imaginative, artistic, and expressive",
        },
        analytical: {
            name: "Analytical",
            description: "Logical, data-driven, and methodical",
        },
    },

    // Response Style
    responseStyle: {
        title: "Response Style",
        subtitle: "Control how detailed AI responses are",
        concise: {
            name: "Concise",
            description: "Short, direct answers",
        },
        balanced: {
            name: "Balanced",
            description: "Moderate length responses",
        },
        detailed: {
            name: "Detailed",
            description: "Comprehensive explanations",
        },
    },

    // Conversation Length
    conversationLength: {
        title: "Conversation Length",
        subtitle: "Set preferred conversation duration",
        short: {
            name: "Short",
            description: "5-10 messages",
        },
        medium: {
            name: "Medium",
            description: "10-25 messages",
        },
        long: {
            name: "Long",
            description: "25+ messages",
        },
    },

    // AI Capabilities
    aiCapabilities: {
        title: "AI Capabilities",
        subtitle: "Enable or disable specific features",
        webSearch: {
            name: "Web Search",
            description: "Search the internet for real-time information",
        },
        imageGeneration: {
            name: "Image Generation",
            description: "Create images from text descriptions",
        },
        memoryContext: {
            name: "Memory & Context",
            description: "Remember previous conversations",
        },
        voiceResponse: {
            name: "Voice Response",
            description: "Speak responses aloud",
        },
        fileAnalysis: {
            name: "File Analysis",
            description: "Analyze uploaded documents",
        },
    },

    // Reset Settings
    resetSettings: {
        alertTitle: "Reset AI Settings",
        alertMessage:
            "Are you sure you want to reset all AI settings to their default values? This action cannot be undone.",
        resetButton: "Reset to Defaults",
        resetingButton: "Resetting...",
    },

    premiumModal: {
        intro: "UPGRADE YOUR",
        title: "Plan",
        currentPlan: "Current Plan",
        premiumPlan: "Premium Plan",
        price: "$5.00/month",
        upgradeButton: "Upgrade Now",
        current: "Current",
        plans: {
            free: {
                name: "Free",
                desc: "Basic access to AllyAI features. Limited conversations per month.",
            },
            premium: {
                name: "Premium",
                desc: "Unlimited conversations, priority support, and access to all premium features.",
            },
        },
    },

    // Onboarding
    onboarding: {
        slide1: {
            title: "Welcome to AllyAI",
            subtitle: "Your AI assistant is ready to help",
            description: "Experience intelligent conversations and get personalized assistance for your daily tasks.",
        },
        slide2: {
            title: "Customize Your Experience",
            subtitle: "Make it yours",
            description: "Choose your preferred theme and language to personalize your AllyAI experience.",
            themeButton: "Select Theme",
            languageButton: "Select Language",
        },
        slide3: {
            title: "Get Started",
            subtitle: "Let's begin your journey",
            description: "Start chatting with AllyAI and discover the power of AI assistance.",
            startButton: "Start Using AllyAI",
        },
        skip: "Skip",
        next: "Next",
        done: "Get Started",
    },
};
