import { db } from "@/db";
import { TSchoolFormValidator } from "../validation/school-form-validator";
import { PAGINATION_COUNT } from "../constants";

export const getSchoolData = async (
  page: number
): Promise<
  { totalSchool: number } & {
    schoolData: Required<
      Omit<TSchoolFormValidator & { id: number }, "contact" | "email_id">
    >[];
  }
> => {
  const SchoolData = async () => {
    const data = await db.school.findMany({
      skip: PAGINATION_COUNT * page,
      take: PAGINATION_COUNT,
      orderBy: {
        name: "asc",
      },
      select: {
        address: true,
        city: true,
        id: true,
        image: true,
        name: true,
        state: true,
      },
    });
    return data;
  };
  const TotalSchoolCount = async () => {
    const TotalCount = await db.school.count();
    return TotalCount;
  };
  const [totalSchool, schoolData] = await Promise.all([
    TotalSchoolCount(),
    SchoolData(),
  ]);
  return { totalSchool, schoolData };
};
