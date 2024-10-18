import React from 'react';
import { useForm } from 'react-hook-form';
import { useCMS } from '../context/CMSContext';
import { Collection, Field } from '../types/cms';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const ContentForm: React.FC = () => {
  const { collections, addContentItem } = useCMS();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const selectedCollection = watch('collection');

  const onSubmit = (data: any) => {
    const { collection, ...contentData } = data;
    addContentItem(collection, contentData);
    reset();
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            {...register(field.name, { required: field.required })}
            placeholder={field.name}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            {...register(field.name, { required: field.required, valueAsNumber: true })}
            placeholder={field.name}
          />
        );
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.name} {...register(field.name)} />
            <Label htmlFor={field.name}>{field.name}</Label>
          </div>
        );
      case 'date':
        return (
          <Input
            type="date"
            {...register(field.name, { required: field.required })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="collection">Select Collection</Label>
        <Select onValueChange={(value) => setValue('collection', value)}>
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
      </div>
      {selectedCollection && (
        <>
          {collections
            .find((c) => c.id === selectedCollection)
            ?.fields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.name}</Label>
                {renderField(field)}
              </div>
            ))}
          <Button type="submit">Add Content</Button>
        </>
      )}
    </form>
  );
};

export default ContentForm;