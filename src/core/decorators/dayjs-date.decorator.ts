import * as dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ValueTransformer } from 'typeorm';

dayjs.locale('vi');

export function DayjsDate(): ValueTransformer {
  return {
    from: (value: Date) => {
      try {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      } catch (error) {
        console.error(`Error formatting date: ${error.message}`);
        throw error;
      }
    },
    to: (value: string | number | Date | dayjs.Dayjs) => {
      const formattedDate = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      return formattedDate;
    }
  };
}
