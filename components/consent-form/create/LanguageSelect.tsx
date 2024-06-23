// components/LanguageSelect.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageSelectProps {
  control: Control<any>;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ control }) => {
  return (
    <FormItem>
      <FormLabel>Informed Consent Language</FormLabel>
      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <FormControl>
            <Select {...field}>
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        )}
      />
    </FormItem>
  );
};
