import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import applyCouponByDiscountId from '../../../fixtures/APIs/APIsRequestBody/Cart/AddCoupon/ApplyCouponByDiscountIdRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import applyCouponByDiscountIdResponse from '../../../fixtures/APIs/APIResponseBody/Cart/ApplyCouponByDiscountId'
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

test('Test#1 apply Coupon By Discount Id test', async ({
  request,
  baseURL
}) => {
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
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountIdBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountIdResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    applyCouponByDiscountIdBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    applyCouponByDiscountIdResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(
    applyCouponByDiscountIdResponse.subtotal
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    applyCouponByDiscountIdResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    applyCouponByDiscountIdResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    applyCouponByDiscountIdResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    applyCouponByDiscountIdResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    applyCouponByDiscountIdResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(
    applyCouponByDiscountIdResponse.taxAll
  )
  expect(mappedResponse.discountAll).toStrictEqual(
    applyCouponByDiscountIdResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    applyCouponByDiscountIdResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    applyCouponByDiscountIdResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    applyCouponByDiscountIdResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    applyCouponByDiscountIdResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    applyCouponByDiscountIdResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    applyCouponByDiscountIdResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    applyCouponByDiscountIdResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    applyCouponByDiscountIdResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    applyCouponByDiscountIdResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    applyCouponByDiscountIdResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    applyCouponByDiscountIdResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    applyCouponByDiscountIdResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    applyCouponByDiscountIdResponse.tipSettings
  )
})
