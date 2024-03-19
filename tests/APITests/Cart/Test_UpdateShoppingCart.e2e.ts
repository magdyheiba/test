import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderItem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import updateShoppingCartRequestBody from '../../../fixtures/APIs/APIsRequestBody/Cart/UpdateShoppingCart/UpdateShoppingCartRequestBody'
import addOrderItemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import UpdateShoppingCartResponse from '../../../fixtures/APIs/APIResponseBody/Cart/UpdateShoppingCart'
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

test('Test#1 Update Shopping Cart test', async ({ request, baseURL }) => {
  const editOrderItemReqBody = updateShoppingCartRequestBody(cartId)
  const updateRes = await sendPostRequest(
    request,
    `${baseURL}/api/cart/update`,
    editOrderItemReqBody,
    sessionId
  )
  expect(updateRes.ok()).toBeTruthy()
  expect(updateRes.status()).toBe(200)
  const updateResBody = await updateRes.json()
  console.log(
    `The Response of Update Shopping Cart is : ${JSON.stringify(updateResBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, updateResBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    UpdateShoppingCartResponse
  )

  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusCartResponseMapper,
    updateResBody,
    'mobiusCartResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderTypeId).toStrictEqual(
    UpdateShoppingCartResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(
    UpdateShoppingCartResponse.subtotal
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    UpdateShoppingCartResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    UpdateShoppingCartResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    UpdateShoppingCartResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    UpdateShoppingCartResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(
    UpdateShoppingCartResponse.amountDue
  )
  expect(mappedResponse.taxAll).toStrictEqual(UpdateShoppingCartResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    UpdateShoppingCartResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    UpdateShoppingCartResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    UpdateShoppingCartResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    UpdateShoppingCartResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    UpdateShoppingCartResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    UpdateShoppingCartResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    UpdateShoppingCartResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    UpdateShoppingCartResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    UpdateShoppingCartResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    UpdateShoppingCartResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    UpdateShoppingCartResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    UpdateShoppingCartResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    UpdateShoppingCartResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    UpdateShoppingCartResponse.tipSettings
  )
})
