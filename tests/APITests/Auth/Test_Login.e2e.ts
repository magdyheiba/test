import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import loginReqBody from '../../../fixtures/APIs/APIsRequestBody/Auth/LoginRequestBody'
import loginExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/Login'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping
} from '../../../pages/APIHelpers'
import { Root, mobiusLoginResponseMapper } from '../../../models/auth/auth'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)

test('Test#1 Login endpoint test', async ({ request, baseURL }) => {
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

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['accessToken', 'refreshToken']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, LoginResBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    loginExpectedResponse
  )
  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusLoginResponseMapper,
    LoginResBody,
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
