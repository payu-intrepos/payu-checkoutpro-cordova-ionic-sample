var defaultValue = function() {
    
    document.getElementById("environment").checked = true;
    document.getElementById("key").value = "3TnMpV";
    document.getElementById("merchantSalt").value = "g0nGFe03";
    document.getElementById("productInfo").value = "Info";
    document.getElementById("firstName").value = "Test";
    document.getElementById("phone").value = "9999999999";
    document.getElementById("email").value = "test@gmail.com";
    document.getElementById("amount").value = "1.0";
    document.getElementById("ios_surl").value = "https://payu.herokuapp.com/ios_success";
    document.getElementById("ios_furl").value = "https://payu.herokuapp.com/ios_failure";
    document.getElementById("android_surl").value = "https://payu.herokuapp.com/success";
    document.getElementById("android_furl").value = "https://payu.herokuapp.com/failure";
    document.getElementById("userCredential").value = "umang:arya";
    document.getElementById("offerUserToken").value = "anshul_bajpai_token";

    document.getElementById("enableSI").checked = false;
    document.getElementById("enableSplitPay").checked = false;
    document.getElementById("enableEnforcePay").checked = false;
    document.getElementById("primaryColor").value = "#4994EC";
    document.getElementById("secondaryColor").value = "#FFFFFF";
    document.getElementById("merchantName").value = "PayU Merchant";
    document.getElementById("showExitConfirmationOnCheckoutScreen").checked = true;
    document.getElementById("showExitConfirmationOnPaymentScreen").checked = true;
    document.getElementById("merchantResponseTimeout").value = "30000";
    document.getElementById("autoSelectOtp").checked = false;
    document.getElementById("enableEnforcePay").checked = false;
    document.getElementById("showCbToolbar").checked = true;
    document.getElementById("autoApprove").checked = false;
    document.getElementById("merchantSMSPermission").checked = false;
    document.getElementById("enableSplitPay").checked = false;
    console.log('PayU Set UI Value Done');
}
