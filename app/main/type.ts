export type FormValues = {
    formData: {
      id: string;
      item: string;
      qty: number | null;
      price: number | null;
    }[];
  };

  export type FormValues2 = {
    formData : {foods: {
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
        qty: number | null;
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

