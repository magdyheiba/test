export default {
  orderTypeId: 2,
  subtotal: 2020,
  discountApplicableSubtotal: 2020,
  surchargeAmountUsed: 0,
  creditCardProcessingFee: 0,
  tipAmountUsed: 0,
  amountDue: 2207.79,
  taxAll: 200,
  discountAll: 20,
  deliveryFee: 6.99,
  convenienceFee: 0.8,
  paymentTypeId: 2,
  scheduledFor: null,
  deliveryAddress: {
    street: '1020 South Milwaukee Avenue',
    aptUnitSuite: 'Apt 10',
    city: 'Wheeling',
    state: 'IL',
    zipcode: '60090',
    countryId: 1,
    companyName: 'My Small Business',
    latitude: 42.12162070000001,
    longitude: -87.8966823
  },
  cartId: 'PiGEC2DGNsYjwG0wWsu4P',
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
  appliedCoupon: {
    discountId: 52488,
    couponName: 'Spend $10+ & Save $20',
    couponType: 'savings',
    toAmount: 10,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
    fromDateTime: '2023-04-25T00:00:00-05:00',
    toDateTime: '2099-12-31T00:00:00-05:00',
    singleUse: false,
    delivery: true,
    pickup: true
  },
  canCheckOut: true,
  canNotCheckOutDetails: null,
  tipEnabled: true,
  tipSettings: {
    tipWithCashEnabled: true,
    tipAmountSettings: null,
    tipPercentageSettings: {
      tipPercentageOptions: [10, 15, 20, 25],
      defaultTipPercentageOption: { tipPercentageOptionIndex: 1 }
    }
  }
}
