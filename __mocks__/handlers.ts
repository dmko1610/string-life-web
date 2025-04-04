import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://eryhinvntblxyfukumml.supabase.co/rest/v1/string_life",
    () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Guitar",
          type: "Acoustic",
          replacement_date: null,
          progress: 0
        },
        {
          id: 2,
          name: "Bass",
          type: "Electric",
          replacement_date: null,
          progress: 0
        }
      ]);
    }
  ),

  http.post(
    "https://eryhinvntblxyfukumml.supabase.co/rest/v1/string_life",
    async (req, res, ctx) => {
      const { name, type } = await req.json();
      return res(
        ctx.status(201),
        ctx.json({ id: 3, name, type, replacement_date: null, progress: 0 })
      );
    }
  )
];
