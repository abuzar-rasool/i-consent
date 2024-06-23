// components/DateRangePicker.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DatePickerWithRange } from '@/components/data-range-picker';

interface DateRangePickerProps {
  control: Control<any>;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ control }) => {
  return (
    <FormItem>
      <FormLabel>Estimated study date range</FormLabel>
      <Controller
        name="studyDateRange"
        control={control}
        render={({ field }) => (
          <FormControl>
            <DatePickerWithRange
              value={field.value as any}
              onChange={field.onChange}
            />
          </FormControl>
        )}
      />
    </FormItem>
  );
};
