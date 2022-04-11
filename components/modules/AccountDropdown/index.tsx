import Image from 'next/image';
import { FC } from 'react';
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';

import Dropdown, {
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '@/components/elements/Dropdown';
import useTheme from '@/contexts/ThemeContext';

import { AccountButton } from './styles';

const AccountDropdown: FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownToggle>
        <AccountButton>
          <Image
            src="/images/account.png"
            alt="account"
            layout="responsive"
            width={512}
            height={512}
          />
        </AccountButton>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={toggleTheme}>
          {isDarkTheme ? <MdDarkMode /> : <MdLightMode />}Theme: {isDarkTheme ? 'Dark' : 'Light'}
        </DropdownItem>
        <DropdownDivider />
        {
          // eslint-disable-next-line
          <a href="/api/auth/logout">
            <DropdownItem>
              <MdLogout />
              Log out
            </DropdownItem>
          </a>
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default AccountDropdown;
