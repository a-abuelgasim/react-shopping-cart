import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
	id: number;
	imgUrl: string;
	name: string;
	price: number;
}

export function StoreItem({id, imgUrl, name, price}: StoreItemProps) {
	const {
		decreaseCartQuantity,
		getItemQuantity,
		increaseCartQuantity,
		removeFromCart
	} = useShoppingCart();

	const quantity = getItemQuantity(id);

	return (
		<Card className="h-100">
			<Card.Img
					height={ 200 }
					src={ imgUrl }
					style={{ objectFit: 'cover' }}
					variant="top" />
				<Card.Body className="d-flex flex-column">
					<Card.Title className="align-items-baseline d-flex justify-content-between mb-4">
						<span className="fs-2">
							{ name }
						</span>

						<span className="ms-2 text-muted">
							{ formatCurrency(price) }
						</span>
					</Card.Title>

					<div className="mt-auto">
						{
							quantity === 0 ?
								(
									<Button
											className="w-100"
											onClick={ () => increaseCartQuantity(id) }>
										+ Add To Cart
									</Button>
								)	:
								(
									<div
											className="align-items-center d-flex flex-column"
											style={{ gap: '0.5rem' }}>
										<div
												className="align-items-center d-flex justify-content-center"
												style={{ gap: '0.5rem' }}>
											<Button onClick={ () => decreaseCartQuantity(id) }>
												-
											</Button>

											<div>
												<span className="fs-3">
													{ quantity }
												</span> in cart
											</div>

											<Button onClick={ () => increaseCartQuantity(id) }>
												+
											</Button>
										</div>

										<Button
												onClick={ () => removeFromCart(id) }
												size="sm"
												variant="danger">
											Remove
										</Button>
									</div>
								)
						}
					</div>
				</Card.Body>
		</Card>
	)
}
