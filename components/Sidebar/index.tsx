"use client";

import { FC } from "react";
import Image from "next/image";
import {
  MdOutlineSpaceDashboard,
  MdOutlineHandyman,
  MdOutlineExtension,
  MdOutlineSettings,
  MdOutlineDirectionsCar,
  MdOutlinePerson,
} from "react-icons/md";

import SidebarSection from "./SidebarSection";
import SidebarLink from "./SidebarLink";

const Sidebar: FC = () => (
  <div className="bg-slate-900 text-slate-400 w-72 h-full shrink-0">
    <div className="flex items-center gap-4 px-8 h-20 border-b border-slate-800">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h2 className="text-2xl font-lobster tracking-wider text-slate-50">Bricksort</h2>
    </div>
    <nav className="p-8 flex flex-col gap-8 grow">
      <SidebarSection title="my collection">
        <SidebarLink href="/" exact Icon={MdOutlineSpaceDashboard}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/collection/sets" Icon={MdOutlineHandyman} badge="32">
          Incomplete sets
        </SidebarLink>
        <SidebarLink href="/collection/sets/missing-parts" exact Icon={MdOutlineExtension} badge="4523">
          Missing Parts
        </SidebarLink>
        <SidebarLink href="/collection/sets/missing-minifigs" exact Icon={MdOutlinePerson} badge="2">
          Missing Minifigs
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="browse">
        <SidebarLink href="/browse/sets" Icon={MdOutlineDirectionsCar}>
          Browse Sets
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="account">
        <SidebarLink href="/settings" exact Icon={MdOutlineSettings}>
          Settings
        </SidebarLink>
      </SidebarSection>
    </nav>
  </div>
);

export default Sidebar;
