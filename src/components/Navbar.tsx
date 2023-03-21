import { Button, Container, Nav, Navbar as NavbarBS } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'

export function Navbar() {
	const {
		cartIsOpen,
		cartQuantity,
		closeCart,
		openCart
	} = useShoppingCart();

	return (
		<NavbarBS
				className="bg-white mb-3 shadow-sm"
				sticky="top">
			<Container>
				<Nav className="me-auto">
					<Nav.Link
							as={ NavLink }
							to={ "/" }>
						Home
					</Nav.Link>

					<Nav.Link
							as={ NavLink }
							to={ "/store" }>
						Store
					</Nav.Link>

					<Nav.Link
							as={ NavLink }
							to={ "/about" }>
						About
					</Nav.Link>
				</Nav>

				{ cartQuantity > 0 && (
					<Button
							onClick={ () => {	if (cartIsOpen) { closeCart() }	else openCart() }}
							style={{ height: '3rem', position: 'relative', width: '3rem' }}
							variant="outline-primary">
						<img
								height="100%"
								src="/icons/cart.svg"
								width="100%"/>

						<div
								className="align-items-center bg-danger d-flex justify-content-center rounded-circle"
								style={{
									bottom: '-0.5rem',
									color: 'white',
									position: 'absolute',
									right: '-0.5rem',
									width: '1.5rem',
								}}>
							{ cartQuantity }
						</div>
					</Button>
				)}
			</Container>
		</NavbarBS>
	)
}
