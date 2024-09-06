import { paths } from "./types";

type ValidUrl = keyof paths;

type UpdatePetRequestParams = paths["/pet"]["put"]["parameters"];
type AddPetRequestParams = paths["/pet"]["post"]["parameters"];

const path: Record<string, ValidUrl> = {
  pet: "/pet",
};

export const updatePet = (params: UpdatePetRequestParams) => {
  return fetch(path.pet, {
    method: "PUT",
    body: JSON.stringify(params),
  });
};

export const addPet = (params: AddPetRequestParams) => {
  return fetch(path.pet, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
