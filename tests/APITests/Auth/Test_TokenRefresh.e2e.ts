import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import loginExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/Login'
import tokenRefreshExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/RefreshToken'

import loginReqBody from '../../../fixtures/APIs/APIsRequestBody/Auth/LoginRequestBody'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping
} from '../../../pages/APIHelpers'
import { Root, mobiusLoginResponseMapper } from '../../../models/auth/auth'
import tokenRefresh from '../../../fixtures/APIs/APIsRequestBody/Auth/TokenRefreshRequestBody'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)
let refreshToken: any

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
  refreshToken = LoginResBody.refreshToken

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

test('Test#1 token Refresh endpoint test', async ({ request, baseURL }) => {
  const RefreshTokenReqBody = tokenRefresh(refreshToken)
  const tokenRefreshRes = await sendPostRequest(
    request,
    `${baseURL}/api/auth/tokenRefresh`,
    RefreshTokenReqBody,
    sessionId
  )
  expect(tokenRefreshRes.ok()).toBeTruthy()
  expect(tokenRefreshRes.status()).toBe(200)
  const tokenRefreshResBody = await tokenRefreshRes.json()
  console.log(
    `The Response of token Refresh is : ${JSON.stringify(tokenRefreshResBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['accessToken', 'refreshToken']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    tokenRefreshResBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    tokenRefreshExpectedResponse
  )
  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusLoginResponseMapper,
    tokenRefreshResBody,
    'mobiusLoginResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.customer).toStrictEqual(loginExpectedResponse.customer)
  expect(mappedResponse.customerConsent).toStrictEqual(
    loginExpectedResponse.customerConsent
  )
  expect(mappedResponse.customerAddresses).toStrictEqual(
    loginExpectedResponse.customerAddresses
  )
  expect(mappedResponse.customerCreditCards).toStrictEqual(
    loginExpectedResponse.customerCreditCards
  )
  expect(mappedResponse.accessToken).not.toBeFalsy()
  expect(mappedResponse.refreshToken).not.toBeFalsy()
})
