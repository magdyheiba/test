import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import editOrderItemRequestBody from '../../../fixtures/APIs/APIsRequestBody/Cart/EditOrderItem/EditOrderItemRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import editOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/EditOrderItem'
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

test('Test#1 Edit Order Item test', async ({ request, baseURL }) => {
  const editOrderItemReqBody = editOrderItemRequestBody(cartId)
  const editRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/editOrderItem`,
    editOrderItemReqBody,
    sessionId
  )
  expect(editRes.ok()).toBeTruthy()
  expect(editRes.status()).toBe(200)
  const editResBody = await editRes.json()
  console.log(
    `The Response of edit order item is : ${JSON.stringify(editResBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, editResBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    editOrderItemResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    editResBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    editOrderItemResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(editOrderItemResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    editOrderItemResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    editOrderItemResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    editOrderItemResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    editOrderItemResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    editOrderItemResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(editOrderItemResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    editOrderItemResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    editOrderItemResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    editOrderItemResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    editOrderItemResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    editOrderItemResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    editOrderItemResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    editOrderItemResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    editOrderItemResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    editOrderItemResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    editOrderItemResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    editOrderItemResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    editOrderItemResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    editOrderItemResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    editOrderItemResponse.tipSettings
  )
})
