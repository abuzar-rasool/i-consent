// components/TextInput.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ control, name, label, placeholder }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl>
            <Input {...field} placeholder={placeholder} />
          </FormControl>
        )}
      />
    </FormItem>
  );
};
