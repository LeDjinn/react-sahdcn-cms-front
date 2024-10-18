import React, { createContext, useState, useContext, useEffect } from 'react';
import { CMSContextType, CMSProviderProps, Collection, ContentItem } from '../types/cms';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>(() => {
    const savedCollections = localStorage.getItem('collections');
    return savedCollections ? JSON.parse(savedCollections) : [];
  });

  const [contentItems, setContentItems] = useState<Record<string, ContentItem[]>>(() => {
    const savedContentItems = localStorage.getItem('contentItems');
    return savedContentItems ? JSON.parse(savedContentItems) : {};
  });

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('contentItems', JSON.stringify(contentItems));
  }, [contentItems]);

  const addCollection = (collection: Omit<Collection, 'id'>) => {
    const newCollection = { ...collection, id: Date.now().toString() };
    setCollections([...collections, newCollection]);
  };

  const removeCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
    const { [id]: _, ...rest } = contentItems;
    setContentItems(rest);
  };

  const getCollection = (id: string) => collections.find(c => c.id === id);

  const addContentItem = (collectionId: string, item: Omit<ContentItem, 'id' | 'collectionId'>) => {
    const newItem = { ...item, id: Date.now().toString(), collectionId };
    setContentItems(prev => ({
      ...prev,
      [collectionId]: [...(prev[collectionId] || []), newItem],
    }));
  };

  const removeContentItem = (collectionId: string, itemId: string) => {
    setContentItems(prev => ({
      ...prev,
      [collectionId]: prev[collectionId].filter(item => item.id !== itemId),
    }));
  };

  const getContentItems = (collectionId: string) => contentItems[collectionId] || [];

  const value: CMSContextType = {
    collections,
    addCollection,
    removeCollection,
    getCollection,
    addContentItem,
    removeContentItem,
    getContentItems,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};