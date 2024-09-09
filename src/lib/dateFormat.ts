import { format } from 'date-fns';

interface DateFormatProps {
  date: string
}

export default function dateFormat({ date }: DateFormatProps): string {
  const dateObject = new Date(date);

  return format(dateObject, 'yyyy-MM-dd');
}
