const faker = require('faker');
const fs = require('fs');

const AMMOUNT_TO_GENERATE = 25;

const leads = [];

for(let i = 0; i < AMMOUNT_TO_GENERATE; i++) {
  leads.push({
    NIN: faker.random.number({min: 100000000, max: 999999999}),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    birthdate: faker.date.past(18, '2003-01-31'),
    email: faker.internet.email().toLowerCase(),
  });
};

fs.writeFile('leads.json', JSON.stringify({ leads }, null, 2), 'utf8', (err) => {
  if(err) throw err;
  console.log('File "leads.json" was saved succesfully!');
});