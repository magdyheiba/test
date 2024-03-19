import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import loginExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/Login'
import orderHistoryResponse from '../../../fixtures/APIs/APIResponseBody/Orders/OrderHistory'
import loginReqBody from '../../../fixtures/APIs/APIsRequestBody/Auth/LoginRequestBody'
import {
  sendPostRequest,
  removeKeysFromJSON,
  sendAuthanticatedGetRequest
} from '../../../pages/APIHelpers'
const sessionId = nanoid(21)
let accessToken: any

test.beforeAll(async ({ request, baseURL }) => {
  const LoginRes = await sendPostRequest(
    request,
    `${baseURL}/api/auth/logIn`,
    loginReqBody,
    sessionId
  )
  expect(LoginRes.ok()).toBeTruthy()
  expect(LoginRes.status()).toBe(200)
  const LoginResBody = await LoginRes.json()
  console.log(`The Response of Login is : ${JSON.stringify(LoginResBody)}`)
  accessToken = LoginResBody.accessToken

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['accessToken', 'refreshToken']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, LoginResBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    loginExpectedResponse
  )
  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)
})

test('Test#1 order History endpoint test', async ({ request, baseURL }) => {
  const orderHistoryRes = await sendAuthanticatedGetRequest(
    request,
    `${baseURL}/api/order/history`,
    sessionId,
    accessToken
  )
  expect(orderHistoryRes.ok()).toBeTruthy()
  expect(orderHistoryRes.status()).toBe(200)
  const orderHistoryResBody = await orderHistoryRes.json()
  console.log(
    `The Response of order details is : ${JSON.stringify(orderHistoryResBody)}`
  )
  // Validate the whole response body.
  expect(orderHistoryResBody).toEqual(orderHistoryResponse)
})
