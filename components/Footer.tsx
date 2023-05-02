import { FC } from 'react';

import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';

const Footer: FC = () => (
  <div className="bg-slate-300 border-t border-slate-400">
    <div className="px-4 py-12 max-w-screen-2xl mx-auto flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <a href="https://jackwaterfall.com" target="_blank" rel="noopener noreferrer">
          <FaGlobe size={24} />
        </a>
        <a href="https://github.com/jwaterfall" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/jwaterfall" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        <a href="mailto:jack.a.waterfall@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={24} />
        </a>
      </div>
      <p className="text-sm">Designed & Built by Jack Waterfall</p>
    </div>
  </div>
);

export default Footer;
