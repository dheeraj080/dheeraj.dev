/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  className?: string;
}

export const IconButton = ({ icon: Icon, className = "" }: IconButtonProps) => (
  <div 
    aria-hidden="true"
    className={`absolute bottom-8 left-8 w-12 h-12 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl border border-border-subtle group-hover:scale-110 active:scale-95 ${className}`}
  >
    <Icon className="w-5 h-5 text-text-primary" />
  </div>
);
