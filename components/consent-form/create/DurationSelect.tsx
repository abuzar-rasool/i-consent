// components/DurationSelect.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DurationSelectProps {
  control: Control<any>;
}

export const DurationSelect: React.FC<DurationSelectProps> = ({ control }) => {
  return (
    <FormItem>
      <FormLabel>Duration Unit</FormLabel>
      <Controller
        name="durationUnit"
        control={control}
        render={({ field }) => (
          <FormControl>
            <Select {...field}>
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        )}
      />
    </FormItem>
  );
};
