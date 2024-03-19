import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import applyCouponByDiscountCode from '../../../fixtures/APIs/APIsRequestBody/Cart/AddCoupon/ApplyCouponByDiscountCodeRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import applyCouponByDiscountCodeResponse from '../../../fixtures/APIs/APIResponseBody/Cart/ApplyCouponByDiscountCode'
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

test('Test#1 apply Coupon By Discount Code test', async ({
  request,
  baseURL
}) => {
  const applyCouponByDiscountCodeReqBody = applyCouponByDiscountCode(cartId)
  const applyCouponByDiscountCodeRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/applyCouponByDiscountCode`,
    applyCouponByDiscountCodeReqBody,
    sessionId
  )
  expect(applyCouponByDiscountCodeRes.ok()).toBeTruthy()
  expect(applyCouponByDiscountCodeRes.status()).toBe(200)
  const applyCouponByDiscountCodeBody =
    await applyCouponByDiscountCodeRes.json()
  console.log(
    `The Response of apply Coupon By Discount Code is : ${JSON.stringify(
      applyCouponByDiscountCodeBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountCodeBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    applyCouponByDiscountCodeResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    applyCouponByDiscountCodeBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    applyCouponByDiscountCodeResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(
    applyCouponByDiscountCodeResponse.subtotal
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    applyCouponByDiscountCodeResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    applyCouponByDiscountCodeResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    applyCouponByDiscountCodeResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    applyCouponByDiscountCodeResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    applyCouponByDiscountCodeResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(
    applyCouponByDiscountCodeResponse.taxAll
  )
  expect(mappedResponse.discountAll).toStrictEqual(
    applyCouponByDiscountCodeResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    applyCouponByDiscountCodeResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    applyCouponByDiscountCodeResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    applyCouponByDiscountCodeResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    applyCouponByDiscountCodeResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    applyCouponByDiscountCodeResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    applyCouponByDiscountCodeResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    applyCouponByDiscountCodeResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    applyCouponByDiscountCodeResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    applyCouponByDiscountCodeResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    applyCouponByDiscountCodeResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    applyCouponByDiscountCodeResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    applyCouponByDiscountCodeResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    applyCouponByDiscountCodeResponse.tipSettings
  )
})
