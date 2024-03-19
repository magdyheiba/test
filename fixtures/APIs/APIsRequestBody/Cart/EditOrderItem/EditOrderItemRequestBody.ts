export default function editOrderItemRequestBody(cartId: string) {
  return {
    cartId: cartId,
    orderItemId: 1,
    menuItemSizeId: 13750507,
    modifierBuilderDetailIds: [7375859],
    quantity: 15,
    orderItemNote: 'test'
  }
}
