export interface LocaleContent {
  header: {
    nav: {
      process: string;
      benefits: string;
      faq: string;
      contact: string;
    };
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  process: {
    title: string;
    intro: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  benefits: {
    title: string;
    intro: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    title: string;
    intro: string;
    form: {
      email: {
        label: string;
        placeholder: string;
        required: string;
        invalid: string;
      };
      name: {
        label: string;
        placeholder: string;
        required: string;
      };
      company: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
      success: string;
      error: string;
    };
  };
  footer: {
    company: string;
    links: {
      label: string;
      items: {
        label: string;
        url: string;
      }[];
    }[];
    legal: string;
  };
}

export type Locale = 'fr' | 'en';