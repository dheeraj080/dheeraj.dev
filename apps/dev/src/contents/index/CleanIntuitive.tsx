import clsx from 'clsx';
import { useState } from 'react';

import { SectionButton } from '@/components/sections/SectionButton';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

import TodoItem from '@/contents/index/Cards/TodoItem';

import type { TodoItemState } from '@/contents/index/Cards/TodoItem';

type Content = {
  state: string; // Changed to string to allow architectural states
  shows: Array<TodoItemState>;
  title: string;
  description: string;
};

const content: Array<Content> = [
  {
    state: 'architecture',
    shows: ['typography'], // We use existing visual states as 'stages' of completion
    title: 'Scalable Architecture',
    description:
      'Designing modular system blueprints for long-term maintainability.',
  },
  {
    state: 'database',
    shows: ['typography', 'spacing'],
    title: 'Data Integrity',
    description:
      'Architecting efficient schemas and ensuring high data consistency.',
  },
  {
    state: 'api',
    shows: ['typography', 'spacing', 'colors'],
    title: 'API Orchestration',
    description:
      'Engineering secure, type-safe communication between services.',
  },
  {
    state: 'performance',
    shows: ['typography', 'spacing', 'colors', 'effects'],
    title: 'Performance & Logic',
    description:
      'Optimizing server-side logic and reducing systemic bottlenecks.',
  },
];

function TechnicalExcellence() {
  const [currentState, setCurrentState] = useState<Content | null>(null);

  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title="Robust Architecture & System Integrity."
          caption="Fullstack Engineering"
          description="Building scalable infrastructures and performant backends without 
            sacrificing reliability or technical debt."
        />
      </header>
      <SectionContent>
        <div className={clsx('flex', 'lg:gap-12')}>
          <div
            className={clsx('-mt-8 hidden flex-1 flex-col gap-3', 'lg:flex')}
          >
            {content.map((item, i) => (
              <SectionButton
                key={item.state}
                title={item.title}
                description={item.description}
                icon={i + 1}
                active={currentState?.state === item.state}
                onClick={() => setCurrentState(item)}
              />
            ))}
          </div>
          <div
            className={clsx('relative flex flex-1 items-center justify-center')}
          >
            <div
              className={clsx('-mt-8 flex gap-4', 'md:gap-6 lg:top-8 lg:mt-0')}
            >
              <TodoItem
                state={
                  currentState
                    ? currentState.shows
                    : ['typography', 'spacing', 'colors', 'effects']
                }
                title="System Core"
                description="Developing the backbone of the application infrastructure."
                date="Deployment: Success"
                tag1="Backend"
                tag2="Architecture"
              />
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default TechnicalExcellence;
