export interface FormComponent {
    id: string; // usado para identificar e editar/remover
    type: any;
    label?: string;
    placeholder?: string;
    value?: any;
    slides?: Array<{ url: string; title: string }>; // usado para carrossel
  }