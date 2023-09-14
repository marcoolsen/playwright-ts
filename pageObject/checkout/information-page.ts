import { Page, Locator } from '@playwright/test'

class InformationPage {
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly continueBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.locator('#first-name')
        this.lastNameInput = page.locator('#last-name,[name="lastName"]')
        this.postalCodeInput = page.locator('#postal-code')
        this.continueBtn = page.locator('#continue')
    }

    async typeSubmitCheckoutInfo(userData: {
        name: string
        lastName: string
        postalCode: number
    }) {
        await this.firstNameInput.type(userData.name)
        await this.lastNameInput.type(userData.lastName)
        await this.postalCodeInput.type(userData.postalCode.toString())
        await this.continueBtn.click()
    }
}

export default InformationPage
