import {FunctionComponent} from "react";
import { Modal} from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";

interface UpdateProductModalProps {
	onHide:Function;
	show: boolean;
	refresh: Function;
	productId: string;
}

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({
	show,
	onHide,
	refresh,
	productId,
}) => {
	return (
		<>
			<Modal
				show={show}
				onHide={() => onHide()}
				size='sm'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Add Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpdateProduct
						onHide={() => onHide()}
						refresh={refresh}
						productId={productId}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default UpdateProductModal;
