import ScrollToTop from 'react-scroll-to-top';
import './styles/style.css';

export default function Layout({ children }) {
  return (
    <div className="admin-layout">
    <div className="admin-layout__content">{children}</div>
    <ScrollToTop
        smooth
        color='#fff'
        className='scroll-to-top'
      />
    </div>
  );
}