import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCMS } from '../context/CMSContext';
import { Field } from '../types/cms';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const CollectionForm: React.FC = () => {
  const { addCollection } = useCMS();
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      fields: [] as Field[],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const onSubmit = (data: { name: string; fields: Field[] }) => {
    addCollection(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Collection Name</Label>
        <Input id="name" {...register('name', { required: true })} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-foreground">Fields</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="mt-2 flex items-center space-x-2">
            <Input
              {...register(`fields.${index}.name` as const, { required: true })}
              placeholder="Field name"
            />
            <Select
              onValueChange={(value) => {
                control._formValues.fields[index].type = value as Field['type'];
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`required-${index}`}
                {...register(`fields.${index}.required` as const)}
              />
              <Label htmlFor={`required-${index}`}>Required</Label>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ name: '', type: 'text', required: false })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>
      <Button type="submit">Create Collection</Button>
    </form>
  );
};

export default CollectionForm;