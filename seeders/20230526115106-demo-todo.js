'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
     await queryInterface.bulkInsert('Todos', [{
       title: 'John Doe',
       description: '',
       
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     
     await queryInterface.bulkDelete('Todos', null, {});
     
  }
};
