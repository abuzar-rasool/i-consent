// components/OtherInstitutionInput.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface OtherInstitutionInputProps {
  control: Control<any>;
}

export const OtherInstitutionInput: React.FC<OtherInstitutionInputProps> = ({ control }) => {
  return (
    <FormItem>
      <FormLabel>Other Institution</FormLabel>
      <Controller
        name="otherInstitution"
        control={control}
        render={({ field }) => (
          <FormControl>
            <Input
              {...field}
              placeholder="Your Institution, Streetname 123, ZIP City, Country"
            />
          </FormControl>
        )}
      />
    </FormItem>
  );
};
