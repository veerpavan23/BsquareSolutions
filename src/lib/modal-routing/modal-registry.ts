export type ModalType = 'book-demo' | 'brochure';

export type ModalConfig = {
  allowedParams: readonly string[];
};

export const modalRegistry = {
  'book-demo': {
    allowedParams: ['course', 'vertical', 'batch'],
  },
  brochure: {
    allowedParams: ['course'],
  },
} satisfies Record<ModalType, ModalConfig>;

export function isValidModalType(type: string | null): type is ModalType {
  if (!type) return false;
  return type in modalRegistry;
}
