export const FITNESS_URL = "https://fitnesstrac-kr.herokuapp.com/api";
import axios from "axios";
import { storeCurrentUser, getCurrentUser } from "../auth";

export async function getRoutines() {
  try {
    const { data } = await axios.get(
      `${process.env.FITNESS_URL}routines`
    );
    return data;
  } catch (error) {
    throw error;
}
}

export async function getActivities() {
  try {
    const { data } = await axios.get(
      `${process.env.FITNESS_URL}activities`
    );
    return data;
  } catch (error) {
    throw error;
}
}

export async function registerUser(username, password) {
  return await axios
    .post(`${process.env.FITNESS_URL}users/register`, {
      username,
      password,
    })
    .then(({ data: { token } }) => {
      if (token) {
        storeCurrentUser();
        window.location.href = `${window.location.origin}/homepage`;
      } else {
        console.error("Error");
      }
    })
    .catch((error) => {
      console.log(error);

      console.error("Error");
    });
}


export async function loginUser(username, password) {
  return await axios
    .post(`${process.env.FITNESS_URL}users/login`, {
      username,
      password,
    })
    .then(({ data: { token } }) => {
      if (token) {
        storeCurrentUser();
        window.location.href = `${window.location.origin}/homepage`;
      } else {
        console.error("Error");
      }
    })
    .catch((error) => {
      console.log(error);

      console.error("Error");
    });
}

export async function createRoutine(name, goal) {
  try {
    const myToken = getCurrentUser();

    const response = await fetch(
      `${process.env.FITNESS_URL}routines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic: true,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createActivity(name, description) {
  try {
    const myToken = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `${process.env.FITNESS_URL}activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRoutine(id) {
  const myToken = getCurrentUser();

  fetch(`${process.env.FITNESS_URL}routines/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

export async function myUsernameFetch(myToken) {
  try {
    return axios
      .get(`${process.env.FITNESS_URL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(({ data: { username } }) => {
        return username;
      });
  } catch (err) {
    console.error(err);
  }
}


export async function myRoutinesFetch(username, myToken) {
  try {
    return axios
      .get(
        `${process.env.FITNESS_URL}users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(({ data }) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
}


export async function saveRoutine(routineName, routineGoal, id) {
  const myToken = getCurrentUser();

  fetch(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
    body: JSON.stringify({
      name: routineName,
      goal: routineGoal,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

export async function routineActivities(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}activities/:activityId/routines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}