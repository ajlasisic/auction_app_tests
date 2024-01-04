import { expect } from "@wdio/globals";
import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { generateRandomEmail, generateRandomId, generateRandomPassword, verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js";

describe("Categories API tests", () => {
  it("Check status code - Categories API", async () => {
    await axios.get(`${API_BASE_URL}/categories`).then(function (response) {
      verifyToEqual(response.status, 200);
    });
  });
  it("Check object properties - Categories API", async () => {
    await axios.get(`${API_BASE_URL}/categories`).then(function (response) {
      let data = response.data;
      data.forEach((product) => {
        verifyObjectPropertiesExist(product, ["id", "name", "subCategories"]);
      });
    });
  });
});

describe("Products API tests", () => {
  it("Check status code - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      verifyToEqual(response.status, 200);
    });
  });
  it("Check object properties - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      let data = response.data.content;
      data.forEach((product) => {
        verifyObjectPropertiesExist(product, [
          "id",
          "name",
          "description",
          "startBid",
          "highestBid",
          "numberOfBids",
          "dateStart",
          "dateEnd",
          "dateCreated",
          "subCategory",
          "images",
          "user",
        ]);
      });
    });
  });
  it("End date bigger than start date - Products API", async () => {
    await axios.get(`${API_BASE_URL}/products`).then(function (response) {
      let data = response.data.content;
      data.forEach((product) => {
        let startDate = new Date(product.dateStart);
        let endDate = new Date(product.dateEnd);
        expect(endDate).toBeGreaterThan(startDate);
      });
    });
  });
it("Check status code - Random product API", async () => {
  await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
    verifyToEqual(response.status, 200);
  });
});
it("Check object properties - Random product API", async () => {
  await axios.get(`${API_BASE_URL}/products/random`).then(function (response) {
    let data = response.data;
    verifyObjectPropertiesExist(data, [
      "id",
      "name",
      "description",
      "startBid",
      "highestBid",
      "numberOfBids",
      "dateStart",
      "dateEnd",
      "dateCreated",
      "subCategory",
      "images",
      "user",
    ]);
  });
});
let idProduct = null;

beforeAll(() => {
  idProduct = generateRandomId();
});
it("Check status code - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
    verifyToEqual(response.status, 200);
    });
});
it("Check object properties - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      let data = response.data;
      verifyObjectPropertiesExist(data, [
        "id",
        "name",
        "description",
        "startBid",
        "highestBid",
        "numberOfBids",
        "dateStart",
        "dateEnd",
        "dateCreated",
        "subCategory",
        "images",
        "user",
      ]);
    });
});
it("Product with valid id is displayed - Product API", async () => {
  await axios.get(`${API_BASE_URL}/products/${idProduct}`).then(function (response) {
      let data = response.data;
      verifyToEqual(data.id, idProduct);
    });
});
});
describe("Registration and Login API regression test", () => {
  beforeEach(() => {
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 401) {
          return Promise.resolve({ status: 401, data: "Could not log in" });
        } else if (error.response && error.response.status === 400) {
          return Promise.resolve({
            status: 400,
            data: "Could not create new user account",
          });
        }
        return Promise.reject(error);
      }
    );
  });
  let test_email = generateRandomEmail();
  let test_password = generateRandomPassword();
  it("Registration with invalid email", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/register`, {
      email: "test_email",
      password: 123,
      firstName: "Test",
      lastName: "Testing",
    });
    let data = response.data;
    verifyToEqual(response.status, 400);
    verifyToEqual(data, "Could not create new user account");
  });
  it("Registration without all body parameters", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/register`, {
      email: "test_email",
      password: test_password,
      firstName: "Test",
    });
    let data = response.data;
    verifyToEqual(response.status, 400);
    verifyToEqual(data, "Could not create new user account");
  });
  it("Login with invalid email", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/login`, {
      email: "test_email",
      password: 123,
    });
    let data = response.data;
    verifyToEqual(response.status, 401);
    verifyToEqual(data, "Could not log in");
  });
  it("Login with invalid password", async () => {
    let response;
    response = await axios.post(`${API_AUTH_URL}/login`, {
      email: test_email,
      password: 123,
    });
    let data = response.data;
    verifyToEqual(response.status, 401);
    verifyToEqual(data, "Could not log in");
  });
});
