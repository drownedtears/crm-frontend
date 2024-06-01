import {showError} from "./ErrorAlert.ts";

export async function send<T>(path: string, method: string, data?: any, pathParams?: string[]): Promise<T> {
    let url = `http://localhost:8888/${path}`;
    pathParams?.forEach((param) =>  url += `/${param}`)
    console.log(data)
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.text()
        return responseData ? JSON.parse(responseData) : {}
    } catch (error) {
        throw error
    }
}