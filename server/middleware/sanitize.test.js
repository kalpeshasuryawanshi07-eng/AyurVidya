const sanitizeRequest = require('./sanitize');

describe('sanitizeRequest middleware', () => {
  test('removes mongo operator keys and trims strings', () => {
    const req = {
      body: {
        name: '  John  ',
        $where: 'this.password',
        nested: {
          'profile.name': 'bad',
          email: '  john@example.com  '
        }
      },
      query: {
        q: '  fever  ',
        '$gt': '1'
      },
      params: {
        slug: '  vata-dosha  '
      }
    };
    const res = {};
    const next = jest.fn();

    sanitizeRequest(req, res, next);

    expect(req.body).toEqual({
      name: 'John',
      nested: {
        email: 'john@example.com'
      }
    });
    expect(req.query).toEqual({ q: 'fever' });
    expect(req.params).toEqual({ slug: 'vata-dosha' });
    expect(next).toHaveBeenCalled();
  });
});
