export const PUT = async ({ request, cookies }) => {
  cookies.set('theme', await request.text());

  return new Response(null, { status: 204 });
};
