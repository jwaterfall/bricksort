import { FC, FormEvent, useState } from 'react';

import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Modal, { ModalFooter } from '@/components/elements/Modal';
import Typography from '@/components/elements/Typography';
import useIncrementPart from '@/hooks/mutations/useIncrementPart';
import useInput from '@/hooks/useInput';
import { Part } from '@/models/Part';

import { Container, Form, Image, ModalContainer, ModalSection } from './styles';

const PartCard: FC<{ part: Part; showSet?: boolean; page?: number }> = ({
  part,
  showSet = false,
  page,
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [addQuantity, handleChangeAddQuantity, setAddQuantity] = useInput(0);
  const [removeQuantity, handleChangeRemoveQuantity, setRemoveQuantity] = useInput(0);
  const { mutate: incrementQuantity, isLoading } = useIncrementPart(part, page);
  const quantityMissing = part.quantityTotal - part.quantityFound;

  const handleAddQuantity = (e: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
    incrementQuantity(addQuantity);
    setAddQuantity(0);
    setModalVisibility(false);
  };

  const handleRemoveQuantity = (e: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
    incrementQuantity(-removeQuantity);
    setRemoveQuantity(0);
    setModalVisibility(false);
  };

  const handleAddAll = () => {
    if (isLoading) return;
    incrementQuantity(quantityMissing);
    setModalVisibility(false);
  };

  const handleRemoveAll = () => {
    if (isLoading) return;
    incrementQuantity(-part.quantityFound);
    setModalVisibility(false);
  };

  const getVariant = () => {
    switch (quantityMissing / part.quantityTotal) {
      case 1:
        return 'primary';
      case 0:
        return 'tertiary';
      default:
        return 'secondary';
    }
  };

  if (!part.parent) console.log(part._id);

  return (
    <>
      <Modal show={modalVisibility} onHide={() => setModalVisibility(false)}>
        <ModalContainer>
          <ModalSection>
            <Typography variant="h4">{part.name}</Typography>
            <Image src={part.image} alt="part" />
            <Typography>
              {`${part.color}, ${part.quantityFound} / ${part.quantityTotal} Found`}
            </Typography>
            {showSet && (
              <Typography>
                {part.parent.number} {part.parent.name}
              </Typography>
            )}
          </ModalSection>
          <ModalSection>
            <Typography variant="h5">Add parts</Typography>
            <Form onSubmit={handleAddQuantity}>
              <Input
                required
                placeholder="Quantity"
                type="number"
                min={0}
                max={quantityMissing}
                fullWidth
                value={addQuantity}
                onChange={handleChangeAddQuantity}
              />
              <Button>Add</Button>
            </Form>
            <Button onClick={handleAddAll}>Found All</Button>
            <Typography variant="h5">Remove parts</Typography>
            <Form onSubmit={handleRemoveQuantity}>
              <Input
                required
                placeholder="Quantity"
                type="number"
                min={0}
                max={part.quantityFound}
                fullWidth
                value={removeQuantity}
                onChange={handleChangeRemoveQuantity}
              />
              <Button>Remove</Button>
            </Form>
            <Button onClick={handleRemoveAll}>Remove All</Button>
          </ModalSection>
        </ModalContainer>
        <ModalFooter>
          <Button onClick={() => setModalVisibility(false)}>Close</Button>
        </ModalFooter>
      </Modal>

      <Container onClick={() => setModalVisibility(true)} variant={getVariant()}>
        <Image src={part.image} alt="part" />
        <Typography>{part.color}</Typography>
        {showSet && (
          <Typography>
            {part.parent.number} {part.parent.name}
          </Typography>
        )}
        <Typography>
          {part.quantityFound} / {part.quantityTotal} Found
        </Typography>
      </Container>
    </>
  );
};

export default PartCard;
