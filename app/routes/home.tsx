import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { remixI18next } from "~/modules/i18n/i18n.server";

export const handle = {
  i18n: ["home"],
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await remixI18next.getFixedT(request);
  const greet = t("greeting");
  return json({ greet });
};

export default function HomePage() {
  const { t } = useTranslation();
  const { greet } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{t("home_title")}</h1>
      <p>{t("home_description")}</p>
      <p>{greet}</p>
      <p>{t("greet")}</p>
    </div>
  );
}
