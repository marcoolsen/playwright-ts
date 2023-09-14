import { test, expect } from '@playwright/test'
import LoginPage from '../pageObject/login-page'
import InventoryPage from '../pageObject/inventory-page'
import CartPage from '../pageObject/cart-page'
import InformationPage from '../pageObject/checkout/information-page'
import OverviewPage from '../pageObject/checkout/overview-page'
import CompletePage from '../pageObject/checkout/complete-page'
import userData from '../test-data/user-data'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let cartPage: CartPage
let informationPage: InformationPage
let overviewPage: OverviewPage
let completePage: CompletePage
const quantity: number = 3
let prices: any = []

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    cartPage = new CartPage(page)
    informationPage = new InformationPage(page)
    overviewPage = new OverviewPage(page)
    completePage = new CompletePage(page)
    await loginPage.doInternalLogin()
})

test.describe('Regression Testing - Cart Tests - Fronted Scenarios', () => {
    test(`Checkout Payment Process - Select items dynamically, check prices and total payment`, async () => {
        await inventoryPage.addItemsToCart(quantity)
        const cartButtonText = await inventoryPage.cartBtn.innerText()
        expect(cartButtonText).toBe(quantity.toString())
        await inventoryPage.cartBtn.click()
        const pageTitle = await cartPage.titlePage.innerText()
        const expectedText = 'Your Cart'
        expect(pageTitle).toBe(expectedText)
        prices = await cartPage.getPrice()
        await cartPage.checkoutBtn.click()
        await informationPage.typeSubmitCheckoutInfo(userData.userData)
        let expectedSubTotal = 0
        let expectedTax = 0
        let expectedTotal = 0

        for (const itemPrice of prices) {
            expectedSubTotal += itemPrice
        }

        const subtotalText = await overviewPage.subtotalTxt.innerText()
        const taxText = await overviewPage.taxTxt.innerText()
        const totalText = await overviewPage.totalTxt.innerText()
        const subTotalMatch = subtotalText.match(/[\d.]+/)
        const taxMatch = taxText.match(/[\d.]+/)
        const totalMatch = totalText.match(/[\d.]+/)

        if (taxMatch && totalMatch && subTotalMatch) {
            const subTotal = parseFloat(subTotalMatch[0])
            const tax = parseFloat(taxMatch[0])
            const total = parseFloat(totalMatch[0])
            expect(expectedSubTotal).toBe(subTotal)
            expectedTax = expectedSubTotal * 0.08
            expect(Math.round(expectedTax * 100) / 100).toBe(tax)
            expectedTotal = expectedSubTotal + expectedTax
            expect(Math.round(expectedTotal * 100) / 100).toBe(total)

            await overviewPage.finishBtn.click()
            const pageTitle = await completePage.completeTitle.innerText()
            const expectedText = 'Thank you for your order!'
            expect(pageTitle).toBe(expectedText)
        } else {
            throw new Error('some values are null')
        }
    })
})
