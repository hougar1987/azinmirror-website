export type Language = 'fa' | 'en';

export interface LocalizedString {
  fa: string;
  en: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  useCase: LocalizedString;
  image: string;
  features: LocalizedString[];
  specs: {
    key: LocalizedString;
    value: LocalizedString;
  }[];
}

export interface Project {
  id: string;
  title: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  image: string;
  year: string;
  clientType: 'B2B' | 'B2C';
}

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  iconName: string; // Name of Lucide icon
  details: LocalizedString[];
}

export interface FAQ {
  question: LocalizedString;
  answer: LocalizedString;
}
