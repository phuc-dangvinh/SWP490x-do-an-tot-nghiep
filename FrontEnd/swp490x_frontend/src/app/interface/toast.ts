import { EToastClass } from '../const/EToastClass';

export interface Toast {
  content: string;
  classname: EToastClass;
  delay: number;
}
