export default function changeOrderItemQuantity(cartId: string) {
  return {
    cartId: cartId,
    orderItemId: 1,
    quantity: 10
  }
}
