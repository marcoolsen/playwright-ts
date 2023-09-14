import { expect, test } from '@playwright/test'
import user from '../test-data/user-api-data'
import { randomIntFromInterval } from '../utils/helper'
import { shareGetMethod, sharePostMethod } from './../utils/api-functions'

let userInfo = user
const randomNumber: number = randomIntFromInterval(100, 10000)
const statusSold: string = 'sold'
const statusAvailable: string = 'available'
const nameObj: Array<string> = []

//generating dynamic data for each run
userInfo.id = randomNumber
userInfo.username = userInfo.username.replace('$', randomNumber.toString())
userInfo.email = userInfo.email.replace('$', randomNumber.toString())

test.describe('Regression Testing - Cart Tests - Fronted Scenarios', () => {
    test('create a new user', async ({ request }) => {
        const url = `https://petstore.swagger.io/v2/user`
        const responseBody = await sharePostMethod(url, request, userInfo)
        expect(responseBody.ok()).toBeTruthy()
        const body = await responseBody.json()
        expect(body.code).not.toBeEmpty
        expect(body.message).not.toBeEmpty
        expect(body.type).not.toBeEmpty
    })

    test('get pets by status "sold" and print each id and name', async ({
        request,
    }) => {
        const url = `https://petstore.swagger.io/v2/pet/findByStatus` 
        const responseBody = await shareGetMethod(url, request, statusSold)
        expect(responseBody.ok()).toBeTruthy()
        const body = await responseBody.json()
        expect(body).not.toBeEmpty
        const obj = Object.assign(body)
        obj.forEach((item: any) => {
            console.log(`id: ${item.id}, dogName: ${item.name}`)
        })
    })

    //Nested method for a specific execution of a before hook
    test.describe('Grouping and counting pets', () => {
        test.beforeEach(async ({ request }) => {
            const url = `https://petstore.swagger.io/v2/pet/findByStatus`
            const responseBody = await shareGetMethod(
                url,
                request,
                statusAvailable
            )
            expect(responseBody.ok()).toBeTruthy()
            const body = await responseBody.json()
            expect(body).not.toBeEmpty
            const obj = Object.assign(body)
            obj.forEach((item: any) => {
                nameObj.push(item.name)
            })
        })

        test('taking the previous input, I group the pets by name and count how many times it repeats', () => {
            const resultado = countRepeatingNames(Object.values(nameObj))
            console.log(resultado)
        })

        function countRepeatingNames(nombres: string[]): {
            [nombre: string]: number
        } {
            const contador: { [nombre: string]: number } = {}
            for (const nombre of nombres) {
                if (contador[nombre]) {
                    contador[nombre]++
                } else {
                    contador[nombre] = 1
                }
            }
            return contador
        }
    })
})
