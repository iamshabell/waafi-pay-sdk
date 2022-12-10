import { PRODUCTION_ENVIRONMENT, TEST_ENVIRONMENT } from './url';
import got from 'got';
import { CreditAccountDTO } from './Dto/creditAccountDto';
import { APIPurchaseDTO } from './Dto/apiPurchaseDto';
import { TransactionInfoDTO } from './Dto/transactionInfoDto';
import { PayerInfoDTO } from './Dto/payerInfoDto';
import {
  IPayerInfo,
  IPostData,
  IServiceParams,
  ITransactionInfo,
} from './type/interfaces';
import { WaafiResponse } from './type/waafiResponse';
import { ServiceParamsDTO } from './Dto/serviceParamDto';

export class WaafiAPI {
  private apiKey: string = '';
  private merchantKey: string = '';
  private apiUserId: string = '';
  private url: string = '';

  constructor(
    apiKey: string,
    apiUserId: string,
    merchantKey: string,
    isTestMode: boolean
  ) {
    this.apiKey = apiKey;
    this.merchantKey = merchantKey;
    this.apiUserId = apiUserId;
    this.url = isTestMode ? PRODUCTION_ENVIRONMENT : TEST_ENVIRONMENT;
  }

  public async apiPurchase(data: APIPurchaseDTO): Promise<WaafiResponse> {
    const serviceParams = this.setServiceParams({ ...data });

    const postData: IPostData = {
      serviceName: 'API_PURCHASE',
      serviceParams,
      schemaVersion: '1.0',
      requestId: '7102205824',
      timestamp: '2022-02-04 Africa',
      channelName: 'WEB',
    };

    const response = (await got
      .post(this.url, {
        json: postData,
      })
      .json()) as WaafiResponse;

    return response;
  }

  public async creditAccount(data: CreditAccountDTO): Promise<WaafiResponse> {
    const serviceParams: IServiceParams = this.setServiceParams({
      ...data,
      accountType: data.accountType ?? 'MERCHANT',
    });

    const postData: IPostData = {
      serviceName: 'API_CREDITACCOUNT',
      serviceParams,
      schemaVersion: '1.0',
      requestId: '7102205824',
      timestamp: '2022-02-04 Africa',
      channelName: 'WEB',
    };

    const response = (await got
      .post(this.url, {
        json: postData,
      })
      .json()) as WaafiResponse;

    return response;
  }

  private setServiceParams(data: ServiceParamsDTO): IServiceParams {
    const transactionInfo = this.setTransactionInfo({
      ...data,
    });

    const payerInfo = this.setPayerInfo({ ...data });
    const serviceParams: IServiceParams = {
      merchantUid: this.merchantKey,
      apiUserId: this.apiUserId,
      apiKey: this.apiKey,
      transactionInfo,
      payerInfo,
      browserInfo: 'browserInfo',
      paymentMethod: 'MWALLET_ACCOUNT',
    };

    return serviceParams;
  }

  private setPayerInfo(data: PayerInfoDTO): IPayerInfo {
    const payerInfo: IPayerInfo = {
      ...data,
    };
    return payerInfo;
  }

  private setTransactionInfo(data: TransactionInfoDTO): ITransactionInfo {
    const transactionInfo: ITransactionInfo = {
      ...data,
      referenceId: Math.floor(100000 + Math.random() * 900000),
      invoiceId: Math.floor(100000 + Math.random() * 900000),
    };

    return transactionInfo;
  }
}
