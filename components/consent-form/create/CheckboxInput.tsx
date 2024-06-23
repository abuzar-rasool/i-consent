// components/CheckboxInput.tsx
import { Controller, Control } from 'react-hook-form';
import { FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxInputProps {
  control: Control<any>;
  name: string;
  label: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ control, name, label }) => {
  return (
    <FormItem>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        )}
      />
      <FormMessage />
    </FormItem>
  );
};
