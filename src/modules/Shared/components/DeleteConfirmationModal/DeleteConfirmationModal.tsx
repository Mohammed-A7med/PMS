import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteImg from "../../../../assets/no-data.svg";

export default function DeleteConfirmationModal({
  showModal,
  handleCloseModal,
  handleDeleteModal,
  itemName,
}: any) {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <img src={DeleteImg} alt="no-data-logo" />
          <h4 className="pt-3">Delete This {itemName} ?</h4>
          <p>
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDeleteModal}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
