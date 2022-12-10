export class ServiceParamsDTO {
  accountNo!: string;
  amount!: number;
  currency!: string;
  description!: string;
  accountHolder?: string;
  accountType?: string;
}
