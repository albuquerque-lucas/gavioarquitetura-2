import './styles/style.css';

export default function Layout({ children }) {
  return (
    <div className="admin-layout">
    <div className="admin-layout__content">{children}</div>
    </div>
  );
}