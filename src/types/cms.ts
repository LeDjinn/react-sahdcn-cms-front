import { ReactNode } from 'react';

export interface Field {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date';
  required: boolean;
}

export interface Collection {
  id: string;
  name: string;
  fields: Field[];
}

export interface ContentItem {
  id: string;
  collectionId: string;
  [key: string]: any;
}

export interface CMSContextType {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  removeCollection: (id: string) => void;
  getCollection: (id: string) => Collection | undefined;
  addContentItem: (collectionId: string, item: Omit<ContentItem, 'id' | 'collectionId'>) => void;
  removeContentItem: (collectionId: string, itemId: string) => void;
  getContentItems: (collectionId: string) => ContentItem[];
}

export interface CMSProviderProps {
  children: ReactNode;
}