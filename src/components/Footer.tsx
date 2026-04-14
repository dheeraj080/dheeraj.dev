export default function Footer() {
  return (
    <footer className="footer py-11 px-6 md:px-11 border-t border-border flex justify-between items-center max-md:flex-col max-md:gap-6 max-md:text-center">
      <div className="footer-left">
        <p className="text-[11px] tracking-[0.08em] text-muted">
          © {new Date().getFullYear()} DHEERAJ KAMBLE. ALL RIGHTS RESERVED.
        </p>
      </div>
      <div className="footer-right flex gap-7">
        <a href="https://linkedin.com/in/dheerajkamble" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.08em] uppercase text-muted hover:text-fg transition-colors duration-300">
          LinkedIn
        </a>
        <a href="https://github.com/dheeraj080" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.08em] uppercase text-muted hover:text-fg transition-colors duration-300">
          GitHub
        </a>
      </div>
    </footer>
  );
}
