import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ContentList: React.FC = () => {
  const { collections, getContentItems, removeContentItem } = useCMS();
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const contentItems = selectedCollection ? getContentItems(selectedCollection) : [];
  const selectedCollectionFields = collections.find(c => c.id === selectedCollection)?.fields || [];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Content Items</h2>
      <Select onValueChange={setSelectedCollection}>
        <SelectTrigger>
          <SelectValue placeholder="Select a collection" />
        </SelectTrigger>
        <SelectContent>
          {collections.map((collection) => (
            <SelectItem key={collection.id} value={collection.id}>
              {collection.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCollection && contentItems.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No content items in this collection.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {contentItems.map((item) => (
            <li key={item.id} className="bg-card shadow rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  {selectedCollectionFields.map((field) => (
                    <p key={field.name} className="text-sm text-muted-foreground">
                      <span className="font-medium">{field.name}:</span> {item[field.name]}
                    </p>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeContentItem(selectedCollection, item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentList;