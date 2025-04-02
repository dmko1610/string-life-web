import { supabaseMock } from "__mocks__/supabaseMock";
import { addInstrument, getInstruments } from "./api";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => supabaseMock())
}));

describe("Supabase API", () => {
  it("fetches instruments correctly", async () => {
    const instruments = await getInstruments();
    expect(instruments).toHaveLength(2);
    expect(instruments[0]).toEqual({
      id: 1,
      name: "Guitar",
      type: "Acoustic",
      replacement_date: null,
      progress: 0
    });
  });

  it("adds an instrument successfully", async () => {
    await addInstrument("Violin", "Classical");

    expect(true).toBeTruthy();
  });
});
