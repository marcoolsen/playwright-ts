import { APIRequestContext } from '@playwright/test'

export async function shareGetMethod(
    url: string,
    request: APIRequestContext,
    parameters: string
) {
    return await request.get(url, {
        params: { status: parameters },
    })
}

export async function sharePostMethod(
    url: string,
    request: APIRequestContext,
    body: object
) {
    return await request.post(url, {
        data: body,
    })
}
