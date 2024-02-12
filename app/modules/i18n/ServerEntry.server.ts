import { createInstance } from "i18next";
import { remixI18next } from "~/modules/i18n/i18n.server";
import { i18nConfig } from "~/modules/i18n/config";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend"; // your i18n configuration file
import { resolve } from "node:path";
import type { EntryContext } from "@remix-run/node";

type handleI18nRequestProps = {
  request: Request;
  remixContext: EntryContext;
};

export async function handleI18nRequest({
  request,
  remixContext,
}: handleI18nRequestProps) {
  const instance = createInstance();
  const lng = await remixI18next.getLocale(request);
  const ns = remixI18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });

  return instance;
}

export const I18nServerProvider = I18nextProvider;
