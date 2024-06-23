// components/NumberInput.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  control: Control<any>;
  name: string;
  label: string;
  min?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({ control, name, label, min }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl>
            <Input {...field} type="number" min={min} />
          </FormControl>
        )}
      />
    </FormItem>
  );
};
