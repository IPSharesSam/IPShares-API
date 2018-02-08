const faker = require('faker');

function addTags() {
  const arr = []
  arr.push(faker.name.jobTitle())
  return arr
}

function getRandom() {
  return Math.floor(Math.random() * Math.floor(2));
}


const type = ['advisor', 'creator']

module.exports = function makeseeds() {
  const arr = [];
  let n = 0;
  while (n < 20) {
    n++;
    const adprofile = {
      latlng: { lat: Number(faker.address.latitude()), lng: Number(faker.address.longitude()) },
      bio: faker.lorem.paragraphs(),
      phoneNumber: faker.phone.phoneNumber(),
      picUrl: faker.image.avatar(),
      publicAdvisor: true,
      tags: addTags()
    };
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      advisorProfile: adprofile,
      type: type[getRandom()],
    };
    console.log(arr)
    arr.push(user);

  }
  return arr;
};
