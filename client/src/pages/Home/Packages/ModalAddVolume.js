import React, {
  useImperativeHandle,
  useState,
  useCallback,
  forwardRef,
  useEffect,
} from "react";
import { useStateLink, none } from "@hookstate/core";
import { Button, Grid, Form } from "tabler-react";
import Select from "react-select";
import { Modal } from "react-bootstrap";

function ModalAddVolume(
  { volumes: linkedVolumes, availableVolumes: linkedAvailableVolumes },
  ref
) {
  const volumes = useStateLink(linkedVolumes);
  const availableVolumes = useStateLink(linkedAvailableVolumes);

  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    id: undefined,
    name: undefined,
    value: undefined,
    amount: 1,
    total: undefined,
    selected: undefined,
  });

  const volumesOptions = availableVolumes.get().map((volume) => {
    return {
      id: volume._id,
      value: volume._id,
      label: volume.name,
      price: volume.price,
    };
  });

  useImperativeHandle(ref, () => {
    return { openModal };
  });

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  function handleSubmit() {
    const { id, name, value, amount } = form;

    const volumeIndex = volumes.get().findIndex((volume) => volume.id === id);

    if (volumeIndex !== -1) {
      console.log("index:", volumes.nested[volumeIndex].get());
      // state.merge((p) => ({ 0: p[0] + 1 }));

      volumes.merge((previous) => ({
        [volumeIndex]: {
          id,
          name,
          value,
          amount: previous[volumeIndex].amount + amount,
          total: previous[volumeIndex].total + value * amount,
        },
      }));
    } else {
      volumes.set((v) => [
        ...v,
        { id, name, value, amount, total: value * amount },
      ]);
    }
    closeModal();
  }

  const DefaultForm = () => {
    function handleOnChangeSelect(selected) {
      setForm({
        ...form,
        id: selected.id,
        name: selected.label,
        value: selected.price,
        selected: selected,
      });
    }

    function handleOnChangeAmount(e) {
      setForm({
        ...form,
        amount: Number(e.target.value),
      });
    }

    return (
      <Grid.Row>
        <Grid.Col md={12} lg={6} sm={12}>
          <Form.Group isRequired label="Nome volume">
            <Select
              options={volumesOptions}
              value={form.selected}
              placeholder="Selecione o volume"
              onChange={handleOnChangeSelect}
            />
          </Form.Group>
        </Grid.Col>
        <Grid.Col md={12} lg={6} sm={12}>
          <Form.Group isRequired label="Quantidade">
            <Form.Input
              name="price"
              type="number"
              min="1"
              value={form.amount}
              onChange={handleOnChangeAmount}
            />
          </Form.Group>
        </Grid.Col>
      </Grid.Row>
    );
  };

  return (
    <Modal show={visible} animation={true}>
      <Modal.Header>
        <Modal.Title>Adicionar volume</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DefaultForm />
      </Modal.Body>
      <Modal.Footer>
        <Button color="danger" icon="x" onClick={closeModal}>
          Não
        </Button>
        <Button
          color="success"
          icon="check"
          onClick={handleSubmit}
          disabled={!form.selected}
        >
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default forwardRef(ModalAddVolume);
