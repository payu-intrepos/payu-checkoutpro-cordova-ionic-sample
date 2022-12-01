// Static Data
class PayUPaymentTypeKeys {
    static  card =  "CARD";
    static  nb =  "NB";
    static  upi =  "UPI";
    static  upiIntent =  "UPI_INTENT";
    static  wallet =  "WALLET";
    static  emi =  "EMI";
    static  neftRtgs =  "NEFTRTGS";
    static  l1Option =  "L1_OPTION";
    static  sodexo =  "SODEXO";
}

var siParamObject = {
isFreeTrial: true,
billingAmount: '1',                //Required
billingInterval: 1,                 //Required
paymentStartDate: '2022-11-10',     //Required
paymentEndDate: '2022-12-30',       //Required
billingCycle: 'once', //Required //Can be any of 'daily','weekly','yearly','adhoc','once','monthly'
remarks: 'Test SI transcaction',
billingCurrency: 'INR',
billingLimit:'ON',      //ON, BEFORE, AFTER
billingRule:'MAX',      //MAX, EXACT
}

var splitPaymentDetails = [
                           {"type": "absolute",
                               "splitInfo":{
                                   "imAJ7I":{ "aggregatorSubTxnId":"Testchild123","aggregatorSubAmt":"5"},
                                   "qOoYIv":{ "aggregatorSubTxnId":"Testchild098","aggregatorSubAmt":"5"},
                               }
                           }
                           ];

var cartDetails = [
    {"GST": "5%"},
    {"Delivery Date": "25 Dec"},
    {"Status": "In Progress"}
];

var enforcePaymentList = [
                          {"payment_type": "CARD", "enforce_ibiboCode": "UTIBENCC"},
                          ];
var customNotes = [
    {
        "custom_note": "Its Common custom note for testing purpose",
        "custom_note_category": [PayUPaymentTypeKeys.emi,PayUPaymentTypeKeys.card]
    },
    {
        "custom_note": "Payment options custom note",
        "custom_note_category": null
    }
];

var paymentModesOrder = [
  {"Wallets": "PHONEPE"},
  {"UPI": "TEZ"},
  {"Wallets": ""},
  {"EMI": ""},
  {"NetBanking": ""},
];


function callPayUCheckoutPro(){

    var additionalParam =  {
    udf1: "udf1",
    udf2: "udf2",
    udf3: "udf3",
    udf4: "udf4",
    udf5: "udf5",
    merchantAccessKey:"", //This is for lookup API
    sourceId:"src_5521693f-56b6-4102-8af7-cf716610f04a", //Sodexo source ID
    }
    
    var payUPaymentParams = {
    key: document.getElementById("key").value,
    transactionId: new Date().getTime().toString(),
    amount: document.getElementById("amount").value,
    productInfo: document.getElementById("productInfo").value,
    firstName: document.getElementById("firstName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    ios_surl: document.getElementById("ios_surl").value,
    ios_furl: document.getElementById("ios_furl").value,
    android_surl: document.getElementById("android_surl").value,
    android_furl:document.getElementById("android_furl").value,
    environment:document.getElementById("environment").checked == true ? "0" : "1",
    userCredential: document.getElementById("userCredential").value,
    additionalParam: additionalParam,
    enableNativeOTP:true, //This flag will work in iOS only.
    }
    payUPaymentParams.userToken = document.getElementById("offerUserToken").value;
    //Config Params
    if (document.getElementById("enableSI").checked) {
        console.log('PayU SDK Inside enableSI')
        payUPaymentParams.payUSIParams = siParamObject
    }
    if (document.getElementById("enableSplitPay").checked) {
        console.log('PayU SDK Inside Split Pay')
        payUPaymentParams.splitPaymentDetails = splitPaymentDetails
    }
    var payUCheckoutProConfig = {
    primaryColor: document.getElementById("primaryColor").value,
    secondaryColor: document.getElementById("secondaryColor").value,
    merchantName: document.getElementById("merchantName").value,
    merchantLogo: "logo",
    showExitConfirmationOnCheckoutScreen: document.getElementById("showExitConfirmationOnCheckoutScreen").checked,
    showExitConfirmationOnPaymentScreen: document.getElementById("showExitConfirmationOnPaymentScreen").checked,
    cartDetails: cartDetails,
    paymentModesOrder: paymentModesOrder,
    surePayCount: "",
    merchantResponseTimeout: parseInt(document.getElementById("merchantResponseTimeout").value),
    autoSelectOtp: document.getElementById("autoSelectOtp").checked,
        // Android specific property
    waitingTime:30000,
    autoApprove: document.getElementById("autoApprove").checked,
    merchantSMSPermission: document.getElementById("merchantSMSPermission").checked,
    showCbToolbar: document.getElementById("showCbToolbar").checked,
    enableSplitPay: document.getElementById("enableSplitPay").checked,
    customNotes: customNotes,
    }
    if (document.getElementById("enableEnforcePay").checked) {
        payUCheckoutProConfig["enforcePaymentList"] = enforcePaymentList;
    }
    let payuParams = {
    payUPaymentParams: payUPaymentParams,
    payUCheckoutProConfig: payUCheckoutProConfig
    }
    cordova.plugins.PayUCheckoutProCordova.openCheckoutScreen(responseCallBack,payuParams);
}

var responseCallBack =  function(response) {
    // payment successful
    if("generateHash" in response){
        generateHash(response)
    }
    else if('onPaymentSuccess' in response){
        onPaymentSuccess(response);
    }
    else if('onPaymentFailure' in response){
        onPaymentFailure(response);
    }else if('onPaymentCancel' in response){
        onPaymentCancel(response);
    }else if('onError' in response){
        onError(response);
    }
}

function generateHash(response){
    var merchantSalt = document.getElementById("merchantSalt").value;
    var resultValue = response.generateHash
    var hashString = resultValue.hashString;
    var hashName = resultValue.hashName;
    var hash = {};
    hash[hashName] = sha512(hashString + merchantSalt);
    //Convert the hash data using sh512 and pass it to SDK.
    cordova.plugins.PayUCheckoutProCordova.hashGenerated(hash);
}

function onPaymentSuccess(response){
    alert('onPaymentSuccess: ' + JSON.stringify(response));
}

function onPaymentFailure(response){
    alert('onPaymentFailure: ' + JSON.stringify(response));
}

function onPaymentCancel(response){
    alert('onPaymentCancel: ' + JSON.stringify(response));
}
function onError(response){
    alert('onError: ' + JSON.stringify(response));
}

var app = {
initialize: function() {
    this.bindEvents();
},
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
onDeviceReady: function() {
    app.bindDefaultValues();
    document.getElementById("payment").onclick = app.checkOutPro;
},
bindDefaultValues:defaultValue,
checkOutPro:callPayUCheckoutPro,
};

app.initialize();
