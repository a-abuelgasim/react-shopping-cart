import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
	children: ReactNode
}

type ShoppingCartContext = {
	cartIsOpen: boolean;
	cartItems: CartItem[];
	cartQuantity: number;
	closeCart: () => void;
	decreaseCartQuantity: (id: number) => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	openCart: () => void;
	removeFromCart: (id: number) => void;
}

type CartItem = {
	id: number;
	quantity: number;
}

const SHOPPING_CART = 'shopping-cart';
const ShoppingCartContext = createContext({} as ShoppingCartContext);


export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartIsOpen, setCartIsOpen] = useState(false);
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(SHOPPING_CART, []);

	const cartQuantity = cartItems.reduce(
		(total, item) => total + item.quantity, 0
	)

	function closeCart() { setCartIsOpen(false)	}

	function decreaseCartQuantity(id: number) {
		setCartItems(prevItems => {
			if (prevItems.find(item => item.id === id)?.quantity === 1) {
				return prevItems.filter(item => item.id !== id);
			}

			return prevItems.map((item: CartItem) => {
				if (item.id === id) return {...item, quantity: item.quantity - 1 }
				return item;
			})
		})
	}

	function getItemQuantity(id: number) {
		return cartItems.find(item => item.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id: number) {
		setCartItems(prevItems => {
			if (prevItems.find(item => item.id === id) === undefined) {
				return [...prevItems, {id, quantity: 1}];
			}

			return prevItems.map((item: CartItem) => {
				if (item.id === id) return {...item, quantity: item.quantity + 1 }
				return item;
			})
		})
	}

	function openCart() { setCartIsOpen(true) }

	function removeFromCart(id: number) {
		setCartItems(prevItems => prevItems.filter(item => item.id !== id))
	}

	return (
		<ShoppingCartContext.Provider value={{
			cartIsOpen,
			cartItems,
			cartQuantity,
			closeCart,
			decreaseCartQuantity,
			getItemQuantity,
			increaseCartQuantity,
			openCart,
			removeFromCart
		}}>
			{children}

			<ShoppingCart />
		</ShoppingCartContext.Provider>
	)
}
