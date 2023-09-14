import { Page, Locator } from '@playwright/test'

class CompletePage {
    readonly page: Page
    readonly completeTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.completeTitle = page.locator('.complete-header')
    }
}

export default CompletePage
