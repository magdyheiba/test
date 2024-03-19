import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import SetTipAmount from '../../../fixtures/APIs/APIsRequestBody/Cart/CartTypes/SetTipAmountRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import SetTipAmountResponse from '../../../fixtures/APIs/APIResponseBody/Cart/SetTipAmount'
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

test('Test#1 set Tip Amount test', async ({ request, baseURL }) => {
  const setTipAmountReqBody = SetTipAmount(cartId)
  const setTipAmountRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/setTipAmount`,
    setTipAmountReqBody,
    sessionId
  )
  expect(setTipAmountRes.ok()).toBeTruthy()
  expect(setTipAmountRes.status()).toBe(200)
  const setTipAmountBody = await setTipAmountRes.json()
  console.log(
    `The Response of set Tip Amount is : ${JSON.stringify(setTipAmountBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    setTipAmountBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    SetTipAmountResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    setTipAmountBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    SetTipAmountResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(SetTipAmountResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    SetTipAmountResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    SetTipAmountResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    SetTipAmountResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    SetTipAmountResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(SetTipAmountResponse.amountDue)
  expect(mappedResponse.taxAll).toStrictEqual(SetTipAmountResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    SetTipAmountResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    SetTipAmountResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    SetTipAmountResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    SetTipAmountResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    SetTipAmountResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    SetTipAmountResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    SetTipAmountResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    SetTipAmountResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    SetTipAmountResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    SetTipAmountResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    SetTipAmountResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    SetTipAmountResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    SetTipAmountResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    SetTipAmountResponse.tipSettings
  )
})
