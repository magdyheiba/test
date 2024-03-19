export default {
  orderTypeId: 1,
  subtotal: 2020,
  discountApplicableSubtotal: 2020,
  surchargeAmountUsed: 0,
  creditCardProcessingFee: 0,
  tipAmountUsed: 0,
  amountDue: 2222.8,
  taxAll: 202,
  discountAll: 0,
  deliveryFee: 6.99,
  convenienceFee: 0.8,
  paymentTypeId: 2,
  scheduledFor: { orderRequestTime: '2024-12-10T16:00:00-05:00' },
  deliveryAddress: {
    street: '1020 South Milwaukee Avenue street',
    aptUnitSuite: 'Apt 100',
    city: 'Wheeling',
    state: 'IL',
    zipcode: '60091',
    countryId: 1,
    companyName: 'BeyondMenu',
    latitude: 42.12162070000001,
    longitude: -87.8966823
  },
  cartId: '3XukmwFGdCQoOmuRySDyr',
  businessEntityId: 10001,
  businessEntityGuid: '2B70DD02-D874-4C1A-8906-D30C8C44CF53',
  businessName: 'Don Cheo’s Taquerias and Cool Things',
  orderItems: [
    {
      orderItemId: 1,
      menuItemId: 11083067,
      menuItemName: 'Test Lorem Ipsum',
      menuItemSizeId: 13750511,
      menuItemSizeDesc: 'aliquip ex ea commodo consequat. Duis aute irure',
      menuItemSizePrice: 1,
      quantity: 20,
      price: 2020,
      free: false,
      orderItemNote: 'no no onions please',
      discountable: true,
      orderModifiers: [
        {
          orderModifierId: 1,
          menuModifierId: 2027587,
          modifierBuilderDetailId: 7375877,
          price: 100,
          modifierName: 'Spicy',
          modifierBuilderTypeId: 1163366,
          modifierBuilderTypeName: 'Spicy level'
        }
      ]
    }
  ],
  appliedCoupon: null,
  canCheckOut: true,
  canNotCheckOutDetails: null,
  tipEnabled: true,
  tipSettings: {
    tipWithCashEnabled: true,
    tipAmountSettings: null,
    tipPercentageSettings: {
      tipPercentageOptions: [10, 15, 20],
      defaultTipPercentageOption: null
    }
  }
}
