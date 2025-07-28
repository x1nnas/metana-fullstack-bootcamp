import Header from "./Header";

// Layout component to wrap the application content
const Layout = ({ children }) => {
  return (
    <>
      <Header /> {/* Render the Header component */}
      <main>{children}</main> {/* Render the main content passed as children */}
    </>
  );
};

export default Layout;
