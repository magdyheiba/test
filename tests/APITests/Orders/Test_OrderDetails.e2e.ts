import { test, expect } from '@playwright/test'
import { nanoid } from 'nanoid'
import loginExpectedResponse from '../../../fixtures/APIs/APIResponseBody/Auth/Login'
import orderDetailsResponse from '../../../fixtures/APIs/APIResponseBody/Orders/OrderDetails'
import loginReqBody from '../../../fixtures/APIs/APIsRequestBody/Auth/LoginRequestBody'
import orderDetails from '../../../fixtures/APIs/APIsRequestBody/Orders/OrderDetails'
import RTDetails from '../../../fixtures/APIs/APIsRequestBody/Restaurant/RestaurantDetails'
import {
  sendPostRequest,
  removeKeysFromJSON,
  performMapping,
  sendAuthanticatedGetRequest,
  sendAuthanticatedDeleteRequest
} from '../../../pages/APIHelpers'
import {
  Root,
  mobiusOrderDetailsResponseMapper
} from '../../../models/orders/orderDerails'
const migratedInterfaceType: Root | undefined = undefined
const sessionId = nanoid(21)
let accessToken: any

test.beforeAll(async ({ request, baseURL }) => {
  const LoginRes = await sendPostRequest(
    request,
    `${baseURL}/api/auth/logIn`,
    loginReqBody,
    sessionId
  )
  expect(LoginRes.ok()).toBeTruthy()
  expect(LoginRes.status()).toBe(200)
  const LoginResBody = await LoginRes.json()
  console.log(`The Response of Login is : ${JSON.stringify(LoginResBody)}`)
  accessToken = LoginResBody.accessToken

  // Remove the dynamic keys from both actual and expected response bodies.
  const dynamicKeys = ['accessToken', 'refreshToken']
  const actualFilteredResponse = removeKeysFromJSON(dynamicKeys, LoginResBody)
  const expectedFilteredResponse = removeKeysFromJSON(
    dynamicKeys,
    loginExpectedResponse
  )
  // validate the whole response body after removing the dynamic keys.
  expect(actualFilteredResponse).toEqual(expectedFilteredResponse)

  // if RT is favorite , remove the favorite
  const businessEntityId = RTDetails.businessEntityId
  const DeleteFavRes = await sendAuthanticatedDeleteRequest(
    request,
    `${baseURL}/api/customer/deleteFavorite?businessEntityId=${businessEntityId}`,
    sessionId,
    accessToken
  )
  expect(DeleteFavRes.ok()).toBeTruthy()
  expect(DeleteFavRes.status()).toBe(200)
})

