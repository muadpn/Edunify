import { db } from "@/db";
import {
  SchoolFormValidator,
  TSchoolFormValidator,
} from "@/lib/validation/school-form-validator";

import { writeFile } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    //Get FormData
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    //Send Back if File is not Present
    if (!file) {
      return NextResponse.json(
        { message: "Invalid File or There is not File" },
        { status: 404 }
      );
    }

    //Get User Inputs
    const Inputs: TSchoolFormValidator = {
      address: data.get("address") as string,
      city: data.get("city") as string,
      contact: data.get("contact") as string,
      email_id: data.get("email_id") as string,
      name: data.get("name") as string,
      state: data.get("state") as string,
      image: file,
    };

    //Validate UserInputs and Parse
    const ValidInputs = SchoolFormValidator.parse(Inputs);

    //PreFit FileName for avoiding Duplicates.
    const filename = `${crypto.randomUUID()}-${Date.now()}.${
      file.type.split("/")[1]
    }`;

    //Check if Email or Contact Exists
    const isEmailOrContactExists = await db.school.count({
      where: {
        OR: [
          {
            email_id: ValidInputs.email_id,
          },
          {
            contact: ValidInputs.contact,
          },
        ],
      },
    });
    if (isEmailOrContactExists) {
      return NextResponse.json(
        { message: "Email or Contact Exists in Database" },
        { status: 400 }
      );
    }
    //Process Image by ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //Insert Data to Database
    const InsertData = await db.school.create({
      data: {
        address: ValidInputs.address,
        city: ValidInputs.city,
        contact: ValidInputs.contact,
        email_id: ValidInputs.email_id,
        image: filename,
        name: ValidInputs.name,
        state: ValidInputs.state,
      },
    });

    //Set Pathname by resolving current directory to the Required Directory
    const paths = path.join(process.cwd(), "public/schoolImages/" + filename);

    //save the file
    await writeFile(paths, buffer);
    //Return the Response.
    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues[0].message);
      return NextResponse.json(
        { message: error.issues[0].message },
        { statusText: "Validation Error:", status: 404 }
      );
    }

    return NextResponse.json(error, { status: 500 });
  }
}
