import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const SchoolFormValidator = z.object({
  email_id: z.string().email(),
  name: z
    .string()
    .min(5, {
      message: "Name must be atleast 5 characters long.",
    })
    .max(100, {
      message: "Name is Too Long.",
    }),

  address: z
    .string()
    .min(15, {
      message: "Address must be atleast 15 characters long.",
    })
    .max(200, {
      message: "Address is Too Long. Maximum Length is 200",
    }),
  city: z
    .string()
    .min(3, {
      message: "City must be atleast 3 characters long.",
    })
    .max(100, {
      message: "City is Too Long. Maximum Length is 100",
    }),
  state: z
    .string()
    .min(3, {
      message: "state must be atleast 3 characters long.",
    })
    .max(100, {
      message: "state is Too Long. Maximum Length is 100",
    }),
  contact: z
    .string()

    .min(10, {
      message: "Contact must be 10 Digits",
    })
    .max(12, {
      message: "Contact must be 12 Digits",
    })
    .refine(
      (input) => {
       
        let PhoneRegix: RegExp =
          /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
        if (input.match(PhoneRegix)) {
          return true;
        }
        return false;
      },
      {
        message: "Phone Number is not valid",
      }
    ),
  image: z
    .any()
    .refine((files) => files?.length == 1 || files?.name, "Image is required.")
    .refine(
      (files) =>
        files?.[0]?.size <= MAX_FILE_SIZE || files?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )

    .refine(
      (files) =>
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) ||
        ACCEPTED_IMAGE_TYPES.includes(files.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type TSchoolFormValidator = z.infer<typeof SchoolFormValidator>;

