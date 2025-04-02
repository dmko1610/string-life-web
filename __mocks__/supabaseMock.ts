export const supabaseMock = () => ({
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Guitar",
          type: "Acoustic",
          progress: 0,
          replacement_date: null
        },
        {
          id: 2,
          name: "Violin",
          type: "Classical",
          progress: 10,
          replacement_date: null
        }
      ],
      error: null
    }),
    insert: jest
      .fn()
      .mockResolvedValue({
        data: {
          id: 3,
          name: "Fender",
          type: "bass",
          progress: 0,
          replacement_date: null
        },
        error: null
      })
  }))
});
