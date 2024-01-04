import axios from "axios";
import { API_AUTH_URL, API_BASE_URL } from "../../globals.js";
import { generateRandomEmail, generateRandomPassword, verifyObjectPropertiesExist, verifyToEqual } from "../../utils.js"

describe("API smoke test", () => {
    let test_email = generateRandomEmail()
    let test_password = generateRandomPassword()
    let id = null
    it("Check status code - Registration", async () => {
      await axios.post(`${API_AUTH_URL}/register`, {
        email: test_email,
        password: test_password,
        firstName: "Ajla",
        lastName: "Test"
      })
      .then(function (response) {
        let data = response.data;
        id = data.user.id
        verifyToEqual(response.status, 200);
        verifyObjectPropertiesExist(data, ["user", "token"]);
      })
    });
    it("Check status code - Login", async () => {
      let id_login = null
      await axios.post(`${API_AUTH_URL}/login`, {
        email: test_email,
        password: test_password
      })
      .then(function (response) {
        let data = response.data;
        id_login = data.user.id
        verifyToEqual(response.status, 200);
        verifyObjectPropertiesExist(data, ["user", "token"]);
        verifyToEqual(id_login, id)
        });
      });
    });