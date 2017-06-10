import { MetrologicalDataPage } from './app.po';

describe('metrological-data App', () => {
  let page: MetrologicalDataPage;

  beforeEach(() => {
    page = new MetrologicalDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
