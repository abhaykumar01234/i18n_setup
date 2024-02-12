import { Form, Link, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { ReactNode } from "react";
import type { loader as rootLoader } from "~/root";

export const Layout = ({ children }: { children: ReactNode }) => {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  const submit = useSubmit();
  return (
    <>
      {/* <ToastProvider> */}
      <header>
        <nav>
          <Link to="/home">Home</Link>&nbsp;
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <Form
          method="POST"
          onChange={(e) => submit(e.currentTarget)}
          style={{ marginInlineStart: "auto", width: "350px" }}
        >
          <label htmlFor="lng">Change Language</label>
          <select name="locale" id="lng" defaultValue={data?.locale}>
            {(data?.lngs || []).map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </Form>
      </footer>
      {/* {Array.isArray(toasts) &&
          toasts.length > 0 &&
          toasts.map((toast) => (
            <Toast
              key={toast.message}
              message={toast.message}
              type={toast.type}
            />
          ))} */}
      {/* </ToastProvider> */}
    </>
  );
};
