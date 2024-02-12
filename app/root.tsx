import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import globalStyles from "~/styles/global.css";

import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import { supportedTranslations } from "~/modules/i18n/config";
import { remixI18next } from "~/modules/i18n/i18n.server";
import { setI18nLocale } from "~/modules/i18n/cookie";
import { Layout } from "./shared/Layout";
import { ReactNode } from "react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
];

export const handle = {
  i18n: ["common"],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await remixI18next.getLocale(request);
  const headers = await setI18nLocale(locale);
  const lngs = Object.entries(supportedTranslations).map(([code, label]) => ({
    code,
    label,
  }));

  return json({ locale, lngs }, { headers });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const locale = String(formData.get("locale"));
  const headers = await setI18nLocale(locale);
  const redirectURL = String(request.headers.get("Referer")) || "/";

  return redirect(redirectURL, { headers });
};

function Document({ children }: { children: ReactNode }) {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
