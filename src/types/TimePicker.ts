import { TIME_LIST } from '@/component/TimePicker/data';

export type TimeListData = (typeof TIME_LIST)[keyof typeof TIME_LIST];
