const insertMock = jest.fn();
const selectMock = jest.fn();

export const supabaseMock = {
  from: jest.fn(() => ({
    select: selectMock.mockResolvedValue({
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
    insert: insertMock.mockResolvedValue({
      data: {
        id: 3,
        name: "Fender",
        type: "bass",
        progress: 0,
        replacement_date: null
      },
      error: null
    }),
    delete: jest.fn(() => ({
      eq: jest.fn(() => ({
        data: [],
        error: null
      }))
    }))
  }))
};

export const selectOneMock = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn((column, value) => ({
        single: jest.fn().mockResolvedValue({
          data:
            value === "1"
              ? {
                  id: 1,
                  name: "Guitar",
                  type: "Acoustic",
                  progress: 0,
                  replacement_date: null
                }
              : value === "2"
              ? {
                  id: 2,
                  name: "Violin",
                  type: "Classical",
                  progress: 10,
                  replacement_date: null
                }
              : null
        })
      }))
    }))
  }))
};

export const deleteMock = {
  from: jest.fn(() => ({
    delete: jest.fn(() => ({
      eq: jest.fn(() => ({
        data: [],
        error: null
      }))
    }))
  }))
};
