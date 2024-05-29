module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber:'#number',
    cardCode: '#code.card-input',
    messageInput: '#comment',
    Icecreamnumber: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',
    driverArriveTime: '//*[@id="root"]/div/div[5]/div[2]/div[1]/div/div[1]',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveCarType: 'div=Supportive',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    closePaymentButton : '.payment-picker .close-button',
    BlanketHandkerchiefsButton : '.slider',
    BlanketHandkerchiefsSwitch: '.switch-input',
    iceCreamCounter: '.counter-plus',
    iceCreamCounterDisabled: '.counter-plus.disabled',
    submitCarOrder: '.smart-button',
    //Misc
    addCardOffClick: '.plc',
    cardPaymentMethodIcon : 'img[alt="card"]',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethodCard: async function () {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        
        //click add card button
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        //add card number
        const cardNumber = await $(this.cardNumber);
        await cardNumber.waitForDisplayed();
        await cardNumber.setValue(1234567812345678);

        //add card code
        const cardCode = await $(this.cardCode);
        await cardCode.waitForDisplayed();
        await cardCode.setValue(88);

        //out of focus click to activate link button
        const addCardOffClick = await $(this.addCardOffClick);
        await addCardOffClick.waitForDisplayed();
        await addCardOffClick.click();

        //link card function
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();

        //close button
        const closePaymentButton = await $(this.closePaymentButton);
        await closePaymentButton.waitForDisplayed();
        await closePaymentButton.click();


    },
    addIceCreamOrder: async function() {
        const iceCreamCounter = await $(this.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        await iceCreamCounter.click();
        await iceCreamCounter.click();
        const iceCreamCounterDisabled = await $(this.iceCreamCounterDisabled);
        await iceCreamCounterDisabled.waitForDisplayed();
        
       }
};