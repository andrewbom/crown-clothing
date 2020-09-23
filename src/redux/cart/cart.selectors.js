// With reselect we are memoizing the value of each selector that calls 'createSelector',
// as long as the value parameters passed in haven't changed, then our selector won't re-compute and just returned the previously memoized value.
// Therefore when we move our cartItemCount reduce function into a selector, which itself relies on the 'selectCartItems' selector,
// both of these selector functions won't run as long as 'Cart' or 'CartItems' in our redux store haven't changed.
// As a result, in our 'CartIcon' component, the 'mapStateToProps' still gets fired on every state change in redux,
// but they won't pass new props into our 'CartIcon' component which means it doesn't run duplicate logic to get the same output.

import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
