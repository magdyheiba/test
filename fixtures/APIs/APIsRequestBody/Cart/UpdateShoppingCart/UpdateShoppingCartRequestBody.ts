export default function updateShoppingCartRequestBody(cartId: string) {
  return {
    cartId: cartId,
    orderTypeId: 1,
    scheduledFor: {
      orderRequestTime: '2024-12-10T15:00:00-06:00'
    },
    deliveryAddress: {
      street: '1020 South Milwaukee Avenue street',
      aptUnitSuite: 'Apt 100',
      city: 'Wheeling',
      state: 'IL',
      zipcode: '60091',
      countryId: 1,
      companyName: 'BeyondMenu',
      latitude: 42.121732,
      longitude: -87.896682
    }
  }
}
