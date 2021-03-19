import React, {
  useImperativeHandle,
  useState,
  useCallback,
  forwardRef,
  useRef,
} from "react";
import { useStateLink } from "@hookstate/core";
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
    selected: undefined,
  });

  const amountRef = useRef(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const volumesOptions = availableVolumes.get().map((volume) => {
    return {
      id: volume._id,
      value: volume._id,
      label: volume.name,
      price: volume.price,
      paid_now: volume.paid_now,
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
    const { id, label: name, paid_now } = form.selected;
    const amount = Number(amountRef.current.value);
    const price = Number(selectedPrice);

    //search in volumes if already exists some volume with the same id
    const volumesIndexes = [];
    volumes.get().forEach((volume, index) => {
      if (volume.id === id) volumesIndexes.push(index);
    });

    if (volumesIndexes.length > 0) {
      // console.log("index:", volumes.get()[volumeIndex]);
      // state.merge((p) => ({ 0: p[0] + 1 }));

      for (const index of volumesIndexes) {
        if (
          volumes.get()[index].value == price &&
          volumes.get()[index].paid_now == true
        ) {
          volumes.merge((previous) => ({
            [index]: {
                id,
                name,
              value: price,
              amount: previous[index].amount + amount,
              total: previous[index].total + price * amount,
            },
          }));
          closeModal();
          return;
        }
      }
    }

    volumes.set((v) => [
      ...v,
      { id, name, value: price, amount, total: price * amount, paid_now },
    ]);

    closeModal();
  }

  const DefaultForm = () => {
    function handleOnChangeSelect(selected) {
      setForm({
        ...form,
        selected: selected,
      });
      setSelectedPrice(selected.price);
    }

    return (
      <Grid.Row>
        <Grid.Col md={12} lg={8} sm={12}>
          <Form.Group isRequired label="Descrição volume">
            <Select
              options={volumesOptions}
              value={form.selected}
              placeholder="Selecione o volume"
              onChange={handleOnChangeSelect}
            />
          </Form.Group>
        </Grid.Col>
        <Grid.Col md={12} lg={4} sm={12}>
          <Form.Group isRequired label="Quantidade">
            <input
              className="form-control"
              name="amount"
              type="number"
              min="1"
              defaultValue="1"
              ref={amountRef}
            />
          </Form.Group>
        </Grid.Col>

        <Grid.Col md={12} lg={8} sm={12}>
          <Form.Group isRequired label="Preço">
            <input
              autoFocus
              className="form-control"
              name="price"
              type="number"
              step="0.1"
              min="0"
              value={selectedPrice}
              onChange={(e) => {
                setSelectedPrice(e.target.value);
              }}
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
