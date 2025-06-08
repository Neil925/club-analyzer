import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand className={styles.navitem}>
            Club Analyzer
          </Navbar.Brand>
          <Nav className={styles.navitem}>
            <Nav.Link className={styles.navitem} href="/">Home</Nav.Link>
            <Nav.Link className={styles.navitem} href="/analyzer">
              Analyzer
            </Nav.Link>
            <Nav.Link className={styles.navitem} href="/admin">Admin</Nav.Link>
            <Nav.Link className={styles.navitem} href="/events">
              Events
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}
