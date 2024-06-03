import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";

export const useDBTest = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv,
  );
  const { data, error } = await supabaseClient.from("test").select("*");
  if (error) {
    return { data: null, error: error.message };
  }

  return { data };
});

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const dbData = useDBTest();
  const { data, error } = dbData.value;

  console.log("Rendered data:", data);

  return (
    <div>
      <h1>Data from Supabase</h1>
      {error && <p>Error: {error}</p>}
      {data ? (
        <ul>
          {data.map((item: any, index: number) => (
            <li key={index}>{item.email}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <Slot />
    </div>
  );
});
