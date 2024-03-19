import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import setPaymentType from '../../../fixtures/APIs/APIsRequestBody/Cart/CartTypes/SetPaymentTypeRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import setPaymentTypeResponse from '../../../fixtures/APIs/APIResponseBody/Cart/SetPaymentType'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping
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

test('Test#1 set Payment Type test', async ({ request, baseURL }) => {
  const setPaymentTypeReqBody = setPaymentType(cartId)
  const setPaymentTypeRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/setPaymentType`,
    setPaymentTypeReqBody,
    sessionId
  )
  expect(setPaymentTypeRes.ok()).toBeTruthy()
  expect(setPaymentTypeRes.status()).toBe(200)
  const setPaymentTypeBody = await setPaymentTypeRes.json()
  console.log(
    `The Response of set Payment Type is : ${JSON.stringify(
      setPaymentTypeBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    setPaymentTypeBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    setPaymentTypeResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    setPaymentTypeBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    setPaymentTypeResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(setPaymentTypeResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    setPaymentTypeResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    setPaymentTypeResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    setPaymentTypeResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    setPaymentTypeResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    setPaymentTypeResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(setPaymentTypeResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    setPaymentTypeResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    setPaymentTypeResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    setPaymentTypeResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    setPaymentTypeResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    setPaymentTypeResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    setPaymentTypeResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    setPaymentTypeResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    setPaymentTypeResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    setPaymentTypeResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    setPaymentTypeResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    setPaymentTypeResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    setPaymentTypeResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    setPaymentTypeResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    setPaymentTypeResponse.tipSettings
  )
})
