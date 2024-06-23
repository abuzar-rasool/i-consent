// components/InstitutionSelect.tsx
import { Controller, Control } from 'react-hook-form';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InstitutionSelectProps {
  control: Control<any>;
  setShowOtherInstitution: (value: boolean) => void;
}

export const InstitutionSelect: React.FC<InstitutionSelectProps> = ({ control, setShowOtherInstitution }) => {
  return (
    <FormItem>
      <FormLabel>Your Institution</FormLabel>
      <Controller
        name="institution"
        control={control}
        render={({ field }) => (
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setShowOtherInstitution(value === 'other');
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frauas">
                  Frankfurt University of Applied Sciences
                </SelectItem>
                <SelectItem value="regensburg">
                  University of Regensburg
                </SelectItem>
                <SelectItem value="stuttgart">
                  University of Stuttgart
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        )}
      />
    </FormItem>
  );
};
