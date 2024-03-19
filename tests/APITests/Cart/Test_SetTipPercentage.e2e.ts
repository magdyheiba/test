import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import setTipPercentage from '../../../fixtures/APIs/APIsRequestBody/Cart/CartTypes/SetTipPercentageRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import setTipPercentageResponse from '../../../fixtures/APIs/APIResponseBody/Cart/SetTipPercentage'
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

test('Test#1 set Tip Percentage test', async ({ request, baseURL }) => {
  const setTipPercentageReqBody = setTipPercentage(cartId)
  const setTipPercentageRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/setTipPercentage`,
    setTipPercentageReqBody,
    sessionId
  )
  expect(setTipPercentageRes.ok()).toBeTruthy()
  expect(setTipPercentageRes.status()).toBe(200)
  const setTipPercentageBody = await setTipPercentageRes.json()
  console.log(
    `The Response of set Tip Percentage is : ${JSON.stringify(
      setTipPercentageBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    setTipPercentageBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    setTipPercentageResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    setTipPercentageBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    setTipPercentageResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(
    setTipPercentageResponse.subtotal
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    setTipPercentageResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    setTipPercentageResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    setTipPercentageResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    setTipPercentageResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    setTipPercentageResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(setTipPercentageResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    setTipPercentageResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    setTipPercentageResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    setTipPercentageResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    setTipPercentageResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    setTipPercentageResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    setTipPercentageResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    setTipPercentageResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    setTipPercentageResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    setTipPercentageResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    setTipPercentageResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    setTipPercentageResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    setTipPercentageResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    setTipPercentageResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    setTipPercentageResponse.tipSettings
  )
})
