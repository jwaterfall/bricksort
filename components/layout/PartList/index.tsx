import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';

import PartCard from '@/components/modules/PartCard';
import { Part } from '@/models/Part';

import { Container } from './styles';

const PartList: FC<{
  parts: Part[];
  showSet?: boolean;
  page?: number;
}> = ({ parts, showSet = false, page }) => {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <Container ref={animateRef}>
      {parts.map((part) => (
        <PartCard key={part._id} part={part} showSet={showSet} page={page} />
      ))}
    </Container>
  );
};

export default PartList;
