const { sortCompactToStr } = require('.');



describe('Utils', () => {
  describe('sortCompactStr', () => {
    test('Descendant', () => {
      const result = sortCompactToStr('createdAt', 'desc');
      const expected = '-createdAt';

      expect(result)===(expected);
    })
  
    test('Ascendant', () => {
      const result = sortCompactToStr('createdAt', 'desc');
      const expected = 'createdAt'
    
      expect(result) === (expected);
    });
  })
});
