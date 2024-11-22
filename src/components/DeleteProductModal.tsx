import {FunctionComponent} from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import {deleteteProduct} from "../services/ProductsServices";

interface DeleteModalProps {
	show: boolean;
	onHide: Function;
	refresh: Function;
	productId: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
	show,
	onHide,
	refresh,
	productId,
}) => {
	return (
		<Modal
			show={show}
			onHide={() => onHide}
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
				<p>are you sure you want to delete?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() =>
						deleteteProduct(productId)
							.then(() => refresh())
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

export default DeleteModal;
