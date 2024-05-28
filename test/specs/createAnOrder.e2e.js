const page = require('../../page');
const helper = require('../../helper')

describe('Create an Order', () => {
    it('Should Open Phone Number Modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })
    
    it('Should Enter Address', async () => {
        //call the taxi to the address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
    })  
    
    it('Should Select Supportive Mode ', async () => {
        //select supportive mode 
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const supportiveCarType = await $(page.supportiveCarType);
        await supportiveCarType.waitForDisplayed();
        await supportiveCarType.click();
        await expect(supportiveCarType).toBeClickable();
    })

    it('Should Input the Phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Should Add Payment Method ', async () => {    
        //adding a payment card
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.addPaymentMethodCard();
        
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await cardPaymentMethodIcon.waitForDisplayed();
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();
    })

    it('Should Add Message to Driver ', async () => {
        //message to driver
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const messageInput = await $(page.messageInput);
        await messageInput.waitForDisplayed();
        await messageInput.setValue("Hello");
        await expect(messageInput).toHaveValue("Hello");
    })

    it('Should Order Blanket and Handkerchiefs ', async () => {
        //Ordering a Blanket and handkerchiefs
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const BlanketHandkerchiefsButton = await $(page.BlanketHandkerchiefsButton);
        await BlanketHandkerchiefsButton.waitForDisplayed();
        await BlanketHandkerchiefsButton.click();
        await expect($(page.BlanketHandkerchiefsSwitch).toBeChecked());
    })

    it('Should Order 2 Ice Creams ', async () => {
        //Order 2 ice creams
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.addIceCreamOrder();
        await expect($(page.iceCreamCounterDisabled).toBeSelected());
    })

    it('Should Order the Car ', async () => {
        //submit car order
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const submitCarOrder = await $(page.submitCarOrder);
        await submitCarOrder.waitForDisplayed();
        await submitCarOrder.click();
        await expect(submitCarOrder).toBeEnabled();
    })

})

