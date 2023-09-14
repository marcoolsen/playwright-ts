import { type Page, type Locator } from '@playwright/test'

const userName = process.env.TEST_USER!
const password = process.env.TEST_PASS!

class LoginPage {
    readonly page: Page
    readonly titlePage: Locator
    readonly userNameField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.titlePage = page.locator(`.login_logo`)
        this.userNameField = page.locator(`[data-test='username']`)
        this.passwordField = page.locator(`[data-test='password']`)
        this.loginBtn = page.locator(`[data-test='login-button']`)
    }

    async doInternalLogin() {
        await this.userNameField.fill(userName)
        await this.passwordField.fill(password)
        await this.loginBtn.click()
    }

    async doLoginWithExternalCredentials(user: string, password: string) {
        this.userNameField.fill(user)
        this.passwordField.fill(password)
        this.loginBtn.click()
    }
}
export default LoginPage
