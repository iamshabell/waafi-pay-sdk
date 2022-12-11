# WaafiPay SDK Guide

This is a TypeScript version of this previous [waafipay-sdk-node](https://www.npmjs.com/package/waafipay-sdk-node) package.

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Installing

To install waafi-pay-sdk, use:

```bash
npm intall waafi-pay-sdk # or yarn add waafi-pay-sdk
```

There are two methods available in this sdk is _apiPurchase_ and _creditAccount_. In order to use this methods, you need to have api credentials from waafi pay(_API KEY_,_API USER ID_,_MERCHANT KEY_).

## Api Purchase

This method is for `Getting Money From Customers`. You will need to pass the customer's information, including _phone number_, _amount_, _currency_, _description_.

#### An example of Api Purchasing with express:

```typescript
...
import { WaafiAPI } from "waafi-pay-sdk";

const app: Express = express();
const port = 3001;

const waafipay = new WaafiAPI(
  "API_KEY",
  "API_USER_ID",
  "MERCHANT_KEY",
  true, //--> isTestMode -> true is production : false is test
  );


app.post("/purchase", async (req: Request, res: Response, next) => {
  try {
    const { accountNo, amount, currency, description } = req.body;

    const result = await waafipay.apiPurchase({
      accountNo: accountNo,
      amount: amount,
      currency: currency,
      description: description,
    });

    console.log("result: " + JSON.stringify(result));
    res.status(200).json(JSON.stringify(result));
  } catch (e) {
    console.log(e);

    res.status(400).send(e);
  }
});

...
```

And here is an example of the request body:

```javascript
{
    "accountNo": "2526XXXXXX", //-> customer's phone number
    "amount": 1,
    "currency": "USD", //-> optional, default is USD. It also takes (SLSH)
    "description": "test"
}
```

When it is success, it will return this:

```javascript
{
    "schemaVersion": "1.0",
    "timestamp": "2022-2-22 22:22:22.22",
    "requestId": "45231213",
    "sessionId": null,
    "responseCode": "2001",
    "errorCode": "0",
    "responseMsg": "RCS_SUCCESS",
    "params": {
        "issuerApprovalCode": "",
        "accountNo": "2526*********",
        "accountType": "MWALLET_ACCOUNT",
        "accountholder": "",
        "state": "APPROVED",
        "merchantCharges": "111",
        "customerCharges": "0.0",
        "referenceId": "455656",
        "transactionId": "465656",
        "accountExpDate": "",
        "issuerTransactionId": "23156231",
        "txAmount": "0"
    }
}
```

If everything gone through success, _responseCode_ will be `2001`. If there are other problems:

User Aborted(canceled):

- _responseCode_: `5206`
- _responseMsg_: `"RCS_TRAN_FAILED_AT_ISSUER_SYSTEM (STATE: rejected, ERRCODE: 4004 - User Aborted, TransactionId: 465656)"`

User Insufficient:

- _responseCode_: `5206`
- _responseMsg_: `"RCS_TRAN_FAILED_AT_ISSUER_SYSTEM (STATE: declined, ERRCODE: 8001 - Hadhaagaagu kuguma filna. Hadhaagaagu waa {SENDERBALANCE}, TransactionId: 465656)"`

## Credit Account

This method is for when you want to withdraw your money from `Waafi` to your account. Your account is either regular account or merchant account

#### An example of Crediting to Account :

```typescript
...
app.post("/credit", async (req: Request, res: Response, next) => {
  try {
    const { accountNo, accountName, amount, currency, description, accountType } = req.body;

    const response = await waafipay.creditAccount({
      accountNo: accountNo,
      accountHolder: accountName,
      amount: amount,
      currency: currency,
      description: description,
      accountType: accountType,
    });

    console.log("response: " + JSON.stringify(response));
    res.status(200).json(JSON.stringify(response));
  } catch (e) {
    console.log(e);

    res.status(400).send(e);
  }
});
...
```

And here is an example of the body:

```javascript
{
    "accountNo": "2526XXXXXX", //-> reciever's phone number
    "accountName": "GEEDI", // -> reciever's name,
    "accountType": "CUSTOMER", // -> recievers account type, it als could be (MERCHANT)
    "amount": 1,
    "currency": "USD", //-> optional, default is USD. It also takes (SLSH)
    "description": "test"
}
```

When it is success, it will return this:

```javascript
{
    "schemaVersion": "1.0",
    "timestamp": "2022-2-22 22:22:22.22",
    "requestId": "45231213",
    "sessionId": null,
    "responseCode": "2001",
    "errorCode": "0",
    "responseMsg": "RCS_SUCCESS",
    "params": {
        "issuerApprovalCode": "",
        "accountNo": "2526*********",
        "accountType": "MWALLET_ACCOUNT",
        "accountholder": "GEEDI",
        "state": "APPROVED",
        "merchantCharges": "111",
        "customerCharges": "0.0",
        "referenceId": "455656",
        "transactionId": "465656",
        "accountExpDate": "",
        "issuerTransactionId": "23156231",
        "txAmount": "0"
    }
}
```

If everything gone through success, _responseCode_ will be `2001`. If there are other problems:

Your Account(Waafi) has insufficient money:

- _responseCode_: `50333`
- _responseMsg_: `"RCS_ACC_INSUFFICIENT_BALANCE"`

## Support

This packages will be open source, feel free to contribute.
