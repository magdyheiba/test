import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import signUpBody from '../../../fixtures/APIs/APIsRequestBody/Auth/SignUpRequestBody'
import signUpExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/SignUp'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping,
  generateRandomEmail
} from '../../../pages/APIHelpers'
import { Root, mobiusLoginResponseMapper } from '../../../models/auth/auth'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)

test('Test#1 signUp endpoint test', async ({ request, baseURL }) => {
  const email = generateRandomEmail()
  const signUpReqBody = signUpBody(email)
  const signUpRes = await sendPostRequest(
    request,
    `${baseURL}/api/auth/signUp`,
    signUpReqBody,
    sessionId
  )
  expect(signUpRes.ok()).toBeTruthy()
  expect(signUpRes.status()).toBe(200)
  const signUpResBody = await signUpRes.json()
  console.log(`The Response of signUp is : ${JSON.stringify(signUpResBody)}`)

  //** ------> VALIDATIONS of the values of the keys <------ **/
  const mappedResponse = await performMapping(
    mobiusLoginResponseMapper,
    signUpResBody,
    'mobiusLoginResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.customer.customerId).not.toBeFalsy()
  expect(mappedResponse.customer.email).toStrictEqual(email)
  expect(mappedResponse.customer.firstName).toStrictEqual(
    signUpExpectedResponse.customer.firstName
  )
  expect(mappedResponse.customer.lastName).toStrictEqual(
    signUpExpectedResponse.customer.lastName
  )
  expect(mappedResponse.customer.phone1).toStrictEqual(
    signUpExpectedResponse.customer.phone1
  )
  expect(mappedResponse.customer.phone2).toStrictEqual(
    signUpExpectedResponse.customer.phone2
  )
  expect(mappedResponse.customer.passwordExists).toStrictEqual(
    signUpExpectedResponse.customer.passwordExists
  )
  expect(mappedResponse.customerConsent).toStrictEqual(
    signUpExpectedResponse.customerConsent
  )
  expect(mappedResponse.customerAddresses).toStrictEqual(
    signUpExpectedResponse.customerAddresses
  )
  expect(mappedResponse.customerCreditCards).toStrictEqual(
    signUpExpectedResponse.customerCreditCards
  )
  expect(mappedResponse.accessToken).not.toBeFalsy()
  expect(mappedResponse.refreshToken).not.toBeFalsy()
})
