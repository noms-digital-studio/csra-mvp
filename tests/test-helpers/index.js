
export const fakeStore = (state) => ({
  subscribe: sinon.spy(),
  dispatch: sinon.spy(),
  getState: () => ({ ...state })
});
