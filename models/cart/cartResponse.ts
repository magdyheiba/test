import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { createMapper } from '@automapper/core'

export const mobiusCartResponseMapper = createMapper({
  strategyInitializer: pojos()
})
export interface Root {
  orderTypeId: number
  subtotal: number
  discountApplicableSubtotal: number
  surchargeAmountUsed: number
  creditCardProcessingFee: number
  tipAmountUsed: number
  amountDue: number
  taxAll: number
  discountAll: number
  deliveryFee: number
  convenienceFee: number
  paymentTypeId: number
  scheduledFor: any
  deliveryAddress: DeliveryAddress
  cartId: string
  businessEntityId: number
  businessEntityGuid: string
  orderItems: OrderItem[]
  appliedCoupon: any
  canCheckOut: boolean
  canNotCheckOutDetails: any
  tipEnabled: boolean
  tipSettings: TipSettings
}

export interface DeliveryAddress {
  street: string
  aptUnitSuite: string
  city: string
  state: string
  zipcode: string
  countryId: number
  companyName: string
  latitude: number
  longitude: number
}

export interface OrderItem {
  orderItemId: number
  menuItemId: number
  menuItemName: string
  menuItemSizeId: number
  menuItemSizeDesc: string
  quantity: number
  price: number
  free: boolean
  orderItemNote: string
  discountable: boolean
  orderModifiers: OrderModifier[]
}

export interface OrderModifier {
  orderModifierId: number
  menuModifierId: number
  modifierBuilderDetailId: number
  price: number
  modifierName: string
  modifierBuilderTypeId: number
  modifierBuilderTypeName: string
}

export interface TipSettings {
  tipWithCashEnabled: boolean
  tipAmountSettings: any
  tipPercentageSettings: TipPercentageSettings
}

export interface TipPercentageSettings {
  tipPercentageOptions: number[]
  defaultTipPercentageOption: DefaultTipPercentageOption
}

export interface DefaultTipPercentageOption {
  tipPercentageOptionIndex: number
}

/**
 * This method basically create the Mapped meta data to the attributes of the interface
 * @param String of identifier string to identify the mapped interface by name
 * @param Root Interface that you want to map the values to its objects
 */
PojosMetadataMap.create<Root>('mobiusCartResponseMapper', {
  orderTypeId: Number,
  subtotal: Number,
  discountApplicableSubtotal: Number,
  surchargeAmountUsed: Number,
  creditCardProcessingFee: Number,
  tipAmountUsed: Number,
  amountDue: Number,
  taxAll: Number,
  discountAll: Number,
  deliveryFee: Number,
  convenienceFee: Number,
  paymentTypeId: Number,
  scheduledFor: Object,
  deliveryAddress: Object,
  cartId: String,
  businessEntityId: Number,
  businessEntityGuid: String,
  orderItems: Array,
  appliedCoupon: Object,
  canCheckOut: Boolean,
  canNotCheckOutDetails: Object,
  tipEnabled: Boolean,
  tipSettings: Object
})
