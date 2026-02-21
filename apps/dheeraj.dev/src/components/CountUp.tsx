import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  from: number;
  to: number;
}

function CountUp({ from, to }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = value.toFixed(0);
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef}>{to}</span>;
}

export default CountUp;
