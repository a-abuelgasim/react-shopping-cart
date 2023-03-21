import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
	id: number;
	quantity: number;
};

export function CartItem({id, quantity}: CartItemProps) {
	const { removeFromCart } = useShoppingCart();
	const item = storeItems.find(item => item.id === id);
	if (item == null) return null

	return (
		<Stack
				className="align-items-center d-flex"
				direction="horizontal"
				gap={ 2 }>
			<img
					alt=""
					className=""
					src={ item.imgUrl }
					style={{
						height: '75px',
						objectFit: 'cover',
						width: '125px',
					}} />

			<div className="me-auto">
				<div>
					{ item.name } {
						quantity > 1 &&
						<span
								className="text-muted"
								style={{ fontSize: '.65rem' }}>
							x { quantity }
						</span>
					}
				</div>

				<div
						className="text-muted"
						style={{ fontSize: '.75rem' }}>
					{formatCurrency(item.price)}
				</div>
			</div>

			<div>
				{formatCurrency(item.price * quantity)}
			</div>

			<Button
					onClick={ () => removeFromCart(item.id) }
					size="sm"
					variant="outline-danger">
				x
			</Button>
		</Stack>
	)
}
