import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import {
  performMapping,
  sendPostRequest,
  removeKeysFromJSON,
  sendDeleteRequest
} from '../../../pages/APIHelpers'
import {
  Root,
  mobiusCartResponseMapper
} from '../../../models/cart/cartResponse'
import applyCouponByDiscountId from '../../../fixtures/APIs/APIsRequestBody/Cart/AddCoupon/ApplyCouponByDiscountIdRequestBody'
import applyCouponByDiscountIdResponse from '../../../fixtures/APIs/APIResponseBody/Cart/ApplyCouponByDiscountId'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)
let cartId: any
let responseBody: any

//** Send the addOrderItem request first and then send request to applyCouponByDiscountId endpoint as prerequisites **/
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

  const applyCouponByDiscountIdReqBody = applyCouponByDiscountId(cartId)
  const applyCouponByDiscountIdRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/applyCouponByDiscountId`,
    applyCouponByDiscountIdReqBody,
    sessionId
  )
  expect(applyCouponByDiscountIdRes.ok()).toBeTruthy()
  expect(applyCouponByDiscountIdRes.status()).toBe(200)
  const applyCouponByDiscountIdBody = await applyCouponByDiscountIdRes.json()
  console.log(
    `The Response of apply Coupon By Discount Id is : ${JSON.stringify(
      applyCouponByDiscountIdBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const actualFilteredResponseDiscount = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountIdBody
  )
  const expectedFilteredResponseDiscount = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountIdResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponseDiscount).toEqual(
    expectedFilteredResponseDiscount
  )
})

test('Test#1 delete Coupon test', async ({ request, baseURL }) => {
  const cartResponse = await sendDeleteRequest(
    request,
    `${baseURL}/api/cart/deleteCoupon?cartId=${cartId}`,
    sessionId
  )
  expect(cartResponse.ok()).toBeTruthy()
  expect(cartResponse.status()).toBe(200)
  const responseBody = await cartResponse.json()
  console.log(
    `The Response of delete Coupon is : ${JSON.stringify(responseBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, responseBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    addOrderItemResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    responseBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    addOrderItemResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(addOrderItemResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    addOrderItemResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    addOrderItemResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    addOrderItemResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    addOrderItemResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(addOrderItemResponse.amountDue)
  expect(mappedResponse.taxAll).toStrictEqual(addOrderItemResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    addOrderItemResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    addOrderItemResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    addOrderItemResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    addOrderItemResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    addOrderItemResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    addOrderItemResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    addOrderItemResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    addOrderItemResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    addOrderItemResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    addOrderItemResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    addOrderItemResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    addOrderItemResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    addOrderItemResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    addOrderItemResponse.tipSettings
  )
})
