import { useNavigate } from 'react-router-dom';

const EASE = 'cubic-bezier(.25,.1,.25,1)';

export default function TransitionLink({ to, back = false, onClick, children, ...rest }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const outer = document.querySelector('.page-transition');
    const inner = document.querySelector('.page-transition-inner');
    if (!outer || !inner) {
      if (back) navigate(-1);
      else if (to) navigate(to);
      else if (onClick) onClick(e);
      return;
    }

    outer.style.transition = 'none';
    inner.style.transition = 'none';
    outer.style.transform = 'translateY(100%)';
    inner.style.transform = 'translateY(100%)';
    void outer.offsetHeight;

    outer.style.transition = `transform 300ms ${EASE}`;
    requestAnimationFrame(() => {
      outer.style.transform = 'translateY(0%)';
    });

    setTimeout(() => {
      if (back) navigate(-1);
      else if (to) navigate(to);
      else if (onClick) onClick(e);
    }, 320);
  };

  return (
    <a href={to || '#'} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
