import React, {
  useImperativeHandle,
  useState,
  useCallback,
  forwardRef,
  useEffect,
} from "react";
import { useStateLink } from "@hookstate/core";
import { Button, Grid, Form } from "tabler-react";
import Select from "react-select";
import { Modal } from "react-bootstrap";

function ModalDeleteVolume({ volumes: linkedVolumes }, ref) {
  const volumes = useStateLink(linkedVolumes);
  const [visible, setVisible] = useState(false);
  const [idVolume, setIdVolume] = useState(null);

  useImperativeHandle(ref, () => {
    return { openModal };
  });

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = useCallback((id) => {
    setVisible(true);
    setIdVolume(id);
  }, []);

  function handleSubmit() {
    volumes.set((previous) =>
      previous.filter((volume) => volume.id !== idVolume)
    );
    closeModal();
  }

  return (
    <Modal show={visible} animation={true}>
      <Modal.Header>
        <Modal.Title>Excluir volume</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você tem certeza que deseja excluir o volume?</Modal.Body>
      <Modal.Footer>
        <Button color="danger" icon="x" onClick={closeModal}>
          Não
        </Button>
        <Button
          color="success"
          icon="trash"
          icon="check"
          onClick={handleSubmit}
        >
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default forwardRef(ModalDeleteVolume);
