import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import loginExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/Login'
import rtDetailsResponse from '../../../fixtures/APIs/APIResponseBody/Restaurant/RestaurantDetails'
import loginReqBody from '../../../fixtures/APIs/APIsRequestBody/Auth/LoginRequestBody'
import RTDetails from '../../../fixtures/APIs/APIsRequestBody/Restaurant/RestaurantDetails'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping,
  sendAuthanticatedGetRequest,
  sendAuthanticatedDeleteRequest
} from '../../../pages/APIHelpers'
import {
  Root,
  mobiusRTDetailsResponseMapper
} from '../../../models/restaurant/restaurantDetailsResponse'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)
let accessToken: any
let businessEntityId: any

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

  // if RT is favorite , remove the favorite
  businessEntityId = RTDetails.businessEntityId
  const DeleteFavRes = await sendAuthanticatedDeleteRequest(
    request,
    `${baseURL}/api/customer/deleteFavorite?businessEntityId=${businessEntityId}`,
    sessionId,
    accessToken
  )
  expect(DeleteFavRes.ok()).toBeTruthy()
  expect(DeleteFavRes.status()).toBe(200)
})

test('Test#1 RT details endpoint test', async ({ request, baseURL }) => {
  const businessEntityGuid = RTDetails.businessEntityGuid
  const RTDetailsRes = await sendAuthanticatedGetRequest(
    request,
    `${baseURL}/api/restaurant/details?businessEntityId=${businessEntityId}&businessEntityGuid=${businessEntityGuid}`,
    sessionId,
    accessToken
  )
  expect(RTDetailsRes.ok()).toBeTruthy()
  expect(RTDetailsRes.status()).toBe(200)
  const rtDetailsResBody = await RTDetailsRes.json()
  console.log(
    `The Response of RT details is : ${JSON.stringify(rtDetailsResBody)}`
  )
  const dynamicKeys = ['nextDeliveryOpenings', 'nextStoreOpenings']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    rtDetailsResBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    rtDetailsResponse
  )
  // Validate the whole response body.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusRTDetailsResponseMapper,
    rtDetailsResBody,
    'mobiusRTDetailsResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.businessEntityId).toStrictEqual(
    rtDetailsResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    rtDetailsResponse.businessEntityGuid
  )
  expect(mappedResponse.businessName).toStrictEqual(
    rtDetailsResponse.businessName
  )
  expect(mappedResponse.orderingEnabled).toStrictEqual(
    rtDetailsResponse.orderingEnabled
  )
  expect(mappedResponse.new).toStrictEqual(rtDetailsResponse.new)
  expect(mappedResponse.isFavorite).toStrictEqual(rtDetailsResponse.isFavorite)
  expect(mappedResponse.countryId).toStrictEqual(rtDetailsResponse.countryId)
  expect(mappedResponse.street).toStrictEqual(rtDetailsResponse.street)
  expect(mappedResponse.aptUnitSuite).toStrictEqual(
    rtDetailsResponse.aptUnitSuite
  )
  expect(mappedResponse.city).toStrictEqual(rtDetailsResponse.city)
  expect(mappedResponse.state).toStrictEqual(rtDetailsResponse.state)
  expect(mappedResponse.zipcode).toStrictEqual(rtDetailsResponse.zipcode)
  expect(mappedResponse.timezoneOffset).toStrictEqual(
    rtDetailsResponse.timezoneOffset
  )
  expect(mappedResponse.latitude).toStrictEqual(rtDetailsResponse.latitude)
  expect(mappedResponse.longitude).toStrictEqual(rtDetailsResponse.longitude)
  expect(mappedResponse.phone).toStrictEqual(rtDetailsResponse.phone)
  expect(mappedResponse.deliveryEnabled).toStrictEqual(
    rtDetailsResponse.deliveryEnabled
  )
  expect(mappedResponse.pickupEnabled).toStrictEqual(
    rtDetailsResponse.pickupEnabled
  )
  expect(mappedResponse.menuItemInstructionsEnabled).toStrictEqual(
    rtDetailsResponse.menuItemInstructionsEnabled
  )
  expect(mappedResponse.orderInstructionsEnabled).toStrictEqual(
    rtDetailsResponse.orderInstructionsEnabled
  )
  expect(mappedResponse.paymentOptions).toStrictEqual(
    rtDetailsResponse.paymentOptions
  )
  expect(mappedResponse.rating).toStrictEqual(rtDetailsResponse.rating)
  expect(mappedResponse.pickupSettings).toStrictEqual(
    rtDetailsResponse.pickupSettings
  )
  expect(mappedResponse.deliverySettings).toStrictEqual(
    rtDetailsResponse.deliverySettings
  )
  expect(mappedResponse.defaultStoreHours).toStrictEqual(
    rtDetailsResponse.defaultStoreHours
  )
  expect(mappedResponse.specialStoreHours).toStrictEqual(
    rtDetailsResponse.specialStoreHours
  )
  expect(mappedResponse.menuCategories).toStrictEqual(
    rtDetailsResponse.menuCategories
  )
  expect(mappedResponse.modifierBuilderTemplates).toStrictEqual(
    rtDetailsResponse.modifierBuilderTemplates
  )
  expect(mappedResponse.coupons).toStrictEqual(rtDetailsResponse.coupons)
})
