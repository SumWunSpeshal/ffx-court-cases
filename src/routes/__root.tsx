import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex gap-8">
        <Link to="/" className="[&.active]:font-bold">
          New case
        </Link>
        <Link to="/cases" className="[&.active]:font-bold">
          All cases
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
