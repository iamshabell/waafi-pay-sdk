export type WaafiResponse = {
  schemaVersion: string;
  timestamp: string;
  requestId: string;
  sessionId?: string;
  responseCode: string;
  errorCode: string;
  responseMsg: string;
  params?: IResponseParams;
};

type IResponseParams = {
  issuerApprovalCode: string;
  accountNo: string;
  accountType: string;
  accountholder: string;
  state: string;
  merchantCharges: string;
  customerCharges: string;
  referenceId: string;
  transactionId: string;
  accountExpDate: string;
  issuerTransactionId: string;
  txAmount: string;
};
