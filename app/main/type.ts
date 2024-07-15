import dayjs, { Dayjs } from "dayjs";
 export type FormValues = {
    formData : {
    saleDate: Date | Dayjs
    foods: {
      detail: {
        id: string;
        item: string;
        qty: number | null;
        price: number | null;
      }[];
      total: number;
    };
    drinks: {
      detail: {
        id: string;
        item: string;
        default : number | null,
        soda : number | null
        price: number | null;
      }[];
      total: number;
    };}
  };


 export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

