export interface HTTP_REQ {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
}
export interface HTTP_RES {
  success: boolean;
  data: any;
  error?: any;
}
