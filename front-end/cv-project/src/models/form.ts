export interface FormModel {
  ID: string;
  name: string;
  surname: string;
  phone_nr: string;
  email: string;
  work: Array<WorkplaceInterface> | null;
  education: Array<EducationInterface> | null;
  address: Array<AddressInterface> | null;
  custom: Array<CustomFields> | null;
  created_at: string;
  updated_at: string;
}

interface AddressInterface {
  address_country: string;
  address_index: string;
  address_city: string;
  address_street: string;
  address_number: number;
}
interface WorkplaceInterface {
  work_place: string;
  work_position: string;
  work_load: string;
  work_experience: number;
}
interface EducationInterface {
  education_institution: string;
  education_faculty: string;
  education_field_of_study: string;
  education_level: string;
  education_status: string;
  education_time_spent: string;
}

interface CustomFields {
  custom_name: string;
  custom_value: string;
}