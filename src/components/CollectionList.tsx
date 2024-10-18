import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

const CollectionList: React.FC = () => {
  const { collections, removeCollection } = useCMS();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Collections</h2>
      {collections.length === 0 ? (
        <p className="text-muted-foreground">No collections created yet.</p>
      ) : (
        <ul className="space-y-4">
          {collections.map((collection) => (
            <li key={collection.id} className="bg-card shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-foreground">{collection.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCollection(collection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <ul className="mt-2 space-y-1">
                {collection.fields.map((field, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {field.name} ({field.type}){field.required ? ' *' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectionList;