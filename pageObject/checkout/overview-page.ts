import { Page, Locator } from '@playwright/test'

class OverviewPage {
    readonly page: Page
    readonly subtotalTxt: Locator
    readonly taxTxt: Locator
    readonly totalTxt: Locator
    readonly finishBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.subtotalTxt = page.locator('.summary_subtotal_label')
        this.taxTxt = page.locator('.summary_tax_label')
        this.totalTxt = page.locator('.summary_total_label')
        this.finishBtn = page.locator('#finish')
    }
}

export default OverviewPage
