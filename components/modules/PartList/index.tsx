import { FC, useState } from 'react';

import { Part } from '../../../models/Part';
import PartCard from '../PartCard';
import { Container } from './styles';

const PartList: FC<{
  parts: Part[];
  showSet?: boolean;
  page?: number;
}> = ({ parts, showSet = false, page }) => (
  <Container>
    {parts.map((part) => (
      <PartCard key={part._id} part={part} showSet={showSet} page={page} />
    ))}
  </Container>
);

export default PartList;
