import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Navigation
    'nav.services': 'Сервисы',
    'nav.documents': 'Документы',
    'nav.checklist': 'Памятка студента',
    'nav.faq': 'FAQ',

    // Home Page
    'home.title': 'Помощник иностранного студента',
    'home.subtitle': 'Добро пожаловать в систему поддержки иностранных студентов Петрозаводского государственного университета',
    'home.visa': 'Рассчитать дату подачи документов на продление визы',
    'home.services': 'Сервисы',
    'home.services.desc': 'Доступ к основным сервисам для иностранных студентов',
    'home.documents': 'Документы',
    'home.documents.desc': 'Информация о необходимых миграционных документах',
    'home.guide': 'Памятка студента',
    'home.guide.desc': 'Важная информация для иностранных студентов',
    'home.faq': 'FAQ',
    'home.faq.desc': 'Ответы на часто задаваемые вопросы',
    'home.social': 'Присоединяйтесь к нам в соцсетях',
    'home.vk': 'VK Группа',
    'home.telegram': 'Telegram Канал',

    // Documents Page
    'documents.title': 'Основные миграционные документы',
    
    // Footer
    'footer.navigation': 'Навигация',
    'footer.home': 'Главная',
    'footer.services': 'Сервисы',
    'footer.documents': 'Документы',
    'footer.guide': 'Памятка студента',
    'footer.social': 'Социальные сети',
    'footer.contacts': 'Контакты',
    'footer.department': 'Регистрационно-визовый отдел ПетрГУ',
    'footer.address': 'ул. Анохина, 20, каб. 409',
    'footer.number' : 'Рабочий телефон: 8(8142)71-96-34',
    'footer.mail' : 'Эл. почта: rvo@petrsu.ru',
    'footer.disclaimer': '* Данный сайт предназначен для использования ИСКЛЮЧИТЕЛЬНО иностранными студентами ПетрГУ.',
    'footer.copyright': 'Регистрационно-визовый отдел ПетрГУ ©'
  },
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.documents': 'Documents',
    'nav.checklist': 'Student instructions',
    'nav.faq': 'FAQ',

    // Home Page
    'home.title': 'International Student Assistant',
    'home.subtitle': 'Welcome to the support system for international students of Petrozavodsk State University',
    'home.visa': 'Calculate the deadline for study visa documents applying',
    'home.services': 'Services',
    'home.services.desc': 'Access to essential international student services',
    'home.documents': 'Documents',
    'home.documents.desc': 'Information about required migration documents',
    'home.guide': 'Student Instructions',
    'home.guide.desc': 'Important information for international students',
    'home.faq': 'FAQ',
    'home.faq.desc': 'Answers to frequently asked questions',
    'home.social': 'Join Us on Social Media',
    'home.vk': 'VK Community',
    'home.telegram': 'Telegram Channel',

    // Documents Page
    'documents.title': 'Essential Migration Documents',
    
    // Footer
    'footer.navigation': 'Navigation',
    'footer.home': 'Home',
    'footer.services': 'Services',
    'footer.documents': 'Documents',
    'footer.guide': 'Student Guide',
    'footer.social': 'Social Media',
    'footer.contacts': 'Contacts',
    'footer.department': 'PetrSU Registration and Visa Department',
    'footer.address': '20 Anokhina St., office 409',
    'footer.number' : 'Work Phone: 8(8142)71-96-34',
    'footer.mail' : 'Email: rvo@petrsu.ru',
    'footer.disclaimer': '* This website is intended for use EXCLUSIVELY by PetrSU international students.',
    'footer.copyright': 'PetrSU Registration and Visa Department ©'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}