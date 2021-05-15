export const initialState = {
  basket: [],
  saved: [],
  user: null,
};

//Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  const checkUnique = (x) => x.id === action.item.id;
  switch (action.type) {
    case "ADD_TO_BASKET":
      if (state.basket.some(checkUnique)) {
        return {
          ...state,
          basket: [...state.basket],
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      }

    case "ADD_TO_SAVED":
      if (state.saved.some(checkUnique)) {
        return {
          ...state,
          saved: [...state.saved],
        };
      } else {
        return {
          ...state,
          saved: [...state.saved, action.item],
        };
      }

    case "UPDATE_QUANTITY":
      const target = state.basket.find((x) => x.id === action.item.id);
      target.quantity = action.item.quantity;
      return {
        ...state,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
