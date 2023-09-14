import { type Page, type Locator } from '@playwright/test'

class InventoryPage {
    readonly page: Page
    readonly burgerMenuBar: Locator
    readonly inventoryItemList: Locator
    readonly cartBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.burgerMenuBar = page.locator(`#react-burger-menu-btn`)
        this.inventoryItemList = page.locator(`.inventory_list`)
        this.cartBtn = page.locator(`#shopping_cart_container`)
    }

    async addItemsToCart(quantity: number) {
        const total = await this.itemCount()
        if (total < quantity) {
            throw new Error('Quantity is greater than articles per page')
        } else {
            let counter = 0
            const items = await this.inventoryItemList
                .locator('div.inventory_item')
                .all()
            for (const item of items) {
                await item.locator('button').click()
                counter++
                if (counter === quantity) {
                    break
                }
            }
        }
    }

    async itemCount() {
        const items = await this.inventoryItemList
            .locator('div.inventory_item')
            .all()
        return items.length
    }
}

export default InventoryPage
