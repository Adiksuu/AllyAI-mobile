export const pl = {
    // Common
    common: {
        cancel: "Anuluj",
        save: "Zapisz",
        done: "Gotowe",
        back: "Wstecz",
        next: "Dalej",
        previous: "Poprzedni",
        close: "Zamknij",
        enable: "Włącz",
        disable: "Wyłącz",
        delete: "Usuń",
        edit: "Edytuj",
        settings: "Ustawienia",
        language: "Język",
        notifications: "Powiadomienia",
        account: "Konto",
        help: "Pomoc i Wsparcie",
        about: "O aplikacji",
    },

    // Settings Screen
    settings: {
        title: "Ustawienia",
        subtitle: "Dostosuj swoje doświadczenie",
        account: {
            title: "Konto",
            subtitle: "Zarządzaj swoim kontem",
        },
        aiChatbot: {
            title: "Chatbot AI",
            subtitle: "Skonfiguruj ustawienia AI",
        },
        notifications: {
            title: "Powiadomienia",
            subtitle: "Skonfiguruj alerty",
        },
        language: {
            title: "Język",
            subtitle: "Język aplikacji",
        },
        theme: {
            title: "Motyw",
            subtitle: "Ustawienia trybu ciemnego",
        },
        help: {
            title: "Pomoc i Wsparcie",
            subtitle: "Uzyskaj pomoc",
        },
        about: {
            title: "O AllyAI",
            version: "Wersja",
            updated: "Zaktualizowano",
        },
        loading: "Ładowanie ustawień...",
    },

    // Language Modal
    languageModal: {
        title: "Język",
        selectLanguage: "WYBIERZ SWÓJ",
        languages: {
            en: "Angielski",
            pl: "Polski",
        },
    },

    // Theme Modal
    themeModal: {
        title: "Motyw",
        selectTheme: "WYBIERZ SWÓJ",
        themes: {
            light: "Jasny",
            dark: "Ciemny",
            auto: "Automatyczny",
        },
        descriptions: {
            light: "Zawsze używaj jasnego motywu",
            dark: "Zawsze używaj ciemnego motywu",
            auto: "Dopasuj do ustawień systemu",
        },
    },

    // Notifications Modal
    notificationsModal: {
        title: "Powiadomienia",
        manageNotifications: "ZARZĄDZAJ",
        enableNotifications: "Włącz Powiadomienia",
        notificationsEnabled: "Powiadomienia są włączone",
        notificationsDisabled: "Powiadomienia są wyłączone",
        features: {
            stayTuned: {
                title: "Bądź na Bieżąco",
                description:
                    "Otrzymuj informacje o możliwych aktualizacjach aplikacji",
            },
            instantInsights: {
                title: "Natychmiastowe Wglądy",
                description:
                    "Otrzymuj natychmiastowe wglądy napędzane przez AI i rekomendacje dostosowane do Twoich potrzeb",
            },
        },
        notNow: "Nie Teraz",
    },

    // Home Screen
    home: {
        title: "Witaj w AllyAI",
        subtitle: "Twój asystent AI jest gotowy do pomocy",
        newChat: "Rozpocznij Nową Rozmowę",
        newChatSubtitle: "Zacznij rozmowę z AllyAI",
        recentChats: "Ostatnie Rozmowy",
    },

    // Premium Upgrade
    premium: {
        title: "Plan Premium",
        subtitle:
            "Odblokuj dostęp do wielu funkcji i uzyskaj nieograniczone rozmowy z AI",
        upgradeButton: "Ulepsz Plan",
    },

    // Chat History
    chatHistory: {
        clearAll: "Wyczyść Wszystko",
        emptyTitle: "Brak rozmów",
        emptySubtitle: "Rozpocznij swoją pierwszą rozmowę z AllyAI",
        untitledChat: "Rozmowa bez tytułu",
        time: {
            justNow: "Przed chwilą",
            minutesSuffix: "min temu",
            hoursSuffix: "godz temu",
            daysSuffix: "d temu",
        },
        showAllChats: "Pokaż Wszystkie Rozmowy",
        showLess: "Pokaż Mniej",
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
        placeholder: "Wpisz swoją wiadomość...",
        send: "Wyślij",
        newChat: "Nowa Rozmowa",
        clearChat: "Wyczyść Rozmowę",
        subtitle: "Rozpocznij rozmowę",
        thinking: "AI myśli...",
        welcomeMessage:
            "Cześć! Jestem AllyAI, Twoim osobistym asystentem. Jak mogę Ci dzisiaj pomóc?",
    },

    // Navigation
    navigation: {
        home: "Strona Główna",
        chat: "Rozmowa",
        settings: "Ustawienia",
        profile: "Profil",
    },

    // Profile Screen
    profile: {
        title: "Profil",
        subtitle: "Zarządzaj swoim profilem",
        subscription: "Subskrypcja",
        subscriptionSubtitle: "Zarządzaj swoim planem",
        dataExport: "Eksport Danych",
        dataExportSubtitle: "Pobierz swoje dane",
        preferences: "Preferencje",
        privacy: "Prywatność",
        userName: "Użytkownik AllyAI",
        userEmail: "user@allyai.com",
        conversations: "Rozmowy",
        tokens: "Tokeny",
        tokenRefresh: "Odświeżanie Tokenów",
        login: "Zaloguj",
        loginSubtitle: "Zaloguj się do swojego konta",
    },

    // Modals
    modals: {
        logout: {
            title: "Wyloguj",
            message: "Czy na pewno chcesz się wylogować ze swojego konta?",
            confirmButton: "Wyloguj",
        },
        deleteAccount: {
            title: "Usuń Konto",
            message:
                "Czy na pewno chcesz trwale usunąć swoje konto? Tej akcji nie można cofnąć i wszystkie dane zostaną utracone.",
            warning:
                "Spowoduje to usunięcie wszystkich rozmów, ustawień i informacji o koncie.",
            confirmButton: "Usuń Konto",
        },
        clearChatHistory: {
            title: "Wyczyść Historię Rozmów",
            message:
                "Czy na pewno chcesz usunąć całą historię rozmów? Tej akcji nie można cofnąć.",
            warning: "Wszystkie rozmowy zostaną trwale usunięte.",
            confirmButton: "Wyczyść Wszystko",
        },
    },

    // Change Password
    changePassword: {
        currentPassword: "Obecne Hasło",
        currentPasswordPlaceholder: "Wprowadź obecne hasło",
        newPassword: "Nowe Hasło",
        newPasswordPlaceholder: "Wprowadź nowe hasło",
        confirmButton: "Zmień Hasło",
        errors: {
            emptyCurrentPassword: "Wprowadź swoje obecne hasło",
            emptyNewPassword: "Wprowadź nowe hasło",
            passwordTooShort: "Nowe hasło powinno mieć co najmniej 6 znaków",
            samePassword: "Nowe hasło powinno być inne od obecnego hasła",
            wrongCurrentPassword: "Obecne hasło jest nieprawidłowe",
            weakPassword: "Nowe hasło powinno mieć co najmniej 6 znaków",
            requiresRecentLogin: "Zaloguj się ponownie przed zmianą hasła",
            generic: "Nie udało się zmienić hasła. Spróbuj ponownie.",
        },
        success: "Hasło zostało pomyślnie zmienione!",
        changing: "Zmienianie...",
    },

    // Auth
    auth: {
        title: "Witaj Spowrotem",
        subtitle: "Zaloguj się, aby kontynuować",
        registerTitle: "Utwórz Konto",
        registerSubtitle: "Dołącz do AllyAI już dziś",
        email: "Email",
        emailPlaceholder: "Wprowadź swój email",
        password: "Hasło",
        passwordPlaceholder: "Wprowadź swoje hasło",
        confirmPassword: "Potwierdź Hasło",
        confirmPasswordPlaceholder: "Potwierdź swoje hasło",
        loginButton: "Zaloguj Się",
        registerButton: "Utwórz Konto",
        forgotPassword: "Zapomniałeś hasła?",
        noAccount: "Nie masz konta?",
        hasAccount: "Masz już konto?",
        signUp: "Zarejestruj Się",
        signIn: "Zaloguj Się",
        termsAndPrivacy:
            "Rejestrując się, zgadzasz się z naszymi Warunkami Usługi i Polityką Prywatności",
        loginSuccess: "Logowanie udane!",
        registerSuccess: "Konto utworzone pomyślnie!",
        invalidCredentials: "Nieprawidłowy email lub hasło",
        emailExists: "Konto z tym emailem już istnieje",
        weakPassword: "Hasło powinno mieć co najmniej 6 znaków",
        invalidEmail: "Wprowadź prawidłowy adres email",
        passwordsDontMatch: "Hasła nie są identyczne",
        signingIn: "Logowanie...",
        errors: {
            userNotFound: "Nie znaleziono konta z tym adresem email",
            wrongPassword: "Nieprawidłowe hasło",
            invalidEmail: "Nieprawidłowy adres email",
            userDisabled: "To konto zostało wyłączone",
            tooManyRequests:
                "Zbyt wiele nieudanych prób. Spróbuj ponownie później",
            emailAlreadyInUse: "Konto z tym adresem email już istnieje",
            weakPassword: "Hasło powinno mieć co najmniej 6 znaków",
            operationNotAllowed: "Konta email/hasło nie są włączone",
            requiresRecentLogin: "Zaloguj się ponownie przed usunięciem konta",
            userNotFoundDelete: "Nie znaleziono konta użytkownika",
            generic: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
            passwordsDontMatch: "Hasła nie są identyczne",
            passwordResetSent:
                "Email z resetowaniem hasła został wysłany! Sprawdź swoją skrzynkę odbiorczą.",
            authPopupClosed:
                "Okno logowania zostało zamknięte przed ukończeniem",
            authCancelled: "Logowanie zostało anulowane",
            authPopupBlocked:
                "Okno logowania zostało zablokowane przez przeglądarkę",
            accountExistsDifferentCredential:
                "Konto już istnieje z tym samym emailem, ale innymi danymi logowania",
            networkError:
                "Błąd sieci. Sprawdź połączenie internetowe i spróbuj ponownie.",
            invalidCredential:
                "Podane dane uwierzytelniające są nieprawidłowe lub wygasły.",
            invalidVerificationCode:
                "Wprowadzony kod weryfikacyjny jest nieprawidłowy.",
            invalidVerificationId:
                "Identyfikator weryfikacji jest nieprawidłowy.",
            missingVerificationCode: "Kod weryfikacyjny jest wymagany.",
            missingVerificationId: "Identyfikator weryfikacji jest wymagany.",
            codeExpired: "Kod weryfikacyjny wygasł. Poproś o nowy.",
            credentialAlreadyInUse:
                "Te dane uwierzytelniające są już powiązane z innym kontem.",
            invalidPhoneNumber: "Podany numer telefonu jest nieprawidłowy.",
            missingPhoneNumber: "Numer telefonu jest wymagany.",
            quotaExceeded:
                "Przekroczono limit usługi. Spróbuj ponownie później.",
            appDeleted:
                "Ta aplikacja została usunięta i nie jest już dostępna.",
            appNotAuthorized:
                "Ta aplikacja nie ma autoryzacji do korzystania z Firebase Authentication.",
            argumentError:
                "Nieprawidłowy argument przekazany do metody uwierzytelniania.",
            invalidApiKey:
                "Nieprawidłowy klucz API. Skontaktuj się z pomocą techniczną.",
        },
    },

    // AI Chatbot Settings Screen
    aiChatbotSettings: {
        title: "Ustawienia AI",
        subtitle: "Dostosuj swojego asystenta AI",
        personality: {
            title: "Osobowość AI",
            subtitle: "Wybierz styl komunikacji",
        },
        responseStyle: {
            title: "Styl Odpowiedzi",
            subtitle: "Dostosuj sposób odpowiedzi",
        },
        conversationLength: {
            title: "Długość Rozmowy",
            subtitle: "Ustaw długość kontekstu",
        },
        responseSpeed: {
            title: "Szybkość Odpowiedzi",
            subtitle: "Wybierz szybkość odpowiedzi vs jakość",
        },
        capabilities: {
            title: "Możliwości AI",
            subtitle: "Włącz/wyłącz funkcje",
        },
        resetSettings: {
            title: "Resetuj Ustawienia",
            subtitle: "Przywróć domyślne ustawienia",
        },
    },

    // Account Management Screen
    accountManagement: {
        title: "Konto",
        subtitle: "Zarządzaj swoim kontem i bezpieczeństwem",
        accountInfo: "Informacje o Koncie",
        security: "Bezpieczeństwo",
        accountActions: "Akcje Konta",
        email: {
            title: "Adres Email",
            subtitle: "Zarządzaj adresem email",
        },
        password: {
            title: "Zmień Hasło",
            subtitle: "Zaktualizuj hasło dla bezpieczeństwa",
        },
        logout: {
            title: "Wyloguj",
            subtitle: "Wyloguj się z konta",
        },
        deleteAccount: {
            title: "Usuń Konto",
            subtitle: "Trwale usuń swoje konto",
        },
    },

    // AI Personality
    aiPersonality: {
        title: "Osobowość AI",
        subtitle: "Wybierz w jaki sposób ma odpowiadać twój asystent AI",
        friendly: {
            name: "Przyjazny",
            description: "Ciepły, przystępny i rozmowny",
        },
        professional: {
            name: "Profesjonalny",
            description: "Formalny, precyzyjny i skupiony na biznesie",
        },
        creative: {
            name: "Kreatywny",
            description: "Pomysłowy, artystyczny i ekspresyjny",
        },
        analytical: {
            name: "Analityczny",
            description: "Logiczny, oparty na danych i metodyczny",
        },
    },

    // Response Style
    responseStyle: {
        title: "Styl Odpowiedzi",
        subtitle: "Kontroluj jak szczegółowe są odpowiedzi AI",
        concise: {
            name: "Zwięzły",
            description: "Krótkie, bezpośrednie odpowiedzi",
        },
        balanced: {
            name: "Zbalansowany",
            description: "Odpowiedzi o umiarkowanej długości",
        },
        detailed: {
            name: "Szczegółowy",
            description: "Kompleksowe wyjaśnienia",
        },
    },

    // Conversation Length
    conversationLength: {
        title: "Długość Rozmowy",
        subtitle: "Ustaw preferowaną długość rozmowy",
        short: {
            name: "Krótka",
            description: "5-10 wiadomości",
        },
        medium: {
            name: "Średnia",
            description: "10-25 wiadomości",
        },
        long: {
            name: "Długa",
            description: "25+ wiadomości",
        },
    },

    // Response Speed
    responseSpeed: {
        title: "Szybkość Odpowiedzi",
        subtitle: "Wybierz między szybszymi odpowiedziami lub lepszą jakością",
        faster: {
            name: "Szybsza",
            description: "Szybkie odpowiedzi używając ALLY-3 Turbo",
        },
        enhanced: {
            name: "Ulepszona",
            description: "Odpowiedzi wysokiej jakości używając ALLY-3",
        },
    },

    // AI Capabilities
    aiCapabilities: {
        title: "Możliwości AI",
        subtitle: "Włącz lub wyłącz dodatkowe funkcje AI",
        webSearch: {
            name: "Wyszukiwanie w Sieci",
            description:
                "Wyszukuj informacje w internecie w czasie rzeczywistym",
        },
        imageGeneration: {
            name: "Generowanie Obrazów",
            description: "Twórz obrazy z opisów tekstowych",
        },
        memoryContext: {
            name: "Pamięć i Kontekst",
            description: "Pamiętaj poprzednie rozmowy",
        },
        voiceResponse: {
            name: "Odpowiedź Głosowa",
            description: "Wypowiadaj odpowiedzi na głos",
        },
        fileAnalysis: {
            name: "Analiza Plików",
            description: "Analizuj przesłane dokumenty",
        },
    },

    // Reset Settings
    resetSettings: {
        alertTitle: "Resetuj Ustawienia AI",
        alertMessage:
            "Czy na pewno chcesz zresetować wszystkie ustawienia AI do wartości domyślnych? Ta akcja nie może zostać cofnięta.",
        resetButton: "Resetuj",
        resetingButton: "Resetowanie...",
    },

    premiumModal: {
        intro: "ULEPSZ SWÓJ",
        title: "Plan",
        currentPlan: "Obecny Plan",
        premiumPlan: "Plan Premium",
        price: "20 zł/miesiąc",
        upgradeButton: "Ulepsz Teraz",
        current: "Obecny",
        plans: {
            free: {
                name: "Darmowy",
                desc: "Podstawowy dostęp do funkcji AllyAI. Ograniczona liczba rozmów miesięcznie.",
            },
            premium: {
                name: "Premium",
                desc: "Nieograniczone rozmowy, priorytetowe wsparcie i dostęp do wszystkich funkcji premium.",
            },
        },
    },

    // Model Selection Modal
    modelSelectionModal: {
        title: "Model AI",
        selectModel: "WYBIERZ SWÓJ",
    },

    // Notifications
    notifications: {
        tokenReset: {
            title: "Tokeny Odświeżone! 🎉",
            body: "Twój dzienny limit tokenów został zresetowany. Masz teraz dostępnych 75 tokenów do rozmów z AI.",
        },
    },

    // Onboarding
    onboarding: {
        slide1: {
            title: "Witaj w AllyAI",
            subtitle: "Twój asystent AI jest gotowy do pomocy",
            description:
                "Doświadcz inteligentnych rozmów i uzyskaj spersonalizowaną pomoc w codziennych zadaniach.",
        },
        slide2: {
            title: "Dostosuj",
            subtitle: "Zrób to po swojemu",
            description:
                "Wybierz preferowany motyw i język, aby spersonalizować swoje doświadczenie z AllyAI.",
            themeButton: "Wybierz Motyw",
            languageButton: "Wybierz Język",
        },
        slide3: {
            title: "Rozpocznij",
            subtitle: "Zacznijmy Twoją podróż",
            description: "Zacznij rozmawiać z AllyAI i odkryj moc pomocy AI.",
            startButton: "Zacznij Korzystać z AllyAI",
        },
        skip: "Pomiń",
        next: "Dalej",
        done: "Rozpocznij",
    },

    // No Internet
    noInternet: {
        title: "Brak Połączenia z Internetem",
        message: "Sprawdź swoje połączenie internetowe i spróbuj ponownie.",
        retry: "Spróbuj Ponownie",
    },
};
