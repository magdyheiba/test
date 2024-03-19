export default {
  orderTypeId: 2,
  subtotal: 165,
  discountApplicableSubtotal: 165,
  surchargeAmountUsed: 0,
  creditCardProcessingFee: 0,
  tipAmountUsed: 0,
  amountDue: 189.29,
  taxAll: 16.5,
  discountAll: 0,
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
  cartId: 'zddQeLsjfLSVzfKG8HeL0',
  businessEntityId: 10001,
  businessEntityGuid: '2B70DD02-D874-4C1A-8906-D30C8C44CF53',
  businessName: 'Don Cheo’s Taquerias and Cool Things',
  orderItems: [
    {
      orderItemId: 1,
      menuItemId: 11083067,
      menuItemName: 'Test Lorem Ipsum',
      menuItemSizeId: 13750507,
      menuItemSizeDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
      menuItemSizePrice: 1,
      quantity: 15,
      price: 165,
      free: false,
      orderItemNote: 'test',
      discountable: true,
      orderModifiers: [
        {
          orderModifierId: 1,
          menuModifierId: 2027577,
          modifierBuilderDetailId: 7375859,
          price: 10,
          modifierName: 'Extra Rice',
          modifierBuilderTypeId: 1163361,
          modifierBuilderTypeName: 'Choose something'
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
      tipPercentageOptions: [10, 15, 20, 25],
      defaultTipPercentageOption: { tipPercentageOptionIndex: 1 }
    }
  }
}
