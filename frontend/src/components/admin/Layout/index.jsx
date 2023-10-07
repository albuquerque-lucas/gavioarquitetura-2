import Header from "../Header";

export default function Layout({ children }) {
  return (
    <div className="admin-layout">
      <Header />
    <div className="admin-layout__content">{children}</div>
    </div>
  );
}