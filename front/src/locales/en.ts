import { LocaleContent } from '../types';

export const en: LocaleContent = {
  header: {
    nav: {
      process: 'Our Process',
      benefits: 'Benefits',
      faq: 'FAQ',
      contact: 'Contact',
    },
    cta: 'Contact Us',
  },
  hero: {
    title: 'Code Automation for Digital Agencies',
    subtitle: 'CODERS🤖 transforms your technical specifications into production-quality source code, accelerating your projects and reducing development costs.',
    cta: 'Discover how it works',
  },
  process: {
    title: 'Our Process',
    intro: 'Discover how our technology transforms your specifications into ready-to-use source code in six simple steps.',
    steps: [
      {
        title: 'Step 1',
        description: 'The agency submits their detailed technical specifications through our secure portal',
      },
      {
        title: 'Step 2',
        description: 'Our system analyzes the project specifications and requirements',
      },
      {
        title: 'Step 3',
        description: 'Within hours, the agency receives an accurate quote (cost and delivery timeframe)',
      },
      {
        title: 'Step 4',
        description: 'After validation and initial payment, CODERS initiates the project generation',
      },
      {
        title: 'Step 5',
        description: 'The agency tracks progress in real-time via the dedicated Dashboard',
      },
      {
        title: 'Step 6',
        description: 'The complete source code is delivered within the agreed timeframe, ready for deployment',
      },
    ],
  },
  benefits: {
    title: 'Benefits',
    intro: 'Our automation solution offers significant advantages for your digital agency.',
    items: [
      {
        title: 'Cost Reduction',
        description: 'Reduce your development costs by up to 70% by automating code generation.',
      },
      {
        title: 'Time Savings',
        description: 'Accelerate your development cycles by 5x on average and meet all your deadlines.',
      },
      {
        title: 'Consistent Quality',
        description: 'Get professional-grade, standardized, and optimized code every time.',
      },
      {
        title: 'Strategic Focus',
        description: 'Focus your resources on strategy and creativity rather than repetitive coding.',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What types of projects can CODERS🤖 generate?',
        answer: 'Our technology can generate source code for websites, web applications, and mobile apps from detailed specifications. We support modern technologies like React, Vue, Angular, Flutter, and native iOS and Android applications.',
      },
      {
        question: 'How do you ensure the quality of the generated code?',
        answer: 'Our system applies development best practices and follows industry standards. Each generated project undergoes rigorous automated testing to ensure clean, maintainable, and performant code.',
      },
      {
        question: 'Can I modify the code after delivery?',
        answer: 'Absolutely! You receive 100% of the source code, well-documented and following modern conventions. Your developers can easily take over for specific customizations or future evolutions.',
      },
      {
        question: 'How long does it take to generate a complete project?',
        answer: 'Time varies depending on project complexity, but we typically deliver in a few days what would take several weeks or months with traditional development.',
      },
    ],
  },
  contact: {
    title: 'Contact Us',
    intro: 'Ready to transform your development process? Contact us for a demonstration or a personalized quote.',
    form: {
      email: {
        label: 'Email address',
        placeholder: 'your@email.com',
        required: 'Email is required',
        invalid: 'Please enter a valid email address',
      },
      name: {
        label: 'Your name',
        placeholder: 'John Smith',
        required: 'Name is required',
      },
      company: {
        label: 'Company name',
        placeholder: 'Digital Agency',
      },
      message: {
        label: 'Your message',
        placeholder: 'Tell us about your needs...',
      },
      submit: 'Send',
      success: 'Message sent successfully!',
      error: 'An error occurred. Please try again.',
    },
  },
  footer: {
    company: '© 2025 CODERS🤖. All rights reserved.',
    links: [
      {
        label: 'Company',
        items: [
          { label: 'About', url: '#' },
          { label: 'Careers', url: '#' },
          { label: 'Blog', url: '#' },
        ],
      },
      {
        label: 'Resources',
        items: [
          { label: 'Documentation', url: '#' },
          { label: 'Tutorials', url: '#' },
          { label: 'Case Studies', url: '#' },
        ],
      },
      {
        label: 'Legal',
        items: [
          { label: 'Privacy', url: '#' },
          { label: 'Terms', url: '#' },
          { label: 'Cookies', url: '#' },
        ],
      },
    ],
    legal: '© 2025 CODERS🤖. All rights reserved.',
  },
};