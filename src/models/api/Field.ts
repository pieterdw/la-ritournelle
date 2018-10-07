export interface Field {
  name: string;
  type: 'text' | 'markdown' | 'layout';
  localize: boolean;
  options: any;
}
