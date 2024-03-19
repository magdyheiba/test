import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import changeOrderItemQuantity from '../../../fixtures/APIs/APIsRequestBody/Cart/CartTypes/ChangeOrderItemQuantityRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import changeOrderItemQuantityResponse from '../../../fixtures/APIs/APIResponseBody/Cart/ChangeOrderItemQuantity'
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

test('Test#1 change Order Item Quantity test', async ({ request, baseURL }) => {
  const changeOrderItemQuantityReqBody = changeOrderItemQuantity(cartId)
  const changeOrderItemQuantityRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/changeOrderItemQuantity`,
    changeOrderItemQuantityReqBody,
    sessionId
  )
  expect(changeOrderItemQuantityRes.ok()).toBeTruthy()
  expect(changeOrderItemQuantityRes.status()).toBe(200)
  const changeOrderItemQuantityBody = await changeOrderItemQuantityRes.json()
  console.log(
    `The Response of change Order Item Quantity is : ${JSON.stringify(
      changeOrderItemQuantityBody
    )}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    changeOrderItemQuantityBody
  )
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    changeOrderItemQuantityResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    changeOrderItemQuantityBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    changeOrderItemQuantityResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(
    changeOrderItemQuantityResponse.subtotal
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    changeOrderItemQuantityResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    changeOrderItemQuantityResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    changeOrderItemQuantityResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    changeOrderItemQuantityResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    changeOrderItemQuantityResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(
    changeOrderItemQuantityResponse.taxAll
  )
  expect(mappedResponse.discountAll).toStrictEqual(
    changeOrderItemQuantityResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    changeOrderItemQuantityResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    changeOrderItemQuantityResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    changeOrderItemQuantityResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    changeOrderItemQuantityResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    changeOrderItemQuantityResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    changeOrderItemQuantityResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    changeOrderItemQuantityResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    changeOrderItemQuantityResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    changeOrderItemQuantityResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    changeOrderItemQuantityResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    changeOrderItemQuantityResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    changeOrderItemQuantityResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    changeOrderItemQuantityResponse.tipSettings
  )
})
