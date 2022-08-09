'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('codemirror')
      .service('myService')
      .getWelcomeMessage();
  },
});
