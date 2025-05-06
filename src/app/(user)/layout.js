import { PermissionsProvider } from "@/context/PermissionsContext";
import { MenusProvider  } from "@/context/MenusContext";
export default function RootLayoutAdmin({ children }) {
  return <PermissionsProvider><MenusProvider>{children}</MenusProvider></PermissionsProvider>;
}
