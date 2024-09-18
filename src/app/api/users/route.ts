import { NextResponse } from "next/server";
import axios from "axios";

const maskEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  return `${name.charAt(0)}***@${domain}`;
};

export const GET = async () => {
  try {
    const responses = await Promise.all([
      axios.get("https://reqres.in/api/users?page=1"),
      axios.get("https://reqres.in/api/users?page=2"),
    ]);

    const combinedUsers = responses.flatMap((response) => response.data.data);

    const filteredUsers = combinedUsers.filter(
      (user) =>
        user.first_name.startsWith("G") || user.last_name.startsWith("W")
    );

    const maskedUsers = filteredUsers.map((user) => ({
      ...user,
      email: maskEmail(user.email),
    }));

    return NextResponse.json(maskedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
