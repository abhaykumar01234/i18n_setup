import { createCookie } from "@remix-run/node";

export const i18nCookie = createCookie("i18n", { sameSite: "lax", path: "/" });

export const setI18nLocale = async (
  locale: string,
  headers = new Headers()
) => {
  headers.append("Set-Cookie", await i18nCookie.serialize(locale));
  return headers;
};
