import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import getCartDetailsResponse from '../../../fixtures/APIs/APIResponseBody/Cart/GetCartDetails'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping,
  sendGetRequest
} from '../../../pages/APIHelpers'
import {
  Root,
  mobiusCartResponseMapper
} from '../../../models/cart/cartResponse'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)
let cartId: any
let responseBody: any

test.beforeAll(async ({ request, baseURL }) => {
  const cartResponse = await sendPostRequest(
    request,
    `${baseURL}/api/cart/addOrderItem`,
    addOrderItem,
    sessionId
  )
  expect(cartResponse.ok()).toBeTruthy()
  expect(cartResponse.status()).toBe(200)
  responseBody = await cartResponse.json()
  console.log(
    `The Response of add order item is : ${JSON.stringify(responseBody)}`
  )
  cartId = responseBody.cartId

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, responseBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    addOrderItemResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)
})

test('Test#1 Get cart details test', async ({ request, baseURL }) => {
  const getCartDetailsRes = await sendGetRequest(
    request,
    `${baseURL}/api/cart/details?cartId=${cartId}`,
    sessionId
  )
  expect(getCartDetailsRes.ok()).toBeTruthy()
  expect(getCartDetailsRes.status()).toBe(200)
  const getCartDetailsResBody = await getCartDetailsRes.json()
  console.log(
    `The Response of Get cart details is : ${JSON.stringify(
      getCartDetailsResBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    getCartDetailsResBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    getCartDetailsResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    getCartDetailsResBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    getCartDetailsResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(getCartDetailsResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    getCartDetailsResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    getCartDetailsResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    getCartDetailsResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    getCartDetailsResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    getCartDetailsResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(getCartDetailsResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    getCartDetailsResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    getCartDetailsResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    getCartDetailsResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    getCartDetailsResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    getCartDetailsResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    getCartDetailsResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    getCartDetailsResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    getCartDetailsResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    getCartDetailsResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    getCartDetailsResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    getCartDetailsResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    getCartDetailsResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    getCartDetailsResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    getCartDetailsResponse.tipSettings
  )
})
