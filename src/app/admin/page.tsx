import { Metadata } from "next";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Page() {
  // Redirect non-admin users
  const session = await getSession();
  const isAdmin = session?.user;

  if (!isAdmin) {
    return redirect("api/auth/signin?callbackUrl=/admin");
  }

  if (isAdmin.role !== "admin") {
    return (
      <main className="mx-auto my-10">
        <p className="text-center">You are not authorized to view this page</p>
      </main>
    )
  }

  return (
    <main className="mx-auto my-10 space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </main>
  );
}
