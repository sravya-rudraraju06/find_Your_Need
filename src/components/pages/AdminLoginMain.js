import { Container } from "react-bootstrap";
import "../../App.css";
import AdminLogin from "./AdminLogin";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function AdminLoginMain() {
  return (
    <div>
      
      <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <AdminLogin />
          </UserAuthContextProvider>
    </Container>
    </div>
  );
}

export default AdminLoginMain;
