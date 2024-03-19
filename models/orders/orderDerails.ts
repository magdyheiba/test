import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { createMapper } from '@automapper/core'

export const mobiusOrderDetailsResponseMapper = createMapper({
  strategyInitializer: pojos()
})
export interface Root {
  orderId: number
  discountAll: number
  customerNumber: number
  businessEntityId: number
  orderTypeID: number
  confirmStatusID: number
  orderFeedback: OrderFeedback
  refunded: boolean
  refundDetails: RefundDetails
  convenienceFeeTitle: string
  addressInfo: AddressInfo
  customerSupportPhone: string
  card: Card
  taxAll: number
  enableOrderFeedback: boolean
  convenienceFee: number
  orderModifiers: OrderModifier[]
  orderItems: OrderItem[]
  businessName: string
  businessEntityGuid: string
  orderNote: string
  isASAP: boolean
  discountName: string
  orderDateTime: string
  orderRequestTime: string
  deliveryFee: number
  amountDue: number
  tipAmountUsed: number
  subtotal: number
  canNotReorderReason: CanNotReorderReason
  canReorder: boolean
  deliveryStatus: DeliveryStatus
  restaurantInfo: RestaurantInfo
  paymentTypeID: number
  creditCardProcessingFee: number
  discountApplicableSubtotal: number
  surchargeAmountUsed: number
  paymentTypeName: string
}

export interface OrderFeedback {
  note: string
  serviceRating: number
  addDateTime: string
}

export interface RefundDetails {
  refundAmount: number
  refundDateTime: string
}

export interface AddressInfo {
  companyName: string
  street: string
  aptUnitSuite: string
  zipcode: string
  city: string
  state: string
}

export interface Card {
  cardBrand: string
  cardLast4: string
  paymentDeviceTypeId: number
}

export interface OrderModifier {
  orderModifierId: number
  orderItemId: number
  modifierBuilderDetailId: number
  menuModifierId: number
  menuModifierName: string
  modifierBuilderTypeId: number
  modifierBuilderTypeName: string
  price: number
}

export interface OrderItem {
  orderItemId: number
  menuItemID: number
  menuItemName: string
  menuItemSizeID: number
  menuItemSizeDesc: string
  quantity: number
  price: number
  isFree: boolean
  orderItemInfo: string
  orderItemNote: string
  menuAliasNumber: string
  defaultUnitPrice: number
  discountable: boolean
  canReorder: boolean
  canNotReorderReason: string
}

export interface CanNotReorderReason {
  title: string
  message: string
}

export interface DeliveryStatus {
  statusTypeID: number
  message: string
}

export interface RestaurantInfo {
  businessEntityId: number
  businessEntityGuid: string
  businessName: string
  pickupEnabled: boolean
  deliveryEnabled: boolean
  new: boolean
  isFavorite: boolean
  state: string
  city: string
  street: string
  aptUnitSuite: string
  longitude: number
  latitude: number
  zipcode: string
  countryId: number
  scheduledOrdersEnabled: boolean
  phoneNumber: string
}
/**
 * This method basically create the Mapped meta data to the attributes of the interface
 * @param String of identifier string to identify the mapped interface by name
 * @param Root Interface that you want to map the values to its objects
 */
PojosMetadataMap.create<Root>('mobiusOrderDetailsResponseMapper', {
  orderId: Number,
  discountAll: Number,
  customerNumber: Number,
  businessEntityId: Number,
  orderTypeID: Number,
  confirmStatusID: Number,
  orderFeedback: Object,
  refunded: Boolean,
  refundDetails: Object,
  convenienceFeeTitle: String,
  addressInfo: Object,
  customerSupportPhone: String,
  card: Object,
  taxAll: Number,
  enableOrderFeedback: Boolean,
  convenienceFee: Number,
  orderModifiers: Array,
  orderItems: Array,
  businessName: String,
  businessEntityGuid: String,
  orderNote: String,
  isASAP: Boolean,
  discountName: String,
  orderDateTime: String,
  orderRequestTime: String,
  deliveryFee: Number,
  amountDue: Number,
  tipAmountUsed: Number,
  subtotal: Number,
  canNotReorderReason: Object,
  canReorder: Boolean,
  deliveryStatus: Object,
  restaurantInfo: Object,
  paymentTypeID: Number,
  creditCardProcessingFee: Number,
  discountApplicableSubtotal: Number,
  surchargeAmountUsed: Number,
  paymentTypeName: String
})
