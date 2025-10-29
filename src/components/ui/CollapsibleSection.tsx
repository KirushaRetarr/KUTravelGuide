import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-section">
      <button
        className="collapsible-section__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="collapsible-section__title">{title}</h3>
        <FontAwesomeIcon
          className={`collapsible-section__icon ${isOpen ? "rotated" : ""}`}
          icon={faChevronDown}
        />
      </button>
      <div className={`collapsible-section__content ${isOpen ? "visible" : ""}`}>
        {children}
      </div>
    </div>
  );
};


