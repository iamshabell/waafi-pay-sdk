export interface IPostData {
  schemaVersion: '1.0';
  requestId: '7102205824';
  timestamp: '2022-02-04 Africa';
  channelName: 'WEB';
  serviceName: string;
  serviceParams: IServiceParams;
}

export interface IServiceParams {
  merchantUid: string;
  apiUserId: string;
  apiKey: string;
  paymentMethod: string;
  browserInfo: string;
  payerInfo: IPayerInfo;
  transactionInfo: ITransactionInfo;
}

export interface IPayerInfo {
  accountNo: string;
  accountType?: string;
  accountHolder?: string;
}

export interface ITransactionInfo {
  referenceId: number;
  invoiceId: number;
  amount: number;
  currency: string;
  description: string;
}
