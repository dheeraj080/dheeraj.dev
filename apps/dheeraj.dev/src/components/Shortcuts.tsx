import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import Toast from '@/components/Toast';

import useFocusMode from '@/hooks/useFocusMode';
import useGlobal from '@/hooks/useGlobal';
import useShortcut from '@/hooks/useShortcut';
import useTheme from '@/hooks/useTheme';

const focusToast = {
  title: 'Focus Turned {STATUS}',
  message:
    'Focus helps reduce distractions by hiding floating components, like navigation and reactions.',
};

function Shortcuts() {
  const toastIdRef = useRef<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { isQuickAccessOpen, setQuickAccessOpen } = useGlobal();
  const { focusMode, setFocusMode } = useFocusMode();

  useShortcut('KeyD', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
  useShortcut('KeyQ', () => setQuickAccessOpen(!isQuickAccessOpen));
  useShortcut('KeyF', () => setFocusMode(!focusMode));

  useEffect(() => {
    if (toastIdRef.current) toast.remove(toastIdRef.current);

    toastIdRef.current = toast.custom((t) => (
      <Toast
        title={focusToast.title.replace('{STATUS}', focusMode ? 'On' : 'Off')}
        message={focusToast.message}
        t={t}
      />
    ));
  }, [focusMode]);

  return null;
}

export default Shortcuts;
