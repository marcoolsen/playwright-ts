import { Page, Locator } from '@playwright/test'

class CartPage {
    readonly page: Page
    readonly titlePage: Locator
    readonly allProducts: Locator
    readonly checkoutBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.titlePage = page.locator('.title')
        this.allProducts = page.locator('.cart_list > .cart_item')
        this.checkoutBtn = page.locator('#checkout')
    }

    async getPrice() {
        const prices: number[] = []
        const productItems = await this.allProducts
            .locator('.inventory_item_price')
            .all()

        for (const item of productItems) {
            const priceText = await item.innerText()
            const price = Number(priceText.replace('$', ''))
            prices.push(price)
        }

        return prices
    }
}

export default CartPage
