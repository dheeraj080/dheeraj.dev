/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface CardProps {
  children: ReactNode;
  className?: string;
  span?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
}

export const Card = ({ children, className = "", span = "", onClick, onMouseEnter, onMouseLeave, ariaLabel }: CardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { 
        y: -4,
        transition: { 
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }
      } : {}}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel || (onClick ? "View project details" : undefined)}
      className={`bg-card-bg rounded-[2.5rem] overflow-hidden relative group border border-border-subtle hover:border-text-primary/10 transition-shadow hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] focus-visible:ring-1 focus-visible:ring-brand-blue focus-visible:outline-none ${onClick ? 'cursor-pointer' : ''} ${span} ${className}`}
    >
      {children}
    </motion.div>
  );
};
