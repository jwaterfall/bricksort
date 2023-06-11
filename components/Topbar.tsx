import { FC } from 'react';
import { MdMenu } from 'react-icons/md';

import Button from '@/components/actions/Button';

const Topbar: FC = () => (
  <div className="h-16 px-4 flex items-center text-slate-950">
    <Button Icon={MdMenu} shape="square" variant="ghost" color="secondary" />
  </div>
);

export default Topbar;
