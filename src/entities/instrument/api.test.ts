import { selectOneMock, supabaseMock } from "__mocks__/supabaseMock";
import { addInstrument, getInstruments } from "./api";

jest.mock("../../shared/lib/supabase", () => ({
  supabase: supabaseMock
}));

describe("Supabase API", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("fetch things", () => {
    it("fetches instruments", async () => {
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

    it("fetches exactly one instrument", async () => {
      jest.resetModules();
      jest.doMock("../../shared/lib/supabase", () => ({
        supabase: selectOneMock
      }));
      const { getInstrumentById } = await import("./api");
      const instrument = await getInstrumentById("2");

      expect(instrument).toEqual({
        id: 2,
        name: "Violin",
        type: "Classical",
        progress: 10,
        replacement_date: null
      });
    });
  });

  describe("insert things", () => {
    it("adds an instrument", async () => {
      await expect(
        addInstrument("Violin", "Classical")
      ).resolves.toBeUndefined();
      expect(supabaseMock.from).toHaveBeenCalledWith("string_life");
      expect(supabaseMock.from().insert).toHaveBeenCalledWith([
        {
          name: "Violin",
          type: "Classical",
          progress: 0,
          replacement_date: null
        }
      ]);
    });

    describe("insertion fails", () => {
      it("throws an error", async () => {
        supabaseMock.from().insert.mockResolvedValueOnce({
          data: null,
          error: new Error("Insertion failed")
        });

        await expect(addInstrument("Piano", "Grand")).rejects.toThrow(
          "Insertion failed"
        );
      });
    });
  });

  describe("delete things", () => {
    it("deletes an instrument", async () => {
      const eqFn = jest.fn(() => ({
        data: [],
        error: null
      }));
      const deleteFn = jest.fn(() => ({
        eq: eqFn
      }));
      const fromFn = jest.fn(() => ({
        delete: deleteFn
      }));
      const deleteMock = {
        from: fromFn
      };

      jest.resetModules();
      jest.doMock("../../shared/lib/supabase", () => {
        return {
          supabase: deleteMock
        };
      });
      const { deleteInstrumentById } = await import("./api");

      await deleteInstrumentById("2");

      expect(fromFn).toHaveBeenCalledWith("string_life");
      expect(deleteFn).toHaveBeenCalled();
      expect(eqFn).toHaveBeenCalledWith("id", "2");
    });
  });
});
