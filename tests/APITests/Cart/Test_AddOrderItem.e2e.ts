import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import addOrderITem from '../../../fixtures/APIs/APIsRequestBody/Cart/AddOrderItem/AddOrderItemRequestBody'
import addOrderITemResponse from '../../../fixtures/APIs/APIResponseBody/Cart/AddOrderItem'
import {
  performMapping,
  sendPostRequest,
  removeKeysFromJSON
} from '../../../pages/APIHelpers'
import {
  Root,
  mobiusCartResponseMapper
} from '../../../models/cart/cartResponse'

const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)

test('Test#1 Add Order Item simple test', async ({ request, baseURL }) => {
  const cartResponse = await sendPostRequest(
    request,
    `${baseURL}/api/cart/addOrderItem`,
    addOrderITem,
    sessionId
  )
  expect(cartResponse.ok()).toBeTruthy()
  expect(cartResponse.status()).toBe(200)
  const responseBody = await cartResponse.json()
  console.log(
    `The Response of add order item is : ${JSON.stringify(responseBody)}`
  )

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['cartId']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, responseBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    addOrderITemResponse
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
    addOrderITemResponse.orderTypeId
  )
  expect(mappedResponse.subtotal).toStrictEqual(addOrderITemResponse.subtotal)
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    addOrderITemResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    addOrderITemResponse.surchargeAmountUsed
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    addOrderITemResponse.creditCardProcessingFee
  )
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    addOrderITemResponse.tipAmountUsed
  )
  expect(mappedResponse.amountDue).toStrictEqual(addOrderITemResponse.amountDue)
  expect(mappedResponse.taxAll).toStrictEqual(addOrderITemResponse.taxAll)
  expect(mappedResponse.discountAll).toStrictEqual(
    addOrderITemResponse.discountAll
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    addOrderITemResponse.deliveryFee
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    addOrderITemResponse.convenienceFee
  )
  expect(mappedResponse.paymentTypeId).toStrictEqual(
    addOrderITemResponse.paymentTypeId
  )
  expect(mappedResponse.scheduledFor).toStrictEqual(
    addOrderITemResponse.scheduledFor
  )
  expect(mappedResponse.deliveryAddress).toStrictEqual(
    addOrderITemResponse.deliveryAddress
  )
  expect(mappedResponse.cartId).not.toBeFalsy()
  expect(mappedResponse.businessEntityId).toStrictEqual(
    addOrderITemResponse.businessEntityId
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    addOrderITemResponse.businessEntityGuid
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    addOrderITemResponse.orderItems
  )
  expect(mappedResponse.appliedCoupon).toStrictEqual(
    addOrderITemResponse.appliedCoupon
  )
  expect(mappedResponse.canCheckOut).toStrictEqual(
    addOrderITemResponse.canCheckOut
  )
  expect(mappedResponse.canNotCheckOutDetails).toStrictEqual(
    addOrderITemResponse.canNotCheckOutDetails
  )
  expect(mappedResponse.tipEnabled).toStrictEqual(
    addOrderITemResponse.tipEnabled
  )
  expect(mappedResponse.tipSettings).toStrictEqual(
    addOrderITemResponse.tipSettings
  )
})
