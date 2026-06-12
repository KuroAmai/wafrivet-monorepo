export type AnimalStatus = "OPTIMAL" | "WARNING" | "CRITICAL" | "UNKNOWN";

export type AnimalResponseDto = {
  animalUid: string;
  name?: string;
  species?: string;
  breed?: string;
  status?: AnimalStatus;
  farmId?: string;
  wafId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FarmSnapshotDto = {
  farmId: string;
  name: string;
  animalCount?: number;
  location?: string;
};

export type FarmAnimalSnapshotDto = {
  animalUid: string;
  name?: string;
  species?: string;
  status?: AnimalStatus;
  lastVaccinationAt?: string;
};

export type AnimalSpecies =
  | "cattle"
  | "goat"
  | "pig"
  | "sheep"
  | "ram"
  | "poultry"
  | "horse"
  | "donkey"
  | "camel"
  | "other";

export type AnimalSex = "male" | "female" | "unknown";

export type CreateAnimalDto = {
  farmId: string;
  species: AnimalSpecies;
  sex: AnimalSex;
  breed?: string;
  dateOfBirth?: string;
  estimatedAgeMonths?: number;
  name?: string;
  tagEarNumber?: string;
  color?: string;
  weightKg?: number;
  notes?: string;
};

export type UpdateAnimalDto = Partial<
  Omit<CreateAnimalDto, "farmId">
>;
