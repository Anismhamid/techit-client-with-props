import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteteProductFromCart} from "../services/carteServices";

interface DeleteFromCartModalProps {
	onHide: Function;
	show: boolean;
	refresh: Function;
	productId: string;
}

const DeleteFromCartModal: FunctionComponent<DeleteFromCartModalProps> = ({
	show,
	onHide,
	productId,
	refresh,
}) => {
	return (
		<Modal
			show={show}
			onHide={() => onHide()}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Delete Product
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>are you sure you want to delete this item?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={ () =>
						deleteteProductFromCart(productId)
							.then((res) => {
								// console.log(productId, res.data[0].products[0]);

								refresh();
								onHide();
							})
							.catch((err) => console.log(err))
					}
					variant='danger'
				>
					Delete
				</Button>
				<Button onClick={() => onHide()} variant='secondary'>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteFromCartModal;
