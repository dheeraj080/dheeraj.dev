/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  image: string;
}

export interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
