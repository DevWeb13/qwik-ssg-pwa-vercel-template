import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div>
      <h1>Protected</h1>
      <a
        href="/"
        class="mt-4 flex h-10 w-32 items-center justify-center rounded-lg border border-blue-500 bg-white px-4 py-2 text-sm font-semibold text-blue-500 shadow-md transition duration-300 ease-in-out hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
      >
        Home
      </a>
    </div>
  );
});
