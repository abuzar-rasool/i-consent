// components/ResearchTypeSelect.tsx
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ResearchTypeSelectProps {
  control: Control<any>;
}

export const ResearchTypeSelect: React.FC<ResearchTypeSelectProps> = ({ control }) => {
  return (
    <FormItem>
      <FormLabel>Kind of research</FormLabel>
      <Controller
        name="researchType"
        control={control}
        render={({ field }) => (
          <FormControl>
            <Select {...field}>
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onlinestudy">Online study</SelectItem>
                <SelectItem value="userstudy">User Study</SelectItem>
                <SelectItem value="fieldstudy">Field Study</SelectItem>
                <SelectItem value="qualitativestudy">Interview</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        )}
      />
    </FormItem>
  );
};