test('Test#1 order details endpoint test', async ({ request, baseURL }) => {
  const orderId = orderDetails.orderId
  const orderdetailsRes = await sendAuthanticatedGetRequest(
    request,
    `${baseURL}/api/order/details?orderId=${orderId}`,
    sessionId,
    accessToken
  )
  expect(orderdetailsRes.ok()).toBeTruthy()
  expect(orderdetailsRes.status()).toBe(200)
  const orderdetailsResBody = await orderdetailsRes.json()
  console.log(
    `The Response of order details is : ${JSON.stringify(orderdetailsResBody)}`
  )
  // Validate the whole response body.
  expect(orderdetailsResBody).toEqual(orderDetailsResponse)

  //** ------> VALIDATIONS of the values of the keys as well <------ **/
  const mappedResponse = await performMapping(
    mobiusOrderDetailsResponseMapper,
    orderdetailsResBody,
    'mobiusOrderDetailsResponseMapper',
    migratedInterfaceType
  )
  expect(mappedResponse.orderId).toStrictEqual(orderDetailsResponse.orderId)
  expect(mappedResponse.discountAll).toStrictEqual(
    orderDetailsResponse.discountAll
  )
  expect(mappedResponse.customerNumber).toStrictEqual(
    orderDetailsResponse.customerNumber
  )
  expect(mappedResponse.businessEntityId).toStrictEqual(
    orderDetailsResponse.businessEntityId
  )
  expect(mappedResponse.orderTypeID).toStrictEqual(
    orderDetailsResponse.orderTypeID
  )
  expect(mappedResponse.confirmStatusID).toStrictEqual(
    orderDetailsResponse.confirmStatusID
  )
  expect(mappedResponse.orderFeedback).toStrictEqual(
    orderDetailsResponse.orderFeedback
  )
  expect(mappedResponse.refunded).toStrictEqual(orderDetailsResponse.refunded)
  expect(mappedResponse.refundDetails).toStrictEqual(
    orderDetailsResponse.refundDetails
  )
  expect(mappedResponse.convenienceFeeTitle).toStrictEqual(
    orderDetailsResponse.convenienceFeeTitle
  )
  expect(mappedResponse.addressInfo).toStrictEqual(
    orderDetailsResponse.addressInfo
  )
  expect(mappedResponse.customerSupportPhone).toStrictEqual(
    orderDetailsResponse.customerSupportPhone
  )
  expect(mappedResponse.card).toStrictEqual(orderDetailsResponse.card)
  expect(mappedResponse.taxAll).toStrictEqual(orderDetailsResponse.taxAll)
  expect(mappedResponse.enableOrderFeedback).toStrictEqual(
    orderDetailsResponse.enableOrderFeedback
  )
  expect(mappedResponse.convenienceFee).toStrictEqual(
    orderDetailsResponse.convenienceFee
  )
  expect(mappedResponse.orderModifiers).toStrictEqual(
    orderDetailsResponse.orderModifiers
  )
  expect(mappedResponse.orderItems).toStrictEqual(
    orderDetailsResponse.orderItems
  )
  expect(mappedResponse.businessName).toStrictEqual(
    orderDetailsResponse.businessName
  )
  expect(mappedResponse.businessEntityGuid).toStrictEqual(
    orderDetailsResponse.businessEntityGuid
  )
  expect(mappedResponse.orderNote).toStrictEqual(orderDetailsResponse.orderNote)
  expect(mappedResponse.isASAP).toStrictEqual(orderDetailsResponse.isASAP)
  expect(mappedResponse.discountName).toStrictEqual(
    orderDetailsResponse.discountName
  )
  expect(mappedResponse.orderDateTime).toStrictEqual(
    orderDetailsResponse.orderDateTime
  )
  expect(mappedResponse.orderRequestTime).toStrictEqual(
    orderDetailsResponse.orderRequestTime
  )
  expect(mappedResponse.deliveryFee).toStrictEqual(
    orderDetailsResponse.deliveryFee
  )
  expect(mappedResponse.amountDue).toStrictEqual(orderDetailsResponse.amountDue)
  expect(mappedResponse.tipAmountUsed).toStrictEqual(
    orderDetailsResponse.tipAmountUsed
  )
  expect(mappedResponse.subtotal).toStrictEqual(orderDetailsResponse.subtotal)
  expect(mappedResponse.canNotReorderReason).toStrictEqual(
    orderDetailsResponse.canNotReorderReason
  )
  expect(mappedResponse.canReorder).toStrictEqual(
    orderDetailsResponse.canReorder
  )
  expect(mappedResponse.deliveryStatus).toStrictEqual(
    orderDetailsResponse.deliveryStatus
  )
  expect(mappedResponse.restaurantInfo).toStrictEqual(
    orderDetailsResponse.restaurantInfo
  )
  expect(mappedResponse.paymentTypeID).toStrictEqual(
    orderDetailsResponse.paymentTypeID
  )
  expect(mappedResponse.creditCardProcessingFee).toStrictEqual(
    orderDetailsResponse.creditCardProcessingFee
  )
  expect(mappedResponse.discountApplicableSubtotal).toStrictEqual(
    orderDetailsResponse.discountApplicableSubtotal
  )
  expect(mappedResponse.surchargeAmountUsed).toStrictEqual(
    orderDetailsResponse.surchargeAmountUsed
  )
  expect(mappedResponse.paymentTypeName).toStrictEqual(
    orderDetailsResponse.paymentTypeName
  )
})
